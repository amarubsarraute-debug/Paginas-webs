import {useState} from 'react';
import {faq, waLink} from '../data';
import {Reveal} from '../lib/motion';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="preguntas"
      aria-labelledby="faq-title"
      className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal className="lg:sticky lg:top-28">
              <p className="t-label">Dudas frecuentes</p>
              <h2 id="faq-title" className="t-h2 mt-6 max-w-[12ch]">
                Lo que todo el mundo pregunta.
              </h2>
              <p className="t-lead mt-7 max-w-[34ch]">
                Si lo tuyo no está acá, escribime y te contesto yo.
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost mt-8">
                Preguntar por WhatsApp
              </a>
            </Reveal>
          </div>

          <dl className="lg:col-span-7 lg:col-start-6">
            {faq.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal
                  key={item.q}
                  delay={i * 60}
                  className="border-t border-line last:border-b">
                  <dt>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left">
                      <span
                        className={`font-display text-[1.24rem] leading-snug tracking-[-0.02em] transition-colors duration-300 md:text-[1.4rem] ${
                          isOpen ? 'text-sage' : 'group-hover:text-sage'
                        }`}>
                        {item.q}
                      </span>
                      {/* Cruz que gira hasta ser un guion */}
                      <span
                        aria-hidden
                        className="relative mt-2 block h-3.5 w-3.5 shrink-0">
                        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink" />
                        <span
                          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                          style={{
                            transform: `translateX(-50%) rotate(${isOpen ? 90 : 0}deg) scaleY(${isOpen ? 0 : 1})`,
                          }}
                        />
                      </span>
                    </button>
                  </dt>
                  <dd
                    id={`faq-panel-${i}`}
                    className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{gridTemplateRows: isOpen ? '1fr' : '0fr'}}>
                    {/* inert saca la respuesta cerrada del lector de pantalla
                        y del tabulador sin romper la animación de altura */}
                    <div className="overflow-hidden" inert={!isOpen}>
                      <p className="max-w-[56ch] pb-7 text-[0.97rem] leading-relaxed text-graphite">
                        {item.a}
                      </p>
                    </div>
                  </dd>
                </Reveal>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
