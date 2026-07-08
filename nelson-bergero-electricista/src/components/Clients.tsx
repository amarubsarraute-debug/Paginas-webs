import { useRef } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { GOOGLE_REVIEW_LINK } from "../lib/constants";

export function Clients() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === "left"
        ? scrollLeft - 320
        : scrollLeft + 320;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const reviews = [
    {
      quote: "Lo recomiendo. Excelente trabajo, puntualidad y prolijidad. Nos asesoró y recomendó lo mejor para nosotros. Demostró amplios conocimientos técnicos, trabajando con seguridad y compromiso. Excelente trato, cordial y respetuoso.",
      author: "Tania Ceballe",
      service: "Asesoramiento y Trabajo Prolijo",
      isFeatured: true
    },
    {
      quote: "Excelente servicio. Entró a mi casa, corrigió el problema rápidamente, con buen precio y buen material. Además, se preocupó por dejar limpio el espacio donde trabajó, algo que muy pocos hacen. ¡Gracias, Nelson!",
      author: "Barbara Rodriguez Rodriguez",
      service: "Servicio Prolijo y Rápido",
      isFeatured: false
    },
    {
      quote: "¡Excelente! Había llamado a varios y no tuve buenas experiencias. Nelson fue muy profesional y resolvió todo el mismo día que vino. Quedamos sorprendidos y contentos. Conseguimos electricista.",
      author: "Gabriel Trucido",
      service: "Solución en el Día",
      isFeatured: false
    },
    {
      quote: "Excelente profesional. Muy rápido y eficiente. Buenos precios y calidad. Me reparó un calefón eléctrico y quedó muy bien.",
      author: "Walter Paulucci",
      service: "Reparación de Calefón",
      isFeatured: false
    },
    {
      quote: "Excelente atención. Hace años que confiamos en su servicio. Mucha dedicación, educación y compromiso. Muy recomendable.",
      author: "Ana Paula Alves",
      service: "Confianza de Años",
      isFeatured: false
    },
    {
      quote: "Excelente servicio, muy buena atención y súper recomendable. Nos asesoró y recomendó en varios temas de la casa para iluminar. 100% recomendable.",
      author: "Gabriel Perez",
      service: "Asesoramiento en Iluminación",
      isFeatured: false
    },
    {
      quote: "Excelente servicio, buen profesional y gran calidad de persona. Siempre responsable. Recomiendo.",
      author: "Dario Mateos",
      service: "Servicio Responsable",
      isFeatured: false
    },
    {
      quote: "Excelente trabajo y atención. Muy recomendable.",
      author: "Omar Rodriguez",
      service: "Trabajo Recomendado",
      isFeatured: false
    },
    {
      quote: "Excelente experiencia. Muy buen trabajo. Lo recomiendo.",
      author: "Virginia Bergero",
      service: "Buena Experiencia",
      isFeatured: false
    },
    {
      quote: "Excelente persona, muy inteligente y dedicado a su trabajo. Totalmente recomendable.",
      author: "Patricia Ceballe",
      service: "Dedicación al Trabajo",
      isFeatured: false
    },
    {
      quote: "Un trabajo excelente, y tiene todos los materiales en su vehículo.",
      author: "Juan Fernandez",
      service: "Trabajo Completo",
      isFeatured: false
    }
  ];

  return (
    <section id="resenas" className="py-24 border-y border-border-subtle relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

        {/* Header Block with Navigation Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tighter">
              La confianza me la<br />dan mis clientes.
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center text-ink hover:border-gold hover:text-gold transition-colors bg-white shadow-sm"
              aria-label="Anterior"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center text-ink hover:border-gold hover:text-gold transition-colors bg-white shadow-sm"
              aria-label="Siguiente"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reviews Content Grid */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-start">

          {/* Left Column: Puntuación de Google */}
          <div className="md:col-span-4 space-y-4 text-left md:border-r border-border-subtle md:pr-8">
            <div className="text-7xl sm:text-8xl font-black text-ink leading-none tracking-tighter">
              5.0
            </div>
            <div className="flex text-gold text-xl tracking-widest">
              ★★★★★
            </div>

            {/* Google Logo / Icon */}
            <div className="flex items-center gap-2 font-mono text-xs text-muted pt-2">
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#5C6675" d="M22.5 12.2c0-.8-.07-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.8h3.6c2-1.9 3.2-4.7 3.2-8z"/>
                <path fill="#5C6675" d="M12 23c2.97 0 5.46-.98 7.3-2.7l-3.6-2.8c-1 .7-2.2 1-3.7 1-2.9 0-5.3-1.9-6.2-4.5H2.2v2.8A11 11 0 0 0 12 23z"/>
                <path fill="#5C6675" d="M5.8 14c-.2-.7-.4-1.4-.4-2s.1-1.4.4-2V7.2H2.2a11 11 0 0 0 0 9.6L5.8 14z"/>
                <path fill="#5C6675" d="M12 5.4c1.6 0 3.1.6 4.2 1.6l3.1-3.1C17.4 2 15 1 12 1 7.7 1 4 3.5 2.2 7.2l3.6 2.8C6.7 7.3 9.1 5.4 12 5.4z"/>
              </svg>
              <span>17 opiniones en Google</span>
            </div>

            {/* Botón Dejar Reseña */}
            <div className="pt-4">
              <a
                href={GOOGLE_REVIEW_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border-subtle rounded-xl text-xs font-semibold text-ink bg-bg-tint hover:bg-gold/10 hover:border-gold hover:text-ink transition-all duration-200 shadow-sm"
              >
                <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                Dejar una reseña
              </a>
            </div>
          </div>

          {/* Right Column: Combined Horizontal Scrollable Slider (1 Featured Large, Rest standard) */}
          <div className="md:col-span-8 w-full overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {reviews.map((rev, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`snap-start shrink-0 flex flex-col justify-between rounded-3xl transition-all duration-300 ${
                    rev.isFeatured
                      ? "w-[310px] sm:w-[460px] bg-paper border-l-4 border-gold border-y border-r border-border-subtle shadow-md p-8 hover:shadow-lg"
                      : "w-[260px] sm:w-[320px] bg-paper border border-border-subtle p-6 hover:border-gold/30 shadow-sm"
                  }`}
                >
                  <div>
                    <div className="flex text-gold text-xs tracking-wider mb-4">
                      ★★★★★
                    </div>
                    <p className={`text-ink leading-relaxed italic tracking-tight font-medium ${
                      rev.isFeatured ? "text-base sm:text-lg" : "text-sm"
                    }`}>
                      "{rev.quote}"
                    </p>
                  </div>

                  <div className="mt-6 font-mono text-[10px] sm:text-xs text-muted uppercase font-semibold border-t border-border-subtle/50 pt-4 flex justify-between items-center">
                    <span className="text-ink font-bold">{rev.author}</span>
                    <span>{rev.service}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-2 text-muted text-[10px] font-mono pr-2">
              <span>Deslizar hacia la derecha</span>
              <span>→</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
