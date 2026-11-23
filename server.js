// ============================================================================
// Each top-level function below is bracketed by banner comments showing its
// exact line range, e.g.:
//   // ===== functionName (L10-L25) =====   <- function starts here
//   ...function body...
//   // ===== end functionName (L25) =====   <- function ends here
// Line numbers are a snapshot; re-check after edits.
// ============================================================================
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Load environment variables from .env if present
// ===== loadEnv (L15-L30) =====
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx > 0) {
        const key = trimmed.substring(0, eqIdx).trim();
        const val = trimmed.substring(eqIdx + 1).trim();
        process.env[key] = val;
      }
    }
  }
}
// ===== end loadEnv (L30) =====
loadEnv();

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;
const GEMINI_KEY = process.env.GEMINI_API_KEY || '';
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY || '';

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// --- AI API HELPERS ---
// ===== callGemini (L54-L78) =====
async function callGemini(modelName, parts, generationConfig = {}) {
  if (!GEMINI_KEY) throw new Error('GEMINI_API_KEY is not configured');
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_KEY}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: {
        temperature: 0.2,
        ...generationConfig
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from Gemini');
  return text;
}
// ===== end callGemini (L78) =====

const DEFAULT_GEMINI_MODELS = ['gemini-3.1-flash-lite', 'gemini-3.5-flash', 'gemini-3.6-flash'];

// ===== callGeminiWithFallback (L84-L97) =====
async function callGeminiWithFallback(modelList, parts, generationConfig = {}) {
  const models = modelList && modelList.length ? modelList : DEFAULT_GEMINI_MODELS;
  let lastErr;
  for (const model of models) {
    try {
      const text = await callGemini(model, parts, generationConfig);
      return { text, model };
    } catch (err) {
      lastErr = err;
      console.warn(`[Gemini Fallback] Model ${model} returned error: ${err.message}. Trying next model...`);
    }
  }
  throw lastErr;
}
// ===== end callGeminiWithFallback (L97) =====

// ===== callOpenRouter (L101-L127) =====
async function callOpenRouter(modelName, messages, temperature = 0.3) {
  if (!OPENROUTER_KEY) throw new Error('OPENROUTER_API_KEY is not configured');
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'Super Budgeting System'
    },
    body: JSON.stringify({
      model: modelName,
      messages,
      temperature
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenRouter API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error('Empty response from OpenRouter');
  return text;
}
// ===== end callOpenRouter (L127) =====

// ===== cleanJsonString (L131-L149) =====
function cleanJsonString(str) {
  if (!str) return '{}';
  let cleaned = str.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.substring(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.substring(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  cleaned = cleaned.trim();
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }
  return cleaned.trim();
}
// ===== end cleanJsonString (L149) =====

// Read body helper
// ===== readJsonBody (L154-L172) =====
function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 25 * 1024 * 1024) { // 25MB limit for images
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(new Error('Invalid JSON payload: ' + err.message));
      }
    });
    req.on('error', reject);
  });
}
// ===== end readJsonBody (L172) =====

// ===== sendJson (L176-L184) =====
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  });
  res.end(JSON.stringify(data));
}
// ===== end sendJson (L184) =====

