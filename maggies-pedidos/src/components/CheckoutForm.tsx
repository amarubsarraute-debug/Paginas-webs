"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Store,
  Bike,
  Banknote,
  ArrowLeftRight,
  CreditCard,
  Wallet,
  MessageCircle,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";
import type { DeliveryType, PaymentMethod } from "@/types/db";
import { useCart } from "@/context/CartContext";
import { cn, formatPrice } from "@/lib/utils";
import { DELIVERY_TYPE_LABEL, PAYMENT_METHOD_LABEL } from "@/lib/orderLabels";

const METODO_ICON: Record<PaymentMethod, typeof Banknote> = {
  cash: Banknote,
  bank_transfer: ArrowLeftRight,
  mercado_pago: Wallet,
  card_on_pickup: CreditCard,
  coordinate_whatsapp: MessageCircle,
};

export default function CheckoutForm({ onBack }: { onBack: () => void }) {
  const { items, subtotal, clear, closeCart, config } = useCart();

  const metodos = useMemo(
    () =>
      config.paymentMethods.filter(
        (m) => m !== "mercado_pago" || config.mercadoPagoEnabled
      ),
    [config]
  );

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tipo, setTipo] = useState<DeliveryType>("pickup");
  const [zoneId, setZoneId] = useState(config.zones[0]?.id ?? "");
  const [direccion, setDireccion] = useState("");
  const [horario, setHorario] = useState("");
  const [pago, setPago] = useState<PaymentMethod>(metodos[0] ?? "cash");
  const [comentarios, setComentarios] = useState("");

  const [errores, setErrores] = useState<{ nombre?: string; direccion?: string; zona?: string }>({});
  const [enviando, setEnviando] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [enviadoWhatsApp, setEnviadoWhatsApp] = useState(false);

  const zonaSel = config.zones.find((z) => z.id === zoneId);
  const envio = tipo === "delivery" ? zonaSel?.price ?? 0 : 0;
  const totalEstimado = subtotal + envio;

  function validar(): boolean {
    const e: typeof errores = {};
    if (!nombre.trim()) e.nombre = "Necesitamos tu nombre.";
    if (tipo === "delivery") {
      if (!direccion.trim()) e.direccion = "Para delivery, la dirección es obligatoria.";
      if (!zoneId) e.zona = "Elegí una zona de envío.";
    }
    setErrores(e);
    return Object.keys(e).length === 0;
  }

  function legacyWhatsAppLink(): string {
    const l: string[] = [];
    l.push(`Hola ${config.name}, quiero hacer este pedido:`);
    l.push("");
    l.push("*Productos:*");
    items.forEach((it) => l.push(`• ${it.cantidad} x ${it.nombre} — ${formatPrice(it.precio * it.cantidad)}`));
    l.push("");
    if (envio > 0) l.push(`Envío: ${formatPrice(envio)}`);
    l.push(`*Total estimado: ${formatPrice(totalEstimado)}*`);
    l.push("");
    l.push("*Datos:*");
    l.push(`Nombre: ${nombre.trim()}`);
    if (telefono.trim()) l.push(`Teléfono: ${telefono.trim()}`);
    l.push(`Entrega: ${DELIVERY_TYPE_LABEL[tipo]}`);
    if (tipo === "delivery" && direccion.trim()) l.push(`Dirección: ${direccion.trim()}`);
    if (tipo === "delivery" && zonaSel) l.push(`Zona: ${zonaSel.name}`);
    if (horario.trim()) l.push(`Horario: ${horario.trim()}`);
    l.push(`Pago: ${PAYMENT_METHOD_LABEL[pago]}`);
    if (comentarios.trim()) {
      l.push("");
      l.push("*Comentarios:*");
      l.push(comentarios.trim());
    }
    return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(l.join("\n"))}`;
  }

  async function enviar() {
    if (items.length === 0 || !validar()) return;
    setErrorMsg("");

    // Modo respaldo (sin base de datos): WhatsApp directo, como antes.
    if (!config.orderingEnabled) {
      window.open(legacyWhatsAppLink(), "_blank", "noopener,noreferrer");
      setEnviadoWhatsApp(true);
      return;
    }

    setEnviando(true);
    try {
      const payload = {
        businessSlug: config.slug,
        customerName: nombre.trim(),
        customerPhone: telefono.trim() || undefined,
        deliveryType: tipo,
        deliveryZoneId: tipo === "delivery" ? zoneId : null,
        deliveryAddress: tipo === "delivery" ? direccion.trim() : undefined,
        desiredTime: horario.trim() || undefined,
        paymentMethod: pago,
        notes: comentarios.trim() || undefined,
        items: items.map((it) => ({
          productId: it.id,
          name: it.nombre,
          quantity: it.cantidad,
          unitPrice: it.precio,
        })),
      };

      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "No se pudo registrar el pedido.");
      const orderId: string = data.orderId;

      if (pago === "mercado_pago") {
        const pr = await fetch("/api/payments/mercadopago/create-preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });
        const pd = await pr.json();
        if (!pr.ok || !pd.initPoint) {
          throw new Error(pd?.message || "No se pudo iniciar el pago con Mercado Pago.");
        }
        clear();
        window.location.href = pd.initPoint;
        return;
      }

      clear();
      window.location.href = `/order/${orderId}`;
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Ocurrió un error. Probá de nuevo.");
      setEnviando(false);
    }
  }

  // Pantalla de confirmación del modo respaldo (WhatsApp).
  if (enviadoWhatsApp) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-light text-sage">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold text-coffee-dark">
          ¡Te esperamos en WhatsApp!
        </h3>
        <p className="mt-2 max-w-xs text-sm text-ink-soft">
          Se abrió WhatsApp con tu pedido. {config.name} te confirma disponibilidad,
          demora y forma de pago.
        </p>
        <a
          href={legacyWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-card transition-transform hover:brightness-105 active:scale-95"
        >
          <MessageCircle className="h-4 w-4" />
          ¿No se abrió? Tocá acá
        </a>
        <button
          type="button"
          onClick={() => {
            clear();
            closeCart();
          }}
          className="mt-3 text-sm font-medium text-ink-faint underline-offset-4 hover:text-coffee hover:underline"
        >
          Vaciar carrito y cerrar
        </button>
      </div>
    );
  }

  const ctaLabel =
    !config.orderingEnabled
      ? "Enviar pedido por WhatsApp"
      : pago === "mercado_pago"
        ? "Pagar con Mercado Pago"
        : "Confirmar pedido";

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="space-y-5 px-4 py-5 sm:px-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-coffee transition-colors hover:text-bordo"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al carrito
        </button>

        <Campo label="Nombre" requerido error={errores.nombre}>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Juan Pérez"
            className={inputCls(!!errores.nombre)}
          />
        </Campo>

        <Campo label="Teléfono" hint="Opcional">
          <input
            type="tel"
            inputMode="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Ej: 099 000 000"
            className={inputCls(false)}
          />
        </Campo>

        <Campo label="¿Cómo lo querés?" requerido>
          <div className="grid grid-cols-2 gap-2">
            <ToggleTipo
              activo={tipo === "pickup"}
              onClick={() => setTipo("pickup")}
              icon={Store}
              titulo="Retiro en local"
              sub="Pasás a buscarlo"
            />
            <ToggleTipo
              activo={tipo === "delivery"}
              onClick={() => setTipo("delivery")}
              icon={Bike}
              titulo="Delivery"
              sub="Te lo enviamos"
              disabled={!config.deliveryEnabled}
            />
          </div>
        </Campo>

        {tipo === "delivery" && (
          <>
            <Campo label="Zona de envío" requerido error={errores.zona}>
              <select
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value)}
                className={inputCls(!!errores.zona)}
              >
                <option value="">Elegí tu zona…</option>
                {config.zones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.name}
                    {z.price > 0 ? ` · ${formatPrice(z.price)}` : " · sin cargo"}
                  </option>
                ))}
              </select>
            </Campo>
            <Campo label="Dirección de entrega" requerido error={errores.direccion}>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Calle, número, apto, referencias…"
                className={inputCls(!!errores.direccion)}
              />
            </Campo>
          </>
        )}

        <Campo label="Horario deseado" hint="Opcional">
          <div className="relative">
            <Clock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              type="text"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              placeholder="Ej: lo antes posible · 13:15 · 20:30"
              className={cn(inputCls(false), "pl-11")}
            />
          </div>
        </Campo>

        <Campo label="Forma de pago" requerido>
          <div className="grid grid-cols-2 gap-2">
            {metodos.map((m) => {
              const Icon = METODO_ICON[m];
              const activo = pago === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPago(m)}
                  className={cn(
                    "flex items-center gap-2 rounded-2xl border px-3 py-3 text-left text-sm font-medium transition-all",
                    activo
                      ? "border-coffee bg-coffee text-cream-50 shadow-soft"
                      : "border-beige-dark bg-cream-50 text-ink-soft hover:border-coffee/40"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {PAYMENT_METHOD_LABEL[m]}
                </button>
              );
            })}
          </div>
          {pago === "mercado_pago" && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-faint">
              <Wallet className="h-3.5 w-3.5" />
              Te llevamos a Mercado Pago para pagar de forma segura. No guardamos datos
              de tu tarjeta.
            </p>
          )}
        </Campo>

        <Campo label="Comentarios" hint="Opcional">
          <textarea
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
            rows={3}
            placeholder="Ej: sin sal · tocar timbre · paso a retirar 13:15"
            className={cn(inputCls(false), "resize-none")}
          />
        </Campo>

        {errorMsg && (
          <p className="flex items-start gap-2 rounded-2xl border border-red-300/60 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {errorMsg}
          </p>
        )}
      </div>

      <div className="sticky bottom-0 mt-auto border-t border-beige-dark/60 bg-cream-50/95 px-4 py-4 backdrop-blur sm:px-5">
        <div className="mb-1 flex items-center justify-between text-sm text-ink-soft">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {envio > 0 && (
          <div className="mb-1 flex items-center justify-between text-sm text-ink-soft">
            <span>Envío{zonaSel ? ` · ${zonaSel.name}` : ""}</span>
            <span>{formatPrice(envio)}</span>
          </div>
        )}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm text-ink-soft">Total estimado</span>
          <span className="font-display text-xl font-semibold text-coffee-dark">
            {formatPrice(totalEstimado)}
          </span>
        </div>
        <button
          type="button"
          onClick={enviar}
          disabled={enviando}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-card transition-all active:scale-[0.98] disabled:opacity-70",
            pago === "mercado_pago" && config.orderingEnabled
              ? "bg-[#009EE3] hover:brightness-105"
              : !config.orderingEnabled
                ? "bg-[#25D366] hover:brightness-105"
                : "bg-bordo hover:bg-bordo-dark"
          )}
        >
          {enviando ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Procesando…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {ctaLabel}
            </>
          )}
        </button>
        <p className="mt-2 text-center text-[11px] leading-relaxed text-ink-faint">
          {config.orderingEnabled
            ? "Tu pedido queda registrado. El costo final y la demora se confirman con el local."
            : "Pedido sujeto a confirmación del local. El costo de envío se coordina por WhatsApp."}
        </p>
      </div>
    </div>
  );
}

/* ---------- subcomponentes de formulario ---------- */

function inputCls(error: boolean): string {
  return cn(
    "w-full rounded-2xl border bg-cream-50 px-4 py-3 text-sm text-ink shadow-soft outline-none transition-all placeholder:text-ink-faint focus:ring-2",
    error
      ? "border-bordo/60 focus:border-bordo focus:ring-bordo/15"
      : "border-beige-dark focus:border-coffee/40 focus:ring-coffee/10"
  );
}

function Campo({
  label,
  hint,
  requerido,
  error,
  children,
}: {
  label: string;
  hint?: string;
  requerido?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-coffee-dark">
        {label}
        {requerido && <span className="text-bordo">*</span>}
        {hint && <span className="text-xs font-normal text-ink-faint">({hint})</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-bordo">{error}</p>}
    </div>
  );
}

function ToggleTipo({
  activo,
  onClick,
  icon: Icon,
  titulo,
  sub,
  disabled,
}: {
  activo: boolean;
  onClick: () => void;
  icon: typeof Store;
  titulo: string;
  sub: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex flex-col items-start gap-1 rounded-2xl border px-3.5 py-3 text-left transition-all disabled:cursor-not-allowed disabled:opacity-50",
        activo
          ? "border-bordo bg-bordo/5 shadow-soft"
          : "border-beige-dark bg-cream-50 hover:border-coffee/40"
      )}
    >
      <span
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full",
          activo ? "bg-bordo text-white" : "bg-beige text-coffee"
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-sm font-semibold text-coffee-dark">{titulo}</span>
      <span className="text-xs text-ink-faint">{sub}</span>
    </button>
  );
}
