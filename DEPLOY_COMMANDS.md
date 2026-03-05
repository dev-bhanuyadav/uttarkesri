# Deployment — Exact Commands to Run

## 1. Verify .env is not committed

```bash
git status | findstr ".env"
```

**Expected:** No output (or only `.env.example` if you chose to track it).  
If `.env` or `.env.local` appears, **do not commit** — add them to `.gitignore` and run `git status` again.

---

## 2. Initialize Git and first commit

```bash
git init
git add .
git status
git commit -m "feat: Uttar Kesri — production ready build"
```

---

## 3. Push to GitHub

1. On [github.com](https://github.com) → **New repository**.
2. Name: `uttar-kesri`.
3. Visibility: **Private**.
4. **Do not** initialize with README, .gitignore, or license.
5. Click **Create repository**.
6. Copy the repository URL (e.g. `https://github.com/YOUR_USER/uttar-kesri.git`).

Then run (replace `YOUR_GITHUB_URL_HERE` with that URL):

```bash
git remote add origin YOUR_GITHUB_URL_HERE
git branch -M main
git push -u origin main
```

---

## 4. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New** → **Project**.
2. Import the `uttar-kesri` repository.
3. **Framework Preset:** Next.js (auto-detected).
4. **Root Directory:** leave default.
5. **Build Command:** `npm run build` (default).
6. **Output Directory:** leave default.
7. **Install Command:** `npm install` (default).
8. Add **Environment Variables** (see `VERCEL_ENV_CHECKLIST.md`). Minimum: `DATABASE_URL`, `DIRECT_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `NEXT_PUBLIC_SITE_URL`.
9. Deploy. After first deploy, set `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to the generated Vercel URL and redeploy if needed.

---

## 5. Local production test (optional)

With `DATABASE_URL` and `DIRECT_URL` set in `.env`:

```bash
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) and confirm the homepage loads and there are no console errors.
