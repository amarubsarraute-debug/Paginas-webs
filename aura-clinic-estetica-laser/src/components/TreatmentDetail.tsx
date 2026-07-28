import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import {
  TREATMENT_PAGES,
  TreatmentPageContent,
  getTestimonialsForTreatment,
  getTreatmentWhatsAppUrl
} from '../treatmentContent';
import abdomenImage from '../assets/aura-clinic/resultado-abdomen-antes-despues.jpg';
import legsImage from '../assets/aura-clinic/resultado-piernas-antes-despues.png';
import waistImage from '../assets/aura-clinic/resultado-espalda-cintura-2.jpg';
import profileImage from '../assets/aura-clinic/resultado-facial-perfil-antes-despues.jpg';
import botoxImage from '../assets/aura-clinic/resultado-botox-frente-antes-despues.png';
import lipsBefore from '../assets/aura-clinic/labios-acido-hialuronico-antes.png';
import lipsAfter from '../assets/aura-clinic/labios-acido-hialuronico-despues.png';

type SingleVisual = {
  mode: 'single';
  image: string;
  alt: string;
  objectFit?: 'cover' | 'contain';
  objectPosition?: string;
  aspect: string;
};

type PairVisual = {
  mode: 'pair';
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  objectPosition?: string;
};

type TreatmentVisual = SingleVisual | PairVisual;

const treatmentVisuals: Record<TreatmentPageContent['slug'], TreatmentVisual> = {
  'grasa-localizada': {
    mode: 'single',
    image: abdomenImage,
    alt: 'Antes y después de abdomen y cintura en Aura Clinic',
    objectFit: 'contain',
    objectPosition: '50% 50%',
    aspect: 'aspect-[4/5]'
  },
  'flacidez-corporal': {
    mode: 'single',
    image: legsImage,
    alt: 'Antes y después corporal en Aura Clinic',
    objectFit: 'contain',
    objectPosition: '50% 50%',
    aspect: 'aspect-[5/4]'
  },
  contorno: {
    mode: 'single',
    image: waistImage,
    alt: 'Resultado corporal de cintura y espalda en Aura Clinic',
    objectFit: 'contain',
    objectPosition: '50% 44%',
    aspect: 'aspect-[4/5]'
  },
  papada: {
    mode: 'single',
    image: profileImage,
    alt: 'Antes y después de papada y perfil facial en Aura Clinic',
    objectFit: 'contain',
    objectPosition: '50% 50%',
    aspect: 'aspect-[4/5]'
  },
  botox: {
    mode: 'single',
    image: botoxImage,
    alt: 'Antes y después de Botox facial en Aura Clinic',
    objectFit: 'contain',
    objectPosition: '50% 50%',
    aspect: 'aspect-[16/9]'
  },
  labios: {
    mode: 'pair',
    before: lipsBefore,
    after: lipsAfter,
    beforeAlt: 'Antes de labios con ácido hialurónico',
    afterAlt: 'Después de labios con ácido hialurónico',
    objectPosition: '50% 52%'
  }
};

function RouteChip({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="rounded-full border border-brand-dark/12 bg-brand-paper px-4 py-2 text-sm font-semibold text-brand-dark transition-colors hover:border-brand-gold hover:bg-brand-sand-light"
    >
      {children}
    </a>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-relaxed text-brand-muted">
          <CheckCircle2 className="mt-1 shrink-0 text-brand-gold" size={18} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function TreatmentProof({ treatment }: { treatment: TreatmentPageContent }) {
  const visual = treatmentVisuals[treatment.slug];

  return (
    <section id="antes-despues" className="relative overflow-hidden bg-brand-dark py-16 text-brand-ivory md:py-24">
      <div className="absolute inset-x-0 top-0 h-px gold-line" />
      <div className="section-shell grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-center">
        <div>
          <p className="eyebrow text-brand-accent">Antes y después</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] md:text-6xl">
            {treatment.proofTitle}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-ivory/70">
            {treatment.proofText}
          </p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-brand-ivory/48">
            Fotos y testimonios deben usarse solo con autorización. La evaluación profesional define si este tipo de resultado es posible en cada caso.
          </p>
        </div>

        {visual.mode === 'pair' ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <figure className="relative overflow-hidden rounded-[1.3rem] border border-brand-accent/24 bg-brand-ivory/6">
              <img
                src={visual.before}
                alt={visual.beforeAlt}
                className="aspect-[4/5] w-full object-cover"
                style={{ objectPosition: visual.objectPosition }}
                loading="lazy"
              />
              <figcaption className="absolute left-4 top-4 rounded-full bg-brand-dark/76 px-3 py-1.5 text-xs font-semibold text-brand-accent backdrop-blur">
                Antes
              </figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-[1.3rem] border border-brand-accent/24 bg-brand-ivory/6 sm:mt-10">
              <img
                src={visual.after}
                alt={visual.afterAlt}
                className="aspect-[4/5] w-full object-cover"
                style={{ objectPosition: visual.objectPosition }}
                loading="lazy"
              />
              <figcaption className="absolute left-4 top-4 rounded-full bg-brand-dark/76 px-3 py-1.5 text-xs font-semibold text-brand-accent backdrop-blur">
                Después
              </figcaption>
            </figure>
          </div>
        ) : (
          <figure className="overflow-hidden rounded-[1.45rem] border border-brand-accent/24 bg-brand-ivory/6 p-2 shadow-[0_34px_90px_rgba(0,0,0,0.36)]">
            <img
              src={visual.image}
              alt={visual.alt}
              className={`${visual.aspect} w-full rounded-[1rem] ${visual.objectFit === 'contain' ? 'object-contain' : 'object-cover'}`}
              style={{ objectPosition: visual.objectPosition }}
              loading="lazy"
            />
          </figure>
        )}
      </div>
    </section>
  );
}

