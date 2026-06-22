/* Servidor local para PUMAS MMA — sin dependencias.
   Uso:  node serve.js   (o doble clic en "VER WEB.bat")
   Luego abrí:  http://localhost:8765
   No cachea: editás index.html, guardás, refrescás y ves el cambio. */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8765;
const ROOT = __dirname;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif':  'image/gif',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf'
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';

  // Evitar salir de la carpeta del proyecto
  const filePath = path.normalize(path.join(ROOT, urlPath));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1 style="font-family:sans-serif">404 — no encontrado</h1>');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': TYPES[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('\n  PUMAS MMA — servidor local activo');
  console.log('  ➜  http://localhost:' + PORT + '\n');
  console.log('  (Dejá esta ventana abierta. Ctrl+C para detener.)\n');
});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error('\n  El puerto ' + PORT + ' ya está en uso. Cerrá el otro servidor o cambiá PORT en serve.js\n');
  } else {
    console.error(e);
  }
});
