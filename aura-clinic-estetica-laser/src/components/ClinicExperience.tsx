import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { X } from 'lucide-react';
import receptionImage from '../assets/aura-clinic/recepcion-aura-clinic.jpg';
import procedureImage from '../assets/aura-clinic/procedimiento-quirurgico-aura-clinic.jpg';
import teamImage from '../assets/aura-clinic/equipo-medico-aura-clinic.jpg';
import womanImage from '../assets/aura-clinic/doctora-post-tratamiento-mela.jpg';

const scenes = [
  {
    title: 'Recepción',
    caption: 'Ingreso y recepción',
    image: receptionImage,
    alt: 'Recepción de Aura Clinic',
    position: '50% 44%',
    className:
      'left-0 top-[8%] z-10 h-[72%] w-[62%] sm:w-[56%] lg:h-[78%] lg:w-[38%]',
    delay: [0, 0.14] as [number, number],
    rotate: [-6, -2] as [number, number]
  },
  {
    title: 'Procedimiento',
    caption: 'Sala y tecnología',
    image: procedureImage,
    alt: 'Procedimiento en Aura Clinic',
    position: '50% 66%',
    className:
      'right-0 top-0 z-20 h-[45%] w-[43%] sm:w-[39%] lg:h-[50%] lg:w-[31%]',
    delay: [0.1, 0.28] as [number, number],
    rotate: [7, 2] as [number, number]
  },
  {
    title: 'Equipo',
    caption: 'Equipo médico Aura Clinic',
    image: teamImage,
    alt: 'Equipo de Aura Clinic',
    position: '50% 34%',
    className:
      'right-0 bottom-0 z-30 h-[38%] w-[53%] sm:w-[47%] lg:h-[41%] lg:w-[34%]',
    delay: [0.22, 0.42] as [number, number],
    rotate: [-8, -1] as [number, number]
  },
  {
    title: 'Cuidado',
    caption: 'Seguimiento cercano',
    image: womanImage,
    alt: 'Mujer en Aura Clinic luego de tratamiento',
    position: '50% 36%',
    className:
      'bottom-[5%] left-[30%] z-40 h-[36%] w-[35%] sm:left-[32%] sm:w-[30%] lg:bottom-[2%] lg:left-[34%] lg:h-[43%] lg:w-[26%]',
    delay: [0.34, 0.56] as [number, number],
    rotate: [8, 2] as [number, number]
  }
];

type Scene = (typeof scenes)[number];

type ScrollPhotoProps = {
  key?: string;
  scene: Scene;
  style?: {
    y: MotionValue<number>;
    rotate: MotionValue<number>;
    scale: MotionValue<number>;
  };
  onOpen: (scene: Scene) => void;
};

function ScrollPhoto({ scene, style, onOpen }: ScrollPhotoProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(scene)}
      style={style}
      className={`group absolute overflow-hidden border-2 border-brand-ivory bg-brand-paper text-left shadow-[16px_16px_0_rgba(200,169,79,0.18)] outline-none transition-shadow hover:shadow-[20px_20px_0_rgba(200,169,79,0.28)] focus-visible:ring-2 focus-visible:ring-brand-gold ${scene.className}`}
      aria-label={`Ver ${scene.title}`}
    >
      <img
        src={scene.image}
        alt={scene.alt}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 group-focus-visible:scale-105"
        style={{ objectPosition: scene.position }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/48 via-brand-dark/4 to-transparent opacity-76 transition-opacity group-hover:opacity-56" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-brand-ivory sm:p-5">
        <p className="font-serif text-2xl leading-none md:text-3xl">{scene.title}</p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-ivory/62">
          {scene.caption}
        </p>
      </div>
    </motion.button>
  );
}

