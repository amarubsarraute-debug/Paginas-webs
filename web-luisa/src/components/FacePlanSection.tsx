import { useEffect, useRef, useState } from "react";
import { useScroll, useReducedMotion } from "motion/react";
import rostroAntes from "@/assets/plan-antes.webp";
import rostroDespues from "@/assets/plan-despues.webp";
import { CtaButton } from "./CtaButton";

// Same face throughout — only focus, light and zone-masks change per stage.
// Edit the two source photos here; they must share framing and dimensions.
const ANTES = rostroAntes;
const DESPUES = rostroDespues;

const BOUNDS = [0, 0.12, 0.3, 0.48, 0.66, 0.82, 1];

type Camera = { scale: number; y: number };

const CAMERA_DESKTOP: Camera[] = [
  { scale: 1.04, y: 0 }, // intro: rostro inicial completo
  { scale: 1.15, y: 6 }, // expresión: tercio superior
  { scale: 1.13, y: -1 }, // estructura: zona media
  { scale: 1.15, y: -9 }, // armonía: tercio inferior
  { scale: 1.07, y: -2 }, // calidad de piel: plano medio
  { scale: 1.0, y: 0 }, // armonización: plano general
];

const CAMERA_MOBILE: Camera[] = [
  { scale: 1.02, y: 0 },
  { scale: 1.08, y: 4 },
  { scale: 1.07, y: 0 },
  { scale: 1.08, y: -5 },
  { scale: 1.04, y: -1 },
  { scale: 1.0, y: 0 },
];

const VEIL_DESKTOP = 0.28;
const VEIL_MOBILE = 0.24;

const STAGES = [
  {
    eyebrow: "Valoración integral",
    title: "Cada rostro necesita un plan",
    sub: "La naturalidad comienza con una valoración integral.",
  },
  {
    eyebrow: "Toxina botulínica",
    title: "Expresión",
    sub: "Frente, entrecejo y contorno de ojos.",
  },
  {
    eyebrow: "Ácido hialurónico · Bioestimulación",
    title: "Estructura",
    sub: "Pómulos, soporte medio y surcos.",
  },
  {
    eyebrow: "Perfilado labial · Mentón · Mandíbula",
    title: "Armonía",
    sub: "Equilibrio facial natural.",
  },
  {
    eyebrow: "Hidratación profunda · Bioestimulación",
    title: "Calidad de piel",
    sub: "Luminosidad, frescura y textura.",
  },
  {
    eyebrow: "Un plan integral",
    title: "Armonización facial",
    sub: "No se trata de tratar zonas aisladas, sino de comprender el rostro como un conjunto.",
    cta: true,
  },
] as const;

const PLAN_NOTE =
  "Secuencia orientativa: muestra cómo se prioriza un plan médico. El tratamiento final se define después de valorar rostro, piel y expectativas.";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}
