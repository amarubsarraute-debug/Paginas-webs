(function () {
  "use strict";

  const data = window.__BRAND__ || {};
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Helpers
  const $ = (sel, scope) => (scope || document).querySelector(sel);
  const $$ = (sel, scope) => Array.from((scope || document).querySelectorAll(sel));
  const escHTML = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, c =>
    ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[c]);

  // Safe wrapper to isolate failures
  function safe(fn, name) {
    try {
      fn();
    } catch (e) {
      console.warn("[" + name + "] failed:", e);
    }
  }

  /* =============================================================
     1. Dynamic Content Mounting (Idempotent)
     ============================================================= */
  
  // Mount Services in Bento Grid
  function mountServices() {
    const target = $("[data-products]");
    if (!target || target.dataset.mounted === "true" || !data.services) return;
    
    target.innerHTML = data.services.map((s, idx) => {
      let extraClass = "";
      let bgStyle = "";
      
      // Customize specific cards to create an interesting Bento Grid
      if (idx === 0) {
        // Diagnóstico Computarizado
        extraClass = "col-span-2 row-span-2 service-featured";
        bgStyle = `<div class="card-bg-image" style="background-image: url('assets/img/diagnostic.png')"></div>`;
      } else if (idx === 6) {
        // Venta y Service de Baterías
        extraClass = "col-span-2 service-battery";
        bgStyle = `<div class="card-bg-image" style="background-image: url('assets/img/battery.png')"></div>`;
      }
      
      return `
        <article class="bento-card ${extraClass}">
          ${bgStyle}
          <div class="card-content">
            <div class="card-icon" aria-hidden="true">
              <i data-lucide="${escHTML(s.icon)}"></i>
            </div>
            <h3>${escHTML(s.title)}</h3>
            <p>${escHTML(s.desc)}</p>
          </div>
        </article>
      `;
    }).join("");
    
    target.dataset.mounted = "true";
  }

  // Mount Google Maps Reviews
  function mountReviews() {
    const target = $("[data-testimonials]");
    if (!target || target.dataset.mounted === "true" || !data.reviews) return;
    
    target.innerHTML = data.reviews.map(r => {
      // Generate stars markup
      let stars = "";
      for (let i = 0; i < r.rating; i++) {
        stars += `<i data-lucide="star" style="width: 14px; height: 14px; fill: currentColor;"></i>`;
      }
      
      return `
        <article class="review-card">
          <div class="review-header">
            <span class="review-author">${escHTML(r.author)}</span>
            <div class="review-stars" aria-label="${r.rating} estrellas de 5">
              ${stars}
            </div>
          </div>
          <p class="review-text">"${escHTML(r.text)}"</p>
          <div class="review-badge">
            <span>${escHTML(r.type)} verificado</span>
          </div>
        </article>
      `;
    }).join("");
    
    target.dataset.mounted = "true";
  }

  /* =============================================================
     2. Core Interactivity
     ============================================================= */
  
  // Navigation Menu Toggle
  function initNav() {
    const toggleBtn = $(".nav-toggle");
    const navMenu = $(".main-nav");
    
    if (!toggleBtn || !navMenu) return;
    
    toggleBtn.addEventListener("click", () => {
      const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
      toggleBtn.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("is-active");
    });
    
    // Close nav on click link (for single-page scroll)
    $$(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        toggleBtn.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-active");
      });
    });
  }

  // Splash Screen hiding
  function initSplash() {
    const splash = $("#splash");
    if (!splash) return;
    
    // Safety Net: Hide splash after 4.5s max (CSS fallback), but hide it sooner on load
    const hideSplash = () => {
      splash.style.opacity = "0";
      setTimeout(() => {
        splash.style.visibility = "hidden";
        document.documentElement.classList.add("is-ready");
      }, 500);
    };
    
    // If page takes too long, hide it at 2.5s anyway for speed
    const backupTimeout = setTimeout(hideSplash, 2500);
    
    window.addEventListener("load", () => {
      clearTimeout(backupTimeout);
      // Short delay for loading bar visual completion
      setTimeout(hideSplash, 600);
    });
  }

  /* =============================================================
     3. GSAP Animations & Parallax
     ============================================================= */
  
  // Page entry reveals
  function initReveals() {
    if (reduced) return;
    
    // GSAP Fallback Class
    if (!window.gsap) {
      document.body.classList.add("no-gsap");
      return;
    }
    
    const reveals = $$("[data-reveal]");
    reveals.forEach(el => {
      const type = el.getAttribute("data-reveal");
      const delay = parseFloat(el.getAttribute("data-delay") || "0") / 1000;
      
      let initialVars = { opacity: 0 };
      let animVars = {
        opacity: 1,
        duration: 0.8,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      };
      
      if (type === "slide-up") {
        initialVars.y = 30;
        animVars.y = 0;
      } else if (type === "scale-up") {
        initialVars.scale = 0.95;
        initialVars.y = 20;
        animVars.scale = 1;
        animVars.y = 0;
      }
      
      gsap.fromTo(el, initialVars, animVars);
    });
  }

  // Parallax on Hero Image
  function initHeroParallax() {
    if (reduced || !window.gsap || !window.ScrollTrigger) return;
    
    const img = $(".hero-image");
    const wrapper = $(".hero-image-wrapper");
    if (!img || !wrapper) return;
    
    const speed = parseFloat(wrapper.getAttribute("data-parallax") || "0.1");
    
    gsap.fromTo(img, 
      { yPercent: -5 }, 
      {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  }

  // Bento Card hover micro-animations
  function initBentoHover() {
    if (reduced || !window.gsap) return;
    
    const cards = $$(".bento-card");
    cards.forEach(card => {
      const icon = $(".card-icon", card);
      
      card.addEventListener("mouseenter", () => {
        if (icon) {
          gsap.to(icon, {
            scale: 1.1,
            y: -3,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
      
      card.addEventListener("mouseleave", () => {
        if (icon) {
          gsap.to(icon, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    });
  }

  /* =============================================================
     Boot / Initialization
     ============================================================= */
  function boot() {
    // 1. Mount dynamic content (idempotent)
    safe(mountServices, "mountServices");
    safe(mountReviews, "mountReviews");
    
    // 2. Initialize icons (Lucide)
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      safe(() => window.lucide.createIcons(), "lucideIcons");
    }
    
    // 3. Core UI scripts
    safe(initSplash, "initSplash");
    safe(initNav, "initNav");
    
    // 4. GSAP-dependent scripts
    if (window.gsap && window.ScrollTrigger) {
      try {
        gsap.registerPlugin(ScrollTrigger);
      } catch (_) {}
      
      safe(initReveals, "initReveals");
      safe(initHeroParallax, "initHeroParallax");
      safe(initBentoHover, "initBentoHover");
    } else {
      document.body.classList.add("no-gsap");
    }
  }

  // DOM ready check
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
