import { motion } from "motion/react";

export function Gallery() {
  const images = [
    {
      src: "./img/iluminacion-interior-juan-carlos.jpg",
      alt: "Iluminación LED interior instalada en una habitación",
      tag: "Iluminación"
    },
    {
      src: "./img/acometida-exterior-juan-carlos.jpg",
      alt: "Acometida eléctrica exterior instalada junto a una columna",
      tag: "Acometidas"
    },
    {
      src: "./img/tablero-exterior-juan-carlos.jpg",
      alt: "Tablero eléctrico exterior rotulado con caja transparente",
      tag: "Tableros"
    },
    {
      src: "./img/obra-medidor-vecinos-alerta-juan-carlos.png",
      alt: "Caja de medidor y distribución eléctrica instalada en obra",
      tag: "Obra"
    },
    {
      src: "./img/canalizacion-pared-juan-carlos.png",
      alt: "Canalización eléctrica embutida en pared interior",
      tag: "Canalización"
    },
    {
      src: "./img/canalizacion-losa-juan-carlos.png",
      alt: "Canalización eléctrica sobre malla de losa de obra",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {images.map((img, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-bg-tint border border-border-subtle shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <img 
                src={img.src} 
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-contain bg-bg-tint/50 transition-transform duration-700 group-hover:scale-[1.02]"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                <span className="text-white font-bold text-sm leading-tight tracking-tight">
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
