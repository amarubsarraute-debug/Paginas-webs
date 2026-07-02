;(function() {
  'use strict';

  /* ──────────────────────────────────────────────
     Register GSAP plugins
  ────────────────────────────────────────────── */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ──────────────────────────────────────────────
     Safe wrapper – mandatory per skill rules
  ────────────────────────────────────────────── */
  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn('[' + name + ']', e); }
  }

  /* ──────────────────────────────────────────────
     Idempotency guard
  ────────────────────────────────────────────── */
  var _initialized = {};
  function once(key) {
    if (_initialized[key]) return true;
    _initialized[key] = true;
    return false;
  }

  /* ══════════════════════════════════════════════
     DOM Ready
  ══════════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', function() {
    safe(initSplash,         'splash');
    safe(initNav,            'nav');
    safe(initHeroAnimation,  'hero-anim');
    safe(initScrollReveal,   'reveal');
    safe(initFAQ,            'faq');
    safe(initProcessSteps,   'process');
    safe(initCounters,       'counters');
    safe(initSafetyTimeout,  'safety');
  });

  /* ──────────────────────────────────────────────
     1. initSplash
     ─ Hide splash screen after 2 s (class), 3 s (display:none)
     ─ CSS animation provides a safety net at 4.5 s
  ────────────────────────────────────────────── */
  function initSplash() {
    if (once('splash')) return;

    var splash = document.getElementById('splash');
    if (!splash) return;

    setTimeout(function() {
      splash.classList.add('splash-hidden');
    }, 1000);

    setTimeout(function() {
      splash.style.display = 'none';
    }, 1600);
  }

  /* ──────────────────────────────────────────────
     2. initNav
     ─ Scrolled state, mobile toggle, smooth scroll
  ────────────────────────────────────────────── */
  function initNav() {
    if (once('nav')) return;

    var nav       = document.getElementById('nav');
    var toggle    = document.querySelector('.nav-toggle');
    var navLinks  = document.querySelectorAll('.nav-link');

    if (!nav) return;

    /* Scroll class */
    function handleScroll() {
      if (window.scrollY > 80) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on load

    /* Mobile toggle */
    if (toggle) {
      toggle.addEventListener('click', function() {
        nav.classList.toggle('nav-open');
      });
    }

    /* Nav links – close mobile + smooth scroll */
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function(e) {
        nav.classList.remove('nav-open');

        var href = this.getAttribute('href');
        if (href && href.charAt(0) === '#') {
          e.preventDefault();
          var target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    }
  }

  /* ──────────────────────────────────────────────
     3. initCursor
     ─ Custom cursor for non-touch screens > 1024 px
  ────────────────────────────────────────────── */
  function initCursor() {
    if (once('cursor')) return;

    var cursor    = document.getElementById('cursor');
    var cursorDot = document.getElementById('cursor-dot');

    if (!cursor || !cursorDot) return;

    var isTouch = 'ontouchstart' in window;
    var isSmall = window.innerWidth <= 1024;

    if (isTouch || isSmall) {
      cursor.style.display    = 'none';
      cursorDot.style.display = 'none';
      return;
    }

    var cursorSize = cursor.offsetWidth  || 40;
    var dotSize    = cursorDot.offsetWidth || 8;

    document.addEventListener('mousemove', function(e) {
      gsap.to(cursor, {
        x: e.clientX - cursorSize / 2,
        y: e.clientY - cursorSize / 2,
        duration: 0.35,
        ease: 'power2.out'
      });
      gsap.to(cursorDot, {
        x: e.clientX - dotSize / 2,
        y: e.clientY - dotSize / 2,
        duration: 0.15,
        ease: 'power2.out'
      });
    });

    /* Hover / active states */
    var interactiveSelectors = 'a, button, .faq-question, .service-card, .zone-item';

    document.addEventListener('mousedown', function() { document.body.classList.add('cursor-active'); });
    document.addEventListener('mouseup',   function() { document.body.classList.remove('cursor-active'); });

    var interactiveEls = document.querySelectorAll(interactiveSelectors);
    for (var i = 0; i < interactiveEls.length; i++) {
      interactiveEls[i].addEventListener('mouseenter', function() {
        document.body.classList.add('cursor-hover');
      });
      interactiveEls[i].addEventListener('mouseleave', function() {
        document.body.classList.remove('cursor-hover');
      });
    }

    /* Also listen via delegation for dynamic elements */
    document.addEventListener('mouseover', function(e) {
      if (e.target.closest(interactiveSelectors)) {
        document.body.classList.add('cursor-hover');
      }
    });
    document.addEventListener('mouseout', function(e) {
      if (e.target.closest(interactiveSelectors)) {
        document.body.classList.remove('cursor-hover');
      }
    });
  }

  /* ──────────────────────────────────────────────
     4. initHeroParticles
     ─ 40 floating particles inside .hero-particles
  ────────────────────────────────────────────── */
  function initHeroParticles() {
    if (once('particles')) return;

    var container = document.querySelector('.hero-particles');
    if (!container) return;

    var accentColor = '255, 214, 10'; // RGB for accent – matches CSS --accent: #FFD60A

    for (var i = 0; i < 40; i++) {
      var p    = document.createElement('div');
      var size = Math.random() * 3 + 2;               // 2-5 px
      var opacity = Math.random() * 0.3 + 0.1;        // 0.1-0.4
      var left = Math.random() * 100;                  // % x
      var top  = Math.random() * 100;                  // % y

      p.className        = 'particle';
      p.style.position   = 'absolute';
      p.style.width      = size + 'px';
      p.style.height     = size + 'px';
      p.style.borderRadius = '50%';
      p.style.background = 'rgba(' + accentColor + ', ' + opacity + ')';
      p.style.left       = left + '%';
      p.style.top        = top + '%';
      p.style.pointerEvents = 'none';

      container.appendChild(p);

      gsap.to(p, {
        y: -(Math.random() * 200 + 100),              // -100 to -300
        x: (Math.random() - 0.5) * 60,                // slight x drift
        duration: Math.random() * 4 + 4,               // 4-8 s
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 4                       // stagger start
      });
    }
  }

  /* ──────────────────────────────────────────────
     5. initHeroAnimation
     ─ Staggered entrance after splash fades
  ────────────────────────────────────────────── */
  function initHeroAnimation() {
    if (once('hero-anim')) return;
    if (typeof gsap === 'undefined') return; /* content is visible by default */

    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    /* Eyebrow */
    tl.fromTo('.hero-eyebrow',
      { y: 18, opacity: 0 },
      { y: 0,  opacity: 1, duration: 0.6, delay: 1.0 }
    );

    /* Title lines */
    tl.fromTo('.hero-title .ln',
      { y: 38, opacity: 0 },
      { y: 0,  opacity: 1, duration: 0.75, stagger: 0.12 },
      '-=0.2'
    );

    /* Subtitle */
    tl.fromTo('.hero-subtitle',
      { y: 18, opacity: 0 },
      { y: 0,  opacity: 1, duration: 0.7 },
      '-=0.35'
    );

    /* CTAs */
    tl.fromTo('.hero-ctas',
      { y: 18, opacity: 0 },
      { y: 0,  opacity: 1, duration: 0.6 },
      '-=0.3'
    );

    /* Badges */
    tl.fromTo('.hero-badge',
      { y: 14, opacity: 0 },
      { y: 0,  opacity: 1, stagger: 0.08, duration: 0.5 },
      '-=0.25'
    );
  }

  /* ──────────────────────────────────────────────
     6. initScrollReveal
     ─ IntersectionObserver with threshold ≤ 0.05
     ─ Do NOT gate with prefers-reduced-motion
  ────────────────────────────────────────────── */
  function initScrollReveal() {
    if (once('reveal')) return;

    var revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: reveal everything immediately
      for (var f = 0; f < revealEls.length; f++) {
        revealEls[f].classList.add('active');
      }
      return;
    }

    var observer = new IntersectionObserver(function(entries, obs) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('active');
          obs.unobserve(entries[i].target);
        }
      }
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px'
    });

    for (var j = 0; j < revealEls.length; j++) {
      observer.observe(revealEls[j]);
    }
  }

  /* ──────────────────────────────────────────────
     7. initServiceCards
     ─ Subtle 3D tilt + glow on hover (max 2 deg)
  ────────────────────────────────────────────── */
  function initServiceCards() {
    if (once('services')) return;

    var cards = document.querySelectorAll('.service-card');

    for (var i = 0; i < cards.length; i++) {
      (function(card) {
        card.addEventListener('mousemove', function(e) {
          var rect = card.getBoundingClientRect();
          var x    = e.clientX - rect.left;
          var y    = e.clientY - rect.top;

          var midX = rect.width  / 2;
          var midY = rect.height / 2;

          var rotateY = ((x - midX) / midX) * 2;   // max ±2 deg
          var rotateX = -((y - midY) / midY) * 2;

          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 800
          });

          /* Glow position */
          card.style.setProperty('--glow-x', x + 'px');
          card.style.setProperty('--glow-y', y + 'px');
        });

        card.addEventListener('mouseleave', function() {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: 'power3.out'
          });
          card.style.removeProperty('--glow-x');
          card.style.removeProperty('--glow-y');
        });
      })(cards[i]);
    }
  }

  /* ──────────────────────────────────────────────
     8. initFAQ
     ─ Independent toggle (each item opens/closes on its own)
  ────────────────────────────────────────────── */
  function initFAQ() {
    if (once('faq')) return;

    var questions = document.querySelectorAll('.faq-question');

    for (var i = 0; i < questions.length; i++) {
      questions[i].addEventListener('click', function() {
        var item   = this.closest('.faq-item');
        var answer = item ? item.querySelector('.faq-answer') : null;
        if (!item || !answer) return;

        var willOpen = !item.classList.contains('active');
        item.classList.toggle('active', willOpen);
        this.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        answer.style.maxHeight = willOpen ? (answer.scrollHeight + 'px') : '0';
      });
    }
  }

  /* ──────────────────────────────────────────────
     9. initProcessSteps
     ─ ScrollTrigger animations for process steps
  ────────────────────────────────────────────── */
  function initProcessSteps() {
    if (once('process')) return;

    var steps = document.querySelectorAll('.process-step');
    var fill  = document.querySelector('.process-line-fill');

    if (!steps.length) return;

    var hasGsap = (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined');

    /* Without GSAP: show everything lit (robust fallback) */
    if (!hasGsap) {
      for (var s = 0; s < steps.length; s++) { steps[s].classList.add('active'); }
      if (fill) { fill.style.width = '100%'; fill.style.height = '100%'; }
      return;
    }

    /* Per-step entrance + progressive illumination */
    for (var i = 0; i < steps.length; i++) {
      (function(step, index) {
        var stepNumber = step.querySelector('.step-number');

        gsap.from(step, {
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 40,
          duration: 0.7,
          delay: index * 0.08,
          ease: 'power3.out'
        });

        if (stepNumber) {
          gsap.from(stepNumber, {
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              toggleActions: 'play none none none'
            },
            scale: 0,
            duration: 0.5,
            delay: index * 0.08 + 0.15,
            ease: 'back.out(1.7)'
          });
        }

        /* Light up the number/title as each step reaches the upper viewport */
        ScrollTrigger.create({
          trigger: step,
          start: 'top 68%',
          end: 'bottom 32%',
          onEnter:     function() { step.classList.add('active'); },
          onEnterBack: function() { step.classList.add('active'); },
          onLeaveBack: function() { step.classList.remove('active'); }
        });
      })(steps[i], i);
    }

    /* Vertical gold line fills (height) as the user scrolls the steps */
    if (fill) {
      var processSection = fill.closest('.process-steps') || fill.parentElement;
      gsap.fromTo(fill,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: processSection,
            start: 'top 72%',
            end: 'bottom 55%',
            scrub: 0.5
          }
        }
      );
    }
  }

  /* ──────────────────────────────────────────────
     10b. initCounters
     ─ Animate .stat-num[data-count] when scrolled into view
     ─ Content-first: HTML already holds the final value
  ────────────────────────────────────────────── */
  function initCounters() {
    if (once('counters')) return;

    var nums = document.querySelectorAll('.stat-num[data-count]');
    if (!nums.length) return;

    function run(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      if (isNaN(target)) return;

      if (typeof gsap !== 'undefined') {
        var obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: function() { el.textContent = Math.round(obj.v) + suffix; },
          onComplete: function() { el.textContent = target + suffix; }
        });
      } else {
        el.textContent = target + suffix;
      }
    }

    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function(entries, o) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            run(entries[i].target);
            o.unobserve(entries[i].target);
          }
        }
      }, { threshold: 0.4 });
      for (var j = 0; j < nums.length; j++) { obs.observe(nums[j]); }
    } else {
      for (var k = 0; k < nums.length; k++) { run(nums[k]); }
    }
  }

  /* ──────────────────────────────────────────────
     10. initSafetyTimeout
     ─ MANDATORY: After 6 s, reveal any hidden .reveal
  ────────────────────────────────────────────── */
  function initSafetyTimeout() {
    if (once('safety')) return;

    setTimeout(function() {
      var hidden = document.querySelectorAll('.reveal:not(.active)');
      for (var i = 0; i < hidden.length; i++) {
        hidden[i].classList.add('active');
      }
    }, 6000);
  }

})();
