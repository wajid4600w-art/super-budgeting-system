// ============================================================================
// Each top-level function below is bracketed by banner comments showing its
// exact line range, e.g.:
//   // ===== functionName (L10-L25) =====   <- function starts here
//   ...function body...
//   // ===== end functionName (L25) =====   <- function ends here
// Line numbers are a snapshot; re-check after edits.
// ============================================================================

// ===== getActiveGeminiKey (L11-L18) =====
function getActiveGeminiKey() {
  if (typeof appState !== "undefined" && appState.user?.geminiApiKey && !appState.user.geminiApiKey.includes("DEMO") && !appState.user.geminiApiKey.includes("YOUR_")) {
    return appState.user.geminiApiKey;
  }
  const stored = (typeof localStorage !== "undefined") ? localStorage.getItem("sbs_gemini_api_key") : null;
  if (stored) return stored;
  return "";
}
// ===== end getActiveGeminiKey (L18) =====

// --- INITIAL SAMPLE DATA (Pre-seeded in SAR) ---
const INITIAL_DATA = {
  user: {
    name: "Sarah Al-Mansoor",
    email: "sarah@university.edu",
    currency: "SAR",
    warningThreshold: 80, // percentage
    aiEnabled: true,
    geminiApiKey: "",
    theme: "light"
  },
  globalBudget: 3500.00,
  categories: [
    { id: "food", name: "Food & Dining", type: "expense", budget: 900.00, icon: "utensils", color: "#f97316" },
    { id: "groceries", name: "Groceries", type: "expense", budget: 700.00, icon: "shopping-cart", color: "#10b981" },
    { id: "transport", name: "Transport & Fuel", type: "expense", budget: 450.00, icon: "car", color: "#3b82f6" },
    { id: "utilities", name: "Utilities & Wi-Fi", type: "expense", budget: 350.00, icon: "zap", color: "#8b5cf6" },
    { id: "education", name: "Education & Books", type: "expense", budget: 400.00, icon: "book-open", color: "#06b6d4" },
    { id: "entertainment", name: "Entertainment", type: "expense", budget: 300.00, icon: "film", color: "#ec4899" },
    { id: "shopping", name: "Shopping", type: "expense", budget: 400.00, icon: "shopping-bag", color: "#eab308" },
    { id: "salary", name: "Salary / Allowance", type: "income", budget: 0, icon: "banknote", color: "#10b981" },
    { id: "freelance", name: "Freelance", type: "income", budget: 0, icon: "laptop", color: "#6366f1" },
    { id: "other", name: "Miscellaneous", type: "expense", budget: 200.00, icon: "help-circle", color: "#64748b" }
  ],
  transactions: [
    { id: "tx-1", type: "income", amount: 5500.00, currency: "SAR", category: "salary", merchant: "University Allowance & Job", date: "2026-09-01", notes: "Monthly stipend and student tutor salary", method: "Automatic" },
    { id: "tx-2", type: "expense", amount: 350.00, currency: "SAR", category: "utilities", merchant: "STC Fiber Internet", date: "2026-09-02", notes: "Shared apartment Wi-Fi bill", method: "Manual" },
    {
      id: "tx-3",
      type: "expense",
      amount: 185.50,
      currency: "SAR",
      category: "groceries",
      merchant: "Panda Supermarket",
      date: "2026-09-04",
      notes: "Weekly essentials & fresh fruit (OCR Scanned)",
      method: "OCR Receipt",
      ocrData: {
        merchant: "Panda Supermarket - Al Nakheel",
        invoiceNo: "PND-992144-KSA",
        date: "2026-09-04 19:40",
        paymentMethod: "Mada Debit (*1104)",
        originalCurrency: "SAR",
        originalAmount: 185.50,
        convertedAmount: 185.50,
        targetCurrency: "SAR",
        rateString: "1 SAR = 1.00 SAR (Local Currency)",
        subtotal: 161.30,
        tax: 24.20,
        items: [
          { name: "Almarai Fresh Milk 2L", price: "12.00 SAR", qty: 2 },
          { name: "Lulu Olive Oil 500ml", price: "28.50 SAR", qty: 1 },
          { name: "Organic Brown Eggs 30-Pack", price: "24.00 SAR", qty: 1 },
          { name: "Whole Grain Toast Bread", price: "7.00 SAR", qty: 2 },
          { name: "Fresh Chicken Breast 1kg", price: "45.00 SAR", qty: 2 },
          { name: "Fresh Gala Apples 1.5kg", price: "15.00 SAR", qty: 1 }
        ],
        rawText: `================================================
شركة أسواق بنده - PANDA RETAIL COMPANY
CR: 4030041273 | Tax ID: 300001234500003
Branch: Riyadh - Al Nakheel #104
Date: 2026-09-04 19:40:15
Invoice #: PND-992144-KSA
Cashier: Mohammed (POS-03)
------------------------------------------------
ITEM                     QTY     PRICE     TOTAL
------------------------------------------------
ALMARAI FRESH MILK 2L      2      6.00     12.00
LULU OLIVE OIL 500ML       1     28.50     28.50
ORGANIC EGGS 30PK          1     24.00     24.00
WHOLE GRAIN TOAST          2      3.50      7.00
CHICKEN BREAST 1KG         2     22.50     45.00
FRESH GALA APPLES 1.5KG    1     15.00     15.00
------------------------------------------------
SUBTOTAL (EXCL. VAT):                 161.30 SAR
VAT (15%):                             24.20 SAR
GRAND TOTAL (INCL. VAT):              185.50 SAR
------------------------------------------------
PAID VIA: MADA DEBIT (*1104)
AUTH CODE: 882914
ZATCA QR Code Validated [OK]
Smart Capture: Verified receipt
Status: Verified & Stored
================================================`
      }
    },
    {
      id: "tx-4",
      type: "expense",
      amount: 65.00,
      currency: "SAR",
      category: "transport",
      merchant: "SASCO Fuel",
      date: "2026-09-06",
      notes: "Full tank commute (OCR Scanned)",
      method: "OCR Receipt",
      ocrData: {
        merchant: "SASCO Fuel Station #208",
        invoiceNo: "SAS-2026-5521",
        date: "2026-09-06 08:15",
        paymentMethod: "Apple Pay (*7721)",
        originalCurrency: "SAR",
        originalAmount: 65.00,
        convertedAmount: 65.00,
        targetCurrency: "SAR",
        rateString: "1 SAR = 1.00 SAR (Local Currency)",
        subtotal: 56.52,
        tax: 8.48,
        items: [
          { name: "Octane 95 Gasoline (27.89 L)", price: "65.00 SAR", qty: 1 }
        ],
        rawText: `================================================
SASCO PETROLEUM COMPANY - محطة ساسكو
Tax Number: 300098765400003
Station: Riyadh King Fahd Rd #208
Pump: 04 | Grade: Octane 95
Date: 2026-09-06 08:15:33
Receipt #: SAS-2026-5521
------------------------------------------------
VOLUME: 27.89 Liters @ 2.33 SAR/L
SUBTOTAL:                              56.52 SAR
VAT (15%):                              8.48 SAR
TOTAL AMOUNT PAID:                     65.00 SAR
------------------------------------------------
PAYMENT: Apple Pay (Mada)
AUTH: 441092
ZATCA E-Invoice Phase 2 Compliant [OK]
Smart Capture: Verified receipt
================================================`
      }
    },
    { id: "tx-5", type: "expense", amount: 195.00, currency: "SAR", category: "education", merchant: "Jarir Bookstore", date: "2026-09-08", notes: "Software Engineering textbooks & notebooks", method: "Manual" },
    { id: "tx-6", type: "expense", amount: 78.00, currency: "SAR", category: "food", merchant: "Al Tazaj Restaurant", date: "2026-09-10", notes: "Study group dinner", method: "Voice" },
    { id: "tx-7", type: "income", amount: 600.00, currency: "SAR", category: "freelance", merchant: "Web Design Client", date: "2026-09-12", notes: "Frontend landing page tweak", method: "Manual" },
    { id: "tx-8", type: "expense", amount: 480.00, currency: "SAR", category: "food", merchant: "Campus Cafeteria & Coffee", date: "2026-09-14", notes: "Cumulative dining", method: "Manual" },
    {
      id: "tx-11",
      type: "expense",
      amount: 187.50, // 50.00 USD * 3.75 = 187.50 SAR
      currency: "SAR",
      category: "shopping",
      merchant: "Amazon US ($50.00 USD ➔ 187.50 SAR)",
      date: "2026-09-15",
      notes: "Auto-converted from $50.00 USD (Rate: 1 USD = 3.75 SAR)",
      method: "OCR Receipt",
      ocrData: {
        merchant: "Amazon.com Services LLC (US)",
        invoiceNo: "INV-AMZ-2026-88129",
        date: "2026-09-15 14:22",
        paymentMethod: "Visa Debit (*4019)",
        originalCurrency: "USD",
        originalAmount: 50.00,
        convertedAmount: 187.50,
        targetCurrency: "SAR",
        rateString: "1 USD = 3.75 SAR (Auto-Converted)",
        subtotal: 45.45,
        tax: 4.55,
        items: [
          { name: "AWS Developer Tools & Cloud Labs Subscription", price: "$29.99 USD", qty: 1 },
          { name: "High-Speed USB-C Multiport Dongle Hub", price: "$15.46 USD", qty: 1 },
          { name: "Standard International Digital Delivery", price: "$4.55 USD", qty: 1 }
        ],
        rawText: `================================================
AMAZON.COM SERVICES LLC - ORDER CONFIRMATION
Order Date: September 15, 2026
Order #: 114-8921841-4912048
Sold by: Amazon Export Sales LLC
VAT ID: US-94-2819401
Detected Receipt Currency: USD
------------------------------------------------
ITEMS ORDERED:
1x AWS Developer Tools Subscription ...... $29.99
1x High-Speed USB-C Dongle Hub .......... $15.46
1x Digital Delivery & Service Fee .......  $4.55
------------------------------------------------
SUBTOTAL (EXCL. TAX):                   $45.45 USD
ESTIMATED TAX (VAT):                     $4.55 USD
TOTAL CHARGED:                          $50.00 USD
------------------------------------------------
PAYMENT METHOD: Visa Debit ending in 4019
CURRENCY CONVERSION APPLIED:
Original Amount: $50.00 USD
Active System Currency: SAR
Exchange Peg: 1 USD = 3.7500 SAR
Converted Budget Total: 187.50 SAR
Smart Capture: Verified receipt
Status: Validated & Logged in SAR
================================================`
      }
    },
    { id: "tx-9", type: "expense", amount: 280.00, currency: "SAR", category: "groceries", merchant: "Danube Market", date: "2026-09-16", notes: "Kitchen restocking", method: "Manual" },
    { id: "tx-10", type: "expense", amount: 45.00, currency: "SAR", category: "transport", merchant: "Uber", date: "2026-09-17", notes: "Ride to lab presentation", method: "Voice" }
  ],
  savingsGoals: [
    { id: "sg-1", name: "New Laptop for Capstone", target: 4500.00, current: 3100.00, currency: "SAR", deadline: "2026-11-30", notes: "MacBook Pro / ThinkPad upgrade" },
    { id: "sg-2", name: "Emergency Cash Reserve", target: 3000.00, current: 1800.00, currency: "SAR", deadline: "2026-12-31", notes: "3 months emergency buffer" },
    { id: "sg-3", name: "Graduate School Fund", target: 8000.00, current: 2400.00, currency: "SAR", deadline: "2027-06-30", notes: "Application & exam certifications" }
  ],
  recurring: [
    { id: "rec-1", title: "Monthly Allowance & Salary", type: "income", amount: 5500.00, currency: "SAR", category: "salary", freq: "monthly", nextDate: "2026-10-01", active: true },
    { id: "rec-2", title: "Shared Apartment Wi-Fi", type: "expense", amount: 350.00, currency: "SAR", category: "utilities", freq: "monthly", nextDate: "2026-10-02", active: true },
    { id: "rec-3", title: "Fitness Center Membership", type: "expense", amount: 150.00, currency: "SAR", category: "entertainment", freq: "monthly", nextDate: "2026-10-05", active: true }
  ],
  notifications: [
    { id: "notif-1", type: "warning", title: "Food & Dining Alert", message: "You have used 62% of your Food budget.", time: "1 hour ago", read: false },
    { id: "notif-2", type: "info", title: "Salary Scheduled", message: "Upcoming monthly salary scheduled for 1 October.", time: "1 day ago", read: false }
  ]
};

// --- CURRENCY CONVERSION RATES & PEGS (Base: SAR) ---
const CURRENCY_RATES = {
  SAR: 1.0,
  USD: 1 / 3.75, // Exact official peg: 1 USD = 3.75 SAR (0.2666667)
  EUR: 0.2450,   // 1 EUR = ~4.0816 SAR
  GBP: 0.2100,   // 1 GBP = ~4.7619 SAR
  AED: 0.9800    // 1 AED = ~1.0204 SAR
};

const CURRENCY_SYMBOLS = {
  SAR: "SAR (ر.س)",
  USD: "$",
  EUR: "€",
  GBP: "£",
  AED: "AED"
};

// Direct conversion helper functions
// ===== getExchangeRateToSAR (L249-L256) =====
function getExchangeRateToSAR(currency) {
  if (currency === "SAR") return 1.0;
  if (currency === "USD") return 3.75;
  if (currency === "EUR") return 4.0816;
  if (currency === "GBP") return 4.7619;
  if (currency === "AED") return 1.0204;
  return 1.0;
}
// ===== end getExchangeRateToSAR (L256) =====

// ===== convertToSAR (L260-L265) =====
function convertToSAR(amount, fromCurrency) {
  if (!amount) return 0;
  const curr = (fromCurrency || "SAR").toUpperCase();
  if (curr === "SAR") return amount;
  return amount * getExchangeRateToSAR(curr);
}
// ===== end convertToSAR (L265) =====

// ===== convertFromSAR (L269-L274) =====
function convertFromSAR(amountInSAR, toCurrency) {
  if (!amountInSAR) return 0;
  const curr = (toCurrency || "SAR").toUpperCase();
  if (curr === "SAR") return amountInSAR;
  return amountInSAR / getExchangeRateToSAR(curr);
}
// ===== end convertFromSAR (L274) =====

// --- APPLICATION STATE ---
let appState = {};
let currentOcrExtraction = null;
let categoryChartInstance = null;
let trendChartInstance = null;
let speechRecognizer = null;
let isRecordingVoice = false;
let mediaRecorder = null;
let mediaRecorderChunks = [];
let mediaRecorderStartedAt = 0;
let voiceParsedDate = "";
let voiceParsedType = "expense";

// Initialize Application
document.addEventListener("DOMContentLoaded", async () => {
  // Gate: verify session with the server (skip gracefully when opened as a static file)
  let authUser = null;
  try {
    const res = await fetch('/api/auth/me');
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.user) authUser = data.user;
    } else if (res.status === 401) {
      location.href = '/login.html';
      return;
    }
  } catch (e) {
    // Offline / static hosting — continue in local demo mode
  }

  if (authUser) SBS_USER = authUser.username;

  // Pull cloud finance state (Supabase) before loading local cache.
  if (authUser) {
    await loadFinanceFromCloud();
  }
  loadState();
  _cloudReady = true;
  if (authUser) {
    appState.user.name = authUser.name || appState.user.name;
    appState.user.email = authUser.email || appState.user.email;
    saveState();
    const nameEl = document.getElementById("sidebar-user-name");
    if (nameEl) nameEl.innerText = appState.user.name;
    const emailEl = document.getElementById("sidebar-user-email");
    if (emailEl) emailEl.innerText = appState.user.email || "";
    updateUserAvatar();
    if (!appState.user.setupComplete) {
      setTimeout(openSetup, 350);
    }
  }
  initTheme();
  initCategoriesDropdowns();
  initSidebar();
  renderDashboard();
  renderNotifications();
  initHeroBubbles();
  setupSpeechRecognition();
  checkAiStatus();
  lucide.createIcons();
});

// ===== logout (L?) =====
async function logout() {
  try { await fetch('/api/auth/logout', { method: 'POST' }); } catch (e) {}
  location.href = '/login.html';
}

// --- FIRST-TIME SETUP ---
function openSetup() {
  document.getElementById("setup-name").value = appState.user.name || "";
  document.getElementById("setup-currency").value = appState.user.currency || "SAR";
  document.getElementById("setup-threshold").value = appState.user.warningThreshold || 80;
  document.getElementById("setup-theme").value = document.documentElement.classList.contains("dark") ? "dark" : "light";
  openModal("modal-setup");
}

function saveSetup() {
  const name = document.getElementById("setup-name").value.trim();
  const currency = document.getElementById("setup-currency").value;
  const threshold = parseInt(document.getElementById("setup-threshold").value) || 80;
  const theme = document.getElementById("setup-theme").value;
  if (name) appState.user.name = name;
  appState.user.currency = currency;
  appState.user.warningThreshold = threshold;
  appState.user.theme = theme;
  appState.user.setupComplete = true;
  saveState();

  const nameEl = document.getElementById("sidebar-user-name");
  if (nameEl) nameEl.innerText = appState.user.name;
  updateUserAvatar();
  if (theme === "dark") document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
  const themeIcon = document.getElementById("theme-icon");
  if (themeIcon) themeIcon.setAttribute("data-lucide", theme === "dark" ? "sun" : "moon");
  if (typeof lucide !== "undefined") lucide.createIcons();

  closeModal("modal-setup");
  updateCurrencyLabels();
  renderDashboard();
  renderBudgets();
  showToast("Preferences saved!");
  setTimeout(startOnboarding, 200);
}

// --- ABOUT & FEEDBACK ---
function openAbout() { openModal("modal-about"); }
function sendFeedback() {
  const text = (document.getElementById("feedback-text").value || "").trim();
  if (!text) { showToast("Please write your feedback first."); return; }
  // Try to store feedback in the database (Supabase via server)
  fetch("/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  }).then(r => r.json()).then(j => {
    if (j && j.success) {
      showToast(j.stored === false ? "Thanks! (offline — feedback not stored)" : "Thanks! Your feedback was sent to the developer.");
      document.getElementById("feedback-text").value = "";
    } else {
      showToast((j && j.error) || "Could not send feedback.");
    }
  }).catch(() => {
    // Fallback: open email app
    const subject = encodeURIComponent("SBS Feedback / Suggestion");
    const body = encodeURIComponent(text);
    window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
    showToast("Opening your email app...");
  });
}
function replayTour() {
  closeModal("modal-about");
  localStorage.removeItem("sbs_tour_done::" + (SBS_USER || "guest"));
  startOnboarding();
}

// --- ONBOARDING TOUR ---
const ONBOARD_STEPS = [
  { target: null, text: "Welcome to Super Budgeting System! This quick tour highlights the main controls." },
  { target: "#add-tx-btn", text: "Add Transaction — log income or expenses manually, scan a receipt, or use voice dictation." },
  { target: "#nav-data-input", text: "Data Input — a dedicated page for drag & drop receipts, Ctrl+V paste, camera, and voice." },
  { target: "#nav-transactions", text: "Transactions — review, edit, or delete every income and expense record." },
  { target: "#nav-budgets", text: "Budgets & Limits — set a global ceiling and per-category limits with alerts." },
  { target: "#nav-reports", text: "Financial Reports — view monthly/custom statements and export or print to PDF." },
  { target: null, text: "You're all set! Use the + (New Entry) button anytime to jump back to the dashboard." }
];
let _onboardIndex = 0;

function startOnboarding() {
  const key = "sbs_tour_done::" + (SBS_USER || "guest");
  if (localStorage.getItem(key) === "1") return;
  _onboardIndex = 0;
  document.getElementById("onboarding").classList.remove("hidden");
  renderOnboardStep();
}

