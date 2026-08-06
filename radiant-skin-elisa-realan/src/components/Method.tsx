import {method} from '../data';
import {Reveal, useParallax} from '../lib/motion';

export default function Method() {
  const imgRef = useParallax<HTMLImageElement>(52);

  return (
    <section
      id="metodo"
      aria-labelledby="metodo-title"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 md:scroll-mt-28 md:px-10 md:py-36">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Imagen a la izquierda, texto a la derecha: rompe el ritmo del hero */}
        <div className="lg:col-span-5">
          <Reveal
            variant="mask"
            className="grain relative aspect-[3/4] overflow-hidden bg-line">
            <img
              ref={imgRef}
              src={method.image}
              alt={method.imageAlt}
              width={1100}
              height={1467}
              loading="lazy"
              decoding="async"
              className="h-[112%] w-full object-cover object-[58%_50%]"
            />
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-8">
          <Reveal>
            <p className="t-label">{method.label}</p>
            <h2 id="metodo-title" className="t-h2 mt-6 max-w-[16ch]">
              {method.title}
            </h2>
            <p className="t-lead mt-7 max-w-[48ch]">{method.lead}</p>
          </Reveal>

          <dl className="mt-14">
            {method.points.map((p, i) => (
              <Reveal
                key={p.t}
                delay={i * 110}
                className="border-t border-line py-7 last:border-b">
                <dt className="t-h3">{p.t}</dt>
                <dd className="mt-3 max-w-[52ch] text-[0.97rem] leading-relaxed text-graphite">
                  {p.d}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
