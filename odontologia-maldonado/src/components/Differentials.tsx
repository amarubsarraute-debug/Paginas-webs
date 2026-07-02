import { motion } from 'motion/react';
import { Section } from './ui/Section';
import { Ear, Info, HeartHandshake, History } from 'lucide-react';


export function Differentials() {
  const points = [
    { 
      title: "Te escuchamos", 
      text: "Primero entendemos tu situación, molestias y temores para planificar la mejor estrategia.", 
      icon: Ear,
      className: "md:col-span-6 bg-white/10 backdrop-blur-md border border-white/15 text-white",
      iconContainer: "bg-white/10 text-white"
    },
    { 
      title: "Te explicamos", 
      text: "Antes de cualquier paso, sabés exactamente qué recomendamos, los tiempos y los costos. Sin sorpresas.", 
      icon: Info,
      className: "md:col-span-6 bg-white text-stone-900 shadow-xl shadow-black/5 hover:-translate-y-0.5 transition-transform duration-300",
      iconContainer: "bg-brand-primary/10 text-brand-primary"
    },
    { 
      title: "Te acompañamos", 
      text: "Hacemos que cada paso en el sillón sea lo más tranquilo posible, adaptándonos a tu ritmo.", 
      icon: HeartHandshake,
      className: "md:col-span-7 bg-white/10 backdrop-blur-md border border-white/15 text-white",
      iconContainer: "bg-white/10 text-white"
    },
    { 
      title: "Te hacemos seguimiento", 
      text: "La atención sigue después de la consulta. Nos comunicamos para ver cómo te sentís y asegurar tu evolución.", 
      icon: History,
      className: "md:col-span-5 bg-white/5 border border-white/5 text-brand-secondary/90",
      iconContainer: "bg-white/5 text-white/90"
    },
  ];

  return (
    <Section className="bg-brand-primary text-white relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[30rem] h-[30rem] bg-white/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto text-center mb-16">
        {/* Eyebrow restraint */}
        <div className="text-brand-primary-light font-semibold text-xs uppercase tracking-wider mb-3">La diferencia está en el trato</div>
        
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight leading-tight">
          Una atención pensada para que te sientas tranquilo
        </h2>
        <p className="text-lg text-brand-secondary/80 leading-relaxed max-w-[65ch] mx-auto">
          Los pacientes valoran la paciencia, la claridad en el diagnóstico y la contención ante urgencias. Creemos que la experiencia de ir al dentista debe ser transparente y sin estrés de principio a fin.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto">
        {points.map((point, index) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
            className={`rounded-3xl p-8 flex flex-col justify-between group ${point.className}`}
          >
            <div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 ${point.iconContainer}`}>
                <point.icon size={26} />
              </div>
              <h3 className="font-display font-bold text-xl mb-3 tracking-tight">
                {point.title}
              </h3>
            </div>
            <p className="leading-relaxed text-sm md:text-base">
              {point.text}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
