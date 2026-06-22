"use client";

import type { ReactNode } from "react";
import { CartProvider, type CheckoutConfig } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import StickyMobileBar from "@/components/StickyMobileBar";

/**
 * Envuelve toda la app con el estado del carrito y monta las piezas
 * globales (drawer del carrito + barra inferior mobile), que necesitan
 * estar dentro del CartProvider. `config` se inyecta desde el layout
 * (servidor) con los datos del negocio, zonas y métodos de pago.
 */
export default function Providers({
  children,
  config,
}: {
  children: ReactNode;
  config?: CheckoutConfig;
}) {
  return (
    <CartProvider config={config}>
      {children}
      <CartDrawer />
      <StickyMobileBar />
    </CartProvider>
  );
}
