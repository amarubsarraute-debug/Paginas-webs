(function () {
  "use strict";

  const data = window.__BRAND__ || {};
  const $ = (sel, scope) => (scope || document).querySelector(sel);
  const $$ = (sel, scope) => Array.from((scope || document).querySelectorAll(sel));
  const fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  function safe(fn, name) {
    try {
      fn();
    } catch (error) {
      console.warn("[" + name + "]", error);
    }
  }

  function initYear() {
    const year = $("[data-year]");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function initNav() {
    const header = $("[data-header]");
    const toggle = $("[data-menu-toggle]");
    const panel = $("[data-mobile-menu]");
    if (!header) return;

    const setScrolled = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    setScrolled();
    window.addEventListener("scroll", setScrolled, { passive: true });

    if (!toggle || !panel) return;

    const setOpen = (open) => {
      header.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      panel.setAttribute("aria-hidden", String(!open));
      toggle.setAttribute("aria-label", open ? "Cerrar menu" : "Abrir menu");
    };

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    $$("a", panel).forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });
  }

  function initSmoothAnchors() {
    document.addEventListener("click", (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = $(id);
      if (!target) return;
      event.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 78,
        behavior: "smooth"
      });
    });
  }

  function initScrollProgress() {
    const bar = $("[data-scroll-progress]");
    if (!bar) return;
    let raf = null;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = "scaleX(" + pct + ")";
      raf = null;
    };

    window.addEventListener("scroll", () => {
      if (!raf) raf = requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  function initReveals() {
    const elements = $$("[data-reveal]");
    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.03,
      rootMargin: "0px 0px -2% 0px"
    });

    elements.forEach((el) => observer.observe(el));

    setTimeout(() => {
      $$("[data-reveal]:not(.is-revealed)").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 1.15) {
          el.classList.add("is-revealed");
        }
      });
    }, 6000);
  }

  function initFaq() {
    $$("[data-faq-list] .faq-item").forEach((item) => {
      const button = $("button", item);
      const panel = $(".faq-panel", item);
      if (!button || !panel) return;

      const setOpen = (open) => {
        item.classList.toggle("is-open", open);
        button.setAttribute("aria-expanded", String(open));
        panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0px";
      };

      button.addEventListener("click", () => {
        const open = button.getAttribute("aria-expanded") !== "true";
        setOpen(open);
      });
    });
  }

  function initCounters() {
    const counters = $$("[data-count-to]");
    if (!counters.length) return;

    const run = (el) => {
      if (el.dataset.counted === "true") return;
      el.dataset.counted = "true";
      const target = Number(el.dataset.countTo || el.textContent || 0);
      const start = performance.now();
      const duration = 900;

      const tick = (now) => {
        const pct = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - pct, 3);
        el.textContent = String(Math.round(target * eased));
        if (pct < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(run);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          run(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    counters.forEach((el) => observer.observe(el));
  }

  function initTilt() {
    if (!fineHover) return;
    $$("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = "rotateX(" + (-y * 4).toFixed(2) + "deg) rotateY(" + (x * 5).toFixed(2) + "deg)";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  function setFieldError(input, message) {
    const field = input.closest(".field");
    const error = $('[data-error-for="' + input.name + '"]');
    if (field) field.classList.toggle("has-error", Boolean(message));
    if (error) error.textContent = message || "";
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function validateForm(form) {
    let valid = true;
    $$("input, textarea, select", form).forEach((input) => {
      let message = "";
      if (input.validity.valueMissing) message = "Este campo es obligatorio.";
      else if (input.validity.typeMismatch) message = "Revisa el formato de este dato.";
      else if (input.validity.tooShort) message = "Agrega un poco mas de informacion.";
      setFieldError(input, message);
      if (message) valid = false;
    });
    return valid;
  }

  function initContactForm() {
    const form = $("[data-contact-form]");
    if (!form) return;
    const status = $("[data-form-status]", form);
    const submit = $("[data-submit-button]", form);
    const label = $("[data-submit-label]", form);
    const phone = (data.contact && data.contact.whatsappInternational) || "59892850267";

    $$("input, textarea, select", form).forEach((input) => {
      input.addEventListener("input", () => setFieldError(input, ""));
      input.addEventListener("blur", () => {
        if (!input.checkValidity()) validateForm(form);
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (form.classList.contains("is-loading")) return;

      status.className = "form-status";
      status.textContent = "";

      if (!validateForm(form)) {
        status.classList.add("is-error");
        status.textContent = "Revisa los campos marcados antes de enviar.";
        return;
      }

      const formData = new FormData(form);
      const message = [
        "Hola Amaru Web Studio, quiero pedir presupuesto.",
        "",
        "Nombre: " + formData.get("name"),
        "Email: " + formData.get("email"),
        "Telefono: " + formData.get("phone"),
        "Servicio: " + formData.get("service"),
        "Mensaje: " + formData.get("message")
      ].join("\n");

      form.classList.add("is-loading");
      if (submit) submit.disabled = true;
      if (label) label.textContent = "Preparando mensaje";
      status.textContent = "Preparando tu consulta para WhatsApp...";

      setTimeout(() => {
        const url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
        form.classList.remove("is-loading");
        if (submit) submit.disabled = false;
        if (label) label.textContent = "Enviar consulta";
        status.className = "form-status is-success";
        status.textContent = "Listo. Te llevamos a WhatsApp para confirmar el envio.";
        window.location.href = url;
      }, 650);
    });
  }

  function boot() {
    safe(initYear, "initYear");
    safe(initNav, "initNav");
    safe(initSmoothAnchors, "initSmoothAnchors");
    safe(initScrollProgress, "initScrollProgress");
    safe(initReveals, "initReveals");
    safe(initFaq, "initFaq");
    safe(initCounters, "initCounters");
    safe(initTilt, "initTilt");
    safe(initContactForm, "initContactForm");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
