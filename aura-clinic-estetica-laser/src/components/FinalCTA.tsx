import { ArrowRight, MessageCircle } from 'lucide-react';
import { CONTACT_URL } from '../data';

export default function FinalCTA() {
  return (
    <section className="bg-brand-ivory px-4 py-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.8rem] bg-brand-dark px-6 py-12 text-brand-ivory shadow-[0_28px_80px_rgba(13,14,11,0.22)] md:px-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow text-brand-gold">Consulta inicial</p>
            <h2 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.02] md:text-6xl">
              Tu tratamiento comienza con una evaluación.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-ivory/72">
              Contanos qué zona querés mejorar y el equipo te orienta sobre el próximo paso.
            </p>
            <p className="mt-6 max-w-2xl text-sm font-semibold text-brand-ivory/62">
              Respuesta personalizada · Elegís tu sede · No necesitás saber qué tratamiento pedir
            </p>
          </div>
          <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="primary-button w-full sm:w-fit">
            <MessageCircle size={18} />
            Agendar evaluación por WhatsApp
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
