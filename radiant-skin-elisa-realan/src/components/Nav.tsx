import {useEffect, useState} from 'react';
import {brand, nav, waLink} from '../data';

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const darkHero = !solid && !open;

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setSolid(window.scrollY > 40);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper">
        Saltar al contenido
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid || open
            ? 'border-b border-line bg-porcelain/92 backdrop-blur-[2px]'
            : 'border-b border-transparent text-paper'
        }`}>
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-4 md:px-10 md:py-5">
          <a
            href="#top"
            className="group flex items-baseline gap-2.5"
            aria-label={`${brand.name} inicio`}>
            <span className="font-display text-[1.35rem] leading-none tracking-[0]">
              Radiant
              <span className={darkHero ? 'text-[#d8b66f]' : 'text-sage'}>
                Skin
              </span>
            </span>
            <span
              className={`t-label hidden sm:block ${
                darkHero ? '!text-paper/58' : ''
              }`}>
              {brand.professional}
            </span>
          </a>

          <nav
            aria-label="Principal"
            className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={`link-underline text-[0.94rem] transition-colors ${
                  darkHero
                    ? 'text-paper/74 hover:text-paper'
                    : 'text-graphite hover:text-ink'
                }`}>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn hidden !px-6 !py-3 text-[0.88rem] sm:inline-flex ${
                darkHero
                  ? 'bg-[#d8b66f] text-ink hover:bg-paper'
                  : 'btn-primary'
              }`}>
              Agendar
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              className={`flex h-11 w-11 items-center justify-center rounded-full border lg:hidden ${
                darkHero ? 'border-paper/45' : 'border-line'
              }`}>
              <span className="sr-only">
                {open ? 'Cerrar menu' : 'Abrir menu'}
              </span>
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-px w-full transition-all duration-300 ${
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  } ${darkHero ? 'bg-paper' : 'bg-ink'}`}
                />
                <span
                  className={`absolute left-0 h-px w-full transition-all duration-300 ${
                    open ? 'top-1.5 -rotate-45' : 'top-3'
                  } ${darkHero ? 'bg-paper' : 'bg-ink'}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-movil"
        hidden={!open}
        className="fixed inset-0 z-40 bg-porcelain px-5 pt-24 lg:hidden">
        <nav aria-label="Menu movil" className="flex flex-col">
          {nav.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-5 font-display text-3xl tracking-[0]"
              style={{opacity: open ? 1 : 0, transitionDelay: `${i * 40}ms`}}>
              {n.label}
            </a>
          ))}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-8 justify-center">
            Agendar valoración
          </a>
        </nav>
      </div>
    </>
  );
}
