import { Check, ArrowRight } from 'lucide-react';
import { Reveal, SectionLabel } from './Reveal';
import { ANIOS_TRAYECTORIA, TELEFONO_TEL } from '../lib/constants';

/**
 * Bloque "por qué elegirnos": reemplaza al home con retratos de la variante
 * "rica" — apoyado en el testimonio real y en la trayectoria, no en fotos
 * de equipo que este prospecto no tiene.
 */
export function Trust() {
  return (
    <section className="container-page py-20 md:py-28">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionLabel>Por qué elegirnos</SectionLabel>
          <h2 className="mt-4 text-balance font-display text-3xl font-medium leading-tight md:text-[2.6rem]">
            {ANIOS_TRAYECTORIA} años de trayectoria, con seriedad y atención cercana
          </h2>
          <ul className="mt-8 space-y-4">
            {[
              'Seriedad y profesionalismo en cada gestión.',
              'Rapidez y seguridad en el seguimiento de tu caso.',
              'Amabilidad y atención personalizada, de principio a fin.',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-pretty text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-bordeaux" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card-elevated p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bordeaux">Reseña real</p>
            <blockquote className="mt-4 text-pretty font-display text-xl font-medium leading-snug text-ink md:text-2xl">
              "Excelente!!! Soy clienta hace años: Seriedad, Profesionalismo, Rapidez,
              Seguridad y una Amabilidad y Atención digna de destacar. Súper recomendable!"
            </blockquote>
            <p className="mt-4 text-sm text-muted">Reseña de Google · 5.0★</p>
            <a
              href={TELEFONO_TEL}
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-bordeaux px-5 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
            >
              Contanos tu caso <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
