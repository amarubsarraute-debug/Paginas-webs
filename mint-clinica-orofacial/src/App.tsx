import { useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
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
  Star,
} from 'lucide-react';
import { FAQS, GOALS, REVIEWS, TREATMENT_CATEGORIES } from './data';
import portrait from './assets/equipo/dra-natalia.jpg';
import clinicaFachada from './assets/clinica/fachada.jpg';
import clinicaRecepcion from './assets/clinica/recepcion.jpg';
import clinicaSalaEspera from './assets/clinica/sala-espera.jpg';
import clinicaConsultorio from './assets/clinica/consultorio-dental.jpg';
import clinicaInterior from './assets/clinica/interior.jpg';
import clinicaAtencion from './assets/clinica/atencion.jpg';
import heroHome from './assets/clinica/hero-home.jpg';
import mintLogo from './assets/brand/mint-logo.png';
// Objetivos — fotos editoriales representativas
import goalSonrisa from './assets/objetivos/sonrisa.jpg';
import goalOrtodoncia from './assets/objetivos/ortodoncia.jpg';
import goalArrugas from './assets/objetivos/arrugas.jpg';
import goalLabios from './assets/objetivos/labios.jpg';
import goalFirmeza from './assets/objetivos/firmeza.jpg';
import goalPiel from './assets/objetivos/piel.jpg';
import goalArmonizacion from './assets/objetivos/armonizacion.jpg';
// Casos de éxito — mitades antes/después alineadas
import baSonrisaA from './assets/resultados/sonrisa-antes.jpg';
import baSonrisaB from './assets/resultados/sonrisa-despues.jpg';
import baDentalA from './assets/resultados/transformacion-dental-antes.jpg';
import baDentalB from './assets/resultados/transformacion-dental-despues.jpg';
import baLabiosA from './assets/resultados/labios-antes.jpg';
import baLabiosB from './assets/resultados/labios-despues.jpg';
import baAumentoA from './assets/resultados/aumento-labios-antes.jpg';
import baAumentoB from './assets/resultados/aumento-labios-despues.jpg';
import baPerfilA from './assets/resultados/perfil-facial-antes.jpg';
import baPerfilB from './assets/resultados/perfil-facial-despues.jpg';
import baRinoA from './assets/resultados/rinomodelacion-antes.jpg';
import baRinoB from './assets/resultados/rinomodelacion-despues.jpg';
import baBotoxA from './assets/resultados/botox-frente-antes.jpg';
import baBotoxB from './assets/resultados/botox-frente-despues.jpg';
import baCuelloA from './assets/resultados/flacidez-cuello-antes.jpg';
import baCuelloB from './assets/resultados/flacidez-cuello-despues.jpg';

const WHATSAPP_NUMBER = '59891972912';
const WHATSAPP_MESSAGE = 'Hola Mint, quiero agendar una consulta.';
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const instagramUrl = 'https://www.instagram.com/mintclinica/';
const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=Mint%20Est%C3%A9tica%20Orofacial%20Juan%20Benito%20Blanco%203351%20Montevideo';

const goalImages: Record<string, string> = {
  sonrisa: goalSonrisa,
  ortodoncia: goalOrtodoncia,
  arrugas: goalArrugas,
  labios: goalLabios,
  bioestimulacion: goalFirmeza,
  mesoterapia: goalPiel,
  armonizacion: goalArmonizacion,
};

const doctorCredentials = [
  { title: 'Odontóloga', detail: 'Formación en odontología con orientación estética.' },
  { title: 'Medicina estética facial', detail: 'Tratamientos faciales personalizados con criterio profesional.' },
  { title: 'Enfoque orofacial integral', detail: 'La sonrisa y el rostro evaluados en conjunto, no por separado.' },
  { title: 'Formación continua', detail: 'Actualización permanente en tratamientos y protocolos.' },
  { title: 'Atención personalizada', detail: 'Consulta, indicación y seguimiento de cada paciente.' },
  { title: 'Trayectoria', detail: 'Pacientes que eligen Mint y vuelven a confiar en la clínica.' },
];