// ============================================================================
// AUTHENTICATION (zero-dependency): users, scrypt passwords, TOTP 2FA, sessions
// ============================================================================
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');
const SESSION_COOKIE = 'sbs_session';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}
function readUsers() {
  try { return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')); } catch (e) { return []; }
}
function writeUsers(users) {
  ensureDataDir();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}
function readSessions() {
  try { return JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf8')); } catch (e) { return {}; }
}
function writeSessions(s) {
  ensureDataDir();
  fs.writeFileSync(SESSIONS_FILE, JSON.stringify(s, null, 2));
}

// Password hashing with scrypt (salt:hash)
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(String(password), salt, 64).toString('hex');
  return `${salt}:${hash}`;
}
function verifyPassword(password, stored) {
  try {
    const [salt, hash] = String(stored).split(':');
    if (!salt || !hash) return false;
    const test = crypto.scryptSync(String(password), salt, 64);
    const expected = Buffer.from(hash, 'hex');
    return test.length === expected.length && crypto.timingSafeEqual(test, expected);
  } catch (e) { return false; }
}

// TOTP (RFC 6238) + base32
const B32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
function base32Decode(str) {
  const clean = String(str).toUpperCase().replace(/=+$/, '').replace(/\s/g, '');
  let bits = 0, value = 0;
  const out = [];
  for (const ch of clean) {
    const idx = B32_ALPHABET.indexOf(ch);
    if (idx === -1) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) { out.push((value >>> (bits - 8)) & 0xff); bits -= 8; }
  }
  return Buffer.from(out);
}
function base32Encode(buf) {
  let bits = 0, value = 0, out = '';
  for (const byte of buf) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) { out += B32_ALPHABET[(value >>> (bits - 5)) & 31]; bits -= 5; }
  }
  if (bits > 0) out += B32_ALPHABET[(value << (5 - bits)) & 31];
  return out;
}
function generateTotpSecret() { return base32Encode(crypto.randomBytes(20)); }
function totpCode(secret, counter) {
  const buf = Buffer.alloc(8);
  buf.writeUInt32BE(Math.floor(counter / 0x100000000), 0);
  buf.writeUInt32BE(counter >>> 0, 4);
  const hmac = crypto.createHmac('sha1', base32Decode(secret)).update(buf).digest();
  const offset = hmac[hmac.length - 1] & 0x0f;
  const code = ((hmac[offset] & 0x7f) << 24) | ((hmac[offset + 1] & 0xff) << 16) | ((hmac[offset + 2] & 0xff) << 8) | (hmac[offset + 3] & 0xff);
  return String(code % 1000000).padStart(6, '0');
}
function verifyTotp(secret, token, window = 1) {
  if (!secret || !token) return false;
  const clean = String(token).replace(/\s/g, '');
  if (!/^\d{6}$/.test(clean)) return false;
  const counter = Math.floor(Date.now() / 1000 / 30);
  for (let w = -window; w <= window; w++) {
    if (totpCode(secret, counter + w) === clean) return true;
  }
  return false;
}
function otpauthUri(secret, account) {
  const label = encodeURIComponent(`SBS:${account}`);
  return `otpauth://totp/${label}?secret=${secret}&issuer=SuperBudgetingSystem&algorithm=SHA1&digits=6&period=30`;
}

// Sessions
function createSession(userId) {
  const sid = crypto.randomBytes(24).toString('hex');
  const sessions = readSessions();
  sessions[sid] = { userId, createdAt: Date.now() };
  writeSessions(sessions);
  return sid;
}
function getSessionUser(req) {
  const cookie = req.headers.cookie || '';
  const m = cookie.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([a-f0-9]+)`));
  if (!m) return null;
  const sessions = readSessions();
  const sess = sessions[m[1]];
  if (!sess) return null;
  if (Date.now() - sess.createdAt > SESSION_TTL_MS) { delete sessions[m[1]]; writeSessions(sessions); return null; }
  return readUsers().find(u => u.id === sess.userId) || null;
}
function destroySession(req) {
  const cookie = req.headers.cookie || '';
  const m = cookie.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([a-f0-9]+)`));
  if (m) { const s = readSessions(); delete s[m[1]]; writeSessions(s); }
}

