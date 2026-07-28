import { motion, useReducedMotion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { CONTACT_LABEL, CONTACT_URL } from '../data';
import planImage from '../assets/aura-clinic/resultado-abdomen-antes-despues.jpg';
import resultImage from '../assets/aura-clinic/resultado-cuerpo-real-2.jpg';

export default function FeaturedCase() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="caso-laura" className="relative overflow-hidden bg-brand-ivory py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl border border-brand-sand/35 bg-brand-sand-light p-3"
        >
          <img
            src={planImage}
            alt="Caso Laura con plan inicial y resultado"
            className="aspect-[16/10] w-full rounded-xl object-cover"
            loading="lazy"
          />
        </motion.div>

        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
            Caso Laura
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-4xl font-semibold leading-[1.02] text-brand-dark md:text-6xl">
            Plan, MELA y seguimiento.
          </h2>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {['Plan por zona', 'Sesión MELA', 'Resultado'].map((item, idx) => (
              <div key={item} className="border-t border-brand-sand/42 pt-3">
                <span className="font-mono text-xs font-semibold text-brand-accent">0{idx + 1}</span>
                <p className="mt-2 font-serif text-2xl leading-none text-brand-dark">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-[0.82fr_1.18fr] sm:items-end">
            <img
              src={resultImage}
              alt="Resultado corporal posterior de Laura"
              className="aspect-[4/5] rounded-2xl border border-brand-sand/35 object-cover object-[50%_35%]"
              loading="lazy"
            />
            <div className="rounded-2xl border border-brand-sand/35 bg-white/62 p-5">
              <p className="font-serif text-3xl leading-tight text-brand-dark">
                “Estoy súper bien, contenta con el resultado.”
              </p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-sand">
                Mensaje compartido por la paciente
              </p>
            </div>
          </div>

          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark"
          >
            <MessageCircle size={18} />
            {CONTACT_LABEL}
          </a>
        </div>
      </div>
    </section>
  );
}
