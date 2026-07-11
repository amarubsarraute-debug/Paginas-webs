import { Phone, MapPin, Star } from 'lucide-react';
import fachada from '../img/fachada.jpg';
import { TELEFONO_TEL, TELEFONO_LABEL, MAPS_LINK, ANIOS_TRAYECTORIA, RATING, CANTIDAD_RESENAS, ZONA } from '../lib/constants';

/**
 * Home "estándar": tipografía protagonista sobre fondo grafito/bordó,
 * con la única foto real (fachada) como card de apoyo, no de fondo.
 * No depende de retratos ni video — variante "rica" queda para cuando
 * haya ese material.
 */
export function Hero() {
  return (
    <section id="top" className="relative bg-ink pt-16">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(900px_500px_at_85%_-10%,color-mix(in_oklab,var(--color-bordeaux)_35%,transparent),transparent_60%)]" />
      <div className="container-page relative grid gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.24em] text-bordeaux-bright">
            <span className="h-px w-7 bg-bordeaux-bright/60" />
            Estudio jurídico en {ZONA}
          </span>
          <h1 className="mt-5 text-balance font-display text-[2.3rem] font-medium leading-[1.06] text-paper sm:text-5xl lg:text-6xl">
            Seriedad, profesionalismo y{' '}
            <span className="italic font-normal text-bordeaux-bright">cercanía</span> en cada caso.
          </h1>
          <p className="mt-5 max-w-lg text-pretty text-white/70 sm:text-lg">
            Asesoramiento y representación legal para particulares y empresas en{' '}
            {ZONA} Centro, con {ANIOS_TRAYECTORIA} años de trayectoria.
          </p>

          <div className="mt-6 flex items-center gap-2.5 text-sm text-white/70">
            <span className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-bordeaux-bright text-bordeaux-bright" />
              ))}
            </span>
            <span>
              <span className="font-semibold text-paper">{RATING.toFixed(1)}</span> · {CANTIDAD_RESENAS} reseñas en Google
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={TELEFONO_TEL}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-bordeaux-bright px-6 text-base font-medium text-paper transition-transform hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4" /> Llamar: {TELEFONO_LABEL}
            </a>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/25 bg-white/5 px-6 text-base text-paper backdrop-blur transition-colors hover:bg-white/15"
            >
              <MapPin className="h-4 w-4" /> Ver ubicación
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40 sm:mx-auto sm:max-w-sm lg:mx-0">
            <img
              src={fachada}
              alt="Oficinas del Estudio Jurídico Cairo Duaso en Maldonado"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-white/70">Nuestras oficinas</p>
              <p className="mt-1 font-display text-lg text-paper">Centro de {ZONA}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
