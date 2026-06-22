import Link from "next/link";
import {
  Check,
  Clock,
  CircleCheck,
  CircleAlert,
  CircleDashed,
  MessageCircle,
  MapPin,
  ArrowLeft,
} from "lucide-react";
import type { OrderWithItems } from "@/types/db";
import {
  DELIVERY_TYPE_LABEL,
  ORDER_STATUS_LABEL,
  ORDER_STATUS_STEPS,
  PAYMENT_METHOD_LABEL,
  PAYMENT_STATUS_LABEL,
  TONE_CLASSES,
  paymentTone,
} from "@/lib/orderLabels";
import { formatPrice, cn } from "@/lib/utils";
import { linkResumenPedido } from "@/lib/whatsapp";

interface Banner {
  tone: "green" | "yellow" | "gray" | "red";
  title: string;
  text: string;
}

export default function OrderStatusView({
  order,
  whatsappNumber,
  businessName,
  banner,
}: {
  order: OrderWithItems;
  whatsappNumber: string;
  businessName: string;
  banner?: Banner;
}) {
  const cancelled = order.order_status === "cancelled";
  const currentIndex = ORDER_STATUS_STEPS.indexOf(order.order_status);
  const tone = paymentTone(order.payment_status);

  return (
    <main className="min-h-screen bg-cream">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-coffee transition-colors hover:text-bordo"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        {banner && (
          <div className={cn("mt-5 rounded-2xl px-5 py-4", TONE_CLASSES[banner.tone])}>
            <p className="font-display text-lg font-semibold">{banner.title}</p>
            <p className="mt-0.5 text-sm opacity-90">{banner.text}</p>
          </div>
        )}

        <div className="mt-5 rounded-3xl border border-beige-dark/60 bg-cream-50 p-6 shadow-card sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-bordo">
                Pedido
              </p>
              <h1 className="font-display text-3xl font-semibold text-coffee-dark">
                #{order.order_number}
              </h1>
            </div>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold",
                TONE_CLASSES[tone]
              )}
            >
              {tone === "green" ? (
                <CircleCheck className="h-4 w-4" />
              ) : tone === "red" ? (
                <CircleAlert className="h-4 w-4" />
              ) : (
                <CircleDashed className="h-4 w-4" />
              )}
              {PAYMENT_STATUS_LABEL[order.payment_status]}
            </span>
          </div>

          {/* Estado del pedido */}
          {cancelled ? (
            <div className="mt-6 flex items-center gap-2 rounded-2xl bg-red-100 px-4 py-3 text-red-700">
              <CircleAlert className="h-5 w-5" />
              <span className="font-semibold">Pedido cancelado</span>
            </div>
          ) : (
            <ol className="mt-7 space-y-3">
              {ORDER_STATUS_STEPS.map((step, i) => {
                const done = i < currentIndex;
                const active = i === currentIndex;
                return (
                  <li key={step} className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                        done && "border-sage bg-sage text-white",
                        active && "border-bordo bg-bordo text-white",
                        !done && !active && "border-beige-dark bg-cream text-ink-faint"
                      )}
                    >
                      {done ? (
                        <Check className="h-4 w-4" />
                      ) : active ? (
                        <Clock className="h-4 w-4" />
                      ) : (
                        <span className="text-xs font-bold">{i + 1}</span>
                      )}
                    </span>
                    <span
                      className={cn(
                        "text-sm",
                        active
                          ? "font-semibold text-coffee-dark"
                          : done
                            ? "text-ink-soft"
                            : "text-ink-faint"
                      )}
                    >
                      {ORDER_STATUS_LABEL[step]}
                    </span>
                  </li>
                );
              })}
            </ol>
          )}

          {/* Items */}
          <div className="mt-7 border-t border-beige-dark/50 pt-5">
            <h2 className="font-display text-lg font-semibold text-coffee-dark">
              Tu pedido
            </h2>
            <ul className="mt-3 space-y-2">
              {order.order_items.map((it) => (
                <li key={it.id} className="flex items-center justify-between text-sm">
                  <span className="text-ink-soft">
                    {it.quantity} x {it.product_name}
                  </span>
                  <span className="font-medium text-coffee">
                    {formatPrice(Number(it.total_price))}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 space-y-1 border-t border-beige-dark/40 pt-3 text-sm">
              <div className="flex justify-between text-ink-soft">
                <span>Subtotal</span>
                <span>{formatPrice(Number(order.subtotal))}</span>
              </div>
              {Number(order.delivery_fee) > 0 && (
                <div className="flex justify-between text-ink-soft">
                  <span>Envío{order.delivery_zone?.name ? ` · ${order.delivery_zone.name}` : ""}</span>
                  <span>{formatPrice(Number(order.delivery_fee))}</span>
                </div>
              )}
              <div className="flex justify-between pt-1 font-display text-lg font-semibold text-coffee-dark">
                <span>Total</span>
                <span>{formatPrice(Number(order.total))}</span>
              </div>
            </div>
          </div>

          {/* Entrega + pago */}
          <div className="mt-5 grid gap-3 rounded-2xl bg-cream px-4 py-4 text-sm sm:grid-cols-2">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coffee-light" />
              <div>
                <p className="font-medium text-coffee-dark">
                  {DELIVERY_TYPE_LABEL[order.delivery_type]}
                </p>
                {order.delivery_type === "delivery" && order.delivery_address && (
                  <p className="text-ink-soft">{order.delivery_address}</p>
                )}
                {order.desired_time && (
                  <p className="text-ink-faint">Horario: {order.desired_time}</p>
                )}
              </div>
            </div>
            <div>
              <p className="text-ink-faint">Forma de pago</p>
              <p className="font-medium text-coffee-dark">
                {PAYMENT_METHOD_LABEL[order.payment_method]}
              </p>
            </div>
          </div>

          {order.notes && (
            <p className="mt-3 rounded-2xl bg-beige/50 px-4 py-3 text-sm text-coffee-light">
              <span className="font-semibold">Comentarios:</span> {order.notes}
            </p>
          )}

          {/* WhatsApp */}
          <a
            href={linkResumenPedido(order, whatsappNumber, businessName)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-card transition-transform hover:brightness-105 active:scale-[0.98]"
          >
            <MessageCircle className="h-4 w-4" />
            Enviar resumen por WhatsApp
          </a>
          <p className="mt-2 text-center text-xs text-ink-faint">
            Tu pedido ya fue registrado. También podés enviar el resumen por WhatsApp
            para avisar al local.
          </p>
        </div>
      </div>
    </main>
  );
}
