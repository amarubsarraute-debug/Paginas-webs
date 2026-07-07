import { motion } from "motion/react";
import img01 from "../assets/fotos_gallery/fotos ocean parck/01-balcon-rustico-con-jardin.png";
import img02 from "../assets/fotos_gallery/fotos ocean parck/02-aula-con-iluminacion.png";
import img03 from "../assets/fotos_gallery/fotos ocean parck/03-construccion-con-cableado.png";
import img04 from "../assets/fotos_gallery/fotos ocean parck/04-cocina-rustica-con-luminarias.png";

export function Gallery() {
  const images = [
    {
      src: img01,
      alt: "Instalación de luminarias exteriores de noche en deck y balcón de madera en Ocean Park.",
      tag: "Exteriores"
    },
    {
      src: img02,
      alt: "Montaje de paneles led de alta eficiencia y cableado embutido en salón educativo.",
      tag: "Iluminación"
    },
    {
      src: img03,
      alt: "Instalación de canalizaciones, cajas de pase y cableado general en obra residencial en construcción.",
      tag: "Instalaciones"
    },
    {
      src: img04,
      alt: "Diseño de iluminación decorativa suspendida y tendido de tomas de corriente en cocina rústica.",
      tag: "Iluminación"
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
            Nuestros trabajos realizados.
          </h2>
          <p className="text-muted text-base sm:text-lg font-light leading-relaxed max-w-[65ch]">
            Instalaciones reales realizadas por el negocio. Especialidad en tendido sobre madera y acabados prolijos.
          </p>
        </div>

        {/* Gallery Grid (2 Columns for 4 items - Clean & balanced) */}
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
