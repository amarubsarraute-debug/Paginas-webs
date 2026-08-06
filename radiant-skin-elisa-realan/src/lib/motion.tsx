/**
 * Capa de motion propia (sin dependencias).
 *
 * Reemplaza a Framer Motion con IntersectionObserver + requestAnimationFrame.
 * Motivo: los builds estáticos que subimos a Hostinger en subcarpeta ya
 * rompieron dos veces con `motion` (web-luisa, Dr. Matías). Esto pesa ~2 kB,
 * no bloquea el hilo principal y respeta prefers-reduced-motion.
 */
import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** true en cuanto el elemento entra en viewport. Se queda en true (once). */
export function useInView<T extends HTMLElement>(
  rootMargin = '0px 0px -12% 0px',
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    // Red de seguridad: si el observer no corre (pestaña en segundo plano,
    // throttling del navegador), medimos a mano. El texto nunca debe quedar
    // en opacity 0 por una animación que no llegó a dispararse.
    const measure = () => {
      const node = ref.current;
      if (!node) return false;
      const r = node.getBoundingClientRect();
      const visible = r.top < window.innerHeight * 0.95 && r.bottom > 0;
      if (visible) setInView(true);
      return visible;
    };

    if (measure()) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      {rootMargin, threshold: 0.08},
    );
    io.observe(el);

    const onVisible = () => {
      if (measure()) io.disconnect();
    };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('scroll', onVisible, {passive: true});
    window.addEventListener('resize', onVisible);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('scroll', onVisible);
      window.removeEventListener('resize', onVisible);
    };
  }, [rootMargin]);

  return {ref, inView};
}

type RevealProps = {
  children: ReactNode;
  /** 'up' sube y aparece · 'mask' cortina vertical · 'line' barrido horizontal */
  variant?: 'up' | 'mask' | 'line';
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  id?: string;
};

/** Envuelve cualquier bloque y lo revela al entrar en pantalla. */
export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  as = 'div',
  className,
  style,
  id,
}: RevealProps) {
  const {ref, inView} = useInView<HTMLDivElement>();
  return createElement(
    as,
    {
      ref,
      id,
      className,
      'data-reveal': variant,
      'data-inview': inView ? 'true' : 'false',
      style: {...style, ['--reveal-delay' as string]: `${delay}ms`},
    },
    children,
  );
}

/**
 * Titular partido en palabras, cada una sube desde su máscara.
 * Se usa sólo en H1/H2 clave: el texto sigue siendo un único nodo accesible.
 */
export function SplitWords({
  text,
  className,
  stagger = 55,
  start = 0,
}: {
  text: string;
  className?: string;
  stagger?: number;
  start?: number;
}) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <span
            className="word-mask"
            style={{['--word-delay' as string]: `${start + i * stagger}ms`}}>
            <span>{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </span>
  );
}

/**
 * Progreso 0→1 del scroll de un elemento a través del viewport.
 * Un solo rAF loop compartido por instancia, con listener pasivo.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setProgress(0);
      return;
    }

    let frame = 0;
    let last = -1;

    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / total));
      if (Math.abs(p - last) > 0.002) {
        last = p;
        setProgress(p);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll, {passive: true});
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return {ref, progress};
}

/** Desplazamiento vertical suave ligado al scroll. speed en px por viewport. */
export function useParallax<T extends HTMLElement>(speed = 60) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -200 || rect.top > vh + 200) return;
      // -1 arriba del viewport, +1 abajo
      const t = (rect.top + rect.height / 2 - vh / 2) / vh;
      el.style.transform = `translate3d(0, ${(t * speed).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll, {passive: true});
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [speed]);

  return ref;
}
