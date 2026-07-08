import { Star, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { GOOGLE_REVIEW_LINK } from "../lib/constants";

export function Clients() {
  const commitments = [
    {
      title: "Trabajos seguros y prolijos",
      desc: "Sea electricidad, plomería, albañilería o instalación de equipos, dejamos todo prolijo, calibrado y funcionando como corresponde."
    },
    {
      title: "Materiales de calidad",
      desc: "Trabajamos únicamente con materiales normalizados y marcas líderes para asegurar que cada trabajo cumpla con todas las medidas de seguridad."
    },
    {
      title: "Un equipo, todos los oficios",
      desc: "Coordinamos electricidad, plomería, albañilería, aires acondicionados y cámaras de seguridad con el mismo equipo, sin que tengas que llamar a varios técnicos distintos."
    }
  ];

  return (
    <section id="resenas" className="py-24 border-y border-border-subtle relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tighter mb-16">
          Calidad respaldada,<br />trabajos garantizados.
        </h2>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left: Satisfaction Badge */}
          <div className="md:col-span-5 space-y-6 text-left md:border-r border-border-subtle md:pr-12">
            <div className="text-7xl sm:text-8xl font-black text-ink leading-none tracking-tighter flex items-baseline">
              100%
            </div>
            <div className="flex text-gold text-xl tracking-widest">
              ★★★★★
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-ink font-bold uppercase tracking-wider">
                <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
                <span>Satisfacción Asegurada</span>
              </div>
              <p className="text-muted text-sm font-light leading-relaxed">
                Nuestra prioridad es la conformidad absoluta en cada servicio. Si algo no queda según lo conversado, nos comprometemos a solucionarlo sin costo extra.
              </p>
            </div>

            {/* Google Review Button */}
            <div className="pt-2">
              <a 
                href={GOOGLE_REVIEW_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border-subtle rounded-xl text-xs font-semibold text-ink bg-bg-tint hover:bg-gold/10 hover:border-gold transition-all duration-200"
              >
                <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                Opinar en Google
              </a>
            </div>
          </div>

          {/* Right: Commitments / Benefits */}
          <div className="md:col-span-7 space-y-8 pl-0 md:pl-6">
            <h3 className="text-ink font-mono text-xs font-bold uppercase tracking-wider mb-6">Nuestros Compromisos de Calidad</h3>
            {commitments.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-ink text-base sm:text-lg tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-muted text-sm sm:text-base font-light leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
