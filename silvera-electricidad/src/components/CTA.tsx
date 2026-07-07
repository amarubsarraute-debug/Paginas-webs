import { WHATSAPP_LINK } from "../lib/constants";
import { Phone, MessageSquare } from "lucide-react";
import { motion } from "motion/react";

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#B5392E] to-[#982A21] text-white relative overflow-hidden z-10">
      
      {/* Subtle light effect */}
      <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Copy info */}
          <div className="text-left space-y-4 lg:max-w-2xl">
            <span className="inline-block font-mono text-xs font-bold tracking-widest text-[#FFD9A6] uppercase">
              Urgencias y Consultas 24/7
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter leading-none">
              ¿Tenés un problema eléctrico de urgencia?
            </h2>
            <p className="text-white/80 text-base sm:text-lg font-light leading-relaxed">
              ¿Salta la térmica, hay olor a quemado o te quedaste sin luz? Respondemos de forma inmediata. Contamos con brigada móvil lista para salir en Maldonado y Punta del Este.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 w-full lg:w-auto shrink-0">
            <a
              href="tel:+59891267369"
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#982A21] hover:bg-[#FFF6EC] font-bold rounded-xl shadow-xl hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 shrink-0" />
              Llamar al 091 267 369
            </a>
            <a
              href={`${WHATSAPP_LINK}&text=Hola,%20tengo%20una%20urgencia%20eléctrica.%20¿Me%20podrán%20ayudar?`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/40 hover:border-white hover:bg-white/10 text-white font-bold rounded-xl hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5 shrink-0" />
              WhatsApp de Guardia
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
