import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Section } from './ui/Section';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export function Reviews() {
  const reviews = [
    { name: "Luciana Lavechia", text: "Excelente atención de parte de Ely. Se toma el tiempo de explicar todo claramente. Además, el consultorio es agradable y el trato humano es excepcional. La recomiendo totalmente a quienes busquen una dentista de confianza." },
    { name: "Leticia Piquinela", text: "Excelente experiencia. Llamé por una urgencia, me dijeron que fuera enseguida y en menos de 10 minutos me atendieron. Me hicieron placa y estudio diferencial. El costo fue adecuado. Los recomiendo." },
    { name: "Bruno D", text: "Muy recomendable. Me dieron una solución rápida y efectiva frente a una emergencia un sábado de tarde. Destaco su atención y seguimiento." },
    { name: "Florencia Fagundez", text: "Excelente atención y profesionalismo de Sil. Gran profesional y persona. La recomiendo siempre." },
    { name: "Diego", text: "Excelente atención, toda la paciencia del mundo y una gran profesional. 100% recomendable." },
    { name: "Lázaro Edison Gómez", text: "Excelente atención profesional y humana, con costos acordes a la situación económica del paciente. Expreso mi gratitud y agradecimiento a la Dra. Silvia y su equipo." },
    { name: "Diver Correa", text: "Me hizo una extracción y en la noche la doctora se comunicó para interesarse por mi estado. Excelente atención." },
    { name: "Mariana Piriz", text: "Excelente atención siempre. Una genia la Dra. Silvia, hace años me atiendo con ella." },
    { name: "Jeniffer Cabal", text: "Muy buena profesional. Hace años me atiendo con ella y la calidez humana que tiene es increíble. Mi familia y amigos que he recomendado también se atienden con ella. Gracias Silvia por tu atención." }
  ];

  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Section id="opiniones" className="bg-white">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 tracking-tight mb-6">
          Pacientes que destacan la atención, la claridad y el trato humano
        </h2>
        <div className="flex items-center justify-center gap-1 mb-8">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={24} className="fill-amber-400 text-amber-400" />
          ))}
          <span className="ml-2 font-display font-semibold text-xl text-stone-900">4.8</span>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-12">
        {/* Navigation Buttons Desktop */}
        <button 
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-stone-200 rounded-full items-center justify-center shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-50 transition-all z-10"
        >
          <ChevronLeft size={20} className="text-stone-600" />
        </button>
        
        <button 
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-stone-200 rounded-full items-center justify-center shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-50 transition-all z-10"
        >
          <ChevronRight size={20} className="text-stone-600" />
        </button>

        {/* Carousel */}
        <div 
          ref={carouselRef}
          onScroll={updateScrollState}
          className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x snap-mandatory"
        >
          {reviews.map((review, index) => (
            <div 
              key={index}
              className="flex-none w-full sm:w-[320px] md:w-[350px] bg-stone-50 rounded-2xl p-6 border border-stone-100 snap-center flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-stone-600 leading-relaxed mb-6 flex-1 text-sm md:text-base">
                "{review.text}"
              </p>
              <p className="font-semibold text-stone-900 text-sm">
                {review.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-8">
        <a 
          href="https://www.google.com/maps/search/Odontologia+Maldonado+Dra+Silvia+Pais" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block text-brand-primary font-medium hover:underline underline-offset-4"
        >
          Ver opiniones en Google
        </a>
      </div>
    </Section>
  );
}
