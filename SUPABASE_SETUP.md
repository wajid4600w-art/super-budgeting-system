# Supabase Setup — Full Configuration Guide

This guide configures the app so **user accounts, per-user finance data, and feedback** are stored in Supabase, and the protected **/admin** page works.

> **Hosting note:** `server.js` must be running for auth + Supabase + `/admin`. **GitHub Pages is static and cannot run `server.js` or hold the service key.** Use a Node host (Render free recommended).

---

## Prerequisites
- A free **Supabase** account (supabase.com).
- A free **Render** account (render.com) — or any Node host (Railway/VPS).
- **Node.js 18+** locally for testing.

---

## Step 1 — Create the Supabase project
1. supabase.com → **New project**.
2. Set a name (e.g., `sbs`) and a **database password** (save it), pick a region.
3. Wait for provisioning, then open the project.

## Step 2 — Create the database tables
Open **SQL Editor → New query**, paste and run:

```sql
create table if not exists app_users (
  id text primary key, name text not null, username text unique not null,
  email text, password_hash text not null, secret_question text,
  secret_answer_hash text, totp_secret text, created_at timestamptz default now());

create table if not exists finance_state (
  user_id text primary key references app_users(id) on delete cascade,
  data jsonb not null, updated_at timestamptz default now());

create table if not exists feedback (
  id uuid primary key default gen_random_uuid(),
  user_id text references app_users(id) on delete set null,
  username text, message text not null, created_at timestamptz default now());

create table if not exists admin_config (
  id int primary key default 1, admin_token text not null);

insert into admin_config (id, admin_token)
values (1, 'REPLACE_WITH_A_STRONG_ADMIN_TOKEN')
on conflict (id) do nothing;

alter table app_users enable row level security;
alter table finance_state enable row level security;
alter table feedback enable row level security;
alter table admin_config enable row level security;
-- No anon policies: only the server's service role can read/write.
```

Verify the 4 tables exist: `app_users`, `finance_state`, `feedback`, `admin_config`.

## Step 3 — Collect connection values
Supabase → **Project Settings → API**:
- **Project URL** → `SUPABASE_URL`
- **service_role** secret → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ never expose in the browser or commit it)

## Step 4 — Configure `.env` (local)
Copy `.env.example` → `.env`, then set:

```env
PORT=3000
GEMINI_API_KEY=your_gemini_key
OPENROUTER_API_KEY=your_openrouter_key
SUPABASE_URL=https://<ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
ADMIN_TOKEN=<same value as admin_config.admin_token>
```

`.env` is git-ignored.

## Step 5 — Run locally and verify
1. `npm install` (if needed) → `npm start` (or `run_app.bat`).
2. Open `http://localhost:3000` → redirects to `login.html`.
3. **Create Account** → scan the QR with an authenticator app → **Login** with password + 6-digit code.
4. First-time **Quick Setup** modal → set name/currency/threshold/theme → Save → onboarding tour.
5. Add a transaction → Supabase **Table Editor → finance_state** shows a row.
6. **About (info icon) → Send Feedback** → `feedback` table has a row (username + message + created_at).
7. Open `http://localhost:3000/admin.html` → enter `ADMIN_TOKEN` → see **Total Users**, users table, and feedback.

## Step 6 — Deploy the Node server (Render free)
1. Render → **New → Web Service** → connect the repo.
2. Build: `npm install` (or blank). Start: `npm start`.
3. **Environment Variables**: `GEMINI_API_KEY`, `OPENROUTER_API_KEY` (optional), `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_TOKEN` (same as admin_config). Do not set `PORT`.
6. Deploy, then repeat Step 5 against `https://<name>.onrender.com` (free tier sleeps when idle).

## Step 7 — (Optional) Custom domain
Render → Settings → Custom Domains. No CORS changes if same-origin.

## Step 8 — Security checklist
- [ ] `service_role` key only in server env (never in HTML/JS/git).
- [ ] `.env` git-ignored.
- [ ] RLS enabled on all tables, **no anon policies**.
- [ ] Strong `ADMIN_TOKEN` matching `admin_config.admin_token`.
- [ ] `/api/admin/data` never returns `password_hash`/`totp_secret`.
- [ ] HTTPS in production.

## Step 9 — Verification
- [ ] Unauthenticated `/` → 302 to `/login.html`.
- [ ] Register → login (password + TOTP) works.
- [ ] Finance edits persist in `finance_state`.
- [ ] Feedback appears in `feedback`.
- [ ] `/admin.html` shows correct user count + names/usernames + feedback.
- [ ] Anon key (no service key) cannot read tables (RLS).

## Troubleshooting
- **/admin 503 "Supabase is not configured"** → env vars missing on the running server.
- **Login fails after deploy** → env vars not set/wrong on Render.
- **Finance not syncing** → check service key/RLS; server logs.
- **Invalid admin token (403)** → `ADMIN_TOKEN` must equal `admin_config.admin_token`.
- **CORS errors** → only if API and frontend are different origins.

---

## Notes
- Pure GitHub Pages (static) hosting is **not** supported by this design.
- Supabase Auth is not used; custom scrypt + TOTP auth is kept, with users in `app_users`.
- Existing `data/users.json` users are not auto-migrated; local finance auto-uploads on first login.