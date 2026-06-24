/* =============================================================================
   CONFIG.JS  —  ⚙️  EL ÚNICO ARCHIVO QUE NECESITÁS EDITAR
   -----------------------------------------------------------------------------
   1) Pegá el ID de tu planilla de Google en SHEET_ID.
   2) Verificá que SHEET_NAME sea el nombre EXACTO de la pestaña (abajo a la
      izquierda en Google Sheets). Por defecto: "Stock".
   3) El número de WhatsApp va con código de país, sin "+", sin espacios.
   Cómo obtener el SHEET_ID y publicar la planilla: ver el README.md.
   ========================================================================== */
(function () {
  "use strict";

  window.CONFIG = {
    // 👇 El dueño pega su ID acá (lo saca de la URL de su planilla de Google)
    SHEET_ID: "1Q6TqU7fh9S5RaGRhHRn4yK6qNq2j-VVkUsf-nTW5OkA",

    // Nombre EXACTO de la pestaña dentro de la planilla
    SHEET_NAME: "Stock",

    // WhatsApp con código de país, sin "+" ni espacios (Uruguay = 598)
    WHATSAPP: "59896187061",

    // Mensaje por defecto del botón flotante de WhatsApp
    WHATSAPP_MSG_GENERAL: "Hola, me contacto desde la web de Automotora Fede Desal."
  };
})();
