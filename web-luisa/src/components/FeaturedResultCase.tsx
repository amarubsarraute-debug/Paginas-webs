import { ArrowRight } from "lucide-react";
import beforeFrontal from "@/assets/results/featured-60/before-frontal.webp";
import beforeExpression from "@/assets/results/featured-60/before-expression.webp";
import beforeLowerFace from "@/assets/results/featured-60/before-lower-face.webp";
import beforeProfile from "@/assets/results/featured-60/before-profile.webp";
import afterFrontal from "@/assets/results/featured-60/after-frontal.webp";
import afterProfile from "@/assets/results/featured-60/after-profile.webp";
import afterThreeQuarter from "@/assets/results/featured-60/after-three-quarter.webp";
import { CtaButton } from "@/components/CtaButton";
import { Reveal } from "@/components/Reveal";

const treatments = ["Botox", "Bioestimuladores", "Relleno estratégico"];

const comparisonPairs = [
  {
    title: "Expresión",
    beforeSrc: beforeExpression,
    afterSrc: afterFrontal,
    beforeAlt: "Detalle de expresión antes del plan integral facial",
    afterAlt: "Vista frontal después del plan integral facial",
  },
  {
    title: "Tercio inferior",
    beforeSrc: beforeLowerFace,
    afterSrc: afterThreeQuarter,
    beforeAlt: "Detalle del tercio inferior antes del plan integral facial",
    afterAlt: "Vista tres cuartos después del plan integral facial",
  },
  {
    title: "Perfil",
    beforeSrc: beforeProfile,
    afterSrc: afterProfile,
    beforeAlt: "Perfil antes del plan integral facial",
    afterAlt: "Perfil después del plan integral facial",
  },
];

function ClinicalPhoto({
  src,
  alt,
  label,
  className = "",
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
}) {
  return (
    <figure className={`min-w-0 ${className}`}>
      <div className="mb-2 flex items-center justify-between border-b border-border pb-2">
        <span className="font-mono text-[0.58rem] font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-md border border-border bg-background p-2 md:p-3">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-contain"
          draggable={false}
        />
      </div>
    </figure>
  );
}

export function FeaturedResultCase() {
  return (
    <section
      id="resultados"
      className="scroll-mt-24 border-y border-border bg-background py-16 md:py-22 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="grid gap-9 lg:grid-cols-[0.58fr_1.42fr] lg:items-start lg:gap-12">
          <Reveal className="lg:sticky lg:top-28">
            <div className="border-t border-border pt-5">
              <p className="font-mono text-[0.62rem] font-medium uppercase tracking-widest text-terra">
                Caso real destacado
              </p>
              <h2 className="mt-4 max-w-[10ch] font-serif text-5xl leading-[0.95] text-foreground md:text-6xl lg:text-7xl">
                Frescura sin cambiar el rostro.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                A pocos días de cumplir 60, llegó con un objetivo simple: verse descansada y
                natural, sin perder sus facciones.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {treatments.map((treatment) => (
                  <span
                    key={treatment}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground"
                  >
                    {treatment}
                  </span>
                ))}
              </div>

              <div className="mt-7">
                <CtaButton treatment="una valoración para un resultado fresco y natural">
                  Quiero una valoración
                  <ArrowRight className="h-4 w-4" />
                </CtaButton>
              </div>
            </div>
          </Reveal>

          <Reveal delay={90} className="min-w-0">
            <div className="min-w-0 overflow-hidden rounded-lg border border-border bg-card shadow-[0_20px_60px_rgba(29,45,48,0.08)]">
              <div className="grid gap-px bg-border md:grid-cols-2">
                <div className="bg-card p-3 md:p-5">
                  <ClinicalPhoto
                    src={beforeFrontal}
                    alt="Vista frontal antes del plan integral facial"
                    label="Antes"
                  />
                </div>
                <div className="bg-card p-3 md:p-5">
                  <ClinicalPhoto
                    src={afterFrontal}
                    alt="Vista frontal después del plan integral facial"
                    label="Después"
                  />
                </div>
              </div>

              <div className="border-t border-border p-4 md:p-5">
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="font-mono text-[0.58rem] font-medium uppercase tracking-widest text-muted-foreground">
                      Más comparativas del caso
                    </p>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      Cada tarjeta mantiene el antes y el después juntos para que la lectura sea
                      clara.
                    </p>
                  </div>
                  <p className="max-w-xs text-xs leading-relaxed text-muted-foreground md:text-right">
                    Deslizá hacia la derecha para ver el resto.
                  </p>
                </div>

                <div className="mt-5 max-w-full overflow-x-auto pb-3 [scrollbar-width:thin]">
                  <div className="flex w-max gap-4 pr-4">
                    {comparisonPairs.map((pair) => (
                      <article
                        key={pair.title}
                        className="w-[82vw] max-w-[640px] shrink-0 rounded-md border border-border bg-background p-3 sm:w-[600px] md:p-4"
                      >
                        <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
                          <p className="font-mono text-[0.58rem] font-medium uppercase tracking-widest text-muted-foreground">
                            {pair.title}
                          </p>
                          <p className="font-mono text-[0.55rem] uppercase tracking-widest text-terra">
                            Comparativa
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <figure className="min-w-0">
                            <figcaption className="mb-2 font-mono text-[0.55rem] uppercase tracking-widest text-muted-foreground">
                              Antes
                            </figcaption>
                            <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-md border border-border bg-card p-2">
                              <img
                                src={pair.beforeSrc}
                                alt={pair.beforeAlt}
                                loading="lazy"
                                className="h-full w-full object-contain"
                                draggable={false}
                              />
                            </div>
                          </figure>

                          <figure className="min-w-0">
                            <figcaption className="mb-2 font-mono text-[0.55rem] uppercase tracking-widest text-muted-foreground">
                              Después
                            </figcaption>
                            <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-md border border-border bg-card p-2">
                              <img
                                src={pair.afterSrc}
                                alt={pair.afterAlt}
                                loading="lazy"
                                className="h-full w-full object-contain"
                                draggable={false}
                              />
                            </div>
                          </figure>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
