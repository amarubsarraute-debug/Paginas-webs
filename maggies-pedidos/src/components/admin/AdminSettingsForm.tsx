"use client";

import { useState } from "react";
import { Save, Loader2, CheckCircle2, Bike, Wallet, Truck } from "lucide-react";
import type { Business, DeliveryZone, PaymentMethod } from "@/types/db";
import { PAYMENT_METHOD_LABEL } from "@/lib/orderLabels";
import { cn, formatPrice } from "@/lib/utils";

const ALL_METHODS: PaymentMethod[] = [
  "cash",
  "bank_transfer",
  "mercado_pago",
  "card_on_pickup",
  "coordinate_whatsapp",
];

export default function AdminSettingsForm({
  business,
  zones,
  configured,
}: {
  business: Business | null;
  zones: DeliveryZone[];
  configured: boolean;
}) {
  const [form, setForm] = useState({
    name: business?.name ?? "",
    tagline: business?.tagline ?? "",
    address: business?.address ?? "",
    phone: business?.phone ?? "",
    whatsapp_number: business?.whatsapp_number ?? "",
    instagram_url: business?.instagram_url ?? "",
    google_maps_url: business?.google_maps_url ?? "",
    delivery_enabled: business?.delivery_enabled ?? true,
    mercado_pago_enabled: business?.mercado_pago_enabled ?? false,
    payment_methods: (business?.payment_methods ?? []) as PaymentMethod[],
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  function toggleMethod(m: PaymentMethod) {
    setForm((f) => ({
      ...f,
      payment_methods: f.payment_methods.includes(m)
        ? f.payment_methods.filter((x) => x !== m)
        : [...f.payment_methods, m],
    }));
    setSaved(false);
  }

  async function guardar() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/settings/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "No se pudo guardar.");
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setSaving(false);
    }
  }

  if (!configured || !business) {
    return (
      <div className="mt-6 rounded-3xl border border-amber-300/60 bg-amber-50 px-5 py-4 text-sm text-amber-800">
        La base de datos no está conectada. Por ahora, los datos del negocio se editan en{" "}
        <code className="font-mono">src/config/business.ts</code>. Conectá Supabase (ver
        README) para gestionarlos desde acá.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <Section title="Datos del negocio">
        <Field label="Nombre">
          <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
        <Field label="Eslogan">
          <input className={inputCls} value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
        </Field>
        <Field label="Dirección">
          <input className={inputCls} value={form.address} onChange={(e) => set("address", e.target.value)} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Teléfono">
            <input className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </Field>
          <Field label="WhatsApp (formato 598…)">
            <input
              className={inputCls}
              value={form.whatsapp_number}
              onChange={(e) => set("whatsapp_number", e.target.value)}
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Instagram (URL)">
            <input className={inputCls} value={form.instagram_url} onChange={(e) => set("instagram_url", e.target.value)} />
          </Field>
          <Field label="Google Maps (URL)">
            <input className={inputCls} value={form.google_maps_url} onChange={(e) => set("google_maps_url", e.target.value)} />
          </Field>
        </div>
      </Section>

      <Section title="Delivery y pagos">
        <Toggle
          icon={Bike}
          label="Delivery activo"
          desc="Permití pedidos con envío a domicilio."
          checked={form.delivery_enabled}
          onChange={(v) => set("delivery_enabled", v)}
        />
        <Toggle
          icon={Wallet}
          label="Mercado Pago activo"
          desc="Mostrá el pago online (requiere access token configurado)."
          checked={form.mercado_pago_enabled}
          onChange={(v) => set("mercado_pago_enabled", v)}
        />
        <div>
          <p className="mb-2 text-sm font-semibold text-coffee-dark">Métodos de pago activos</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {ALL_METHODS.map((m) => (
              <label
                key={m}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-2xl border px-3 py-2.5 text-sm transition-colors",
                  form.payment_methods.includes(m)
                    ? "border-coffee bg-coffee/5 text-coffee-dark"
                    : "border-beige-dark bg-cream-50 text-ink-soft"
                )}
              >
                <input
                  type="checkbox"
                  checked={form.payment_methods.includes(m)}
                  onChange={() => toggleMethod(m)}
                  className="h-4 w-4 accent-coffee"
                />
                {PAYMENT_METHOD_LABEL[m]}
              </label>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Zonas de delivery">
        <div className="flex items-start gap-2 rounded-2xl bg-beige/40 px-4 py-3 text-xs text-coffee-light">
          <Truck className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Las zonas se administran por ahora desde la base (tabla{" "}
            <code className="font-mono">delivery_zones</code>). Listado actual:
          </span>
        </div>
        <ul className="divide-y divide-beige-dark/40">
          {zones.map((z) => (
            <li key={z.id} className="flex items-center justify-between py-2 text-sm">
              <span className="text-coffee-dark">{z.name}</span>
              <span className="text-ink-soft">
                {z.price > 0 ? formatPrice(Number(z.price)) : "Sin cargo"}
              </span>
            </li>
          ))}
          {zones.length === 0 && <li className="py-2 text-sm text-ink-faint">Sin zonas cargadas.</li>}
        </ul>
      </Section>

      {error && <p className="text-sm text-bordo">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={guardar}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-bordo px-6 py-3 text-sm font-semibold text-white shadow-card transition-colors hover:bg-bordo-dark disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Guardar cambios
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-sage-dark">
            <CheckCircle2 className="h-4 w-4" />
            Guardado
          </span>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4 rounded-3xl border border-beige-dark/50 bg-cream-50 p-6 shadow-soft">
      <h2 className="font-display text-lg font-semibold text-coffee-dark">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-coffee-dark">{label}</label>
      {children}
    </div>
  );
}

function Toggle({
  icon: Icon,
  label,
  desc,
  checked,
  onChange,
}: {
  icon: typeof Bike;
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 rounded-2xl border border-beige-dark bg-cream-50 px-4 py-3 text-left"
    >
      <span className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-beige text-coffee">
          <Icon className="h-4 w-4" />
        </span>
        <span>
          <span className="block text-sm font-semibold text-coffee-dark">{label}</span>
          <span className="block text-xs text-ink-faint">{desc}</span>
        </span>
      </span>
      <span
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-sage" : "bg-beige-dark"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
            checked ? "left-[1.375rem]" : "left-0.5"
          )}
        />
      </span>
    </button>
  );
}

const inputCls =
  "w-full rounded-2xl border border-beige-dark bg-cream-50 px-4 py-2.5 text-sm text-ink outline-none transition-all focus:border-coffee/40 focus:ring-2 focus:ring-coffee/10";
