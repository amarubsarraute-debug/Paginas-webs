import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { processSteps, team, testimonials, faqs } from "@/data/content";

/* ---------------- Process ---------------- */
export function Process() {
  return (
    <section id="proceso" className="container-page py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-balance font-display text-3xl font-medium leading-tight md:text-[2.6rem]">
            Un proceso claro, sin sorpresas
          </h2>
          <p className="mt-5 max-w-md text-pretty text-muted-foreground">
            Comunicación transparente y responsable en cada paso, desde el primer
            mensaje hasta la entrega final.
          </p>
          <Button asChild className="mt-7">
            <a href="#contacto">
              Agendar consulta <ArrowRight />
            </a>
          </Button>
        </div>

        <ol className="relative ml-4 border-l border-border pl-10">
          {processSteps.map((s, i) => (
            <li key={s.n} className={i === processSteps.length - 1 ? "relative" : "relative pb-10"}>
              <span className="absolute -left-10 top-0 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full border border-border bg-background font-display text-sm text-gold">
                {s.n}
              </span>
              <h3 className="font-display text-xl font-medium leading-snug">{s.t}</h3>
              <p className="mt-2 text-pretty text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Team (real portraits) ---------------- */
export function Team() {
  return (
    <section id="equipo" className="container-page py-20 md:py-28">
      <div className="max-w-2xl">
        <SectionLabel>El equipo</SectionLabel>
        <h2 className="mt-4 text-balance font-display text-3xl font-medium leading-tight md:text-[2.6rem]">
          Profesionalismo y cercanía, con nombre y cara
        </h2>
        <p className="mt-5 text-pretty text-muted-foreground">
          Un equipo de abogadas y escribanas con experiencia, compromiso y atención cercana.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.06}>
            <figure className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-surface">
                <img
                  src={m.photo}
                  alt={`Retrato de ${m.name}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <figcaption className="mt-4">
                <h3 className="font-display text-lg font-medium">{m.name}</h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-gold">{m.role}</p>
                <p className="mt-2 text-pretty text-sm text-muted-foreground">{m.line}</p>
                {m.areas && (
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/30 pt-3">
                    {m.areas.map((area) => (
                      <span
                        key={area}
                        className="inline-flex items-center rounded bg-gold/8 px-1.5 py-0.5 text-[10px] font-medium text-gold border border-gold/15"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                )}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Testimonials (editorial columns) ---------------- */
export function Testimonials() {
  return (
    <section id="resenas" className="border-y border-border bg-surface/40 py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl text-balance font-display text-3xl font-medium leading-tight md:text-[2.6rem]">
            122 reseñas, 5.0 estrellas.
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </span>
            Opiniones reales en Google
          </div>
        </div>

        <div className="mt-12 columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5">
          {testimonials.map((r) => (
            <figure key={r.name} className="card-elevated break-inside-avoid p-6">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <h3 className="mt-4 font-display text-base font-medium">{r.title}</h3>
              <blockquote className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {r.q}
              </blockquote>
              <figcaption className="mt-4 text-xs uppercase tracking-[0.14em] text-foreground/70">
                {r.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
export function FAQ() {
  return (
    <section id="faq" className="container-page py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-balance font-display text-3xl font-medium leading-tight md:text-[2.6rem]">
            Resolvemos tus dudas antes de empezar
          </h2>
          <p className="mt-5 max-w-md text-pretty text-muted-foreground">
            Si tu pregunta no está acá, escribinos y te respondemos.
          </p>
          <Button asChild className="mt-7">
            <a href="#contacto">
              Hacer una consulta <ArrowRight />
            </a>
          </Button>
        </div>

        <Accordion type="single" collapsible className="w-full border-t border-border">
          {faqs.map((it, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="py-5 text-left font-display text-base font-medium hover:text-gold hover:no-underline md:text-lg">
                {it.q}
              </AccordionTrigger>
              <AccordionContent className="text-pretty text-muted-foreground">{it.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
