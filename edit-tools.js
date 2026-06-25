/* =========================================================
   edit-tools.js — Panel visual de edición para presentaciones
   Tecla E → abre editor | Escape → cierra | Ctrl+S → guarda
   ========================================================= */
(function () {
  'use strict';

  // Solo activar herramientas de edición en entorno local
  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if (!isLocal) return;

  const EDITABLE_SELECTORS = [
    '.s-eyebrow',
    '.s-icon',
    '.s-head',
    '.s-body',
    '.s-punch',
    '.s-punch span',
    '.stat-num',
    '.stat-stars',
    '.stat-sub',
    '.score-num',
    '.score-lbl',
    '.boceto-badge',
    '.ann .txt',
    '.ann .result',
    '.ann b',
    '.step-row .num',
    '.step-row .txt',
    '.wa-btn',
    '.site-link',
    '.maps-link',
    '.no-pressure',
    '.iframe-bar .u'
  ];

  /* ── CSS del panel ────────────────────────────────────── */
  const PANEL_CSS = `
  #et-panel{position:fixed;top:0;right:-360px;width:340px;height:100vh;background:#1a1a1a;color:#eee;
    font-family:'Outfit',system-ui,sans-serif;z-index:9999;transition:right .35s cubic-bezier(.4,0,.2,1);
    display:flex;flex-direction:column;box-shadow:-6px 0 30px rgba(0,0,0,.4);overflow:hidden;}
  #et-panel.open{right:0;}
  #et-panel *{box-sizing:border-box;}
  .et-header{padding:16px 18px 12px;border-bottom:1px solid #333;display:flex;align-items:center;justify-content:space-between;}
  .et-header h3{font-size:14px;font-weight:600;letter-spacing:.04em;margin:0;}
  .et-close{background:none;border:none;color:#888;font-size:20px;cursor:pointer;padding:4px 8px;border-radius:6px;}
  .et-close:hover{background:#333;color:#fff;}
  .et-body{flex:1;overflow-y:auto;padding:14px 18px 20px;}
  .et-section{margin-bottom:18px;}
  .et-section-title{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#888;margin-bottom:10px;display:flex;align-items:center;gap:6px;}
  .et-section-title::after{content:'';flex:1;height:1px;background:#333;}

  /* Color rows */
  .et-color-row{display:flex;align-items:center;gap:10px;margin-bottom:8px;padding:6px 8px;border-radius:8px;background:#222;}
  .et-color-row label{font-size:11px;color:#aaa;flex:1;min-width:0;}
  .et-color-row input[type="color"]{width:32px;height:26px;border:2px solid #444;border-radius:6px;cursor:pointer;
    background:none;padding:0;-webkit-appearance:none;appearance:none;}
  .et-color-row input[type="color"]::-webkit-color-swatch-wrapper{padding:1px;}
  .et-color-row input[type="color"]::-webkit-color-swatch{border:none;border-radius:3px;}

  /* Theme presets */
  .et-themes{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:4px;}
  .et-theme-btn{padding:8px 6px;border-radius:8px;border:2px solid #333;background:#222;cursor:pointer;
    text-align:center;font-size:10px;font-weight:600;color:#ccc;transition:all .2s;}
  .et-theme-btn:hover{border-color:#555;background:#2a2a2a;}
  .et-theme-btn.active{border-color:#fbbf24;color:#fbbf24;}
  .et-theme-swatch{display:flex;gap:3px;justify-content:center;margin-bottom:4px;}
  .et-theme-swatch span{width:12px;height:12px;border-radius:50%;border:1px solid rgba(255,255,255,.15);}

  /* Buttons */
  .et-footer{padding:12px 18px;border-top:1px solid #333;display:flex;gap:8px;}
  .et-btn{flex:1;padding:10px;border-radius:10px;border:none;font-size:12px;font-weight:600;cursor:pointer;
    transition:all .15s;font-family:inherit;}
  .et-btn-save{background:#fbbf24;color:#1a1a1a;} .et-btn-save:hover{background:#f59e0b;}
  .et-btn-reset{background:#333;color:#ccc;} .et-btn-reset:hover{background:#444;}

  /* Floating toggle */
  #et-toggle{position:fixed;bottom:18px;right:18px;z-index:9998;width:44px;height:44px;border-radius:50%;
    background:#1a1a1a;color:#fbbf24;border:2px solid #333;font-size:18px;cursor:pointer;
    display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,.4);
    transition:all .2s;opacity:.7;}
  #et-toggle:hover{opacity:1;transform:scale(1.1);}
  body.editing #et-toggle{opacity:1;border-color:#fbbf24;}

  /* Status toast */
  #et-toast{position:fixed;bottom:70px;right:18px;z-index:9998;background:#1a1a1a;color:#fbbf24;
    padding:8px 16px;border-radius:8px;font-size:12px;font-weight:600;border:1px solid #333;
    transform:translateY(10px);opacity:0;transition:all .3s;pointer-events:none;font-family:'Outfit',system-ui;}
  #et-toast.show{transform:translateY(0);opacity:1;}

  /* Tip banner */
  .et-tip{background:#2a2517;border:1px solid #3d3520;border-radius:8px;padding:8px 10px;
    font-size:11px;color:#d4a017;line-height:1.45;margin-bottom:14px;}

  /* Style elements with contenteditable outline during editing */
  body.editing [contenteditable]{outline:2px dashed rgba(212,97,26,.45) !important; border-radius:4px !important; cursor:text !important;}
  `;

  /* ── Temas preset ─────────────────────────────────────── */
  const THEMES = {
    claro: {
      label: 'Claro',
      colors: { '--bg': '#f7f5f0', '--bg-panel': '#ffffff', '--ink': '#1a1a1a', '--ink-light': '#6b6b6b', '--ink-faint': '#c8c4bc' },
      swatches: ['#f7f5f0', '#1a1a1a', '#2d7a4f']
    },
    oscuro: {
      label: 'Oscuro',
      colors: { '--bg': '#1a1a1a', '--bg-panel': '#2a2a2a', '--ink': '#f0ede8', '--ink-light': '#a0a0a0', '--ink-faint': '#555555' },
      swatches: ['#1a1a1a', '#f0ede8', '#fbbf24']
    },
    calido: {
      label: 'Cálido',
      colors: { '--bg': '#fdf6ec', '--bg-panel': '#fff9f0', '--ink': '#2c1810', '--ink-light': '#7a5c4f', '--ink-faint': '#d4b89c' },
      swatches: ['#fdf6ec', '#2c1810', '#c0784a']
    },
    azul: {
      label: 'Azul',
      colors: { '--bg': '#f0f4f8', '--bg-panel': '#ffffff', '--ink': '#1a2a3a', '--ink-light': '#5a6a7a', '--ink-faint': '#b0bec8' },
      swatches: ['#f0f4f8', '#1a2a3a', '#2563a8']
    },
    verde: {
      label: 'Verde',
      colors: { '--bg': '#f0f7f2', '--bg-panel': '#ffffff', '--ink': '#1a2e22', '--ink-light': '#4a6a52', '--ink-faint': '#a0c8aa' },
      swatches: ['#f0f7f2', '#1a2e22', '#2d7a4f']
    },
    negro: {
      label: 'Negro puro',
      colors: { '--bg': '#000000', '--bg-panel': '#111111', '--ink': '#ffffff', '--ink-light': '#b0b0b0', '--ink-faint': '#444444' },
      swatches: ['#000000', '#ffffff', '#fbbf24']
    }
  };

  /* ── Variables editables ──────────────────────────────── */
  const COLOR_VARS = [
    { var: '--bg', label: 'Fondo principal' },
    { var: '--bg-panel', label: 'Fondo paneles' },
    { var: '--ink', label: 'Texto principal' },
    { var: '--ink-light', label: 'Texto secundario' },
    { var: '--ink-faint', label: 'Bordes / sutil' },
    { var: '--green', label: 'Verde (positivo)' },
    { var: '--green-bg', label: 'Fondo verde' },
    { var: '--red', label: 'Rojo (alerta)' },
    { var: '--red-bg', label: 'Fondo rojo' },
    { var: '--orange', label: 'Naranja' },
    { var: '--blue', label: 'Azul' },
    { var: '--yellow', label: 'Amarillo / dorado' },
  ];

  /* ── Inyectar CSS ─────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = PANEL_CSS;
  document.head.appendChild(style);

  /* ── Crear DOM del panel ──────────────────────────────── */
  const panel = document.createElement('div');
  panel.id = 'et-panel';
  panel.innerHTML = `
    <div class="et-header">
      <h3>✏️ Editor visual</h3>
      <button class="et-close" id="et-close-btn">✕</button>
    </div>
    <div class="et-body">
      <div class="et-tip">💡 Tocá cualquier texto en la presentación para editarlo directamente. Acá podés cambiar los colores.</div>
      <div class="et-section">
        <div class="et-section-title">Temas rápidos</div>
        <div class="et-themes" id="et-themes"></div>
      </div>
      <div class="et-section">
        <div class="et-section-title">Colores individuales</div>
        <div id="et-colors"></div>
      </div>
      <div class="et-section">
        <div class="et-section-title">Enlaces</div>
        <div class="et-input-row" style="margin-bottom:8px;">
          <label style="font-size:11px;color:#aaa;display:block;margin-bottom:4px;">Enlace de WhatsApp</label>
          <input type="text" id="et-wa-href" style="width:100%;padding:6px;border-radius:6px;border:1px solid #444;background:#222;color:#eee;font-size:11px;font-family:inherit;">
        </div>
      </div>
    </div>
    <div class="et-footer">
      <button class="et-btn et-btn-reset" id="et-reset">Resetear</button>
      <button class="et-btn et-btn-save" id="et-save">💾 Guardar</button>
    </div>
  `;
  document.body.appendChild(panel);

  /* ── Toggle button ────────────────────────────────────── */
  const toggle = document.createElement('button');
  toggle.id = 'et-toggle';
  toggle.innerHTML = '✏️';
  toggle.title = 'Abrir editor (E)';
  document.body.appendChild(toggle);

  /* ── Toast ────────────────────────────────────────────── */
  const toast = document.createElement('div');
  toast.id = 'et-toast';
  document.body.appendChild(toast);
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
  }

  /* ── Guardar valores originales ────────────────────────── */
  const root = document.documentElement;
  const originalColors = {};
  COLOR_VARS.forEach(c => {
    originalColors[c.var] = getComputedStyle(root).getPropertyValue(c.var).trim();
  });

  /* ── Render temas ─────────────────────────────────────── */
  const themesEl = document.getElementById('et-themes');
  Object.entries(THEMES).forEach(([key, theme]) => {
    const btn = document.createElement('button');
    btn.className = 'et-theme-btn';
    btn.dataset.theme = key;
    btn.innerHTML = `
      <div class="et-theme-swatch">${theme.swatches.map(c => `<span style="background:${c}"></span>`).join('')}</div>
      ${theme.label}
    `;
    btn.addEventListener('click', () => applyTheme(key));
    themesEl.appendChild(btn);
  });

  /* ── Render color pickers ─────────────────────────────── */
  const colorsEl = document.getElementById('et-colors');
  const pickers = {};
  COLOR_VARS.forEach(c => {
    const row = document.createElement('div');
    row.className = 'et-color-row';
    row.innerHTML = `<label>${c.label}</label>`;
    const input = document.createElement('input');
    input.type = 'color';
    input.value = toHex(originalColors[c.var]);
    input.addEventListener('input', () => {
      root.style.setProperty(c.var, input.value);
      clearActiveTheme();
    });
    row.appendChild(input);
    colorsEl.appendChild(row);
    pickers[c.var] = input;
  });

  /* ── Funciones de tema ────────────────────────────────── */
  function applyTheme(key) {
    const theme = THEMES[key];
    if (!theme) return;
    Object.entries(theme.colors).forEach(([v, val]) => {
      root.style.setProperty(v, val);
      if (pickers[v]) pickers[v].value = toHex(val);
    });
    document.querySelectorAll('.et-theme-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === key));
    showToast(`Tema "${theme.label}" aplicado`);
  }
  function clearActiveTheme() {
    document.querySelectorAll('.et-theme-btn').forEach(b => b.classList.remove('active'));
  }

  /* ── Abrir / cerrar panel ─────────────────────────────── */
  let panelOpen = false;
  function openPanel() {
    panelOpen = true;
    panel.classList.add('open');
    document.body.classList.add('editing');
    
    // Hacer editables todos los textos
    document.querySelectorAll(EDITABLE_SELECTORS.join(',')).forEach(el => {
      el.setAttribute('contenteditable', 'true');
      el.contentEditable = 'true';
    });
    
    // Sincronizar enlace de WhatsApp
    const waBtn = document.querySelector('.wa-btn');
    const waInput = document.getElementById('et-wa-href');
    if (waBtn && waInput) {
      waInput.value = waBtn.getAttribute('href') || '';
    }
    
    syncPickers();
  }
  function closePanel() {
    panelOpen = false;
    panel.classList.remove('open');
    document.body.classList.remove('editing');
    
    // Desactivar editabilidad
    document.querySelectorAll(EDITABLE_SELECTORS.join(',')).forEach(el => {
      el.blur();
      el.removeAttribute('contenteditable');
      el.contentEditable = 'false';
    });
  }
  function togglePanel() {
    panelOpen ? closePanel() : openPanel();
  }

  function syncPickers() {
    COLOR_VARS.forEach(c => {
      const val = getComputedStyle(root).getPropertyValue(c.var).trim();
      if (pickers[c.var]) pickers[c.var].value = toHex(val);
    });
  }

  /* ── Guardar ──────────────────────────────────────────── */
  function getCleanHtml() {
    const clone = document.documentElement.cloneNode(true);
    clone.querySelector('#et-panel')?.remove();
    clone.querySelector('#et-toggle')?.remove();
    clone.querySelector('#et-toast')?.remove();
    clone.querySelector('body')?.classList.remove('editing', 'boceto-active');
    clone.querySelectorAll('[contenteditable]').forEach(el => el.setAttribute('contenteditable', 'false'));
    const progress = clone.querySelector('#progress');
    if (progress) progress.innerHTML = '';
    clone.querySelectorAll('.tap,.navbtn,#track,.iframe-viewport iframe').forEach(el => {
      el.removeAttribute('style');
    });
    clone.querySelectorAll('style').forEach(style => {
      if (style.textContent.includes('#et-panel')) style.remove();
      if (style.textContent.includes('--litepicker')) style.remove();
    });
    return '<!DOCTYPE html>\n' + clone.outerHTML;
  }

  function saveToServer() {
    const html = getCleanHtml();
    const filename = decodeURIComponent(location.pathname).replace(/^\/+/, '');
    fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, html })
    })
      .then(r => r.json())
      .then(d => {
        if (d.success || d.ok) showToast('✅ Guardado correctamente');
        else showToast('❌ Error al guardar');
      })
      .catch(() => showToast('❌ Sin conexión al servidor'));
  }

  /* ── Resetear ─────────────────────────────────────────── */
  function resetColors() {
    Object.entries(originalColors).forEach(([v, val]) => {
      root.style.setProperty(v, val);
    });
    syncPickers();
    clearActiveTheme();
    showToast('Colores reseteados');
  }

  /* ── Event listeners ──────────────────────────────────── */
  toggle.addEventListener('click', togglePanel);
  document.getElementById('et-close-btn').addEventListener('click', closePanel);
  document.getElementById('et-save').addEventListener('click', saveToServer);
  document.getElementById('et-reset').addEventListener('click', resetColors);

  // Escuchar cambios en el input de WhatsApp para actualizar el botón en tiempo real
  document.getElementById('et-wa-href').addEventListener('input', (e) => {
    const waBtn = document.querySelector('.wa-btn');
    if (waBtn) waBtn.setAttribute('href', e.target.value);
  });

  // Override keyboard handler
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panelOpen) { closePanel(); e.stopPropagation(); return; }
    if ((e.key === 'e' || e.key === 'E') && !panelOpen && document.activeElement.contentEditable !== 'true') {
      e.preventDefault(); openPanel();
      return;
    }
    if (e.ctrlKey && e.key === 's') { e.preventDefault(); saveToServer(); return; }
    
    // Stop arrow keys from triggering page navigation while editing text
    if (document.body.classList.contains('editing') && 
        (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      e.stopPropagation();
    }
  }, true);

  /* ── Utilidades ───────────────────────────────────────── */
  function toHex(color) {
    if (!color) return '#000000';
    color = color.trim();
    if (color.startsWith('#')) {
      if (color.length === 4) return '#' + color[1]+color[1]+color[2]+color[2]+color[3]+color[3];
      return color;
    }
    if (color.startsWith('rgb')) {
      const m = color.match(/\d+/g);
      if (m && m.length >= 3) return '#' + m.slice(0, 3).map(n => parseInt(n).toString(16).padStart(2, '0')).join('');
    }
    // fallback: use canvas
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = color;
    return ctx.fillStyle;
  }

  /* ── Override enterEdit/exitEdit si existen ───────────── */
  if (typeof window.enterEdit === 'function') {
    const _orig = window.enterEdit;
    window.enterEdit = function () { openPanel(); };
  }
  if (typeof window.exitEdit === 'function') {
    const _orig = window.exitEdit;
    window.exitEdit = function () { closePanel(); };
  }
})();
