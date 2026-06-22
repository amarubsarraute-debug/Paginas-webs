import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { businessConfig } from "@/config/business";
import { resolveBusiness, getDeliveryZones } from "@/lib/data/catalog";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import type { CheckoutConfig } from "@/context/CartContext";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maggie's Maldonado | Cafetería, Rotisería y Menú del Día",
  description:
    "Consultá el menú del día de Maggie's en Maldonado. Cafetería, rotisería, tartas, almuerzos, take away y pedidos por WhatsApp.",
  keywords: [
    "Maggie's Maldonado",
    "cafetería Maldonado",
    "rotisería Maldonado",
    "menú del día Maldonado",
    "almuerzos Maldonado",
    "cafetería y rotisería Maldonado",
    "delivery Maldonado",
    "take away Maldonado",
  ],
  authors: [{ name: "Maggie's" }],
  applicationName: "Sistema de Pedidos Maggie's",
  openGraph: {
    title: "Maggie's Maldonado | Cafetería, Rotisería y Menú del Día",
    description:
      "Menú del día, rotisería, tartas y almuerzos caseros. Armá tu pedido y envialo directo por WhatsApp.",
    locale: "es_UY",
    type: "website",
    siteName: "Maggie's",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#5A4233",
  width: "device-width",
  initialScale: 1,
};

/** JSON-LD: negocio gastronómico local (SEO). */
function buildJsonLd() {
  const diaSchema: Record<string, string> = {
    Lunes: "Monday",
    Martes: "Tuesday",
    Miércoles: "Wednesday",
    Jueves: "Thursday",
    Viernes: "Friday",
    Sábado: "Saturday",
    Domingo: "Sunday",
  };

  const openingHoursSpecification = businessConfig.hours
    .filter((h) => h.hours.toLowerCase() !== "cerrado" && h.hours.includes("-"))
    .map((h) => {
      const [opens, closes] = h.hours.split("-").map((s) => s.trim());
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${diaSchema[h.day] ?? h.day}`,
        opens,
        closes,
      };
    });

  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: businessConfig.name,
    description: businessConfig.shortDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessConfig.addressShort,
      addressLocality: businessConfig.city,
      addressCountry: "UY",
    },
    telephone: businessConfig.phone,
    servesCuisine: ["Cafetería", "Rotisería", "Comida casera"],
    priceRange: "$$",
    sameAs: [businessConfig.instagramUrl],
    openingHoursSpecification,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Config de checkout (negocio + zonas + métodos de pago) para el carrito.
  // Cae con elegancia a la config local si Supabase no está configurado.
  const [business, zones] = await Promise.all([resolveBusiness(), getDeliveryZones()]);
  const checkoutConfig: CheckoutConfig = {
    slug: business.slug,
    name: business.name,
    whatsappNumber: business.whatsappNumber,
    deliveryEnabled: business.deliveryEnabled,
    mercadoPagoEnabled: business.mercadoPagoEnabled,
    paymentMethods: business.paymentMethods,
    zones: zones.map((z) => ({ id: z.id, name: z.name, price: Number(z.price) })),
    orderingEnabled: isSupabaseConfigured(),
  };

  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
        <Providers config={checkoutConfig}>{children}</Providers>
      </body>
    </html>
  );
}
