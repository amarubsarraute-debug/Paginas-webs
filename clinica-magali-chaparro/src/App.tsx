import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
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
import receptionPhoto from './assets/clinica/reception.jpg';
import roomPhoto from './assets/clinica/room.jpg';
import equipmentPhoto from './assets/clinica/equipment.jpg';
import heroVideo from './assets/hero-transform.mp4';
import heroPoster from './assets/hero-transform-poster.jpg';
import botoxBefore from './assets/ba-new/botox_antes.jpg';
import botoxAfter from './assets/ba-new/botox_despues.jpg';
import firmezaBefore from './assets/ba-new/firmeza_antes.jpg';
import firmezaAfter from './assets/ba-new/firmeza_despues.jpg';
import lipsBefore from './assets/ba-new/labios_antes.jpg';
import lipsAfter from './assets/ba-new/labios_despues.jpg';
import goalArrugas from './assets/tratamientos/01_arrugas_y_lineas_de_expresion.jpg';
import goalLabios from './assets/tratamientos/02_labios.jpg';
import goalManchas from './assets/tratamientos/03_manchas_y_melasma.jpg';
import goalParpados from './assets/tratamientos/04_parpados_y_mirada.jpg';
import goalFlacidez from './assets/tratamientos/05_flacidez_facial.jpg';
import goalPiel from './assets/tratamientos/07_calidad_de_piel.jpg';
import goalArmonizacion from './assets/tratamientos/08_armonizacion_facial.jpg';

const goalImages: Record<string, string> = {
  arrugas: goalArrugas,
  labios: goalLabios,
  mandibula: goalArmonizacion,
  flacidez: goalFlacidez,
  rellenos: goalParpados,
  depilacion: goalPiel,
  piel: goalManchas,
  armonizacion: goalArrugas,
};

const WHATSAPP_NUMBER = '59898293590';
const WHATSAPP_MESSAGE = 'Hola, quiero agendar una consulta en la Clínica Dra. Magalí Chaparro.';
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const instagramUrl = 'https://www.instagram.com/dra.chaparro/';
const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=Manuel%20Flores%20Mora%201436%2C%20Montevideo%2C%20Uruguay';

const trustItems = [
  'Medicina estética',
  '5.0 en Google · 88 reseñas',
  'Labios técnica rusa',
  'Atención cercana',
  'Resultados naturales',
];

const treatments = [
  {
    title: 'Botox',
    text: 'Suaviza líneas de expresión y mantiene el movimiento natural del rostro.',
    time: '20 a 30 min',
    downtime: 'Mínimo',
    image: goalArrugas,
  },
  {
    title: 'Labios técnica rusa',
    text: 'Contorno definido y volumen sutil con ácido hialurónico, respetando tu forma natural.',
    time: '30 a 45 min',
    downtime: '1 a 2 días',
    image: goalLabios,
  },
  {
    title: 'Marcación mandibular',
    text: 'Define el ángulo de la mandíbula y mejora el perfil con ácido hialurónico.',
    time: 'Consulta previa',
    downtime: 'Según caso',
    image: equipmentPhoto,
  },
  {
    title: 'Depilación definitiva',
    text: 'Equipos de última generación con un plan de sesiones adaptado a tu piel.',
    time: 'Plan de sesiones',
    downtime: 'Sin reposo',
    image: roomPhoto,
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
    title: 'Un espacio pensado al detalle',
    text: 'La clínica está cuidada en cada detalle para que la experiencia sea cómoda, prolija y profesional de principio a fin.',
  },
  {
    title: 'Seguimiento después del tratamiento',
    text: 'Cada plan deja claro qué esperar, cómo cuidarte y cuándo conviene revisar la evolución.',
  },
];

