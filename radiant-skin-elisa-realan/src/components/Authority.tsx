import {brand, partners, stats} from '../data';
import {Reveal} from '../lib/motion';

export default function Authority() {
  return (
    <section
      id="contenido"
      aria-label="Credibilidad"
      className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-10">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 90} className="border-t border-line pt-5">
            <p className="t-num text-sage">{s.value}</p>
            <p className="mt-3 max-w-[22ch] text-[0.92rem] leading-snug text-graphite">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal
        delay={200}
        className="mt-16 flex flex-col gap-5 border-t border-line pt-6 md:mt-20 md:flex-row md:items-center md:justify-between">
        <p className="t-label">Trabajo con</p>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {partners.map((p) => (
            <li
              key={p}
              className="font-display text-[1.15rem] tracking-[-0.02em] text-graphite">
              {p}
            </li>
          ))}
        </ul>
        <a
          href={brand.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline t-label !text-ink">
          {brand.instagramHandle} ↗
        </a>
      </Reveal>
    </section>
  );
}
