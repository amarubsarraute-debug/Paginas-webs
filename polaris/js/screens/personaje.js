// ═══════════════════════════════════════════
// PANTALLA: PERSONAJE (Yo)
// ═══════════════════════════════════════════

function renderCharacter() {
  const li = getCurrentLevelInfo();
  document.getElementById('char-level').textContent = li.level;
  document.getElementById('char-xp').textContent = state.xpTotal;
  document.getElementById('char-streak').textContent = state.streak;
  document.getElementById('char-best-streak').textContent = state.bestStreak;
  document.getElementById('char-level-icon').textContent = LEVELS[state.level].icon;
  document.getElementById('char-level-name').textContent = LEVELS[state.level].name;
  document.getElementById('char-xp-to-next').textContent = li.xpToNext > 0 ? li.xpToNext + ' XP para subir' : 'Nivel máximo alcanzado';
  document.getElementById('char-level-bar').style.width = li.pct + '%';

  // Attributes
  const attrContainer = document.getElementById('attributes-list');
  const ATTR_LABELS = {
    disciplina: 'Disciplina',
    negocio: 'Negocio',
    cuerpo: 'Cuerpo',
    mente: 'Mente',
    autocontrol: 'Autocontrol',
    valor: 'Valor',
  };
  attrContainer.innerHTML = Object.keys(state.attributes).map(k => `
    <div class="attr-row">
      <div class="attr-header">
        <span class="attr-name">${ATTR_LABELS[k]}</span>
        <span class="attr-val">${state.attributes[k]}</span>
      </div>
      <div class="progress-wrap"><div class="progress-fill" style="width:${state.attributes[k]}%"></div></div>
    </div>
  `).join('');

  // Identity central
  document.getElementById('identity-central').value = state.identityCentral;

  // No-negociables (propios si hay seed; si no, los por defecto)
  renderNonNeg();

  // Inseguridades (módulo Fase E)
  if (typeof renderInseguridades === 'function') renderInseguridades();
}

const DEFAULT_NONNEG = [
  'No weed',
  'No fap',
  'No celular como escape',
  'No abandonar dos días seguidos',
  'No negociar con la duda',
];

function renderNonNeg() {
  const box = document.getElementById('non-neg-list');
  if (!box) return;
  const list = (state.nonNegotiables && state.nonNegotiables.length) ? state.nonNegotiables : DEFAULT_NONNEG;
  box.innerHTML = list.map(n => '<div class="non-neg-item"><div class="non-neg-dot"></div>' + escapeHtml(n) + '</div>').join('');
}

function saveIdentityCentral() {
  state.identityCentral = document.getElementById('identity-central').value;
  saveState();
  alert('✅ Identidad guardada.');
}
