/* =============================================================================
   VEHICULOS.JS — stock dinámico desde Google Sheets (formato gviz)
   Funciones: fetchVehiculos · renderCards · initFiltros · openModal ·
   renderDestacados. Sin dependencias externas.
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.CONFIG || {};
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var escHTML = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  /* Mapa de columnas A→R (por posición en la planilla) */
  var COLS = ["id","marca","modelo","version","anio","km","combustible","caja","color",
              "precio","moneda","financiado","anticipo","cuotas","estado","comentario","fotos","destacado"];

  /* Ícono auto (fallback de foto 404) */
  var CAR_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11"/><path d="M3 11h18v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><circle cx="7.5" cy="14" r="1"/><circle cx="16.5" cy="14" r="1"/></svg>';

  /* Fallback global de imágenes (usado vía onerror inline) */
  window.__imgFallback = function (img) {
    if (img.dataset.failed) return;
    img.dataset.failed = "1";
    var box = document.createElement("div");
    box.className = "img-fallback";
    box.innerHTML = CAR_SVG;
    img.replaceWith(box);
  };

  /* ----------------------- FORMATEO ----------------------- */
  function fmtNum(n) {
    if (n == null || n === "") return "";
    var x = String(n).replace(/[^0-9.]/g, "");
    var int = parseFloat(x);
    if (isNaN(int)) return escHTML(n);
    return Math.round(int).toLocaleString("es-UY");
  }
  function fmtPrice(v) {
    if (!v.precio || isNaN(parseFloat(String(v.precio).replace(/[^0-9.]/g, "")))) {
      return '<span class="consultar">Consultar</span>';
    }
    var cur = (v.moneda || "").toUpperCase();
    var sym = cur === "USD" || cur === "US$" || cur === "U$S" ? "US$" : "$";
    return '<span class="cur">' + sym + '</span>' + fmtNum(v.precio);
  }

  /* ----------------------- FETCH + PARSE GVIZ ----------------------- */
  function endpoint() {
    var id = encodeURIComponent(CFG.SHEET_ID || "");
    var name = encodeURIComponent(CFG.SHEET_NAME || "Stock");
    return "https://docs.google.com/spreadsheets/d/" + id +
           "/gviz/tq?tqx=out:json&sheet=" + name;
  }

  function parseGviz(text) {
    // Google envuelve el JSON: /*O_o*/ google.visualization.Query.setResponse({...});
    var start = text.indexOf("{");
    var end = text.lastIndexOf("}");
    if (start < 0 || end < 0) throw new Error("Respuesta gviz inválida");
    var json = JSON.parse(text.substring(start, end + 1));
    var rows = (json.table && json.table.rows) || [];
    var out = [];
    rows.forEach(function (r) {
      if (!r || !r.c) return;
      var obj = {};
      COLS.forEach(function (key, i) {
        var cell = r.c[i];
        if (!cell || cell.v == null) { obj[key] = ""; return; }
        // id: preferir valor formateado para conservar ceros (001)
        obj[key] = (key === "id" && cell.f != null) ? cell.f : cell.v;
      });
      // saltar fila de cabecera si se coló como dato
      var idl = String(obj.id).toLowerCase().trim();
      if (idl === "id" || idl === "") {
        // permitir filas sin id sólo si tienen marca/modelo reales
        if (String(obj.marca).toLowerCase() === "marca" || (!obj.marca && !obj.modelo)) return;
      }
      // normalizar
      obj.estado = String(obj.estado || "disponible").toLowerCase().trim();
      if (["disponible","reservado","vendido"].indexOf(obj.estado) < 0) obj.estado = "disponible";
      obj.destacado = String(obj.destacado || "").toUpperCase().trim() === "SI";
      obj.financiado = String(obj.financiado || "").toUpperCase().trim() === "SI";
      obj.fotos = String(obj.fotos || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
      out.push(obj);
    });
    return out;
  }

  function fetchVehiculos() {
    return new Promise(function (resolve, reject) {
      if (!CFG.SHEET_ID || CFG.SHEET_ID === "TU_SHEET_ID_AQUI") {
        var err = new Error("SHEET_ID sin configurar");
        err.code = "NO_CONFIG";
        return reject(err);
      }
      fetch(endpoint())
        .then(function (res) { if (!res.ok) throw new Error("HTTP " + res.status); return res.text(); })
        .then(function (text) { resolve(parseGviz(text)); })
        .catch(function (e) { reject(e); });
    });
  }

  /* ----------------------- CARD HTML ----------------------- */
  function specsRow(v) {
    var items = [];
    if (v.anio) items.push(spec(iconCal(), v.anio));
    if (v.km !== "" && v.km != null) items.push(spec(iconGauge(), fmtNum(v.km) + " km"));
    if (v.combustible) items.push(spec(iconFuel(), escHTML(v.combustible)));
    return items.join("");
  }
  function spec(ic, txt) { return '<span class="v-spec">' + ic + escHTML(txt) + '</span>'; }

  function cardHTML(v) {
    var foto = v.fotos[0] || "";
    var media = foto
      ? '<img src="' + escHTML(foto) + '" alt="' + escHTML(v.marca + " " + v.modelo) + '" loading="lazy" decoding="async" onerror="__imgFallback(this)">'
      : '<div class="img-fallback">' + CAR_SVG + '</div>';
    var badge = "";
    if (v.estado === "vendido") badge = '<span class="badge-estado vendido">Vendido</span>';
    else if (v.estado === "reservado") badge = '<span class="badge-estado reservado">Reservado</span>';

    return '' +
      '<article class="v-card' + (v.estado === "vendido" ? " is-vendido" : "") + '">' +
        '<div class="v-card-media">' +
          '<div class="v-card-badges">' + badge + '</div>' + media +
        '</div>' +
        '<div class="v-card-body">' +
          '<h3 class="v-card-title">' + escHTML(v.marca + " " + v.modelo) +
            (v.version ? '<span class="ver">' + escHTML(v.version) + '</span>' : '') +
          '</h3>' +
          '<div class="v-specs">' + specsRow(v) + '</div>' +
          '<div class="v-card-foot">' +
            '<button class="btn-ver" type="button">Ver vehículo</button>' +
            '<a class="btn-wa-circle" data-wacar target="_blank" rel="noopener" aria-label="Consultar por WhatsApp">' + iconWA() + '</a>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  /* ----------------------- RENDER CARDS ----------------------- */
  function renderCards(list, container) {
    container = container || $("#vehiculos-grid");
    if (!container) return;
    if (!list.length) {
      container.innerHTML = '<p class="empty-msg">No hay vehículos que coincidan con tu búsqueda. Probá quitar algún filtro.</p>';
      return;
    }
    container.innerHTML = list.map(cardHTML).join("");
    // revelar progresivamente
    $$(".v-card", container).forEach(function (card, i) {
      card.classList.add("reveal");
      if (i < 6) card.classList.add("d" + ((i % 4) + 1));
      setTimeout(function () { card.classList.add("is-visible"); }, 40 * Math.min(i, 10));
      bindCard(card, list[i]);
    });
  }
  function bindCard(card, v) {
    card.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("[data-wacar]")) return;
      openModal(v);
    });
    var verBtn = card.querySelector(".btn-ver");
    if (verBtn) verBtn.setAttribute("aria-label", "Ver " + v.marca + " " + v.modelo);
    var wa = card.querySelector("[data-wacar]");
    if (wa && window.waLink) wa.href = window.waLink("Hola! Me interesa el " + [v.marca, v.modelo, v.version, v.anio].filter(Boolean).join(" ") + " que vi en la web. ¿Está disponible?");
  }

  /* ----------------------- DESTACADOS ----------------------- */
  function renderDestacados(list, container) {
    container = container || $("#destacados-grid");
    if (!container) return;
    var dest = list.filter(function (v) { return v.destacado && v.estado !== "vendido"; }).slice(0, 6);
    if (!dest.length) dest = list.filter(function (v) { return v.estado !== "vendido"; }).slice(0, 6);
    renderCards(dest, container);
  }

  /* ----------------------- SKELETON ----------------------- */
  function skeletonCard() {
    return '<article class="v-card skeleton">' +
      '<div class="sk sk-media"></div>' +
      '<div class="v-card-body">' +
        '<div class="sk sk-line w-70"></div>' +
        '<div class="sk sk-line w-40"></div>' +
        '<div class="sk-row"><span class="sk sk-chip"></span><span class="sk sk-chip"></span></div>' +
        '<div class="sk sk-price"></div>' +
      '</div></article>';
  }
  function renderSkeleton(container, n) {
    if (!container) return;
    var html = ""; for (var i = 0; i < (n || 6); i++) html += skeletonCard();
    container.innerHTML = html;
  }

  /* ----------------------- ERROR ----------------------- */
  function renderError(container, opts) {
    if (!container) return;
    opts = opts || {};
    var msg = opts.message || "No se pudo cargar el stock. Contactanos por WhatsApp.";
    var extra = opts.config
      ? '<p style="margin-top:.5rem;font-size:.88rem;color:var(--mute)">⚙️ Falta configurar la planilla: editá <b>js/config.js</b> y pegá tu <b>SHEET_ID</b> (ver README).</p>'
      : '';
    container.innerHTML =
      '<div class="error-msg">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>' +
        '<h3>Ups, algo falló</h3><p>' + escHTML(msg) + '</p>' + extra +
        '<a class="btn btn-wa" data-wa style="margin-top:1.4rem" target="_blank" rel="noopener">' + iconWA() + ' Escribinos por WhatsApp</a>' +
      '</div>';
    var wa = $("[data-wa]", container);
    if (wa && window.waLink) wa.href = window.waLink(CFG.WHATSAPP_MSG_GENERAL);
  }

  /* ----------------------- FILTROS ----------------------- */
  function initFiltros(list) {
    ALL = list;
    var form = $("#filtros");
    var grid = $("#vehiculos-grid");
    var countEl = $("#results-count");
    if (!form || !grid) { renderCards(list, grid); return; }

    var marcaSel = $("#f-marca", form);
    var anioInput = $("#f-anio", form);
    var anioVal = $("#f-anio-val", form);
    var precioInput = $("#f-precio", form);
    var precioVal = $("#f-precio-val", form);
    var combWrap = $("#f-combustible", form);
    var resetBtn = $("#f-reset", form);

    // poblar marcas
    var marcas = unique(list.map(function (v) { return v.marca; })).filter(Boolean).sort();
    marcaSel.innerHTML = '<option value="">Todas las marcas</option>' +
      marcas.map(function (m) { return '<option value="' + escHTML(m) + '">' + escHTML(m) + '</option>'; }).join("");

    // rango años
    var anios = list.map(function (v) { return parseInt(v.anio, 10); }).filter(function (n) { return !isNaN(n); });
    var minA = anios.length ? Math.min.apply(null, anios) : 2000;
    var maxA = anios.length ? Math.max.apply(null, anios) : new Date().getFullYear();
    anioInput.min = minA; anioInput.max = maxA; anioInput.value = minA; anioInput.step = 1;

    // rango precio (en USD aprox; usamos el valor numérico crudo)
    var precios = list.map(function (v) { return parseFloat(String(v.precio).replace(/[^0-9.]/g, "")); }).filter(function (n) { return !isNaN(n); });
    var maxP = precios.length ? Math.max.apply(null, precios) : 100000;
    maxP = Math.ceil(maxP / 1000) * 1000;
    precioInput.min = 0; precioInput.max = maxP; precioInput.value = maxP; precioInput.step = 1000;

    // combustibles
    var combs = unique(list.map(function (v) { return v.combustible; })).filter(Boolean).sort();
    combWrap.innerHTML = combs.map(function (c) {
      return '<label class="check"><input type="checkbox" value="' + escHTML(c) + '"><span class="box"></span>' + escHTML(c) + '</label>';
    }).join("") || '<p style="color:var(--mute);font-size:.9rem">—</p>';

    function syncLabels() {
      if (anioVal) anioVal.textContent = "desde " + anioInput.value;
      if (precioVal) precioVal.textContent = "hasta US$ " + parseInt(precioInput.value, 10).toLocaleString("es-UY");
    }
    syncLabels();

    function apply() {
      var marca = marcaSel.value;
      var minYear = parseInt(anioInput.value, 10);
      var maxPrice = parseFloat(precioInput.value);
      var checkedCombs = $$("input:checked", combWrap).map(function (i) { return i.value; });

      var filtered = list.filter(function (v) {
        if (marca && v.marca !== marca) return false;
        var a = parseInt(v.anio, 10);
        if (!isNaN(a) && a < minYear) return false;
        var p = parseFloat(String(v.precio).replace(/[^0-9.]/g, ""));
        if (!isNaN(p) && p > maxPrice) return false;   // sin precio = siempre pasa
        if (checkedCombs.length && checkedCombs.indexOf(v.combustible) < 0) return false;
        return true;
      });
      renderCards(filtered, grid);
      if (countEl) countEl.innerHTML = "<b>" + filtered.length + "</b> de " + list.length + " vehículos";
      syncLabels();
    }

    marcaSel.addEventListener("change", apply);
    anioInput.addEventListener("input", apply);
    precioInput.addEventListener("input", apply);
    combWrap.addEventListener("change", apply);
    if (resetBtn) resetBtn.addEventListener("click", function () {
      marcaSel.value = ""; anioInput.value = minA; precioInput.value = maxP;
      $$("input:checked", combWrap).forEach(function (i) { i.checked = false; });
      apply();
    });

    apply();
  }

  /* ----------------------- MODAL ----------------------- */
  var modalEl = null, gallery = { slides: [], i: 0 }, ALL = [];

  function ensureModal() {
    if (modalEl) return modalEl;
    modalEl = document.createElement("div");
    modalEl.className = "modal";
    modalEl.setAttribute("role", "dialog");
    modalEl.setAttribute("aria-modal", "true");
    modalEl.innerHTML =
      '<div class="modal-overlay" data-close></div>' +
      '<div class="modal-dialog">' +
        '<button class="modal-close" data-close aria-label="Cerrar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg></button>' +
        '<div class="modal-bar"><button class="modal-back" data-close type="button">' + iconBack() + ' Volver al catálogo</button></div>' +
        '<div class="modal-top">' +
          '<div class="gallery" id="modal-gallery"></div>' +
          '<div class="modal-info" id="modal-info"></div>' +
        '</div>' +
        '<div class="modal-related" id="modal-related"></div>' +
      '</div>';
    document.body.appendChild(modalEl);

    modalEl.addEventListener("click", function (e) {
      if (e.target.closest("[data-close]")) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (!modalEl.classList.contains("is-open")) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") galleryGo(gallery.i + 1);
      if (e.key === "ArrowLeft") galleryGo(gallery.i - 1);
    });
    return modalEl;
  }

  function buildGallery(v) {
    var g = $("#modal-gallery", modalEl);
    gallery.slides = v.fotos.length ? v.fotos : [];
    gallery.i = 0;
    var alt = escHTML(v.marca + " " + v.modelo);
    if (!gallery.slides.length) {
      g.innerHTML = '<div class="gallery-main"><div class="img-fallback">' + CAR_SVG + '</div></div>';
      return;
    }
    var thumbs = gallery.slides.length > 1 ? gallery.slides.map(function (src, k) {
      return '<button class="gallery-thumb' + (k === 0 ? " is-active" : "") + '" data-go="' + k + '" aria-label="Foto ' + (k + 1) + '"><img src="' + escHTML(src) + '" alt="" loading="lazy" onerror="__imgFallback(this)"></button>';
    }).join("") : "";
    var nav = gallery.slides.length > 1
      ? '<button class="gallery-nav prev" data-nav="-1" type="button" aria-label="Foto anterior"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 18l-6-6 6-6"/></svg></button>' +
        '<button class="gallery-nav next" data-nav="1" type="button" aria-label="Foto siguiente"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 18l6-6-6-6"/></svg></button>'
      : "";
    g.innerHTML =
      '<div class="gallery-main">' +
        '<div class="gallery-counter"><span id="g-cur">1</span>/' + gallery.slides.length + '</div>' +
        '<img id="gallery-img" src="' + escHTML(gallery.slides[0]) + '" alt="' + alt + '" onerror="__imgFallback(this)">' +
        nav +
      '</div>' +
      (thumbs ? '<div class="gallery-thumbs">' + thumbs + '</div>' : "");
    $$("[data-go]", g).forEach(function (d) {
      d.addEventListener("click", function () { galleryGo(parseInt(d.getAttribute("data-go"), 10)); });
    });
    $$("[data-nav]", g).forEach(function (b) {
      b.addEventListener("click", function () { galleryGo(gallery.i + parseInt(b.getAttribute("data-nav"), 10)); });
    });
  }
  function galleryGo(n) {
    if (!gallery.slides.length) return;
    gallery.i = (n + gallery.slides.length) % gallery.slides.length;
    var img = $("#gallery-img", modalEl);
    if (img && !img.dataset.failed) img.src = gallery.slides[gallery.i];
    var thumbs = $$(".gallery-thumb", modalEl);
    thumbs.forEach(function (t, k) { t.classList.toggle("is-active", k === gallery.i); });
    var cur = $("#g-cur", modalEl); if (cur) cur.textContent = gallery.i + 1;
    if (thumbs[gallery.i] && thumbs[gallery.i].scrollIntoView) thumbs[gallery.i].scrollIntoView({ inline: "center", block: "nearest" });
  }

  function modalSpec(dt, dd) { return dd ? '<div class="modal-spec"><dt>' + dt + '</dt><dd>' + escHTML(dd) + '</dd></div>' : ""; }

  function specItem(label, value, ic) {
    if (!value && value !== 0) return "";
    return '<div class="spec-item"><span class="ic">' + ic + '</span><span><span class="k">' + label + '</span><span class="val">' + escHTML(value) + '</span></span></div>';
  }

  function buildInfo(v) {
    var info = $("#modal-info", modalEl);

    // separar la descripción: líneas con viñeta "-" => Características; el resto => Descripción
    var feats = [], desc = [];
    String(v.comentario || "").split("\n").forEach(function (ln) {
      var t = ln.trim();
      if (/^[-•·*]\s*/.test(t)) feats.push(t.replace(/^[-•·*]\s*/, "").trim());
      else desc.push(t);
    });
    var descText = desc.join("\n").replace(/\n{3,}/g, "\n\n").trim();

    var specs =
      specItem("Año", v.anio, iconCal()) +
      specItem("Kilómetros", (v.km !== "" && v.km != null ? fmtNum(v.km) + " km" : ""), iconGauge()) +
      specItem("Combustible", v.combustible, iconFuel()) +
      specItem("Transmisión", v.caja, iconGear()) +
      specItem("Color", v.color, iconColor());

    var finBanner = v.financiado
      ? '<div class="modal-fin">' + iconCard() + ' Hasta ' + escHTML(v.cuotas || "60") + ' cuotas</div>' : "";
    var hasPrice = v.precio !== "" && v.precio != null && !isNaN(parseFloat(String(v.precio).replace(/[^0-9.]/g, "")));
    var waMsg = "Hola! Me interesa el " + [v.marca, v.modelo, v.version, v.anio].filter(Boolean).join(" ") + " que vi en la web. ¿Está disponible?";

    info.innerHTML =
      '<h2 class="modal-title">' + escHTML(v.marca + " " + v.modelo) +
        (v.version ? '<span class="ver">' + escHTML(v.version) + '</span>' : '') + '</h2>' +
      finBanner +
      (hasPrice ? '<div class="modal-price">' + fmtPrice(v) + '</div>' : '') +
      '<div class="specs-grid">' + specs + '</div>' +
      (descText ? '<div class="modal-section"><h3>Descripción</h3><p class="modal-desc">' + escHTML(descText) + '</p></div>' : '') +
      (feats.length ? '<div class="modal-section"><h3>Características</h3><div class="feat-list">' +
        feats.slice(0, 14).map(function (f) { return '<span class="feat">' + iconCheck() + escHTML(f) + '</span>'; }).join("") + '</div></div>' : '') +
      '<a class="btn btn-wa btn-block btn-lg modal-wa-btn" id="modal-wa" target="_blank" rel="noopener">' + iconWA() + ' Consultar por WhatsApp</a>';

    var wa = $("#modal-wa", info);
    if (wa && window.waLink) wa.href = window.waLink(waMsg);
  }

  function buildRelated(v) {
    var box = $("#modal-related", modalEl);
    if (!box) return;
    if (!ALL.length || ALL.length < 2) { box.innerHTML = ""; return; }
    var idx = ALL.indexOf(v), pick = [], seen = {};
    if (idx < 0) idx = 0;
    for (var k = 1; k <= ALL.length && pick.length < 6; k++) {
      var c = ALL[(idx + k) % ALL.length];
      if (c === v || seen[c.id]) continue;
      seen[c.id] = 1; pick.push(c);
    }
    if (!pick.length) { box.innerHTML = ""; return; }
    box.innerHTML =
      '<div class="related-head"><h3>También te puede interesar</h3><a class="related-all" href="vehiculos.html">Ver todos →</a></div>' +
      '<div class="v-grid">' + pick.map(cardHTML).join("") + '</div>';
    $$(".v-card", box).forEach(function (card, i) { bindCard(card, pick[i]); });
  }

  function openModal(v) {
    ensureModal();
    buildGallery(v);
    buildInfo(v);
    buildRelated(v);
    $(".modal-dialog", modalEl).scrollTop = 0;
    modalEl.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    if (!modalEl) return;
    modalEl.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  /* ----------------------- HELPERS ----------------------- */
  function unique(arr) { var seen = {}; return arr.filter(function (x) { if (seen[x]) return false; seen[x] = 1; return true; }); }
  function iconWA() { return '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.516 5.26l-.999 3.648 3.972-1.607z"/></svg>'; }
  function iconCal() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>'; }
  function iconGauge() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 14l4-4M3.5 18a9 9 0 1 1 17 0"/><circle cx="12" cy="14" r="1.2"/></svg>'; }
  function iconFuel() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 20V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v15M3 20h12M14 9h2.5a1.5 1.5 0 0 1 1.5 1.5V17a2 2 0 0 0 2 2 2 2 0 0 0 2-2v-7l-3-3"/></svg>'; }
  function iconGear() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3v18M6 8h6a3 3 0 0 1 3 3v0M18 3v18M12 3v18"/></svg>'; }
  function iconColor() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3s6 5.7 6 10a6 6 0 0 1-12 0c0-4.3 6-10 6-10z"/></svg>'; }
  function iconCard() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20M6 15h4"/></svg>'; }
  function iconCheck() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6 9 17l-5-5"/></svg>'; }
  function iconBack() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>'; }

  /* exponer (por si se quieren usar desde consola/otras páginas) */
  window.Vehiculos = {
    fetch: fetchVehiculos, renderCards: renderCards, initFiltros: initFiltros,
    openModal: openModal, renderDestacados: renderDestacados
  };

  /* ----------------------- AUTO-INIT POR PÁGINA ----------------------- */
  function showDemoBanner() {
    if ($("#demo-banner")) return;
    var b = document.createElement("div");
    b.id = "demo-banner";
    b.style.cssText = "position:fixed;left:50%;bottom:1rem;transform:translateX(-50%);z-index:280;max-width:92vw;background:rgba(20,20,23,.96);border:1px solid var(--line);color:var(--cream);padding:.7rem 1.1rem;border-radius:12px;font-size:.85rem;backdrop-filter:blur(10px);box-shadow:0 12px 30px -14px rgba(0,0,0,.7);display:flex;gap:.6rem;align-items:center";
    b.innerHTML = '<span style="color:var(--red-2)">●</span> Mostrando <b>autos de ejemplo</b>. Conectá tu planilla en <b>js/config.js</b> para tu stock real. <button style="margin-left:.4rem;color:var(--mute);font-size:1.1rem;line-height:1" aria-label="Cerrar">×</button>';
    b.querySelector("button").addEventListener("click", function () { b.remove(); });
    document.body.appendChild(b);
  }

  function boot() {
    var catalog = $("#vehiculos-grid");
    var destacados = $("#destacados-grid");
    if (!catalog && !destacados) return;

    function renderAll(list) {
      ALL = list;
      if (destacados) renderDestacados(list, destacados);
      if (catalog) {
        if ($("#filtros")) initFiltros(list);
        else renderCards(list, catalog);
        var rc = $("#results-count"); if (rc && !$("#filtros")) rc.innerHTML = "<b>" + list.length + "</b> vehículos";
      }
    }

    if (catalog) renderSkeleton(catalog, 9);
    if (destacados) renderSkeleton(destacados, 6);

    fetchVehiculos().then(function (list) {
      renderAll(list);
    }).catch(function (e) {
      console.warn("[fetchVehiculos]", e);
      // Fallback: si hay datos de ejemplo (stock-demo.js) los mostramos.
      if (Array.isArray(window.STOCK_DEMO) && window.STOCK_DEMO.length) {
        showDemoBanner();
        renderAll(window.STOCK_DEMO);
        return;
      }
      var isConfig = e && e.code === "NO_CONFIG";
      var optsCat = { config: isConfig, message: isConfig ? "El sitio todavía no está conectado a la planilla de stock." : "No se pudo cargar el stock. Contactanos por WhatsApp." };
      if (catalog) renderError(catalog, optsCat);
      if (destacados) renderError(destacados, optsCat);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
