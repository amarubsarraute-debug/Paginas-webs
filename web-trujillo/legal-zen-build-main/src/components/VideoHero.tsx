import { useEffect, useRef } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WA1, waLink } from "@/data/content";

/**
 * Full-screen hero whose video is scrubbed by scroll (Apple-style).
 * A tall outer section provides the scroll distance; the inner layer is
 * pinned and the clip's currentTime tracks scroll progress.
 *
 * Implemented with a plain rAF scroll listener (no motion lib) so it stays
 * SSR-safe inside TanStack Start.
 */
export function VideoHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    // Set poster based on viewport (video element poster can't use media queries)
    video.poster = window.innerWidth <= 768 ? "/hero-poster-mobile.jpg" : "/hero-poster.jpg";

    // Always paint the first frame so the hero is never blank.
    const paint = () => { try { video.currentTime = 0.001; } catch { /* noop */ } };
    if (video.readyState >= 1) paint();
    else video.addEventListener("loadedmetadata", paint, { once: true });

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // static first frame, no scrub

    // Wake the video decoder on iOS/Safari: a silent play→pause primes the decoder
    // so that subsequent currentTime seeks actually repaint frames.
    video.muted = true;
    const wake = () => {
      const p = video.play();
      if (p && p.then) p.then(() => { video.pause(); }).catch(() => {});
    };
    if (video.readyState >= 2) wake();
    else video.addEventListener("loadeddata", wake, { once: true });
    // Reinforce on first gesture (iOS often requires interaction)
    ["touchstart", "pointerdown", "click"].forEach((ev) =>
      window.addEventListener(ev, wake, { passive: true, once: true })
    );

    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;

      const dur = video.duration;
      if (dur && !Number.isNaN(dur)) {
        const t = Math.max(0, Math.min(dur - 0.05, p * dur));
        const fast = (video as HTMLVideoElement & { fastSeek?: (t: number) => void }).fastSeek;
        if (typeof fast === "function") {
          try { fast.call(video, t); } catch { video.currentTime = t; }
        } else {
          video.currentTime = t;
        }
      }

      const c = contentRef.current;
      if (c) {
        const fade = p < 0.5 ? 1 : Math.max(0, 1 - (p - 0.5) / 0.22);
        c.style.opacity = String(fade);
        c.style.transform = `translateY(${(-48 * Math.min(p / 0.72, 1)).toFixed(1)}px)`;
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} id="top" className="relative h-[300svh]">
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-ink">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster="/hero-poster.jpg"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
        >
          {/* Vertical crop for mobile, horizontal for desktop */}
          <source src="/hero-scrub-mobile.mp4" media="(max-width: 768px)" type="video/mp4" />
          <source src="/hero-scrub.mp4" type="video/mp4" />
        </video>

        {/* Stronger gradient on mobile for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/85 sm:from-black/55 sm:via-black/20 sm:to-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,transparent_45%,rgba(0,0,0,0.5))]" />

        <div
          ref={contentRef}
          className="container-page relative flex h-full flex-col justify-end pb-20 md:justify-center md:pb-0"
        >
          <div className="max-w-3xl">
            <h1 className="font-display text-[2.3rem] font-medium leading-[1.04] text-white sm:text-6xl lg:text-7xl [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">
              Estudio jurídico y notarial, con responsabilidad y{" "}
              <span className="italic font-normal">cercanía</span>.
            </h1>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-white sm:text-lg sm:mt-6 [text-shadow:0_1px_10px_rgba(0,0,0,0.7)]">
              Abogadas y escribanas en Maldonado que te escuchan, te explican con
              claridad y se ocupan de tu caso de principio a fin.
            </p>

            <div className="mt-7 sm:mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <a href="#contacto">
                  Agendar consulta <ArrowRight />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-white/30 bg-white/5 px-6 text-base text-white backdrop-blur hover:bg-white/15 hover:text-white"
              >
                <a href={waLink(WA1)} target="_blank" rel="noopener">
                  <MessageCircle /> Hablar por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
