import { Clock, MapPin, UtensilsCrossed, MessageCircle } from "lucide-react";
import { businessConfig } from "@/config/business";
import { linkWhatsAppSimple } from "@/lib/whatsapp";

/**
 * Devuelve el horario de hoy ("8:00 - 18:30" o "Cerrado") según el día.
 * Se calcula en el render del servidor; suficiente para un texto informativo.
 */
function horarioDeHoy(): string {
  const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const hoy = dias[new Date().getDay()];
  const match = businessConfig.hours.find((h) => h.day === hoy);
  return match ? match.hours : "";
}

export default function Hero() {
  const horario = horarioDeHoy();
  const abierto = horario !== "" && horario.toLowerCase() !== "cerrado";

  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* fondo cálido con textura suave */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-cream-50 via-cream to-beige" />
      <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-bordo/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 top-40 -z-10 h-64 w-64 rounded-full bg-coffee/5 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Columna texto */}
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-beige-dark bg-cream-50/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-coffee">
              <UtensilsCrossed className="h-3.5 w-3.5 text-bordo" />
              Cafetería &amp; Rotisería en {businessConfig.city}
            </span>

            <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-coffee-dark sm:text-6xl lg:text-[4.2rem]">
              Menú del día y pedidos directos por{" "}
              <span className="italic text-bordo">WhatsApp</span>
            </h1>


            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-bordo px-6 py-3.5 text-sm font-semibold text-white shadow-card transition-all hover:bg-bordo-dark hover:shadow-lift active:scale-[0.98]"
              >
                <UtensilsCrossed className="h-4 w-4" />
                Ver menú de hoy
              </a>
              <a
                href={linkWhatsAppSimple()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-coffee/20 bg-cream-50 px-6 py-3.5 text-sm font-semibold text-coffee transition-all hover:border-coffee/40 hover:bg-cream active:scale-[0.98]"
              >
                <MessageCircle className="h-4 w-4 text-sage" />
                Hacer pedido
              </a>
            </div>

            {/* horario + ubicación resumida */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-soft">
              <span className="inline-flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    abierto ? "bg-sage" : "bg-ink-faint"
                  }`}
                />
                <Clock className="h-4 w-4 text-coffee-light" />
                {abierto ? (
                  <>
                    Hoy: <strong className="font-semibold text-coffee">{horario}</strong>
                  </>
                ) : (
                  <span className="text-ink-faint">Hoy cerrado · revisá horarios</span>
                )}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-coffee-light" />
                {businessConfig.addressShort}
              </span>
            </div>
          </div>

          {/* Columna tarjeta visual */}
          <div className="animate-scale-in">
            <div className="relative mx-auto max-w-md rounded-3xl border border-beige-dark/60 bg-cream-50 p-6 shadow-card sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-bordo">
                    Recomendado de hoy
                  </p>
                  <p className="mt-1 font-display text-2xl font-semibold text-coffee-dark">
                    Menú casero
                  </p>
                </div>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-beige text-3xl">
                  🍽️
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  { emoji: "🥩", n: "Milanesa c/ fritas", p: "$280" },
                  { emoji: "🍔", n: "Hamburguesa completa", p: "$285" },
                  { emoji: "☕", n: "Capuchino + ½ sándwich", p: "$250" },
                ].map((it) => (
                  <div
                    key={it.n}
                    className="flex items-center justify-between rounded-2xl bg-cream px-4 py-3"
                  >
                    <span className="flex items-center gap-3 text-sm font-medium text-coffee-dark">
                      <span className="text-xl">{it.emoji}</span>
                      {it.n}
                    </span>
                    <span className="tnum text-sm font-semibold text-coffee">{it.p}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-2xl bg-sage-light px-4 py-3 text-xs text-sage-dark">
                <MessageCircle className="h-4 w-4 shrink-0" />
                Te confirmamos disponibilidad y demora por WhatsApp.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
