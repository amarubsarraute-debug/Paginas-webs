import { ZapOff, Droplets, Snowflake, Hammer, Camera, Wrench, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function Problem() {
  const problems = [
    {
      icon: ZapOff,
      title: "Salta la térmica o hay una falla eléctrica",
      description: "El interruptor corta la luz de forma imprevista, hay cables sueltos o necesitás cambiar llaves y tomas.",
      waMessage: "Hola Romero Servicios, me salta la térmica constantemente y necesito que un técnico revise la instalación."
    },
    {
      icon: Droplets,
      title: "Pérdidas de agua o cañerías tapadas",
      description: "Tenés una pérdida, un desagüe tapado o necesitás una instalación sanitaria nueva.",
      waMessage: "Hola Romero Servicios, tengo una pérdida de agua / cañería tapada y necesito un plomero."
    },
    {
      icon: Snowflake,
      title: "El aire acondicionado no enfría",
      description: "El equipo perdió gas, hace ruido o necesitás instalar un split nuevo antes del verano.",
      waMessage: "Hola Romero Servicios, mi aire acondicionado no enfría bien y necesito un service o instalación."
    },
    {
      icon: Hammer,
      title: "Necesitás una refacción o reforma",
      description: "Grietas, humedad, revoques a nuevo o una obra chica que necesita mano de albañil.",
      waMessage: "Hola Romero Servicios, necesito cotizar un trabajo de albañilería o refacción."
    },
    {
      icon: Camera,
      title: "Querés instalar cámaras de seguridad",
      description: "Necesitás vigilancia para tu hogar o comercio, con acceso remoto desde el celular.",
      waMessage: "Hola Romero Servicios, quiero cotizar la instalación de cámaras de seguridad."
    },
    {
      icon: Wrench,
      title: "Tenés varios arreglos pendientes",
      description: "Electricidad, plomería, albañilería o aires acondicionados: coordinamos todo en una sola visita.",
      waMessage: "Hola Romero Servicios, tengo varios trabajos pendientes en casa y quiero coordinar una visita."
    }
  ];

  const buildWaUrl = (message: string) => {
    return `https://wa.me/59898752379?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="problemas" className="py-24 border-b border-border-subtle relative z-10 overflow-hidden">
      {/* Decorative radial background for premium feel */}
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold tracking-widest text-red-500 uppercase px-3.5 py-1.5 bg-red-500/5 rounded-full border border-red-500/10">
            Diagnóstico y Seguridad
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-tight tracking-tighter">
            ¿Tu hogar o negocio tiene alguno de estos problemas?
          </h2>
          <p className="text-muted text-base sm:text-lg font-light leading-relaxed max-w-[70ch]">
            No ignores las señales de alarma, sean eléctricas, de plomería o de construcción. Un problema resuelto a tiempo evita gastos mayores. **Hacé clic en tu problema** para consultarnos directamente por WhatsApp.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            const waUrl = buildWaUrl(prob.waMessage);
            return (
              <motion.a
                key={prob.title}
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group bg-paper border border-border-subtle p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-4">
                  {/* Icon Container */}
                  <div className="w-12 h-12 rounded-xl bg-bg-tint group-hover:bg-gold/15 text-muted group-hover:text-gold flex items-center justify-center transition-colors duration-300">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  
                  <h3 className="text-lg font-extrabold text-ink group-hover:text-gold transition-colors tracking-tight">
                    {prob.title}
                  </h3>
                  
                  <p className="text-muted text-sm font-light leading-relaxed">
                    {prob.description}
                  </p>
                </div>

                {/* Card footer indicator */}
                <div className="mt-6 flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-muted group-hover:text-gold transition-colors">
                  <span>Consultar ahora</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Global CTA Box */}
        <div className="mt-16 bg-bg-tint/40 rounded-3xl border border-border-subtle p-8 sm:p-10 flex flex-col md:flex-row gap-8 items-center justify-between shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
              ¿Tenés otra falla o necesitás un presupuesto a medida?
            </h4>
            <p className="text-muted text-sm sm:text-base font-light max-w-xl">
              Si tu problema no está en la lista o querés cotizar un proyecto completo de obra o reforma, escribinos. Evaluamos tu caso de forma transparente.
            </p>
          </div>
          
          <a
            href="https://wa.me/59898752379?text=Hola%20Romero%20Servicios,%20tengo%20una%20consulta%20por%20un%20trabajo%20que%20no%20figura%20en%20la%20lista."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-navy font-bold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <span>Consultar por WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
