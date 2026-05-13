# CLAUDE.md — Project Context for the Agent

> **Read this file at the start of every session.** This overrides any defaults from training data.
> Claude Code reads `CLAUDE.md` automatically when present in the repo root.

---

## Project: DevBlog

A technical blog platform built for a 4-day MVP sprint by 2 developers. Built to be CV-grade — the differentiator is **semantic search + content-based recommendations using pgvector**.

---

## Source of truth

Read these in order before doing anything:

1. **`SPEC.md`** — what we're building (features, schema additions, API surface)
2. **`PLAN.md`** — how we're building it (day split, conventions, AI rules)
3. **`prisma/schema.prisma`** — database schema (already designed by the team)

If your task conflicts with any of these, **STOP and ask** — don't decide for yourself.

---

## Hard constraints (do not violate)

- This is a **4-day sprint**. Every line of code must serve the MVP cuts in SPEC.md.
- The hero feature is **semantic search via pgvector**. Treat it as priority #1.
- **Some tables exist in the schema that have NO endpoints in MVP.** Do not build for these unless explicitly asked:
  - `notifications`
  - `categories`, `post_categories`
  - `post_views`
  - OAuth fields on `users`
  - `nickname` on `users`
  - `isBanned` flag
- **Person A owns Prisma schema.** Do not modify the schema unless that's the assigned task.
- Do not install new dependencies without explicit approval.
- Do not "improve" things outside the scope of the current task.
- Always show diffs before applying. Never blanket-apply edits.

---

## Tech stack (locked)

- **Frontend:** React + Vite + React Router + Tailwind + Material Symbols
- **Backend:** Node + Express + Prisma + zod
- **DB:** PostgreSQL (Neon) + pgvector extension
- **Embeddings:** `@xenova/transformers` (`Xenova/all-MiniLM-L6-v2`, 384-dim, runs in Node — no API key)
- **Auth:** JWT + bcrypt
- **Image upload:** Cloudinary
- **Real-time (stretch only):** Socket.IO
- **Hosting:** Vercel (frontend) + Fly.io (backend)

---

## Conventions

- **Validation:** zod for all request bodies/queries
- **Error format:** `{ error: { code: string, message: string, details?: any } }`
- **HTTP status codes:** 400 / 401 / 403 / 404 / 409 / 500
- **Repo layout:** monorepo with `/backend` and `/frontend`
- **Branch naming:** `feat/<short>` — short-lived, ≤24h
- **Commits:** `feat: ...`, `fix: ...`, `chore: ...`, < 72 chars subject
- **Schema models** are camelCase Prisma → snake_case Postgres tables via `@@map`
- **Primary keys:** UUID via `@default(uuid()) @db.Uuid`

---

## Key implementation notes

### Embeddings (the hero feature)

- Use `@xenova/transformers` pipeline `'feature-extraction'` with `'Xenova/all-MiniLM-L6-v2'` → 384-dim Float32Array
- **Cache the pipeline across calls** (don't reload the model on every request — first load is ~5s)
- Generate embedding when a post transitions to `status='published'`
- Source text: `${title}\n\n${excerpt}`

### Vector storage in Prisma

- Prisma does **NOT** have native vector support. The `embedding` field on `Post` uses `Unsupported("vector(384)")`.
- Read/write via raw SQL:
  - **Insert/update:** `prisma.$executeRaw` with vector formatted as `'[0.1, -0.2, ...]'::vector`
  - **Similarity query:** `prisma.$queryRaw` with `ORDER BY embedding <=> $queryVec::vector LIMIT N`
- The `<=>` operator is cosine distance (0 = identical, 2 = opposite)

### Frontend state

- **9 of 10 MVP pages already exist as JSX with hardcoded dummy data.** Replace dummy data with real API calls — don't rebuild the components.
- **3 pages are still raw HTML in the project root** (`code_post_detail_devblog_code.html`, `code_create_new_post_devblog_code.html`, `code_edit_post_devblog_code.html`) and need conversion to JSX.

---

## When responding

- If the task is ambiguous, ask **one** short clarifying question instead of guessing.
- Don't invent endpoints, fields, or features not in SPEC.md.
- Don't summarize the work after coding — show the diff and let the human review.
- If you find a bug or design issue while doing your task, **note it as a comment** but don't fix it. Discuss with the human.
- Cite which file you're editing before showing the diff.
- For any code you generate that's non-trivial, add a short inline comment explaining the _why_. The human will need to defend this code in interviews.

---

## What this project is for

This is a CV/portfolio project. The goal is **not** to build a complete production blog — it's to build a small, polished system with one impressive feature (semantic search) that gets the developer into interviews.

When making tradeoffs, prefer:

- **Demo-able over feature-complete**
- **Hero feature working end-to-end over many features half-built**
- **Clean, defensible code over clever code**
- **Shipping on Day 4 over shipping more on Day 5**
