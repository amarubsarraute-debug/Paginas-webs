export const WHATSAPP_NUMBER = "098 972 547";
export const WHATSAPP_LINK = "https://wa.me/59898972547?text=Hola%20Alejandro%20Severo,%20quiero%20hacer%20una%20consulta%20por%20un%20trabajo%20el%C3%A9ctrico.";
export const EMAIL = "";
export const LOCATION = "Montevideo, Uruguay";
export const SCHEDULE = "lunes a sábado de 7:00 a 20:00";

export type SocialLink = {
  label: "Instagram" | "Facebook" | "LinkedIn" | "Web";
  href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/_alectricidad_/" },
];

export const GOOGLE_REVIEW_LINK = "https://www.google.com/maps/search/?api=1&query=Alejandro%20Severo%20ELECTRICISTA%20AUTORIZADO%20X%20UTE%20Montevideo";
