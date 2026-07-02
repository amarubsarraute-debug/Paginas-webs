/* =============================================================================
   ADMIN.JS — Panel de carga de vehículos (Fede Desal)
   Sube fotos comprimidas + escribe en la planilla vía Google Apps Script.
   ========================================================================== */
(function () {
  "use strict";

  /* 👇 PEGÁ ACÁ la URL del Apps Script (la que termina en /exec) */
  var API_URL = "https://script.google.com/macros/s/AKfycbyA_UqxXcFV4YcB9ihpCpnCb7eCjaMz0zVtqtcBm857Ggr_cSVq564YmD6kEkhBUM0/exec";

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var PW = "";                 // contraseña en memoria (sessionStorage)
  var editId = null;           // id en edición (null = alta nueva)
  var keepPhotos = [];         // urls de fotos existentes a conservar (modo edición)
  var newFiles = [];           // {b64, mime, preview} fotos nuevas a subir

  /* ----------------------- API ----------------------- */
  function api(payload) {
    payload.password = PW;
    return fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // evita preflight CORS
      body: JSON.stringify(payload)
    }).then(function (r) { return r.json(); })
      .then(function (d) { if (!d.ok) throw new Error(d.error || "Error"); return d; });
  }

  /* ----------------------- LOGIN ----------------------- */
  function initLogin() {
    var saved = sessionStorage.getItem("fd_admin_pw");
    if (saved) { PW = saved; tryEnter(true); }
    $("#login-form").addEventListener("submit", function (e) {
      e.preventDefault();
      PW = $("#login-pw").value.trim();
      tryEnter(false);
    });
  }
  function tryEnter(silent) {
    var btn = $("#login-btn"); if (btn) { btn.disabled = true; btn.textContent = "Entrando…"; }
    api({ action: "list" }).then(function (d) {
      sessionStorage.setItem("fd_admin_pw", PW);
      $("#login").style.display = "none";
      $("#app").style.display = "block";
      renderList(d.items);
    }).catch(function (err) {
      if (!silent) toast(err.message || "No se pudo entrar", true);
      if (silent) { sessionStorage.removeItem("fd_admin_pw"); }
    }).then(function () {
      if (btn) { btn.disabled = false; btn.textContent = "Entrar"; }
    });
  }

  /* ----------------------- FOTOS (compresión) ----------------------- */
  function compress(file) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () {
        var max = 1600, w = img.width, h = img.height;
        if (w > max || h > max) { var s = Math.min(max / w, max / h); w = Math.round(w * s); h = Math.round(h * s); }
        var cv = document.createElement("canvas"); cv.width = w; cv.height = h;
        cv.getContext("2d").drawImage(img, 0, 0, w, h);
        var url = cv.toDataURL("image/jpeg", 0.82);
        resolve({ b64: url.split(",")[1], mime: "image/jpeg", preview: url });
      };
      img.onerror = function () { resolve(null); };
      img.src = URL.createObjectURL(file);
    });
  }

  function initPhotos() {
    var input = $("#f-fotos");
    input.addEventListener("change", function () {
      var files = Array.prototype.slice.call(input.files);
      input.value = "";
      if (!files.length) return;
      var note = $("#fotos-note"); note.textContent = "Procesando " + files.length + " foto(s)…";
      Promise.all(files.map(compress)).then(function (res) {
        res.filter(Boolean).forEach(function (p) { newFiles.push(p); });
        note.textContent = "";
        renderThumbs();
      });
    });
  }

  function renderThumbs() {
    var box = $("#fotos-preview");
    var html = "";
    keepPhotos.forEach(function (url, i) {
      html += '<div class="thumb"><img src="' + url + '" alt="" referrerpolicy="no-referrer"><button type="button" data-keep="' + i + '" aria-label="Quitar">×</button></div>';
    });
    newFiles.forEach(function (p, i) {
      html += '<div class="thumb is-new"><img src="' + p.preview + '" alt=""><button type="button" data-new="' + i + '" aria-label="Quitar">×</button></div>';
    });
    box.innerHTML = html;
    $$("[data-keep]", box).forEach(function (b) {
      b.addEventListener("click", function () { keepPhotos.splice(+b.getAttribute("data-keep"), 1); renderThumbs(); });
    });
    $$("[data-new]", box).forEach(function (b) {
      b.addEventListener("click", function () { newFiles.splice(+b.getAttribute("data-new"), 1); renderThumbs(); });
    });
  }

  /* ----------------------- FORM ----------------------- */
  function readForm() {
    return {
      id: editId || "",
      marca: $("#f-marca").value.trim(),
      modelo: $("#f-modelo").value.trim(),
      version: $("#f-version").value.trim(),
      anio: $("#f-anio").value.trim(),
      km: $("#f-km").value.trim(),
      combustible: $("#f-combustible").value,
      caja: $("#f-caja").value,
      color: $("#f-color").value.trim(),
      precio: $("#f-precio").value.trim(),
      moneda: $("#f-moneda").value,
      financiado: $("#f-financiado").checked,
      cuotas: $("#f-cuotas").value.trim(),
      anticipo: "",
      estado: $("#f-estado").value,
      comentario: $("#f-comentario").value.trim(),
      destacado: $("#f-destacado").checked
    };
  }

  function fillForm(v) {
    $("#f-marca").value = v.marca || "";
    $("#f-modelo").value = v.modelo || "";
    $("#f-version").value = v.version || "";
    $("#f-anio").value = v.anio || "";
    $("#f-km").value = v.km || "";
    $("#f-combustible").value = v.combustible || "";
    $("#f-caja").value = v.caja || "";
    $("#f-color").value = v.color || "";
    $("#f-precio").value = v.precio || "";
    $("#f-moneda").value = (String(v.moneda).toUpperCase() === "USD") ? "USD" : "UYU";
    $("#f-financiado").checked = String(v.financiado).toUpperCase() === "SI";
    $("#f-cuotas").value = v.cuotas || "";
    $("#f-estado").value = String(v.estado || "disponible").toLowerCase();
    $("#f-comentario").value = v.comentario || "";
    $("#f-destacado").checked = String(v.destacado).toUpperCase() === "SI";
  }

  function resetForm() {
    $("#vehiculo-form").reset();
    editId = null; keepPhotos = []; newFiles = [];
    renderThumbs();
    $("#form-title").textContent = "Agregar vehículo";
    $("#submit-btn").textContent = "Publicar vehículo";
    $("#cancel-edit").style.display = "none";
  }

  function initForm() {
    $("#vehiculo-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var v = readForm();
      if (!v.marca || !v.modelo) { toast("Marca y modelo son obligatorios", true); return; }
      var btn = $("#submit-btn"); btn.disabled = true;
      btn.textContent = newFiles.length ? "Subiendo fotos…" : "Guardando…";
      var action = editId ? "update" : "add";
      var payload = { action: action, vehicle: v, newPhotos: newFiles.map(stripPreview) };
      if (editId) payload.keepPhotos = keepPhotos;
      api(payload).then(function () {
        toast(editId ? "Vehículo actualizado ✓" : "Vehículo publicado ✓");
        resetForm();
        return api({ action: "list" });
      }).then(function (d) { if (d) renderList(d.items); window.scrollTo({ top: 0, behavior: "smooth" }); })
        .catch(function (err) { toast(err.message || "Error al guardar", true); })
        .then(function () { btn.disabled = false; btn.textContent = "Publicar vehículo"; });
    });
    $("#cancel-edit").addEventListener("click", function () { resetForm(); window.scrollTo({ top: 0, behavior: "smooth" }); });
  }
  function stripPreview(p) { return { b64: p.b64, mime: p.mime }; }

  /* ----------------------- LISTA DE STOCK ----------------------- */
  var STOCK = [];
  function renderList(items) {
    STOCK = items || [];
    var box = $("#stock-list");
    $("#stock-count").textContent = STOCK.length;
    if (!STOCK.length) { box.innerHTML = '<p class="muted">Todavía no hay vehículos cargados.</p>'; return; }
    box.innerHTML = STOCK.map(function (v) {
      var foto = (v.fotos && v.fotos[0]) || "";
      var thumb = foto ? '<img src="' + foto + '" alt="" loading="lazy" referrerpolicy="no-referrer">' : '<div class="no-photo">sin foto</div>';
      var est = String(v.estado || "disponible").toLowerCase();
      return '' +
        '<div class="stock-item" data-id="' + esc(v.id) + '">' +
          '<div class="stock-thumb">' + thumb + '</div>' +
          '<div class="stock-info">' +
            '<strong>' + esc(v.marca + " " + v.modelo) + '</strong>' +
            '<span class="muted">' + esc([v.version, v.anio].filter(Boolean).join(" · ")) + '</span>' +
            '<span class="est est-' + est + '">' + est + '</span>' +
          '</div>' +
          '<div class="stock-actions">' +
            '<select class="est-sel" data-id="' + esc(v.id) + '">' +
              opt("disponible", est) + opt("reservado", est) + opt("vendido", est) +
            '</select>' +
            '<button class="mini" data-edit="' + esc(v.id) + '">Editar</button>' +
            '<button class="mini danger" data-del="' + esc(v.id) + '">Borrar</button>' +
          '</div>' +
        '</div>';
    }).join("");
    bindList(box);
  }
  function opt(val, sel) { return '<option value="' + val + '"' + (val === sel ? " selected" : "") + '>' + val + '</option>'; }

  function bindList(box) {
    $$(".est-sel", box).forEach(function (s) {
      s.addEventListener("change", function () {
        api({ action: "estado", id: s.getAttribute("data-id"), estado: s.value })
          .then(function () { toast("Estado actualizado ✓"); return api({ action: "list" }); })
          .then(function (d) { renderList(d.items); })
          .catch(function (err) { toast(err.message, true); });
      });
    });
    $$("[data-edit]", box).forEach(function (b) {
      b.addEventListener("click", function () {
        var v = STOCK.filter(function (x) { return String(x.id) === b.getAttribute("data-edit"); })[0];
        if (!v) return;
        editId = String(v.id); keepPhotos = (v.fotos || []).slice(); newFiles = [];
        fillForm(v); renderThumbs();
        $("#form-title").textContent = "Editar " + v.marca + " " + v.modelo;
        $("#submit-btn").textContent = "Guardar cambios";
        $("#cancel-edit").style.display = "inline-flex";
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
    $$("[data-del]", box).forEach(function (b) {
      b.addEventListener("click", function () {
        var id = b.getAttribute("data-del");
        if (!confirm("¿Borrar este vehículo? No se puede deshacer.")) return;
        api({ action: "delete", id: id })
          .then(function () { toast("Vehículo borrado ✓"); return api({ action: "list" }); })
          .then(function (d) { renderList(d.items); })
          .catch(function (err) { toast(err.message, true); });
      });
    });
  }

  /* ----------------------- UI HELPERS ----------------------- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function toast(msg, isErr) {
    var t = $("#toast");
    t.textContent = msg; t.className = "toast show" + (isErr ? " err" : "");
    clearTimeout(t._h); t._h = setTimeout(function () { t.className = "toast"; }, 3200);
  }

  /* ----------------------- BOOT ----------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    if (API_URL.indexOf("PEGA_AQUI") === 0) {
      $("#login").innerHTML = '<div class="login-card"><h1>Falta configurar</h1><p class="muted">Pegá la URL del Apps Script en <b>js/admin.js</b> (variable API_URL) y recargá.</p></div>';
      return;
    }
    initLogin(); initForm(); initPhotos();
  });
})();
