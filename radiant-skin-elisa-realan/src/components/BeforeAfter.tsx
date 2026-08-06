/**
 * Comparador antes/después con selector de casos.
 *
 * El input range transparente mantiene accesibilidad tactil y teclado. El
 * botón de cada caso reinicia la comparación en 50/50 para evitar estados raros
 * al cambiar de paciente.
 */
import {useState} from 'react';
import {beforeAfterCases} from '../data';

export default function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [activeId, setActiveId] = useState(beforeAfterCases[0].id);
  const activeIndex = beforeAfterCases.findIndex((item) => item.id === activeId);
  const c = beforeAfterCases[activeIndex >= 0 ? activeIndex : 0];

  function selectCase(id: string) {
    setActiveId(id);
    setPos(50);
  }

  return (
    <div className="mx-auto grid w-full max-w-[580px] gap-5">
      <figure className="relative">
        <div
          className="grain relative select-none overflow-hidden bg-porcelain"
          style={{aspectRatio: c.aspectRatio}}>
          <img
            src={c.after}
            alt={`${c.name}: después del tratamiento`}
            loading="eager"
            decoding="async"
            draggable={false}
            className="absolute inset-0 h-full w-full object-contain"
          />

          <div
            className="absolute inset-0 overflow-hidden"
            style={{clipPath: `inset(0 ${100 - pos}% 0 0)`}}>
            <img
              src={c.before}
              alt={`${c.name}: antes del tratamiento`}
              loading="eager"
              decoding="async"
              draggable={false}
              className="absolute inset-0 h-full w-full object-contain"
            />
          </div>

          <div className="pointer-events-none absolute inset-x-4 top-4 z-10 flex items-center justify-between">
            <span className="t-label rounded-full bg-ink/78 px-3 py-1.5 !text-porcelain backdrop-blur">
              Antes
            </span>
            <span className="t-label rounded-full bg-ink/78 px-3 py-1.5 !text-porcelain backdrop-blur">
              Después
            </span>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 z-20 w-px bg-porcelain"
            style={{left: `${pos}%`}}>
            <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-porcelain text-ink shadow-[0_6px_22px_rgba(20,18,14,0.4)]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M8.5 7 4 12l4.5 5v-3.2h7V17l4.5-5-4.5-5v3.2h-7V7Z" />
              </svg>
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label={`Comparar antes y después: ${c.name}`}
            className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>

        <figcaption className="mt-6 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="t-label">{c.label}</p>
            <h3 className="t-h3 mt-2">{c.name}</h3>
            <p className="mt-2 text-[0.95rem] text-graphite">{c.protocol}</p>
          </div>
          <div className="sm:text-right">
            <p className="t-label">{c.duration}</p>
            <p className="mt-2 max-w-[34ch] text-[0.85rem] leading-snug text-graphite">
              {c.note}
            </p>
          </div>
        </figcaption>
      </figure>

      <div className="grid grid-cols-1 overflow-hidden border border-line bg-line sm:grid-cols-5">
        {beforeAfterCases.map((item, index) => {
          const active = item.id === c.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => selectCase(item.id)}
              aria-pressed={active}
              className={`min-h-[7.25rem] p-4 text-left transition-all duration-300 ${
                active
                  ? 'bg-ink text-paper'
                  : 'bg-paper text-ink hover:bg-porcelain'
              }`}>
              <span
                className={`t-label inline-flex h-8 w-8 items-center justify-center rounded-full ${
                  active ? 'bg-paper !text-ink' : 'bg-porcelain !text-ink'
                }`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="mt-5 block text-[0.86rem] font-medium leading-tight">
                {item.name}
              </span>
              <span
                className={`mt-3 block h-px w-8 transition-all duration-300 ${
                  active ? 'bg-paper/45' : 'bg-line'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
