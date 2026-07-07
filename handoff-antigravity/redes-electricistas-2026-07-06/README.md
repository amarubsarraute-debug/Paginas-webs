# Handoff para Antigravity - redes electricistas

Fecha: 2026-07-06

Esta carpeta contiene todo lo necesario para aplicar redes sociales y mails a las webs del lote de electricistas.

## Archivos

- `redes-electricistas.json`: datos finales por carpeta/slug.
- `apply-redes-electricistas.js`: script opcional para aplicar los datos en cada web.

## Como usar

Desde la raiz del workspace `PAGINAS WEB`, ejecutar:

```powershell
node .\handoff-antigravity\redes-electricistas-2026-07-06\apply-redes-electricistas.js --dry-run
```

Si no aparecen carpetas faltantes, aplicar:

```powershell
node .\handoff-antigravity\redes-electricistas-2026-07-06\apply-redes-electricistas.js
```

Despues compilar las webs tocadas con:

```powershell
npm.cmd run build
```

## Que hace el script

1. Busca cada carpeta por `slug`.
2. Actualiza `src/lib/constants.ts`.
3. Agrega o reemplaza `SOCIAL_LINKS`.
4. Completa `EMAIL` solo cuando hay mail confirmado.
5. Actualiza `src/components/Footer.tsx` para mostrar iconos de redes solo cuando `SOCIAL_LINKS.length > 0`.

## Criterio usado

Solo se cargaron Facebook, Instagram, LinkedIn y mails con coincidencia fuerte por nombre, zona, telefono o fuente asociada. No se cargaron publicaciones sueltas en grupos de Facebook como si fueran pagina oficial.

## Totales

- 27 webs en el lote.
- 19 con al menos una red confirmada.
- 11 con Facebook confirmado.
- 5 con mail confirmado.
- 8 sin red confirmada.

## Importante

No inventar datos para los que figuran con `socialLinks: []` o `email: null`.

En `gonzalo-chacon-electricista-urgencias-24-horas`, Facebook muestra `chacongonzalo2020@gmail.com`; se dejo ese mail para esta entrega aunque la web oficial muestra otra variante.
