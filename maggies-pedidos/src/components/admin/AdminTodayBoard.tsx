"use client";

import { useState, useTransition } from "react";
import { Check, Loader2, Trash2, CalendarDays } from "lucide-react";
import type { ProductAdmin } from "@/lib/data/admin";
import { cn, fechaHoyLegible, formatPrice } from "@/lib/utils";

interface Props {
  initialProducts: ProductAdmin[];
}

export default function AdminTodayBoard({ initialProducts }: Props) {
  const [todayMap, setTodayMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(initialProducts.map((p) => [p.id, p.is_today]))
  );
  const [pending, setPending] = useState<Record<string, boolean>>({});
  const [clearing, startClear] = useTransition();
  const fecha = fechaHoyLegible();

  const todayCount = Object.values(todayMap).filter(Boolean).length;

  async function toggle(productId: string) {
    const next = !todayMap[productId];
    setTodayMap((m) => ({ ...m, [productId]: next }));
    setPending((p) => ({ ...p, [productId]: true }));
    try {
      await fetch("/api/admin/today", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, isToday: next }),
      });
    } catch {
      // revert on error
      setTodayMap((m) => ({ ...m, [productId]: !next }));
    } finally {
      setPending((p) => ({ ...p, [productId]: false }));
    }
  }

  function clearAll() {
    startClear(async () => {
      await fetch("/api/admin/today", { method: "DELETE" });
      setTodayMap((m) => Object.fromEntries(Object.keys(m).map((k) => [k, false])));
    });
  }

  // Group by category
  const groups: Record<string, ProductAdmin[]> = {};
  for (const p of initialProducts) {
    const cat = p.categories?.name ?? "Sin categoría";
    (groups[cat] ??= []).push(p);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-coffee-dark">
            Pizarra del día
          </h1>
          {fecha && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
              <CalendarDays className="h-4 w-4 text-bordo" />
              {fecha}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {todayCount > 0 && (
            <span className="rounded-full bg-bordo/10 px-3 py-1 text-sm font-semibold text-bordo">
              {todayCount} en la pizarra
            </span>
          )}
          <button
            type="button"
            onClick={clearAll}
            disabled={clearing || todayCount === 0}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all",
              todayCount > 0
                ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                : "border-beige-dark bg-cream-50 text-ink-faint"
            )}
          >
            {clearing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            Limpiar todo
          </button>
        </div>
      </div>

      <p className="mt-2 text-sm text-ink-soft">
        Tapeá los platos disponibles hoy. Los clientes los ven al toque al entrar a la app.
      </p>

      {/* Product grid grouped by category */}
      <div className="mt-6 space-y-6">
        {Object.entries(groups).map(([cat, products]) => (
          <div key={cat}>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink-faint">
              {cat}
            </h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {products.map((p) => {
                const active = todayMap[p.id] ?? false;
                const isLoading = pending[p.id];
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => toggle(p.id)}
                    disabled={isLoading}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all",
                      active
                        ? "border-bordo/40 bg-bordo/5 ring-1 ring-bordo/20"
                        : "border-beige-dark bg-cream-50 hover:border-coffee/30 hover:bg-beige/40",
                      !p.available && "opacity-50"
                    )}
                  >
                    {/* Checkbox visual */}
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                        active
                          ? "border-bordo bg-bordo text-white"
                          : "border-beige-dark bg-cream-50"
                      )}
                    >
                      {isLoading ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : active ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : null}
                    </span>

                    {/* Name + price */}
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block truncate text-sm font-semibold leading-snug",
                          active ? "text-coffee-dark" : "text-ink-soft"
                        )}
                      >
                        {p.name}
                      </span>
                      {!p.available && (
                        <span className="text-xs text-ink-faint">No disponible</span>
                      )}
                    </span>
                    <span
                      className={cn(
                        "tnum shrink-0 text-sm font-semibold",
                        active ? "text-bordo" : "text-ink-faint"
                      )}
                    >
                      {formatPrice(Number(p.price))}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
