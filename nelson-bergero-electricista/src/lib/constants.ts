export const WHATSAPP_NUMBER = "099 196 609";
export const WHATSAPP_LINK = "https://wa.me/59899196609?text=Hola%20Nelson%20Bergero,%20quiero%20hacer%20una%20consulta%20por%20un%20trabajo%20el%C3%A9ctrico.";
export const EMAIL = "";
export const LOCATION = "Canelones, Uruguay";
export const SCHEDULE = "lunes a sábado de 7:00 a 20:00";

export type SocialLink = {
  label: "Instagram" | "Facebook" | "LinkedIn" | "Web";
  href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/bergeronelson/" },
];

export const GOOGLE_REVIEW_LINK = "https://www.google.com/maps/search/?api=1&query=Nelson%20Bergero%20Electricista%20Canelones";
