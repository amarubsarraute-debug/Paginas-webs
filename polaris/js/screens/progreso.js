// ═══════════════════════════════════════════
// PANTALLA: PROGRESO (el mapa)
// ═══════════════════════════════════════════

function renderProgress() {
  document.getElementById('prog-xp-total').textContent = state.xpTotal;
  document.getElementById('prog-level').textContent = state.level + 1;
  document.getElementById('prog-streak').textContent = state.streak;
  document.getElementById('prog-shadow-count').textContent = state.shadowCount;

  // Finances
  document.getElementById('fin-obj').value = state.finances.obj;
  document.getElementById('fin-actual').value = state.finances.actual;
  document.getElementById('fin-save-obj').value = state.finances.saveObj;
  document.getElementById('fin-save-actual').value = state.finances.saveActual;
  document.getElementById('fin-next').value = state.finances.next;
  updateFinanceBar();

  // Identity proof history
  const ipContainer = document.getElementById('identity-proof-history');
  if (!state.identityProofList.length) {
    ipContainer.innerHTML = '<p class="text-sm text-dimmer" style="padding:12px 0">No hay pruebas todavía.</p>';
  } else {
    ipContainer.innerHTML = state.identityProofList.slice(0,5).map(p => `
      <div class="history-item">
        <div class="history-date">${p.date}</div>
        <div class="history-text">${p.text}</div>
      </div>
    `).join('');
  }

  // Shadow history
  renderShadowHistory();
}

function updateFinanceBar() {
  const obj = parseFloat(String(state.finances.obj).replace(/[^0-9.]/g,'')) || 0;
  const actual = parseFloat(String(state.finances.actual).replace(/[^0-9.]/g,'')) || 0;
  const pct = obj > 0 ? Math.min(100, Math.round((actual / obj) * 100)) : 0;
  document.getElementById('fin-pct').textContent = pct + '%';
  document.getElementById('fin-bar').style.width = pct + '%';
}

function saveFinances() {
  state.finances.obj = document.getElementById('fin-obj').value;
  state.finances.actual = document.getElementById('fin-actual').value;
  state.finances.saveObj = document.getElementById('fin-save-obj').value;
  state.finances.saveActual = document.getElementById('fin-save-actual').value;
  state.finances.next = document.getElementById('fin-next').value;
  saveState();
  updateFinanceBar();
  alert('✅ Finanzas guardadas.');
}
