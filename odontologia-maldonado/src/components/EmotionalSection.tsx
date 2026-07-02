import { motion } from 'motion/react';
import { Section } from './ui/Section';
import { HeartPulse, Clock, Smile, MessageSquareQuote } from 'lucide-react';


export function EmotionalSection() {
  const blocks = [
    {
      title: "Tengo dolor o molestia",
      text: "Te orientamos para entender qué puede estar pasando y cuál es el próximo paso de forma rápida.",
      icon: HeartPulse,
      className: "md:col-span-3 bg-white border border-stone-200/80 hover:border-brand-primary/30",
      iconContainerClass: "bg-brand-primary/5 text-brand-primary",
      textClass: "text-stone-600",
      titleClass: "text-stone-900"
    },
    {
      title: "Hace tiempo no voy al dentista",
      text: "Podés retomar tu cuidado bucal sin presiones ni sentirte juzgado. Estamos para ayudarte a empezar de cero.",
      icon: Clock,
      className: "md:col-span-3 bg-[#fafaf9] border border-stone-200/60 hover:border-brand-primary/30",
      iconContainerClass: "bg-brand-primary/5 text-brand-primary",
      textClass: "text-stone-600",
      titleClass: "text-stone-900"
    },
    {
      title: "Quiero mejorar mi estética",
      text: "Evaluamos opciones de blanqueamiento, restauración y diseño dental personalizadas.",
      icon: Smile,
      className: "md:col-span-2 bg-[#fafaf9] border border-stone-200/60 hover:border-brand-primary/30",
      iconContainerClass: "bg-brand-primary/5 text-brand-primary",
      textClass: "text-stone-600",
      titleClass: "text-stone-900"
    },
    {
      title: "No sé qué tratamiento necesito",
      text: "Te explicamos todo con absoluta claridad. Hacemos un diagnóstico completo y respondemos cada una de tus dudas antes de avanzar.",
      icon: MessageSquareQuote,
      className: "md:col-span-4 bg-brand-primary text-white border border-transparent hover:bg-brand-primary/95",
      iconContainerClass: "bg-white/10 text-white border border-white/10",
      textClass: "text-stone-200/90",
      titleClass: "text-white"
    }
  ];

  return (
    <Section className="bg-white">
      <div className="max-w-3xl mx-auto text-center mb-16">
        {/* Subtle label */}
        <div className="text-brand-primary font-semibold text-xs uppercase tracking-wider mb-3">Tu tranquilidad primero</div>
        
        <h2 className="text-3xl md:text-4xl font-display font-bold text-stone-900 mb-6 tracking-tight leading-tight">
          Sabemos que ir al dentista puede generar dudas o postergación
        </h2>
        <p className="text-lg text-stone-600 leading-relaxed max-w-[65ch] mx-auto">
          Muchas personas dejan pasar molestias o controles por miedo, falta de tiempo o porque no saben exactamente qué necesitan. Por eso, nuestro primer paso es claro, tranquilo y acompañado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-5xl mx-auto">
        {blocks.map((block, index) => (
          <motion.div
            key={block.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
            className={`rounded-3xl p-8 shadow-sm transition-all duration-300 flex flex-col justify-between group ${block.className}`}
          >
            <div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 ${block.iconContainerClass}`}>
                <block.icon size={22} />
              </div>
              <h3 className={`font-display font-bold text-xl mb-3 tracking-tight ${block.titleClass}`}>
                {block.title}
              </h3>
            </div>
            <p className={`leading-relaxed text-sm md:text-base ${block.textClass}`}>
              {block.text}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
