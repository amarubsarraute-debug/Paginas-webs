"use client";

import { Plus, Check, Minus, ClipboardList } from "lucide-react";
import type { MenuItem } from "@/types/menu";
import { useCart } from "@/context/CartContext";
import { formatPrice, fechaHoyLegible, cn } from "@/lib/utils";

interface Props {
  items: MenuItem[];
}

/**
 * "Pizarra del día" — muestra los platos que el local marcó como disponibles hoy.
 * Si no hay ninguno (is_today false en todos), no renderiza nada.
 */
export default function PizarraDelDia({ items }: Props) {
  const hoy = items.filter((i) => i.isToday && i.disponible);
  if (hoy.length === 0) return null;

  const fecha = fechaHoyLegible();

  return (
    <section className="mx-auto max-w-6xl px-4 pb-2 pt-10 sm:px-6">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-bordo text-white">
          <ClipboardList className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-2xl font-semibold text-coffee-dark">
            Menú de hoy
          </h2>
          {fecha && <p className="text-sm text-ink-faint capitalize">{fecha}</p>}
        </div>
      </div>

      {/* Lista */}
      <div className="overflow-hidden rounded-3xl border border-beige-dark/70 bg-cream-50 shadow-soft divide-y divide-beige-dark/50">
        {hoy.map((item) => (
          <PizarraRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function PizarraRow({ item }: { item: MenuItem }) {
  const { addItem, increment, decrement, getQuantity } = useCart();
  const cantidad = getQuantity(item.id);

  return (
    <div className="flex items-center gap-3 px-5 py-4">
      {/* Nombre + descripción */}
      <div className="min-w-0 flex-1">
        <p className="font-display text-base font-semibold leading-snug text-coffee-dark">
          {item.nombre}
        </p>
        {item.descripcion && (
          <p className="mt-0.5 truncate text-sm text-ink-soft">{item.descripcion}</p>
        )}
      </div>

      {/* Precio */}
      <span className="tnum shrink-0 text-base font-semibold text-coffee">
        {formatPrice(item.precio)}
      </span>

      {/* Control */}
      {cantidad === 0 ? (
        <button
          type="button"
          onClick={() => addItem(item)}
          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-bordo px-3.5 py-2 text-sm font-semibold text-white shadow-soft transition-all hover:bg-bordo-dark active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Agregar
        </button>
      ) : (
        <div className="flex shrink-0 items-center gap-1 rounded-full border border-bordo/30 bg-cream p-1">
          <button
            type="button"
            onClick={() => decrement(item.id)}
            aria-label={`Quitar uno de ${item.nombre}`}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-cream-50 text-bordo transition-colors hover:bg-bordo hover:text-white active:scale-95"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="min-w-[1.5rem] text-center text-sm font-bold text-coffee-dark">
            {cantidad}
          </span>
          <button
            type="button"
            onClick={() => increment(item.id)}
            aria-label={`Agregar uno de ${item.nombre}`}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-bordo text-white transition-colors hover:bg-bordo-dark active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {cantidad > 0 && (
        <Check className="h-4 w-4 shrink-0 text-sage" />
      )}
    </div>
  );
}
