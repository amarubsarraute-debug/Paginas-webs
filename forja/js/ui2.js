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

  // exponer
  UI.renderEmociones = renderEmociones;
  UI.renderAjustes = renderAjustes;
  UI.renderDecision = renderDecision;
})();
