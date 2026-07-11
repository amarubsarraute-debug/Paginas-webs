import { Star } from "lucide-react";
import { GOOGLE_REVIEW_LINK } from "../lib/constants";

export function Clients() {
  const reviews = [
    {
      author: "Mauro Delfino",
      text: "Excelentes trabajos, tanto en instalaciones domésticas como industriales. Personal muy dedicado y competente. Siempre con las cosas claras y sin adicionales no solicitados. Ideal para obras serias donde se busca un trabajo superior y profesional. Recomendable 100%."
    },
    {
      author: "Jorge Carbonell",
      text: "Los he visto trabajar en diferentes partes de Montevideo e interior y la verdad son muy prolijos, de excelente confianza y con entrega en tiempo y forma. ¡Los felicito!"
    },
    {
      author: "Maxi Giménez",
      text: "Recomendadísimos. Tuve un problema con la trifásica de un taller y me lo solucionaron al toque. Muy prolijos y limpios para trabajar."
    },
    {
      author: "Javier Giordanelli",
      text: "La verdad, excelente. Sin palabras. Son muy responsables y cumplieron correctamente con las fechas que me pasaron. Unos genios."
    },
    {
      author: "Diego Cabrera",
      text: "Una persona responsable que me sacó de un gran aprieto en esta temporada, en el parador de Atlántica del Monumento del Sol. Cuando más lo precisaba, no me agarró la noche sin luz. Gracias, Bazzano."
    },
    {
      author: "Victor Souza",
      text: "Trabajo excelente, responsabilidad, cumplimiento, profesionalidad y prolijidad. Recomendable desde todo punto de vista."
    },
    {
      author: "Marcelo Garcia",
      text: "Me hicieron la instalación en mi empresa. Muy conforme con todo, muy profesionales. Súper recomendable."
    },
    {
      author: "Cr. J. Rodriguez & Cr. R. Marcora Estudio",
      text: "Excelente capacidad técnica y trato cordial. ¡Muy recomendable!"
    },
    {
      author: "Nicolas Viapiana",
      text: "Instalador muy responsable. Lo conozco hace varios años. Muchos éxitos, Seba. Arriba y vamos por más."
    },
    {
      author: "Silvana Lobati",
      text: "Excelente y muy profesional. Súper recomiendo."
    },
    {
      author: "Damian Costa",
      text: "Una empresa seria, responsable y capaz de realizar su trabajo en óptimas condiciones y en tiempo. Súper recomendables."
    },
    {
      author: "Víctor Martínez",
      text: "Muy buen servicio, rápidos, prolijos y responsables. Muy recomendables."
    },
    {
      author: "Diego Yutronich",
      text: "Excelente servicio, súper recomendable."
    },
    {
      author: "Claudio Molina",
      text: "Excelente trabajo, rápido, muy prolijo y a muy buen precio."
    },
    {
      author: "Carlos Prosper",
      text: "Muy buen servicio, recomendable 100%."
    },
    {
      author: "Sebastián Calcagno",
      text: "Excelente servicio. Los contraté varias veces y siempre 10 puntos."
    }
  ];

  // Triplicamos las opiniones para asegurar un loop visual continuo
  const marqueeReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section id="resenas" className="py-24 border-y border-border-subtle bg-bg-tint/20 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mb-12">
        
        {/* Title & Score Summary */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="md:col-span-7 text-left space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-gold uppercase">
              <span className="w-6 h-[2px] bg-gold" />
              <span>Opiniones Reales</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-none tracking-tighter">
              Recomendado por<br />los vecinos de la zona.
            </h2>
          </div>

          <div className="md:col-span-5 flex flex-col md:items-end text-left md:text-right gap-3">
            <div className="flex items-center gap-3">
              <span className="text-4xl sm:text-5xl font-black text-ink tracking-tight">5.0</span>
              <div className="space-y-1">
                <div className="flex text-gold text-sm tracking-wide">
                  ★★★★★
                </div>
                <div className="font-mono text-[10px] text-muted uppercase font-bold tracking-wider">
                  Opiniones en Google
                </div>
              </div>
            </div>
            
            <a 
              href={GOOGLE_REVIEW_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-border-subtle hover:border-gold/30 rounded-xl text-xs font-semibold text-ink bg-paper hover:bg-gold/5 transition-all duration-200 w-fit"
            >
              <Star className="w-3.5 h-3.5 text-gold fill-gold" />
              Opinar en Google
            </a>
          </div>
        </div>
      </div>

      {/* CSS Stylesheet inline for GPU-accelerated and smooth pause-on-hover marquee */}
      <style>{`
        @keyframes marquee-right {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0%, 0, 0); }
        }
        .animate-marquee-right {
          animation: marquee-right 55s linear infinite;
          will-change: transform;
        }
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Infinite Horizontal Marquee sliding to the RIGHT */}
      <div className="relative w-full overflow-hidden py-4 flex select-none">
        {/* Left and Right blur overlays to blend marquee edge */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-bg-base/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-bg-base/90 to-transparent z-20 pointer-events-none" />

        <div className="flex gap-6 w-max animate-marquee-right">
          {marqueeReviews.map((rev, idx) => (
            <article 
              key={idx}
              className="w-[280px] sm:w-[340px] shrink-0 bg-paper border border-border-subtle p-6 rounded-2xl shadow-sm hover:border-gold/30 transition-colors text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex text-gold text-xs tracking-wider mb-3">
                  ★★★★★
                </div>
                <p className="text-ink font-light text-xs sm:text-sm leading-relaxed italic mb-4 line-clamp-4 hover:line-clamp-none transition-all duration-300">
                  "{rev.text}"
                </p>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-border-subtle/50 mt-auto">
                <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center font-mono text-[9px] font-bold text-gold uppercase">
                  {rev.author.charAt(0)}
                </div>
                <span className="font-mono text-[10px] text-muted uppercase font-bold tracking-wider">
                  {rev.author}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
