(function () {
  'use strict';

  const safe = (fn, name) => {
    try {
      fn();
    } catch (error) {
      console.error(`[Caubarrere] ${name}`, error);
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

  function initHeroMotion() {
    const root = document.documentElement;
    const hero = document.querySelector('[data-hero]');
    if (!hero) {
      root.classList.remove('motion-armed');
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (reduceMotion || !gsap) {
      root.classList.add('motion-reduced');
      root.classList.remove('motion-armed');
      return;
    }

    if (ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    const isMobile = window.matchMedia('(max-width: 700px)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const header = document.querySelector('[data-header]');
    const background = hero.querySelector('[data-hero-bg]');
    const backgroundVideo = background && background.querySelector('[data-hero-video]');
    const backgroundVisual = background && (background.querySelector('[data-hero-video]') || background.querySelector('img'));
    const statue = hero.querySelector('[data-hero-statue]');
    const statueImage = statue && statue.querySelector('img');
    const shine = hero.querySelector('[data-hero-shine]');
    const kicker = hero.querySelector('[data-hero-kicker]');
    const line = hero.querySelector('[data-hero-line]');
    const titleLines = hero.querySelectorAll('[data-hero-title] span');
    const lead = hero.querySelector('[data-hero-lead]');
    const actions = hero.querySelector('[data-hero-actions]');
    const content = hero.querySelector('.hero-content');
    const scrollVeil = hero.querySelector('[data-hero-scroll-veil]');
    const whatsapp = document.querySelector('.whatsapp-float');

    if (backgroundVideo) {
      backgroundVideo.play().catch(() => backgroundVideo.classList.add('is-paused'));
    }

    const intro = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => root.classList.remove('motion-armed'),
    });

    intro
      .to(background, { autoAlpha: 1, scale: 1, duration: isMobile ? 0.92 : 1.4 }, 0)
      .to(statue, { x: 0, autoAlpha: 1, filter: 'blur(0px)', duration: isMobile ? 0.88 : 1.18 }, 0.12)
      .to(header, { y: 0, autoAlpha: 1, duration: isMobile ? 0.52 : 0.74 }, 0.14)
      .to(kicker, { y: 0, autoAlpha: 1, duration: isMobile ? 0.48 : 0.68 }, 0.52)
      .to(line, { scaleX: 1, duration: isMobile ? 0.46 : 0.7, ease: 'power2.inOut' }, 0.72)
      .to(titleLines, { y: 0, autoAlpha: 1, duration: isMobile ? 0.5 : 0.7, stagger: isMobile ? 0.08 : 0.12 }, 0.84)
      .to([lead, actions], { y: 0, autoAlpha: 1, duration: isMobile ? 0.48 : 0.62, stagger: 0.11 }, 1.16)
      .fromTo(
        shine,
        { xPercent: -145, autoAlpha: 0 },
        { xPercent: 145, autoAlpha: 0.38, duration: isMobile ? 0.78 : 1.12, ease: 'power2.inOut' },
        1.02,
      )
      .to(shine, { autoAlpha: 0, duration: 0.18 }, '>-0.16')
      .to(whatsapp, { y: 0, autoAlpha: 1, duration: isMobile ? 0.48 : 0.66, ease: 'back.out(1.08)' }, 1.72);

    if (ScrollTrigger) {
      gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
        .to(content, { y: isMobile ? -20 : -46, autoAlpha: isMobile ? 0.72 : 0.46, ease: 'none' }, 0)
        .to(statue, { y: isMobile ? 18 : 50, ease: 'none' }, 0)
        .to(backgroundVisual, { y: isMobile ? 8 : 24, ease: 'none' }, 0)
        .to(scrollVeil, { autoAlpha: isMobile ? 0.48 : 0.66, ease: 'none' }, 0);
    }

    if (!isMobile && finePointer && backgroundVisual) {
      const moveStatueX = statueImage && gsap.quickTo(statueImage, 'x', { duration: 0.62, ease: 'power3.out' });
      const moveStatueY = statueImage && gsap.quickTo(statueImage, 'y', { duration: 0.62, ease: 'power3.out' });
      const moveBackgroundX = gsap.quickTo(backgroundVisual, 'x', { duration: 0.74, ease: 'power3.out' });
      const moveBackgroundY = gsap.quickTo(backgroundVisual, 'y', { duration: 0.74, ease: 'power3.out' });

      hero.addEventListener('pointermove', (event) => {
        const rect = hero.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) - 0.5;
        const y = ((event.clientY - rect.top) / rect.height) - 0.5;

        if (moveStatueX && moveStatueY) {
          moveStatueX(x * 16);
          moveStatueY(y * 12);
        }
        moveBackgroundX(x * -8);
        moveBackgroundY(y * -6);
      });

      hero.addEventListener('pointerleave', () => {
        if (moveStatueX && moveStatueY) {
          moveStatueX(0);
          moveStatueY(0);
        }
        moveBackgroundX(0);
        moveBackgroundY(0);
      });
    }
  }

  function initPageMotion() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (reduceMotion || !gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);
    const isMobile = window.matchMedia('(max-width: 700px)').matches;

    const batchReveal = (selector, options = {}) => {
      const items = gsap.utils.toArray(selector);
      if (!items.length) return;

      ScrollTrigger.batch(items, {
        start: options.start || 'top 88%',
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            {
              autoAlpha: 0,
              y: options.y || 32,
              filter: options.blur === false ? 'none' : 'blur(5px)',
            },
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: options.duration || 0.82,
              stagger: options.stagger || 0.075,
              ease: 'power3.out',
              overwrite: 'auto',
              clearProps: 'opacity,visibility,transform,filter',
            },
          );
        },
      });
    };

    batchReveal('.practice-card', { y: 38, stagger: 0.06 });
    batchReveal('.practice-cta', { y: 42, duration: 0.9 });
    batchReveal('.situation-item', { y: 26, stagger: 0.055 });
    batchReveal('.about-value', { y: 34, stagger: 0.09 });
    batchReveal('.process-step', { y: 30, stagger: 0.11, blur: false });
    batchReveal('.faq-item', { y: 18, stagger: 0.05, blur: false });
    batchReveal('.location-details > a, .location-details > span', { y: 16, stagger: 0.07, blur: false });
    batchReveal('.footer-brand, .footer-links, .footer-contact', { y: 24, stagger: 0.08, blur: false, start: 'top 96%' });

    gsap.utils.toArray('.about-copy, .process-heading, .reviews .review-heading, .faq-heading, .location-copy, .contact-form').forEach((block) => {
      gsap.fromTo(
        block,
        { autoAlpha: 0, y: isMobile ? 22 : 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 84%',
            once: true,
          },
          clearProps: 'opacity,visibility,transform',
        },
      );
    });

    gsap.utils.toArray('.thin-line, .gold-line:not([data-hero-line])').forEach((line) => {
      gsap.fromTo(
        line,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 0.95,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: line,
            start: 'top 88%',
            once: true,
          },
          clearProps: 'transform',
        },
      );
    });

    if (!isMobile) {
      gsap.utils.toArray('.practice-cta > img, .rating-panel > img, .contact-image').forEach((image) => {
        const section = image.closest('section') || image;
        gsap.fromTo(
          image,
          { yPercent: -3 },
          {
            yPercent: 3,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
    }
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
      window.location.href = 'tel:+59842492709';
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
    safe(initHeroMotion, 'hero cinematografico');
    safe(initPageMotion, 'movimiento general');
    safe(initMenu, 'menú');
    safe(initReveal, 'animaciones');
    safe(initProcessAnimation, 'proceso');
    safe(initReviewCarousel, 'reseñas');
    safe(initFaq, 'preguntas frecuentes');
    safe(initContactForm, 'contacto');
    safe(initYear, 'año');
  });
})();
