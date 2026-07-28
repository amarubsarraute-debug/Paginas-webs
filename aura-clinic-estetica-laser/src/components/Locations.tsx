import { motion } from 'motion/react';
import { Calendar, ExternalLink, MapPin, MessageCircle } from 'lucide-react';
import { LOCATIONS, WHATSAPP_NUMBER } from '../data';
import montevideoImage from '../assets/aura-clinic/sede-montevideo-rambla.jpg';
import puntaDelEsteImage from '../assets/aura-clinic/sede-punta-del-este.jpg';

const locationImages = [
  { src: montevideoImage, alt: 'Vista de Montevideo sobre la Rambla', position: '50% 58%' },
  { src: puntaDelEsteImage, alt: 'Vista aérea de Punta del Este', position: '50% 52%' }
];

export default function Locations() {
  return (
    <section id="ubicaciones" className="bg-brand-ivory py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl"
        >
          <p className="eyebrow text-brand-muted">Sedes</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] text-brand-dark md:text-6xl">
            Montevideo y Punta del Este.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-brand-muted">
            La agenda se coordina por WhatsApp al {WHATSAPP_NUMBER}.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {LOCATIONS.map((loc, idx) => {
            const image = locationImages[idx];

            return (
              <motion.article
                key={loc.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="overflow-hidden rounded-[1.35rem] border border-brand-dark/10 bg-brand-paper shadow-[0_18px_55px_rgba(13,14,11,0.07)]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="aspect-[16/10] w-full object-cover"
                  style={{ objectPosition: image.position }}
                  loading="lazy"
                />
                <div className="p-7">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-sm font-semibold text-brand-gold">Sede</p>
                      <h3 className="mt-2 font-serif text-4xl text-brand-dark">{loc.name}</h3>
                    </div>
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-sand-light text-brand-gold">
                      <MapPin size={22} />
                    </div>
                  </div>

                  <div className="mt-7 space-y-4 text-brand-text">
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-1 shrink-0 text-brand-gold" size={19} />
                      <div>
                        <span className="block font-medium text-brand-dark">{loc.day}</span>
                        <span className="text-sm text-brand-muted">{loc.time}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 shrink-0 text-brand-gold" size={19} />
                      <div>
                        <span className="block font-medium text-brand-dark">{loc.address}</span>
                        <span className="text-sm text-brand-muted">{loc.note}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a href={loc.whatsappUrl} target="_blank" rel="noopener noreferrer" className="primary-button">
                      <MessageCircle size={17} />
                      Consultar sede
                    </a>
                    <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer" className="secondary-button-light">
                      <ExternalLink size={17} />
                      Ver mapa
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
