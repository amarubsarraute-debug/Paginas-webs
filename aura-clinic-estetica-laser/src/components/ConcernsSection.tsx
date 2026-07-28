import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { CONTACT_URL } from '../data';
import { TREATMENT_PAGES } from '../treatmentContent';
import procedureImage from '../assets/aura-clinic/procedimiento-quirurgico-aura-clinic.jpg';
import legsImage from '../assets/aura-clinic/resultado-piernas-antes-despues.png';
import backImage from '../assets/aura-clinic/resultado-espalda-cintura-2.jpg';
import profileImage from '../assets/aura-clinic/resultado-facial-perfil-antes-despues.jpg';
import botoxImage from '../assets/aura-clinic/resultado-botox-frente-antes-despues.png';
import lipsImage from '../assets/aura-clinic/labios-acido-hialuronico-despues.png';

const concernImages = {
  'grasa-localizada': { src: procedureImage, alt: 'Procedimiento corporal en abdomen', position: '50% 70%', fit: 'cover' },
  'flacidez-corporal': { src: legsImage, alt: 'Resultado de piernas', position: '50% 50%', fit: 'contain' },
  contorno: { src: backImage, alt: 'Resultado corporal de espalda y cintura', position: '50% 42%', fit: 'contain' },
  papada: { src: profileImage, alt: 'Resultado de papada y perfil', position: '50% 50%', fit: 'contain' },
  botox: { src: botoxImage, alt: 'Antes y después de Botox', position: '50% 50%', fit: 'contain' },
  labios: { src: lipsImage, alt: 'Labios con ácido hialurónico', position: '50% 50%', fit: 'cover' }
};

export default function ConcernsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="tratamientos" className="section-pad bg-brand-ivory">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="eyebrow text-brand-muted">Tratamientos</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] text-brand-dark md:text-6xl">
            ¿Qué te gustaría mejorar?
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-muted">
            Corporal y facial. Primero evaluamos tu caso; después se define el tratamiento.
          </p>
          <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="primary-button mt-7">
            <MessageCircle size={18} />
            Solicitar evaluación
          </a>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {TREATMENT_PAGES.map((item, index) => {
            const image = concernImages[item.slug];

            return (
              <motion.a
                key={item.slug}
                href={item.path}
                aria-label={`Ver página de ${item.shortTitle}`}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.035 }}
                className="group relative flex min-h-[20rem] overflow-hidden rounded-[1.35rem] border border-brand-dark/10 bg-brand-paper p-6 shadow-[0_20px_55px_rgba(13,14,11,0.055)] transition-transform hover:-translate-y-1 focus-visible:-translate-y-1 md:min-h-[23rem]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`absolute inset-0 h-full w-full scale-105 opacity-100 transition duration-500 group-hover:scale-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 ${
                    image.fit === 'contain' ? 'object-contain' : 'object-cover'
                  }`}
                  style={{ objectPosition: image.position }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/48 to-transparent opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100" />

                <div className="relative z-10 mt-auto">
                  <span className="text-sm font-semibold text-brand-gold">0{index + 1}</span>
                  <h3 className="mt-4 max-w-[12ch] font-serif text-4xl leading-[0.98] text-brand-ivory transition-colors md:text-brand-dark md:group-hover:text-brand-ivory md:group-focus-visible:text-brand-ivory">
                    {item.shortTitle}
                  </h3>
                  <p className="mt-4 max-w-[17rem] text-base leading-relaxed text-brand-ivory/78 transition-colors md:text-brand-muted md:group-hover:text-brand-ivory/78 md:group-focus-visible:text-brand-ivory/78">
                    {item.cardText}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-gold transition-colors md:text-brand-dark md:group-hover:text-brand-gold md:group-focus-visible:text-brand-gold">
                    Ver tratamiento
                    <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
