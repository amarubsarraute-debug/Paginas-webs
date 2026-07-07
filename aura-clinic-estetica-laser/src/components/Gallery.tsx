import { useState } from 'react';
import customG1 from '../assets/custom_g1.jpg';
import customG2 from '../assets/custom_g2.jpg';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';

const galleryItems = [
  {
    title: 'Consulta médica estética',
    alt: 'Consultorio médico preparado para evaluación estética',
    image: customG1
  },
  {
    title: 'Detalle de piel',
    alt: 'Detalle editorial de piel cuidada',
    image: customG2
  },
  {
    title: 'Tratamientos personalizados',
    alt: 'Material médico estético en consultorio',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Bienestar femenino',
    alt: 'Espacio de consulta para bienestar femenino',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Productos y protocolos',
    alt: 'Productos profesionales de cuidado de piel',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Resultados autorizados',
    alt: 'Espacio reservado para resultados autorizados',
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1200&auto=format&fit=crop'
  }
];

export default function Gallery() {
  const [activeImage, setActiveImage] = useState<(typeof galleryItems)[number] | null>(null);

  return (
    <section className="py-20 md:py-28 bg-brand-sand-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-serif font-semibold text-brand-dark mb-4">
            Galería editorial
          </h2>
          <p className="text-brand-muted text-lg leading-relaxed">
            Un espacio visual para mostrar consultorio, detalles de tratamientos y resultados autorizados cuando estén disponibles.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {galleryItems.map((item, idx) => (
            <button
              key={item.title}
              onClick={() => setActiveImage(item)}
              className={`group relative overflow-hidden rounded-lg border border-brand-sand text-left ${
                idx === 0 || idx === 5 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="h-full min-h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/78 to-transparent p-4">
                <p className="text-sm font-semibold text-brand-sand-light">{item.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-dark/90 p-5"
            onClick={() => setActiveImage(null)}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute right-5 top-5 rounded-full bg-brand-sand-light/10 p-3 text-brand-sand-light backdrop-blur"
              aria-label="Cerrar imagen"
            >
              <X size={22} />
            </button>
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              src={activeImage.image}
              alt={activeImage.alt}
              className="max-h-[84dvh] max-w-5xl rounded-lg object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
