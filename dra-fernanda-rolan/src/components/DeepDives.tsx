import { motion } from 'motion/react';
import { WHATSAPP_NUMBER_1, WHATSAPP_MESSAGE } from '../data';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function DeepDives() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER_1}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const sections = [
    {
      id: "botox",
      title: "Descansada, luminosa y sin perder tu expresión",
      subtitle: "Botox bien hecho",
      text: "El Botox bien indicado no busca congelar el rostro. Busca suavizar líneas de expresión, mejorar el aspecto de cansancio y conservar la naturalidad de tus gestos.",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop",
      bullets: [
        "Suaviza líneas de expresión",
        "Ayuda a verte más descansada",
        "Respeta tu expresividad",
        "Resultado sutil y personalizado"
      ],
      cta: "Consultar por Botox"
    },
    {
      id: "labios",
      title: "Labios hidratados, armónicos y sutiles",
      subtitle: "Ácido Hialurónico",
      text: "El ácido hialurónico en labios puede ayudar a hidratar, mejorar volumen, corregir pequeñas asimetrías y realzar la forma natural sin perder elegancia.",
      image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=1000&auto=format&fit=crop",
      bullets: [
        "Hidratación profunda",
        "Volumen inmediato y sutil",
        "Corrección de asimetrías",
        "Resultado armónico"
      ],
      cta: "Consultar por labios"
    },
    {
      id: "mirada",
      title: "Una mirada más fresca sin cirugía",
      subtitle: "Mirada y Párpados",
      text: "Los tratamientos perioculares permiten trabajar la flacidez de párpados, la calidad de piel y alteraciones como xantelasmas, buscando mejorar la mirada de forma personalizada.",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000&auto=format&fit=crop",
      bullets: [
        "Blefaroplastia no quirúrgica",
        "Tratamiento de párpados caídos",
        "Xantelasma",
        "Calidad de piel periocular"
      ],
      cta: "Consultar por tratamiento periocular"
    },
    {
      id: "ginecologia",
      title: "Bienestar íntimo femenino en cada etapa",
      subtitle: "Ginecología Regenerativa",
      text: "La ginecología regenerativa y funcional acompaña a mujeres que atraviesan cambios vinculados a perimenopausia, menopausia, sequedad íntima, incomodidad o incontinencia urinaria leve.\n\nHablar de bienestar íntimo también es hablar de calidad de vida, seguridad y comodidad en el día a día.",
      image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=1000&auto=format&fit=crop",
      bullets: [
        "Sequedad íntima",
        "Menopausia y perimenopausia",
        "Incontinencia urinaria leve",
        "Bienestar íntimo femenino"
      ],
      cta: "Consultar de forma privada"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-brand-sand-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        {sections.map((section, idx) => {
          const isReversed = idx % 2 !== 0;
          return (
            <div key={section.id} id={section.id} className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${idx === 3 ? 'rounded-lg border border-brand-sand bg-brand-sand-light p-6 md:p-10 shadow-sm' : ''}`}>
              
              <motion.div 
                initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`w-full ${isReversed ? 'lg:order-2' : ''}`}
              >
                <div className="relative aspect-square md:aspect-[4/3] rounded-lg overflow-hidden shadow-xl shadow-brand-dark/10">
                  <img src={section.image} alt={section.subtitle} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-brand-dark/10 mix-blend-multiply"></div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`w-full flex flex-col justify-center ${isReversed ? 'lg:order-1' : ''}`}
              >
                <p className="text-brand-gold font-semibold text-sm mb-3">{section.subtitle}</p>
                <h3 className="text-3xl md:text-5xl font-serif font-semibold text-brand-dark mb-6 leading-tight">{section.title}</h3>
                <div className="text-brand-text/80 text-lg leading-relaxed mb-8 whitespace-pre-line">
                  {section.text}
                </div>
                
                <ul className="space-y-3 mb-10">
                  {section.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-3 text-brand-text">
                      <CheckCircle2 size={20} className="text-brand-gold shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-gold font-semibold transition-colors w-fit group border-b border-brand-gold pb-1 hover:text-brand-dark hover:border-brand-dark"
                >
                  {section.cta}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
