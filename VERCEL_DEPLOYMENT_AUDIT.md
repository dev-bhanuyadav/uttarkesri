# Uttar Kesri — Vercel Deployment Audit Report

**Date:** 2026-03-05  
**Scope:** Full codebase scan for deployment readiness

---

## 1. process.env variables used in codebase

| Variable | Location | Purpose |
|----------|----------|---------|
| `NODE_ENV` | lib/prisma.ts | Prisma log level (development vs production) |
| `NODE_ENV` | next.config.mjs | PWA disabled in development |
| `NEXT_PUBLIC_APP_URL` | lib/api.ts | Base URL for client-side API calls (fetch articles, ticker, etc.); falls back to `''` (same-origin) |

**No other process.env references found** in app/, lib/, components/, or templates/.

**.env.example currently lists:** DATABASE_URL, NEXT_PUBLIC_APP_URL, NEXTAUTH_URL, NEXTAUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, Cloudinary vars.  
**Recommendation:** Use `NEXT_PUBLIC_SITE_URL` for production (align with Vercel env guide) and keep `NEXT_PUBLIC_APP_URL` as alias or replace in lib/api.ts.

---

## 2. Hardcoded URLs / ports

- **app/ and lib/:** No hardcoded localhost, 127.0.0.1, or port numbers in source code.
- **.env.example:** Contains example values only (e.g. `http://localhost:3000`, `localhost:5432`). These are placeholders; no change needed except to add DIRECT_URL and expand as per Phase 3.

---

## 3. Redis / ioredis

- **Finding:** No `ioredis` or `redis` package or any `lib/redis.ts` (or similar) in the project.
- **Action:** Add `@upstash/redis` and create `lib/redis.ts` with Upstash REST client so the codebase is ready for serverless. Optional: use Redis in ticker stream or cron later.

---

## 4. Socket.io server-side

- **Finding:** No Socket.io server or socket server code in the project. Ticker is a standard GET API (`/api/ticker`) using Prisma.
- **Action:** No removal needed. Optionally add `/api/ticker/stream` (SSE) later for live ticker if desired; not required for deployment.

---

## 5. BullMQ / job queues

- **Finding:** No BullMQ, Queue, or Worker imports or usage.
- **Action:** Add `vercel.json` crons and stub API routes (`/api/cron/daily-digest`, `/api/cron/trending-refresh`, `/api/cron/sitemap`) so cron jobs are available when you add logic later. No BullMQ code to delete.

---

## 6. package.json

| Item | Status |
|------|--------|
| `"build": "next build"` | Present |
| `"postinstall": "prisma generate"` | Present |
| Serverless-incompatible packages | None identified (no ioredis, bullmq, long-running servers) |

**Requested script changes:** Add `db:migrate` (`prisma migrate deploy`), align `db:seed` with `tsx prisma/seed.ts` if seed is in prisma/ (current seed is `prisma/seed.ts`); keep `seed` script working (ts-node or tsx).

---

## 7. Prisma schema

| Item | Status |
|------|--------|
| `provider = "postgresql"` | Present |
| `url = env("DATABASE_URL")` | Present |
| `directUrl = env("DIRECT_URL")` | **Missing** — required for Vercel (Neon/serverless) |

**Action:** Add `directUrl = env("DIRECT_URL")` to datasource block.

---

## 8. next.config

- **Current:** next.config.mjs, ESM, with PWA (withPWA), images: cloudinary + unsplash. No security headers.
- **Requested:** Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy), image domain for `lh3.googleusercontent.com` (Google avatars), production-ready. Keep PWA wrapper.

---

## 9. .gitignore

- **Finding:** No project-level `.gitignore` found in repo root.
- **Action:** Create .gitignore as specified (node_modules, .next, .env*, Prisma dev db, logs, IDE, PWA generated files, .vercel).

---

## 10. API routes and dynamic behavior

- **ticker/route.ts:** Has `export const dynamic = 'force-dynamic'`.
- **articles/route.ts:** Has `export const dynamic = 'force-dynamic'`.
- Other API routes should be checked for `force-dynamic` if they use headers/cookies or dynamic data; adding it where needed is safe.

---

## Summary

- **Env vars to document:** NODE_ENV (set by Vercel), NEXT_PUBLIC_APP_URL or NEXT_PUBLIC_SITE_URL, DATABASE_URL, DIRECT_URL, plus any future NextAuth/Cloudinary/Firebase/MSG91/CRON_SECRET.
- **Code changes:** Prisma directUrl; next.config headers + lh3.googleusercontent.com + keep PWA; lib/api.ts use site URL from env; add lib/redis.ts (Upstash); add vercel.json and stub cron routes; create .gitignore and expand .env.example.
- **No Redis/Socket.io/BullMQ removal** required; none present.