function TreatmentTestimonials({ treatment }: { treatment: TreatmentPageContent }) {
  const testimonials = getTestimonialsForTreatment(treatment);
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-brand-paper py-16 md:py-24">
      <div className="section-shell">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow text-brand-muted">Testimonios</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] text-brand-dark md:text-6xl">
            Lo que cuentan después del tratamiento.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-brand-muted">
            Mensajes reales presentados sin nombres ni datos privados, para que la prueba social no dependa de capturas difíciles de leer.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((message) => (
            <article
              key={message.id}
              className="rounded-[1.15rem] border border-brand-dark/10 bg-brand-ivory p-6 shadow-[0_18px_55px_rgba(13,14,11,0.06)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">
                {message.area}
              </p>
              <blockquote className="mt-5 font-serif text-3xl leading-tight text-brand-dark">
                "{message.quote}"
              </blockquote>
              <p className="mt-5 text-sm leading-relaxed text-brand-muted">{message.context}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedTreatments({ treatment }: { treatment: TreatmentPageContent }) {
  const related = [
    ...TREATMENT_PAGES.filter((item) => item.category === treatment.category && item.slug !== treatment.slug),
    ...TREATMENT_PAGES.filter((item) => item.category !== treatment.category)
  ].slice(0, 3);

  return (
    <section className="bg-brand-ivory py-16 md:py-24">
      <div className="section-shell">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-brand-muted">Otros tratamientos</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-[1.02] text-brand-dark">
              Seguir explorando.
            </h2>
          </div>
          <a href="/#tratamientos" className="secondary-button-light w-fit">
            Ver todos
            <ArrowRight size={17} />
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <a
              key={item.slug}
              href={item.path}
              className="group rounded-[1.15rem] border border-brand-dark/10 bg-brand-paper p-6 transition-transform hover:-translate-y-1"
            >
              <p className="text-sm font-semibold text-brand-gold">{item.category}</p>
              <h3 className="mt-3 font-serif text-3xl leading-none text-brand-dark">{item.shortTitle}</h3>
              <p className="mt-4 text-sm leading-relaxed text-brand-muted">{item.cardText}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark">
                Abrir página
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function TreatmentDetail({ treatment }: { treatment: TreatmentPageContent }) {
  const whatsappUrl = getTreatmentWhatsAppUrl(treatment);

  return (
    <>
      <section className="relative overflow-hidden bg-brand-dark pb-14 pt-28 text-brand-ivory md:pb-20 md:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(200,169,79,0.18),transparent_30rem)]" />
        <div className="section-shell relative z-10 grid gap-10 lg:grid-cols-[0.9fr_0.72fr] lg:items-center">
          <div>
            <a
              href="/#tratamientos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-ivory/66 transition-colors hover:text-brand-accent"
            >
              <ArrowLeft size={17} />
              Tratamientos
            </a>
            <p className="eyebrow mt-10 text-brand-accent">
              {treatment.category} · Aura Clinic
            </p>
            <h1 className="mt-5 max-w-[11ch] font-serif text-5xl font-semibold leading-[0.94] md:text-7xl">
              {treatment.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-ivory/76 md:text-xl">
              {treatment.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="primary-button">
                <MessageCircle size={18} />
                Pedir valoración
              </a>
              <a href="#antes-despues" className="secondary-button-dark">
                Ver antes y después
                <ArrowRight size={18} />
              </a>
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-brand-accent/20 bg-brand-ivory/7 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.34)]">
            <div className="flex items-center gap-3 border-b border-brand-ivory/12 pb-5">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-accent text-brand-dark">
                <ShieldCheck size={21} />
              </span>
              <div>
                <p className="text-sm font-semibold text-brand-ivory">Primero se evalúa</p>
                <p className="text-sm text-brand-ivory/58">Zona, objetivo, expectativas y cuidados.</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4">
              {treatment.resultGoals.slice(0, 3).map((goal) => (
                <div key={goal} className="flex gap-3 text-sm leading-relaxed text-brand-ivory/70">
                  <Sparkles className="mt-0.5 shrink-0 text-brand-accent" size={17} />
                  <span>{goal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-ivory py-6">
        <div className="section-shell flex gap-2 overflow-x-auto py-2 hide-scrollbar">
          <RouteChip href="#que-mejora">Qué mejora</RouteChip>
          <RouteChip href="#indicacion">Para quién</RouteChip>
          <RouteChip href="#procedimiento">Cómo se realiza</RouteChip>
          <RouteChip href="#cuidados">Cuidados</RouteChip>
          <RouteChip href="#faq-tratamiento">FAQ</RouteChip>
        </div>
      </section>

      <section id="que-mejora" className="bg-brand-paper py-16 md:py-24">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.78fr_1fr]">
          <div>
            <p className="eyebrow text-brand-muted">Decision clara</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] text-brand-dark md:text-6xl">
              Qué mejora.
            </h2>
          </div>
          <BulletList items={treatment.improves} />
        </div>
      </section>

      <section id="indicacion" className="bg-brand-ivory py-16 md:py-24">
        <div className="section-shell grid gap-10 lg:grid-cols-2">
          <div className="rounded-[1.25rem] border border-brand-dark/10 bg-brand-paper p-7">
            <p className="eyebrow text-brand-muted">Indicacion posible</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] text-brand-dark">
              Para quien puede estar indicada.
            </h2>
            <div className="mt-7">
              <BulletList items={treatment.indicatedFor} />
            </div>
          </div>

          <div id="procedimiento" className="rounded-[1.25rem] border border-brand-dark/10 bg-brand-dark p-7 text-brand-ivory">
            <p className="eyebrow text-brand-accent">Recorrido</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02]">
              Como se realiza.
            </h2>
            <div className="mt-7 space-y-5">
              {treatment.procedure.map((step, index) => (
                <article key={step.title} className="grid gap-3 border-t border-brand-ivory/12 pt-5 sm:grid-cols-[3rem_1fr]">
                  <span className="font-mono text-sm font-semibold text-brand-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl leading-none">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-ivory/64">{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="cuidados" className="bg-brand-paper py-16 md:py-24">
        <div className="section-shell grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-brand-muted">Resultados buscados</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] text-brand-dark">
              Qué resultado busca.
            </h2>
            <div className="mt-7">
              <BulletList items={treatment.resultGoals} />
            </div>
          </div>
          <div>
            <p className="eyebrow text-brand-muted">Recuperacion y cuidados</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] text-brand-dark">
              Qué tener en cuenta después.
            </h2>
            <div className="mt-7">
              <BulletList items={treatment.recovery} />
            </div>
          </div>
        </div>
      </section>

      <TreatmentProof treatment={treatment} />
      <TreatmentTestimonials treatment={treatment} />

      <section id="faq-tratamiento" className="bg-brand-sand-light py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <p className="eyebrow text-brand-muted">Preguntas frecuentes</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] text-brand-dark md:text-6xl">
            Antes de pedir valoración.
          </h2>
          <div className="mt-10 space-y-3">
            {treatment.faqs.map((faq) => (
              <article key={faq.question} className="rounded-[1rem] border border-brand-dark/10 bg-brand-paper p-6">
                <h3 className="font-serif text-2xl leading-tight text-brand-dark">{faq.question}</h3>
                <p className="mt-3 text-base leading-relaxed text-brand-muted">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-dark px-4 py-6 text-brand-ivory">
        <div className="mx-auto max-w-7xl rounded-[1.45rem] border border-brand-accent/20 bg-brand-ivory/7 px-6 py-10 md:px-10">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow text-brand-accent">Valoracion</p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.02] md:text-5xl">
                Consultar por {treatment.shortTitle.toLowerCase()}.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-ivory/68">
                El mensaje ya sale con el tratamiento elegido para que Aura pueda orientarte más rápido.
              </p>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="primary-button w-full sm:w-fit">
              <MessageCircle size={18} />
              Pedir valoración por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <RelatedTreatments treatment={treatment} />
    </>
  );
}
