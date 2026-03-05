# उत्तर केसरी | Uttar Kesri

**उत्तर प्रदेश की आवाज़** — Full-stack Indian regional news portal for Uttar Pradesh.

## Tech stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Zustand, TanStack Query, Framer Motion
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL 16

## Local setup

### One-command setup

```bash
npm run setup
```

This installs dependencies, generates Prisma client, pushes the schema to the database, and runs the seed.

### Manual steps

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env` and set `DATABASE_URL` to your PostgreSQL connection string.

   ```bash
   cp .env.example .env
   ```

3. **Database**

   ```bash
   npx prisma generate
   npx prisma db push
   npm run seed
   ```

4. **Run dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable              | Description                    | Example                          |
|-----------------------|--------------------------------|----------------------------------|
| `DATABASE_URL`        | PostgreSQL connection string   | `postgresql://user:pass@localhost:5432/uk` |
| `NEXT_PUBLIC_APP_URL` | Base URL for API calls         | `http://localhost:3000`         |

See `.env.example` for optional variables (NextAuth, Cloudinary, etc.).

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run setup` — Install + Prisma generate + db push + seed
- `npm run seed` — Run Prisma seed (75 districts, categories, authors, 50 articles, ticker)
- `npm run db:studio` — Open Prisma Studio
- `npm run lint` — Run ESLint

## Project structure

- `app/` — Next.js App Router (pages, layout, API routes)
- `app/(root)/` — Public routes (article, category)
- `app/(admin)/` — Admin dashboard (articles, ticker)
- `components/` — Atoms, molecules, organisms
- `templates/` — Page templates (Home, Article)
- `lib/` — Prisma, utils, API helpers
- `store/` — Zustand UI store
- `hooks/` — useScrollProgress, etc.
- `types/` — TypeScript types
- `prisma/` — Schema and seed

## Admin

- **Dashboard:** [/admin](http://localhost:3000/admin)
- **Articles list:** [/admin/articles](http://localhost:3000/admin/articles)
- **New article:** [/admin/articles/new](http://localhost:3000/admin/articles/new)
- **Ticker:** [/admin/ticker](http://localhost:3000/admin/ticker)

No auth is configured by default. Add NextAuth and protect these routes in production.

## Seed data

The seed creates:

- All 75 UP districts (Hindi names + divisions)
- 12 main categories (राजनीति, खेल, मनोरंजन, etc.)
- 5 sample authors
- 50 sample Hindi articles (published)
- 3 breaking ticker items

## Deployment

- **Frontend:** Vercel (recommended)
- **Database:** Supabase, Neon, or any PostgreSQL host
- Set `DATABASE_URL` and run migrations (`prisma db push` or `prisma migrate deploy`) before first deploy.

## License

Private / All rights reserved.
