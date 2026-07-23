import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Instagram,
  MapPin,
  Quote,
} from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";
import doctorImg from "@/assets/dra-luisa.jpg";
import objetivoAcne from "@/assets/objectives/objetivo-acne.jpg";
import objetivoArmonizacionFacial from "@/assets/objectives/objetivo-armonizacion-facial.jpg";
import objetivoCalidadPiel from "@/assets/objectives/objetivo-calidad-piel.jpg";
import objetivoCapilar from "@/assets/objectives/objetivo-capilar.jpg";
import objetivoCorporal from "@/assets/objectives/objetivo-corporal.jpg";
import objetivoFlacidez from "@/assets/objectives/objetivo-flacidez.jpg";
import objetivoManchas from "@/assets/objectives/objetivo-manchas.jpg";
import objetivoRejuvenecerRostro from "@/assets/objectives/objetivo-rejuvenecer-rostro.jpg";
import logoGrupoMer from "@/assets/brand/logo-grupo-mer-mark.webp";
import { SiteNav } from "@/components/SiteNav";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { CtaButton } from "@/components/CtaButton";
import { Reveal } from "@/components/Reveal";
import { BeforeAfter } from "@/components/BeforeAfter";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { VideoScrubHero } from "@/components/VideoScrubHero";
import { FacePlanSection } from "@/components/FacePlanSection";
import { FeaturedResultCase } from "@/components/FeaturedResultCase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  objectives,
  type Objective,
} from "@/data/treatments";
import { resultCases } from "@/data/results";
import { WHATSAPP_CATALOG_URL, WHATSAPP_DISPLAY, waLink } from "@/lib/whatsapp";
import { scrollToSection } from "@/lib/scroll";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dra. Luisa Cedeño | Medicina Estética Regenerativa" },
      {
        name: "description",
        content:
          "Medicina estética regenerativa con valoración médica previa. Tratamientos faciales, capilares y corporales en Montevideo y Maldonado.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const credentials = [
  "Doctora en Medicina",
  "Médica Cirujana",
  "Medicina Estética Facial y Capilar",
  "Interpretación Oligoscan",
];

const doctorMethod = [
  "Primero se evalúan antecedentes, anatomía, objetivo y expectativas reales del paciente.",
  "La indicación se define con criterio médico: qué conviene hacer, qué esperar y qué no forzar.",
  "Los tratamientos se planifican por etapas cuando la piel, el rostro o el cabello necesitan evolución.",
  "Después del procedimiento se dan cuidados claros y se acompaña el resultado.",
];

const objectiveGuides: Record<Objective, { title: string; text: string }> = {
  "Rejuvenecer rostro": {
    title: "Rostro más descansado",
    text: "Opciones para suavizar gestos, recuperar soporte o mejorar frescura sin perder expresión.",
  },
  "Mejorar calidad de piel": {
    title: "Piel con mejor textura",
    text: "Tratamientos pensados para hidratación, luminosidad, firmeza o renovación progresiva.",
  },
  "Armonización facial": {
    title: "Rasgos más armónicos",
    text: "Procedimientos que trabajan proporciones del rostro con cantidades medidas y criterio médico.",
  },
  Flacidez: {
    title: "Más sostén y firmeza",
    text: "Alternativas para estimular colágeno, tensar o acompañar cambios progresivos de la piel.",
  },
  Manchas: {
    title: "Tono más uniforme",
    text: "Opciones para abordar manchas, melasma o textura irregular después de evaluar la piel.",
  },
  Acné: {
    title: "Marcas y textura de acné",
    text: "Tratamientos orientados a renovar la piel y mejorar marcas superficiales de forma controlada.",
  },
  Corporal: {
    title: "Calidad de piel corporal",
    text: "Planes para zonas corporales donde se busca firmeza, textura o armonización.",
  },
  Capilar: {
    title: "Caída y densidad capilar",
    text: "Evaluación médica para entender la causa y definir un plan de estímulo capilar.",
  },
};

