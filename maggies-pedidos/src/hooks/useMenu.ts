"use client";

import { useEffect, useState } from "react";
import type { EstadoMenu, FuenteMenu, MenuItem } from "@/types/menu";
import { getCsvUrl, parseMenuCSV } from "@/lib/menu";

interface UseMenuResult {
  items: MenuItem[];
  estado: EstadoMenu;
  fuente: FuenteMenu;
  /** true mientras se intenta cargar el CSV por primera vez. */
  cargando: boolean;
}

/**
 * Carga el menú del día.
 *  - Recibe el menú LOCAL como respaldo (renderizado en el servidor).
 *  - Si existe NEXT_PUBLIC_MENU_CSV_URL, intenta traer el CSV de Google Sheets.
 *  - Si el CSV falla o viene vacío, se queda con el menú local (sin romper).
 */
export function useMenu(fallback: MenuItem[]): UseMenuResult {
  const [items, setItems] = useState<MenuItem[]>(fallback);
  const [estado, setEstado] = useState<EstadoMenu>("listo");
  const [fuente, setFuente] = useState<FuenteMenu>("local");

  useEffect(() => {
    const url = getCsvUrl();
    if (!url) {
      // Sin CSV configurado: usamos el menú local y listo.
      setEstado("listo");
      setFuente("local");
      return;
    }

    let cancelado = false;
    setEstado("cargando");

    fetch(url, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((csv) => {
        if (cancelado) return;
        const parsed = parseMenuCSV(csv);
        if (parsed.length > 0) {
          setItems(parsed);
          setFuente("csv");
          setEstado("listo");
        } else {
          // CSV vacío o con formato inesperado: nos quedamos con el local.
          setFuente("local");
          setEstado("listo");
        }
      })
      .catch(() => {
        if (cancelado) return;
        // Error de red / CORS / planilla no publicada: respaldo local.
        setFuente("local");
        setEstado("error");
      });

    return () => {
      cancelado = true;
    };
  }, []);

  return { items, estado, fuente, cargando: estado === "cargando" };
}
