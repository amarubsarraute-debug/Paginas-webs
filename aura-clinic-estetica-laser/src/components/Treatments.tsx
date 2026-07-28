import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CONTACT_URL, TREATMENT_CATEGORIES } from '../data';

export default function Treatments() {
  return (
    <section id="tratamientos" className="bg-brand-ivory py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 max-w-3xl"
        >
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-brand-muted">
            Tratamientos
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] text-brand-dark md:text-6xl">
            El tratamiento no se vende por moda. Se indica por objetivo.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-brand-muted">
            Una estructura clara para que la consulta empiece con lo importante: qué querés mejorar, qué es realista y qué plan tiene sentido.
          </p>
        </motion.div>

        <div className="space-y-14">
          {TREATMENT_CATEGORIES.map((category, catIdx) => (
            <div key={category.title} className="grid items-start gap-6 lg:grid-cols-[280px_1fr] lg:gap-10">
              <motion.div
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:sticky lg:top-28"
              >
                <p className="font-mono text-xs font-semibold text-brand-accent">
                  {String(catIdx + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 border-l-2 border-brand-accent pl-5 font-serif text-3xl font-semibold leading-tight text-brand-dark">
                  {category.title}
                </h3>
              </motion.div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {category.items.map((item, itemIdx) => {
                  const isLead = itemIdx === 0 && category.items.length >= 4;

                  return (
                    <motion.a
                      key={item.name}
                      href={CONTACT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Consultar por ${item.name}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: itemIdx * 0.06 }}
                      className={`group flex min-h-[250px] flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ivory ${
                        isLead
                          ? 'border-brand-dark bg-brand-dark text-brand-ivory shadow-[0_22px_65px_rgba(37,42,38,0.14)] md:col-span-2 xl:col-span-1'
                          : 'border-brand-sand/55 bg-white/56 text-brand-dark hover:bg-brand-mist/55'
                      }`}
                    >
                      <div
                        className={`mb-5 flex h-11 w-11 items-center justify-center rounded-full ${
                          isLead ? 'bg-brand-ivory/10' : 'bg-brand-mist'
                        }`}
                      >
                        <Sparkles size={18} className={isLead ? 'text-brand-mist' : 'text-brand-accent'} />
                      </div>
                      <h4 className={`mb-3 text-xl font-semibold ${isLead ? 'text-brand-ivory' : 'text-brand-dark'}`}>
                        {item.name}
                      </h4>
                      <p className={`text-sm leading-relaxed ${isLead ? 'text-brand-ivory/74' : 'text-brand-muted'}`}>
                        {item.desc}
                      </p>
                      <span
                        className={`mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold ${
                          isLead ? 'text-brand-mist' : 'text-brand-accent'
                        }`}
                      >
                        Consultar
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
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
