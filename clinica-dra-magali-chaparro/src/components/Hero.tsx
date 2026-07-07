import { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER_1, WHATSAPP_MESSAGE } from '../data';
import heroVideo from '../assets/hero-transform.mp4';
import heroPoster from '../assets/hero-transform-poster.jpg';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER_1}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;

    const isTouch = (navigator.maxTouchPoints || 0) > 0 && window.innerWidth < 1000;
    if (isTouch) {
      video.loop = true;
      video.setAttribute('loop', '');
      video.setAttribute('autoplay', '');
      const tryPlay = () => {
        const play = video.play();
        if (play) play.catch(() => {});
      };
      tryPlay();
      window.addEventListener('touchstart', tryPlay, { passive: true, once: true });
      window.addEventListener('pointerdown', tryPlay, { passive: true, once: true });
      return;
    }

    video.pause();
    if (video.currentTime > 0) video.currentTime = 0;

    let targetTime = 0;
    let rafId = 0;
    let scheduled = false;

    const applySeek = () => {
      scheduled = false;
      if (video.readyState >= 1 && Number.isFinite(video.duration)) {
        if (typeof video.fastSeek === 'function') video.fastSeek(targetTime);
        else video.currentTime = targetTime;
      }
    };

    const unsubscribe = scrollYProgress.on('change', (value) => {
      if (!Number.isFinite(video.duration)) return;
      targetTime = Math.min(value, 0.999) * video.duration;
      if (!scheduled) {
        scheduled = true;
        rafId = requestAnimationFrame(applySeek);
      }
    });

    const nudgeFirstFrame = () => {
      if (video.currentTime === 0) video.currentTime = 0.001;
    };
    video.addEventListener('loadeddata', nudgeFirstFrame, { once: true });

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafId);
      video.removeEventListener('loadeddata', nudgeFirstFrame);
    };
  }, [scrollYProgress, reduceMotion]);

  return (
    <section id="inicio" ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-dvh overflow-hidden bg-brand-dark">
        <video
          ref={videoRef}
          src={heroVideo}
          poster={heroPoster}
          preload="auto"
          playsInline
          muted
          className="absolute inset-0 h-full w-full object-cover object-[54%_center] md:object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/82 via-brand-dark/34 to-brand-dark/18" />
        <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(18,32,29,0.68),rgba(18,32,29,0.18)_52%,rgba(18,32,29,0.06))]" />

        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-28 md:px-14 md:pb-14 lg:px-20">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[18rem] font-mono text-[0.64rem] font-medium uppercase leading-relaxed text-brand-sand-light/62 md:max-w-none md:text-[0.68rem]"
          >
            <span className="md:hidden">Medicina estética | Tratamientos corporales</span>
            <span className="hidden md:inline">Medicina estética | Tratamientos faciales y corporales</span>
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 max-w-5xl font-serif text-brand-sand-light"
            style={{ fontSize: 'clamp(3.4rem,8.5vw,8rem)', lineHeight: 0.95 }}
          >
            Dra. Magalí
            <br />
            <em className="font-normal">Chaparro</em>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-[21rem] text-base leading-relaxed text-brand-sand-light/78 md:max-w-xl md:text-lg"
          >
            Resultados naturales, evaluación médica personalizada y tratamientos estéticos de vanguardia en Montevideo (Centro).
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 hidden flex-wrap items-center gap-3 md:flex"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-sand-light px-6 py-3 text-sm font-semibold text-brand-dark shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-colors hover:bg-brand-champagne-light"
            >
              <MessageCircle size={17} />
              Agendar consulta
            </a>
            <a
              href="#tratamientos"
              className="inline-flex items-center gap-2 rounded-lg border border-brand-sand-light/28 px-6 py-3 text-sm font-semibold text-brand-sand-light/90 backdrop-blur-sm transition-colors hover:border-brand-sand-light/55 hover:bg-brand-sand-light/10"
            >
              Ver tratamientos
              <ArrowRight size={17} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
