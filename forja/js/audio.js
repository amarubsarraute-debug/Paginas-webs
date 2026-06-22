/* ============================================================
   FORJA · audio.js
   Grabador integrado (MediaRecorder) + reproductor.
   Guarda los blobs en IndexedDB vía FORJA_DB.
   ============================================================ */

const FORJA_AUDIO = (() => {
  let _recorder = null;
  let _chunks = [];
  let _stream = null;
  let _currentAudio = null; // elemento <audio> en reproducción

  function supported() {
    return !!(navigator.mediaDevices && window.MediaRecorder);
  }

  async function startRecording() {
    if (!supported()) throw new Error("Tu navegador no soporta grabación de audio.");
    _stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    _chunks = [];
    // mime: webm/opus es lo más compatible en Chrome/Edge
    const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
      ? "audio/webm;codecs=opus"
      : (MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "");
    _recorder = new MediaRecorder(_stream, mime ? { mimeType: mime } : undefined);
    _recorder.ondataavailable = (e) => { if (e.data.size > 0) _chunks.push(e.data); };
    _recorder.start();
  }

  function stopRecording() {
    return new Promise((resolve) => {
      if (!_recorder) return resolve(null);
      _recorder.onstop = () => {
        const blob = new Blob(_chunks, { type: _recorder.mimeType || "audio/webm" });
        cleanup();
        resolve(blob);
      };
      _recorder.stop();
    });
  }

  function cleanup() {
    if (_stream) { _stream.getTracks().forEach((t) => t.stop()); _stream = null; }
    _recorder = null;
    _chunks = [];
  }

  function isRecording() {
    return !!_recorder && _recorder.state === "recording";
  }

  // Guardar un blob con una key (ej "beliefs")
  async function save(key, blob, meta) {
    return FORJA_DB.put(key, blob, meta);
  }

  async function exists(key) {
    const rec = await FORJA_DB.get(key);
    return !!rec;
  }

  // Reproduce el audio guardado en `key`. Devuelve el <audio> o null.
  async function play(key, { onEnd } = {}) {
    stopPlayback();
    const rec = await FORJA_DB.get(key);
    if (!rec || !rec.blob) return null;
    const url = URL.createObjectURL(rec.blob);
    const audio = new Audio(url);
    _currentAudio = audio;
    audio.onended = () => { URL.revokeObjectURL(url); _currentAudio = null; if (onEnd) onEnd(); };
    audio.onerror = () => { URL.revokeObjectURL(url); _currentAudio = null; };
    await audio.play();
    return audio;
  }

  function stopPlayback() {
    if (_currentAudio) {
      _currentAudio.pause();
      _currentAudio = null;
    }
  }

  function isPlaying() {
    return !!_currentAudio && !_currentAudio.paused;
  }

  async function remove(key) { stopPlayback(); return FORJA_DB.remove(key); }

  // Cambia el nombre (meta.label) de un audio guardado.
  async function rename(key, label) { return FORJA_DB.updateMeta(key, { label }); }

  // Lista todos los audios de una categoría (meta.category), recientes primero.
  async function listByCategory(cat, extraFilter) {
    const all = await FORJA_DB.getAll();
    return all
      .filter((r) => r.meta && r.meta.category === cat)
      .filter((r) => (extraFilter ? extraFilter(r) : true))
      .sort((a, b) => (b.savedAt || "").localeCompare(a.savedAt || ""));
  }

  // Descarga un audio guardado como archivo (.webm) al disco.
  async function download(key, filename) {
    const rec = await FORJA_DB.get(key);
    if (!rec || !rec.blob) return false;
    const url = URL.createObjectURL(rec.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (filename || key) + ".webm";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return true;
  }

  return {
    supported, startRecording, stopRecording, isRecording,
    save, exists, play, stopPlayback, isPlaying, remove, rename,
    listByCategory, download
  };
})();

window.FORJA_AUDIO = FORJA_AUDIO;
