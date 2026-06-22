// ═══════════════════════════════════════════
// INIT + PWA BOOTSTRAP
// ═══════════════════════════════════════════

function init() {
  loadState();
  renderHoy();
  updateHoyUI();
  renderShadowHistory();

  // Auto-save de los campos de Polaris al cambiar
  ['pol-vision','pol-season','pol-quarter','pol-boss','pol-weekly','pol-next'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', () => {
      state.polaris[id.replace('pol-','')] = el.value;
      saveState();
    });
  });

  // Módulos nuevos (Fase E) — se activan si su archivo está cargado
  if (typeof initVisualizacion === 'function') initVisualizacion();
  if (typeof initInseguridades === 'function') initInseguridades();
  if (typeof initConstraint === 'function') initConstraint();

  // Datos: import/export (Fase D)
  if (typeof initDataIO === 'function') initDataIO();

  // Notificaciones (Fase C)
  if (typeof initNotifications === 'function') initNotifications();
}

// Service worker (Fase B) — offline + instalación
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .catch(err => console.warn('SW no registrado:', err));
  });
}

init();
