import { WHATSAPP_LINK, WHATSAPP_NUMBER } from "../lib/constants";
import { Zap } from "lucide-react";
import { motion } from "motion/react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/85 backdrop-blur-md border-b border-border-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="h-16 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <img 
            src="./img/08-logo-prolighting.png" 
            alt="Logo Prolighting" 
            className="h-10 w-auto object-contain"
          />
          </a>

          {/* Navigation & Action */}
          <div className="flex items-center gap-6">
            {/* Desktop Navigation Links - 5 sections */}
            <nav className="hidden md:flex items-center gap-6 font-mono text-xs font-semibold text-muted">
              <a href="#" className="hover:text-gold transition-colors">Inicio</a>
              <a href="#servicios" className="hover:text-gold transition-colors">Servicios</a>
              <a href="#trabajos" className="hover:text-gold transition-colors">Trabajos</a>
              <a href="#resenas" className="hover:text-gold transition-colors">Garantía</a>
              <a href="#faq" className="hover:text-gold transition-colors">Preguntas</a>
            </nav>

            {/* Contact Button */}
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-gold/30 hover:border-gold rounded-xl text-xs font-bold text-ink bg-gold/10 hover:bg-gold/20 transition-all duration-200"
            >
              <svg className="w-4 h-4 text-gold fill-gold" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328.001 11.859.001c3.168.001 6.145 1.236 8.382 3.477 2.237 2.24 3.466 5.22 3.461 8.387-.005 6.533-5.33 11.857-11.86 11.857-2.007-.001-3.98-.51-5.753-1.479L0 24zm6.59-4.846c1.662.988 3.317 1.588 5.253 1.589 5.437-.002 9.873-4.434 9.877-9.872.003-2.636-1.018-5.114-2.88-6.978C16.98 2.03 14.512.998 11.862.998 6.425.998 1.99 5.43 1.986 10.87c0 2.012.544 3.738 1.6 5.36L2.57 20.25l4.077-1.096z"/>
              </svg>
              <span className="hidden sm:inline">WhatsApp: {WHATSAPP_NUMBER}</span>
              <span className="sm:hidden">Consultar</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
