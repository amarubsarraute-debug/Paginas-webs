"use client";

import type { MenuItem } from "@/types/menu";
import { useMenu } from "@/hooks/useMenu";
import FeaturedSection from "@/components/FeaturedSection";
import MenuSection from "@/components/MenuSection";

/**
 * Une la carga del menú (CSV de Google Sheets con respaldo local) con las
 * secciones que lo consumen: Recomendados + Menú completo.
 * Recibe el menú local renderizado en el servidor como respaldo inicial.
 */
export default function MenuExperience({ fallbackMenu }: { fallbackMenu: MenuItem[] }) {
  const { items, estado, cargando } = useMenu(fallbackMenu);

  return (
    <>
      <FeaturedSection items={items} />
      <MenuSection items={items} estado={estado} cargando={cargando} />
    </>
  );
}
