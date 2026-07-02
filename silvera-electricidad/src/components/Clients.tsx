import { Star } from "lucide-react";
import { motion } from "motion/react";

export function Clients() {
  const mainReviews = [
    {
      quote: "Excelente servicio, excelente trato y voluntad para solucionar una situación muy complicada. Cobro ajustado al trabajo realizado. Lo recomiendo.",
      author: "Marcelo Sanchez",
      service: "Servicio Recomendado"
    },
    {
      quote: "Muy buena experiencia, cumplidor y eficiente en el trabajo. Muy buen precio.",
      author: "Laura Alvarez",
      service: "Servicio Eficiente"
    },
    {
      quote: "Una respuesta excelente, con asesoramiento profesional y humano.",
      author: "Stella Ganem",
      service: "Asesoramiento Técnico"
    }
  ];

  const secondaryReviews = [
    {
      quote: "Empresa seria y responsable. Agradable trato y precio justo.",
      author: "Cristina Arosteguy"
    },
    {
      quote: "Muy responsable, precio justo y en fecha.",
      author: "José Fernández"
    },
    {
      quote: "Muy confiable y responsable.",
      author: "Betina Rodriguez"
    }
  ];

  return (
    <section id="resenas" className="py-24 border-y border-border-subtle relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tighter mb-12">
          Reseñas reales,<br />opiniones reales.
        </h2>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left: Giant Score */}
          <div className="md:col-span-5 space-y-4 text-left md:border-r border-border-subtle md:pr-12">
            <div className="text-7xl sm:text-8xl font-black text-ink leading-none tracking-tighter">
              5.0
            </div>
            <div className="flex text-gold text-xl tracking-widest">
              ★★★★★
            </div>

            {/* Google Logo / Icon */}
            <div className="flex items-center gap-2 font-mono text-xs text-muted pt-4">
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#5C6675" d="M22.5 12.2c0-.8-.07-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.8h3.6c2-1.9 3.2-4.7 3.2-8z"/>
                <path fill="#5C6675" d="M12 23c2.97 0 5.46-.98 7.3-2.7l-3.6-2.8c-1 .7-2.2 1-3.7 1-2.9 0-5.3-1.9-6.2-4.5H2.2v2.8A11 11 0 0 0 12 23z"/>
                <path fill="#5C6675" d="M5.8 14c-.2-.7-.4-1.4-.4-2s.1-1.4.4-2V7.2H2.2a11 11 0 0 0 0 9.6L5.8 14z"/>
                <path fill="#5C6675" d="M12 5.4c1.6 0 3.1.6 4.2 1.6l3.1-3.1C17.4 2 15 1 12 1 7.7 1 4 3.5 2.2 7.2l3.6 2.8C6.7 7.3 9.1 5.4 12 5.4z"/>
              </svg>
              <span>Reseñas de Google</span>
            </div>
          </div>

          {/* Right: Main Featured Reviews */}
          <div className="md:col-span-7 space-y-6">
            {mainReviews.map((rev, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-paper border-l-4 border-gold p-6 rounded-r-2xl shadow-sm hover:shadow transition-shadow border-y border-r border-border-subtle"
              >
                <p className="text-ink font-medium text-base sm:text-lg leading-relaxed italic tracking-tight">
                  "{rev.quote}"
                </p>
                <div className="mt-4 font-mono text-xs text-muted uppercase font-semibold">
                  <span className="text-ink">{rev.author}</span> • {rev.service}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Secondary Reviews Carousel-like row */}
        <div className="grid sm:grid-cols-3 gap-6 mt-12 pt-12 border-t border-border-subtle">
          {secondaryReviews.map((rev, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-paper border border-border-subtle p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:border-gold/30 transition-colors"
            >
              <div className="flex text-gold text-xs tracking-wider mb-3">
                ★★★★★
              </div>
              <p className="text-ink font-light text-sm leading-relaxed mb-4">
                "{rev.quote}"
              </p>
              <div className="font-mono text-[10px] text-muted uppercase font-bold tracking-wider">
                Cliente • {rev.author}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
