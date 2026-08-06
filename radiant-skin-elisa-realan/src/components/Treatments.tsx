import {useState} from 'react';
import {treatments, waLink} from '../data';
import {Reveal} from '../lib/motion';

export default function Treatments() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section
      id="tratamientos"
      aria-labelledby="tratamientos-title"
      className="scroll-mt-24 border-y border-line bg-paper md:scroll-mt-28">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="t-label">Tratamientos</p>
            <h2 id="tratamientos-title" className="t-h2 mt-6 max-w-[14ch]">
              Seis herramientas. Una sola decide cuál.
            </h2>
          </div>
          <p className="t-lead max-w-[38ch] md:text-right">
            Ninguna se vende suelta. Cada una entra cuando la piel está lista
            para recibirla.
          </p>
        </Reveal>

        {/* Lista editorial: filas anchas, no un grid de tarjetitas SaaS */}
        <ul className="mt-16 md:mt-20">
          {treatments.map((t, i) => {
            const active = hover === t.n;
            return (
              <Reveal
                key={t.n}
                as="li"
                delay={i * 70}
                className="border-t border-line last:border-b">
                <div
                  onMouseEnter={() => setHover(t.n)}
                  onMouseLeave={() => setHover(null)}
                  className="group grid grid-cols-1 gap-4 py-8 transition-colors duration-500 md:grid-cols-12 md:gap-8 md:py-10"
                  style={{
                    backgroundColor: active
                      ? 'color-mix(in srgb, var(--color-glow-soft) 40%, transparent)'
                      : 'transparent',
                  }}>
                  <div className="flex items-baseline gap-5 md:col-span-4 md:px-4">
                    <span className="t-label">{t.n}</span>
                    <h3 className="t-h3">{t.name}</h3>
                  </div>

                  <div className="md:col-span-3">
                    <p className="font-display text-[1.1rem] italic leading-snug text-sage">
                      {t.claim}
                    </p>
                    <span className="t-label mt-2 block">{t.tag}</span>
                  </div>

                  <p className="max-w-[54ch] text-[0.97rem] leading-relaxed text-graphite md:col-span-5 md:px-4">
                    {t.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={120} className="mt-14">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary">
            Consultar cuál me corresponde
            <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
