(function () {
  'use strict';

  const safe = (fn, name) => {
    try {
      fn();
    } catch (error) {
      console.error(`[Calcerrada] ${name}`, error);
    }
  };

  function initIcons() {
    if (!window.lucide) return;
    window.lucide.createIcons({ attrs: { 'stroke-width': 1.45 } });
  }

  function initHeader() {
    const header = document.querySelector('[data-header]');
    if (!header) return;
    const update = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function initMenu() {
    const button = document.querySelector('[data-menu-button]');
    const nav = document.querySelector('[data-mobile-nav]');
    if (!button || !nav) return;

    const close = () => {
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Abrir menú');
      nav.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    };

    button.addEventListener('click', () => {
      const willOpen = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(willOpen));
      button.setAttribute('aria-label', willOpen ? 'Cerrar menú' : 'Abrir menú');
      nav.classList.toggle('is-open', willOpen);
      document.body.classList.toggle('menu-open', willOpen);
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) close();
    });
  }

  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    const revealAll = () => items.forEach((item) => item.classList.add('is-visible'));

    if (!('IntersectionObserver' in window)) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' },
    );

    items.forEach((item) => observer.observe(item));
    setTimeout(revealAll, 1800);
  }

  function initProcessAnimation() {
    const process = document.querySelector('.process');
    if (!process) return;

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      process.classList.add('is-in-view');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || !entry.isIntersecting) return;
        process.classList.add('is-in-view');
        observer.disconnect();
      },
      { threshold: 0.28 },
    );

    observer.observe(process);
  }

  function initReviewCarousel() {
    const carousel = document.querySelector('[data-review-carousel]');
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll('[data-review-slide]'));
    const previous = carousel.querySelector('[data-review-prev]');
    const next = carousel.querySelector('[data-review-next]');
    if (slides.length < 2 || !previous || !next) return;

    let activeIndex = 0;

    const collapseReview = (slide) => {
      const text = slide.querySelector('.review-text');
      const toggle = slide.querySelector('[data-review-more]');
      if (!text || !toggle) return;
      text.classList.remove('is-expanded');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Ver reseña completa';
    };

    const show = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeIndex;
        if (!isActive) collapseReview(slide);
        slide.hidden = !isActive;
        slide.classList.toggle('is-active', isActive);
      });
    };

    previous.addEventListener('click', () => show(activeIndex - 1));
    next.addEventListener('click', () => show(activeIndex + 1));

    carousel.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') show(activeIndex - 1);
      if (event.key === 'ArrowRight') show(activeIndex + 1);
    });

    carousel.querySelectorAll('[data-review-more]').forEach((toggle) => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.addEventListener('click', () => {
        const slide = toggle.closest('[data-review-slide]');
        const text = slide && slide.querySelector('.review-text');
        if (!text) return;
        const willExpand = !text.classList.contains('is-expanded');
        text.classList.toggle('is-expanded', willExpand);
        toggle.setAttribute('aria-expanded', String(willExpand));
        toggle.textContent = willExpand ? 'Ver menos' : 'Ver reseña completa';
      });
    });

    show(0);
  }

  function initFaq() {
    const list = document.querySelector('[data-faq-list]');
    if (!list) return;

    const items = Array.from(list.querySelectorAll('details'));
    items.forEach((item) => {
      item.addEventListener('toggle', () => {
        if (!item.open) return;
        items.forEach((other) => {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  function initContactForm() {
    const form = document.querySelector('[data-contact-form]');
    if (!form) return;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const name = form.elements.name.value.trim();
      const phone = form.elements.phone.value.trim();
      const reason = form.elements.reason.value.trim();
      const message = [
        'Hola Bermar Calcerrada, necesito realizar una consulta legal.',
        `Nombre: ${name}`,
        `Teléfono: ${phone}`,
        `Motivo: ${reason}`,
      ].join('\n');
      window.location.href = `https://wa.me/59899595615?text=${encodeURIComponent(message)}`;
    });
  }

  function initYear() {
    document.querySelectorAll('[data-year]').forEach((node) => {
      node.textContent = String(new Date().getFullYear());
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    safe(initIcons, 'iconos');
    safe(initHeader, 'cabecera');
    safe(initMenu, 'menú');
    safe(initReveal, 'animaciones');
    safe(initProcessAnimation, 'proceso');
    safe(initReviewCarousel, 'reseñas');
    safe(initFaq, 'preguntas frecuentes');
    safe(initContactForm, 'contacto');
    safe(initYear, 'año');
  });
})();
