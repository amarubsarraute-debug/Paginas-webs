import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { WHATSAPP_NUMBER_1, WHATSAPP_MESSAGE } from '../data';
import logo from '../assets/adriana-galleno-logo.png';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Tratamientos', href: '#tratamientos' },
    { name: 'Ginecología regenerativa', href: '#ginecologia' },
    { name: 'Resultados', href: '#resultados' },
    { name: 'Sobre mí', href: '#sobre-mi' },
    { name: 'Ubicaciones', href: '#ubicaciones' },
    { name: 'FAQ', href: '#faq' },
  ];

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER_1}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-brand-sand-light/90 backdrop-blur-lg shadow-sm py-3' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#inicio" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img
            src={logo}
            alt="Logo Dra. Adriana Galleno Medicina Estética"
            className={`h-11 w-11 rounded-sm object-cover ring-1 transition-all md:h-12 md:w-12 ${
              isScrolled ? 'ring-brand-sand/35 shadow-sm' : 'ring-brand-sand-light/35'
            }`}
          />
          <span className={`hidden text-lg md:block md:text-xl font-serif font-semibold ${isScrolled ? 'text-brand-dark' : 'text-brand-sand-light'}`}>
            Dra. Adriana Galleno
          </span>
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-xs xl:text-sm font-semibold transition-colors ${isScrolled ? 'text-brand-text hover:text-brand-gold' : 'text-brand-sand-light/72 hover:text-brand-sand-light'}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${isScrolled ? 'bg-brand-gold text-brand-sand-light hover:bg-brand-dark' : 'bg-brand-sand-light text-brand-dark hover:bg-brand-champagne-light'}`}
          >
            Agendar consulta
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          type="button"
          className={`mobile-menu-toggle ${
            isScrolled
              ? 'mobile-menu-toggle--scrolled'
              : ''
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-brand-sand-light shadow-lg border-t border-brand-sand py-4 px-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-brand-text py-2 border-b border-brand-sand last:border-0"
              >
                {link.name}
              </a>
            ))}
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            className="bg-brand-gold text-brand-sand-light px-5 py-3 rounded-full text-sm font-semibold text-center mt-2"
          >
              Agendar consulta
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