// Simple in-memory rate limiter (counts failed attempts; 5 attempts / 5 minutes)
const _rateBuckets = {};
function ratePeek(key, max = 5, windowMs = 5 * 60 * 1000) {
  const now = Date.now();
  const recent = (_rateBuckets[key] || []).filter(t => now - t < windowMs);
  _rateBuckets[key] = recent;
  const limited = recent.length > max;
  const retryAfter = limited && recent.length ? Math.max(1, Math.ceil((recent[0] + windowMs - now) / 1000)) : 0;
  return { limited, retryAfter };
}
function rateHit(key, windowMs = 5 * 60 * 1000) {
  const now = Date.now();
  const recent = (_rateBuckets[key] || []).filter(t => now - t < windowMs);
  recent.push(now);
  _rateBuckets[key] = recent;
}
function rateClear(key) { delete _rateBuckets[key]; }
function formatDuration(totalSec) {
  const s = Math.max(0, Math.floor(totalSec));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, '0')}`;
}

function publicUser(u) {
  if (!u) return null;
  return { id: u.id, name: u.name, username: u.username, email: u.email, hasTotp: !!u.totpSecret, createdAt: u.createdAt };
}
function sendJsonCookie(res, statusCode, data, cookie) {
  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };
  if (cookie) headers['Set-Cookie'] = cookie;
  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(data));
}

// --- SERVER HANDLER ---
const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = parsedUrl.pathname;

  // --- API ROUTING ---
  if (pathname.startsWith('/api/')) {
    try {
      // 1. Status Check
      if (pathname === '/api/ai/status' && req.method === 'GET') {
        return sendJson(res, 200, {
          success: true,
          geminiConfigured: !!GEMINI_KEY,
          nemotronConfigured: !!OPENROUTER_KEY,
          geminiModel: 'gemini-3.1-flash-lite',
          nemotronModel: 'nvidia/nemotron-3.5-lightning:free'
        });
      }

      // 2. Receipt OCR via 2-Stage Pipeline (Stage 1: Pure Vision OCR Text Extraction -> Stage 2: AI Entity & Financial Parsing)
      if (pathname === '/api/ai/ocr' && req.method === 'POST') {
        const body = await readJsonBody(req);
        const { imageBase64, mimeType = 'image/jpeg' } = body;

        if (!imageBase64) {
          return sendJson(res, 400, { success: false, error: 'imageBase64 is required' });
        }

        // Strip data:image/...;base64, prefix if present
        const cleanBase64 = imageBase64.replace(/^data:image\/[a-z0-9-+.]+;base64,/, '');
        if (!/^image\/(jpeg|png|webp)$/i.test(mimeType)) {
          return sendJson(res, 400, { success: false, error: 'Unsupported image type' });
        }
        if (Buffer.from(cleanBase64, 'base64').length > 8 * 1024 * 1024) {
          return sendJson(res, 400, { success: false, error: 'Image is larger than 8 MB' });
        }

        // STAGE 1: Extract all literal OCR text from the image
        const ocrPrompt = `You are a high-precision Optical Character Recognition (OCR) engine.
Carefully examine this receipt or bill image.
Transcribe every single piece of readable text verbatim line-by-line:
- Store / merchant / vendor name, branch, address, telephone
- Date, time, transaction/receipt/invoice ID numbers
- All purchased product lines, descriptions, quantities, and prices
- Subtotal, discounts, VAT / sales tax, and total amount
- Currency indicators (SAR, SR, $, USD, EUR, etc.)

Return ONLY the plain literal text. Do not output JSON, do not add introductory remarks or markdown summaries.`;

        let rawOcrText = '';
        let visionModel = 'gemini-3.1-flash-lite';
        try {
          const gemRes = await callGeminiWithFallback(
            ['gemini-3.1-flash-lite', 'gemini-3.5-flash', 'gemini-3.6-flash'],
            [
              { text: ocrPrompt },
              { inlineData: { mimeType, data: cleanBase64 } }
            ]
          );
          rawOcrText = (gemRes.text || '').trim();
          visionModel = gemRes.model;
        } catch (err1) {
          console.error('Gemini vision OCR text extraction failed:', err1.message);
          throw new Error('Failed to extract text from receipt image: ' + err1.message);
        }

        if (!rawOcrText) {
          throw new Error('No readable text found on the uploaded image.');
        }

        // STAGE 2: AI Financial Reasoning on the extracted OCR text
        const analyzePrompt = `You are an elite financial assistant.
Analyze the following raw OCR text extracted from a purchase receipt:

--- BEGIN RECEIPT OCR TEXT ---
${rawOcrText}
--- END RECEIPT OCR TEXT ---