const resultCases = [
  {
    id: 'botox',
    label: 'Botox',
    title: 'Botox / toxina botulínica',
    detail: 'Suaviza líneas de expresión de la frente y el entrecejo conservando el gesto natural.',
    before: botoxBefore,
    after: botoxAfter,
  },
  {
    id: 'firmeza',
    label: 'Bioestimulación',
    title: 'Bioestimulación de colágeno',
    detail: 'Mejora la firmeza y la calidad de piel del rostro con un resultado sostenido en el tiempo.',
    before: firmezaBefore,
    after: firmezaAfter,
  },
  {
    id: 'lips',
    label: 'Labios técnica rusa',
    title: 'Labios con técnica rusa',
    detail: 'Contorno definido y volumen sutil respetando la forma natural del labio.',
    before: lipsBefore,
    after: lipsAfter,
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
          <span className="grid h-9 w-9 place-items-center rounded-full bg-espresso font-serif text-sm text-gold">MC</span>
          <span className="hidden text-lg md:inline">Dra. Magalí Chaparro</span>
          <span className="text-lg md:hidden">Dra. Chaparro</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-cocoa lg:flex">
          <a href="#sobre" className="transition-colors hover:text-espresso">
            Sobre
          </a>
          <a href="#objetivos" className="transition-colors hover:text-espresso">
            Objetivos
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || reduceMotion) return;

    const isTouch = (navigator.maxTouchPoints || 0) > 0 && window.innerWidth < 1000;
    if (isTouch) {
      video.loop = true;
      video.setAttribute('loop', '');
      video.setAttribute('autoplay', '');
      const tryPlay = () => {
        const play = video.play();
        if (play) play.catch(() => {});
      };
      tryPlay();
      window.addEventListener('touchstart', tryPlay, { passive: true, once: true });
      window.addEventListener('pointerdown', tryPlay, { passive: true, once: true });
      return;
    }

    video.pause();
    if (video.currentTime > 0) video.currentTime = 0;

    let targetTime = 0;
    let rafId = 0;
    let scheduled = false;

    const applySeek = () => {
      scheduled = false;
      if (video.readyState >= 1 && Number.isFinite(video.duration)) {
        if (typeof video.fastSeek === 'function') video.fastSeek(targetTime);
        else video.currentTime = targetTime;
      }
    };

    const onScroll = () => {
      if (!Number.isFinite(video.duration)) return;
      const rect = section.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      if (range <= 0) return;
      const progress = Math.min(Math.max(-rect.top / range, 0), 0.999);
      targetTime = progress * video.duration;
      if (!scheduled) {
        scheduled = true;
        rafId = requestAnimationFrame(applySeek);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    const nudgeFirstFrame = () => {
      if (video.currentTime === 0) video.currentTime = 0.001;
      onScroll();
    };
    if (video.readyState >= 2) nudgeFirstFrame();
    else video.addEventListener('loadeddata', nudgeFirstFrame, { once: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId);
      video.removeEventListener('loadeddata', nudgeFirstFrame);
    };
  }, [reduceMotion]);

  return (
    <section id="inicio" ref={sectionRef} className="relative h-[280vh]">
      <div className="sticky top-0 h-dvh px-3 pb-3 pt-3 md:px-5 md:pb-5 md:pt-5">
        <div className="relative h-full overflow-hidden rounded-[34px] border border-clinic-line bg-espresso shadow-[0_30px_90px_rgba(28,52,43,0.2)]">
          <video
            ref={videoRef}
            src={heroVideo}
            poster={heroPoster}
            preload="auto"
            playsInline
            muted
            className="absolute inset-0 h-full w-full object-cover object-[54%_center] md:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/28 to-espresso/12" />
          <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(28,52,43,0.55),rgba(28,52,43,0.14)_52%,rgba(28,52,43,0.04))]" />

          <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-10 md:px-12 md:pb-14 lg:px-16">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm font-semibold uppercase tracking-[0.14em] text-gold"
            >
              Medicina estética · Montevideo
            </motion.p>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 max-w-5xl font-serif text-[clamp(3.2rem,7.6vw,7.8rem)] font-semibold leading-[0.9] text-paper"
            >
              Dra. Magalí
              <br />
              Chaparro
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-md text-base leading-relaxed text-paper/80 md:max-w-xl md:text-lg"
            >
              Medicina estética con resultados naturales y atención cercana. Tratamientos faciales y corporales personalizados, con todo explicado paso a paso.
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
              src={receptionPhoto}
              alt="Recepción de la Clínica Dra. Magalí Chaparro"
              className="aspect-[4/5] w-full object-cover object-center"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-[20px] bg-paper/88 p-5 text-espresso backdrop-blur-xl">
              <p className="text-sm font-semibold text-cocoa">Clínica Dra. Magalí Chaparro</p>
              <p className="mt-1 text-lg font-semibold">Medicina estética en Montevideo</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border border-paper/16 px-4 py-2 text-sm font-semibold text-paper/76">
            Una consulta antes que un procedimiento
          </p>
          <h2 className="font-serif text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.9]">
            Verte bien sin dejar de ser vos.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-paper/72">
            <p>
              La clínica trabaja la medicina estética facial y corporal con un criterio simple: entender qué querés mejorar y explicarte con claridad qué tratamiento tiene sentido para tu caso.
            </p>
            <p>
              Cada plan arranca con una evaluación: objetivo, antecedentes y expectativas reales. Recién ahí se indica un procedimiento, siempre buscando un resultado natural.
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
            ¿Qué te gustaría mejorar?
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cocoa">
            Elegí lo que te molesta y mirá con qué tratamientos se suele trabajar. La indicación final siempre sale de la consulta.
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
                className="ml-8 w-60 -translate-y-1/2 rotate-3 rounded-[20px] border border-paper shadow-[0_24px_70px_rgba(28,52,43,0.3)]"
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
            Tratamientos populares
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="md:self-end">
          <p className="max-w-2xl text-lg leading-relaxed text-cocoa">
            Un menú claro para explicar qué se trabaja en cada consulta, sin prometer resultados idénticos para todos.
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
            Todo lo que se trata en consultorio.
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-cocoa">
            El catálogo completo, ordenado por área. Cada tratamiento se indica según evaluación y puede combinarse dentro de un plan.
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

