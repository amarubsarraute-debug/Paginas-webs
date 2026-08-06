import {profile, waLink} from '../data';
import {Reveal, useParallax} from '../lib/motion';

export default function Profile() {
  const imgRef = useParallax<HTMLImageElement>(46);

  return (
    <section
      id="elisa"
      aria-labelledby="elisa-title"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 md:scroll-mt-28 md:px-10 md:py-36">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="t-label">{profile.label}</p>
            <h2 id="elisa-title" className="t-h2 mt-6 max-w-[15ch]">
              {profile.title}
            </h2>
          </Reveal>

          {profile.body.map((p, i) => (
            <Reveal
              key={p.slice(0, 14)}
              as="p"
              delay={100 + i * 110}
              className="t-lead mt-7 max-w-[50ch]">
              {p}
            </Reveal>
          ))}

          <Reveal delay={260} className="mt-12">
            <p className="t-label">Formación</p>
            <ul className="mt-5 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
              {profile.credentials.map((c) => (
                <li
                  key={c}
                  className="bg-porcelain px-5 py-4 text-[0.93rem] leading-snug text-graphite">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={340} className="mt-10">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary">
              Agendar con Elisa
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>

        {/* Retrato con firma superpuesta: el nombre entra sobre la foto */}
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal variant="mask" className="grain relative overflow-hidden bg-line">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                ref={imgRef}
                src={profile.portrait}
                alt={profile.portraitAlt}
                width={1000}
                height={1250}
                loading="lazy"
                decoding="async"
                className="h-[112%] w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={220} className="mt-6 flex items-end justify-between gap-6">
            <div>
              <p className="font-display text-[1.7rem] leading-none tracking-[-0.03em]">
                {profile.name}
              </p>
              <p className="t-label mt-2">{profile.role}</p>
            </div>
            <span aria-hidden className="hidden h-px flex-1 bg-line sm:block" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
