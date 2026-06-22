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

  return (
    <figure className="select-none">
      <div
        ref={containerRef}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-border bg-muted shadow-[0_16px_50px_rgba(22,80,58,0.12)]"
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
        {/* After (base) */}
        <img
          src={afterSrc}
          alt={`Después - ${alt}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        {/* Before (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img
            src={beforeSrc}
            alt={`Antes - ${alt}`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ width: containerRef.current?.clientWidth ?? "100%" }}
            draggable={false}
          />
        </div>

        {/* Labels */}
        <span className="pointer-events-none absolute left-3 top-3 rounded-md bg-foreground/70 px-3 py-1 text-[0.65rem] font-semibold uppercase text-primary-foreground backdrop-blur-sm">
          Antes
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-md bg-card/85 px-3 py-1 text-[0.65rem] font-semibold uppercase text-foreground backdrop-blur-sm">
          Después
        </span>

        {/* Handle */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6l-4 6 4 6" />
              <path d="M15 6l4 6-4 6" />
            </svg>
          </div>
        </div>

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
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        Deslizá para ver el cambio
      </figcaption>
    </figure>
  );
}