function smooth(t: number) {
  const c = clamp01(t);
  return c * c * (3 - 2 * c);
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function FacePlanSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const zoneTopRef = useRef<HTMLDivElement>(null);
  const zoneMidRef = useRef<HTMLDivElement>(null);
  const zoneLowRef = useRef<HTMLDivElement>(null);
  const despuesRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<Array<HTMLDivElement | null>>([]);

  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (reducedMotion) return;

    let rafId = 0;
    let scheduled = false;
    let latest = 0;

    const apply = () => {
      scheduled = false;
      const p = clamp01(latest);
      const cams = isMobile ? CAMERA_MOBILE : CAMERA_DESKTOP;
      const veil = isMobile ? VEIL_MOBILE : VEIL_DESKTOP;

      // Camera: piecewise interpolation between per-stage keyframes.
      let idx = 0;
      for (let i = 0; i < BOUNDS.length - 1; i++) if (p >= BOUNDS[i]) idx = i;
      const nextIdx = Math.min(idx + 1, cams.length - 1);
      const span = BOUNDS[idx + 1] - BOUNDS[idx] || 1;
      const localT = smooth((p - BOUNDS[idx]) / span);
      const scale = lerp(cams[idx].scale, cams[nextIdx].scale, localT);
      const y = lerp(cams[idx].y, cams[nextIdx].y, localT);
      if (cameraRef.current) {
        cameraRef.current.style.transform = `scale(${scale}) translateY(${y}%)`;
      }

      // Zones: each fades in progressively over its stage
      const zoneOpacity = (a: number, b: number) => clamp01(smooth((p - a) / (b - a)));
      if (zoneTopRef.current) zoneTopRef.current.style.opacity = String(zoneOpacity(BOUNDS[1], BOUNDS[2]));
      if (zoneMidRef.current) zoneMidRef.current.style.opacity = String(zoneOpacity(BOUNDS[2], BOUNDS[3]));
      if (zoneLowRef.current) zoneLowRef.current.style.opacity = String(zoneOpacity(BOUNDS[3], BOUNDS[4]));

      // Warm veil: enters with the first treatment, releases during "Calidad de piel".
      const dimIn = clamp01(smooth((p - BOUNDS[1]) / (BOUNDS[2] - BOUNDS[1])));
      const dimOut = clamp01(smooth((p - BOUNDS[4]) / (BOUNDS[5] - BOUNDS[4])));
      if (dimRef.current) dimRef.current.style.opacity = String(dimIn * veil * (1 - dimOut));

      // Full crossfade to "después" during "Calidad de piel".
      const despuesT = clamp01(smooth((p - BOUNDS[4]) / (BOUNDS[5] - BOUNDS[4])));
      if (despuesRef.current) despuesRef.current.style.opacity = String(despuesT);

      // Soft glow on the closing stage.
      const glowT = clamp01(smooth((p - BOUNDS[5]) / (BOUNDS[6] - BOUNDS[5])));
      if (glowRef.current) glowRef.current.style.opacity = String(glowT * 0.4);

      // Text: seamless crossfade between stages with zero dead zones
      const FADE_HALF = 0.05;
      stageRefs.current.forEach((el, i) => {
        if (!el) return;
        let opacity = 0;

        if (i === 0) {
          if (p <= BOUNDS[1] - FADE_HALF) {
            opacity = 1;
          } else if (p < BOUNDS[1] + FADE_HALF) {
            const t = (p - (BOUNDS[1] - FADE_HALF)) / (2 * FADE_HALF);
            opacity = 1 - smooth(t);
          } else {
            opacity = 0;
          }
        } else if (i === STAGES.length - 1) {
          const prevB = BOUNDS[i];
          if (p <= prevB - FADE_HALF) {
            opacity = 0;
          } else if (p < prevB + FADE_HALF) {
            const t = (p - (prevB - FADE_HALF)) / (2 * FADE_HALF);
            opacity = smooth(t);
          } else {
            opacity = 1;
          }
        } else {
          const prevB = BOUNDS[i];
          const nextB = BOUNDS[i + 1];
          if (p <= prevB - FADE_HALF || p >= nextB + FADE_HALF) {
            opacity = 0;
          } else if (p < prevB + FADE_HALF) {
            const t = (p - (prevB - FADE_HALF)) / (2 * FADE_HALF);
            opacity = smooth(t);
          } else if (p <= nextB - FADE_HALF) {
            opacity = 1;
          } else {
            const t = (p - (nextB - FADE_HALF)) / (2 * FADE_HALF);
            opacity = 1 - smooth(t);
          }
        }

        const ty = (1 - opacity) * 16;
        el.style.opacity = String(opacity);
        el.style.transform = `translateY(${ty}px)`;
        el.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
      });
    };

    const unsubscribe = scrollYProgress.on("change", (v) => {
      latest = v;
      if (!scheduled) {
        scheduled = true;
        rafId = requestAnimationFrame(apply);
      }
    });

    apply();

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafId);
    };
  }, [scrollYProgress, reducedMotion, isMobile]);

  if (reducedMotion) {
    return <FacePlanStatic />;
  }

  return (
    <div ref={containerRef} className="relative h-[350vh] md:h-[450vh]">
      <div className="sticky top-0 grid h-dvh grid-rows-[54vh_1fr] overflow-hidden bg-background md:grid-cols-[58%_42%] md:grid-rows-1">
        {/* ── Imagen ── */}
        <div className="relative overflow-hidden">
          <div
            ref={cameraRef}
            className="absolute inset-0 will-change-transform"
            style={{ transformOrigin: "50% 44%", transform: "scale(1.04)" }}
          >
            <img
              src={ANTES}
              alt="Rostro de paciente al inicio de la valoración estética, piel natural sobre fondo cálido"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div ref={dimRef} className="absolute inset-0 bg-[#2e2118]" style={{ opacity: 0 }} />

            <div
              ref={zoneTopRef}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                opacity: 0,
                backgroundImage: `url(${DESPUES})`,
                WebkitMaskImage:
                  "radial-gradient(ellipse 46% 22% at 50% 35%, #000 45%, transparent 78%)",
                maskImage: "radial-gradient(ellipse 46% 22% at 50% 35%, #000 45%, transparent 78%)",
              }}
            />
            <div
              ref={zoneMidRef}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                opacity: 0,
                backgroundImage: `url(${DESPUES})`,
                WebkitMaskImage:
                  "radial-gradient(ellipse 42% 19% at 50% 51%, #000 42%, transparent 78%)",
                maskImage: "radial-gradient(ellipse 42% 19% at 50% 51%, #000 42%, transparent 78%)",
              }}
            />
            <div
              ref={zoneLowRef}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                opacity: 0,
                backgroundImage: `url(${DESPUES})`,
                WebkitMaskImage:
                  "radial-gradient(ellipse 44% 21% at 50% 64%, #000 45%, transparent 78%)",
                maskImage: "radial-gradient(ellipse 44% 21% at 50% 64%, #000 45%, transparent 78%)",
              }}
            />

            <img
              ref={despuesRef}
              src={DESPUES}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: 0 }}
            />

            <div
              ref={glowRef}
              className="absolute inset-0"
              style={{
                opacity: 0,
                background:
                  "radial-gradient(ellipse 55% 45% at 50% 44%, rgba(255,248,238,.9), transparent 72%)",
                mixBlendMode: "soft-light",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 120% at 46% 42%, transparent 58%, rgba(62,47,35,.16) 100%)",
              }}
            />
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-r from-transparent to-background md:block" />
        </div>

        {/* ── Texto ── */}
        <div className="relative flex items-start px-6 pb-8 pt-6 md:items-center md:px-14 md:py-0 lg:px-20">
          <div className="relative min-h-[34vh] w-full md:min-h-[420px]">
            {STAGES.map((s, i) => (
              <div
                key={s.title}
                ref={(el) => {
                  stageRefs.current[i] = el;
                }}
                className="absolute inset-x-0 top-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <p className="font-mono text-[0.62rem] font-medium uppercase tracking-widest text-terra">
                  {s.eyebrow}
                </p>
                <h3 className="mt-3 max-w-[15ch] font-serif text-[clamp(2.1rem,3.6vw,3.6rem)] leading-[1.05] text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-muted-foreground md:text-base">
                  {s.sub}
                </p>
                {"cta" in s && s.cta ? (
                  <div className="mt-7">
                    <CtaButton variant="primary">Agendar valoración</CtaButton>
                  </div>
                ) : null}
              </div>
            ))}

            <div className="absolute inset-x-0 bottom-0 hidden border-t border-border pt-5 md:block">
              <p className="font-mono text-[0.58rem] font-medium uppercase tracking-widest text-terra">
                Criterio médico
              </p>
              <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
                {PLAN_NOTE}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FacePlanStatic() {
  return (
    <section className="scroll-mt-24 bg-background py-16 md:py-24">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-6 md:grid-cols-2 md:items-center md:gap-14 md:px-10">
        <div className="aspect-[4/5] overflow-hidden rounded-[20px] border border-border">
          <img
            src={DESPUES}
            alt="Resultado de una valoración estética integral: expresión, estructura, armonía y calidad de piel"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="font-mono text-[0.62rem] font-medium uppercase tracking-widest text-terra">
            Un plan integral
          </p>
          <h2 className="mt-4 max-w-[14ch] font-serif text-[clamp(2.3rem,4vw,3.6rem)] leading-[1.05] text-foreground">
            Cada rostro necesita un plan
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Expresión, estructura, armonía y calidad de piel: no se trata de tratar zonas aisladas,
            sino de comprender el rostro como un conjunto.
          </p>
          <p className="mt-5 border-l-2 border-terra/40 pl-4 text-sm leading-relaxed text-muted-foreground">
            {PLAN_NOTE}
          </p>
          <div className="mt-8">
            <CtaButton variant="primary">Agendar valoración</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
