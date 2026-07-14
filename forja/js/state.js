/* ============================================================
   FORJA · state.js
   Estado en localStorage (clave forja_state). Todo lo que no
   es audio vive acá: contenido editable, registro de días,
   sesión activa, inputs del buzón.
   ============================================================ */

const FORJA_STATE = (() => {
  const KEY = "forja_state";

  const DEFAULT = {
    startDate: null,           // ISO "YYYY-MM-DD" del día 1
    content: {                 // copia editable del seed
      identity: FORJA_DATA.identity,
      identityLong: FORJA_DATA.identityLong.slice(),
      ideal: FORJA_DATA.ideal.slice(),
      beliefs: FORJA_DATA.beliefs.slice(),
      selfTalk: FORJA_DATA.selfTalk,
      goal: JSON.parse(JSON.stringify(FORJA_DATA.goal)),
      evidence: {},            // { "<indiceCreencia>": [ {text, date}, ... ] }
      decision: { manifesto: "" }, // juramento + mapa vieja/presente/futuro (getDecision lo siembra)
      polaris: null                // mapa de evolución (getPolaris lo siembra)
    },
    synchronicities: [],       // señales que resuenan: [{hecho, significado, date}]
    days: {},                  // "YYYY-MM-DD": { deepWork, trained, selfTalk, task, taskMinutes, doneMinutes, note, version }
    session: null,             // { task, minutes, startedAt }
    lastOpen: null,
    morningDoneOn: null,       // fecha en que ya hizo la activación matutina
    roadmap: { current: 0, milestones: null },
    cycles: {},                // bitácora por ciclos: { "1": { devolucion, savedOn }, ... }
    hacks: null                 // reencuadres + rachas de fe (getHacks lo siembra)
  };

  let _state = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return structuredClone(DEFAULT);
      const parsed = JSON.parse(raw);
      // merge defensivo por si agregamos campos nuevos
      return Object.assign(structuredClone(DEFAULT), parsed, {
        content: Object.assign(structuredClone(DEFAULT.content), parsed.content || {})
      });
    } catch (e) {
      console.warn("FORJA: estado corrupto, reinicio", e);
      return structuredClone(DEFAULT);
    }
  }

  function save() {
    localStorage.setItem(KEY, JSON.stringify(_state));
  }

  // ----- fechas -----
  function todayKey(d = new Date()) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function ensureStart() {
    if (!_state.startDate) {
      _state.startDate = todayKey();
      save();
    }
    return _state.startDate;
  }

  function dayNumber(dateKey = todayKey()) {
    if (!_state.startDate) return 1;
    const a = new Date(_state.startDate + "T00:00:00");
    const b = new Date(dateKey + "T00:00:00");
    const diff = Math.floor((b - a) / 86400000);
    return diff + 1; // día 1 = startDate
  }

  function dateForDay(n) {
    const a = new Date((_state.startDate || todayKey()) + "T00:00:00");
    a.setDate(a.getDate() + (n - 1));
    return todayKey(a);
  }

  // ----- registro de días -----
  function getDay(dateKey = todayKey()) {
    return _state.days[dateKey] || { deepWork: false, trained: false, selfTalk: false, task: "", taskMinutes: 0, doneMinutes: 0, note: "", deepWorkNote: "", version: null, midpoint: "" };
  }

  function setDay(patch, dateKey = todayKey()) {
    _state.days[dateKey] = Object.assign(getDay(dateKey), patch);
    save();
  }

  // ----- sesión deep work -----
  function startSession(task, minutes) {
    ensureStart();
    _state.session = { task, minutes: Number(minutes) || 0, startedAt: Date.now(), pausedAt: null, pausedAccum: 0 };
    setDay({ task, taskMinutes: Number(minutes) || 0 });
    save();
  }
  function getSession() { return _state.session; }
  // Pausa: congela el reloj (para ir al baño y eso).
  function pauseSession() {
    const s = _state.session;
    if (s && !s.pausedAt) { s.pausedAt = Date.now(); save(); }
  }
  // Reanuda: suma el tiempo en pausa al acumulado para que no cuente.
  function resumeSession() {
    const s = _state.session;
    if (s && s.pausedAt) { s.pausedAccum = (s.pausedAccum || 0) + (Date.now() - s.pausedAt); s.pausedAt = null; save(); }
  }
  function endSession() {
    const s = _state.session;
    if (s) {
      const c = window.FORJA_TIMER && window.FORJA_TIMER.compute(s);
      const ms = c ? c.elapsedMs : (Date.now() - s.startedAt);
      const elapsedMin = Math.max(1, Math.round(ms / 60000));
      setDay({ deepWork: true, doneMinutes: elapsedMin });
    }
    _state.session = null;
    save();
  }
  function cancelSession() { _state.session = null; save(); }

  // ----- morning flag -----
  function isMorningDone() { return _state.morningDoneOn === todayKey(); }
  function markMorningDone() { _state.morningDoneOn = todayKey(); save(); }

  // ----- estadísticas -----
  function stats() {
    const entries = Object.entries(_state.days);
    let fullDays = 0, deepDays = 0, trainDays = 0;
    entries.forEach(([k, v]) => {
      if (v.deepWork) deepDays++;
      if (v.trained) trainDays++;
      if (v.deepWork && v.trained) fullDays++;
    });
    return {
      day: dayNumber(),
      fullDays, deepDays, trainDays,
      streak: currentStreak()
    };
  }

  function currentStreak() {
    let streak = 0;
    let d = new Date();
    for (;;) {
      const k = todayKey(d);
      const rec = _state.days[k];
      const done = rec && rec.deepWork;
      if (done) { streak++; d.setDate(d.getDate() - 1); }
      else {
        // permití que hoy todavía no esté hecho sin romper la racha
        if (k === todayKey()) { d.setDate(d.getDate() - 1); continue; }
        break;
      }
      if (streak > 400) break;
    }
    return streak;
  }

  // ----- contenido editable -----
  function content() { return _state.content; }
  function setContent(patch) {
    _state.content = Object.assign(_state.content, patch);
    save();
  }

  // ----- evidencias por creencia -----
  function getEvidence(idx) {
    if (!_state.content.evidence) _state.content.evidence = {};
    return _state.content.evidence[idx] || [];
  }
  function addEvidence(idx, text) {
    if (!_state.content.evidence) _state.content.evidence = {};
    const list = _state.content.evidence[idx] || [];
    list.push({ text: text, date: todayKey() });
    _state.content.evidence[idx] = list;
    save();
  }
  function removeEvidence(idx, i) {
    if (!_state.content.evidence || !_state.content.evidence[idx]) return;
    _state.content.evidence[idx].splice(i, 1);
    save();
  }

  // ----- DECISIÓN: juramento + mapa vieja → presente → futuro -----
  function getDecision() {
    const seed = FORJA_DATA.decision;
    const d = _state.content.decision || (_state.content.decision = {});
    let dirty = false;
    if (typeof d.manifesto !== "string") { d.manifesto = ""; dirty = true; }
    if (typeof d.intro !== "string") { d.intro = seed.intro; dirty = true; }
    if (!Array.isArray(d.vieja)) { d.vieja = seed.vieja.slice(); dirty = true; }
    if (!Array.isArray(d.presente)) { d.presente = seed.presente.slice(); dirty = true; }
    if (!Array.isArray(d.futuro)) { d.futuro = seed.futuro.slice(); dirty = true; }
    if ("dropList" in d) { delete d.dropList; dirty = true; } // migración: descartar lista vieja
    if (dirty) save();
    return d;
  }
  function setDecision(patch) {
    _state.content.decision = Object.assign(getDecision(), patch);
    save();
  }

  // ----- POLARIS: mapa de evolución (dejé atrás / construí / mejorar / siguiente) -----
  // dejeAtras:  { text, since }              racha en días desde `since`, "Recaí" resetea a hoy
  // mejorar:    { text, pct, accion }        progreso manual 0-100 + hábito concreto que lo mueve
  // siguiente:  { text, current, target, unit } secuencial: solo el índice 0 está activo/editable
  // construi:   { text, achievedOn }         medallero, con fecha de logro
  function daysSince(dateStr) {
    if (!dateStr) return 0;
    const a = new Date(dateStr + "T00:00:00");
    const b = new Date(todayKey() + "T00:00:00");
    return Math.max(0, Math.floor((b - a) / 86400000));
  }
  function normPolarisItem(key, it) {
    const today = todayKey();
    const base = (typeof it === "string") ? { text: it } : (it && typeof it === "object") ? it : { text: String(it) };
    if (typeof base.text !== "string") base.text = "";
    if (key === "dejeAtras" && !base.since) base.since = _state.startDate || today;
    if (key === "mejorar") {
      if (typeof base.pct !== "number") base.pct = 0;
      if (typeof base.accion !== "string") base.accion = "";
    }
    if (key === "siguiente") {
      if (typeof base.current !== "number") base.current = 0;
      if (typeof base.target !== "number") base.target = 1;
      if (typeof base.unit !== "string") base.unit = "";
    }
    if (key === "construi" && !base.achievedOn) base.achievedOn = today;
    return base;
  }
  function getPolaris() {
    const seed = FORJA_DATA.polaris;
    let p = _state.content.polaris;
    if (!p || typeof p !== "object") {
      p = _state.content.polaris = { intro: seed.intro, dejeAtras: [], construi: [], mejorar: [], siguiente: [] };
      ["dejeAtras", "construi", "mejorar", "siguiente"].forEach((k) => {
        p[k] = (seed[k] || []).slice();
      });
    }
    if (typeof p.intro !== "string") p.intro = seed.intro;
    ["dejeAtras", "construi", "mejorar", "siguiente"].forEach((k) => {
      if (!Array.isArray(p[k])) p[k] = (seed[k] || []).slice();
      p[k] = p[k].map((it) => normPolarisItem(k, it));
    });
    save();
    return p;
  }
  function setPolaris(patch) {
    _state.content.polaris = Object.assign(getPolaris(), patch);
    save();
  }
  function addPolarisItem(key, text) {
    const p = getPolaris();
    const arr = p[key].slice();
    arr.push(normPolarisItem(key, text));
    setPolaris({ [key]: arr });
  }
  function removePolarisItem(key, i) {
    const p = getPolaris();
    const arr = p[key].slice();
    arr.splice(i, 1);
    setPolaris({ [key]: arr });
  }
  // "Recaí": resetea la racha de un ítem de dejeAtras a hoy
  function recaerPolaris(i) {
    const p = getPolaris();
    const arr = p.dejeAtras.slice();
    if (arr[i]) { arr[i] = Object.assign({}, arr[i], { since: todayKey() }); setPolaris({ dejeAtras: arr }); }
  }
  // Editar manualmente desde qué fecha cuenta la racha (por si arrancó antes de usar la app)
  function setPolarisSince(i, dateStr) {
    const p = getPolaris();
    const arr = p.dejeAtras.slice();
    if (arr[i] && dateStr) { arr[i] = Object.assign({}, arr[i], { since: dateStr }); setPolaris({ dejeAtras: arr }); }
  }
  function setPolarisPct(i, pct) {
    const p = getPolaris();
    const arr = p.mejorar.slice();
    if (arr[i]) { arr[i] = Object.assign({}, arr[i], { pct: Math.max(0, Math.min(100, Math.round(pct))) }); setPolaris({ mejorar: arr }); }
  }
  function setPolarisAccion(i, text) {
    const p = getPolaris();
    const arr = p.mejorar.slice();
    if (arr[i]) { arr[i] = Object.assign({}, arr[i], { accion: text }); setPolaris({ mejorar: arr }); }
  }
  // Solo el objetivo en curso (índice 0) es editable: se avanza de a uno.
  function setPolarisCounter(current) {
    const p = getPolaris();
    const arr = p.siguiente.slice();
    if (arr[0]) { arr[0] = Object.assign({}, arr[0], { current: Math.max(0, Math.min(arr[0].target, current)) }); setPolaris({ siguiente: arr }); }
  }
  // Editar la meta/unidad del objetivo en curso (por si la meta real no coincide con lo cargado)
  function setPolarisTargetUnit(target, unit) {
    const p = getPolaris();
    const arr = p.siguiente.slice();
    if (arr[0]) {
      const t = Math.max(1, Number(target) || arr[0].target);
      arr[0] = Object.assign({}, arr[0], { target: t, unit: unit != null ? unit : arr[0].unit, current: Math.min(arr[0].current, t) });
      setPolaris({ siguiente: arr });
    }
  }
  // Marca el objetivo en curso como logrado: pasa a construí (medalla) y desbloquea el siguiente.
  function completeSiguienteActual() {
    const p = getPolaris();
    const siguiente = p.siguiente.slice();
    const item = siguiente.shift();
    if (!item) return;
    const construi = p.construi.slice();
    const proof = item.target > 1 ? ` (${item.current}/${item.target}${item.unit ? " " + item.unit : ""})` : "";
    construi.push({ text: item.text + proof, achievedOn: todayKey() });
    setPolaris({ siguiente, construi });
  }

  // ----- HACKS: reencuadre de problemas/fallos + racha de fe -----
  // reencuadres: [{ tipo: 'problema'|'fallo', texto, respuesta, date }]
  // siembras:    [{ texto, since }]           racha de fe en días, activa
  // cosechas:    [{ texto, dias, date }]      historial cuando llega el resultado
  function getHacks() {
    if (!_state.hacks || typeof _state.hacks !== "object") {
      _state.hacks = { reencuadres: [], siembras: [], cosechas: [] };
      save();
    }
    if (!Array.isArray(_state.hacks.reencuadres)) _state.hacks.reencuadres = [];
    if (!Array.isArray(_state.hacks.siembras)) _state.hacks.siembras = [];
    if (!Array.isArray(_state.hacks.cosechas)) _state.hacks.cosechas = [];
    return _state.hacks;
  }
  function addReencuadre(tipo, texto, respuesta) {
    const h = getHacks();
    h.reencuadres.unshift({ tipo, texto, respuesta, date: todayKey() });
    save();
  }
  function removeReencuadre(i) {
    getHacks().reencuadres.splice(i, 1);
    save();
  }
  function addSiembra(texto) {
    const h = getHacks();
    h.siembras.push({ texto, since: todayKey() });
    save();
  }
  function removeSiembra(i) {
    getHacks().siembras.splice(i, 1);
    save();
  }
  // El resultado llegó: archiva la espera en cosechas y saca la siembra de la lista activa.
  function cosecharSiembra(i, resultadoTexto) {
    const h = getHacks();
    const item = h.siembras[i];
    if (!item) return;
    const dias = daysSince(item.since);
    h.cosechas.unshift({ texto: item.texto, resultado: resultadoTexto || "", dias, date: todayKey() });
    h.siembras.splice(i, 1);
    save();
  }

  // ----- SINCRONICIDADES: señales que resuenan -----
  function getSynchronicities() {
    if (!_state.synchronicities) _state.synchronicities = [];
    return _state.synchronicities;
  }
  function addSynchronicity(hecho, significado) {
    getSynchronicities().unshift({ hecho, significado, date: todayKey() });
    save();
  }
  function removeSynchronicity(i) {
    getSynchronicities().splice(i, 1);
    save();
  }

  // ----- ROADMAP: hoja de ruta secuencial -----
  function getRoadmap() {
    if (!_state.roadmap) _state.roadmap = { current: 0, milestones: null };
    if (!_state.roadmap.milestones) {
      _state.roadmap.milestones = (FORJA_DATA.roadmap || []).map(function(m) {
        return { text: m.text, targetDate: null, completedOn: null };
      });
      save();
    }
    return _state.roadmap;
  }
  function setMilestoneDate(i, date) {
    var rm = getRoadmap();
    if (rm.milestones[i]) { rm.milestones[i].targetDate = date || null; save(); }
  }
  function completeCurrentMilestone() {
    var rm = getRoadmap();
    var i = rm.current;
    if (rm.milestones[i]) {
      rm.milestones[i].completedOn = todayKey();
      rm.current = Math.min(i + 1, rm.milestones.length);
      save();
    }
  }
  function undoLastMilestone() {
    var rm = getRoadmap();
    if (rm.current > 0) {
      rm.current--;
      rm.milestones[rm.current].completedOn = null;
      save();
    }
  }

  // ----- CICLOS: bitácora cada 10 días -----
  const CYCLE_LEN = 10;
  function cycleCount() { return Math.ceil((FORJA_DATA.totalDays || 90) / CYCLE_LEN); }
  function cycleBounds(b) { // b = 1..cycleCount
    const start = (b - 1) * CYCLE_LEN + 1;
    const end = Math.min(b * CYCLE_LEN, FORJA_DATA.totalDays || 90);
    return { start, end };
  }
  function cycleUnlocked(b) { return dayNumber() >= cycleBounds(b).end; }
  function cycleDays(b) {
    const { start, end } = cycleBounds(b);
    const out = [];
    for (let n = start; n <= end; n++) {
      const dk = dateForDay(n);
      out.push({ n, dk, rec: getDay(dk) });
    }
    return out;
  }
  function getCycles() {
    if (!_state.cycles) _state.cycles = {};
    return _state.cycles;
  }
  function getCycle(b) { return getCycles()[String(b)] || null; }
  function saveCycleDevolucion(b, text) {
    const c = getCycles();
    c[String(b)] = { devolucion: text, savedOn: (getCycle(b) && getCycle(b).savedOn) || todayKey(), updatedOn: todayKey() };
    save();
  }
  function removeCycleDevolucion(b) {
    const c = getCycles();
    delete c[String(b)];
    save();
  }

  // Pedir almacenamiento durable: evita que el navegador borre los
  // audios/estado bajo presión de espacio. (No-op si no está soportado.)
  async function requestPersistence() {
    try {
      if (navigator.storage && navigator.storage.persist) {
        const already = await navigator.storage.persisted();
        if (!already) return await navigator.storage.persist();
        return true;
      }
    } catch (e) { /* ignorar */ }
    return false;
  }

  function reset() {
    _state = structuredClone(DEFAULT);
    save();
  }

  function raw() { return _state; }

  return {
    todayKey, ensureStart, dayNumber, dateForDay,
    getDay, setDay,
    startSession, getSession, pauseSession, resumeSession, endSession, cancelSession,
    isMorningDone, markMorningDone,
    stats, content, setContent,
    getEvidence, addEvidence, removeEvidence,
    getDecision, setDecision,
    getPolaris, setPolaris, addPolarisItem, removePolarisItem,
    recaerPolaris, setPolarisSince, setPolarisPct, setPolarisAccion, setPolarisCounter, setPolarisTargetUnit, completeSiguienteActual, daysSince,
    getHacks, addReencuadre, removeReencuadre, addSiembra, removeSiembra, cosecharSiembra,
    getSynchronicities, addSynchronicity, removeSynchronicity,
    getRoadmap, setMilestoneDate, completeCurrentMilestone, undoLastMilestone,
    cycleCount, cycleBounds, cycleUnlocked, cycleDays, getCycles, getCycle, saveCycleDevolucion, removeCycleDevolucion,
    requestPersistence,
    reset, raw, save
  };
})();

window.FORJA_STATE = FORJA_STATE;
