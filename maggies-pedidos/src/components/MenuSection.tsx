"use client";

import { useMemo, useState } from "react";
import { Search, CalendarCheck, AlertCircle, SearchX } from "lucide-react";
import type { EstadoMenu, MenuItem } from "@/types/menu";
import { getCategorias } from "@/lib/menu";
import { cn, fechaHoyLegible } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";

interface MenuSectionProps {
  items: MenuItem[];
  estado: EstadoMenu;
  cargando: boolean;
}

export default function MenuSection({ items, estado, cargando }: MenuSectionProps) {
  const [categoria, setCategoria] = useState("Todo");
  const [busqueda, setBusqueda] = useState("");

  const categorias = useMemo(() => getCategorias(items), [items]);
  const fecha = useMemo(() => fechaHoyLegible(), []);

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return items.filter((it) => {
      const okCat = categoria === "Todo" || it.categoria === categoria;
      const okBusqueda =
        q === "" ||
        it.nombre.toLowerCase().includes(q) ||
        it.descripcion.toLowerCase().includes(q) ||
        it.categoria.toLowerCase().includes(q);
      return okCat && okBusqueda;
    });
  }, [items, categoria, busqueda]);

  return (
    <section id="menu" className="scroll-mt-20 bg-cream py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Encabezado */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold text-coffee-dark sm:text-4xl">
              Elegí qué vas a pedir hoy
            </h2>
            <p className="mt-2 max-w-xl text-ink-soft">
              Productos frescos, opciones de rotisería, cafetería y almuerzos para
              resolver tu día de forma simple.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-sage/30 bg-sage-light px-3.5 py-1.5 text-xs font-semibold text-sage-dark">
            <CalendarCheck className="h-4 w-4" />
            Menú actualizado hoy{fecha ? ` · ${fecha}` : ""}
          </span>
        </div>

        {/* Aviso de respaldo si falló el CSV */}
        {estado === "error" && (
          <div className="mt-5 flex items-start gap-2 rounded-2xl border border-amber-300/60 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Mostramos el menú de referencia. Para el menú del día exacto,
              confirmá disponibilidad por WhatsApp.
            </span>
          </div>
        )}

        {/* Buscador */}
        <div className="mt-6">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-faint" />
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar un plato, café, tarta…"
              className="w-full rounded-full border border-beige-dark bg-cream-50 py-3 pl-11 pr-4 text-sm text-ink shadow-soft outline-none transition-all placeholder:text-ink-faint focus:border-coffee/40 focus:ring-2 focus:ring-coffee/10"
            />
          </div>
        </div>

        {/* Filtros por categoría */}
        <div className="mt-4 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoria(cat)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                categoria === cat
                  ? "border-coffee bg-coffee text-cream-50 shadow-soft"
                  : "border-beige-dark bg-cream-50 text-ink-soft hover:border-coffee/40 hover:text-coffee"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grilla */}
        {cargando ? (
          <SkeletonGrid />
        ) : filtrados.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtrados.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-beige-dark bg-cream-50 px-6 py-16 text-center">
            <SearchX className="h-9 w-9 text-ink-faint" />
            <p className="mt-3 font-display text-lg font-semibold text-coffee-dark">
              No encontramos productos
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              Probá con otra categoría o cambiá la búsqueda.
            </p>
            {(busqueda || categoria !== "Todo") && (
              <button
                type="button"
                onClick={() => {
                  setBusqueda("");
                  setCategoria("Todo");
                }}
                className="mt-4 rounded-full bg-coffee px-5 py-2.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-coffee-dark"
              >
                Ver todo el menú
              </button>
            )}
          </div>
        )}

        {/* Microcopy de confianza */}
        <p className="mt-8 text-center text-xs leading-relaxed text-ink-faint">
          Los precios y el stock pueden variar según la disponibilidad del día. El
          total es estimado: el pedido queda sujeto a confirmación del local.
        </p>
      </div>
    </section>
  );
}

function SkeletonGrid() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-3xl border border-beige-dark/50 bg-cream-50 shadow-soft"
        >
          <div className="aspect-[4/3] w-full animate-pulse bg-beige" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-2/3 animate-pulse rounded bg-beige" />
            <div className="h-3 w-full animate-pulse rounded bg-beige/70" />
            <div className="flex items-center justify-between pt-2">
              <div className="h-5 w-16 animate-pulse rounded bg-beige" />
              <div className="h-9 w-24 animate-pulse rounded-full bg-beige" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
