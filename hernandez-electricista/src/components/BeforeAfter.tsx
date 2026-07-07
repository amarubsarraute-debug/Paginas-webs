import { useCallback, useRef, useState } from "react";

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
}

export function BeforeAfter({ beforeSrc, afterSrc, alt }: BeforeAfterProps) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const beforeUrl = beforeSrc; // Usamos la ruta tal cual en Vite (con /)
  const afterUrl = afterSrc;

  return (
    <figure className="select-none w-full">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border-subtle bg-bg-tint shadow-lg cursor-ew-resize"
        onMouseDown={(e) => {
          dragging.current = true;
          updateFromClientX(e.clientX);
        }}
        onMouseMove={(e) => dragging.current && updateFromClientX(e.clientX)}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        onTouchStart={(e) => updateFromClientX(e.touches[0].clientX)}
        onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
      >
        {/* After Image (base) */}
        <img
          src={afterUrl}
          alt={`Después - ${alt}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        
        {/* Before Image (clipped) */}
        <img
          src={beforeUrl}
          alt={`Antes - ${alt}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          draggable={false}
        />

        {/* Labels */}
        <span className="pointer-events-none absolute left-4 top-4 rounded-xl bg-navy/80 px-3 py-1.5 text-[10px] font-mono font-bold uppercase text-gold backdrop-blur-md shadow-sm">
          Antes
        </span>
        <span className="pointer-events-none absolute right-4 top-4 rounded-xl bg-paper/90 px-3 py-1.5 text-[10px] font-mono font-bold uppercase text-ink backdrop-blur-md shadow-sm">
          Después
        </span>

        {/* Split Handle Line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)] pointer-events-none"
          style={{ left: `${pos}%` }}
        >
          {/* Circular Button */}
          <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-paper text-ink shadow-lg">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-gold"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6l-4 6 4 6" />
              <path d="M15 6l4 6-4 6" />
            </svg>
          </div>
        </div>

        {/* Invisible range inputs for accessibility */}
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Comparador antes y después de ${alt}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-4 text-center font-mono text-xs text-muted flex items-center justify-center gap-1">
        <span>↔</span> Deslizá el control para comparar el cambio
      </figcaption>
    </figure>
  );
}
