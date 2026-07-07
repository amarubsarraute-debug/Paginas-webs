import { WHATSAPP_NUMBER, EMAIL, LOCATION, SCHEDULE, WHATSAPP_LINK, SOCIAL_LINKS } from "../lib/constants";
import { MapPin, Phone, Mail, Clock, Zap, Instagram, Facebook, Linkedin, ExternalLink } from "lucide-react";


const socialIcons = {
  Instagram,
  Facebook,
  LinkedIn: Linkedin,
  Web: ExternalLink,
} as const;

export function Footer() {
  return (
    <footer className="bg-bg-tint pt-20 pb-10 border-t border-border-subtle z-10 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-left">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center text-gold shadow-md">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold text-ink tracking-tight font-display">Bazzanos<b>.</b><small className="block text-[10px] font-mono font-bold uppercase tracking-wider text-muted mt-1">Técnico Electricista</small></span>
            </div>
            <p className="text-muted leading-relaxed font-light max-w-sm text-sm sm:text-base">
              Instalaciones, reformas y gestiones ante UTE en Maldonado y Punta del Este. Respaldamos cada trabajo con seguridad y prolijidad técnica.
            </p>
          </div>

          <div>
            <h3 className="text-ink font-mono text-xs font-bold uppercase tracking-wider mb-6">Contacto</h3>
            <ul className="space-y-4 text-sm sm:text-base">
              <li>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted hover:text-gold transition-colors font-semibold">
                  <Phone className="w-4 h-4 shrink-0 text-gold" />
                  <span>{WHATSAPP_NUMBER}</span>
                </a>
              </li>
              {EMAIL && (
                <li>
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-muted hover:text-gold transition-colors font-semibold">
                    <Mail className="w-4 h-4 shrink-0 text-gold" />
                    <span>{EMAIL}</span>
                  </a>
                </li>
              )}
              {SOCIAL_LINKS.length > 0 && (
                <li className="pt-2">
                  <div className="flex flex-wrap items-center gap-3">
                    {SOCIAL_LINKS.map((link) => {
                      const Icon = socialIcons[link.label] ?? ExternalLink;

                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.label}
                          title={link.label}
                          className="w-9 h-9 rounded-full border border-border-subtle bg-paper flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-ink font-mono text-xs font-bold uppercase tracking-wider mb-6">Ubicación y Horario</h3>
            <ul className="space-y-4 text-sm sm:text-base font-light">
              <li className="flex items-start gap-3 text-muted">
                <MapPin className="w-4 h-4 shrink-0 mt-1 text-gold" />
                <span>{LOCATION}</span>
              </li>
              <li className="flex items-start gap-3 text-muted">
                <Clock className="w-4 h-4 shrink-0 mt-1 text-gold" />
                <span>{SCHEDULE}</span>
              </li>
            </ul>
          </div>
          
        </div>

        <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted">
          <p className="">
            &copy; {new Date().getFullYear()} Bazzanos Instalaciones Electricas. Firma instaladora autorizada por UTE. Todos los derechos reservados.
          </p>
          <div className="font-semibold text-ink uppercase tracking-wider">
            Instalaciones eléctricas residenciales y comerciales
          </div>
        </div>
      </div>
    </footer>
  );
}
