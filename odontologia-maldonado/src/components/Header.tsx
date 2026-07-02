import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { WHATSAPP_LINK, CLINIC_NAME } from '../config';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { name: 'Opiniones', href: '#opiniones' },
    { name: 'Cómo trabajamos', href: '#proceso' },
    { name: 'Ubicación', href: '#ubicacion' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#inicio" className="text-xl md:text-2xl font-display font-semibold text-brand-primary tracking-tight">
          {CLINIC_NAME}
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-stone-600 hover:text-brand-primary transition-colors text-sm font-medium"
            >
              {link.name}
            </a>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-primary text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-brand-primary-light transition-colors flex items-center gap-2 shadow-sm"
          >
            <Phone size={16} />
            Agendar por WhatsApp
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-stone-800 p-2 -mr-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-stone-100 shadow-lg py-4 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-stone-600 hover:text-brand-primary font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-primary text-white px-6 py-3 rounded-xl font-medium text-center flex items-center justify-center gap-2 mt-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Phone size={18} />
            Agendar por WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
