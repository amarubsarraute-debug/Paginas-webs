import { useEffect, useState } from 'react';
import { Menu, X, Phone, Scale } from 'lucide-react';
import { NAV, NEGOCIO, TELEFONO_TEL, TELEFONO_LABEL } from '../lib/constants';

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid || open
          ? 'border-b border-border-subtle bg-paper/90 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-md border border-bordeaux/30 bg-bordeaux/10">
            <Scale className="h-4 w-4 text-bordeaux" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[16px] font-semibold tracking-tight text-ink">
              Cairo Duaso
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted">
              Estudio Jurídico
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-muted transition-colors hover:text-ink">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={TELEFONO_TEL}
            className="inline-flex items-center gap-2 rounded-md bg-bordeaux px-4 py-2 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
          >
            <Phone className="h-4 w-4" /> {TELEFONO_LABEL}
          </a>
        </div>

        <button
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="grid h-10 w-10 place-items-center rounded-md border border-border-subtle text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border-subtle bg-paper/95 backdrop-blur lg:hidden">
          <div className="container-page flex flex-col gap-3 py-4">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2 text-ink">
                {n.label}
              </a>
            ))}
            <a
              href={TELEFONO_TEL}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-bordeaux px-4 py-2.5 text-sm font-medium text-paper"
            >
              <Phone className="h-4 w-4" /> Llamar: {TELEFONO_LABEL}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