const doctorMethod = [
  'Primero te escucho: qué querés mejorar, qué te preocupa y qué resultado esperás.',
  'Miro tu rostro y tu sonrisa en conjunto, porque la armonía no se trabaja por partes aisladas.',
  'Te explico qué haría, qué no haría y por qué, para que decidas con información real.',
  'Después del tratamiento acompaño la evolución y los cuidados necesarios.',
];

type ClinicPhoto = { src: string; alt: string };

const clinicPhotos: ClinicPhoto[] = [
  { src: clinicaFachada, alt: 'Fachada de Mint · Estética Orofacial en Pocitos' },
  { src: clinicaRecepcion, alt: 'Recepción de la clínica Mint' },
  { src: clinicaSalaEspera, alt: 'Sala de espera de la clínica Mint' },
  { src: clinicaConsultorio, alt: 'Consultorio odontológico de la clínica Mint' },
  { src: clinicaAtencion, alt: 'Atención odontológica en la clínica Mint' },
];

const treatments = [
  {
    title: 'Odontología estética',
    text: 'Diseño de sonrisa, carillas y blanqueamiento para una sonrisa armónica y natural.',
    time: 'Consulta previa',
    downtime: 'Según caso',
    image: goalSonrisa,
  },
  {
    title: 'Botox',
    text: 'Suaviza líneas de expresión y mantiene el movimiento natural del rostro.',
    time: '20 a 30 min',
    downtime: 'Mínimo',
    image: goalArrugas,
  },
  {
    title: 'Labios con ácido hialurónico',
    text: 'Hidratación profunda y volumen sutil respetando tu forma natural.',
    time: '30 a 45 min',
    downtime: '1 a 2 días',
    image: goalLabios,
  },
  {
    title: 'Bioestimulación de colágeno',
    text: 'Mejora la firmeza, la textura y la luminosidad de la piel de forma progresiva.',
    time: 'Plan de sesiones',
    downtime: 'Sin reposo',
    image: goalPiel,
  },
];

const reasons = [
  {
    title: 'Escuchar el objetivo',
    text: 'Primero escucho qué querés mejorar, qué te incomoda y qué resultado sería natural para vos.',
  },
  {
    title: 'Evaluar lo indicado',
    text: 'Si el caso involucra sonrisa y rostro, los miro en conjunto. Si no, indicamos solo lo necesario.',
  },
  {
    title: 'Definir el plan',
    text: 'Te explico qué conviene hacer, qué conviene evitar y en qué orden tiene sentido avanzar.',
  },
  {
    title: 'Aplicar y acompañar',
    text: 'Después del tratamiento acompaño la evolución para ajustar cuidados, controles o próximos pasos.',
  },
];

type ResultCase = {
  id: string;
  name: string;
  category: string;
  treatment: string;
  before: string;
  after: string;
};

