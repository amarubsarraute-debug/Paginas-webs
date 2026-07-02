import { motion } from 'motion/react';
import { MessageCircle, Star } from 'lucide-react';

type PatientReview = {
  title: string;
  name: string;
  text: string;
};

const reviews: PatientReview[] = [
  {
    title: 'Confianza para toda la familia',
    name: 'Manuela Martínez',
    text: 'Adri es realmente divina. Comencé yendo yo, y ahora va mi madre, mi hijo y mis amigas. Ampliamente recomendable: te hace sentir muy cómoda y además es excelente profesional.'
  },
  {
    title: 'Resultados y atención',
    name: 'Ivo Cola',
    text: 'Excelente profesional, resultados excelentes y una muy buena atención.'
  },
  {
    title: 'Profesionalismo y dedicación',
    name: 'Giovana Suárez',
    text: 'Desde que estoy en las manos de Adriana me voy muy conforme con todo lo que me trata. Es muy profesional con su trabajo, excelente persona y dedicada a cada duda que tengas. Es la mejor en todo; me siento muy bien de ser atendida por ella.'
  },
  {
    title: 'Sin dolor y feliz con el resultado',
    name: 'Isi Eunwoo',
    text: 'Quería mucho borrar las arrugas de los labios, pero tenía mucho miedo al dolor. Cuando Adriana me dijo: “te coloco anestesia odontológica y no sentís nada”, no lo podía creer. Gracias, gracias. Feliz de los resultados. La súper recomiendo. Excelente profesional.'
  },
  {
    title: 'Primera vez con seguridad',
    name: 'Viviana Paredes Olivera',
    text: 'Súper feliz con mi experiencia. Era la primera vez que me hacía los labios y me explicó todo con muchísima paciencia y claridad. Me sentí re cómoda en todo momento. Es súper amable y profesional, la recomiendo totalmente.'
  },
  {
    title: 'Trayectoria y calidez',
    name: 'Micaela Guerrero',
    text: 'Excelente profesional, con años de trayectoria. Calidez humana y comprensión de todas mis necesidades. La recomiendo.'
  },
  {
    title: 'Resultados naturales',
    name: 'Mariela',
    text: 'Excelente, no hay mejor palabra para calificar a la Dra. Galleno. Como profesional busca los mejores resultados, súper naturales y muy detallista. Como persona cálida y comprometida, sabe lo que significa el cambio para cada paciente y hace del proceso algo agradable con resultados maravillosos. Muy recomendable.'
  },
  {
    title: 'Atención cordial',
    name: 'Marta Escoda',
    text: 'Excelente atención, muy cordial, resultados naturales. Muy agradecida, Dra. Adriana.'
  },
  {
    title: 'La mejor en lo que hace',
    name: 'Agustina Martínez',
    text: 'Adriana, una genia. La mejor en lo que hace.'
  }
];

const whatsappMessages = [
  'Quedé muy contenta, no solo por la parte técnica sino por la parte humana. Nunca me trataron con tanto amor y dedicación en un tratamiento.',
  'Feliz día Adri. Sos una profesional maravillosa en cuanto a conocimiento, pero mucho más en calidad humana.',
  'Hola, buen día. Feliz con mi cara nueva.'
];

function StarRating() {
  return (
    <div className="flex gap-1 text-[#A43A34]" aria-label="5 estrellas">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={19} className="fill-current" strokeWidth={2.4} />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="resenas" className="overflow-hidden bg-brand-champagne-light py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-xs font-medium text-brand-gold">Reseñas de pacientes</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-brand-dark md:text-6xl">
              Experiencias reales con una atención cercana
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="max-w-2xl"
          >
            <div className="mb-4 flex items-center gap-3">
              <StarRating />
              <span className="text-sm font-semibold text-brand-dark">Todas de 5 estrellas</span>
            </div>
            <p className="text-lg leading-relaxed text-brand-muted">
              Pacientes que destacan resultados naturales, claridad en la consulta y una forma de acompañar que hace sentir cómoda a cada persona.
            </p>
          </motion.div>
        </div>

        <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
          {reviews.map((review, idx) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: (idx % 3) * 0.06 }}
              className="mb-6 inline-block w-full break-inside-avoid rounded-lg border border-brand-sand/70 bg-brand-sand-light/72 p-7 shadow-[0_18px_50px_rgba(53,45,41,0.06)]"
            >
              <StarRating />
              <h3 className="mt-6 text-xl font-semibold leading-tight text-brand-dark">{review.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-brand-muted">{review.text}</p>
              <p className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.22em] text-brand-gold">
                {review.name}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mt-10 grid gap-6 rounded-lg border border-brand-sand bg-brand-dark p-6 text-brand-sand-light shadow-[0_24px_70px_rgba(53,45,41,0.18)] md:grid-cols-[0.78fr_1.22fr] md:p-8"
        >
          <div>
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-brand-sand-light/10 text-brand-sand-light">
              <MessageCircle size={22} />
            </div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-brand-sand/90">
              Mensajes de pacientes
            </p>
            <h3 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
              También se nota en lo humano
            </h3>
          </div>

          <div className="grid gap-3">
            {whatsappMessages.map((message, idx) => (
              <div
                key={message}
                className={`max-w-[92%] rounded-lg bg-brand-sand-light px-5 py-4 text-brand-dark shadow-sm ${
                  idx === 1 ? 'justify-self-end' : ''
                }`}
              >
                <p className="text-sm leading-relaxed md:text-base">{message}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
