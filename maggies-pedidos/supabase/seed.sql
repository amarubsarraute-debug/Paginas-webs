-- =====================================================================
--  Maggie's — Datos iniciales (seed)
-- =====================================================================
--  Correr DESPUÉS de schema.sql:
--    Supabase → SQL Editor → pegar → Run.
--  Es idempotente (ON CONFLICT): se puede correr varias veces sin duplicar.
--
--  Para replicar en otro negocio: copiar este archivo, cambiar el slug,
--  nombre, datos, categorías, productos y zonas.
-- =====================================================================

-- 1) Negocio -----------------------------------------------------------
insert into businesses (id, name, slug, tagline, address, phone, whatsapp_number, instagram_url, mercado_pago_enabled, payment_methods)
values (
  '11111111-1111-4111-8111-111111111111',
  'Maggie''s',
  'maggies',
  'Rotisería y Cafetería · Calidad Natural',
  'Acuña de Figueroa esq. 3 de Febrero, Maldonado',
  '42559331',
  '59842559331',
  'https://www.instagram.com/maggiescafeteria/',
  false,
  array['cash','bank_transfer','card_on_pickup','coordinate_whatsapp']
)
on conflict (slug) do update set
  name = excluded.name,
  tagline = excluded.tagline,
  address = excluded.address,
  phone = excluded.phone,
  whatsapp_number = excluded.whatsapp_number,
  instagram_url = excluded.instagram_url;

-- 2) Categorías --------------------------------------------------------
insert into categories (business_id, name, sort_order) values
  ('11111111-1111-4111-8111-111111111111', 'Menú del día', 1),
  ('11111111-1111-4111-8111-111111111111', 'Rotisería',    2),
  ('11111111-1111-4111-8111-111111111111', 'Cafetería',    3),
  ('11111111-1111-4111-8111-111111111111', 'Tartas',       4),
  ('11111111-1111-4111-8111-111111111111', 'Sandwiches',   5),
  ('11111111-1111-4111-8111-111111111111', 'Ensaladas',    6),
  ('11111111-1111-4111-8111-111111111111', 'Confitería',   7),
  ('11111111-1111-4111-8111-111111111111', 'Postres',      8)
on conflict (business_id, name) do update set sort_order = excluded.sort_order;

-- 3) Zonas de delivery -------------------------------------------------
insert into delivery_zones (business_id, name, price, sort_order) values
  ('11111111-1111-4111-8111-111111111111', 'Retiro en local', 0,   0),
  ('11111111-1111-4111-8111-111111111111', 'Maldonado',       60,  1),
  ('11111111-1111-4111-8111-111111111111', 'Punta del Este',  120, 2)
on conflict do nothing;

-- 4) Productos demo ----------------------------------------------------
--    category_id se resuelve por nombre para no hardcodear UUIDs.
insert into products (business_id, category_id, name, description, price, available, featured, sort_order)
select b.id, c.id, p.name, p.description, p.price, p.available, p.featured, p.sort_order
from (values
  ('Menú del día', 'Milanesa con puré',        'Milanesa casera de carne con puré de papa cremoso.', 340, true,  true,  1),
  ('Rotisería',    'Medio pollo asado',        'Medio pollo a las brasas, listo para llevar.',        360, true,  true,  2),
  ('Cafetería',    'Café con medialunas',      'Combo merienda: café con leche + 2 medialunas.',      210, true,  true,  3),
  ('Tartas',       'Tarta de jamón y queso',   'Porción individual.',                                 200, true,  false, 4),
  ('Sandwiches',   'Chivito al pan',           'Lomo, jamón, queso, huevo, lechuga y tomate.',        360, true,  true,  5),
  ('Ensaladas',    'Ensalada César',           'Lechuga, pollo, croutones, queso y aderezo César.',   290, true,  false, 6),
  ('Confitería',   'Docena de bizcochos',      'Surtido del día: dulces y salados.',                  260, true,  true,  7),
  ('Rotisería',    'Lasaña casera',            'Porción individual de lasaña boloñesa.',              340, false, false, 8),
  ('Postres',      'Lemon pie',                'Porción con merengue.',                               220, true,  false, 9)
) as p(categoria, name, description, price, available, featured, sort_order)
join businesses b on b.slug = 'maggies'
join categories c on c.business_id = b.id and c.name = p.categoria
on conflict (business_id, name) do update set
  price = excluded.price,
  description = excluded.description,
  available = excluded.available,
  featured = excluded.featured,
  category_id = excluded.category_id,
  sort_order = excluded.sort_order;
