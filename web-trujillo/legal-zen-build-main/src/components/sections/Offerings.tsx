import { useEffect, useRef, useState } from "react";
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
            <span className="font-semibold text-foreground">5.0</span> · Más de 125 reseñas en Google
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

/* ---------------- Notarial services (ink block, editorial rows) ---------------- */
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
            Desde la compraventa de una casa hasta la constitución de una sociedad,
            cada trámite con su etapa documentada y seguimiento completo.
          </p>
        </Reveal>

        <ul className="mx-auto mt-14 max-w-3xl border-t border-white/12">
          {notaryServices.map(({ t, d }, i) => (
            <li key={t} className="border-b border-white/12">
              <a
                href={waLink(WA1, `Hola, quisiera hacer una consulta sobre ${t.toLowerCase()}.`)}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col gap-1 px-3 py-5 transition-colors duration-300 hover:bg-background sm:flex-row sm:items-baseline sm:gap-5 sm:px-5"
              >
                <span className="flex items-baseline gap-4">
                  <span className="w-6 shrink-0 text-xs tabular-nums text-gold/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl font-medium text-white transition-colors duration-300 group-hover:text-foreground md:text-2xl">
                    {t}
                  </span>
                </span>
                <span className="pl-10 text-sm text-white/45 transition-colors duration-300 group-hover:text-muted-foreground sm:ml-auto sm:pl-0 sm:text-right">
                  {d}
                </span>
                <ArrowRight className="hidden h-4 w-4 shrink-0 self-center text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 sm:block" />
              </a>
            </li>
          ))}
        </ul>

        <NotarySeal />

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

/**
 * Sello institucional que se "estampa" al terminar de recorrer los servicios.
 * Reveal vainilla (IntersectionObserver, sin lib de motion): opacity 0→1,
 * scale 0.9→1, rotación 4°→0 con un leve overshoot para que se sienta firme.
 * Decorativo (aria-hidden) — no interfiere con la lectura ni la navegación.
 */
function NotarySeal() {
  const ref = useRef<HTMLDivElement>(null);
  const [stamped, setStamped] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setStamped(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setStamped(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.55 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="mt-14 flex justify-center" aria-hidden="true">
      <div
        ref={ref}
        className={
          stamped
            ? "opacity-100 [transform:scale(1)_rotate(0deg)]"
            : "opacity-0 [transform:scale(0.9)_rotate(4deg)]"
        }
        style={{
          color: "color-mix(in oklab, var(--gold) 68%, var(--ink-foreground))",
          transition:
            "opacity 0.45s ease-out, transform 0.5s cubic-bezier(0.2, 1.35, 0.4, 1)",
          willChange: "opacity, transform",
        }}
      >
        <svg width="170" height="170" viewBox="0 0 200 200" role="presentation">
          <defs>
            <filter id="seal-ink" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" seed="7" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" />
            </filter>
            <filter id="seal-speckle">
              <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="3" stitchTiles="stitch" />
              <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.8 0 0 0 0" />
            </filter>
            <mask id="seal-mask">
              <rect width="200" height="200" fill="white" />
              <rect width="200" height="200" filter="url(#seal-speckle)" opacity="0.5" />
            </mask>
            <path id="seal-arc-top" d="M 24 100 A 76 76 0 0 1 176 100" fill="none" />
            <path id="seal-arc-bottom" d="M 37 100 A 63 63 0 0 0 163 100" fill="none" />
          </defs>
          <g filter="url(#seal-ink)" mask="url(#seal-mask)" fill="currentColor" stroke="currentColor">
            <circle cx="100" cy="100" r="96" fill="none" strokeWidth="2.5" />
            <circle cx="100" cy="100" r="89" fill="none" strokeWidth="1" />
            <circle cx="100" cy="100" r="57" fill="none" strokeWidth="1" />
            <text
              fontSize="11.5"
              letterSpacing="2.5"
              fontWeight="500"
              stroke="none"
              style={{ fontFamily: "var(--font-sans, Inter, sans-serif)" }}
            >
              <textPath href="#seal-arc-top" startOffset="50%" textAnchor="middle">
                ESTUDIO JURÍDICO NOTARIAL
              </textPath>
            </text>
            <text
              fontSize="10"
              letterSpacing="3"
              stroke="none"
              style={{ fontFamily: "var(--font-sans, Inter, sans-serif)" }}
            >
              <textPath href="#seal-arc-bottom" startOffset="50%" textAnchor="middle">
                MALDONADO · URUGUAY
              </textPath>
            </text>
            <circle cx="23" cy="100" r="2" stroke="none" />
            <circle cx="177" cy="100" r="2" stroke="none" />
            <text
              x="100"
              y="98"
              textAnchor="middle"
              fontSize="30"
              fontStyle="italic"
              stroke="none"
              style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
            >
              Trujillo
            </text>
            <line x1="76" y1="110" x2="124" y2="110" strokeWidth="0.75" />
            <text
              x="100"
              y="126"
              textAnchor="middle"
              fontSize="9"
              letterSpacing="2.5"
              stroke="none"
              style={{ fontFamily: "var(--font-sans, Inter, sans-serif)" }}
            >
              Y ASOCIADAS
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