export default function ClinicExperience() {
  const [activeImage, setActiveImage] = useState<(typeof scenes)[number] | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  const receptionY = useTransform(scrollYProgress, scenes[0].delay, [760, 0]);
  const receptionRotate = useTransform(scrollYProgress, scenes[0].delay, scenes[0].rotate);
  const receptionScale = useTransform(scrollYProgress, scenes[0].delay, [0.95, 1]);

  const procedureY = useTransform(scrollYProgress, scenes[1].delay, [780, 0]);
  const procedureRotate = useTransform(scrollYProgress, scenes[1].delay, scenes[1].rotate);
  const procedureScale = useTransform(scrollYProgress, scenes[1].delay, [0.95, 1]);

  const teamY = useTransform(scrollYProgress, scenes[2].delay, [780, 0]);
  const teamRotate = useTransform(scrollYProgress, scenes[2].delay, scenes[2].rotate);
  const teamScale = useTransform(scrollYProgress, scenes[2].delay, [0.95, 1]);

  const womanY = useTransform(scrollYProgress, scenes[3].delay, [780, 0]);
  const womanRotate = useTransform(scrollYProgress, scenes[3].delay, scenes[3].rotate);
  const womanScale = useTransform(scrollYProgress, scenes[3].delay, [0.95, 1]);

  const photoStyles = [
    { y: receptionY, rotate: receptionRotate, scale: receptionScale },
    { y: procedureY, rotate: procedureRotate, scale: procedureScale },
    { y: teamY, rotate: teamRotate, scale: teamScale },
    { y: womanY, rotate: womanRotate, scale: womanScale }
  ];

  return (
    <section ref={sectionRef} id="espacio" className="relative scroll-mt-24 bg-brand-dark text-brand-ivory">
      <div className="clinical-grid px-5 py-20 md:hidden">
        <div className="max-w-[21rem]">
          <p className="eyebrow text-brand-gold">La clínica</p>
          <h2 className="mt-4 font-serif text-6xl font-semibold leading-[0.88] text-brand-ivory">
            Aura por dentro.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-brand-ivory/68">
            Recepción, procedimiento, equipo y cuidado.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {scenes.map((scene, index) => (
            <motion.button
              key={scene.title}
              type="button"
              onClick={() => setActiveImage(scene)}
              initial={reduceMotion ? false : { opacity: 0, y: 34, scale: 0.96 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.34 }}
              transition={{ delay: index * 0.05, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-[23rem] w-full overflow-hidden border-2 border-brand-ivory bg-brand-paper text-left shadow-[12px_12px_0_rgba(200,169,79,0.18)]"
            >
              <img
                src={scene.image}
                alt={scene.alt}
                className="h-full w-full object-cover"
                style={{ objectPosition: scene.position }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-brand-dark/4 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-serif text-3xl leading-none">{scene.title}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-ivory/62">
                  {scene.caption}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="hidden h-[390vh] md:block">
        <div className="clinical-grid sticky top-0 h-[100dvh] overflow-hidden bg-brand-dark text-brand-ivory">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(200,169,79,0.2),transparent_28rem),linear-gradient(90deg,rgba(13,14,11,0.96),rgba(13,14,11,0.78)_42%,rgba(13,14,11,0.28))]" />
        <div className="relative mx-auto h-full max-w-[1680px] px-5 pb-12 pt-24 sm:px-8 md:py-20 lg:px-12 lg:py-24">
          <div className="relative z-[60] max-w-[31rem] lg:w-[39%]">
            <p className="eyebrow text-brand-gold">La clínica</p>
            <h2 className="mt-4 font-serif text-[clamp(3.4rem,7vw,8.25rem)] font-semibold leading-[0.86] text-brand-ivory">
              Aura por dentro.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-brand-ivory/68 md:text-lg">
              Recepción, procedimiento, equipo y cuidado en un recorrido visual.
            </p>
          </div>

          <div className="absolute inset-x-5 bottom-8 top-[45%] sm:inset-x-8 md:top-[39%] lg:bottom-12 lg:left-[43%] lg:right-12 lg:top-16">
            {scenes.map((scene, index) => (
              <ScrollPhoto
                key={scene.title}
                scene={scene}
                onOpen={setActiveImage}
                style={reduceMotion ? undefined : photoStyles[index]}
              />
            ))}
          </div>

          <p className="absolute bottom-5 left-5 z-[60] max-w-[260px] text-xs leading-relaxed text-brand-ivory/50 sm:left-8 lg:bottom-10 lg:left-12">
            Montevideo y Punta del Este · Evaluación médica y estética láser.
          </p>
        </div>
      </div>
      </div>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-dark/92 p-5"
            onClick={() => setActiveImage(null)}
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute right-5 top-5 rounded-full bg-brand-ivory/10 p-3 text-brand-ivory backdrop-blur"
              aria-label="Cerrar imagen"
            >
              <X size={22} />
            </button>
            <motion.img
              initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 18, scale: 0.98 }}
              src={activeImage.image}
              alt={activeImage.alt}
              className="max-h-[84dvh] max-w-5xl rounded-[1rem] object-contain"
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
