import { Star } from 'lucide-react';
import { RATING, CANTIDAD_RESENAS, BARRIO, ZONA, HORARIO } from '../lib/constants';

export function SocialProof() {
  return (
    <section className="border-y border-border-subtle bg-surface/60">
      <div className="container-page flex flex-col items-center gap-5 py-7 text-sm text-muted sm:flex-row sm:justify-center sm:gap-9">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-bordeaux text-bordeaux" />
            ))}
          </span>
          <span>
            <span className="font-semibold text-ink">{RATING.toFixed(1)}</span> · {CANTIDAD_RESENAS} reseñas en Google
          </span>
        </div>
        <span className="hidden h-4 w-px bg-border-subtle sm:block" />
        <span className="font-medium text-ink">
          {BARRIO}, {ZONA}
        </span>
        <span className="hidden h-4 w-px bg-border-subtle sm:block" />
        <span>{HORARIO}</span>
      </div>
    </section>
  );
}