Extract the transaction details into valid JSON matching this exact schema:
{
  "merchant": "Exact name of the shop, merchant, or service",
  "amount": 0.00, // Grand total receipt amount as a float number
  "currency": "SAR or USD or EUR or GBP", // Detected currency. Default to 'SAR' if ambiguous or Saudi merchant.
  "category": "one of: food, groceries, transport, housing, utilities, entertainment, health, education, shopping, other",
  "date": "YYYY-MM-DD", // Purchase date formatted YYYY-MM-DD. Normalize 2-digit years to 2026. If date is not found, use current date.
  "invoiceNo": "Invoice or receipt reference number if found, or empty string",
  "subtotal": 0.00, // Pre-tax subtotal if visible, otherwise 0.00
  "tax": 0.00, // VAT or sales tax amount if visible, otherwise 0.00
  "items": ["list of purchased item descriptions with prices, e.g. 'Whole Milk 2L - 12.00 SAR'"],
  "confidence": 98 // Integer 80-99 indicating certainty
}
Return ONLY valid raw JSON with no extra markdown or explanations.`;

        let rawParsedOutput = '';
        let parseModel = 'gemini-3.1-flash-lite';
        try {
          const parseRes = await callGeminiWithFallback(
            ['gemini-3.1-flash-lite', 'gemini-3.5-flash', 'gemini-3.6-flash'],
            [{ text: analyzePrompt }],
            { responseMimeType: 'application/json' }
          );
          rawParsedOutput = parseRes.text;
          parseModel = parseRes.model;
        } catch (err2) {
          console.error('Gemini OCR text analysis failed:', err2.message);
          throw new Error('Failed to analyze extracted receipt text: ' + err2.message);
        }

        let parsedData;
        try {
          parsedData = JSON.parse(cleanJsonString(rawParsedOutput));
        } catch (jsonErr) {
          console.warn('JSON parse error in stage 2, using fallback parser:', jsonErr.message);
          parsedData = {
            merchant: 'Scanned Store',
            amount: 0.00,
            currency: 'SAR',
            category: 'other',
            date: new Date().toISOString().split('T')[0],
            items: [],
            confidence: 85
          };
        }

        // Attach full OCR text so UI can show the transcript to user
        parsedData.rawText = rawOcrText;

        return sendJson(res, 200, {
          success: true,
          visionModel,
          parseModel,
          data: parsedData
        });
      }

      // 2b. AI Analysis of pre-extracted OCR text
      if (pathname === '/api/ai/ocr-text' && req.method === 'POST') {
        const body = await readJsonBody(req);
        const { text } = body;

        if (!text) {
          return sendJson(res, 400, { success: false, error: 'text is required' });
        }

        const analyzePrompt = `You are an elite financial assistant.
Analyze the following raw OCR text extracted from a purchase receipt:

--- BEGIN RECEIPT OCR TEXT ---
${text}
--- END RECEIPT OCR TEXT ---

Extract the transaction details into valid JSON matching this exact schema:
{
  "merchant": "Exact name of the shop, merchant, or service",
  "amount": 0.00,
  "currency": "SAR or USD or EUR or GBP",
  "category": "one of: food, groceries, transport, housing, utilities, entertainment, health, education, shopping, other",
  "date": "YYYY-MM-DD",
  "invoiceNo": "Invoice or receipt reference number if found, or empty string",
  "subtotal": 0.00,
  "tax": 0.00,
  "items": ["list of purchased item descriptions with prices"],
  "confidence": 98
}
Return ONLY valid raw JSON with no extra markdown or explanations.`;

        let rawParsedOutput = '';
        let parseModel = 'gemini-3.1-flash-lite';
        try {
          const parseRes = await callGeminiWithFallback(
            ['gemini-3.1-flash-lite', 'gemini-3.5-flash', 'gemini-3.6-flash'],
            [{ text: analyzePrompt }],
            { responseMimeType: 'application/json' }
          );
          rawParsedOutput = parseRes.text;
          parseModel = parseRes.model;
        } catch (err2) {
          console.error('Gemini text analysis failed:', err2.message);
          throw new Error('Failed to analyze receipt text: ' + err2.message);
        }

        let parsedData = JSON.parse(cleanJsonString(rawParsedOutput));
        parsedData.rawText = text;

        return sendJson(res, 200, {
          success: true,
          parseModel,
          data: parsedData
        });
      }

      // 3. Voice Speech-to-Text NLP Parsing
      if (pathname === '/api/ai/voice-parse' && req.method === 'POST') {
        const body = await readJsonBody(req);
        const { text, today = new Date().toISOString().split('T')[0] } = body;

        if (!text) {
          return sendJson(res, 400, { success: false, error: 'text is required' });
        }

        const prompt = `You are a financial NLP parsing assistant for a budgeting app.
The reference today date is ${today}.
The user dictated this spoken expense or income phrase: "${text}"

