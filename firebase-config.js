/*
 * Public Firebase configuration (safe to expose in the browser).
 * The anon/public key is protected by Firestore security rules,
 * so it is safe to ship — never put a service_role/secret key here.
 */
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyDKoTb72vcjGLycDnYWs1vpzLHV_XTDfX4",
  authDomain: "sbs-capture.firebaseapp.com",
  projectId: "sbs-capture",
  storageBucket: "sbs-capture.firebasestorage.app",
  messagingSenderId: "661094969406",
  appId: "1:661094969406:web:42aab782ac11e352d2616f",
  measurementId: "G-YGJTFHS0W0"
};

/*
 * Optional shared/default Gemini API key used when a user hasn't set their own.
 * Users can override it in Settings → "Optional Mobile AI Key" for faster results.
 * (This is a browser key; restrict it in Google Cloud to your domains.)
 */
window.SBS_DEFAULT_GEMINI_KEY = "";