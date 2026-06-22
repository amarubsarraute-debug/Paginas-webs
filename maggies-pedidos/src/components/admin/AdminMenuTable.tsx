"use client";

import { useState } from "react";
import { Plus, Star, Check, X, Loader2, UtensilsCrossed } from "lucide-react";
import type { Category } from "@/types/db";
import type { ProductAdmin } from "@/lib/data/admin";
import { cn } from "@/lib/utils";

export default function AdminMenuTable({
  initialProducts,
  categories,
  configured,
}: {
  initialProducts: ProductAdmin[];
  categories: Category[];
  configured: boolean;
}) {
  const [products, setProducts] = useState(initialProducts);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", category_id: "", price: "", description: "" });
  const [createBusy, setCreateBusy] = useState(false);

  async function update(id: string, fields: Record<string, unknown>) {
    setBusyId(id);
    try {
      const res = await fetch("/api/admin/menu/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, fields }),
      });
      const data = await res.json();
      if (res.ok && data.product) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, ...data.product } : p))
        );
      }
    } finally {
      setBusyId(null);
    }
  }

  async function crear() {
    if (!form.name.trim()) return;
    setCreateBusy(true);
    try {
      const res = await fetch("/api/admin/menu/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            name: form.name.trim(),
            category_id: form.category_id || null,
            price: Number(form.price) || 0,
            description: form.description.trim() || null,
            available: true,
            sort_order: products.length + 1,
          },
        }),
      });
      const data = await res.json();
      if (res.ok && data.product) {
        const cat = categories.find((c) => c.id === data.product.category_id);
        setProducts((prev) => [...prev, { ...data.product, categories: cat ? { name: cat.name } : null }]);
        setForm({ name: "", category_id: "", price: "", description: "" });
        setCreating(false);
      }
    } finally {
      setCreateBusy(false);
    }
  }

  if (!configured) {
    return (
      <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-beige-dark bg-cream-50 px-6 py-16 text-center">
        <UtensilsCrossed className="h-9 w-9 text-ink-faint" />
        <p className="mt-3 font-display text-lg font-semibold text-coffee-dark">
          Base de datos no conectada
        </p>
        <p className="mt-1 text-sm text-ink-soft">
          Conectá Supabase (ver README) para gestionar el menú desde acá.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-coffee-dark">Menú</h1>
          <p className="text-sm text-ink-soft">{products.length} productos</p>
        </div>
        <button
          type="button"
          onClick={() => setCreating((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-full bg-bordo px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-bordo-dark"
        >
          <Plus className="h-4 w-4" />
          Nuevo producto
        </button>
      </div>

      {creating && (
        <div className="mt-4 grid gap-3 rounded-3xl border border-beige-dark/60 bg-cream-50 p-5 shadow-soft sm:grid-cols-2">
          <input
            placeholder="Nombre del producto"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputCls}
          />
          <select
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            className={inputCls}
          >
            <option value="">Sin categoría</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Precio"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className={inputCls}
          />
          <input
            placeholder="Descripción (opcional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={inputCls}
          />
          <div className="sm:col-span-2">
            <button
              type="button"
              onClick={crear}
              disabled={createBusy || !form.name.trim()}
              className="inline-flex items-center gap-2 rounded-full bg-coffee px-5 py-2.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-coffee-dark disabled:opacity-60"
            >
              {createBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Crear producto
            </button>
          </div>
        </div>
      )}

      <div className="mt-5 overflow-hidden rounded-3xl border border-beige-dark/50 bg-cream-50 shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-beige-dark/50 bg-beige/40 text-coffee-dark">
                <th className="px-4 py-3 font-semibold">Producto</th>
                <th className="px-4 py-3 font-semibold">Categoría</th>
                <th className="px-4 py-3 font-semibold">Precio</th>
                <th className="px-4 py-3 font-semibold">Stock</th>
                <th className="px-4 py-3 font-semibold">Estado</th>
                <th className="px-4 py-3 text-center font-semibold">Destacado</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const busy = busyId === p.id;
                return (
                  <tr key={p.id} className="border-b border-beige-dark/30 last:border-0 hover:bg-cream">
                    <td className="px-4 py-3">
                      <p className="font-medium text-coffee-dark">{p.name}</p>
                      {p.description && (
                        <p className="text-xs text-ink-faint line-clamp-1">{p.description}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={p.category_id ?? ""}
                        onChange={(e) =>
                          update(p.id, { category_id: e.target.value || null })
                        }
                        className="rounded-lg border border-beige-dark bg-cream-50 px-2 py-1 text-xs"
                      >
                        <option value="">Sin categoría</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1">
                        <span className="text-ink-faint">$</span>
                        <input
                          type="number"
                          defaultValue={Number(p.price)}
                          onBlur={(e) => {
                            const v = Number(e.target.value);
                            if (v !== Number(p.price)) update(p.id, { price: v });
                          }}
                          className="w-20 rounded-lg border border-beige-dark bg-cream-50 px-2 py-1"
                        />
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        defaultValue={p.stock ?? ""}
                        placeholder="∞"
                        onBlur={(e) => {
                          const raw = e.target.value.trim();
                          const v = raw === "" ? null : Number(raw);
                          if (v !== (p.stock ?? null)) update(p.id, { stock: v });
                        }}
                        className="w-16 rounded-lg border border-beige-dark bg-cream-50 px-2 py-1"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => update(p.id, { available: !p.available })}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                          p.available
                            ? "bg-sage-light text-sage-dark hover:bg-sage/20"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        )}
                      >
                        {p.available ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                        {p.available ? "Disponible" : "Agotado"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => update(p.id, { featured: !p.featured })}
                        aria-label="Destacar"
                        className={cn(
                          "inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                          p.featured
                            ? "bg-bordo text-white"
                            : "bg-beige text-ink-faint hover:text-coffee"
                        )}
                      >
                        {busy ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Star className={cn("h-4 w-4", p.featured && "fill-current")} />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-3 text-xs text-ink-faint">
        Los cambios se guardan solos. El precio y el stock se guardan al salir del campo.
        Stock vacío = sin control de stock.
      </p>
    </div>
  );
}

const inputCls =
  "w-full rounded-2xl border border-beige-dark bg-cream-50 px-4 py-2.5 text-sm text-ink outline-none transition-all focus:border-coffee/40 focus:ring-2 focus:ring-coffee/10";
