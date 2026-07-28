import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { CONTACT_LABEL, CONTACT_URL } from '../data';
import abdomenImage from '../assets/aura-clinic/resultado-abdomen-antes-despues.jpg';
import legsImage from '../assets/aura-clinic/resultado-piernas-antes-despues.png';
import profileImage from '../assets/aura-clinic/resultado-facial-perfil-antes-despues.jpg';
import botoxImage from '../assets/aura-clinic/resultado-botox-frente-antes-despues.png';
import lipsBefore from '../assets/aura-clinic/labios-acido-hialuronico-antes.png';
import lipsAfter from '../assets/aura-clinic/labios-acido-hialuronico-despues.png';

type CaseItem =
  | {
      title: string;
      note: string;
      mode: 'horizontal' | 'vertical';
      image: string;
      alt: string;
      aspectRatio: string;
      maxWidth: string;
    }
  | {
      title: string;
      note: string;
      mode: 'pair';
      before: string;
      after: string;
      beforeAlt: string;
      afterAlt: string;
      aspectRatio: string;
      maxWidth: string;
      position?: string;
    };

const cases: CaseItem[] = [
  {
    title: 'Abdomen y cintura',
    note: 'Tocá o pasá el mouse para comparar.',
    mode: 'horizontal',
    image: abdomenImage,
    alt: 'Antes y después de abdomen y cintura',
    aspectRatio: '957 / 1227',
    maxWidth: '31rem'
  },
  {
    title: 'Piernas',
    note: 'Antes y después en piernas.',
    mode: 'vertical',
    image: legsImage,
    alt: 'Antes y después de piernas',
    aspectRatio: '941 / 836',
    maxWidth: '42rem'
  },
  {
    title: 'Papada',
    note: 'Perfil y zona submentoniana.',
    mode: 'horizontal',
    image: profileImage,
    alt: 'Antes y después de papada y perfil',
    aspectRatio: '724 / 1086',
    maxWidth: '29rem'
  },
  {
    title: 'Botox',
    note: 'Líneas de expresión.',
    mode: 'vertical',
    image: botoxImage,
    alt: 'Antes y después de Botox',
    aspectRatio: '2 / 1',
    maxWidth: '43rem'
  },
  {
    title: 'Labios',
    note: 'Ácido hialurónico.',
    mode: 'pair',
    before: lipsBefore,
    after: lipsAfter,
    beforeAlt: 'Antes de labios con ácido hialurónico',
    afterAlt: 'Después de labios con ácido hialurónico',
    aspectRatio: '4 / 5',
    maxWidth: '32rem',
    position: '50% 52%'
  }
];

function ComparisonImage({ item }: { item: CaseItem }) {
  const [showAfter, setShowAfter] = useState(false);
  const [locked, setLocked] = useState(false);

  const activate = () => setShowAfter(true);
  const deactivate = () => {
    if (!locked) setShowAfter(false);
  };
  const toggle = () => {
    setLocked((current) => {
      const next = !current;
      setShowAfter(next);
      return next;
    });
  };

  return (
    <button
      type="button"
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onFocus={activate}
      onBlur={deactivate}
      onPointerDown={activate}
      onClick={toggle}
      className="group block w-full overflow-hidden rounded-[1.35rem] border border-brand-accent/22 bg-brand-dark text-left shadow-[0_30px_80px_rgba(0,0,0,0.28)]"
      style={{ aspectRatio: item.aspectRatio }}
      aria-label={`Comparar ${item.title}`}
    >
      <div className="relative h-full w-full overflow-hidden">
        {item.mode === 'horizontal' && (
          <>
            <img
              src={item.image}
              alt={`${item.alt} antes`}
              className="absolute inset-y-0 left-0 h-full w-[200%] max-w-none object-fill"
              style={{ width: '200%', maxWidth: 'none' }}
              loading="lazy"
            />
            <img
              src={item.image}
              alt={`${item.alt} después`}
              className={`absolute inset-y-0 right-0 h-full w-[200%] max-w-none object-fill transition-opacity duration-300 ${
                showAfter ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ width: '200%', maxWidth: 'none' }}
              loading="lazy"
            />
          </>
        )}

        {item.mode === 'vertical' && (
          <>
            <img
              src={item.image}
              alt={`${item.alt} antes`}
              className="absolute inset-x-0 top-0 h-[200%] w-full max-w-none object-fill"
              style={{ height: '200%', maxWidth: 'none' }}
              loading="lazy"
            />
            <img
              src={item.image}
              alt={`${item.alt} después`}
              className={`absolute inset-x-0 bottom-0 h-[200%] w-full max-w-none object-fill transition-opacity duration-300 ${
                showAfter ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ height: '200%', maxWidth: 'none' }}
              loading="lazy"
            />
          </>
        )}

        {item.mode === 'pair' && (
          <>
            <img
              src={item.before}
              alt={item.beforeAlt}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: item.position }}
              loading="lazy"
            />
            <img
              src={item.after}
              alt={item.afterAlt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                showAfter ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ objectPosition: item.position }}
              loading="lazy"
            />
          </>
        )}

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="rounded-full bg-brand-dark/76 px-3 py-1.5 text-xs font-semibold text-brand-accent backdrop-blur">
            {showAfter ? 'Después' : 'Antes'}
          </span>
          <span className="rounded-full bg-brand-dark/76 px-3 py-1.5 text-xs font-semibold text-brand-ivory/76 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            {locked ? 'Fijado' : 'Tocar para fijar'}
          </span>
        </div>
      </div>
    </button>
  );
}

export default function BeforeAfter() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const selected = cases[active];

  return (
    <section id="casos" className="relative overflow-hidden bg-brand-dark py-16 text-brand-ivory md:py-24">
      <div className="absolute inset-x-0 top-0 h-px gold-line" />
      <div className="mx-auto grid max-w-7xl gap-9 px-5 md:px-10 lg:grid-cols-[0.74fr_1.12fr] lg:items-center">
        <div>
          <p className="eyebrow text-brand-accent">Resultados reales</p>
          <h2 className="mt-3 max-w-xl font-serif text-4xl font-semibold leading-[1.02] md:text-6xl">
            Antes y después.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-brand-ivory/68">
            Pasá el mouse o tocá la imagen para ver la comparación.
          </p>

          <div className="mt-8 grid gap-2">
            {cases.map((item, idx) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActive(idx)}
                className={`grid gap-1 rounded-2xl border px-5 py-4 text-left text-sm font-semibold transition-colors sm:grid-cols-[0.52fr_1fr] sm:items-center ${
                  active === idx
                    ? 'border-brand-accent bg-brand-accent text-brand-dark'
                    : 'border-brand-accent/22 text-brand-ivory hover:border-brand-accent hover:bg-brand-ivory/6'
                }`}
              >
                <span>{item.title}</span>
                <span className={active === idx ? 'text-brand-dark/70' : 'text-brand-ivory/42'}>{item.note}</span>
              </button>
            ))}
          </div>

          <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="primary-button mt-7">
            <MessageCircle size={18} />
            {CONTACT_LABEL}
          </a>
        </div>

        <motion.div
          key={selected.title}
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.32 }}
          className="mx-auto w-full"
          style={{ maxWidth: selected.maxWidth }}
        >
          <ComparisonImage item={selected} />
        </motion.div>
      </div>
    </section>
  );
}
