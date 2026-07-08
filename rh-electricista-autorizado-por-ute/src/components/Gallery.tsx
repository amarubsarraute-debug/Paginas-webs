import { motion } from "motion/react";

export function Gallery() {
  const images = [
    {
      src: "./img/hero-electricista-azotea-arnes-seguridad.png",
      alt: "Electricista trabajando en altura con arnés de seguridad en Canelones",
      tag: "Trabajo en Altura"
    },
    {
      src: "./img/trabajo-iluminacion-comercial-club-solis.png",
      alt: "Instalación y mantenimiento de iluminación comercial en Club Solis",
      tag: "Iluminación Comercial"
    },
    {
      src: "./img/trabajo-instalacion-electrica-obra.png",
      alt: "Instalación eléctrica en obra nueva, canalizado y cableado bajo norma",
      tag: "Obras"
    },
    {
      src: "./img/trabajo-cargador-vehiculo-electrico.png",
      alt: "Instalación de punto de carga para vehículo eléctrico",
      tag: "Cargadores EV"
    },
    {
      src: "./img/trabajo-instalacion-medidor-exterior.png",
      alt: "Instalación de medidor y conexión exterior habilitada por UTE",
      tag: "Exteriores"
    },
    {
      src: "./img/trabajo-iluminacion-espacio-industrial.png",
      alt: "Iluminación e instalación eléctrica en espacio industrial",
      tag: "Industrial"
    }
  ];

  return (
    <section id="trabajos" className="py-24 border-t border-border-subtle relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="inline-block font-mono text-xs font-bold tracking-widest text-gold uppercase">
            Galería de Trabajos
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-none tracking-tighter">
            Otros trabajos realizados.
          </h2>
          <p className="text-muted text-base sm:text-lg font-light leading-relaxed max-w-[65ch]">
            Una selección de instalaciones, iluminación y proyectos ejecutados en Canelones. Fotos reales de trabajos reales.
          </p>
        </div>

        {/* Gallery Grid (2 Columns for 4 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {images.map((img, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-bg-tint border border-border-subtle shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <img 
                src={img.src} 
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                <span className="text-white font-bold text-lg leading-tight tracking-tight">
                  {img.alt}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-gold border border-gold/30 px-2 py-0.5 rounded-md w-fit mt-2">
                  {img.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
