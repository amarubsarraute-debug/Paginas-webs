"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ClipboardList, UtensilsCrossed, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin/orders", label: "Pedidos", icon: ClipboardList },
  { href: "/admin/menu", label: "Menú", icon: UtensilsCrossed },
  { href: "/admin/settings", label: "Configuración", icon: Settings },
];

export default function AdminHeader({ businessName }: { businessName: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 border-b border-beige-dark/60 bg-cream-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/admin" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-coffee font-display text-lg text-cream-50">
            M
          </span>
          <div className="leading-tight">
            <p className="font-display text-base font-semibold text-coffee-dark">{businessName}</p>
            <p className="text-[11px] uppercase tracking-wider text-ink-faint">Panel</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          {NAV.map((n) => {
            const Icon = n.icon;
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-coffee text-cream-50"
                    : "text-ink-soft hover:bg-beige hover:text-coffee"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{n.label}</span>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={logout}
            className="ml-1 inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink-faint transition-colors hover:bg-red-50 hover:text-red-600"
            aria-label="Cerrar sesión"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </nav>
      </div>
    </header>
  );
}
