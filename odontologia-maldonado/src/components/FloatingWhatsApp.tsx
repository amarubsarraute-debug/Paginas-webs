import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { WHATSAPP_LINK } from '../config';
import { motion, AnimatePresence } from 'motion/react';

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (~500px)
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Desktop Floating Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="hidden md:block fixed bottom-8 right-8 z-[100]"
          >
            {/* Subtle pulse ring */}
            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
            
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-[#25D366] hover:bg-[#1ebd5a] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              aria-label="Contactar por WhatsApp"
            >
              <Phone size={28} className="fill-white stroke-none" />
            </a>
          </motion.div>

          {/* Mobile Sticky Bottom Bar */}
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-[100] p-4 bg-white/90 backdrop-blur-md border-t border-stone-200 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]"
          >
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1ebd5a] text-white w-full py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 shadow-sm"
            >
              <Phone size={20} className="fill-white stroke-none" />
              Agendar por WhatsApp
            </a>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
