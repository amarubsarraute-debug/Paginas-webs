import { WHATSAPP_NUMBER_1, WHATSAPP_MESSAGE } from '../data';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER_1}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <>
      {/* Desktop Floating Button */}
      <motion.a
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-6 right-6 z-50 bg-brand-gold text-brand-sand-light p-4 rounded-full shadow-lg hover:shadow-xl hover:bg-brand-dark hover:scale-105 transition-all items-center justify-center group"
        aria-label="Agendar consulta por WhatsApp"
      >
        <MessageCircle size={28} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-3 transition-all duration-300 ease-in-out font-medium">
          Agendar consulta
        </span>
      </motion.a>

      {/* Mobile Sticky Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 p-4 bg-brand-sand-light/92 backdrop-blur-md border-t border-brand-sand">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full gap-2 bg-brand-gold text-brand-sand-light py-3.5 rounded-full font-semibold shadow-md active:scale-95 transition-transform"
        >
          <MessageCircle size={20} />
          Agendar consulta
        </a>
      </div>
    </>
  );
}
