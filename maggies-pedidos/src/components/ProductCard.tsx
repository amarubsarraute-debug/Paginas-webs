"use client";

import { useState } from "react";
import { Minus, Plus, Star, Check } from "lucide-react";
import type { MenuItem } from "@/types/menu";
import { useCart } from "@/context/CartContext";
import { formatPrice, cn } from "@/lib/utils";

/** Emoji de respaldo según categoría, para cuando el producto no tiene imagen. */
const EMOJI_POR_CATEGORIA: Record<string, string> = {
  "Menú del día": "🍽️",
  Rotisería: "🍗",
  Cafetería: "☕",
  Almuerzos: "🍴",
  Minutas: "🍔",
  Tartas: "🥧",
  Sandwiches: "🥪",
  Ensaladas: "🥗",
  Bizcochos: "🥐",
  Confitería: "🧁",
  "Take away": "🥡",
  "Servicios lunch": "🍱",
};

function emojiDe(categoria: string): string {
  return EMOJI_POR_CATEGORIA[categoria] ?? "🍽️";
}

export default function ProductCard({ item }: { item: MenuItem }) {
  const { addItem, increment, decrement, getQuantity } = useCart();
  const cantidad = getQuantity(item.id);
  const agotado = !item.disponible || (item.stock != null && item.stock <= 0);
  const [imgFallo, setImgFallo] = useState(false);
  const mostrarImagen = item.imagen.trim() !== "" && !imgFallo;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border bg-cream-50 shadow-soft transition-all duration-300",
        agotado
          ? "border-beige-dark/40 opacity-80"
          : "border-beige-dark/50 hover:-translate-y-0.5 hover:shadow-card"
      )}
    >
      {/* Imagen / placeholder */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-beige">
        {mostrarImagen ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imagen}
            alt={item.nombre}
            loading="lazy"
            onError={() => setImgFallo(true)}
            className={cn(
              "h-full w-full object-cover transition-transform duration-500",
              !agotado && "group-hover:scale-105",
              agotado && "grayscale"
            )}
          />
        ) : (
          <div
            className={cn(
              "flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_22%,#EADFC9,#DDCDAE)]",
              agotado && "grayscale"
            )}
            aria-hidden
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-50/60 text-4xl shadow-soft ring-1 ring-coffee/5 transition-transform duration-500 group-hover:scale-110">
              {emojiDe(item.categoria)}
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {item.destacado && !agotado && (
            <span className="inline-flex items-center gap-1 rounded-full bg-bordo px-2.5 py-1 text-[11px] font-semibold text-white shadow-soft">
              <Star className="h-3 w-3 fill-current" />
              Recomendado
            </span>
          )}
        </div>

        {agotado && (
          <div className="absolute inset-0 flex items-center justify-center bg-coffee-dark/35">
            <span className="rounded-full bg-coffee-dark/90 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-cream-50">
              Agotado por hoy
            </span>
          </div>
        )}

        <span className="absolute right-3 top-3 rounded-full bg-cream-50/95 px-3 py-1 text-xs font-medium text-ink-faint shadow-soft">
          {item.categoria}
        </span>
      </div>

      {/* Cuerpo */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-semibold leading-snug text-coffee-dark">
          {item.nombre}
        </h3>
        {item.descripcion && (
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-soft">
            {item.descripcion}
          </p>
        )}

        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="leading-none">
            <span className="text-xs text-ink-faint">Precio</span>
            <p className="tnum mt-1 font-display text-xl font-semibold text-coffee">
              {formatPrice(item.precio)}
            </p>
          </div>

          {agotado ? (
            <span className="rounded-full border border-beige-dark bg-beige px-4 py-2.5 text-sm font-medium text-ink-faint">
              No disponible
            </span>
          ) : cantidad === 0 ? (
            <button
              type="button"
              onClick={() => addItem(item)}
              className="inline-flex items-center gap-1.5 rounded-full bg-bordo px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-bordo-dark active:scale-95"
            >
              <Plus className="h-4 w-4" />
              Agregar
            </button>
          ) : (
            <div className="flex items-center gap-1 rounded-full border border-bordo/30 bg-cream p-1">
              <button
                type="button"
                onClick={() => decrement(item.id)}
                aria-label={`Quitar uno de ${item.nombre}`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-cream-50 text-bordo shadow-soft transition-colors hover:bg-bordo hover:text-white active:scale-95"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-7 text-center text-sm font-bold text-coffee-dark">
                {cantidad}
              </span>
              <button
                type="button"
                onClick={() => increment(item.id)}
                aria-label={`Agregar uno de ${item.nombre}`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-bordo text-white shadow-soft transition-colors hover:bg-bordo-dark active:scale-95"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {cantidad > 0 && !agotado && (
          <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-sage-dark">
            <Check className="h-3.5 w-3.5" />
            {cantidad} en tu pedido
          </p>
        )}
      </div>
    </article>
  );
}