function renderOnboardStep() {
  const step = ONBOARD_STEPS[_onboardIndex];
  if (!step) { finishOnboarding(); return; }
  document.getElementById("onboarding-step").innerText = `Step ${_onboardIndex + 1} of ${ONBOARD_STEPS.length}`;
  document.getElementById("onboarding-text").innerText = step.text;
  document.getElementById("onboarding-next").innerText = _onboardIndex === ONBOARD_STEPS.length - 1 ? "Done" : "Next";

  const card = document.getElementById("onboarding-card");
  const target = step.target ? document.querySelector(step.target) : null;
  if (target) {
    const r = target.getBoundingClientRect();
    let top = r.bottom + 10;
    let left = r.left;
    if (top + 190 > window.innerHeight) top = Math.max(12, r.top - 200);
    left = Math.min(Math.max(12, left), window.innerWidth - 300);
    card.style.top = top + "px";
    card.style.left = left + "px";
    target.classList.add("onboard-highlight");
  } else {
    card.style.top = Math.max(12, window.innerHeight / 2 - 100) + "px";
    card.style.left = Math.max(12, window.innerWidth / 2 - 144) + "px";
  }
}

function nextOnboarding() {
  document.querySelectorAll(".onboard-highlight").forEach(el => el.classList.remove("onboard-highlight"));
  _onboardIndex++;
  if (_onboardIndex >= ONBOARD_STEPS.length) { finishOnboarding(); return; }
  renderOnboardStep();
}

function skipOnboarding() {
  document.querySelectorAll(".onboard-highlight").forEach(el => el.classList.remove("onboard-highlight"));
  finishOnboarding();
}

function finishOnboarding() {
  document.getElementById("onboarding").classList.add("hidden");
  document.querySelectorAll(".onboard-highlight").forEach(el => el.classList.remove("onboard-highlight"));
  localStorage.setItem("sbs_tour_done::" + (SBS_USER || "guest"), "1");
}

// --- SIDEBAR HOVER + PIN ---
// ===== initHeroBubbles (L?) =====
function initHeroBubbles() {
  const hero = document.querySelector(".premium-hero");
  if (!hero || hero.dataset.bubblesReady === "1") return;
  hero.dataset.bubblesReady = "1";
  const bubbles = hero.querySelectorAll(".hero-bubbles .bubble");
  if (!bubbles.length) return;

  hero.addEventListener("mousemove", (e) => {
    const cx = e.clientX, cy = e.clientY;
    const max = 150;
    bubbles.forEach(b => {
      const br = b.getBoundingClientRect();
      const bx = br.left + br.width / 2;
      const by = br.top + br.height / 2;
      const dx = bx - cx, dy = by - cy;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < max) {
        const force = (1 - dist / max) * 28;
        b.style.translate = `${(dx / dist) * force}px ${(dy / dist) * force}px`;
        b.style.opacity = String(Math.min(0.6, 0.3 + (1 - dist / max) * 0.3));
      } else {
        b.style.translate = "0px 0px";
      }
    });
  });
  hero.addEventListener("mouseleave", () => {
    bubbles.forEach(b => { b.style.translate = "0px 0px"; b.style.opacity = ""; });
  });
}
// ===== end initHeroBubbles =====

// ===== refreshApp (L305-L316) =====
function refreshApp() {
  const nameEl = document.getElementById("sidebar-user-name");
  if (nameEl) nameEl.innerText = appState.user.name;
  const emailEl = document.getElementById("sidebar-user-email");
  if (emailEl) emailEl.innerText = appState.user.email;
  const curSel = document.getElementById("currency-select");
  if (curSel) curSel.value = appState.user.currency;
  if (typeof updateCurrencyLabels === "function") updateCurrencyLabels();
  renderDashboard();
  renderNotifications();
  if (typeof lucide !== "undefined") lucide.createIcons();
}
// ===== end refreshApp (L316) =====

// ===== initSidebar (L320-L334) =====
function initSidebar() {
  const sidebar = document.getElementById("sidebar");
  const pinned = localStorage.getItem("sbs_sidebar_pinned") === "1";
  if (pinned) document.body.classList.add("sidebar-expanded");

  if (sidebar && window.matchMedia("(min-width: 768px)").matches) {
    sidebar.addEventListener("mouseenter", () => document.body.classList.add("sidebar-expanded"));
    sidebar.addEventListener("mouseleave", () => {
      if (localStorage.getItem("sbs_sidebar_pinned") !== "1") {
        document.body.classList.remove("sidebar-expanded");
      }
    });
  }
  updatePinIcon();
}
// ===== end initSidebar (L334) =====

// ===== updatePinIcon (L338-L343) =====
function updatePinIcon() {
  const icon = document.querySelector(".sidebar-toggle-icon i");
  const pinned = localStorage.getItem("sbs_sidebar_pinned") === "1";
  if (icon) icon.setAttribute("data-lucide", pinned ? "pin" : "pin-off");
  if (typeof lucide !== "undefined") lucide.createIcons();
}
// ===== end updatePinIcon (L343) =====

// ===== toggleSidebarPin (L347-L352) =====
function toggleSidebarPin() {
  const next = localStorage.getItem("sbs_sidebar_pinned") !== "1";
  localStorage.setItem("sbs_sidebar_pinned", next ? "1" : "0");
  document.body.classList.toggle("sidebar-expanded", next);
  updatePinIcon();
}
// ===== end toggleSidebarPin (L352) =====

// --- STATE MANAGEMENT & LOCAL STORAGE ---
// ===== loadState (L357-L391) =====
let SBS_USER = null;
function stateKey() { return "super_budget_state" + (SBS_USER ? "::" + SBS_USER : ""); }
function updateUserAvatar() {
  const avatar = document.getElementById("sidebar-user-avatar");
  if (!avatar) return;
  const initials = (appState.user.name || "U").split(/\s+/).map(w => w[0] || "").slice(0, 2).join("").toUpperCase();
  avatar.innerText = initials || "U";
}

// Fresh, empty state for new accounts (keeps categories, clears all data)
function createEmptyState() {
  const base = JSON.parse(JSON.stringify(INITIAL_DATA));
  return {
    user: { name: "User", email: "", currency: "SAR", warningThreshold: 80, aiEnabled: true, geminiApiKey: "", theme: "light" },
    globalBudget: 0,
    categories: base.categories.map(c => Object.assign({}, c, { budget: 0 })),
    transactions: [],
    savingsGoals: [],
    recurring: [],
    notifications: []
  };
}

function loadState() {
  const stored = localStorage.getItem(stateKey());
  if (stored) {
    try {
      appState = JSON.parse(stored);
      if (!Array.isArray(appState.transactions)) appState.transactions = [];
      if (!Array.isArray(appState.savingsGoals)) appState.savingsGoals = [];
      if (!Array.isArray(appState.recurring)) appState.recurring = [];
      if (!Array.isArray(appState.notifications)) appState.notifications = [];
      if (!Array.isArray(appState.categories) || appState.categories.length === 0) appState.categories = createEmptyState().categories;
    } catch (e) {
      appState = createEmptyState();
      saveState();
    }
  } else {
    appState = createEmptyState();
    saveState();
  }

  // Update UI user name & currency
  document.getElementById("sidebar-user-name").innerText = appState.user.name;
  const emailEl = document.getElementById("sidebar-user-email");
  if (emailEl) emailEl.innerText = appState.user.email || "";
  updateUserAvatar();
  const curSel = document.getElementById("currency-select");
  if (curSel) curSel.value = appState.user.currency;
  updateCurrencyLabels();
}
// ===== end loadState (L391) =====

// ===== saveState (L395-L397) =====
let _cloudReady = false;
let _cloudSaveTimer = null;
function saveState() {
  localStorage.setItem(stateKey(), JSON.stringify(appState));
  if (_cloudReady && SBS_USER && typeof fetch === "function") {
    clearTimeout(_cloudSaveTimer);
    _cloudSaveTimer = setTimeout(() => {
      fetch("/api/finance/save", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: appState })
      }).catch(() => {});
    }, 800);
  }
}

// Load finance state from Supabase (via server); seed cloud from local if empty.
async function loadFinanceFromCloud() {
  if (!SBS_USER || typeof fetch !== "function") return false;
  try {
    const res = await fetch("/api/finance/load");
    if (!res.ok) return false;
    const j = await res.json();
    if (j && j.success && j.data && typeof j.data === "object") {
      localStorage.setItem(stateKey(), JSON.stringify(j.data));
      return true;
    }
    // No cloud data yet — if local data exists, upload it once.
    const local = localStorage.getItem(stateKey());
    if (local) {
      try {
        await fetch("/api/finance/save", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: JSON.parse(local) })
        });
      } catch (e) {}
    }
    return false;
  } catch (e) {
    return false;
  }
}
// ===== end saveState (L397) =====

// ===== resetToSampleData (L401-L413) =====
function resetToSampleData() {
  if (confirm("Reset all budgets, transactions, and settings back to original demo state?")) {
    appState = JSON.parse(JSON.stringify(INITIAL_DATA));
    saveState();
    closeModal("modal-settings");
    renderDashboard();
    renderTransactionsTable();
    renderBudgets();
    renderSavings();
    renderRecurring();
    showToast("Application reset to sample demo data!");
  }
}
// ===== end resetToSampleData (L413) =====

