import { useEffect, useRef, useState, type MouseEvent, type TouchEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MoveHorizontal } from 'lucide-react';
import periocularAntes from '../assets/before-after/rejuvenecimiento-periocular-antes.jpg';
import periocularDespues from '../assets/before-after/rejuvenecimiento-periocular-despues.jpg';
import labiosPerfilAntes from '../assets/before-after/03_labios_perfil_antes_alta_calidad.jpg';
import labiosPerfilDespues from '../assets/before-after/04_labios_perfil_despues_alta_calidad.jpg';
import labiosAnguloAntes from '../assets/before-after/05_labios_angulo_antes_alta_calidad.jpg';
import labiosAnguloDespues from '../assets/before-after/06_labios_angulo_despues_alta_calidad.jpg';
import perfilCuelloAntes from '../assets/before-after/07_perfil_cuello_antes_alta_calidad.jpg';
import perfilCuelloDespues from '../assets/before-after/08_perfil_cuello_despues_alta_calidad.jpg';
import capilarAntes from '../assets/before-after/09_capilar_antes_alta_calidad.jpg';
import capilarDespues from '../assets/before-after/10_capilar_despues_alta_calidad.jpg';
import manchasAntes from '../assets/before-after/11_manchas_piel_antes_alta_calidad.jpg';
import manchasDespues from '../assets/before-after/12_manchas_piel_despues_alta_calidad.jpg';

type CaseItem = {
  id: string;
  title: string;
  treatment: string;
  objective: string;
  detail: string;
  beforeImage: string;
  afterImage: string;
  imageTone?: 'light' | 'dark';
};

const cases: CaseItem[] = [
  {
    id: 'ojos',
    title: 'Rejuvenecimiento periocular',
    treatment: 'Tratamiento periocular',
    objective: 'Reducción de la flacidez de párpados y mejora de la calidad de la piel periocular.',
    detail: 'Comparación frontal de la región periocular.',
    beforeImage: periocularAntes,
    afterImage: periocularDespues
  },
  {
    id: 'labios-perfil',
    title: 'Labios de perfil',
    treatment: 'Ácido hialurónico',
    objective: 'Armonizar perfil, hidratación y proyección labial.',
    detail: 'Vista de perfil para evaluar proporción y naturalidad.',
    beforeImage: labiosPerfilAntes,
    afterImage: labiosPerfilDespues
  },
  {
    id: 'labios-angulo',
    title: 'Labios',
    treatment: 'Ácido hialurónico',
    objective: 'Mejorar hidratación, forma y volumen sutil.',
    detail: 'Vista en ángulo para mostrar la integración del resultado.',
    beforeImage: labiosAnguloAntes,
    afterImage: labiosAnguloDespues
  },
  {
    id: 'perfil-cuello',
    title: 'Perfil y cuello',
    treatment: 'Armonización facial',
    objective: 'Acompañar contorno, definición y armonía del perfil.',
    detail: 'Comparación lateral para evaluar cambios de perfil y cuello.',
    beforeImage: perfilCuelloAntes,
    afterImage: perfilCuelloDespues
  },
  {
    id: 'capilar',
    title: 'Caída capilar',
    treatment: 'Medicina regenerativa capilar',
    objective: 'Mostrar evolución progresiva con seguimiento.',
    detail: 'Fotos ordenadas para observar densidad y respuesta al tratamiento.',
    beforeImage: capilarAntes,
    afterImage: capilarDespues,
    imageTone: 'dark'
  },
  {
    id: 'manchas',
    title: 'Manchas y piel',
    treatment: 'Protocolos de piel',
    objective: 'Unificar tono y mejorar luminosidad de la piel.',
    detail: 'Comparación con foco en manchas, textura y calidad cutánea.',
    beforeImage: manchasAntes,
    afterImage: manchasDespues
  }
];

