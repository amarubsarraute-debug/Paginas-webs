"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  RefreshCw,
  Clock,
  Phone,
  MapPin,
  Bike,
  Store,
  Check,
  ChefHat,
  PackageCheck,
  X,
  Inbox,
  Flame,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { OrderStatus, OrderWithItems, PaymentStatus } from "@/types/db";
import {
  DELIVERY_TYPE_LABEL,
  PAYMENT_METHOD_LABEL,
  TONE_CLASSES,
  paymentTone,
} from "@/lib/orderLabels";
import { cn, formatPrice } from "@/lib/utils";

const TABS: { key: OrderStatus; label: string }[] = [
  { key: "new", label: "Nuevos" },
  { key: "confirmed", label: "Confirmados" },
  { key: "preparing", label: "En preparación" },
  { key: "ready", label: "Listos" },
  { key: "delivered", label: "Entregados" },
  { key: "cancelled", label: "Cancelados" },
];

const PAYMENT_SHORT: Record<PaymentStatus, string> = {
  paid: "Pagado",
  pending_payment: "Esperando pago",
  pending_confirmation: "A confirmar",
  rejected: "Rechazado",
  cancelled: "Cancelado",
  refunded: "Reembolsado",
};

const NEXT_ACTIONS: Record<
  OrderStatus,
  { to: OrderStatus; label: string; icon: typeof Check; danger?: boolean }[]
> = {
  new: [
    { to: "confirmed", label: "Confirmar", icon: Check },
    { to: "cancelled", label: "Cancelar", icon: X, danger: true },
  ],
  confirmed: [
    { to: "preparing", label: "En preparación", icon: ChefHat },
    { to: "cancelled", label: "Cancelar", icon: X, danger: true },
  ],
  preparing: [
    { to: "ready", label: "Listo", icon: PackageCheck },
    { to: "cancelled", label: "Cancelar", icon: X, danger: true },
  ],
  ready: [{ to: "delivered", label: "Entregado", icon: Check }],
  delivered: [],
  cancelled: [],
};

