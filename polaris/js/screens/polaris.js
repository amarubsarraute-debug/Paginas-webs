// ═══════════════════════════════════════════
// PANTALLA: POLARIS (tu norte)
// ═══════════════════════════════════════════

function loadPolarisFields() {
  document.getElementById('pol-vision').value = state.polaris.vision;
  document.getElementById('pol-season').value = state.polaris.season;
  document.getElementById('pol-quarter').value = state.polaris.quarter;
  document.getElementById('pol-boss').value = state.polaris.boss;
  document.getElementById('pol-weekly').value = state.polaris.weekly;
  document.getElementById('pol-next').value = state.polaris.next;

  ['quarter','finance','body','biz'].forEach(k => {
    document.getElementById('prog-'+k+'-range').value = state.progress[k];
    document.getElementById('prog-'+k+'-bar').style.width = state.progress[k] + '%';
    document.getElementById('prog-'+k+'-val').textContent = state.progress[k] + '%';
  });
}

function savePolaris() {
  state.polaris.vision = document.getElementById('pol-vision').value;
  state.polaris.season = document.getElementById('pol-season').value;
  state.polaris.quarter = document.getElementById('pol-quarter').value;
  state.polaris.boss = document.getElementById('pol-boss').value;
  state.polaris.weekly = document.getElementById('pol-weekly').value;
  state.polaris.next = document.getElementById('pol-next').value;
  saveState();
  alert('✅ Polaris guardado.');
}

function updateProg(key, val) {
  state.progress[key] = parseInt(val);
  document.getElementById('prog-'+key+'-bar').style.width = val + '%';
  document.getElementById('prog-'+key+'-val').textContent = val + '%';
  saveState();
}

function convertNextToMission() {
  const next = document.getElementById('pol-next').value.trim();
  if (!next) { alert('Primero definí la próxima acción.'); return; }
  state.mission = next;
  saveState();
  showScreen('hoy');
  renderMissionDisplay();
  alert('✅ Próxima acción convertida en misión de hoy.');
}
