import { motion } from 'motion/react';
import { Section } from './ui/Section';
import { Phone } from 'lucide-react';
import { WHATSAPP_LINK } from '../config';

export function CTABanner() {
  return (
    <Section className="py-0 md:py-0 px-6 my-10 md:my-20">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-brand-primary text-white rounded-3xl p-8 md:p-16 text-center relative overflow-hidden"
      >
        {/* Decorative background circles */}
        <div className="absolute top-[-50%] left-[-20%] w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-50%] right-[-20%] w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6 tracking-tight">
            ¿Querés agendar una consulta odontológica?
          </h2>
          <p className="text-lg text-brand-secondary/90 leading-relaxed mb-10">
            Escribinos por WhatsApp y contanos qué necesitás. Te ayudamos a coordinar tu visita al consultorio en Maldonado.
          </p>
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-brand-primary px-8 py-4 rounded-full font-medium text-center hover:bg-stone-50 transition-colors flex items-center justify-center gap-2 mx-auto w-fit shadow-lg shadow-black/10"
          >
            <Phone size={20} />
            Agendar por WhatsApp
          </a>
        </div>
      </motion.div>
    </Section>
  );
}

export function FinalCTA() {
  return (
    <Section className="bg-brand-secondary py-24 md:py-32">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-display font-semibold text-stone-900 tracking-tight mb-6">
          Cuidá tu salud bucal con una atención clara y humana
        </h2>
        <p className="text-lg text-stone-600 leading-relaxed mb-10 max-w-xl mx-auto">
          Agendá tu consulta y empezá con una evaluación profesional en Odontología Maldonado.
        </p>
        <a 
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand-primary text-white px-8 py-4 rounded-full font-medium text-center hover:bg-brand-primary-light transition-colors flex items-center justify-center gap-2 mx-auto w-fit shadow-md shadow-brand-primary/20"
        >
          <Phone size={20} />
          Escribir por WhatsApp
        </a>
      </div>
    </Section>
  );
}
