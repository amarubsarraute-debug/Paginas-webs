import { motion } from 'motion/react';
import { Droplets, User, Stethoscope, Heart } from 'lucide-react';

export default function Positioning() {
  const blocks = [
    {
      icon: Droplets,
      title: "Naturalidad",
      text: "Tratamientos pensados para verte mejor sin perder tu expresión."
    },
    {
      icon: User,
      title: "Personalización",
      text: "Cada plan se adapta a tu rostro, tu piel, tu etapa y tus objetivos."
    },
    {
      icon: Stethoscope,
      title: "Criterio médico",
      text: "La indicación del tratamiento parte de una evaluación profesional."
    },
    {
      icon: Heart,
      title: "Bienestar integral",
      text: "Estética facial, corporal y bienestar femenino desde un enfoque regenerativo."
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-brand-sand-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-10 lg:gap-16 items-start">
        <div className="max-w-xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-5xl font-serif font-semibold text-brand-dark mb-6 leading-tight"
          >
            Mejorar no significa cambiar quién sos
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-lg text-brand-text/80 leading-relaxed"
          >
            Cada rostro, cada piel y cada etapa de la vida necesita una mirada distinta. Por eso, el enfoque de la Dra. Adriana Galleno se basa en evaluar, personalizar y acompañar cada tratamiento con criterio médico, buscando resultados sutiles, armónicos y naturales.
          </motion.p>
          <div className="mt-8 border-l-2 border-brand-gold pl-5 text-brand-muted">
            No se trata de cambiar tu rostro. Se trata de verte más descansada, luminosa y armónica.
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {blocks.map((block, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-lg border border-brand-sand transition-colors ${
                idx === 0 ? 'sm:col-span-2 bg-brand-dark text-brand-sand-light' : 'bg-brand-sand-light/80 hover:bg-brand-champagne-light'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-5 ${
                idx === 0 ? 'bg-brand-sand-light/10 text-brand-champagne' : 'bg-brand-champagne-light text-brand-gold'
              }`}>
                <block.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className={`text-xl font-serif font-semibold mb-2 ${idx === 0 ? 'text-brand-sand-light' : 'text-brand-dark'}`}>{block.title}</h3>
              <p className={`text-sm leading-relaxed ${idx === 0 ? 'text-brand-sand-light/75' : 'text-brand-muted'}`}>{block.text}</p>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
