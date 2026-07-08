import { Info } from "lucide-react";
import { motion } from "motion/react";

export function Process() {
  const steps = [
    {
      number: "01",
      title: "Nos escribís o llamás",
      text: "Contanos qué instalación, reforma o problema tenés en tu hogar, comercio u obra — eléctrico, de plomería, albañilería o climatización. Coordinamos de forma ágil."
    },
    {
      number: "02",
      title: "Diagnóstico y cotización",
      text: "Revisamos la instalación, te explicamos la solución técnica adecuada y te pasamos un presupuesto cerrado y claro. Sin letra chica."
    },
    {
      number: "03",
      title: "Seguridad y Garantía",
      text: "Ejecutamos el trabajo con prolijidad, seguridad y responsabilidad, entregando resultados duraderos sin importar el oficio."
    }
  ];

  return (
    <section id="proceso" className="py-24 border-t border-border-subtle relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="inline-block font-mono text-xs font-bold tracking-widest text-gold uppercase">
            Cómo Trabajamos
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-none tracking-tighter">
            Un proceso simple, claro y sin vueltas.
          </h2>
        </div>

        {/* Steps Grid (Horizontal Box) */}
        <div className="grid md:grid-cols-3 bg-paper border border-border-subtle rounded-3xl shadow-lg overflow-hidden divide-y md:divide-y-0 md:divide-x divide-border-subtle">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 sm:p-10 flex flex-col justify-between space-y-8 hover:bg-gold/5 transition-colors group"
            >
              {/* Step index with horizontal line */}
              <div className="flex items-center gap-4 font-mono font-bold text-sm text-gold">
                <span>{step.number}</span>
                <span className="flex-grow h-[1px] bg-border-subtle group-hover:bg-gold/30 transition-colors" />
              </div>

              {/* Text info */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
                  {step.title}
                </h3>
                <p className="text-muted text-sm sm:text-base leading-relaxed font-light">
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Advisory Footnote */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex items-center gap-2.5 font-mono text-xs text-muted hover:text-gold transition-colors justify-center md:justify-start"
        >
          <Info className="w-4 h-4 text-gold" />
          <span>Te asesoramos honestamente para que tomes la mejor decisión de seguridad.</span>
        </motion.div>

      </div>
    </section>
  );
}
