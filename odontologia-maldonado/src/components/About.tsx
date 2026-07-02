import { motion } from 'motion/react';
import { Section } from './ui/Section';
import { Check } from 'lucide-react';

export function About() {
  const chips = [
    "Atención personalizada",
    "Diagnóstico claro",
    "Trato humano",
    "Seguimiento del paciente",
    "Consultorio en Maldonado"
  ];

  return (
    <Section className="bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="order-2 md:order-1"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-stone-900 mb-6 tracking-tight">
            Dra. Silvia Pais - Odontología Maldonado
          </h2>
          <p className="text-lg text-stone-600 mb-6 leading-relaxed">
            Un consultorio odontológico en Maldonado enfocado en brindar atención profesional, cercana y clara para pacientes que buscan cuidar, recuperar o mejorar su salud bucal.
          </p>
          <p className="text-lg text-stone-600 mb-8 leading-relaxed">
            La Dra. Silvia Pais brinda atención odontológica con un enfoque humano, profesional y orientado a que cada paciente entienda su tratamiento antes de avanzar.
          </p>

          <div className="flex flex-col gap-3">
            {chips.map((chip, index) => (
              <motion.div 
                key={chip}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <Check size={14} className="text-brand-primary" />
                </div>
                <span className="text-stone-700 font-medium">{chip}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="order-1 md:order-2 relative"
        >
          {/* Subtle background decoration */}
          <div className="absolute inset-0 bg-brand-secondary rounded-3xl translate-x-4 translate-y-4 -z-10" />
          
          <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1590611936760-eeb9bc598548?auto=format&fit=crop&q=80&w=1200&h=1500" 
              alt="Dra. Silvia Pais en su consultorio odontológico" 
              className="w-full h-full object-cover object-center"
            />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
