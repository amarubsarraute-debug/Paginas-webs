"use client";

import { useEffect, useState } from "react";
import { MapPin, ShoppingBag } from "lucide-react";
import { businessConfig } from "@/config/business";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export default function Header() {
  const { cantidadTotal, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-cream-50/90 backdrop-blur-md shadow-soft border-b border-beige-dark/40"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#inicio" className="group flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/maggies-logo.png"
            alt="Logo Maggie's"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover shadow-soft"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold text-coffee-dark">
              {businessConfig.name}
            </span>
            <span className="hidden text-[11px] font-medium uppercase tracking-wider text-ink-faint sm:block">
              Cafetería & Rotisería
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-ink-soft md:flex">
          <a href="#menu" className="transition-colors hover:text-bordo">
            Menú de hoy
          </a>
          <a href="#como-funciona" className="transition-colors hover:text-bordo">
            Cómo funciona
          </a>
          <a href="#ubicacion" className="transition-colors hover:text-bordo">
            Ubicación
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1 text-xs text-ink-faint lg:flex">
            <MapPin className="h-3.5 w-3.5" />
            {businessConfig.city}
          </span>
          <button
            type="button"
            onClick={openCart}
            aria-label="Abrir carrito"
            className="relative flex items-center gap-2 rounded-full bg-coffee px-4 py-2 text-sm font-semibold text-cream-50 shadow-soft transition-all hover:bg-coffee-dark active:scale-95"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Carrito</span>
            {cantidadTotal > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-bordo px-1 text-[11px] font-bold text-white ring-2 ring-cream-50">
                {cantidadTotal}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
