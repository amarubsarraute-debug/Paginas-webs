import { MapPin, Navigation, Phone, Instagram, Clock } from "lucide-react";
import { businessConfig } from "@/config/business";

/** Link a Google Maps: usa el de config o arma uno con la dirección. */
function mapsUrl(): string {
  if (businessConfig.googleMapsUrl.trim()) return businessConfig.googleMapsUrl.trim();
  const q = encodeURIComponent(
    `${businessConfig.address}, ${businessConfig.city}, ${businessConfig.country}`
  );
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

function hoyEs(day: string): boolean {
  const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  return dias[new Date().getDay()] === day;
}

export default function LocationSection() {
  return (
    <section id="ubicacion" className="scroll-mt-20 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Datos + acciones */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-bordo">
              Dónde estamos
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-coffee-dark sm:text-4xl">
              Pasá por Maggie&apos;s
            </h2>

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-beige-dark/50 bg-cream-50 p-4 shadow-soft">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-bordo" />
              <div>
                <p className="font-semibold text-coffee-dark">{businessConfig.address}</p>
                <p className="text-sm text-ink-soft">
                  {businessConfig.city}, {businessConfig.country}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              <a
                href={mapsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-coffee px-4 py-3 text-sm font-semibold text-cream-50 shadow-soft transition-colors hover:bg-coffee-dark"
              >
                <Navigation className="h-4 w-4" />
                Cómo llegar
              </a>
              <a
                href={`tel:${businessConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-coffee/20 bg-cream-50 px-4 py-3 text-sm font-semibold text-coffee transition-colors hover:border-coffee/40 hover:bg-cream"
              >
                <Phone className="h-4 w-4" />
                Llamar
              </a>
              <a
                href={businessConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-coffee/20 bg-cream-50 px-4 py-3 text-sm font-semibold text-coffee transition-colors hover:border-coffee/40 hover:bg-cream"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
            </div>

            <p className="mt-3 text-sm text-ink-faint">
              Tel: {businessConfig.phoneDisplay} · {businessConfig.instagramHandle}
            </p>
          </div>

          {/* Horarios */}
          <div className="rounded-3xl border border-beige-dark/50 bg-cream-50 p-6 shadow-soft sm:p-7">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-beige text-coffee">
                <Clock className="h-4.5 w-4.5" />
              </span>
              <h3 className="font-display text-xl font-semibold text-coffee-dark">
                Horarios de atención
              </h3>
            </div>

            <ul className="mt-5 divide-y divide-beige-dark/40">
              {businessConfig.hours.map((h) => {
                const esHoy = hoyEs(h.day);
                const cerrado = h.hours.toLowerCase() === "cerrado";
                return (
                  <li
                    key={h.day}
                    className={`flex items-center justify-between py-2.5 text-sm ${
                      esHoy ? "font-semibold text-coffee-dark" : "text-ink-soft"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {h.day}
                      {esHoy && (
                        <span className="rounded-full bg-bordo/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-bordo">
                          Hoy
                        </span>
                      )}
                    </span>
                    <span className={cerrado ? "text-ink-faint" : ""}>{h.hours}</span>
                  </li>
                );
              })}
            </ul>

            <p className="mt-4 rounded-2xl bg-beige/60 px-4 py-3 text-xs text-coffee-light">
              Los horarios pueden ajustarse según el día. Ante la duda, consultanos por
              WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
