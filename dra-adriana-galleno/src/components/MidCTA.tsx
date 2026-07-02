import { ArrowRight } from 'lucide-react';
import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER_1 } from '../data';

export default function MidCTA() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER_1}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section className="bg-brand-dark px-6 py-16 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-serif font-semibold text-brand-sand-light leading-tight">
            ¿Querés saber qué tratamiento es adecuado para vos?
          </h2>
          <p className="mt-5 max-w-3xl text-brand-sand-light/70 text-lg leading-relaxed">
            Agendá una consulta para recibir una evaluación médica personalizada y definir el mejor camino según tu rostro, tu piel, tu cuerpo o tu etapa de vida.
          </p>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-gold px-8 py-3.5 font-semibold text-brand-sand-light transition-colors hover:bg-brand-sand-light hover:text-brand-dark"
        >
          Agendar por WhatsApp
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}
