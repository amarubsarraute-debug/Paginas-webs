import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { DIRECCION, HORARIO, TELEFONO_LABEL } from '../lib/constants';

const faqs = [
  { q: '¿Cómo puedo contactar al estudio?', a: `Podés llamarnos al ${TELEFONO_LABEL} o visitarnos en nuestra oficina. Te respondemos a la brevedad.` },
  { q: '¿Dónde están ubicados?', a: `Nuestro estudio está en ${DIRECCION}.` },
  { q: '¿Qué horarios manejan?', a: HORARIO + '. Domingos cerrado.' },
  { q: '¿Atienden a particulares y empresas?', a: 'Sí, brindamos asesoramiento y representación legal tanto para personas como para empresas.' },
  { q: '¿Qué documentación debo llevar a la primera consulta?', a: 'Depende de tu caso. En el primer contacto te indicamos exactamente qué necesitamos para avanzar.' },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="container-page py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-balance font-display text-3xl font-medium leading-tight md:text-[2.6rem]">
            Resolvemos tus dudas antes de empezar
          </h2>
          <p className="mt-5 max-w-md text-pretty text-muted">
            Si tu pregunta no está acá, llamanos y te respondemos.
          </p>
        </div>

        <div className="border-t border-border-subtle">
          {faqs.map((it, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={it.q} className="border-b border-border-subtle">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-base font-medium hover:text-bordeaux md:text-lg"
                >
                  {it.q}
                  <ChevronDown className={`h-5 w-5 shrink-0 text-bordeaux transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && <p className="pb-5 text-pretty text-muted">{it.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
