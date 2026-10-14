// Zero-dependency Node.js HTTP Server with Gemini & Nemotron AI Integration
const http = require('http');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env if present
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
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}
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

function cleanJsonString(str) {
  let cleaned = str.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.substring(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.substring(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  return cleaned.trim();
}

// Read body helper
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

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  });
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

      // 2. Receipt OCR via Gemini Vision
      if (pathname === '/api/ai/ocr' && req.method === 'POST') {
        const body = await readJsonBody(req);
        const { imageBase64, mimeType = 'image/jpeg' } = body;

        if (!imageBase64) {
          return sendJson(res, 400, { success: false, error: 'imageBase64 is required' });
        }

        const prompt = `You are an expert OCR receipt parsing system for personal financial management.
Carefully examine the receipt image.
Extract the transaction details into valid JSON matching this schema:
{
  "merchant": "Name of the merchant, supermarket, or service (e.g. 'Panda Supermarket', 'Amazon', 'Jarir Bookstore')",
  "amount": 0.00, // Total receipt amount as a float number
  "currency": "USD or SAR or EUR or GBP", // Detected currency on receipt. Look for $, USD, SAR, SR, ر.س, €, £. If USD is indicated, set 'USD'. If not indicated, default to 'SAR'.
  "category": "one of: food, groceries, transport, housing, utilities, entertainment, health, education, shopping, other",
  "date": "YYYY-MM-DD", // Date of purchase. If year is missing or 2-digit, normalize to 2026. If date is not found, use current date.
  "invoiceNo": "Invoice / receipt number or order reference code if visible",
  "subtotal": 0.00, // Pre-tax subtotal if visible
  "tax": 0.00, // VAT or sales tax amount if visible
  "items": ["list of purchased items with prices if visible"],
  "rawText": "Full literal OCR transcript of all readable text on the receipt, line by line.",
  "confidence": 95 // integer 70-99 indicating certainty
}
Return ONLY valid raw JSON with no extra markdown or explanations.`;

        // Strip data:image/...;base64, prefix if present
        const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

        let rawOutput;
        try {
          // Primary: Gemini 3.1 Flash Lite (High-speed multimodal)
          rawOutput = await callGemini('gemini-3.1-flash-lite', [
            { text: prompt },
            { inlineData: { mimeType, data: cleanBase64 } }
          ], { responseMimeType: 'application/json' });
        } catch (err1) {
          console.warn('Gemini 3.1 flash lite failed, trying gemini-3.6-flash:', err1.message);
          rawOutput = await callGemini('gemini-3.6-flash', [
            { text: prompt },
            { inlineData: { mimeType, data: cleanBase64 } }
          ], { responseMimeType: 'application/json' });
        }

        const parsed = JSON.parse(cleanJsonString(rawOutput));
        return sendJson(res, 200, {
          success: true,
          model: 'gemini-vision',
          data: parsed
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
          rawOutput = await callGemini('gemini-3.1-flash-lite', [{ text: prompt }], { responseMimeType: 'application/json' });
        } catch (err1) {
          console.warn('Gemini failed for voice parsing, falling back to Nemotron:', err1.message);
          usedModel = 'nvidia/nemotron-3.5-lightning:free';
          rawOutput = await callOpenRouter('nvidia/nemotron-3.5-lightning:free', [
            { role: 'system', content: 'You are a financial NLP entity extractor. Output only valid JSON.' },
            { role: 'user', content: prompt }
          ]);
        }

        const parsed = JSON.parse(cleanJsonString(rawOutput));
        return sendJson(res, 200, {
          success: true,
          model: usedModel,
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
          // Primary: Gemini 3.1 Flash Lite (lightning fast JSON reasoning)
          rawOutput = await callGemini('gemini-3.1-flash-lite', [
            { text: `${systemPrompt}\n\nHere is the user's current financial profile:\n${userContext}` }
          ], { responseMimeType: 'application/json' });
        } catch (err1) {
          console.warn('Gemini failed for advisor, trying Nemotron / OpenRouter:', err1.message);
          usedModel = 'nvidia/nemotron-3.5-lightning:free';
          rawOutput = await callOpenRouter('nvidia/nemotron-3.5-lightning:free', [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Here is the user's current financial profile:\n${userContext}` }
          ]);
        }

        const parsed = JSON.parse(cleanJsonString(rawOutput));
        return sendJson(res, 200, {
          success: true,
          model: usedModel,
          data: parsed
        });
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

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  Super Budgeting System (SBS) with AI Engine Active!`);
  console.log(`  - Gemini Multimodal Vision & NLP: Configured`);
  console.log(`  - Nvidia Nemotron Reasoning: Configured`);
  console.log(`  Access the live web application at:`);
  console.log(`  http://localhost:${PORT}`);
  console.log(`=======================================================`);
});
