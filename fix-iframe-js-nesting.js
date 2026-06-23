const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

const files = fs.readdirSync(ROOT);
const presentations = files.filter(f => f.startsWith('propuesta-') && f.endsWith('.html'));

const cleanScriptContent = `
const TOTAL=document.querySelectorAll('.scr').length;
let current=0;
let editMode=false;
const prog=document.getElementById('progress');
for(let i=0;i<TOTAL;i++){
  const b=document.createElement('div');
  b.className='bar';
  b.innerHTML='<i></i>';
  prog.appendChild(b);
}
const bars=document.querySelectorAll('.bar');
function render(){
  document.getElementById('track').style.transform=\`translateX(-\${current*100}%)\`;
  bars.forEach((b,i)=>{
    b.classList.remove('done','active');
    if(i<current)b.classList.add('done');
    if(i===current)b.classList.add('active');
  });
  document.getElementById('btn-prev').style.opacity=current===0?'0.25':'1';
  document.getElementById('btn-next').style.opacity=current===TOTAL-1?'0.25':'1';
}
function go(dir){
  const next=current+dir;
  if(next<0||next>=TOTAL)return;
  current=next;
  render();
}
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

let sx=0,sy=0;
const frame=document.getElementById('frame');
frame.addEventListener('touchstart',e=>{
  sx=e.touches[0].clientX;
  sy=e.touches[0].clientY;
},{passive:true});
frame.addEventListener('touchend',e=>{
  const dx=e.changedTouches[0].clientX-sx;
  const dy=e.changedTouches[0].clientY-sy;
  if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>40){
    go(dx<0?1:-1);
  }
},{passive:true});
document.addEventListener('keydown',e=>{
  if(editMode&&e.key==='Escape'){
    exitEdit();
    return;
  }
  if(editMode)return;
  if(e.key==='e'||e.key==='E')enterEdit();
  if(e.key==='ArrowRight')go(1);
  if(e.key==='ArrowLeft')go(-1);
});
function enterEdit(){
  editMode=true;
  document.body.classList.add('editing');
  document.querySelectorAll('[contenteditable]').forEach(el=>el.contentEditable='true');
}
function exitEdit(){
  editMode=false;
  document.body.classList.remove('editing');
  document.querySelectorAll('[contenteditable]').forEach(el=>{
    el.blur();
    el.contentEditable='false';
  });
}
document.querySelectorAll('[contenteditable]').forEach(el=>el.contentEditable='false');
render();
`;

presentations.forEach(file => {
  const filePath = path.join(ROOT, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Regex to match the script tag without src
  const scriptRegex = /<script>([\s\S]*?)<\/script>/;
  const match = html.match(scriptRegex);

  if (match) {
    // Replace the content of the script tag
    const updatedHtml = html.replace(scriptRegex, `<script>${cleanScriptContent}</script>`);
    fs.writeFileSync(filePath, updatedHtml, 'utf8');
    console.log(`✓ Sintaxis de script e iframe corregida en: ${file}`);
  } else {
    console.log(`⚠ No se encontró la etiqueta <script> sin src en: ${file}`);
  }
});

console.log('\n✨ ¡Corrección completada con éxito!');
