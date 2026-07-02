-- =====================================================================
--  Maggie's — Migración: reemplaza productos demo con carta real
--  Correr en Supabase → SQL Editor → Run
-- =====================================================================

-- 1. Agregar categoría "Minutas" (no estaba en el seed original)
insert into categories (business_id, name, sort_order)
values ('11111111-1111-4111-8111-111111111111', 'Minutas', 2)
on conflict (business_id, name) do update set sort_order = excluded.sort_order;

-- Reordenar las demás categorías
update categories set sort_order = 1 where business_id = '11111111-1111-4111-8111-111111111111' and name = 'Menú del día';
update categories set sort_order = 3 where business_id = '11111111-1111-4111-8111-111111111111' and name = 'Ensaladas';
update categories set sort_order = 4 where business_id = '11111111-1111-4111-8111-111111111111' and name = 'Cafetería';
update categories set sort_order = 5 where business_id = '11111111-1111-4111-8111-111111111111' and name = 'Postres';

-- 2. Limpiar productos demo anteriores
delete from products where business_id = '11111111-1111-4111-8111-111111111111';

-- 3. Insertar carta real con imágenes
insert into products (business_id, category_id, name, description, price, image_url, available, featured, sort_order)
select b.id, c.id, p.name, p.description, p.price::numeric, p.image_url, p.available, p.featured, p.sort_order
from (values
  -- Menú del día
  ('Menú del día',  'Menú del día',                                  'Consultá el plato del día con el local.',        280,  null,                                                                    true,  true,  1),
  -- Minutas
  ('Minutas', 'Milanesa c/ fritas, puré o ensalada',                 'Milanesa de carne con guarnición a elección.',   280,  '/images/menu/01_milanesa_c_fritas_pure_ensalada.png',                   true,  true,  10),
  ('Minutas', 'Milanesa de pollo c/ fritas, puré o ensalada',        'Milanesa de pollo con guarnición a elección.',   280,  '/images/menu/02_milanesa_de_pollo_c_fritas_pure_ensalada.png',          true,  false, 11),
  ('Minutas', 'Milanesa al pan',                                      'En pan con lechuga, tomate y mayonesa.',         185,  '/images/menu/03_milanesa_al_pan.png',                                   true,  false, 12),
  ('Minutas', 'Milanesa en 2 panes',                                  '',                                               210,  '/images/menu/04_milanesa_en_2_panes.png',                               true,  false, 13),
  ('Minutas', 'Napolitana',                                           'Milanesa con salsa napolitana y queso.',         380,  '/images/menu/05_napolitana.png',                                        true,  false, 14),
  ('Minutas', 'Hamburguesa al pan completa c/ fritas',                'Con todos los ingredientes y fritas.',           285,  '/images/menu/06_hamburguesa_al_pan_completa_c_fritas.png',              true,  true,  15),
  ('Minutas', 'Hamburguesa Estudiantil',                              '',                                               210,  '/images/menu/07_hamburguesa_estudiantil.png',                           true,  false, 16),
  ('Minutas', 'Chivito al pan c/ frita',                              'Lomo, jamón, queso, huevo, lechuga y tomate.',  380,  '/images/menu/08_chivito_al_pan_c_frita.png',                            true,  true,  17),
  ('Minutas', 'Chivito al plato',                                     'Completo, servido en plato con guarnición.',     420,  '/images/menu/09_chivito_al_plato.png',                                  true,  false, 18),
  ('Minutas', 'Churrasco c/ guarnición',                              '',                                               380,  '/images/menu/10_churrasco_c_guarnicion.png',                            true,  false, 19),
  ('Minutas', 'Tallarines',                                           'Con salsa a elección.',                          280,  '/images/menu/11_tallarines.png',                                        true,  false, 20),
  ('Minutas', 'Ravioles',                                             'Con salsa a elección.',                          280,  '/images/menu/12_ravioles.png',                                          true,  false, 21),
  ('Minutas', 'Sorrentinos',                                          'Con salsa a elección.',                          280,  '/images/menu/13_sorrentinos.png',                                       true,  false, 22),
  ('Minutas', 'Ñoquis',                                               'Con salsa a elección.',                          280,  '/images/menu/14_noquis.png',                                            true,  false, 23),
  ('Minutas', 'Fritas',                                               'Papas fritas.',                                  175,  '/images/menu/15_fritas.png',                                            true,  false, 24),
  ('Minutas', 'Fritas c/ 2 huevos',                                   '',                                               235,  '/images/menu/16_fritas_c_2_huevos.png',                                 true,  false, 25),
  ('Minutas', 'Tortilla de papa o verduras c/ mixta',                 '',                                               280,  '/images/menu/17_tortilla_de_papa_o_verduras_c_mixta.png',               true,  false, 26),
  ('Minutas', 'Panchos Tejanos',                                      '',                                               295,  '/images/menu/21_pancho_tejano.png',                                     true,  false, 27),
  ('Minutas', 'Rabas c/ fritas',                                      '',                                               295,  '/images/menu/22_rabas_c_fritas.png',                                    true,  false, 28),
  ('Minutas', 'Costillas de cerdo c/ guarnición',                     '',                                               320,  '/images/menu/23_costillas_de_cerdo_c_guarnicion.png',                   true,  false, 29),
  -- Ensaladas
  ('Ensaladas', 'Ensalada completa de pollo',                         '',                                               280,  '/images/menu/18_ensalada_completa_de_pollo.png',                        true,  false, 30),
  ('Ensaladas', 'Ensalada completa de atún',                          '',                                               288,  '/images/menu/19_ensalada_completa_de_atun.png',                         true,  false, 31),
  ('Ensaladas', 'Ensalada completa de jamón y dambo',                 '',                                               240,  '/images/menu/20_ensalada_completa_de_jamon_y_dambo.png',                true,  false, 32),
  -- Cafetería
  ('Cafetería', 'Café Maggie''s',                                     '',                                               80,   '/images/menu/24_cafe_maggies.png',                                      true,  false, 40),
  ('Cafetería', 'Café doble',                                         '',                                               130,  '/images/menu/25_cafe_doble.png',                                        true,  false, 41),
  ('Cafetería', 'Cortado',                                            '',                                               95,   '/images/menu/26_cortado.png',                                           true,  false, 42),
  ('Cafetería', 'Capuchino Maggie''s',                                '',                                               110,  '/images/menu/27_capuchino_maggies.png',                                 true,  false, 43),
  ('Cafetería', 'Mochavianes',                                        '',                                               145,  '/images/menu/28_mochaviana.png',                                        true,  false, 44),
  ('Cafetería', 'Capuchino + ½ sándwich caliente',                    'Combo merienda.',                                250,  '/images/menu/29_capuchino_medio_sandwich_caliente.png',                 true,  true,  45),
  ('Cafetería', 'Café c/ crema',                                      '',                                               120,  '/images/menu/30_cafe_con_crema.png',                                    true,  false, 46),
  ('Cafetería', 'Submarino Maggie''s',                                'Leche caliente con barra de chocolate.',         145,  null,                                                                    true,  false, 47),
  ('Cafetería', 'Capuchino Nutella',                                  '',                                               145,  null,                                                                    true,  false, 48),
  ('Cafetería', 'Chocolatta',                                         '',                                               120,  null,                                                                    true,  false, 49),
  ('Cafetería', 'Café con leche frío c/ crema',                       '',                                               145,  null,                                                                    true,  false, 50),
  ('Cafetería', 'Té Maggie''s',                                       '',                                               70,   null,                                                                    true,  false, 51),
  ('Cafetería', 'Té Twinings',                                        '',                                               110,  null,                                                                    true,  false, 52),
  ('Cafetería', 'Té para dos',                                        '',                                               120,  null,                                                                    true,  false, 53),
  -- Postres
  ('Postres', 'Rogel',                                                '',                                               145,  null,                                                                    true,  false, 60),
  ('Postres', 'Diamanta',                                             '',                                               145,  null,                                                                    true,  false, 61),
  ('Postres', 'Chajá',                                                '',                                               145,  null,                                                                    true,  false, 62),
  ('Postres', 'Marquise de Chocolate',                                '',                                               145,  null,                                                                    true,  false, 63),
  ('Postres', 'Isla Flotante',                                        '',                                               120,  null,                                                                    true,  false, 64),
  ('Postres', 'Lemon Pie',                                            '',                                               120,  null,                                                                    true,  false, 65),
  ('Postres', 'Cheese Cake',                                          '',                                               145,  null,                                                                    true,  false, 66),
  ('Postres', 'Selva Negra',                                          '',                                               145,  null,                                                                    true,  false, 67),
  ('Postres', 'Brownie',                                              '',                                               110,  null,                                                                    true,  false, 68)
) as p(categoria, name, description, price, image_url, available, featured, sort_order)
join businesses b on b.id = '11111111-1111-4111-8111-111111111111'
join categories c on c.business_id = b.id and c.name = p.categoria;
