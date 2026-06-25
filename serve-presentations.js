const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Handle save API
  if (req.method === 'POST' && req.url === '/api/save') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { filename, html, guideTexts } = JSON.parse(body);
        if (!filename || !filename.startsWith('propuesta-') || !filename.endsWith('.html')) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          return res.end(JSON.stringify({ error: 'Nombre de archivo inválido' }));
        }

        const safeFilename = path.basename(filename);
        const filePath = path.join(ROOT, safeFilename);

        if (!fs.existsSync(filePath)) {
          res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
          return res.end(JSON.stringify({ error: 'Archivo no encontrado' }));
        }

        // Reemplazar la declaración de guideTexts en el script
        const guideTextsRegex = /const\s+guideTexts\s*=\s*\[[\s\S]*?\];/;
        const serializedGuide = `const guideTexts = ${JSON.stringify(guideTexts, null, 2)};`;
        const updatedHtml = html.replace(guideTextsRegex, serializedGuide);

        fs.writeFileSync(filePath, updatedHtml, 'utf8');
        console.log(`[Server] Guardado con éxito: ${safeFilename}`);

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        console.error('[Server] Error al guardar:', err);
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Decodificar la URL del request y remover query params
  const urlPath = decodeURIComponent(req.url).split('?')[0];

  // Servir el index con la lista de presentaciones
  if (urlPath === '/' || urlPath === '') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(generateIndexPage());
  }

  // Servir archivos estáticos
  let filePath = path.join(ROOT, urlPath);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found');
    }

    if (stats.isDirectory()) {
      // Intentar servir index.html dentro de la carpeta
      filePath = path.join(filePath, 'index.html');
    }

    fs.stat(filePath, (errFile, statsFile) => {
      if (errFile || !statsFile.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('404 Not Found');
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    });
  });
});

function generateIndexPage() {
  const files = fs.readdirSync(ROOT);
  const presentations = files.filter(f => f.startsWith('propuesta-') && f.endsWith('.html'));

  const itemsHtml = presentations.map(p => {
    const name = p.replace('propuesta-', '').replace('.html', '').replace(/-/g, ' ');
    return `
      <div class="card">
        <div class="card-body">
          <div class="card-icon">📊</div>
          <div>
            <div class="card-title">${name}</div>
            <div class="card-meta">Archivo: <span class="code">${p}</span></div>
          </div>
        </div>
        <a href="/${p}" class="btn">Abrir Presentación</a>
      </div>
    `;
  }).join('');

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Panel de Control — Propuestas Web</title>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
      <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'Outfit', sans-serif;
          background: #f7f5f0;
          color: #1a1a1a;
          min-height: 100vh;
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          z-index: 0;
        }
        .container {
          width: 100%;
          max-width: 900px;
          position: relative;
          z-index: 1;
        }
        header {
          text-align: center;
          margin-bottom: 48px;
        }
        h1 {
          font-weight: 800;
          font-size: 36px;
          color: #1a1a1a;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }
        .subtitle {
          color: #6b6b6b;
          font-size: 16px;
          font-weight: 400;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .card {
          background: #ffffff;
          border: 1.5px solid #c8c4bc;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 16px rgba(0,0,0,0.03);
          gap: 20px;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
          border-color: #d4611a;
        }
        .card-body {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .card-icon {
          font-size: 28px;
          background: #fdf3ec;
          border: 1px solid #f0c9a0;
          border-radius: 12px;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card-title {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          text-transform: capitalize;
          margin-bottom: 4px;
        }
        .card-meta {
          font-size: 12px;
          color: #6b6b6b;
        }
        .code {
          font-family: monospace;
          background: #f3f3f0;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .btn {
          background: #1a1a1a;
          color: #ffffff;
          text-decoration: none;
          padding: 12px 20px;
          border-radius: 10px;
          text-align: center;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s ease;
        }
        .btn:hover {
          background: #d4611a;
          box-shadow: 0 4px 12px rgba(214, 97, 26, 0.2);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <header>
          <h1>Propuestas Web Activas</h1>
          <p class="subtitle">Editá visualmente cada presentación y guardá con Ctrl+S directamente desde el navegador.</p>
        </header>
        <div class="grid">
          ${itemsHtml}
        </div>
      </div>
    </body>
    </html>
  `;
}

server.listen(PORT, () => {
  console.log(`[Server] Presentaciones online en: http://localhost:${PORT}`);
});
