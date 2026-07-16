import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Clock,
  Instagram,
  MapPin,
  MessageCircle,
  Plus,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
} from 'lucide-react';
import { FAQS, GOALS, REVIEWS, TREATMENT_CATEGORIES } from './data';
import massagePhoto from './assets/clinique/massage.jpg';
import feetPhoto from './assets/clinique/feet.jpg';
import bambooPhoto from './assets/clinique/bamboo.jpg';
import roomPhoto from './assets/clinique/room.jpg';

const goalImages: Record<string, string> = {
  dolor: massagePhoto,
  rehabilitacion: bambooPhoto,
  movilidad: roomPhoto,
  estres: feetPhoto,
  nutricion: massagePhoto,
  prevencion: roomPhoto,
  sexologia: feetPhoto,
  integrativa: bambooPhoto,
};

const galleryImages = [
  { src: massagePhoto, label: 'Terapias manuales' },
  { src: feetPhoto, label: 'Recuperación y descanso' },
  { src: bambooPhoto, label: 'Masajes' },
  { src: roomPhoto, label: 'Nuestro espacio' },
];

const WHATSAPP_NUMBER = '59892870728';
const WHATSAPP_MESSAGE = 'Hola, quiero agendar una consulta en La Clinique.';
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const instagramUrl = 'https://www.instagram.com/laclinique.uy';
const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=Surfside%2C%20Punta%20del%20Este%2C%20Maldonado%2C%20Uruguay';

const trustItems = [
  'Medicina preventiva',
  'Rehabilitación',
  'Equipo multidisciplinario',
  '5.0 en Google',
  'Punta del Este',
];

const treatments = [
  {
    title: 'Fisioterapia',
    text: 'Recuperación funcional de lesiones, dolor y limitaciones de movimiento con plan personalizado.',
    time: '45 a 60 min',
    downtime: 'Sin reposo',
    image: massagePhoto,
  },
  {
    title: 'Osteopatía',
    text: 'Terapia manual que trabaja la movilidad, la postura y el equilibrio del cuerpo.',
    time: '45 min',
    downtime: 'Sin reposo',
    image: bambooPhoto,
  },
  {
    title: 'Acupuntura',
    text: 'Manejo del dolor, el estrés y el equilibrio general del organismo.',
    time: '40 a 50 min',
    downtime: 'Sin reposo',
    image: feetPhoto,
  },
  {
    title: 'Masajes y masoterapia',
    text: 'Alivio de tensión, mejora de circulación y acompañamiento en la recuperación.',
    time: '50 a 60 min',
    downtime: 'Sin reposo',
    image: roomPhoto,
  },
];

