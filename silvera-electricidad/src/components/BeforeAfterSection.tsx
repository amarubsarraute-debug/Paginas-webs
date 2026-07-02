import { BeforeAfter } from "./BeforeAfter";
import { CheckCircle2, ShieldCheck, Flame } from "lucide-react";
import { motion } from "motion/react";

export function BeforeAfterSection() {
  const points = [
    {
      title: "Eliminación de riesgos de cortocircuitos",
      desc: "El cableado desordenado y suelto genera recalentamiento de bornes. Ordenamos y peinamos cada cable bajo norma."
    },
    {
      title: "Cálculo y calibración de protecciones",
      desc: "Instalamos llaves térmicas y disyuntores diferenciales de marcas líderes con los amperajes adecuados para proteger tus equipos."
    },
    {
      title: "Identificación de fases y circuitos",
      desc: "Cada llave queda rotulada e identificada en el tablero principal para facilitar cortes rápidos y mantenimiento seguro."
    }
  ];

  return (
    <section className="py-24 border-t border-border-subtle bg-bg-tint/40 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Slider */}
          <div className="lg:col-span-6 w-full flex justify-center order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-[500px]"
            >
              <BeforeAfter
                beforeSrc="/img/01_tablero_antes_limpio.png"
                afterSrc="/img/02_tablero_despues_limpio.png"
                alt="Tablero eléctrico normalizado por Silvera Electricidad"
              />
            </motion.div>
          </div>

          {/* Right Column: Info */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2 text-left">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-gold uppercase">
              <span className="w-6 h-[2px] bg-gold" />
              <span>Antes y Después</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-none tracking-tighter">
              Tableros normalizados, hogares seguros.
            </h2>
            
            <p className="text-muted text-base sm:text-lg font-light leading-relaxed">
              Mirá el cambio real de un trabajo de normalización de Silvera Electricidad. De un cableado caótico y propenso a recalentamientos, a un tablero ordenado, seguro y certificado bajo normas UTE.
            </p>

            <div className="space-y-4 pt-2">
              {points.map((pt, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ink text-base sm:text-lg tracking-tight">
                      {pt.title}
                    </h4>
                    <p className="text-muted text-sm sm:text-base font-light leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
