const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TRUJiLLO_DIR = path.join(ROOT, 'web-trujillo');
const BUILD_DIR = path.join(TRUJiLLO_DIR, 'legal-zen-build-main', 'dist', 'client');

// Asegurar carpeta de destino
if (!fs.existsSync(TRUJiLLO_DIR)) {
  fs.mkdirSync(TRUJiLLO_DIR, { recursive: true });
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
      .replace(/href="\/robots.txt"/g, 'href="robots.txt"')
      .replace(/src="\/hero-poster.jpg"/g, 'src="hero-poster.jpg"')
      .replace(/src="\/hero-scrub.mp4"/g, 'src="hero-scrub.mp4"');

    // Guardar el archivo index.html en web-trujillo/
    const outputPath = path.join(TRUJiLLO_DIR, 'index.html');
    fs.writeFileSync(outputPath, processedHtml, 'utf8');
    console.log('✓ HTML de Trujillo guardado en web-trujillo/index.html');

    // 3. Copiar la carpeta assets del build a web-trujillo/assets
    const srcAssets = path.join(BUILD_DIR, 'assets');
    const destAssets = path.join(TRUJiLLO_DIR, 'assets');
    if (fs.existsSync(srcAssets)) {
      console.log('⚡ Copiando assets...');
      copyRecursiveSync(srcAssets, destAssets);
      console.log('✓ Carpeta assets copiada.');
    }

    // 4. Copiar archivos adicionales (video y poster de fondo)
    ['hero-poster.jpg', 'hero-scrub.mp4', 'robots.txt'].forEach(file => {
      const srcFile = path.join(BUILD_DIR, file);
      const destFile = path.join(TRUJiLLO_DIR, file);
      if (fs.existsSync(srcFile)) {
        fs.copyFileSync(srcFile, destFile);
        console.log(`✓ Copiado archivo: ${file}`);
      }
    });

    console.log('\n✨ ¡Proceso completado con éxito!');
  });
}).on('error', (err) => {
  console.error('Error al hacer fetch al servidor local:', err.message);
});
