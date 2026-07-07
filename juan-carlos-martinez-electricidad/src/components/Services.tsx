import { WHATSAPP_LINK } from "../lib/constants";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

export function Services() {
  const services = [
    {
      index: "01",
      title: "Instalaciones y Obras",
      description: "Planificación y ejecución de instalaciones eléctricas completas para casas, apartamentos, oficinas y obras comerciales. Cableados seguros y duraderos desde el primer día.",
      tags: ["Obras nuevas", "Locales comerciales", "Oficinas", "Acometidas"],
      waMessage: "Hola Juan carlos Martínez electricidad, me gustaría consultar por *Instalaciones y Obras*."
    },
    {
      index: "02",
      title: "Tableros y Normalización",
      description: "Armado, revisión y normalización de tableros eléctricos. Armado y normalización de tableros eléctricos bajo normas de seguridad vigentes.",
      tags: ["Tableros", "Tableros técnicos", "Trámites", "Habilitaciones"],
      waMessage: "Hola Juan carlos Martínez electricidad, necesito información sobre *Tableros y Normalización*."
    },
    {
      index: "03",
      title: "Iluminación y Reformas",
      description: "Actualización de instalaciones antiguas a estándares modernos. Diseño e instalación de sistemas de iluminación LED para interiores, fachadas y exteriores.",
      tags: ["Iluminación LED", "Reformas eléctricas", "Exteriores", "Puesta a tierra"],
      waMessage: "Hola Juan carlos Martínez electricidad, quiero cotizar un trabajo de *Iluminación y Reformas*."
    },
    {
      index: "04",
      title: "Mantenimiento y Reparación",
      description: "Solución rápida a cortes de luz, sobrecargas, térmicas que saltan y fallas eléctricas generales. Diagnósticos precisos para prevenir problemas futuros.",
      tags: ["Cortocircuitos", "Térmicas", "Fugas", "Urgencias"],
      waMessage: "Hola Juan carlos Martínez electricidad, necesito un servicio de *Mantenimiento y Reparación* por una falla."
    }
  ];

  return (
    <section id="servicios" className="py-24 border-t border-border-subtle relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="inline-block font-mono text-xs font-bold tracking-widest text-gold uppercase">
            Servicios
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-none tracking-tighter">
            Soluciones serias, trabajos sin sorpresas.
          </h2>
          <p className="text-muted text-base sm:text-lg font-light leading-relaxed max-w-[65ch]">
            Electricidad residencial, comercial e industrial. Diagnóstico transparente y presupuesto detallado antes de iniciar cualquier labor.
          </p>
        </div>

        {/* Services Rows List */}
        <div className="border-t border-border-subtle">
          {services.map((service, idx) => {
            const waUrl = `${WHATSAPP_LINK}&text=${encodeURIComponent(service.waMessage)}`;
            return (
              <motion.a
                key={service.index}
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-4 md:gap-8 items-center py-10 border-b border-border-subtle hover:bg-gold/5 px-4 sm:px-6 rounded-lg transition-all duration-300 relative block overflow-hidden"
              >
                {/* Accent line on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

                {/* Index */}
                <div className="font-mono font-bold text-lg text-gold/70 group-hover:text-gold transition-colors">
                  {service.index}
                </div>

                {/* Main Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-ink group-hover:text-ink transition-colors tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-muted text-sm sm:text-base leading-relaxed font-light max-w-2xl">
                    {service.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] sm:text-xs font-semibold text-muted bg-paper border border-border-subtle px-3 py-1 rounded-full transition-all duration-200 group-hover:border-gold/30 group-hover:bg-gold-soft/20 group-hover:text-ink"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Go Arrow */}
                <div className="hidden md:grid w-14 h-14 rounded-full border border-border-strong group-hover:border-gold group-hover:bg-gold group-hover:text-navy place-items-center text-ink transition-all duration-300">
                  <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
