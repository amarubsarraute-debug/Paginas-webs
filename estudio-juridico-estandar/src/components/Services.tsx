import { ArrowRight, Phone, MapPin } from 'lucide-react';
import { Reveal } from './Reveal';
import { TELEFONO_TEL, TELEFONO_LABEL, MAPS_LINK, waLink } from '../lib/constants';

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
