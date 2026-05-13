# DevBlog — Build Plan (4 days, 2 people)

> Read SPEC.md first. This doc is _how_ we build it.

---

## People

- **Person A** — Backend lead. Owns Prisma schema additions. Owns the AI/search backend (the hero).
- **Person B** — Frontend lead. Owns deployment + demo. Owns UI integration of the hero feature.

Both touch the hero feature: A builds it, B makes it visible. Both can claim it credibly on their CV.

---

## Day 0 — Joint setup (~60 min, do this together on a call)

The Prisma schema already exists (12 tables) — saves us ~30 min vs writing from scratch.

- [ ] Decide repo: monorepo `/backend` + `/frontend`. Initialize.
- [ ] Both: read `SPEC.md` end to end.
- [ ] **B**: Sign up for Neon (free Postgres), Vercel, Fly.io, Cloudinary.
- [ ] **B**: Enable pgvector extension on Neon — run `CREATE EXTENSION IF NOT EXISTS vector;` in the SQL editor.
- [ ] **B**: Drop credentials into a shared `.env` (Discord pinned message). Commit `.env.example`.
- [ ] **A**: Add the 3 schema additions per SPEC.md (pgvector extension block, `embedding` on Post, `excerpt` on Post). Run first migration on Neon.
- [ ] **A**: Write seed script: 5 users, 30+ posts (use ChatGPT to generate text), 8 tags. Group posts into clusters for semantic-search demo.
- [ ] **B**: Set up Discord channel. Pin: repo, Neon dashboard, Vercel project, Fly app, this PLAN, SPEC.
- [ ] Both: agree on sync times — **10am + 9pm, 10 min each**.
- [ ] **B**: Create the GitHub Project board with task issues from this doc. Assign owners.

---

## Day 1 — Auth + Posts (foundation, end-to-end thin slice)

### Person A — Auth + Post CRUD backend

- POST `/api/auth/register` (bcrypt, JWT, validate via zod)
- POST `/api/auth/login`
- POST `/api/auth/logout`
- GET `/api/auth/me`
- Auth middleware (`req.user` from JWT)
- POST `/api/posts` (writer+ only, generate slug, calculate `readingTimeMinutes`)
- GET `/api/posts/:slug` (public, no embedding work yet)
- GET `/api/posts` (paginated list, `status='published'` only)
- PATCH `/api/posts/:id` (owner-only)
- DELETE `/api/posts/:id` (owner or admin)
- GET `/api/me/posts` (own posts incl. drafts)
- Smoke test all endpoints with curl/Postman

### Person B — Frontend wiring + HTML→JSX conversion

- Set up `lib/api.js` (axios with baseURL + interceptor that attaches JWT from localStorage)
- Set up `AuthContext` (login/logout/user state)
- Wire `Login.jsx` + `Register.jsx` to backend
- Convert `code_post_detail_devblog_code.html` → `PostDetailPage.jsx` (route: `/posts/:slug`)
- Convert `code_create_new_post_devblog_code.html` → `CreatePostPage.jsx` (route: `/posts/new`)
- Convert `code_edit_post_devblog_code.html` → `EditPostPage.jsx` (route: `/posts/:slug/edit`)
- Wire create/edit pages to backend (with TipTap or Quill for rich editor)

### End of Day 1 demo

> Register → log in → create a post → see it on the post detail page → edit it. Two pages working end-to-end.

---

## Day 2 — THE HERO DAY (do not skip this, do not let it slip)

### Person A — pgvector + embedding pipeline + search backend

