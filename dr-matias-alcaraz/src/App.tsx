import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Clock,
  Instagram,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import matiasPhoto from './assets/matias/matias-alcaraz.jpg';
import capelliHero from './assets/matias/capelli-hero.jpg';
import capelliCenter from './assets/matias/capelli-centro-capilar.jpg';
import capelliServices from './assets/matias/capelli-servicios.jpg';
import lipsBefore from './assets/before-after/03_labios_perfil_antes_alta_calidad.jpg';
import lipsAfter from './assets/before-after/04_labios_perfil_despues_alta_calidad.jpg';
import hairBefore from './assets/before-after/09_capilar_antes_alta_calidad.jpg';
import hairAfter from './assets/before-after/10_capilar_despues_alta_calidad.jpg';
import skinBefore from './assets/before-after/11_manchas_piel_antes_alta_calidad.jpg';
import skinAfter from './assets/before-after/12_manchas_piel_despues_alta_calidad.jpg';

const WHATSAPP_NUMBER = '59898812929';
const WHATSAPP_MESSAGE = 'Hola Dr. Matías Alcaraz, quiero agendar una consulta.';
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const instagramUrl = 'https://www.instagram.com/dr.matiasalcaraz/?hl=es';
const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=Av.%20Luis%20Alberto%20de%20Herrera%202062%2C%20Montevideo%2C%20Uruguay';

const heroImages = [
  {
    src: capelliHero,
    alt: 'Tratamiento capilar aplicado en consultorio',
    label: 'Medicina capilar',
    className: 'h-[420px] w-[420px] md:h-[560px] md:w-[560px]',
  },
  {
    src: capelliCenter,
    alt: 'Centro capilar con equipamiento médico',
    label: 'Evaluación médica',
    className: 'mt-16 h-[360px] w-[430px] md:h-[500px] md:w-[610px]',
  },
  {
    src: matiasPhoto,
    alt: 'Dr. Matías Alcaraz',
    label: 'Dr. Matías Alcaraz',
    className: 'mt-4 h-[420px] w-[360px] md:h-[540px] md:w-[470px]',
  },
];

const trustItems = [
  'Médico estético',
  'Armonización facial',
  'Recuperación capilar',
  'Evaluación personalizada',
  'Resultados naturales',
];

const treatments = [
  {
    title: 'Botox',
    text: 'Suaviza líneas de expresión y mantiene el movimiento natural del rostro.',
    time: '20-30 min',
    downtime: 'Mínimo',
    image: capelliServices,
  },
  {
    title: 'Ácido hialurónico',
    text: 'Labios, hidratación profunda y armonía facial con indicación medida.',
    time: '30-45 min',
    downtime: '1-2 dias',
    image: lipsAfter,
  },
  {
    title: 'Armonización facial',
    text: 'Plan por rostro completo para equilibrar perfil, volumen y calidad de piel.',
    time: 'Consulta previa',
    downtime: 'Según caso',
    image: capelliCenter,
  },
  {
    title: 'Recuperación capilar',
    text: 'Protocolos médicos para alopecia y salud capilar con seguimiento.',
    time: 'Plan médico',
    downtime: 'Sin reposo',
    image: capelliHero,
  },
];

const reasons = [
  {
    title: 'Primero se evalúa',
    text: 'La consulta ordena objetivo, antecedentes, zona a tratar y expectativas reales antes de indicar cualquier procedimiento.',
  },
  {
    title: 'Natural antes que exagerado',
    text: 'El objetivo es que el resultado se integre a tus rasgos y no parezca una cara distinta.',
  },
  {
    title: 'Doble enfoque estético y capilar',
    text: 'El mismo criterio médico permite trabajar rostro, piel y recuperación capilar con una mirada integral.',
  },
  {
    title: 'Seguimiento después del tratamiento',
    text: 'Cada plan deja claro qué esperar, cómo cuidarte y cuándo conviene revisar la evolución.',
  },
];

