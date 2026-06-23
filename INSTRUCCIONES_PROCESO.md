# Proceso de Compilación y Despliegue de Páginas Web

Este documento detalla el flujo de trabajo para actualizar las páginas web y las presentaciones de propuestas para tus clientes, diseñado para que puedas importarlo directamente a **Obsidian**.

---

## 🛠️ El Proceso Automatizado (`build-and-scrape-all.js`)

Para las webs desarrolladas en **React / TanStack Start** (como `web-trujillo` y `web-luisa`), no se pueden subir los archivos de desarrollo directamente porque requieren un servidor Node.js corriendo (SSR) que Hostinger no soporta en planes estáticos. 

Para resolver esto, creamos el script [build-and-scrape-all.js](file:///c:/Users/amaru/OneDrive/Escritorio/PAGINAS%20WEB/build-and-scrape-all.js). Este script hace lo siguiente de forma automática:
1. Entra a cada proyecto (`web-trujillo` y `web-luisa`).
2. Instala dependencias si faltan (`npm install`).
3. Compila el proyecto en producción (`npm run build`).
4. Inicia un servidor de previsualización temporal (`vite preview`) en un puerto libre.
5. Captura (scrapea) el HTML renderizado por el servidor.
6. Convierte todas las rutas absolutas (`/assets/`) a rutas relativas (`assets/`) para que funcionen en cualquier subcarpeta.
7. Copia todos los recursos (imágenes, estilos, videos `.mp4`) a las carpetas estáticas finales (`web-trujillo/` y `web-luisa/`).
8. Cierra de forma segura el servidor temporal para no dejar puertos bloqueados.

---

## 🚀 Cómo Subir y Actualizar los Cambios

Tenés dos opciones muy sencillas para aplicar y subir tus cambios cuando edites código:

### Opción 1: Hacerlo vos mismo (En 1 Clic)
En la carpeta raíz del proyecto tenés el archivo [🚀 SUBIR A GITHUB (HOSTINGER).bat](file:///c:/Users/amaru/OneDrive/Escritorio/PAGINAS%20WEB/%F0%9F%9A%80%20SUBIR%20A%20GITHUB%20(HOSTINGER).bat).
1. Realizás los cambios que quieras en tus archivos o carpetas.
2. Hacés **doble clic** sobre el archivo `.bat`.
3. El script compilará todo, guardará los cambios en Git y los subirá a GitHub automáticamente. Hostinger detectará la actualización y la pondrá online al instante.

### Opción 2: Pedírmelo a mí (AI)
Si preferís que yo me encargue, solo tenés que escribirme un mensaje diciendo:
> *"Ya hice los cambios, actualizá las webs y subí todo a Hostinger."*

Yo ejecutaré el comando:
```bash
node build-and-scrape-all.js
```
Y luego subiré los cambios modificados a tu repositorio de GitHub con:
```bash
git add .
git commit -m "Actualizacion de contenidos"
git push origin main
```

---

## 📂 Estructura Final del Sitio en el Hosting

Tu dominio temporal en Hostinger (`https://darkgreen-echidna-916222.hostingersite.com/`) está estructurado de la siguiente forma:

* **Raíz (`/`)**: Aloja las presentaciones de propuestas interactivas que les enviás a los clientes.
  * [propuesta-automotora-fede-desal.html](file:///c:/Users/amaru/OneDrive/Escritorio/PAGINAS%20WEB/propuesta-automotora-fede-desal.html)
  * [propuesta-basil-sanitario.html](file:///c:/Users/amaru/OneDrive/Escritorio/PAGINAS%20WEB/propuesta-basil-sanitario.html)
  * [propuesta-calor-charrua.html](file:///c:/Users/amaru/OneDrive/Escritorio/PAGINAS%20WEB/propuesta-calor-charrua.html)
  * [propuesta-dra-luisa-cedeno.html](file:///c:/Users/amaru/OneDrive/Escritorio/PAGINAS%20WEB/propuesta-dra-luisa-cedeno.html)
  * [propuesta-electricidad-la-barra.html](file:///c:/Users/amaru/OneDrive/Escritorio/PAGINAS%20WEB/propuesta-electricidad-la-barra.html)
  * [propuesta-web-trujillo.html](file:///c:/Users/amaru/OneDrive/Escritorio/PAGINAS%20WEB/propuesta-web-trujillo.html)
* **Subcarpetas (`/[cliente]/index.html`)**: Alojan las páginas web individuales que se cargan dentro del iframe de la propuesta:
  * `/basil-sanitario/index.html` (Web de Basil Sanitario)
  * `/fede-desal-web/index.html` (Web de Automotora Fede Desal)
  * `/calorcharrua/index.html` (Web de Calor Charrúa)
  * `/electricidad-la-barra/index.html` (Web de Electricidad La Barra)
  * `/web-trujillo/index.html` (Web de Trujillo Abogadas - *Estática Compilada*)
  * `/web-luisa/index.html` (Web de Dra. Luisa Cedeño - *Estática Compilada*)
