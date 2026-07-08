export const WHATSAPP_NUMBER = "098 752 379";
export const WHATSAPP_LINK = "https://wa.me/59898752379?text=Hola%20Romero%20Servicios,%20quiero%20hacer%20una%20consulta%20por%20un%20trabajo.";
export const EMAIL = "";
export const LOCATION = "Canelones, Uruguay";
export const SCHEDULE = "lunes a sábado de 7:00 a 20:00";

export type SocialLink = {
  label: "Instagram" | "Facebook" | "LinkedIn" | "Web";
  href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/romero.servicios/" },
];

export const GOOGLE_REVIEW_LINK = "https://www.google.com/maps/search/?api=1&query=Romero%20Servicios%20Canelones";
