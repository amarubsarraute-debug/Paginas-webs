/**
 * Tipos que reflejan las tablas de Supabase (ver supabase/schema.sql).
 * Se mantienen separados de types/menu.ts: la capa de datos mapea
 * `Product` (DB) → `MenuItem` (UI) para no tocar los componentes actuales.
 */

export type DeliveryType = "pickup" | "delivery";

export type PaymentMethod =
  | "cash"
  | "bank_transfer"
  | "mercado_pago"
  | "card_on_pickup"
  | "coordinate_whatsapp";

export type PaymentStatus =
  | "pending_confirmation"
  | "pending_payment"
  | "paid"
  | "rejected"
  | "cancelled"
  | "refunded";

export type OrderStatus =
  | "new"
  | "confirmed"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled";

export interface Business {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  tagline: string | null;
  address: string | null;
  phone: string | null;
  whatsapp_number: string | null;
  instagram_url: string | null;
  google_maps_url: string | null;
  is_active: boolean;
  delivery_enabled: boolean;
  payment_methods: PaymentMethod[];
  mercado_pago_enabled: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  business_id: string;
  name: string;
  sort_order: number;
  is_active: boolean;
}

export interface Product {
  id: string;
  business_id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  available: boolean;
  featured: boolean;
  is_today: boolean;
  stock: number | null;
  sort_order: number;
  created_at: string;
}

export interface DeliveryZone {
  id: string;
  business_id: string;
  name: string;
  price: number;
  is_active: boolean;
  sort_order: number;
}

export interface Customer {
  id: string;
  business_id: string;
  name: string;
  phone: string | null;
  address: string | null;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: number;
  business_id: string;
  customer_id: string | null;
  customer_name: string;
  customer_phone: string | null;
  delivery_type: DeliveryType;
  delivery_zone_id: string | null;
  delivery_address: string | null;
  desired_time: string | null;
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  mercado_pago_preference_id: string | null;
  mercado_pago_payment_id: string | null;
  mercado_pago_status: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

/** Orden con sus ítems y la zona resuelta (para panel y página de estado). */
export interface OrderWithItems extends Order {
  order_items: OrderItem[];
  delivery_zone?: Pick<DeliveryZone, "id" | "name" | "price"> | null;
  business?: Pick<Business, "name" | "whatsapp_number" | "slug"> | null;
}

/** Payload que el front manda a /api/orders/create. */
export interface CreateOrderPayload {
  businessSlug: string;
  customerName: string;
  customerPhone?: string;
  deliveryType: DeliveryType;
  deliveryZoneId?: string | null;
  deliveryAddress?: string;
  desiredTime?: string;
  paymentMethod: PaymentMethod;
  notes?: string;
  items: { productId: string; name: string; quantity: number; unitPrice: number }[];
}
