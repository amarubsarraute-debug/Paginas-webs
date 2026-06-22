/* ============================================================
   FORJA · ui.js  (parte 1)
   Pantallas: HOY · CREENCIAS · 90 DÍAS  +  overlay self-talk.
   Helpers compartidos para ui2.js.
   ============================================================ */

const FORJA_UI = (() => {
  const S = () => window.FORJA_STATE;
  const D = () => window.FORJA_DATA;

  // -------- helpers --------
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function app() { return document.getElementById("app"); }

  function setActiveNav(route) {
    document.querySelectorAll(".nav__btn").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.route === route);
    });
  }

  // ===========================================================
  //  OVERLAY  (self-talk al terminar el deep work)
  // ===========================================================
  function showSelfTalk(doneMinutes, onClose) {
    const ov = document.getElementById("overlay");
    const text = S().content().selfTalk || D().selfTalk;
    ov.innerHTML = `
      <div class="modal">
        <div class="kicker kicker--accent modal__kicker">DEEP WORK COMPLETADO</div>
        <div class="modal__time">${doneMinutes} MIN</div>
        <div class="modal__big">DECILO EN VOZ ALTA</div>
        <p class="modal__text">${esc(text)}</p>
        <button class="btn btn--ok btn--lg" id="saidIt">✓ LO DIJE</button>
        <button class="btn btn--ghost mt-s" id="skipSay">Saltar</button>
      </div>`;
    ov.hidden = false;
    const close = () => { ov.hidden = true; ov.innerHTML = ""; if (onClose) onClose(); };
    ov.querySelector("#saidIt").onclick = () => {
      S().setDay({ selfTalk: true });
      close();
    };
    ov.querySelector("#skipSay").onclick = close;
  }

  // ===========================================================
  //  HOY
  // ===========================================================
  function renderHoy() {
    setActiveNav("hoy");
    S().ensureStart();
    const c = S().content();
    const st = S().stats();
    const session = S().getSession();
    const today = S().getDay();

    const brand = `<div class="hoy__top">
        <div class="hoy__brand">${esc(D().name)}<b>.</b></div>
        <div class="kicker">${todayLabel()}</div>
      </div>`;

    const dayBlock = `
      <div class="hoy__daywrap">
        <div class="kicker kicker--accent hoy__daykicker">FORJÁNDOME · ${st.streak} DE RACHA</div>
        <div class="hoy__day">DÍA <b>${st.day}</b></div>
        <div class="hoy__dayof">DE ${D().totalDays}</div>
      </div>
      <p class="hoy__identity">${esc(c.identity)}</p>`;

    let actions = "";
    if (session) {
      actions = sessionView(session);
    } else {
      actions = morningView(today);
    }

    app().innerHTML = `<section class="hoy">${brand}${dayBlock}${actions}</section>`;

    if (session) bindSession();
    else bindMorning();
  }

  function morningView(today) {
    return `
      <div class="hoy__actions">
        <button class="btn btn--accent btn--lg" id="playBeliefs">
          <span class="btn__play"></span> ESCUCHAR MIS CREENCIAS
        </button>
      </div>
      <div class="commit">
        <div class="kicker commit__label">¿CUÁL ES TU TAREA MÁS DIFÍCIL DE HOY?</div>
        <textarea class="field" id="taskInput" rows="2" placeholder="Grabar y mandar los Looms...">${esc(today.task || "")}</textarea>
        <div class="commit__min">
          <span>LA TERMINO EN</span>
          <input type="number" id="minInput" min="1" value="${today.taskMinutes || 60}" />
          <span>MINUTOS</span>
        </div>
        <button class="btn btn--lg mt-m" id="startSession">EMPEZAR DEEP WORK →</button>
        <button class="btn btn--ghost mt-s" id="trainToggle">${today.trained ? "✓ ENTRENÉ HOY" : "MARCAR ENTRENAMIENTO"}</button>
      </div>`;
  }

  function sessionView(session) {
    const c = FORJA_TIMER.compute(session);
    const sub = c.paused ? "EN PAUSA · EL RELOJ ESTÁ DETENIDO"
      : (c.over ? "TE PASASTE DEL PLAZO · ENOJATE Y TERMINÁ" : "PLAZO AGRESIVO CORRIENDO");
    return `
      <div class="session">
        <div class="session__task"><b>→</b> ${esc(session.task || "Deep work")}</div>
        <div class="session__timer ${c.over ? "is-over" : ""} ${c.paused ? "is-paused" : ""}" id="liveTimer">${FORJA_TIMER.format(c.remainingMs)}</div>
        <div class="session__sub">${sub}</div>
        <button class="btn btn--ok btn--lg mt-m" id="finishSession">TERMINÉ ✓</button>
        <button class="btn btn--ghost mt-s" id="pauseSession">${c.paused ? "▶ REANUDAR" : "❚❚ PAUSA"}</button>
        <button class="btn btn--ghost mt-s" id="cancelSession">Cancelar sesión</button>
      </div>`;
  }

  function bindMorning() {
    const playBtn = document.getElementById("playBeliefs");
    playBtn.onclick = async () => {
      if (!(await FORJA_AUDIO.exists("beliefs"))) {
        playBtn.innerHTML = "GRABÁ TU AUDIO EN CREENCIAS →";
        playBtn.onclick = () => FORJA_APP.go("creencias");
        return;
      }
      if (FORJA_AUDIO.isPlaying()) {
        FORJA_AUDIO.stopPlayback();
        playBtn.innerHTML = `<span class="btn__play"></span> ESCUCHAR MIS CREENCIAS`;
        return;
      }
      playBtn.innerHTML = "■ REPRODUCIENDO...";
      await FORJA_AUDIO.play("beliefs", {
        onEnd: () => { playBtn.innerHTML = `<span class="btn__play"></span> ESCUCHAR DE NUEVO`; }
      });
    };

    document.getElementById("startSession").onclick = () => {
      const task = document.getElementById("taskInput").value.trim();
      const min = document.getElementById("minInput").value;
      if (!task) { document.getElementById("taskInput").focus(); return; }
      S().markMorningDone();
      S().startSession(task, min);
      renderHoy();
    };

    document.getElementById("trainToggle").onclick = () => {
      const t = S().getDay();
      S().setDay({ trained: !t.trained });
      renderHoy();
    };
  }

  function bindSession() {
    FORJA_TIMER.start(() => S().getSession(), ({ text, over }) => {
      const el = document.getElementById("liveTimer");
      if (el) { el.textContent = text; el.classList.toggle("is-over", over); }
    });

    document.getElementById("finishSession").onclick = () => {
      const session = S().getSession();
      const c = FORJA_TIMER.compute(session);
      const mins = Math.max(1, Math.round(c.elapsedMs / 60000));
      FORJA_TIMER.stop();
      S().endSession();
      showSelfTalk(mins, () => renderHoy());
    };

    document.getElementById("pauseSession").onclick = () => {
      const s = S().getSession();
      if (s && s.pausedAt) S().resumeSession();
      else S().pauseSession();
      FORJA_TIMER.stop();
      renderHoy(); // re-render: actualiza botón, subtítulo y reanuda el tick
    };

    document.getElementById("cancelSession").onclick = () => {
      FORJA_TIMER.stop();
      S().cancelSession();
      renderHoy();
    };
  }

  function todayLabel() {
    const d = new Date();
    const dias = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
    const meses = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];
    return `${dias[d.getDay()]} ${d.getDate()} ${meses[d.getMonth()]}`;
  }

  // ===========================================================
  //  CREENCIAS
  // ===========================================================
  let _beliefIdx = 0;
  async function renderCreencias() {
    setActiveNav("creencias");
    const beliefs = S().content().beliefs;
    if (_beliefIdx >= beliefs.length) _beliefIdx = 0;

    app().innerHTML = `
      <section class="screen">
        <div class="screen__head">
          <div class="kicker kicker--accent">REPETICIÓN + EMOCIÓN</div>
          <h1 class="screen__title">CREENCIAS</h1>
          <p class="screen__sub">Leelas en voz alta y sentilas. Grabá tu propia voz una vez y escuchala cada mañana: el subconsciente entiende emoción, no lógica.</p>
        </div>

        <div id="audioBar"></div>

        <div class="belief" id="beliefCard"></div>
        <div class="belief__nav">
          <button class="btn btn--ghost" id="prevB">←</button>
          <button class="btn" id="nextB">SIGUIENTE →</button>
        </div>
        <div class="belief__dots" id="dots"></div>

        <div id="evidenceMount" class="mt-m"></div>
      </section>`;

    await paintAudioBar();
    paintBelief();
    document.getElementById("nextB").onclick = () => { _beliefIdx = (_beliefIdx + 1) % beliefs.length; paintBelief(); };
    document.getElementById("prevB").onclick = () => { _beliefIdx = (_beliefIdx - 1 + beliefs.length) % beliefs.length; paintBelief(); };
  }

  function paintBelief() {
    const beliefs = S().content().beliefs;
    const card = document.getElementById("beliefCard");
    if (!card) return;
    const n = String(_beliefIdx + 1).padStart(2, "0");
    card.innerHTML = `
      <div class="belief__no">${n}</div>
      <div class="belief__text">${esc(beliefs[_beliefIdx])}</div>
      <div class="kicker">${_beliefIdx + 1} / ${beliefs.length}</div>`;
    const dots = document.getElementById("dots");
    dots.innerHTML = beliefs.map((_, i) =>
      `<span class="belief__dot ${i === _beliefIdx ? "is-active" : ""}"></span>`).join("");
    // evidencias de ESTA creencia (se actualiza al navegar)
    FORJA_VOZ.renderEvidence(_beliefIdx, document.getElementById("evidenceMount"));
  }

  // --- barra de audio maestro con estados: sin audio / grabando / guardado ---
  async function paintAudioBar() {
    const bar = document.getElementById("audioBar");
    if (!bar) return;
    if (FORJA_AUDIO.isRecording()) {
      bar.innerHTML = `
        <div class="audiobar">
          <button class="iconbtn iconbtn--rec is-recording" id="beliefStop" title="Detener">■</button>
          <div class="audiobar__status">Grabando... leé tus creencias con emoción. Tocá ■ al terminar.</div>
        </div>`;
    } else if (await FORJA_AUDIO.exists("beliefs")) {
      bar.innerHTML = `
        <div class="audiobar">
          <button class="iconbtn" id="playAllBtn" title="Escuchar">▶</button>
          <button class="iconbtn iconbtn--rec" id="reRecBtn" title="Regrabar">↻</button>
          <button class="iconbtn" id="dlBtn" title="Descargar">⬇</button>
          <button class="iconbtn" id="delBtn" title="Borrar">🗑</button>
          <div class="audiobar__status"><b>Audio guardado.</b> ▶ escuchar · ↻ regrabar · 🗑 borrar</div>
        </div>`;
    } else {
      bar.innerHTML = `
        <div class="audiobar">
          <button class="iconbtn iconbtn--rec" id="beliefRec" title="Grabar">●</button>
          <div class="audiobar__status">Sin audio. Tocá ● y leé tus creencias con emoción.</div>
        </div>`;
    }
    bindAudioBar();
  }

  function bindAudioBar() {
    const rec = document.getElementById("beliefRec");
    const stop = document.getElementById("beliefStop");
    const reRec = document.getElementById("reRecBtn");
    const play = document.getElementById("playAllBtn");
    const dl = document.getElementById("dlBtn");
    const del = document.getElementById("delBtn");

    if (rec) rec.onclick = startBeliefsRec;
    if (reRec) reRec.onclick = startBeliefsRec; // al detener sobrescribe el anterior
    if (stop) stop.onclick = stopBeliefsRec;
    if (dl) dl.onclick = () => FORJA_AUDIO.download("beliefs", "mis-creencias");
    if (del) del.onclick = async () => {
      if (confirm("¿Borrar tu audio de creencias?")) { await FORJA_AUDIO.remove("beliefs"); paintAudioBar(); }
    };
    if (play) play.onclick = async () => {
      if (FORJA_AUDIO.isPlaying()) { FORJA_AUDIO.stopPlayback(); play.textContent = "▶"; return; }
      play.textContent = "■";
      await FORJA_AUDIO.play("beliefs", { onEnd: () => { play.textContent = "▶"; } });
    };
  }

  async function startBeliefsRec() {
    try { await FORJA_AUDIO.startRecording(); paintAudioBar(); }
    catch (e) {
      const s = document.querySelector("#audioBar .audiobar__status");
      if (s) s.textContent = "No pude acceder al micrófono. Revisá permisos.";
    }
  }
  async function stopBeliefsRec() {
    const blob = await FORJA_AUDIO.stopRecording();
    if (blob) await FORJA_AUDIO.save("beliefs", blob, { category: "beliefs" });
    paintAudioBar();
  }

  // ===========================================================
  //  90 DÍAS
  // ===========================================================
  function renderDias() {
    setActiveNav("dias");
    S().ensureStart();
    const st = S().stats();
    const total = D().totalDays;
    let cells = "";
    for (let n = 1; n <= total; n++) {
      const dk = S().dateForDay(n);
      const rec = S().getDay(dk);
      const isToday = n === st.day;
      const isFuture = n > st.day;
      let cls = "cell";
      if (rec.deepWork && rec.trained) cls += " is-done";
      else if (rec.deepWork || rec.trained) cls += " is-partial";
      if (isToday) cls += " is-today";
      if (isFuture) cls += " is-future";
      if (rec.note && rec.note.trim()) cls += " has-note";
      if (rec.deadline && rec.deadline.trim()) cls += " has-deadline";
      const inner = (rec.deadline && rec.deadline.trim()) ? `<span class="cell__fire">⚡</span>${n}` : String(n);
      cells += `<button class="${cls}" data-n="${n}">${inner}</button>`;
    }

    app().innerHTML = `
      <section class="screen">
        <div class="screen__head">
          <div class="kicker kicker--accent">XP FARMING · 5 AÑOS EN 3 MESES</div>
          <h1 class="screen__title">90 DÍAS</h1>
          <p class="screen__sub">Cada cuadro lleno es un día que te forjaste. Rojo pleno = deep work + entrenamiento. El éxito es acumular experiencias y fracasos en el menor tiempo posible.</p>
        </div>

        <div class="stats">
          <div class="stat"><div class="stat__num">${st.day}</div><div class="stat__lab">Día actual</div></div>
          <div class="stat"><div class="stat__num">${st.fullDays}</div><div class="stat__lab">Días plenos</div></div>
          <div class="stat"><div class="stat__num">${st.streak}</div><div class="stat__lab">Racha</div></div>
        </div>

        <p class="screen__sub" style="margin-top:-6px">Tocá cualquier día para anotar qué hiciste y cómo avanzaste hacia tu versión ideal.</p>
        <div class="grid90 mt-m">${cells}</div>

        <div class="legend">
          <div class="legend__item"><span class="legend__swatch" style="background:var(--accent);border-color:var(--accent)"></span> Día pleno</div>
          <div class="legend__item"><span class="legend__swatch" style="background:var(--accent-deep);border-color:var(--accent-deep)"></span> Parcial</div>
          <div class="legend__item"><span class="legend__swatch"></span> Pendiente</div>
          <div class="legend__item"><span class="legend__swatch legend__swatch--fire">⚡</span> Fecha límite</div>
        </div>

        <div class="verdict mt-m">
          <div class="verdict__q">CUANDO ALGO FALLE:</div>
          <div class="verdict__a">${esc(D().failure[0])}</div>
          <div class="verdict__a" style="color:var(--accent)">${esc(D().failure[1])}</div>
        </div>
      </section>`;

    app().querySelectorAll(".cell[data-n]").forEach((cell) => {
      cell.onclick = () => openDayDetail(Number(cell.dataset.n));
    });
  }

  // ----- detalle / bitácora de un día -----
  function openDayDetail(n) {
    const dk = S().dateForDay(n);
    const rec = S().getDay(dk);
    const st = S().stats();
    const isFuture = n > st.day;
    const ov = document.getElementById("overlay");
    const dateLabel = (() => {
      const d = new Date(dk + "T00:00:00");
      const dias = ["DOM","LUN","MAR","MIÉ","JUE","VIE","SÁB"];
      const meses = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];
      return `${dias[d.getDay()]} ${d.getDate()} ${meses[d.getMonth()]} ${d.getFullYear()}`;
    })();

    ov.innerHTML = `
      <div class="modal modal--day">
        <div class="kicker kicker--accent">DÍA ${n} DE ${D().totalDays} · ${dateLabel}</div>
        <div class="deadline-wrap">
          <label class="kicker deadline-wrap__label" for="dayDeadline">⚡ FECHA LÍMITE · COMBUSTIBLE INTERNO</label>
          <input class="field deadline-wrap__input" id="dayDeadline" type="text"
            placeholder="Ej: Tener la plata del alquiler · si no me desalojan"
            value="${esc(rec.deadline || "")}" />
        </div>
        ${rec.task ? `<p class="daydetail__task"><b>Tarea:</b> ${esc(rec.task)}${rec.doneMinutes ? ` · ${rec.doneMinutes} min` : ""}</p>` : ""}
        <div class="daydetail__flags">
          <button class="chip ${rec.deepWork ? "is-on" : ""}" id="flagDeep">${rec.deepWork ? "✓ " : ""}Deep work</button>
          <button class="chip ${rec.trained ? "is-on" : ""}" id="flagTrain">${rec.trained ? "✓ " : ""}Entrené</button>
        </div>
        <div class="daydetail__version">
          <div class="kicker" style="margin-bottom:10px">¿HOY ME JUGUÉ COMO...?</div>
          <div class="daydetail__vbtns">
            <button class="chip ${rec.version === "nueva" ? "is-on" : ""}" id="verNueva">${rec.version === "nueva" ? "✓ " : ""}La versión nueva</button>
            <button class="chip chip--old ${rec.version === "vieja" ? "is-on" : ""}" id="verVieja">${rec.version === "vieja" ? "✓ " : ""}La vieja</button>
          </div>
        </div>
        <textarea class="field daydetail__note" id="dayNote" rows="6" placeholder="¿Qué hiciste hoy? ¿Cómo avanzaste hacia tu versión ideal?">${esc(rec.note || "")}</textarea>
        <button class="btn btn--accent btn--lg mt-m" id="saveDay">GUARDAR</button>
        <button class="btn btn--ghost mt-s" id="closeDay">Cerrar</button>
        ${isFuture ? `<p class="screen__sub mt-s">Este día todavía no llegó, pero podés dejar tu intención.</p>` : ""}
      </div>`;
    ov.hidden = false;

    let deep = rec.deepWork, train = rec.trained, version = rec.version || null;
    const fd = ov.querySelector("#flagDeep");
    const ft = ov.querySelector("#flagTrain");
    fd.onclick = () => { deep = !deep; fd.classList.toggle("is-on", deep); fd.textContent = (deep ? "✓ " : "") + "Deep work"; };
    ft.onclick = () => { train = !train; ft.classList.toggle("is-on", train); ft.textContent = (train ? "✓ " : "") + "Entrené"; };

    const vn = ov.querySelector("#verNueva");
    const vv = ov.querySelector("#verVieja");
    const paintVersion = () => {
      vn.classList.toggle("is-on", version === "nueva");
      vn.textContent = (version === "nueva" ? "✓ " : "") + "La versión nueva";
      vv.classList.toggle("is-on", version === "vieja");
      vv.textContent = (version === "vieja" ? "✓ " : "") + "La vieja";
    };
    // tocar de nuevo el mismo = deseleccionar
    vn.onclick = () => { version = version === "nueva" ? null : "nueva"; paintVersion(); };
    vv.onclick = () => { version = version === "vieja" ? null : "vieja"; paintVersion(); };

    const close = () => { ov.hidden = true; ov.innerHTML = ""; };
    ov.querySelector("#closeDay").onclick = close;
    ov.querySelector("#saveDay").onclick = () => {
      S().setDay({
        note: ov.querySelector("#dayNote").value.trim(),
        deadline: ov.querySelector("#dayDeadline").value.trim(),
        deepWork: deep, trained: train, version: version
      }, dk);
      close();
      renderDias();
    };
  }

  return {
    esc, app, setActiveNav, showSelfTalk,
    renderHoy, renderCreencias, renderDias,
    // expuestos para ui2
    _internal: { S, D }
  };
})();

window.FORJA_UI = FORJA_UI;
