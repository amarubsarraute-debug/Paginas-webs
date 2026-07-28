import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { CONTACT_URL } from '../data';
import heroImage from '../assets/aura-hero-laser.webp';

const sections = [
  {
    id: 'mela',
    title: 'MELA Láser TriActiva',
    subtitle: 'Tecnología corporal',
    text: 'Un protocolo no quirúrgico orientado a trabajar zonas puntuales de grasa localizada, firmeza y contorno corporal según evaluación.',
    bullets: ['Plan por zona', 'Evaluación previa', 'Seguimiento de evolución', 'Expectativas realistas'],
    cta: 'Consultar por MELA'
  },
  {
    id: 'mas40',
    title: 'Cuidado corporal +40',
    subtitle: 'Firmeza y autoestima',
    text: 'Una propuesta para acompañar los cambios de la piel y del cuerpo con un abordaje progresivo, medible y sin promesas exageradas.',
    bullets: ['Firmeza', 'Textura', 'Contorno', 'Mantenimiento'],
    cta: 'Consultar por cuidado +40'
  }
];

export default function DeepDives() {
  return (
    <section className="overflow-hidden bg-brand-ivory py-20 md:py-28">
      <div className="mx-auto max-w-7xl space-y-20 px-5 md:px-10">
        {sections.map((section, idx) => {
          const isReversed = idx % 2 !== 0;
          return (
            <div key={section.id} id={section.id} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.65 }}
                className={`w-full ${isReversed ? 'lg:order-2' : ''}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl shadow-brand-dark/10">
                  <img src={heroImage} alt={section.subtitle} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-brand-dark/14 mix-blend-multiply" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.65, delay: 0.08 }}
                className={`w-full ${isReversed ? 'lg:order-1' : ''}`}
              >
                <p className="mb-3 text-sm font-semibold text-brand-accent">{section.subtitle}</p>
                <h3 className="mb-6 font-serif text-4xl font-semibold leading-[1.02] text-brand-dark md:text-6xl">
                  {section.title}
                </h3>
                <p className="mb-8 text-lg leading-relaxed text-brand-text/80">{section.text}</p>

                <ul className="mb-10 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3 text-brand-text">
                      <CheckCircle2 size={20} className="shrink-0 text-brand-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={CONTACT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 border-b border-brand-accent pb-1 font-semibold text-brand-accent transition-colors hover:border-brand-dark hover:text-brand-dark"
                >
                  {section.cta}
                  <ArrowRight size={18} />
                </a>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
