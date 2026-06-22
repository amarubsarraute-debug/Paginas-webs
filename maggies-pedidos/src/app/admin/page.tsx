import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, UtensilsCrossed, Settings, ArrowRight, AlertTriangle } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { resolveBusiness, defaultSlug } from "@/lib/data/catalog";
import { countNewOrders } from "@/lib/data/admin";

export const metadata: Metadata = {
  title: "Panel | Maggie's",
  robots: { index: false, follow: false },
};

export default async function AdminDashboard() {
  const business = await resolveBusiness();
  const configured = isSupabaseConfigured();
  const nuevos = configured ? await countNewOrders(defaultSlug()) : 0;

  const cards = [
    {
      href: "/admin/orders",
      icon: ClipboardList,
      title: "Pedidos",
      desc: "Pedidos entrantes, estados y pagos.",
      badge: nuevos > 0 ? `${nuevos} nuevo${nuevos === 1 ? "" : "s"}` : null,
    },
    {
      href: "/admin/menu",
      icon: UtensilsCrossed,
      title: "Menú",
      desc: "Productos, precios, disponibilidad y destacados.",
      badge: null,
    },
    {
      href: "/admin/settings",
      icon: Settings,
      title: "Configuración",
      desc: "Datos del negocio, delivery y pagos.",
      badge: null,
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <AdminHeader businessName={business.name} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-coffee-dark">Panel del negocio</h1>
        <p className="mt-1 text-ink-soft">Gestioná pedidos y menú desde un solo lugar.</p>

        {!configured && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-300/60 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <span>
              La base de datos (Supabase) todavía no está conectada. El panel funciona en
              modo lectura. Seguí el <code className="font-mono">README.md</code> para
              conectar Supabase y empezar a recibir pedidos.
            </span>
          </div>
        )}

        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.href}
                href={c.href}
                className="group relative rounded-3xl border border-beige-dark/50 bg-cream-50 p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                {c.badge && (
                  <span className="absolute right-5 top-5 rounded-full bg-bordo px-2.5 py-1 text-xs font-bold text-white">
                    {c.badge}
                  </span>
                )}
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coffee text-cream-50">
                  <Icon className="h-6 w-6" />
                </span>
                <h2 className="mt-4 font-display text-xl font-semibold text-coffee-dark">
                  {c.title}
                </h2>
                <p className="mt-1 text-sm text-ink-soft">{c.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-bordo">
                  Abrir
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
