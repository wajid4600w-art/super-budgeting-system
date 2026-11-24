# Firebase Setup — Google Login + Firestore (GitHub Pages)

This is the **static, no-server** setup: Firebase Authentication (Google + email/password)
and Cloud Firestore for per-user finance + feedback. Works on **GitHub Pages**.

## 1. Create a Firebase project
1. Go to console.firebase.google.com → **Add project** → name it → continue.
2. Disable Analytics (optional) → create.

## 2. Register a Web app
1. Project overview → **Web** (`</>` icon) → register app.
2. Copy the config object (`apiKey`, `authDomain`, `projectId`, `appId`, ...).
3. Paste it into **`firebase-config.js`** (replace the placeholders).

## 3. Enable Google Sign-In
1. **Authentication → Get started → Sign-in method → Google → Enable → Save.**
2. **Authentication → Settings → Authorized domains** → add `YOUR_USERNAME.github.io`
   (and `localhost` for testing).

## 4. Create the Firestore database
1. **Firestore Database → Create database** (production mode or test mode).
2. **Rules** tab → paste the contents of **`firestore.rules`** → Publish.
   - This lets each user read/write only their own `finance_state/{uid}` and submit `feedback`.

## 5. Run / deploy
- **Local test (use a STATIC server, not `npm start`):** run any static server in the project folder, e.g. `npx serve .` or the VS Code "Live Server" extension, then open the shown `http://localhost:...` URL → redirects to `login.html` → sign in with Google.
  - Do **not** use `npm start` for the Firebase build — `server.js` uses its own login gate and will loop. `npm start` is only for the optional local AI server.
- **GitHub Pages:** push to GitHub → repo **Settings → Pages → Deploy from branch → main/root** → open `https://<user>.github.io/<repo>/`.
  - No server needed. The app uses Firebase directly from the browser.

## 6. View users & feedback (the "database view")
- **Firebase Console → Firestore → Data**:
  - `finance_state` → one doc per user (their finance JSON).
  - `feedback` → all submitted comments/reviews (username + message + timestamp).
- **Authentication → Users** → list of accounts (email, provider, created).

## 7. Data model
```
finance_state/{uid}   { data: {...appState}, updated_at }
feedback/{autoId}     { user_id, username, message, created_at }
```
Security is enforced by `firestore.rules` (per-user isolation).

## Notes
- The Firebase config in `firebase-config.js` is **public/safe** (protected by rules).
- AI features use the existing in-browser Gemini calls (set your key in Settings).
- The old Node `server.js` Supabase code is unused for the static/GitHub Pages deploy.