type ObjectivePreview = {
  image: string;
  alt: string;
  caption: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
};

const objectivePreviews: Record<Objective, ObjectivePreview> = {
  "Rejuvenecer rostro": {
    image: objetivoRejuvenecerRostro,
    alt: "Retrato editorial de rejuvenecimiento facial",
    caption: "Rostro descansado",
  },
  "Mejorar calidad de piel": {
    image: objetivoCalidadPiel,
    alt: "Detalle editorial de calidad de piel",
    caption: "Textura y luminosidad",
  },
  "Armonización facial": {
    image: objetivoArmonizacionFacial,
    alt: "Perfil editorial de armonización facial",
    caption: "Proporción facial",
  },
  Flacidez: {
    image: objetivoFlacidez,
    alt: "Detalle editorial de firmeza facial y cuello",
    caption: "Firmeza y sostén",
  },
  Manchas: {
    image: objetivoManchas,
    alt: "Detalle editorial de manchas y tono de piel",
    caption: "Tono irregular",
  },
  Acné: {
    image: objetivoAcne,
    alt: "Detalle editorial de piel con acné leve",
    caption: "Acné activo",
  },
  Corporal: {
    image: objetivoCorporal,
    alt: "Detalle editorial de piel corporal",
    caption: "Piel corporal",
  },
  Capilar: {
    image: objetivoCapilar,
    alt: "Detalle editorial de cuero cabelludo y salud capilar",
    caption: "Salud capilar",
  },
};

const promos = [
  {
    title: "Botox 3 zonas + NCTF o PDRN de salmón",
    price: "599",
    currency: "USD",
    detail: "Valoración previa, indicación médica y seguimiento de la evolución.",
  },
  {
    title: "Promo 8 zonas NCTF o PDRN",
    price: "599",
    currency: "USD",
    detail: "Para trabajar hidratación, textura y luminosidad con un plan por etapas.",
  },
];

const sedes = [
  {
    city: "Montevideo",
    note: "Atención con cita previa. La dirección exacta se confirma al coordinar por WhatsApp.",
    schedule: "Agenda coordinada por WhatsApp",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Dra.%20Luisa%20Cede%C3%B1o%20Medicina%20Est%C3%A9tica%20Montevideo",
  },
  {
    city: "Maldonado",
    note: "Cupos por semana según agenda. La sede se confirma al reservar la valoración.",
    schedule: "Cupos definidos por semana",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Dra.%20Luisa%20Cede%C3%B1o%20Medicina%20Est%C3%A9tica%20Maldonado",
  },
];

const mapEmbedUrl =
  "https://www.google.com/maps?q=Dra.%20Luisa%20Cede%C3%B1o%20Medicina%20Est%C3%A9tica%20Montevideo%20Maldonado%20Uruguay&output=embed";
const instagramUrl = "https://www.instagram.com/medicinaesteticauruguay/";

const testimonials = [
  {
    quote:
      "Siempre veo sus estados y quedo maravillada por el profesionalismo y la dedicación que dan a sus pacientes.",
    label: "Profesionalismo y dedicación",
    source: "Mensaje de paciente",
    theme: "Profesionalismo",
  },
  {
    quote:
      "Gracias por siempre tener ese gran corazón. Son unos genios y llegarán muy lejos por los seres que son en primera instancia.",
    label: "Calidez en la atención",
    source: "WhatsApp",
    theme: "Calidez",
  },
  {
    quote:
      "Gracias a los doctores por el compromiso. Los resultados están a la vista y los recomiendo 100%.",
    label: "Resultados visibles",
    source: "Instagram",
    theme: "Resultado visible",
  },
  {
    quote:
      "Gracias, quería compartir con ustedes. Es muy gratificante ver los logros.",
    label: "Evolución compartida",
    source: "WhatsApp",
    theme: "Evolución",
  },
  {
    quote:
      "Me devolvieron mi autoestima y la seguridad. Siempre obtuve los mejores resultados, superando todas mis expectativas.",
    label: "Confianza recuperada",
    source: "WhatsApp",
    theme: "Confianza",
  },
  {
    quote:
      "Excelente atención y dedicación. Atienden los dos profesionales personalmente.",
    label: "Atención personalizada",
    source: "Instagram",
    theme: "Atención personalizada",
  },
];

