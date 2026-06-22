import { MapPin, Phone, Instagram, MessageCircle } from "lucide-react";
import { businessConfig } from "@/config/business";
import { linkWhatsAppSimple } from "@/lib/whatsapp";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-beige-dark/60 bg-coffee-dark text-cream-200">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-50 font-display text-xl text-coffee-dark">
                M
              </span>
              <span className="font-display text-xl font-semibold text-cream-50">
                {businessConfig.name}
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-cream-200/70">
              {businessConfig.shortDescription}
            </p>
          </div>

          <div className="text-sm">
            <h3 className="font-semibold text-cream-50">Contacto</h3>
            <ul className="mt-3 space-y-2.5 text-cream-200/80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {businessConfig.address}, {businessConfig.city}
              </li>
              <li>
                <a
                  href={`tel:${businessConfig.phone}`}
                  className="flex items-center gap-2 transition-colors hover:text-cream-50"
                >
                  <Phone className="h-4 w-4" />
                  {businessConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={businessConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-cream-50"
                >
                  <Instagram className="h-4 w-4" />
                  {businessConfig.instagramHandle}
                </a>
              </li>
            </ul>
          </div>

          <div className="text-sm">
            <h3 className="font-semibold text-cream-50">Pedidos</h3>
            <p className="mt-3 text-cream-200/70">
              Armá tu pedido desde el menú y envialo directo por WhatsApp.
            </p>
            <a
              href={linkWhatsAppSimple()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:brightness-105 active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              Pedir por WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-cream-50/10 pt-6 text-xs text-cream-200/60 sm:flex-row">
          <p>
            © {year} {businessConfig.name} · {businessConfig.city}, {businessConfig.country}
          </p>
          <p>
            Menú y precios sujetos a disponibilidad del día.{" "}
            <a href="/guia-menu" className="underline-offset-2 hover:text-cream-50 hover:underline">
              Actualizar menú
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
