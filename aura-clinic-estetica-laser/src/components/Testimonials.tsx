import { ArrowRight, MessageCircle, Quote } from 'lucide-react';
import { CONTACT_LABEL, CONTACT_URL } from '../data';
import { TESTIMONIAL_MESSAGES } from '../treatmentContent';
import beforeImage from '../assets/aura-clinic/resultado-cuerpo-real-1.jpg';
import afterImage from '../assets/aura-clinic/resultado-cuerpo-real-2.jpg';

export default function Testimonials() {
  const featured = TESTIMONIAL_MESSAGES.slice(0, 4);
  const secondary = TESTIMONIAL_MESSAGES.slice(4);

  return (
    <section id="testimonios" className="relative overflow-hidden bg-brand-paper py-16 text-brand-dark md:py-24">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.84fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow text-brand-muted">Testimonios</p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-[1.02] md:text-6xl">
              Lo que dicen cuando empiezan a verse distinto.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-muted">
              Las capturas se transforman en mensajes claros, sin nombres ni datos privados, para que la prueba social acompañe la decisión sin ruido visual.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <figure className="relative overflow-hidden rounded-[1.15rem] bg-brand-dark">
              <img
                src={beforeImage}
                alt="Antes de tratamiento corporal en Aura Clinic"
                className="aspect-[4/5] w-full object-cover object-[50%_38%]"
                loading="lazy"
              />
              <figcaption className="absolute left-4 top-4 rounded-full bg-brand-dark/76 px-3 py-1.5 text-xs font-semibold text-brand-accent backdrop-blur">
                Antes
              </figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-[1.15rem] bg-brand-dark sm:mt-10">
              <img
                src={afterImage}
                alt="Después de tratamiento corporal en Aura Clinic"
                className="aspect-[4/5] w-full object-cover object-[50%_35%]"
                loading="lazy"
              />
              <figcaption className="absolute left-4 top-4 rounded-full bg-brand-dark/76 px-3 py-1.5 text-xs font-semibold text-brand-accent backdrop-blur">
                Después
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {featured.map((message) => (
            <article
              key={message.id}
              className="rounded-[1.1rem] border border-brand-dark/10 bg-brand-ivory p-6 shadow-[0_18px_55px_rgba(13,14,11,0.055)]"
            >
              <Quote className="text-brand-gold" size={25} />
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">
                {message.area}
              </p>
              <blockquote className="mt-4 font-serif text-2xl leading-tight text-brand-dark">
                "{message.quote}"
              </blockquote>
              <p className="mt-5 text-sm leading-relaxed text-brand-muted">{message.context}</p>
            </article>
          ))}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {secondary.map((message) => (
            <article key={message.id} className="rounded-[1rem] border border-brand-dark/10 bg-white/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold">{message.area}</p>
              <blockquote className="mt-3 text-base leading-relaxed text-brand-muted">"{message.quote}"</blockquote>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="primary-button">
            <MessageCircle size={18} />
            {CONTACT_LABEL}
          </a>
          <a href="/#casos" className="secondary-button-light">
            Ver antes y después
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
