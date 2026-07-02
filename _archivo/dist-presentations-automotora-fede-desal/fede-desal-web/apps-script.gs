/* =============================================================================
   FEDE DESAL — Backend del panel admin (Google Apps Script)
   -----------------------------------------------------------------------------
   QUÉ HACE: recibe los autos desde admin.html, guarda las fotos en una carpeta
   de Google Drive (tuya, públicas) y escribe/edita las filas en la planilla.

   CÓMO INSTALARLO (una sola vez, ~5 min):
   1) Abrí tu planilla de Google (la del Stock).
   2) Menú  Extensiones → Apps Script.
   3) Borrá lo que haya y pegá TODO este archivo.
   4) Arriba, cambiá las 2 líneas de CONFIG:
        - PASSWORD: una contraseña que solo sepas vos y Fede.
        - SHEET_NAME: el nombre EXACTO de la pestaña (por defecto "Stock").
   5) Guardá (ícono del disquete).
   6) Botón  Implementar → Nueva implementación → tipo "Aplicación web".
        - Ejecutar como:  Yo
        - Quién tiene acceso:  Cualquier usuario
        - Implementar.  (La primera vez te pide autorizar: aceptá.)
   7) Copiá la URL que termina en  /exec  y pegala en  js/admin.js  (API_URL).
   ========================================================================== */

/* ----------------------------- CONFIG ----------------------------- */
var PASSWORD   = "fededesal2026";   // 🔒 cambiá esto por tu contraseña
var SHEET_NAME = "Stock";           // nombre de la pestaña de la planilla
var DRIVE_FOLDER = "Fotos Web Fede Desal"; // carpeta de Drive para las fotos

/* Orden de columnas A→R de la planilla (NO cambiar el orden) */
var COLS = ["id","marca","modelo","version","anio","km","combustible","caja",
            "color","precio","moneda","financiado","anticipo","cuotas","estado",
            "comentario","fotos","destacado"];

/* ----------------------------- ENTRADA ----------------------------- */
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents || "{}");
    if (body.password !== PASSWORD) return json({ ok: false, error: "Contraseña incorrecta" });

    var action = body.action;
    if (action === "list")   return json({ ok: true, items: listVehiculos() });
    if (action === "add")    return json({ ok: true, id: addVehiculo(body.vehicle, body.newPhotos) });
    if (action === "update") return json({ ok: true, id: updateVehiculo(body.vehicle, body.keepPhotos, body.newPhotos) });
    if (action === "estado") return json({ ok: true, id: setEstado(body.id, body.estado) });
    if (action === "delete") return json({ ok: true, id: deleteVehiculo(body.id) });
    return json({ ok: false, error: "Acción desconocida" });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json({ ok: true, msg: "API Fede Desal activa. Usá POST." });
}

/* ----------------------------- ACCIONES ----------------------------- */
function listVehiculos() {
  var sh = sheet();
  var last = sh.getLastRow();
  if (last < 2) return [];
  var values = sh.getRange(2, 1, last - 1, COLS.length).getValues();
  return values.map(function (row) {
    var o = {};
    COLS.forEach(function (k, i) { o[k] = row[i]; });
    o.id = String(o.id);
    o.fotos = String(o.fotos || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    return o;
  }).filter(function (o) { return o.marca || o.modelo; });
}

function addVehiculo(v, newPhotos) {
  var sh = sheet();
  var id = v.id && String(v.id).trim() ? String(v.id).trim() : nextId();
  var urls = uploadPhotos(newPhotos, id);
  var row = buildRow(v, id, urls);
  sh.appendRow(row);
  return id;
}

function updateVehiculo(v, keepPhotos, newPhotos) {
  var id = String(v.id).trim();
  var r = findRow(id);
  if (r < 0) throw new Error("No se encontró el auto " + id);
  var urls = (keepPhotos || []).concat(uploadPhotos(newPhotos, id));
  var row = buildRow(v, id, urls);
  sheet().getRange(r, 1, 1, COLS.length).setValues([row]);
  return id;
}

function setEstado(id, estado) {
  var r = findRow(String(id));
  if (r < 0) throw new Error("No se encontró el auto " + id);
  var col = COLS.indexOf("estado") + 1;
  sheet().getRange(r, col).setValue(estado);
  return id;
}

function deleteVehiculo(id) {
  var r = findRow(String(id));
  if (r < 0) throw new Error("No se encontró el auto " + id);
  sheet().deleteRow(r);
  return id;
}

/* ----------------------------- HELPERS ----------------------------- */
function buildRow(v, id, urls) {
  var map = {
    id: id,
    marca: v.marca || "", modelo: v.modelo || "", version: v.version || "",
    anio: v.anio || "", km: v.km || "", combustible: v.combustible || "",
    caja: v.caja || "", color: v.color || "", precio: v.precio || "",
    moneda: v.moneda || "", financiado: v.financiado ? "SI" : "",
    anticipo: v.anticipo || "", cuotas: v.cuotas || "",
    estado: v.estado || "disponible", comentario: v.comentario || "",
    fotos: (urls || []).join(", "), destacado: v.destacado ? "SI" : ""
  };
  return COLS.map(function (k) { return map[k]; });
}

function uploadPhotos(photos, id) {
  if (!photos || !photos.length) return [];
  var folder = getFolder();
  return photos.map(function (p, i) {
    var blob = Utilities.newBlob(Utilities.base64Decode(p.b64), p.mime || "image/jpeg",
                                 id + "-" + (Date.now() + i) + ".jpg");
    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return "https://lh3.googleusercontent.com/d/" + file.getId();
  });
}

function getFolder() {
  var it = DriveApp.getFoldersByName(DRIVE_FOLDER);
  return it.hasNext() ? it.next() : DriveApp.createFolder(DRIVE_FOLDER);
}

function nextId() {
  var items = listVehiculos();
  var max = 0;
  items.forEach(function (o) {
    var n = parseInt(String(o.id).replace(/[^0-9]/g, ""), 10);
    if (!isNaN(n) && n > max) max = n;
  });
  var n = max + 1;
  return n < 1000 ? ("000" + n).slice(-3) : String(n);
}

function findRow(id) {
  var sh = sheet();
  var last = sh.getLastRow();
  if (last < 2) return -1;
  var ids = sh.getRange(2, 1, last - 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) {
    if (String(ids[i][0]).trim() === id) return i + 2;
  }
  return -1;
}

function sheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) throw new Error("No existe la pestaña '" + SHEET_NAME + "'");
  return sh;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
