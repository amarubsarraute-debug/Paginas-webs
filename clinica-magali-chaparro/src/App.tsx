import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Check,
  Clock,
  Instagram,
  MapPin,
  MessageCircle,
  MoveHorizontal,
  Plus,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
} from 'lucide-react';
import { FAQS, GOALS, REVIEWS, TREATMENT_CATEGORIES } from './data';
import clinicReceptionPhoto from './assets/clinica/consultorio-recepcion.webp';
import clinicProductsPhoto from './assets/clinica/consultorio-productos.webp';
import clinicCarePhoto from './assets/clinica/consultorio-atencion.webp';
import clinicMagaliPhoto from './assets/clinica/consultorio-magali.webp';
import clinicExperiencePhoto from './assets/clinica/consultorio-experiencia.webp';
import magaliLogo from './assets/brand/magali-logo.png';
import magaliPortrait from './assets/brand/dra-magali-portrait.jpg';
import heroVideo from './assets/hero-transform.mp4';
import heroPoster from './assets/hero-transform-poster.jpg';
import resultPerfilLabios from './assets/resultados-mejorados/resultado-perfil-labios-01.jpg';
import resultLabiosFrontal from './assets/resultados-mejorados/resultado-labios-frontal-02.jpg';
import resultPerfilFacial from './assets/resultados-mejorados/resultado-perfil-facial-03.jpg';
import resultRinomodelacion from './assets/resultados-mejorados/resultado-rinomodelacion-04.jpg';
import resultPerfilMasculino from './assets/resultados-mejorados/resultado-perfil-masculino-05.jpg';
import resultFrenteArrugas from './assets/resultados-mejorados/resultado-frente-arrugas-06.jpg';
import resultPeriocularLateral from './assets/resultados-mejorados/resultado-periocular-lateral-07.jpg';
import resultOjerasFrontal from './assets/resultados-mejorados/resultado-ojeras-frontal-08.jpg';
import resultPerfilNariz from './assets/resultados-mejorados/resultado-perfil-nariz-09.jpg';
import resultPerfilFacial10 from './assets/resultados-mejorados/resultado-perfil-facial-10.jpg';
import resultFrenteBotox from './assets/resultados-mejorados/resultado-frente-botox-11.jpg';
import resultGluteos from './assets/resultados-mejorados/resultado-gluteos-corporal-12.jpg';
import goalDepilacionCase from './assets/tratamientos/15_depilacion_definitiva.png';
import goalFlacidezCase from './assets/tratamientos/09_flacidez_facial_caso.jpg';
import goalLabiosCase from './assets/tratamientos/10_labios_tecnica_rusa.png';
import goalMandibulaCase from './assets/tratamientos/11_marcacion_mandibular.png';
import goalRinomodelacionCase from './assets/tratamientos/12_rinomodelacion.png';
import goalCalidadPielCase from './assets/tratamientos/13_calidad_de_piel.png';
import goalArmonizacionCase from './assets/tratamientos/14_armonizacion_facial.png';

const goalImages: Record<string, string> = {
  arrugas: resultFrenteBotox,
  labios: goalLabiosCase,
  mandibula: goalMandibulaCase,
  flacidez: goalFlacidezCase,
  rinomodelacion: goalRinomodelacionCase,
  depilacion: goalDepilacionCase,
  piel: goalCalidadPielCase,
  armonizacion: goalArmonizacionCase,
};

const WHATSAPP_NUMBER = '59898293590';
const WHATSAPP_MESSAGE = 'Hola, quiero agendar una consulta en la Clínica Dra. Magalí Chaparro.';
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const instagramUrl = 'https://www.instagram.com/dra.chaparro/';
const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=Manuel%20Flores%20Mora%201436%2C%20Montevideo%2C%20Uruguay';

