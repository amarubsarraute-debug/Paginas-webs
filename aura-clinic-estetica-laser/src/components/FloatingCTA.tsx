import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { CONTACT_LABEL, CONTACT_URL } from '../data';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 940);
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  return (
    <>
      <motion.a
        initial={false}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12, scale: visible ? 1 : 0.96 }}
        href={CONTACT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 hidden items-center justify-center rounded-full bg-brand-accent p-4 text-brand-dark shadow-[0_18px_48px_rgba(200,164,77,0.26)] transition-all hover:-translate-y-0.5 md:flex ${visible ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-label={CONTACT_LABEL}
      >
        <MessageCircle size={26} />
      </motion.a>

      <div
        className={`fixed bottom-0 left-0 z-50 w-full border-t border-brand-accent/24 bg-brand-dark/94 p-4 backdrop-blur-xl transition-all md:hidden ${
          visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
        }`}
      >
        <a
          href={CONTACT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-accent py-3.5 font-semibold text-brand-dark shadow-md active:scale-[0.98]"
        >
          <MessageCircle size={20} />
          {CONTACT_LABEL}
        </a>
      </div>
    </>
  );
}
