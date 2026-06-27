/* =============================================================================
   MAIN.JS — interacciones globales (nav, cursor, reveals, parallax, carrusel,
   contadores, WhatsApp). Patrón IIFE, sin dependencias externas.
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.CONFIG || {};
  var reduced   = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }

  /* Link de WhatsApp reutilizable */
  window.waLink = function (msg) {
    var num = (CFG.WHATSAPP || "").replace(/[^0-9]/g, "");
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(msg || CFG.WHATSAPP_MSG_GENERAL || "Hola");
  };

  /* -------------------------------------------------------------------------
     NAV — solidifica al hacer scroll + menú móvil
     ------------------------------------------------------------------------- */
  function initNav() {
    var nav = $(".nav");
    if (!nav) return;
    var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 30); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var toggle = $(".nav-toggle", nav);
    if (toggle) {
      toggle.addEventListener("click", function () { nav.classList.toggle("is-open"); });
      $$(".nav-links a", nav).forEach(function (a) {
        a.addEventListener("click", function () { nav.classList.remove("is-open"); });
      });
    }
  }

  /* -------------------------------------------------------------------------
     WHATSAPP — botón flotante + cualquier [data-wa]
     ------------------------------------------------------------------------- */
  function initWhatsApp() {
    var floatBtn = $(".wa-float");
    if (floatBtn) {
      floatBtn.href = window.waLink(CFG.WHATSAPP_MSG_GENERAL);
      floatBtn.setAttribute("target", "_blank");
      floatBtn.setAttribute("rel", "noopener");
    }
    $$("[data-wa]").forEach(function (el) {
      el.href = window.waLink(el.getAttribute("data-wa") || CFG.WHATSAPP_MSG_GENERAL);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }

  /* -------------------------------------------------------------------------
     LOGO — usa img/logo.png si existe; si no, queda el texto "FEDE DESAL"
     ------------------------------------------------------------------------- */
  function initLogo() {
    var logos = $$(".logo");
    if (!logos.length) return;
    var test = new Image();
    test.onload = function () {
      logos.forEach(function (el) {
        el.innerHTML = '<img src="img/logo.png" alt="Automotora Fede Desal" style="height:44px;width:auto;display:block">';
      });
    };
    test.src = "img/logo.png?v=20260602";
  }

  /* -------------------------------------------------------------------------
     REVEAL on scroll (IntersectionObserver + red de seguridad 6s)
     ------------------------------------------------------------------------- */
  function initReveals() {
    var els = $$(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -4% 0px" });
    els.forEach(function (el) { io.observe(el); });

    /* Safety: a los 6s revelar lo que siga oculto y esté en viewport */
    setTimeout(function () {
      $$(".reveal:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight + 200) el.classList.add("is-visible");
      });
    }, 6000);
  }

  /* -------------------------------------------------------------------------
     PARALLAX hero (solo desktop; gate por reduced-motion)
     ------------------------------------------------------------------------- */
  function initParallax() {
    if (reduced || !fineHover) return;
    var layers = $$("[data-parallax]");
    if (!layers.length) return;
    var ticking = false;
    function update() {
      var sy = window.scrollY;
      layers.forEach(function (el) {
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.15;
        el.style.transform = "translate3d(0," + (sy * speed) + "px,0)";
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }

  /* -------------------------------------------------------------------------
     CONTADORES (count-up) — elementos [data-count-to]
     ------------------------------------------------------------------------- */
  function initCounters() {
    var nums = $$("[data-count-to]");
    if (!nums.length) return;
    var animate = function (el) {
      var target = parseFloat(el.getAttribute("data-count-to"));
      var dec = (el.getAttribute("data-count-to").split(".")[1] || "").length;
      var dur = 1400, start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = (target * eased).toFixed(dec).replace(".", ",");
        el.textContent = val;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) { nums.forEach(animate); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.4 });
    nums.forEach(function (el) { io.observe(el); });
  }

  /* -------------------------------------------------------------------------
     CARRUSEL genérico [data-carousel] (testimonios index + otros)
     ------------------------------------------------------------------------- */
  function initCarousels() {
    $$("[data-carousel]").forEach(function (root) {
      var track = $(".testi-track", root);
      var slides = $$(".testi-card", root);
      var dotsWrap = $(".testi-controls", root);
      if (!track || slides.length < 2) return;
      var i = 0, timer;
      var dots = slides.map(function (_, idx) {
        var d = document.createElement("button");
        d.className = "testi-dot" + (idx === 0 ? " is-active" : "");
        d.setAttribute("aria-label", "Testimonio " + (idx + 1));
        d.addEventListener("click", function () { go(idx); rearm(); });
        if (dotsWrap) dotsWrap.appendChild(d);
        return d;
      });
      function go(n) {
        i = (n + slides.length) % slides.length;
        track.style.transform = "translateX(" + (-100 * i) + "%)";
        dots.forEach(function (d, k) { d.classList.toggle("is-active", k === i); });
      }
      function rearm() { if (timer) clearInterval(timer); if (!reduced) timer = setInterval(function () { go(i + 1); }, 6000); }
      rearm();
      root.addEventListener("mouseenter", function () { if (timer) clearInterval(timer); });
      root.addEventListener("mouseleave", rearm);
    });
  }

  /* -------------------------------------------------------------------------
     FILTROS móvil: mostrar/ocultar panel
     ------------------------------------------------------------------------- */
  function initFiltrosToggle() {
    var btn = $(".filtros-toggle");
    var wrap = $(".filtros-wrap");
    if (!btn || !wrap) return;
    btn.addEventListener("click", function () { wrap.classList.toggle("is-open"); });
  }

  /* -------------------------------------------------------------------------
     Smooth scroll con offset de nav para anclas internas
     ------------------------------------------------------------------------- */
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: top, behavior: reduced ? "auto" : "smooth" });
    });
  }

  /* -------------------------------------------------------------------------
     HERO SCROLL-SCRUB — el video avanza cuadro a cuadro con el scroll.
     Sección alta + sticky pin: el progreso de scroll mapea a video.currentTime.
     Requiere un MP4 all-intra (-g 1) para buscar sin saltos.
     Fallback: móvil / reduced-motion → loop suave (o póster), sin scrub.
     ------------------------------------------------------------------------- */
  function initHeroScrub() {
    var hero  = $(".hero");
    var video = $(".hero-video");
    if (!hero || !video) return;

    /* ¿Estamos en un contexto "móvil"? (coincide con el breakpoint del CSS).
       Robusto: puntero grueso, capacidad táctil, o viewport angosto. Se evalúa
       en vivo para que ande también en el modo responsive del navegador. */
    function isMobile() {
      return matchMedia("(hover: none), (pointer: coarse)").matches
          || (navigator.maxTouchPoints || 0) > 0
          || window.innerWidth < 900;
    }

    var mode = "", duration = 0, raf = 0, targetT = 0, metaBound = false;

    function tryPlay() { var p = video.play(); if (p && p.catch) p.catch(function () {}); }

    function compute() {
      if (mode !== "scrub" || !duration) return;
      var range = hero.offsetHeight - window.innerHeight;
      var progress = range > 0 ? (-hero.getBoundingClientRect().top) / range : 0;
      progress = Math.max(0, Math.min(1, progress));
      targetT = progress * (duration - 0.05);
      if (!raf) raf = requestAnimationFrame(seek);
    }
    function seek() {
      raf = 0;
      try {
        if (typeof video.fastSeek === "function") video.fastSeek(targetT);
        else video.currentTime = targetT;
      } catch (e) {}
    }

    function setMode(next) {
      if (next === mode) { if (next === "loop" && video.paused) tryPlay(); return; }
      mode = next;
      if (mode === "loop") {
        /* Móvil: autoplay en loop inline (el scrub no es fiable en celulares) */
        video.muted = true; video.setAttribute("muted", "");
        video.loop = true;  video.setAttribute("loop", "");
        video.setAttribute("autoplay", "");
        video.setAttribute("playsinline", "");
        tryPlay();
      } else if (mode === "scrub") {
        /* Desktop: el video avanza con el scroll (anulamos autoplay del HTML) */
        video.loop = false;
        video.removeAttribute("loop");
        video.removeAttribute("autoplay");
        if (!metaBound) {
          metaBound = true;
          var ready = function () { duration = video.duration || 0; compute(); };
          video.addEventListener("loadedmetadata", ready);
          video.addEventListener("loadeddata", function () {
            if (video.currentTime < 0.001) { try { video.currentTime = 0.001; } catch (e) {} }
          });
          if (video.readyState >= 1) ready();
        }
        compute();
      } else {
        /* reduced-motion: póster fijo */
        video.pause();
      }
    }

    /* Móvil: canvas frame-sequence (iOS no repinta video seeks pausados).
       Desktop: scrub de video atado al scroll. */
    function initMobileFrameScrub() {
      var FRAMES = 60;
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      var imgs = []; var curIdx = -1; var raf2 = 0;
      var dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;z-index:0;background:#000;";
      video.parentNode.insertBefore(canvas, video);
      video.style.display = "none";

      function drawCover(img) {
        if (!img || !img.complete || !img.naturalWidth) return;
        var cw = canvas.width, ch = canvas.height;
        var iw = img.naturalWidth, ih = img.naturalHeight;
        var scale = Math.max(cw / iw, ch / ih);
        ctx.drawImage(img, (cw - iw * scale) / 2, (ch - ih * scale) / 2, iw * scale, ih * scale);
      }

      var firstPainted = false;
      for (var i = 0; i < FRAMES; i++) {
        (function(idx) {
          var im = new Image();
          im.onload = function() {
            if (!firstPainted) { firstPainted = true; drawCover(im); }
            else if (idx === curIdx) drawCover(im); // redibujar si este es el frame activo
          };
          im.src = "video/frames/" + String(idx + 1).padStart(3, "0") + ".jpg?v=hd";
          imgs.push(im);
        })(i);
      }

      function update() {
        raf2 = 0;
        var range = hero.offsetHeight - window.innerHeight;
        var p = range > 0 ? Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / range)) : 0;
        var idx = Math.min(Math.floor(p * FRAMES), FRAMES - 1);
        if (idx !== curIdx) { curIdx = idx; drawCover(imgs[idx]); }
      }
      window.addEventListener("scroll", function() { if (!raf2) raf2 = requestAnimationFrame(update); }, { passive: true });
      window.addEventListener("resize", function() {
        var d = window.devicePixelRatio || 1;
        canvas.width = Math.round(window.innerWidth * d);
        canvas.height = Math.round(window.innerHeight * d);
        update();
      }, { passive: true });
      update();
    }

    function decide() {
      if (reduced) { setMode("still"); return; }
      var testWidth = window.innerWidth;
      if (window.self !== window.top) {
        try {
          testWidth = window.top.innerWidth;
        } catch (e) {}
      }
      var isTouch = (navigator.maxTouchPoints || 0) > 0 && testWidth < 1000;
      if (isTouch) { initMobileFrameScrub(); return; }
      setMode("scrub");
    }
    decide();

    /* Sincronización de scroll desde el padre (Mockup) */
    window.addEventListener("message", function (e) {
      if (e.data && e.data.type === "syncScroll") {
        var progress = e.data.progress;
        var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll > 0) {
          window.scrollTo(0, progress * maxScroll);
        }
      }
    });

    /* Reintento de autoplay al primer gesto (algunos móviles lo bloquean) */
    ["touchstart", "pointerdown", "click"].forEach(function (ev) {
      window.addEventListener(ev, function () { if (mode === "loop" && video.paused) tryPlay(); }, { passive: true });
    });
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", function () { decide(); compute(); }, { passive: true });
  }

  /* -------------------------------------------------------------------------
     FINANCIACIÓN — el auto entra desde la izquierda atado al scroll (scrub).
     Asoma la trompa y se acomoda. Mismo patrón passive + rAF que initHeroScrub.
     ------------------------------------------------------------------------- */
  function initFinCar() {
    var img = $(".fin-car img");
    if (!img || reduced) return;
    var section = img.closest("section");
    if (!section) return;
    var START = -45;               // % corrido a la izquierda (asoma la trompa)
    var ticking = false;
    function update() {
      var rect = section.getBoundingClientRect();
      var vh = window.innerHeight;
      // 0 cuando la sección entra por abajo; 1 cuando su tope llega a ~35% del viewport
      var p = (vh - rect.top) / (vh - vh * 0.35);
      p = Math.max(0, Math.min(1, p));
      var e = 1 - Math.pow(1 - p, 3);            // easeOutCubic
      img.style.transform = "translateX(" + (START * (1 - e)).toFixed(2) + "%)";
      ticking = false;
    }
    window.addEventListener("scroll", function () { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  }

  /* -------------------------------------------------------------------------
     Timeline scroll-driven: rellena la línea y enciende los nodos al scrollear
     ------------------------------------------------------------------------- */
  function initTimeline() {
    var timeline = document.querySelector(".timeline");
    if (!timeline) return;
    var nodes = Array.from(timeline.querySelectorAll(".tl-node"));
    var ticking = false;
    var TRIGGER = 0.6; // playhead: 60% del viewport desde arriba

    function update() {
      var rect = timeline.getBoundingClientRect();
      var vh = window.innerHeight;
      var lineTop = rect.top + 20;          // coincide con ::before top:20px
      var lineBot = rect.top + rect.height - 20; // coincide con ::before bottom:20px
      var triggerY = vh * TRIGGER;

      var pct = (triggerY - lineTop) / (lineBot - lineTop);
      pct = Math.max(0, Math.min(1, pct));
      timeline.style.setProperty("--tl-fill", (pct * 100).toFixed(2) + "%");

      nodes.forEach(function (node) {
        var mid = node.getBoundingClientRect().top + node.offsetHeight / 2;
        if (mid < triggerY) node.classList.add("is-active");
      });

      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  }

  /* -------------------------------------------------------------------------
     Año dinámico en footer
     ------------------------------------------------------------------------- */
  function initYear() {
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* -------------------------------------------------------------------------
     BOOT
     ------------------------------------------------------------------------- */
  function boot() {
    safe(initNav, "initNav");
    safe(initWhatsApp, "initWhatsApp");
    safe(initLogo, "initLogo");
    safe(initReveals, "initReveals");
    safe(initParallax, "initParallax");
    safe(initCounters, "initCounters");
    safe(initCarousels, "initCarousels");
    safe(initFiltrosToggle, "initFiltrosToggle");
    safe(initAnchors, "initAnchors");
    safe(initHeroScrub, "initHeroScrub");
    safe(initFinCar, "initFinCar");
    safe(initTimeline, "initTimeline");
    safe(initYear, "initYear");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
