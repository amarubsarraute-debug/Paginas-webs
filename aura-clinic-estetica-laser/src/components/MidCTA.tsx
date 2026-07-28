import { ArrowRight, Instagram } from 'lucide-react';
import { CONTACT_LABEL, CONTACT_URL } from '../data';

export default function MidCTA() {
  return (
    <section className="bg-brand-mist px-5 py-16 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="font-serif text-4xl font-semibold leading-[1.02] text-brand-dark md:text-6xl">
            ¿Querés saber si MELA es para vos?
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-brand-muted">
            Mandá un mensaje con la zona que querés trabajar y coordiná una evaluación con Aura Clinic.
          </p>
        </div>
        <a
          href={CONTACT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-dark px-7 py-3.5 font-semibold text-brand-ivory transition-transform hover:-translate-y-0.5"
        >
          <Instagram size={18} />
          {CONTACT_LABEL}
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}
