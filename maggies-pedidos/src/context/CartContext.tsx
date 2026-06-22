"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, MenuItem } from "@/types/menu";
import type { PaymentMethod } from "@/types/db";
import { calcularSubtotal, contarUnidades } from "@/lib/whatsapp";
import { businessConfig } from "@/config/business";

const STORAGE_KEY = "maggies-carrito-v1";

/** Configuración de checkout inyectada desde el servidor (layout). */
export interface CheckoutConfig {
  slug: string;
  name: string;
  whatsappNumber: string;
  deliveryEnabled: boolean;
  mercadoPagoEnabled: boolean;
  paymentMethods: PaymentMethod[];
  zones: { id: string; name: string; price: number }[];
  /** true si se pueden crear órdenes reales (Supabase configurado). */
  orderingEnabled: boolean;
}

/** Respaldo cuando no se inyecta config (modo solo-WhatsApp). */
export const DEFAULT_CHECKOUT_CONFIG: CheckoutConfig = {
  slug: "maggies",
  name: businessConfig.name,
  whatsappNumber: businessConfig.whatsappNumber,
  deliveryEnabled: true,
  mercadoPagoEnabled: false,
  paymentMethods: ["cash", "bank_transfer", "card_on_pickup", "coordinate_whatsapp"],
  zones: [],
  orderingEnabled: false,
};

type CartAction =
  | { type: "add"; item: MenuItem }
  | { type: "increment"; id: string }
  | { type: "decrement"; id: string }
  | { type: "setQty"; id: string; cantidad: number }
  | { type: "remove"; id: string }
  | { type: "clear" }
  | { type: "hydrate"; items: CartItem[] };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "add": {
      const existente = state.find((i) => i.id === action.item.id);
      if (existente) {
        return state.map((i) =>
          i.id === action.item.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [...state, { ...action.item, cantidad: 1 }];
    }
    case "increment":
      return state.map((i) =>
        i.id === action.id ? { ...i, cantidad: i.cantidad + 1 } : i
      );
    case "decrement":
      return state
        .map((i) => (i.id === action.id ? { ...i, cantidad: i.cantidad - 1 } : i))
        .filter((i) => i.cantidad > 0);
    case "setQty":
      return state
        .map((i) =>
          i.id === action.id ? { ...i, cantidad: Math.max(0, action.cantidad) } : i
        )
        .filter((i) => i.cantidad > 0);
    case "remove":
      return state.filter((i) => i.id !== action.id);
    case "clear":
      return [];
    case "hydrate":
      return action.items;
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  subtotal: number;
  cantidadTotal: number;
  isOpen: boolean;
  config: CheckoutConfig;
  addItem: (item: MenuItem) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  setQuantity: (id: string, cantidad: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  getQuantity: (id: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  children,
  config = DEFAULT_CHECKOUT_CONFIG,
}: {
  children: ReactNode;
  config?: CheckoutConfig;
}) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [isOpen, setIsOpen] = useState(false);
  const [hidratado, setHidratado] = useState(false);

  // Cargar carrito guardado al montar (solo en cliente).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) dispatch({ type: "hydrate", items: parsed });
      }
    } catch {
      /* localStorage no disponible o JSON inválido: arrancamos vacío */
    }
    setHidratado(true);
  }, []);

  // Guardar cambios del carrito.
  useEffect(() => {
    if (!hidratado) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* sin persistencia */
    }
  }, [items, hidratado]);

  // Bloquear scroll del body cuando el drawer está abierto.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const addItem = useCallback((item: MenuItem) => dispatch({ type: "add", item }), []);
  const increment = useCallback((id: string) => dispatch({ type: "increment", id }), []);
  const decrement = useCallback((id: string) => dispatch({ type: "decrement", id }), []);
  const setQuantity = useCallback(
    (id: string, cantidad: number) => dispatch({ type: "setQty", id, cantidad }),
    []
  );
  const removeItem = useCallback((id: string) => dispatch({ type: "remove", id }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const getQuantity = useCallback(
    (id: string) => items.find((i) => i.id === id)?.cantidad ?? 0,
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      subtotal: calcularSubtotal(items),
      cantidadTotal: contarUnidades(items),
      isOpen,
      config,
      addItem,
      increment,
      decrement,
      setQuantity,
      removeItem,
      clear,
      openCart,
      closeCart,
      getQuantity,
    }),
    [
      items,
      isOpen,
      config,
      addItem,
      increment,
      decrement,
      setQuantity,
      removeItem,
      clear,
      openCart,
      closeCart,
      getQuantity,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de <CartProvider>.");
  }
  return ctx;
}
