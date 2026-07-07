import { WHATSAPP_LINK } from "../lib/constants";
import { ShieldCheck, MapPin, Phone, Star } from "lucide-react";
import { motion } from "motion/react";
import heroImage from "../assets/fotos_gallery/fotos ocean parck/04-cocina-rustica-con-luminarias.png";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none z-0" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="col-span-12 lg:col-span-5 space-y-6 text-left">
            {/* Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 font-mono text-[10px] font-extrabold tracking-[0.2em] text-gold uppercase"
            >
              <span>ELECTRICIDAD OCEAN PARK</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink leading-[1.08] tracking-tighter"
            >
              Instalaciones eléctricas{" "}
              <span className="relative inline-block text-ink z-10">
                <span className="relative z-10">seguras</span>
                <span className="absolute left-0 right-0 bottom-[4px] h-[0.3em] bg-gold-soft rounded-sm -z-10" />
              </span>{" "}
              para viviendas, comercios y obras
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-lg sm:text-xl text-muted leading-relaxed max-w-xl font-light"
            >
              Servicio profesional a cargo de{" "}
              <span className="relative inline-block text-ink z-10 font-extrabold mr-1">
                <span className="relative z-10">Facundo Azcurra</span>
                <span className="absolute left-0 right-0 bottom-[2px] h-[0.25em] bg-gold-soft rounded-sm -z-10" />
              </span>{" "}
              en Ocean Park. Soluciones confiables, materiales de calidad y ejecución prolija en cada proyecto.
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
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328.001 11.859.001c3.168.001 6.145 1.236 8.382 3.477 2.237 2.24 3.466 5.22 3.461 8.387-.005 6.533-5.33 11.857-11.86 11.857-2.007-.001-3.98-.51-5.753-1.479L0 24zm6.59-4.846c1.662.988 3.317 1.588 5.253 1.589 5.437-.002 9.873-4.434 9.877-9.872.003-2.636-1.018-5.114-2.88-6.978C16.98 2.03 14.512.998 11.862.998 6.425.998 1.99 5.43 1.986 10.87c0 2.012.544 3.738 1.6 5.36L2.57 20.25l4.077-1.096z"/>
                </svg>
                <span>Consultar por WhatsApp</span>
              </a>
              <a
                href="tel:+59891476681" // Usamos el número de teléfono del cliente de la landing
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-gold/5 border border-border-strong text-ink font-bold rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5 text-gold" />
                Llamar al 091 476 681
              </a>
            </motion.div>

            {/* UTE Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="flex items-center gap-2.5 pt-4 text-xs font-bold text-gold font-mono uppercase tracking-widest text-left"
            >
              <ShieldCheck className="w-5.5 h-5.5 text-gold shrink-0" strokeWidth={1.5} />
              <span>Técnico autorizado por UTE</span>
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

          {/* Right Column: Photo Frame with Lamps */}
          <div className="col-span-12 lg:col-span-7 relative flex justify-center z-10 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-none"
            >
              <div className="relative aspect-[3/2] rounded-3xl overflow-hidden bg-bg-tint border border-border-subtle shadow-2xl">
                <img
                  src={heroImage}
                  alt="Instalación de iluminación de diseño en cocina rústica en Ocean Park"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
