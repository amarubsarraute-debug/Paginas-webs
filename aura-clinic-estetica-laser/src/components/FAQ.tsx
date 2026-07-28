import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-brand-sand-light py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="eyebrow text-brand-muted">Preguntas frecuentes</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] text-brand-dark md:text-6xl">
            Lo básico antes de escribir.
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                className="overflow-hidden rounded-2xl border border-brand-dark/10 bg-brand-paper"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-brand-ivory md:p-6"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-semibold leading-snug text-brand-dark">{faq.question}</span>
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-brand-dark/10 transition-transform ${isOpen ? 'rotate-45 bg-brand-dark text-brand-gold' : 'text-brand-dark'}`}>
                    <Plus size={19} />
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-base leading-relaxed text-brand-muted md:px-6 md:pb-6">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
