import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Section } from './ui/Section';
import { Camera, AlertCircle, Maximize2, X } from 'lucide-react';

export function Cases() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = [
    "Ortodoncia",
    "Implantes",
    "Rehabilitación",
    "Limpieza dental",
    "Diseño de sonrisa",
    "Prótesis"
  ];

  return (
    <Section className="bg-stone-50">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 tracking-tight mb-6">
          Tratamientos y resultados
        </h2>
        <p className="text-lg text-stone-600 leading-relaxed">
          Espacio preparado para mostrar casos reales de tratamientos, siempre con autorización del paciente.
        </p>
      </div>

      {/* Placeholder blocks for future cases */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categories.map((category, index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative aspect-square bg-stone-200 rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => setSelectedImage("https://images.unsplash.com/photo-1590611936760-eeb9bc598548?auto=format&fit=crop&q=80&w=1200&h=1200")} // Placeholder image
          >
            {/* Real image would go here. Using a subtle pattern/placeholder for now */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 bg-stone-100 group-hover:bg-stone-200 transition-colors">
              <Camera size={32} className="mb-2 opacity-50" />
              <span className="font-medium">{category}</span>
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-brand-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
              <div className="text-white text-center flex flex-col items-center">
                <Maximize2 size={24} className="mb-2" />
                <span className="font-medium text-sm">Ver resultados de<br/>{category}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-stone-100 rounded-xl p-4 flex items-start gap-3 max-w-3xl mx-auto">
        <AlertCircle className="text-stone-500 shrink-0 mt-0.5" size={20} />
        <p className="text-sm text-stone-600">
          Los resultados pueden variar según cada paciente. Toda imagen de antes y después debe contar con autorización expresa para ser exhibida.
        </p>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-md">
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          
          <div className="max-w-5xl w-full max-h-full relative rounded-xl overflow-hidden">
            <img 
              src={selectedImage} 
              alt="Caso clínico" 
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white font-medium">Ejemplo de presentación clínica (Imagen ilustrativa)</p>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
