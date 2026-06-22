// ═══════════════════════════════════════════
// MÓDULO: INSEGURIDADES (Fase E)
// Vive en la pantalla YO. Marcar → origen → clasificar cambiable/no-cambiable.
// ═══════════════════════════════════════════

function initInseguridades() { renderInseguridades(); }

function renderInseguridades() {
  const box = document.getElementById('inseg-list');
  if (!box) return;
  if (!state.inseguridades || !state.inseguridades.length) {
    box.innerHTML = '<p class="text-sm text-dimmer" style="padding:8px 0">Sin inseguridades cargadas. Agregá una abajo.</p>';
    return;
  }
  box.innerHTML = state.inseguridades.map(it => inseguridadCard(it)).join('');
}

function inseguridadCard(it) {
  const clasif = it.clasif || '';
  let extra = '';
  if (clasif === 'cambiable') {
    extra = '<input type="text" class="mt-8" placeholder="Acción concreta para trabajarla..." value="' + escapeHtml(it.accion || '') + '" onchange="setInseguridadAccion(\'' + it.id + '\', this.value)">';
  } else if (clasif === 'nocambiable') {
    extra = '<div class="text-sm text-dimmer mt-8" style="font-style:italic">Aceptada. No gastes energía acá.</div>';
  }
  return `
    <div class="history-item">
      <div class="flex justify-between items-center">
        <div class="history-text" style="font-weight:600;color:var(--text)">${escapeHtml(it.texto)}</div>
        <button onclick="removeInseguridad('${it.id}')" style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:14px">✕</button>
      </div>
      ${it.origen ? '<div class="history-date" style="margin-top:4px">De dónde viene: ' + escapeHtml(it.origen) + '</div>' : ''}
      <div class="flex gap-8 mt-8">
        <button class="option-btn ${clasif === 'cambiable' ? 'selected' : ''}" style="flex:1;text-align:center" onclick="classifyInseguridad('${it.id}','cambiable')">Cambiable → trabajar</button>
        <button class="option-btn ${clasif === 'nocambiable' ? 'selected' : ''}" style="flex:1;text-align:center" onclick="classifyInseguridad('${it.id}','nocambiable')">No cambiable → aceptar</button>
      </div>
      ${extra}
    </div>`;
}

function addInseguridad() {
  const input = document.getElementById('inseg-input');
  if (!input) return;
  const texto = (input.value || '').trim();
  if (!texto) return;
  const origen = prompt('¿De dónde creés que viene? (opcional)') || '';
  state.inseguridades.unshift({ id: insegId(), texto, origen, clasif: '', accion: '' });
  input.value = '';
  saveState();
  renderInseguridades();
}

function classifyInseguridad(id, clasif) {
  const it = state.inseguridades.find(x => x.id === id);
  if (!it) return;
  it.clasif = clasif;
  saveState();
  renderInseguridades();
}

function setInseguridadAccion(id, val) {
  const it = state.inseguridades.find(x => x.id === id);
  if (!it) return;
  it.accion = val;
  saveState();
}

function removeInseguridad(id) {
  state.inseguridades = state.inseguridades.filter(x => x.id !== id);
  saveState();
  renderInseguridades();
}

function insegId() { return 'i' + Date.now().toString(36) + Math.floor(Math.random() * 1000); }
