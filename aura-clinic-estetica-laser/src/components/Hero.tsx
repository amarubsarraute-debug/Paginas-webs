import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { BRAND_NAME, CONTACT_LABEL, CONTACT_URL } from '../data';
import procedureImage from '../assets/aura-clinic/procedimiento-quirurgico-aura-clinic.jpg';

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="inicio" className="relative overflow-hidden bg-brand-dark text-brand-ivory">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(200,169,79,0.18),transparent_30rem)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-ivory to-transparent" />

      <div className="relative z-10 mx-auto grid min-h-[720px] max-w-7xl items-center gap-10 px-5 pb-20 pt-28 md:px-10 lg:grid-cols-[0.92fr_0.78fr] lg:gap-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[42rem]"
        >
          <p className="eyebrow text-brand-accent">
            {BRAND_NAME} · Montevideo y Punta del Este
          </p>
          <h1 className="mt-5 max-w-[11ch] font-serif text-5xl font-semibold leading-[0.95] text-brand-ivory sm:text-6xl md:text-7xl lg:text-[5.8rem]">
            Clínica estética láser y facial.
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-brand-ivory/78 md:text-xl">
            Tratamientos corporales, Botox y labios con ácido hialurónico, indicados con evaluación profesional.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button"
            >
              <MessageCircle size={18} />
              {CONTACT_LABEL}
            </a>
            <a href="#casos" className="secondary-button-dark">
              Ver resultados reales
              <ArrowRight size={18} />
            </a>
          </div>

        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-[31rem] lg:ml-auto"
        >
          <div className="relative overflow-hidden rounded-[1.4rem] border border-brand-accent/28 bg-brand-ivory/5 p-2 shadow-[0_34px_90px_rgba(0,0,0,0.36)]">
            <img
              src={procedureImage}
              alt="Procedimiento corporal láser en Aura Clinic"
              className="aspect-[4/5] w-full rounded-[1.05rem] object-cover object-[50%_66%]"
              fetchPriority="high"
            />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-brand-ivory/18 bg-brand-dark/72 p-4 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold">Tecnología + criterio</p>
              <p className="mt-1 text-sm leading-snug text-brand-ivory/78">
                Protocolos definidos después de evaluar cada caso.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
