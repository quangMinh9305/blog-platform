# DevBlog — MVP Specification

## Pitch

Full-stack technical blog platform with **semantic search and content-based recommendations**. Users register, write posts, interact (react / bookmark / comment / follow), and discover related content via vector similarity over post embeddings.

The hero feature — pgvector + sentence-transformer embeddings — is the differentiator. Everything else is solid CRUD + auth scaffolding to support the demo.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | React + Vite + React Router + Tailwind | Already scaffolded |
| Backend | Node + Express + Prisma + zod | Already scaffolded |
| Database | PostgreSQL (Neon free tier) + **pgvector** | Free, pgvector is the only blocker for managed hosts |
| Embeddings | `@xenova/transformers` running in Node (`Xenova/all-MiniLM-L6-v2`, 384-dim) | Free, no API key, ~23MB model |
| Auth | JWT + bcrypt | Standard, no third-party |
| Image upload | Cloudinary free tier | 25GB free, simple API |
| Real-time (stretch) | Socket.IO | For live comments on PostDetail |
| Hosting | Vercel (frontend) + Fly.io (backend) | Free tiers, no cold-start tax on Fly |

**Total monthly cost: $0.**

---

## Roles

| Role | Granted on | Permissions |
|---|---|---|
| `writer` | **Default on register** | Read, react, bookmark, comment, follow + create/edit/delete own posts |
| `reader` | Manual DB only (e.g. soft-ban tier) | Read, react, bookmark, comment, follow (no posting) |
| `admin` | Manual DB promotion only | Writer perms + delete any post/comment, ban users |

Default role is `writer`: this is an open-publish platform. The `reader` role exists in the schema for future use but isn't auto-assigned. Admin promotion happens via DB/scripts in MVP.

---

## In Scope — Pages (10)

| # | Route | Page | Status |
|---|---|---|---|
| 1 | `/login` | Login | JSX exists, needs API wire |
| 2 | `/register` | Register | JSX exists, needs API wire |
| 3 | `/` | Home (For You feed) | JSX exists, needs API wire |
| 4 | `/following` | Following feed | JSX exists, needs API wire |
| 5 | `/bookmarks` | Bookmarks | JSX exists, needs API wire |
| 6 | `/search` | Search results (keyword + semantic toggle) | JSX exists, needs wire + toggle |
| 7 | `/posts/:slug` | Post detail (with related posts) | **HTML only — needs JSX conversion** |
| 8 | `/posts/new` | Create post | **HTML only — needs JSX conversion** |
| 9 | `/posts/:slug/edit` | Edit post | **HTML only — needs JSX conversion** |
| 10 | `/my-posts` | Author dashboard | JSX exists, needs API wire |

Stretch: `/u/:nickname` PublicProfile (only if Day 4 is calm).

---

## In Scope — Features

### Auth
- Register: email + password + auto-generated `name` from email local-part
- Login: email + password → JWT (24h)
- Logout: client-side token removal (server stateless)
- `GET /me`: get current user from JWT

### Posts
- CRUD with statuses: `draft` / `published` / `archived` (only `published` is publicly visible)
- Slug auto-generated from title (with collision suffix)
- Cover image (`thumbnailUrl`) via Cloudinary
- Reading time auto-calculated (~200 wpm) and stored in `readingTimeMinutes`
- Tag association (many-to-many via `post_tags`)
- **On status transition to `published`: generate embedding from `title + excerpt`**

### Tags
- System-seeded set on Day 0: `DSA`, `Web`, `Cloud`, `OS`, `Database`, `AI`, `Backend`, `Frontend`, `DevOps`, `Architecture`
- No admin UI for tag CRUD in MVP

### Reactions (simplified to "like" only in MVP)
- Schema supports 4 types (`like`, `love`, `insightful`, `funny`) — UI exposes only `like` in MVP
- Toggle on/off per user per post; `@@unique([postId, userId])` enforces one reaction per user per post

### Bookmarks
- Toggle on/off per user per post

### Comments (flat)
- Create, list, soft-delete (`isDeleted = true`) — no edit, no nesting
- Soft delete preserves notification references (future-proof)

### Follow
- Self-relation; toggle on/off

### Feeds
- Home: latest `published` posts, paginated
- Following: posts from authors the current user follows
- Bookmarks: current user's bookmarked posts

### Search & Discovery (HERO)
- **Keyword search**: Postgres `ILIKE` over `title` + `excerpt`
- **Semantic search**: embed query → cosine similarity over `posts.embedding` via pgvector
- Single endpoint with `?mode=keyword|semantic` switch
- **Related posts**: top 5 by cosine similarity to current post, excluding self

---

## Stretch Upgrades (only if Days 1–3 ship clean)

