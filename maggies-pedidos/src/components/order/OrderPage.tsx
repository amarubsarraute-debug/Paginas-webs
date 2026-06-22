import Link from "next/link";
import { ArrowLeft, PackageX } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { getOrderById } from "@/lib/data/orders";
import { businessConfig } from "@/config/business";
import OrderStatusView from "@/components/order/OrderStatusView";

interface Banner {
  tone: "green" | "yellow" | "gray" | "red";
  title: string;
  text: string;
}

function Fallback({ title, text }: { title: string; text: string }) {
  return (
    <main className="min-h-screen bg-cream">
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-beige text-coffee">
          <PackageX className="h-8 w-8" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-semibold text-coffee-dark">{title}</h1>
        <p className="mt-2 text-sm text-ink-soft">{text}</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-bordo px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-bordo-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}

/** Carga una orden por id y muestra su estado, o un fallback claro. */
export default async function OrderPage({
  orderId,
  banner,
}: {
  orderId?: string;
  banner?: Banner;
}) {
  if (!isSupabaseConfigured()) {
    return (
      <Fallback
        title="Pedidos no disponibles"
        text="El sistema de pedidos todavía no está conectado. Podés hacer tu pedido por WhatsApp desde el inicio."
      />
    );
  }
  if (!orderId) {
    return <Fallback title="Pedido no encontrado" text="No recibimos el número de pedido." />;
  }
  const order = await getOrderById(orderId);
  if (!order) {
    return (
      <Fallback
        title="Pedido no encontrado"
        text="No encontramos un pedido con ese número. Revisá el enlace o consultá con el local."
      />
    );
  }

  return (
    <OrderStatusView
      order={order}
      whatsappNumber={order.business?.whatsapp_number || businessConfig.whatsappNumber}
      businessName={order.business?.name || businessConfig.name}
      banner={banner}
    />
  );
}
