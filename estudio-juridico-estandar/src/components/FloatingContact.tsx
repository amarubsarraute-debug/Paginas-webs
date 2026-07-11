import { Phone } from 'lucide-react';
import { TELEFONO_TEL } from '../lib/constants';

// Botón flotante genérico: usa WhatsApp si el prospecto tiene número
// confirmado, si no cae a "Llamar" — nunca se inventa un WhatsApp.
export function FloatingContact() {
  return (
    <a
      href={TELEFONO_TEL}
      aria-label="Llamar al estudio"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-bordeaux-bright px-4 py-3 text-paper shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5"
    >
      <Phone className="h-5 w-5" />
      <span className="hidden text-sm font-medium sm:inline">¿Necesitás asesoramiento?</span>
    </a>
  );
}
