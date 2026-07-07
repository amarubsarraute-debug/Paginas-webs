import { motion } from "motion/react";

export function Gallery() {
  const images = [
    {
      src: "./img/01-casa-moderna-iluminada.png",
      alt: "Diseño y ejecución de iluminación arquitectónica en residencia",
      tag: "Iluminación"
    },
    {
      src: "./img/02-cargador-vehiculo-electrico.png",
      alt: "Instalación y configuración de cargador inteligente para vehículos eléctricos",
      tag: "Instalaciones"
    },
    {
      src: "./img/03-instalacion-led-exterior.png",
      alt: "Montaje de iluminación exterior y senderos led en fachadas",
      tag: "Exteriores"
    },
    {
      src: "./img/04-control-de-acceso.png",
      alt: "Instalación de sistema digitalizado de control de acceso para edificios",
      tag: "Instalaciones"
    },
    {
      src: "./img/05-escalera-y-luminaria.png",
      alt: "Diseño a medida de luminarias suspendidas sobre caja de escalera",
      tag: "Iluminación"
    },
    {
      src: "./img/06-diseno-electrico-en-laptop.png",
      alt: "Diseño y planificación de proyectos eléctricos digitales bajo norma UTE",
      tag: "Obras"
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
            Una selección de instalaciones, iluminación y proyectos ejecutados en Maldonado y Punta del Este. Fotos reales de trabajos reales.
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
                className="w-full h-full object-contain bg-bg-tint/50 transition-transform duration-700 group-hover:scale-105"
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
