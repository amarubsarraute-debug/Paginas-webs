import { motion } from 'motion/react';

export default function NaturalVsExagerado() {
  const principles = [
    {
      title: 'Expresión conservada',
      text: 'El resultado tiene que acompañar tus gestos, no borrarlos. La naturalidad se nota cuando el rostro se ve descansado sin perder movimiento.',
      detail: 'Suavizar líneas sin congelar la expresión.'
    },
    {
      title: 'Volumen con medida',
      text: 'No todo rostro necesita más volumen. A veces la mejor indicación es mejorar hidratación, firmeza o calidad de piel antes que rellenar.',
      detail: 'Armonizar sin exagerar rasgos.'
    },
    {
      title: 'Plan según tu caso',
      text: 'La consulta define qué conviene hacer, qué conviene esperar y qué no tiene sentido tocar. El criterio médico ordena el tratamiento.',
      detail: 'Elegir menos cuando menos es mejor.'
    }
  ];

  return (
    <section className="bg-brand-dark py-20 text-brand-sand-light md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-28"
          >
            <p className="font-mono text-xs font-medium text-brand-champagne">
              Naturalidad con criterio médico
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-brand-sand-light md:text-6xl">
              No buscamos cambiar tu cara
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-sand-light/72">
              Buscamos realzar tu versión más fresca, descansada y armónica, respetando tu identidad.
            </p>
          </motion.div>

          <div className="space-y-4 md:space-y-5">
            {principles.map((principle, idx) => (
              <motion.article
                key={principle.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: idx * 0.08 }}
                className="rounded-lg border border-brand-sand-light/12 bg-brand-sand-light/8 p-6 md:p-8"
              >
                <div className="grid gap-5 md:grid-cols-[0.92fr_1.08fr] md:gap-8">
                  <div>
                    <p className="font-mono text-xs text-brand-champagne">0{idx + 1}</p>
                    <h3 className="mt-3 font-serif text-2xl font-semibold text-brand-sand-light md:text-3xl">
                      {principle.title}
                    </h3>
                  </div>
                  <div>
                    <p className="leading-relaxed text-brand-sand-light/74">{principle.text}</p>
                    <p className="mt-5 border-t border-brand-sand-light/12 pt-4 text-sm font-semibold text-brand-champagne">
                      {principle.detail}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
