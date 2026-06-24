const http = require('http');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const port = 4174;
const host = '127.0.0.1';

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.csv': 'text/csv; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  res.end(body);
}

function safeTargetFromRequest(req, requestedFilename) {
  let rel = String(requestedFilename || '').trim().replace(/\\/g, '/');

  if (!rel || rel === 'index.html') {
    const ref = req.headers.referer || '';
    try {
      const refPath = decodeURIComponent(new URL(ref).pathname).replace(/^\/+/, '');
      if (refPath.endsWith('/index.html') || refPath.endsWith('.html')) rel = refPath;
    } catch {
      // keep the original value
    }
  }

  rel = rel.replace(/^\/+/, '');
  const target = path.resolve(root, rel);
  const rootWithSep = root.endsWith(path.sep) ? root : root + path.sep;

  if (!(target === root || target.startsWith(rootWithSep))) {
    throw new Error('invalid path');
  }
  if (path.extname(target).toLowerCase() !== '.html') {
    throw new Error('invalid extension');
  }
  if (!fs.existsSync(target)) {
    throw new Error('not found');
  }
  return target;
}

function removeElementById(html, tagName, id) {
  const startNeedle = `<${tagName} id="${id}"`;
  const start = html.indexOf(startNeedle);
  if (start < 0) return html;

  if (tagName !== 'div') {
    const endNeedle = `</${tagName}>`;
    const end = html.indexOf(endNeedle, start);
    return end < 0 ? html.slice(0, start) : html.slice(0, start) + html.slice(end + endNeedle.length);
  }

  const divTag = /<\/?div\b[^>]*>/gi;
  divTag.lastIndex = start;
  let depth = 0;
  let match;
  while ((match = divTag.exec(html))) {
    if (match[0].startsWith('</')) depth -= 1;
    else depth += 1;
    if (depth === 0) {
      return html.slice(0, start) + html.slice(divTag.lastIndex);
    }
  }
  return html;
}

function cleanSavedHtml(html) {
  let out = String(html || '');
  out = out.replace(/<style\b[^>]*>[\s\S]*?#et-panel[\s\S]*?<\/style>/gi, '');
  out = out.replace(/<style\b[^>]*>[\s\S]*?--litepicker[\s\S]*?<\/style>/gi, '');
  out = removeElementById(out, 'div', 'et-panel');
  out = removeElementById(out, 'button', 'et-toggle');
  out = removeElementById(out, 'div', 'et-toast');
  out = out.replace(/<div id="progress"[^>]*>[\s\S]*?<\/div>\s*(?=<div class="tap left")/i, '<div id="progress"></div>\n  ');
  out = out.replace(/(<div id="track")\s+style="[^"]*"/i, '$1');
  out = out.replace(/(<div class="navbtn" id="btn-(?:prev|next)"[^>]*)\s+style="[^"]*"/gi, '$1');
  out = out.replace(/(<iframe\b[^>]*)\s+style="[^"]*"/gi, '$1');
  out = out.replace(/<body([^>]*)class="([^"]*)"([^>]*)>/i, (m, a, cls, b) => {
    cls = cls.replace(/\b(?:editing|boceto-active)\b/g, '').trim().replace(/\s+/g, ' ');
    return cls ? `<body${a}class="${cls}"${b}>` : `<body${a}${b}>`;
  });
  out = out.replace(/<body([^>]*)class="([^"]*)\bediting\b([^"]*)"([^>]*)>/i, (m, a, b, c, d) => {
    const cls = `${b} ${c}`.trim().replace(/\s+/g, ' ');
    return cls ? `<body${a}class="${cls}"${d}>` : `<body${a}${d}>`;
  });
  out = out.replace(/\scontenteditable=(["'])true\1/gi, ' contenteditable="false"');
  return out;
}

function handleSave(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
    if (body.length > 10 * 1024 * 1024) req.destroy();
  });
  req.on('end', () => {
    try {
      const payload = JSON.parse(body || '{}');
      const target = safeTargetFromRequest(req, payload.filename || payload.path);
      fs.writeFileSync(target, cleanSavedHtml(payload.html), 'utf8');
      send(res, 200, { 'Content-Type': types['.json'] }, JSON.stringify({ ok: true, file: path.relative(root, target) }));
    } catch (error) {
      send(res, 400, { 'Content-Type': types['.json'] }, JSON.stringify({ ok: false, error: error.message }));
    }
  });
}

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return send(res, 200, {}, '');

  if (req.method === 'POST' && req.url === '/api/save') {
    return handleSave(req, res);
  }

  const raw = (req.url || '/').split('?')[0];
  let decoded;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    decoded = raw;
  }

  let target = path.resolve(root, '.' + decoded);
  const rootWithSep = root.endsWith(path.sep) ? root : root + path.sep;
  if (!(target === root || target.startsWith(rootWithSep))) {
    return send(res, 403, { 'Content-Type': types['.txt'] }, 'Forbidden');
  }

  fs.stat(target, (statErr, stat) => {
    if (!statErr && stat.isDirectory()) target = path.join(target, 'index.html');
    fs.readFile(target, (readErr, data) => {
      if (readErr) return send(res, 404, { 'Content-Type': types['.txt'] }, 'Not found');
      send(res, 200, { 'Content-Type': types[path.extname(target).toLowerCase()] || 'application/octet-stream' }, data);
    });
  });
}).listen(port, host, () => {
  console.log(`Presentation server listening on http://${host}:${port}`);
});
