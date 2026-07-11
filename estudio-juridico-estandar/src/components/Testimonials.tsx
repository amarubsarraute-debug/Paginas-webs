import { Star } from 'lucide-react';
import { RATING, CANTIDAD_RESENAS } from '../lib/constants';

// Solo el/los testimonio(s) reales del prospecto — no se inventan más
// para rellenar una grilla de 3 columnas.
const testimonials: { title: string; q: string }[] = [
  {
    title: 'Seriedad, profesionalismo y rapidez',
    q: 'Excelente!!! Soy clienta hace años: Seriedad, Profesionalismo, Rapidez, Seguridad y una Amabilidad y Atención digna de destacar. Súper recomendable!',
  },
];

export function Testimonials() {
  return (
    <section id="resenas" className="border-y border-border-subtle bg-surface/50 py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl text-balance font-display text-3xl font-medium leading-tight md:text-[2.6rem]">
            {CANTIDAD_RESENAS} reseñas, {RATING.toFixed(1)} estrellas.
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted">
            <span className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-bordeaux text-bordeaux" />
              ))}
            </span>
            Opiniones reales en Google
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((r) => (
            <figure key={r.title} className="card-elevated p-6">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-bordeaux text-bordeaux" />
                ))}
              </div>
              <h3 className="mt-4 font-display text-base font-medium">{r.title}</h3>
              <blockquote className="mt-2 text-pretty text-sm leading-relaxed text-muted">{r.q}</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
