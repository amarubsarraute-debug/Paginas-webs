// Initialize Lucide Icons
lucide.createIcons();

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
const logoText = document.getElementById('logo-text');
const logoSub = document.getElementById('logo-sub');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenuIcon = document.getElementById('mobile-menu-icon');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add('glass-nav', 'py-3');
        navbar.classList.remove('bg-transparent', 'py-5');
        
        logoText.classList.add('text-navy-900');
        logoText.classList.remove('lg:text-white');
        
        logoSub.classList.add('text-slate-500');
        logoSub.classList.remove('lg:text-white/80');
        
        navLinks.forEach(link => {
            link.classList.add('text-slate-700');
            link.classList.remove('lg:text-white/90');
        });
        
        mobileMenuBtn.classList.add('text-slate-700');
        mobileMenuBtn.classList.remove('text-white');
    } else {
        navbar.classList.remove('glass-nav', 'py-3');
        navbar.classList.add('bg-transparent', 'py-5');
        
        logoText.classList.remove('text-navy-900');
        logoText.classList.add('lg:text-white');
        
        logoSub.classList.remove('text-slate-500');
        logoSub.classList.add('lg:text-white/80');
        
        navLinks.forEach(link => {
            link.classList.remove('text-slate-700');
            link.classList.add('lg:text-white/90');
        });
        
        mobileMenuBtn.classList.remove('text-slate-700');
        mobileMenuBtn.classList.add('text-white');
    }
});

// Mobile Menu Toggle
let isMenuOpen = false;
mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        mobileMenuIcon.setAttribute('data-lucide', 'x');
    } else {
        mobileMenu.classList.add('hidden');
        mobileMenuIcon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
});

// Close mobile menu on link click
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.classList.add('hidden');
        mobileMenuIcon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});

// Cases Slider
const casesSlider = document.getElementById('cases-slider');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

if (casesSlider && btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => {
        casesSlider.scrollBy({ left: -casesSlider.offsetWidth, behavior: 'smooth' });
    });
    
    btnNext.addEventListener('click', () => {
        casesSlider.scrollBy({ left: casesSlider.offsetWidth, behavior: 'smooth' });
    });
}

// --- ANIMATIONS OBSERVER ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const animationType = el.getAttribute('data-animate');
            
            // Apply animation class
            el.classList.add(`animate-${animationType}`);
            
            // Handle counter animation specifically
            if (el.id === 'rating-counter' && !el.classList.contains('counted')) {
                animateValue(el, 0, 5, 1500);
                el.classList.add('counted');
            }
            
            // Stop observing once animated
            observer.unobserve(el);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});

// Number Counter Animation Function
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const isDecimal = end % 1 !== 0;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const current = easeProgress * (end - start) + start;
        obj.innerHTML = isDecimal ? current.toFixed(1) : Math.round(current);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = isDecimal ? end.toFixed(1) : end;
        }
    };
    window.requestAnimationFrame(step);
}

// Floating WhatsApp Vibration
const floatingWpp = document.getElementById('floating-wpp');
if (floatingWpp) {
    setInterval(() => {
        floatingWpp.classList.add('animate-vibrate');
        setTimeout(() => {
            floatingWpp.classList.remove('animate-vibrate');
        }, 400);
    }, 5000);
}
