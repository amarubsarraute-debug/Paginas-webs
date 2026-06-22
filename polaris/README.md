# POLARIS

App personal de evolución y anti-procrastinación. PWA estática (HTML/CSS/JS puro, sin build, sin backend). Funciona offline y se instala como app.

## Correr en local

Una PWA necesita `http://` (no `file://`). Parado en esta carpeta:

```bash
# Opción 1 — Python
python -m http.server 8080

# Opción 2 — Node
npx serve -l 8080
```

Abrí http://localhost:8080 en Chrome.

## Cargar tu contenido

El contenido personal NO viene en el código (privacidad). Vive en `seed/mi-seed.json`.

1. En la app: **Progreso → Datos → ⭐ Importar mi contenido**.
2. En local lo toma solo de `seed/mi-seed.json`.
3. Si está hosteada (sin el seed), te abre un selector: elegí tu `mi-seed.json`.

Tus datos quedan en el `localStorage` del navegador. Para editarlos, copiá `seed/mi-seed.example.json` a `seed/mi-seed.json` y completalo.

## Instalar como app

En Chrome (escritorio): ícono de instalar en la barra de direcciones → **Instalar POLARIS**.
En iPhone (Safari): Compartir → **Agregar a inicio**.

Tras instalarla, abre offline y aparece como app propia.

## Deploy (hosting gratis)

Es estática: cualquier host sirve.

- **Netlify**: arrastrá la carpeta `polaris` a https://app.netlify.com/drop. Te da una URL.
- **GitHub Pages**: subí el repo y activá Pages sobre la raíz.
- **Cloudflare Pages / Vercel**: conectá el repo, sin build command, output = raíz.

⚠️ **IMPORTANTE — privacidad:** antes de subir, **borrá o excluí `seed/mi-seed.json`**. Ese archivo tiene tu contenido personal y no debe quedar público. (El `.gitignore` ya lo excluye de git; si subís arrastrando la carpeta, borralo primero.) Después cargás tu contenido en la app con el selector de archivo.

## Notificaciones

**Progreso → Notificaciones → Activar.** Tres avisos:
- **Recordatorio diario** (hora configurable) — para abrirla.
- **Protección de racha** — si te faltan hábitos al final del día.
- **Fin de bloque** — cuando termina el timer.

Sin backend, disparan de forma fiable **mientras Chrome esté corriendo**. Para avisos a hora exacta con el navegador cerrado haría falta un servidor de push (fase futura, opcional).

## Estructura

```
index.html              # markup + carga de scripts
manifest.webmanifest    # PWA
sw.js                   # service worker (offline + install)
css/styles.css          # estilos + fuentes self-hosted
js/                     # data, state, ui, timer, app
  screens/              # hoy, polaris, personaje, shadow, progreso
  modules/              # visualizacion, inseguridades, constraint
  notifications.js  dataio.js
assets/icons  assets/fonts
seed/                   # mi-seed.json (privado)  ·  mi-seed.example.json (plantilla)
```