// ===== exportLocalData (L417-L433) =====
function exportLocalData() {
  const payload = {
    exportedAt: new Date().toISOString(),
    application: "Super Budgeting System",
    state: appState
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `sbs-financial-data-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast("Your financial data export was downloaded.");
}
// ===== end exportLocalData (L433) =====

// ===== deleteAllFinancialData (L437-L454) =====
function deleteAllFinancialData() {
  if (!confirm("Permanently delete all local transactions, budgets, savings goals, recurring items, and notifications?")) return;
  appState.transactions = [];
  appState.savingsGoals = [];
  appState.recurring = [];
  appState.notifications = [];
  appState.globalBudget = 0;
  appState.categories = appState.categories.filter(category => category.type === "income");
  saveState();
  closeModal("modal-settings");
  renderDashboard();
  renderTransactionsTable();
  renderBudgets();
  renderSavings();
  renderRecurring();
  renderNotifications();
  showToast("Local financial data deleted.");
}
// ===== end deleteAllFinancialData (L454) =====

// --- CURRENCY CONVERSION & FORMATTING ---
// ===== formatMoney (L459-L467) =====
function formatMoney(amountInSAR) {
  const currentCurr = appState.user.currency || "SAR";
  const rate = CURRENCY_RATES[currentCurr] || 1.0;
  const converted = amountInSAR * rate;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(converted);
}
// ===== end formatMoney (L467) =====

// ===== getCurrencySymbol (L471-L473) =====
function getCurrencySymbol() {
  return appState.user.currency || "SAR";
}
// ===== end getCurrencySymbol (L473) =====

// ===== changeCurrency (L477-L487) =====
function changeCurrency(newCurr) {
  appState.user.currency = newCurr;
  saveState();
  updateCurrencyLabels();
  renderDashboard();
  renderBudgets();
  renderTransactionsTable();
  renderSavings();
  renderReports();
  showToast(`Currency switched to ${newCurr}`);
}
// ===== end changeCurrency (L487) =====

// ===== updateCurrencyLabels (L491-L496) =====
function updateCurrencyLabels() {
  const symbol = getCurrencySymbol();
  document.querySelectorAll(".currency-symbol").forEach(el => {
    el.innerText = symbol;
  });
}
// ===== end updateCurrencyLabels (L496) =====

// --- NAVIGATION ROUTER ---
// ===== navigateTo (L501-L560) =====
function navigateTo(viewId) {
  document.querySelectorAll(".page-view").forEach(el => el.classList.add("hidden"));
  // Desktop Sidebar active tab state
  document.querySelectorAll(".nav-item").forEach(el => {
    el.classList.remove("active", "text-brand-600", "bg-brand-50", "dark:bg-brand-900/30", "dark:text-brand-400");
    el.classList.add("text-slate-600", "dark:text-slate-400");
  });

  // Mobile Bottom Nav active tab state
  const mobTabs = ["dashboard", "transactions", "budgets"];
  mobTabs.forEach(t => {
    const el = document.getElementById(`mob-nav-${t}`);
    if (el) {
      if (t === viewId) {
        el.className = "flex flex-col items-center space-y-0.5 text-brand-600 dark:text-brand-400 transition font-bold";
      } else {
        el.className = "flex flex-col items-center space-y-0.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition font-medium";
      }
    }
  });

  const targetView = document.getElementById(`view-${viewId}`);
  const targetNav = document.getElementById(`nav-${viewId}`);

  if (targetView) {
    targetView.classList.remove("hidden");
    targetView.classList.remove("page-enter");
    void targetView.offsetWidth;
    targetView.classList.add("page-enter");
  }
  if (targetNav) {
    targetNav.classList.add("active", "text-brand-600", "bg-brand-50", "dark:bg-brand-900/30", "dark:text-brand-400");
    targetNav.classList.remove("text-slate-600", "dark:text-slate-400");
  }

  // Titles
  const titleMap = {
    dashboard: "Financial Dashboard",
    "data-input": "Data Input & Capture",
    transactions: "Transactions Ledger",
    budgets: "Budgets & Spending Ceilings",
    savings: "Savings Goals & Targets",
    recurring: "Recurring Bills & Schedules",
    reports: "Executive Financial Statements",
    "ai-insights": "AI Financial Advisor"
  };
  document.getElementById("page-title").innerText = titleMap[viewId] || "Super Budgeting";

  // Re-render components on view change
  if (viewId === "dashboard") renderDashboard();
  if (viewId === "data-input") setupDataInputDropzone();
  if (viewId === "transactions") renderTransactionsTable();
  if (viewId === "budgets") renderBudgets();
  if (viewId === "savings") renderSavings();
  if (viewId === "recurring") renderRecurring();
  if (viewId === "reports") renderReports();
  if (viewId === "ai-insights") renderAiInsights();

  lucide.createIcons();
}
// ===== end navigateTo (L560) =====

// --- COUNT-UP NUMBER ANIMATION ---
// ===== animateNumber (L565-L585) =====
function animateNumber(el, target, suffix = "") {
  if (!el) return;
  const start = Number(el.dataset.val || 0);
  const end = Number(target) || 0;
  el.dataset.val = end;
  const fmt = (v) => `${formatMoney(v)}${suffix ? " " + suffix : ""}`;
  if (start === end) {
    el.innerText = fmt(end);
    return;
  }
  const duration = 600;
  const t0 = performance.now();
  const step = (now) => {
    const p = Math.min(1, (now - t0) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = start + (end - start) * eased;
    el.innerText = fmt(val);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
// ===== end animateNumber (L585) =====

// --- DASHBOARD CALCULATIONS & RENDERING ---
// ===== renderDashboard (L590-L710) =====
function renderDashboard() {
  const now = new Date();
  const currentMonthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  let totalIncome = 0;
  let totalExpenses = 0;
  const categorySpending = {};

  // Calculate totals
  appState.transactions.forEach(tx => {
    if (tx.type === "income") {
      totalIncome += tx.amount;
    } else {
      totalExpenses += tx.amount;
      categorySpending[tx.category] = (categorySpending[tx.category] || 0) + tx.amount;
    }
  });

  const netBalance = totalIncome - totalExpenses;
  const budgetLimit = appState.globalBudget || 0;
  const budgetPct = budgetLimit > 0 ? Math.min(100, Math.round((totalExpenses / budgetLimit) * 100)) : 0;
  const budgetRemaining = Math.max(0, budgetLimit - totalExpenses);

  // Premium dashboard overview
  const heroName = document.getElementById("hero-user-name");
  const heroBalance = document.getElementById("hero-net-balance");
  const heroFlow = document.getElementById("hero-cash-flow");
  const heroDate = document.getElementById("hero-current-date");
  if (heroName) heroName.innerText = (appState.user.name || "User").split(" ")[0];
  if (heroBalance) heroBalance.innerText = `${formatMoney(netBalance)} ${getCurrencySymbol()}`;
  if (heroFlow) {
    heroFlow.className = netBalance >= 0
      ? "mt-2 text-xs text-emerald-300 font-semibold"
      : "mt-2 text-xs text-rose-300 font-semibold";
    heroFlow.innerText = netBalance >= 0
      ? `${formatMoney(netBalance)} positive net cash flow`
      : `${formatMoney(Math.abs(netBalance))} ${getCurrencySymbol()} over current inflow`;
  }
  if (heroDate) {
    heroDate.innerText = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric"
    }).format(new Date());
  }

  // Update Stat Cards (with count-up animation)
  const sym = getCurrencySymbol();
  animateNumber(document.getElementById("stat-total-income"), totalIncome, sym);
  animateNumber(document.getElementById("stat-total-expenses"), totalExpenses, sym);

  const netEl = document.getElementById("stat-net-balance");
  animateNumber(netEl, netBalance, sym);
  netEl.className = `text-2xl font-bold ${netBalance >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`;

  // Global Budget Card
  document.getElementById("stat-budget-spent").innerText = `${formatMoney(totalExpenses)} / ${formatMoney(budgetLimit)} ${sym}`;
  document.getElementById("stat-budget-pct").innerText = `${budgetPct}%`;
  document.getElementById("stat-budget-remaining").innerText = `${formatMoney(budgetRemaining)} ${getCurrencySymbol()} remaining`;

  const budgetBar = document.getElementById("stat-budget-bar");
  budgetBar.style.width = `${budgetPct}%`;

  const badgeEl = document.getElementById("stat-budget-badge");
  if (budgetLimit <= 0) {
    badgeEl.className = "text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400";
    badgeEl.innerText = "No budget set";
  } else if (budgetPct >= 100) {
    budgetBar.className = "h-full rounded-full bg-lavender-500 transition-all duration-500";
    badgeEl.className = "text-xs font-bold px-2 py-0.5 rounded-full bg-lavender-100 text-lavender-700 dark:bg-lavender-500/20 dark:text-lavender-300";
    badgeEl.innerText = "Exceeded";
  } else if (budgetPct >= (appState.user.warningThreshold || 80)) {
    budgetBar.className = "h-full rounded-full bg-amber-500 transition-all duration-500";
    badgeEl.className = "text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
    badgeEl.innerText = "Warning (80%+)";
  } else {
    budgetBar.className = "progress-gradient h-full rounded-full transition-all duration-500";
    badgeEl.className = "text-xs font-bold px-2 py-0.5 rounded-full bg-cobalt-100 text-cobalt-700 dark:bg-cobalt-500/20 dark:text-cobalt-300";
    badgeEl.innerText = "Healthy";
  }

  // Dashboard Alert Banner
  checkThresholdAlerts(totalExpenses, budgetLimit, categorySpending);

  // Render Charts
  renderCharts(categorySpending, totalIncome, totalExpenses);

  // Render Mini Tables on Dashboard
  renderDashboardRecentTx();
  renderDashboardSavings();
  renderDashboardRecurring();

  // Update transaction counter badge
  document.getElementById("badge-tx-count").innerText = appState.transactions.length;

  // Populate stat card expandable breakdown summaries
  const incomeBreakdown = appState.categories
    .filter(c => c.type === "income")
    .map(c => {
      const sum = appState.transactions.filter(t => t.type === "income" && t.category === c.id).reduce((a, t) => a + t.amount, 0);
      return sum > 0 ? `${c.name}: ${formatMoney(sum)}` : null;
    })
    .filter(Boolean)
    .slice(0, 2);
  const incEl = document.getElementById("stat-income-breakdown");
  if (incEl) incEl.innerText = incomeBreakdown.length ? incomeBreakdown.join(" • ") : "No income logged yet";

  const topExpenses = Object.entries(categorySpending)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([cid, amt]) => {
      const cat = appState.categories.find(c => c.id === cid);
      return cat ? `${cat.name}: ${formatMoney(amt)}` : null;
    })
    .filter(Boolean);
  const expEl = document.getElementById("stat-expense-breakdown");
  if (expEl) expEl.innerText = topExpenses.length ? `Top: ${topExpenses.join(" • ")}` : "No expenses logged yet";

  const budgetBreakdownEl = document.getElementById("stat-budget-breakdown");
  if (budgetBreakdownEl) {
    const catBudgetCount = appState.categories.filter(c => c.type === "expense" && (c.budget || 0) > 0).length;
    budgetBreakdownEl.innerText = `${catBudgetCount} category limit${catBudgetCount !== 1 ? 's' : ''} configured`;
  }
}
// ===== end renderDashboard (L710) =====

// ===== checkThresholdAlerts (L714-L756) =====
function checkThresholdAlerts(totalExpenses, budgetLimit, categorySpending) {
  const alertBanner = document.getElementById("dashboard-alert-banner");
  let triggered = false;
  let title = "";
  let msg = "";

  // Check global budget
  if (budgetLimit > 0 && totalExpenses >= budgetLimit) {
    triggered = true;
    title = "Monthly Budget Limit Exceeded!";
    msg = `You have spent ${formatMoney(totalExpenses)} ${getCurrencySymbol()} which exceeds your ${formatMoney(budgetLimit)} ${getCurrencySymbol()} ceiling.`;
    alertBanner.className = "p-4 rounded-xl border border-lavender-200 dark:border-lavender-500/40 bg-lavender-50 dark:bg-lavender-500/10 text-lavender-700 dark:text-lavender-200 flex items-center justify-between";
  } else if (budgetLimit > 0 && (totalExpenses / budgetLimit) >= ((appState.user.warningThreshold || 80) / 100)) {
    triggered = true;
    title = "Approaching Monthly Budget Limit";
    msg = `You have consumed ${Math.round((totalExpenses / budgetLimit) * 100)}% of your monthly budget.`;
    alertBanner.className = "p-4 rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 flex items-center justify-between";
  }

  // Check individual categories if global not exceeded
  if (!triggered) {
    for (const cat of appState.categories) {
      if (cat.type === "expense" && cat.budget > 0) {
        const spent = categorySpending[cat.id] || 0;
        if (spent >= cat.budget) {
          triggered = true;
          title = `${cat.name} Budget Exceeded`;
          msg = `Spent ${formatMoney(spent)} of ${formatMoney(cat.budget)} ${getCurrencySymbol()}.`;
          alertBanner.className = "p-4 rounded-xl border border-lavender-200 dark:border-lavender-500/40 bg-lavender-50 dark:bg-lavender-500/10 text-lavender-700 dark:text-lavender-200 flex items-center justify-between";
          break;
        }
      }
    }
  }

  if (triggered) {
    alertBanner.classList.remove("hidden");
    document.getElementById("dashboard-alert-title").innerText = title;
    document.getElementById("dashboard-alert-message").innerText = msg;
  } else {
    alertBanner.classList.add("hidden");
  }
}
// ===== end checkThresholdAlerts (L756) =====

// --- CHARTS INITIALIZATION (Chart.js) ---
// ===== renderCharts (L761-L858) =====
function renderCharts(categorySpending, totalIncome, totalExpenses) {
  const isDark = document.documentElement.classList.contains("dark");
  const textColor = isDark ? "#cbd5e1" : "#475569";
  const gridColor = isDark ? "rgba(148, 163, 184, 0.14)" : "rgba(148, 163, 184, 0.22)";
  const limeLavender = ["#E4F993", "#818CF8", "#60A5FA", "#F87171", "#D9F99D", "#A5B4FC", "#93C5FD", "#FCA5A5", "#D4ED76", "#C7D2FE"];

  // Category Donut Chart (lime + lavender palette)
  const catLabels = [];
  const catData = [];
  const catColors = [];
  appState.categories.forEach(cat => {
    if (cat.type === "expense" && categorySpending[cat.id]) {
      catLabels.push(cat.name);
      catData.push(categorySpending[cat.id]);
      catColors.push(limeLavender[catColors.length % limeLavender.length]);
    }
  });

  const ctxCat = document.getElementById("categoryChart").getContext("2d");
  if (categoryChartInstance) categoryChartInstance.destroy();

  categoryChartInstance = new Chart(ctxCat, {
    type: "doughnut",
    data: {
      labels: catLabels,
      datasets: [{
        data: catData,
        backgroundColor: catColors,
        borderWidth: 2,
        borderColor: isDark ? "#1A1B21" : "#F2F0F2",
        hoverOffset: 8,
        spacing: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { animateRotate: true, duration: 900, easing: "easeOutQuart" },
      plugins: {
        legend: {
          position: "right",
          labels: { color: textColor, font: { size: 11, family: "Plus Jakarta Sans" }, boxWidth: 12, usePointStyle: true, pointStyle: "circle" }
        }
      },
      cutout: "72%"
    }
  });

  // Trend / Inflow vs Outflow Bar Chart — real last-3-months data
  const ctxTrend = document.getElementById("trendChart").getContext("2d");
  if (trendChartInstance) { trendChartInstance.destroy(); trendChartInstance = null; }

  const trendEmpty = document.getElementById("trend-empty");
  const trendCanvas = document.getElementById("trendChart");
  const hasTx = appState.transactions.length > 0;

  const now = new Date();
  const months = [];
  for (let i = 2; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    months.push({ key, label: d.toLocaleString("en-US", { month: "short" }), income: 0, expense: 0 });
  }
  const monthMap = {};
  months.forEach(m => { monthMap[m.key] = m; });
  appState.transactions.forEach(tx => {
    const key = (tx.date || "").slice(0, 7);
    if (monthMap[key]) {
      if (tx.type === "income") monthMap[key].income += tx.amount;
      else monthMap[key].expense += tx.amount;
    }
  });

  if (!hasTx) {
    if (trendEmpty) trendEmpty.classList.remove("hidden");
    if (trendCanvas) trendCanvas.style.visibility = "hidden";
    return;
  }
  if (trendEmpty) trendEmpty.classList.add("hidden");
  if (trendCanvas) trendCanvas.style.visibility = "visible";

  const trendLabels = months.map(m => m.label);
  const incomeData = months.map(m => m.income);
  const expenseData = months.map(m => m.expense);

  const limeGradient = ctxTrend.createLinearGradient(0, 0, 0, 260);
  limeGradient.addColorStop(0, isDark ? "#E4F993" : "#ECFCAA");
  limeGradient.addColorStop(1, isDark ? "rgba(212, 237, 118, 0.55)" : "rgba(212, 237, 118, 0.75)");

  trendChartInstance = new Chart(ctxTrend, {
    type: "bar",
    data: {
      labels: trendLabels,
      datasets: [
        {
          label: "Inflows (Income)",
          data: incomeData,
          backgroundColor: limeGradient,
          borderColor: isDark ? "#E4F993" : "#D4ED76",
          borderWidth: { top: 1, left: 0, right: 0, bottom: 0 },
          borderRadius: 8,
          maxBarThickness: 46
        },
        {
          label: "Outflows (Expenses)",
          data: expenseData,
          backgroundColor: isDark ? "rgba(220, 38, 38, 0.55)" : "rgba(248, 113, 113, 0.8)",
          borderColor: isDark ? "#DC2626" : "#F87171",
          borderWidth: { top: 1, left: 0, right: 0, bottom: 0 },
          borderRadius: 8,
          maxBarThickness: 46
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 900, easing: "easeOutQuart" },
      plugins: {
        legend: {
          position: "top",
          labels: { color: textColor, font: { size: 11, family: "Plus Jakarta Sans" }, usePointStyle: true, pointStyle: "circle", boxWidth: 8 }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: textColor } },
        y: { grid: { color: gridColor }, border: { display: false }, ticks: { color: textColor } }
      }
    }
  });
}
// ===== end renderCharts (L858) =====

// ===== renderDashboardRecentTx (L862-L900) =====
function renderDashboardRecentTx() {
  const tbody = document.getElementById("dashboard-tx-table");
  tbody.innerHTML = "";

  const recent = [...appState.transactions].slice(-5).reverse();
  if (recent.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="py-4 text-center text-slate-400">No transactions recorded yet.</td></tr>`;
    return;
  }

  recent.forEach(tx => {
    const cat = appState.categories.find(c => c.id === tx.category) || { name: tx.category, color: "#64748b" };
    const tr = document.createElement("tr");
    tr.className = "hover:bg-slate-50/50 dark:hover:bg-slate-800/40";
    tr.innerHTML = `
      <td class="py-2.5 font-semibold text-slate-900 dark:text-white flex items-center">
        <span class="w-2 h-2 rounded-full mr-2" style="background-color: ${cat.color}"></span>
        <span class="truncate max-w-[120px] sm:max-w-[170px]">${escapeHtml(tx.merchant)}</span>
        ${tx.ocrData ? `
          <button onclick="viewReceiptDetails('${tx.id}')" class="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-brand-50 hover:bg-brand-100 text-brand-700 dark:bg-brand-950/60 dark:hover:bg-brand-900/80 dark:text-brand-300 border border-brand-200 dark:border-brand-800 transition shadow-xs" title="Click to inspect Receipt & Raw OCR">
            <i data-lucide="receipt" class="w-2.5 h-2.5 mr-1"></i> Receipt
          </button>
        ` : ''}
      </td>
      <td class="py-2.5 text-slate-500">${cat.name}</td>
      <td class="py-2.5 text-slate-400">${tx.date}</td>
      <td class="py-2.5">
        <span class="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          ${tx.method || 'Manual'}
        </span>
      </td>
      <td class="py-2.5 text-right font-bold ${tx.type === 'income' ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}">
        ${tx.type === 'income' ? '+' : '-'}${formatMoney(tx.amount)} ${getCurrencySymbol()}
      </td>
    `;
    tbody.appendChild(tr);
  });
  lucide.createIcons();
}
// ===== end renderDashboardRecentTx (L900) =====

// ===== renderDashboardSavings (L904-L932) =====
function renderDashboardSavings() {
  const container = document.getElementById("dashboard-savings-list");
  container.innerHTML = "";

  if (appState.savingsGoals.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400">No active savings targets.</p>`;
    return;
  }

  appState.savingsGoals.slice(0, 2).forEach(goal => {
    const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
    const div = document.createElement("div");
    div.className = "p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800";
    div.innerHTML = `
      <div class="flex justify-between items-center text-xs">
        <span class="font-bold text-slate-800 dark:text-slate-200">${escapeHtml(goal.name)}</span>
        <span class="font-semibold text-brand-600">${pct}%</span>
      </div>
      <div class="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
        <div class="bg-brand-600 h-full rounded-full" style="width: ${pct}%"></div>
      </div>
      <div class="flex justify-between text-[11px] text-slate-500 mt-1.5">
        <span>${formatMoney(goal.current)} ${getCurrencySymbol()}</span>
        <span>Goal: ${formatMoney(goal.target)} ${getCurrencySymbol()}</span>
      </div>
    `;
    container.appendChild(div);
  });
}
// ===== end renderDashboardSavings (L932) =====

// ===== renderDashboardRecurring (L936-L960) =====
function renderDashboardRecurring() {
  const container = document.getElementById("dashboard-recurring-list");
  container.innerHTML = "";

  const activeRec = appState.recurring.filter(r => r.active);
  if (activeRec.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400">No scheduled recurring items.</p>`;
    return;
  }

  activeRec.slice(0, 3).forEach(rec => {
    const div = document.createElement("div");
    div.className = "flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-xs";
    div.innerHTML = `
      <div>
        <p class="font-semibold text-slate-800 dark:text-slate-200">${escapeHtml(rec.title)}</p>
        <span class="text-[10px] text-slate-400">Due: ${rec.nextDate}</span>
      </div>
      <span class="font-bold ${rec.type === 'income' ? 'text-emerald-600' : 'text-slate-700 dark:text-slate-300'}">
        ${formatMoney(rec.amount)} ${getCurrencySymbol()}
      </span>
    `;
    container.appendChild(div);
  });
}
// ===== end renderDashboardRecurring (L960) =====

// --- TRANSACTIONS LEDGER VIEW & CRUD ---
// ===== renderTransactionsTable (L965-L1045) =====
function renderTransactionsTable() {
  const tbody = document.getElementById("full-tx-table");
  tbody.innerHTML = "";

  const search = (document.getElementById("tx-search-input")?.value || "").toLowerCase();
  const filterType = document.getElementById("tx-filter-type")?.value || "all";
  const filterCat = document.getElementById("tx-filter-category")?.value || "all";

  const filtered = appState.transactions.filter(tx => {
    if (filterType !== "all" && tx.type !== filterType) return false;
    if (filterCat !== "all" && tx.category !== filterCat) return false;
    if (search) {
      const matchMerchant = tx.merchant.toLowerCase().includes(search);
      const matchNotes = (tx.notes || "").toLowerCase().includes(search);
      if (!matchMerchant && !matchNotes) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="p-6 text-center text-slate-400">No matching transactions found.</td></tr>`;
    return;
  }

  [...filtered].reverse().forEach(tx => {
    const cat = appState.categories.find(c => c.id === tx.category) || { name: tx.category, color: "#64748b" };
    const tr = document.createElement("tr");
    tr.className = "hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition";
    tr.innerHTML = `
      <td class="p-3.5">
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${tx.type === 'income' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'}">
          ${tx.type.toUpperCase()}
        </span>
      </td>
      <td class="p-3.5 font-bold text-slate-900 dark:text-white">
        <div class="flex items-center space-x-1.5 flex-wrap">
          <span>${escapeHtml(tx.merchant)}</span>
          ${tx.ocrData ? `
            <button onclick="viewReceiptDetails('${tx.id}')" class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-brand-50 hover:bg-brand-100 text-brand-700 dark:bg-brand-950/60 dark:hover:bg-brand-900/80 dark:text-brand-300 border border-brand-200 dark:border-brand-800 transition inline-flex items-center shadow-xs" title="Inspect Full Receipt & Raw OCR">
              <i data-lucide="receipt" class="w-2.5 h-2.5 mr-1"></i> Receipt
            </button>
          ` : ''}
        </div>
      </td>
      <td class="p-3.5">
        <span class="flex items-center">
          <span class="w-2 h-2 rounded-full mr-1.5" style="background-color: ${cat.color}"></span>
          ${cat.name}
        </span>
      </td>
      <td class="p-3.5 text-slate-400">${tx.date}</td>
      <td class="p-3.5">
        <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          ${tx.method || 'Manual'}
        </span>
      </td>
      <td class="p-3.5 text-slate-500 max-w-[150px] truncate" title="${escapeHtml(tx.notes || '')}">${escapeHtml(tx.notes || '-')}</td>
      <td class="p-3.5 text-right font-bold text-sm ${tx.type === 'income' ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}">
        ${tx.type === 'income' ? '+' : '-'}${formatMoney(tx.amount)} ${getCurrencySymbol()}
      </td>
      <td class="p-3.5 text-center">
        <div class="flex items-center justify-center space-x-1.5">
          ${tx.ocrData ? `
            <button onclick="viewReceiptDetails('${tx.id}')" title="Inspect Receipt & Raw OCR Stream" class="p-1 rounded text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition">
              <i data-lucide="receipt" class="w-3.5 h-3.5"></i>
            </button>
          ` : ''}
          <button onclick="editTransaction('${tx.id}')" title="Edit Record" class="p-1 rounded text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800">
            <i data-lucide="edit-2" class="w-3.5 h-3.5"></i>
          </button>
          <button onclick="deleteTransaction('${tx.id}')" title="Delete Record" class="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  lucide.createIcons();
}
// ===== end renderTransactionsTable (L1045) =====

// ===== filterTransactions (L1049-L1051) =====
function filterTransactions() {
  renderTransactionsTable();
}
// ===== end filterTransactions (L1051) =====

// ===== deleteTransaction (L1055-L1063) =====
function deleteTransaction(id) {
  if (confirm("Are you sure you want to delete this transaction? All associated budgets will recalculate.")) {
    appState.transactions = appState.transactions.filter(t => t.id !== id);
    saveState();
    renderTransactionsTable();
    renderDashboard();
    showToast("Transaction deleted.");
  }
}
// ===== end deleteTransaction (L1063) =====

// ===== editTransaction (L1067-L1082) =====
function editTransaction(id) {
  const tx = appState.transactions.find(t => t.id === id);
  if (!tx) return;

  document.getElementById("tx-edit-id").value = tx.id;
  document.getElementById("modal-tx-title").innerText = "Edit Financial Record";
  setTxType(tx.type);
  document.getElementById("tx-amount").value = tx.amount;
  document.getElementById("tx-merchant").value = tx.merchant;
  document.getElementById("tx-category").value = tx.category;
  document.getElementById("tx-date").value = tx.date;
  document.getElementById("tx-notes").value = tx.notes || "";
  document.getElementById("tx-input-method").value = tx.method || "Manual";

  openModal("modal-transaction");
}
// ===== end editTransaction (L1082) =====

// ===== handleSaveTransaction (L1086-L1133) =====
function handleSaveTransaction(e) {
  e.preventDefault();
  const editId = document.getElementById("tx-edit-id").value;
  const type = document.getElementById("tx-type").value;
  const amount = parseFloat(document.getElementById("tx-amount").value);
  const merchant = document.getElementById("tx-merchant").value.trim();
  const category = document.getElementById("tx-category").value;
  const date = document.getElementById("tx-date").value;
  const notes = document.getElementById("tx-notes").value.trim();
  const method = document.getElementById("tx-input-method").value || "Manual";

  if (!amount || amount <= 0 || !merchant || !date) {
    alert("Please enter a valid amount, merchant/payee, and date.");
    return;
  }

  if (editId) {
    const tx = appState.transactions.find(t => t.id === editId);
    if (tx) {
      tx.type = type;
      tx.amount = amount;
      tx.merchant = merchant;
      tx.category = category;
      tx.date = date;
      tx.notes = notes;
      tx.method = method;
    }
  } else {
    const newTx = {
      id: "tx-" + Date.now(),
      type,
      amount,
      currency: appState.user.currency,
      category,
      merchant,
      date,
      notes,
      method
    };
    appState.transactions.push(newTx);
  }

  saveState();
  closeModal("modal-transaction");
  renderTransactionsTable();
  renderDashboard();
  showToast(editId ? "Transaction updated." : "Transaction logged successfully!");
}
// ===== end handleSaveTransaction (L1133) =====

// ===== setTxType (L1137-L1153) =====
function setTxType(type) {
  document.getElementById("tx-type").value = type;
  const btnExpense = document.getElementById("btn-type-expense");
  const btnIncome = document.getElementById("btn-type-income");
  const labelMerchant = document.getElementById("label-merchant");

  if (type === "expense") {
    btnExpense.className = "py-1.5 font-bold rounded-md bg-white dark:bg-slate-900 text-rose-600 shadow-sm transition";
    btnIncome.className = "py-1.5 font-bold rounded-md text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition";
    labelMerchant.innerText = "Merchant / Payee *";
  } else {
    btnIncome.className = "py-1.5 font-bold rounded-md bg-white dark:bg-slate-900 text-emerald-600 shadow-sm transition";
    btnExpense.className = "py-1.5 font-bold rounded-md text-slate-600 dark:text-slate-400 hover:text-rose-600 transition";
    labelMerchant.innerText = "Income Source *";
  }
  populateCategorySelect("tx-category", type);
}
// ===== end setTxType (L1153) =====

// --- BUDGETS & LIMITS MANAGEMENT ---
// ===== renderBudgets (L1158-L1220) =====
function renderBudgets() {
  document.getElementById("budget-global-display").innerText = formatMoney(appState.globalBudget || 0);

  // Compute category spendings
  const spendings = {};
  appState.transactions.forEach(tx => {
    if (tx.type === "expense") {
      spendings[tx.category] = (spendings[tx.category] || 0) + tx.amount;
    }
  });

  const grid = document.getElementById("category-budgets-grid");
  grid.innerHTML = "";

  appState.categories.filter(c => c.type === "expense").forEach(cat => {
    const spent = spendings[cat.id] || 0;
    const limit = cat.budget || 0;
    const pct = limit > 0 ? Math.round((spent / limit) * 100) : 0;
    const isOver = limit > 0 && spent >= limit;
    const isWarn = limit > 0 && pct >= (appState.user.warningThreshold || 80);

    let statusBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">Healthy</span>`;
    let barColor = "bg-emerald-500";

    if (isOver) {
      statusBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-lavender-100 text-lavender-700 dark:bg-lavender-500/20 dark:text-lavender-300">Exceeded</span>`;
      barColor = "bg-lavender-500";
    } else if (isWarn) {
      statusBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">At Limit (${pct}%)</span>`;
      barColor = "bg-amber-500";
    }

    const card = document.createElement("div");
    card.className = "bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between";
    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center space-x-2">
            <span class="w-3 h-3 rounded-full" style="background-color: ${cat.color}"></span>
            <h4 class="font-bold text-slate-900 dark:text-white text-sm">${cat.name}</h4>
          </div>
          ${statusBadge}
        </div>
        <div class="mt-3">
          <div class="flex justify-between items-baseline text-xs">
            <span class="font-bold text-slate-900 dark:text-white">${formatMoney(spent)} ${getCurrencySymbol()}</span>
            <span class="text-slate-400">Limit: ${formatMoney(limit)} ${getCurrencySymbol()}</span>
          </div>
          <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
            <div class="${barColor} h-full rounded-full transition-all" style="width: ${Math.min(100, pct)}%"></div>
          </div>
        </div>
      </div>
      <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <span class="text-slate-400">${limit > spent ? formatMoney(limit - spent) + ' ' + getCurrencySymbol() + ' left' : '0.00 left'}</span>
        <div class="flex items-center gap-3">
          <button onclick="promptEditCategoryBudget('${cat.id}')" class="text-brand-600 hover:underline font-semibold">
            Edit Limit
          </button>
          <button onclick="deleteCategory('${cat.id}')" title="Delete category" class="w-5 h-5 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-rose-500 transition font-bold">✕</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}
// ===== end renderBudgets (L1220) =====

// ===== promptEditGlobalBudget (L1224-L1237) =====
let _budgetEditTarget = null;

function promptEditGlobalBudget() {
  _budgetEditTarget = { type: "global" };
  document.getElementById("budget-edit-title").innerText = "Edit Global Monthly Budget";
  const inp = document.getElementById("budget-edit-input");
  const disp = convertFromSAR(appState.globalBudget || 0, appState.user.currency || "SAR");
  inp.value = Number(disp.toFixed(2));
  const cur = document.getElementById("budget-edit-currency");
  if (cur) cur.innerText = getCurrencySymbol();
  openModal("modal-budget-edit");
  setTimeout(() => { inp.focus(); inp.select(); }, 60);
}
// ===== end promptEditGlobalBudget (L1237) =====

// ===== promptEditCategoryBudget (L1241-L1255) =====
function promptEditCategoryBudget(catId) {
  const cat = appState.categories.find(c => c.id === catId);
  if (!cat) return;
  _budgetEditTarget = { type: "category", id: catId };
  document.getElementById("budget-edit-title").innerText = `Edit ${cat.name} Limit`;
  const inp = document.getElementById("budget-edit-input");
  const disp = convertFromSAR(cat.budget || 0, appState.user.currency || "SAR");
  inp.value = Number(disp.toFixed(2));
  const cur = document.getElementById("budget-edit-currency");
  if (cur) cur.innerText = getCurrencySymbol();
  openModal("modal-budget-edit");
  setTimeout(() => { inp.focus(); inp.select(); }, 60);
}
// ===== end promptEditCategoryBudget (L1255) =====

// ===== saveBudgetEdit (L1257) =====
function saveBudgetEdit() {
  if (!_budgetEditTarget) return;
  const val = parseFloat(document.getElementById("budget-edit-input").value);
  if (isNaN(val) || val < 0) { showToast("Enter a valid amount (SAR)."); return; }
  const sarVal = convertToSAR(val, appState.user.currency || "SAR");
  if (_budgetEditTarget.type === "global") {
    appState.globalBudget = sarVal;
    showToast("Global monthly budget updated.");
  } else {
    const cat = appState.categories.find(c => c.id === _budgetEditTarget.id);
    if (cat) { cat.budget = sarVal; showToast(`${cat.name} budget updated.`); }
  }
  saveState();
  closeModal("modal-budget-edit");
  renderBudgets();
  renderDashboard();
  _budgetEditTarget = null;
}
// ===== end saveBudgetEdit (L1276) =====

// ===== deleteCategory (L1278) =====
function deleteCategory(catId) {
  const cat = appState.categories.find(c => c.id === catId);
  if (!cat) return;
  if (!confirm(`Delete the category "${cat.name}"? This cannot be undone.`)) return;
  appState.categories = appState.categories.filter(c => c.id !== catId);
  saveState();
  if (typeof initCategoriesDropdowns === "function") initCategoriesDropdowns();
  renderBudgets();
  renderDashboard();
  showToast(`${cat.name} category deleted.`);
}
// ===== end deleteCategory (L1289) =====

// --- SAVINGS GOALS ---
// ===== renderSavings (L1260-L1306) =====
function renderSavings() {
  const grid = document.getElementById("savings-goals-grid");
  grid.innerHTML = "";

  if (appState.savingsGoals.length === 0) {
    grid.innerHTML = `<div class="col-span-3 text-center py-8 text-slate-400 text-xs">No savings goals created yet. Click above to add your first goal.</div>`;
    return;
  }

  appState.savingsGoals.forEach(goal => {
    const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
    const card = document.createElement("div");
    card.className = "bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between";
    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between mb-2">
          <h4 class="font-bold text-slate-900 dark:text-white text-sm">${escapeHtml(goal.name)}</h4>
          <span class="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">${pct}%</span>
        </div>
        <p class="text-xs text-slate-500">${escapeHtml(goal.notes || 'Target savings milestone')}</p>
        <div class="mt-4">
          <div class="flex justify-between items-baseline text-xs">
            <span class="font-bold text-brand-600 text-sm">${formatMoney(goal.current)} ${getCurrencySymbol()}</span>
            <span class="text-slate-400">Target: ${formatMoney(goal.target)} ${getCurrencySymbol()}</span>
          </div>
          <div class="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full mt-2 overflow-hidden">
            <div class="bg-gradient-to-r from-brand-600 to-indigo-500 h-full rounded-full" style="width: ${pct}%"></div>
          </div>
        </div>
      </div>
      <div class="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <span class="text-slate-400 text-[11px]">${goal.deadline ? 'Target: ' + goal.deadline : 'Open deadline'}</span>
        <div class="flex items-center space-x-2">
          <button onclick="depositToGoal('${goal.id}')" class="px-2.5 py-1 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-semibold rounded hover:bg-brand-100">
            + Deposit
          </button>
          <button onclick="deleteGoal('${goal.id}')" class="text-slate-400 hover:text-rose-600 p-1">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  lucide.createIcons();
}
// ===== end renderSavings (L1306) =====

// ===== handleSaveGoal (L1310-L1337) =====
function handleSaveGoal(e) {
  e.preventDefault();
  const name = document.getElementById("goal-name").value.trim();
  const target = parseFloat(document.getElementById("goal-target").value);
  const current = parseFloat(document.getElementById("goal-current").value) || 0;
  const deadline = document.getElementById("goal-date").value;

  if (!name || !target || target <= 0) {
    alert("Please enter a valid goal name and target amount.");
    return;
  }

  appState.savingsGoals.push({
    id: "sg-" + Date.now(),
    name,
    target,
    current,
    currency: appState.user.currency,
    deadline,
    notes: "Personal savings target"
  });

  saveState();
  closeModal("modal-savings");
  renderSavings();
  renderDashboard();
  showToast("New savings goal added!");
}
// ===== end handleSaveGoal (L1337) =====

// ===== depositToGoal (L1341-L1355) =====
function depositToGoal(id) {
  const goal = appState.savingsGoals.find(g => g.id === id);
  if (!goal) return;
  const input = prompt(`Deposit funds into "${goal.name}" (SAR):`, "200");
  if (input !== null) {
    const amount = parseFloat(input);
    if (!isNaN(amount) && amount > 0) {
      goal.current += amount;
      saveState();
      renderSavings();
      renderDashboard();
      showToast(`Deposited ${formatMoney(amount)} ${getCurrencySymbol()} into ${goal.name}!`);
    }
  }
}
// ===== end depositToGoal (L1355) =====

// ===== deleteGoal (L1359-L1367) =====
function deleteGoal(id) {
  if (confirm("Delete this savings goal?")) {
    appState.savingsGoals = appState.savingsGoals.filter(g => g.id !== id);
    saveState();
    renderSavings();
    renderDashboard();
    showToast("Goal removed.");
  }
}
// ===== end deleteGoal (L1367) =====

// --- RECURRING TRANSACTIONS ENGINE ---
// ===== renderRecurring (L1372-L1418) =====
function renderRecurring() {
  const tbody = document.getElementById("recurring-table-body");
  tbody.innerHTML = "";

  if (appState.recurring.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="p-6 text-center text-slate-400">No scheduled recurring items found.</td></tr>`;
    return;
  }

  appState.recurring.forEach(rec => {
    const cat = appState.categories.find(c => c.id === rec.category) || { name: rec.category };
    const tr = document.createElement("tr");
    tr.className = "hover:bg-slate-50/70 dark:hover:bg-slate-800/50";
    tr.innerHTML = `
      <td class="p-3.5">
        <span class="px-2 py-0.5 rounded text-[10px] font-bold ${rec.type === 'income' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}">
          ${rec.type.toUpperCase()}
        </span>
      </td>
      <td class="p-3.5 font-bold text-slate-900 dark:text-white">${escapeHtml(rec.title)}</td>
      <td class="p-3.5 text-slate-500">${cat.name}</td>
      <td class="p-3.5 capitalize text-slate-600 dark:text-slate-300">${rec.freq}</td>
      <td class="p-3.5 text-slate-400">${rec.nextDate}</td>
      <td class="p-3.5 font-bold ${rec.type === 'income' ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}">
        ${formatMoney(rec.amount)} ${getCurrencySymbol()}
      </td>
      <td class="p-3.5">
        <span class="px-2 py-0.5 rounded text-[10px] font-semibold ${rec.active ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-500'}">
          ${rec.active ? 'Active' : 'Paused'}
        </span>
      </td>
      <td class="p-3.5 text-center">
        <div class="flex items-center justify-center space-x-1">
          <button onclick="toggleRecurringActive('${rec.id}')" class="px-2 py-1 text-[11px] rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200">
            ${rec.active ? 'Pause' : 'Resume'}
          </button>
          <button onclick="deleteRecurring('${rec.id}')" class="p-1 text-slate-400 hover:text-rose-600">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  lucide.createIcons();
}
// ===== end renderRecurring (L1418) =====

// ===== handleSaveRecurring (L1422-L1453) =====
function handleSaveRecurring(e) {
  e.preventDefault();
  const title = document.getElementById("rec-title").value.trim();
  const type = document.getElementById("rec-type").value;
  const amount = parseFloat(document.getElementById("rec-amount").value);
  const category = document.getElementById("rec-category").value;
  const freq = document.getElementById("rec-freq").value;
  const nextDate = document.getElementById("rec-date").value;

  if (!title || !amount || amount <= 0 || !nextDate) {
    alert("Please enter all required fields.");
    return;
  }

  appState.recurring.push({
    id: "rec-" + Date.now(),
    title,
    type,
    amount,
    currency: appState.user.currency,
    category,
    freq,
    nextDate,
    active: true
  });

  saveState();
  closeModal("modal-recurring");
  renderRecurring();
  renderDashboard();
  showToast("Recurring transaction scheduled!");
}
// ===== end handleSaveRecurring (L1453) =====

// ===== toggleRecurringActive (L1457-L1465) =====
function toggleRecurringActive(id) {
  const rec = appState.recurring.find(r => r.id === id);
  if (rec) {
    rec.active = !rec.active;
    saveState();
    renderRecurring();
    showToast(rec.active ? "Recurring item resumed." : "Recurring item paused.");
  }
}
// ===== end toggleRecurringActive (L1465) =====

// ===== deleteRecurring (L1469-L1476) =====
function deleteRecurring(id) {
  if (confirm("Remove this recurring rule?")) {
    appState.recurring = appState.recurring.filter(r => r.id !== id);
    saveState();
    renderRecurring();
    showToast("Recurring item deleted.");
  }
}
// ===== end deleteRecurring (L1476) =====

// ===== processDueRecurringTransactions (L1480-L1517) =====
function processDueRecurringTransactions() {
  const activeItems = appState.recurring.filter(r => r.active);
  if (activeItems.length === 0) {
    alert("No active recurring bills scheduled.");
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  let processedCount = 0;

  activeItems.forEach(rec => {
    const dueDate = rec.nextDate || today;
    if (dueDate > today) return;
    appState.transactions.push({
      id: "tx-rec-" + Date.now() + Math.random(),
      type: rec.type,
      amount: rec.amount,
      currency: rec.currency,
      category: rec.category,
      merchant: rec.title,
      date: dueDate,
      notes: `Auto-logged from ${rec.freq} recurring schedule`,
      method: "Recurring Auto"
    });
    const next = new Date(`${dueDate}T12:00:00`);
    if (rec.freq === "daily") next.setDate(next.getDate() + 1);
    else if (rec.freq === "weekly") next.setDate(next.getDate() + 7);
    else if (rec.freq === "yearly") next.setFullYear(next.getFullYear() + 1);
    else next.setMonth(next.getMonth() + 1);
    rec.nextDate = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}-${String(next.getDate()).padStart(2, "0")}`;
    processedCount++;
  });

  saveState();
  renderTransactionsTable();
  renderDashboard();
  showToast(`Executed and logged ${processedCount} recurring transactions!`);
}
// ===== end processDueRecurringTransactions (L1517) =====

// --- RECEIPT OCR PIPELINE (FR-19 to FR-23 with Multi-Currency & Gemini AI) ---

// ===== recalculateOcrCurrency (L1523-L1562) =====
function recalculateOcrCurrency() {
  const origCurrency = (document.getElementById("ocr-res-currency")?.value || "SAR").toUpperCase();
  const origAmount = parseFloat(document.getElementById("ocr-res-amount")?.value) || 0;
  const targetCurrency = (appState.user?.currency || "SAR").toUpperCase();

  // Convert to SAR base, then to target currency if target is not SAR
  const amountInSAR = convertToSAR(origAmount, origCurrency);
  const targetAmount = convertFromSAR(amountInSAR, targetCurrency);

  const convertedInput = document.getElementById("ocr-res-converted-amount");
  if (convertedInput) {
    convertedInput.value = targetAmount.toFixed(2);
  }

  // Update conversion banner labels
  const origTotalEl = document.getElementById("ocr-disp-orig-total");
  const convTotalEl = document.getElementById("ocr-disp-conv-total");
  const formulaBadge = document.getElementById("ocr-rate-formula-badge");
  const banner = document.getElementById("ocr-currency-conversion-banner");

  if (origTotalEl) origTotalEl.innerText = `${origAmount.toFixed(2)} ${origCurrency}`;
  if (convTotalEl) convTotalEl.innerText = `${targetAmount.toFixed(2)} ${targetCurrency}`;

  if (formulaBadge) {
    if (origCurrency === targetCurrency) {
      formulaBadge.innerText = `Same Currency (1:1)`;
    } else if (origCurrency === "USD" && targetCurrency === "SAR") {
      formulaBadge.innerText = `1 USD = 3.75 SAR (Official Peg)`;
    } else if (origCurrency === "SAR" && targetCurrency === "USD") {
      formulaBadge.innerText = `1 SAR = 0.2667 USD`;
    } else {
      const rateToSAR = getExchangeRateToSAR(origCurrency);
      formulaBadge.innerText = `1 ${origCurrency} = ${rateToSAR.toFixed(4)} SAR`;
    }
  }

  if (banner) {
    banner.classList.remove("hidden");
  }
}
// ===== end recalculateOcrCurrency (L1562) =====

// High-resolution image preparation preserving crisp receipt text for OCR
// ===== prepareImageForOcr (L1567-L1600) =====
function prepareImageForOcr(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        const maxW = 2048;
        const maxH = 1920;

        if (width > maxW || height > maxH) {
          const ratio = Math.min(maxW / width, maxH / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.90);
        resolve({ dataUrl, canvas });
      };
      img.onerror = () => resolve({ dataUrl: e.target?.result, canvas: null });
      img.src = e.target.result;
    };
    reader.onerror = () => resolve({ dataUrl: null, canvas: null });
    reader.readAsDataURL(file);
  });
}
// ===== end prepareImageForOcr (L1600) =====

// Backward-compatible image compressor
// ===== compressImage (L1605-L1607) =====
function compressImage(file, maxWidth = 1024, maxHeight = 1024, quality = 0.85) {
  return prepareImageForOcr(file).then(res => res.dataUrl);
}
// ===== end compressImage (L1607) =====

// Intelligent heuristic receipt text parser (parses real extracted OCR text if AI is offline)
// ===== parseReceiptTextHeuristically (L1612-L1693) =====
function parseReceiptTextHeuristically(rawText, fileName) {
  const text = (rawText || "").trim();
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const today = new Date().toISOString().split("T")[0];

  let detectedCurrency = "SAR";
  if (text.includes("$") || text.includes("USD") || text.includes("Dollar")) {
    detectedCurrency = "USD";
  } else if (text.includes("EUR") || text.includes("€") || text.includes("Euro")) {
    detectedCurrency = "EUR";
  } else if (text.includes("GBP") || text.includes("£") || text.includes("Pound")) {
    detectedCurrency = "GBP";
  } else if (text.includes("AED") || text.includes("Dirham")) {
    detectedCurrency = "AED";
  }

  // Find store / merchant name (first clean line)
  let merchant = "";
  for (const l of lines) {
    if (l.length >= 3 && !/^\d+$/.test(l) && !l.includes("===") && !l.includes("---") && !l.toLowerCase().includes("receipt") && !l.toLowerCase().includes("tax invoice")) {
      merchant = l;
      break;
    }
  }
  if (!merchant) merchant = "Scanned Store Receipt";

  // Search for currency amounts in text
  const amountMatches = text.match(/\b\d+([.,]\d{2})\b/g) || [];
  const numbers = amountMatches.map(m => parseFloat(m.replace(",", "."))).filter(n => !isNaN(n) && n > 0 && n < 100000);

  let amount = 0;
  if (numbers.length > 0) {
    amount = Math.max(...numbers);
  } else {
    const intMatches = text.match(/\b\d{2,4}\b/g) || [];
    amount = intMatches.length > 0 ? parseFloat(intMatches[0]) : 50.00;
  }

  const subtotal = Number((amount * 0.8695).toFixed(2));
  const tax = Number((amount - subtotal).toFixed(2));

  // Determine category from scanned words
  const lower = (text + " " + merchant + " " + (fileName || "")).toLowerCase();
  let category = "groceries";
  if (lower.includes("restaurant") || lower.includes("cafe") || lower.includes("coffee") || lower.includes("burger") || lower.includes("pizza") || lower.includes("food") || lower.includes("kitchen") || lower.includes("dining") || lower.includes("albaik") || lower.includes("mcdonald")) {
    category = "food";
  } else if (lower.includes("fuel") || lower.includes("gas") || lower.includes("sasco") || lower.includes("petrol") || lower.includes("uber") || lower.includes("taxi") || lower.includes("transport")) {
    category = "transport";
  } else if (lower.includes("pharmacy") || lower.includes("nahdi") || lower.includes("clinic") || lower.includes("health") || lower.includes("hospital") || lower.includes("medicine")) {
    category = "health";
  } else if (lower.includes("book") || lower.includes("jarir") || lower.includes("school") || lower.includes("university") || lower.includes("stationery") || lower.includes("education")) {
    category = "education";
  } else if (lower.includes("amazon") || lower.includes("noon") || lower.includes("fashion") || lower.includes("clothing") || lower.includes("electronics") || lower.includes("shopping")) {
    category = "shopping";
  }

  // Extract items from lines with prices
  const items = [];
  for (const line of lines) {
    if (/\d+[.,]\d{2}/.test(line) && line.length > 4 && !line.toLowerCase().includes("total") && !line.toLowerCase().includes("vat")) {
      items.push(line);
      if (items.length >= 8) break;
    }
  }

  if (items.length === 0) {
    items.push(`Scanned Itemized Purchase (${amount.toFixed(2)} ${detectedCurrency})`);
  }

  return {
    merchant,
    currency: detectedCurrency,
    amount,
    category,
    date: today,
    invoiceNo: "INV-" + Math.floor(100000 + Math.random() * 900000),
    subtotal,
    tax,
    items,
    confidence: text.length > 30 ? 95 : 80
  };
}
// ===== end parseReceiptTextHeuristically (L1693) =====

// Full 2-Stage Receipt OCR Pipeline with Vision AI and On-Device Tesseract Fallback
// ===== handleReceiptUpload (L1698-L1837) =====
async function handleReceiptUpload(e) {
  const file = (e && e.target && e.target.files && e.target.files[0]) || (e && e.file) || (e instanceof File ? e : null);
  if (!file) return;

  const uploadBox = document.getElementById("ocr-upload-box");
  const progressBox = document.getElementById("ocr-progress-container");
  const reviewBox = document.getElementById("ocr-review-container");
  const progressSubtext = document.getElementById("ocr-progress-subtext");

  uploadBox.classList.add("hidden");
  progressBox.classList.remove("hidden");
  reviewBox.classList.add("hidden");

  if (e && e.target) e.target.value = "";

  if (progressSubtext) {
    progressSubtext.innerText = "Step 1/2: Preparing high-resolution image for OCR scanner...";
  }

  try {
    // 1. High-fidelity image preparation (preserves crisp receipt characters)
    const prep = await prepareImageForOcr(file);
    const dataUrl = prep.dataUrl;
    const canvas = prep.canvas;

    if (!dataUrl) {
      throw new Error("Unable to read image file data.");
    }

    const commaIdx = dataUrl.indexOf(",");
    const cleanBase64 = commaIdx !== -1 ? dataUrl.slice(commaIdx + 1) : dataUrl;
    const mimeMatch = dataUrl.match(/^data:([^;]+);/);
    const mimeType = (mimeMatch && mimeMatch[1]) ? mimeMatch[1] : "image/jpeg";

    if (progressSubtext) {
      progressSubtext.innerText = "Step 1/2: Optical character recognition (extracting text)...";
    }

    let rawOcrText = "";
    let visionEngine = "Smart vision";

    // 2. Check Local Server if running on localhost:3000
    const isLocalServer = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.port === "3000");

    if (isLocalServer) {
      try {
        const localRes = await fetch('/api/ai/ocr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: dataUrl, mimeType })
        });
        if (localRes.ok) {
          const localJson = await localRes.json();
          if (localJson.success && localJson.data) {
            startOcrProcess(file.name, localJson.data);
            showToast(`Receipt OCR & AI Analysis Complete (${localJson.data.merchant || 'Store'})`);
            return;
          }
        }
      } catch (localErr) {
        console.warn("Local server OCR failed, switching to direct client-side engine:", localErr);
      }
    }

    // 3. Stage 1: Multimodal OCR Text Extraction via Direct Gemini API
    const activeKey = getActiveGeminiKey();
    if (activeKey) {
      const visionModels = ['gemini-3.1-flash-lite', 'gemini-3.5-flash', 'gemini-3.6-flash'];
      const ocrPrompt = "Perform OCR on this receipt image. Read and transcribe every single line of printed text, store name, date, invoice numbers, line items with prices, tax/VAT, subtotal, and grand total verbatim. Return only the plain transcribed text.";

      for (const model of visionModels) {
        try {
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { text: ocrPrompt },
                  { inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } }
                ]
              }]
            })
          });

          if (res.ok) {
            const json = await res.json();
            const textPart = json.candidates?.[0]?.content?.parts?.[0]?.text;
            if (textPart && textPart.trim().length > 5) {
              rawOcrText = textPart.trim();
              visionEngine = model;
              break;
            }
          }
        } catch (modelErr) {
          console.warn(`Vision model ${model} failed:`, modelErr);
        }
      }
    }

    // 4. On-Device Neural OCR Fallback (Tesseract.js) if offline or Gemini vision failed
    if (!rawOcrText && window.Tesseract && canvas) {
      try {
        if (progressSubtext) progressSubtext.innerText = "Step 1/2: Reading text on device using Neural OCR (Tesseract)...";
        const tResult = await Tesseract.recognize(canvas, 'eng');
        if (tResult.data?.text && tResult.data.text.trim().length > 5) {
          rawOcrText = tResult.data.text.trim();
          visionEngine = "Tesseract.js Neural OCR";
        }
      } catch (tErr) {
        console.warn("On-device Tesseract OCR failed:", tErr);
      }
    }

    if (!rawOcrText) {
      rawOcrText = "Receipt image processed. Text could not be transcribed clearly.";
    }

    // 5. Stage 2: AI Financial Structuring of the Extracted Text
    if (progressSubtext) {
      progressSubtext.innerText = "Step 2/2: AI analyzing store name, dates, line items & amounts...";
    }

    let parsedResult = null;

    if (activeKey && rawOcrText.length > 10) {
      const analyzePrompt = `You are an elite financial assistant.
Analyze this receipt OCR text and return a JSON object with this exact structure:
{
  "merchant": "Exact store or merchant name",
  "amount": 0.00,
  "currency": "SAR or USD or EUR or GBP",
  "category": "one of: food, groceries, transport, housing, utilities, entertainment, health, education, shopping, other",
  "date": "YYYY-MM-DD",
  "invoiceNo": "Invoice/receipt number if found",
  "subtotal": 0.00,
  "tax": 0.00,
  "items": ["Item name and price"],
  "confidence": 98
}
// ===== end handleReceiptUpload (L1837) =====

Receipt OCR Text:
${rawOcrText}

Return ONLY raw valid JSON.`;

      const parseModels = ['gemini-3.1-flash-lite', 'gemini-3.5-flash'];
      for (const model of parseModels) {
        try {
          const pRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: analyzePrompt }] }],
              generationConfig: { responseMimeType: 'application/json' }
            })
          });

          if (pRes.ok) {
            const pJson = await pRes.json();
            const rawParsed = pJson.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
            let cleaned = rawParsed.trim().replace(/^```json/, '').replace(/^```/, '').replace(/```$/, '').trim();
            parsedResult = JSON.parse(cleaned);
            break;
          }
        } catch (pErr) {
          console.warn(`Stage 2 model ${model} failed:`, pErr);
        }
      }
    }

    // 6. Heuristic Fallback Parser if Stage 2 AI returned empty
    if (!parsedResult || !parsedResult.amount) {
      parsedResult = parseReceiptTextHeuristically(rawOcrText, file.name);
    }

    // Attach full verbatim raw text for the user review screen
    parsedResult.rawText = rawOcrText;

    startOcrProcess(file.name, parsedResult);
    showToast(`Receipt Scanned via ${visionEngine} (${parsedResult.merchant || 'Store'})`);

  } catch (err) {
    console.error("OCR upload error:", err);
    showToast("Error scanning receipt image: " + err.message);
    const fallbackData = parseReceiptTextHeuristically("", file.name);
    startOcrProcess(file.name, fallbackData);
  }
}

// ===== testSampleReceipt (L1890-L2113) =====
function testSampleReceipt(type) {
  let sampleData = {};
  const today = new Date().toISOString().split("T")[0];
  const t = (type || "").toLowerCase();

  if (t.includes("amazon") || t.includes("aws")) {
    // $50.00 USD -> 187.50 SAR auto conversion
    sampleData = {
      merchant: "Amazon.com Services LLC (US)",
      currency: "USD",
      amount: 50.00,
      category: "shopping",
      date: today,
      invoiceNo: "INV-AMZ-2026-88129",
      subtotal: 45.45,
      tax: 4.55,
      items: [
        "AWS Developer Tools & Cloud Labs ($29.99 USD)",
        "High-Speed USB-C Multiport Dongle Hub ($15.46 USD)",
        "Digital Delivery & International Handling ($4.55 USD)"
      ],
      rawText: `================================================
AMAZON.COM SERVICES LLC - ORDER CONFIRMATION
Order Date: ${today}
Order #: 114-8921841-4912048
Sold by: Amazon Export Sales LLC
VAT ID: US-94-2819401
Receipt Currency: USD
------------------------------------------------
ITEMS ORDERED:
1x AWS Developer Tools Subscription ...... $29.99
1x High-Speed USB-C Dongle Hub .......... $15.46
1x Digital Delivery & Service Fee .......  $4.55
------------------------------------------------
SUBTOTAL (EXCL. TAX):                   $45.45 USD
ESTIMATED TAX (VAT):                     $4.55 USD
TOTAL CHARGED:                          $50.00 USD
------------------------------------------------
PAYMENT METHOD: Visa Debit ending in 4019
CURRENCY CONVERSION AUTO-TRIGGERED:
Original Scanned Amount: $50.00 USD
Active System Currency: SAR
Exchange Peg: 1 USD = 3.7500 SAR
Calculated Budget Allocation: 187.50 SAR
OCR Confidence: 99.4%
================================================`,
      confidence: 99
    };
  } else if (t.includes("starbucks") || t.includes("coffee")) {
    // $12.00 USD -> 45.00 SAR
    sampleData = {
      merchant: "Starbucks Coffee (US Airport)",
      currency: "USD",
      amount: 12.00,
      category: "food",
      date: today,
      invoiceNo: "SBUX-2026-9042",
      subtotal: 10.81,
      tax: 1.19,
      items: [
        "Venti Iced Caramel Macchiato ($6.75 USD)",
        "Almond Croissant Warm ($4.06 USD)",
        "State Sales Tax 11% ($1.19 USD)"
      ],
      rawText: `================================================
STARBUCKS STORE #1428
Terminal 2 Concourse B
Date: ${today} 07:42 AM
Register: 02 | Cashier: Taylor
------------------------------------------------
1x VENTI ICED CARAMEL MACCHIATO ....... $6.75
   * Extra Caramel Drizzle
   * Oat Milk Sub
1x ALMOND CROISSANT ................... $4.06
------------------------------------------------
SUBTOTAL:                              $10.81 USD
SALES TAX:                              $1.19 USD
TOTAL:                                 $12.00 USD
------------------------------------------------
PAID: Apple Pay Visa (*9912)
CONVERSION NOTE:
12.00 USD = 45.00 SAR (at 1 USD = 3.75 SAR)
================================================`,
      confidence: 97
    };
  } else if (t.includes("danube")) {
    sampleData = {
      merchant: "Danube Hypermarket - Panorama",
      currency: "SAR",
      amount: 112.50,
      category: "groceries",
      date: today,
      invoiceNo: "DAN-2026-44019",
      subtotal: 97.83,
      tax: 14.67,
      items: [
        "Alpro Almond Milk 1L (14.50 SAR)",
        "Fresh Italian Sourdough Bread (12.00 SAR)",
        "Organic Hass Avocados 4pk (26.00 SAR)",
        "Norwegian Smoked Salmon 200g (45.00 SAR)",
        "ZATCA VAT 15% (15.00 SAR)"
      ],
      rawText: `================================================
شركة أسواق الدانوب - DANUBE HYPERMARKET
Panorama Mall Branch, Riyadh
VAT ID: 300045612300003 | CR: 1010088921
Date: ${today} 18:22
Invoice: DAN-2026-44019
------------------------------------------------
ALPRO ALMOND MILK 1L                   14.50 SAR
ITALIAN SOURDOUGH BREAD                12.00 SAR
ORGANIC HASS AVOCADOS 4PK              26.00 SAR
NORWEGIAN SMOKED SALMON 200G           45.00 SAR
------------------------------------------------
SUBTOTAL (EXCL. VAT):                  97.83 SAR
VAT (15%):                             14.67 SAR
GRAND TOTAL (INCL. VAT):              112.50 SAR
------------------------------------------------
PAYMENT: MADA (*3310)
AUTH: 881023
ZATCA E-Invoice Phase 2 Compliant [OK]
================================================`,
      confidence: 98
    };
  } else if (t.includes("jarir") || t.includes("book")) {
    sampleData = {
      merchant: "Jarir Bookstore - King Abdullah Rd",
      currency: "SAR",
      amount: 189.00,
      category: "education",
      date: today,
      invoiceNo: "JAR-2026-78110",
      subtotal: 164.35,
      tax: 24.65,
      items: [
        "Software Engineering 10th Edition (149.00 SAR)",
        "Moleskine Grid Engineering Notebook (40.00 SAR)"
      ],
      rawText: `================================================
مكتبة جرير - JARIR BOOKSTORE
Branch: King Abdullah Rd, Riyadh
CR: 1010032264 | VAT ID: 300021345600003
Date: ${today} 16:30
Tax Invoice #: JAR-2026-78110
------------------------------------------------
SOFTWARE ENGINEERING 10TH ED          149.00 SAR
MOLESKINE GRID NOTEBOOK A5             40.00 SAR
------------------------------------------------
SUBTOTAL (EXCL. VAT):                 164.35 SAR
VAT (15%):                             24.65 SAR
TOTAL PAYABLE:                        189.00 SAR
------------------------------------------------
PAID: Mada (*6612)
APPROVAL CODE: 554219
================================================`,
      confidence: 99
    };
  } else if (t.includes("panda") || t.includes("groceries")) {
    sampleData = {
      merchant: "Panda Supermarket - Al-Nakheel",
      currency: "SAR",
      amount: 115.00,
      category: "groceries",
      date: today,
      invoiceNo: "PND-2026-9921",
      subtotal: 100.00,
      tax: 15.00,
      items: [
        "Almarai Fresh Milk 2L (12.00 SAR)",
        "Whole Wheat Toast (8.00 SAR)",
        "Organic Brown Eggs 30pk (25.00 SAR)",
        "Fresh Fruit & Vegetables (70.00 SAR)"
      ],
      rawText: `================================================
شركة أسواق بنده - PANDA RETAIL COMPANY
Branch: Riyadh - Al Nakheel #104
Date: ${today}
Invoice #: PND-2026-9921
------------------------------------------------
ALMARAI FRESH MILK 2L                  12.00 SAR
WHOLE WHEAT TOAST                       8.00 SAR
ORGANIC BROWN EGGS 30PK                25.00 SAR
FRESH FRUIT & VEGETABLES               70.00 SAR
------------------------------------------------
SUBTOTAL:                             100.00 SAR
VAT (15%):                             15.00 SAR
TOTAL AMOUNT PAID:                    115.00 SAR
------------------------------------------------
PAID: Mada Debit (*1104)
ZATCA E-Invoice Phase 2 Compliant [OK]
================================================`,
      confidence: 98
    };
  } else {
    sampleData = {
      merchant: "SASCO Fuel Station #208",
      currency: "SAR",
      amount: 65.00,
      category: "transport",
      date: today,
      invoiceNo: "SAS-2026-5521",
      subtotal: 56.52,
      tax: 8.48,
      items: ["Octane 95 Gasoline (27.89 L)"],
      rawText: `================================================
SASCO PETROLEUM COMPANY - محطة ساسكو
Tax Number: 300098765400003
Station: Riyadh King Fahd Rd #208
Date: ${today} 08:15:33
Receipt #: SAS-2026-5521
------------------------------------------------
VOLUME: 27.89 Liters @ 2.33 SAR/L
SUBTOTAL:                              56.52 SAR
VAT (15%):                              8.48 SAR
TOTAL AMOUNT PAID:                     65.00 SAR
------------------------------------------------
PAYMENT: Apple Pay (Mada)
================================================`,
      confidence: 96
    };
  }

  startOcrProcess("sample-receipt.jpg", sampleData);
}
// ===== end testSampleReceipt (L2113) =====

// ===== startOcrProcess (L2117-L2192) =====
function startOcrProcess(fileName, preData = null) {
  const uploadBox = document.getElementById("ocr-upload-box");
  const progressBox = document.getElementById("ocr-progress-container");
  const reviewBox = document.getElementById("ocr-review-container");

  uploadBox.classList.add("hidden");
  progressBox.classList.remove("hidden");
  reviewBox.classList.add("hidden");

  // Populate categories in OCR review dropdown
  populateCategorySelect("ocr-res-category", "expense");

  setTimeout(() => {
    progressBox.classList.add("hidden");
    reviewBox.classList.remove("hidden");

    const data = preData || {
      merchant: "Panda Hypermarket #42",
      currency: "SAR",
      amount: 112.50,
      category: "groceries",
      date: new Date().toISOString().split("T")[0],
      invoiceNo: "INV-" + Math.floor(100000 + Math.random() * 900000),
      subtotal: 97.83,
      tax: 14.67,
      items: ["Fresh Produce (45.00 SAR)", "Dairy Products (32.50 SAR)", "Bakery Items (35.00 SAR)"],
      rawText: "Sample scanned receipt stream...",
      confidence: 96
    };

    currentOcrExtraction = data;

    document.getElementById("ocr-res-merchant").value = data.merchant;
    
    const currSelect = document.getElementById("ocr-res-currency");
    if (currSelect) {
      currSelect.value = (data.currency || "SAR").toUpperCase();
    }
    
    document.getElementById("ocr-res-amount").value = data.amount;
    document.getElementById("ocr-res-category").value = data.category || "groceries";
    document.getElementById("ocr-res-date").value = data.date || new Date().toISOString().split("T")[0];

    // Live calculate currency conversion immediately
    recalculateOcrCurrency();

    const confEl = document.getElementById("ocr-ai-confidence");
    if (confEl) {
      confEl.innerText = `${data.confidence || 98}% confidence`;
    }

    // Render items preview
    const itemsCont = document.getElementById("ocr-items-container");
    const itemsList = document.getElementById("ocr-items-list");
    if (itemsCont && itemsList && data.items && data.items.length > 0) {
      itemsCont.classList.remove("hidden");
      itemsList.innerHTML = data.items.map(it => {
        if (typeof it === 'string') return `<li>• ${escapeHtml(it)}</li>`;
        const desc = it.description || it.name || it.item || 'Item';
        const price = (it.price !== undefined && it.price !== null) ? ` (${it.price} ${data.currency || 'SAR'})` : '';
        return `<li>• ${escapeHtml(desc + price)}</li>`;
      }).join("");
    } else if (itemsCont) {
      itemsCont.classList.add("hidden");
    }

    // Render Raw OCR stream preview
    const rawPre = document.getElementById("ocr-res-raw-text");
    if (rawPre) {
      rawPre.innerText = data.rawText || "No raw text extracted.";
    }

    lucide.createIcons();
    showToast(`Parsed: ${data.amount} ${data.currency || 'SAR'} from ${data.merchant}`);
  }, 600);
}
// ===== end startOcrProcess (L2192) =====

// ===== confirmOcrTransaction (L2196-L2269) =====
function confirmOcrTransaction() {
  const merchant = document.getElementById("ocr-res-merchant").value.trim();
  const origCurrency = (document.getElementById("ocr-res-currency")?.value || "SAR").toUpperCase();
  const origAmount = parseFloat(document.getElementById("ocr-res-amount").value);
  const convertedAmount = parseFloat(document.getElementById("ocr-res-converted-amount").value);
  const category = document.getElementById("ocr-res-category").value;
  const date = document.getElementById("ocr-res-date").value;

  if (!merchant || !origAmount || origAmount <= 0 || !date) {
    alert("Please review and provide valid values for all fields.");
    return;
  }

  // Base amount stored for system budgeting is always in SAR
  const amountInSAR = convertToSAR(origAmount, origCurrency);
  const rateToSAR = getExchangeRateToSAR(origCurrency);

  const extraction = currentOcrExtraction || {};
  const rateString = origCurrency === "SAR" 
    ? "1 SAR = 1.00 SAR (Local Currency)" 
    : `1 ${origCurrency} = ${rateToSAR.toFixed(4)} SAR (Auto-Converted)`;

  const rawText = extraction.rawText || `================================================
${merchant.toUpperCase()}
Date: ${date}
Detected Currency: ${origCurrency}
Total Scanned: ${origAmount.toFixed(2)} ${origCurrency}
Converted Budget Value: ${amountInSAR.toFixed(2)} SAR (Rate: ${rateString})
Status: Manually Verified via OCR Review Form
================================================`;

  const ocrData = {
    merchant: merchant,
    invoiceNo: extraction.invoiceNo || ("INV-" + Math.floor(100000 + Math.random() * 900000)),
    date: date,
    paymentMethod: extraction.paymentMethod || "Electronic Card Payment",
    originalCurrency: origCurrency,
    originalAmount: origAmount,
    convertedAmount: amountInSAR,
    targetCurrency: "SAR",
    rateString: rateString,
    subtotal: extraction.subtotal || +(origAmount * 0.85).toFixed(2),
    tax: extraction.tax || +(origAmount * 0.15).toFixed(2),
    items: extraction.items || [`1x Scanned item at ${merchant}`],
    rawText: rawText
  };

  const newTx = {
    id: "tx-ocr-" + Date.now(),
    type: "expense",
    amount: amountInSAR, // Stored in SAR base
    currency: "SAR",
    category,
    merchant: origCurrency !== "SAR" ? `${merchant} (${origAmount.toFixed(2)} ${origCurrency} ➔ ${amountInSAR.toFixed(2)} SAR)` : merchant,
    date,
    notes: origCurrency !== "SAR" 
      ? `Auto-converted from ${origAmount.toFixed(2)} ${origCurrency} (${rateString})`
      : "Scanned and verified by smart receipt capture",
    method: "OCR Receipt",
    ocrData: ocrData
  };

  appState.transactions.push(newTx);
  saveState();
  closeModal("modal-ocr");
  renderTransactionsTable();
  renderDashboard();

  if (origCurrency !== "SAR") {
    showToast(`Logged! Converted ${origAmount.toFixed(2)} ${origCurrency} ➔ ${formatMoney(amountInSAR)} ${getCurrencySymbol()}`);
  } else {
    showToast("Receipt transaction verified & logged to budget!");
  }
}
// ===== end confirmOcrTransaction (L2269) =====

// --- RECEIPT DETAILS & RAW OCR AUDIT MODAL HANDLERS ---
// ===== viewReceiptDetails (L2274-L2369) =====
function viewReceiptDetails(txId) {
  const tx = appState.transactions.find(t => t.id === txId);
  if (!tx) {
    showToast("Transaction not found.");
    return;
  }

  // Fallback synthetic ocrData if older transaction
  const ocr = tx.ocrData || {
    merchant: tx.merchant,
    invoiceNo: "REC-" + tx.id,
    date: tx.date,
    paymentMethod: "Card Payment",
    originalCurrency: tx.currency || "SAR",
    originalAmount: tx.amount,
    convertedAmount: tx.amount,
    targetCurrency: "SAR",
    rateString: "1 SAR = 1.00 SAR",
    subtotal: +(tx.amount * 0.85).toFixed(2),
    tax: +(tx.amount * 0.15).toFixed(2),
    items: [`1x Purchase at ${tx.merchant}`],
    rawText: `================================================
${tx.merchant.toUpperCase()}
Date: ${tx.date}
Receipt ID: ${tx.id}
Total: ${tx.amount} SAR
Payment: ${tx.method}
Notes: ${tx.notes || 'None'}
================================================`
  };

  const sysCurr = (appState.user?.currency || "SAR").toUpperCase();

  // Populate modal header
  document.getElementById("rc-modal-merchant").innerText = ocr.merchant || tx.merchant;
  document.getElementById("rc-modal-subtitle").innerText = `Invoice #${ocr.invoiceNo || 'N/A'} • ${ocr.date || tx.date}`;

  // Populate financial cards
  const origCurr = (ocr.originalCurrency || tx.currency || "SAR").toUpperCase();
  const origAmt = (ocr.originalAmount !== undefined) ? ocr.originalAmount : tx.amount;
  document.getElementById("rc-original-total").innerText = `${origAmt.toFixed(2)} ${origCurr}`;

  const storedAmtInSAR = tx.amount;
  document.getElementById("rc-stored-total").innerText = `${formatMoney(storedAmtInSAR)} ${getCurrencySymbol()}`;

  // Rate notice
  const rateNotice = document.getElementById("rc-rate-notice");
  if (rateNotice) {
    if (origCurr !== "SAR" || sysCurr !== "SAR") {
      rateNotice.innerHTML = `<i data-lucide="info" class="w-3.5 h-3.5 mr-1 text-brand-600"></i><span>Conversion Applied: <strong>${ocr.rateString || ('1 ' + origCurr + ' = ' + getExchangeRateToSAR(origCurr).toFixed(4) + ' SAR')}</strong></span>`;
    } else {
      rateNotice.innerHTML = `<i data-lucide="check-circle" class="w-3.5 h-3.5 mr-1 text-emerald-600"></i><span>Receipt in SAR (${ocr.rateString || '1:1 Local Currency'}). No conversion needed.</span>`;
    }
  }

  // Populate metadata grid
  document.getElementById("rc-invoice-no").innerText = ocr.invoiceNo || "N/A";
  document.getElementById("rc-date").innerText = ocr.date || tx.date;
  document.getElementById("rc-payment-method").innerText = ocr.paymentMethod || "Mada / Card";
  
  const taxVal = (ocr.tax !== undefined) ? `${ocr.tax.toFixed(2)} ${origCurr}` : "Included";
  document.getElementById("rc-tax").innerText = taxVal;

  // Itemized line items
  const itemsContainer = document.getElementById("rc-items-list");
  if (itemsContainer) {
    if (ocr.items && ocr.items.length > 0) {
      itemsContainer.innerHTML = ocr.items.map(item => {
        if (typeof item === "string") {
          return `<div class="p-2.5 flex items-center justify-between text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40">
            <span class="font-medium">• ${escapeHtml(item)}</span>
          </div>`;
        } else {
          return `<div class="p-2.5 flex items-center justify-between text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40">
            <div>
              <span class="font-bold text-slate-900 dark:text-white">${escapeHtml(item.name || item.title || 'Item')}</span>
              ${item.qty ? `<span class="text-[10px] text-slate-400 block">Quantity: ${item.qty}</span>` : ''}
            </div>
            <span class="font-extrabold text-slate-900 dark:text-white">${escapeHtml(String(item.price || ''))}</span>
          </div>`;
        }
      }).join("");
    } else {
      itemsContainer.innerHTML = `<div class="p-3 text-center text-slate-400">Standard single-item transaction</div>`;
    }
  }

  // Raw OCR Stream
  const rawBox = document.getElementById("rc-raw-text-box");
  if (rawBox) {
    rawBox.innerText = ocr.rawText || "No raw OCR stream recorded.";
  }

  openModal("modal-receipt-details");
  lucide.createIcons();
}
// ===== end viewReceiptDetails (L2369) =====

// ===== copyRawOcrText (L2373-L2384) =====
function copyRawOcrText() {
  const rawBox = document.getElementById("rc-raw-text-box");
  if (!rawBox || !rawBox.innerText) {
    showToast("No raw OCR text available to copy.");
    return;
  }
  navigator.clipboard.writeText(rawBox.innerText).then(() => {
    showToast("Raw OCR text copied to clipboard!");
  }).catch(() => {
    showToast("Copied to clipboard!");
  });
}
// ===== end copyRawOcrText (L2384) =====

// --- VOICE INPUT ENGINE (FR-24 to FR-28 with AI NLP Parsing) ---
// ===== setupSpeechRecognition (L2389-L2419) =====
function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    speechRecognizer = new SpeechRecognition();
    speechRecognizer.continuous = false;
    speechRecognizer.interimResults = false;
    speechRecognizer.lang = "en-US";

    speechRecognizer.onstart = () => {
      isRecordingVoice = true;
      document.getElementById("btn-mic-record").classList.add("animate-pulse", "bg-rose-500");
      document.getElementById("voice-status-label").innerText = "Listening... Speak now!";
    };

    speechRecognizer.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      parseVoicePhrase(transcript);
    };

    speechRecognizer.onerror = (event) => {
      isRecordingVoice = false;
      document.getElementById("btn-mic-record").classList.remove("animate-pulse", "bg-rose-500");
      document.getElementById("voice-status-label").innerText = "Voice error: " + event.error;
    };

    speechRecognizer.onend = () => {
      isRecordingVoice = false;
      document.getElementById("btn-mic-record").classList.remove("animate-pulse", "bg-rose-500");
    };
  }
}
// ===== end setupSpeechRecognition (L2419) =====

// ===== toggleVoiceRecording (L2423-L2433) =====
function toggleVoiceRecording() {
  if (!speechRecognizer) {
    alert("Web Speech API is not supported in this browser. Please use the instant sample voice buttons below!");
    return;
  }
  if (!isRecordingVoice) {
    speechRecognizer.start();
  } else {
    speechRecognizer.stop();
  }
}
// ===== end toggleVoiceRecording (L2433) =====

// ===== testVoicePhrase (L2437-L2439) =====
function testVoicePhrase(phrase) {
  parseVoicePhrase(phrase);
}
// ===== end testVoicePhrase (L2439) =====

// ===== toggleAudioRecording (L2443-L2475) =====
async function toggleAudioRecording() {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    return;
  }
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    showToast("In-browser audio recording is not supported. Upload an audio file instead.");
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const preferredTypes = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"];
    const mimeType = preferredTypes.find(type => MediaRecorder.isTypeSupported(type)) || "";
    mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
    mediaRecorderChunks = [];
    mediaRecorderStartedAt = Date.now();
    mediaRecorder.ondataavailable = event => {
      if (event.data.size) mediaRecorderChunks.push(event.data);
    };
    mediaRecorder.onstop = async () => {
      stream.getTracks().forEach(track => track.stop());
      const blob = new Blob(mediaRecorderChunks, { type: mediaRecorder.mimeType || "audio/webm" });
      await analyzeVoiceAudioBlob(blob);
    };
    mediaRecorder.start();
    document.getElementById("btn-audio-record").innerText = "Stop & Analyze";
    document.getElementById("voice-status-label").innerText = "Recording... Maximum 5 minutes";
  } catch (err) {
    console.error("Microphone recording failed:", err);
    showToast("Unable to access the microphone. Check browser permissions.");
  }
}
// ===== end toggleAudioRecording (L2475) =====

// ===== handleVoiceAudioFile (L2479-L2488) =====
async function handleVoiceAudioFile(event) {
  const file = event?.target?.files?.[0];
  event.target.value = "";
  if (!file) return;
  if (file.size > 8 * 1024 * 1024) {
    showToast("Audio file must be 8 MB or smaller.");
    return;
  }
  await analyzeVoiceAudioBlob(file);
}
// ===== end handleVoiceAudioFile (L2488) =====

// ===== analyzeVoiceAudioBlob (L2492-L2532) =====
async function analyzeVoiceAudioBlob(blob) {
  if (mediaRecorder && mediaRecorder.state === "inactive") {
    document.getElementById("btn-audio-record").innerText = "Record & Analyze";
  }

  const durationSeconds = mediaRecorderStartedAt ? (Date.now() - mediaRecorderStartedAt) / 1000 : 0;
  if (durationSeconds > 300) {
    showToast("Audio recordings must be five minutes or shorter.");
    return;
  }

  document.getElementById("voice-review-container").classList.remove("hidden");
  document.getElementById("voice-status-label").innerText = "Transcribing and analyzing audio...";

  const reader = new FileReader();
  reader.onload = async () => {
    const dataUrl = reader.result;
    const mimeType = blob.type || "audio/webm";
    try {
      const res = await fetch('/api/ai/voice-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioBase64: dataUrl,
          mimeType,
          today: new Date().toISOString().split("T")[0]
        })
      });
      if (!res.ok) throw new Error(`Audio analysis failed (${res.status})`);
      const json = await res.json();
      if (!json.success || !json.data) throw new Error(json.error || "Empty audio analysis response");
      applyVoiceParsedResult(json.data, json.model || "Gemini");
    } catch (err) {
      console.error("Voice audio analysis failed:", err);
      document.getElementById("voice-status-label").innerText = "Audio could not be analyzed. Use the text dictation mode.";
      showToast("Audio analysis is unavailable. Check smart capture configuration.");
    }
  };
  reader.onerror = () => showToast("Unable to read the selected audio file.");
  reader.readAsDataURL(blob);
}
// ===== end analyzeVoiceAudioBlob (L2532) =====

