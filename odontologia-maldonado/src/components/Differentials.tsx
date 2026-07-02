import { motion } from 'motion/react';
import { Section } from './ui/Section';
import { Ear, Info, HeartHandshake, History } from 'lucide-react';

export function Differentials() {
  const points = [
    { title: "Te escuchamos", text: "Primero entendemos tu situación, molestias y objetivos.", icon: Ear },
    { title: "Te explicamos", text: "Antes de avanzar, sabés qué se recomienda y por qué.", icon: Info },
    { title: "Te acompañamos", text: "Buscamos que cada paso sea lo más tranquilo posible.", icon: HeartHandshake },
    { title: "Te hacemos seguimiento", text: "La atención no termina en el sillón: también importa cómo seguís después.", icon: History },
  ];

  return (
    <Section className="bg-brand-primary text-white relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[30rem] h-[30rem] bg-white/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6 tracking-tight">
          Una atención que se siente clara desde el primer momento
        </h2>
        <p className="text-lg text-brand-secondary/90 leading-relaxed">
          Los pacientes valoran especialmente la buena atención, las explicaciones claras, la paciencia, el seguimiento y la respuesta ante urgencias. La experiencia no se trata solo del tratamiento, sino de cómo te sentís durante todo el proceso.
        </p>
      </div>

      <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {points.map((point, index) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
              <point.icon className="text-white" size={32} />
            </div>
            <h3 className="font-display font-semibold text-xl mb-3">
              {point.title}
            </h3>
            <p className="text-brand-secondary/80 leading-relaxed">
              {point.text}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
