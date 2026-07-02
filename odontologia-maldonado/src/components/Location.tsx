import { motion } from 'motion/react';
import { Section } from './ui/Section';
import { MapPin, Phone, ArrowRight } from 'lucide-react';
import { ADDRESS, WHATSAPP_LINK, WHATSAPP_NUMBER } from '../config';

export function Location() {
  return (
    <Section id="ubicacion" className="bg-stone-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 tracking-tight mb-6">
            Estamos en Maldonado
          </h2>
          
          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 border border-stone-200 shadow-sm">
                <MapPin className="text-brand-primary" size={20} />
              </div>
              <div>
                <p className="font-semibold text-stone-900 mb-1">Dirección</p>
                <p className="text-stone-600">{ADDRESS}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 border border-stone-200 shadow-sm">
                <Phone className="text-brand-primary" size={20} />
              </div>
              <div>
                <p className="font-semibold text-stone-900 mb-1">WhatsApp</p>
                <p className="text-stone-600">{WHATSAPP_NUMBER}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://maps.google.com/?q=Doctor+Edye+667,+Maldonado,+Uruguay" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-brand-primary text-white px-8 py-3.5 rounded-full font-medium text-center hover:bg-brand-primary-light transition-colors flex items-center justify-center gap-2"
            >
              Cómo llegar
            </a>
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-stone-700 border border-stone-200 px-8 py-3.5 rounded-full font-medium text-center hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
            >
              Agendar por WhatsApp
              <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-[400px] w-full rounded-3xl overflow-hidden bg-stone-200 shadow-lg border border-stone-200 relative"
        >
          {/* Simple iframe map using Google Maps */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3274.6541819777595!2d-54.9602!3d-34.9088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95751a8d0b0b0b0b%3A0x1a1a1a1a1a1a1a1a!2sDr.%20Edye%20667%2C%2020000%20Maldonado%2C%20Departamento%20de%20Maldonado%2C%20Uruguay!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa de ubicación del consultorio"
            className="absolute inset-0 grayscale-[0.2] contrast-[1.05]"
          ></iframe>
        </motion.div>
      </div>
    </Section>
  );
}