const resultCases: ResultCase[] = [
  { id: 'sonrisa', name: 'Diseño de sonrisa', category: 'Sonrisa', treatment: 'Odontología estética', before: baSonrisaA, after: baSonrisaB },
  { id: 'transformacion', name: 'Carillas estéticas', category: 'Sonrisa', treatment: 'Estética dental', before: baDentalA, after: baDentalB },
  { id: 'labios', name: 'Relleno labial', category: 'Labios', treatment: 'Ácido hialurónico', before: baLabiosA, after: baLabiosB },
  { id: 'aumento-labios', name: 'Perfilado labial y rinomodelación', category: 'Perfil', treatment: 'Ácido hialurónico', before: baAumentoA, after: baAumentoB },
  { id: 'perfil', name: 'Armonización orofacial', category: 'Perfil', treatment: 'Perfil facial', before: baPerfilA, after: baPerfilB },
  { id: 'rinomodelacion', name: 'Rinomodelación', category: 'Perfil', treatment: 'Ácido hialurónico', before: baRinoA, after: baRinoB },
  { id: 'botox-frente', name: 'Botox en frente', category: 'Botox', treatment: 'Líneas de expresión', before: baBotoxA, after: baBotoxB },
  { id: 'flacidez-cuello', name: 'Reducción de papada', category: 'Papada', treatment: 'Tratamiento de papada', before: baCuelloA, after: baCuelloB },
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
          <span className="relative block h-12 w-[112px] shrink-0 overflow-hidden rounded-[18px] bg-white ring-1 ring-clinic-line/70">
            <img
              src={mintLogo}
              alt="Mint"
              className="absolute left-1/2 top-1/2 h-[112px] w-[112px] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
            />
          </span>
          <span className="min-w-0">
            <span className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-clay sm:block">
              Estética orofacial
            </span>
            <span className="mt-0.5 hidden truncate text-sm leading-tight text-cocoa md:block">
              Odontología estética · Medicina estética
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-cocoa lg:flex">
          <a href="#equipo" className="transition-colors hover:text-espresso">
            Dra. Natalia
          </a>
          <a href="#lugar" className="transition-colors hover:text-espresso">
            La clínica
          </a>
          <a href="#tratamientos" className="transition-colors hover:text-espresso">
            Tratamientos
          </a>
          <a href="#resultados" className="transition-colors hover:text-espresso">
            Resultados
          </a>
          <a href="#resenas" className="transition-colors hover:text-espresso">
            Reseñas
          </a>
          <a href="#visita" className="transition-colors hover:text-espresso">
            Contacto
          </a>
        </nav>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center gap-2 border border-espresso bg-espresso text-sm font-semibold text-[#fcfdfb] transition-colors hover:border-[#0b6f5f] hover:bg-[#0b6f5f] md:w-auto md:px-5"
        >
          <MessageCircle size={17} className="text-[#fcfdfb]" />
          <span className="hidden md:inline text-[#fcfdfb]">WhatsApp</span>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="inicio" className="relative px-3 pt-3 md:px-5 md:pt-5">
      <div className="relative flex min-h-[86vh] overflow-hidden rounded-[34px] border border-clinic-line bg-espresso shadow-[0_30px_90px_rgba(18,59,51,0.2)]">
        <img
          src={heroHome}
          alt="Paciente sonriendo en la consulta de Mint · Estética Orofacial"
          className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(15,52,44,0.97) 0%, rgba(15,52,44,0.82) 30%, rgba(15,52,44,0.32) 56%, rgba(15,52,44,0) 76%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent md:hidden" />

        <div className="relative z-10 flex w-full flex-col justify-end px-6 pb-10 pt-28 md:max-w-[64%] md:justify-center md:px-12 md:pb-14 lg:px-16">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-semibold uppercase tracking-[0.14em] text-gold"
          >
            Odontología estética · Medicina estética · Pocitos
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.82, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 max-w-5xl font-serif text-[clamp(3.2rem,7.6vw,7.8rem)] font-semibold leading-[0.9] text-paper"
          >
            Mint
            <br />
            <em className="font-normal">Estética orofacial</em>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-md text-base leading-relaxed text-paper/80 md:max-w-xl md:text-lg"
          >
            Odontología estética y medicina estética facial con resultados naturales y atención cercana en
            Pocitos, Montevideo. Dirigida por la Dra. Natalia Gallo.
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
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-paper px-7 text-base font-semibold text-espresso shadow-[0_18px_46px_rgba(0,0,0,0.18)] transition-transform hover:-translate-y-0.5 hover:bg-sage"
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

function Doctor() {
  return (
    <section id="equipo" className="scroll-mt-24 border-b border-clinic-line py-16 md:py-24">
      <div className="mx-auto grid max-w-[1320px] gap-x-14 gap-y-8 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-y-7">
        <Reveal className="lg:col-start-2 lg:row-start-1">
          <h2 className="max-w-[14ch] font-serif text-[clamp(2.7rem,5vw,5.25rem)] font-semibold leading-[0.93] text-espresso">
            Soy la Dra. Natalia Gallo.
          </h2>
        </Reveal>

        <Reveal className="lg:col-start-1 lg:row-span-4 lg:row-start-1">
          <figure className="mx-auto w-full max-w-[470px] lg:sticky lg:top-28">
            <div className="aspect-[4/5] overflow-hidden rounded-[20px] border border-clinic-line bg-paper">
              <img src={portrait} alt="Dra. Natalia Gallo" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <figcaption className="flex items-center justify-between border-b border-clinic-line py-4 text-xs uppercase tracking-[0.12em] text-cocoa">
              <span>Directora de Mint</span>
              <span>Pocitos, Montevideo</span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="lg:col-start-2 lg:row-start-2">
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-cocoa md:text-lg">
            <p>
              En Mint trabajo con un enfoque orofacial: miro la sonrisa y el rostro como un mismo proyecto,
              combinando odontología estética y medicina estética facial.
            </p>
            <p>
              Antes de indicar un tratamiento evalúo antecedentes, anatomía y expectativas para definir qué tiene
              sentido en tu caso y qué no. Mi objetivo es que el resultado se vea natural y se integre a tus rasgos.
            </p>
          </div>
        </Reveal>

        <Reveal className="lg:col-start-2 lg:row-start-3">
          <div className="border-t border-clinic-line pt-6">
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-lg font-semibold text-espresso">Perfil profesional</h3>
              <span className="hidden text-xs uppercase tracking-[0.14em] text-clay sm:block">Enfoque orofacial</span>
            </div>
            <div className="mt-5 grid border-t border-clinic-line sm:grid-cols-2">
              {doctorCredentials.map((item, index) => (
                <div
                  key={item.title}
                  className={`flex gap-3 border-b border-clinic-line py-4 sm:min-h-[92px] ${
                    index % 2 === 0 ? 'sm:pr-5' : 'sm:border-l sm:pl-5'
                  }`}
                >
                  <Check className="mt-0.5 shrink-0 text-clay" size={16} />
                  <span>
                    <span className="block font-semibold leading-snug text-espresso">{item.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-cocoa">{item.detail}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-start-2 lg:row-start-4">
          <div className="border-t border-clinic-line pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">Mi manera de trabajar</p>
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

function Place() {
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
    <section ref={sectionRef} id="lugar" className="relative h-[270vh] scroll-mt-24 md:h-[310vh]">
      <div className="clinic-line-grid sticky top-0 h-[100dvh] overflow-hidden bg-espresso text-paper">
        <div className="relative mx-auto h-full max-w-[1680px] px-5 pb-16 pt-24 sm:px-8 md:py-20 lg:px-12 lg:py-24">
          <div className="relative z-[60] max-w-2xl lg:w-[42%]">
            <p className="text-sm font-semibold text-gold">La clínica por dentro</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold leading-[0.9] md:text-7xl lg:text-8xl">
              Un espacio pensado para cuidarte.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/68 md:text-lg">
              Cada consulta comienza escuchándote. Un espacio cuidado en cada detalle, en pleno Pocitos, para que la
              experiencia sea cómoda, prolija y profesional de principio a fin.
            </p>
          </div>

          <div className="absolute inset-x-5 bottom-8 top-[47%] sm:inset-x-8 md:top-[41%] lg:bottom-12 lg:left-[44%] lg:right-12 lg:top-16">
            <motion.figure
              style={reduceMotion ? undefined : { y: receptionY, rotate: receptionRotate }}
              className="absolute left-0 top-[7%] z-10 h-[74%] w-[58%] overflow-hidden border-2 border-paper bg-paper shadow-[16px_16px_0_rgba(15,157,132,0.22)] lg:h-[78%] lg:w-[36%]"
            >
              <img src={clinicaFachada} alt="Fachada de la clínica Mint en Pocitos" loading="lazy" className="h-full w-full object-cover object-center" />
            </motion.figure>

            <motion.figure
              style={reduceMotion ? undefined : { y: productsY, rotate: productsRotate }}
              className="absolute right-0 top-0 z-20 h-[46%] w-[40%] overflow-hidden border-2 border-paper bg-paper shadow-[12px_12px_0_rgba(15,157,132,0.18)] lg:h-[49%] lg:w-[27%]"
            >
              <img src={clinicaRecepcion} alt="Recepción de la clínica Mint" loading="lazy" className="h-full w-full object-cover object-center" />
            </motion.figure>

            <motion.figure
              style={reduceMotion ? undefined : { y: careY, rotate: careRotate }}
              className="absolute bottom-0 right-0 z-30 h-[37%] w-[52%] overflow-hidden border-2 border-paper bg-paper shadow-[12px_12px_0_rgba(15,157,132,0.18)] lg:h-[39%] lg:w-[29%]"
            >
              <img src={clinicaSalaEspera} alt="Sala de espera de la clínica Mint" loading="lazy" className="h-full w-full object-cover object-center" />
            </motion.figure>

            <motion.figure
              style={reduceMotion ? undefined : { y: magaliY, rotate: magaliRotate }}
              className="absolute bottom-[3%] left-[29%] z-40 h-[35%] w-[32%] overflow-hidden border-2 border-paper bg-paper shadow-[10px_10px_0_rgba(15,157,132,0.16)] lg:bottom-[2%] lg:left-[37%] lg:h-[43%] lg:w-[25%]"
            >
              <img src={clinicaConsultorio} alt="Consultorio odontológico de la clínica Mint" loading="lazy" className="h-full w-full object-cover object-center" />
            </motion.figure>

            <motion.figure
              style={reduceMotion ? undefined : { y: experienceY, rotate: experienceRotate }}
              className="absolute right-[23%] top-[38%] z-50 h-[31%] w-[32%] overflow-hidden border-2 border-paper bg-paper shadow-[10px_10px_0_rgba(15,157,132,0.16)] lg:right-[30%] lg:top-[23%] lg:h-[39%] lg:w-[24%]"
            >
              <img src={clinicaAtencion} alt="Atención odontológica en la clínica Mint" loading="lazy" className="h-full w-full object-cover object-center" />
            </motion.figure>
          </div>

          <p className="absolute bottom-5 left-5 z-[60] max-w-[260px] text-xs leading-relaxed text-paper/55 sm:left-8 lg:bottom-10 lg:left-12">
            Pocitos, Montevideo · Odontología y medicina estética facial
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
            Elegí lo que querés trabajar y mirá con qué tratamientos se suele abordar. La indicación final siempre sale de la consulta.
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
                className="ml-8 aspect-[4/3] w-64 -translate-y-1/2 rotate-3 rounded-[22px] border border-paper bg-warm object-cover shadow-[0_24px_70px_rgba(18,59,51,0.28)]"
              />
            </motion.div>

            {GOALS.map((goal) => {
              const isActive = goal.id === activeGoal.id;
              return (
                <button
                  key={goal.id}
                  type="button"
                  onMouseEnter={() => {
                    setActiveGoal(goal);
                    setHoveredGoal(goal.id);
                  }}
                  onFocus={() => setActiveGoal(goal)}
                  onClick={() => setActiveGoal(goal)}
                  aria-pressed={isActive}
                  className={`group relative flex w-full items-center justify-between gap-5 py-5 text-left transition-all md:py-6 ${
                    isActive ? 'pl-3 md:pl-5' : 'hover:pl-2'
                  }`}
                >
                  <span className="relative z-10">
                    <span
                      className={`block font-serif text-2xl font-semibold leading-tight transition-colors md:text-3xl ${
                        isActive ? 'text-clay' : 'text-espresso group-hover:text-clay'
                      }`}
                    >
                      {goal.title}
                    </span>
                    <span className="mt-2 hidden max-w-md text-sm leading-relaxed text-cocoa/72 md:block">
                      {goal.treatments}
                    </span>
                  </span>
                  <ArrowRight
                    size={20}
                    className={`relative z-10 shrink-0 transition-all ${
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
            className="overflow-hidden rounded-[30px] border border-clinic-line bg-warm shadow-[0_24px_80px_rgba(18,59,51,0.10)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#dcebe4]">
              <img src={goalImages[activeGoal.id]} alt={activeGoal.title} loading="lazy" className="h-full w-full object-cover object-center" />
              <span className="absolute inset-0 bg-gradient-to-t from-espresso/55 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 rounded-full border border-paper/30 bg-paper/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-paper backdrop-blur-sm">
                Objetivo seleccionado
              </span>
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
                className="mt-8 inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#0b6f5f] px-6 py-3.5 font-semibold text-white shadow-[0_14px_34px_rgba(11,111,95,0.24)] transition-transform hover:-translate-y-0.5 hover:bg-espresso"
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
              <div className="aspect-[4/3] overflow-hidden bg-[#dcebe4]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
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
            Todo lo que se trata en la clínica.
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

function ProcessStep({
  reason,
  index,
  progress,
  reduceMotion,
}: {
  reason: (typeof reasons)[number];
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
  key?: string | number;
}) {
  const start = 0.06 + index * 0.12;
  const end = start + 0.12;
  const scale = useTransform(progress, index === 0 ? [0, 1] : [start, end], index === 0 ? [1, 1] : [0.9, 1]);
  const y = useTransform(progress, index === 0 ? [0, 1] : [start, end], index === 0 ? [0, 0] : [52, 0]);

  return (
    <motion.article
      style={reduceMotion ? undefined : { scale, y }}
      className={`relative z-10 w-full md:max-w-[430px] ${
        index % 2 === 1 ? 'md:justify-self-end' : 'md:justify-self-start'
      }`}
    >
      <div className="group relative overflow-hidden rounded-[24px] border border-clinic-line bg-canvas/95 p-5 shadow-[0_20px_60px_rgba(18,59,51,0.09)] transition-all duration-300 hover:-translate-y-1 hover:border-clay/45 md:p-6">
        <span className="absolute -right-5 -top-7 font-serif text-[7rem] font-semibold leading-none text-clay/8 transition-colors group-hover:text-clay/12">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="relative">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-espresso font-serif text-xl font-semibold text-gold shadow-[0_12px_30px_rgba(18,59,51,0.18)]">
            {index + 1}
          </div>
          <h3 className="mt-5 text-xl font-semibold text-espresso">{reason.title}</h3>
          <p className="mt-3 leading-relaxed text-cocoa">{reason.text}</p>
        </div>
      </div>
    </motion.article>
  );
}

function Reasons() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const pathLength = useTransform(scrollYProgress, [0.04, 0.62], [0, 1]);

  return (
    <section ref={sectionRef} className="relative scroll-mt-24 border-y border-clinic-line bg-paper py-16 md:h-[220vh] md:py-0">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(18,59,51,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(18,59,51,0.055) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="relative mx-auto grid max-w-[min(1480px,calc(100%-24px))] gap-12 px-4 md:sticky md:top-[96px] md:min-h-[calc(100dvh-96px)] md:px-6 md:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="md:pr-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">Antes de aplicar</p>
            <h2 className="mt-4 max-w-[11ch] font-serif text-[clamp(3rem,5vw,5.9rem)] font-semibold leading-[0.9] text-espresso">
              El tratamiento empieza mucho antes.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cocoa">
              La aplicación es solo una parte. Primero escucho, evalúo y ordeno el plan para que la indicación tenga sentido en tu caso.
            </p>
          </Reveal>
        </div>

        <div className="relative py-4 md:min-h-[560px] md:py-4">
          <svg
            className="pointer-events-none absolute inset-y-6 left-1/2 hidden w-[72%] -translate-x-1/2 md:block"
            viewBox="0 0 520 560"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M80 28 C430 58 438 142 168 176 C-10 202 58 304 348 326 C538 342 482 448 122 520"
              fill="none"
              stroke="rgba(195,161,90,0.22)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="10 14"
            />
            <motion.path
              style={reduceMotion ? undefined : { pathLength }}
              d="M80 28 C430 58 438 142 168 176 C-10 202 58 304 348 326 C538 342 482 448 122 520"
              fill="none"
              stroke="rgba(195,161,90,0.88)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          <div className="relative grid gap-6 md:gap-4">
            {reasons.map((reason, index) => (
              <ProcessStep
                key={reason.title}
                reason={reason}
                index={index}
                progress={scrollYProgress}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultSlider({ item }: { item: ResultCase }) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-[#10100f]">
      <img
        src={item.after}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-xl"
      />
      <img
        src={item.after}
        alt={`${item.name} después del tratamiento`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-contain"
      />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img
          src={item.before}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-xl"
        />
        <img
          src={item.before}
          alt={`${item.name} antes del tratamiento`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>

      <span className="pointer-events-none absolute left-2.5 top-2.5 z-10 rounded-full bg-black/72 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
        Antes
      </span>
      <span className="pointer-events-none absolute right-2.5 top-2.5 z-10 rounded-full bg-black/72 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
        Después
      </span>

      <div className="pointer-events-none absolute inset-y-0 z-20 w-px bg-white/90" style={{ left: `${position}%` }}>
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
  );
}

function Results() {
  return (
    <section
      id="resultados"
      className="mx-auto max-w-[1480px] scroll-mt-24 overflow-hidden rounded-[26px] bg-espresso px-3 py-12 text-white sm:px-6 md:px-8 md:py-16"
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
        {resultCases.map((item, index) => (
          <Reveal key={item.id} delay={Math.min(index * 0.025, 0.16)}>
            <article className="group h-full overflow-hidden rounded-[14px] border border-white/14 bg-[#0d0d0d] transition-colors hover:border-white/30">
              <ResultSlider item={item} />

              <div className="flex min-h-[132px] flex-col p-3 sm:min-h-[142px] sm:p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gold sm:text-xs">{item.category}</p>
                <h3 className="mt-1.5 text-base font-semibold leading-tight text-white sm:text-lg">{item.name}</h3>
                <p className="mt-2 text-xs leading-snug text-white/58 sm:text-sm">{item.treatment}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-7 max-w-3xl text-xs leading-relaxed text-white/45">
        Casos reales de la clínica compartidos con autorización. Los resultados varían según cada paciente.
      </p>
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
              La clínica
            </p>
            <h2 className="font-serif text-[clamp(3rem,5.8vw,6.8rem)] font-semibold leading-[0.9] text-espresso">
              Agendá tu consulta.
            </h2>
          </div>

          <div className="mt-10 space-y-5 text-cocoa">
            <p className="flex gap-3">
              <MapPin className="mt-1 shrink-0 text-clay" size={20} />
              <span>Juan Benito Blanco 3351, Pocitos, Montevideo.</span>
            </p>
            <p className="flex gap-3">
              <Clock className="mt-1 shrink-0 text-clay" size={20} />
              <span>Lunes a viernes, con agenda previa. Coordiná tu día y horario por WhatsApp.</span>
            </p>
            <p className="flex gap-3">
              <CalendarCheck className="mt-1 shrink-0 text-clay" size={20} />
              <span>WhatsApp 091 972 912 · Instagram @mintclinica.</span>
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#0b6f5f] px-6 font-semibold text-white shadow-[0_14px_34px_rgba(11,111,95,0.24)] transition-transform hover:-translate-y-0.5 hover:bg-espresso"
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
              title="Mapa de la clínica"
              src="https://www.google.com/maps?q=Juan%20Benito%20Blanco%203351%2C%20Montevideo%2C%20Uruguay&output=embed"
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
            <p className="text-sm font-semibold">Mint · Estética Orofacial</p>
            <h2 className="mt-4 max-w-4xl font-serif text-5xl font-semibold leading-[0.9] md:text-7xl">
              Empezá con una consulta clara.
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
            <div className="relative h-16 w-40 overflow-hidden rounded-[20px] bg-white shadow-[0_16px_42px_rgba(0,0,0,0.18)]">
              <img
                src={mintLogo}
                alt="Mint"
                className="absolute left-1/2 top-1/2 h-40 w-40 max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
              />
            </div>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Estética orofacial</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/58">
              Odontología estética y medicina estética facial con evaluación profesional y resultados que respetan tus rasgos.
            </p>
          </div>

          <nav aria-label="Navegación del pie de página">
            <p className="text-sm font-semibold text-gold">Navegación</p>
            <div className="mt-4 grid gap-3 text-sm text-paper/68">
              <a className="transition-colors hover:text-gold" href="#equipo">Dra. Natalia</a>
              <a className="transition-colors hover:text-gold" href="#lugar">La clínica</a>
              <a className="transition-colors hover:text-gold" href="#tratamientos">Tratamientos</a>
              <a className="transition-colors hover:text-gold" href="#resultados">Resultados</a>
              <a className="transition-colors hover:text-gold" href="#resenas">Reseñas</a>
            </div>
          </nav>

          <div>
            <p className="text-sm font-semibold text-gold">La clínica</p>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-paper/68">
              <p>Juan Benito Blanco 3351, Pocitos, Montevideo.</p>
              <p>Lunes a viernes, con agenda previa.</p>
              <a className="inline-flex transition-colors hover:text-gold" href={mapsUrl} target="_blank" rel="noopener noreferrer">
                Abrir ubicación en Maps
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gold">Contacto</p>
            <div className="mt-4 grid gap-3 text-sm text-paper/68">
              <a className="transition-colors hover:text-gold" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp 091 972 912
              </a>
              <a className="transition-colors hover:text-gold" href={instagramUrl} target="_blank" rel="noopener noreferrer">
                Instagram @mintclinica
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs leading-relaxed text-paper/42 md:flex-row md:items-end md:justify-between">
          <p>© {new Date().getFullYear()} Mint · Estética Orofacial. Todos los derechos reservados.</p>
          <p className="max-w-xl md:text-right">
            La información del sitio es orientativa, no reemplaza una consulta profesional y los resultados pueden variar según cada paciente.
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
              <span className="font-serif text-5xl font-semibold leading-[0.9] text-espresso md:text-6xl">Reseñas</span>
              <div className="border-l border-espresso/18 pb-1 pl-5">
                <span className="flex gap-1 text-gold" aria-label="5 de 5 estrellas">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </span>
                <p className="mt-3 text-sm font-semibold text-espresso">Opiniones de pacientes</p>
                <p className="mt-1 text-xs text-cocoa/70">Experiencias compartidas sobre atención, trato y resultados naturales.</p>
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
            className="relative flex min-h-[480px] flex-col py-10 lg:min-h-[520px] lg:py-12 lg:pr-14"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="flex gap-1 text-gold" aria-label="5 de 5 estrellas">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-cocoa/60">Reseña</span>
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
                <p className="mt-0.5 text-xs text-cocoa/70">Paciente de Mint</p>
              </div>
            </footer>
          </motion.article>

          <aside className="flex flex-col border-t border-espresso/18 lg:border-l lg:border-t-0">
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

            <div className="grid flex-1 grid-cols-2 lg:grid-rows-4" role="tablist" aria-label="Reseñas de pacientes">
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
                    className={`min-h-[86px] border-b border-espresso/12 px-4 py-3 text-left transition-colors odd:border-r sm:px-5 lg:min-h-0 ${
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
          Cada experiencia es personal. El plan y los resultados pueden variar según la evaluación de cada caso.
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
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#0b6f5f] text-white shadow-[0_14px_40px_rgba(18,59,51,0.35)] transition-transform hover:-translate-y-0.5 md:hidden"
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
        <Doctor />
        <Place />
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
