export const WHATSAPP_NUMBER = "096 129 821";
export const WHATSAPP_LINK = "https://wa.me/59896129821?text=Hola%20Bazzanos,%20quiero%20hacer%20una%20consulta%20por%20un%20trabajo%20el%C3%A9ctrico.";
export const EMAIL = "bazzanos.hns@gmail.com";
export const LOCATION = "Canelones, Uruguay";
export const SCHEDULE = "lunes a sábado de 7:00 a 20:00";

export type SocialLink = {
  label: "Instagram" | "Facebook" | "LinkedIn" | "Web";
  href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/bazzanos.hns/" },
  { label: "Facebook", href: "https://www.facebook.com/Bazzanoshns/" },
];

export const GOOGLE_REVIEW_LINK = "https://www.google.com/maps/search/?api=1&query=Bazzanos%20Instalaciones%20Electricas.%20Firma%20instaladora%20autorizada%20por%20UTE%20Canelones";
