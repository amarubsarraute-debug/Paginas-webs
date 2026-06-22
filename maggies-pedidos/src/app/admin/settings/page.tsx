import type { Metadata } from "next";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSettingsForm from "@/components/admin/AdminSettingsForm";
import { getBusinessRow, listDeliveryZonesAdmin } from "@/lib/data/admin";
import { resolveBusiness, defaultSlug } from "@/lib/data/catalog";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Configuración | Panel Maggie's",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const business = await resolveBusiness();
  const configured = isSupabaseConfigured();
  const [row, zones] = configured
    ? await Promise.all([getBusinessRow(defaultSlug()), listDeliveryZonesAdmin(defaultSlug())])
    : [null, []];

  return (
    <div className="min-h-screen bg-cream">
      <AdminHeader businessName={business.name} />
      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-coffee-dark">Configuración</h1>
        <p className="mt-1 text-sm text-ink-soft">Datos del negocio, delivery y pagos.</p>
        <AdminSettingsForm business={row} zones={zones} configured={configured} />
      </main>
    </div>
  );
}
