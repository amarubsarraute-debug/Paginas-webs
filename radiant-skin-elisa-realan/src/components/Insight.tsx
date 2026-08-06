import {insight} from '../data';
import {Reveal, SplitWords, useInView} from '../lib/motion';

export default function Insight() {
  const {ref, inView} = useInView<HTMLDivElement>();

  return (
    <section
      aria-labelledby="insight-title"
      className="relative bg-ink text-porcelain">
      <div className="grain relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div
          ref={ref}
          data-inview={inView ? 'true' : 'false'}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="t-label !text-glow">{insight.label}</p>
            <h2 id="insight-title" className="t-h2 mt-6 max-w-[15ch]">
              <SplitWords text={insight.title} />
            </h2>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            {insight.body.map((p, i) => (
              <Reveal
                key={p.slice(0, 16)}
                as="p"
                delay={i * 140}
                className="t-lead !text-porcelain/70 mb-6 max-w-[52ch] last:mb-0">
                {p}
              </Reveal>
            ))}
          </div>
        </div>

        <ul className="mt-20 grid grid-cols-1 gap-px overflow-hidden border border-porcelain/15 bg-porcelain/15 md:mt-28 md:grid-cols-3">
          {insight.pains.map((p, i) => (
            <Reveal
              key={p.k}
              as="li"
              delay={i * 120}
              className="bg-ink p-7 md:p-9">
              <span className="t-label !text-glow">{p.k}</span>
              <h3 className="t-h3 mt-6 max-w-[18ch]">{p.t}</h3>
              <p className="mt-4 max-w-[34ch] text-[0.95rem] leading-relaxed text-porcelain/60">
                {p.d}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
