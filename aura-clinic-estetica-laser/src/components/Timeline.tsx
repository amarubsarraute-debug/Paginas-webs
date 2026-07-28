import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ClipboardList, MessageSquare, ScanLine, ShieldCheck } from 'lucide-react';
import { METHOD_STEPS } from '../data';

const icons = [MessageSquare, ScanLine, ClipboardList, ShieldCheck];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 72%', 'end 62%']
  });
  const laserTop = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), {
    stiffness: 70,
    damping: 20,
    mass: 0.55
  });
  const progressScale = useSpring(scrollYProgress, { stiffness: 70, damping: 20, mass: 0.55 });

  return (
    <section ref={sectionRef} id="proceso" className="relative overflow-hidden bg-brand-ivory py-16 md:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-brand-sand/55" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-10">
        <div className="mb-10 grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="eyebrow text-brand-accent">Método MELA</p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl font-semibold leading-[1.02] text-brand-dark md:text-6xl">
              De la evaluación al seguimiento.
            </h2>
          </div>
          <p className="max-w-md text-lg leading-snug text-brand-muted">
            Un recorrido simple para decidir con más claridad: qué tratar, por qué y cómo acompañar la evolución.
          </p>
        </div>

        <div className="relative">
          <div className="absolute bottom-0 left-8 top-0 w-px bg-brand-sand/45 md:left-1/2" />
          <motion.div
            className="absolute left-8 top-0 w-px origin-top bg-gradient-to-b from-[#fff2c4] via-[#ff2a14] to-transparent md:left-1/2"
            style={{ bottom: 0, scaleY: reduceMotion ? 1 : progressScale }}
          />
          <motion.div
            className="laser-orb absolute left-8 z-20 -translate-x-1/2 md:left-1/2"
            style={{ top: reduceMotion ? '0%' : laserTop }}
          />

          <div className="space-y-5 md:space-y-7">
            {METHOD_STEPS.map((step, idx) => {
              const Icon = icons[idx];
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={step.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.42, delay: idx * 0.04 }}
                  className={`relative flex ${isEven ? 'md:justify-end' : 'md:justify-start'}`}
                >
                  <article className={`ml-20 w-[calc(100%-5rem)] rounded-2xl border border-brand-dark/10 bg-brand-paper p-5 shadow-[0_18px_45px_rgba(13,14,11,0.06)] md:ml-0 md:w-[42%] ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <div className={`mb-4 flex items-center gap-3 ${isEven ? '' : 'md:justify-end'}`}>
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-dark text-brand-accent">
                        <Icon size={17} />
                      </span>
                      <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent">
                        Paso {idx + 1}
                      </span>
                    </div>
                    <h3 className="font-serif text-3xl leading-tight text-brand-dark">{step.title}</h3>
                    <p className="mt-2 text-base leading-snug text-brand-muted">{step.text}</p>
                  </article>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
