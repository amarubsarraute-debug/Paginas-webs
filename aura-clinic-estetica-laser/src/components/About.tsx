import { motion } from 'motion/react';
import { Activity, ShieldCheck, Sparkles } from 'lucide-react';
import heroImage from '../assets/aura-hero-laser.webp';

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Protocolo médico',
    text: 'La dirección técnica y la evaluación previa ordenan qué conviene hacer y qué no.'
  },
  {
    icon: Sparkles,
    title: 'Naturalidad corporal',
    text: 'El foco está en mejorar firmeza, contorno y textura sin prometer cambios irreales.'
  },
  {
    icon: Activity,
    title: 'Seguimiento',
    text: 'Cada plan se acompaña según zona, evolución y objetivo de mantenimiento.'
  }
];

export default function About() {
  return (
    <section id="metodo" className="relative overflow-hidden bg-brand-ivory py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-brand-sand/55" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[1.6rem] border border-brand-sand/45 bg-brand-mist shadow-[0_26px_90px_rgba(37,42,38,0.13)]">
            <img
              src={heroImage}
              alt="Equipo de estética láser en tratamiento corporal"
              className="aspect-[4/5] w-full object-cover object-[72%_center] md:aspect-[5/4]"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-brand-ivory/70 bg-brand-ivory/88 p-5 shadow-[0_18px_50px_rgba(37,42,38,0.14)] backdrop-blur-xl md:left-auto md:right-6 md:w-72">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-brand-muted">
              Dirección técnica
            </p>
            <p className="mt-2 font-serif text-2xl leading-tight text-brand-dark">
              Dr. Cirujano Arlet Pereira
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-brand-muted">
            Estética láser con criterio
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.02] text-brand-dark md:text-6xl">
            Mejorar el cuerpo sin convertirlo en una promesa imposible.
          </h2>
          <div className="mt-7 max-w-2xl space-y-5 text-lg leading-relaxed text-brand-text/78">
            <p>
              Aura Clinic trabaja desde una idea simple: no todo detalle corporal necesita cirugía, pero sí necesita una indicación clara.
            </p>
            <p>
              La consulta define el objetivo, la zona, el punto de partida y el plan de sesiones. El tratamiento se comunica como un proceso, no como una foto milagrosa.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article key={pillar.title} className="rounded-2xl border border-brand-sand/45 bg-white/55 p-5">
                  <Icon className="text-brand-accent" size={22} strokeWidth={1.8} />
                  <h3 className="mt-4 font-serif text-xl text-brand-dark">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">{pillar.text}</p>
                </article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
