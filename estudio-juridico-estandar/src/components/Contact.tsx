import { useState, type FormEvent, type ReactNode } from 'react';
import { ArrowRight, Clock, MapPin, Phone, type LucideIcon } from 'lucide-react';
import { Reveal, SectionLabel } from './Reveal';
import { DIRECCION, ZONA, HORARIO, TELEFONO_TEL, TELEFONO_LABEL, MAPS_LINK, MAPS_EMBED } from '../lib/constants';

export function Contact() {
  return (
    <section id="contacto" className="container-page py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionLabel>Contacto</SectionLabel>
          <h2 className="mt-4 text-balance font-display text-3xl font-medium leading-tight md:text-[2.6rem]">
            Estamos a una llamada de distancia
          </h2>
          <p className="mt-5 text-pretty text-muted">
            Contanos tu situación y te respondemos con claridad a la brevedad.
          </p>

          <div className="mt-8 space-y-4">
            <InfoRow icon={MapPin} title="Dirección">
              {DIRECCION}
              <br />
              {ZONA}
            </InfoRow>
            <InfoRow icon={Phone} title="Teléfono">
              <a className="hover:text-bordeaux" href={TELEFONO_TEL}>
                {TELEFONO_LABEL}
              </a>
            </InfoRow>
            <InfoRow icon={Clock} title="Horario">
              {HORARIO}
            </InfoRow>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-md border border-border-strong px-4 py-2 text-sm text-ink transition-colors hover:border-bordeaux hover:text-bordeaux"
            >
              <MapPin className="h-4 w-4" /> Abrir en Google Maps
            </a>
            <a
              href={TELEFONO_TEL}
              className="inline-flex items-center gap-2 rounded-md bg-bordeaux px-4 py-2 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4" /> Llamar ahora
            </a>
          </div>

          <div className="mt-8 aspect-video overflow-hidden rounded-xl border border-border-subtle">
            <iframe title="Ubicación del estudio en Maldonado" src={MAPS_EMBED} className="h-full w-full" loading="lazy" />
          </div>
        </Reveal>

        <ContactForm />
      </div>
    </section>
  );
}

function InfoRow({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-bordeaux/25 bg-bordeaux/10">
        <Icon className="h-4 w-4 text-bordeaux" />
      </span>
      <div>
        <div className="text-xs uppercase tracking-[0.14em] text-muted">{title}</div>
        <div className="mt-1 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      form.reset();
    }, 900);
  };

  return (
    <form onSubmit={onSubmit} className="card-elevated h-fit p-7 md:p-9 lg:sticky lg:top-28">
      <h3 className="font-display text-2xl font-medium">Solicitar consulta</h3>
      <p className="mt-1 text-sm text-muted">Completá el formulario y te respondemos a la brevedad.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Nombre y apellido" required>
          <input name="name" required placeholder="Tu nombre" className="input" />
        </Field>
        <Field label="Teléfono" required>
          <input name="phone" required type="tel" placeholder="+598 ..." className="input" />
        </Field>
        <Field label="Motivo de consulta" required className="sm:col-span-2">
          <input name="reason" required placeholder="Ej: Consulta jurídica, contrato, sucesión..." className="input" />
        </Field>
        <Field label="Mensaje" className="sm:col-span-2">
          <textarea name="message" rows={4} placeholder="Contanos brevemente tu situación..." className="input resize-none" />
        </Field>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-bordeaux px-4 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {loading ? 'Enviando...' : (
          <>
            Enviar consulta <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      {sent && <p className="mt-3 text-sm text-bordeaux">Listo, te contactamos a la brevedad.</p>}

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid var(--color-border-strong);
          background: var(--color-paper);
          padding: 0.6rem 0.75rem;
          font-size: 0.875rem;
          color: var(--color-ink);
        }
        .input:focus { outline: 2px solid var(--color-bordeaux); outline-offset: 1px; }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  children,
  className = '',
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-xs uppercase tracking-[0.14em] text-muted">
        {label}
        {required && <span className="text-bordeaux"> *</span>}
      </label>
      {children}
    </div>
  );
}
