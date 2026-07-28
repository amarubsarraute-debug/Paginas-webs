import { useState } from 'react';
import { motion } from 'motion/react';
import { GOALS } from '../data';
import { ChevronRight } from 'lucide-react';

export default function Selector() {
  const [activeGoal, setActiveGoal] = useState(GOALS[0].id);
  const selectedGoal = GOALS.find((goal) => goal.id === activeGoal) ?? GOALS[0];

  return (
    <section id="objetivos" className="bg-brand-dark py-20 text-brand-ivory md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 font-serif text-4xl font-semibold leading-[1.02] text-brand-ivory md:text-6xl"
          >
            Elegí qué querés mejorar.
          </motion.h2>
          <p className="max-w-md text-lg leading-relaxed text-brand-ivory/70">
            La recomendación no parte de una promoción. Parte de la zona, la piel, la etapa y el objetivo real.
          </p>

          <motion.div
            key={selectedGoal.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-8 rounded-2xl border border-brand-ivory/14 bg-brand-ivory/9 p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-mist">Lectura sugerida</p>
            <h3 className="mt-3 font-serif text-3xl font-semibold text-brand-ivory">{selectedGoal.title}</h3>
            <p className="mt-4 leading-relaxed text-brand-ivory/75">{selectedGoal.treatments}</p>
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
                  className={`flex min-h-24 w-full items-center justify-between rounded-2xl border p-5 text-left transition-all duration-300 ${
                    isActive 
                      ? 'border-brand-ivory bg-brand-ivory text-brand-dark shadow-lg shadow-black/12' 
                      : 'border-brand-ivory/14 bg-brand-ivory/9 text-brand-ivory hover:bg-brand-ivory/14'
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
