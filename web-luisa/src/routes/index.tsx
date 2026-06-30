import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, CheckCircle2, MapPin, Leaf, Activity, Clock, Shield } from "lucide-react";
import { useState } from "react";
import doctorImg from "@/assets/dra-luisa.jpg";
import { SiteNav } from "@/components/SiteNav";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { CtaButton } from "@/components/CtaButton";
import { Reveal } from "@/components/Reveal";
import { BeforeAfter } from "@/components/BeforeAfter";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { VideoScrubHero } from "@/components/VideoScrubHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { objectives, treatments, medicalNote, type Objective } from "@/data/treatments";
import { resultCases } from "@/data/results";
import { WHATSAPP_DISPLAY, waLink } from "@/lib/whatsapp";

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
  "Doctoras en Medicina",
  "Médicas Cirujanas",
  "Medicina Estética Facial y Capilar",
  "Interpretación Oligoscan",
];

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
  { city: "Montevideo", note: "Coordinación con cita previa por WhatsApp." },
  { city: "Maldonado", note: "Agenda con cupos definidos según semana." },
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
];

function Index() {
  const [activeObjective, setActiveObjective] = useState<Objective | "Todos">("Todos");
  const filtered =
    activeObjective === "Todos"
      ? treatments
      : treatments.filter((t) => t.objectives.includes(activeObjective));
  const [activeCase, setActiveCase] = useState(0);
  const currentCase = resultCases[activeCase];

  return (
    <div className="bg-background text-foreground">
      <SiteNav />
      <FloatingWhatsApp />

      <main>
        {/* ─── Hero — video scrub ──────────────────────────────────── */}
        <VideoScrubHero />

        {/* ─── Tratamiento Destacado ───────────────────────────────── */}
        <section className="bg-background border-y border-border/80 py-20 md:py-28 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
              <Reveal>
                <span className="font-mono text-[0.6rem] font-medium uppercase tracking-widest text-muted-foreground">
                  Tratamiento Destacado
                </span>
                <h2
                  className="mt-4 font-serif leading-tight text-foreground"
                  style={{ fontSize: "clamp(2.25rem, 5vw, 4.25rem)" }}
                >
                  Lifting de 8 puntos
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-xl">
                  Técnica avanzada que rejuvenece, redefine pómulos y línea mandibular, 
                  y mejora el soporte facial sin alterar tu expresión natural.
                </p>

                {/* Features Badges */}
                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="flex flex-col gap-2 rounded-lg border border-border bg-card/40 p-4 text-left">
                    <Leaf className="h-5 w-5 text-terra" />
                    <span className="text-xs font-semibold text-foreground leading-tight">Rejuvenecimiento natural</span>
                  </div>
                  <div className="flex flex-col gap-2 rounded-lg border border-border bg-card/40 p-4 text-left">
                    <Activity className="h-5 w-5 text-terra" />
                    <span className="text-xs font-semibold text-foreground leading-tight">Mayor definición</span>
                  </div>
                  <div className="flex flex-col gap-2 rounded-lg border border-border bg-card/40 p-4 text-left">
                    <Clock className="h-5 w-5 text-terra" />
                    <span className="text-xs font-semibold text-foreground leading-tight">Recuperación rápida</span>
                  </div>
                  <div className="flex flex-col gap-2 rounded-lg border border-border bg-card/40 p-4 text-left">
                    <Shield className="h-5 w-5 text-terra" />
                    <span className="text-xs font-semibold text-foreground leading-tight">Criterio médico</span>
                  </div>
                </div>

                {/* Bullet point */}
                <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-terra" />
                  <span>Ideal para rostro cansado o con pérdida de soporte.</span>
                </div>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <CtaButton treatment="Lifting de 8 puntos" variant="primary" className="w-full sm:w-auto">
                    <WhatsAppIcon className="h-4 w-4" />
                    Consultar por WhatsApp
                  </CtaButton>
                  <a
                    href="#tratamientos"
                    className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-300 border border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary w-full sm:w-auto"
                  >
                    Ver más tratamientos
                  </a>
                </div>

                {/* Bottom Trust Banner */}
                <div className="mt-10 flex items-center gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground max-w-xl">
                  <Shield className="h-4 w-4 text-terra/80 shrink-0" />
                  <span>Valoración médica personalizada • Resultados naturales • Seguridad y armonía</span>
                </div>
              </Reveal>

              <Reveal delay={100} className="w-full">
                <div className="max-w-md mx-auto lg:max-w-none">
                  <BeforeAfter
                    beforeSrc="/lifting-8p-antes.png"
                    afterSrc="/lifting-8p-despues.png"
                    alt="Lifting de 8 puntos"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─── Doctora ─────────────────────────────────────────────── */}
        <section id="dra" className="scroll-mt-24 py-20 md:py-28 lg:py-36">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              <Reveal>
                <blockquote>
                  <p
                    className="font-serif italic leading-tight text-foreground"
                    style={{ fontSize: "clamp(1.75rem,4vw,3.5rem)", paddingBottom: "0.15em" }}
                  >
                    "No se trata de cambiar rasgos. Se trata de indicar solo lo que corresponde."
                  </p>
                  <cite className="mt-5 block font-mono text-[0.62rem] font-medium uppercase not-italic tracking-widest text-muted-foreground">
                    Dra. Luisa Cedeño
                  </cite>
                </blockquote>

                <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
                  Cada tratamiento parte de una valoración médica. La prioridad es cuidar tu salud,
                  sostener la naturalidad y elegir procedimientos que tengan sentido para tu caso.
                </p>

                <ul className="mt-8 flex flex-col gap-2">
                  {credentials.map((c) => (
                    <li
                      key={c}
                      className="flex items-center gap-3 text-base text-muted-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-terra" />
                      {c}
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <CtaButton variant="secondary">
                    <CalendarCheck className="h-4 w-4" />
                    Coordinar consulta
                  </CtaButton>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="relative">
                  <img
                    src={doctorImg}
                    alt="Dra. Luisa Cedeño en consulta"
                    width={1200}
                    height={1400}
                    loading="lazy"
                    className="aspect-[4/5] w-full rounded-xl border border-border object-cover object-top"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─── Tratamientos ────────────────────────────────────────── */}
        <section
          id="tratamientos"
          className="scroll-mt-24 border-y border-border bg-card py-20 md:py-28 lg:py-36"
        >
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <Reveal className="max-w-3xl">
              <span className="font-mono text-[0.6rem] font-medium uppercase tracking-widest text-muted-foreground">
                Tratamientos
              </span>
              <h2
                className="mt-5 font-serif leading-tight text-foreground"
                style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}
              >
                Tratamientos personalizados para realzar tu belleza natural
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Cada rostro y cada piel necesitan una evaluación diferente. Por eso, los
                tratamientos se indican de forma personalizada, buscando resultados naturales,
                seguros y armónicos.
              </p>
            </Reveal>

            <Reveal className="mt-10 flex flex-wrap gap-2">
              {(["Todos", ...objectives] as const).map((obj) => (
                <button
                  key={obj}
                  onClick={() => setActiveObjective(obj)}
                  className={`rounded-full px-4 py-2 font-mono text-[0.7rem] font-medium uppercase tracking-wider transition-colors ${
                    activeObjective === obj
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {obj}
                </button>
              ))}
            </Reveal>

            <div className="mt-12">
              <Accordion
                type="single"
                collapsible
                className="divide-y divide-border border-y border-border"
              >
                {filtered.map((treatment, index) => (
                  <AccordionItem
                    key={treatment.name}
                    value={treatment.name}
                    className="border-0"
                  >
                    <div className="group/item grid gap-x-8 py-6 md:grid-cols-[auto_1fr] md:py-8">
                      <span
                        className="mb-4 hidden font-serif text-5xl font-light leading-none text-border transition-colors group-hover/item:text-muted-foreground md:block"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0">
                        <AccordionTrigger className="group w-full py-0 text-left hover:no-underline [&>svg]:hidden">
                          <div className="flex w-full items-start gap-4">
                            <div className="min-w-0 flex-1">
                              <span className="inline-flex items-center rounded-md border border-terra/30 bg-terra/10 px-2 py-0.5 font-mono text-[0.6rem] font-medium uppercase tracking-wider text-terra">
                                {treatment.category}
                              </span>
                              <p className="mt-3 font-serif text-2xl leading-tight text-foreground md:text-3xl">
                                {treatment.name}
                              </p>
                              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                                {treatment.short}
                              </p>
                            </div>
                            <span
                              className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-foreground"
                              aria-hidden="true"
                            >
                              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-90" />
                            </span>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="pt-2">
                          <dl className="mt-5 grid gap-5 border-t border-border/60 pt-5 sm:grid-cols-3">
                            {[
                              { label: "Ideal para", value: treatment.idealFor },
                              { label: "Zonas", value: treatment.zones },
                              { label: "Objetivo", value: treatment.objective },
                            ].map((fact) => (
                              <div key={fact.label}>
                                <dt className="font-mono text-[0.6rem] font-medium uppercase tracking-widest text-muted-foreground/70">
                                  {fact.label}
                                </dt>
                                <dd className="mt-1.5 text-sm leading-relaxed text-foreground">
                                  {fact.value}
                                </dd>
                              </div>
                            ))}
                          </dl>

                          <div className="mt-7 grid gap-x-10 gap-y-6 border-t border-border/60 pt-7 sm:grid-cols-2">
                            {[
                              { label: "Qué mejora", value: treatment.improves },
                              { label: "Para quién está recomendado", value: treatment.recommendedFor },
                              { label: "Zonas frecuentes", value: treatment.frequentZones },
                              { label: "Cómo se define el tratamiento", value: treatment.howDefined },
                            ].map((block) => (
                              <div key={block.label}>
                                <p className="font-mono text-[0.6rem] font-medium uppercase tracking-widest text-terra">
                                  {block.label}
                                </p>
                                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                                  {block.value}
                                </p>
                              </div>
                            ))}
                          </div>

                          <a
                            href={waLink(treatment.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-terra"
                          >
                            <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
                            Consultar este tratamiento
                          </a>

                          <p className="mt-7 border-l-2 border-terra/40 pl-4 text-sm leading-relaxed text-muted-foreground">
                            {medicalNote}
                          </p>

                          <a
                            href={waLink(treatment.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                          >
                            <WhatsAppIcon className="h-4 w-4" />
                            Consultar si este tratamiento es para mí
                          </a>
                        </AccordionContent>
                      </div>
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ─── Resultados ──────────────────────────────────────────── */}
        <section id="resultados" className="scroll-mt-24 py-20 md:py-28 lg:py-36">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <Reveal>
                <span className="font-mono text-[0.6rem] font-medium uppercase tracking-widest text-muted-foreground">
                  Resultados
                </span>
                <h2
                  className="mt-5 font-serif leading-tight text-foreground"
                  style={{ fontSize: "clamp(2rem,4vw,3.25rem)" }}
                >
                  Cambios visibles, medidos con criterio médico.
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

        {/* ─── Promociones ─────────────────────────────────────────── */}
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
            <Reveal>
              <h2
                className="font-serif leading-tight text-foreground"
                style={{ fontSize: "clamp(2rem,4vw,3.25rem)" }}
              >
                Dos ciudades, una misma forma de atender.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
              {sedes.map((sede) => (
                <Reveal key={sede.city}>
                  <article className="flex h-full flex-col bg-background p-8 md:p-10">
                    <MapPin className="h-5 w-5 text-terra" />
                    <h3 className="mt-6 font-serif text-4xl text-foreground">{sede.city}</h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {sede.note}
                    </p>
                    <div className="mt-auto pt-8">
                      <CtaButton variant="secondary" treatment={`tratamiento en ${sede.city}`}>
                        Agendar en {sede.city}
                        <ArrowRight className="h-4 w-4" />
                      </CtaButton>
                    </div>
                  </article>
                </Reveal>
              ))}
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
          <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
            <Reveal>
              <h2
                className="mx-auto max-w-2xl font-serif leading-tight text-foreground"
                style={{ fontSize: "clamp(2.25rem,5vw,4rem)" }}
              >
                Contanos qué querés mejorar.
              </h2>
              <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                Te respondemos por WhatsApp para orientar tratamiento, sede y próximo cupo.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4">
                <CtaButton className="px-10 py-4 text-base">
                  <WhatsAppIcon className="h-5 w-5" />
                  Agendar valoración
                </CtaButton>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-muted-foreground hover:text-foreground"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 md:flex-row md:items-end md:px-10">
          <div>
            <p className="font-serif text-2xl text-foreground">Dra. Luisa Cedeño</p>
            <p className="mt-2 font-mono text-[0.6rem] font-medium uppercase tracking-widest text-muted-foreground">
              Medicina estética regenerativa
            </p>
          </div>
          <div className="flex flex-col gap-1 md:items-end">
            <p className="text-sm text-muted-foreground">Montevideo y Maldonado, Uruguay</p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-foreground transition-colors hover:text-terra"
            >
              {WHATSAPP_DISPLAY}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
