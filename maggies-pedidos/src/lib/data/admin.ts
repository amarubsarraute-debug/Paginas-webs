import { getServiceClient } from "@/lib/supabase/server";
import type { Business, Category, DeliveryZone, Product } from "@/types/db";

/** Datos de gestión del negocio (panel). Todo server-side, service_role. */

async function businessId(slug: string): Promise<string | null> {
  const supa = getServiceClient();
  const { data } = await supa.from("businesses").select("id").eq("slug", slug).single();
  return data?.id ?? null;
}

export type ProductAdmin = Product & { categories: { name: string } | null };

export async function listProductsAdmin(slug: string): Promise<ProductAdmin[]> {
  const supa = getServiceClient();
  const id = await businessId(slug);
  if (!id) return [];
  const { data } = await supa
    .from("products")
    .select("*, categories(name)")
    .eq("business_id", id)
    .order("sort_order", { ascending: true });
  return (data ?? []) as ProductAdmin[];
}

export async function listCategoriesAdmin(slug: string): Promise<Category[]> {
  const supa = getServiceClient();
  const id = await businessId(slug);
  if (!id) return [];
  const { data } = await supa
    .from("categories")
    .select("*")
    .eq("business_id", id)
    .order("sort_order", { ascending: true });
  return (data ?? []) as Category[];
}

const PRODUCT_FIELDS = [
  "name",
  "description",
  "price",
  "image_url",
  "available",
  "featured",
  "is_today",
  "stock",
  "category_id",
  "sort_order",
] as const;

function pick<T extends Record<string, unknown>>(obj: T, keys: readonly string[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const k of keys) if (k in obj && obj[k] !== undefined) out[k] = obj[k];
  return out;
}

export async function updateProduct(id: string, fields: Record<string, unknown>): Promise<Product> {
  const supa = getServiceClient();
  const patch = pick(fields, PRODUCT_FIELDS);
  const { data, error } = await supa.from("products").update(patch).eq("id", id).select("*").single();
  if (error || !data) throw new Error(error?.message ?? "No se pudo actualizar el producto.");
  return data as Product;
}

export async function createProduct(slug: string, fields: Record<string, unknown>): Promise<Product> {
  const supa = getServiceClient();
  const id = await businessId(slug);
  if (!id) throw new Error("Negocio no encontrado.");
  const patch = pick(fields, PRODUCT_FIELDS);
  if (!patch.name) throw new Error("El nombre es obligatorio.");
  const { data, error } = await supa
    .from("products")
    .insert({ business_id: id, ...patch })
    .select("*")
    .single();
  if (error || !data) throw new Error(error?.message ?? "No se pudo crear el producto.");
  return data as Product;
}

export async function getBusinessRow(slug: string): Promise<Business | null> {
  const supa = getServiceClient();
  const { data } = await supa
    .from("businesses")
    .select(
      "id,name,slug,logo_url,tagline,address,phone,whatsapp_number,instagram_url,google_maps_url,is_active,delivery_enabled,payment_methods,mercado_pago_enabled,created_at"
    )
    .eq("slug", slug)
    .single();
  return (data as Business) ?? null;
}

const BUSINESS_FIELDS = [
  "name",
  "tagline",
  "address",
  "phone",
  "whatsapp_number",
  "instagram_url",
  "google_maps_url",
  "delivery_enabled",
  "payment_methods",
  "mercado_pago_enabled",
] as const;

export async function updateBusiness(slug: string, fields: Record<string, unknown>): Promise<Business> {
  const supa = getServiceClient();
  const patch = pick(fields, BUSINESS_FIELDS);
  const { data, error } = await supa
    .from("businesses")
    .update(patch)
    .eq("slug", slug)
    .select("*")
    .single();
  if (error || !data) throw new Error(error?.message ?? "No se pudo guardar la configuración.");
  return data as Business;
}

export async function listDeliveryZonesAdmin(slug: string): Promise<DeliveryZone[]> {
  const supa = getServiceClient();
  const id = await businessId(slug);
  if (!id) return [];
  const { data } = await supa
    .from("delivery_zones")
    .select("*")
    .eq("business_id", id)
    .order("sort_order", { ascending: true });
  return (data ?? []) as DeliveryZone[];
}

export async function setTodaySpecial(productId: string, isToday: boolean): Promise<void> {
  const supa = getServiceClient();
  await supa.from("products").update({ is_today: isToday }).eq("id", productId);
}

export async function clearAllTodaySpecials(slug: string): Promise<void> {
  const supa = getServiceClient();
  const id = await businessId(slug);
  if (!id) return;
  await supa.from("products").update({ is_today: false }).eq("business_id", id);
}

export async function countNewOrders(slug: string): Promise<number> {
  const supa = getServiceClient();
  const id = await businessId(slug);
  if (!id) return 0;
  const { count } = await supa
    .from("orders")
    .select("id", { count: "exact", head: true })
    .eq("business_id", id)
    .eq("order_status", "new");
  return count ?? 0;
}
