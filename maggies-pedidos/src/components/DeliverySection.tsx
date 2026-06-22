import { Store, Bike, Clock, BadgeCheck, MessageCircle } from "lucide-react";
import { businessConfig } from "@/config/business";
import { linkWhatsAppSimple } from "@/lib/whatsapp";

export default function DeliverySection() {
  return (
    <section className="py-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-beige-dark/50 bg-gradient-to-br from-coffee to-coffee-dark text-cream-50 shadow-card">
          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-cream-200/80">
                Retiro o delivery
              </span>
              <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
                Pasás a retirar o te lo enviamos
              </h2>
              <p className="mt-3 max-w-lg text-cream-200/90">
                Coordiná tu pedido por WhatsApp. Te confirmamos disponibilidad, demora
                y costo de envío antes de prepararlo.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl bg-cream-50/10 p-4">
                  <Store className="mt-0.5 h-5 w-5 shrink-0 text-cream-100" />
                  <div>
                    <p className="font-semibold">Retiro en el local</p>
                    <p className="text-sm text-cream-200/80">
                      {businessConfig.addressShort}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-cream-50/10 p-4">
                  <Bike className="mt-0.5 h-5 w-5 shrink-0 text-cream-100" />
                  <div>
                    <p className="font-semibold">Delivery a domicilio</p>
                    <p className="text-sm text-cream-200/80">
                      Consultá zona y costo de envío.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href={linkWhatsAppSimple(
                  `Hola ${businessConfig.name}, quiero consultar por un envío a domicilio.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-card transition-transform hover:brightness-105 active:scale-95"
              >
                <MessageCircle className="h-4 w-4" />
                Consultar por WhatsApp
              </a>
            </div>

            <ul className="flex flex-col justify-center gap-4 rounded-3xl bg-cream-50/5 p-6">
              {[
                { icon: BadgeCheck, t: "Te confirmamos disponibilidad y demora por WhatsApp." },
                { icon: Clock, t: "Pedí con tiempo en horarios pico del mediodía." },
                { icon: Store, t: "Take away listo para retirar sin esperas." },
              ].map((it) => {
                const Icon = it.icon;
                return (
                  <li key={it.t} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream-50/15">
                      <Icon className="h-4.5 w-4.5 text-cream-100" />
                    </span>
                    <span className="text-sm text-cream-100">{it.t}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
