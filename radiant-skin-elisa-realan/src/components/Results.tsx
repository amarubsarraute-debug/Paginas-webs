import {beforeAfterCases} from '../data';
import BeforeAfter from './BeforeAfter';

export default function Results() {
  return (
    <section
      id="resultados"
      aria-labelledby="resultados-title"
      className="scroll-mt-24 border-t border-line bg-paper md:scroll-mt-28">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="t-label">Antes y después</p>
            <h2 id="resultados-title" className="t-h2 mt-6 max-w-[15ch]">
              Resultados que se pueden mirar de cerca.
            </h2>
          </div>
          <p className="t-lead max-w-[38ch] lg:col-span-5 lg:justify-self-end lg:text-right">
            Cinco comparaciones reales montadas con slider para evaluar textura,
            tono, luminosidad y firmeza sin depender de una sola foto elegida.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <BeforeAfter />
          </div>

          <div className="lg:col-span-5 lg:pt-6">
            <p className="t-label">{beforeAfterCases.length} casos cargados</p>
            <p className="mt-6 font-display text-[1.65rem] leading-[1.22] tracking-[-0.02em]">
              La barra no maquilla la diferencia: deja comparar cada zona con
              el mismo encuadre.
            </p>
            <p className="mt-6 max-w-[38ch] text-[0.95rem] leading-relaxed text-graphite">
              Cada par queda preparado para explicar qué se trabajó, qué se ve
              en la imagen y qué expectativas conviene tener antes de agendar.
            </p>
            <div className="mt-8 border-y border-line py-5">
              <p className="t-label">Lectura visual</p>
              <ul className="mt-4 grid gap-3 text-[0.92rem] leading-relaxed text-graphite">
                <li>Textura y marcas visibles.</li>
                <li>Luminosidad y tono general.</li>
                <li>Perfil, contorno y frescura facial.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
