import { useState } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';
import { BRAND_DESCRIPTOR, BRAND_NAME, CONTACT_LABEL, CONTACT_URL } from '../data';
import logoImage from '../assets/aura-clinic/aura-clinic-logo.png';

const navItems = [
  { href: '/#tratamientos', label: 'Tratamientos' },
  { href: '/#profesionales', label: 'Equipo' },
  { href: '/#casos', label: 'Resultados' },
  { href: '/#testimonios', label: 'Testimonios' },
  { href: '/#tecnologia', label: 'Tecnología' },
  { href: '/#ubicaciones', label: 'Sedes' }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-accent/18 bg-brand-dark/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="/" className="group flex items-center gap-3" aria-label="Ir al inicio">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-brand-gold/40 bg-brand-ivory p-1">
            <img src={logoImage} alt="" className="h-full w-full rounded-full object-cover" />
          </span>
          <span className="leading-none">
            <span className="block whitespace-nowrap font-serif text-xl text-brand-ivory md:text-2xl">{BRAND_NAME}</span>
            <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.20em] text-brand-accent">
              {BRAND_DESCRIPTOR}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-4 text-sm font-semibold text-brand-ivory/68 xl:gap-6 lg:flex" aria-label="Navegación principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-brand-accent">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-12 items-center justify-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-dark shadow-[0_18px_42px_rgba(200,169,79,0.22)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold active:translate-y-0 md:inline-flex"
          >
            <MessageCircle size={17} />
            {CONTACT_LABEL}
          </a>

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-full border border-brand-accent/26 bg-brand-ivory/8 text-brand-ivory lg:hidden"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-brand-accent/18 bg-brand-dark px-5 pb-5 pt-2 lg:hidden">
          <nav className="grid gap-1" aria-label="Navegación móvil">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-brand-ivory hover:bg-brand-ivory/8"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-button mt-3 flex w-full"
          >
            <MessageCircle size={17} />
            {CONTACT_LABEL}
          </a>
        </div>
      )}
    </header>
  );
}