const doctorCredentials = [
  {
    title: 'Dra. en Medicina',
    detail: 'Formación médica en Uruguay.',
  },
  {
    title: 'Especialista en Medicina Estética',
    detail: 'Especialización realizada en Argentina.',
  },
  {
    title: 'Años de experiencia clínica',
    detail: 'Consulta, indicación y seguimiento de pacientes estéticos.',
  },
  {
    title: 'Máster en Rejuvenecimiento',
    detail: 'Formación avanzada en España.',
  },
  {
    title: 'Máster en Armonización Corporal',
    detail: 'Formación avanzada en Perú.',
  },
  {
    title: 'Diplomatura en Bioestimulación',
    detail: 'Formación internacional en Francia.',
  },
  {
    title: 'Miembro de AMEU Uruguay',
    detail: 'Asociación de Medicina Estética del Uruguay.',
    href: 'https://www.instagram.com/ameu_uruguay/?hl=es',
  },
];

const doctorMethod = [
  'Evalúa primero: antecedentes, expectativas, anatomía y objetivo real de cada paciente.',
  'Busca cambios naturales, medidos y coherentes con los rasgos de cada rostro.',
  'Se forma de manera continua en congresos, laboratorios y programas internacionales.',
  'Explica cada indicación con claridad para que la decisión no dependa de la presión ni de la moda.',
];