- Install `@xenova/transformers`
- Write `lib/embed.js` exporting `embed(text): Promise<number[]>` — 384-dim
  - Cache the pipeline across calls (don't re-load the model)
  - First call ~5s (model download), subsequent ~50ms
- Add hook in post create/update: when status transitions to `published`, generate + store embedding
- Use `prisma.$executeRaw` to UPDATE the embedding column (Prisma doesn't support vector type directly)
- Write `scripts/backfill-embeddings.js` — embed all `published` seeded posts. Run it.
- Implement GET `/api/search?q=...&mode=keyword|semantic`
  - Keyword: `WHERE title ILIKE '%q%' OR excerpt ILIKE '%q%'`
  - Semantic: `ORDER BY embedding <=> $queryVec LIMIT 20`
- Implement GET `/api/posts/:slug/related?limit=5` (exclude self, semantic)
- Test: search "frontend optimization" should return Web/React posts even without keyword match

### Person B — Wire feeds + search UI

- Wire `HomePage.jsx` to GET `/api/posts` (real data, kill the dummy array)
- Wire `MyPostsPage.jsx` to GET `/api/me/posts` with status tabs
- Build `/search` page: input + mode toggle (default `semantic`), wire to `/api/search`
- Add a small "How is this ranked?" tooltip explaining the mode. (Recruiters notice these.)
- Pagination component connection
- Update PostCard to render real post fields

### End of Day 2 demo

> Search "react performance" → results include posts about "frontend optimization" and "render bottlenecks" via semantic mode, even when "react" isn't in title. **This is the demo moment that earns the interview.**

---

## Day 3 — Interactions + related posts UI + comments

### Person A — Interactions backend

- POST/DELETE `/api/posts/:id/react` (MVP only sends `type: 'like'`)
- POST/DELETE `/api/posts/:id/bookmark`
- POST/DELETE `/api/users/:id/follow`
- GET `/api/me/bookmarks` (paginated)
- GET `/api/feed/following` (paginated)
- GET/POST `/api/posts/:id/comments`
- DELETE `/api/comments/:id` → soft delete (`isDeleted = true`), owner only
- GET `/api/tags`
- POST `/api/upload` (Cloudinary signed upload)

### Person B — Interactions UI + related posts widget + remaining feeds

- Wire `BookmarksPage.jsx` to API
- Wire `FollowingFeedPage.jsx` to API
- Add Like + Bookmark buttons on `PostCard` and `PostDetailPage` (optimistic UI: update state immediately, roll back on error)
- Comment list + form on `PostDetailPage` (no nested replies, exclude `isDeleted`)
- Follow button on author byline
- **Related-posts widget** at bottom of `PostDetailPage` — calls `/api/posts/:slug/related` and renders 5 cards
- Tag chips on cards (clickable → filter on home/search)
- Cover image upload in editor

### End of Day 3 demo

> Full user flow: read a post → react → bookmark → follow author → comment → see related posts → click a related post.

---

## Day 4 — Deploy + polish + demo (+ stretch if time)

### Person A — Backend deploy

- Deploy backend to Fly.io (`fly launch`, `fly secrets set DATABASE_URL=... JWT_SECRET=... CLOUDINARY_*=...`)
- Run migration on production DB
- Run backfill-embeddings on production DB
- Smoke test all endpoints on production URL
- Buffer: bug fixes from Day 3 demo

### Person B — Frontend deploy + README + demo

- Deploy frontend to Vercel. Set `VITE_API_URL=<fly-url>`.
- Write `README.md`:
  - 1-paragraph pitch
  - Architecture diagram (boxes + arrows; can be hand-drawn or [excalidraw](https://excalidraw.com))
  - "How semantic search works" — 5 lines: embedding → pgvector → cosine
  - Screenshots of: home, post detail, search semantic mode, related posts widget
  - Deployed URL + demo credentials
  - `npm install` / `npm run dev` instructions
- Record 30-second demo GIF: register → write post → search semantically → see related posts. Use [Kap](https://getkap.co) or screen recorder.
- Buffer: bug fixes
- Update CV with the 3-bullet description from SPEC.md

### Stretch — Real-time comments (only if Days 1–3 hit on time)

- Backend (A): install `socket.io`. Init in server.js. Hook into POST comments controller — after `prisma.comment.create`, emit `comment:new` to room `post:${postId}`.
- Frontend (B): install `socket.io-client`. PostDetailPage `useEffect` joins/leaves the room on mount/unmount. On `comment:new` event, prepend to comment list.
- Cost: ~3 hours for both sides. Adds a strong "real-time" bullet to CV.

---

## Conventions

### MVP scope guard — DO NOT BUILD

The schema includes these tables, but **MVP has no endpoints, no UI, no agent work for them**:

- `notifications` (no API, no Socket.IO push for these)
- `categories`, `post_categories` (tags only)
- `post_views` (deferred to stretch)
- OAuth fields (`oauthProvider`, `oauthId`)
- `nickname` (designed for future @mentions)
- `isBanned` flag (no admin UI in MVP)

If your agent suggests building any of these because "the table exists" — refuse and stay on task.

### Branches

- `main` — always deployable. Protected, no direct push.
- `feat/<short>` — short-lived (≤24h), squash-merge to main.
- One person → one feature branch at a time. Never long-running.

### Commits

- Conventional-ish: `feat: add semantic search`, `fix: jwt expiry`, `chore: seed data`
- < 72 chars subject line

### PRs

- Open as **draft** early for visibility.
- Description includes:
  - **What changed** (1–2 lines)
  - **AI-assisted notes**: e.g. _"Most route handlers AI-generated; embedding pipeline architecture and error handling hand-written."_
  - **Anything to watch**: surprising changes, new dependencies
- Auto-merge after a teammate's glance + green CI (don't wait overnight on a 4-day sprint).

### Schema ownership

- **Person A owns Prisma schema.** Person B requests changes via Discord.
- Every schema change ships with a migration in the same PR.
- Migration naming: Prisma default (`<timestamp>_<short_description>`) is fine.

### Env vars

- Every new env var goes into `.env.example` in the same commit.
- Required:
  - `DATABASE_URL`
  - `JWT_SECRET` (64 random chars)
  - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
  - `VITE_API_URL` (frontend)

### Validation + errors

- **Validation:** zod for all request bodies/queries
- **Error format:** `{ error: { code: string, message: string, details?: any } }`
- **Status codes:** 400 validation, 401 unauth, 403 forbidden, 404 not found, 409 conflict, 500 server
- One central error-handling middleware on the backend

### Folder structure (backend)

```
backend/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.js
├── scripts/
│   └── backfill-embeddings.js
├── src/
│   ├── routes/        # auth.js, posts.js, search.js, comments.js, ...
│   ├── controllers/   # business logic
│   ├── services/      # embed.js, search.js
│   ├── middleware/    # auth.js, error.js
│   ├── lib/           # prisma.js, jwt.js
│   └── server.js
├── .env.example
└── package.json
```

### Folder structure (frontend) — already started

```
frontend/src/
├── pages/
│   ├── auth/          # Login, Register
│   ├── feed/          # Home, Following, Bookmarks, Search
│   ├── posts/         # PostDetail, CreatePost, EditPost
│   └── dashboard/     # MyPosts
├── components/
│   ├── shared/        # PostCard, PostRow, Button, Pagination, Tabs
│   └── post/          # CommentList, RelatedPosts, LikeButton, BookmarkButton
├── layouts/           # AuthLayout, MainLayout, DashboardLayout
├── contexts/          # AuthContext
├── lib/               # api.js (axios), auth.js
└── App.jsx
```

---

## AI Agent Workflow

The agent is a force multiplier — but only if you keep it on a leash. Two people both letting Claude run wild on the same repo will produce a mess.

### Per-session ritual

Before _every_ Claude Code session:

1. `git pull` on `main`. Start a fresh `feat/<task>` branch.
2. Make sure `CLAUDE.md`, `SPEC.md`, and `PLAN.md` are loaded in the agent's context (Claude Code reads `CLAUDE.md` automatically; reference the others explicitly).
3. Pick **one** task from your column on the kanban (one issue → one PR).
4. Tell the agent: _"I'm implementing task X per SPEC.md section Y. Write code + tests. Show me the diff before applying."_
5. Review the diff line-by-line. Reject anything you don't understand.
6. Run dev server + tests. Paste errors back to the agent. Iterate.
7. Commit, push, open PR, ping teammate in Discord.

### Non-negotiables

- **Do not** let the agent design the API or schema. The SPEC is the design.
- **Do not** let the agent change the Prisma schema unless that's your assigned task.
- **Do not** let the agent install random packages. Vet every new dependency.
- **Do not** let the agent build endpoints/UI for the "DO NOT BUILD" tables above just because the schema has them.
- **Do not** both work on the same file at the same time. The kanban prevents this — only one person should have a task in `Doing` that touches a given area.
- **Always** review every diff. Never blanket-accept.
- If the agent wrote code you don't fully understand, ask it to explain and add inline comments. **You will need to defend this code in an interview.**

### Speed tips

- Write a failing test first → ask agent to make it pass. Faster than back-and-forth.
- Paste error output verbatim → let agent fix. Don't summarize errors.
- Have the agent generate seed data, mocks, and README boilerplate. These are pure-typing tasks where it shines.
- Have the agent write zod schemas from a description; reuse them on both frontend and backend.

### Tracking what the AI did

For each PR description, add a one-line note like:

> _AI-assisted: route handlers, zod schemas, tests. Hand-written: schema design, embedding pipeline architecture, error handling logic._

Three months from now in an interview, you'll thank yourself.

---

## Sync rhythm

- **10am sync** (10 min): "Here's what I'm doing today. Here's what I'm blocked on." Adjust kanban if needed.
- **9pm sync** (10 min): "Here's what shipped. Here's what's broken. Plan for tomorrow."
- **Discord async otherwise.** Reply within ~30 min during working hours.
- **Voice/video** if any thread takes more than 3 messages.
- **Merge to main daily, minimum.** No overnight branches.

---

## What kills 2-person sprints (so don't do these)

- Designing in real-time during the sprint instead of on Day 0
- Long-lived feature branches (>1 day)
- Both people editing Prisma schema in parallel
- Letting the agent merge PRs unattended
- Skipping the morning sync because "we're behind" (you're behind _because_ you skipped)
- Adding scope mid-sprint ("oh, what if we also add OAuth?") — write it down, ignore until after launch
- Trying to convert all 18 mock pages to JSX (we cut to 10 — stick to the cut)
- Building Notification/Category/PostView endpoints because the schema has them
- Spending Day 4 on "one more feature" instead of deploy + README + demo GIF

---

## Definition of Done (Day 4 evening)

- [ ] App is deployed and accessible at a public URL
- [ ] Demo credentials work; a recruiter clicking the link can register, write a post, search semantically, and see related posts within 60 seconds
- [ ] README has architecture, screenshots, deployed URL, demo creds
- [ ] 30-second demo GIF embedded in README
- [ ] Both people have updated their CV with the project + 3-bullet description
- [ ] Repo is pinned on both people's GitHub profiles