export default function AdminOrdersBoard({
  initialOrders,
  configured,
}: {
  initialOrders: OrderWithItems[];
  configured: boolean;
}) {
  const router = useRouter();
  const [orders, setOrders] = useState(initialOrders);
  const [tab, setTab] = useState<OrderStatus>("new");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const knownIds = useRef<Set<string>>(new Set(initialOrders.map((o) => o.id)));
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Aviso sonoro (sin archivo de audio): dos tonos cortos con Web Audio.
  function playChime() {
    try {
      let ctx = audioCtxRef.current;
      if (!ctx) {
        const AC =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        ctx = new AC();
        audioCtxRef.current = ctx;
      }
      if (ctx.state === "suspended") void ctx.resume();
      const now = ctx.currentTime;
      [880, 1175].forEach((freq, i) => {
        const osc = ctx!.createOscillator();
        const gain = ctx!.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        const t = now + i * 0.18;
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.25, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
        osc.connect(gain);
        gain.connect(ctx!.destination);
        osc.start(t);
        osc.stop(t + 0.18);
      });
    } catch {
      /* audio no disponible */
    }
  }

  function toggleSound() {
    const next = !soundOn;
    setSoundOn(next);
    if (next) playChime(); // el click del usuario desbloquea el audio del navegador
  }

  // Auto-refresco: trae pedidos cada 15s y suena si entró alguno nuevo.
  useEffect(() => {
    if (!configured) return;
    const id = setInterval(async () => {
      try {
        const res = await fetch("/api/admin/orders/list");
        if (!res.ok) return;
        const data = await res.json();
        const list: OrderWithItems[] = data.orders ?? [];
        const fresh = list.filter((o) => !knownIds.current.has(o.id));
        list.forEach((o) => knownIds.current.add(o.id));
        setOrders(list);
        if (fresh.length > 0 && soundOn) playChime();
      } catch {
        /* reintenta en el próximo tick */
      }
    }, 15000);
    return () => clearInterval(id);
  }, [configured, soundOn]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const o of orders) c[o.order_status] = (c[o.order_status] ?? 0) + 1;
    return c;
  }, [orders]);

  const visibles = orders.filter((o) => o.order_status === tab);

  async function cambiarEstado(id: string, status: OrderStatus) {
    setBusyId(id);
    try {
      const res = await fetch("/api/admin/orders/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: id, status }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, order_status: status } : o))
        );
      }
    } finally {
      setBusyId(null);
    }
  }

  if (!configured) {
    return (
      <EmptyState
        title="Base de datos no conectada"
        text="Conectá Supabase (ver README) para empezar a recibir pedidos en este panel."
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold text-coffee-dark">Pedidos</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSound}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
              soundOn
                ? "border-sage bg-sage-light text-sage-dark"
                : "border-beige-dark bg-cream-50 text-ink-soft hover:bg-beige"
            )}
          >
            {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            <span className="hidden sm:inline">{soundOn ? "Sonido activo" : "Activar sonido"}</span>
          </button>
          <button
            type="button"
            onClick={() => router.refresh()}
            className="inline-flex items-center gap-1.5 rounded-full border border-beige-dark bg-cream-50 px-3.5 py-2 text-sm font-medium text-coffee transition-colors hover:bg-beige"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Actualizar</span>
          </button>
        </div>
      </div>

      <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-faint">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
        </span>
        Los pedidos entran solos. Activá el sonido para que avise cuando llega uno nuevo.
      </p>

      <KitchenSummary orders={orders} />

      <div className="mt-4 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all",
              tab === t.key
                ? "border-coffee bg-coffee text-cream-50"
                : "border-beige-dark bg-cream-50 text-ink-soft hover:border-coffee/40"
            )}
          >
            {t.label}
            {counts[t.key] ? (
              <span
                className={cn(
                  "ml-1.5 rounded-full px-1.5 text-xs font-bold",
                  tab === t.key ? "bg-cream-50/20" : "bg-bordo/10 text-bordo"
                )}
              >
                {counts[t.key]}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {visibles.length === 0 ? (
        <EmptyState title="Sin pedidos acá" text="Cuando entren pedidos en este estado, aparecen acá." />
      ) : (
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {visibles.map((o) => (
            <OrderCard
              key={o.id}
              order={o}
              busy={busyId === o.id}
              onChange={(s) => cambiarEstado(o.id, s)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function OrderCard({
  order,
  busy,
  onChange,
}: {
  order: OrderWithItems;
  busy: boolean;
  onChange: (s: OrderStatus) => void;
}) {
  const tone = paymentTone(order.payment_status);
  const isNew = order.order_status === "new";
  const hora = new Date(order.created_at).toLocaleTimeString("es-UY", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="rounded-3xl border border-beige-dark/50 bg-cream-50 p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-display text-xl font-semibold text-coffee-dark">
            #{order.order_number}
          </span>
          {isNew && (
            <span className="rounded-full bg-bordo px-2 py-0.5 text-[11px] font-bold text-white">
              Nuevo
            </span>
          )}
        </div>
        <span className="inline-flex items-center gap-1 text-xs text-ink-faint">
          <Clock className="h-3.5 w-3.5" />
          {hora}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", TONE_CLASSES[tone])}>
          {PAYMENT_SHORT[order.payment_status]}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-beige px-2.5 py-0.5 text-xs font-medium text-coffee">
          {order.delivery_type === "delivery" ? (
            <Bike className="h-3.5 w-3.5" />
          ) : (
            <Store className="h-3.5 w-3.5" />
          )}
          {DELIVERY_TYPE_LABEL[order.delivery_type]}
        </span>
        <span className="text-xs text-ink-faint">{PAYMENT_METHOD_LABEL[order.payment_method]}</span>
      </div>

      <div className="mt-3 border-t border-beige-dark/40 pt-3">
        <p className="font-medium text-coffee-dark">{order.customer_name}</p>
        {order.customer_phone && (
          <a
            href={`tel:${order.customer_phone}`}
            className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-coffee"
          >
            <Phone className="h-3.5 w-3.5" />
            {order.customer_phone}
          </a>
        )}
        {order.delivery_type === "delivery" && (
          <p className="mt-1 flex items-start gap-1.5 text-sm text-ink-soft">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              {order.delivery_address}
              {order.delivery_zone?.name ? ` · ${order.delivery_zone.name}` : ""}
            </span>
          </p>
        )}
        {order.desired_time && (
          <p className="mt-0.5 text-sm text-ink-faint">Horario: {order.desired_time}</p>
        )}
      </div>

      <ul className="mt-3 space-y-1 border-t border-beige-dark/40 pt-3 text-sm">
        {order.order_items.map((it) => (
          <li key={it.id} className="flex justify-between">
            <span className="text-coffee-dark">
              {it.quantity} x {it.product_name}
            </span>
            <span className="text-ink-soft">{formatPrice(Number(it.total_price))}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3 space-y-0.5 border-t border-beige-dark/40 pt-3 text-sm">
        <div className="flex justify-between text-ink-soft">
          <span>Subtotal</span>
          <span>{formatPrice(Number(order.subtotal))}</span>
        </div>
        {Number(order.delivery_fee) > 0 && (
          <div className="flex justify-between text-ink-soft">
            <span>Envío</span>
            <span>{formatPrice(Number(order.delivery_fee))}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold text-coffee-dark">
          <span>Total</span>
          <span>{formatPrice(Number(order.total))}</span>
        </div>
      </div>

      {order.notes && (
        <p className="mt-3 rounded-2xl bg-beige/50 px-3 py-2 text-sm text-coffee-light">
          {order.notes}
        </p>
      )}

      {NEXT_ACTIONS[order.order_status].length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {NEXT_ACTIONS[order.order_status].map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.to}
                type="button"
                disabled={busy}
                onClick={() => onChange(a.to)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all active:scale-95 disabled:opacity-60",
                  a.danger
                    ? "border border-red-300 bg-red-50 text-red-600 hover:bg-red-100"
                    : "bg-coffee text-cream-50 hover:bg-coffee-dark"
                )}
              >
                <Icon className="h-4 w-4" />
                {a.label}
              </button>
            );
          })}
        </div>
      )}
    </article>
  );
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-beige-dark bg-cream-50 px-6 py-16 text-center">
      <Inbox className="h-9 w-9 text-ink-faint" />
      <p className="mt-3 font-display text-lg font-semibold text-coffee-dark">{title}</p>
      <p className="mt-1 text-sm text-ink-soft">{text}</p>
    </div>
  );
}

/**
 * Resumen para la cocina: suma solo las cantidades de cada plato de los
 * pedidos pendientes (nuevo / confirmado / en preparación). Es lo que
 * reemplaza el scrollear el chat contando a mano.
 */
function KitchenSummary({ orders }: { orders: OrderWithItems[] }) {
  const pend = orders.filter((o) =>
    ["new", "confirmed", "preparing"].includes(o.order_status)
  );
  const totals = new Map<string, number>();
  for (const o of pend) {
    for (const it of o.order_items) {
      totals.set(it.product_name, (totals.get(it.product_name) ?? 0) + it.quantity);
    }
  }
  const items = [...totals.entries()].sort((a, b) => b[1] - a[1]);
  const noCancel = orders.filter((o) => o.order_status !== "cancelled");
  const delivery = pend.filter((o) => o.delivery_type === "delivery").length;
  const retiro = pend.filter((o) => o.delivery_type === "pickup").length;
  const revenue = noCancel.reduce((a, o) => a + Number(o.total), 0);

  if (pend.length === 0) {
    return (
      <div className="mt-4 flex items-center gap-2 rounded-3xl border border-beige-dark/50 bg-cream-50 px-5 py-4 text-sm text-ink-soft">
        <Flame className="h-5 w-5 text-ink-faint" />
        No hay pedidos pendientes de preparar por ahora.
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-3xl bg-gradient-to-br from-coffee to-coffee-dark p-5 text-cream-50 shadow-card">
      <div className="flex items-center gap-2">
        <Flame className="h-5 w-5 text-amber-400" />
        <h2 className="font-display text-lg font-semibold">
          Para la cocina · lo que falta preparar
        </h2>
      </div>
      <p className="mt-0.5 text-[11px] uppercase tracking-wider text-cream-200/50">
        Se suma solo de todos los pedidos
      </p>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map(([name, qty]) => (
          <div key={name}>
            <span className="font-display text-2xl font-semibold leading-none">{qty}</span>
            <p className="mt-1 text-xs text-cream-200/80">{name}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-cream-50/15 pt-3 text-xs text-cream-200/85">
        <span>{pend.length} pendientes</span>
        <span>{delivery} delivery</span>
        <span>{retiro} retiran</span>
        <span className="ml-auto font-semibold text-cream-50">
          Total del día: {formatPrice(revenue)}
        </span>
      </div>
    </div>
  );
}
