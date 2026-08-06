import {useMemo, useState} from 'react';
import {brand, finalCta, locations, waFor, waLink} from '../data';
import {Reveal, useParallax} from '../lib/motion';

const bookingGoals = [
  'Valoración de piel',
  'HIFU facial / papada',
  'Manchas / tono',
  'Poros y textura',
  'Acné o marcas',
  'Piel sensible / barrera',
  'Exosomas / PDRN',
  'Mesoterapia',
  'Limpieza profunda',
  'No sé, quiero orientación',
];

const bookingSlots = ['Mañana', 'Mediodía', 'Tarde', 'Primer disponible'];

export default function FinalCta() {
  const bgRef = useParallax<HTMLImageElement>(70);
  const [goal, setGoal] = useState(bookingGoals[0]);
  const [location, setLocation] = useState(locations[0].city);
  const [slot, setSlot] = useState(bookingSlots[2]);
  const [notes, setNotes] = useState('');

  const bookingLink = useMemo(() => {
    const extra = notes.trim()
      ? ` Me gustaría contar esto: ${notes.trim()}`
      : '';

    return waFor(
      `Hola Elisa, vengo de la web. Quiero reservar: ${goal}. Consultorio: ${location}. Preferencia horaria: ${slot}.${extra}`,
    );
  }, [goal, location, notes, slot]);

  return (
    <section
      id="consultorios"
      aria-labelledby="cta-title"
      className="relative scroll-mt-24 overflow-hidden bg-ink text-porcelain md:scroll-mt-28">
      <img
        ref={bgRef}
        src={finalCta.image}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-[118%] w-full -translate-y-[6%] object-cover opacity-25"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/88 to-ink/48"
      />

      <div className="grain relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid items-start gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16">
          <Reveal className="max-w-[38ch]">
            <p className="t-label !text-glow">{finalCta.label}</p>
            <h2 id="cta-title" className="t-h2 mt-6">
              {finalCta.title}
            </h2>
            <p className="t-lead !text-porcelain/70 mt-7 max-w-[46ch]">
              {finalCta.body}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn !bg-glow !text-ink hover:!bg-porcelain">
                {finalCta.cta}
                <span aria-hidden>→</span>
              </a>
              <a
                href={brand.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn !border-porcelain/30 !text-porcelain hover:!border-porcelain">
                Ver Instagram
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="border border-porcelain/18 bg-porcelain/[0.075] p-5 shadow-[0_34px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl md:p-7">
              <div className="grid gap-5 border-b border-porcelain/16 pb-6 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="t-label !text-glow">Pre-reserva</p>
                  <h3 className="mt-3 font-display text-[clamp(1.9rem,3.2vw,3rem)] leading-[1.02]">
                    Elegí tratamiento, sede y horario.
                  </h3>
                </div>
                <p className="max-w-[27ch] text-sm leading-relaxed text-porcelain/58">
                  Si no sabés qué corresponde, marcá orientación y escribí qué
                  querés mejorar.
                </p>
              </div>

              <BookingGroup
                label="Tratamiento o motivo"
                options={bookingGoals}
                value={goal}
                onChange={setGoal}
              />

              <BookingGroup
                label="Consultorio"
                options={locations.map((l) => l.city)}
                value={location}
                onChange={setLocation}
              />

              <BookingGroup
                label="Preferencia horaria"
                options={bookingSlots}
                value={slot}
                onChange={setSlot}
              />

              <label className="mt-6 block">
                <span className="t-label !text-porcelain/52">
                  Algo para contarle a Elisa
                </span>
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={4}
                  maxLength={260}
                  placeholder="Ej: tengo manchas hace años, quiero mejorar textura, hice HIFU antes, tengo piel sensible..."
                  className="mt-3 min-h-28 w-full resize-none border border-porcelain/18 bg-ink/28 px-4 py-3 text-sm leading-relaxed text-porcelain outline-none transition-all duration-300 placeholder:text-porcelain/34 focus:border-glow focus:bg-ink/42"
                />
              </label>

              <div className="mt-7 grid gap-4 border-t border-porcelain/16 pt-6 md:grid-cols-[1fr_auto] md:items-center">
                <div className="text-sm leading-relaxed text-porcelain/62">
                  <span className="text-porcelain">Pedido:</span> {goal} ·{' '}
                  {location} · {slot}
                  {notes.trim() ? (
                    <span className="block pt-1 text-porcelain/46">
                      Con comentario personalizado.
                    </span>
                  ) : null}
                </div>
                <a
                  href={bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn !justify-center !bg-glow !text-ink hover:!bg-porcelain">
                  Enviar pre-reserva
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <ul className="mt-20 grid grid-cols-1 gap-8 border-t border-porcelain/20 pt-10 sm:grid-cols-3 md:mt-28">
          {locations.map((l, i) => (
            <Reveal as="li" key={l.city} delay={i * 110}>
              <h3 className="font-display text-[1.5rem] tracking-[-0.02em]">
                {l.city}
              </h3>
              <p className="mt-2 text-[0.93rem] text-porcelain/60">
                {l.detail}
              </p>
              <p className="t-label mt-2 !text-glow">{l.days}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

type BookingGroupProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

function BookingGroup({label, options, value, onChange}: BookingGroupProps) {
  return (
    <fieldset className="mt-6">
      <legend className="t-label !text-porcelain/52">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option === value;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option)}
              className={`min-h-11 border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                selected
                  ? 'border-glow bg-glow text-ink'
                  : 'border-porcelain/18 bg-ink/20 text-porcelain/72 hover:border-porcelain/42 hover:text-porcelain'
              }`}>
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
