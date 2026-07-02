import { motion } from 'motion/react';
import { Section } from './ui/Section';
import { HeartPulse, Clock, Smile, MessageSquareQuote } from 'lucide-react';

export function EmotionalSection() {
  const blocks = [
    {
      title: "Tengo dolor o molestia",
      text: "Te orientamos para entender qué puede estar pasando y cuál es el próximo paso.",
      icon: HeartPulse,
    },
    {
      title: "Hace tiempo no voy al dentista",
      text: "Podés retomar tu cuidado bucal sin sentirte juzgado.",
      icon: Clock,
    },
    {
      title: "Quiero mejorar mi sonrisa",
      text: "Evaluamos opciones estéticas y funcionales según tu caso.",
      icon: Smile,
    },
    {
      title: "No sé qué tratamiento necesito",
      text: "Te explicamos con claridad antes de avanzar.",
      icon: MessageSquareQuote,
    }
  ];

  return (
    <Section className="bg-white">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mb-6 tracking-tight">
          Sabemos que ir al dentista puede generar dudas, miedo o postergación
        </h2>
        <p className="text-lg text-stone-600 leading-relaxed">
          Muchas personas dejan pasar molestias, controles o tratamientos por miedo, falta de tiempo o porque no saben exactamente qué necesitan. Por eso, el primer paso no debería ser incómodo: debería ser claro, tranquilo y acompañado.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blocks.map((block, index) => (
          <motion.div
            key={block.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-stone-50 rounded-2xl p-6 border border-stone-100 hover:border-brand-primary/20 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-stone-100">
              <block.icon className="text-brand-primary" size={24} />
            </div>
            <h3 className="font-display font-semibold text-xl text-stone-900 mb-3">
              {block.title}
            </h3>
            <p className="text-stone-600 leading-relaxed">
              {block.text}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
