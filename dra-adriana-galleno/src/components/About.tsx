import { motion } from 'motion/react';
import doctorPhoto from '../assets/dra-adriana-galleno-consultorio.jpg';

export default function About() {
  return (
    <section id="sobre-mi" className="relative overflow-hidden bg-brand-dark py-20 text-brand-sand-light md:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 mx-auto w-full max-w-md lg:order-1 lg:mx-0 lg:max-w-lg"
          >
            <div className="relative">
              <div className="absolute inset-0 translate-x-4 translate-y-4 border border-brand-sand-light/15" />
              <div className="relative z-10 overflow-hidden rounded-sm border border-brand-sand-light/15 bg-brand-sand-light/10 shadow-xl shadow-black/10">
                <img
                  src={doctorPhoto}
                  alt="Dra. Adriana Galleno en consultorio"
                  className="aspect-[4/5] h-full w-full object-cover object-[50%_35%]"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h2 className="mb-6 font-serif text-4xl font-semibold text-brand-sand-light md:text-6xl">
              Dra. Adriana Galleno
            </h2>

            <div className="space-y-5 text-base leading-relaxed text-brand-sand-light/76 md:text-lg">
              <p className="text-xl leading-relaxed text-brand-sand-light/92">
                Médica egresada de la UDELAR, especializada en Medicina Estética y Ginecología Regenerativa y Funcional.
              </p>
              <p>
                Mi enfoque se basa en lograr resultados naturales, seguros y armónicos, respetando siempre la identidad de cada paciente. Acompaño procesos de embellecimiento facial y corporal, así como el bienestar ginecológico durante la perimenopausia y menopausia.
              </p>
              <p>
                Cuento con formación acreditada por la Sociedad Argentina de Especialistas en Medicina Estética y la Universidad de Buenos Aires, y soy miembro de AMEU, la Asociación de Médicos Estéticos del Uruguay.
              </p>
              <p>
                Mi propósito es ayudarte a verte y sentirte mejor, con tratamientos personalizados, criterio médico y una atención cercana.
              </p>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
