-- =====================================================================
--  Maggie's — Sistema de pedidos · Esquema de base de datos (Supabase)
-- =====================================================================
--  Cómo usar:
--    Supabase → SQL Editor → pegar este archivo → Run.
--    Luego correr supabase/seed.sql para cargar Maggie's de ejemplo.
--
--  Diseño multi-negocio: todo cuelga de businesses(id) vía business_id,
--  así el mismo sistema sirve para otros locales cambiando los datos.
--
--  Seguridad (RLS):
--    - anon (frontend) solo PUEDE LEER el catálogo (businesses activos,
--      categorías, productos, zonas). NUNCA lee/escribe órdenes ni el
--      token de Mercado Pago.
--    - Las órdenes se crean/leen/actualizan SOLO desde el servidor con la
--      service_role key (que ignora RLS). Nunca exponer esa key al front.
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- 1. businesses
-- ---------------------------------------------------------------------
create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  logo_url text,
  tagline text,
  address text,
  phone text,
  whatsapp_number text,
  instagram_url text,
  google_maps_url text,
  is_active boolean not null default true,
  delivery_enabled boolean not null default true,
  -- métodos de pago activos (subconjunto de los valores de orders.payment_method)
  payment_methods text[] not null default array['cash','bank_transfer','card_on_pickup','coordinate_whatsapp'],
  mercado_pago_enabled boolean not null default false,
  -- ⚠️ Preferir variable de entorno MERCADO_PAGO_ACCESS_TOKEN. Esta columna
  -- queda como opción multi-negocio; nunca debe leerse desde el front.
  mercado_pago_access_token text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 2. categories
-- ---------------------------------------------------------------------
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  name text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  unique (business_id, name)
);

-- ---------------------------------------------------------------------
-- 3. products
-- ---------------------------------------------------------------------
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  category_id uuid references categories(id) on delete set null,
  name text not null,
  description text,
  price numeric(10,2) not null default 0,
  image_url text,
  available boolean not null default true,
  featured boolean not null default false,
  -- true = aparece en la pizarra del día (admin lo activa cada mañana)
  is_today boolean not null default false,
  -- stock null = no se controla; stock <= 0 = no se puede agregar
  stock int,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  unique (business_id, name)
);

-- ---------------------------------------------------------------------
-- 4. delivery_zones
-- ---------------------------------------------------------------------
create table if not exists delivery_zones (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  name text not null,
  price numeric(10,2) not null default 0,
  is_active boolean not null default true,
  sort_order int not null default 0
);

-- ---------------------------------------------------------------------
-- 5. customers
-- ---------------------------------------------------------------------
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  name text not null,
  phone text,
  address text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 6. orders
-- ---------------------------------------------------------------------
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  -- número corto y legible para el panel/cliente (#1, #2, ...)
  order_number bigint generated always as identity,
  business_id uuid not null references businesses(id) on delete cascade,
  customer_id uuid references customers(id) on delete set null,
  customer_name text not null,
  customer_phone text,
  delivery_type text not null check (delivery_type in ('pickup','delivery')),
  delivery_zone_id uuid references delivery_zones(id) on delete set null,
  delivery_address text,
  desired_time text,
  subtotal numeric(10,2) not null default 0,
  delivery_fee numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  payment_method text not null
    check (payment_method in ('cash','bank_transfer','mercado_pago','card_on_pickup','coordinate_whatsapp')),
  payment_status text not null default 'pending_confirmation'
    check (payment_status in ('pending_confirmation','pending_payment','paid','rejected','cancelled','refunded')),
  order_status text not null default 'new'
    check (order_status in ('new','confirmed','preparing','ready','delivered','cancelled')),
  mercado_pago_preference_id text,
  mercado_pago_payment_id text,
  mercado_pago_status text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 7. order_items
-- ---------------------------------------------------------------------
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_name text not null,
  quantity int not null check (quantity > 0),
  unit_price numeric(10,2) not null,
  total_price numeric(10,2) not null
);

-- ---------------------------------------------------------------------
-- Índices
-- ---------------------------------------------------------------------
create index if not exists idx_categories_business on categories(business_id);
create index if not exists idx_products_business on products(business_id);
create index if not exists idx_products_category on products(category_id);
create index if not exists idx_delivery_zones_business on delivery_zones(business_id);
create index if not exists idx_orders_business on orders(business_id);
create index if not exists idx_orders_status on orders(order_status);
create index if not exists idx_orders_created on orders(created_at desc);
create index if not exists idx_order_items_order on order_items(order_id);

-- ---------------------------------------------------------------------
-- Trigger: mantener orders.updated_at al día
-- ---------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_orders_updated_at on orders;
create trigger trg_orders_updated_at
  before update on orders
  for each row execute function set_updated_at();

-- =====================================================================
--  Row Level Security
-- =====================================================================
alter table businesses     enable row level security;
alter table categories     enable row level security;
alter table products       enable row level security;
alter table delivery_zones enable row level security;
alter table customers      enable row level security;
alter table orders         enable row level security;
alter table order_items    enable row level security;

-- Lectura pública del catálogo (anon + authenticated) -----------------
drop policy if exists businesses_public_read on businesses;
create policy businesses_public_read on businesses
  for select using (is_active = true);

drop policy if exists categories_public_read on categories;
create policy categories_public_read on categories
  for select using (is_active = true);

drop policy if exists products_public_read on products;
create policy products_public_read on products
  for select using (true);

drop policy if exists delivery_zones_public_read on delivery_zones;
create policy delivery_zones_public_read on delivery_zones
  for select using (is_active = true);

-- customers / orders / order_items: SIN políticas públicas.
-- Solo accesibles vía service_role (servidor), que ignora RLS.

-- Endurecer: el token de Mercado Pago nunca debe viajar al front.
revoke select (mercado_pago_access_token) on businesses from anon, authenticated;
