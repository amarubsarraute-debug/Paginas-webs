import { Star } from "lucide-react";
import { GOOGLE_REVIEW_LINK } from "../lib/constants";

export function Clients() {
  const reviews = [
    {
      author: "Sekoo",
      text: "Excelente servicio. Muy profesional, puntual y responsable. Realizó el trabajo de forma impecable, explicando todo con claridad y cuidando cada detalle. Además de ser un gran electricista, es una excelente persona, muy amable y respetuosa. Se nota que trabaja con experiencia y dedicación. Lo recomiendo al 100%. Sin dudas volvería a contratarlo. ¡Muchas gracias por el excelente trabajo!"
    },
    {
      author: "Romina Díaz",
      text: "Muy conforme con el trabajo realizado. Instalación eléctrica impecable, rápida atención y excelente trato. Todo quedó prolijo y funcionando perfecto. Súper recomendable."
    },
    {
      author: "Santiago Piazze Gauthier",
      text: "Excelente servicio. Vino el mismo día que lo contacté, fue puntual y muy profesional. Detectó el problema rápidamente y lo solucionó de forma prolija y segura. Explicó todo con claridad y dejó todo en perfecto estado. Muy recomendable, sin dudas volvería a llamarlo."
    },
    {
      author: "Anyelí Ravelo García",
      text: "Muy conforme con el trabajo. Es puntual, prolijo y muy responsable. Cumple lo que promete y trabaja con mucha dedicación. Terminó antes de lo esperado y siempre estuvo dispuesto, sin importar la hora. Se nota que es un profesional serio. Lo recomiendo 100%."
    },
    {
      author: "Valentina Carsolio",
      text: "Fuera de horario y aun así me atendieron enseguida. Muy buena onda, dejaron todo funcionando perfecto y limpio. Se nota que saben lo que hacen. Altamente recomendado."
    },
    {
      author: "Lorena F",
      text: "Excelente servicio. Muy puntual, prolijo y con buen precio. Recomiendo ampliamente."
    },
    {
      author: "Cobranza Romance",
      text: "Llamamos a Peter por varios problemas en distintas instalaciones y ese mismo día ya se encontraba en la empresa realizando el presupuesto. El mismo fue muy conveniente, teniendo en cuenta tanto los materiales como la mano de obra. El trabajo se realizó una semana después, de manera muy profesional y rápida, siempre atento a cada detalle. ¡Muchas gracias, Peter!"
    },
    {
      author: "Rosario Querejazu",
      text: "Muy bueno, súper puntual. Me arregló todo perfecto y bien de precio. Muy recomendable."
    },
    {
      author: "Lourdes Alen",
      text: "Lo llamé hoy y Peter vino hoy mismo, muy puntual. Excelente persona y muy responsable. Lo tendré en cuenta para otros trabajos, sin dudas."
    },
    {
      author: "Jessica Quintero",
      text: "Estamos muy agradecidos con Peter. Tuvimos una emergencia, nos quedamos sin luz y estuve contactando a muchos electricistas, pero a ninguno le interesaba realmente ayudar. Finalmente encontramos el contacto de Peter, le escribí y luego de un rato me llamó. Ya era cerca de medianoche y quería venir en ese mismo momento, pero al final acordamos que viniera a la mañana siguiente, un sábado. Llegó y solucionó el problema enseguida. Era un inconveniente de cables, los cambió por unos nuevos y todo quedó funcionando perfectamente. Fue muy amable en todo momento. Estamos muy agradecidos. 100% recomendable."
    },
    {
      author: "Elena Vargas",
      text: "El señor Peter Montes de Oca es un excelente electricista, responsable, confiable y trabaja muy bien."
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