function BeforeAfterSlider({ before, after, title }: { before: string; after: string; title: string }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const setFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(Math.max(pct, 0), 100));
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      setFromClientX(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerDown={(e) => {
        draggingRef.current = true;
        setFromClientX(e.clientX);
      }}
      className="group relative aspect-[4/5] w-full cursor-ew-resize select-none overflow-hidden rounded-[24px] sm:aspect-[4/3]"
    >
      <img
        src={after}
        alt={`${title} después`}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute right-4 top-4 z-10 rounded-full bg-espresso/86 px-3.5 py-1.5 text-xs font-semibold text-paper backdrop-blur">
        Después
      </span>

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img
          src={before}
          alt={`${title} antes`}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute left-4 top-4 z-10 rounded-full bg-paper/88 px-3.5 py-1.5 text-xs font-semibold text-espresso backdrop-blur">
          Antes
        </span>
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 z-20 flex items-center"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className="h-full w-0.5 bg-paper/90 shadow-[0_0_18px_rgba(28,52,43,0.35)]" />
        <div className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-clinic-line bg-paper text-espresso shadow-[0_8px_28px_rgba(28,52,43,0.3)] transition-transform group-hover:scale-105">
          <ChevronLeft size={15} className="-mr-0.5" />
          <ChevronRight size={15} className="-ml-0.5" />
        </div>
      </div>
    </div>
  );
}

function Results() {
  const [activeCase, setActiveCase] = useState(resultCases[0]);

  return (
    <section id="resultados" className="mx-auto max-w-[min(1680px,calc(100%-24px))] rounded-[34px] bg-paper px-5 py-16 md:px-10 md:py-24">
      <div className="mb-10 text-center md:mb-12">
        <Reveal>
          <h2 className="font-serif text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.9] text-espresso">
            Resultados reales.
            <br />
            Cambios medidos.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cocoa">
            Arrastrá el control sobre cada foto para comparar el antes y el después. Casos con fotos autorizadas; los resultados varían según cada paciente.
          </p>
        </Reveal>
      </div>

      <Reveal>
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {resultCases.map((item) => {
            const isActive = item.id === activeCase.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveCase(item)}
                aria-pressed={isActive}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-espresso text-paper'
                    : 'border border-clinic-line bg-warm text-cocoa hover:bg-blush hover:text-clay'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <motion.article
          key={activeCase.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto grid max-w-5xl gap-6 rounded-[28px] border border-clinic-line bg-warm p-4 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-8 md:p-6"
        >
          <BeforeAfterSlider before={activeCase.before} after={activeCase.after} title={activeCase.title} />

          <div className="px-2 pb-3 md:px-4 md:pb-0">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-clay">Caso</p>
            <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight text-espresso md:text-4xl">
              {activeCase.title}
            </h3>
            <p className="mt-4 leading-relaxed text-cocoa">{activeCase.detail}</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-clay px-6 py-3.5 font-semibold text-paper transition-transform hover:-translate-y-0.5 hover:bg-espresso"
            >
              Consultar por un caso similar
              <ArrowRight size={17} />
            </a>
          </div>
        </motion.article>
      </Reveal>
    </section>
  );
}

function Safety() {
  const items = [
    { icon: Stethoscope, text: 'Evaluación médica antes de indicar' },
    { icon: ShieldCheck, text: 'Expectativas claras y seguimiento' },
    { icon: Sparkles, text: 'Resultados sutiles, no rasgos exagerados' },
    { icon: Check, text: 'Fotos y casos solo con autorización' },
  ];

  return (
    <section className="mx-auto max-w-[min(1680px,calc(100%-24px))] rounded-[34px] bg-espresso px-5 py-16 text-paper md:px-10 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <Reveal>
          <h2 className="font-serif text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.9]">
            Confianza antes que presión.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/72">
            Acá no se venden procedimientos como productos cerrados. La idea es que llegues a la consulta con información y decidas con calma.
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
              <span>Manuel Flores Mora 1436, Montevideo.</span>
            </p>
            <p className="flex gap-3">
              <Clock className="mt-1 shrink-0 text-clay" size={20} />
              <span>Lunes a viernes, 9:00 a 18:00 hs.</span>
            </p>
            <p className="flex gap-3">
              <CalendarCheck className="mt-1 shrink-0 text-clay" size={20} />
              <span>WhatsApp 098 293 590 · Instagram @dra.chaparro.</span>
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
              src="https://www.google.com/maps?q=Manuel%20Flores%20Mora%201436%2C%20Montevideo%2C%20Uruguay&output=embed"
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
          <p className="mb-5 text-paper/64">Clínica Dra. Magalí Chaparro</p>
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
            las pacientes.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="flex items-center gap-3 rounded-full border border-clinic-line bg-paper px-5 py-3">
            <span className="flex gap-0.5 text-gold">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <span className="text-sm font-semibold text-espresso">5.0 · 88 reseñas en Google</span>
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
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-clay text-paper shadow-[0_14px_40px_rgba(28,52,43,0.35)] transition-transform hover:-translate-y-0.5 md:hidden"
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
        <Results />
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
