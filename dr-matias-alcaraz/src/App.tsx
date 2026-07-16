import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import {
  ArrowRight,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  Instagram,
  MapPin,
  MessageCircle,
  Plus,
  Star,
} from 'lucide-react';
import { FAQS, GOALS, TREATMENT_CATEGORIES } from './data';
import matiasPhoto from './assets/matias/matias-alcaraz.jpg';
import logoSymbol from './assets/matias/logo-symbol.jpg';
import capelliHero from './assets/matias/capelli-hero.jpg';
import botoxCard from './assets/matias/botox-card.jpg';
import heroVideo from './assets/hero-transform.mp4';
import heroPoster from './assets/hero-transform-poster.jpg';
// Pares agrupados por PERSONA real (los nombres del zip venían mal apareados).
import botoxBefore from './assets/ba-new/01_botox_antes.jpg';        // rubia, frente con líneas
import botoxAfter from './assets/ba-new/06_acido_hialuronico_despues.jpg'; // misma rubia, frente lisa
import firmezaBefore from './assets/ba-new/02_botox_despues.jpg';    // morena ¾, piel con flacidez
import firmezaAfter from './assets/ba-new/08_rinomodelacion_despues.jpg';  // misma morena, más firme
import rinoBefore from './assets/ba-new/04_longlasting_despues.jpg';       // perfil chica, nariz con giba
import rinoAfter from './assets/ba-new/09_lips_antes.jpg';                 // mismo perfil, dorso recto
import lipsBefore from './assets/ba-new/05_acido_hialuronico_antes.jpg';   // boca castaña
import lipsAfter from './assets/ba-new/10_lips_despues.jpg';               // misma boca, labios definidos
import goalArrugas from './assets/tratamientos/01_arrugas_y_lineas_de_expresion.jpg';
import goalLabios from './assets/tratamientos/02_labios.jpg';
import goalManchas from './assets/tratamientos/03_manchas_y_melasma.jpg';
import goalParpados from './assets/tratamientos/04_parpados_y_mirada.jpg';
import goalFlacidez from './assets/tratamientos/05_flacidez_facial.jpg';
import goalCaida from './assets/tratamientos/06_caida_capilar.jpg';
import goalPiel from './assets/tratamientos/07_calidad_de_piel.jpg';
import goalArmonizacion from './assets/tratamientos/08_armonizacion_facial.jpg';

const goalImages: Record<string, string> = {
  arrugas: goalArrugas,
  labios: goalLabios,
  manchas: goalManchas,
  parpados: goalParpados,
  flacidez: goalFlacidez,
  caida: goalCaida,
  piel: goalPiel,
  armonizacion: goalArmonizacion,
};

