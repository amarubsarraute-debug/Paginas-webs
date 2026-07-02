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

  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
      {/* Soft Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/50 to-stone-50 -z-10" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-teal-50/40 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="max-w-xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-stone-900 leading-[1.1] tracking-tight mb-6"
          >
            Odontología clara, cercana y profesional en Maldonado
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-stone-600 mb-8 leading-relaxed"
          >
            En Odontología Maldonado te atendemos con trato humano, explicaciones claras y soluciones pensadas para tu salud bucal, tu comodidad y tu tranquilidad.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-primary text-white px-8 py-4 rounded-full font-medium text-center hover:bg-brand-primary-light transition-colors flex items-center justify-center gap-2 shadow-md shadow-brand-primary/20"
            >
              Agendar consulta por WhatsApp
            </a>
            <a 
              href="#tratamientos"
              className="bg-white text-stone-700 border border-stone-200 px-8 py-4 rounded-full font-medium text-center hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
            >
              Ver tratamientos
              <ArrowRight size={18} />
            </a>
          </motion.div>

          {/* Trust Chips */}
          <div className="flex flex-wrap gap-3">
            {chips.map((chip, index) => (
              <motion.div
                key={chip}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm border border-stone-200/60 px-3 py-1.5 rounded-full text-sm text-stone-600 font-medium"
              >
                <CheckCircle2 size={14} className="text-brand-primary" />
                {chip}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Image / Visual */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden bg-stone-200 relative shadow-xl shadow-stone-200/50">
            {/* Using a premium placeholder image of a clean, modern clinic or doctor */}
            <img 
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200&h=1500" 
              alt="Consultorio Odontológico moderno y limpio" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Floating Reputation Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute -bottom-6 -left-6 md:-left-12 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl shadow-stone-200/50 border border-white max-w-[200px]"
            style={{
              transform: "translateY(var(--scroll-y, 0))", // We could implement a parallax hook, but keeping it simple for now
            }}
          >
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="font-display font-semibold text-lg text-stone-900 leading-tight mb-1">
              4.8 en Google
            </p>
            <p className="text-sm text-stone-500 leading-tight">
              +40 opiniones de pacientes
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
