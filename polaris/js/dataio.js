// ═══════════════════════════════════════════
// DATOS: Export / Import + carga de seed (Fase D)
// Todo local. Los datos nunca salen del navegador.
// ═══════════════════════════════════════════

function initDataIO() { /* handlers inline; nada que inicializar */ }

function exportData() {
  try {
    const data = JSON.stringify(state, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const d = new Date();
    const stamp = d.getFullYear() + zero2(d.getMonth() + 1) + zero2(d.getDate());
    a.href = url;
    a.download = 'polaris-backup-' + stamp + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (e) { alert('No se pudo exportar: ' + e.message); }
}

function zero2(x) { return String(x).padStart(2, '0'); }

function importDataFile(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const obj = JSON.parse(reader.result);
      applyImported(obj);
      alert('✅ Importado correctamente.');
    } catch (e) { alert('Archivo inválido: ' + e.message); }
    input.value = '';
  };
  reader.readAsText(file);
}

// Backup completo (reemplaza todo) vs seed de contenido (mergea)
function applyImported(obj) {
  if (!obj || typeof obj !== 'object') return;
  if ('xpTotal' in obj || 'habits' in obj || 'shadowHistory' in obj) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    loadState();
  } else {
    applySeed(obj);
    saveState();
  }
  refreshAll();
}

function applySeed(seed) {
  if (!seed || typeof seed !== 'object') return;
  if (seed.identityCentral) state.identityCentral = seed.identityCentral;
  if (Array.isArray(seed.customPhrases)) state.customPhrases = seed.customPhrases;
  if (Array.isArray(seed.nonNegotiables)) state.nonNegotiables = seed.nonNegotiables;
  if (seed.polaris) state.polaris = { ...state.polaris, ...seed.polaris };
  if (seed.finances) state.finances = { ...state.finances, ...seed.finances };
  if (seed.ideal) state.ideal = { ...state.ideal, ...seed.ideal };
  if (Array.isArray(seed.inseguridades)) state.inseguridades = seed.inseguridades;
}

async function importSeed() {
  // 1) Intentar el seed privado local (no existe en el deploy hosteado)
  try {
    const resp = await fetch('seed/mi-seed.json', { cache: 'no-store' });
    if (resp.ok) {
      const seed = await resp.json();
      applySeed(seed);
      saveState();
      refreshAll();
      alert('✅ Tu contenido fue cargado desde seed/mi-seed.json.');
      return;
    }
  } catch (e) { /* sin archivo local */ }
  // 2) Fallback: elegir el archivo a mano
  alert('No encontré seed/mi-seed.json en el servidor (normal si está hosteada). Elegí tu archivo mi-seed.json.');
  const inp = document.getElementById('import-file');
  if (inp) inp.click();
}

// Re-render de todo lo visible tras importar
function refreshAll() {
  if (typeof renderHoy === 'function') renderHoy();
  if (typeof updateHoyUI === 'function') updateHoyUI();
  if (typeof loadPolarisFields === 'function') loadPolarisFields();
  if (typeof renderCharacter === 'function') renderCharacter();
  if (typeof renderProgress === 'function') renderProgress();
  if (typeof renderShadowHistory === 'function') renderShadowHistory();
  if (typeof renderVisualizacion === 'function') renderVisualizacion();
  if (typeof renderInseguridades === 'function') renderInseguridades();
  if (typeof renderConstraintHistory === 'function') renderConstraintHistory();
  if (typeof renderNotifSettings === 'function') renderNotifSettings();
}
