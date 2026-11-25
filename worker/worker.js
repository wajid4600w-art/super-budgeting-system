/**
 * SBS AI Proxy — Cloudflare Worker
 * Keeps your Gemini API key server-side (as a secret) and proxies generateContent.
 *
 * Deploy:
 *   npx wrangler login
 *   npx wrangler secret put GEMINI_KEY      # paste your Gemini key
 *   npx wrangler deploy
 *
 * Then set window.SBS_AI_PROXY_URL in firebase-config.js to the Worker URL
 * (e.g. https://sbs-ai-proxy.<subdomain>.workers.dev  or your own domain route).
 */

export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: cors });

    try {
      const url = new URL(request.url);
      const model = (url.searchParams.get('model') || 'gemini-3.5-flash-lite').replace(/[^a-zA-Z0-9._-]/g, '');
      const key = env.GEMINI_KEY;
      if (!key) {
        return new Response(JSON.stringify({ error: 'GEMINI_KEY secret is not set on the Worker' }), {
          status: 500, headers: { ...cors, 'Content-Type': 'application/json' },
        });
      }

      const body = await request.text();
      const upstream = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body }
      );
      const text = await upstream.text();
      return new Response(text, { status: upstream.status, headers: { ...cors, 'Content-Type': 'application/json' } });
    } catch (e) {
      return new Response(JSON.stringify({ error: String(e && e.message || e) }), {
        status: 500, headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }
  },
};