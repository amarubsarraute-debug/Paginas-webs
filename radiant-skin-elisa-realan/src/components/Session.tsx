/**
 * Pieza inmersiva sin fotos: el scroll avanza los cuatro momentos de la
 * valoracion usando tipografia, numero grande, chips y barra de progreso.
 */
import {useEffect, useState} from 'react';
import {marquee, session} from '../data';
import {Reveal, prefersReducedMotion, useScrollProgress} from '../lib/motion';

const steps = session.steps;

const stepMeta = [
  {
    cue: 'Deseo',
    items: ['Flacidez', 'Textura', 'Manchas', 'Brote'],
  },
  {
    cue: 'Tolerancia',
    items: ['Barrera', 'Rutina actual', 'Sensibilidad', 'Tiempo'],
  },
  {
    cue: 'Tecnologia',
    items: ['HIFU', 'IPL', 'PDRN', 'Mesoterapia'],
  },
  {
    cue: 'Sosten',
    items: ['Orden', 'Sesiones', 'Control', 'Casa'],
  },
];

export default function Session() {
  const {ref, progress} = useScrollProgress<HTMLDivElement>();
  const [reduced, setReduced] = useState(false);

  useEffect(() => setReduced(prefersReducedMotion()), []);

  const active = Math.min(
    steps.length - 1,
    Math.max(0, Math.floor(progress * steps.length * 0.999)),
  );

  return (
    <section
      aria-labelledby="sesion-title"
      className="relative bg-ink text-porcelain">
      <KineticStrip />

      {reduced ? (
        <StackedFallback />
      ) : (
        <div ref={ref} className="relative" style={{height: '360vh'}}>
          <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
            <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10">
              <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-10">
                <ol
                  className="order-2 hidden gap-5 md:order-1 md:col-span-2 md:flex md:flex-col md:gap-4"
                  aria-hidden>
                  {steps.map((s, i) => (
                    <li
                      key={s.k}
                      className="t-label !text-[0.62rem] transition-all duration-500"
                      style={{
                        color:
                          i === active
                            ? 'var(--color-glow)'
                            : 'rgba(242,238,231,0.28)',
                        transform:
                          i === active ? 'translateX(6px)' : 'translateX(0)',
                      }}>
                      {s.k}
                    </li>
                  ))}
                </ol>

                <div className="order-1 md:order-2 md:col-span-5">
                  <p className="t-label !text-glow">{session.label}</p>
                  <h2 id="sesion-title" className="t-h2 mt-5">
                    {session.title}
                  </h2>

                  <div className="relative mt-6 min-h-[12rem] md:mt-8 md:min-h-[15rem]">
                    {steps.map((s, i) => (
                      <div
                        key={s.k}
                        aria-hidden={i !== active}
                        className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{
                          opacity: i === active ? 1 : 0,
                          transform:
                            i === active
                              ? 'none'
                              : `translateY(${i < active ? -18 : 18}px)`,
                          pointerEvents: i === active ? 'auto' : 'none',
                        }}>
                        <h3 className="t-h3 max-w-[20ch]">{s.t}</h3>
                        <p className="mt-4 max-w-[44ch] text-[0.98rem] leading-relaxed text-porcelain/65">
                          {s.d}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 h-px w-full max-w-sm bg-porcelain/20">
                    <div
                      className="h-px bg-glow"
                      style={{
                        transform: `scaleX(${progress})`,
                        transformOrigin: 'left',
                      }}
                    />
                  </div>
                </div>

                <div className="order-3 md:col-span-5">
                  <div className="relative overflow-hidden border border-porcelain/14 bg-porcelain/[0.035] p-6 md:min-h-[70vh] md:p-8">
                    <div
                      aria-hidden
                      className="absolute -right-20 -top-20 h-60 w-60 rounded-full border border-glow/25"
                      style={{
                        transform: `scale(${(1 + progress * 0.42).toFixed(
                          3,
                        )})`,
                      }}
                    />
                    <div
                      aria-hidden
                      className="absolute -bottom-24 left-10 h-72 w-72 rounded-full border border-sage-soft/22"
                      style={{
                        transform: `scale(${(1.25 - progress * 0.28).toFixed(
                          3,
                        )})`,
                      }}
                    />

                    <div className="relative flex min-h-[26rem] flex-col justify-between md:min-h-[calc(70vh-4rem)]">
                      <div>
                        <p className="t-label !text-glow">
                          Ruta {String(active + 1).padStart(2, '0')} / 04
                        </p>
                        <p
                          aria-hidden
                          className="mt-5 font-display text-[clamp(7rem,16vw,13rem)] font-light leading-[0.8] tracking-[-0.05em] text-porcelain/10">
                          {String(active + 1).padStart(2, '0')}
                        </p>
                      </div>

                      <div className="relative mt-8 min-h-[12rem]">
                        {steps.map((s, i) => (
                          <div
                            key={s.k}
                            aria-hidden={i !== active}
                            className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                            style={{
                              opacity: i === active ? 1 : 0,
                              transform:
                                i === active
                                  ? 'none'
                                  : `translateY(${i < active ? -18 : 18}px)`,
                              pointerEvents: i === active ? 'auto' : 'none',
                            }}>
                            <p className="t-label !text-glow">
                              {stepMeta[i].cue}
                            </p>
                            <ul className="mt-5 grid grid-cols-2 gap-2">
                              {stepMeta[i].items.map((item) => (
                                <li
                                  key={item}
                                  className="border border-porcelain/14 px-3 py-3 text-[0.9rem] leading-tight text-porcelain/72">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <ol className="relative mt-10 grid grid-cols-4 border-t border-porcelain/16 pt-5">
                        {steps.map((s, i) => (
                          <li
                            key={s.k}
                            className="pr-3 text-[0.75rem] leading-tight transition-colors duration-500"
                            style={{
                              color:
                                i === active
                                  ? 'var(--color-glow)'
                                  : 'rgba(242,238,231,0.42)',
                            }}>
                            <span className="t-label !text-inherit">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="mt-2 hidden md:block">
                              {stepMeta[i].cue}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function KineticStrip() {
  const row = [...marquee, ...marquee];
  return (
    <div
      aria-hidden
      className="overflow-hidden border-y border-porcelain/12 py-6 md:py-8">
      <div className="marquee-track marquee-anim">
        {row.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="flex shrink-0 items-center gap-8 whitespace-nowrap px-8 font-display text-[clamp(2rem,5.5vw,4.5rem)] leading-none tracking-[-0.04em] text-porcelain/22">
            {w}
            <span className="text-glow/50 text-[0.35em]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function StackedFallback() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
      <p className="t-label !text-glow">{session.label}</p>
      <h2 id="sesion-title" className="t-h2 mt-5 max-w-[16ch]">
        {session.title}
      </h2>
      <ol className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
        {steps.map((s, i) => (
          <Reveal
            as="li"
            key={s.k}
            className="border border-porcelain/14 p-6">
            <p className="t-label !text-glow">{s.k}</p>
            <h3 className="t-h3 mt-3">{s.t}</h3>
            <p className="mt-3 max-w-[46ch] text-[0.97rem] leading-relaxed text-porcelain/65">
              {s.d}
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-2">
              {stepMeta[i].items.map((item) => (
                <li
                  key={item}
                  className="border border-porcelain/14 px-3 py-3 text-[0.9rem] text-porcelain/72">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
