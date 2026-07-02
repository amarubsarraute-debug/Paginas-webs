export const WHATSAPP_NUMBER = "59897507241";
export const WHATSAPP_DISPLAY = "+598 97 507 241";

/**
 * Builds a wa.me link with a pre-filled, URL-encoded message.
 * If a treatment is provided it replaces the [tratamiento] placeholder.
 */
export function waLink(treatment?: string): string {
  const base =
    "Hola Dra. Luisa, vi la web y quiero agendar una valoración. Me interesa consultar por [tratamiento] en [Montevideo/Maldonado].";
  const message = treatment ? base.replace("[tratamiento]", treatment) : base;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
