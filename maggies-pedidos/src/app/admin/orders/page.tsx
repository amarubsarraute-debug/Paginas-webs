import type { Metadata } from "next";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminOrdersBoard from "@/components/admin/AdminOrdersBoard";
import { listOrders } from "@/lib/data/orders";
import { resolveBusiness, defaultSlug } from "@/lib/data/catalog";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Pedidos | Panel Maggie's",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const business = await resolveBusiness();
  const configured = isSupabaseConfigured();
  const orders = configured ? await listOrders(defaultSlug()) : [];

  return (
    <div className="min-h-screen bg-cream">
      <AdminHeader businessName={business.name} />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <AdminOrdersBoard initialOrders={orders} configured={configured} />
      </main>
    </div>
  );
}
