import { BRAND_DESCRIPTOR, BRAND_NAME, CONTACT_LABEL, CONTACT_URL, INSTAGRAM_URL, MONTEVIDEO_ADDRESS, PUNTA_DEL_ESTE_ADDRESS, WHATSAPP_NUMBER } from '../data';
import { Instagram, MapPin, MessageCircle } from 'lucide-react';
import logoImage from '../assets/aura-clinic/aura-clinic-logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark pb-24 pt-16 text-brand-ivory md:pb-10">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="mb-12 grid gap-10 md:grid-cols-[1.2fr_0.9fr_0.75fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-full border border-brand-gold/40 bg-brand-ivory p-1">
                <img src={logoImage} alt="Aura Clinic" className="h-full w-full rounded-full object-cover" />
              </span>
              <div>
                <p className="font-serif text-3xl leading-none">{BRAND_NAME}</p>
                <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-brand-gold">
                  {BRAND_DESCRIPTOR}
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-sm leading-relaxed text-brand-ivory/70">
              Clínica estética láser y facial con evaluación profesional, casos reales y agenda previa.
            </p>
            <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="primary-button mt-7">
              <MessageCircle size={17} />
              {CONTACT_LABEL}
            </a>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-semibold">Sedes</h4>
            <ul className="space-y-3 text-sm text-brand-ivory/70">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 shrink-0 text-brand-gold" size={16} />
                Montevideo: {MONTEVIDEO_ADDRESS}
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 shrink-0 text-brand-gold" size={16} />
                Punta del Este: {PUNTA_DEL_ESTE_ADDRESS}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-semibold">Contacto</h4>
            <ul className="space-y-3 text-sm text-brand-ivory/70">
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-brand-gold">
                  <Instagram size={16} />
                  @auraclinic.uy
                </a>
              </li>
              <li>WhatsApp: {WHATSAPP_NUMBER}</li>
              <li>Agenda previa por canal oficial</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-brand-ivory/10 pt-8 text-xs text-brand-ivory/55 md:flex-row md:items-start md:justify-between">
          <p>© {currentYear} Aura Clinic. Todos los derechos reservados.</p>
          <p className="max-w-xl">
            Información orientativa. Todo tratamiento requiere evaluación profesional previa.
          </p>
        </div>
      </div>
    </footer>
  );
}
