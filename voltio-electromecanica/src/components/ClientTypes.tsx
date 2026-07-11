import { Factory, Store, Building2, Hammer } from "lucide-react";
import { motion } from "motion/react";

export function ClientTypes() {
  const clients = [
    {
      icon: Factory,
      title: "Plantas e industrias",
      description: "Tableros de comando, automatización de procesos y mantenimiento industrial para plantas de producción y galpones."
    },
    {
      icon: Store,
      title: "Comercios y locales",
      description: "Instalaciones eléctricas de mayor porte, tableros trifásicos y climatización para locales comerciales y grandes superficies."
    },
    {
      icon: Building2,
      title: "Edificios y administraciones",
      description: "Servicio ágil de mantenimiento eléctrico para consorcios y edificios. Revisión de bombas de agua, tableros de palieres y mantenimiento preventivo."
    },
    {
      icon: Hammer,
      title: "Obras y constructoras",
      description: "Tableros de obra, instalación eléctrica industrial e instalación de artefactos para proyectos en construcción."
    }
  ];

  return (
    <section id="sectores" className="py-24 border-t border-border-subtle relative z-10 overflow-hidden">
      {/* Subtle decorative background gradient */}
      <div className="absolute left-1/4 bottom-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold tracking-widest text-gold uppercase px-3.5 py-1.5 bg-gold-soft/30 rounded-full border border-gold/10">
            A quién nos dirigimos
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-tight tracking-tighter">
            Trabajamos con industrias, comercios, edificios y constructoras
          </h2>
          <p className="text-muted text-base sm:text-lg font-light leading-relaxed max-w-[70ch]">
            Ya sea una reparación puntual, un tablero nuevo o un proyecto de automatización completo, el objetivo es el mismo: que tu planta o comercio funcione de forma segura, prolija y confiable.
          </p>
        </div>

        {/* Client Types Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clients.map((client, idx) => {
            const Icon = client.icon;
            return (
              <motion.div
                key={client.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-paper border border-border-subtle p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-gold/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Icon Frame */}
                  <div className="w-12 h-12 rounded-xl bg-bg-tint group-hover:bg-gold/10 text-ink group-hover:text-gold flex items-center justify-center transition-colors duration-300">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  
                  <h3 className="text-xl font-extrabold text-ink tracking-tight">
                    {client.title}
                  </h3>
                  
                  <p className="text-muted text-sm font-light leading-relaxed">
                    {client.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
