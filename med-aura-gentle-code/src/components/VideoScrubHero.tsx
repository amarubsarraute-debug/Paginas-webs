import { useEffect, useRef } from "react";
import { useScroll, useReducedMotion } from "motion/react";
import transformVideo from "@/assets/transform.mp4";
import transformPoster from "@/assets/transform_poster.jpg";
import { CtaButton } from "./CtaButton";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function VideoScrubHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    let targetTime = 0;
    let rafId = 0;
    let scheduled = false;

    const applySeek = () => {
      scheduled = false;
      if (video.readyState >= 1 && isFinite(video.duration)) {
        // fastSeek (when available) is smoother for scrubbing than setting currentTime.
        if (typeof video.fastSeek === "function") video.fastSeek(targetTime);
        else video.currentTime = targetTime;
      }
    };

    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (!isFinite(video.duration)) return;
      targetTime = Math.min(v, 0.999) * video.duration;
      if (!scheduled) {
        scheduled = true;
        rafId = requestAnimationFrame(applySeek);
      }
    });

    // Force the first frame to paint so the hero isn't blank before any scroll.
    const nudgeFirstFrame = () => {
      if (video.currentTime === 0) video.currentTime = 0.001;
    };
    video.addEventListener("loadeddata", nudgeFirstFrame, { once: true });

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadeddata", nudgeFirstFrame);
    };
  }, [scrollYProgress, reducedMotion]);

  return (
    <div id="inicio" ref={containerRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-dvh overflow-hidden">
        <video
          ref={videoRef}
          src={transformVideo}
          poster={transformPoster}
          preload="auto"
          playsInline
          muted
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-14 md:px-14 lg:px-20">
          <p className="eyebrow text-white/55">Medicina estética regenerativa</p>

          <h1 className="mt-3 font-serif text-white" style={{ fontSize: "clamp(3rem,8vw,7rem)", lineHeight: 1 }}>
            Dra. Luisa
            <br />
            <em>Cedeño</em>
          </h1>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
            Tratamientos faciales, capilares y corporales con valoración médica previa en Montevideo
            y Maldonado.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <CtaButton variant="heroWhite">
              <WhatsAppIcon className="h-4 w-4" />
              Agendar valoración
            </CtaButton>
            <a
              href="#tratamientos"
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/10"
            >
              Ver tratamientos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
