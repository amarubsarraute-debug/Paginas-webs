import { motion } from 'motion/react';
import { Section } from './ui/Section';
import { Stethoscope, Sparkles, AlertCircle, Wrench, Activity, Braces, Layers, CheckCircle, Lightbulb, Grid3X3 } from 'lucide-react';


export function Treatments() {
  const treatments = [
    { 
      title: "Odontología general", 
      text: "Controles periódicos, diagnóstico preciso y prevención para cuidar tu salud bucal integral.", 
      icon: Stethoscope,
      className: "bg-white border-stone-200/80 hover:border-brand-primary/20"
    },
    { 
      title: "Limpieza dental", 
      text: "Eliminación profunda de placa y sarro para mantener tus encías y dientes completamente sanos.", 
      icon: Sparkles,
      className: "bg-white border-stone-200/80 hover:border-brand-primary/20"
    },
    { 
      title: "Urgencias odontológicas", 
      text: "Atención prioritaria y rápida para aliviar dolores agudos, molestias intensas, fracturas o urgencias del fin de semana.", 
      icon: AlertCircle,
      className: "md:col-span-2 lg:col-span-2 bg-[#fffbeb]/90 border-amber-200/80 hover:border-amber-400/40 hover:shadow-md",
      highlight: "Atención rápida",
      iconContainer: "bg-amber-100 text-amber-800"
    },
    { 
      title: "Restauraciones", 
      text: "Tratamientos estéticos para reparar dientes afectados por caries, fracturas o desgastes.", 
      icon: Wrench,
      className: "bg-white border-stone-200/80 hover:border-brand-primary/20"
    },
    { 
      title: "Tratamiento de conducto", 
      text: "Procedimiento preciso para salvar piezas dentales evitando su extracción definitiva.", 
      icon: Activity,
      className: "bg-white border-stone-200/80 hover:border-brand-primary/20"
    },
    { 
      title: "Ortodoncia", 
      text: "Corrección de alineación dental y mordida para mejorar tu higiene, función y estética dental.", 
      icon: Braces,
      className: "bg-white border-stone-200/80 hover:border-brand-primary/20"
    },
    { 
      title: "Implantes dentales", 
      text: "Reemplazo duradero de piezas perdidas para recuperar la seguridad al hablar, comer y sonreír.", 
      icon: Layers,
      className: "bg-white border-stone-200/80 hover:border-brand-primary/20"
    },
    { 
      title: "Rehabilitación oral", 
      text: "Planes complejos diseñados para devolver la función masticatoria completa y la armonía a tu boca.", 
      icon: CheckCircle,
      className: "bg-white border-stone-200/80 hover:border-brand-primary/20"
    },
    { 
      title: "Diseño de sonrisa", 
      text: "Análisis estético integral y personalizado (carillas, blanqueamientos) para lograr una sonrisa armónica y natural acorde a tus facciones.", 
      icon: Lightbulb,
      className: "md:col-span-2 lg:col-span-2 bg-[#f0fdfa]/90 border-teal-200/80 hover:border-teal-400/40 hover:shadow-md",
      highlight: "Estética avanzada",
      iconContainer: "bg-teal-100/80 text-teal-800"
    },
    { 
      title: "Prótesis dentales", 
      text: "Opciones fijas o removibles adaptadas para reponer piezas y asegurar comodidad.", 
      icon: Grid3X3,
      className: "bg-white border-stone-200/80 hover:border-brand-primary/20"
    },
  ];

  return (
    <Section id="tratamientos" className="bg-[#fafaf9]">
      <div className="max-w-3xl mx-auto text-center mb-16">
        {/* Subtle label */}
        <div className="text-brand-primary font-semibold text-xs uppercase tracking-wider mb-3">Servicios odontológicos</div>
        
        <h2 className="text-3xl md:text-4xl font-display font-bold text-stone-900 mb-6 tracking-tight leading-tight">
          Tratamientos para cuidar y recuperar tu salud bucal
        </h2>
        <p className="text-lg text-stone-600 leading-relaxed max-w-[65ch] mx-auto">
          Cada tratamiento inicia con una evaluación profesional minuciosa para presentarte las alternativas de manera clara antes de decidir.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {treatments.map((treatment, index) => (
          <motion.div
            key={treatment.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
            className={`rounded-2xl p-6 border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group relative ${treatment.className}`}
          >
            {treatment.highlight && (
              <span className="absolute top-4 right-4 bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                {treatment.highlight}
              </span>
            )}
            <div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300 ${treatment.iconContainer || "bg-stone-50 text-brand-primary group-hover:bg-brand-primary/5"}`}>
                <treatment.icon size={22} />
              </div>
              <h3 className="font-display font-bold text-lg text-stone-900 mb-2.5 tracking-tight">
                {treatment.title}
              </h3>
            </div>
            <p className="text-stone-600 text-sm leading-relaxed">
              {treatment.text}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
