import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { TREATMENT_CATEGORIES, WHATSAPP_NUMBER_1 } from '../data';

export default function Treatments() {
  const createTreatmentUrl = (treatmentName: string) =>
    `https://wa.me/${WHATSAPP_NUMBER_1}?text=${encodeURIComponent(
      `Hola Dra. Adriana, mi nombre es ... Me gustaría consultar por ${treatmentName}. Vi la información en la web y quisiera saber si este tratamiento es adecuado para mi caso. ¿Podemos coordinar una evaluación?`
    )}`;

  return (
    <section id="tratamientos" className="bg-brand-sand-light py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <h2 className="mb-4 font-serif text-3xl font-semibold leading-tight text-brand-dark md:text-5xl">
            Tratamientos de medicina estética y bienestar femenino
          </h2>
          <p className="text-lg leading-relaxed text-brand-muted">
            Un menú amplio, ordenado por criterio médico para entender qué se trabaja en cada consulta.
          </p>
        </motion.div>

        <div className="space-y-16">
          {TREATMENT_CATEGORIES.map((category, catIdx) => (
            <div key={category.title} className="grid items-start gap-6 lg:grid-cols-[280px_1fr] lg:gap-10">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="border-l-2 border-brand-gold pl-5 font-serif text-2xl font-semibold text-brand-dark md:text-3xl lg:sticky lg:top-28"
              >
                {category.title}
              </motion.h3>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {category.items.map((item, itemIdx) => {
                  const isLead = itemIdx === 0 && category.items.length > 3;

                  return (
                    <motion.a
                      key={item.name}
                      href={createTreatmentUrl(item.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Consultar por ${item.name} en WhatsApp`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: itemIdx * 0.1 }}
                      className={`group flex min-h-[260px] flex-col rounded-lg border border-brand-sand p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-brand-dark/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-sand-light ${
                        isLead
                          ? 'bg-brand-dark text-brand-sand-light md:col-span-2 xl:col-span-1'
                          : 'bg-brand-sand-light text-brand-dark'
                      }`}
                    >
                      <div
                        className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition-colors ${
                          isLead ? 'bg-brand-sand-light/10' : 'bg-brand-champagne-light group-hover:bg-brand-sage-light'
                        }`}
                      >
                        <Sparkles size={18} className={isLead ? 'text-brand-champagne' : 'text-brand-gold'} />
                      </div>
                      <h4 className={`mb-2 text-lg font-semibold ${isLead ? 'text-brand-sand-light' : 'text-brand-dark'}`}>
                        {item.name}
                      </h4>
                      <p className={`text-sm leading-relaxed ${isLead ? 'text-brand-sand-light/75' : 'text-brand-muted'}`}>
                        {item.desc}
                      </p>
                      <span
                        className={`mt-auto inline-flex pt-6 text-sm font-semibold transition-transform group-hover:translate-x-1 ${
                          isLead ? 'text-brand-champagne' : 'text-brand-gold'
                        }`}
                      >
                        Consultar por WhatsApp →
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
