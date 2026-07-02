/* ============================================================
   FORJA · app.js
   Router + arranque. Conecta la nav inferior con las pantallas.
   ============================================================ */

const FORJA_APP = (() => {
  const routes = {
    hoy: () => FORJA_UI.renderHoy(),
    creencias: () => FORJA_UI.renderCreencias(),
    dias: () => FORJA_UI.renderDias(),
    emociones: () => FORJA_UI.renderEmociones(),
    yaesta: () => FORJA_VOZ.renderYaEsta(),
    decision: () => FORJA_UI.renderDecision(),
    ajustes: () => FORJA_UI.renderAjustes()
  };

  let _current = null;

  function go(route) {
    if (!routes[route]) route = "hoy";
    // al salir de una pantalla: frenar timer visual y audio
    if (_current === "hoy" && route !== "hoy") FORJA_TIMER.stop();
    FORJA_AUDIO.stopPlayback();
    _current = route;
    routes[route]();
    document.getElementById("app").scrollTo(0, 0);
  }

  function bindNav() {
    document.querySelectorAll(".nav__btn").forEach((btn) => {
      btn.addEventListener("click", () => go(btn.dataset.route));
    });
  }

  function init() {
    FORJA_STATE.ensureStart();
    FORJA_STATE.requestPersistence(); // pedir almacenamiento durable (no se borra solo)
    bindNav();
    // Si hay una sesión de deep work corriendo, abrir en HOY.
    go("hoy");
    // Guardar marca de última apertura
    const s = FORJA_STATE.raw();
    s.lastOpen = new Date().toISOString();
    FORJA_STATE.save();
  }

  // arrancar cuando el DOM esté listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  return { go };
})();

window.FORJA_APP = FORJA_APP;
