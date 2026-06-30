import type { Metadata } from "next";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminTodayBoard from "@/components/admin/AdminTodayBoard";
import { listProductsAdmin } from "@/lib/data/admin";
import { resolveBusiness, defaultSlug } from "@/lib/data/catalog";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Pizarra del día | Panel Maggie's",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminTodayPage() {
  const business = await resolveBusiness();
  const configured = isSupabaseConfigured();
  const products = configured ? await listProductsAdmin(defaultSlug()) : [];

  return (
    <div className="min-h-screen bg-cream">
      <AdminHeader businessName={business.name} />
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        {!configured ? (
          <div className="flex items-start gap-3 rounded-2xl border border-amber-300/60 bg-amber-50 px-4 py-4 text-sm text-amber-800">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">Supabase no está conectado</p>
              <p className="mt-0.5">
                La pizarra del día requiere base de datos para guardar qué productos están disponibles hoy. Conectá Supabase desde el README.
              </p>
            </div>
          </div>
        ) : (
          <AdminTodayBoard initialProducts={products} />
        )}
      </main>
    </div>
  );
}