### Real-time comments via Socket.IO
- On `POST /api/posts/:id/comments` success, server emits `comment:new` to room `post:${postId}`
- PostDetailPage joins the room on mount, leaves on unmount
- New comments appear in the comment list without refresh
- **CV bullet:** *Real-time comment delivery via Socket.IO with per-post rooms; new comments appear without page refresh.*

### View tracking
- The `post_views` table exists. On `GET /api/posts/:slug`, insert a row (with `userId` if authed, else `ipAddress`)
- Increment denormalized `viewCount` on the post
- Don't build a trending feed — just the data collection. *"Schema and ingestion ready; ranking deferred"* is fine.

### LLM tag suggestion
- New endpoint `POST /api/ai/suggest-tags { content }` → returns 3–5 tag names
- Use Groq free API (Llama 3.1 8B is plenty)
- Wire into create/edit post page as a "Suggest tags" button

---

## Out of Scope

These tables exist in the schema (designed for future) but **no endpoints / no UI in MVP**:
- `notifications` (no UI, no endpoints, no Socket.IO push for these)
- `categories` / `post_categories` (tags only in MVP)
- `post_views` (tracking deferred — see stretch)
- OAuth fields on `users` (`oauthProvider`, `oauthId`)
- `nickname` on `users` (designed for future @mentions)
- `isBanned` flag (no admin UI in MVP)

These features are **fully cut** (not in schema, not in scope):
- Forgot password / password reset (requires email infra)
- Profile settings UI (use auto-generated `name`; edit post-MVP)
- Admin panel UI (user mgmt, content moderation, tag mgmt)
- Trending feed (use recency)
- Email notifications
- Nested comments
- Post drafts auto-save

---

## Schema (Prisma)

The schema is already designed (12 tables) with future expansion in mind. Three additions are required for the hero feature.

### Required additions to existing schema

**1. Enable pgvector extension** in `schema.prisma`:

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}

datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  extensions = [pgvector(map: "vector")]
}
```

Plus run once on Neon (via SQL editor):
```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

**2. Add `embedding` column to `Post`:**

```prisma
model Post {
  // ... existing fields
  embedding Unsupported("vector(384)")?
}
```

**3. Add `excerpt` column to `Post`:**

```prisma
excerpt String? @db.VarChar(500)
```

> **Note on `embedding`:** Prisma doesn't have native vector support. Use `Unsupported("vector(384)")`. Read/write via raw SQL: `prisma.$queryRaw` for similarity queries, `prisma.$executeRaw` for embedding inserts/updates.

### Full schema reference

12 tables, camelCase models mapped to snake_case Postgres tables via `@@map`:

`users`, `posts`, `categories`, `tags`, `post_categories`, `post_tags`, `comments`, `reactions`, `bookmarks`, `follows`, `notifications`, `post_views`

Enums: `Role` (`reader` | `writer` | `admin`), `PostStatus` (`draft` | `published` | `archived`), `ReactionType` (`like` | `love` | `insightful` | `funny`), `NotificationType` (`like` | `comment` | `follow` | `mention`).

See `prisma/schema.prisma` for full definition.

### Schema design notes (for interview / README)

- **UUID primary keys** for all entities — no sequential ID leakage
- **Snake_case Postgres / camelCase Prisma** — clean SQL when debugging in pgAdmin
- **Soft delete on comments** (`isDeleted`) — preserves notification references when a comment is "deleted"
- **Denormalized `viewCount` on posts** — fast feed queries; raw view records in `post_views`
- **Nullable `userId` on `post_views`** — anonymous visitor tracking via IP (IPv6-safe `VarChar(45)`)
- **Nullable OAuth fields on `users`** — supports email-only and OAuth users in one table
- **Composite PK on junction tables** — prevents duplicate associations natively

---

## API Surface (MVP only)

All responses use this error shape on failure:
```json
{ "error": { "code": "VALIDATION_ERROR", "message": "...", "details": { ... } } }
```

### Auth
| Method | Path | Body / Query | Auth | Returns |
|---|---|---|---|---|
| POST | `/api/auth/register` | `{ email, password, name? }` | — | `{ user, token }` |
| POST | `/api/auth/login` | `{ email, password }` | — | `{ user, token }` |
| POST | `/api/auth/logout` | — | ✓ | `{ ok: true }` |
| GET | `/api/auth/me` | — | ✓ | `{ user }` |

### Posts
| Method | Path | Body / Query | Auth | Returns |
|---|---|---|---|---|
| GET | `/api/posts` | `?page=&limit=&tag=&authorId=&sort=` | — | `{ posts, page, total }` |
| GET | `/api/posts/:slug` | — | — | `{ post, author, tags, reactionCount, isReacted, isBookmarked }` |
| GET | `/api/posts/:slug/related` | `?limit=5` | — | `{ posts }` (similar via embedding) |
| POST | `/api/posts` | `{ title, content, excerpt?, thumbnailUrl?, tags[], status }` | ✓ writer+ | `{ post }` |
| PATCH | `/api/posts/:id` | partial post | ✓ owner | `{ post }` |
| DELETE | `/api/posts/:id` | — | ✓ owner or admin | `{ ok }` |
| GET | `/api/me/posts` | `?status=` | ✓ | `{ posts }` (incl. drafts) |

