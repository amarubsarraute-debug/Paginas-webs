import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Default state is VISIBLE (no blank flash before hydration / if JS fails).
// We only hide + animate elements that are below the fold on mount, so the
// user never sees an empty gap.
type Mode = "shown" | "hidden" | "in";

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("shown");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const rect = el.getBoundingClientRect();
    // Already on screen (or just above): keep it shown, no animation.
    if (rect.top < window.innerHeight - 40) return;

    // Below the fold: hide (off-screen, invisible to user) then animate in.
    setMode("hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMode("in");
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);

    const fallback = window.setTimeout(() => setMode("in"), 1500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const modeClass = mode === "hidden" ? "reveal-hidden" : mode === "in" ? "reveal-in" : "";

  return (
    <div
      ref={ref}
      className={`${modeClass} ${className}`}
      style={mode === "in" ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
