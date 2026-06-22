"use client";

import { Sparkles } from "lucide-react";
import type { MenuItem } from "@/types/menu";
import ProductCard from "@/components/ProductCard";

/**
 * "Recomendados de hoy": muestra los productos con destacado=true.
 * Si no hay destacados, no renderiza nada.
 */
export default function FeaturedSection({ items }: { items: MenuItem[] }) {
  const destacados = items.filter((i) => i.destacado);
  if (destacados.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-4 pt-2 sm:px-6">
      <div className="mb-5 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bordo/10 text-bordo">
          <Sparkles className="h-4.5 w-4.5" />
        </span>
        <div>
          <h2 className="font-display text-2xl font-semibold text-coffee-dark">
            Recomendados de hoy
          </h2>
          <p className="text-sm text-ink-faint">Lo más pedido para resolver tu día.</p>
        </div>
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {destacados.map((item) => (
          <div
            key={item.id}
            className="w-[15.5rem] shrink-0 snap-start sm:w-[17rem]"
          >
            <ProductCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
