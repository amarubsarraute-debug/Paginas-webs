import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Phone, MapPin } from 'lucide-react';
import { Reveal } from './Reveal';
import { TELEFONO_TEL, TELEFONO_LABEL, MAPS_LINK, ZONA, waLink } from '../lib/constants';

/**
 * Textos del sello institucional — adaptar por prospecto. `top` es el rubro
 * (solo poner "NOTARIAL" si el estudio realmente tiene escribanía), `name` es
 * la marca corta (sin el prefijo "Estudio Jurídico").
 */
const SEAL = {
  top: 'ESTUDIO JURÍDICO',
  name: 'Cairo Duaso',
  bottom: `${ZONA.toUpperCase()} · URUGUAY`,
};

/**
 * Sección oscura de servicios en filas editoriales que se "invierten" a papel
 * en hover (opción B elegida por Amaru — sin cards ni chips, portada de la
 * Asesoría Notarial de web-trujillo). Servicios reales del prospecto, con
 * descripción de UNA línea en minúscula — no inventar servicios.
 */
const services: { t: string; d: string }[] = [
  { t: 'Asesoramiento jurídico', d: 'orientación clara antes de dar cualquier paso' },
  { t: 'Representación legal', d: 'te representamos con estrategia definida' },
  { t: 'Resolución de asuntos legales', d: 'seguimiento del caso hasta el final' },
  { t: 'Atención personalizada', d: 'sabés quién lleva tu caso, siempre' },
  { t: 'Asistencia para particulares', d: 'gestiones y consultas en términos simples' },
  { t: 'Asistencia para empresas', d: 'lo legal y administrativo del día a día' },
];

export function Services() {
  return (
    <section id="servicios" className="bg-ink text-paper">
      <div className="container-page py-20 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-paper/55">Nos especializamos en</p>
          <h2 className="mt-5 text-balance font-display text-4xl font-medium leading-[1.08] text-paper md:text-6xl">
            Servicios <span className="font-normal italic text-bordeaux-soft">Jurídicos</span>
          </h2>
          <div className="mx-auto mt-6 h-px w-20 bg-paper/25" />
          <p className="mx-auto mt-6 max-w-xl text-pretty text-paper/70">
            Desde una consulta puntual hasta la representación completa de tu caso,
            con comunicación clara en cada etapa.
          </p>
        </Reveal>

        <ul className="mx-auto mt-12 max-w-3xl border-t border-paper/12">
          {services.map(({ t, d }, i) => (
            <li key={t} className="border-b border-paper/12">
              <a
                href={waLink(`Hola, quisiera hacer una consulta sobre ${t.toLowerCase()}.`) ?? TELEFONO_TEL}
                className="group flex flex-col gap-1 px-3 py-5 transition-colors duration-300 hover:bg-paper sm:flex-row sm:items-baseline sm:gap-5 sm:px-5"
              >
                <span className="flex items-baseline gap-4">
                  <span className="w-6 shrink-0 text-xs tabular-nums text-bordeaux-soft/80">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-xl font-medium text-paper transition-colors duration-300 group-hover:text-ink md:text-2xl">
                    {t}
                  </span>
                </span>
                <span className="pl-10 text-sm text-paper/45 transition-colors duration-300 group-hover:text-muted sm:ml-auto sm:pl-0 sm:text-right">
                  {d}
                </span>
                <ArrowRight className="hidden h-4 w-4 shrink-0 self-center text-bordeaux opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 sm:block" />
              </a>
            </li>
          ))}
        </ul>

        <InstitutionalSeal />

        <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <a
            href={TELEFONO_TEL}
            className="inline-flex items-center gap-2 rounded-md bg-bordeaux px-5 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
          >
            <Phone className="h-4 w-4" /> Llamar: {TELEFONO_LABEL}
          </a>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-paper/20 px-5 py-2.5 text-sm font-medium text-paper/85 transition-colors hover:border-bordeaux-soft hover:text-paper"
          >
            <MapPin className="h-4 w-4" /> Ver ubicación
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Sello institucional que se "estampa" al terminar de recorrer los servicios
 * (portado de web-trujillo): opacity 0→1, scale 0.9→1, rotación 4°→0 con leve
 * overshoot. IntersectionObserver vainilla; decorativo (aria-hidden).
 */
function InstitutionalSeal() {
  const ref = useRef<HTMLDivElement>(null);
  const [stamped, setStamped] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setStamped(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setStamped(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.55 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="mt-14 flex justify-center" aria-hidden="true">
      <div
        ref={ref}
        className={
          stamped
            ? 'opacity-100 [transform:scale(1)_rotate(0deg)]'
            : 'opacity-0 [transform:scale(0.9)_rotate(4deg)]'
        }
        style={{
          color: 'color-mix(in oklab, var(--color-bordeaux) 68%, var(--color-paper))',
          transition: 'opacity 0.45s ease-out, transform 0.5s cubic-bezier(0.2, 1.35, 0.4, 1)',
          willChange: 'opacity, transform',
        }}
      >
        <svg width="170" height="170" viewBox="0 0 200 200" role="presentation">
          <defs>
            <filter id="seal-ink" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" seed="7" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" />
            </filter>
            <filter id="seal-speckle">
              <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="3" stitchTiles="stitch" />
              <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.8 0 0 0 0" />
            </filter>
            <mask id="seal-mask">
              <rect width="200" height="200" fill="white" />
              <rect width="200" height="200" filter="url(#seal-speckle)" opacity="0.5" />
            </mask>
            <path id="seal-arc-top" d="M 24 100 A 76 76 0 0 1 176 100" fill="none" />
            <path id="seal-arc-bottom" d="M 37 100 A 63 63 0 0 0 163 100" fill="none" />
          </defs>
          <g filter="url(#seal-ink)" mask="url(#seal-mask)" fill="currentColor" stroke="currentColor">
            <circle cx="100" cy="100" r="96" fill="none" strokeWidth="2.5" />
            <circle cx="100" cy="100" r="89" fill="none" strokeWidth="1" />
            <circle cx="100" cy="100" r="57" fill="none" strokeWidth="1" />
            <text
              fontSize="11.5"
              letterSpacing="2.5"
              fontWeight="500"
              stroke="none"
              style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)' }}
            >
              <textPath href="#seal-arc-top" startOffset="50%" textAnchor="middle">
                {SEAL.top}
              </textPath>
            </text>
            <text
              fontSize="10"
              letterSpacing="3"
              stroke="none"
              style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)' }}
            >
              <textPath href="#seal-arc-bottom" startOffset="50%" textAnchor="middle">
                {SEAL.bottom}
              </textPath>
            </text>
            <circle cx="23" cy="100" r="2" stroke="none" />
            <circle cx="177" cy="100" r="2" stroke="none" />
            <text
              x="100"
              y="98"
              textAnchor="middle"
              fontSize="24"
              fontStyle="italic"
              stroke="none"
              style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
            >
              {SEAL.name}
            </text>
            <line x1="76" y1="110" x2="124" y2="110" strokeWidth="0.75" />
            <text
              x="100"
              y="126"
              textAnchor="middle"
              fontSize="9"
              letterSpacing="2.5"
              stroke="none"
              style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)' }}
            >
              ABOGADOS
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
