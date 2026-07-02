import { motion, useScroll, useSpring } from 'motion/react';
import { Section } from './ui/Section';
import { useRef } from 'react';

export function HowWeWork() {
  const steps = [
    {
      title: "Escribís por WhatsApp",
      text: "Contanos qué necesitás: dolor, control, estética, ortodoncia, implantes o una consulta general.",
    },
    {
      title: "Coordinamos el turno",
      text: "Te indicamos disponibilidad y datos necesarios para agendar.",
    },
    {
      title: "Evaluación profesional",
      text: "Se revisa tu caso y se explica qué opciones tenés.",
    },
    {
      title: "Plan claro",
      text: "Antes de avanzar, entendés el tratamiento, tiempos y próximos pasos.",
    },
    {
      title: "Seguimiento",
      text: "Buscamos que el resultado sea funcional, estético y sostenido en el tiempo.",
    }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Section id="proceso" className="bg-stone-50 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 tracking-tight">
          Así es el proceso para empezar
        </h2>
      </div>

      <div className="max-w-4xl mx-auto relative" ref={containerRef}>
        {/* Vertical Line Background */}
        <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 bg-stone-200 md:-translate-x-1/2 rounded-full" />
        
        {/* Animated Vertical Line */}
        <motion.div 
          className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 bg-brand-primary md:-translate-x-1/2 rounded-full origin-top"
          style={{ scaleY }}
        />

        <div className="space-y-12 relative z-10">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className={`flex-1 w-full pl-16 md:pl-0 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                  <div className={`bg-white p-6 rounded-2xl shadow-sm border border-stone-200 inline-block w-full md:max-w-sm ${isEven ? 'mr-auto' : 'ml-auto'}`}>
                    <div className="text-brand-primary text-sm font-semibold tracking-wider uppercase mb-2">Paso {index + 1}</div>
                    <h3 className="font-display font-semibold text-xl text-stone-900 mb-2">{step.title}</h3>
                    <p className="text-stone-600 leading-relaxed">{step.text}</p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="absolute left-[16px] md:static md:w-24 flex justify-center shrink-0">
                  <div className="w-7 h-7 bg-white border-4 border-brand-primary rounded-full z-10 shadow-sm shadow-brand-primary/20" />
                </div>

                {/* Empty Space for layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
