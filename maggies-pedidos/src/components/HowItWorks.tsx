import { Eye, ShoppingBag, MessageCircle, UtensilsCrossed } from "lucide-react";

const PASOS = [
  {
    icon: Eye,
    titulo: "Mirás el menú actualizado",
    texto: "Entrás al link y ves los platos disponibles hoy, con precio y estado.",
  },
  {
    icon: ShoppingBag,
    titulo: "Agregás tus productos",
    texto: "Elegís lo que querés, ajustás cantidades y armás tu carrito en segundos.",
  },
  {
    icon: MessageCircle,
    titulo: "Enviás el pedido",
    texto: "Completás tus datos y mandás el pedido ya ordenado, sin escribir en el grupo.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Intro */}
          <div className="lg:pt-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-bordo">
              Simple y rápido
            </span>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-coffee-dark sm:text-5xl">
              Pedí en 3 pasos
            </h2>
            <p className="mt-5 max-w-md text-ink-soft">
              Usamos WhatsApp para confirmar tu pedido, pero el menú y la selección los
              hacés desde acá. Más rápido y más ordenado.
            </p>
            <a
              href="#menu"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-coffee px-6 py-3 text-sm font-semibold text-cream-50 shadow-soft transition-all hover:bg-coffee-dark active:scale-[0.98]"
            >
              <UtensilsCrossed className="h-4 w-4" />
              Ver menú de hoy
            </a>
          </div>

          {/* Línea de tiempo */}
          <ol className="relative space-y-9 border-l border-beige-dark pl-10">
            {PASOS.map((paso, i) => {
              const Icon = paso.icon;
              return (
                <li key={paso.titulo} className="relative">
                  <span className="absolute -left-[3.3rem] flex h-10 w-10 items-center justify-center rounded-full border border-beige-dark bg-cream-50 text-bordo shadow-soft">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="tnum font-display text-4xl font-semibold text-beige-dark">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-coffee-dark">
                      {paso.titulo}
                    </h3>
                  </div>
                  <p className="mt-1.5 max-w-md leading-relaxed text-ink-soft">{paso.texto}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
