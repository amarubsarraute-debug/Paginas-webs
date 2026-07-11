/* ============================================================
   FORJA · ui2.js  (parte 2)
   Pantallas: EMOCIONES · AJUSTES · DECISIÓN
   ============================================================ */

(function () {
  const UI = window.FORJA_UI;
  const esc = UI.esc;
  const app = UI.app;
  const S = () => window.FORJA_STATE;
  const D = () => window.FORJA_DATA;

  // ===========================================================
  //  EMOCIONES
  // ===========================================================
  function renderEmociones(selected) {
    UI.setActiveNav("emociones");
    const emos = D().emotions;

    const grid = emos.map((e, i) =>
      `<button class="emo" data-emo="${i}">
        <div class="emo__name">${esc(e.name)}</div>
        <div class="emo__tag ${e.serves ? "si" : "no"}">${e.serves ? "PUEDE SERVIR" : "NO SIRVE"}</div>
      </button>`).join("");

    let verdict = "";
    if (selected != null && emos[selected]) {
      const e = emos[selected];
      verdict = `
        <div class="verdict">
          <div class="verdict__q">${esc(e.name).toUpperCase()} · ¿ESTA EMOCIÓN ME SIRVE?</div>
          <div class="verdict__a">${e.serves ? "SÍ. " : "NO. "}${esc(e.advice)}</div>
        </div>`;
    }

    app().innerHTML = `
      <section class="screen">
        <div class="screen__head">
          <div class="kicker kicker--accent">DOMINAR LAS EMOCIONES</div>
          <h1 class="screen__title">EMOCIÓN</h1>
          <p class="screen__sub">Conciencia → ¿me sirve? → si no, soltala y volvé al trabajo. Si sí, usala como combustible.</p>
        </div>
        <div class="emos">${grid}</div>
        ${verdict}
        <div class="kicker mt-m" style="margin-bottom:12px">DIARIO DE VOZ · CÓMO ME SIENTO</div>
        ${FORJA_VOZ.recorderBarHTML("diary", "Grabá cómo te sentís ahora (30s). Después podés escucharlo o borrarlo.")}
        <div id="diary-list"></div>
      </section>`;

    app().querySelectorAll("[data-emo]").forEach((b) => {
      b.onclick = () => renderEmociones(Number(b.dataset.emo));
    });
    FORJA_VOZ.bindRecorder("diary", "diary", { label: "Diario · " + S().todayKey() }, paintDiaryList);
    paintDiaryList();
  }

  async function paintDiaryList() {
    const mount = document.getElementById("diary-list");
    if (!mount) return;
    const items = await FORJA_AUDIO.listByCategory("diary");
    mount.innerHTML = FORJA_VOZ.audioListHTML(items, "Todavía no grabaste ninguno.");
    FORJA_VOZ.bindAudioList(mount, paintDiaryList);
  }

  // ===========================================================
  //  AJUSTES
  // ===========================================================
  function renderAjustes() {
    UI.setActiveNav("ajustes");
    const c = S().content();

    app().innerHTML = `
      <section class="screen">
        <div class="screen__head">
          <div class="kicker kicker--accent">TU CONTENIDO</div>
          <h1 class="screen__title">AJUSTES</h1>
          <p class="screen__sub">Editá todo. Es tu sistema. Los cambios se guardan al instante.</p>
        </div>

        <div class="setblock">
          <div class="kicker setblock__title">FRASE DE IDENTIDAD (la que ves al abrir)</div>
          <textarea class="editable" id="ed-identity" rows="3">${esc(c.identity)}</textarea>
        </div>

        <div class="setblock">
          <div class="kicker setblock__title">SELF-TALK (al terminar el deep work)</div>
          <textarea class="editable" id="ed-selftalk" rows="3">${esc(c.selfTalk)}</textarea>
        </div>

        <div class="setblock">
          <div class="kicker setblock__title">
            <span>CREENCIAS</span>
            <button class="minibtn" id="addBelief">+ agregar</button>
          </div>
          <div id="beliefsEdit"></div>
        </div>

        <button class="btn btn--accent" id="saveAll">GUARDAR TODO</button>
        <button class="btn btn--ghost danger mt-s" id="resetAll">Reiniciar los 90 días</button>
        <p class="screen__sub mt-s">Día 1: ${esc(S().raw().startDate || "hoy")}</p>
      </section>`;

    paintBeliefsEdit();
    bindAjustes();
  }

  function paintBeliefsEdit() {
    const c = S().content();
    const wrap = document.getElementById("beliefsEdit");
    wrap.innerHTML = c.beliefs.map((b, i) => `
      <div class="list-edit__row">
        <textarea class="editable" data-belief="${i}" rows="2">${esc(b)}</textarea>
        <button class="minibtn" data-delbelief="${i}">✕</button>
      </div>`).join("");
    wrap.querySelectorAll("[data-delbelief]").forEach((btn) => {
      btn.onclick = () => {
        const c2 = S().content();
        c2.beliefs.splice(Number(btn.dataset.delbelief), 1);
        S().setContent({ beliefs: c2.beliefs });
        paintBeliefsEdit();
      };
    });
  }

  function bindAjustes() {
    document.getElementById("addBelief").onclick = () => {
      const c = S().content();
      c.beliefs.push("Soy una persona que...");
      S().setContent({ beliefs: c.beliefs });
      paintBeliefsEdit();
    };

    document.getElementById("saveAll").onclick = () => {
      const c = S().content();
      c.identity = document.getElementById("ed-identity").value.trim();
      c.selfTalk = document.getElementById("ed-selftalk").value.trim();
      document.querySelectorAll("[data-belief]").forEach((t) => {
        c.beliefs[Number(t.dataset.belief)] = t.value.trim();
      });
      c.beliefs = c.beliefs.filter((b) => b.length > 0);
      S().setContent(c);
      const btn = document.getElementById("saveAll");
      btn.textContent = "✓ GUARDADO";
      setTimeout(() => { btn.textContent = "GUARDAR TODO"; }, 1500);
    };

    document.getElementById("resetAll").onclick = () => {
      if (confirm("¿Reiniciar el contador de 90 días y todo el progreso? Tu contenido (creencias, identidad) se mantiene.")) {
        const content = S().content();
        S().reset();
        S().setContent(content);
        FORJA_APP.go("hoy");
      }
    };
  }

  // ===========================================================
  //  DECISIÓN  (mapa de transformación: vieja → presente → futuro)
  // ===========================================================
  let _editManifesto = false;
  let _editIntro = false;

  // Tres monigotes distintos según el estado de ánimo / postura.
  const FIG_SVG = {
    vieja: `<svg viewBox="0 0 120 200" fill="none" aria-hidden="true">
      <circle cx="60" cy="40" r="21" stroke="currentColor" stroke-width="2.4"/>
      <circle cx="52" cy="39" r="2.4" fill="currentColor"/><circle cx="68" cy="39" r="2.4" fill="currentColor"/>
      <path d="M51 53 Q60 46 69 53" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M60 61 L60 120" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M60 77 L43 102" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M60 77 L77 102" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M60 120 L47 162" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M60 120 L73 162" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
    </svg>`,
    presente: `<svg viewBox="0 0 120 200" fill="none" aria-hidden="true">
      <circle cx="60" cy="36" r="21" stroke="currentColor" stroke-width="2.4"/>
      <circle cx="52" cy="34" r="2.4" fill="currentColor"/><circle cx="68" cy="34" r="2.4" fill="currentColor"/>
      <path d="M52 46 L68 46" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M60 57 L60 118" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M60 72 L40 84" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M60 72 L80 84" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M60 118 L48 160" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M60 118 L72 160" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
    </svg>`,
    futuro: `<svg viewBox="0 0 120 200" fill="none" aria-hidden="true">
      <circle cx="60" cy="40" r="21" stroke="currentColor" stroke-width="2.6"/>
      <circle cx="52" cy="38" r="2.4" fill="currentColor"/><circle cx="68" cy="38" r="2.4" fill="currentColor"/>
      <path d="M51 45 Q60 54 69 45" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M60 61 L60 120" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M60 76 L41 52" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M60 76 L79 52" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M60 120 L47 162" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M60 120 L73 162" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
    </svg>`
  };

  const FIGS = [
    { key: "vieja", cls: "fig--old", label: "MI VERSIÓN VIEJA", sub: "QUIÉN CREÓ MI PRESENTE", place: "Un rasgo del que fui…" },
    { key: "presente", cls: "fig--now", label: "YO EN EL PRESENTE", sub: "QUÉ ACCIONES TOMO HOY", place: "¿Hoy actúo como el viejo o como el ideal?" },
    { key: "futuro", cls: "fig--future", label: "EN QUIÉN ME CONVIERTO", sub: "SI TOMO LAS DECISIONES CORRECTAS", place: "Un rasgo de mi yo ideal…" }
  ];

  function renderDecision() {
    UI.setActiveNav("decision");
    const dec = S().getDecision();
    const manifesto = dec.manifesto || "";
    const intro = dec.intro || "";

    const figCols = FIGS.map((f) => {
      const items = dec[f.key] || [];
      const rows = items.map((t, i) => `
        <li class="fig__trait">
          <span>${esc(t)}</span>
          <button class="fig__del" data-delfig="${f.key}" data-i="${i}" title="Quitar">✕</button>
        </li>`).join("");
      return `
        <div class="fig ${f.cls}">
          <div class="fig__svg">${FIG_SVG[f.key]}</div>
          <div class="fig__label">${f.label}</div>
          <div class="kicker fig__sub">${f.sub}</div>
          <ul class="fig__traits">${rows || `<li class="fig__empty">Todavía vacío.</li>`}</ul>
          <div class="fig__add">
            <input class="fig__input" data-addfig="${f.key}" placeholder="${f.place}" />
            <button class="fig__addbtn" data-addbtn="${f.key}" title="Agregar">+</button>
          </div>
        </div>`;
    }).join(`<div class="fig__arrow" aria-hidden="true">→</div>`);

    const introBlock = _editIntro
      ? `<textarea class="field" id="introInput" rows="5">${esc(intro)}</textarea>
         <button class="btn btn--accent mt-s" id="saveIntro">GUARDAR</button>
         <button class="btn btn--ghost mt-s" id="cancelIntro">Cancelar</button>`
      : `<p class="decision__intro">${esc(intro)}</p>
         <button class="btn btn--ghost btn--mini" id="editIntro">✎ editar</button>`;

    const manifestoBlock = (_editManifesto || !manifesto)
      ? `<textarea class="field" id="manifestoInput" rows="4" placeholder="Tu juramento. Ej: No importa lo que pase, voy a encontrar la manera de poner mis ideas en la realidad. Me la juego al 100% y actúo en estado de fe.">${esc(manifesto)}</textarea>
         <button class="btn btn--accent mt-s" id="saveManifesto">GUARDAR JURAMENTO</button>
         ${manifesto ? `<button class="btn btn--ghost mt-s" id="cancelManifesto">Cancelar</button>` : ""}`
      : `<div class="manifesto">${esc(manifesto)}</div>
         <button class="btn btn--ghost btn--mini" id="editManifesto">✎ editar juramento</button>`;

    app().innerHTML = `
      <section class="screen screen--decision">
        <div class="screen__head">
          <div class="kicker kicker--accent">NO PUEDO SOSTENER LAS DOS VERSIONES</div>
          <h1 class="screen__title">DECISIÓN</h1>
        </div>

        <div class="decision__intro-wrap">${introBlock}</div>

        <div class="kicker" style="margin:26px 0 12px">MI JURAMENTO</div>
        ${manifestoBlock}

        <div class="kicker" style="margin:34px 0 14px">MI VISIÓN · LO QUE CONSTRUYO</div>
        <div class="vboard" id="vboard">
          ${[0,1,2,3].map(i => `<div class="vslot" id="vslot-${i}"></div>`).join("")}
        </div>

        <div class="transmap mt-m">${figCols}</div>
      </section>`;

    // ----- vision board -----
    bindVisionBoard();

    // ----- juramento -----
    bindEditPair({
      save: "saveManifesto", edit: "editManifesto", cancel: "cancelManifesto", input: "manifestoInput",
      apply: (v) => S().setDecision({ manifesto: v }),
      setEdit: (b) => { _editManifesto = b; }
    });
    // ----- intro / descripción -----
    bindEditPair({
      save: "saveIntro", edit: "editIntro", cancel: "cancelIntro", input: "introInput",
      apply: (v) => S().setDecision({ intro: v }),
      setEdit: (b) => { _editIntro = b; }
    });

    // ----- agregar / quitar rasgos por figura -----
    function addTo(key) {
      const inp = app().querySelector(`[data-addfig="${key}"]`);
      if (!inp) return;
      const v = inp.value.trim();
      if (!v) return;
      const arr = (S().getDecision()[key] || []).slice();
      arr.push(v);
      S().setDecision({ [key]: arr });
      renderDecision();
    }
    app().querySelectorAll("[data-addfig]").forEach((inp) => {
      inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); addTo(inp.dataset.addfig); }
      });
    });
    app().querySelectorAll("[data-addbtn]").forEach((b) => {
      b.onclick = () => addTo(b.dataset.addbtn);
    });
    app().querySelectorAll("[data-delfig]").forEach((b) => {
      b.onclick = () => {
        const key = b.dataset.delfig;
        const arr = (S().getDecision()[key] || []).slice();
        arr.splice(Number(b.dataset.i), 1);
        S().setDecision({ [key]: arr });
        renderDecision();
      };
    });
  }

  // ----- vision board: imágenes bundled (/vision/v0-3.png), reemplazables via IndexedDB -----
  async function bindVisionBoard() {
    for (let i = 0; i < 4; i++) {
      const slot = document.getElementById("vslot-" + i);
      if (!slot) continue;
      const key = "vision-" + i;
      const rec = await FORJA_DB.get(key);
      if (rec && rec.blob) {
        paintVSlotCustom(slot, rec.blob, key);
      } else {
        paintVSlotBundled(slot, i);
      }
    }
  }

  // Imagen bundled: siempre visible desde /vision/v{i}.png
  function paintVSlotBundled(slot, i) {
    slot.innerHTML = `
      <img class="vslot__img" src="/vision/v${i}.png" alt="visión ${i + 1}" />
      <input type="file" accept="image/*" class="vslot__file" hidden />`;
    const fileInp = slot.querySelector(".vslot__file");
    slot.onclick = () => fileInp.click();
    fileInp.onchange = async () => {
      const file = fileInp.files[0];
      if (!file) return;
      const key = "vision-" + i;
      await FORJA_DB.put(key, file, { category: "vision", label: "Visión " + (i + 1) });
      paintVSlotCustom(slot, file, key);
    };
  }

  // Imagen personalizada guardada en IndexedDB; ✕ vuelve a la bundled
  function paintVSlotCustom(slot, blob, key) {
    const url = URL.createObjectURL(blob);
    const i = Number(key.split("-")[1]);
    slot.onclick = null;
    slot.innerHTML = `
      <img class="vslot__img" src="${url}" alt="visión" />
      <button class="vslot__del" title="Volver a la original">✕</button>`;
    slot.querySelector(".vslot__del").onclick = async (e) => {
      e.stopPropagation();
      await FORJA_DB.remove(key);
      URL.revokeObjectURL(url);
      paintVSlotBundled(slot, i);
    };
  }

  // helper: enlaza el patrón ver/editar/guardar/cancelar de un campo de texto
  function bindEditPair(o) {
    const save = document.getElementById(o.save);
    if (save) save.onclick = () => {
      o.apply(document.getElementById(o.input).value.trim());
      o.setEdit(false); renderDecision();
    };
    const edit = document.getElementById(o.edit);
    if (edit) edit.onclick = () => { o.setEdit(true); renderDecision(); };
    const cancel = document.getElementById(o.cancel);
    if (cancel) cancel.onclick = () => { o.setEdit(false); renderDecision(); };
  }

  // ===========================================================
  //  POLARIS  (mapa de evolución: dejé atrás / construí / mejorar / siguiente)
  // ===========================================================
  let _editSinceIdx = null;
  let _editTargetOpen = false;

  function renderPolaris() {
    UI.setActiveNav("polaris");
    const p = S().getPolaris();

    // ----- 1. DEJÉ ATRÁS: trofeos con racha en días (fecha de inicio editable) -----
    const trophyCards = p.dejeAtras.map((it, i) => {
      const days = S().daysSince(it.since);
      const editingThis = _editSinceIdx === i;
      const dateBlock = editingThis
        ? `<div class="trophy-editrow">
             <input type="date" class="trophy-dateinput" id="sinceInput-${i}" value="${esc(it.since)}" />
             <button class="btn btn--ghost btn--mini" data-savesince="${i}">✓</button>
           </div>`
        : `<button class="trophy-editdate" data-editsince="${i}" title="Editar desde cuándo cuenta">desde ${esc(it.since)} ✎</button>`;
      return `
        <div class="trophy-card">
          <button class="pol__del" data-delpol="dejeAtras" data-i="${i}" title="Quitar">✕</button>
          <div class="trophy-icon">🏆</div>
          <div class="trophy-days">${days}</div>
          <div class="kicker trophy-lbl">${days === 1 ? "DÍA" : "DÍAS"}</div>
          <div class="trophy-text">${esc(it.text)}</div>
          ${dateBlock}
          <button class="btn btn--ghost btn--mini trophy-recaer" data-recaer="${i}">Recaí — reiniciar</button>
        </div>`;
    }).join("");

    // ----- 2. EN QUÉ MEJORAR: progreso libre (slider) + acción práctica -----
    const mejoraCards = p.mejorar.map((it, i) => `
      <div class="mejora-card">
        <button class="pol__del" data-delpol="mejorar" data-i="${i}" title="Quitar">✕</button>
        <div class="mejora-text">${esc(it.text)}</div>
        <div class="mejora-bar-wrap"><div class="mejora-bar" style="width:${it.pct}%"></div></div>
        <div class="mejora-pct-row">
          <input type="range" class="mejora-slider" min="0" max="100" step="1" value="${it.pct}" data-slider="${i}" />
          <span class="mejora-pct" id="mejoraPctLabel-${i}">${it.pct}%</span>
        </div>
        <input class="mejora-accion" data-accion="${i}" value="${esc(it.accion)}" placeholder="Acción práctica que lo mueve en tu rutina…" />
      </div>`).join("");

    // ----- 3. LO QUE SIGUE: secuencial, solo el índice 0 activo (meta editable) -----
    const siguienteCards = p.siguiente.map((it, i) => {
      if (i === 0) {
        const ready = it.current >= it.target;
        const unitTxt = it.unit ? " " + esc(it.unit) : "";
        const targetBlock = _editTargetOpen
          ? `<div class="siguiente-editrow">
               <input type="number" class="pol__input pol__input--num" id="editTargetNum" min="1" value="${it.target}" />
               <input type="text" class="pol__input pol__input--unit" id="editTargetUnit" value="${esc(it.unit)}" placeholder="unidad" />
               <button class="btn btn--ghost btn--mini" id="saveTarget">✓</button>
             </div>`
          : `<button class="siguiente-edittarget" id="openEditTarget" title="Corregir la meta">✎ editar meta</button>`;
        return `
          <div class="siguiente-card is-active">
            <div class="kicker siguiente-kicker">OBJETIVO ACTUAL</div>
            <div class="siguiente-text">${esc(it.text)}</div>
            <div class="siguiente-counter">
              <button class="counter__btn" id="sigMinus">−</button>
              <span class="counter__val">${it.current} / ${it.target}${unitTxt}</span>
              <button class="counter__btn" id="sigPlus">+</button>
            </div>
            ${targetBlock}
            <button class="btn ${ready ? "btn--accent" : "btn--ghost"} mt-s" id="sigComplete">✓ MARCAR LOGRADO</button>
          </div>`;
      }
      return `
        <div class="siguiente-card is-locked">
          <span class="siguiente-lock">🔒</span>
          <span class="siguiente-text-locked">${esc(it.text)}</span>
        </div>`;
    }).join("");

    // ----- 4. LO QUE CONSTRUÍ: medallero -----
    const medalCards = p.construi.slice().reverse().map((it) => {
      const realIdx = p.construi.indexOf(it);
      return `
        <div class="medal-card">
          <button class="pol__del" data-delpol="construi" data-i="${realIdx}" title="Quitar">✕</button>
          <div class="medal-icon">🥇</div>
          <div class="medal-text">${esc(it.text)}</div>
          <div class="medal-date">${esc(it.achievedOn || "")}</div>
        </div>`;
    }).join("");

    app().innerHTML = `
      <section class="screen screen--polaris">
        <div class="screen__head">
          <div class="kicker kicker--accent">MI ESTRELLA · HACIA DÓNDE VOY</div>
          <h1 class="screen__title">POLARIS</h1>
          <p class="screen__sub">${esc(p.intro || "")}</p>
        </div>

        <div class="pol-section">
          <div class="pol-block__label">🏆 DEJÉ ATRÁS</div>
          <div class="kicker pol-block__sub">CADA DÍA SIN RECAER SUMA</div>
          <div class="trophy-grid">${trophyCards || `<p class="pol__empty">Todavía vacío.</p>`}</div>
          <div class="pol__add">
            <input class="pol__input" id="addDejeAtras" placeholder="Algo que soltaste…" />
            <button class="pol__addbtn" id="addDejeAtrasBtn">+</button>
          </div>
        </div>

        <div class="pol-section">
          <div class="pol-block__label">📈 EN QUÉ MEJORAR</div>
          <div class="kicker pol-block__sub">PROGRESO MANUAL + HÁBITO QUE LO MUEVE</div>
          <div class="mejora-grid">${mejoraCards || `<p class="pol__empty">Todavía vacío.</p>`}</div>
          <div class="pol__add">
            <input class="pol__input" id="addMejorar" placeholder="Algo que querés mejorar…" />
            <button class="pol__addbtn" id="addMejorarBtn">+</button>
          </div>
        </div>

        <div class="pol-section">
          <div class="pol-block__label">→ LO QUE SIGUE</div>
          <div class="kicker pol-block__sub">DE A UNO · SE DESBLOQUEA AL LOGRAR EL ANTERIOR</div>
          <div class="siguiente-list">${siguienteCards || `<p class="pol__empty">Todavía vacío.</p>`}</div>
          <div class="pol__add pol__add--siguiente">
            <input class="pol__input" id="addSiguiente" placeholder="Próximo objetivo…" />
            <input class="pol__input pol__input--num" id="addSiguienteTarget" type="number" min="1" value="1" placeholder="meta" />
            <input class="pol__input pol__input--unit" id="addSiguienteUnit" placeholder="unidad" />
            <button class="pol__addbtn" id="addSiguienteBtn">+</button>
          </div>
        </div>

        <div class="pol-section">
          <div class="pol-block__label">🥇 LO QUE CONSTRUÍ</div>
          <div class="kicker pol-block__sub">TU MEDALLERO</div>
          <div class="medal-grid">${medalCards || `<p class="pol__empty">Todavía no hay medallas. Se ganan cerrando objetivos de "LO QUE SIGUE".</p>`}</div>
        </div>
      </section>`;

    // ----- bindings: DEJÉ ATRÁS -----
    app().querySelectorAll("[data-recaer]").forEach((btn) => {
      btn.onclick = () => {
        if (confirm("¿Confirmás que recaíste? Esto reinicia la racha a 0. Sin culpa: es solo un dato honesto.")) {
          S().recaerPolaris(Number(btn.dataset.recaer));
          _editSinceIdx = null;
          renderPolaris();
        }
      };
    });
    app().querySelectorAll("[data-editsince]").forEach((btn) => {
      btn.onclick = () => { _editSinceIdx = Number(btn.dataset.editsince); renderPolaris(); };
    });
    app().querySelectorAll("[data-savesince]").forEach((btn) => {
      btn.onclick = () => {
        const i = Number(btn.dataset.savesince);
        const val = document.getElementById("sinceInput-" + i).value;
        if (val) S().setPolarisSince(i, val);
        _editSinceIdx = null;
        renderPolaris();
      };
    });
    document.getElementById("addDejeAtrasBtn").onclick = () => {
      const inp = document.getElementById("addDejeAtras");
      const v = inp.value.trim();
      if (!v) return;
      S().addPolarisItem("dejeAtras", v);
      renderPolaris();
    };
    document.getElementById("addDejeAtras").addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); document.getElementById("addDejeAtrasBtn").click(); }
    });

    // ----- bindings: EN QUÉ MEJORAR -----
    app().querySelectorAll("[data-slider]").forEach((slider) => {
      const i = Number(slider.dataset.slider);
      const label = document.getElementById("mejoraPctLabel-" + i);
      const bar = slider.closest(".mejora-card").querySelector(".mejora-bar");
      slider.oninput = () => {
        label.textContent = slider.value + "%";
        bar.style.width = slider.value + "%";
      };
      slider.onchange = () => S().setPolarisPct(i, Number(slider.value));
    });
    app().querySelectorAll("[data-accion]").forEach((inp) => {
      inp.onblur = () => S().setPolarisAccion(Number(inp.dataset.accion), inp.value.trim());
    });
    document.getElementById("addMejorarBtn").onclick = () => {
      const inp = document.getElementById("addMejorar");
      const v = inp.value.trim();
      if (!v) return;
      S().addPolarisItem("mejorar", v);
      renderPolaris();
    };
    document.getElementById("addMejorar").addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); document.getElementById("addMejorarBtn").click(); }
    });

    // ----- bindings: LO QUE SIGUE -----
    const sigMinus = document.getElementById("sigMinus");
    const sigPlus = document.getElementById("sigPlus");
    const sigComplete = document.getElementById("sigComplete");
    if (sigMinus) sigMinus.onclick = () => {
      const it = S().getPolaris().siguiente[0];
      S().setPolarisCounter(it.current - 1);
      renderPolaris();
    };
    if (sigPlus) sigPlus.onclick = () => {
      const it = S().getPolaris().siguiente[0];
      S().setPolarisCounter(it.current + 1);
      renderPolaris();
    };
    if (sigComplete) sigComplete.onclick = () => {
      const it = S().getPolaris().siguiente[0];
      const msg = it.current >= it.target
        ? "🥇 ¡Lograste este objetivo! Pasa al medallero."
        : "Todavía no llegaste a la meta. ¿Marcarlo como logrado igual?";
      if (confirm(msg)) { _editTargetOpen = false; S().completeSiguienteActual(); renderPolaris(); }
    };
    const openEditTarget = document.getElementById("openEditTarget");
    if (openEditTarget) openEditTarget.onclick = () => { _editTargetOpen = true; renderPolaris(); };
    const saveTarget = document.getElementById("saveTarget");
    if (saveTarget) saveTarget.onclick = () => {
      const target = document.getElementById("editTargetNum").value;
      const unit = document.getElementById("editTargetUnit").value.trim();
      S().setPolarisTargetUnit(target, unit);
      _editTargetOpen = false;
      renderPolaris();
    };
    document.getElementById("addSiguienteBtn").onclick = () => {
      const inp = document.getElementById("addSiguiente");
      const v = inp.value.trim();
      if (!v) return;
      const target = Math.max(1, Number(document.getElementById("addSiguienteTarget").value) || 1);
      const unit = document.getElementById("addSiguienteUnit").value.trim();
      const p2 = S().getPolaris();
      const arr = p2.siguiente.slice();
      arr.push({ text: v, current: 0, target, unit });
      S().setPolaris({ siguiente: arr });
      renderPolaris();
    };

    // ----- borrar (dejeAtras / mejorar / construi) -----
    app().querySelectorAll("[data-delpol]").forEach((b) => {
      b.onclick = () => {
        S().removePolarisItem(b.dataset.delpol, Number(b.dataset.i));
        renderPolaris();
      };
    });
  }

  // exponer
  UI.renderEmociones = renderEmociones;
  UI.renderAjustes = renderAjustes;
  UI.renderDecision = renderDecision;
  UI.renderPolaris = renderPolaris;
})();