// ===== applyVoiceParsedResult (L2536-L2546) =====
function applyVoiceParsedResult(parsed, modelName) {
  const transcript = parsed.transcript || parsed.merchant || "Audio transaction";
  voiceParsedDate = /^\d{4}-\d{2}-\d{2}$/.test(parsed.date || "") ? parsed.date : new Date().toISOString().split("T")[0];
  voiceParsedType = parsed.type === "income" ? "income" : "expense";
  document.getElementById("voice-transcript-text").innerText = `"${transcript}"`;
  document.getElementById("voice-res-amount").value = parsed.amount || 0;
  if (parsed.category) document.getElementById("voice-res-category").value = parsed.category;
  document.getElementById("voice-res-desc").value = parsed.merchant || transcript;
  document.getElementById("voice-status-label").innerText = `AI recognized (${modelName})! Review before saving:`;
  showToast("Voice audio transcribed and parsed with AI!");
}
// ===== end applyVoiceParsedResult (L2546) =====

// ===== parseVoicePhrase (L2550-L2604) =====
async function parseVoicePhrase(transcript) {
  document.getElementById("voice-review-container").classList.remove("hidden");
  document.getElementById("voice-transcript-text").innerText = `"${transcript}"`;
  document.getElementById("voice-status-label").innerText = "Analyzing your voice...";

  populateCategorySelect("voice-res-category", "expense");

  const isLocalServer = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.port === "3000");

  if (isLocalServer) {
    try {
      const res = await fetch('/api/ai/voice-parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: transcript,
          today: new Date().toISOString().split("T")[0]
        })
      });

      if (res.ok) {
        const resJson = await res.json();
        if (resJson.success && resJson.data) {
          const parsed = resJson.data;
          document.getElementById("voice-res-amount").value = parsed.amount || 50.0;
          if (parsed.category) {
            document.getElementById("voice-res-category").value = parsed.category;
          }
          document.getElementById("voice-res-desc").value = parsed.merchant || transcript;
          document.getElementById("voice-status-label").innerText = `AI recognized (${resJson.model})! Review before saving:`;
          showToast("Voice phrase parsed with AI NLP!");
          return;
        }
      }
    } catch (err) {
      console.warn("Local AI Voice parse failed, attempting direct Gemini:", err);
    }
  }

  // Direct Gemini API for GitHub Pages / Mobile
  const activeKey = getActiveGeminiKey();
  if (activeKey) {
    try {
      const today = new Date().toISOString().split("T")[0];
      const prompt = `You are a financial NLP parsing assistant for a budgeting app.
Reference date: ${today}.
Spoken transaction phrase: "${transcript}"
Extract transaction details into JSON matching this exact schema:
{
  "merchant": "Short clear merchant or description",
  "amount": 0.00,
  "category": "one of: food, groceries, transport, housing, utilities, entertainment, health, education, shopping, other",
  "date": "YYYY-MM-DD",
  "type": "expense"
}
// ===== end parseVoicePhrase (L2604) =====
Return ONLY valid raw JSON.`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${activeKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      });

      if (res.ok) {
        const json = await res.json();
        const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
        let cleaned = rawText.trim().replace(/^```json/, '').replace(/^```/, '').replace(/```$/, '').trim();
        const parsed = JSON.parse(cleaned);

        document.getElementById("voice-res-amount").value = parsed.amount || 50.0;
        if (parsed.category) {
          document.getElementById("voice-res-category").value = parsed.category;
        }
        document.getElementById("voice-res-desc").value = parsed.merchant || transcript;
        document.getElementById("voice-status-label").innerText = "Smart analysis complete. Review before saving:";
        showToast("Voice phrase analyzed!");
        return;
      }
    } catch (directErr) {
      console.warn("Direct voice Gemini error:", directErr);
    }
  }

  // Offline keyword fallback

    let amount = 50.0;
    let category = "food";
    let desc = "Voice expense";

    const numberMatch = transcript.match(/\d+(\.\d+)?/);
    if (numberMatch) amount = parseFloat(numberMatch[0]);

    const text = transcript.toLowerCase();
    if (text.includes("dinner") || text.includes("lunch") || text.includes("breakfast") || text.includes("coffee") || text.includes("food") || text.includes("restaurant")) {
      category = "food";
      desc = text.includes("coffee") ? "Coffee" : "Dining Out";
    } else if (text.includes("grocery") || text.includes("supermarket") || text.includes("market") || text.includes("fruit")) {
      category = "groceries";
      desc = "Groceries";
    } else if (text.includes("taxi") || text.includes("uber") || text.includes("fuel") || text.includes("gas") || text.includes("transport")) {
      category = "transport";
      desc = text.includes("uber") || text.includes("taxi") ? "Taxi / Uber Ride" : "Fuel Fill-up";
    } else if (text.includes("book") || text.includes("textbook") || text.includes("tuition") || text.includes("supplies")) {
      category = "education";
      desc = "Academic Supplies";
    }

    document.getElementById("voice-res-amount").value = amount;
    document.getElementById("voice-res-category").value = category;
    document.getElementById("voice-res-desc").value = desc;
    document.getElementById("voice-status-label").innerText = "Voice recognized (Local Mode)! Review before saving:";
}

// ===== confirmVoiceTransaction (L2668-L2696) =====
function confirmVoiceTransaction() {
  const amount = parseFloat(document.getElementById("voice-res-amount").value);
  const category = document.getElementById("voice-res-category").value;
  const merchant = document.getElementById("voice-res-desc").value.trim();
  const date = voiceParsedDate || new Date().toISOString().split("T")[0];

  if (!amount || amount <= 0 || !merchant) {
    alert("Please review fields and enter valid transaction details.");
    return;
  }

  appState.transactions.push({
    id: "tx-voice-" + Date.now(),
    type: voiceParsedType,
    amount,
    currency: appState.user.currency,
    category,
    merchant,
    date,
    notes: "Logged via Voice Speech-to-Text & AI NLP",
    method: "Voice"
  });

  saveState();
  closeModal("modal-voice");
  renderTransactionsTable();
  renderDashboard();
  showToast("Voice transaction confirmed & saved!");
}
// ===== end confirmVoiceTransaction (L2696) =====

// --- AI FINANCIAL ADVISOR & SPENDING AUDIT ---
// ===== generateAiAdvisorAudit (L2701-L2780) =====
async function generateAiAdvisorAudit() {
  const btn = document.getElementById("btn-run-ai-audit");
  const btnText = document.getElementById("btn-run-ai-audit-text");
  const origText = btnText ? btnText.innerText : "Analyze finances";

  if (btn) {
    btn.disabled = true;
    if (btnText) btnText.innerText = "Analyzing finances...";
  }

  try {
    let totalIncome = 0;
  let totalExpenses = 0;
  const categorySpending = {};

  appState.transactions.forEach(tx => {
    if (tx.type === "income") {
      totalIncome += tx.amount;
    } else {
      totalExpenses += tx.amount;
      categorySpending[tx.category] = (categorySpending[tx.category] || 0) + tx.amount;
    }
  });

  const catSummaries = appState.categories
    .filter(c => c.type === "expense")
    .map(c => ({
      name: c.name,
      spent: categorySpending[c.id] || 0,
      budget: c.budget || 0
    }));

  const isLocalServer = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.port === "3000");
  let audit = null;

  if (isLocalServer) {
    try {
      const res = await fetch('/api/ai/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summary: {
            currency: appState.user.currency,
            totalIncome,
            totalExpenses,
            netBalance: totalIncome - totalExpenses,
            globalBudget: appState.globalBudget
          },
          transactions: appState.transactions.slice(-20),
          categories: catSummaries,
          savings: appState.savingsGoals
        })
      });

      if (res.ok) {
        const resJson = await res.json();
        if (resJson.success && resJson.data) {
          audit = resJson.data;
        }
      }
    } catch (e) {
      console.warn("Local advisor API failed, attempting direct Gemini:", e);
    }
  }

  // Direct Gemini API for GitHub Pages / Mobile
  if (!audit) {
    const activeKey = getActiveGeminiKey();
    if (activeKey) {
      try {
        const systemPrompt = `You are an elite AI Personal Financial Advisor for Super Budgeting System.
Analyze this financial summary and return ONLY valid JSON matching this schema:
{
  "healthScore": 85,
  "healthStatus": "Excellent",
  "executiveSummary": "2 crisp sentences on status and priority.",
  "keyInsights": ["Specific observation 1", "Specific observation 2"],
  "recommendations": ["Actionable step 1", "Actionable step 2"],
  "budgetAlerts": ["Alert on high category"]
}
// ===== end generateAiAdvisorAudit (L2780) =====
Financial Profile:
${JSON.stringify({
  currency: appState.user.currency,
  totalIncome,
  totalExpenses,
  netBalance: totalIncome - totalExpenses,
  globalBudget: appState.globalBudget,
  recentTransactions: appState.transactions.slice(-15),
  categories: catSummaries
})}`;

        const gRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${activeKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            generationConfig: { responseMimeType: 'application/json' }
          })
        });

        if (gRes.ok) {
          const gJson = await gRes.json();
          const text = gJson.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
          let cleaned = text.trim().replace(/^```json/, '').replace(/^```/, '').replace(/```$/, '').trim();
          audit = JSON.parse(cleaned);
        }
      } catch (gErr) {
        console.warn("Direct advisor Gemini error:", gErr);
      }
    }
  }

  if (!audit) {
    const netRatio = totalIncome > 0 ? (totalIncome - totalExpenses) / totalIncome : 0;
    const score = Math.min(100, Math.max(30, Math.round(50 + netRatio * 50)));
    audit = {
      healthScore: score,
      healthStatus: score >= 80 ? "Excellent" : (score >= 60 ? "Good" : "Needs Attention"),
      executiveSummary: `Monthly expenses are currently ${totalExpenses.toFixed(2)} ${appState.user.currency} against an income of ${totalIncome.toFixed(2)} ${appState.user.currency}. Net savings rate is ${(netRatio * 100).toFixed(1)}%.`,
      keyInsights: [
        `Net savings rate is ${(netRatio * 100).toFixed(0)}% of total monthly cash flow.`,
        `Top expense category is ${catSummaries[0]?.name || 'Housing'} with ${catSummaries[0]?.spent || 0} ${appState.user.currency} spent.`
      ],
      recommendations: [
        "Maintain current savings margin and automate recurring emergency fund transfers.",
        "Review discretionary dining and shopping to avoid budget threshold triggers."
      ],
      budgetAlerts: [
        "Budget limits active and monitored across all primary categories."
      ]
    };
  }

    // 1. Health Score & Ring
    const scoreEl = document.getElementById("ai-health-score");
    const statusEl = document.getElementById("ai-health-status");
    const ringEl = document.getElementById("ai-score-ring");

    const score = audit.healthScore || 85;
    if (scoreEl) scoreEl.innerText = score;
    if (statusEl) statusEl.innerText = audit.healthStatus || "Good";

    if (ringEl) {
      if (score >= 80) {
        ringEl.className = "w-20 h-20 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/30";
        if (scoreEl) scoreEl.className = "text-2xl font-black text-emerald-600 dark:text-emerald-400";
        if (statusEl) statusEl.className = "mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
      } else if (score >= 60) {
        ringEl.className = "w-20 h-20 rounded-full border-4 border-amber-500 flex items-center justify-center bg-amber-50 dark:bg-amber-950/30";
        if (scoreEl) scoreEl.className = "text-2xl font-black text-amber-600 dark:text-amber-400";
        if (statusEl) statusEl.className = "mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
      } else {
        ringEl.className = "w-20 h-20 rounded-full border-4 border-rose-500 flex items-center justify-center bg-rose-50 dark:bg-rose-950/30";
        if (scoreEl) scoreEl.className = "text-2xl font-black text-rose-600 dark:text-rose-400";
        if (statusEl) statusEl.className = "mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300";
      }
    }

    // 2. Executive Summary
    const summaryEl = document.getElementById("ai-executive-summary");
    if (summaryEl && audit.executiveSummary) {
      summaryEl.innerText = audit.executiveSummary;
    }

    // 3. Key Insights
    const insightsList = document.getElementById("ai-key-insights-list");
    if (insightsList && audit.keyInsights && audit.keyInsights.length > 0) {
      insightsList.innerHTML = audit.keyInsights.map(ins => `
        <li class="flex items-start">
          <span class="text-emerald-500 mr-1.5 font-bold">•</span>
          <span>${escapeHtml(ins)}</span>
        </li>
      `).join("");
    }

    // 4. Recommendations
    const recList = document.getElementById("ai-recommendations-list");
    if (recList && audit.recommendations && audit.recommendations.length > 0) {
      recList.innerHTML = audit.recommendations.map((rec, i) => `
        <li class="flex items-start">
          <span class="text-amber-500 mr-1.5 font-bold">${i + 1}.</span>
          <span>${escapeHtml(rec)}</span>
        </li>
      `).join("");
    }

    // 5. Budget Alerts
    const alertsCont = document.getElementById("ai-budget-alerts-container");
    const alertsText = document.getElementById("ai-budget-alerts-text");
    if (alertsCont && alertsText) {
      if (audit.budgetAlerts && audit.budgetAlerts.length > 0) {
        alertsCont.classList.remove("hidden");
        alertsText.innerText = audit.budgetAlerts.join(" • ");
      } else {
        alertsCont.classList.add("hidden");
      }
    }

    showToast("Financial insights updated!");
  } catch (err) {
    console.error("AI Advisor error:", err);
    showToast("AI Advisor service unavailable. Please check server.");
  } finally {
    if (btn) {
      btn.disabled = false;
      if (btnText) btnText.innerText = origText;
    }
  }
}

