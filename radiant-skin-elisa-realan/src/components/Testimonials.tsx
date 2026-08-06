import {testimonials} from '../data';
import {Reveal} from '../lib/motion';

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonios-title"
      className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
      <Reveal className="max-w-[30ch]">
        <p className="t-label">Pacientes</p>
        <h2 id="testimonios-title" className="t-h2 mt-6">
          Lo que dicen cuando ya pasaron meses.
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
        {testimonials.map((t, i) => (
          <Reveal
            key={t.name}
            as="figure"
            delay={i * 130}
            className={`flex flex-col justify-between border-t border-line pt-7 ${
              i === 1 ? 'md:mt-14' : ''
            } ${i === 2 ? 'md:mt-28' : ''}`}>
            <blockquote>
              <span
                aria-hidden
                className="font-display block text-5xl leading-none text-glow">
                &ldquo;
              </span>
              <p className="mt-4 font-display text-[1.28rem] leading-[1.42] tracking-[-0.015em] text-ink">
                {t.quote}
              </p>
            </blockquote>
            <figcaption className="mt-8">
              <p className="text-[0.95rem] font-medium">{t.name}</p>
              <p className="t-label mt-1">{t.detail}</p>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
