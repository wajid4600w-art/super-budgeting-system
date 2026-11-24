/*
 * Public Firebase configuration (safe to expose in the browser).
 * Get these from Firebase Console → Project settings → "Your apps" → Web app.
 * Security is enforced by Firestore security rules, not by hiding this config.
 */
window.FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};