const treatments = [
  {
    title: 'Botox',
    text: 'Suaviza líneas de expresión y mantiene el movimiento natural del rostro.',
    time: '20 a 30 min',
    downtime: 'Mínimo',
    image: resultFrenteBotox,
  },
  {
    title: 'Labios técnica rusa',
    text: 'Contorno definido y volumen sutil con ácido hialurónico, respetando tu forma natural.',
    time: '30 a 45 min',
    downtime: '1 a 2 días',
    image: goalLabiosCase,
  },
  {
    title: 'Marcación mandibular',
    text: 'Define el ángulo de la mandíbula y mejora el perfil con ácido hialurónico.',
    time: 'Consulta previa',
    downtime: 'Según caso',
    image: goalMandibulaCase,
  },
  {
    title: 'Depilación definitiva',
    text: 'Equipos de última generación con un plan de sesiones adaptado a tu piel.',
    time: 'Plan de sesiones',
    downtime: 'Sin reposo',
    image: goalDepilacionCase,
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

type ResultCategory = 'Perfil facial' | 'Labios' | 'Mirada' | 'Rejuvenecimiento' | 'Corporal';
type ResultSplit = 'vertical' | 'horizontal';

type ResultCase = {
  id: string;
  name: string;
  category: ResultCategory;
  treatment: string;
  title: string;
  detail: string;
  image: string;
  split: ResultSplit;
  sourceAspect?: number;
};

const resultCases: ResultCase[] = [
  {
    id: 'perfil-labios',
    name: 'Perfil y labios',
    category: 'Perfil facial',
    treatment: 'Armonización facial con ácido hialurónico',
    title: 'Perfil más definido con volumen natural',
    detail: 'Comparación lateral para ver contorno, mentón y labios sin perder naturalidad.',
    image: resultPerfilLabios,
    split: 'vertical',
  },
  {
    id: 'labios-naturales',
    name: 'Labios naturales',
    category: 'Labios',
    treatment: 'Ácido hialurónico en labios',
    title: 'Hidratación y volumen de labios',
    detail: 'Más definición y textura, manteniendo proporción con el rostro.',
    image: resultLabiosFrontal,
    split: 'horizontal',
  },
  {
    id: 'armonizacion-perfil',
    name: 'Armonización de perfil',
    category: 'Perfil facial',
    treatment: 'Armonización facial',
    title: 'Perfil facial con mayor estructura',
    detail: 'Caso de contorno y sostén donde se busca un cambio visible pero integrado.',
    image: resultPerfilFacial,
    split: 'vertical',
  },
  {
    id: 'rinomodelacion',
    name: 'Rinomodelación',
    category: 'Perfil facial',
    treatment: 'Rinomodelación con ácido hialurónico',
    title: 'Corrección visual del perfil nasal',
    detail: 'Comparación lateral centrada en nariz, ángulo facial y balance general.',
    image: resultRinomodelacion,
    split: 'vertical',
  },
  {
    id: 'perfil-masculino',
    name: 'Perfil masculino',
    category: 'Perfil facial',
    treatment: 'Armonización de perfil',
    title: 'Perfil masculino más armónico',
    detail: 'Mejora de proporción sin borrar rasgos propios.',
    image: resultPerfilMasculino,
    split: 'vertical',
  },
  {
    id: 'frente-textura',
    name: 'Frente y textura',
    category: 'Rejuvenecimiento',
    treatment: 'Rejuvenecimiento de frente',
    title: 'Textura y líneas de frente',
    detail: 'Comparación clínica de líneas, textura y luminosidad de la zona frontal.',
    image: resultFrenteArrugas,
    split: 'vertical',
  },
  {
    id: 'periocular-lateral',
    name: 'Periocular lateral',
    category: 'Mirada',
    treatment: 'Rejuvenecimiento periocular',
    title: 'Mirada con menos pliegues marcados',
    detail: 'Caso lateral de zona periocular, piel y soporte.',
    image: resultPeriocularLateral,
    split: 'vertical',
  },
  {
    id: 'ojeras',
    name: 'Ojeras',
    category: 'Mirada',
    treatment: 'Rejuvenecimiento periocular',
    title: 'Ojeras y mirada cansada',
    detail: 'Comparación frontal de tono, textura y descanso visual.',
    image: resultOjerasFrontal,
    split: 'horizontal',
  },
  {
    id: 'perfil-nasal',
    name: 'Perfil nasal',
    category: 'Perfil facial',
    treatment: 'Rinomodelación / armonización',
    title: 'Perfil nasal y labio superior',
    detail: 'Antes y después de perfil con foco en nariz, labio y ángulo facial.',
    image: resultPerfilNariz,
    split: 'vertical',
  },
  {
    id: 'contorno-rostro-cuello',
    name: 'Perfil facial',
    category: 'Perfil facial',
    treatment: 'Armonización facial',
    title: 'Contorno de rostro y cuello',
    detail: 'Comparación lateral del contorno inferior y proporción del perfil.',
    image: resultPerfilFacial10,
    split: 'vertical',
  },
  {
    id: 'frente-botox',
    name: 'Frente botox',
    category: 'Rejuvenecimiento',
    treatment: 'Toxina botulínica',
    title: 'Líneas de frente suavizadas',
    detail: 'Comparación directa de frente antes y después, manteniendo evidencia clínica.',
    image: resultFrenteBotox,
    split: 'horizontal',
    sourceAspect: 1123 / 1401,
  },
  {
    id: 'armonizacion-gluteos',
    name: 'Armonización de glúteos',
    category: 'Corporal',
    treatment: 'Armonización corporal',
    title: 'Contorno y armonización de glúteos',
    detail: 'Comparación posterior del contorno y la proporción corporal.',
    image: resultGluteos,
    split: 'vertical',
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
    <header className="sticky top-0 z-50 border-b border-clinic-line/80 bg-paper/94 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[min(1680px,calc(100%-24px))] items-center justify-between gap-4">
        <a href="#inicio" className="flex min-w-0 items-center gap-3 font-semibold text-espresso" aria-label="Ir al inicio">
          <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden bg-espresso">
            <img src={magaliLogo} alt="" className="h-full w-full object-cover" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base leading-tight md:text-lg">Dra. Magalí Chaparro</span>
            <span className="mt-0.5 hidden text-xs font-semibold uppercase text-cocoa md:block">
              Medicina estética
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-cocoa lg:flex">
          <a href="#doctora" className="transition-colors hover:text-espresso">
            Dra. Magalí
          </a>
          <a href="#sobre" className="transition-colors hover:text-espresso">
            Clínica
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
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center gap-2 border border-espresso bg-espresso text-sm font-semibold text-[#fcfdfb] transition-colors hover:bg-clay md:w-auto md:px-5"
        >
          <MessageCircle size={17} className="text-[#fcfdfb]" />
          <span className="hidden md:inline text-[#fcfdfb]">WhatsApp</span>
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

    video.autoplay = false;
    video.loop = false;
    video.removeAttribute('autoplay');
    video.removeAttribute('loop');
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
    if (video.readyState >= 1) nudgeFirstFrame();
    else video.addEventListener('loadedmetadata', nudgeFirstFrame, { once: true });
    window.addEventListener('orientationchange', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('orientationchange', onScroll);
      cancelAnimationFrame(rafId);
      video.removeEventListener('loadedmetadata', nudgeFirstFrame);
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

function DoctorProfile() {
  return (
    <section id="doctora" className="scroll-mt-24 border-y border-clinic-line bg-[#f2f4f1] py-14 md:py-20">
      <div className="mx-auto grid max-w-[1320px] gap-x-14 gap-y-8 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-y-7">
        <Reveal className="lg:col-start-2 lg:row-start-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">Dra. Magalí Chaparro</p>
          <h2 className="mt-4 max-w-[15ch] font-serif text-[clamp(2.7rem,5vw,5.25rem)] font-semibold leading-[0.93] text-espresso">
            Medicina estética con criterio y naturalidad.
          </h2>
        </Reveal>

        <Reveal className="lg:col-start-1 lg:row-span-4 lg:row-start-1">
          <figure className="mx-auto w-full max-w-[470px] lg:sticky lg:top-28">
            <div className="aspect-[4/5] overflow-hidden rounded-[20px] border border-clinic-line bg-paper">
              <img
                src={magaliPortrait}
                alt="Dra. Magalí Chaparro"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="flex items-center justify-between border-b border-clinic-line py-4 text-xs uppercase tracking-[0.12em] text-cocoa">
              <span>Doctora en Medicina</span>
              <span>Montevideo, Uruguay</span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="lg:col-start-2 lg:row-start-2">
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-cocoa md:text-lg">
            <p>
              La Dra. Magalí Chaparro es doctora en Medicina y especialista en medicina estética. Combina evaluación médica, formación continua y una búsqueda clara: mejorar sin borrar la identidad de cada paciente.
            </p>
            <p>
              Cada indicación parte de una consulta donde evalúa antecedentes, anatomía y expectativas para definir qué tratamiento tiene sentido y cuál no.
            </p>
          </div>
        </Reveal>

        <Reveal className="lg:col-start-2 lg:row-start-3">
          <div className="border-t border-clinic-line pt-6">
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-lg font-semibold text-espresso">Formación y acreditaciones</h3>
              <span className="hidden text-xs uppercase tracking-[0.14em] text-clay sm:block">Formación internacional</span>
            </div>
            <div className="mt-5 grid border-t border-clinic-line sm:grid-cols-2">
              {doctorCredentials.map((item, index) => {
                const content = (
                  <>
                    <Check className="mt-0.5 shrink-0 text-clay" size={16} />
                    <span>
                      <span className="block font-semibold leading-snug text-espresso">{item.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-cocoa">{item.detail}</span>
                    </span>
                  </>
                );

                const className = `flex gap-3 border-b border-clinic-line py-4 sm:min-h-[92px] ${index % 2 === 0 ? 'sm:pr-5' : 'sm:border-l sm:pl-5'}`;

                return item.href ? (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${className} transition-colors hover:bg-paper/80`}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.title} className={className}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-start-2 lg:row-start-4">
          <div className="border-t border-clinic-line pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">Su manera de trabajar</p>
            <div className="mt-5 grid gap-x-8 gap-y-4 md:grid-cols-2">
              {doctorMethod.map((item, index) => (
                <p key={item} className="grid grid-cols-[28px_1fr] gap-3 text-sm leading-relaxed text-cocoa">
                  <span className="font-serif text-xl leading-none text-gold">{String(index + 1).padStart(2, '0')}</span>
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const receptionY = useTransform(scrollYProgress, [0, 0.2], [760, 0]);
  const receptionRotate = useTransform(scrollYProgress, [0, 0.2], [-6, -2]);

  const productsY = useTransform(scrollYProgress, [0.16, 0.42], [780, 0]);
  const productsRotate = useTransform(scrollYProgress, [0.16, 0.42], [7, 2]);

  const careY = useTransform(scrollYProgress, [0.36, 0.64], [780, 0]);
  const careRotate = useTransform(scrollYProgress, [0.36, 0.64], [-8, -1]);

  const magaliY = useTransform(scrollYProgress, [0.56, 0.84], [780, 0]);
  const magaliRotate = useTransform(scrollYProgress, [0.56, 0.84], [8, 2]);

  const experienceY = useTransform(scrollYProgress, [0.7, 0.96], [780, 0]);
  const experienceRotate = useTransform(scrollYProgress, [0.7, 0.96], [-7, 1]);

  return (
    <section ref={sectionRef} id="sobre" className="relative h-[270vh] scroll-mt-24 md:h-[310vh]">
      <div className="clinic-line-grid sticky top-0 h-[100dvh] overflow-hidden bg-espresso text-paper">
        <div className="relative mx-auto h-full max-w-[1680px] px-5 pb-16 pt-24 sm:px-8 md:py-20 lg:px-12 lg:py-24">
          <div className="relative z-[60] max-w-2xl lg:w-[42%]">
            <p className="text-sm font-semibold text-gold">La clínica por dentro</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold leading-[0.9] md:text-7xl lg:text-8xl">
              Un espacio pensado para cuidarte.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/68 md:text-lg">
              Cada consulta comienza escuchándote. Evaluamos tus objetivos y te explicamos con claridad qué tratamiento tiene sentido para vos, siempre buscando resultados naturales.
            </p>
          </div>

          <div className="absolute inset-x-5 bottom-8 top-[47%] sm:inset-x-8 md:top-[41%] lg:bottom-12 lg:left-[44%] lg:right-12 lg:top-16">
            <motion.figure
              style={reduceMotion ? undefined : { y: receptionY, rotate: receptionRotate }}
              className="absolute left-0 top-[7%] z-10 h-[74%] w-[58%] overflow-hidden border-2 border-paper bg-paper shadow-[16px_16px_0_rgba(195,161,90,0.22)] lg:h-[78%] lg:w-[36%]"
            >
              <img
                src={clinicReceptionPhoto}
                alt="Recepción de la Clínica Dra. Magalí Chaparro"
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
            </motion.figure>

            <motion.figure
              style={reduceMotion ? undefined : { y: productsY, rotate: productsRotate }}
              className="absolute right-0 top-0 z-20 h-[46%] w-[40%] overflow-hidden border-2 border-paper bg-paper shadow-[12px_12px_0_rgba(195,161,90,0.18)] lg:h-[49%] lg:w-[27%]"
            >
              <img
                src={clinicProductsPhoto}
                alt="Vitrina de productos y equipamiento de la clínica"
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
            </motion.figure>

            <motion.figure
              style={reduceMotion ? undefined : { y: careY, rotate: careRotate }}
              className="absolute bottom-0 right-0 z-30 h-[37%] w-[52%] overflow-hidden border-2 border-paper bg-paper shadow-[12px_12px_0_rgba(195,161,90,0.18)] lg:h-[39%] lg:w-[29%]"
            >
              <img
                src={clinicCarePhoto}
                alt="Evaluación estética personalizada en el consultorio"
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
            </motion.figure>

            <motion.figure
              style={reduceMotion ? undefined : { y: magaliY, rotate: magaliRotate }}
              className="absolute bottom-[3%] left-[29%] z-40 h-[35%] w-[32%] overflow-hidden border-2 border-paper bg-paper shadow-[10px_10px_0_rgba(195,161,90,0.16)] lg:bottom-[2%] lg:left-[37%] lg:h-[43%] lg:w-[25%]"
            >
              <img
                src={clinicMagaliPhoto}
                alt="Dra. Magalí Chaparro en uno de sus consultorios"
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
            </motion.figure>

            <motion.figure
              style={reduceMotion ? undefined : { y: experienceY, rotate: experienceRotate }}
              className="absolute right-[23%] top-[38%] z-50 h-[31%] w-[32%] overflow-hidden border-2 border-paper bg-paper shadow-[10px_10px_0_rgba(195,161,90,0.16)] lg:right-[30%] lg:top-[23%] lg:h-[39%] lg:w-[24%]"
            >
              <img
                src={clinicExperiencePhoto}
                alt="Atención cercana en la Clínica Dra. Magalí Chaparro"
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
            </motion.figure>
          </div>

          <p className="absolute bottom-5 left-5 z-[60] max-w-[260px] text-xs leading-relaxed text-paper/55 sm:left-8 lg:bottom-10 lg:left-12">
            Montevideo · Medicina estética facial y corporal
          </p>
        </div>
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
            <div className="aspect-[4/3] overflow-hidden bg-[#e6e1da]">
              <img
                src={goalImages[activeGoal.id]}
                alt={activeGoal.title}
                loading="lazy"
                className="h-full w-full object-contain"
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
              <div className="aspect-[4/3] overflow-hidden bg-[#e6e1da]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
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

function ResultSlider({ item }: { item: ResultCase }) {
  const [position, setPosition] = useState(50);
  const isVertical = item.split === 'vertical';
  const sourceAspect = item.sourceAspect ?? 1;
  const frameStyle = isVertical
    ? { height: '100%', width: `${Math.min((sourceAspect / 1.6) * 100, 100)}%` }
    : { width: '100%', height: `${Math.min((0.4 / sourceAspect) * 100, 100)}%` };
  const sharedBackground = {
    backgroundImage: `url("${item.image}")`,
    backgroundRepeat: 'no-repeat',
  };

  const beforeStyle = isVertical
    ? { ...sharedBackground, backgroundSize: '200% auto', backgroundPosition: 'left center' }
    : { ...sharedBackground, backgroundSize: 'auto 200%', backgroundPosition: 'center top' };

  const afterStyle = isVertical
    ? { ...sharedBackground, backgroundSize: '200% auto', backgroundPosition: 'right center' }
    : { ...sharedBackground, backgroundSize: 'auto 200%', backgroundPosition: 'center bottom' };

  return (
    <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#181818]">
      <div className="relative overflow-hidden" style={frameStyle}>
        <div
          role="img"
          aria-label={`${item.name} después del tratamiento`}
          className="absolute inset-0"
          style={afterStyle}
        />
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <div
            role="img"
            aria-label={`${item.name} antes del tratamiento`}
            className="absolute inset-0"
            style={beforeStyle}
          />
        </div>

        <span className="pointer-events-none absolute left-2.5 top-2.5 z-10 rounded-full bg-black/72 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
          Antes
        </span>
        <span className="pointer-events-none absolute right-2.5 top-2.5 z-10 rounded-full bg-black/72 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
          Después
        </span>

        <div
          className="pointer-events-none absolute inset-y-0 z-20 w-px bg-white/90"
          style={{ left: `${position}%` }}
        >
          <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-black text-white shadow-[0_6px_22px_rgba(0,0,0,0.45)]">
            <MoveHorizontal size={15} />
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={`Comparar antes y después: ${item.name}`}
          className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  );
}

function Results() {
  const categoryOrder: ResultCategory[] = ['Perfil facial', 'Labios', 'Mirada', 'Rejuvenecimiento', 'Corporal'];
  const orderedCases = [...resultCases].sort(
    (a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
  );

  return (
    <section
      id="resultados"
      className="mx-auto max-w-[1480px] scroll-mt-24 overflow-hidden rounded-[26px] bg-black px-3 py-12 text-white sm:px-6 md:px-8 md:py-16"
    >
      <Reveal>
        <div className="mb-8 flex flex-col gap-5 border-b border-white/14 pb-7 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Resultados reales</p>
            <h2 className="mt-3 font-serif text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[0.94]">
              Antes y después, caso por caso.
            </h2>
          </div>
          <div className="flex max-w-sm items-center gap-3 text-sm leading-relaxed text-white/58">
            <MoveHorizontal className="shrink-0 text-gold" size={20} />
            <p>Arrastrá sobre cada imagen para comparar el resultado.</p>
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {orderedCases.map((item, index) => (
          <Reveal key={item.id} delay={Math.min(index * 0.025, 0.16)}>
            <article className="group h-full overflow-hidden rounded-[14px] border border-white/14 bg-[#0d0d0d] transition-colors hover:border-white/30">
              <ResultSlider item={item} />

              <div className="flex min-h-[132px] flex-col p-3 sm:min-h-[142px] sm:p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gold sm:text-xs">
                  {item.category}
                </p>
                <h3 className="mt-1.5 text-base font-semibold leading-tight text-white sm:text-lg">{item.name}</h3>
                <p className="mt-2 text-xs leading-snug text-white/58 sm:text-sm">{item.treatment}</p>
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
    <footer className="mt-12 bg-espresso text-paper">
      <div className="bg-sage text-espresso">
        <div className="mx-auto grid max-w-[1480px] gap-8 px-5 py-14 sm:px-8 md:py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:px-12">
          <div>
            <p className="text-sm font-semibold">Clínica Dra. Magalí Chaparro</p>
            <h2 className="mt-4 max-w-4xl font-serif text-5xl font-semibold leading-[0.9] md:text-7xl">
              Empezá con una evaluación médica clara.
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
            <img src={magaliLogo} alt="Dra. Magalí Chaparro" className="h-14 w-auto object-contain object-left" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/58">
              Medicina estética con evaluación médica, formación continua y resultados que respetan tus rasgos.
            </p>
          </div>

          <nav aria-label="Navegación del pie de página">
            <p className="text-sm font-semibold text-gold">Navegación</p>
            <div className="mt-4 grid gap-3 text-sm text-paper/68">
              <a className="transition-colors hover:text-gold" href="#doctora">La doctora</a>
              <a className="transition-colors hover:text-gold" href="#tratamientos">Tratamientos</a>
              <a className="transition-colors hover:text-gold" href="#resultados">Resultados</a>
              <a className="transition-colors hover:text-gold" href="#resenas">Reseñas</a>
              <a className="transition-colors hover:text-gold" href="#visita">Consultorio</a>
            </div>
          </nav>

          <div>
            <p className="text-sm font-semibold text-gold">Consultorio</p>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-paper/68">
              <p>Manuel Flores Mora 1436, Montevideo.</p>
              <p>Lunes a viernes, 9:00 a 18:00 hs.</p>
              <a className="inline-flex transition-colors hover:text-gold" href={mapsUrl} target="_blank" rel="noopener noreferrer">
                Abrir ubicación en Maps
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gold">Contacto</p>
            <div className="mt-4 grid gap-3 text-sm text-paper/68">
              <a className="transition-colors hover:text-gold" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp 098 293 590
              </a>
              <a className="transition-colors hover:text-gold" href={instagramUrl} target="_blank" rel="noopener noreferrer">
                Instagram @dra.chaparro
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs leading-relaxed text-paper/42 md:flex-row md:items-end md:justify-between">
          <p>© {new Date().getFullYear()} Clínica Dra. Magalí Chaparro. Todos los derechos reservados.</p>
          <p className="max-w-xl md:text-right">
            La información del sitio es orientativa, no reemplaza una consulta médica y los resultados pueden variar según cada paciente.
          </p>
        </div>
      </div>
    </footer>
  );
}

function Reviews() {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const activeReview = REVIEWS[activeReviewIndex];
  const isLongReview = activeReview.text.length > 520;

  const showPreviousReview = () => {
    setActiveReviewIndex((current) => (current - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const showNextReview = () => {
    setActiveReviewIndex((current) => (current + 1) % REVIEWS.length);
  };

  return (
    <section id="resenas" className="mt-12 border-y border-clinic-line bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 border-b border-espresso/18 pb-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] lg:items-end">
          <Reveal>
            <p className="text-xs font-semibold uppercase text-clay">Reseñas reales</p>
            <h2 className="mt-4 max-w-4xl font-serif text-5xl font-semibold leading-[0.9] text-espresso md:text-7xl lg:text-8xl">
              La experiencia, contada por quienes la vivieron.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex items-end gap-5 lg:justify-end">
              <span className="font-serif text-8xl font-semibold leading-[0.72] text-espresso md:text-9xl">5.0</span>
              <div className="border-l border-espresso/18 pb-1 pl-5">
                <span className="flex gap-1 text-gold" aria-label="5 de 5 estrellas">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={17} fill="currentColor" strokeWidth={0} />
                  ))}
                </span>
                <p className="mt-3 text-sm font-semibold text-espresso">5.0 en Google</p>
                <p className="mt-1 text-xs text-cocoa/70">Reseñas reales de pacientes</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid border-b border-espresso/18 lg:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.55fr)]">
          <motion.article
            key={activeReview.author}
            id="review-panel"
            role="tabpanel"
            aria-labelledby={`review-tab-${activeReviewIndex}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex min-h-[520px] flex-col py-10 lg:min-h-[560px] lg:py-14 lg:pr-14"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="flex gap-1 text-gold" aria-label="5 de 5 estrellas">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-cocoa/60">Google</span>
            </div>

            <span aria-hidden="true" className="mt-8 font-serif text-8xl leading-[0.45] text-clay/35">
              “
            </span>

            <blockquote
              className={`mt-3 max-w-4xl flex-1 font-serif font-semibold text-espresso ${
                isLongReview ? 'text-2xl leading-[1.22] md:text-3xl' : 'text-3xl leading-[1.16] md:text-4xl'
              }`}
            >
              {activeReview.text.split('\n\n').map((paragraph) => (
                <p key={paragraph} className="mt-5 first:mt-0">
                  {paragraph}
                </p>
              ))}
            </blockquote>

            <footer className="mt-10 flex items-center gap-4 border-t border-espresso/12 pt-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-espresso font-serif text-xl font-semibold text-paper">
                {activeReview.author.charAt(0)}
              </span>
              <div>
                <p className="font-semibold text-espresso">{activeReview.author}</p>
                <p className="mt-0.5 text-xs text-cocoa/70">Publicada en {activeReview.source}</p>
              </div>
            </footer>
          </motion.article>

          <aside className="border-t border-espresso/18 lg:border-l lg:border-t-0">
            <div className="flex min-h-20 items-center justify-between gap-4 border-b border-espresso/18 px-4 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase text-clay">Experiencias</p>
                <p className="mt-1 text-sm text-cocoa">Elegí una reseña para leerla</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={showPreviousReview}
                  aria-label="Ver reseña anterior"
                  className="grid h-10 w-10 place-items-center rounded-full border border-espresso/18 text-espresso transition-colors hover:bg-warm"
                >
                  <ArrowLeft size={17} />
                </button>
                <button
                  type="button"
                  onClick={showNextReview}
                  aria-label="Ver reseña siguiente"
                  className="grid h-10 w-10 place-items-center rounded-full border border-espresso/18 text-espresso transition-colors hover:bg-warm"
                >
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2" role="tablist" aria-label="Reseñas de pacientes">
              {REVIEWS.map((review, index) => {
                const isActive = index === activeReviewIndex;

                return (
                  <button
                    key={review.author}
                    id={`review-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="review-panel"
                    onClick={() => setActiveReviewIndex(index)}
                    className={`min-h-[76px] border-b border-espresso/12 px-4 py-3 text-left transition-colors odd:border-r sm:px-5 ${
                      isActive ? 'bg-warm text-espresso' : 'text-cocoa hover:bg-canvas'
                    }`}
                  >
                    <span
                      className={`flex gap-0.5 ${isActive ? 'text-clay' : 'text-cocoa/35'}`}
                      aria-label="5 de 5 estrellas"
                    >
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star key={star} size={9} fill="currentColor" strokeWidth={0} />
                      ))}
                    </span>
                    <span className="mt-1 block text-sm font-semibold leading-tight">{review.author}</span>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>

        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-cocoa/60">
          Testimonios compartidos por pacientes. Cada experiencia es personal y los resultados pueden variar según cada caso.
        </p>
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
        <DoctorProfile />
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
