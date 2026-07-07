import { Home, Store, Building2, Hammer } from "lucide-react";
import { motion } from "motion/react";

export function ClientTypes() {
  const clients = [
    {
      icon: Home,
      title: "Hogares y apartamentos",
      description: "Soluciones a medida para viviendas particulares. Desde reparaciones rápidas de cortocircuitos o fugas hasta reformas eléctricas completas, iluminación de interiores y puestas a tierra."
    },
    {
      icon: Store,
      title: "Comercios y oficinas",
      description: "Instalaciones proyectadas para evitar interrupciones. Adecuación de locales comerciales, iluminación técnica, cableado estructurado, tableros trifásicos y mantenimiento preventivo."
    },
    {
      icon: Building2,
      title: "Edificios y administraciones",
      description: "Servicio ágil de mantenimiento eléctrico para consorcios y edificios residenciales. Asesoramiento ante UTE, revisión de bombas de agua, palieres, iluminación y mantenimiento preventivo."
    },
    {
      icon: Hammer,
      title: "Obras y reformas",
      description: "Planificación de instalaciones eléctricas completas para proyectos en construcción o reformas. Tableros de obra provisorios, canalizaciones, cableados e instalación de artefactos."
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
            Trabajamos con particulares, empresas, comercios y administraciones
          </h2>
          <p className="text-muted text-base sm:text-lg font-light leading-relaxed max-w-[70ch]">
            Ya sea una reparación puntual, una instalación nueva o un proyecto completo, el objetivo es el mismo: que el sistema eléctrico funcione de forma segura, prolija y confiable.
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
