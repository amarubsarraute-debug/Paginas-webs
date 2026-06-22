# Sistema de Pedidos Maggie's 🍽️☕

Plataforma de pedidos para negocios gastronómicos locales (cafeterías, rotiserías,
restos). El cliente ve el **menú del día**, arma su carrito, elige retiro o delivery
y forma de pago, y el pedido **queda registrado en base de datos**. El negocio lo
gestiona desde un **panel** con estados tipo cocina. **Mercado Pago** opcional para
pago online. **WhatsApp** queda como respaldo, no como sistema principal.

Pensado para **replicarse**: el mismo código sirve para varios negocios cambiando
`business_id`, slug, logo, menú, zonas y métodos de pago.

> **La web funciona desde el minuto cero.** Sin configurar nada, usa un menú local de
> respaldo y ofrece pedidos por WhatsApp. A medida que conectás Supabase y Mercado
> Pago, se activan las funciones reales. Nunca queda rota.

---

## 🧱 Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS · Supabase (DB + RLS) ·
Mercado Pago Checkout Pro · Vercel.

---

## 1. Instalar el proyecto

Requiere [Node.js](https://nodejs.org/) 20+.

```bash
npm install
cp .env.example .env.local   # Windows: Copy-Item .env.example .env.local
npm run dev                  # http://localhost:8790
```

Para producción: `npm run build && npm start`.

---

## 2. Configurar Supabase

1. Creá un proyecto en [supabase.com](https://supabase.com/) (gratis).
2. En **Project Settings → API** copiá:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY` *(secreta, solo servidor)*
3. Pegá esos valores en `.env.local`.

> ⚠️ La `service_role key` da acceso total a la base. Nunca la pongas en una
> variable `NEXT_PUBLIC_` ni la subas a git.

---

## 3. Correr las migraciones (crear las tablas)

En Supabase → **SQL Editor** → **New query**, pegá y ejecutá:

1. `supabase/schema.sql` → crea las 7 tablas, índices, RLS y el webhook de pagos.

Esto deja la base lista. Es seguro correrlo de nuevo (usa `if not exists`).

---

## 4. Cargar los datos iniciales de Maggie's

En el **SQL Editor**, pegá y ejecutá:

1. `supabase/seed.sql` → carga el negocio Maggie's, sus categorías, productos demo
   y zonas de delivery (Retiro $0 · Maldonado $60 · Punta del Este $120).

Es idempotente: podés correrlo varias veces sin duplicar.

Recargá la web: ahora el menú sale de Supabase. Editalo desde el panel (`/admin`).

---

## 5. Configurar Mercado Pago (pago online, opcional)

1. Entrá a [Mercado Pago → Tus integraciones](https://www.mercadopago.com.uy/developers/panel)
   → creá una aplicación → **Credenciales**.
2. Copiá el **Access Token** (de prueba o producción) → `MERCADO_PAGO_ACCESS_TOKEN`
   en `.env.local` *(solo servidor)*.
3. (Opcional) Configurá el **secreto del webhook** → `MERCADO_PAGO_WEBHOOK_SECRET`.
4. En el panel (`/admin/settings`) activá **Mercado Pago** y agregalo a los métodos
   de pago. *(O en la tabla `businesses`: `mercado_pago_enabled = true`.)*

**Webhook:** Mercado Pago notifica a `TU_DOMINIO/api/payments/mercadopago/webhook`.
En local no llega (necesita URL pública); funciona al desplegar en Vercel, o usá
un túnel (ngrok) para probar. El estado del pago lo fija **siempre el webhook**.

> 🔒 La web nunca ve ni guarda datos de tarjeta. Solo crea la orden, manda al cliente
> a Mercado Pago y recibe la confirmación por webhook.

---

## 6. Variables de entorno

Todas están documentadas en `.env.example`. Resumen:

| Variable | Para qué | ¿Secreta? |
|----------|----------|-----------|
| `NEXT_PUBLIC_APP_URL` | URL del sitio (back_urls de MP) | no |
| `NEXT_PUBLIC_DEFAULT_BUSINESS_SLUG` | Negocio que se muestra en `/` | no |
| `NEXT_PUBLIC_SUPABASE_URL` | Proyecto Supabase | no |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Lectura del catálogo (RLS) | no |
| `SUPABASE_SERVICE_ROLE_KEY` | Escrituras / panel | **sí** |
| `MERCADO_PAGO_ACCESS_TOKEN` | Crear pagos | **sí** |
| `MERCADO_PAGO_WEBHOOK_SECRET` | Validar firma webhook (opcional) | **sí** |
| `ADMIN_PASSWORD` | Entrar al panel | **sí** |
| `ADMIN_SESSION_SECRET` | Firmar la cookie de sesión | **sí** |

---

## 7. Desplegar en Vercel

1. Subí el proyecto a GitHub.
2. Importalo en [vercel.com](https://vercel.com/) (detecta Next.js solo).
3. **Settings → Environment Variables:** cargá todas las de la tabla de arriba.
   Poné `NEXT_PUBLIC_APP_URL` con tu dominio real (ej. `https://maggies.vercel.app`).
4. Deploy. El webhook de Mercado Pago ya queda accesible públicamente.

---

## 8. Usar el panel (`/admin`)

Entrá a `/admin` e ingresá con `ADMIN_PASSWORD`. Tres secciones:

- **Pedidos** (`/admin/orders`): tablero tipo cocina con tabs por estado
  (Nuevos → Confirmados → En preparación → Listos → Entregados / Cancelados).
  Cada pedido muestra cliente, contacto, entrega, productos, totales, método y
  estado de pago (badge verde *Pagado*, amarillo *A confirmar*, gris *Esperando pago*).
  Botones para avanzar el estado.
- **Menú** (`/admin/menu`): tabla con alta de productos y edición rápida de precio,
  stock, categoría, disponible (*Agotado por hoy*) y destacado. Se guarda solo.
- **Configuración** (`/admin/settings`): datos del negocio, delivery, métodos de
  pago y Mercado Pago.

La guía pública para quien carga el menú está en `/guia-menu`.

---

## 9. Replicar el sistema para otro negocio

1. Copiá `supabase/seed.sql`, cambiá `slug`, nombre, datos, categorías, productos
   y zonas del nuevo negocio.
2. Corré `schema.sql` (una vez) y el nuevo `seed.sql` en su Supabase.
3. Seteá las envs: `NEXT_PUBLIC_DEFAULT_BUSINESS_SLUG=<nuevo-slug>`, claves de
   Supabase, (opcional) `MERCADO_PAGO_ACCESS_TOKEN`, `ADMIN_PASSWORD`.
4. Cambiá el logo en `public/brand/` y, si querés, la paleta en `tailwind.config.ts`.
5. Deploy en Vercel. Listo: mismo código, otro negocio.

> La base ya es multi-negocio (todo cuelga de `business_id`). Cada negocio tiene sus
> propios productos, zonas, métodos de pago y credenciales.

---

## 10. Desactivar pagos online (solo pedidos a confirmar)

Si no querés cobrar online:

- Dejá `MERCADO_PAGO_ACCESS_TOKEN` **vacío**, o en `/admin/settings` desactivá
  *Mercado Pago*.
- Quedan disponibles: **efectivo**, **transferencia bancaria**, **débito/crédito al
  retirar** y **a coordinar por WhatsApp**.
- En esos casos el pedido se crea con `payment_status = pending_confirmation`,
  aparece en el panel como *A confirmar*, y el cliente ve "Pago a coordinar con el
  local". WhatsApp queda como botón opcional de respaldo.

---

## 🗂️ Estructura (resumen)

```
src/
├─ app/
│  ├─ page.tsx                      # Home (menú + carrito)
│  ├─ order/[orderId]/              # Estado del pedido (cliente)
│  ├─ checkout/success|failure|pending/
│  ├─ guia-menu/                    # Guía pública del menú
│  ├─ admin/                        # Panel (login, orders, menu, settings)
│  └─ api/                          # orders, payments/mercadopago, admin
├─ components/  (Hero, MenuSection, CartDrawer, CheckoutForm, admin/*, order/*)
├─ context/CartContext.tsx          # Carrito + config de checkout
├─ lib/
│  ├─ data/ (catalog, orders, admin) # Acceso a datos (Supabase → fallback)
│  ├─ supabase/ (server, public)     # Clientes (service_role / anon)
│  ├─ mercadopago.ts                 # Preferencias + pagos (server-only)
│  ├─ auth.ts                        # Sesión admin (cookie HMAC)
│  └─ whatsapp.ts, orderLabels.ts, utils.ts
├─ config/business.ts                # Datos del negocio (respaldo sin DB)
├─ data/menu.json                    # Menú de respaldo
└─ proxy.ts                          # Protege /admin (Next 16)

supabase/
├─ schema.sql                        # Tablas + RLS
└─ seed.sql                          # Maggie's
```

---

## ✅ Checklist antes de publicar

- [ ] Validar el **WhatsApp real** de Maggie's (el 4255 9331 parece fijo; WhatsApp
      necesita un celular) en `businesses.whatsapp_number` / `src/config/business.ts`.
- [ ] Confirmar **horarios** reales.
- [ ] Crear Supabase + correr `schema.sql` y `seed.sql`.
- [ ] (Opcional) Configurar **Mercado Pago** y probar el webhook en el deploy.
- [ ] Cargar **fotos** de los productos (campo `image_url`).
- [ ] Definir `ADMIN_PASSWORD` y `ADMIN_SESSION_SECRET` fuertes.
