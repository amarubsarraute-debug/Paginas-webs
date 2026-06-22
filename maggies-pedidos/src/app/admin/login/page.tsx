"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "No se pudo iniciar sesión.");
      const next = new URLSearchParams(window.location.search).get("next") || "/admin";
      router.push(next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-coffee font-display text-2xl text-cream-50">
            M
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold text-coffee-dark">
            Panel del negocio
          </h1>
          <p className="mt-1 text-sm text-ink-soft">Ingresá la contraseña para continuar.</p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-3xl border border-beige-dark/60 bg-cream-50 p-6 shadow-card"
        >
          <label className="mb-1.5 block text-sm font-semibold text-coffee-dark">Contraseña</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              placeholder="••••••••"
              className="w-full rounded-2xl border border-beige-dark bg-cream-50 py-3 pl-11 pr-4 text-sm text-ink shadow-soft outline-none transition-all focus:border-coffee/40 focus:ring-2 focus:ring-coffee/10"
            />
          </div>

          {error && (
            <p className="mt-3 flex items-center gap-2 text-sm text-bordo">
              <AlertCircle className="h-4 w-4" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-bordo px-6 py-3 text-sm font-semibold text-white shadow-card transition-all hover:bg-bordo-dark active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
