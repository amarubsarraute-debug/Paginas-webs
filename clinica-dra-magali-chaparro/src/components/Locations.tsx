import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';
import { LOCATIONS, WHATSAPP_MESSAGE, WHATSAPP_NUMBER_1 } from '../data';

export default function Locations() {
  const [activeTab, setActiveTab] = useState(LOCATIONS[0].id);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER_1}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const getMapQuery = (loc: (typeof LOCATIONS)[number]) => `${loc.address}, ${loc.name}, Uruguay`;
  const getMapUrl = (loc: (typeof LOCATIONS)[number]) =>
    'mapUrl' in loc && loc.mapUrl
      ? loc.mapUrl
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getMapQuery(loc))}`;
  const getMapEmbedUrl = (loc: (typeof LOCATIONS)[number]) =>
    'mapEmbedUrl' in loc && loc.mapEmbedUrl
      ? loc.mapEmbedUrl
      : `https://www.google.com/maps?q=${encodeURIComponent(getMapQuery(loc))}&output=embed`;

  return (
    <section id="ubicaciones" className="bg-brand-sand-light py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <div className="mb-12 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 font-serif text-3xl font-semibold text-brand-dark md:text-5xl"
          >
            Consultorio en Montevideo (Centro)
          </motion.h2>
          <p className="text-lg leading-relaxed text-brand-muted">
            Nuestro punto de atención para coordinar tu evaluación estética y tratamiento personalizado.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setActiveTab(loc.id)}
              className={`rounded-full px-6 py-3 font-medium transition-all duration-300 ${
                activeTab === loc.id
                  ? 'bg-brand-gold text-brand-sand-light shadow-md'
                  : 'bg-brand-sand-light text-brand-text hover:bg-brand-champagne-light'
              }`}
            >
              {loc.name.split(' / ')[0]}
            </button>
          ))}
        </div>

        <div className="rounded-lg border border-brand-sand bg-brand-sand-light p-7 shadow-sm md:p-10">
          {LOCATIONS.map((loc) => {
            if (loc.id !== activeTab) return null;

            return (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid items-center gap-12 md:grid-cols-2"
              >
                <div className="space-y-6">
                  <h3 className="font-serif text-2xl text-brand-dark">{loc.name}</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 text-brand-text">
                      <Calendar className="mt-1 shrink-0 text-brand-gold" size={20} />
                      <div>
                        <span className="block font-medium text-brand-dark">Días de atención</span>
                        {loc.day}
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-brand-text">
                      <Clock className="mt-1 shrink-0 text-brand-gold" size={20} />
                      <div>
                        <span className="block font-medium text-brand-dark">Horario</span>
                        {loc.time}
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-brand-text">
                      <MapPin className="mt-1 shrink-0 text-brand-gold" size={20} />
                      <div>
                        <span className="block font-medium text-brand-dark">Dirección</span>
                        {loc.address}
                      </div>
                    </div>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-gold px-8 py-3.5 font-semibold text-brand-sand-light transition-colors hover:bg-brand-dark"
                  >
                    {loc.button}
                    <ArrowRight size={18} />
                  </a>
                </div>

                <div className="overflow-hidden rounded-lg border border-brand-sand bg-brand-champagne-light shadow-sm">
                  <iframe
                    title={`Mapa de ${loc.name}`}
                    src={getMapEmbedUrl(loc)}
                    className="h-[320px] w-full md:h-[360px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <a
                    href={getMapUrl(loc)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 border-t border-brand-sand bg-brand-sand-light px-5 py-4 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-champagne-light"
                  >
                    Abrir ubicación en Google Maps
                    <ArrowRight size={16} className="shrink-0" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
