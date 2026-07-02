# 🚗 Automotora Fede Desal — Sitio web

Sitio web estático (HTML + CSS + JavaScript), **sin programas ni instalaciones**. El stock de vehículos se carga **solo** desde una planilla de Google Sheets que vos controlás: agregás una fila → aparece un auto en la web. Sacás una fila → desaparece.

---

## 📂 Qué hay adentro

```
fede-desal-web/
├── index.html          ← Inicio
├── vehiculos.html      ← Catálogo con filtros
├── financiacion.html   ← Financiación
├── nosotros.html       ← Quiénes somos
├── testimonios.html    ← Opiniones
├── contacto.html       ← Contacto + mapa
├── css/style.css       ← Diseño (no hace falta tocar)
├── js/
│   ├── config.js       ← ⚙️ EL ÚNICO ARCHIVO QUE EDITÁS
│   ├── main.js         ← Interacciones (no tocar)
│   └── vehiculos.js    ← Lógica del stock (no tocar)
├── img/
│   ├── logo.png        ← (ponés tu logo acá)
│   └── autos/          ← fotos de cada auto, una carpeta por ID
├── .htaccess           ← configuración del servidor (dejalo)
└── README.md           ← este archivo
```

---

## ✅ Puesta en marcha en 3 pasos

### Paso 1 — Subir la carpeta a Hostinger
1. Entrá a tu panel de **Hostinger → Administrador de archivos** (o por FTP).
2. Entrá a la carpeta `public_html`.
3. **Arrastrá adentro TODO el contenido** de la carpeta `fede-desal-web` (no la carpeta, sino lo que tiene adentro: `index.html`, `css`, `js`, `img`, etc.).
4. Listo: entrá a tu dominio y ya se ve el sitio.

> 💡 También podés abrir `index.html` con doble clic en tu compu para verlo, pero **el stock solo carga estando subido a internet** (Google bloquea la conexión en modo local).

### Paso 2 — Crear y publicar tu planilla de stock
1. Entrá a **Google Sheets** y creá una planilla nueva (o usá la que ya tengas).
2. Renombrá la pestaña de abajo a la izquierda como **`Stock`** (exactamente así, con S mayúscula).
3. Copiá la tabla de columnas (más abajo 👇) en la **primera fila** (la fila de títulos).
4. Cargá tus autos, una fila por vehículo.
5. **Publicá la planilla para que la web pueda leerla:**
   - Menú **Archivo → Compartir → Publicar en la web**.
   - En el cuadro, elegí la pestaña **Stock** y formato **Página web** → botón **Publicar**.
   - Además, arriba a la derecha, botón **Compartir → Acceso general → "Cualquier persona con el enlace" → Lector**.

### Paso 3 — Pegar el ID de la planilla en `config.js`
1. Mirá la **URL** de tu planilla en el navegador. Se ve así:
   ```
   https://docs.google.com/spreadsheets/d/1A2B3C4D5E6F7G8H9I0J.../edit#gid=0
   ```
2. El **SHEET_ID** es lo que está entre `/d/` y `/edit`:
   ```
   1A2B3C4D5E6F7G8H9I0J...
   ```
3. Abrí `js/config.js` y pegalo:
   ```js
   const CONFIG = {
     SHEET_ID: "1A2B3C4D5E6F7G8H9I0J...",  // 👈 acá tu ID
     SHEET_NAME: "Stock",
     WHATSAPP: "59896187061",
     WHATSAPP_MSG_GENERAL: "Hola, me contacto desde la web de Automotora Fede Desal."
   };
   ```
4. Guardá el archivo y subilo de nuevo a Hostinger (reemplazando el anterior).

**¡Listo!** Cada cambio en la planilla se refleja en la web (puede tardar unos minutos por la caché de Google).

---

## 📊 Columnas de la planilla (copialas EXACTAS en la fila 1)