function ComparisonStage({ item }: { item: CaseItem }) {
  const [sliderPosition, setSliderPosition] = useState(52);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition(Math.max(0, Math.min((x / rect.width) * 100, 100)));
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) handleMove(event.clientX);
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (isDragging) handleMove(event.touches[0].clientX);
  };

  const handlePointerDown = (event: MouseEvent | TouchEvent) => {
    setIsDragging(true);
    if ('clientX' in event) handleMove(event.clientX);
    else handleMove(event.touches[0].clientX);
  };

  useEffect(() => {
    const stopDragging = () => setIsDragging(false);
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchend', stopDragging);
    return () => {
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchend', stopDragging);
    };
  }, []);

  const labelClass =
    item.imageTone === 'dark'
      ? 'bg-brand-sand-light/90 text-brand-dark'
      : 'bg-brand-dark/82 text-brand-sand-light';

  return (
    <div
      ref={containerRef}
      className="comparison-stage relative aspect-[4/5] w-full cursor-ew-resize select-none overflow-hidden rounded-lg border border-brand-sand bg-brand-champagne-light shadow-xl shadow-brand-dark/10 md:aspect-[16/10]"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={handlePointerDown}
      onTouchStart={handlePointerDown}
    >
      <img
        src={item.afterImage}
        alt={`${item.title} después`}
        className="absolute inset-0 h-full w-full object-contain"
        draggable={false}
      />
      <div className="absolute right-4 top-4 md:right-6 md:top-6">
        <span className={`rounded px-3 py-1 text-xs font-semibold backdrop-blur-sm ${labelClass}`}>
          Después
        </span>
      </div>

      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
        <img
          src={item.beforeImage}
          alt={`${item.title} antes`}
          className="absolute inset-0 h-full w-full object-contain"
          draggable={false}
        />
        <div className="absolute left-4 top-4 md:left-6 md:top-6">
          <span className={`rounded px-3 py-1 text-xs font-semibold backdrop-blur-sm ${labelClass}`}>
            Antes
          </span>
        </div>
      </div>

      <div
        className="absolute bottom-0 top-0 flex w-1 items-center justify-center bg-brand-sand-light"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-sand bg-brand-sand-light shadow-lg">
          <MoveHorizontal size={18} className="text-brand-dark" />
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const [activeCase, setActiveCase] = useState(cases[0]);

  return (
    <section id="resultados" className="bg-brand-sand-light py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-xs font-medium text-brand-gold">Resultados reales</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-brand-dark md:text-6xl">
              Resultados reales, sutiles y personalizados
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="max-w-2xl text-lg leading-relaxed text-brand-muted"
          >
            Casos organizados por tratamiento para mostrar la evolución con fotos reales y autorización del paciente.
          </motion.p>
        </div>

        <div className="before-after-layout grid gap-8 lg:gap-10">
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ComparisonStage item={activeCase} />
          </motion.div>

          <div className="rounded-lg border border-brand-sand bg-brand-sand-light p-5 md:p-6">
            <div>
              <p className="text-sm font-semibold text-brand-gold">{activeCase.treatment}</p>
              <h3 className="mt-2 font-serif text-3xl font-semibold leading-tight text-brand-dark">
                {activeCase.title}
              </h3>
              <p className="mt-4 leading-relaxed text-brand-text/80">{activeCase.objective}</p>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted">{activeCase.detail}</p>
            </div>

            <div className="mt-7">
              <p className="mb-3 text-sm font-semibold text-brand-dark">Seleccionar caso</p>
              <div className="grid gap-2">
                {cases.map((caseItem) => {
                  const isActive = activeCase.id === caseItem.id;
                  return (
                    <button
                      key={caseItem.id}
                      type="button"
                      onClick={() => setActiveCase(caseItem)}
                      className={`group flex items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors ${
                        isActive
                          ? 'border-brand-dark bg-brand-dark text-brand-sand-light'
                          : 'border-brand-sand bg-brand-sand-light text-brand-dark hover:bg-brand-champagne-light'
                      }`}
                    >
                      <span>
                        <span className="block text-sm font-semibold">{caseItem.title}</span>
                        <span className={`mt-0.5 block text-xs ${isActive ? 'text-brand-sand-light/65' : 'text-brand-muted'}`}>
                          {caseItem.treatment}
                        </span>
                      </span>
                      <ArrowRight size={16} className={`shrink-0 transition-transform ${isActive ? '' : 'group-hover:translate-x-1'}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-brand-muted">
          Los resultados varían según cada paciente. Toda imagen debe publicarse con autorización. La información de esta web no reemplaza una consulta médica.
        </p>
      </div>
    </section>
  );
}
