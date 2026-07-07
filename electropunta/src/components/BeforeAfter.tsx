import { useCallback, useEffect, useRef } from "react";

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
  aspectClassName?: string;
}

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  alt,
  beforeLabel = "Antes",
  afterLabel = "Despues",
  caption = "Desliza el control para comparar",
  aspectClassName = "aspect-[4/3]",
}: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeLayerRef = useRef<HTMLDivElement>(null);
  const beforeImageRef = useRef<HTMLImageElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const dragging = useRef(false);
  const pos = useRef(50);

  const applyPos = useCallback((nextPos: number) => {
    pos.current = Math.min(100, Math.max(0, nextPos));
    const next = pos.current;

    if (beforeLayerRef.current) {
      beforeLayerRef.current.style.width = `${next}%`;
    }

    if (handleRef.current) {
      handleRef.current.style.left = `${next}%`;
    }

    if (rangeRef.current) {
      rangeRef.current.value = String(Math.round(next));
    }
  }, []);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    applyPos(pct);
  }, [applyPos]);

  useEffect(() => {
    const container = containerRef.current;
    const beforeImage = beforeImageRef.current;
    if (!container || !beforeImage) return undefined;

    const syncImageWidth = () => {
      beforeImage.style.width = `${container.clientWidth}px`;
      applyPos(pos.current);
    };

    syncImageWidth();

    const resizeObserver = new ResizeObserver(syncImageWidth);
    resizeObserver.observe(container);

    const stopPointerDrag = () => {
      dragging.current = false;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", stopPointerDrag);
      window.removeEventListener("pointercancel", stopPointerDrag);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging.current) return;
      event.preventDefault();
      updateFromClientX(event.clientX);
    };

    const onPointerDown = (event: PointerEvent) => {
      event.preventDefault();
      dragging.current = true;
      updateFromClientX(event.clientX);

      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", stopPointerDrag);
      window.removeEventListener("pointercancel", stopPointerDrag);

      window.addEventListener("pointermove", onPointerMove, { passive: false });
      window.addEventListener("pointerup", stopPointerDrag);
      window.addEventListener("pointercancel", stopPointerDrag);
    };

    const stopMouseDrag = () => {
      dragging.current = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopMouseDrag);
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!dragging.current) return;
      event.preventDefault();
      updateFromClientX(event.clientX);
    };

    const onMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      dragging.current = true;
      updateFromClientX(event.clientX);
      window.addEventListener("mousemove", onMouseMove, { passive: false });
      window.addEventListener("mouseup", stopMouseDrag);
    };

    const stopTouchDrag = () => {
      dragging.current = false;
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stopTouchDrag);
      window.removeEventListener("touchcancel", stopTouchDrag);
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!dragging.current || event.touches.length === 0) return;
      event.preventDefault();
      updateFromClientX(event.touches[0].clientX);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 0) return;
      event.preventDefault();
      dragging.current = true;
      updateFromClientX(event.touches[0].clientX);
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", stopTouchDrag);
      window.addEventListener("touchcancel", stopTouchDrag);
    };

    container.addEventListener("pointerdown", onPointerDown, { passive: false });

    if (!window.PointerEvent) {
      container.addEventListener("mousedown", onMouseDown, { passive: false });
      container.addEventListener("touchstart", onTouchStart, { passive: false });
    }

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("touchstart", onTouchStart);
      stopPointerDrag();
      stopMouseDrag();
      stopTouchDrag();
    };
  }, [applyPos, updateFromClientX]);

  return (
    <figure className="w-full select-none">
      <div
        ref={containerRef}
        data-compare-root
        className={`relative ${aspectClassName} w-full touch-none cursor-ew-resize overflow-hidden rounded-2xl border border-border-subtle bg-bg-tint shadow-xl`}
      >
        <img
          src={afterSrc}
          alt={`${afterLabel} - ${alt}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />

        <div
          ref={beforeLayerRef}
          data-compare-before-layer
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: "50%", willChange: "width" }}
        >
          <img
            ref={beforeImageRef}
            src={beforeSrc}
            alt={`${beforeLabel} - ${alt}`}
            loading="lazy"
            decoding="async"
            className="absolute left-0 top-0 h-full max-w-none object-cover"
            draggable={false}
          />
        </div>

        <span className="pointer-events-none absolute left-4 top-4 rounded-xl bg-navy/85 px-3 py-1.5 text-[10px] font-mono font-bold uppercase text-gold shadow-sm backdrop-blur-md">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute right-4 top-4 rounded-xl bg-paper/90 px-3 py-1.5 text-[10px] font-mono font-bold uppercase text-ink shadow-sm backdrop-blur-md">
          {afterLabel}
        </span>

        <div
          ref={handleRef}
          data-compare-handle
          className="pointer-events-none absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]"
          style={{ left: "50%", willChange: "left" }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-paper text-ink shadow-lg">
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

        <input
          ref={rangeRef}
          type="range"
          min={0}
          max={100}
          defaultValue={50}
          onChange={(event) => applyPos(Number(event.target.value))}
          aria-label={`Comparador de ${alt}`}
          className="sr-only"
        />
      </div>
      <figcaption className="mt-4 flex items-center justify-center gap-1 text-center font-mono text-xs text-muted">
        <span aria-hidden="true">&lt;-&gt;</span> {caption}
      </figcaption>
    </figure>
  );
}
