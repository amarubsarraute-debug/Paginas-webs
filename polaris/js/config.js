// ═══════════════════════════════════════════
// CONFIGURACIÓN — editar todo el contenido a mano (sin tocar JSON)
// Pantalla #screen-config, se abre con el engranaje. Autoguarda en cada cambio.
// ═══════════════════════════════════════════

function renderConfig() {
  // Campos simples
  setCfg('cfg-vision', state.polaris.vision);
  setCfg('cfg-season', state.polaris.season);
  setCfg('cfg-quarter', state.polaris.quarter);
  setCfg('cfg-boss', state.polaris.boss);
  setCfg('cfg-weekly', state.polaris.weekly);
  setCfg('cfg-next', state.polaris.next);
  setCfg('cfg-fin-obj', state.finances.obj);
  setCfg('cfg-fin-saveobj', state.finances.saveObj);
  setCfg('cfg-identity', state.identityCentral);
  setCfg('cfg-dia', state.ideal.diaPerfecto);
  // Listas
  renderCfgList('phrases');
  renderCfgList('nonneg');
  renderCfgList('creencias');
  renderCfgList('logros');
  // Ajustes movidos acá
  if (typeof renderNotifSettings === 'function') renderNotifSettings();
}

function setCfg(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = (val == null ? '' : val);
}

// Setter genérico por "path" (ej: 'polaris.vision', 'finances.obj', 'identityCentral', 'ideal.diaPerfecto')
function cfgSetField(path, val) {
  const parts = path.split('.');
  if (parts.length === 1) {
    state[parts[0]] = val;
  } else {
    if (!state[parts[0]]) state[parts[0]] = {};
    state[parts[0]][parts[1]] = val;
  }
  saveState();
  // refrescar el bonus visible de finanzas si corresponde
  if (path.indexOf('finances') === 0 && typeof updateFinanceBar === 'function') updateFinanceBar();
}

// ── Listas editables ─────────────────────────
function cfgArr(which) {
  if (which === 'phrases') return state.customPhrases;
  if (which === 'nonneg') return state.nonNegotiables;
  if (which === 'creencias') { if (!state.ideal.creencias) state.ideal.creencias = []; return state.ideal.creencias; }
  if (which === 'logros') { if (!state.ideal.logros) state.ideal.logros = []; return state.ideal.logros; }
  return [];
}

function renderCfgList(which) {
  const box = document.getElementById('cfg-list-' + which);
  if (!box) return;
  const arr = cfgArr(which);
  if (!arr.length) {
    box.innerHTML = '<p class="text-sm text-dimmer mb-8">Vacío. Agregá uno abajo.</p>';
    return;
  }
  box.innerHTML = arr.map((v, i) => `
    <div class="flex gap-8 mb-8" style="align-items:flex-start">
      <textarea rows="1" oninput="cfgListSet('${which}',${i},this.value)" style="flex:1;min-height:44px">${escapeHtml(v)}</textarea>
      <button onclick="cfgListRemove('${which}',${i})" class="btn btn-secondary" style="width:auto;padding:11px 13px" aria-label="Quitar">✕</button>
    </div>`).join('');
}

function cfgListSet(which, i, val) {
  const a = cfgArr(which);
  a[i] = val;
  saveState();
}

function cfgListRemove(which, i) {
  const a = cfgArr(which);
  a.splice(i, 1);
  saveState();
  renderCfgList(which);
}

function cfgListAdd(which) {
  const a = cfgArr(which);
  a.push('');
  saveState();
  renderCfgList(which);
  const box = document.getElementById('cfg-list-' + which);
  if (box) { const inputs = box.querySelectorAll('textarea'); if (inputs.length) inputs[inputs.length - 1].focus(); }
}
