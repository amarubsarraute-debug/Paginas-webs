import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, LayoutGrid, ToggleRight, Star, FileSpreadsheet } from "lucide-react";
import { businessConfig } from "@/config/business";

export const metadata: Metadata = {
  title: "Guía: actualizar el menú | Maggie's",
  description: "Cómo actualizar el menú del día de Maggie's.",
  robots: { index: false, follow: false },
};

const PASOS = [
  {
    icon: LayoutGrid,
    titulo: "Entrá al panel de menú",
    texto: "Abrí /admin → Menú. Ahí ves todos los productos en una tabla.",
  },
  {
    icon: ToggleRight,
    titulo: "Cambiá precio o disponibilidad",
    texto:
      "Editá el precio, marcá un producto como “Agotado por hoy” o volvé a activarlo con un toque.",
  },
  {
    icon: Star,
    titulo: "Destacá lo del día",
    texto: "Marcá “Destacado” y el plato aparece arriba, en “Recomendados de hoy”.",
  },
];

export default function GuiaMenuPage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-coffee transition-colors hover:text-bordo"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a la web
        </Link>

        <header className="mt-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-bordo">
            Guía interna
          </span>
          <h1 className="mt-2 font-display text-3xl font-semibold text-coffee-dark sm:text-4xl">
            Cómo actualizar el menú
          </h1>
          <p className="mt-3 text-ink-soft">
            El menú de {businessConfig.name} se gestiona desde el panel. Los cambios se
            ven en la web al instante, sin tocar código.
          </p>
        </header>

        <section className="mt-8 space-y-4">
          {PASOS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.titulo}
                className="flex gap-4 rounded-3xl border border-beige-dark/50 bg-cream-50 p-5 shadow-soft"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-bordo/10 text-bordo">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-semibold text-coffee-dark">
                    {i + 1}. {p.titulo}
                  </h2>
                  <p className="mt-1 text-sm text-ink-soft">{p.texto}</p>
                </div>
              </div>
            );
          })}
        </section>

        <div className="mt-8 flex items-start gap-3 rounded-3xl border border-beige-dark/50 bg-beige/40 p-5 text-sm text-coffee-light">
          <FileSpreadsheet className="mt-0.5 h-5 w-5 shrink-0 text-coffee" />
          <p>
            <strong className="text-coffee-dark">¿Sin panel todavía?</strong> Si la base
            de datos aún no está conectada, la web usa un menú de referencia del proyecto
            y los pedidos se coordinan por WhatsApp. Ver el <code className="font-mono">README.md</code>{" "}
            para conectar Supabase.
          </p>
        </div>

        <Link
          href="/admin"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-coffee px-6 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-coffee-dark"
        >
          <LayoutGrid className="h-4 w-4" />
          Ir al panel
        </Link>
      </div>
    </main>
  );
}
