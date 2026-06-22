const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DIST_DIR = path.join(ROOT, 'dist-presentations');

// Asegurar directorio dist
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR);
}

const EXCLUDES = ['node_modules', '.git', '.claude', '.next', '.tanstack', '_work', '.lovable', 'bun.lock', 'package-lock.json'];

function copyRecursiveSync(src, dest) {
  const baseName = path.basename(src);
  if (EXCLUDES.includes(baseName)) return;

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

// Obtener todas las presentaciones loom-*.html
const files = fs.readdirSync(ROOT);
const presentations = files.filter(f => f.startsWith('loom-') && f.endsWith('.html'));

if (process.argv.includes('--list')) {
  console.log('\nPresentaciones disponibles para empaquetar:');
  presentations.forEach((p, idx) => {
    console.log(`  [${idx + 1}] ${p.replace('loom-', '').replace('.html', '')} (${p})`);
  });
  console.log('\nUso: node bundle-presentation.js <nombre-o-numero-de-presentacion>');
  process.exit(0);
}

// Seleccionar la presentación de los argumentos
const targetArg = process.argv[2];
if (!targetArg) {
  console.log('\nPor favor especifica qué presentación quieres empaquetar.');
  console.log('Ejemplo: node bundle-presentation.js basil-sanitario');
  console.log('O lista todas con: node bundle-presentation.js --list\n');
  process.exit(1);
}

let selectedFile = '';
if (!isNaN(targetArg)) {
  const index = parseInt(targetArg, 10) - 1;
  if (index >= 0 && index < presentations.length) {
    selectedFile = presentations[index];
  }
} else {
  selectedFile = presentations.find(p => 
    p.toLowerCase().includes(targetArg.toLowerCase()) || 
    p.replace('loom-', '').replace('.html', '').toLowerCase() === targetArg.toLowerCase()
  );
}

if (!selectedFile) {
  console.log(`\nError: No se encontró ninguna presentación que coincida con "${targetArg}"`);
  console.log('Usa "node bundle-presentation.js --list" para ver las opciones disponibles.\n');
  process.exit(1);
}

const presentationName = selectedFile.replace('loom-', '').replace('.html', '');
console.log(`\n==================================================`);
console.log(`   EMPAQUETANDO: ${presentationName}`);
console.log(`==================================================`);

const presentationPath = path.join(ROOT, selectedFile);
const outputFolder = path.join(DIST_DIR, presentationName);

// Limpiar carpeta de destino si existe
if (fs.existsSync(outputFolder)) {
  fs.rmSync(outputFolder, { recursive: true, force: true });
}
fs.mkdirSync(outputFolder, { recursive: true });

// 1. Copiar loom-*.html como index.html
fs.copyFileSync(presentationPath, path.join(outputFolder, 'index.html'));
console.log(`✓ Copiado ${selectedFile} -> index.html`);

// 2. Copiar edit-tools.js
const editToolsPath = path.join(ROOT, 'edit-tools.js');
if (fs.existsSync(editToolsPath)) {
  fs.copyFileSync(editToolsPath, path.join(outputFolder, 'edit-tools.js'));
  console.log(`✓ Copiado edit-tools.js`);
}

// 3. Analizar la URL del iframe en el HTML para copiar los recursos embebidos
const htmlContent = fs.readFileSync(presentationPath, 'utf8');
const iframeRegex = /<iframe[^>]+src=["']([^"']+)["']/i;
const match = htmlContent.match(iframeRegex);

if (match && match[1]) {
  const iframeSrc = match[1];
  console.log(`ℹ Detectado iframe src: ${iframeSrc}`);
  
  // Extraer el primer segmento de la ruta (carpeta o archivo)
  const firstSegment = iframeSrc.split('/')[0];
  const sourcePath = path.join(ROOT, firstSegment);
  const destPath = path.join(outputFolder, firstSegment);
  
  if (fs.existsSync(sourcePath)) {
    console.log(`⚡ Copiando mockup desde: ${firstSegment}...`);
    copyRecursiveSync(sourcePath, destPath);
    console.log(`✓ Mockup copiado exitosamente.`);
  } else {
    console.log(`⚠ Advertencia: El origen del iframe "${firstSegment}" no se encontró en el directorio raíz.`);
  }
} else {
  console.log(`⚠ No se detectó ninguna etiqueta iframe con atributo src en la presentación.`);
}

console.log(`\n==================================================`);
console.log(`✨ ¡Empaquetado completado en:`);
console.log(`   ${outputFolder}`);
console.log(`==================================================\n`);
console.log(`OPCIONES PARA COMPARTIR:\n`);
console.log(`Opción A (Netlify Drop - Recomendada y simple):`);
console.log(`  1. Abre en tu navegador: https://app.netlify.com/drop`);
console.log(`  2. Arrastra y soltá la carpeta:`);
console.log(`     ${outputFolder}`);
console.log(`  3. ¡Listo! Te dará un enlace permanente gratis.\n`);
console.log(`Opción B (Surge - Desde consola en 1 segundo):`);
console.log(`  1. Ejecuta el comando:`);
console.log(`     npx surge "${outputFolder}" --domain propuesta-${presentationName}.surge.sh`);
console.log(`     (si es la primera vez, te pedirá ingresar un email y contraseña en la terminal).`);
console.log(`==================================================\n`);
