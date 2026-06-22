// ═══════════════════════════════════════════
// NAVIGATION + XP/LEVELS UI
// ═══════════════════════════════════════════

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const screen = document.getElementById('screen-' + name);
  if (screen) screen.classList.add('active');
  const navBtn = document.getElementById('nav-' + name); // 'config' no tiene tab en la nav
  if (navBtn) navBtn.classList.add('active');
  if (name === 'hoy') { renderHoy(); updateHoyUI(); }
  if (name === 'personaje') renderCharacter();
  if (name === 'progreso') renderProgress();
  if (name === 'polaris') loadPolarisFields();
  if (name === 'polaris' && typeof renderVisualizacion === 'function') renderVisualizacion();
  if (name === 'shadow' && typeof renderConstraintHistory === 'function') renderConstraintHistory();
  if (name === 'config' && typeof renderConfig === 'function') renderConfig();
  if (screen) screen.scrollTo(0, 0);
}

function addXP(amount, attrKey) {
  const prevLevel = state.level;
  state.xpTotal += amount;
  state.xpDaily += amount;
  if (attrKey && state.attributes[attrKey] !== undefined) {
    state.attributes[attrKey] = Math.min(100, state.attributes[attrKey] + Math.round(amount / 2));
  }
  // calc level
  let newLevel = 0;
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (state.xpTotal >= LEVELS[i].xp) { newLevel = i; break; }
  }
  state.level = newLevel;
  saveState();
  showXPPopup(amount);
  updateHoyUI();
  if (newLevel > prevLevel) showLevelUp(newLevel);
}

function showXPPopup(amount) {
  const el = document.getElementById('xp-popup');
  el.textContent = '+' + amount + ' XP';
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2000);
}

function showLevelUp(lvl) {
  const l = LEVELS[lvl];
  document.getElementById('levelup-name').textContent = l.icon + ' ' + l.name;
  document.getElementById('levelup-overlay').classList.add('active');
}

function closeLevelUp() {
  document.getElementById('levelup-overlay').classList.remove('active');
}

function getCurrentLevelInfo() {
  const l = LEVELS[state.level];
  const next = LEVELS[state.level + 1];
  const xpInLevel = state.xpTotal - l.xp;
  const xpForNext = next ? next.xp - l.xp : 500;
  const pct = Math.min(100, Math.round((xpInLevel / xpForNext) * 100));
  const xpToNext = next ? next.xp - state.xpTotal : 0;
  return { level: state.level + 1, name: l.name, icon: l.icon, pct, xpToNext, next };
}

// Escapa HTML para insertar contenido del usuario de forma segura
function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}
