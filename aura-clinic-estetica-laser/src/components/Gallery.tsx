import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import heroImage from '../assets/aura-hero-laser.webp';

const galleryItems = [
  {
    title: 'Tratamiento láser',
    alt: 'Aplicador de estética láser en sala clínica',
    image: heroImage
  },
  {
    title: 'Evaluación corporal',
    alt: 'Sala premium para evaluación estética corporal',
    image: heroImage
  },
  {
    title: 'Plan por zona',
    alt: 'Detalle de equipo láser no quirúrgico',
    image: heroImage
  }
];

export default function Gallery() {
  const [activeImage, setActiveImage] = useState<(typeof galleryItems)[number] | null>(null);

  return (
    <section className="bg-brand-ivory py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="mb-12 max-w-3xl">
          <h2 className="mb-4 font-serif text-4xl font-semibold text-brand-dark md:text-6xl">
            Galería Aura
          </h2>
          <p className="text-lg leading-relaxed text-brand-muted">
            Sala, tecnología y resultados autorizados para entender la experiencia antes de coordinar.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {galleryItems.map((item) => (
            <button
              key={item.title}
              onClick={() => setActiveImage(item)}
              className="group relative overflow-hidden rounded-2xl border border-brand-sand/55 text-left"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/78 to-transparent p-4">
                <p className="text-sm font-semibold text-brand-ivory">{item.title}</p>
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
              className="absolute right-5 top-5 rounded-full bg-brand-ivory/10 p-3 text-brand-ivory backdrop-blur"
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
              className="max-h-[84dvh] max-w-5xl rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
