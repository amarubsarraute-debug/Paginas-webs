import { getPublicClient } from "@/lib/supabase/public";
import { getMenuLocal } from "@/lib/menu";
import { businessConfig } from "@/config/business";
import type { MenuItem } from "@/types/menu";
import type { DeliveryZone, PaymentMethod, Product } from "@/types/db";

/**
 * Capa de catálogo (lectura pública). Sirve a la web del cliente.
 * Si Supabase está configurado, lee de ahí; si no, cae al menú local
 * (src/data/menu.json) y a la config del negocio, para que el sitio
 * NUNCA quede roto y se pueda desarrollar sin credenciales.
 */

/** Vista normalizada del negocio usada por la UI y el checkout. */
export interface BusinessView {
  id: string | null; // null = proviene de la config local (sin Supabase)
  name: string;
  slug: string;
  tagline: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  instagramUrl: string;
  googleMapsUrl: string;
  deliveryEnabled: boolean;
  paymentMethods: PaymentMethod[];
  mercadoPagoEnabled: boolean;
}

export function defaultSlug(): string {
  return process.env.NEXT_PUBLIC_DEFAULT_BUSINESS_SLUG || "maggies";
}

function paymentMethodsFromEnv(): PaymentMethod[] {
  const base: PaymentMethod[] = [
    "cash",
    "bank_transfer",
    "card_on_pickup",
    "coordinate_whatsapp",
  ];
  if (process.env.MERCADO_PAGO_ACCESS_TOKEN) base.splice(2, 0, "mercado_pago");
  return base;
}

/** Negocio derivado de la config local (respaldo sin Supabase). */
function businessFromConfig(): BusinessView {
  return {
    id: null,
    name: businessConfig.name,
    slug: defaultSlug(),
    tagline: businessConfig.tagline,
    address: businessConfig.address,
    phone: businessConfig.phone,
    whatsappNumber: businessConfig.whatsappNumber,
    instagramUrl: businessConfig.instagramUrl,
    googleMapsUrl: businessConfig.googleMapsUrl,
    deliveryEnabled: true,
    paymentMethods: paymentMethodsFromEnv(),
    mercadoPagoEnabled: Boolean(process.env.MERCADO_PAGO_ACCESS_TOKEN),
  };
}

type ProductRow = Product & { categories: { name: string; sort_order: number } | null };

function mapProduct(p: ProductRow): MenuItem {
  return {
    id: p.id,
    nombre: p.name,
    categoria: p.categories?.name ?? "Otros",
    descripcion: p.description ?? "",
    precio: Number(p.price),
    imagen: p.image_url ?? "",
    disponible: p.available,
    destacado: p.featured,
    orden: p.sort_order,
    stock: p.stock,
  };
}

/** Resuelve el negocio por slug (Supabase → config). */
export async function resolveBusiness(slug?: string): Promise<BusinessView> {
  const wanted = slug || defaultSlug();
  const supa = getPublicClient();
  if (!supa) return businessFromConfig();
  try {
    const { data } = await supa
      .from("businesses")
      .select(
        "id,name,slug,tagline,address,phone,whatsapp_number,instagram_url,google_maps_url,delivery_enabled,payment_methods,mercado_pago_enabled"
      )
      .eq("slug", wanted)
      .eq("is_active", true)
      .single();
    if (!data) return businessFromConfig();
    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      tagline: data.tagline ?? "",
      address: data.address ?? "",
      phone: data.phone ?? "",
      whatsappNumber: data.whatsapp_number ?? "",
      instagramUrl: data.instagram_url ?? "",
      googleMapsUrl: data.google_maps_url ?? "",
      deliveryEnabled: data.delivery_enabled,
      paymentMethods: (data.payment_methods ?? paymentMethodsFromEnv()) as PaymentMethod[],
      mercadoPagoEnabled: data.mercado_pago_enabled,
    };
  } catch {
    return businessFromConfig();
  }
}

/** Menú del negocio (Supabase → menú local). */
export async function getMenu(slug?: string): Promise<MenuItem[]> {
  const supa = getPublicClient();
  if (!supa) return getMenuLocal();
  try {
    const { data: biz } = await supa
      .from("businesses")
      .select("id")
      .eq("slug", slug || defaultSlug())
      .single();
    if (!biz) return getMenuLocal();
    const { data } = await supa
      .from("products")
      .select("*, categories(name, sort_order)")
      .eq("business_id", biz.id)
      .order("sort_order", { ascending: true });
    if (!data || data.length === 0) return getMenuLocal();
    return (data as ProductRow[]).map(mapProduct);
  } catch {
    return getMenuLocal();
  }
}

/** Zonas de delivery por defecto cuando no hay Supabase (solo informativas). */
function defaultZones(): DeliveryZone[] {
  return [
    { id: "local", business_id: "", name: "Retiro en local", price: 0, is_active: true, sort_order: 0 },
    { id: "maldonado", business_id: "", name: "Maldonado", price: 60, is_active: true, sort_order: 1 },
    { id: "pde", business_id: "", name: "Punta del Este", price: 120, is_active: true, sort_order: 2 },
  ];
}

/** Zonas de delivery del negocio (Supabase → defaults). */
export async function getDeliveryZones(slug?: string): Promise<DeliveryZone[]> {
  const supa = getPublicClient();
  if (!supa) return defaultZones();
  try {
    const { data: biz } = await supa
      .from("businesses")
      .select("id")
      .eq("slug", slug || defaultSlug())
      .single();
    if (!biz) return defaultZones();
    const { data } = await supa
      .from("delivery_zones")
      .select("*")
      .eq("business_id", biz.id)
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (!data || data.length === 0) return defaultZones();
    return data as DeliveryZone[];
  } catch {
    return defaultZones();
  }
}
