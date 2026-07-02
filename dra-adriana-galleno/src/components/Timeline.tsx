import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Activity, ClipboardList, MessageSquare, Stethoscope, Syringe } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Consulta inicial',
    desc: 'Escuchamos tu objetivo, dudas, antecedentes y expectativas.'
  },
  {
    icon: Stethoscope,
    title: 'Evaluación médica',
    desc: 'Se analiza tu rostro, piel, zona a tratar o necesidad funcional.'
  },
  {
    icon: ClipboardList,
    title: 'Plan personalizado',
    desc: 'Se define qué tratamiento tiene sentido para tu caso y qué resultado buscar.'
  },
  {
    icon: Syringe,
    title: 'Tratamiento',
    desc: 'Aplicación con técnica, cuidado y criterio médico.'
  },
  {
    icon: Activity,
    title: 'Seguimiento',
    desc: 'Se acompaña la evolución y se ajusta el plan si corresponde.'
  }
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 72%', 'end 38%']
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-brand-sand-light py-20 md:py-28">
      <div className="clinical-grid absolute inset-0 opacity-[0.32]" />
      <div className="absolute inset-x-0 top-0 h-px bg-brand-sand/55" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <p className="font-mono text-xs font-medium text-brand-gold">Proceso de atención</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-brand-dark md:text-5xl">
              Un proceso claro, médico y personalizado
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-brand-muted">
            La consulta ordena expectativas, indicación y seguimiento antes de elegir cualquier procedimiento.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute bottom-0 left-6 top-0 w-px -translate-x-1/2 bg-brand-sand/65 md:left-1/2" />
          <div className="absolute bottom-0 left-6 top-0 w-px -translate-x-1/2 overflow-hidden md:left-1/2">
            <motion.div className="h-full w-full origin-top bg-brand-dark" style={{ scaleY: lineScale }} />
          </div>

          <div className="space-y-10 md:space-y-14">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 36, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.48, margin: '-80px' }}
                  transition={{ duration: 0.58, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex w-full flex-col items-start gap-6 md:flex-row md:items-center md:gap-12 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className={`w-full pl-16 md:w-1/2 md:pl-0 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="group relative overflow-hidden rounded-md border border-brand-sand/85 bg-brand-sand-light/88 p-6 shadow-[0_18px_50px_rgba(53,45,41,0.07)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 md:p-7">
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-dark via-brand-sand to-brand-champagne opacity-80" />
                      <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-gold">
                        Paso {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h4 className="mt-3 text-2xl font-semibold leading-tight text-brand-dark">{step.title}</h4>
                      <p className="mt-3 text-sm leading-relaxed text-brand-muted md:text-base">{step.desc}</p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ scale: 0.72, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.45, delay: idx * 0.06 + 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-6 z-10 mt-3 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-brand-sand bg-brand-sand-light shadow-[0_12px_30px_rgba(53,45,41,0.14)] md:left-1/2 md:mt-0"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-dark text-brand-sand-light">
                      <Icon size={16} />
                    </div>
                  </motion.div>

                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
