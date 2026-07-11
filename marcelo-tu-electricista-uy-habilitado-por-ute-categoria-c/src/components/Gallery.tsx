import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      src: "./img/custom_g1.jpg",
      alt: "Instalación de cargador de auto eléctrico Steck y tablero térmico",
      tag: "Cargadores EV"
    },
    {
      src: "./img/custom_g2.jpg",
      alt: "Automatización de tableros industriales en viveros/invernaderos",
      tag: "Industrial"
    },
    {
      src: "./img/custom_g3.jpg",
      alt: "Instalación de cámaras de seguridad Ezviz y cajas de pase Intelbras",
      tag: "Seguridad"
    },
    {
      src: "./img/custom_g4.jpg",
      alt: "Instalación y cableado de luminarias en techo técnico comercial",
      tag: "Obras"
    },
    {
      src: "./img/custom_g5.jpg",
      alt: "Protecciones Steck amuradas en exterior con cañería rígida normalizada",
      tag: "Instalaciones"
    },
    {
      src: "./img/custom_g6.jpg",
      alt: "Medición y control de corriente en acometida trifásica con pinza amperimétrica",
      tag: "Mediciones"
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

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm cursor-zoom-out"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img 
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              src={selectedImage} 
              alt="Vista ampliada del trabajo"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
