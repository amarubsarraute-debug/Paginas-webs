export const WHATSAPP_NUMBER = "092 429 868";
export const WHATSAPP_LINK = "https://wa.me/59892429868?text=Hola%20Prolighting,%20quiero%20hacer%20una%20consulta%20por%20un%20trabajo%20el%C3%A9ctrico.";
export const EMAIL = "";
export const LOCATION = "Punta del Este, Uruguay";
export const SCHEDULE = "lunes a sábado de 7:00 a 20:00";

export type SocialLink = {
  label: "Instagram" | "Facebook" | "LinkedIn" | "Web";
  href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/prolighting_/" },
  { label: "Facebook", href: "https://www.facebook.com/Prolighting.maldonado/" },
];

export const GOOGLE_REVIEW_LINK = "https://www.google.com/maps/search/?api=1&query=Prolighting%20Punta%20del%20Este";
