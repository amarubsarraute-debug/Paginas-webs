import { motion } from 'motion/react';

const principles = [
  {
    title: 'Sin resultados universales',
    text: 'El cuerpo cambia por edad, hábitos, genética y etapa. El plan se arma desde ese punto de partida, no desde una promesa fija.',
    detail: 'Expectativas claras antes de tratar.'
  },
  {
    title: 'Menos invasivo, más criterio',
    text: 'La estética láser puede ser una alternativa interesante cuando el objetivo es mejorar zonas concretas sin entrar en cirugía.',
    detail: 'Elegir tratamiento, zona y frecuencia.'
  },
  {
    title: 'Seguimiento real',
    text: 'La evolución importa tanto como la primera sesión. Medir, observar y ajustar hace que el proceso sea más serio y más humano.',
    detail: 'Acompañar la respuesta de cada persona.'
  }
];

export default function NaturalVsExagerado() {
  return (
    <section className="bg-brand-dark py-20 text-brand-ivory md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-28"
          >
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-brand-mist">
              Naturalidad corporal
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] text-brand-ivory md:text-6xl">
              No buscamos vender una transformación imposible.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-ivory/70">
              Buscamos que el tratamiento sea entendible, medible y acorde a tu cuerpo.
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
                className="rounded-2xl border border-brand-ivory/12 bg-brand-ivory/8 p-6 md:p-8"
              >
                <div className="grid gap-5 md:grid-cols-[0.92fr_1.08fr] md:gap-8">
                  <div>
                    <p className="font-mono text-xs text-brand-mist">0{idx + 1}</p>
                    <h3 className="mt-3 font-serif text-3xl font-semibold text-brand-ivory">
                      {principle.title}
                    </h3>
                  </div>
                  <div>
                    <p className="leading-relaxed text-brand-ivory/74">{principle.text}</p>
                    <p className="mt-5 border-t border-brand-ivory/12 pt-4 text-sm font-semibold text-brand-mist">
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
