import {useEffect, useState} from 'react';
import hifuHero from '../assets/home/radiantskin-hifu-facial-home.jpg';
import {waLink} from '../data';

export default function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 90);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="top"
      data-inview={ready ? 'true' : 'false'}
      className="relative min-h-[92svh] overflow-hidden bg-ink text-paper">
      <img
        src={hifuHero}
        alt="Elisa Realan realizando un tratamiento HIFU facial en Radiant Skin"
        width={1672}
        height={941}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[66%_center] transition-transform duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:object-center"
        style={{transform: ready ? 'scale(1)' : 'scale(1.035)'}}
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,28,18,0.94)_0%,rgba(8,28,18,0.78)_34%,rgba(8,28,18,0.26)_66%,rgba(8,28,18,0.08)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_34%,rgba(218,171,94,0.18),transparent_28%),linear-gradient(180deg,rgba(8,18,12,0.16),rgba(8,18,12,0.56))]" />
      <div className="grain absolute inset-0 opacity-45" />

      <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-[1440px] flex-col px-5 pb-10 pt-24 md:px-10 md:pb-12 md:pt-28">
        <div className="max-w-[49rem] pb-8 pt-[6vh] md:pt-[8vh]">
          <p className="t-label !text-paper/70">
            Elisa Realan / estética facial / Uruguay
          </p>

          <h1 className="mt-5 font-display text-[clamp(3.6rem,8.2vw,7.6rem)] font-normal leading-[0.92] tracking-[0] text-paper">
            Radiant Skin
          </h1>

          <p className="mt-4 max-w-[18ch] font-display text-[clamp(1.55rem,3vw,2.95rem)] leading-[1.05] tracking-[0] text-[#d8b66f]">
            Piel radiante, sin improvisar.
          </p>

          <div className="mt-6 max-w-[34rem]">
            <p className="text-[clamp(1.05rem,1.7vw,1.35rem)] font-light leading-[1.55] text-paper/82">
              Diagnóstico de piel, criterio estético y tratamientos progresivos
              para que el resultado se vea cuidado, natural y sostenido.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-[#d8b66f] text-ink hover:bg-paper">
                Agendar valoración
              </a>
              <a
                href="#resultados"
                className="btn border-paper/35 bg-paper/8 text-paper backdrop-blur-sm hover:border-paper hover:bg-paper/14">
                Ver resultados
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
