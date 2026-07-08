import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const projects = [
    {
      title: "Normalización de Tablero Eléctrico",
      description: "Reorganizamos un tablero eléctrico completo: cada llave térmica identificada, cableado prolijo y protecciones calibradas según norma.",
      tag: "Electricidad",
      images: ["./img/proyecto-tablero-01.png", "./img/proyecto-tablero-02.png"]
    },
    {
      title: "Instalación Eléctrica en Obra",
      description: "Canalizado y cableado completo de un galpón en construcción, con tomas, iluminación y conexiones listas para la etapa final de obra.",
      tag: "Obras",
      images: ["./img/proyecto-obra-electrica-01.png", "./img/proyecto-obra-electrica-02.png", "./img/proyecto-obra-electrica-03.png"]
    },
    {
      title: "Instalación de Aire Acondicionado",
      description: "Instalación de equipo split Hisense, con salida de unidad exterior y conexión eléctrica dedicada.",
      tag: "Aires Acondicionados",
      images: ["./img/proyecto-aire-acondicionado-01.png", "./img/proyecto-aire-acondicionado-02.png"]
    },
    {
      title: "Instalación de Cámaras de Seguridad",
      description: "Sistema de videovigilancia instalado en distintos puntos estratégicos, con cableado protegido y acceso remoto desde el celular.",
      tag: "Cámaras de Seguridad",
      images: ["./img/proyecto-camaras-01.png", "./img/proyecto-camaras-02.png", "./img/proyecto-camaras-03.png"]
    }
  ];

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(projects.length - 1, index));
    setActive(clamped);
    if (scrollRef.current) {
      const slideWidth = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({ left: clamped * slideWidth, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const idx = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
      if (idx !== active) setActive(idx);
    }
  };

  return (
    <section id="trabajos" className="py-24 border-t border-border-subtle relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Section Header with Navigation Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-block font-mono text-xs font-bold tracking-widest text-gold uppercase">
              Proyectos
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-none tracking-tighter">
              Otros trabajos realizados.
            </h2>
            <p className="text-muted text-base sm:text-lg font-light leading-relaxed max-w-[65ch]">
              Una selección de proyectos de electricidad, albañilería, plomería y más, ejecutados en Canelones. Fotos reales de trabajos reales.
            </p>
          </div>

          <div className="flex gap-2 shrink-0 items-center">
            <button
              onClick={() => goTo(active - 1)}
              className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center text-ink hover:border-gold hover:text-gold transition-colors bg-white shadow-sm disabled:opacity-40"
              aria-label="Anterior"
              disabled={active === 0}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => goTo(active + 1)}
              className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center text-ink hover:border-gold hover:text-gold transition-colors bg-white shadow-sm disabled:opacity-40"
              aria-label="Siguiente"
              disabled={active === projects.length - 1}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* One-project-at-a-time Slider */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none rounded-3xl"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="snap-start shrink-0 w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-paper border border-border-subtle rounded-3xl shadow-sm overflow-hidden grid md:grid-cols-12 mx-0.5"
              >
                {/* Photos — full height, complete (no crop), swipe inside if they overflow */}
                <div className="md:col-span-7 p-2">
                  <div
                    className="flex gap-2 h-80 sm:h-[520px] overflow-x-auto snap-x scrollbar-none rounded-2xl"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {project.images.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`${project.title} - foto ${i + 1}`}
                        loading="lazy"
                        className="h-full w-auto shrink-0 snap-start object-contain rounded-2xl bg-bg-tint"
                      />
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-5 p-8 sm:p-10 flex flex-col justify-center space-y-5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-gold border border-gold/30 px-2.5 py-1 rounded-md w-fit">
                    {project.tag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink leading-tight tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-muted text-base sm:text-lg font-light leading-relaxed">
                    {project.description}
                  </p>
                  <div className="font-mono text-xs text-muted pt-2 space-y-1.5">
                    <div>Proyecto {index + 1} de {projects.length}</div>
                    <div className="text-gold">Deslizá las fotos →</div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir al proyecto ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-gold" : "w-2 bg-border-strong hover:bg-gold/50"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
