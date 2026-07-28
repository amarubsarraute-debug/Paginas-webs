import { MessageCircle } from 'lucide-react';
import { CONTACT_URL, TECHNOLOGY_POINTS } from '../data';

export default function TechnologySection() {
  return (
    <section id="tecnologia" className="relative overflow-hidden bg-brand-dark py-16 text-brand-ivory md:py-24">
      <div className="absolute inset-x-0 top-0 h-px gold-line" />
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="max-w-xl">
            <p className="eyebrow text-brand-accent">Criterio médico</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] md:text-6xl">
              Primero se evalúa. Después se elige la tecnología.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-brand-ivory/68">
              El tratamiento no se decide por moda. Se decide por zona, objetivo y punto de partida.
            </p>
            <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="primary-button mt-8">
              <MessageCircle size={18} />
              Agendar evaluación
            </a>
          </div>

          <div className="border-t border-brand-accent/26">
            {TECHNOLOGY_POINTS.map((item, index) => (
              <article
                key={item.title}
                className="grid gap-5 border-b border-brand-accent/18 py-7 md:grid-cols-[5rem_0.72fr_1fr] md:items-start"
              >
                <span className="font-mono text-sm font-semibold text-brand-gold">0{index + 1}</span>
                <h3 className="font-serif text-3xl leading-none text-brand-ivory md:text-4xl">{item.title}</h3>
                <p className="max-w-xl text-base leading-relaxed text-brand-ivory/58">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
