import { useState } from 'react';
import { motion } from 'motion/react';
import { GOALS } from '../data';
import { ChevronRight } from 'lucide-react';

export default function Selector() {
  const [activeGoal, setActiveGoal] = useState(GOALS[0].id);
  const selectedGoal = GOALS.find((goal) => goal.id === activeGoal) ?? GOALS[0];

  return (
    <section className="py-20 md:py-28 bg-brand-dark text-brand-sand-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-semibold text-brand-sand-light mb-5 leading-tight"
          >
            Elegí qué querés mejorar y encontrá el tratamiento adecuado
          </motion.h2>
          <p className="text-brand-sand-light/70 leading-relaxed max-w-md">
            La recomendación no parte del tratamiento de moda. Parte de tu rostro, tu piel, tu etapa y lo que querés cuidar.
          </p>

          <motion.div
            key={selectedGoal.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-8 rounded-lg border border-brand-sand-light/15 bg-brand-sand-light/10 p-6"
          >
            <p className="text-xs font-semibold uppercase text-brand-champagne">Tratamientos relacionados</p>
            <h3 className="mt-2 text-2xl font-serif font-semibold text-brand-sand-light">{selectedGoal.title}</h3>
            <p className="mt-4 text-brand-sand-light/75 leading-relaxed">{selectedGoal.treatments}</p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {GOALS.map((goal, idx) => {
            const isActive = activeGoal === goal.id;
            return (
              <motion.div 
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <button
                  onClick={() => setActiveGoal(goal.id)}
                  className={`w-full min-h-24 text-left p-5 rounded-lg transition-all duration-300 border flex justify-between items-center ${
                    isActive 
                      ? 'bg-brand-sand-light text-brand-dark border-brand-sand-light shadow-lg shadow-black/10' 
                      : 'bg-brand-sand-light/10 border-brand-sand-light/15 text-brand-sand-light hover:bg-brand-sand-light/15'
                  }`}
                >
                  <span className="font-medium">{goal.title}</span>
                  <ChevronRight size={18} className={`transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`} />
                </button>
              </motion.div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
