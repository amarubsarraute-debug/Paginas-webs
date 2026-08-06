/**
 * Selector de objetivos.
 *
 * El visitante entra por lo que le molesta, no por el nombre técnico. La lista
 * lleva una miniatura que persigue el cursor con un lerp (el equivalente casero
 * al spring de Framer Motion) y el panel de la derecha queda sticky con el
 * objetivo elegido y su propio CTA de WhatsApp.
 */
import {useEffect, useRef, useState} from 'react';
import {goals, waFor} from '../data';
import {Reveal, prefersReducedMotion} from '../lib/motion';

export default function Goals() {
  const [active, setActive] = useState(goals[0]);
  const [hovered, setHovered] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const target = useRef({x: 0, y: 0});
  const current = useRef({x: 0, y: 0});
  const raf = useRef(0);

  // Última miniatura apuntada: evita que la imagen se vacíe durante el fade out
  const lastHovered = useRef(goals[0].id);
  if (hovered) lastHovered.current = hovered;

  useEffect(() => {
    if (!hovered || prefersReducedMotion()) return;

    const tick = () => {
      const el = floatRef.current;
      if (!el) return;
      current.current.x += (target.current.x - current.current.x) * 0.14;
      current.current.y += (target.current.y - current.current.y) * 0.14;
      el.style.transform = `translate3d(${current.current.x.toFixed(1)}px, ${current.current.y.toFixed(1)}px, 0)`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, [hovered]);

  const onMove = (e: React.MouseEvent) => {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    target.current = {x: e.clientX - rect.left, y: e.clientY - rect.top};
    // Primer contacto: la miniatura aparece donde está el cursor, no viajando
    if (!hovered) current.current = {...target.current};
  };

  return (
    <section
      id="objetivos"
      aria-labelledby="objetivos-title"
      className="scroll-mt-24 border-y border-line bg-paper md:scroll-mt-28">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="max-w-[46ch]">
          <p className="t-label">Por dónde empezar</p>
          <h2 id="objetivos-title" className="t-h2 mt-6">
            ¿Qué te gustaría mejorar?
          </h2>
          <p className="t-lead mt-7">
            Elegí lo que te molesta y mirá con qué se suele trabajar. Lo que ves
            acá es orientación: la indicación real sale de mirarte la piel.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 xl:mt-20">
          <Reveal>
            <div
              ref={listRef}
              onMouseMove={onMove}
              onMouseLeave={() => setHovered(null)}
              className="relative border-t border-line">
              {/* Miniatura flotante — decorativa, sólo en desktop */}
              <div
                ref={floatRef}
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 z-20 hidden transition-[opacity,scale] duration-300 ease-out lg:block"
                style={{
                  opacity: hovered ? 1 : 0,
                  scale: hovered ? '1' : '0.9',
                }}>
                <img
                  src={goals.find((g) => g.id === lastHovered.current)?.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="ml-10 w-52 -translate-y-1/2 rotate-[2.5deg] border-4 border-paper object-cover shadow-[0_18px_50px_rgba(20,18,14,0.22)]"
                />
              </div>

              <ul>
                {goals.map((g) => {
                  const isActive = g.id === active.id;
                  return (
                    <li key={g.id} className="border-b border-line">
                      <button
                        type="button"
                        onClick={() => setActive(g)}
                        onMouseEnter={() => setHovered(g.id)}
                        onFocus={() => setActive(g)}
                        aria-pressed={isActive}
                        className={`group flex w-full items-center justify-between gap-4 py-5 text-left transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:gap-6 md:py-6 ${
                          isActive ? 'pl-3 md:pl-5' : 'hover:pl-2'
                        }`}>
                        <span className="flex min-w-0 items-center gap-4 md:gap-5">
                          <span className="grain relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-line md:h-[4.7rem] md:w-[4.7rem]">
                            <img
                              src={g.image}
                              alt=""
                              loading="lazy"
                              decoding="async"
                              className={`h-full w-full object-cover transition duration-500 ${
                                isActive
                                  ? 'scale-105 saturate-110'
                                  : 'saturate-[0.82] group-hover:scale-105 group-hover:saturate-100'
                              }`}
                            />
                          </span>
                          <span
                            className={`t-h3 min-w-0 transition-colors duration-300 ${
                              isActive
                                ? 'text-sage'
                                : 'text-ink group-hover:text-sage'
                            }`}>
                            {g.title}
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className={`shrink-0 text-xl transition-all duration-400 ${
                            isActive
                              ? 'translate-x-0 text-sage opacity-100'
                              : '-translate-x-2 text-graphite opacity-0 group-hover:translate-x-0 group-hover:opacity-60'
                          }`}>
                          →
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:sticky lg:top-28 lg:self-start">
            {/* key fuerza el remontaje: cada objetivo entra con su propio fade */}
            <div
              key={active.id}
              className="goal-panel grain relative overflow-hidden border border-line bg-porcelain">
              <div className="aspect-square overflow-hidden bg-line md:aspect-[5/4]">
                <img
                  src={active.image}
                  alt={active.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-7 md:p-9">
                <h3 className="t-h3 max-w-[20ch]">{active.title}</h3>
                <p className="mt-5 max-w-[46ch] text-[0.97rem] leading-relaxed text-graphite">
                  {active.treatments}
                </p>
                <a
                  href={waFor(
                    `Hola Elisa, vengo de la web. Mi objetivo es: ${active.title.toLowerCase()}. ¿Cómo seguimos?`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-8">
                  Consultar por este objetivo
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
