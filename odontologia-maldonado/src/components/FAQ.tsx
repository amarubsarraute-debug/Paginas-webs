import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Section } from './ui/Section';
import { Plus, Minus } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "¿Dónde queda Odontología Maldonado?",
      a: "Está ubicado en Doctor Edye 667, Maldonado, Uruguay."
    },
    {
      q: "¿Cómo puedo agendar?",
      a: "Podés escribir directamente por WhatsApp al 095 533 486 para consultar disponibilidad."
    },
    {
      q: "¿Atienden urgencias odontológicas?",
      a: "Podés escribir por WhatsApp explicando tu situación para recibir orientación y coordinar la atención según disponibilidad."
    },
    {
      q: "¿Puedo consultar aunque no sepa qué tratamiento necesito?",
      a: "Sí. La consulta sirve para evaluar tu caso, explicarte opciones y definir el mejor camino."
    },
    {
      q: "¿Realizan implantes dentales?",
      a: "Sí, se pueden evaluar opciones para reemplazar piezas perdidas mediante implantes, según cada caso."
    },
    {
      q: "¿Realizan ortodoncia?",
      a: "Sí, se pueden evaluar tratamientos de ortodoncia para mejorar la posición dental y la mordida."
    },
    {
      q: "¿Publican antes y después?",
      a: "Solo deben publicarse imágenes con autorización del paciente. Cada caso requiere evaluación profesional."
    }
  ];

  return (
    <Section className="bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 tracking-tight mb-12 text-center">
          Preguntas frecuentes
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border border-stone-200 rounded-2xl overflow-hidden bg-stone-50/50"
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-medium text-lg text-stone-900 pr-8">
                    {faq.q}
                  </span>
                  <span className="text-stone-400 shrink-0">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-stone-600 leading-relaxed border-t border-stone-100 mt-2 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
