/* Descarga y verifica imágenes para PUMAS MMA.
   Lee  _img.json  (en la carpeta del proyecto): [{ slot, candidates:[{url}] }]
   Guarda la primera que funcione en  assets/{slot}.jpg
   Uso:  node tools/fetch-images.js
*/
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ASSETS = path.join(ROOT, 'assets');
const MAP = path.join(ROOT, '_img.json');

if (!fs.existsSync(ASSETS)) fs.mkdirSync(ASSETS, { recursive: true });

function get(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error('too many redirects'));
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36' }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        const next = res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, url).href;
        return resolve(get(next, redirects + 1));
      }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error('HTTP ' + res.statusCode)); }
      const ct = (res.headers['content-type'] || '').toLowerCase();
      if (!ct.startsWith('image/')) { res.resume(); return reject(new Error('not an image: ' + ct)); }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.setTimeout(25000, () => { req.destroy(new Error('timeout')); });
  });
}

(async () => {
  if (!fs.existsSync(MAP)) { console.error('No existe _img.json'); process.exit(1); }
  const data = JSON.parse(fs.readFileSync(MAP, 'utf8'));
  const result = {};
  for (const item of data) {
    const slot = item.slot;
    let ok = false;
    for (const cand of (item.candidates || [])) {
      const url = typeof cand === 'string' ? cand : cand.url;
      if (!url) continue;
      try {
        const buf = await get(url);
        if (buf.length < 8000) throw new Error('too small');
        const out = path.join(ASSETS, slot + '.jpg');
        fs.writeFileSync(out, buf);
        console.log('OK   ' + slot + '  <- ' + Math.round(buf.length / 1024) + 'KB');
        result[slot] = 'assets/' + slot + '.jpg';
        ok = true;
        break;
      } catch (e) {
        console.log('miss ' + slot + '  (' + e.message + ')');
      }
    }
    if (!ok) { result[slot] = null; console.log('FAIL ' + slot + ' — sin imagen, usar fallback CSS'); }
  }
  fs.writeFileSync(path.join(ROOT, '_img-result.json'), JSON.stringify(result, null, 2));
  console.log('\nResumen escrito en _img-result.json');
})();
