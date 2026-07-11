import { WHATSAPP_LINK } from "../lib/constants";
import { Zap } from "lucide-react";
import { motion } from "motion/react";

export function FinalCTA() {
  return (
    <section className="py-24 bg-transparent border-t border-border-subtle relative overflow-hidden z-10">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-gold/5 blur-3xl pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center relative z-10">
        
        {/* Icon wrapper */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 text-gold mb-8 shadow-sm"
        >
          <Zap className="w-8 h-8" />
        </motion.div>
        
        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-extrabold text-ink tracking-tighter mb-6 leading-none"
        >
          Tableros y automatización sin sorpresas.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-lg sm:text-xl text-muted mb-10 max-w-xl mx-auto font-light leading-relaxed"
        >
          Escribinos por WhatsApp y coordiná una visita técnica o presupuestá tu tablero con una empresa seria en Canelones.
        </motion.p>

        {/* WhatsApp Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="flex justify-center"
        >
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 bg-gold hover:bg-gold-bright text-navy font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-lg gap-2"
          >
            Consultar ahora por WhatsApp
            <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