| Columna | Nombre exacto en la planilla | Ejemplo |
|---|---|---|
| A | id | 001 |
| B | marca | Toyota |
| C | modelo | Hilux |
| D | version | SR 4x4 |
| E | anio | 2019 |
| F | km | 85000 |
| G | combustible | Diesel |
| H | caja | Manual |
| I | color | Blanco |
| J | precio | 32000 |
| K | moneda | USD |
| L | financiado | SI |
| M | anticipo | 30% |
| N | cuotas | 60 |
| O | estado | disponible |
| P | comentario | Único dueño, service oficial |
| Q | fotos | img/autos/001/1.jpg,img/autos/001/2.jpg |
| R | destacado | SI |

**Notas de valores:**
- **estado**: `disponible`, `reservado` o `vendido`.
- **destacado**: `SI` para que el auto aparezca en la página de Inicio (máximo 6). Dejalo vacío o `NO` si no.
- **financiado**: `SI` muestra el cartelito de "Financiación". Vacío o `NO` lo oculta.
- **moneda**: `USD` muestra `US$`; cualquier otra cosa muestra `$`.
- **precio**: solo números (sin puntos ni símbolos). Si lo dejás vacío, la web muestra **"Consultar"**.
- **km**: solo números (ej: `85000`). La web lo formatea como `85.000 km`.
- **fotos**: rutas separadas por **coma, sin espacios**. La primera foto es la principal de la tarjeta.

---

## 🖼️ Cómo cargar las fotos de cada auto

1. Por cada auto, creá una carpeta dentro de `img/autos/` con el **mismo ID** de la planilla.
   Ej: el auto `001` → carpeta `img/autos/001/`.
2. Meté adentro las fotos numeradas: `1.jpg`, `2.jpg`, `3.jpg`, …
3. En la columna **fotos** de la planilla, escribí las rutas separadas por coma:
   ```
   img/autos/001/1.jpg,img/autos/001/2.jpg,img/autos/001/3.jpg
   ```
4. Subí las carpetas de fotos a Hostinger (dentro de `public_html/img/autos/`).

> 📸 **Ya te dejé las fotos cargadas** de los primeros vehículos en `img/autos/001/` a `img/autos/015/` (sacadas de tu Instagram). Solo tenés que crear las filas en la planilla apuntando a ellas. Mirá `img/autos/_INDICE.txt` para ver qué modelo es cada ID y sus rutas listas para pegar.
>
> Si una foto no carga, la web muestra automáticamente un ícono de auto gris (no se rompe nada).

---

## ✏️ Otras personalizaciones rápidas

- **Logo:** poné tu archivo en `img/logo.png` y, si querés que reemplace al texto "FEDE DESAL", avisame y lo cambio (por ahora es un texto estilizado).
- **WhatsApp:** se cambia en `js/config.js` (campo `WHATSAPP`, con código de país `598`, sin `+` ni espacios).
- **Horarios y dirección:** están en `contacto.html` y en el pie de todas las páginas (buscá "Santa Teresa" o "Horario").
- **Testimonios:** están escritos en `index.html` y `testimonios.html` (buscá "testi-quote").

---

## ❓ Problemas comunes

- **"No se pudo cargar el stock"** → revisá que: (1) pegaste bien el `SHEET_ID`, (2) la pestaña se llama exactamente `Stock`, (3) publicaste la planilla y la compartiste como "cualquiera con el enlace".
- **Subí cambios y no se ven** → es la caché. Esperá unos minutos o abrí con `Ctrl + Shift + R`.
- **Una foto no aparece** → revisá que la ruta en la columna `fotos` sea idéntica a la ubicación del archivo (mayúsculas/minúsculas cuentan).

---

## 🔧 Detalles técnicos (para quien sepa)

- 100% estático: HTML + CSS + JavaScript vanilla. **Sin npm, sin build, sin frameworks.**
- El stock se lee del endpoint **gviz** de Google Sheets (`/gviz/tq?tqx=out:json`) y se parsea en `js/vehiculos.js`.
- Funciona en cualquier hosting estático (Hostinger, Netlify, Vercel, GitHub Pages).
- El `.htaccess` evita que Hostinger sirva versiones viejas tras cada actualización.