### Feeds
| Method | Path | Auth | Returns |
|---|---|---|---|
| GET | `/api/feed/following` | ✓ | `{ posts, page }` |
| GET | `/api/me/bookmarks` | ✓ | `{ posts, page }` |

### Interactions
| Method | Path | Auth | Returns |
|---|---|---|---|
| POST | `/api/posts/:id/react` | ✓ | `{ reacted: true, count }` |
| DELETE | `/api/posts/:id/react` | ✓ | `{ reacted: false, count }` |
| POST | `/api/posts/:id/bookmark` | ✓ | `{ bookmarked: true }` |
| DELETE | `/api/posts/:id/bookmark` | ✓ | `{ bookmarked: false }` |
| POST | `/api/users/:id/follow` | ✓ | `{ following: true }` |
| DELETE | `/api/users/:id/follow` | ✓ | `{ following: false }` |

> MVP only sends `type: 'like'` to the react endpoint. Schema supports 4 types — exposed in post-MVP.

### Comments
| Method | Path | Auth | Returns |
|---|---|---|---|
| GET | `/api/posts/:id/comments` | — | `{ comments }` (excludes `isDeleted: true`) |
| POST | `/api/posts/:id/comments` | ✓ | `{ comment }` |
| DELETE | `/api/comments/:id` | ✓ owner | `{ ok }` (soft delete) |

### Tags & Search
| Method | Path | Returns |
|---|---|---|
| GET | `/api/tags` | `{ tags }` |
| GET | `/api/search` | `?q=&mode=keyword\|semantic&page=` → `{ posts, mode }` |

### Upload
| Method | Path | Auth | Returns |
|---|---|---|---|
| POST | `/api/upload` | ✓ | `{ url }` (Cloudinary signed) |

---

## Hero Feature: Semantic Search & Related Posts

### Pipeline

1. **At post publish time** (status transitions DRAFT/ARCHIVED → PUBLISHED):
   - Build text: `${title}\n\n${excerpt}` (full content also fine — adds quality, costs more time)
   - Run `pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')` → 384-dim Float32Array
   - Store with raw SQL: `UPDATE posts SET embedding = $1::vector WHERE id = $2`
   - Format the vector as `'[0.123, -0.456, ...]'`

2. **Semantic search query**:
   ```sql
   SELECT id, slug, title, excerpt
   FROM posts
   WHERE status = 'published' AND embedding IS NOT NULL
   ORDER BY embedding <=> $1::vector
   LIMIT 20;
   ```
   The `<=>` operator is cosine distance (0 = identical, 2 = opposite).

3. **Related posts**:
   ```sql
   SELECT id, slug, title, excerpt
   FROM posts
   WHERE status = 'published'
     AND id != $1
     AND embedding IS NOT NULL
   ORDER BY embedding <=> (SELECT embedding FROM posts WHERE id = $1)
   LIMIT 5;
   ```

### Backfill script (run once after seeding)

Embed all published seeded posts so the demo has a corpus. Without this, semantic search returns nothing on a fresh DB.

```js
// scripts/backfill-embeddings.js
import { prisma } from '../src/lib/prisma.js';
import { embed } from '../src/services/embed.js';

async function main() {
  const posts = await prisma.post.findMany({
    where: { status: 'published' },
    select: { id: true, title: true, excerpt: true },
  });

  for (const p of posts) {
    const vec = await embed(`${p.title}\n\n${p.excerpt ?? ''}`);
    await prisma.$executeRaw`
      UPDATE posts SET embedding = ${`[${vec.join(',')}]`}::vector WHERE id = ${p.id}::uuid
    `;
    console.log('embedded', p.id);
  }
}

main().then(() => process.exit(0));
```

### CV bullet target

> *Built semantic search and content-based "related posts" using sentence-transformer embeddings (`all-MiniLM-L6-v2`) stored in PostgreSQL via the pgvector extension. Replaced naive `LIKE` queries with cosine similarity over a 384-dim vector space; queries return semantically related content even without keyword overlap.*

---

## Seed Data Requirements

For semantic search to demo well, you need a corpus with **enough variety to show off similarity**. Minimum:

- 5 users (1 admin, 4 writers)
- 30+ posts across 5+ tags
- Posts in clusters: e.g. 6 posts on Web/React, 6 on Database, 6 on DevOps, 6 on Algorithms, 6 on Cloud
- Use ChatGPT/Claude to generate post content; quality doesn't matter as long as topics cluster naturally

Use the cluster structure to demo: search "frontend performance" should rank Web posts higher than algorithm posts, even when "react" and "performance" aren't both in any single title.