Extract the financial record and return ONLY raw JSON matching this schema:
{
  "merchant": "Short clear description or merchant name (e.g. 'Lunch at Al Baik', 'Taxi to airport', 'Weekly groceries')",
  "amount": 0.00, // Total number extracted
  "category": "one of: food, groceries, transport, housing, utilities, entertainment, health, education, shopping, other",
  "date": "YYYY-MM-DD", // Calculate exact date if user said 'yesterday', 'today', '2 days ago', etc. Default to ${today}.
  "type": "expense", // 'expense' or 'income'
  "confidence": 95
}
Return ONLY valid JSON.`;

        let rawOutput;
        let usedModel = 'gemini-3.1-flash-lite';

        try {
          const gemRes = await callGeminiWithFallback(
            ['gemini-3.1-flash-lite', 'gemini-3.5-flash', 'gemini-3.6-flash'],
            [{ text: prompt }],
            { responseMimeType: 'application/json' }
          );
          rawOutput = gemRes.text;
          usedModel = gemRes.model;
        } catch (err1) {
          console.warn('Gemini models failed for voice parsing, falling back to Nemotron:', err1.message);
          if (OPENROUTER_KEY) {
            usedModel = 'nvidia/nemotron-3.5-lightning:free';
            rawOutput = await callOpenRouter('nvidia/nemotron-3.5-lightning:free', [
              { role: 'system', content: 'You are a financial NLP entity extractor. Output only valid JSON.' },
              { role: 'user', content: prompt }
            ]);
          } else {
            throw err1;
          }
        }

        const parsed = JSON.parse(cleanJsonString(rawOutput));
        return sendJson(res, 200, {
          success: true,
          model: usedModel,
          data: parsed
        });
      }

      // 3b. Gemini audio transcription and financial parsing
      if (pathname === '/api/ai/voice-audio' && req.method === 'POST') {
        const body = await readJsonBody(req);
        const { audioBase64, mimeType = 'audio/webm', today = new Date().toISOString().split('T')[0] } = body;

        if (!audioBase64) {
          return sendJson(res, 400, { success: false, error: 'audioBase64 is required' });
        }
        if (!/^audio\/(mpeg|mp4|wav|webm|ogg)$/i.test(mimeType)) {
          return sendJson(res, 400, { success: false, error: 'Unsupported audio type' });
        }

        const cleanBase64 = audioBase64.replace(/^data:audio\/[a-z0-9-+.]+;base64,/, '');
        if (Buffer.from(cleanBase64, 'base64').length > 8 * 1024 * 1024) {
          return sendJson(res, 400, { success: false, error: 'Audio is larger than 8 MB' });
        }

        const prompt = `You are a financial voice extraction assistant.
The reference today date is ${today}.
Transcribe the spoken expense or income phrase, understand it, and return ONLY valid JSON:
{
  "transcript": "Clear transcription of the spoken phrase",
  "merchant": "Short clear merchant or description",
  "amount": 0.00,
  "category": "one of: food, groceries, transport, housing, utilities, entertainment, health, education, shopping, other",
  "date": "YYYY-MM-DD",
  "type": "expense"
}`;

        const gemRes = await callGeminiWithFallback(
          ['gemini-3.1-flash-lite', 'gemini-3.5-flash', 'gemini-3.6-flash'],
          [
            { text: prompt },
            { inlineData: { mimeType, data: cleanBase64 } }
          ],
          { responseMimeType: 'application/json' }
        );

        const parsed = JSON.parse(cleanJsonString(gemRes.text));
        return sendJson(res, 200, {
          success: true,
          model: gemRes.model,
          data: parsed
        });
      }

      // 4. AI Financial Advisor & Spending Audit
      if (pathname === '/api/ai/advisor' && req.method === 'POST') {
        const body = await readJsonBody(req);
        const { summary, transactions = [], categories = [], budgets = {} } = body;

        const systemPrompt = `You are an elite AI Personal Financial Advisor and Certified Financial Planner for the Super Budgeting System.
