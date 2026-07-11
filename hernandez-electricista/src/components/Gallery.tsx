import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      src: "./img/custom_g1.jpg",
      alt: "Instalación de pilar de luz certificado y estanco bajo normativa UTE",
      tag: "Pilares"
    },
    {
      src: "./img/custom_g2.jpg",
      alt: "Colocación y armado de araña de luces LED moderna de alta gama",
      tag: "Iluminación"
    },
    {
      src: "./img/custom_g3.jpg",
      alt: "Mantenimiento y armado de tablero eléctrico residencial normalizado",
      tag: "Tableros"
    },
    {
      src: "./img/custom_g4.jpg",
      alt: "Montaje exterior de pilón y acometida eléctrica para portones y accesos",
      tag: "Pilares"
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
            Trabajos reales realizados.
          </h2>
          <p className="text-muted text-base sm:text-lg font-light leading-relaxed max-w-[65ch]">
            Una selección de instalaciones, montaje de pilares y tableros bajo normas vigentes. Haz clic en cualquier foto para verla completa y en detalle.
          </p>
        </div>

        {/* Gallery Grid (2 Columns, aspect-[3/4] vertical layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {images.map((img, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => setSelectedImage(img.src)}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-bg-tint border border-border-subtle shadow-sm hover:shadow-lg transition-all duration-300 cursor-zoom-in"
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

        {/* Premium Lightbox Modal for viewing complete images */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/95 backdrop-blur-sm cursor-zoom-out"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Cerrar imagen"
              >
                <X className="w-6 h-6" />
              </button>
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative max-w-full max-h-[85vh] overflow-hidden rounded-xl bg-bg-tint border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={selectedImage} 
                  alt="Trabajo de Hernández Electricista" 
                  className="max-w-full max-h-[85vh] object-contain block"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
