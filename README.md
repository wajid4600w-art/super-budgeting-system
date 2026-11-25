<div align="center">

# 💰 Super Budgeting System (SBS)

**A modern, browser-based personal finance & budgeting app with Google login, two-factor authentication, AI receipt scanning, voice capture, and cloud storage — built to run on static hosting (GitHub Pages).**

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-FFCA28?logo=firebase&logoColor=black)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)
![Status](https://img.shields.io/badge/status-active-success)

</div>

---

## 📖 Overview

**Super Budgeting System (SBS)** is a full-featured personal finance manager that runs entirely in the browser and deploys to **static hosting (GitHub Pages)** — no server required for the live site.

It provides income/expense tracking, global and per-category budgets, savings goals, recurring bills, financial reports (print/save-as-PDF), receipt OCR, voice capture, and AI financial insights, wrapped in a responsive **dark/light** UI with a **lime + lavender + obsidian** design system.

Accounts are secured with **Firebase Authentication** (Google Sign-In or email/password) plus **TOTP two-factor authentication** (authenticator app + QR). Per-user finance and feedback are stored in **Cloud Firestore** with security rules. AI features call **Google Gemini** through a **Cloudflare Worker proxy** so the API key stays server-side and private.

---

## ✨ Features

### Core finance
- **Dashboard** — income, expenses, net balance, budget status, charts, recent activity, savings and recurring previews
- **Transactions** — add, edit, delete income & expenses with categories, notes and receipts
- **Budgets & limits** — global monthly ceiling + per-category limits with used/remaining/percentage, warning thresholds, exceeded alerts, and **in-app notifications** when exceeded
- **Savings goals** — create targets, deposit funds, track progress and deadlines
- **Recurring bills** — daily/weekly/monthly/yearly schedules with pause/resume and due-bill execution
- **Reports** — monthly/custom date-range statements, category breakdown, CSV export, and a **professional print/save-as-PDF** template

### Smart capture
- **Receipt scanning** — live camera, phone camera, image upload, **drag & drop**, or **Ctrl+V paste** (works directly in the Add Transaction modal)
- **Two-stage OCR** — Gemini vision text extraction + structured parsing, with **Tesseract.js** on-device fallback
- **Voice capture** — Web Speech API dictation, MediaRecorder audio, or audio upload; Gemini transcription + NLP parsing
- **Review before save** — edit every extracted field before confirming
- **Live countdown** while the AI processes an image

### AI & insights
- **AI financial advisor** — spending patterns, budget pace, period comparison, and non-binding suggestions
- **Model** — `gemini-3.5-flash-lite` (fallback `gemini-2.0-flash` / `gemini-1.5-flash`)
- **Secure key handling** — via the Cloudflare Worker proxy (server-side key); a user can override with their own key in Settings
- **AI control** — enable/disable analysis; output is always advisory

### Experience
- **Google Sign-In** (Firebase Auth) + **TOTP 2FA** (authenticator app + QR)
- **Remember me for 30 days**
- **Dark & light themes** with a **hover-to-expand, pinnable sidebar**
- **Animated hero** with interactive floating bubbles and count-up metrics
- **Notifications** center with unread state
- **Multi-currency** (SAR, USD, EUR, GBP, AED + more) with live exchange-rate helpers
- **Data export/import** (JSON) and explicit data deletion
- **Accessibility** — reduced-motion support, keyboard-friendly modals

---

## 🔐 Authentication & Security

- **Firebase Authentication**: Google Sign-In **and** email/password.
- **Two-factor (TOTP)**: on first login the user scans a **QR code** with Google Authenticator/Authy; a 6-digit code is required on later logins. The secret is stored per-user in Firestore (`users/{uid}`).
- **Remember me**: optional 30-day session (`sbs_remember_until`).
- **Per-user data isolation**: Firestore security rules ensure each user can read/write only their own `finance_state/{uid}` and `users/{uid}`.
- **Feedback**: users submit to `feedback` (create-only); viewable in the Firebase Console.
- **AI key security**: the Gemini key lives as a **Cloudflare Worker secret** (`GEMINI_KEY`) — never in the browser. A user may set their own key in Settings (personal override).
- Unauthenticated users are redirected to `login.html`.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| Frontend | HTML5, Tailwind CSS, Lucide icons, Chart.js, Tesseract.js, QRCode.js |
| Auth | Firebase Authentication (Google + email/password) |
| 2FA | Custom TOTP (RFC 6238) in `totp.js` |
| Database | Cloud Firestore (per-user finance, users, feedback) with security rules |
| AI | Google Gemini via a **Cloudflare Worker** proxy (server-side key) |
| Hosting | GitHub Pages (static) |
| Speech | Web Speech API, MediaRecorder |

---

## 🚀 Getting Started

### Prerequisites
- A **Firebase** project (free) with **Authentication** and **Firestore** enabled.
- A **Cloudflare** account (free) for the AI proxy Worker.
- A **Gemini API key** (Google AI Studio).
- A modern browser (Chrome/Edge recommended).

### 1. Configure Firebase
1. Create a Firebase project → register a **Web app** → copy the config into `firebase-config.js`.
2. **Authentication → Sign-in method** → enable **Google** and **Email/Password**.
3. **Authentication → Settings → Authorized domains** → add your `*.github.io` domain and `localhost`.
4. **Firestore → Rules** → paste `firestore.rules` → **Publish**.

### 2. Deploy the AI proxy (Cloudflare Worker)
```powershell
cd worker
npx wrangler login
npx wrangler secret put GEMINI_KEY      # paste your Gemini key (server-side secret)
npx wrangler deploy
```
Set the Worker URL in `firebase-config.js`:
```js
window.SBS_AI_PROXY_URL = "https://<your-worker>.workers.dev";
```

### 3. Run / deploy
- **Local (static):** use any static server, e.g. `npx serve .` (not `npm start`).
- **GitHub Pages:** push to `main`, then repo **Settings → Pages → Deploy from branch → main / root**.

Open the site → sign in with Google → set a password (for email login) → scan the authenticator QR → you're in.

> Full Firebase setup: [`FIREBASE_SETUP.md`](FIREBASE_SETUP.md).

---

## ⚙️ Configuration

`firebase-config.js` (public, safe):
```js
window.FIREBASE_CONFIG = { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId };
window.SBS_AI_PROXY_URL = "https://<your-worker>.workers.dev";
```

Cloudflare Worker secret (server-side, never committed):
- `GEMINI_KEY` — your Gemini API key.

Optional per-user override: **Settings → Optional Mobile AI Key**.

---

## 📖 Usage

1. **Add a transaction** — click **Add Transaction** (Smart Capture modal) → Manual, Scan Receipt, or Voice.
2. **Scan a receipt** — drag & drop, **Ctrl+V**, camera, or upload; review fields, then confirm.
3. **Dictate** — **Voice** to speak or record.
4. **Budgets** — **Budgets & Limits** to edit the global ceiling and category limits (edit popup + ✕ delete). Exceeding a limit raises a banner **and a notification**.
8. **Reports** — **Financial Reports** to view/print/save a statement or export CSV/JSON.
9. **Account** — Google or email/password + authenticator code; sign out from the sidebar.

---

## 📁 Project Structure

```text
super-budgeting-system/
├── index.html            # Main web interface (Tailwind config, CSS, app shell)
├── login.html            # Firebase login + TOTP 2FA + remember me
├── firebase-config.js    # Public Firebase config + AI proxy URL
├── totp.js               # TOTP (RFC 6238) + base32 + otpauth helpers
├── firestore.rules       # Per-user security rules (publish in Firebase)
├── app.js                # Application state, rendering & client logic
├── worker/
│   ├── worker.js         # Cloudflare Worker — secure Gemini proxy
│   └── wrangler.toml     # Worker deploy config
├── server.js             # Optional local Node server (AI endpoints; not needed on Pages)
├── package.json          # Node start configuration
├── run_app.bat           # Windows local launcher
├── FIREBASE_SETUP.md     # Firebase + GitHub Pages setup guide
├── .env.example          # (optional) local Node server env template
├── PROJECT_PROPOSAL.md   # Requirements / proposal
├── PROJECT_PROPOSAL.html # Rendered proposal
└── README.md
```

---

## 🔌 Optional local Node server (AI endpoints)

When running `server.js` locally, these endpoints are available (not used on GitHub Pages; AI uses the Worker/browser on static hosting):

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/ai/status` | GET | Reports whether server-side AI providers are configured |
| `/api/ai/ocr` | POST | Receipt vision OCR + structured parsing |
| `/api/ai/ocr-text` | POST | Parse already-extracted receipt text |
| `/api/ai/voice-parse` | POST | Parse spoken/typed phrases |
| `/api/ai/voice-audio` | POST | Transcribe audio + parse transaction |
| `/api/ai/advisor` | POST | Financial wellness analysis & recommendations |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

Released under the **MIT License** — see [`LICENSE`](LICENSE).

---

## 🙏 Acknowledgements

- [Tailwind CSS](https://tailwindcss.com), [Lucide](https://lucide.dev), [Chart.js](https://www.chartjs.org), [Tesseract.js](https://github.com/naptha/tesseract.js), [QRCode.js](https://github.com/davidshimjs/qrcodejs)
- Firebase (Auth + Firestore), Cloudflare Workers, Google Gemini

---

<div align="center">
Made with 💚 for better personal finance.
</div>