const resultCases = [
  {
    title: 'Labios con ácido hialurónico',
    detail: 'Volumen sutil, hidratación y perfil más armónico.',
    before: lipsBefore,
    after: lipsAfter,
  },
  {
    title: 'Recuperación capilar',
    detail: 'Seguimiento visual de densidad y salud capilar.',
    before: hairBefore,
    after: hairAfter,
  },
  {
    title: 'Manchas y calidad de piel',
    detail: 'Plan para tono, textura y luminosidad.',
    before: skinBefore,
    after: skinAfter,
  },
];

const faqs = [
  {
    question: 'Necesito consulta previa?',
    answer:
      'Sí. La evaluación permite definir si el tratamiento tiene sentido para tu caso y qué resultado es razonable buscar.',
  },
  {
    question: 'Los resultados se ven naturales?',
    answer:
      'La propuesta es trabajar con criterio conservador: mejorar lo que molesta sin cambiar la expresión ni exagerar volumen.',
  },
  {
    question: 'Atienden tratamientos capilares?',
    answer:
      'Sí. El enfoque incluye recuperación capilar y protocolos médicos para alopecia según evaluación.',
  },
  {
    question: 'Puedo consultar por WhatsApp?',
    answer:
      'Sí. El botón de WhatsApp abre una consulta inicial para coordinar evaluación y despejar dudas básicas.',
  },
];

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  key?: string | number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  return (
    <header className="sticky top-3 z-50 mx-auto mt-3 max-w-[min(1680px,calc(100%-24px))] rounded-[26px] border border-clinic-line bg-paper/88 px-5 backdrop-blur-2xl md:top-5 md:mt-5 md:px-8">
      <div className="flex h-16 items-center justify-between gap-4">
        <a href="#inicio" className="flex items-center gap-3 font-semibold text-espresso" aria-label="Ir al inicio">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-espresso text-sm text-paper">MA</span>
          <span className="hidden text-lg md:inline">Dr. Matías Alcaraz</span>
          <span className="text-lg md:hidden">Alcaraz</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-cocoa lg:flex">
          <a href="#sobre" className="transition-colors hover:text-espresso">
            Sobre
          </a>
          <a href="#tratamientos" className="transition-colors hover:text-espresso">
            Tratamientos
          </a>
          <a href="#resultados" className="transition-colors hover:text-espresso">
            Resultados
          </a>
          <a href="#visita" className="transition-colors hover:text-espresso">
            Contacto
          </a>
        </nav>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-clay px-4 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5 hover:bg-espresso md:px-6"
        >
          <MessageCircle size={17} />
          <span className="hidden sm:inline">Agendar</span>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageX = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const headlineY = useTransform(scrollYProgress, [0, 1], ['0px', '60px']);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative mx-auto mt-5 max-w-[min(1680px,calc(100%-24px))] overflow-hidden rounded-[34px] border border-clinic-line bg-paper shadow-[0_30px_90px_rgba(70,42,28,0.08)]"
    >
      <div className="relative min-h-[100dvh] px-5 pb-12 pt-[3.75rem] md:px-10 md:pb-[4.5rem] md:pt-[4.75rem]">
        <div className="pointer-events-none absolute inset-0 subtle-noise opacity-70" />
        <motion.div style={{ y: reduceMotion ? 0 : headlineY }} className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 inline-flex rounded-full border border-clinic-line bg-warm px-4 py-2 text-sm font-semibold text-cocoa"
          >
            Medicina estética y recuperación capilar
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 26 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.82, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(3.4rem,7.2vw,7.7rem)] font-semibold leading-[0.88] text-espresso"
          >
            Armonía facial.
            <br />
            Salud capilar.
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-cocoa md:text-xl"
          >
            Tratamientos médicos para mejorar rostro, piel y cabello con indicación personalizada y resultados que se ven naturales.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-clay px-7 text-base font-semibold text-paper transition-transform hover:-translate-y-0.5 hover:bg-espresso sm:w-auto"
            >
              Agendar consulta
              <ArrowRight size={18} />
            </a>
            <a
              href="#tratamientos"
              className="inline-flex h-14 w-full items-center justify-center rounded-full bg-blush px-7 text-base font-semibold text-clay transition-transform hover:-translate-y-0.5 hover:bg-sand sm:w-auto"
            >
              Ver tratamientos
            </a>
          </motion.div>
        </motion.div>

        <div className="relative z-0 mt-3 overflow-visible">
          <motion.div
            style={{ x: reduceMotion ? 0 : imageX }}
            className="flex w-max gap-5 px-4 md:gap-7 md:px-[8vw]"
          >
            {heroImages.map((item, index) => (
              <motion.figure
                key={item.label}
                initial={reduceMotion ? false : { opacity: 0, y: 48, scale: 0.96 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`relative shrink-0 overflow-hidden rounded-[28px] border border-clinic-line bg-warm shadow-[0_24px_70px_rgba(70,42,28,0.12)] ${item.className}`}
              >
                  <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
                <figcaption className="absolute bottom-4 left-4 rounded-full bg-paper/85 px-4 py-2 text-sm font-semibold text-espresso backdrop-blur-lg">
                  {item.label}
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper to-transparent md:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper to-transparent md:w-28" />
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="mx-auto max-w-[min(1680px,calc(100%-24px))] overflow-hidden py-8">
      <div className="flex gap-3 overflow-hidden">
        {[...trustItems, ...trustItems].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="min-w-max rounded-full border border-clinic-line bg-paper px-5 py-3 text-sm font-semibold text-cocoa"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="mx-auto max-w-[min(1680px,calc(100%-24px))] rounded-[34px] bg-espresso px-5 py-16 text-paper md:px-10 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <Reveal>
          <div className="relative mx-auto max-w-xl overflow-hidden rounded-[28px] bg-cocoa">
            <img src={matiasPhoto} alt="Dr. Matías Alcaraz" className="aspect-[4/5] w-full object-cover object-top" />
            <div className="absolute inset-x-5 bottom-5 rounded-[20px] bg-paper/88 p-5 text-espresso backdrop-blur-xl">
              <p className="text-sm font-semibold text-cocoa">Dr. Matías Alcaraz</p>
              <p className="mt-1 text-lg font-semibold">Medicina estética y recuperación capilar</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border border-paper/16 px-4 py-2 text-sm font-semibold text-paper/76">
            Una consulta antes que un procedimiento
          </p>
          <h2 className="font-serif text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.9]">
            Criterio médico para verte bien sin dejar de ser vos.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-paper/72">
            <p>
              El enfoque de Matías combina medicina estética facial y recuperación capilar. La prioridad es entender qué querés mejorar y qué tratamiento tiene sentido para tu caso.
            </p>
            <p>
              La web está pensada para que el paciente vea rápido servicios, resultados, proceso, ubicación y un camino claro para consultar por WhatsApp.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Treatments() {
  return (
    <section id="tratamientos" className="mx-auto max-w-[min(1680px,calc(100%-24px))] px-1 py-16 md:py-24">
      <div className="mb-10 grid gap-6 px-4 md:mb-14 md:grid-cols-[0.9fr_1.1fr] md:px-6">
        <Reveal>
          <h2 className="font-serif text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.9] text-espresso">
            Tratamientos populares
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="md:self-end">
          <p className="max-w-2xl text-lg leading-relaxed text-cocoa">
            Un menu claro para explicar que se trabaja en cada consulta, sin prometer resultados identicos para todos.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {treatments.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.05}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full overflow-hidden rounded-[28px] border border-clinic-line bg-paper transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden bg-warm">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h3 className="font-serif text-3xl font-semibold leading-none text-espresso">{item.title}</h3>
                  <ArrowRight className="shrink-0 text-clay transition-transform group-hover:translate-x-1" size={20} />
                </div>
                <p className="min-h-[72px] text-sm leading-relaxed text-cocoa">{item.text}</p>
                <div className="mt-6 grid grid-cols-2 gap-2 border-t border-clinic-line pt-5 text-sm">
                  <div>
                    <p className="font-semibold text-espresso">Tiempo</p>
                    <p className="mt-1 text-cocoa">{item.time}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-espresso">Reposo</p>
                    <p className="mt-1 text-cocoa">{item.downtime}</p>
                  </div>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Reasons() {
  return (
    <section className="mx-auto max-w-[min(1680px,calc(100%-24px))] rounded-[34px] bg-paper px-5 py-16 md:px-10 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-5 inline-flex rounded-full bg-blush px-4 py-2 text-sm font-semibold text-clay">
            Por qué consultar
          </p>
          <h2 className="font-serif text-[clamp(3rem,5.5vw,6.5rem)] font-semibold leading-[0.9] text-espresso">
            El tratamiento correcto empieza antes de la aplicación.
          </h2>
        </Reveal>

        <div className="space-y-3">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 0.04}>
              <article className="group grid gap-4 rounded-[24px] border border-clinic-line bg-warm p-6 transition-colors hover:bg-sage/18 md:grid-cols-[96px_1fr] md:p-7">
                <div className="font-serif text-5xl font-semibold leading-none text-clay">{String(index + 1).padStart(2, '0')}.</div>
                <div>
                  <h3 className="text-xl font-semibold text-espresso">{reason.title}</h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-cocoa">{reason.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Results() {
  return (
    <section id="resultados" className="mx-auto max-w-[min(1680px,calc(100%-24px))] px-1 py-16 md:py-24">
      <div className="mb-10 px-4 text-center md:mb-14 md:px-6">
        <Reveal>
          <h2 className="font-serif text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.9] text-espresso">
            Resultados reales.
            <br />
            Cambios medidos.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cocoa">
            Galería pensada para mostrar evolución con fotos autorizadas. Estos casos se deben revisar antes de publicar una versión final.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {resultCases.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.06}>
            <article className="overflow-hidden rounded-[28px] border border-clinic-line bg-paper">
              <div className="grid aspect-[4/3] grid-cols-2 bg-warm">
                <figure className="relative overflow-hidden border-r border-paper">
                  <img src={item.before} alt={`${item.title} antes`} className="h-full w-full object-cover" />
                  <figcaption className="absolute left-3 top-3 rounded-full bg-paper/86 px-3 py-1 text-xs font-semibold text-espresso backdrop-blur">
                    Antes
                  </figcaption>
                </figure>
                <figure className="relative overflow-hidden">
                  <img src={item.after} alt={`${item.title} después`} className="h-full w-full object-cover" />
                  <figcaption className="absolute left-3 top-3 rounded-full bg-espresso/84 px-3 py-1 text-xs font-semibold text-paper backdrop-blur">
                    Despues
                  </figcaption>
                </figure>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-3xl font-semibold leading-tight text-espresso">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-cocoa">{item.detail}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Safety() {
  const items = [
    { icon: Stethoscope, text: 'Evaluacion medica antes de indicar' },
    { icon: ShieldCheck, text: 'Expectativas claras y seguimiento' },
    { icon: Sparkles, text: 'Resultados sutiles, no rasgos exagerados' },
    { icon: Check, text: 'Fotos y casos solo con autorizacion' },
  ];

  return (
    <section className="mx-auto max-w-[min(1680px,calc(100%-24px))] rounded-[34px] bg-espresso px-5 py-16 text-paper md:px-10 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <Reveal>
          <h2 className="font-serif text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.9]">
            Confianza antes que presion.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/72">
            La web evita vender procedimientos como si fueran productos cerrados. Lleva al paciente a consultar y decidir con información.
          </p>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.text} delay={index * 0.04}>
                <div className="min-h-[170px] rounded-[24px] border border-paper/12 bg-paper/8 p-6">
                  <Icon className="text-blush" size={26} />
                  <p className="mt-8 text-xl font-semibold leading-snug">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="mx-auto max-w-[min(1680px,calc(100%-24px))] px-4 py-16 md:px-6 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <h2 className="font-serif text-[clamp(3rem,5.5vw,6.5rem)] font-semibold leading-[0.9] text-espresso">
            Preguntas frecuentes
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-cocoa">
            Texto simple para que el paciente llegue a la consulta con menos dudas.
          </p>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.04}>
              <details className="group rounded-[24px] border border-clinic-line bg-paper p-6 open:bg-warm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-semibold text-espresso">
                  {faq.question}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blush text-clay transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-5 max-w-2xl leading-relaxed text-cocoa">{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visita" className="mx-auto max-w-[min(1680px,calc(100%-24px))] rounded-[34px] bg-paper px-5 py-16 md:px-10 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-stretch">
        <Reveal className="flex flex-col justify-between rounded-[28px] bg-warm p-7 md:p-10">
          <div>
            <p className="mb-5 inline-flex rounded-full bg-paper px-4 py-2 text-sm font-semibold text-cocoa">
              Consultorio
            </p>
            <h2 className="font-serif text-[clamp(3rem,5.8vw,6.8rem)] font-semibold leading-[0.9] text-espresso">
              Agendá tu evaluación.
            </h2>
          </div>

          <div className="mt-10 space-y-5 text-cocoa">
            <p className="flex gap-3">
              <MapPin className="mt-1 shrink-0 text-clay" size={20} />
              <span>Av. Luis Alberto de Herrera 2062, Montevideo.</span>
            </p>
            <p className="flex gap-3">
              <Clock className="mt-1 shrink-0 text-clay" size={20} />
              <span>Horarios a confirmar por WhatsApp antes de publicar.</span>
            </p>
            <p className="flex gap-3">
              <CalendarCheck className="mt-1 shrink-0 text-clay" size={20} />
              <span>Contacto Capelli: 2409 6835 / WhatsApp 098 812 929.</span>
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-clay px-6 font-semibold text-paper transition-transform hover:-translate-y-0.5 hover:bg-espresso"
            >
              Consultar por WhatsApp
              <MessageCircle size={18} />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-blush px-6 font-semibold text-clay transition-transform hover:-translate-y-0.5 hover:bg-sand"
            >
              Instagram
              <Instagram size={18} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="h-full overflow-hidden rounded-[28px] border border-clinic-line bg-warm">
            <iframe
              title="Mapa del consultorio"
              src="https://www.google.com/maps?q=Av.%20Luis%20Alberto%20de%20Herrera%202062%2C%20Montevideo%2C%20Uruguay&output=embed"
              className="h-[420px] w-full md:h-full md:min-h-[560px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 border-t border-clinic-line bg-paper px-5 py-4 font-semibold text-espresso transition-colors hover:bg-blush"
            >
              Abrir ubicación en Maps
              <ArrowRight size={18} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <footer className="mx-auto mb-5 max-w-[min(1680px,calc(100%-24px))] overflow-hidden rounded-[34px] bg-espresso text-paper">
      <div className="grid gap-10 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-[1fr_0.8fr] lg:items-end">
        <div>
          <p className="mb-5 text-paper/64">Dr. Matías Alcaraz</p>
          <h2 className="max-w-4xl font-serif text-[clamp(3.2rem,7vw,8rem)] font-semibold leading-[0.88]">
            Empezá con una evaluación clara.
          </h2>
        </div>
        <div className="lg:justify-self-end">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-paper px-7 font-semibold text-espresso transition-transform hover:-translate-y-0.5"
          >
            Agendar consulta
            <ArrowRight size={18} />
          </a>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/58">
            Los resultados pueden variar según cada paciente. La información de esta página no reemplaza una consulta médica.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-canvas text-espresso">
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <Treatments />
        <Reasons />
        <Results />
        <Safety />
        <FAQ />
        <Visit />
      </main>
      <FinalCTA />
    </div>
  );
}