const reasons = [
  {
    title: 'Primero se evalúa',
    text: 'La consulta ordena tu objetivo, antecedentes y expectativas antes de armar cualquier plan de tratamiento.',
  },
  {
    title: 'Equipo multidisciplinario',
    text: 'Distintas especialidades en un mismo espacio para abordar tu salud de forma integral y coordinada.',
  },
  {
    title: 'Un espacio pensado al detalle',
    text: 'Una clínica cuidada en cada detalle para que la experiencia sea cómoda, prolija y profesional de principio a fin.',
  },
  {
    title: 'Seguimiento en cada etapa',
    text: 'Cada plan deja claro qué esperar, cómo cuidarte y cuándo conviene revisar la evolución.',
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
          <span className="grid h-9 w-9 place-items-center rounded-full bg-espresso font-serif text-sm text-gold">LC</span>
          <span className="text-lg tracking-[0.14em]">LA CLINIQUE</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-cocoa lg:flex">
          <a href="#sobre" className="transition-colors hover:text-espresso">
            Sobre
          </a>
          <a href="#objetivos" className="transition-colors hover:text-espresso">
            Objetivos
          </a>
          <a href="#tratamientos" className="transition-colors hover:text-espresso">
            Terapias
          </a>
          <a href="#resultados" className="transition-colors hover:text-espresso">
            Espacio
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  return (
    <section id="inicio" className="px-3 pt-3 md:px-5 md:pt-5">
      <div ref={sectionRef} className="relative h-[86vh] min-h-[560px] overflow-hidden rounded-[34px] border border-clinic-line bg-espresso shadow-[0_30px_90px_rgba(52,51,47,0.2)]">
        <motion.img
          style={{ y: reduceMotion ? 0 : imageY, scale: 1.12 }}
          src={massagePhoto}
          alt="Terapia en La Clinique"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/34 to-espresso/16" />
        <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(52,51,47,0.55),rgba(52,51,47,0.14)_52%,rgba(52,51,47,0.04))]" />

          <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-10 md:px-12 md:pb-14 lg:px-16">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm font-semibold uppercase tracking-[0.14em] text-gold"
            >
              Medicina preventiva y rehabilitación · Punta del Este
            </motion.p>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 max-w-5xl font-serif text-[clamp(3.2rem,7.6vw,7.8rem)] font-semibold leading-[0.9] text-paper"
            >
              La Clinique
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-md text-base leading-relaxed text-paper/80 md:max-w-xl md:text-lg"
            >
              Un espacio de salud integral en Punta del Este para recuperarte, prevenir el dolor y mejorar tu bienestar con un equipo multidisciplinario.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-clay px-7 text-base font-semibold text-paper transition-transform hover:-translate-y-0.5 hover:bg-sand hover:text-espresso"
              >
                Agendar consulta
                <ArrowRight size={18} />
              </a>
              <a
                href="#objetivos"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-paper/30 px-7 text-base font-semibold text-paper backdrop-blur-sm transition-colors hover:border-paper/60 hover:bg-paper/10"
              >
                Ver tratamientos
              </a>
            </motion.div>
          </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="marquee mx-auto max-w-[min(1680px,calc(100%-24px))] overflow-hidden py-8">
      <div className="marquee-track flex w-max gap-3 pr-3">
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
  const imageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  return (
    <section id="sobre" className="mx-auto max-w-[min(1680px,calc(100%-24px))] rounded-[34px] bg-espresso px-5 py-16 text-paper md:px-10 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <Reveal>
          <div ref={imageRef} className="relative mx-auto max-w-xl overflow-hidden rounded-[28px] bg-cocoa">
            <motion.img
              style={{ y: reduceMotion ? 0 : imageY, scale: 1.08 }}
              src={roomPhoto}
              alt="Espacio de La Clinique en Punta del Este"
              className="aspect-[4/5] w-full object-cover object-center"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-[20px] bg-paper/88 p-5 text-espresso backdrop-blur-xl">
              <p className="text-sm font-semibold text-cocoa">La Clinique</p>
              <p className="mt-1 text-lg font-semibold">Medicina preventiva y rehabilitación</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border border-paper/16 px-4 py-2 text-sm font-semibold text-paper/76">
            Prevenir, rehabilitar y recuperar
          </p>
          <h2 className="font-serif text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.9]">
            Tu salud, mirada como un todo.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-paper/72">
            <p>
              La Clinique reúne distintas especialidades en un mismo espacio: fisioterapia, osteopatía, acupuntura, nutrición y más. La idea es acompañarte a prevenir el dolor y recuperar tu bienestar.
            </p>
            <p>
              Cada plan arranca con una evaluación para entender tu objetivo y armar un tratamiento a tu medida, con seguimiento en cada etapa del proceso.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function GoalSelector() {
  const [activeGoal, setActiveGoal] = useState(GOALS[0]);
  const [hoveredGoal, setHoveredGoal] = useState<string | null>(null);
  const lastHoveredRef = useRef<string>(GOALS[0].id);
  const listRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const floatX = useSpring(mouseX, { stiffness: 320, damping: 32 });
  const floatY = useSpring(mouseY, { stiffness: 320, damping: 32 });

  const handleMouseMove = (event: { clientX: number; clientY: number }) => {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  if (hoveredGoal) lastHoveredRef.current = hoveredGoal;

  return (
    <section id="objetivos" className="mx-auto max-w-[min(1680px,calc(100%-24px))] px-4 py-16 md:px-6 md:py-24">
      <div className="mb-10 max-w-3xl md:mb-14">
        <Reveal>
          <h2 className="font-serif text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.9] text-espresso">
            ¿Qué querés trabajar?
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cocoa">
            Elegí tu objetivo y mirá con qué terapias se suele trabajar. El plan final siempre sale de la evaluación.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:gap-12">
        <Reveal>
          <div
            ref={listRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredGoal(null)}
            className="relative divide-y divide-clinic-line border-y border-clinic-line"
          >
            <motion.div
              aria-hidden
              style={{ x: floatX, y: floatY }}
              animate={{
                opacity: hoveredGoal && !reduceMotion ? 1 : 0,
                scale: hoveredGoal && !reduceMotion ? 1 : 0.92,
              }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
            >
              <img
                src={goalImages[lastHoveredRef.current]}
                alt=""
                loading="lazy"
                className="ml-8 w-60 -translate-y-1/2 rotate-3 rounded-[20px] border border-paper shadow-[0_24px_70px_rgba(52,51,47,0.3)]"
              />
            </motion.div>

            {GOALS.map((goal) => {
              const isActive = goal.id === activeGoal.id;
              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => setActiveGoal(goal)}
                  onMouseEnter={() => setHoveredGoal(goal.id)}
                  aria-pressed={isActive}
                  className={`group flex w-full items-center justify-between gap-5 py-5 text-left transition-all md:py-6 ${
                    isActive ? 'pl-3 md:pl-5' : 'hover:pl-2'
                  }`}
                >
                  <span
                    className={`font-serif text-2xl font-semibold leading-tight transition-colors md:text-3xl ${
                      isActive ? 'text-clay' : 'text-espresso group-hover:text-clay'
                    }`}
                  >
                    {goal.title}
                  </span>
                  <ArrowRight
                    size={20}
                    className={`shrink-0 transition-all ${
                      isActive ? 'translate-x-0 text-clay opacity-100' : '-translate-x-2 text-cocoa opacity-0 group-hover:translate-x-0 group-hover:opacity-60'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:sticky lg:top-28 lg:self-start">
          <motion.div
            key={activeGoal.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-[28px] border border-clinic-line bg-warm"
          >
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={goalImages[activeGoal.id]}
                alt={activeGoal.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-7 md:p-10">
            <h3 className="font-serif text-4xl font-semibold leading-tight text-espresso md:text-5xl">
              {activeGoal.title}
            </h3>
            <p className="mt-6 text-lg leading-relaxed text-cocoa">{activeGoal.treatments}</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-13 items-center justify-center gap-2 rounded-full bg-clay px-6 py-3.5 font-semibold text-paper transition-transform hover:-translate-y-0.5 hover:bg-espresso"
            >
              Consultar por este objetivo
              <MessageCircle size={18} />
            </a>
            </div>
          </motion.div>
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
            Terapias principales
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="md:self-end">
          <p className="max-w-2xl text-lg leading-relaxed text-cocoa">
            Un equipo multidisciplinario para acompañarte a prevenir, rehabilitar y recuperar tu bienestar.
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
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
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

function Catalog() {
  return (
    <section className="mx-auto max-w-[min(1680px,calc(100%-24px))] rounded-[34px] bg-paper px-5 py-16 md:px-10 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-serif text-[clamp(3rem,5.5vw,6.5rem)] font-semibold leading-[0.9] text-espresso">
            Todas las terapias, en un solo lugar.
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-cocoa">
El catálogo completo, ordenado por área. Cada terapia se indica según evaluación y puede combinarse dentro de un plan.
          </p>
        </Reveal>

        <div className="space-y-3">
          {TREATMENT_CATEGORIES.map((category, index) => (
            <Reveal key={category.title} delay={index * 0.04}>
              <details className="group rounded-[24px] border border-clinic-line bg-warm p-6 open:bg-warm md:p-7" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5">
                  <span className="font-serif text-2xl font-semibold leading-tight text-espresso md:text-3xl">
                    {category.title}
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper text-clay transition-transform duration-300 group-open:rotate-45">
                    <Plus size={18} />
                  </span>
                </summary>
                <ul className="mt-6 divide-y divide-clinic-line border-t border-clinic-line">
                  {category.items.map((item) => (
                    <li key={item.name} className="py-4">
                      <p className="font-semibold text-espresso">{item.name}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-cocoa">{item.desc}</p>
                    </li>
                  ))}
                </ul>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reasons() {
  return (
    <section className="mx-auto max-w-[min(1680px,calc(100%-24px))] px-4 py-16 md:px-6 md:py-24">
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
                <div className="font-serif text-5xl font-semibold leading-none text-gold">{String(index + 1).padStart(2, '0')}.</div>
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

function Gallery() {
  return (
    <section id="resultados" className="mx-auto max-w-[min(1680px,calc(100%-24px))] rounded-[34px] bg-paper px-5 py-16 md:px-10 md:py-24">
      <div className="mb-10 max-w-3xl md:mb-14">
        <Reveal>
          <h2 className="font-serif text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.9] text-espresso">
            Un espacio para
            <br />
            recuperarte.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cocoa">
            Una clínica pensada al detalle en Punta del Este, con terapias que combinan prevención, rehabilitación y bienestar.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {galleryImages.map((item, index) => (
          <Reveal key={item.label} delay={index * 0.06}>
            <figure
              className={`group relative overflow-hidden rounded-[24px] border border-clinic-line bg-warm ${
                index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
              }`}
            >
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  index === 0 ? 'aspect-[4/5] sm:h-full' : 'aspect-[4/5]'
                }`}
              />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-paper/88 px-4 py-2 text-sm font-semibold text-espresso backdrop-blur">
                {item.label}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Safety() {
  const items = [
    { icon: Stethoscope, text: 'Evaluación antes de armar tu plan' },
    { icon: ShieldCheck, text: 'Equipo multidisciplinario coordinado' },
    { icon: Sparkles, text: 'Enfoque preventivo e integral' },
    { icon: Check, text: 'Seguimiento en cada etapa' },
  ];

  return (
    <section className="mx-auto max-w-[min(1680px,calc(100%-24px))] rounded-[34px] bg-espresso px-5 py-16 text-paper md:px-10 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <Reveal>
          <h2 className="font-serif text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.9]">
            Cuidarte con calma.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/72">
            Acá no se empujan sesiones sueltas. La idea es entender tu caso y acompañarte con un plan claro, a tu ritmo.
          </p>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.text} delay={index * 0.04}>
                <div className="min-h-[170px] rounded-[24px] border border-paper/12 bg-paper/8 p-6 transition-colors hover:bg-paper/12">
                  <Icon className="text-gold" size={26} />
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
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-serif text-[clamp(3rem,5.5vw,6.5rem)] font-semibold leading-[0.9] text-espresso">
            Preguntas frecuentes
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-cocoa">
            Respuestas simples para que llegues a la consulta con menos dudas.
          </p>
        </Reveal>

        <div className="space-y-3">
          {FAQS.map((faq, index) => (
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
              <span>Surfside, Punta del Este, Maldonado.</span>
            </p>
            <p className="flex gap-3">
              <Clock className="mt-1 shrink-0 text-clay" size={20} />
              <span>Horarios coordinados por WhatsApp.</span>
            </p>
            <p className="flex gap-3">
              <CalendarCheck className="mt-1 shrink-0 text-clay" size={20} />
              <span>WhatsApp 092 870 728 · Instagram @laclinique.uy.</span>
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
              src="https://www.google.com/maps?q=Surfside%2C%20Punta%20del%20Este%2C%20Maldonado%2C%20Uruguay&output=embed"
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
          <p className="mb-5 text-paper/64">La Clinique · Punta del Este</p>
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

function Reviews() {
  return (
    <section className="mx-auto max-w-[min(1680px,calc(100%-24px))] px-4 py-16 md:px-6 md:py-24">
      <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <h2 className="font-serif text-[clamp(3rem,5.5vw,6.5rem)] font-semibold leading-[0.9] text-espresso">
            Lo que dicen
            <br />
            los pacientes.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="flex items-center gap-3 rounded-full border border-clinic-line bg-paper px-5 py-3">
            <span className="flex gap-0.5 text-gold">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <span className="text-sm font-semibold text-espresso">5.0 · 9 reseñas en Google</span>
          </div>
        </Reveal>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {REVIEWS.map((review, index) => (
          <Reveal key={index} delay={index * 0.06}>
            <figure className="flex h-full flex-col rounded-[24px] border border-clinic-line bg-paper p-7">
              <span className="flex gap-0.5 text-gold">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-cocoa">"{review.text}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-2 text-sm font-semibold text-espresso">
                {review.author}
                <span className="text-cocoa/60">· {review.source}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-clay text-paper shadow-[0_14px_40px_rgba(52,51,47,0.35)] transition-transform hover:-translate-y-0.5 md:hidden"
    >
      <MessageCircle size={24} />
    </a>
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
        <GoalSelector />
        <Treatments />
        <Catalog />
        <Reasons />
        <Gallery />
        <Reviews />
        <Safety />
        <FAQ />
        <Visit />
      </main>
      <FinalCTA />
      <FloatingWhatsApp />
    </div>
  );
}