const WHATSAPP_NUMBER = '59898812929';
const WHATSAPP_MESSAGE = 'Hola Dr. Matías Alcaraz, quiero agendar una consulta.';
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const instagramUrl = 'https://www.instagram.com/dr.matiasalcaraz/?hl=es';
const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=Av.%20Luis%20Alberto%20de%20Herrera%202062%2C%20Montevideo%2C%20Uruguay';

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
    time: '20 a 30 min',
    downtime: 'Mínimo',
    image: botoxCard,
  },
  {
    title: 'Ácido hialurónico',
    text: 'Labios, hidratación profunda y armonía facial con indicación medida.',
    time: '30 a 45 min',
    downtime: '1 a 2 días',
    image: lipsAfter,
  },
  {
    title: 'Armonización facial',
    text: 'Plan por rostro completo para equilibrar perfil, volumen y calidad de piel.',
    time: 'Consulta previa',
    downtime: 'Según caso',
    image: goalArmonizacion,
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

const reviews = [
  {
    text: 'Me hice botox por primera vez y era lo que más miedo me daba, que se note. Nadie se dio cuenta, solo me dicen que me ven descansada. Matías me explicó todo antes y en ningún momento sentí presión.',
    author: 'Valentina',
    detail: 'Botox',
  },
  {
    text: 'Empecé el tratamiento capilar hace unos meses y ya se nota la diferencia en densidad. Lo que más valoro es el seguimiento, en cada control me muestra la evolución con fotos.',
    author: 'Gonzalo',
    detail: 'Recuperación capilar',
  },
  {
    text: 'Fui por labios y me fui con un plan distinto al que tenía en la cabeza, mucho más sutil. Hoy le agradezco, el resultado es natural y sigo siendo yo. Atención de diez.',
    author: 'Camila',
    detail: 'Ácido hialurónico',
  },
  {
    text: 'La consulta fue súper clara, me dijo qué tenía sentido hacer y qué no. Se nota el criterio médico, no te vende nada que no necesites. Volví con mi madre y también quedó encantada.',
    author: 'Federica',
    detail: 'Evaluación y plan facial',
  },
];

const resultCases = [
  {
    id: 'botox',
    label: 'Botox',
    title: 'Botox / toxina botulínica',
    detail: 'Suaviza las líneas de la frente y el entrecejo conservando el gesto natural del rostro.',
    before: botoxBefore,
    after: botoxAfter,
  },
  {
    id: 'firmeza',
    label: 'Firmeza facial',
    title: 'Bioestimulación y firmeza',
    detail: 'Mejora la firmeza y la calidad de piel del rostro con un resultado sostenido en el tiempo.',
    before: firmezaBefore,
    after: firmezaAfter,
  },
  {
    id: 'rino',
    label: 'Rinomodelación',
    title: 'Rinomodelación',
    detail: 'Corrige el perfil nasal sin cirugía, equilibrando el dorso y la punta.',
    before: rinoBefore,
    after: rinoAfter,
  },
  {
    id: 'lips',
    label: 'Labios',
    title: 'Labios con ácido hialurónico',
    detail: 'Volumen sutil, hidratación y contorno definido respetando la forma natural.',
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
          <img src={logoSymbol} alt="Dr. Matías Alcaraz" className="h-10 w-10 rounded-full object-cover" />
          <span className="hidden text-lg md:inline">Dr. Matías Alcaraz</span>
          <span className="text-lg md:hidden">Alcaraz</span>
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
        <div className="relative h-full overflow-hidden rounded-[34px] border border-clinic-line bg-espresso shadow-[0_30px_90px_rgba(15,42,46,0.2)]">
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
          <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(15,42,46,0.55),rgba(15,42,46,0.14)_52%,rgba(15,42,46,0.04))]" />

          <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-10 md:px-12 md:pb-14 lg:px-16">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm font-semibold uppercase tracking-[0.14em] text-gold"
            >
              Medicina estética y recuperación capilar · Montevideo
            </motion.p>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 max-w-5xl font-serif text-[clamp(3.2rem,7.6vw,7.8rem)] font-semibold leading-[0.9] text-paper"
            >
              Dr. Matías
              <br />
              Alcaraz
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-md text-base leading-relaxed text-paper/80 md:max-w-xl md:text-lg"
            >
              Tratamientos médicos para mejorar rostro, piel y cabello con indicación personalizada y resultados que se ven naturales.
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
              src={matiasPhoto}
              alt="Dr. Matías Alcaraz"
              className="aspect-[4/5] w-full object-cover object-top"
            />
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
              El enfoque combina medicina estética facial y recuperación capilar. La prioridad es entender qué querés mejorar y qué tratamiento tiene sentido para tu caso.
            </p>
            <p>
              Cada plan arranca con una evaluación en consultorio: objetivo, antecedentes y expectativas reales. Recién ahí se indica un procedimiento, y solo si corresponde.
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
                className="ml-8 w-60 -translate-y-1/2 rotate-3 rounded-[20px] border border-paper shadow-[0_24px_70px_rgba(15,42,46,0.3)]"
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
        <div className="h-full w-0.5 bg-paper/90 shadow-[0_0_18px_rgba(15,42,46,0.35)]" />
        <div className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-clinic-line bg-paper text-espresso shadow-[0_8px_28px_rgba(15,42,46,0.3)] transition-transform group-hover:scale-105">
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
            <span className="text-sm font-semibold text-espresso">Pacientes de consultorio</span>
          </div>
        </Reveal>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {reviews.map((review, index) => (
          <Reveal key={review.author} delay={index * 0.05}>
            <figure className="flex h-full flex-col rounded-[24px] border border-clinic-line bg-paper p-7">
              <span className="flex gap-0.5 text-gold">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              <blockquote className="mt-5 flex-1 leading-relaxed text-cocoa">"{review.text}"</blockquote>
              <figcaption className="mt-6 text-sm font-semibold text-espresso">
                {review.author}
                <span className="font-normal text-cocoa/70"> · {review.detail}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
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
              <span>Av. Luis Alberto de Herrera 2062, Montevideo (Tres Cruces / Parque Batlle).</span>
            </p>
            <p className="flex gap-3">
              <Clock className="mt-1 shrink-0 text-clay" size={20} />
              <span>Lunes a viernes, 9:00 a 18:00 hs.</span>
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
      {/* CTA */}
      <div className="grid gap-8 px-5 pb-12 pt-16 md:px-10 md:pb-14 md:pt-20 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
        <h2 className="max-w-3xl font-serif text-[clamp(2.8rem,5.6vw,5.6rem)] font-semibold leading-[0.92]">
          Empezá con una evaluación clara.
        </h2>
        <div className="flex flex-col gap-3 sm:flex-row lg:pb-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-clay px-7 font-semibold text-paper shadow-[0_10px_30px_rgba(0,0,0,0.28)] transition-transform hover:-translate-y-0.5 hover:bg-gold hover:text-espresso"
          >
            <MessageCircle size={18} />
            Agendar consulta
          </a>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-paper/25 px-7 font-semibold text-paper transition-colors hover:border-paper/60 hover:bg-paper/10"
          >
            <MapPin size={18} />
            Cómo llegar
          </a>
        </div>
      </div>

      <div className="mx-5 border-t border-paper/12 md:mx-10" />

      {/* Cuerpo del pie */}
      <div className="grid gap-10 px-5 py-12 md:grid-cols-2 md:px-10 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src={logoSymbol} alt="" className="h-11 w-11 rounded-full object-cover" />
            <div>
              <p className="font-semibold leading-tight">Dr. Matías Alcaraz</p>
              <p className="text-sm text-paper/60">Medicina estética y recuperación capilar</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/60">
            Tratamientos médicos para rostro, piel y cabello con indicación personalizada y resultados naturales.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-11 w-11 place-items-center rounded-full border border-paper/20 text-paper/80 transition-colors hover:border-paper/50 hover:bg-paper/10 hover:text-paper"
            >
              <Instagram size={18} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid h-11 w-11 place-items-center rounded-full border border-paper/20 text-paper/80 transition-colors hover:border-paper/50 hover:bg-paper/10 hover:text-paper"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        <nav>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-gold">Secciones</p>
          <ul className="mt-5 space-y-3 text-sm text-paper/70">
            <li><a href="#sobre" className="transition-colors hover:text-paper">Sobre</a></li>
            <li><a href="#objetivos" className="transition-colors hover:text-paper">Objetivos</a></li>
            <li><a href="#tratamientos" className="transition-colors hover:text-paper">Tratamientos</a></li>
            <li><a href="#resultados" className="transition-colors hover:text-paper">Resultados</a></li>
            <li><a href="#visita" className="transition-colors hover:text-paper">Contacto</a></li>
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-gold">Consultorio</p>
          <ul className="mt-5 space-y-4 text-sm text-paper/70">
            <li className="flex gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0 text-paper/40" />
              <span>Av. Luis Alberto de Herrera 2062, Montevideo</span>
            </li>
            <li className="flex gap-3">
              <Clock size={17} className="mt-0.5 shrink-0 text-paper/40" />
              <span>Lunes a viernes, 9:00 a 18:00 hs</span>
            </li>
            <li className="flex gap-3">
              <MessageCircle size={17} className="mt-0.5 shrink-0 text-paper/40" />
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-paper">
                WhatsApp 098 812 929
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-5 border-t border-paper/12 md:mx-10" />

      {/* Legal */}
      <div className="flex flex-col gap-4 px-5 py-7 text-xs leading-relaxed text-paper/45 md:flex-row md:items-center md:justify-between md:px-10">
        <p>© {new Date().getFullYear()} Dr. Matías Alcaraz. Todos los derechos reservados.</p>
        <p className="max-w-xl md:text-right">
          Los resultados pueden variar según cada paciente. La información de esta página no reemplaza una consulta médica.
        </p>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-clay text-paper shadow-[0_14px_40px_rgba(15,42,46,0.35)] transition-transform hover:-translate-y-0.5 md:hidden"
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
        <FAQ />
        <Visit />
      </main>
      <FinalCTA />
      <FloatingWhatsApp />
    </div>
  );
}
