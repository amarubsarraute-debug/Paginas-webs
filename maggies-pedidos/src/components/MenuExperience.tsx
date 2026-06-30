"use client";

import type { MenuItem } from "@/types/menu";
import { useMenu } from "@/hooks/useMenu";
import PizarraDelDia from "@/components/PizarraDelDia";
import FeaturedSection from "@/components/FeaturedSection";
import MenuSection from "@/components/MenuSection";

export default function MenuExperience({ fallbackMenu }: { fallbackMenu: MenuItem[] }) {
  const { items, estado, cargando } = useMenu(fallbackMenu);

  return (
    <>
      <PizarraDelDia items={items} />
      <FeaturedSection items={items} />
      <MenuSection items={items} estado={estado} cargando={cargando} />
    </>
  );
}
