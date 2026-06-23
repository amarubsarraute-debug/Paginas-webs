const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

const files = fs.readdirSync(ROOT);
const presentations = files.filter(f => f.startsWith('propuesta-') && f.endsWith('.html'));

console.log('\n==================================================');
console.log('   APLICANDO ESCALA DINÁMICA E INTERACCIÓN (JS)');
console.log('==================================================\n');

presentations.forEach(file => {
  const filePath = path.join(ROOT, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Limpiar el CSS viejo del iframe
  const oldIframeCSS = /\.iframe-viewport\s+iframe\s*\{[^}]*\}/g;
  const newIframeCSS = `.iframe-viewport iframe{position:absolute;top:0;left:0;border:none;pointer-events:auto;}`;
  
  content = content.replace(oldIframeCSS, newIframeCSS);

  // 2. Inyectar la función de escalado dinámico en JS
  const jsScaleFunction = `
function scaleIframe() {
  const viewport = document.querySelector('.iframe-viewport');
  if (!viewport) return;
  const iframe = viewport.querySelector('iframe');
  if (!iframe) return;
  const containerWidth = viewport.clientWidth;
  const scale = containerWidth / 375;
  
  iframe.style.width = '375px';
  iframe.style.height = (400 / scale) + 'px';
  iframe.style.transform = 'scale(' + scale + ')';
  iframe.style.transformOrigin = 'top left';
  iframe.style.pointerEvents = 'auto';
}
window.addEventListener('resize', scaleIframe);
window.addEventListener('load', scaleIframe);
setTimeout(scaleIframe, 300);
setTimeout(scaleIframe, 1000);
`;

  // Insertar la función antes de render(); en el script
  if (content.includes('render();')) {
    content = content.replace('render();', jsScaleFunction + '\nrender();');
    console.log(`✓ Función de escala JS inyectada en: ${file}`);
  } else {
    console.log(`⚠ No se pudo inyectar automáticamente en: ${file} (no se encontró render())`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Iframe optimizado en: ${file}\n`);
});

console.log('==================================================');
console.log('✨ ¡Operación completada!');
console.log('==================================================\n');
