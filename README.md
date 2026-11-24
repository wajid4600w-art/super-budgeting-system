<div align="center">

# 💰 Super Budgeting System (SBS)

**A modern, browser-based personal finance & budgeting app with AI-powered receipt scanning, voice capture, and financial insights.**

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![Status](https://img.shields.io/badge/status-active-success)

</div>

---

## 📖 Overview

**Super Budgeting System (SBS)** is a full-featured personal finance manager that runs in your browser (with a lightweight Node.js backend). It helps you track income and expenses, set category and global budgets, build savings goals, automate recurring bills, scan receipts with OCR, dictate transactions with your voice, and get AI-assisted financial insights — all wrapped in a polished, responsive, dark/light UI.

Your data is stored locally in your browser (`localStorage`), so it works instantly without a database setup. An optional Node server adds Gemini/OpenRouter AI endpoints for receipt OCR and voice parsing.

---

## ✨ Features

### Core finance
- **Dashboard** with income, expenses, net balance, budget status, charts, and recent activity
- **Transactions** — add, edit, delete income & expenses with categories, notes, and receipts
- **Budgets & limits** — global monthly ceiling + per-category limits with used/remaining/percentage, warning thresholds, and exceeded alerts
- **Savings goals** — create targets, deposit funds, track progress and deadlines
- **Recurring bills** — daily/weekly/monthly/yearly schedules with pause/resume and due-bill execution
- **Reports** — monthly/custom date-range statements with category breakdowns, CSV export, and print/save-as-PDF

### Smart capture
- **Receipt scanning** — live camera, phone camera, image upload, **drag & drop**, or **Ctrl+V paste**
- **Two-stage OCR** — Gemini vision text extraction + structured parsing, with **Tesseract.js** on-device fallback
- **Voice capture** — Web Speech API dictation, MediaRecorder audio, or audio upload; Gemini transcription + NLP parsing
- **Review before save** — edit every extracted field before confirming

### AI & insights
- **AI financial advisor** — spending patterns, budget pace, period comparisons, and non-binding suggestions
- **Model fallback** — Gemini primary, Nemotron fallback
- **AI control** — enable/disable analysis; output is always advisory

### Experience
- **Green/pastel + obsidian** responsive design (lime, indigo, cobalt, coral accents)
- **Dark & light themes** with a collapsible **hover-to-expand sidebar** (with pin)
- **Multi-account** switching (localStorage-backed)
- **Animated hero** with interactive floating bubbles and count-up metrics
- **Notifications** center with unread state
- **Multi-currency** display (SAR, USD, EUR, GBP, AED) with conversion helpers
- **Professional PDF/print** report template
- **Data export/import** (JSON) and explicit data deletion
- **Accessibility** — reduced-motion support, keyboard-friendly modals

---

## 🔐 Authentication

The app ships with a built-in, zero-dependency authentication system (Node `crypto`):

- **Create account** — full name, username/email, password, a **secret question**, and automatic **TOTP** (authenticator app) setup shown as a secret key + `otpauth://` link.
- **Login** — password + **6-digit authenticator code** (TOTP / RFC 6238, 30s window).
- **Account recovery** — reset your password using your **secret question** answer.
- **Security** — passwords hashed with **scrypt** (per-user salt), TOTP verified with a ±1 step window, **HttpOnly** signed session cookies, and **rate limiting** on login/recovery.
- **Per-user data** — each account's financial data is stored separately in the browser (namespaced by username).
- **Sign out** — logout button in the sidebar footer.

User accounts and sessions are stored server-side in `data/` (git-ignored). When you open the app unauthenticated, you're redirected to `login.html`.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| Frontend | HTML5, Tailwind CSS (CDN), Lucide icons, Chart.js, Tesseract.js |
| Backend | Node.js (zero-dependency HTTP server, `crypto` for auth) |
| AI | Google Gemini (vision/audio/text), OpenRouter (Nemotron fallback) |
| Auth | scrypt password hashing, RFC-6238 TOTP 2FA, signed session cookies |
| Storage | Server `data/` (accounts) + browser `localStorage` (per-user finance) |
| Speech | Web Speech API, MediaRecorder |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+**
- A modern browser (Chrome/Edge recommended for camera, microphone & Web Speech)
- *(Optional)* Gemini and/or OpenRouter API keys for AI features

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/wajid4600w-art/super-budgeting-system.git
cd super-budgeting-system

# 2. (Optional) install dependencies — the server has zero npm deps
npm install

# 3. Configure environment variables
cp .env.example .env
# then edit .env and add your API keys

# 4. Start the app
npm start
```

Open **http://localhost:3000** in your browser.

> On Windows you can also double-click `run_app.bat`.

---

## ⚙️ Configuration

Create a `.env` file in the project root (see `.env.example`):

```env
PORT=3000
GEMINI_API_KEY=your_gemini_key
OPENROUTER_API_KEY=your_openrouter_key

# Optional: Supabase cloud database (users, finance, feedback) + /admin
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_TOKEN=change_me_admin_token
```

### Cloud database (optional, Supabase free tier)
> Full step-by-step setup (project creation, SQL, env vars, deploy, admin) is in **[`SUPABASE_SETUP.md`](SUPABASE_SETUP.md)**.

When `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` are set, the server stores **users, per-user finance state, and feedback** in Supabase Postgres instead of local files. Create these tables once in the Supabase SQL editor:

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
create table if not exists admin_config (id int primary key default 1, admin_token text not null);
insert into admin_config (id, admin_token) values (1, 'change_me_admin_token') on conflict (id) do nothing;
alter table app_users enable row level security;
alter table finance_state enable row level security;
alter table feedback enable row level security;
alter table admin_config enable row level security;
-- No anon policies: only the server's service role can read/write.
```

Then open **`/admin.html`**, enter the admin token, and you'll see total users (name, username, email, joined) and all feedback (who, when, message).

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/ai/status` | GET | Reports whether server-side AI providers are configured |
| `/api/ai/ocr` | POST | Receipt vision OCR + structured parsing |
| `/api/ai/ocr-text` | POST | Parse already-extracted receipt text |
| `/api/ai/voice-parse` | POST | Parse spoken/typed phrases |
| `/api/ai/voice-audio` | POST | Transcribe audio + parse transaction |
| `/api/ai/advisor` | POST | Financial wellness analysis & recommendations |
| `/api/finance/load` · `/api/finance/save` | GET · PUT | Load/save per-user finance state (Supabase) |
| `/api/feedback` | POST | Store user feedback/complaints |
| `/api/admin/data` | GET | Admin-only: users + feedback (requires `x-admin-token`) |

> **Security:** never commit secrets. `.env` is git-ignored. Keys set in the browser/localStorage are visible to users on static hosts — prefer server-side environment variables for public deployments.

---

## 📖 Usage

1. **Add a transaction** — click **Add Transaction** in the header and choose Manual, Scan Receipt, or Voice.
2. **Scan a receipt** — drag & drop an image, paste with **Ctrl+V**, use the camera, or upload a file; review the extracted fields, then confirm.
3. **Dictate** — use **Voice** to speak a phrase or record/upload audio.
4. **Set budgets** — open **Budgets & Limits** to edit the global ceiling and each category limit (with a proper edit popup and a ✕ to delete categories).
5. **Reports** — open **Financial Reports** to view/print/save a statement, or export CSV/JSON.
6. **Account** — sign in / out from the sidebar footer; each account's finance data is stored separately (and synced to Supabase when configured).

---

## 📁 Project Structure

```text
super-budgeting-system/
├── index.html            # Main web interface (markup, Tailwind config, CSS)
├── login.html            # Login / register (with TOTP) / recover page
├── admin.html            # Protected developer view (users + feedback)
├── app.js                # Application state, rendering & client logic
├── server.js             # Node HTTP server + auth + AI API endpoints
├── package.json          # Node start configuration
├── run_app.bat           # Windows local launcher
├── .env.example          # Environment variable template
├── SUPABASE_SETUP.md     # Full Supabase configuration guide (SQL + steps)
├── data/                 # (git-ignored) user accounts & sessions
├── PROJECT_PROPOSAL.md   # Requirements / proposal
├── PROJECT_PROPOSAL.html # Rendered proposal
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Open a Pull Request

For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

Released under the **MIT License** — see [`LICENSE`](LICENSE) for details.

---

## 🙏 Acknowledgements

- [Tailwind CSS](https://tailwindcss.com), [Lucide](https://lucide.dev), [Chart.js](https://www.chartjs.org), [Tesseract.js](https://github.com/naptha/tesseract.js)
- Google Gemini & OpenRouter for AI capabilities

---

<div align="center">
Made with 💚 for better personal finance.
</div>