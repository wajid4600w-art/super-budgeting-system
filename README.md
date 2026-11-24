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
- **Google Sign-In** (Firebase Auth) + secure per-user cloud storage (Firestore) for finance & feedback
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

Authentication is handled by **Firebase Authentication** (works on static GitHub Pages):

- **Sign in with Google** (one click) or **email + password**.
- **Per-user data** — each account's finance is stored in Firestore at `finance_state/{uid}`, isolated by security rules (only that user can read/write).
- **Feedback** — users submit comments/reviews to the `feedback` collection; viewable in the Firebase Console.
- **Sign out** — logout button in the sidebar footer.

Unauthenticated users are redirected to `login.html`. See [`FIREBASE_SETUP.md`](FIREBASE_SETUP.md) for setup.

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

### Authentication & database (Firebase — works on GitHub Pages)
> Full step-by-step setup is in **[`FIREBASE_SETUP.md`](FIREBASE_SETUP.md)**.

The static build uses **Firebase Authentication** (Google Sign-In + email/password) and
**Cloud Firestore** for per-user finance + feedback — no server required, so it runs on
**GitHub Pages**. Configure `firebase-config.js` (public, safe) and publish `firestore.rules`.

- Each user's finance is stored at `finance_state/{uid}` (only that user can read/write).
- Feedback is stored in `feedback` (users can create; viewable in the Firebase Console).
- View users & feedback in **Firebase Console → Firestore / Authentication**.

### Optional local Node server (AI endpoints)
When running `server.js` locally, these endpoints are available (not used on GitHub Pages;
AI falls back to direct in-browser Gemini on static hosting):

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/ai/status` | GET | Reports whether server-side AI providers are configured |
| `/api/ai/ocr` | POST | Receipt vision OCR + structured parsing |
| `/api/ai/ocr-text` | POST | Parse already-extracted receipt text |
| `/api/ai/voice-parse` | POST | Parse spoken/typed phrases |
| `/api/ai/voice-audio` | POST | Transcribe audio + parse transaction |
| `/api/ai/advisor` | POST | Financial wellness analysis & recommendations |

> **Security:** never commit secrets. Firebase config is public and protected by Firestore rules. For the optional Node server, `.env` is git-ignored.

---

## 📖 Usage

1. **Add a transaction** — click **Add Transaction** in the header and choose Manual, Scan Receipt, or Voice.
2. **Scan a receipt** — drag & drop an image, paste with **Ctrl+V**, use the camera, or upload a file; review the extracted fields, then confirm.
3. **Dictate** — use **Voice** to speak a phrase or record/upload audio.
4. **Set budgets** — open **Budgets & Limits** to edit the global ceiling and each category limit (with a proper edit popup and a ✕ to delete categories).
5. **Reports** — open **Financial Reports** to view/print/save a statement, or export CSV/JSON.
6. **Account** — sign in with **Google** (or email/password); each account's finance is stored per-user in Firestore.

---

## 📁 Project Structure

```text
super-budgeting-system/
├── index.html            # Main web interface (markup, Tailwind config, CSS)
├── login.html            # Firebase login (Google + email/password)
├── firebase-config.js    # Public Firebase config (safe)
├── firestore.rules       # Per-user security rules (publish in Firebase)
├── app.js                # Application state, rendering & client logic
├── server.js             # Optional local Node server (AI endpoints; not needed on Pages)
├── package.json          # Node start configuration
├── run_app.bat           # Windows local launcher
├── FIREBASE_SETUP.md     # Full Firebase + GitHub Pages setup guide
├── .env.example          # (optional) local Node server env template
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