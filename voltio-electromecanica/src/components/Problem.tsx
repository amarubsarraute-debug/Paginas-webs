import { ZapOff, Settings, Flame, Gauge, FileSignature, AlertTriangle, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function Problem() {
  const problems = [
    {
      icon: ZapOff,
      title: "Tablero de comando fuera de servicio",
      description: "Contactores quemados, protecciones que saltan o un tablero que dejó de responder y frena la producción.",
      waMessage: "Hola Voltio Electromecánica, tengo un tablero de comando fuera de servicio y necesito asistencia."
    },
    {
      icon: Settings,
      title: "Necesitás automatizar un proceso",
      description: "Control de bombas, motores o líneas de producción que hoy se manejan a mano y querés automatizar.",
      waMessage: "Hola Voltio Electromecánica, quiero consultar por la automatización de un proceso."
    },
    {
      icon: Flame,
      title: "Arrancador o motor con fallas",
      description: "Motores que no arrancan, se disparan las protecciones o el arrancador da problemas intermitentes.",
      waMessage: "Hola Voltio Electromecánica, tengo un arrancador o motor con fallas y necesito asistencia urgente."
    },
    {
      icon: Gauge,
      title: "Instalación industrial sin normalizar",
      description: "Cableado de planta desordenado, sin protecciones adecuadas o que no cumple con las normas de seguridad.",
      waMessage: "Hola Voltio Electromecánica, necesito normalizar la instalación eléctrica de mi planta o comercio."
    },
    {
      icon: FileSignature,
      title: "Mantenimiento preventivo de tableros",
      description: "Revisión periódica de tableros y sistemas de comando para evitar una parada de planta imprevista.",
      waMessage: "Hola Voltio Electromecánica, quiero cotizar un plan de mantenimiento preventivo de tableros."
    },
    {
      icon: AlertTriangle,
      title: "Necesitás un tablero nuevo a medida",
      description: "Un proyecto nuevo o una ampliación que requiere diseñar y armar un tablero de comando desde cero.",
      waMessage: "Hola Voltio Electromecánica, quiero cotizar el armado de un tablero de comando nuevo a medida."
    }
  ];

  const buildWaUrl = (message: string) => {
    return `https://wa.me/59899463754?text=${encodeURIComponent(message)}`;
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
            ¿Tu planta o comercio presenta alguno de estos problemas?
          </h2>
          <p className="text-muted text-base sm:text-lg font-light leading-relaxed max-w-[70ch]">
            No ignores las señales de alarma en tu tablero o sistema de comando. Un fallo a tiempo evitado previene paradas de planta y accidentes graves. **Hacé clic en tu problema** para consultarnos directamente por WhatsApp.
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
            href="https://wa.me/59899463754?text=Hola%20Voltio%20Electromec%C3%A1nica,%20tengo%20una%20consulta%20por%20un%20trabajo%20que%20no%20figura%20en%20la%20lista."
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
