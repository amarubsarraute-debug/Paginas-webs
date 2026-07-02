import { motion } from 'motion/react';
import { Star, CheckCircle2, ArrowRight } from 'lucide-react';
import { WHATSAPP_LINK } from '../config';


export function Hero() {
  const chips = [
    "Trato humano",
    "Explicaciones claras",
    "Atención ante urgencias",
    "Consultorio en Maldonado",
    "Pacientes que vuelven hace años"
  ];

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // premium cubic-bezier easeOut
      }
    }
  };

  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-44 md:pb-28 px-6 overflow-hidden bg-[#fafaf9]">
      {/* Decorative Premium Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-brand-primary-light/5 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDuration: '12s' }} />
      
      {/* Editorial subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] -z-10" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          {/* Subtle Eyebrow */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/5 border border-brand-primary/10 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary-light animate-ping" />
            Consulta y Diagnóstico en Maldonado
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-stone-900 leading-[1.08] tracking-tighter mb-6"
          >
            Odontología <span className="text-brand-primary relative inline-block">clara, cercana</span> y profesional
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-stone-600 mb-8 leading-relaxed max-w-[50ch]"
          >
            En Odontología Maldonado te atendemos con trato humano, explicaciones claras y soluciones pensadas para tu salud bucal, comodidad y tranquilidad. Sin vueltas.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-primary text-white px-8 py-4 rounded-full font-medium text-center hover:bg-brand-primary-light transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-brand-primary/10 hover:shadow-lg hover:shadow-brand-primary/20 hover:-translate-y-0.5"
            >
              Agendar consulta por WhatsApp
            </a>
            <a 
              href="#tratamientos"
              className="bg-white text-stone-700 border border-stone-200 px-8 py-4 rounded-full font-medium text-center hover:bg-stone-50 hover:border-stone-300 transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              Ver tratamientos
              <ArrowRight size={18} />
            </a>
          </motion.div>

          {/* Trust Chips */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5">
            {chips.map((chip) => (
              <div
                key={chip}
                className="flex items-center gap-1.5 bg-white border border-stone-200/60 px-3.5 py-2 rounded-full text-xs font-medium text-stone-600 shadow-sm hover:border-brand-primary/30 hover:bg-stone-50/50 transition-colors duration-350 cursor-default"
              >
                <CheckCircle2 size={13} className="text-brand-primary-light shrink-0" />
                {chip}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Image / Visual Column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative"
        >
          {/* Back accent plate */}
          <div className="absolute inset-4 -right-2 -bottom-2 bg-brand-primary/5 rounded-3xl -z-10" />

          <div className="aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden bg-stone-200 relative shadow-xl shadow-stone-200/30 group">
            {/* Using a premium placeholder image of a clean, modern clinic or doctor */}
            <img 
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200&h=1500" 
              alt="Consultorio Odontológico moderno y limpio en Maldonado" 
              className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>

          {/* Floating Reputation Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-6 -left-4 md:-left-8 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl shadow-brand-primary/5 border border-stone-100 max-w-[210px] hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="font-display font-bold text-lg text-stone-900 leading-none mb-1.5">
              4.8 en Google
            </p>
            <p className="text-xs text-stone-500 leading-snug">
              Más de 40 pacientes reales recomiendan nuestra atención
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
