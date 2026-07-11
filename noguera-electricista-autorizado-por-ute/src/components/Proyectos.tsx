import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { WHATSAPP_LINK } from "../lib/constants";

export function Proyectos() {
  const steps = [
    {
      number: "01",
      title: "Proyecto eléctrico",
      description: "Diseñamos el proyecto eléctrico técnico según los requisitos reglamentarios de UTE."
    },
    {
      number: "02",
      title: "Trámites y firma UTE",
      description: "Gestionamos la firma técnica autorizada y los trámites de habilitación ante UTE."
    },
    {
      number: "03",
      title: "Ejecución en fase de obra",
      description: "Realizamos los trabajos eléctricos durante la construcción, prolijos y bajo norma."
    }
  ];

  const waMessage = "Hola, estoy en una obra o reforma y necesito el proyecto eléctrico completo y los trámites de UTE. ¿Me pasan información?";
  const waUrl = `${WHATSAPP_LINK}&text=${encodeURIComponent(waMessage)}`;

  return (
    <section id="proyectos" className="py-24 border-t border-border-subtle relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Copy & Steps */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-gold uppercase">
              <span className="w-6 h-[2px] bg-gold" />
              <span>Proyectos y Construcción</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-none tracking-tighter">
              De los planos a la obra, bajo norma UTE.
            </h2>

            <p className="text-muted text-base sm:text-lg font-light leading-relaxed max-w-xl">
              ¿Estás construyendo o reformando? Nos ocupamos de toda la parte eléctrica del proyecto, desde el plano hasta la ejecución, cumpliendo la reglamentación vigente.
            </p>

            <div className="space-y-5 pt-2">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="shrink-0 w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center font-mono font-bold text-sm text-gold">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-ink text-base sm:text-lg tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-muted text-sm sm:text-base font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold-bright text-navy font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
              >
                Consultar por mi proyecto
                <ArrowRight className="w-5 h-5" />
              </a>
              <span className="flex items-center gap-2 font-mono text-xs text-muted">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                Trabajo habilitado según reglamentación de UTE.
              </span>
            </div>
          </div>

          {/* Right Column: Electrical blueprint */}
          <div className="lg:col-span-6 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[520px] rounded-3xl overflow-hidden border border-border-strong shadow-2xl bg-navy"
            >
              <img
                src="./img/plano-electrico-ute.png"
                alt="Plano eléctrico de vivienda unifamiliar bajo norma UTE, con circuitos de iluminación, tomas y tablero"
                loading="lazy"
                className="w-full h-auto block"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
