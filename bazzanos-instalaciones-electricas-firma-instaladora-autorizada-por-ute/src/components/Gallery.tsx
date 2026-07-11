import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      src: "./img/custom_g1.jpg",
      alt: "Instalación y conexiones en local comercial",
      tag: "Locales"
    },
    {
      src: "./img/custom_g2.jpg",
      alt: "Armado y normalización de tablero eléctrico general",
      tag: "Tableros"
    },
    {
      src: "./img/custom_g3.jpg",
      alt: "Canalizaciones y cableado comercial",
      tag: "Instalaciones"
    },
    {
      src: "./img/custom_g4.jpg",
      alt: "Montajes eléctricos exteriores e iluminación de seguridad",
      tag: "Exteriores"
    },
    {
      src: "./img/custom_g5.jpg",
      alt: "Tendidos de bandejas y canalizaciones industriales",
      tag: "Industrias"
    },
    {
      src: "./img/custom_g6.jpg",
      alt: "Conexión y automatización de iluminación para piscinas",
      tag: "Iluminación"
    },
    {
      src: "./img/custom_g7.png",
      alt: "Mantenimiento e instalación eléctrica en estación Petrobras",
      tag: "Comercial"
    },
    {
      src: "./img/custom_g8.png",
      alt: "Obra eléctrica desde cero y cableados internos",
      tag: "Obras"
    },
    {
      src: "./img/custom_g9.png",
      alt: "Reparación y tendidos eléctricos en altura",
      tag: "Urgencias"
    }
  ];

  return (
    <section id="trabajos" className="py-24 border-t border-border-subtle relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="inline-block font-mono text-xs font-bold tracking-widest text-gold uppercase">
            Galería de Trabajos
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-none tracking-tighter">
            Nuestros trabajos realizados.
          </h2>
          <p className="text-muted text-base sm:text-lg font-light leading-relaxed max-w-[65ch]">
            Una selección de instalaciones, iluminación y proyectos comerciales y domésticos ejecutados con la máxima prolijidad y profesionalismo.
          </p>
        </div>

        {/* Gallery Grid (3 Columns, Larger Container, Uncropped) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.05 }}
              onClick={() => setSelectedImage(img.src)}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-bg-tint border border-border-subtle shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img 
                src={img.src} 
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-contain bg-bg-tint transition-transform duration-700 group-hover:scale-103"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                <span className="text-white font-bold text-base leading-tight tracking-tight">
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

      {/* Premium Lightbox Modal for uncropped viewing */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-navy/95 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-paper/10 text-white hover:bg-paper/20 hover:scale-105 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl bg-black flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Trabajo de Bazzanos"
                className="max-w-full max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
