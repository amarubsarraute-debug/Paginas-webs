import { WHATSAPP_NUMBER_1, WHATSAPP_NUMBER_2, WHATSAPP_MESSAGE } from '../data';
import { Instagram, MessageCircle, Mail } from 'lucide-react';
import logo from '../assets/adriana-galleno-logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl1 = `https://wa.me/${WHATSAPP_NUMBER_1}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const whatsappUrl2 = `https://wa.me/${WHATSAPP_NUMBER_2}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <footer className="bg-brand-dark text-brand-sand-light pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-2">
            <img
              src={logo}
              alt="Logo Dra. Adriana Galleno Medicina Estética"
              className="mb-6 w-44 rounded-sm border border-brand-sand-light/15 shadow-lg shadow-black/10"
            />
            <p className="text-brand-sand-light/70 max-w-sm leading-relaxed mb-6">
              Medicina Estética | Ginecología Regenerativa y Funcional
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/dra.adrianagalleno" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-sand-light/10 flex items-center justify-center hover:bg-brand-gold transition-colors">
                <Instagram size={18} />
              </a>
              <a href={whatsappUrl1} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-sand-light/10 flex items-center justify-center hover:bg-brand-gold transition-colors">
                <MessageCircle size={18} />
              </a>
              <a href="mailto:essenceag.uy@gmail.com" className="w-10 h-10 rounded-full bg-brand-sand-light/10 flex items-center justify-center hover:bg-brand-gold transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-6">Ubicaciones</h4>
            <ul className="space-y-3 text-brand-sand-light/70 text-sm">
              <li>Montevideo (Buceo)</li>
              <li>Ciudad de la Costa</li>
              <li>Punta del Este / Maldonado</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-6">Contacto</h4>
            <ul className="space-y-3 text-brand-sand-light/70 text-sm">
              <li><a href={whatsappUrl1} className="hover:text-brand-gold transition-colors">WhatsApp: 092 722 058</a></li>
              <li><a href={whatsappUrl2} className="hover:text-brand-gold transition-colors">WhatsApp: 099 669 936</a></li>
              <li><a href="mailto:essenceag.uy@gmail.com" className="hover:text-brand-gold transition-colors">essenceag.uy@gmail.com</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-brand-sand-light/10 text-center md:text-left text-xs text-brand-sand-light/55 flex flex-col md:flex-row justify-between gap-4">
          <p>© {currentYear} Dra. Adriana Galleno. Todos los derechos reservados.</p>
          <p className="max-w-xl">
            La información publicada en esta web es orientativa y no reemplaza una consulta médica. Todo tratamiento requiere evaluación profesional previa.
          </p>
        </div>
      </div>
    </footer>
  );
}
