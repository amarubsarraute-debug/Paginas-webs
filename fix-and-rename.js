const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

// 1. Obtener archivos loom-*.html
const files = fs.readdirSync(ROOT);
const presentations = files.filter(f => f.startsWith('loom-') && f.endsWith('.html'));

console.log('\n==================================================');
console.log('   CORRIGIENDO CSS Y RENOMBRANDO PRESENTACIONES');
console.log('==================================================\n');

presentations.forEach(file => {
  const filePath = path.join(ROOT, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Reemplazar CSS del iframe
  const oldIframeCSS = /width:\s*375px;\s*height:\s*812px;\s*border:\s*none;\s*transform-origin:\s*top\s+left;\s*transform:\s*scale\(calc\(100%\s*\/\s*375\)\);\s*pointer-events:\s*none;/g;
  const newIframeCSS = 'width:100%;height:100%;border:none;pointer-events:none;';
  
  if (content.match(oldIframeCSS)) {
    content = content.replace(oldIframeCSS, newIframeCSS);
    console.log(`✓ CSS corregido en: ${file}`);
  } else {
    // Intento con espacios/comillas variantes
    const variantRegex = /width:\s*375px;.*?transform:\s*scale\(.*?\);.*?pointer-events:\s*none;/g;
    if (content.match(variantRegex)) {
      content = content.replace(variantRegex, newIframeCSS);
      console.log(`✓ CSS corregido (variante) en: ${file}`);
    } else {
      console.log(`⚠ No se pudo encontrar el CSS del iframe en: ${file}`);
    }
  }

  // Eliminar el media query de escala responsive que rompe en móviles
  const oldMediaQuery = /@media\(max-width:\s*440px\)\{\.iframe-viewport\s+iframe\{transform:\s*scale\(calc\(100vw\s*\/\s*375\s*-\s*0\.1\)\);\}\}/g;
  if (content.match(oldMediaQuery)) {
    content = content.replace(oldMediaQuery, '/* escala simplificada */');
    console.log(`✓ Media query de escala removido en: ${file}`);
  }

  // Guardar cambios en el archivo original antes de renombrar
  fs.writeFileSync(filePath, content, 'utf8');

  // Renombrar de loom-*.html a propuesta-*.html
  const newFileName = file.replace('loom-', 'propuesta-');
  const newFilePath = path.join(ROOT, newFileName);

  if (fs.existsSync(newFilePath)) {
    fs.unlinkSync(newFilePath); // Eliminar si ya existe
  }
  fs.renameSync(filePath, newFilePath);
  console.log(`➜ Renombrado: ${file} ===> ${newFileName}\n`);
});

// 2. Actualizar serve-presentations.js
const servePath = path.join(ROOT, 'serve-presentations.js');
if (fs.existsSync(servePath)) {
  let serveContent = fs.readFileSync(servePath, 'utf8');
  serveContent = serveContent.replace(/loom-/g, 'propuesta-');
  serveContent = serveContent.replace(/Presentaciones Loom/g, 'Propuestas Web');
  fs.writeFileSync(servePath, serveContent, 'utf8');
  console.log('✓ Actualizado serve-presentations.js para usar prefix "propuesta-"');
}

// 3. Actualizar bundle-presentation.js
const bundlePath = path.join(ROOT, 'bundle-presentation.js');
if (fs.existsSync(bundlePath)) {
  let bundleContent = fs.readFileSync(bundlePath, 'utf8');
  bundleContent = bundleContent.replace(/loom-/g, 'propuesta-');
  fs.writeFileSync(bundlePath, bundleContent, 'utf8');
  console.log('✓ Actualizado bundle-presentation.js para usar prefix "propuesta-"');
}

console.log('\n==================================================');
console.log('✨ ¡Operación completada con éxito!');
console.log('==================================================\n');
