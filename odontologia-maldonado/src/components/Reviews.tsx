import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { REVIEW_SLOTS, GOOGLE_REVIEW_LINK } from '../data';

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
  // Filter out empty or placeholder review slots
  const activeReviews = REVIEW_SLOTS.filter(r => r.text && r.text.length > 5);

  if (activeReviews.length === 0) return null;

  return (
    <section id="resenas" className="overflow-hidden bg-brand-champagne-light py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-xs font-medium text-brand-gold">Opiniones reales</p>
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
              <span className="text-sm font-semibold text-brand-dark">Calificación Excelente</span>
            </div>
            <p className="text-lg leading-relaxed text-brand-muted mb-4">
              Pacientes que destacan resultados naturales, claridad en la consulta y una forma de acompañar que hace sentir cómoda a cada persona.
            </p>
            {GOOGLE_REVIEW_LINK && (
              <a 
                href={GOOGLE_REVIEW_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-gold hover:text-brand-dark transition-colors border border-brand-sand/50 rounded-full px-4 py-2 bg-brand-sand-light/50"
              >
                Dejar opinión en Google →
              </a>
            )}
          </motion.div>
        </div>

        <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
          {activeReviews.map((review, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: (idx % 3) * 0.06 }}
              className="mb-6 inline-block w-full break-inside-avoid rounded-lg border border-brand-sand/70 bg-brand-sand-light/72 p-7 shadow-[0_18px_50px_rgba(53,45,41,0.06)]"
            >
              <StarRating />
              <p className="mt-6 text-base leading-relaxed text-brand-muted">"{review.text}"</p>
              <p className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.22em] text-brand-gold">
                {review.title || 'Paciente'}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
