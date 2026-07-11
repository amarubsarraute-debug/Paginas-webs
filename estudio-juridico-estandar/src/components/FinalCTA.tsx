import { Phone } from 'lucide-react';
import { TELEFONO_TEL, TELEFONO_LABEL } from '../lib/constants';

export function FinalCTA() {
  return (
    <section className="bg-ink text-paper">
      <div className="container-page py-20 text-center md:py-28">
        <h2 className="mx-auto max-w-3xl text-balance font-display text-4xl font-medium leading-[1.08] md:text-5xl">
          Tu tranquilidad legal, <span className="italic font-normal text-bordeaux-bright">nuestro compromiso</span>.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-white/70">
          Contanos tu situación y te orientamos con claridad. Seriedad, seguimiento
          y trato cercano en cada paso.
        </p>
        <div className="mt-9 flex justify-center">
          <a
            href={TELEFONO_TEL}
            className="inline-flex h-12 items-center gap-2 rounded-md bg-bordeaux-bright px-7 text-base font-medium text-paper transition-transform hover:-translate-y-0.5"
          >
            <Phone className="h-4 w-4" /> Llamar: {TELEFONO_LABEL}
          </a>
        </div>
      </div>
    </section>
  );
}
