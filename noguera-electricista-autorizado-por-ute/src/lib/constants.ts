export const WHATSAPP_NUMBER = "098 599 609";
export const WHATSAPP_LINK = "https://wa.me/59898599609?text=Hola%20Noguera%20-%20Electricista%20autorizado%20por%20UTE,%20quiero%20hacer%20una%20consulta%20por%20un%20trabajo%20el%C3%A9ctrico.";
export const EMAIL = "";
export const LOCATION = "Maldonado, Uruguay";
export const SCHEDULE = "lunes a sábado de 7:00 a 20:00";

export type SocialLink = {
  label: "Instagram" | "Facebook" | "LinkedIn" | "Web";
  href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/noguera.elect/" },
];

export const GOOGLE_REVIEW_LINK = "https://www.google.com/maps/search/?api=1&query=Noguera%20-%20Electricista%20autorizado%20por%20UTE%20Maldonado";
