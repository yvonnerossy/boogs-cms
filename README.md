# Boogs Community Management System — Brgy. Kapatungan

Public registration (`index.html`) + admin portal (`admin.html`), backed by Supabase `registrants` table.

## What you already did (Supabase)

Run this in **Supabase → SQL Editor** if not done yet:

```sql
create table registrants (
  id text primary key,
  hof_name text,
  hof_phone text,
  hof_age text,
  hof_purok text,
  members jsonb default '[]',
  date timestamptz default now()
);

alter table registrants enable row level security;
create policy "Public insert" on registrants for insert with check (true);
create policy "Public select" on registrants for select using (true);
create policy "Public delete" on registrants for delete using (true);
```

Get your API keys: **Project Settings → API** → Project URL and **anon public** key.

---

## Local test (before GitHub)

1. Open Terminal in this folder.
2. Copy config for local use:
   ```bash
   cp config.example.js config.js
   ```
3. Edit `config.js` — paste your Supabase URL and anon key; change `ADMIN_PASS`.
4. Serve the folder (any static server), e.g.:
   ```bash
   npx --yes serve .
   ```
5. Open `http://localhost:3000` (registration) and `http://localhost:3000/admin.html` (admin).

Submit a test household and confirm it appears in **Supabase → Table Editor → registrants**.

---

## Step 1 — GitHub

### A. Install Git (if needed)

On Mac, if `git` fails, install **Xcode Command Line Tools** when prompted, or install [Git](https://git-scm.com/download/mac).

### B. Create a GitHub repository

1. Go to [github.com/new](https://github.com/new).
2. Name it e.g. `boogs-kapatungan`.
3. Choose **Private** (recommended — admin password is in env, but repo is still safer private).
4. Do **not** add README, .gitignore, or license (this project already has them).
5. Click **Create repository**.

### C. Push this project

In Terminal:

```bash
cd /Users/yvonneblanco/Projects/boogs-kapatungan

git init
git add .
git commit -m "Initial commit: Kapatungan registration site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/boogs-kapatungan.git
git push -u origin main
```

Replace `YOUR_USERNAME` and repo name with yours. Use GitHub’s suggested URL if you use SSH.

**Note:** `config.js` is gitignored. Keys go in Vercel env vars (next step), not in the repo.

---

## Step 2 — Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (use **Continue with GitHub**).
2. **Add New… → Project**.
3. **Import** your `boogs-kapatungan` repository.
4. Framework Preset: **Other** (static site).
5. **Environment Variables** — add these (Production, Preview, Development):

   | Name | Value |
   |------|--------|
   | `SUPABASE_URL` | `https://xxxxx.supabase.co` |
   | `SUPABASE_ANON_KEY` | your anon public key |
   | `ADMIN_USER` | your admin username |
   | `ADMIN_PASS` | strong password (not `admin123`) |

6. Click **Deploy**.

After deploy:

- **Public site:** `https://your-project.vercel.app/`
- **Admin:** `https://your-project.vercel.app/admin.html`

Each deploy runs `npm run build`, which generates `config.js` from those variables.

---

## Step 3 — Custom domain (optional)

Vercel project → **Settings → Domains** → add your domain and follow DNS instructions.

---

## Security reminders

- Change default admin password via `ADMIN_PASS` on Vercel.
- Your RLS allows anyone with the anon key to read/delete all rows. For a real election, tighten policies later (e.g. insert-only for public, restrict delete to service role).
- The anon key will be visible in the browser — that is normal for Supabase client apps; security comes from RLS policies.

---

## Project files

| File | Purpose |
|------|---------|
| `index.html` | Public registration landing page |
| `admin.html` | Admin login, dashboard, registrants, CSV export |
| `config.example.js` | Local dev template |
| `scripts/write-config.js` | Builds `config.js` on Vercel |
| `supabase-setup.sql` | Copy of your SQL schema |
