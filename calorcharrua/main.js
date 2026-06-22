(function () {
  "use strict";

  var data = window.__BRAND__ || {};
  var WA = data.wa || "59895416324";

  var $ = function (s, sc) { return (sc || document).querySelector(s); };
  var $$ = function (s, sc) { return Array.prototype.slice.call((sc || document).querySelectorAll(s)); };
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }
  function waHref(msg) { return "https://wa.me/" + WA + (msg ? "?text=" + encodeURIComponent(msg) : ""); }

  /* ---- WhatsApp links: enrich [data-wa] with prefilled text ---- */
  function initWa() {
    $$("[data-wa]").forEach(function (a) {
      var msg = a.getAttribute("data-wa");
      if (msg) a.setAttribute("href", waHref(msg));
      if (a.classList.contains("wa-float") || a.classList.contains("nav__cta")) {
        a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener");
      }
    });
  }

  /* ---- Navbar: sticky state + active link ---- */
  function initNav() {
    var nav = $("[data-nav]");
    var hero = $(".vhero");
    function onScroll() {
      if (!nav) return;
      // Transparente sobre el home (deja ver el video y el prendido de luces);
      // sólida recién cuando el hero terminó de pasar bajo la barra.
      var solid = hero ? hero.getBoundingClientRect().bottom <= 72 : window.scrollY > 12;
      nav.classList.toggle("is-stuck", solid);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Active link highlight
    var links = $$(".nav__links a");
    var map = {};
    links.forEach(function (l) {
      var id = l.getAttribute("href"); if (id && id.charAt(0) === "#") map[id.slice(1)] = l;
    });
    var sections = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    if ("IntersectionObserver" in window && sections.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            links.forEach(function (l) { l.classList.remove("is-active"); });
            if (map[en.target.id]) map[en.target.id].classList.add("is-active");
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
      sections.forEach(function (s) { io.observe(s); });
    }
  }

  /* ---- Mobile drawer ---- */
  function initDrawer() {
    var burger = $("[data-burger]"), drawer = $("[data-drawer]"), scrim = $("[data-scrim]");
    if (!burger || !drawer) return;
    drawer.removeAttribute("hidden");
    if (scrim) scrim.removeAttribute("hidden");
    function setOpen(open) {
      drawer.classList.toggle("is-open", open);
      if (scrim) scrim.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    }
    burger.addEventListener("click", function () { setOpen(!drawer.classList.contains("is-open")); });
    if (scrim) scrim.addEventListener("click", function () { setOpen(false); });
    $$("a", drawer).forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  }

  /* ---- Scroll reveal (content-first, JS only enhances) ---- */
  function initReveals() {
    var els = $$("[data-reveal]");
    if (!els.length) return;
    // Nota: NO se gatea por reduced-motion (Windows suele traerlo activo por defecto y aplanaría todo).
    if (!("IntersectionObserver" in window)) {
      document.documentElement.classList.add("reveal-all");
      return;
    }
    function reveal(el) {
      if (el.classList.contains("in") || el.classList.contains("shown")) return;
      el.classList.add("in");
      var done = function () { el.classList.add("shown"); el.classList.remove("in"); el.removeEventListener("animationend", done); };
      el.addEventListener("animationend", done);
      setTimeout(done, 900); // por si animationend no dispara (tab en segundo plano, etc.)
    }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { reveal(en.target); obs.unobserve(en.target); }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
    // Safety net: revelar lo que quede después de 6s
    setTimeout(function () { els.forEach(reveal); }, 6000);
  }

  /* ---- Count up (the "20 años") ---- */
  function initCount() {
    var els = $$("[data-count]");
    if (!els.length) return;
    els.forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      if (!("IntersectionObserver" in window)) { el.textContent = target; return; }
      var done = false;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !done) {
            done = true;
            var start = null, dur = 1100;
            function step(t) {
              if (!start) start = t;
              var p = Math.min((t - start) / dur, 1);
              el.textContent = Math.round((0.5 - Math.cos(p * Math.PI) / 2) * target);
              if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
          }
        });
      }, { threshold: 0.6 });
      io.observe(el);
    });
  }

  /* ---- m² selector ---- */
  function initSelector() {
    var ranges = $("[data-ranges]"), results = $("[data-results]");
    if (!ranges || !results || !data.ranges) return;
    var btns = $$(".range", ranges);
    var arName = $("[data-r-ar-name]"), arPrice = $("[data-r-ar-price]"), arCta = $("[data-r-ar-cta]");
    var ovName = $("[data-r-ov-name]"), ovPrice = $("[data-r-ov-price]"), ovCta = $("[data-r-ov-cta]");

    function apply(i) {
      var r = data.ranges[i]; if (!r) return;
      arName.textContent = r.ar.name;
      arPrice.textContent = r.ar.price;
      arCta.setAttribute("href", waHref("Hola CalorCharrua, me interesa el " + r.ar.name + " para un ambiente de " + r.m2 + ". ¿Disponibilidad, precio final y envío?"));
      ovName.textContent = r.ho.name;
      ovPrice.textContent = r.ho.price;
      var ovMsg = r.ho.custom
        ? "Hola CalorCharrua, quiero un calefactor con horno a medida para un ambiente de " + r.m2 + ". ¿Es posible? ¿Precio y envío?"
        : "Hola CalorCharrua, me interesa el " + r.ho.name + " (" + r.ho.detail + ") para un ambiente de " + r.m2 + ". ¿Disponibilidad, precio final y envío?";
      ovCta.setAttribute("href", waHref(ovMsg));
      btns.forEach(function (b, bi) {
        var on = bi === i;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
      });
    }
    btns.forEach(function (b, i) { b.addEventListener("click", function () { apply(i); }); });
    apply(0);

    // micro form -> WhatsApp prefill
    var mf = $("[data-microform]");
    if (mf) {
      mf.addEventListener("submit", function (e) {
        e.preventDefault();
        var m2 = (mf.m2.value || "").trim(), ciudad = (mf.ciudad.value || "").trim();
        if (!m2 || !ciudad) return;
        var msg = "Hola CalorCharrua, quiero calefaccionar un ambiente de " + m2 + " m² en " + ciudad + ". ¿Qué modelo me recomiendan? ¿Precio final y envío?";
        window.open(waHref(msg), "_blank", "noopener");
      });
    }
  }

  /* ---- "Ver detalles" disclosure ---- */
  function initDetails() {
    $$("[data-detail]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var body = btn.closest(".prod__body"); if (!body) return;
        var note = body.querySelector(".prod__note");
        if (!note) {
          note = document.createElement("p");
          note.className = "prod__note";
          note.style.cssText = "font-size:.86rem;color:var(--humo);margin:-.4rem 0 1rem;line-height:1.5;";
          note.textContent = "Puerta de vidrio vitrocerámico. Los caños y accesorios se cotizan aparte según tu instalación. ¿Lo querés a medida? Avisanos.";
          var actions = body.querySelector(".prod__actions");
          body.insertBefore(note, actions);
        }
        var open = note.style.display !== "none" && note.dataset.shown === "1";
        if (note.dataset.shown === "1") { note.style.display = "none"; note.dataset.shown = "0"; btn.textContent = "Ver detalles"; }
        else { note.style.display = "block"; note.dataset.shown = "1"; btn.textContent = "Ocultar"; }
      });
    });
  }

  /* ---- FAQ: single-open accordion (native <details> still works w/o JS) ---- */
  function initFAQ() {
    var group = $("[data-accordion]"); if (!group) return;
    var items = $$("details", group);
    items.forEach(function (d) {
      d.addEventListener("toggle", function () {
        if (d.open) items.forEach(function (o) { if (o !== d) o.open = false; });
      });
    });
  }

  /* ---- Lead form: validate + states + WhatsApp handoff ---- */
  function initForm() {
    var form = $("[data-form]"); if (!form) return;
    var status = $("[data-status]", form), btn = $("[data-submit]", form);
    function setField(input, ok) { input.closest(".field").classList.toggle("field--invalid", !ok); }
    function emailOk(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
    function show(cls, txt) { status.hidden = false; status.className = "lead__status " + cls; status.textContent = txt; }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nombre = form.nombre, email = form.email, mensaje = form.mensaje, priv = form.privacidad;
      var okN = nombre.value.trim().length > 1, okE = emailOk(email.value.trim()), okM = mensaje.value.trim().length > 2;
      setField(nombre, okN); setField(email, okE); setField(mensaje, okM);
      if (!okN || !okE || !okM || !priv.checked) {
        show("is-err", priv.checked ? "Revisá los campos marcados." : "Revisá los campos y aceptá la política para enviar.");
        return;
      }
      btn.disabled = true; show("is-loading", "Enviando…");
      setTimeout(function () {
        var msg = "Hola CalorCharrua, soy " + nombre.value.trim() + "."
          + " Consulta sobre: " + (form.tipo.value || "calefactor") + "."
          + " " + mensaje.value.trim()
          + (form.telefono.value.trim() ? " Tel: " + form.telefono.value.trim() + "." : "")
          + " Mi email: " + email.value.trim() + ".";
        window.open(waHref(msg), "_blank", "noopener");
        btn.disabled = false;
        show("is-ok", "¡Listo! Te abrimos WhatsApp con tu consulta. Si no se abrió, escribinos al 095 416 324.");
        form.reset();
      }, 850);
    });
  }

  /* ---- Floating WhatsApp visibility ---- */
  function initFloat() {
    var f = $("[data-wafloat]"); if (!f) return;
    function onScroll() { f.classList.toggle("is-visible", window.scrollY > 520); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Showcase: 3D card unfold on scroll + autoplay video ---- */
  function initShowcase() {
    var card = $("[data-sc-card]"), head = $("[data-sc-head]"), video = $("[data-sc-video]");
    if (!card) return;

    // Autoplay/pause video only while in view (saves battery, respects Edge autoplay rules)
    if (video) {
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (es) {
          es.forEach(function (e) {
            if (e.isIntersecting) { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
            else { try { video.pause(); } catch (_) {} }
          });
        }, { threshold: 0.25 }).observe(video);
      } else { try { video.play(); } catch (_) {} }
    }

    if (reduced) return; // leave card flat (CSS handles it)

    var ticking = false;
    function isMobile() { return innerWidth <= 768; }
    function update() {
      ticking = false;
      var rect = card.getBoundingClientRect(), vh = innerHeight || 800;
      var p = (vh - rect.top) / (vh * 0.9);
      p = p < 0 ? 0 : (p > 1 ? 1 : p);
      var rot = 20 * (1 - p);
      var scale = isMobile() ? (0.86 + 0.14 * p) : (1.04 - 0.04 * p);
      card.style.transform = "perspective(1400px) rotateX(" + rot.toFixed(2) + "deg) scale(" + scale.toFixed(3) + ")";
      if (head) head.style.transform = "translateY(" + (-46 * p).toFixed(1) + "px)";
    }
    function onScroll() { if (!ticking) { requestAnimationFrame(update); ticking = true; } }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }

  /* ---- Video hero: se prenden las luces al scrollear (scrub real + fallback a reproducir) ---- */
  function initHeroVideo() {
    var sec = $(".vhero"); if (!sec) return;
    var video = $(".vhero__video", sec),
        overlay = $("[data-vhero-overlay]", sec),
        content = $("[data-vhero-content]", sec),
        cue = $("[data-vhero-cue]", sec);
    if (!video) return;
    video.muted = true; video.setAttribute("muted", ""); video.playsInline = true;

    var dur = 0;

    function setDur() { dur = video.duration || 0; }
    function showFirstFrame() { try { video.currentTime = 0.05; } catch (e) {} }
    if (video.readyState >= 1) { setDur(); showFirstFrame(); }
    else video.addEventListener("loadedmetadata", function () { setDur(); showFirstFrame(); });

    function progress() {
      var rect = sec.getBoundingClientRect();
      var range = sec.offsetHeight - window.innerHeight;
      return range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
    }
    function applyOverlay(p) {
      if (overlay) overlay.style.opacity = (1 - p * 0.5).toFixed(3);
      if (content) { content.style.opacity = Math.max(0, 1 - p * 1.4).toFixed(3); content.style.transform = "translateY(" + (-30 * p).toFixed(1) + "px)"; }
      if (cue) cue.style.opacity = Math.max(0, 1 - p * 4).toFixed(3);
    }
    function seekTo(t) {
      // con el MP4 all-intra los seeks son instantáneos: mapear scroll -> frame directo queda fluido.
      try { video.currentTime = t; } catch (e) {}
    }
    function onScroll() {
      if (!dur) setDur();
      var p = progress();
      applyOverlay(p);
      if (dur > 0) seekTo(p * (dur - 0.04));
    }

    if (reduced) {
      if (video.readyState >= 1) { try { video.currentTime = (video.duration || 4) * 0.85; } catch (e) {} }
      else video.addEventListener("loadedmetadata", function () { try { video.currentTime = (video.duration || 4) * 0.85; } catch (e) {} });
      if (overlay) overlay.style.opacity = "0.45";
      return;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }

  function initYear() { var y = $("[data-year]"); if (y) y.textContent = new Date().getFullYear(); }

  function boot() {
    safe(initWa, "initWa");
    safe(initNav, "initNav");
    safe(initDrawer, "initDrawer");
    safe(initReveals, "initReveals");
    safe(initCount, "initCount");
    safe(initSelector, "initSelector");
    safe(initDetails, "initDetails");
    safe(initFAQ, "initFAQ");
    safe(initForm, "initForm");
    safe(initFloat, "initFloat");
    safe(initHeroVideo, "initHeroVideo");
    safe(initYear, "initYear");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
