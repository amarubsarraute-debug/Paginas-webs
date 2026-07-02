import { motion } from 'motion/react';
import { Section } from './ui/Section';
import { Stethoscope, Sparkles, AlertCircle, Wrench, Activity, Braces, Layers, CheckCircle, Lightbulb, Grid3X3 } from 'lucide-react';

export function Treatments() {
  const treatments = [
    { title: "Odontología general", text: "Controles, diagnóstico, prevención y atención integral para cuidar tu salud bucal.", icon: Stethoscope },
    { title: "Limpieza dental", text: "Eliminación de placa, sarro y manchas superficiales para mantener dientes y encías saludables.", icon: Sparkles },
    { title: "Urgencias odontológicas", text: "Atención para dolores, molestias, fracturas o situaciones que requieren una respuesta rápida.", icon: AlertCircle },
    { title: "Restauraciones", text: "Tratamientos para recuperar piezas afectadas por caries, desgaste o fracturas.", icon: Wrench },
    { title: "Tratamiento de conducto", text: "Alternativa para salvar piezas dentales cuando el problema afecta el interior del diente.", icon: Activity },
    { title: "Ortodoncia", text: "Corrección de posición dental y mordida para mejorar estética, función e higiene.", icon: Braces },
    { title: "Implantes dentales", text: "Soluciones para reemplazar piezas perdidas y recuperar seguridad al sonreír, hablar y masticar.", icon: Layers },
    { title: "Rehabilitación oral", text: "Planificación de tratamientos para recuperar función, estética y comodidad en la boca.", icon: CheckCircle },
    { title: "Diseño de sonrisa", text: "Evaluación estética personalizada para mejorar la armonía de la sonrisa según cada rostro.", icon: Lightbulb },
    { title: "Prótesis dentales", text: "Opciones para recuperar piezas perdidas y mejorar funcionalidad y estética.", icon: Grid3X3 },
  ];

  return (
    <Section id="tratamientos" className="bg-stone-50">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mb-6 tracking-tight">
          Tratamientos odontológicos para cuidar y recuperar tu sonrisa
        </h2>
        <p className="text-lg text-stone-600 leading-relaxed">
          Cada tratamiento comienza con una evaluación profesional para entender tu caso y recomendarte el camino más adecuado.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {treatments.map((treatment, index) => (
          <motion.div
            key={treatment.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-brand-primary/20 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-primary/5 transition-colors">
              <treatment.icon className="text-brand-primary group-hover:scale-110 transition-transform" size={24} />
            </div>
            <h3 className="font-display font-semibold text-lg text-stone-900 mb-2">
              {treatment.title}
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              {treatment.text}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
