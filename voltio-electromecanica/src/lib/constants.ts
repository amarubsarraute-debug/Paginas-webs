export const WHATSAPP_NUMBER = "099 463 754";
export const WHATSAPP_LINK = "https://wa.me/59899463754?text=Hola%20Voltio%20Electromec%C3%A1nica,%20quiero%20hacer%20una%20consulta%20por%20un%20tablero%20o%20trabajo%20el%C3%A9ctrico%20industrial.";
export const EMAIL = "electromecanicavoltio@gmail.com";
export const LOCATION = "Canelones, Uruguay";
export const SCHEDULE = "lunes a sábado de 7:00 a 20:00";

export type SocialLink = {
  label: "Instagram" | "Facebook" | "LinkedIn" | "Web";
  href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/voltio_electromecanica_/" },
  { label: "Facebook", href: "https://www.facebook.com/p/Voltio-electromecanica-100066516202188/" },
];

export const GOOGLE_REVIEW_LINK = "https://www.google.com/maps/search/?api=1&query=VOLTIO%20ELECTROMECANICA%20Canelones";
