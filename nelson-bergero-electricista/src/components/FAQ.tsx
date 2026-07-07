import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function FAQ() {
  const faqs = [
    {
      q: "¿Atienden emergencias eléctricas en Canelones?",
      a: "Sí, contamos con atención de urgencias y brigada móvil en barrios como Bello Horizonte y toda la zona de Canelones y zonas aledañas."
    },
    {
      q: "¿Realizan trabajos con garantía?",
      a: "Nelson Bergero ofrece total garantía en todos sus trabajos. Nos aseguramos de realizar instalaciones prolijas, seguras y duraderas utilizando materiales normalizados."
    },
    {
      q: "¿Los presupuestos tienen costo?",
      a: "No, las cotizaciones por proyectos, reformas o instalaciones planificadas son sin costo. Evaluamos el trabajo, te detallamos los materiales y mano de obra en un presupuesto cerrado por escrito."
    },
    {
      q: "¿Qué sucede si salta la llave térmica continuamente?",
      a: "Eso indica una sobrecarga de consumo o una fuga a tierra (cortocircuito). Es fundamental no forzar la llave y llamar a un técnico habilitado. Contamos con equipos de medición avanzados para diagnosticar y solucionar el problema rápidamente."
    },
    {
      q: "¿Qué información debo enviar para solicitar un servicio?",
      a: "Podés escribirnos por WhatsApp comentando qué necesitás. Si es una reforma o falla, nos ayuda mucho que envíes fotos del tablero eléctrico, del artefacto o del área a trabajar."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 border-t border-border-subtle relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block font-mono text-xs font-bold tracking-widest text-gold uppercase">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tighter">
            Dudas frecuentes.
          </h2>
        </div>

        {/* FAQs list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-paper border border-border-subtle rounded-2xl overflow-hidden transition-all duration-300 hover:border-gold/30 hover:shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center gap-4"
              >
                <span className="font-bold text-base sm:text-lg text-ink tracking-tight">{faq.q}</span>
                <span className="flex-shrink-0 text-gold bg-bg-tint/60 p-1.5 rounded-xl border border-border-subtle">
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 pt-2 text-muted leading-relaxed font-light text-sm sm:text-base border-t border-border-subtle/50">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
