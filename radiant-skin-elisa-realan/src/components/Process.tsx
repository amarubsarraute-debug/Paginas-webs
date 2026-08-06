import {process} from '../data';
import {Reveal} from '../lib/motion';

export default function Process() {
  return (
    <section
      id="proceso"
      aria-labelledby="proceso-title"
      className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
      <Reveal className="max-w-[34ch]">
        <p className="t-label">Cómo trabajamos</p>
        <h2 id="proceso-title" className="t-h2 mt-6">
          Cuatro etapas, sin letra chica.
        </h2>
      </Reveal>

      <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:mt-20 md:grid-cols-2 xl:grid-cols-4">
        {process.map((p, i) => (
          <Reveal
            key={p.n}
            as="li"
            delay={i * 110}
            className="card group relative flex min-h-[19rem] flex-col justify-between border border-transparent bg-porcelain p-7 md:p-9">
            <div>
              <div className="flex items-baseline justify-between">
                <span className="font-display text-[2.6rem] leading-none tracking-[-0.04em] text-sage-soft transition-colors duration-500 group-hover:text-sage">
                  {p.n}
                </span>
                <span className="t-label">{p.time}</span>
              </div>
              <h3 className="t-h3 mt-8">{p.t}</h3>
            </div>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-graphite">
              {p.d}
            </p>
            {/* Barrido de acento en el borde inferior al hover */}
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-sage transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
            />
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