const faqs = [
  {
    q: "¿Necesito valoración previa?",
    a: "Sí. Primero se evalúa tu caso, tus antecedentes y el objetivo real del tratamiento.",
  },
  {
    q: "¿Los resultados son inmediatos?",
    a: "Algunos cambios se ven rápido. Otros, como bioestimuladores o tratamientos capilares, avanzan de forma progresiva.",
  },
  {
    q: "¿Cuándo puedo retomar mis actividades?",
    a: "Depende del procedimiento. En muchos casos se vuelve a la rutina el mismo día con indicaciones claras.",
  },
  {
    q: "¿Cómo reservo?",
    a: "Escribís por WhatsApp, contás qué querés mejorar y coordinamos sede, día y valoración.",
  },
  {
    q: "¿Puedo consultar si no sé qué tratamiento necesito?",
    a: "Sí. Podés escribir contando qué querés mejorar y en la valoración se define si corresponde Botox, relleno, piel, capilar, corporal u otra opción.",
  },
  {
    q: "¿Cuándo se confirma el precio final?",
    a: "El valor final se confirma después de evaluar zona, objetivo, cantidad de producto o sesiones necesarias y sede de atención.",
  },
  {
    q: "¿Qué conviene enviar por WhatsApp antes de agendar?",
    a: "Una descripción breve de lo que querés mejorar, ciudad de preferencia y, si te sentís cómoda, una foto clara de la zona para orientar mejor la consulta.",
  },
];

