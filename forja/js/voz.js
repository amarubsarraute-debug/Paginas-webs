/* ============================================================
   FORJA · voz.js
   Funciones de voz + evidencias:
   - Componente reutilizable: grabar / listar / reproducir /
     borrar / descargar audios por categoría.
   - Pantalla YA ESTÁ (audios hablando como si ya lo lograste).
   - Bloque de Evidencias por creencia (texto + audio).
   ============================================================ */

const FORJA_VOZ = (() => {
  const S = () => window.FORJA_STATE;
  const esc = (s) => window.FORJA_UI.esc(s);

  // -------- barra de grabación reutilizable --------
  function recorderBarHTML(pfx, hint) {
    return `
      <div class="audiobar">
        <button class="iconbtn iconbtn--rec" id="${pfx}-rec" title="Grabar">●</button>
        <div class="audiobar__status" id="${pfx}-status">${hint}</div>
      </div>`;
  }

  function bindRecorder(pfx, category, meta, onSaved) {
    const recBtn = document.getElementById(pfx + "-rec");
    const status = document.getElementById(pfx + "-status");
    if (!recBtn) return;
    recBtn.onclick = async () => {
      if (FORJA_AUDIO.isRecording()) {
        const blob = await FORJA_AUDIO.stopRecording();
        recBtn.classList.remove("is-recording");
        recBtn.textContent = "●";
        if (blob) {
          const key = category + "-" + S().todayKey() + "-" + Date.now();
          const finalMeta = Object.assign({ category, date: S().todayKey() }, meta || {});
          const name = (prompt("Ponele un nombre a este audio (opcional):", "") || "").trim();
          if (name) finalMeta.label = name;
          await FORJA_AUDIO.save(key, blob, finalMeta);
          if (status) status.innerHTML = "<b>Guardado.</b>";
          if (onSaved) onSaved(key);
        }
      } else {
        try {
          await FORJA_AUDIO.startRecording();
          recBtn.classList.add("is-recording");
          recBtn.textContent = "■";
          if (status) status.textContent = "Grabando... tocá ■ al terminar.";
        } catch (e) {
          if (status) status.textContent = "No pude acceder al micrófono. Revisá permisos.";
        }
      }
    };
  }

  // -------- lista de audios (play / descargar / borrar) --------
  function audioListHTML(items, emptyMsg) {
    if (!items.length) return `<p class="screen__sub">${emptyMsg}</p>`;
    return `<div class="audiolist">` + items.map((r) => {
      const label = (r.meta && r.meta.label) ? r.meta.label : (r.meta && r.meta.date) || "audio";
      return `
        <div class="audioitem" data-key="${esc(r.key)}">
          <button class="iconbtn" data-act="play">▶</button>
          <div class="audioitem__label">${esc(label)}</div>
          <button class="iconbtn" data-act="ren" title="Renombrar">✎</button>
          <button class="iconbtn" data-act="dl" title="Descargar">⬇</button>
          <button class="iconbtn" data-act="del" title="Borrar">🗑</button>
        </div>`;
    }).join("") + `</div>`;
  }

  function bindAudioList(container, onChange) {
    if (!container) return;
    container.querySelectorAll(".audioitem").forEach((item) => {
      const key = item.dataset.key;
      item.querySelector('[data-act="play"]').onclick = async (e) => {
        const btn = e.currentTarget;
        if (FORJA_AUDIO.isPlaying()) { FORJA_AUDIO.stopPlayback(); btn.textContent = "▶"; return; }
        btn.textContent = "■";
        await FORJA_AUDIO.play(key, { onEnd: () => { btn.textContent = "▶"; } });
      };
      const renBtn = item.querySelector('[data-act="ren"]');
      if (renBtn) renBtn.onclick = async () => {
        const current = item.querySelector(".audioitem__label").textContent.trim();
        const name = (prompt("Nuevo nombre para este audio:", current) || "").trim();
        if (!name) return;
        await FORJA_AUDIO.rename(key, name);
        if (onChange) onChange();
      };
      item.querySelector('[data-act="dl"]').onclick = () => {
        const label = item.querySelector(".audioitem__label").textContent.trim();
        FORJA_AUDIO.download(key, label || key);
      };
      item.querySelector('[data-act="del"]').onclick = async () => {
        if (!confirm("¿Borrar este audio?")) return;
        await FORJA_AUDIO.remove(key);
        if (onChange) onChange();
      };
    });
  }

  // ===========================================================
  //  YA ESTÁ  (visualización / acting as if — gratitud en pasado)
  // ===========================================================
  function syncListHTML(items) {
    if (!items.length) return `<p class="screen__sub">Todavía no anotaste ninguna señal.</p>`;
    return `<div class="synclist">` + items.map((s, i) => `
      <div class="syncitem">
        <button class="minibtn syncitem__del" data-delsync="${i}" title="Borrar">✕</button>
        <div class="syncitem__date">${esc(s.date)}</div>
        <div class="syncitem__hecho">${esc(s.hecho)}</div>
        ${s.significado ? `<div class="syncitem__signif">${esc(s.significado)}</div>` : ""}
      </div>`).join("") + `</div>`;
  }

  async function renderYaEsta() {
    window.FORJA_UI.setActiveNav("yaesta");
    const items = await FORJA_AUDIO.listByCategory("achieved");
    const sync = S().getSynchronicities();
    window.FORJA_UI.app().innerHTML = `
      <section class="screen">
        <div class="screen__head">
          <div class="kicker kicker--accent">VISUALIZACIÓN · HABLÁ EN PASADO</div>
          <h1 class="screen__title">YA ESTÁ</h1>
          <p class="screen__sub">Grabate hablando como si ya lo hubieras logrado, agradecido y en pasado. Ej: "Acabo de terminar mi sistema con Patricio con IA, lo probé y funciona increíble, estoy súper agradecido." Tu subconsciente no distingue lo vívido de lo real.</p>
        </div>
        ${recorderBarHTML("ya", "Tocá ● y hablá como si ya estuviera hecho.")}
        <div class="kicker mt-m" style="margin-bottom:12px">MIS AUDIOS · YA LO LOGRÉ</div>
        <div id="ya-list">${audioListHTML(items, "Todavía no grabaste ninguno. Empezá por el más cercano.")}</div>

        <div class="kicker" style="margin:34px 0 10px">SINCRONICIDADES · SEÑALES QUE RESUENAN</div>
        <p class="screen__sub" style="margin:0 0 14px">Cuando algo te resuene fuerte —una señal, una "casualidad" que no parece casual— anotala. El hecho, y qué te significó.</p>
        <div class="sync__add">
          <textarea class="field" id="sync-hecho" rows="2" placeholder="¿Qué pasó? La señal, la casualidad..."></textarea>
          <textarea class="field mt-s" id="sync-signif" rows="2" placeholder="¿Qué te significó? ¿Por qué resonó con vos?"></textarea>
          <button class="btn mt-s" id="sync-save">+ ANOTAR SEÑAL</button>
        </div>
        <div id="sync-list" class="mt-m">${syncListHTML(sync)}</div>
      </section>`;
    bindRecorder("ya", "achieved", { label: "Ya está · " + S().todayKey() }, renderYaEsta);
    bindAudioList(document.getElementById("ya-list"), renderYaEsta);

    document.getElementById("sync-save").onclick = () => {
      const hecho = document.getElementById("sync-hecho").value.trim();
      const signif = document.getElementById("sync-signif").value.trim();
      if (!hecho) { document.getElementById("sync-hecho").focus(); return; }
      S().addSynchronicity(hecho, signif);
      renderYaEsta();
    };
    document.querySelectorAll("[data-delsync]").forEach((b) => {
      b.onclick = () => {
        if (!confirm("¿Borrar esta señal?")) return;
        S().removeSynchronicity(Number(b.dataset.delsync));
        renderYaEsta();
      };
    });
  }

  // ===========================================================
  //  EVIDENCIAS de una creencia (texto + audio)
  // ===========================================================
  async function renderEvidence(beliefIdx, mount) {
    if (!mount) return;
    const texts = S().getEvidence(beliefIdx);
    const audios = await FORJA_AUDIO.listByCategory("evidence", (r) => r.meta && r.meta.beliefIndex === beliefIdx);

    const textList = texts.map((ev, i) => `
      <div class="evidence__row">
        <div class="evidence__text">“${esc(ev.text)}”<small>${esc(ev.date)}</small></div>
        <button class="minibtn" data-delev="${i}">✕</button>
      </div>`).join("");

    mount.innerHTML = `
      <div class="evidence">
        <div class="kicker" style="margin-bottom:12px">EVIDENCIAS · POR QUÉ ESTO ES VERDAD</div>
        ${textList || '<p class="screen__sub" style="margin:0 0 12px">Sumá pruebas reales de que esta creencia es cierta. Cada evidencia la hace más fuerte.</p>'}
        <div class="evidence__add">
          <textarea class="field" id="ev-input" rows="2" placeholder="Una prueba real: algo que lograste, una vez que funcionó..."></textarea>
          <button class="btn mt-s" id="ev-save">+ AGREGAR EVIDENCIA</button>
        </div>
        ${recorderBarHTML("ev", "O grabá una evidencia en audio.")}
        <div id="ev-list">${audioListHTML(audios, "")}</div>
      </div>`;

    document.getElementById("ev-save").onclick = () => {
      const val = document.getElementById("ev-input").value.trim();
      if (!val) return;
      S().addEvidence(beliefIdx, val);
      renderEvidence(beliefIdx, mount);
    };
    mount.querySelectorAll("[data-delev]").forEach((b) => {
      b.onclick = () => { S().removeEvidence(beliefIdx, Number(b.dataset.delev)); renderEvidence(beliefIdx, mount); };
    });
    bindRecorder("ev", "evidence", { beliefIndex: beliefIdx, label: "Evidencia · " + S().todayKey() },
      () => renderEvidence(beliefIdx, mount));
    bindAudioList(document.getElementById("ev-list"), () => renderEvidence(beliefIdx, mount));
  }

  return { renderYaEsta, renderEvidence, recorderBarHTML, bindRecorder, audioListHTML, bindAudioList };
})();

window.FORJA_VOZ = FORJA_VOZ;
