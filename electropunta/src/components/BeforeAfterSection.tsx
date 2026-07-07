import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { BeforeAfter } from "./BeforeAfter";

export function BeforeAfterSection() {
  const points = [
    {
      title: "Tableros para uso comercial",
      desc: "Armado de tableros con protecciones alineadas, cableado ordenado y componentes preparados para instalaciones de alto consumo."
    },
    {
      title: "Iluminacion en espacios de trabajo",
      desc: "Soluciones de iluminacion para locales comerciales, depositos y superficies de venta donde la visibilidad y la seguridad son claves."
    },
    {
      title: "Fachadas y exteriores operativos",
      desc: "Instalaciones pensadas para funcionar de noche, con buena presencia exterior y soporte tecnico para comercios activos."
    }
  ];

  return (
    <section className="py-24 border-t border-border-subtle bg-bg-tint/40 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-7 w-full order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto w-full max-w-[720px]"
            >
              <BeforeAfter
                beforeSrc="./img/electropunta-iluminacion-local-comercial-slider.jpg"
                afterSrc="./img/electropunta-iluminacion-fachada-comercial-slider.jpg"
                alt="trabajos de iluminacion comercial de Electropunta"
                beforeLabel="Interior"
                afterLabel="Exterior"
                caption="Desliza para ver interior y fachada"
                aspectClassName="aspect-[4/3] sm:aspect-[16/10]"
              />
            </motion.div>
          </div>

          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2 text-left">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-gold uppercase">
              <span className="w-6 h-[2px] bg-gold" />
              <span>Obras comerciales</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-none tracking-tighter">
              Instalaciones pensadas para comercios en funcionamiento.
            </h2>

            <p className="text-muted text-base sm:text-lg font-light leading-relaxed">
              Electropunta trabaja en tableros, sistemas de control e iluminacion comercial con foco en seguridad, continuidad operativa y prolijidad tecnica.
            </p>

            <div className="space-y-4 pt-2">
              {points.map((pt, index) => (
                <motion.div
                  key={pt.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ink text-base sm:text-lg tracking-tight">
                      {pt.title}
                    </h4>
                    <p className="text-muted text-sm sm:text-base font-light leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
