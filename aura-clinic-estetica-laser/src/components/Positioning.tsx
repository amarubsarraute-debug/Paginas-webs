import { motion } from 'motion/react';
import { Activity, ScanLine, ShieldCheck, Sparkles } from 'lucide-react';

export default function Positioning() {
  const blocks = [
    {
      icon: ScanLine,
      title: 'Evaluación',
      text: 'Cada indicación empieza por entender zona, objetivo y expectativas.'
    },
    {
      icon: Sparkles,
      title: 'MELA Láser',
      text: 'Tecnología enfocada en contorno, grasa localizada, firmeza y calidad de piel.'
    },
    {
      icon: ShieldCheck,
      title: 'Criterio profesional',
      text: 'Dirección técnica médica y protocolos claros antes de tratar.'
    },
    {
      icon: Activity,
      title: 'Seguimiento',
      text: 'El plan se acompaña para observar evolución y ajustar lo necesario.'
    }
  ];

  return (
    <section className="bg-brand-ivory py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="mb-6 font-serif text-4xl font-semibold leading-[1.02] text-brand-dark md:text-6xl"
            >
              Mejorar sin perder una mirada realista del cuerpo.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.1 }}
              className="text-lg leading-relaxed text-brand-text/80"
            >
              Aura se posiciona desde una estética láser seria: evaluar, indicar, tratar y acompañar sin prometer resultados iguales para todos.
            </motion.p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {blocks.map((block, idx) => {
              const Icon = block.icon;
              return (
                <motion.div
                  key={block.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: idx * 0.08 }}
                  className={`rounded-2xl border p-6 ${
                    idx === 0
                      ? 'border-brand-dark bg-brand-dark text-brand-ivory sm:col-span-2'
                      : 'border-brand-sand/55 bg-white/56'
                  }`}
                >
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-full ${
                      idx === 0 ? 'bg-brand-ivory/10 text-brand-mist' : 'bg-brand-mist text-brand-accent'
                    }`}
                  >
                    <Icon size={24} strokeWidth={1.7} />
                  </div>
                  <h3 className={`mb-2 font-serif text-2xl ${idx === 0 ? 'text-brand-ivory' : 'text-brand-dark'}`}>
                    {block.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${idx === 0 ? 'text-brand-ivory/75' : 'text-brand-muted'}`}>
                    {block.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
