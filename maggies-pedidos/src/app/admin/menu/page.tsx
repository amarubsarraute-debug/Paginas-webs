import type { Metadata } from "next";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminMenuTable from "@/components/admin/AdminMenuTable";
import { listProductsAdmin, listCategoriesAdmin } from "@/lib/data/admin";
import { resolveBusiness, defaultSlug } from "@/lib/data/catalog";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Menú | Panel Maggie's",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const business = await resolveBusiness();
  const configured = isSupabaseConfigured();
  const [products, categories] = configured
    ? await Promise.all([listProductsAdmin(defaultSlug()), listCategoriesAdmin(defaultSlug())])
    : [[], []];

  return (
    <div className="min-h-screen bg-cream">
      <AdminHeader businessName={business.name} />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <AdminMenuTable
          initialProducts={products}
          categories={categories}
          configured={configured}
        />
      </main>
    </div>
  );
}
