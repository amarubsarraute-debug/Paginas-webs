import { CLINIC_NAME, DOCTOR_NAME, ADDRESS, WHATSAPP_NUMBER } from '../config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-400 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-stone-800 pb-12 mb-8">
          <div className="lg:col-span-2">
            <h3 className="text-white font-display font-semibold text-xl mb-4">{CLINIC_NAME} / {DOCTOR_NAME}</h3>
            <p className="mb-6 max-w-sm text-stone-400 leading-relaxed">
              Atención profesional, clara y cercana. Cuidamos tu salud bucal priorizando tu comodidad y tranquilidad.
            </p>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <span className="font-medium text-stone-300">Dirección:</span> {ADDRESS}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium text-stone-300">WhatsApp:</span> {WHATSAPP_NUMBER}
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Servicios principales</h4>
            <ul className="space-y-2">
              <li>Odontología general</li>
              <li>Urgencias odontológicas</li>
              <li>Limpieza dental</li>
              <li>Ortodoncia</li>
              <li>Implantes dentales</li>
              <li>Rehabilitación oral</li>
              <li>Estética dental</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Enlaces útiles</h4>
            <ul className="space-y-2">
              <li><a href="#inicio" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#tratamientos" className="hover:text-white transition-colors">Tratamientos</a></li>
              <li><a href="#opiniones" className="hover:text-white transition-colors">Opiniones</a></li>
              <li><a href="#proceso" className="hover:text-white transition-colors">Cómo trabajamos</a></li>
              <li><a href="#ubicacion" className="hover:text-white transition-colors">Ubicación</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {currentYear} {CLINIC_NAME}. Todos los derechos reservados.</p>
          <p className="text-stone-500 text-xs text-center md:text-right max-w-md">
            La información de esta web es orientativa y no reemplaza la evaluación odontológica profesional.
          </p>
        </div>
      </div>
    </footer>
  );
}
