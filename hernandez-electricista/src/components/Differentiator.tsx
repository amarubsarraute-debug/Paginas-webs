import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export function Differentiator() {
  const bullets = [
    "Instalaciones y reformas bajo normas de seguridad",
    "Atención residencial, comercial, edificios y obras",
    "Diagnóstico técnico y presupuesto honesto",
    "Instalaciones proyectadas para máxima durabilidad",
    "Cobertura ágil en Maldonado y Punta del Este"
  ];

  return (
    <section className="py-24 border-b border-border-subtle relative overflow-hidden z-10">
      {/* Decorative element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
        
        {/* Main Box with clean shadows */}
        <div className="bg-paper rounded-3xl border border-border-subtle p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 items-center shadow-lg">
          
          {/* Left Text */}
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold tracking-widest text-gold uppercase px-3.5 py-1.5 bg-gold-soft/30 rounded-full border border-gold/10">
              Técnico de Confianza
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink leading-tight tracking-tighter">
              Instalaciones eléctricas seguras
            </h2>
            <p className="text-base sm:text-lg text-muted font-light leading-relaxed">
              Hernández Electricista ofrece el respaldo profesional necesario para realizar instalaciones, reformas y mantenimiento con total seguridad. No hacemos arreglos provisorios; trabajamos bajo normativas vigentes para asegurar la durabilidad y seguridad de tu hogar o comercio.
            </p>
          </div>
          
          {/* Right Checklist Box */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-bg-tint/50 rounded-2xl p-6 sm:p-8 border border-border-subtle shadow-sm">
              <ul className="space-y-4">
                {bullets.map((bullet, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-ink font-medium text-base sm:text-lg tracking-tight">{bullet}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
