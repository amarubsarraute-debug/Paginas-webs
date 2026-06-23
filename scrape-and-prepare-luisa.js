const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const LUISA_DIR = path.join(ROOT, 'web-luisa');
const BUILD_DIR = path.join(LUISA_DIR, 'dist', 'client');

// Asegurar carpeta de destino
if (!fs.existsSync(LUISA_DIR)) {
  fs.mkdirSync(LUISA_DIR, { recursive: true });
}

// Función para copiar recursivamente
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

// 1. Fetch de la página web local
http.get('http://localhost:4173/', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    // 2. Hacer las rutas relativas (quitar leading slash en assets, videos, imágenes, etc.)
    let processedHtml = body
      .replace(/href="\/assets\//g, 'href="assets/')
      .replace(/src="\/assets\//g, 'src="assets/')
      .replace(/href="\/robots.txt"/g, 'href="robots.txt"');

    // Guardar el archivo index.html en web-luisa/
    const outputPath = path.join(LUISA_DIR, 'index.html');
    fs.writeFileSync(outputPath, processedHtml, 'utf8');
    console.log('✓ HTML de Luisa guardado en web-luisa/index.html');

    // 3. Copiar la carpeta assets del build a web-luisa/assets
    const srcAssets = path.join(BUILD_DIR, 'assets');
    const destAssets = path.join(LUISA_DIR, 'assets');
    if (fs.existsSync(srcAssets)) {
      console.log('⚡ Copiando assets...');
      copyRecursiveSync(srcAssets, destAssets);
      console.log('✓ Carpeta assets copiada.');
    }

    // 4. Copiar robots.txt si existe
    const robotsSrc = path.join(BUILD_DIR, 'robots.txt');
    const robotsDest = path.join(LUISA_DIR, 'robots.txt');
    if (fs.existsSync(robotsSrc)) {
      fs.copyFileSync(robotsSrc, robotsDest);
      console.log('✓ Copiado robots.txt');
    }

    console.log('\n✨ ¡Proceso de Luisa completado con éxito!');
  });
}).on('error', (err) => {
  console.error('Error al hacer fetch al servidor local:', err.message);
});
