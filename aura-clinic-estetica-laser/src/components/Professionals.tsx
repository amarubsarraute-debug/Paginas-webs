import { motion, useReducedMotion } from 'motion/react';
import { CONTACT_URL, PROFESSIONALS } from '../data';
import doctorImage from '../assets/aura-clinic/doctor-especialista-aura-clinic.jpg';

export default function Professionals() {
  const reduceMotion = useReducedMotion();
  const doctor = PROFESSIONALS[0];

  return (
    <section id="profesionales" className="relative overflow-hidden bg-brand-dark py-16 text-brand-ivory md:py-24">
      <div className="absolute inset-x-0 top-0 h-px gold-line" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="eyebrow text-brand-accent">Dirección médica</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-[1.02] md:text-6xl">
            Dr. Arlet Pereira Santos.
          </h2>
          <p className="mt-6 max-w-xl text-xl leading-relaxed text-brand-ivory/72">
            Más de 26 años de experiencia realizando cirugías plásticas.
          </p>

          <div className="mt-10 flex items-end gap-5 border-y border-brand-accent/20 py-6">
            <span className="font-serif text-7xl leading-none text-brand-gold md:text-8xl">26+</span>
            <p className="max-w-xs pb-2 text-base leading-relaxed text-brand-ivory/62">
              años de experiencia quirúrgica aplicados a una indicación estética más clara y responsable.
            </p>
          </div>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-brand-ivory/58">
            En Aura, el criterio médico ordena qué conviene tratar, qué expectativas son realistas y cómo acompañar cada proceso.
          </p>

          <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="secondary-button-dark mt-8">
            Agendar evaluación
          </a>
        </motion.div>

        <motion.figure
          initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.99 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: 0.08 }}
          className="relative mx-auto w-full max-w-[36rem] lg:max-w-[44rem]"
        >
          <img
            src={doctorImage}
            alt="Dr. Arlet Pereira Santos en Aura Clinic"
            className="max-h-[38rem] w-full object-contain object-bottom lg:max-h-[40rem]"
            loading="lazy"
          />
          <figcaption className="mt-4 border-t border-brand-accent/24 pt-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-accent">
            {doctor.role}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
