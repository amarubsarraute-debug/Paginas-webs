import { Shield, CheckCircle, Clock, Award, ThumbsUp } from "lucide-react";
import { motion } from "motion/react";

export function Trust() {
  const indicators = [
    { label: "Seguridad", icon: <Shield className="w-5 h-5" /> },
    { label: "Prolijidad", icon: <CheckCircle className="w-5 h-5" /> },
    { label: "Cumplimiento", icon: <Clock className="w-5 h-5" /> },
    { label: "Soporte Técnico", icon: <Award className="w-5 h-5" /> },
    { label: "Garantía de Obra", icon: <ThumbsUp className="w-5 h-5" /> }
  ];

  return (
    <section className="py-24 border-t border-border-subtle relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Main Box */}
        <div className="bg-paper rounded-3xl border border-border-subtle p-8 sm:p-12 md:p-16 text-center shadow-lg relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink leading-tight tracking-tighter max-w-3xl mx-auto mb-6 relative z-10">
            Electricidad hecha con seguridad, prolijidad y criterio profesional
          </h2>
          
          <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto mb-12 font-light leading-relaxed relative z-10">
            En instalaciones eléctricas, improvisar sale caro y es peligroso. Electricidad Ocean Park - Electricista Facundo Azcurra prioriza la prolijidad técnica, el cumplimiento estricto de plazos y el asesoramiento transparente para que disfrutes de una instalación segura y libre de problemas.
          </p>

          {/* Badges Container */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 relative z-10">
            {indicators.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                className="flex items-center gap-2.5 bg-bg-tint/60 hover:bg-bg-tint border border-border-subtle px-5 py-3 rounded-2xl text-ink transition-colors shadow-sm"
              >
                <span className="text-gold">{item.icon}</span>
                <span className="font-semibold text-sm tracking-tight">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
