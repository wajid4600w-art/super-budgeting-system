/* Zero-dependency TOTP (RFC 6238) + base32 helpers for SBS 2FA. */
(function () {
  const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  function base32Decode(str) {
    const clean = String(str).toUpperCase().replace(/=+$/, '').replace(/\s/g, '');
    let bits = 0, value = 0;
    const out = [];
    for (const ch of clean) {
      const idx = B32.indexOf(ch);
      if (idx === -1) continue;
      value = (value << 5) | idx;
      bits += 5;
      if (bits >= 8) { out.push((value >>> (bits - 8)) & 0xff); bits -= 8; }
    }
    return new Uint8Array(out);
  }

  function base32Encode(bytes) {
    let bits = 0, value = 0, out = '';
    for (const byte of bytes) {
      value = (value << 8) | byte;
      bits += 8;
      while (bits >= 5) { out += B32[(value >>> (bits - 5)) & 31]; bits -= 5; }
    }
    if (bits > 0) out += B32[(value << (5 - bits)) & 31];
    return out;
  }

  function generateSecret() {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    return base32Encode(bytes);
  }

  function totpCode(secret, counter) {
    const buf = new ArrayBuffer(8);
    const dv = new DataView(buf);
    dv.setUint32(0, Math.floor(counter / 0x100000000));
    dv.setUint32(4, counter >>> 0);
    const key = base32Decode(secret);
    const hmac = crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign'])
      .then(k => crypto.subtle.sign('HMAC', k, buf))
      .then(sig => {
        const h = new Uint8Array(sig);
        const offset = h[h.length - 1] & 0x0f;
        const code = ((h[offset] & 0x7f) << 24) | ((h[offset + 1] & 0xff) << 16) | ((h[offset + 2] & 0xff) << 8) | (h[offset + 3] & 0xff);
        return String(code % 1000000).padStart(6, '0');
      });
    return hmac;
  }

  async function verify(secret, token, window = 1) {
    if (!secret || !token) return false;
    const clean = String(token).replace(/\s/g, '');
    if (!/^\d{6}$/.test(clean)) return false;
    const counter = Math.floor(Date.now() / 1000 / 30);
    for (let w = -window; w <= window; w++) {
      const c = await totpCode(secret, counter + w);
      if (c === clean) return true;
    }
    return false;
  }

  function otpauthUri(secret, account) {
    const label = encodeURIComponent('SBS:' + (account || 'user'));
    return `otpauth://totp/${label}?secret=${secret}&issuer=SuperBudgetingSystem&algorithm=SHA1&digits=6&period=30`;
  }

  window.SBSTOTP = { generateSecret, verify, otpauthUri, totpCode };
})();