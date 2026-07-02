/* ============================================================
   FORJA · timer.js
   Cronómetro de la sesión de deep work. Cuenta REGRESIVO desde
   los minutos comprometidos (Ley de Parkinson) y sigue en
   negativo si te pasás. Se calcula desde startedAt para que
   sobreviva refrescos / cierres de pestaña.
   ============================================================ */

const FORJA_TIMER = (() => {
  let _interval = null;

  // Devuelve { remainingMs, over, elapsedMs, paused } a partir de la
  // sesión guardada. Descuenta el tiempo en pausa (idas al baño, etc.).
  function compute(session) {
    if (!session) return null;
    const targetMs = (session.minutes || 0) * 60000;
    const pausedAccum = session.pausedAccum || 0;
    // Si está en pausa, el reloj se congela en el momento de pausar.
    const effectiveNow = session.pausedAt ? session.pausedAt : Date.now();
    const elapsed = effectiveNow - session.startedAt - pausedAccum;
    const remaining = targetMs - elapsed;
    return { remainingMs: remaining, over: remaining < 0, elapsedMs: elapsed, paused: !!session.pausedAt };
  }

  function format(ms) {
    const neg = ms < 0;
    let s = Math.floor(Math.abs(ms) / 1000);
    const h = Math.floor(s / 3600); s -= h * 3600;
    const m = Math.floor(s / 60); s -= m * 60;
    const mm = String(m).padStart(2, "0");
    const ss = String(s).padStart(2, "0");
    const core = h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
    return (neg ? "+" : "") + core;
  }

  // tick(cb): llama cb({text, over}) cada segundo.
  function start(getSession, cb) {
    stop();
    const run = () => {
      const s = getSession();
      const c = compute(s);
      if (!c) { stop(); return; }
      cb({ text: format(c.remainingMs), over: c.over });
    };
    run();
    _interval = setInterval(run, 1000);
  }

  function stop() {
    if (_interval) { clearInterval(_interval); _interval = null; }
  }

  return { compute, format, start, stop };
})();

window.FORJA_TIMER = FORJA_TIMER;
