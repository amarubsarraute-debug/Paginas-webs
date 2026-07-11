import { useEffect, useRef, useState } from 'react';
import { TELEFONO_TEL, TELEFONO_LABEL } from '../lib/constants';
import { Phone } from 'lucide-react';

const processSteps = [
  { n: '01', t: 'Primer contacto', d: 'Llamás o visitás el estudio y nos contás tu situación.' },
  { n: '02', t: 'Análisis del caso', d: 'Revisamos la documentación y evaluamos las opciones disponibles.' },
  { n: '03', t: 'Asesoramiento claro', d: 'Te explicamos el camino a seguir en términos simples.' },
  { n: '04', t: 'Gestión y seguimiento', d: 'Avanzamos con tu caso manteniéndote informado en cada etapa.' },
];

export function Process() {
  return (
    <section id="proceso" className="container-page py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-balance font-display text-3xl font-medium leading-tight md:text-[2.6rem]">
            Un proceso claro, sin sorpresas
          </h2>
          <p className="mt-5 max-w-md text-pretty text-muted">
            Comunicación responsable en cada paso, desde el primer contacto hasta la
            resolución de tu caso.
          </p>
          <a
            href={TELEFONO_TEL}
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-bordeaux px-5 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
          >
            <Phone className="h-4 w-4" /> Llamar: {TELEFONO_LABEL}
          </a>
        </div>

        <ol className="relative">
          {processSteps.map((s, i) => (
            <ProcessStep key={s.n} step={s} isLast={i === processSteps.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * Paso que se "enciende" en bordó suave al entrar en viewport
 * (IntersectionObserver vainilla, portado de web-trujillo).
 * Una vez encendido queda encendido: se lee como progreso al scrollear.
 */
function ProcessStep({
  step,
  isLast,
}: {
  step: { n: string; t: string; d: string };
  isLast: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: '0px 0px -40% 0px', threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <li className={`relative flex gap-6 md:gap-8 ${isLast ? '' : 'pb-12'}`} ref={ref}>
      <div className="flex flex-col items-center">
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border font-display text-base transition-all duration-700 ${
            active
              ? 'border-bordeaux bg-bordeaux/10 text-bordeaux shadow-[0_0_26px] shadow-bordeaux/25'
              : 'border-border-subtle bg-paper text-muted'
          }`}
        >
          {step.n}
        </span>
        {!isLast && (
          <span className="relative mt-2 w-px flex-1 overflow-hidden bg-border-subtle">
            <span
              className={`absolute inset-x-0 top-0 bg-gradient-to-b from-bordeaux/70 to-bordeaux/10 transition-[height] duration-700 ease-out ${
                active ? 'h-full' : 'h-0'
              }`}
            />
          </span>
        )}
      </div>
      <div className="pt-2.5">
        <h3
          className={`font-display text-2xl font-medium leading-snug transition-colors duration-500 ${
            active ? 'text-ink' : 'text-muted'
          }`}
        >
          {step.t}
        </h3>
        <p className="mt-2 max-w-md text-pretty text-muted">{step.d}</p>
      </div>
    </li>
  );
}
