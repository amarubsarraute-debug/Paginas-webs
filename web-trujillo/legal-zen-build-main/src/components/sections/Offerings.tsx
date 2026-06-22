import { ArrowRight, Check, ChevronRight, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { services, notaryServices, WA1, waLink } from "@/data/content";

/* ---------------- Social proof band ---------------- */
export function SocialProof() {
  return (
    <section className="border-y border-border bg-surface/50">
      <div className="container-page flex flex-col items-center gap-5 py-7 text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-9">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-gold text-gold" />
            ))}
          </span>
          <span>
            <span className="font-semibold text-foreground">5.0</span> · 122 reseñas en Google
          </span>
        </div>
        <span className="hidden h-4 w-px bg-border sm:block" />
        <span className="font-medium text-foreground">Maldonado centro</span>
        <span className="hidden h-4 w-px bg-border sm:block" />
        <span>Lunes a viernes, hasta las 19:00</span>
      </div>
    </section>
  );
}

/* ---------------- Problem / Method ---------------- */
export function ProblemSolution() {
  return (
    <section className="container-page py-20 md:py-28">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionLabel>Tu situación</SectionLabel>
          <h2 className="mt-4 text-balance font-display text-3xl font-medium leading-tight md:text-[2.6rem]">
            Cuando un trámite o una situación legal te preocupa
          </h2>
          <ul className="mt-8 space-y-4">
            {[
              "No saber por dónde empezar ni qué documentación necesitás.",
              "El miedo a costos ocultos o a la falta de claridad en cada paso.",
              "La necesidad de rapidez, seguimiento y respuestas honestas.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-pretty text-muted-foreground">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card-elevated p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Nuestro método</p>
            <h3 className="mt-3 font-display text-2xl font-medium md:text-3xl">
              Escucha, análisis, estrategia y gestión.
            </h3>
            <p className="mt-4 text-pretty text-muted-foreground">
              Te explicamos las opciones con palabras claras, definimos el camino más
              conveniente y te acompañamos hasta el cierre del proceso.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {["Escucha activa", "Análisis honesto", "Estrategia clara", "Seguimiento constante"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-gold" />
                  {t}
                </div>
              ))}
            </div>
            <Button asChild className="mt-8">
              <a href="#contacto">
                Contanos tu caso <ArrowRight />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Legal services (editorial list) ---------------- */
export function Services() {
  return (
    <section id="servicios" className="container-page py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionLabel>Servicios jurídicos</SectionLabel>
          <h2 className="mt-4 text-balance font-display text-3xl font-medium leading-tight md:text-[2.6rem]">
            Áreas frecuentes de trabajo
          </h2>
          <p className="mt-5 max-w-md text-pretty text-muted-foreground">
            Trabajamos con foco en la claridad y la seguridad jurídica. Cada caso se
            analiza según su contexto particular.
          </p>
          <Button asChild variant="outline" className="mt-7">
            <a href="#contacto">
              Consultar por mi caso <ArrowRight />
            </a>
          </Button>
        </div>

        <ul className="border-t border-border">
          {services.map(({ icon: Icon, title, desc, bullets }) => (
            <li key={title}>
              <a
                href="#contacto"
                className="group flex gap-5 border-b border-border py-7 transition-colors hover:bg-surface/60"
              >
                <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-md border border-gold/25 bg-gold/10">
                  <Icon className="h-5 w-5 text-gold" />
                </span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl font-medium leading-snug">{title}</h3>
                    <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-gold opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </div>
                  <p className="mt-2 text-pretty text-sm text-muted-foreground">{desc}</p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                    {bullets.map((b) => (
                      <span key={b} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-gold" />
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Notarial services (ink block) ---------------- */
export function Notary() {
  return (
    <section id="escribania" className="bg-ink text-ink-foreground">
      <div className="container-page py-24 md:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/55">Nos especializamos en</p>
          <h2 className="mt-5 font-display text-5xl font-medium leading-[1.05] md:text-7xl">
            Asesoría <span className="italic font-normal text-gold">Notarial</span>
          </h2>
          <div className="mx-auto mt-6 h-px w-20 bg-white/25" />
          <p className="mx-auto mt-6 max-w-xl text-pretty text-white/70">
            Te orientamos con claridad, documentación completa y seguimiento de cada
            etapa del trámite.
          </p>
        </Reveal>

        <ul className="mx-auto mt-14 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {notaryServices.map((s) => (
            <li
              key={s.t}
              className="rounded-lg border border-white/12 bg-white/[0.03] p-5 transition-colors hover:border-gold/50 hover:bg-white/[0.06]"
            >
              <h3 className="font-display text-lg font-medium">{s.t}</h3>
              <p className="mt-1.5 text-sm text-white/55">{s.d}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-12 px-6">
            <a href="#contacto">
              Agendá tu consulta <ArrowRight />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 border-white/25 bg-white/5 px-6 text-white hover:bg-white/15 hover:text-white"
          >
            <a href={waLink(WA1, "Hola, quisiera consultar por escribanía.")} target="_blank" rel="noopener">
              <MessageCircle /> Hablar por WhatsApp
            </a>
          </Button>
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-xs text-white/45">
          La información brindada es general y no sustituye asesoramiento notarial personalizado.
        </p>
      </div>
    </section>
  );
}
