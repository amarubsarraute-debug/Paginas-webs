import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence, useMotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react';
import {
  Accessibility,
  Activity,
  Apple,
  ArrowLeft,
  ArrowRight,
  Baby,
  CalendarCheck,
  Check,
  CircleDot,
  Clock,
  Dumbbell,
  Hand,
  HeartPulse,
  Instagram,
  MapPin,
  MessageCircle,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Quote,
  Waves,
  Wind,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { FAQS, GOALS, REVIEWS, TREATMENT_CATEGORIES, RECOVERY_STORIES, LOCATIONS } from './data';
import massagePhoto from './assets/clinique/massage.jpg';
import feetPhoto from './assets/clinique/feet.jpg';
import bambooPhoto from './assets/clinique/bamboo.jpg';
import roomPhoto from './assets/clinique/room.jpg';
import hallwayPhoto from './assets/clinique/02_pasillo_clinica.webp';
import waitingRoomPhoto from './assets/clinique/03_sala_de_espera.webp';
import receptionStaffPhoto from './assets/clinique/04_recepcion_personal.webp';
import heroOsteopathyPhoto from './assets/clinique/hero-osteopatia.webp';
import heroMassageMobilePhoto from './assets/clinique/hero-masoterapia-mobile.webp';

const goalImages: Record<string, string> = {
  dolor: massagePhoto,
  lesion: bambooPhoto,
  rendimiento: roomPhoto,
  preventivo: feetPhoto,
  pediatria: massagePhoto,
  dudas: roomPhoto,
};

const WHATSAPP_NUMBER = '59892870728';
const WHATSAPP_MESSAGE = 'Hola, quiero agendar una consulta en La Clinique.';
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const instagramUrl = 'https://www.instagram.com/laclinique.uy';
const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=Surfside%2C%20Punta%20del%20Este%2C%20Maldonado%2C%20Uruguay';

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

const programIcons: Record<string, LucideIcon> = {
  'Recuperación de lesiones': Activity,
  'Volver al deporte': Dumbbell,
  'Dolor persistente': HeartPulse,
  'Salud preventiva': ShieldCheck,
  'Bienestar y masoterapia': Waves,
  'Atención pediátrica': Baby,
};

const specialties: Array<{ name: string; description: string; icon: LucideIcon }> = [
  {
    name: 'Fisioterapia',
    description: 'Rehabilitación funcional, lesiones y dolor.',
    icon: Activity,
  },
  {
    name: 'Terapia manual y RPG',
    description: 'Movilidad, postura y recuperación activa.',
    icon: Hand,
  },
  {
    name: 'Cupping',
    description: 'Técnica complementaria para tensión muscular.',
    icon: CircleDot,
  },
  {
    name: 'Osteopatía',
    description: 'Abordaje manual para adultos y niños.',
    icon: Accessibility,
  },
  {
    name: 'Deportología y fisiatría',
    description: 'Evaluación, prevención y retorno al deporte.',
    icon: Dumbbell,
  },
  {
    name: 'Nutrición',
    description: 'Acompañamiento nutricional personalizado.',
    icon: Apple,
  },
  {
    name: 'Medicina integrativa',
    description: 'Una mirada coordinada sobre tu bienestar.',
    icon: Stethoscope,
  },
  {
    name: 'Sexología',
    description: 'Acompañamiento profesional en salud y bienestar sexual.',
    icon: HeartPulse,
  },
  {
    name: 'Ecografías',
    description: 'Apoyo diagnóstico dentro del seguimiento.',
    icon: ScanLine,
  },
  {
    name: 'Acupuntura médica',
    description: 'Dolor, estrés y equilibrio general.',
    icon: Sparkles,
  },
  {
    name: 'Masoterapia',
    description: 'Masajes terapéuticos y deportivos.',
    icon: Waves,
  },
  {
    name: 'Atención pediátrica',
    description: 'Desarrollo motor y fisioterapia respiratoria.',
    icon: Baby,
  },
  {
    name: 'Cámara hiperbárica',
    description: 'Vitalbaric como terapia complementaria.',
    icon: Wind,
  },
];

const specialtyGroups = [
  {
    title: 'Movimiento y recuperación',
    description: 'Dolor, lesiones, postura y retorno progresivo a la actividad.',
    itemIndexes: [0, 1, 3, 4, 12],
  },
  {
    title: 'Salud integral',
    description: 'Acompañamiento preventivo, nutricional y de bienestar en distintas etapas.',
    itemIndexes: [5, 6, 7, 11],
  },
  {
    title: 'Terapias y diagnóstico',
    description: 'Herramientas complementarias para evaluar, aliviar y acompañar tratamientos.',
    itemIndexes: [2, 8, 9, 10],
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
        <a
          href="#inicio"
          className="flex items-center text-sm md:text-base tracking-[0.28em] font-sans font-medium text-espresso uppercase select-none shrink-0"
          aria-label="La Clinique"
        >
          <span>L</span>
          <span className="font-sans text-[0.8em] -mx-0.5 relative -top-[1.5px]">/\</span>
          <span className="ml-1.5">CLINIQUE</span>
        </a>

        <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-wider text-cocoa lg:flex">
          <a href="#objetivos" className="transition-colors hover:text-espresso">
            Necesidades
          </a>
          <a href="#tratamientos" className="transition-colors hover:text-espresso">
            Programas
          </a>
          <a href="#historias" className="transition-colors hover:text-espresso">
            Historias
          </a>
          <a href="#visita" className="transition-colors hover:text-espresso">
            Sucursales
          </a>
        </nav>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ocean px-4 text-xs font-semibold uppercase tracking-wider text-paper transition-transform hover:-translate-y-0.5 hover:bg-steel md:px-6"
        >
          <MessageCircle size={15} />
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
      <div ref={sectionRef} className="relative h-[86vh] min-h-[590px] overflow-hidden rounded-[34px] border border-clinic-line bg-espresso shadow-[0_30px_90px_rgba(52,51,47,0.2)]">
        <picture>
          <source media="(max-width: 767px)" srcSet={heroMassageMobilePhoto} />
          <motion.img
            style={{ y: reduceMotion ? 0 : imageY, scale: 1.12 }}
            src={heroOsteopathyPhoto}
            alt="Tratamiento en La Clinique frente a Playa Brava"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/94 via-espresso/36 to-espresso/8" />
        <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(23,23,20,0.52),rgba(23,23,20,0.12)_58%,rgba(23,23,20,0.02))]" />

          <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-10 md:px-12 md:pb-14 lg:px-16">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-steel-light"
            >
              Fisioterapia · Osteopatía · Kinesiología · Punta del Este & Montevideo
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
              className="mt-5 max-w-md text-base leading-relaxed text-paper/85 md:max-w-xl md:text-lg"
            >
              Medicina preventiva y rehabilitación funcional para recuperar tu movilidad, tratar dolores y potenciar tu rendimiento.
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
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gold px-7 text-base font-semibold text-espresso transition-transform hover:-translate-y-0.5 hover:bg-paper"
              >
                Agendar consulta
                <ArrowRight size={18} />
              </a>
              <a
                href="#objetivos"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-paper/30 px-7 text-base font-semibold text-paper backdrop-blur-sm transition-colors hover:border-paper/60 hover:bg-paper/10"
              >
                Ver programas
              </a>
            </motion.div>
          </div>
      </div>
    </section>
  );
}

