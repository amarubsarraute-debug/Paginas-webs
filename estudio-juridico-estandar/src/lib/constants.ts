// Datos del negocio — vienen de datos.json del prospecto.
// Si un campo no existe (ej. WHATSAPP_NUMBER), se deja undefined: no inventar.

export const NEGOCIO = 'Estudio Jurídico Cairo Duaso';
export const NICHO_LABEL = 'Estudio jurídico';
export const ZONA = 'Maldonado';
export const BARRIO = 'Centro';
export const DIRECCION = 'Calle 3 de Febrero esquina, 20000 Maldonado';
export const HORARIO = 'Lunes a viernes de 10:00 a 18:00 · Sábados de 11:00 a 15:00';
export const ANIOS_TRAYECTORIA = 2;
export const RATING = 5.0;
export const CANTIDAD_RESENAS = 9;

// Teléfono fijo confirmado en Google Maps. No hay número de WhatsApp confirmado
// para este prospecto (línea fija de estudio, no celular) — no se inventa uno.
export const TELEFONO_LABEL = '4224 2433';
export const TELEFONO_TEL = 'tel:+59842242433';
export const WHATSAPP_NUMBER: string | undefined = undefined;

export const waLink = (msg = 'Hola, quisiera hacer una consulta.') =>
  WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}` : undefined;

export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${NEGOCIO} ${DIRECCION}`,
)}`;
export const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  `${NEGOCIO} ${DIRECCION}`,
)}&output=embed`;

export const NAV = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#proceso', label: 'Cómo trabajamos' },
  { href: '#resenas', label: 'Reseñas' },
  { href: '#contacto', label: 'Contacto' },
];