Analyze the user's financial profile, transaction history, and budget adherence.
Return ONLY valid JSON with this exact schema:
{
  "healthScore": 85, // Integer 0-100 indicating financial wellness
  "healthStatus": "Excellent", // "Excellent", "Good", "Fair", or "Needs Attention"
  "executiveSummary": "2-3 crisp sentences highlighting overall financial standing, spending momentum, and top priority.",
  "keyInsights": [
    "Specific observation about category spending or recurring costs",
    "Specific observation about savings or budget headroom",
    "Specific observation about transaction frequencies"
  ],
  "recommendations": [
    "Actionable step 1 to save money this month",
    "Actionable step 2 for budget optimization",
    "Actionable step 3 for savings goal acceleration"
  ],
  "budgetAlerts": [
    "Alert if any category is nearing or exceeding threshold (e.g. 'Food & Dining is at 92% of budget')"
  ]
}
Return ONLY raw valid JSON.`;

        const userContext = JSON.stringify({
          summary,
          recentTransactions: transactions.slice(-15),
          categories,
          budgets
        }, null, 2);

        let rawOutput;
        let usedModel = 'gemini-3.1-flash-lite';

        try {
          const gemRes = await callGeminiWithFallback(
            ['gemini-3.1-flash-lite', 'gemini-3.5-flash', 'gemini-3.6-flash'],
            [{ text: `${systemPrompt}\n\nHere is the user's current financial profile:\n${userContext}` }],
            { responseMimeType: 'application/json' }
          );
          rawOutput = gemRes.text;
          usedModel = gemRes.model;
        } catch (err1) {
          console.warn('Gemini failed for advisor, trying Nemotron / OpenRouter:', err1.message);
          if (OPENROUTER_KEY) {
            usedModel = 'nvidia/nemotron-3.5-lightning:free';
            rawOutput = await callOpenRouter('nvidia/nemotron-3.5-lightning:free', [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: `Here is the user's current financial profile:\n${userContext}` }
            ]);
          } else {
            throw err1;
          }
        }

        const parsed = JSON.parse(cleanJsonString(rawOutput));
        return sendJson(res, 200, {
          success: true,
          model: usedModel,
          data: parsed
        });
      }

      // --- AUTH ROUTES ---
      if (pathname === '/api/auth/register' && req.method === 'POST') {
        const body = await readJsonBody(req);
        const name = (body.name || '').trim();
        const username = (body.username || '').trim().toLowerCase();
        const email = (body.email || '').trim().toLowerCase();
        const password = body.password || '';
        const secretQuestion = (body.secretQuestion || '').trim();
        const secretAnswer = (body.secretAnswer || '').trim().toLowerCase();
        if (!name || !username || !password || !secretQuestion || !secretAnswer) {
          return sendJson(res, 400, { success: false, error: 'Name, username, password, secret question and answer are required.' });
        }
        if (password.length < 8) {
          return sendJson(res, 400, { success: false, error: 'Password must be at least 8 characters.' });
        }
        const users = readUsers();
        if (users.some(u => u.username === username || (email && u.email === email))) {
          return sendJson(res, 409, { success: false, error: 'An account with that username or email already exists.' });
        }
        const totpSecret = generateTotpSecret();
        const user = {
          id: crypto.randomBytes(12).toString('hex'),
          name, username, email,
          passwordHash: hashPassword(password),
          secretQuestion,
          secretAnswerHash: hashPassword(secretAnswer),
          totpSecret,
          createdAt: Date.now()
        };
        users.push(user);
        writeUsers(users);
        return sendJson(res, 201, {
          success: true,
          user: publicUser(user),
          totp: { secret: totpSecret, otpauth: otpauthUri(totpSecret, username) }
        });
      }

      if (pathname === '/api/auth/login' && req.method === 'POST') {
        const ip = req.socket.remoteAddress || 'unknown';
        const rl = ratePeek('login:' + ip, 5, 5 * 60 * 1000);
        if (rl.limited) {
          return sendJson(res, 429, { success: false, error: `Too many failed attempts. Try again in ${formatDuration(rl.retryAfter)}.`, retryAfter: rl.retryAfter });
        }
        const body = await readJsonBody(req);
        const username = (body.username || '').trim().toLowerCase();
        const password = body.password || '';
        const code = (body.code || body.totp || '').trim();
        const user = readUsers().find(u => u.username === username || (u.email && u.email === username));
        if (!user || !verifyPassword(password, user.passwordHash)) {
          rateHit('login:' + ip, 5 * 60 * 1000);
          const rl2 = ratePeek('login:' + ip, 5, 5 * 60 * 1000);
          if (rl2.limited) {
            return sendJson(res, 429, { success: false, error: `Too many failed attempts. Try again in ${formatDuration(rl2.retryAfter)}.`, retryAfter: rl2.retryAfter });
          }
          return sendJson(res, 401, { success: false, error: 'Invalid username or password.' });
        }
        if (user.totpSecret) {
          if (!code) {
            return sendJson(res, 200, { success: false, twoFactor: true, message: 'Enter the 6-digit code from your authenticator app.' });
          }
          if (!verifyTotp(user.totpSecret, code)) {
            rateHit('login:' + ip, 5 * 60 * 1000);
            const rl3 = ratePeek('login:' + ip, 5, 5 * 60 * 1000);
            if (rl3.limited) {
              return sendJson(res, 429, { success: false, error: `Too many failed attempts. Try again in ${formatDuration(rl3.retryAfter)}.`, retryAfter: rl3.retryAfter });
            }
            return sendJson(res, 401, { success: false, error: 'Invalid authenticator code.' });
          }
        }
        rateClear('login:' + ip);
        const sid = createSession(user.id);
        const cookie = `${SESSION_COOKIE}=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}`;
        return sendJsonCookie(res, 200, { success: true, user: publicUser(user) }, cookie);
      }

      if (pathname === '/api/auth/logout' && req.method === 'POST') {
        destroySession(req);
        return sendJsonCookie(res, 200, { success: true }, `${SESSION_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`);
      }

      if (pathname === '/api/auth/me' && req.method === 'GET') {
        const user = getSessionUser(req);
        if (!user) return sendJson(res, 401, { success: false, error: 'Not authenticated' });
        return sendJson(res, 200, { success: true, user: publicUser(user) });
      }

      if (pathname === '/api/auth/recover' && req.method === 'POST') {
        const ip = req.socket.remoteAddress || 'unknown';
        const rl = ratePeek('recover:' + ip, 5, 5 * 60 * 1000);
        if (rl.limited) {
          return sendJson(res, 429, { success: false, error: `Too many failed attempts. Try again in ${formatDuration(rl.retryAfter)}.`, retryAfter: rl.retryAfter });
        }
        const body = await readJsonBody(req);
        const username = (body.username || '').trim().toLowerCase();
        const secretAnswer = (body.secretAnswer || '').trim().toLowerCase();
        const newPassword = body.newPassword || '';
        if (newPassword.length < 8) return sendJson(res, 400, { success: false, error: 'Password must be at least 8 characters.' });
        const users = readUsers();
        const user = users.find(u => u.username === username || (u.email && u.email === username));
        if (!user || !verifyPassword(secretAnswer, user.secretAnswerHash)) {
          rateHit('recover:' + ip, 5 * 60 * 1000);
          const rl2 = ratePeek('recover:' + ip, 5, 5 * 60 * 1000);
          if (rl2.limited) {
            return sendJson(res, 429, { success: false, error: `Too many failed attempts. Try again in ${formatDuration(rl2.retryAfter)}.`, retryAfter: rl2.retryAfter });
          }
          return sendJson(res, 401, { success: false, error: 'Incorrect account or secret answer.' });
        }
        rateClear('recover:' + ip);
        user.passwordHash = hashPassword(newPassword);
        writeUsers(users);
        return sendJson(res, 200, { success: true, message: 'Password has been reset. You can now log in.' });
      }

      return sendJson(res, 404, { success: false, error: 'API endpoint not found' });
    } catch (apiErr) {
      console.error('API Error:', apiErr);
      return sendJson(res, 500, { success: false, error: apiErr.message });
    }
  }

  // --- STATIC FILE SERVING ---
  let reqPath = parsedUrl.pathname;
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  // Gate the main app behind authentication
  if (reqPath === '/index.html' && !getSessionUser(req)) {
    res.writeHead(302, { Location: '/login.html' });
    return res.end();
  }

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(PUBLIC_DIR, safePath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Retrying or binding...`);
  } else {
    console.error('HTTP Server error:', err);
  }
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  Super Budgeting System (SBS) with AI Engine Active!`);
  console.log(`  - Gemini Multimodal Vision & NLP: Configured`);
  console.log(`  - Nvidia Nemotron Reasoning: Configured`);
  console.log(`  Access the live web application at:`);
  console.log(`  http://localhost:${PORT}`);
  console.log(`=======================================================`);
});