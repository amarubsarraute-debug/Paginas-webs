import { WHATSAPP_LINK } from "../lib/constants";
import { Phone } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-16 overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none z-0" />
      
      <div className="relative z-10 mx-auto w-full max-w-[100vw] overflow-hidden px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center min-w-0">
          
          {/* Left Column: Text & CTAs */}
          <div className="hero-copy lg:col-span-6 space-y-6 text-left min-w-0">
            {/* Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="hero-kicker inline-flex max-w-full flex-wrap items-center gap-2 font-mono text-[10px] sm:text-xs font-bold tracking-widest text-gold uppercase"
            >
              <span className="w-6 h-[2px] bg-gold" />
              <span>Maldonado • Punta del Este • Electricista Certificado</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="max-w-full text-[2.12rem] sm:text-5xl lg:text-6xl font-extrabold text-ink leading-[1.06] tracking-tighter"
            >
              Instalaciones y reformas eléctricas{" "}
              <span className="relative inline-block whitespace-nowrap text-ink z-10">
                <span className="relative z-10">seguras</span>
                <span className="absolute left-0 right-0 bottom-[4px] h-[0.3em] bg-gold-soft rounded-sm -z-10" />
              </span>{" "}
              y bajo norma
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-lg sm:text-xl text-muted leading-relaxed max-w-xl font-light"
            >
              <span className="relative inline-block text-ink z-10 font-extrabold mr-1">
                <span className="relative z-10">Electropunta</span>
                <span className="absolute left-0 right-0 bottom-[2px] h-[0.25em] bg-gold-soft rounded-sm -z-10" />
              </span> realiza trabajos residenciales, comerciales y obras con respaldo técnico hasta 50 kW. <b>Respuestas rápidas, presupuestos claros y carpetas de habilitación de UTE al día.</b>
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-2"
            >
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold-bright text-navy font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
              >
                Consultar por WhatsApp
                <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
              <a
                href="tel:+59891339311" // Usamos el número de teléfono del cliente de la landing
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-gold/5 border border-border-strong text-ink font-bold rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5 text-gold" />
                Llamar al 091 339 311
              </a>
            </motion.div>

            {/* Reseñas Google */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted pt-4 border-t border-border-subtle max-w-md"
            >
              <span className="text-star text-sm tracking-widest">★★★★★</span>
              <span>5.0 / Reseñas en Google</span>
              <span className="w-1.5 h-1.5 rounded-full bg-border-strong" />
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                Disponible ahora
              </span>
            </motion.div>
          </div>

          {/* Right Column: Home Logo */}
          <div className="lg:col-span-6 relative flex min-w-0 justify-start sm:justify-center lg:justify-end z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-[340px] sm:max-w-[680px] lg:max-w-[700px]"
            >
              <img
                src="./img/electropunta-logo-home-transparent.png"
                alt="Electropunta Soluciones Electricas"
                className="block w-full h-auto"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
