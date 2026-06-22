// ═══════════════════════════════════════════
// MÓDULO: CONSTRAINT FINDER / SHADOW v2 (Fase E)
// Vive en la pantalla SHADOW. Reescritura de creencias:
// Experiencia → Creencia → Identidad → Comportamiento → Nueva creencia.
// ═══════════════════════════════════════════

function initConstraint() { renderConstraintHistory(); }

function saveConstraint() {
  const g = (id) => (document.getElementById(id)?.value || '').trim();
  const entry = {
    date: new Date().toLocaleDateString('es-UY'),
    experiencia: g('cf-exp'),
    creencia: g('cf-belief'),
    identidad: g('cf-identity'),
    comportamiento: g('cf-behavior'),
    nuevaCreencia: g('cf-new'),
  };
  if (!entry.creencia && !entry.nuevaCreencia) {
    alert('Escribí al menos la creencia vieja y la nueva.');
    return;
  }
  state.constraintHistory.unshift(entry);
  if (state.constraintHistory.length > 30) state.constraintHistory.pop();
  saveState();
  ['cf-exp', 'cf-belief', 'cf-identity', 'cf-behavior', 'cf-new'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  if (typeof addXP === 'function') addXP(15, 'mente');
  renderConstraintHistory();
  alert('🧠 Creencia reescrita. +15 XP. Releéla hasta que sea tuya.');
}

function renderConstraintHistory() {
  const box = document.getElementById('cf-history');
  if (!box) return;
  if (!state.constraintHistory || !state.constraintHistory.length) {
    box.innerHTML = '';
    return;
  }
  box.innerHTML = '<div class="card-label" style="margin-top:8px">REESCRITURAS</div>' +
    state.constraintHistory.slice(0, 5).map(e => `
      <div class="history-item">
        <div class="history-date">${escapeHtml(e.date)}</div>
        ${e.creencia ? '<div class="history-text">Vieja: ' + escapeHtml(e.creencia) + '</div>' : ''}
        ${e.nuevaCreencia ? '<div class="history-text text-accent" style="margin-top:4px">↻ ' + escapeHtml(e.nuevaCreencia) + '</div>' : ''}
      </div>`).join('');
}
