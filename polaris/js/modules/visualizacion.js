// ═══════════════════════════════════════════
// MÓDULO: VISUALIZACIÓN / YO IDEAL (Fase E)
// Vive en la pantalla POLARIS. Contenido desde el seed (state.ideal).
// ═══════════════════════════════════════════

function initVisualizacion() { renderVisualizacion(); }

function renderVisualizacion() {
  const box = document.getElementById('visual-content');
  if (!box) return;
  const id = state.ideal || {};
  const has = (id.creencias && id.creencias.length) || (id.logros && id.logros.length) || id.diaPerfecto;
  if (!has) {
    box.innerHTML = '<p class="text-sm text-dimmer">Cargá tu contenido en Progreso → Datos → <b>Importar mi contenido</b> para ver tu yo ideal, tus creencias y tu día perfecto.</p>';
    return;
  }
  let html = '';
  if (id.creencias && id.creencias.length) {
    html += '<div class="card-label" style="margin-top:4px">CREENCIAS DE TU YO IDEAL</div>';
    html += id.creencias.map(c => '<div class="identity-phrase" style="margin:8px 0">' + escapeHtml(c) + '</div>').join('');
  }
  if (id.logros && id.logros.length) {
    html += '<div class="card-label" style="margin-top:12px">LOGROS QUE YA SON TUYOS</div>';
    html += id.logros.map(l => '<div class="non-neg-item"><div class="non-neg-dot" style="background:var(--green)"></div>' + escapeHtml(l) + '</div>').join('');
  }
  if (id.diaPerfecto) {
    html += '<div class="card-label" style="margin-top:12px">TU DÍA PERFECTO</div>';
    html += '<div class="history-text" style="white-space:pre-line;line-height:1.7">' + escapeHtml(id.diaPerfecto) + '</div>';
  }
  box.innerHTML = html;
}

function startVisualization() {
  const id = state.ideal || {};
  const has = (id.creencias && id.creencias.length) || id.diaPerfecto;
  if (!has) {
    alert('Primero cargá tu contenido (Progreso → Datos → Importar mi contenido).');
    return;
  }
  // 2 minutos guiados reutilizando el overlay del timer (modo "visual")
  startTimer(2, 'visual');
}