function Index() {
  const [activeObjective, setActiveObjective] = useState<Objective>(objectives[0]);
  const [activeCase, setActiveCase] = useState(0);
  const currentCase = resultCases[activeCase];
  const [hoveredObjective, setHoveredObjective] = useState<Objective | null>(null);
  const [hoverPoint, setHoverPoint] = useState({ x: 0, y: 0 });
  const selectedObjectiveCardRef = useRef<HTMLDivElement>(null);
  const activeObjectiveGuide = objectiveGuides[activeObjective];
  const selectedObjectivePreview = objectivePreviews[activeObjective];
  const hoverObjectivePreview = objectivePreviews[hoveredObjective ?? activeObjective];
  const selectObjective = (objective: Objective) => {
    setActiveObjective(objective);

    if (typeof window !== "undefined" && window.innerWidth < 480) {
      window.requestAnimationFrame(() => {
        selectedObjectiveCardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  };
  const handleObjectiveMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoverPoint({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <div className="bg-background text-foreground">
      <SiteNav />
      <FloatingWhatsApp />

      <main>
        {/* ─── Hero — video scrub ──────────────────────────────────── */}
        <VideoScrubHero />

        {/* ─── Doctora ─────────────────────────────────────────────── */}
        <section
          id="dra"
          className="scroll-mt-24 border-y border-border bg-card py-14 md:py-20 lg:py-24"
        >
          <div className="mx-auto grid max-w-[1320px] gap-x-14 gap-y-8 px-6 md:px-10 lg:grid-cols-[0.78fr_1.22fr]">
            <Reveal className="lg:col-start-2 lg:row-start-1">
              <p className="font-mono text-[0.62rem] font-medium uppercase tracking-widest text-terra">
                Dra. Luisa Cedeño
              </p>
              <h2 className="mt-4 max-w-[15ch] font-serif text-[clamp(2.7rem,5vw,5.25rem)] leading-[0.93] text-foreground">
                Medicina estética con criterio y naturalidad.
              </h2>
            </Reveal>

            <Reveal className="lg:col-start-1 lg:row-span-4 lg:row-start-1">
              <figure className="mx-auto w-full max-w-[470px] lg:sticky lg:top-28">
                <div className="aspect-[4/5] overflow-hidden rounded-[20px] border border-border bg-background">
                  <img
                    src={doctorImg}
                    alt="Dra. Luisa Cedeño en consulta"
                    width={1200}
                    height={1400}
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <figcaption className="flex items-center justify-between border-b border-border py-4 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                  <span>Doctora en Medicina</span>
                  <span>Montevideo · Maldonado</span>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal className="lg:col-start-2 lg:row-start-2">
              <div className="max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                <p>
                  La Dra. Luisa Cedeño trabaja desde una valoración médica previa, con foco en
                  resultados naturales y en tratamientos que tengan sentido para cada paciente.
                </p>
                <p>
                  La consulta ordena objetivos, antecedentes y expectativas antes de indicar Botox,
                  rellenos, bioestimulación, piel o medicina capilar. La prioridad no es hacer más:
                  es indicar mejor.
                </p>
              </div>
            </Reveal>

            <Reveal className="lg:col-start-2 lg:row-start-3">
              <div className="border-t border-border pt-6">
                <div className="flex items-end justify-between gap-4">
                  <h3 className="text-lg font-semibold text-foreground">Formación y perfil médico</h3>
                  <span className="hidden font-mono text-[0.6rem] uppercase tracking-widest text-terra sm:block">
                    Atención personalizada
                  </span>
                </div>
                <div className="mt-5 grid border-t border-border sm:grid-cols-2">
                  {credentials.map((item, index) => (
                    <div
                      key={item}
                      className={`flex gap-3 border-b border-border py-4 sm:min-h-[82px] ${
                        index % 2 === 0 ? "sm:pr-5" : "sm:border-l sm:pl-5"
                      }`}
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-terra" />
                      <span className="text-sm font-medium leading-relaxed text-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:col-start-2 lg:row-start-4">
              <div className="border-t border-border pt-6">
                <p className="font-mono text-[0.62rem] font-medium uppercase tracking-widest text-terra">
                  Su manera de trabajar
                </p>
                <div className="mt-5 grid gap-x-8 gap-y-4 md:grid-cols-2">
                  {doctorMethod.map((item, index) => (
                    <p
                      key={item}
                      className="grid grid-cols-[28px_1fr] gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="font-serif text-xl leading-none text-terra">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── Plan de tratamiento — transformación por scroll ────────── */}
        <FacePlanSection />

        {/* ─── Tratamientos ────────────────────────────────────────── */}
        <section
          id="tratamientos"
          className="scroll-mt-24 border-y border-border bg-card py-16 md:py-24 lg:py-28"
        >
          <div className="mx-auto max-w-[1320px] px-6 md:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
              <Reveal>
                <span className="font-mono text-[0.6rem] font-medium uppercase tracking-widest text-terra">
                  Tratamientos
                </span>
                <h2 className="mt-5 max-w-[11ch] font-serif text-[clamp(3rem,6vw,6.7rem)] leading-[0.9] text-foreground">
                  ¿Qué querés mejorar?
                </h2>
              </Reveal>

              <Reveal delay={80}>
                <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  Tocá la necesidad que más se parece a lo que querés mejorar. Desde ahí podés
                  escribir directo para una valoración.
                </p>
              </Reveal>
            </div>

            <Reveal className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-12">
              <div
                onMouseMove={handleObjectiveMouseMove}
                onMouseLeave={() => setHoveredObjective(null)}
                className="relative -mx-6 flex gap-2 overflow-x-auto border-y border-border px-6 py-3 [scrollbar-width:none] min-[480px]:mx-0 min-[480px]:block min-[480px]:divide-y min-[480px]:px-0 min-[480px]:py-0"
              >
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-0 top-0 z-20 hidden w-52 overflow-hidden rounded-[20px] border border-background bg-background shadow-[0_24px_70px_rgba(20,40,55,0.24)] transition-opacity duration-200 lg:block ${
                    hoveredObjective && hoveredObjective !== activeObjective ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    transform: `translate(${hoverPoint.x + 34}px, ${hoverPoint.y - 24}px) rotate(3deg)`,
                  }}
                >
                  <div className="aspect-[4/3] bg-card">
                    <img
                      src={hoverObjectivePreview.image}
                      alt=""
                      loading="lazy"
                      className={`h-full w-full ${
                        hoverObjectivePreview.objectFit === "contain" ? "object-contain" : "object-cover"
                      }`}
                      style={{ objectPosition: hoverObjectivePreview.objectPosition ?? "center" }}
                    />
                  </div>
                </div>

                {objectives.map((obj) => {
                  const isActive = activeObjective === obj;

                  return (
                    <button
                      key={obj}
                      type="button"
                      onClick={() => selectObjective(obj)}
                      onMouseEnter={() => setHoveredObjective(obj)}
                      aria-pressed={isActive}
                      className={`group flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-left transition-all min-[480px]:w-full min-[480px]:justify-between min-[480px]:gap-5 min-[480px]:rounded-none min-[480px]:border-0 min-[480px]:px-0 min-[480px]:py-5 ${
                        isActive
                          ? "border-terra/40 bg-terra/10 text-terra min-[480px]:bg-transparent min-[480px]:pl-5"
                          : "border-border bg-background text-foreground hover:text-terra min-[480px]:bg-transparent min-[480px]:hover:pl-2"
                      }`}
                    >
                      <span className="whitespace-nowrap text-sm font-medium leading-tight min-[480px]:font-serif min-[480px]:text-3xl min-[480px]:font-normal">
                        {obj}
                      </span>
                      <ArrowRight
                        className={`hidden h-5 w-5 shrink-0 transition-transform min-[480px]:block ${
                          isActive ? "translate-x-0 text-terra" : "text-muted-foreground group-hover:translate-x-1"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <div
                ref={selectedObjectiveCardRef}
                className="scroll-mt-24 overflow-hidden rounded-[28px] border border-border bg-background shadow-[0_20px_70px_rgba(20,40,55,0.06)] lg:sticky lg:top-28 lg:self-start"
              >
                <div className="aspect-[4/3] border-b border-border bg-card">
                  <img
                    src={selectedObjectivePreview.image}
                    alt={selectedObjectivePreview.alt}
                    loading="lazy"
                    className={`h-full w-full ${
                      selectedObjectivePreview.objectFit === "contain" ? "object-contain" : "object-cover"
                    }`}
                    style={{ objectPosition: selectedObjectivePreview.objectPosition ?? "center" }}
                  />
                </div>

                <div className="p-7 md:p-10">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-[0.62rem] font-medium uppercase tracking-widest text-muted-foreground">
                      Objetivo seleccionado
                    </p>
                    <span className="font-mono text-[0.58rem] uppercase tracking-widest text-terra">
                      {selectedObjectivePreview.caption}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-4xl leading-none text-foreground md:text-5xl">
                    {activeObjectiveGuide.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                    {activeObjectiveGuide.text}
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <CtaButton treatment={activeObjective} variant="secondary">
                      Consultar por {activeObjective}
                      <ArrowRight className="h-4 w-4" />
                    </CtaButton>
                    <a
                      href={WHATSAPP_CATALOG_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Ver catálogo completo
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <p className="mt-4 max-w-lg text-xs leading-relaxed text-muted-foreground">
                    El catálogo muestra procedimientos puntuales; la indicación final se define en
                    valoración médica.
                  </p>
                </div>
              </div>
            </Reveal>

          </div>
        </section>

        <FeaturedResultCase />

        {/* ─── Resultados ──────────────────────────────────────────── */}
        <section className="py-16 md:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <Reveal>
                <span className="font-mono text-[0.6rem] font-medium uppercase tracking-widest text-muted-foreground">
                  Más resultados
                </span>
                <h2
                  className="mt-5 font-serif leading-tight text-foreground"
                  style={{ fontSize: "clamp(2rem,4vw,3.25rem)" }}
                >
                  Otros casos, distintas necesidades.
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                  El objetivo no es borrar la expresión. Es mejorar proporción, textura o descanso
                  facial sin perder naturalidad.
                </p>

                <div className="mt-8 flex flex-col gap-px overflow-hidden rounded-lg border border-border">
                  {resultCases.map((c, i) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveCase(i)}
                      className={`flex items-center justify-between gap-3 px-4 py-3 text-left transition-colors ${
                        i === activeCase
                          ? "bg-primary text-primary-foreground"
                          : "bg-background hover:bg-card"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`font-mono text-[0.6rem] ${i === activeCase ? "text-primary-foreground/60" : "text-muted-foreground"}`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-medium">{c.label}</span>
                      </span>
                      <span
                        className={`font-mono text-[0.55rem] uppercase tracking-wider ${
                          i === activeCase ? "text-primary-foreground/60" : "text-muted-foreground/70"
                        }`}
                      >
                        {c.category}
                      </span>
                    </button>
                  ))}
                </div>

                <p className="mt-6 border-l-2 border-terra/40 pl-4 text-xs leading-relaxed text-muted-foreground">
                  Los resultados pueden variar según cada paciente y requieren valoración
                  profesional.
                </p>
                <div className="mt-8">
                  <CtaButton treatment={currentCase.label} variant="secondary">
                    Consultar un caso similar
                    <ArrowRight className="h-4 w-4" />
                  </CtaButton>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="mx-auto max-w-md">
                  <BeforeAfter
                    key={currentCase.id}
                    beforeSrc={currentCase.before}
                    afterSrc={currentCase.after}
                    alt={currentCase.label}
                  />
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    <span className="font-medium text-foreground">{currentCase.label}.</span>{" "}
                    {currentCase.note}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─── Testimonios ──────────────────────────────────────────── */}
        <section
          id="testimonios"
          className="scroll-mt-24 border-y border-border bg-background py-16 md:py-24"
        >
          <div className="mx-auto max-w-[1320px] px-6 md:px-10">
            <div className="grid gap-8 border-b border-border pb-10 md:pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <Reveal>
                <span className="font-mono text-[0.6rem] font-medium uppercase tracking-widest text-muted-foreground">
                  Experiencias de pacientes
                </span>
                <h2 className="mt-4 max-w-4xl font-serif text-[clamp(2.7rem,5vw,5.4rem)] leading-[0.92] text-foreground">
                  La experiencia, contada por pacientes.
                </h2>
              </Reveal>

              <Reveal delay={80}>
                <p className="max-w-xl text-base leading-relaxed text-muted-foreground lg:ml-auto">
                  Mensajes recibidos después de tratamientos faciales, capilares y de piel,
                  editados para leerse claro sin mostrar datos personales.
                </p>
              </Reveal>
            </div>

            <Reveal>
              <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
                {testimonials.map((item, index) => (
                  <article
                    key={item.quote}
                    className="flex min-h-[360px] min-w-[82vw] snap-start flex-col rounded-[24px] border border-border bg-card p-6 md:min-w-[420px] md:p-8 lg:min-w-[460px]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-[0.58rem] uppercase tracking-widest text-terra">
                        {item.theme}
                      </span>
                      <span className="font-mono text-[0.58rem] uppercase tracking-widest text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <Quote className="mt-8 h-7 w-7 text-terra/35" />
                    <blockquote className="mt-5 flex-1 font-serif text-[clamp(1.9rem,3vw,2.9rem)] leading-[1.08] text-foreground">
                      {item.quote}
                    </blockquote>

                    <footer className="mt-8 border-t border-border pt-5">
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                    </footer>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="promociones"
          className="scroll-mt-24 bg-primary py-20 text-primary-foreground md:py-28 lg:py-36"
        >
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <Reveal>
              <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
                <div>
                  <h2
                    className="font-serif leading-tight text-primary-foreground"
                    style={{ fontSize: "clamp(2rem,4vw,3.25rem)" }}
                  >
                    Promociones vigentes. Consultá disponibilidad antes de reservar.
                  </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {promos.map((promo) => (
                    <article
                      key={promo.title}
                      className="flex flex-col rounded-xl border border-primary-foreground/15 bg-primary-foreground/8 p-6"
                    >
                      <p className="font-mono text-[0.6rem] font-medium uppercase tracking-widest text-primary-foreground/50">
                        {promo.title}
                      </p>
                      <p className="mt-4 font-serif leading-none text-primary-foreground" style={{ fontSize: "clamp(3.5rem,7vw,5.5rem)" }}>
                        {promo.price}
                        <span className="ml-1 text-2xl font-light">{promo.currency}</span>
                      </p>
                      <p className="mt-4 flex-1 text-base leading-relaxed text-primary-foreground/60">
                        {promo.detail}
                      </p>
                      <div className="mt-6">
                        <CtaButton treatment={promo.title} variant="heroWhite">
                          Consultar promo
                        </CtaButton>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── Sedes ───────────────────────────────────────────────── */}
        <section id="sedes" className="scroll-mt-24 py-20 md:py-28 lg:py-36">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <Reveal>
                <span className="font-mono text-[0.6rem] font-medium uppercase tracking-widest text-muted-foreground">
                  Sedes y agenda
                </span>
                <h2
                  className="mt-5 font-serif leading-tight text-foreground"
                  style={{ fontSize: "clamp(2rem,4vw,3.25rem)" }}
                >
                  Dos ciudades, una misma forma de atender.
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                  La agenda se coordina por WhatsApp para confirmar ciudad, disponibilidad y datos
                  finales de la valoración.
                </p>

                <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border">
                  {sedes.map((sede) => (
                    <article key={sede.city} className="bg-background p-6">
                      <div className="flex items-start gap-4">
                        <MapPin className="mt-1 h-5 w-5 shrink-0 text-terra" />
                        <div>
                          <h3 className="font-serif text-3xl leading-tight text-foreground">
                            {sede.city}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {sede.note}
                          </p>
                          <p className="mt-3 flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                            <Clock className="h-3.5 w-3.5 text-terra" />
                            {sede.schedule}
                          </p>
                          <div className="mt-5 flex flex-wrap gap-3">
                            <CtaButton variant="secondary" treatment={`tratamiento en ${sede.city}`}>
                              Agendar en {sede.city}
                            </CtaButton>
                            <a
                              href={sede.mapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                              Ver zona
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_18px_60px_rgba(22,80,58,0.08)]">
                  <iframe
                    title="Mapa de atención Dra. Luisa Cedeño"
                    src={mapEmbedUrl}
                    className="h-[360px] w-full md:h-[520px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="border-t border-border bg-background p-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Las direcciones exactas se confirman al reservar para evitar confusiones de
                      agenda entre Montevideo y Maldonado.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─────────────────────────────────────────────────── */}
        <section
          id="faq"
          className="scroll-mt-24 border-y border-border bg-card py-20 md:py-28"
        >
          <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[0.7fr_1.3fr]">
            <Reveal>
              <h2
                className="font-serif leading-tight text-foreground"
                style={{ fontSize: "clamp(2rem,4vw,3.25rem)" }}
              >
                Preguntas frecuentes
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Lo básico antes de escribir.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <Accordion type="single" collapsible className="divide-y divide-border border-y border-border">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.q} value={faq.q} className="border-0">
                    <AccordionTrigger className="py-5 text-left text-sm font-medium text-foreground hover:no-underline [&>svg]:text-terra">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>

        {/* ─── Contacto ────────────────────────────────────────────── */}
        <section id="contacto" className="scroll-mt-24 py-24 md:py-36">
          <div className="mx-auto max-w-5xl px-6 md:px-10">
            <Reveal>
              <div className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground md:px-12 md:py-16">
                <p className="font-mono text-[0.62rem] font-medium uppercase tracking-widest text-primary-foreground/55">
                  Primera orientación por WhatsApp
                </p>
                <h2
                  className="mx-auto mt-5 max-w-3xl font-serif leading-tight text-primary-foreground"
                  style={{ fontSize: "clamp(2.25rem,5vw,4.5rem)" }}
                >
                  Contanos qué querés mejorar y en qué ciudad te queda mejor.
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/65">
                  Te respondemos para orientar tratamiento, sede y próximo cupo de valoración.
                </p>
                <div className="mt-10 flex flex-col items-center gap-4">
                  <CtaButton className="px-10 py-4 text-base" variant="heroWhite">
                    <WhatsAppIcon className="h-5 w-5" />
                    Agendar valoración
                  </CtaButton>
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-primary-foreground/60 hover:text-primary-foreground"
                  >
                    {WHATSAPP_DISPLAY}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] md:px-10 md:py-16">
          <div>
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white p-2">
              <img
                src={logoGrupoMer}
                alt="Grupo MER"
                className="h-full w-full object-contain"
                draggable={false}
              />
            </span>
            <p className="font-serif text-3xl leading-tight text-primary-foreground">
              Dra. Luisa Cedeño
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-primary-foreground/60">
              Medicina estética regenerativa facial, capilar y corporal con valoración médica
              previa en Montevideo y Maldonado.
            </p>
          </div>

          <nav aria-label="Navegación de pie de página">
            <p className="font-mono text-[0.6rem] font-medium uppercase tracking-widest text-primary-foreground/45">
              Navegación
            </p>
            <div className="mt-4 grid gap-2 text-sm text-primary-foreground/65">
              {[
                ["dra", "Dra. Luisa"],
                ["tratamientos", "Tratamientos"],
                ["resultados", "Resultados"],
                ["testimonios", "Testimonios"],
                ["sedes", "Sedes"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className="text-left hover:text-primary-foreground"
                >
                  {label}
                </button>
              ))}
            </div>
          </nav>

          <div>
            <p className="font-mono text-[0.6rem] font-medium uppercase tracking-widest text-primary-foreground/45">
              Agenda
            </p>
            <div className="mt-4 grid gap-2 text-sm text-primary-foreground/65">
              <p>Montevideo</p>
              <p>Maldonado</p>
              <p>Atención con cita previa</p>
            </div>
          </div>

          <div>
            <p className="font-mono text-[0.6rem] font-medium uppercase tracking-widest text-primary-foreground/45">
              Contacto
            </p>
            <div className="mt-4 grid gap-3 text-sm text-primary-foreground/65">
              <a className="hover:text-primary-foreground" href={waLink()} target="_blank" rel="noopener noreferrer">
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
              <a className="inline-flex items-center gap-2 hover:text-primary-foreground" href={instagramUrl} target="_blank" rel="noopener noreferrer">
                Instagram
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/12">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs leading-relaxed text-primary-foreground/45 md:flex-row md:items-end md:justify-between md:px-10">
            <p>© {new Date().getFullYear()} Dra. Luisa Cedeño. Todos los derechos reservados.</p>
            <p className="max-w-xl md:text-right">
              La información del sitio es orientativa, no reemplaza una valoración médica y los
              resultados pueden variar según cada paciente.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
