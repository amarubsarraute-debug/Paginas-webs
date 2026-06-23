/* ============================================================
   Luana Escudero - inyección de la sección de reseñas.
   Reemplaza la 2da sección de antes/después (#resultados, oculta
   por CSS) por un muro editorial de reseñas reales de Google.
   Robusto frente a los re-render de React (MutationObserver).
   ============================================================ */
(function () {
  "use strict";

  var STARS = "★★★★★"; // ★★★★★

  // Reseña destacada (más larga, en serif)
  var FEATURED = {
    name: "Verónica González Vallespir",
    text: "Excelente profesional, súper amable y detallista. Trabaja con productos de gran calidad y te asesora en la rutina de cuidado. En solo dos sesiones noté un gran cambio en mi piel."
  };

  // Muro de reseñas (9 snippets = 3x3 exacto, sin huecos)
  var REVIEWS = [
    { name: "Martina Lauz", text: "Desde el primer momento me hizo sentir cómoda y supo identificar lo que mi piel necesitaba. Me explicó cada producto y su proceso. La recomiendo al 100%." },
    { name: "Romina Techera", text: "La mejor en lo que hace. Me dejó la piel maravillosa y el lugar es súper cálido y prolijo. Ya me agendé para la próxima." },
    { name: "Silvia Mercado", text: "Muy buen trabajo en rostro y cuello. El cambio fue notorio, atenuando manchas e imperfecciones. Me siento más segura y confiada." },
    { name: "Paula Cuadrado", text: "Hermoso lugar, el trato es increíble y los tratamientos, 10 puntos. Recomiendo 100%." },
    { name: "Laura Freire", text: "Estoy haciendo tratamiento de manchas. Me explica todo lo que hace y los productos que usa, y eso genera confianza." },
    { name: "Teresita Pereyra", text: "Trabaja con profesionalidad, detallando cada paso. Quedé muy satisfecha y voy a seguir tratándome con ella." },
    { name: "Olga Sosa", text: "Muy profesional y dedicada con sus clientas. Desde que comencé noté mucho avance en mi tratamiento facial." },
    { name: "Sandra Guglielmetti", text: "Me sentí muy cómoda y el tratamiento indicado ya está dando resultados. Una profesional recomendable." },
    { name: "Florencia De León", text: "Súper amorosa y profesional. Me atiendo con ella hace casi un año y la recomiendo muchísimo." }
  ];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function metaHTML(name) {
    return (
      '<div class="lr-meta">' +
        '<span class="lr-name">' + esc(name) + "</span>" +
      "</div>"
    );
  }

  function build() {
    var sec = document.createElement("section");
    sec.id = "resenas-luana";

    var wall = REVIEWS.map(function (r) {
      return (
        '<div class="lr-review">' +
          '<div class="lr-stars-row">' + STARS + "</div>" +
          "<p>" + esc(r.text) + "</p>" +
          metaHTML(r.name) +
        "</div>"
      );
    }).join("");

    sec.innerHTML =
      '<div class="lr-wrap">' +
        '<div class="lr-head">' +
          '<span class="lr-rating"><span class="lr-stars">' + STARS + "</span> " +
            "<strong>5,0</strong> en reseñas de Google</span>" +
          "<h2>Lo que dicen quienes ya <em>confían su piel</em> a Luana</h2>" +
          "<p>Opiniones reales de pacientes del consultorio en Maldonado.</p>" +
        "</div>" +
        '<div class="lr-featured">' +
          "<blockquote>“" + esc(FEATURED.text) + "”</blockquote>" +
          metaHTML(FEATURED.name) +
        "</div>" +
        '<div class="lr-wall">' + wall + "</div>" +
        '<div class="lr-foot">' +
          '<a href="#contacto">Agendá tu valoración</a>' +
        "</div>" +
      "</div>";

    return sec;
  }

  var io = null;
  function observeReveal(sec) {
    if (!("IntersectionObserver" in window)) {
      // sin soporte: mostrar todo
      sec.querySelectorAll(".lr-review, .lr-featured").forEach(function (el) {
        el.classList.add("is-in");
      });
      return;
    }
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

    sec.querySelectorAll(".lr-review, .lr-featured").forEach(function (el) {
      io.observe(el);
    });
  }

  function inject() {
    if (document.getElementById("resenas-luana")) return;
    var anchor = document.getElementById("resultados");
    if (!anchor || !anchor.parentNode) return;
    var sec = build();
    anchor.parentNode.insertBefore(sec, anchor);
    observeReveal(sec);
  }

  // El link "Resultados" del menú apuntaba a la sección oculta:
  // lo redirigimos a la nueva sección de reseñas.
  function fixNav() {
    var links = document.querySelectorAll('a[href="#resultados"]');
    for (var i = 0; i < links.length; i++) {
      links[i].setAttribute("href", "#resenas-luana");
      if (links[i].textContent.trim() === "Resultados") {
        links[i].textContent = "Reseñas";
      }
    }
  }

  var ADDR = "Ave del Paraíso, entre Camaleón y Sagitario. Maldonado, Uruguay.";
  var MAP_Q = encodeURIComponent("Ave del Paraiso entre Camaleon y Sagitario, Maldonado, Uruguay");

  // Actualiza el texto de UBICACIÓN del contacto con la dirección real.
  function updateUbicacion() {
    var c = document.getElementById("contacto");
    if (!c) return;
    var nodes = c.querySelectorAll("p, span, div, address");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.children.length !== 0) continue;
      var t = el.textContent.trim();
      if (/Punta del Este\s*\/\s*Maldonado/i.test(t) && t !== ADDR) {
        el.textContent = ADDR;
      }
    }
  }

  // Inyecta un mini-mapa de Google al final de la sección de contacto.
  function injectMap() {
    if (document.getElementById("lr-mapa")) return;
    var c = document.getElementById("contacto");
    if (!c) return;
    var wrap = c.querySelector(".max-w-7xl") || c.firstElementChild || c;
    var box = document.createElement("div");
    box.id = "lr-mapa";
    box.innerHTML =
      '<span class="lr-mapa-label">Dónde estamos</span>' +
      '<p class="lr-mapa-addr">' + esc(ADDR) + "</p>" +
      '<div class="lr-mapa-frame">' +
        '<iframe title="Ubicación del consultorio de Luana Escudero" loading="lazy" ' +
        'referrerpolicy="no-referrer-when-downgrade" ' +
        'src="https://maps.google.com/maps?q=' + MAP_Q + '&z=16&output=embed"></iframe>' +
      "</div>" +
      '<a class="lr-mapa-link" href="https://www.google.com/maps/search/?api=1&query=' + MAP_Q + '" ' +
      'target="_blank" rel="noopener">Abrir en Google Maps</a>';
    wrap.appendChild(box);
  }

  // Oculta la sección "Rutinas pensadas para tu piel" (no tiene id propio).
  function hideRutinas() {
    var secs = document.querySelectorAll("section");
    for (var i = 0; i < secs.length; i++) {
      var h = secs[i].querySelector("h2, h3");
      if (h && /Rutinas pensadas para tu piel/i.test(h.textContent)) {
        secs[i].style.display = "none";
      }
    }
  }

  function start() {
    inject();
    fixNav();
    hideRutinas();
    updateUbicacion();
    injectMap();
    // React puede re-renderizar y quitar el nodo: lo re-inyectamos.
    var mo = new MutationObserver(function () {
      if (!document.getElementById("resenas-luana")) inject();
      fixNav();
      hideRutinas();
      updateUbicacion();
      injectMap();
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  // Esperamos a que React monte las secciones.
  function waitForAnchor(tries) {
    if (document.getElementById("resultados")) { start(); return; }
    if (tries <= 0) return;
    setTimeout(function () { waitForAnchor(tries - 1); }, 120);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { waitForAnchor(50); });
  } else {
    waitForAnchor(50);
  }
})();
