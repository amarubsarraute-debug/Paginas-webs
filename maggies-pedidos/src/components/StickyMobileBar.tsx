"use client";

import { UtensilsCrossed, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { linkWhatsAppSimple } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/utils";

/**
 * Barra inferior fija, sólo visible en mobile. Tres accesos rápidos:
 * Ver menú · Carrito (con subtotal y contador) · WhatsApp.
 * Se oculta cuando el drawer del carrito está abierto.
 */
export default function StickyMobileBar() {
  const { cantidadTotal, subtotal, openCart, isOpen } = useCart();

  if (isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-beige-dark/60 bg-cream-50/95 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-xl items-stretch gap-2 px-3 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
        <a
          href="#menu"
          className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5 text-ink-soft transition-colors hover:text-coffee"
        >
          <UtensilsCrossed className="h-5 w-5" />
          <span className="text-[11px] font-medium">Menú</span>
        </a>

        <button
          type="button"
          onClick={openCart}
          className="relative flex flex-[1.6] items-center justify-center gap-2 rounded-2xl bg-coffee px-3 py-2 text-cream-50 shadow-soft transition-all active:scale-[0.98]"
        >
          <span className="relative">
            <ShoppingBag className="h-5 w-5" />
            {cantidadTotal > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-bordo px-1 text-[10px] font-bold text-white ring-2 ring-coffee">
                {cantidadTotal}
              </span>
            )}
          </span>
          <span className="flex flex-col items-start leading-tight">
            <span className="text-sm font-semibold">Carrito</span>
            {cantidadTotal > 0 && (
              <span className="text-[11px] text-cream-200/90">
                {formatPrice(subtotal)}
              </span>
            )}
          </span>
        </button>

        <a
          href={linkWhatsAppSimple()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5 text-sage-dark transition-colors hover:text-sage"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-[11px] font-medium">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
