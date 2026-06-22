"use client";

import { useEffect, useState } from "react";
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  UtensilsCrossed,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn, formatPrice } from "@/lib/utils";
import CheckoutForm from "@/components/CheckoutForm";

type Paso = "carrito" | "checkout";

export default function CartDrawer() {
  const {
    items,
    subtotal,
    cantidadTotal,
    isOpen,
    increment,
    decrement,
    removeItem,
    clear,
    closeCart,
  } = useCart();

  const [paso, setPaso] = useState<Paso>("carrito");

  // Al cerrar el drawer o vaciar el carrito, volvemos al paso 1.
  useEffect(() => {
    if (!isOpen) setPaso("carrito");
  }, [isOpen]);
  useEffect(() => {
    if (items.length === 0) setPaso("carrito");
  }, [items.length]);

  // Cerrar con tecla Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const vacio = items.length === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-stretch sm:justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-coffee-dark/40 backdrop-blur-sm animate-fade-in"
        onClick={closeCart}
        aria-hidden
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Tu pedido"
        className={cn(
          "relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-cream shadow-drawer animate-slide-up",
          "sm:h-full sm:max-h-full sm:w-full sm:max-w-md sm:rounded-t-none sm:rounded-l-3xl sm:animate-slide-in"
        )}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between border-b border-beige-dark/60 bg-cream-50 px-4 py-4 sm:px-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-coffee text-cream-50">
              <ShoppingBag className="h-4 w-4" />
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold leading-tight text-coffee-dark">
                {paso === "carrito" ? "Tu pedido" : "Tus datos"}
              </h2>
              <p className="text-xs text-ink-faint">
                {vacio
                  ? "Todavía no agregaste nada"
                  : `${cantidadTotal} ${cantidadTotal === 1 ? "producto" : "productos"}`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Cerrar"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-beige hover:text-coffee"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Contenido */}
        {vacio ? (
          <EmptyCart onClose={closeCart} />
        ) : paso === "checkout" ? (
          <CheckoutForm onBack={() => setPaso("carrito")} />
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-5">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex gap-3 rounded-2xl border border-beige-dark/50 bg-cream-50 p-3 shadow-soft"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="truncate font-medium text-coffee-dark">
                        {it.nombre}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeItem(it.id)}
                        aria-label={`Eliminar ${it.nombre}`}
                        className="shrink-0 text-ink-faint transition-colors hover:text-bordo"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-ink-faint">{it.categoria}</p>

                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-beige-dark bg-cream p-0.5">
                        <button
                          type="button"
                          onClick={() => decrement(it.id)}
                          aria-label="Restar"
                          className="flex h-7 w-7 items-center justify-center rounded-full text-coffee transition-colors hover:bg-bordo hover:text-white"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-bold text-coffee-dark">
                          {it.cantidad}
                        </span>
                        <button
                          type="button"
                          onClick={() => increment(it.id)}
                          aria-label="Sumar"
                          className="flex h-7 w-7 items-center justify-center rounded-full text-coffee transition-colors hover:bg-bordo hover:text-white"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-coffee">
                          {formatPrice(it.precio * it.cantidad)}
                        </p>
                        <p className="text-[11px] text-ink-faint">
                          {formatPrice(it.precio)} c/u
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={clear}
                className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-ink-faint transition-colors hover:text-bordo"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Vaciar carrito
              </button>
            </div>

            {/* Pie */}
            <div className="border-t border-beige-dark/60 bg-cream-50 px-4 py-4 sm:px-5">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm text-ink-soft">Subtotal estimado</span>
                <span className="font-display text-2xl font-semibold text-coffee-dark">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mb-3 text-[11px] text-ink-faint">
                El total final, el stock y el costo de envío se confirman por WhatsApp.
              </p>
              <button
                type="button"
                onClick={() => setPaso("checkout")}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-bordo px-6 py-3.5 text-sm font-semibold text-white shadow-card transition-all hover:bg-bordo-dark active:scale-[0.98]"
              >
                Continuar
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-beige text-coffee">
        <ShoppingBag className="h-8 w-8" />
      </span>
      <h3 className="mt-4 font-display text-xl font-semibold text-coffee-dark">
        Tu carrito está vacío
      </h3>
      <p className="mt-1.5 max-w-xs text-sm text-ink-soft">
        Agregá productos del menú de hoy y armá tu pedido para enviarlo por WhatsApp.
      </p>
      <a
        href="#menu"
        onClick={onClose}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-bordo px-6 py-3 text-sm font-semibold text-white shadow-card transition-colors hover:bg-bordo-dark"
      >
        <UtensilsCrossed className="h-4 w-4" />
        Ver menú de hoy
      </a>
    </div>
  );
}