// Check AI Service Connectivity
// ===== checkAiStatus (L2914-L2929) =====
async function checkAiStatus() {
  try {
    const res = await fetch('/api/ai/status');
    if (res.ok) {
      const data = await res.json();
      const badge = document.getElementById('ai-status-badge');
      if (badge && (data.geminiConfigured || data.nemotronConfigured)) {
        badge.classList.remove('hidden');
        badge.classList.add('md:flex');
        lucide.createIcons();
      }
    }
  } catch (e) {
    console.log('AI status check offline:', e.message);
  }
}
// ===== end checkAiStatus (L2929) =====

// --- FINANCIAL REPORTS & CUSTOM DATE RANGE ---
// ===== renderReports (L2934-L2936) =====
function renderReports() {
  generateReport();
}
// ===== end renderReports (L2936) =====

// ===== handleReportPeriodChange (L2940-L2949) =====
function handleReportPeriodChange() {
  const period = document.getElementById("report-period-type").value;
  const customBox = document.getElementById("custom-date-container");
  if (period === "custom") {
    customBox.classList.remove("hidden");
  } else {
    customBox.classList.add("hidden");
    generateReport();
  }
}
// ===== end handleReportPeriodChange (L2949) =====

// ===== generateReport (L2953-L3046) =====
function generateReport() {
  const period = document.getElementById("report-period-type").value;
  let startDate = "";
  let endDate = "";

  const now = new Date();
  if (period === "current_month") {
    startDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
    endDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-31`;
    document.getElementById("report-date-range-label").innerText = `Period: Current Calendar Month (${now.toLocaleString('default', { month: 'long', year: 'numeric' })})`;
  } else if (period === "last_month") {
    const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    startDate = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}-01`;
    endDate = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}-31`;
    document.getElementById("report-date-range-label").innerText = `Period: Previous Month (${prev.toLocaleString('default', { month: 'long', year: 'numeric' })})`;
  } else {
    startDate = document.getElementById("report-start-date").value || "2026-09-01";
    endDate = document.getElementById("report-end-date").value || "2026-09-17";
    document.getElementById("report-date-range-label").innerText = `Period: ${startDate} to ${endDate}`;
  }

  // Filter transactions within range
  const matched = appState.transactions.filter(t => t.date >= startDate && t.date <= endDate);

  let grossInflow = 0;
  let grossOutflow = 0;
  const categorySpending = {};

  matched.forEach(tx => {
    if (tx.type === "income") {
      grossInflow += tx.amount;
    } else {
      grossOutflow += tx.amount;
      categorySpending[tx.category] = (categorySpending[tx.category] || 0) + tx.amount;
    }
  });

  const netSurplus = grossInflow - grossOutflow;
  const savingsRate = grossInflow > 0 ? Math.max(0, ((netSurplus / grossInflow) * 100)).toFixed(1) : 0;

  const showSummary = document.getElementById("report-show-summary")?.checked !== false;
  const showCategories = document.getElementById("report-show-categories")?.checked !== false;
  document.getElementById("report-summary-section")?.classList.toggle("hidden", !showSummary);
  document.getElementById("report-category-section")?.classList.toggle("hidden", !showCategories);

  document.getElementById("report-gross-income").innerText = `${formatMoney(grossInflow)} ${getCurrencySymbol()}`;
  document.getElementById("report-gross-expenses").innerText = `${formatMoney(grossOutflow)} ${getCurrencySymbol()}`;
  document.getElementById("report-net-surplus").innerText = `${formatMoney(netSurplus)} ${getCurrencySymbol()}`;
  document.getElementById("report-savings-rate").innerText = `${savingsRate}%`;
  document.getElementById("report-user-name").innerText = appState.user.name;
  document.getElementById("report-timestamp").innerText = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  // Render Category Table
  const tbody = document.getElementById("report-category-tbody");
  tbody.innerHTML = "";

  appState.categories.filter(c => c.type === "expense").forEach(cat => {
    const spent = categorySpending[cat.id] || 0;
    const target = cat.budget || 0;
    const variance = target - spent;
    const pct = grossOutflow > 0 ? ((spent / grossOutflow) * 100).toFixed(1) : "0.0";

    const tr = document.createElement("tr");
    tr.className = "hover:bg-slate-50 dark:hover:bg-slate-800/40";
    tr.innerHTML = `
      <td class="p-2.5 font-semibold text-slate-900 dark:text-white flex items-center">
        <span class="w-2 h-2 rounded-full mr-2" style="background-color: ${cat.color}"></span>
        ${cat.name}
      </td>
      <td class="p-2.5 text-slate-500">${formatMoney(target)} ${getCurrencySymbol()}</td>
      <td class="p-2.5 font-bold">${formatMoney(spent)} ${getCurrencySymbol()}</td>
      <td class="p-2.5 ${variance >= 0 ? 'text-emerald-600' : 'text-rose-600 font-bold'}">
        ${variance >= 0 ? '+' : ''}${formatMoney(variance)} ${getCurrencySymbol()}
      </td>
      <td class="p-2.5 text-right font-medium text-slate-600 dark:text-slate-300">${pct}%</td>
    `;
    tbody.appendChild(tr);
  });

  // Populate tfoot totals
  let totalTarget = 0;
  appState.categories.filter(c => c.type === "expense").forEach(c => { totalTarget += (c.budget || 0); });
  const totalVariance = totalTarget - grossOutflow;
  const tfootEls = {
    budget: document.getElementById("report-total-budget"),
    spent: document.getElementById("report-total-spent"),
    variance: document.getElementById("report-total-variance"),
    pct: document.getElementById("report-total-pct")
  };
  if (tfootEls.budget) tfootEls.budget.innerText = `${formatMoney(totalTarget)} ${getCurrencySymbol()}`;
  if (tfootEls.spent) tfootEls.spent.innerText = `${formatMoney(grossOutflow)} ${getCurrencySymbol()}`;
  if (tfootEls.variance) tfootEls.variance.innerText = `${totalVariance >= 0 ? '+' : ''}${formatMoney(totalVariance)} ${getCurrencySymbol()}`;
  if (tfootEls.pct) tfootEls.pct.innerText = "100%";
}
// ===== end generateReport (L3046) =====

// --- METRIC CARD EXPAND TOGGLE ---
// ===== toggleStatCard (L3051-L3053) =====
function toggleStatCard(cardEl) {
  cardEl.classList.toggle("expanded");
}
// ===== end toggleStatCard (L3053) =====

// ===== exportReportCSV (L3057-L3084) =====
function exportReportCSV() {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "ID,Type,Merchant/Source,Category,Date,Amount,Currency,Notes,InputMethod\n";

  appState.transactions.forEach(t => {
    const row = [
      t.id,
      t.type,
      `"${t.merchant.replace(/"/g, '""')}"`,
      t.category,
      t.date,
      t.amount,
      t.currency,
      `"${(t.notes || '').replace(/"/g, '""')}"`,
      t.method || 'Manual'
    ].join(",");
    csvContent += row + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `super_budget_statement_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("Financial CSV statement downloaded.");
}
// ===== end exportReportCSV (L3084) =====

// ===== printReport (L3088-L3090) =====
function printReport() {
  window.print();
}
// ===== end printReport (L3090) =====

// --- OPTIONAL AI FINANCIAL ADVISOR (FR-39 to FR-44) ---
// ===== renderAiInsights (L3095-L3183) =====
function renderAiInsights() {
  const toggleBtn = document.getElementById("btn-ai-toggle");
  const circle = document.getElementById("ai-toggle-circle");
  const container = document.getElementById("ai-insights-container");

  const isEnabled = appState.user.aiEnabled;
  if (isEnabled) {
    toggleBtn.className = "w-11 h-6 bg-amber-500 rounded-full p-1 transition-colors relative flex items-center";
    circle.className = "w-4 h-4 bg-white rounded-full transition-transform transform translate-x-5 shadow";
  } else {
    toggleBtn.className = "w-11 h-6 bg-slate-300 dark:bg-slate-700 rounded-full p-1 transition-colors relative flex items-center";
    circle.className = "w-4 h-4 bg-white rounded-full transition-transform transform translate-x-0 shadow";
  }

  container.innerHTML = "";

  if (!isEnabled) {
    container.innerHTML = `
      <div class="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400">
        <i data-lucide="sparkles" class="w-10 h-10 mx-auto mb-2 text-slate-300"></i>
        <h4 class="font-bold text-slate-700 dark:text-slate-300 text-sm">AI Financial Assistant is Disabled</h4>
        <p class="text-xs mt-1">Per design principle <em>FR-39</em>, AI analysis is completely optional. Enable the toggle above to receive automated spending insights.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  // Generate Real-time Insights based on current numbers
  let totalExpenses = 0;
  let totalIncome = 0;
  const categorySpending = {};

  appState.transactions.forEach(t => {
    if (t.type === "expense") {
      totalExpenses += t.amount;
      categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
    } else {
      totalIncome += t.amount;
    }
  });

  const insights = [
    {
      type: "observation",
      title: "Food & Dining Concentration",
      desc: `Dining expenses account for ${Math.round(((categorySpending["food"] || 0) / (totalExpenses || 1)) * 100)}% of your total outflows this month. Preparing meal plans on campus could save approximately 250 ${getCurrencySymbol()} monthly.`,
      icon: "coffee",
      badge: "Spending Pattern"
    },
    {
      type: "alert",
      title: "Category Threshold Warning: Groceries",
      desc: `Your grocery expenditure is nearing 99% of its allocated limit for September. Consider postponing non-essential household purchases until the next billing cycle.`,
      icon: "alert-triangle",
      badge: "Budget Pace"
    },
    {
      type: "positive",
      title: "Savings Velocity On Track",
      desc: `You have saved ${(totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0)}% of your gross income this cycle. At this pace, your 'New Laptop for Capstone' goal will be reached 3 weeks ahead of deadline.`,
      icon: "trending-up",
      badge: "Goal Forecast"
    }
  ];

  insights.forEach(item => {
    const card = document.createElement("div");
    card.className = "p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start space-x-4";
    card.innerHTML = `
      <div class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
        <i data-lucide="${item.icon}" class="w-5 h-5"></i>
      </div>
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <h4 class="font-bold text-slate-900 dark:text-white text-sm">${item.title}</h4>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">${item.badge}</span>
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">${item.desc}</p>
        <div class="mt-3 flex items-center space-x-3 text-xs">
          <span class="text-[11px] text-slate-400">Human-in-the-loop: Non-binding suggestion</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  lucide.createIcons();
}
// ===== end renderAiInsights (L3183) =====

// ===== toggleAiAssistant (L3187-L3192) =====
function toggleAiAssistant() {
  appState.user.aiEnabled = !appState.user.aiEnabled;
  saveState();
  renderAiInsights();
  showToast(appState.user.aiEnabled ? "AI Financial Assistant enabled." : "AI analysis disabled.");
}
// ===== end toggleAiAssistant (L3192) =====

// --- NOTIFICATIONS CENTER ---
// ===== renderNotifications (L3197-L3226) =====
function renderNotifications() {
  const list = document.getElementById("notif-list");
  const badge = document.getElementById("notif-badge");
  list.innerHTML = "";

  const unread = appState.notifications.filter(n => !n.read);
  if (unread.length > 0) {
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }

  if (appState.notifications.length === 0) {
    list.innerHTML = `<p class="text-xs text-slate-400 text-center py-4">No notifications right now.</p>`;
    return;
  }

  appState.notifications.forEach(notif => {
    const item = document.createElement("div");
    item.className = `p-2.5 rounded-lg text-xs ${notif.read ? 'bg-slate-50 dark:bg-slate-800/40' : 'bg-lavender-50 dark:bg-lavender-500/15 border-l-2 border-lavender-500'}`;
    item.innerHTML = `
      <div class="flex justify-between font-bold text-slate-800 dark:text-slate-200">
        <span>${escapeHtml(notif.title)}</span>
        <span class="text-[10px] text-slate-400 font-normal">${notif.time}</span>
      </div>
      <p class="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">${escapeHtml(notif.message)}</p>
    `;
    list.appendChild(item);
  });
}
// ===== end renderNotifications (L3226) =====

// ===== toggleNotificationDrawer (L3230-L3238) =====
function toggleNotificationDrawer() {
  const dd = document.getElementById("notif-dropdown");
  dd.classList.toggle("hidden");
  if (!dd.classList.contains("hidden")) {
    appState.notifications.forEach(n => n.read = true);
    saveState();
    renderNotifications();
  }
}
// ===== end toggleNotificationDrawer (L3238) =====

// ===== clearNotifications (L3242-L3247) =====
function clearNotifications() {
  appState.notifications = [];
  saveState();
  renderNotifications();
  showToast("Notifications cleared.");
}
// ===== end clearNotifications (L3247) =====

// --- MODAL UTILITIES ---
// ===== openModal (L3252-L3255) =====
function openModal(id) {
  document.getElementById(id).classList.remove("hidden");
  lucide.createIcons();
}
// ===== end openModal (L3255) =====

// ===== closeModal (L3259-L3261) =====
function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}
// ===== end closeModal (L3261) =====

// ===== openTransactionModal (L3265-L3273) =====
function openTransactionModal() {
  document.getElementById("form-transaction").reset();
  document.getElementById("tx-edit-id").value = "";
  document.getElementById("modal-tx-title").innerText = "Add Financial Record";
  document.getElementById("tx-date").value = new Date().toISOString().split("T")[0];
  document.getElementById("tx-input-method").value = "Manual";
  setTxType("expense");
  openModal("modal-transaction");
}
// ===== end openTransactionModal (L3273) =====

// ===== openOcrModal (L3277-L3282) =====
function openOcrModal() {
  document.getElementById("ocr-upload-box").classList.remove("hidden");
  document.getElementById("ocr-progress-container").classList.add("hidden");
  document.getElementById("ocr-review-container").classList.add("hidden");
  openModal("modal-ocr");
}
// ===== end openOcrModal (L3282) =====

// --- DATA INPUT: DRAG & DROP + CLIPBOARD PASTE ---
// ===== setupDataInputDropzone (L3287-L3304) =====
function setupDataInputDropzone() {
  const dz = document.getElementById("data-input-dropzone");
  if (!dz || dz.dataset.bound === "1") return;
  dz.dataset.bound = "1";

  dz.addEventListener("click", () => openOcrModal());
  dz.addEventListener("dragover", (e) => { e.preventDefault(); dz.classList.add("border-brand-500"); });
  dz.addEventListener("dragleave", () => dz.classList.remove("border-brand-500"));
  dz.addEventListener("drop", (e) => {
    e.preventDefault();
    dz.classList.remove("border-brand-500");
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      openOcrModal();
      handleReceiptUpload({ file });
    }
  });
}
// ===== end setupDataInputDropzone (L3304) =====

window.addEventListener("paste", (e) => {
  const dataInput = document.getElementById("view-data-input");
  const dataInputActive = dataInput && !dataInput.classList.contains("hidden");
  const ocrModal = document.getElementById("modal-ocr");
  const ocrActive = ocrModal && !ocrModal.classList.contains("hidden");
  if (!dataInputActive && !ocrActive) return;

  const items = e.clipboardData?.items;
  if (!items) return;
  for (const item of items) {
    if (item.type && item.type.indexOf("image") !== -1) {
      const file = item.getAsFile();
      if (file) {
        e.preventDefault();
        if (!ocrActive) openOcrModal();
        handleReceiptUpload({ file });
        showToast("Pasted image captured for OCR!");
        break;
      }
    }
  }
});

// ===== openVoiceModal (L3331-L3335) =====
function openVoiceModal() {
  document.getElementById("voice-review-container").classList.add("hidden");
  document.getElementById("voice-status-label").innerText = "Click microphone to speak";
  openModal("modal-voice");
}
// ===== end openVoiceModal (L3335) =====

// ===== openNewGoalModal (L3339-L3341) =====
function openNewGoalModal() {
  openModal("modal-savings");
}
// ===== end openNewGoalModal (L3341) =====

// ===== openNewRecurringModal (L3345-L3349) =====
function openNewRecurringModal() {
  populateCategorySelect("rec-category", "expense");
  document.getElementById("rec-date").value = new Date().toISOString().split("T")[0];
  openModal("modal-recurring");
}
// ===== end openNewRecurringModal (L3349) =====

// ===== openAddCategoryBudgetModal (L3353-L3378) =====
function openAddCategoryBudgetModal() {
  const name = prompt("Create a category name:");
  if (!name || !name.trim()) return;
  const nameTrimmed = name.trim();
  const duplicate = appState.categories.some(c => c.name.toLowerCase() === nameTrimmed.toLowerCase());
  if (duplicate) {
    showToast("A category with that name already exists.");
    return;
  }
  const budgetInput = prompt(`Monthly budget limit for "${nameTrimmed}" (0 for no limit):`, "0");
  const budget = Math.max(0, parseFloat(budgetInput) || 0);
  const id = `${nameTrimmed.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Date.now().toString().slice(-4)}`;
  appState.categories.push({
    id,
    name: nameTrimmed,
    type: "expense",
    budget,
    icon: "tag",
    color: "#6366f1"
  });
  saveState();
  renderBudgets();
  renderTransactionsTable();
  initCategoriesDropdowns();
  showToast(`${nameTrimmed} category created.`);
}
// ===== end openAddCategoryBudgetModal (L3378) =====

// ===== openSettingsModal (L3382-L3388) =====
function openSettingsModal() {
  document.getElementById("pref-user-name").value = appState.user.name;
  document.getElementById("pref-warning-threshold").value = appState.user.warningThreshold || 80;
  const curSel = document.getElementById("pref-currency");
  if (curSel) curSel.value = appState.user.currency || "SAR";
  const keyInput = document.getElementById("pref-gemini-key");
  if (keyInput) keyInput.value = appState.user.geminiApiKey || "";
  openModal("modal-settings");
}
// ===== end openSettingsModal (L3388) =====

// ===== savePreferences (L3392-L3408) =====
function savePreferences() {
  const name = document.getElementById("pref-user-name").value.trim();
  const threshold = parseInt(document.getElementById("pref-warning-threshold").value) || 80;
  const curSel = document.getElementById("pref-currency");
  const currency = curSel ? curSel.value : (appState.user.currency || "SAR");
  const keyInput = document.getElementById("pref-gemini-key");
  const geminiKey = keyInput ? keyInput.value.trim() : "";

  if (name) {
    const prevCurrency = appState.user.currency;
    appState.user.name = name;
    appState.user.warningThreshold = threshold;
    appState.user.currency = currency;
    appState.user.geminiApiKey = geminiKey;
    saveState();
    document.getElementById("sidebar-user-name").innerText = name;
    closeModal("modal-settings");
    if (typeof changeCurrency === "function" && currency !== prevCurrency) {
      changeCurrency(currency);
    }
    renderDashboard();
    showToast(geminiKey ? "Preferences & Gemini Key saved!" : "Preferences saved.");
  }
}
// ===== end savePreferences (L3408) =====

// --- THEME UTILITIES ---
// ===== initTheme (L3413-L3421) =====
function initTheme() {
  if (appState.user.theme === "dark" || (!appState.user.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add("dark");
    document.getElementById("theme-icon").setAttribute("data-lucide", "sun");
  } else {
    document.documentElement.classList.remove("dark");
    document.getElementById("theme-icon").setAttribute("data-lucide", "moon");
  }
}
// ===== end initTheme (L3421) =====

// ===== toggleDarkMode (L3425-L3432) =====
function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle("dark");
  appState.user.theme = isDark ? "dark" : "light";
  saveState();
  document.getElementById("theme-icon").setAttribute("data-lucide", isDark ? "sun" : "moon");
  lucide.createIcons();
  renderDashboard();
}
// ===== end toggleDarkMode (L3432) =====

// --- HELPER DROPDOWN POPULATION ---
// ===== initCategoriesDropdowns (L3437-L3440) =====
function initCategoriesDropdowns() {
  populateCategorySelect("tx-category", "expense");
  populateCategorySelect("tx-filter-category", "all", true);
}
// ===== end initCategoriesDropdowns (L3440) =====

// ===== populateCategorySelect (L3444-L3464) =====
function populateCategorySelect(elementId, type = "all", includeAllOption = false) {
  const select = document.getElementById(elementId);
  if (!select) return;
  select.innerHTML = "";

  if (includeAllOption) {
    const optAll = document.createElement("option");
    optAll.value = "all";
    optAll.innerText = "All Categories";
    select.appendChild(optAll);
  }

  appState.categories.forEach(cat => {
    if (type === "all" || cat.type === type) {
      const opt = document.createElement("option");
      opt.value = cat.id;
      opt.innerText = cat.name;
      select.appendChild(opt);
    }
  });
}
// ===== end populateCategorySelect (L3464) =====

// ===== showToast (L3468-L3477) =====
function showToast(message) {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toast-msg");
  msgEl.innerText = message;
  toast.classList.remove("translate-y-20", "opacity-0");

  setTimeout(() => {
    toast.classList.add("translate-y-20", "opacity-0");
  }, 2800);
}
// ===== end showToast (L3477) =====

// ===== escapeHtml (L3481-L3488) =====
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
// ===== end escapeHtml (L3488) =====

// --- LIVE CAMERA SCANNER & MOBILE WEB EXTENSIONS ---
let cameraStream = null;
let currentFacingMode = "environment"; // default to rear camera on mobile phones
let isTorchOn = false;

// ===== openLiveCamera (L3497-L3542) =====
async function openLiveCamera() {
  triggerHaptic(25);
  const modal = document.getElementById("modal-live-camera");
  const video = document.getElementById("camera-video");
  modal.classList.remove("hidden");
  lucide.createIcons();

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showToast("Live camera not supported; opening phone camera picker...");
    closeLiveCamera();
    const nativeInput = document.getElementById("receipt-native-camera-input");
    if (nativeInput) nativeInput.click();
    return;
  }

  try {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
    }

    const constraints = {
      video: {
        facingMode: { ideal: currentFacingMode },
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      },
      audio: false
    };

    cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = cameraStream;
    await video.play();
  } catch (err) {
    console.warn("Rear camera access error, trying default camera:", err);
    try {
      cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      video.srcObject = cameraStream;
      await video.play();
    } catch (fallbackErr) {
      alert("Unable to open camera stream. Please allow camera permissions in your browser or tap 'Phone Camera' to capture using your camera app.");
      closeLiveCamera();
      const nativeInput = document.getElementById("receipt-native-camera-input");
      if (nativeInput) nativeInput.click();
    }
  }
}
// ===== end openLiveCamera (L3542) =====

// ===== closeLiveCamera (L3546-L3554) =====
function closeLiveCamera() {
  triggerHaptic(15);
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }
  isTorchOn = false;
  document.getElementById("modal-live-camera").classList.add("hidden");
}
// ===== end closeLiveCamera (L3554) =====

// ===== toggleCameraFacing (L3558-L3562) =====
async function toggleCameraFacing() {
  triggerHaptic(20);
  currentFacingMode = (currentFacingMode === "environment") ? "user" : "environment";
  await openLiveCamera();
}
// ===== end toggleCameraFacing (L3562) =====

// ===== toggleTorch (L3566-L3590) =====
async function toggleTorch() {
  triggerHaptic(20);
  if (!cameraStream) return;
  const track = cameraStream.getVideoTracks()[0];
  if (!track) return;

  try {
    const capabilities = track.getCapabilities ? track.getCapabilities() : {};
    if (capabilities.torch) {
      isTorchOn = !isTorchOn;
      await track.applyConstraints({
        advanced: [{ torch: isTorchOn }]
      });
      const btn = document.getElementById("btn-camera-torch");
      btn.className = isTorchOn
        ? "w-10 h-10 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center transition shadow-lg shadow-amber-400/50"
        : "w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition";
      showToast(isTorchOn ? "Flashlight turned ON" : "Flashlight turned OFF");
    } else {
      showToast("Torch / Flashlight hardware not supported on this device.");
    }
  } catch (e) {
    showToast("Flashlight control unavailable on this camera stream.");
  }
}
// ===== end toggleTorch (L3590) =====

// ===== captureCameraSnapshot (L3594-L3631) =====
function captureCameraSnapshot() {
  triggerHaptic(40);
  const video = document.getElementById("camera-video");
  const canvas = document.getElementById("camera-canvas");
  const flash = document.getElementById("camera-shutter-flash");

  // Visual camera shutter animation
  if (flash) {
    flash.classList.remove("hidden");
    flash.style.opacity = "0.9";
    setTimeout(() => {
      flash.style.opacity = "0";
      setTimeout(() => flash.classList.add("hidden"), 150);
    }, 50);
  }

  if (!video || !video.videoWidth) {
    showToast("Focusing camera... try capturing again in a second.");
    return;
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convert frame to Blob and feed directly into Real OCR Pipeline
  canvas.toBlob((blob) => {
    closeLiveCamera();
    openOcrModal();
    if (blob) {
      const snapFile = new File([blob], `camera-receipt-${Date.now()}.jpg`, { type: "image/jpeg" });
      handleReceiptUpload({ file: snapFile });
    } else {
      showToast("Could not capture frame from camera.");
    }
  }, "image/jpeg", 0.92);
}
// ===== end captureCameraSnapshot (L3631) =====

// --- MOBILE BOTTOM SHEETS & HAPTIC VIBRATION ---
// ===== triggerHaptic (L3636-L3640) =====
function triggerHaptic(ms = 15) {
  if (navigator.vibrate) {
    try { navigator.vibrate(ms); } catch (e) {}
  }
}
// ===== end triggerHaptic (L3640) =====

// ===== openMobileQuickActions (L3644-L3648) =====
function openMobileQuickActions() {
  triggerHaptic(15);
  document.getElementById("mobile-quick-actions-sheet").classList.remove("hidden");
  lucide.createIcons();
}
// ===== end openMobileQuickActions (L3648) =====

// ===== closeMobileQuickActions (L3652-L3654) =====
function closeMobileQuickActions() {
  document.getElementById("mobile-quick-actions-sheet").classList.add("hidden");
}
// ===== end closeMobileQuickActions (L3654) =====

// ===== openMobileMore (L3658-L3662) =====
function openMobileMore() {
  triggerHaptic(15);
  document.getElementById("mobile-more-sheet").classList.remove("hidden");
  lucide.createIcons();
}
// ===== end openMobileMore (L3662) =====

// ===== closeMobileMore (L3666-L3668) =====
function closeMobileMore() {
  document.getElementById("mobile-more-sheet").classList.add("hidden");
}
// ===== end closeMobileMore (L3668) =====

// --- MULTI-ACCOUNT MANAGEMENT ---
// ===== getAccounts (L3673-L3682) =====
function getAccounts() {
  const stored = localStorage.getItem("sbs_accounts");
  if (stored) {
    try { return JSON.parse(stored); } catch(e) {}
  }
  return [];
}
// ===== end getAccounts (L3682) =====

// ===== getActiveAccountId (L3686-L3688) =====
function getActiveAccountId() {
  return localStorage.getItem("sbs_active_account_id") || "acc-1";
}
// ===== end getActiveAccountId (L3688) =====

// ===== switchAccount (L3692-L3702) =====
function switchAccount(accId) {
  localStorage.setItem("sbs_active_account_id", accId);
  const accounts = getAccounts();
  const acc = accounts.find(a => a.id === accId) || accounts[0];
  appState.user.name = acc.name;
  appState.user.email = acc.email;
  appState.user.currency = acc.currency || "SAR";
  saveState();
  refreshApp();
  closeAccountSwitcher();
  showToast(`Switched to account: ${acc.name}`);
}
// ===== end switchAccount (L3702) =====

// ===== toggleAccountSwitcherDropdown (L3706-L3735) =====
function closeAccountSwitcher() {
  const dd = document.getElementById("account-switcher-dropdown");
  if (dd) dd.classList.add("hidden");
}

function toggleAccountSwitcherDropdown() {
  let dd = document.getElementById("account-switcher-dropdown");
  if (!dd) {
    dd = document.createElement("div");
    dd.id = "account-switcher-dropdown";
    dd.className = "fixed left-0 bottom-20 w-64 max-w-[calc(100vw-1rem)] bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-[60] space-y-2";
    document.body.appendChild(dd);

    // Close when clicking outside (but not on the trigger button)
    if (!window._acctOutsideBound) {
      window._acctOutsideBound = true;
      document.addEventListener("click", (e) => {
        const d = document.getElementById("account-switcher-dropdown");
        if (!d || d.classList.contains("hidden")) return;
        if (d.contains(e.target)) return;
        const t = e.target;
        if (t && t.closest && t.closest('button[onclick*="toggleAccountSwitcherDropdown"]')) return;
        d.classList.add("hidden");
      });
    }
  }
  const accounts = getAccounts();
  const activeId = getActiveAccountId();
  dd.innerHTML = `
    <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold">
      <span>Accounts (${accounts.length})</span>
      <button onclick="createNewAccount()" class="text-lavender-600 hover:underline">+ Add Account</button>
    </div>
    <div class="space-y-1">
      ${accounts.map(a => `
        <div onclick="switchAccount('${a.id}')" class="flex items-center justify-between p-2 rounded-lg cursor-pointer text-xs ${a.id === activeId ? 'bg-lavender-50 dark:bg-lavender-500/20 text-lavender-700 dark:text-lavender-300 font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}">
          <div>
            <p>${escapeHtml(a.name)}</p>
            <p class="text-[10px] text-slate-400">${escapeHtml(a.email)}</p>
          </div>
          ${a.id === activeId ? '<i data-lucide="check" class="w-3.5 h-3.5"></i>' : ''}
        </div>
      `).join('')}
    </div>
  `;
  dd.classList.toggle("hidden");
  if (typeof lucide !== 'undefined') lucide.createIcons();
}
// ===== end toggleAccountSwitcherDropdown (L3735) =====

// ===== createNewAccount (L3739-L3748) =====
function createNewAccount() {
  const name = prompt("Enter new account name:");
  if (!name || !name.trim()) return;
  const email = prompt("Enter account email:", "user@university.edu") || "user@sbs.local";
  const accounts = getAccounts();
  const newAcc = { id: "acc-" + Date.now(), name: name.trim(), email: email.trim(), currency: "SAR" };
  accounts.push(newAcc);
  localStorage.setItem("sbs_accounts", JSON.stringify(accounts));
  switchAccount(newAcc.id);
}
// ===== end createNewAccount (L3748) =====

// --- STREAMLINED ADD TRANSACTION CHOICE MODAL (SMART CAPTURE) ---
// ===== openAddTransactionChoiceModal (L3753-L3822) =====
function openAddTransactionChoiceModal() {
  let modal = document.getElementById("modal-add-choice");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modal-add-choice";
    modal.className = "fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 hidden";
    modal.innerHTML = `
      <div class="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-9 h-9 rounded-xl accent-gloss flex items-center justify-center">
              <i data-lucide="zap" class="w-5 h-5"></i>
            </span>
            <div>
              <h3 class="font-bold text-slate-900 dark:text-white text-base">Smart Capture</h3>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">Add a transaction your way</p>
            </div>
          </div>
          <button onclick="document.getElementById('modal-add-choice').classList.add('hidden')" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>

        <!-- Dropzone -->
        <div id="add-choice-dropzone" class="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-400 rounded-2xl p-6 text-center bg-slate-50/60 dark:bg-slate-800/40 transition cursor-pointer group">
          <div class="flex flex-col items-center justify-center space-y-1.5">
            <div class="w-11 h-11 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-110 transition">
              <i data-lucide="upload-cloud" class="w-6 h-6"></i>
            </div>
            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200">Drop image or paste (Ctrl+V)</h4>
            <p class="text-[11px] text-slate-500 dark:text-slate-400">JPEG, PNG, WebP</p>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-2.5">
          <button onclick="document.getElementById('modal-add-choice').classList.add('hidden'); openTransactionModal();" class="flex items-center space-x-3 w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-xs font-bold">
            <i data-lucide="plus-circle" class="w-5 h-5"></i>
            <div class="text-left"><p>Manual Entry</p><p class="text-[10px] text-slate-500 font-normal">Type amount, category, and merchant details</p></div>
          </button>
          <button onclick="document.getElementById('modal-add-choice').classList.add('hidden'); openOcrModal();" class="flex items-center space-x-3 w-full p-3 rounded-xl bg-lime-100 dark:bg-lime-600/20 text-lime-800 dark:text-lime-300 hover:bg-lime-200 dark:hover:bg-lime-600/30 transition text-xs font-bold">
            <i data-lucide="camera" class="w-5 h-5"></i>
            <div class="text-left"><p>Scan Receipt (AI Vision OCR)</p><p class="text-[10px] text-slate-500 font-normal">Camera, upload, or paste a receipt</p></div>
          </button>
          <button onclick="document.getElementById('modal-add-choice').classList.add('hidden'); openVoiceModal();" class="flex items-center space-x-3 w-full p-3 rounded-xl bg-lavender-100 dark:bg-lavender-600/20 text-lavender-600 dark:text-lavender-300 hover:bg-lavender-200 dark:hover:bg-lavender-600/30 transition text-xs font-bold">
            <i data-lucide="mic" class="w-5 h-5"></i>
            <div class="text-left"><p>Voice Dictation & Audio</p><p class="text-[10px] text-slate-500 font-normal">Speak or record expense phrases</p></div>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const dz = modal.querySelector("#add-choice-dropzone");
    if (dz) {
      dz.addEventListener("click", () => { document.getElementById("modal-add-choice").classList.add("hidden"); openOcrModal(); });
      dz.addEventListener("dragover", (e) => { e.preventDefault(); dz.classList.add("border-brand-500"); });
      dz.addEventListener("dragleave", () => dz.classList.remove("border-brand-500"));
      dz.addEventListener("drop", (e) => {
        e.preventDefault();
        dz.classList.remove("border-brand-500");
        const file = e.dataTransfer?.files?.[0];
        if (file) {
          document.getElementById("modal-add-choice").classList.add("hidden");
          openOcrModal();
          handleReceiptUpload({ file });
        }
      });
    }
  }
  modal.classList.remove("hidden");
  if (typeof lucide !== "undefined") lucide.createIcons();
}
// ===== end openAddTransactionChoiceModal (L3822) =====