function GoalSelector() {
  const [activeGoalId, setActiveGoalId] = useState(GOALS[0].id);
  const activeGoal = GOALS.find(g => g.id === activeGoalId) ?? GOALS[0];

  const recommendations: Record<string, {
    program: string;
    details: string;
    disciplines: string[];
    actionLabel: string;
    whatsappMessage: string;
  }> = {
    dolor: {
      program: "Programa de Dolor Persistente",
      details: "Alivio del dolor, contracturas y rigidez articular con un plan de tratamiento activo adaptado a tu tolerancia actual.",
      disciplines: ["Fisioterapia", "Osteopatía", "Terapia Manual"],
      actionLabel: "Consultar por Alivio de Dolor",
      whatsappMessage: "Hola La Clinique, les escribo porque tengo dolor o molestias y me gustaría coordinar una evaluación inicial."
    },
    lesion: {
      program: "Rehabilitación de Lesiones",
      details: "Recuperación activa, progresiva y segura tras lesiones deportivas, esguinces, fracturas o cirugías recientes.",
      disciplines: ["Fisioterapia Deportiva", "Rehabilitación Funcional", "Terapia Postquirúrgica"],
      actionLabel: "Iniciar mi Rehabilitación",
      whatsappMessage: "Hola La Clinique, me estoy recuperando de una lesión y quisiera coordinar una consulta de kinesiología."
    },
    rendimiento: {
      program: "Volver al Deporte (Rendimiento)",
      details: "Evaluación biomecánica del gesto deportivo y preparación funcional para evitar lesiones y potenciar tu entrenamiento.",
      disciplines: ["Deportología", "Evaluación Biomecánica", "RPG"],
      actionLabel: "Potenciar mi Rendimiento",
      whatsappMessage: "Hola La Clinique, me gustaría coordinar una evaluación de rendimiento y prevención biomecánica."
    },
    preventivo: {
      program: "Salud Preventiva e Integral",
      details: "Acompañamiento continuo y optimización de movilidad para cuidar tu cuerpo a largo plazo, antes de que aparezcan molestias.",
      disciplines: ["Medicina Integrativa", "Nutrición Clínica", "Movilidad"],
      actionLabel: "Agendar Evaluación Preventiva",
      whatsappMessage: "Hola La Clinique, me interesa su programa de salud preventiva y nutrición para un cuidado integral."
    },
    pediatria: {
      program: "Desarrollo y Pediatría",
      details: "Osteopatía pediátrica y fisioterapia adaptada para acompañar el desarrollo motor de bebés y niños en un entorno cálido.",
      disciplines: ["Osteopatía Pediátrica", "Fisioterapia Infantil"],
      actionLabel: "Consultar por Atención Pediátrica",
      whatsappMessage: "Hola La Clinique, busco atención y kinesiología pediátrica para mi hijo/a. Me gustaría recibir asesoramiento."
    },
    dudas: {
      program: "Llamada de Orientación",
      details: "Te asesoramos telefónicamente durante 10 minutos sin costo para guiarte hacia el profesional o servicio más adecuado.",
      disciplines: ["Orientación Clínica", "Llamada sin Costo"],
      actionLabel: "Quiero una Llamada de Orientación",
      whatsappMessage: "Hola La Clinique, no estoy seguro/a de con qué profesional debería consultar y me gustaría recibir una llamada de orientación."
    }
  };

  const recommendation = recommendations[activeGoalId] ?? recommendations[GOALS[0].id];

  const getWhatsappUrl = (msg: string) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="objetivos" className="mx-auto max-w-[min(1680px,calc(100%-24px))] px-4 py-16 md:px-6 md:py-24">
      <div className="mb-10 max-w-3xl md:mb-14">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">
            Selector por Necesidad
          </span>
          <h2 className="mt-4 font-serif text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.9] text-espresso">
            ¿Qué te gustaría mejorar?
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cocoa">
            La salud no es una lista genérica de sesiones. Seleccioná tu situación actual y te propondremos el abordaje más adecuado.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:gap-12 items-start">
        {/* Left Column: Needs Cards */}
        <Reveal className="grid gap-3.5">
          {GOALS.map((goal) => {
            const isActive = goal.id === activeGoalId;
            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => setActiveGoalId(goal.id)}
                aria-pressed={isActive}
                className={`group flex w-full flex-col justify-between gap-3.5 rounded-[22px] border p-6 text-left transition-all duration-300 ${
                  isActive
                    ? 'border-ocean bg-ocean text-paper shadow-[0_16px_40px_rgba(45,69,84,0.15)] scale-[1.01]'
                    : 'border-clinic-line bg-paper text-espresso hover:bg-warm hover:border-clinic-line/80'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span className={`font-serif text-xl font-semibold leading-tight ${isActive ? 'text-gold' : 'text-espresso'}`}>
                    {goal.title}
                  </span>
                  <ArrowRight
                    size={18}
                    className={`shrink-0 transition-transform duration-300 ${
                      isActive ? 'translate-x-0 rotate-90 text-gold' : '-translate-x-2 text-cocoa opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                    }`}
                  />
                </div>
                <p className={`text-sm leading-relaxed ${isActive ? 'text-paper/85' : 'text-cocoa'}`}>
                  {goal.treatments}
                </p>
              </button>
            );
          })}
        </Reveal>

        {/* Right Column: Dynamic Recommendation Panel */}
        <Reveal delay={0.08} className="lg:sticky lg:top-28 lg:self-start">
          <motion.div
            key={activeGoalId}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-[28px] border border-clinic-line bg-warm p-8 md:p-10 relative"
          >
            {/* Visual indicator */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-steel" />

            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-steel">
              Abordaje Sugerido
            </span>
            <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight text-espresso md:text-4xl">
              {recommendation.program}
            </h3>

            <p className="mt-5 text-base leading-relaxed text-cocoa">
              {recommendation.details}
            </p>

            <div className="mt-8 pt-6 border-t border-clinic-line">
              <h4 className="text-xs font-mono font-bold uppercase text-steel tracking-wider mb-4">
                Disciplinas sugeridas
              </h4>
              <div className="flex flex-wrap gap-2">
                {recommendation.disciplines.map((discipline) => (
                  <span
                    key={discipline}
                    className="px-3.5 py-1.5 rounded-full border border-clinic-line bg-paper text-xs text-espresso font-medium"
                  >
                    {discipline}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <a
                href={getWhatsappUrl(recommendation.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ocean px-6 text-base font-semibold text-paper transition-transform hover:-translate-y-0.5 hover:bg-steel"
              >
                <span>{recommendation.actionLabel}</span>
                <MessageCircle size={18} />
              </a>
              <p className="text-center text-xs text-cocoa/50 mt-3">
                Coordinaremos tu consulta de evaluación por WhatsApp.
              </p>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

function Treatments() {
  const createTreatmentUrl = (programName: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      `Hola La Clinique, me interesa consultar por el programa de ${programName} que vi en su web. Me gustaría coordinar una sesión de evaluación inicial.`
    )}`;

  return (
    <section id="tratamientos" className="bg-espresso py-16 text-paper md:py-24 lg:py-28">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <Reveal className="max-w-5xl">
          <p className="text-sm font-semibold text-gold">Programas clínicos</p>
          <h2 className="mt-5 max-w-5xl font-serif text-5xl font-semibold leading-[0.92] md:text-7xl lg:text-8xl">
            Un plan claro para volver a moverte bien.
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-paper/68 md:text-lg">
            La evaluación reúne las terapias que tu caso necesita y ordena el proceso desde el primer día hasta el retorno a tus actividades.
          </p>
        </Reveal>

        <div className="mt-16 md:mt-20">
        {TREATMENT_CATEGORIES.map((category) => (
          <div
            key={category.title}
            className="grid border-t border-paper/18 lg:grid-cols-[320px_minmax(0,1fr)]"
          >
            <Reveal className="py-8 lg:pr-10 lg:pt-10">
              <h3 className="max-w-xs font-serif text-2xl font-semibold leading-tight text-gold md:text-3xl lg:sticky lg:top-28">
                {category.title}
              </h3>
            </Reveal>

            <div className="lg:border-l lg:border-paper/18">
              {category.items.map((item, itemIdx) => (
                <Reveal key={item.name} delay={itemIdx * 0.05}>
                  {(() => {
                    const Icon = programIcons[item.name] ?? Stethoscope;

                    return (
                      <a
                        href={createTreatmentUrl(item.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group grid min-h-[168px] items-center gap-5 border-b border-paper/18 py-7 transition-colors hover:bg-paper/[0.04] sm:grid-cols-[64px_minmax(0,1fr)_auto] sm:px-6 lg:px-8"
                      >
                        <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/55 text-gold transition-colors group-hover:bg-gold group-hover:text-espresso">
                          <Icon size={24} strokeWidth={1.5} />
                        </span>
                        <span>
                          <span className="block font-serif text-xl font-semibold text-paper md:text-2xl">
                            {item.name}
                          </span>
                          <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-paper/60 md:text-base">
                            {item.desc}
                          </span>
                        </span>
                        <span className="hidden items-center gap-2 text-sm font-semibold text-gold sm:inline-flex">
                          Consultar
                          <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
                        </span>
                      </a>
                    );
                  })()}
                </Reveal>
              ))}
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}

function Catalog() {
  return (
    <section className="border-y border-espresso/15 bg-paper py-16 md:py-24">
      <div className="mx-auto grid max-w-[1480px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.38fr_1fr] lg:gap-16 lg:px-12">
        <Reveal className="lg:sticky lg:top-28 lg:h-fit">
          <p className="text-sm font-semibold text-clay">Especialidades</p>
          <h2 className="mt-4 max-w-xl font-serif text-5xl font-semibold leading-[0.94] text-espresso md:text-7xl">
            Un equipo, varias formas de ayudarte.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-cocoa md:text-lg">
            La Clinique ordena distintas especialidades para que cada paciente encuentre el abordaje adecuado sin perder claridad.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-espresso px-6 text-sm font-semibold uppercase tracking-wider text-paper transition-transform hover:-translate-y-0.5 hover:bg-steel"
          >
            Consultar orientación
            <ArrowRight size={16} />
          </a>
        </Reveal>

        <div className="space-y-12">
          {specialtyGroups.map((group, groupIndex) => {
            const groupItems = group.itemIndexes
              .map((itemIndex) => specialties[itemIndex])
              .filter((specialty): specialty is (typeof specialties)[number] => Boolean(specialty));

            return (
              <Reveal key={group.title} delay={Math.min(groupIndex * 0.06, 0.16)}>
                <div className="border-t border-espresso/18 pt-6">
                  <div className="grid gap-3 md:grid-cols-[0.32fr_1fr] md:items-end">
                    <p className="font-serif text-2xl font-semibold leading-tight text-espresso md:text-3xl">
                      {group.title}
                    </p>
                    <p className="max-w-2xl text-sm leading-relaxed text-cocoa md:text-base">
                      {group.description}
                    </p>
                  </div>

                  <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {groupItems.map((specialty) => {
                      const Icon = specialty.icon;

                      return (
                        <a
                          key={specialty.name}
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                            `Hola La Clinique, quiero consultar por ${specialty.name}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex min-h-[118px] items-start gap-4 border border-espresso/12 bg-canvas px-4 py-4 transition-colors hover:border-espresso/30 hover:bg-paper sm:px-5"
                        >
                          <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold text-espresso shadow-[inset_0_0_0_1px_rgba(23,23,20,0.24)] transition-transform group-hover:-translate-y-0.5">
                            <span className="absolute inset-1 rounded-full border border-espresso/18" />
                            <Icon className="relative" size={22} strokeWidth={1.6} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-base font-semibold leading-tight text-espresso">
                              {specialty.name}
                            </span>
                            <span className="mt-2 block text-sm leading-relaxed text-cocoa">
                              {specialty.description}
                            </span>
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Reasons() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 72%', 'end 38%'],
  });
  const stepOneOpacity = useTransform(scrollYProgress, [0, 0.14], [0, 1]);
  const stepTwoOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const stepThreeOpacity = useTransform(scrollYProgress, [0.46, 0.66], [0, 1]);
  const stepFourOpacity = useTransform(scrollYProgress, [0.72, 0.92], [0, 1]);
  const stepOneY = useTransform(scrollYProgress, [0, 0.14], [42, 0]);
  const stepTwoY = useTransform(scrollYProgress, [0.2, 0.4], [42, 0]);
  const stepThreeY = useTransform(scrollYProgress, [0.46, 0.66], [42, 0]);
  const stepFourY = useTransform(scrollYProgress, [0.72, 0.92], [42, 0]);
  const stepStyles = [
    { opacity: stepOneOpacity, y: stepOneY },
    { opacity: stepTwoOpacity, y: stepTwoY },
    { opacity: stepThreeOpacity, y: stepThreeY },
    { opacity: stepFourOpacity, y: stepFourY },
  ];

  return (
    <section ref={sectionRef} id="proceso" className="bg-espresso py-20 text-paper md:py-28">
      <div className="mx-auto grid max-w-[1480px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:px-12">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="text-sm font-semibold text-gold">Cómo trabajamos</p>
          <h2 className="mt-5 max-w-xl font-serif text-[clamp(3rem,5.5vw,6.4rem)] font-semibold leading-[0.9]">
            Un proceso claro, de principio a fin.
          </h2>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-paper/64 md:text-lg">
            Cada etapa se conecta con la siguiente para que sepas qué estamos evaluando, cómo avanzamos y cuándo revisar la evolución.
          </p>
        </div>

        <div className="relative">
          <svg
            aria-hidden="true"
            viewBox="0 0 720 960"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          >
            <path
              d="M48 20 V120 Q48 168 96 168 H624 Q672 168 672 216 V350 Q672 398 624 398 H96 Q48 398 48 446 V580 Q48 628 96 628 H624 Q672 628 672 676 V810 Q672 858 624 858 H96 Q48 858 48 906 V946"
              fill="none"
              stroke="rgba(251,251,247,0.12)"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              d="M48 20 V120 Q48 168 96 168 H624 Q672 168 672 216 V350 Q672 398 624 398 H96 Q48 398 48 446 V580 Q48 628 96 628 H624 Q672 628 672 676 V810 Q672 858 624 858 H96 Q48 858 48 906 V946"
              fill="none"
              stroke="#f1c84b"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              style={reduceMotion ? { pathLength: 1 } : { pathLength: scrollYProgress }}
            />
          </svg>

          <div className="absolute bottom-6 left-[25px] top-6 w-px bg-paper/14 lg:hidden" aria-hidden="true" />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-6 left-6 top-6 w-[3px] origin-top bg-gold lg:hidden"
            style={reduceMotion ? { scaleY: 1 } : { scaleY: scrollYProgress }}
          />

          <div className="relative space-y-3 lg:space-y-0">
          {reasons.map((reason, index) => (
            <motion.article
              key={reason.title}
              style={reduceMotion ? undefined : stepStyles[index]}
              className={`relative flex min-h-[210px] items-center pl-16 lg:min-h-[240px] lg:pl-0 ${
                index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'
              }`}
            >
              <div className="relative z-10 w-full bg-espresso py-8 lg:w-[63%] lg:px-9">
                <span className="absolute left-[-52px] top-9 grid h-11 w-11 place-items-center rounded-full border-4 border-espresso bg-gold text-sm font-bold text-espresso lg:static lg:mb-7 lg:h-14 lg:w-14 lg:border-0 lg:text-base">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">Paso {index + 1}</p>
                  <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight text-paper md:text-4xl">{reason.title}</h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-paper/62 md:text-lg">{reason.text}</p>
                </div>
              </div>
            </motion.article>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const roomY = useTransform(scrollYProgress, [0, 0.2], [720, 0]);
  const roomRotate = useTransform(scrollYProgress, [0, 0.2], [-6, -2]);

  const massageY = useTransform(scrollYProgress, [0.16, 0.42], [760, 0]);
  const massageRotate = useTransform(scrollYProgress, [0.16, 0.42], [7, 2]);

  const feetY = useTransform(scrollYProgress, [0.38, 0.66], [760, 0]);
  const feetRotate = useTransform(scrollYProgress, [0.38, 0.66], [-8, -1]);

  const bambooY = useTransform(scrollYProgress, [0.58, 0.88], [760, 0]);
  const bambooRotate = useTransform(scrollYProgress, [0.58, 0.88], [9, 3]);

  const staffY = useTransform(scrollYProgress, [0.7, 0.96], [760, 0]);
  const staffRotate = useTransform(scrollYProgress, [0.7, 0.96], [-7, 1]);

  return (
    <section ref={sectionRef} id="resultados" className="relative h-[260vh] md:h-[300vh]">
      <div className="brand-line-grid sticky top-0 h-[100dvh] overflow-hidden bg-gold text-espresso">
        <div className="relative mx-auto h-full max-w-[1680px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="relative z-30 max-w-2xl lg:w-[42%]">
            <p className="text-sm font-semibold">La Clinique por dentro</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold leading-[0.9] md:text-7xl lg:text-8xl">
              Un espacio para recuperarte.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-espresso/72 md:text-lg">
              Luz natural, amplitud y salas preparadas para que cada etapa del tratamiento suceda con calma.
            </p>
          </div>

          <div className="absolute inset-x-5 bottom-8 top-[44%] sm:inset-x-8 md:top-[38%] lg:bottom-12 lg:left-[44%] lg:right-12 lg:top-16">
            <motion.figure
              style={reduceMotion ? undefined : { y: roomY, rotate: roomRotate }}
              className="absolute left-0 top-[8%] z-10 h-[70%] w-[58%] overflow-hidden border-2 border-espresso bg-paper shadow-[16px_16px_0_rgba(23,23,20,0.18)] lg:h-[74%] lg:w-[52%]"
            >
              <img src={waitingRoomPhoto} alt="Sala de espera de La Clinique" loading="lazy" className="h-full w-full object-cover object-center" />
            </motion.figure>

            <motion.figure
              style={reduceMotion ? undefined : { y: massageY, rotate: massageRotate }}
              className="absolute right-0 top-0 z-20 h-[46%] w-[42%] overflow-hidden border-2 border-espresso bg-paper shadow-[12px_12px_0_rgba(23,23,20,0.14)] lg:h-[48%] lg:w-[34%]"
            >
              <img src={heroMassageMobilePhoto} alt="Sesión de masoterapia con vista a Playa Brava" loading="lazy" className="h-full w-full object-cover object-center" />
            </motion.figure>

            <motion.figure
              style={reduceMotion ? undefined : { y: feetY, rotate: feetRotate }}
              className="absolute bottom-0 right-0 z-30 h-[36%] w-[50%] overflow-hidden border-2 border-espresso bg-paper shadow-[12px_12px_0_rgba(23,23,20,0.14)] lg:h-[34%] lg:w-[48%]"
            >
              <img src={heroOsteopathyPhoto} alt="Tratamiento de osteopatía en La Clinique" loading="lazy" className="h-full w-full object-cover object-center" />
            </motion.figure>

            <motion.figure
              style={reduceMotion ? undefined : { y: bambooY, rotate: bambooRotate }}
              className="absolute bottom-[3%] left-[32%] z-40 h-[34%] w-[30%] overflow-hidden border-2 border-espresso bg-paper shadow-[10px_10px_0_rgba(23,23,20,0.12)] lg:left-[34%] lg:w-[25%]"
            >
              <img src={hallwayPhoto} alt="Pasillo y consultorios de La Clinique" loading="lazy" className="h-full w-full object-cover object-center" />
            </motion.figure>

            <motion.figure
              style={reduceMotion ? undefined : { y: staffY, rotate: staffRotate }}
              className="absolute right-[24%] top-[42%] z-50 h-[30%] w-[30%] overflow-hidden border-2 border-espresso bg-paper shadow-[10px_10px_0_rgba(23,23,20,0.12)] lg:right-[32%] lg:top-[38%] lg:h-[32%] lg:w-[24%]"
            >
              <img src={receptionStaffPhoto} alt="Atención en la recepción de La Clinique" loading="lazy" className="h-full w-full object-cover object-[center_28%]" />
            </motion.figure>
          </div>

          <p className="absolute bottom-5 left-5 z-30 max-w-[250px] text-xs leading-relaxed text-espresso/62 sm:left-8 lg:bottom-10 lg:left-12">
            Punta del Este · Edificio Surfside, Playa Brava
          </p>
        </div>
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
    <section id="preguntas" className="mx-auto max-w-[min(1680px,calc(100%-24px))] px-4 py-16 md:px-6 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-clay">
            Dudas comunes
          </span>
          <h2 className="mt-4 font-serif text-[clamp(3rem,5.5vw,6.5rem)] font-semibold leading-[0.9] text-espresso">
            Preguntas frecuentes
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-cocoa">
            Respuestas directas sobre nuestros programas de kinesiología y sucursales.
          </p>
        </Reveal>

        <div className="space-y-3">
          {FAQS.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.04}>
              <details className="group rounded-[24px] border border-clinic-line bg-paper p-6 open:bg-warm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-semibold text-espresso">
                  {faq.question}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blush text-espresso transition-transform group-open:rotate-45">
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
  const [activeTab, setActiveTab] = useState('punta-del-este');
  const activeLoc = LOCATIONS.find(l => l.id === activeTab) ?? LOCATIONS[0];

  return (
    <section id="visita" className="mx-auto max-w-[min(1680px,calc(100%-24px))] rounded-[34px] bg-paper px-5 py-16 md:px-10 md:py-24">
      {/* Sucursales Tabs */}
      <div className="mb-12 flex flex-wrap gap-2.5 justify-center">
        <button
          key="punta-del-este"
          type="button"
          onClick={() => setActiveTab('punta-del-este')}
          className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeTab === 'punta-del-este'
              ? 'bg-espresso text-paper shadow-sm'
              : 'bg-warm/50 text-espresso hover:bg-warm border border-clinic-line/50'
          }`}
        >
          Sucursal Punta del Este
        </button>
        <button
          key="montevideo"
          type="button"
          onClick={() => setActiveTab('montevideo')}
          className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeTab === 'montevideo'
              ? 'bg-espresso text-paper shadow-sm'
              : 'bg-warm/50 text-espresso hover:bg-warm border border-clinic-line/50'
          }`}
        >
          Sucursal Montevideo
        </button>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-stretch">
        <Reveal className="flex flex-col justify-between rounded-[28px] bg-warm p-7 md:p-10">
          <div>
            <p className="mb-5 inline-flex rounded-full bg-paper px-4 py-2 text-sm font-semibold text-cocoa">
              Consultorio
            </p>
            <h2 className="font-serif text-[clamp(2.6rem,5vw,6rem)] font-semibold leading-[0.95] text-espresso">
              Agendá tu evaluación.
            </h2>
            <p className="text-xs font-semibold uppercase tracking-wider text-clay mt-3">{activeLoc.name}</p>
          </div>

          <div className="mt-8 space-y-5 text-cocoa">
            <p className="flex gap-3">
              <MapPin className="mt-1 shrink-0 text-clay" size={20} />
              <span>{activeLoc.address}</span>
            </p>
            <p className="flex gap-3">
              <Clock className="mt-1 shrink-0 text-clay" size={20} />
              <span>{activeLoc.time}</span>
            </p>
            <p className="flex gap-3">
              <CalendarCheck className="mt-1 shrink-0 text-clay" size={20} />
              <span>WhatsApp 092 870 728 · Instagram @laclinique.uy</span>
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola La Clinique, me gustaría coordinar una evaluación para la sucursal de ${activeLoc.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-espresso px-6 font-semibold text-paper transition-transform hover:-translate-y-0.5 hover:bg-steel"
            >
              Agendar consulta
              <MessageCircle size={18} />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-espresso/15 bg-paper px-6 font-semibold text-espresso transition-transform hover:-translate-y-0.5 hover:bg-gold"
            >
              Instagram
              <Instagram size={18} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="relative min-h-[400px] rounded-[28px] overflow-hidden border border-clinic-line">
          <div className="absolute inset-0">
            <iframe
              title={`Mapa del consultorio ${activeLoc.name}`}
              src={activeLoc.mapEmbedUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="absolute bottom-0 inset-x-0">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeLoc.address)}`}
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
    <footer className="mt-12 bg-espresso text-paper">
      <div className="brand-line-grid bg-gold text-espresso">
        <div className="mx-auto grid max-w-[1480px] gap-8 px-5 py-14 sm:px-8 md:py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:px-12">
          <div>
            <p className="text-sm font-semibold">La Clinique</p>
            <h2 className="mt-4 max-w-4xl font-serif text-5xl font-semibold leading-[0.9] md:text-7xl">
              Tu recuperación empieza con una buena evaluación.
            </h2>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-espresso px-7 font-semibold text-paper transition-transform hover:-translate-y-0.5"
          >
            Agendar consulta
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-[1480px] px-5 pb-8 pt-14 sm:px-8 lg:px-12 lg:pt-16">
        <div className="grid gap-12 border-b border-paper/16 pb-14 md:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_1fr_0.8fr]">
          <div>
            <p className="font-serif text-2xl font-semibold">LA CLINIQUE</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/58">
              Prevención, rehabilitación y bienestar con un equipo multidisciplinario en Punta del Este y Montevideo.
            </p>
          </div>

          <nav aria-label="Navegación del pie de página">
            <p className="text-sm font-semibold text-gold">Navegación</p>
            <div className="mt-4 grid gap-3 text-sm text-paper/68">
              <a className="transition-colors hover:text-gold" href="#inicio">La Clinique</a>
              <a className="transition-colors hover:text-gold" href="#tratamientos">Programas</a>
              <a className="transition-colors hover:text-gold" href="#resultados">El espacio</a>
              <a className="transition-colors hover:text-gold" href="#resenas">Reseñas</a>
              <a className="transition-colors hover:text-gold" href="#preguntas">Preguntas</a>
            </div>
          </nav>

          <div>
            <p className="text-sm font-semibold text-gold">Sedes</p>
            <div className="mt-4 space-y-5 text-sm leading-relaxed text-paper/68">
              <p>
                <strong className="block text-paper">Punta del Este</strong>
                Edificio Surfside, Playa Brava Parada 33.
              </p>
              <p>
                <strong className="block text-paper">Montevideo</strong>
                Puntas de Santiago 1521, Carrasco.
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gold">Contacto</p>
            <div className="mt-4 grid gap-3 text-sm text-paper/68">
              <a className="transition-colors hover:text-gold" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp 092 870 728
              </a>
              <a className="transition-colors hover:text-gold" href={instagramUrl} target="_blank" rel="noopener noreferrer">
                Instagram @laclinique.uy
              </a>
              <a className="transition-colors hover:text-gold" href="#visita">Horarios y ubicación</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs leading-relaxed text-paper/42 md:flex-row md:items-end md:justify-between">
          <p>© {new Date().getFullYear()} La Clinique. Todos los derechos reservados.</p>
          <p className="max-w-xl md:text-right">
            La información de esta página es orientativa y no sustituye una evaluación clínica presencial.
          </p>
        </div>
      </div>
    </footer>
  );
}

function Reviews() {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const activeReview = REVIEWS[activeReviewIndex];

  const showPreviousReview = () => {
    setActiveReviewIndex((current) => (current - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const showNextReview = () => {
    setActiveReviewIndex((current) => (current + 1) % REVIEWS.length);
  };

  return (
    <section id="resenas" className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="grid overflow-hidden border-2 border-espresso bg-espresso text-paper lg:grid-cols-[380px_minmax(0,1fr)]">
            <div className="brand-line-grid flex min-h-[360px] flex-col justify-between bg-gold p-7 text-espresso md:p-10 lg:min-h-[560px]">
              <div>
                <p className="text-sm font-semibold">Reseñas en Google</p>
                <p className="mt-5 font-serif text-8xl font-semibold leading-none md:text-9xl">5.0</p>
                <span className="mt-4 flex gap-1" aria-label="5 de 5 estrellas">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={21} fill="currentColor" strokeWidth={0} />
                  ))}
                </span>
              </div>
              <h2 className="max-w-xs font-serif text-4xl font-semibold leading-[0.94] md:text-5xl">
                La experiencia también forma parte del tratamiento.
              </h2>
            </div>

            <div className="flex min-h-[520px] flex-col p-7 md:p-10 lg:min-h-[560px] lg:p-14">
              <div className="flex items-center justify-between gap-5">
                <Quote className="text-gold" size={42} strokeWidth={1.4} />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={showPreviousReview}
                    aria-label="Ver reseña anterior"
                    className="grid h-11 w-11 place-items-center rounded-full border border-paper/24 text-paper transition-colors hover:border-gold hover:bg-gold hover:text-espresso"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={showNextReview}
                    aria-label="Ver reseña siguiente"
                    className="grid h-11 w-11 place-items-center rounded-full border border-paper/24 text-paper transition-colors hover:border-gold hover:bg-gold hover:text-espresso"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.figure
                  key={activeReview.author}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-10 flex flex-1 flex-col"
                >
                  <blockquote className="max-w-4xl flex-1 font-serif text-3xl font-semibold leading-[1.15] text-paper md:text-4xl lg:text-5xl">
                    {activeReview.text}
                  </blockquote>
                  <figcaption className="mt-10 border-t border-paper/18 pt-6">
                    <p className="font-semibold text-paper">{activeReview.author}</p>
                    <p className="mt-1 text-xs text-paper/55">Publicada en {activeReview.source}</p>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 border-x border-b border-espresso/20 sm:grid-cols-4 lg:grid-cols-8" role="tablist" aria-label="Reseñas de pacientes">
          {REVIEWS.map((review, index) => {
            const isActive = index === activeReviewIndex;

            return (
              <button
                key={review.author}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveReviewIndex(index)}
                className={`min-h-[76px] border-r border-t border-espresso/15 px-3 py-3 text-left text-xs font-semibold leading-tight transition-colors last:border-r-0 ${
                  isActive ? 'bg-gold text-espresso' : 'bg-paper text-cocoa hover:bg-ocean-light'
                }`}
              >
                {review.author}
              </button>
            );
          })}
        </div>

        <p className="mt-5 max-w-2xl text-xs leading-relaxed text-cocoa/62">
          Cada experiencia es personal. El plan y los resultados dependen de la evaluación de cada caso.
        </p>
      </div>
    </section>
  );
}

function RecoveryStories() {
  const [activeStoryId, setActiveStoryId] = useState(RECOVERY_STORIES[0].id);
  const activeStory = RECOVERY_STORIES.find(story => story.id === activeStoryId) ?? RECOVERY_STORIES[0];

  const getWhatsappUrl = (patientName: string, condition: string) => {
    const msg = `Hola La Clinique, vi la historia de recuperación de ${patientName} (${condition}) en su web y me interesó mucho el proceso. Me gustaría coordinar una evaluación para mi caso.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="historias" className="scroll-mt-24 bg-canvas py-16 md:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1480px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-16 lg:px-12">
        <div>
          <Reveal>
            <p className="text-sm font-semibold text-clay">Recorridos clínicos</p>
            <h2 className="mt-5 max-w-xl font-serif text-5xl font-semibold leading-[0.9] text-espresso md:text-7xl">
              Un plan claro para cada historia.
            </h2>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-cocoa md:text-lg">
              Elegí un caso para conocer cómo se organiza el proceso, sin recorrer contenido que no necesitás.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-10 border-y border-espresso/20 py-3">
            {RECOVERY_STORIES.map((story, index) => (
              <button
                key={story.id}
                type="button"
                onClick={() => setActiveStoryId(story.id)}
                aria-pressed={activeStoryId === story.id}
                className={`group grid w-full grid-cols-[42px_1fr_auto] items-center gap-3 border-b border-espresso/12 px-1 py-5 text-left transition-colors last:border-b-0 ${
                  activeStoryId === story.id ? 'text-espresso' : 'text-espresso/62 hover:text-espresso'
                }`}
              >
                <span className="font-serif text-lg font-semibold text-gold">{String(index + 1).padStart(2, '0')}</span>
                <span>
                  <span className="block text-sm font-semibold">{story.condition}</span>
                  <span className="mt-1 block text-xs text-cocoa/68">{story.patient}</span>
                </span>
                <ArrowRight
                  size={18}
                  className={`transition-transform ${activeStoryId === story.id ? 'translate-x-0 text-gold' : '-translate-x-1 text-espresso/35 group-hover:translate-x-0'}`}
                />
              </button>
            ))}
          </Reveal>
        </div>

        <div className="border-t border-espresso/20 lg:border-l lg:border-t-0 lg:border-espresso/18 lg:pl-12">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeStory.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="relative py-10 pl-6 md:py-12 md:pl-10"
            >
              <motion.span
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-0 top-0 w-[3px] origin-top bg-gold"
              />

              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <p className="text-xs font-semibold uppercase text-clay">
                  Caso {String(RECOVERY_STORIES.findIndex(story => story.id === activeStory.id) + 1).padStart(2, '0')}
                </p>
                <p className="text-sm font-semibold text-cocoa">{activeStory.patient}</p>
              </div>

              <h3 className="mt-6 max-w-3xl font-serif text-4xl font-semibold leading-[0.95] text-espresso md:text-6xl">
                {activeStory.condition}
              </h3>

              <div className="mt-8 grid border-y border-espresso/18 md:grid-cols-2">
                <div className="py-5 md:border-r md:border-espresso/18 md:pr-8">
                  <p className="text-xs font-semibold uppercase text-cocoa/60">Objetivo</p>
                  <p className="mt-3 text-lg font-semibold leading-snug text-espresso">{activeStory.goal}</p>
                </div>
                <div className="border-t border-espresso/18 py-5 md:border-t-0 md:pl-8">
                  <p className="text-xs font-semibold uppercase text-cocoa/60">Abordaje</p>
                  <p className="mt-3 text-sm leading-relaxed text-cocoa">{activeStory.approach}</p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-semibold uppercase text-clay">Evolución planificada</p>
                <ol className="relative mt-6 space-y-5 border-l-2 border-gold pl-7">
                  {activeStory.evolution.map((step, stepIndex) => (
                    <li key={step} className="relative">
                      <span className="absolute -left-[38px] top-0 grid h-5 w-5 place-items-center rounded-full border-2 border-gold bg-canvas text-[9px] font-bold text-espresso">
                        {stepIndex + 1}
                      </span>
                      <p className="max-w-2xl text-sm font-semibold leading-relaxed text-espresso md:text-base">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <blockquote className="mt-8 border-t border-espresso/18 pt-7">
                <Quote size={28} strokeWidth={1.5} className="text-gold" />
                <p className="mt-4 max-w-2xl font-serif text-xl font-semibold leading-relaxed text-espresso md:text-2xl">
                  {activeStory.testimonial}
                </p>
              </blockquote>

              <div className="mt-7 flex flex-col items-start justify-between gap-5 border-t border-espresso/18 pt-6 sm:flex-row sm:items-center">
                <p className="max-w-md text-sm leading-relaxed text-cocoa">
                  ¿Tenés una molestia o lesión similar? Empezá por una evaluación de tu caso.
                </p>
                <a
                  href={getWhatsappUrl(activeStory.patient, activeStory.condition)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-espresso px-5 text-sm font-semibold text-paper transition-colors hover:bg-gold hover:text-espresso"
                >
                  Consultar por un caso similar
                  <ArrowRight size={16} />
                </a>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
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
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gold text-espresso shadow-[0_14px_40px_rgba(52,51,47,0.35)] transition-transform hover:-translate-y-0.5 md:hidden"
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
        <GoalSelector />
        <Treatments />
        <RecoveryStories />
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
