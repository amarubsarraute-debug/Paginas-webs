import { Star } from "lucide-react";
import { GOOGLE_REVIEW_LINK } from "../lib/constants";

export function Clients() {
  const reviews = [
    {
      author: "Fer Gomez",
      text: "La verdad, un excelente trabajador y profesional. Me solucionó muy rápido el problema de casa y, al trabajar, fue muy ordenado y detallista, que es lo que uno siempre busca. Además, con un precio muy accesible."
    },
    {
      author: "Marina Rodriguez",
      text: "Contraté el servicio para un arreglo importante en casa y estoy súper contenta con los resultados. Trabajo impecable y responsable. Lo súper recomiendo. ¡Gracias!"
    },
    {
      author: "María Luz",
      text: "Muy buen servicio. Lo llamé para un arreglo general en mi casa y solucionó todo de una forma eficaz y prolija. Recomendado."
    },
    {
      author: "Patricia Beatriz Sosa Aguzzi",
      text: "Excelente profesional, muy prolijo y responsable. 100% recomendable."
    },
    {
      author: "Lbk Los Berenjenas de la Costa en Kayak",
      text: "Excelente atención y compromiso a la hora de realizar el trabajo. Puntualidad y calidad de trabajo."
    },
    {
      author: "Yamila Sosa",
      text: "Excelente servicio. Súper recomendable."
    },
    {
      author: "Solange Filiphs",
      text: "Súper recomendable. Me solucionó mi problema, súper responsable y detallista en su trabajo. Además, muy amable."
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
          animation: marquee-right 45s linear infinite;
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
