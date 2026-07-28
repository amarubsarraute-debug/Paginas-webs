import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { CONTACT_LABEL, CONTACT_URL } from '../data';
import abdomenImage from '../assets/aura-clinic/resultado-abdomen-antes-despues.jpg';
import lateralImage from '../assets/aura-clinic/resultado-corporal-lateral-2.jpg';
import waistImage from '../assets/aura-clinic/resultado-espalda-cintura-2.jpg';
import bodyImage from '../assets/aura-clinic/resultado-cuerpo-real-1.jpg';
import procedureImage from '../assets/aura-clinic/procedimiento-quirurgico-aura-clinic.jpg';

const treatments = [
  {
    title: 'Abdomen',
    text: 'Contorno y grasa localizada.',
    image: abdomenImage,
    position: '50% 52%'
  },
  {
    title: 'Cintura',
    text: 'Trabajo por zona.',
    image: waistImage,
    position: '50% 42%'
  },
  {
    title: 'Firmeza',
    text: 'Calidad de piel.',
    image: lateralImage,
    position: '50% 36%'
  },
  {
    title: 'Silueta',
    text: 'Resultado natural.',
    image: bodyImage,
    position: '50% 34%'
  },
  {
    title: 'Evaluación',
    text: 'Plan médico antes de indicar.',
    image: procedureImage,
    position: '50% 66%'
  }
];

export default function TreatmentShowcase() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <section id="tratamientos" className="relative overflow-hidden bg-brand-ivory py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-10 lg:grid-cols-[0.62fr_1.08fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
            Láser por zonas
          </p>
          <h2 className="mt-3 max-w-sm font-serif text-4xl font-semibold leading-[1.02] text-brand-dark md:text-6xl">
            Láser corporal por zona.
          </h2>
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle size={18} />
            {CONTACT_LABEL}
          </a>
        </div>

        <div className="divide-y divide-brand-sand/28 border-y border-brand-sand/28">
          {treatments.map((item, idx) => {
            const isActive = active === idx;

            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setActive(idx)}
                onMouseEnter={() => setActive(idx)}
                className="group relative grid w-full gap-4 py-5 text-left transition-colors lg:min-h-[9rem] lg:grid-cols-[1fr_16rem] lg:items-center lg:py-6"
              >
                <span className="relative z-10">
                  <span className={`block font-serif text-[2.45rem] leading-none md:text-6xl ${isActive ? 'text-brand-dark' : 'text-brand-dark/54'}`}>
                    {item.title}
                  </span>
                  <span className="mt-2 block text-sm font-medium text-brand-muted">{item.text}</span>
                </span>

                <motion.span
                  initial={false}
                  animate={reduceMotion || isActive ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.96 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className={`${isActive ? 'block' : 'hidden lg:block'} overflow-hidden rounded-2xl border border-brand-sand/32 bg-brand-dark shadow-[0_24px_60px_rgba(14,14,11,0.18)]`}
                >
                  <img
                    src={item.image}
                    alt={`Tratamiento de ${item.title.toLowerCase()} en Aura Clinic`}
                    className="aspect-[16/10] w-full object-cover lg:aspect-[5/4]"
                    style={{ objectPosition: item.position }}
                    loading="lazy"
                  />
                </motion.span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
