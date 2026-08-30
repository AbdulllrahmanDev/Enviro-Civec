import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

export interface MetroHeroProps {
  videoSrc?: string;
  titleLine1?: string;
  titleLine2?: string;
  titleLine3?: string;
  description?: string;
  scrollHint?: string;
  tagline?: string;
  taglineLine1?: string;
  taglineLine2?: string;
  consultationText?: string;
  viewProjectsText?: string;
  onConsultationClick?: () => void;
  onViewProjectsClick?: () => void;
  dir?: "rtl" | "ltr";
  /** Total input distance (px) needed to scrub the full video */
  scrubDistance?: number;
  className?: string;
  style?: React.CSSProperties;
}

// High quality civil engineering infrastructure & piping video
const DEFAULT_VIDEO = "/videos/infrastructure.hero.mp4";
const WEBM_VIDEO = "/videos/infrastructure.hero.webm";
const FALLBACK_VIDEO =
  "https://upload.wikimedia.org/wikipedia/commons/5/51/Timelapse_of_I-285_and_SR_400_interchange_construction_in_Georgia_USA.webm";

const SANS = "'Cairo', 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function MetroHero({
  videoSrc = DEFAULT_VIDEO,
  titleLine1 = "بناء",
  titleLine2 = "بنية تحتية",
  titleLine3 = "مستدامة",
  description = "شريكك الموثوق في الاستشارات الهندسية البيئية والمدنية. نصمم بنية تحتية تخدم المجتمعات وتحترم كوكبنا.",
  scrollHint = "تمرير لأسفل",
  tagline,
  taglineLine1 = "حلول هندسية متقدمة",
  taglineLine2 = "استدامة بيئية رائدة",
  consultationText = "طلب استشارة",
  viewProjectsText = "استكشاف المشاريع",
  onConsultationClick,
  onViewProjectsClick,
  dir = "rtl",
  scrubDistance = 4800,
  className = "",
  style,
}: MetroHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let duration = 0;
    let rafId = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    let hasStartedScrolling = false;
    let isSeeking = false;
    let pendingTime: number | null = null;
    let locked = false;
    let touchStartY = 0;

    const onLoadedData = () => {
      duration = video.duration || 0;
      setReady(true);
      if (reduceMotion) {
        video.currentTime = duration * 0.92;
      }
    };
    video.addEventListener("loadeddata", onLoadedData);

    const onSeeked = () => {
      isSeeking = false;
      if (pendingTime !== null) {
        const t = pendingTime;
        pendingTime = null;
        isSeeking = true;
        video.currentTime = t;
      }
    };
    video.addEventListener("seeked", onSeeked);

    function seekTo(t: number) {
      if (!video) return;
      if (isSeeking) {
        pendingTime = t;
        return;
      }
      isSeeking = true;
      video.currentTime = t;
    }

    function engageLock() {
      if (locked || typeof document === "undefined") return;
      if (window.scrollY > 10) return;
      locked = true;
      document.body.style.overflow = "hidden";
    }

    function releaseLock() {
      if (!locked || typeof document === "undefined") return;
      locked = false;
      document.body.style.overflow = "";
    }

    // Start with lock active when at the top of the page
    if (window.scrollY < 10) {
      engageLock();
    }

    function addDelta(deltaY: number) {
      if (!locked) {
        // If scrolled back to top and user scrolls up, re-engage
        if (window.scrollY <= 5 && deltaY < 0) {
          targetProgress = 1;
          currentProgress = 1;
          engageLock();
          return false;
        }
        return false;
      }

      const next = clamp(targetProgress + deltaY / scrubDistance, 0, 1.05);

      if (next >= 1 && deltaY > 0) {
        targetProgress = 1;
        releaseLock();
        return false;
      }

      targetProgress = clamp(next, 0, 1);
      if (targetProgress > 0.001) hasStartedScrolling = true;
      return true;
    }

    const onWheel = (e: WheelEvent) => {
      if (locked) {
        const handled = addDelta(e.deltaY);
        if (handled) {
          e.preventDefault();
        }
      } else if (window.scrollY <= 2 && e.deltaY < 0) {
        addDelta(e.deltaY);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!locked && window.scrollY > 5) return;
      const y = e.touches[0]?.clientY ?? touchStartY;
      const deltaY = touchStartY - y;
      touchStartY = y;
      const handled = addDelta(deltaY);
      if (handled) {
        e.preventDefault();
      }
    };

    const handleWindowScroll = () => {
      if (!locked && window.scrollY <= 2 && targetProgress >= 0.99) {
        // User scrolled back to top
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("scroll", handleWindowScroll, { passive: true });

    function frame() {
      currentProgress += (targetProgress - currentProgress) * 0.12;

      if (duration > 0) {
        seekTo(currentProgress * duration);
      }

      if (videoRef.current) {
        const scale = 1 + currentProgress * 0.05;
        videoRef.current.style.transform = `scale(${scale})`;
      }

      if (titleRef.current) {
        const t = 1 - clamp(currentProgress / 0.35, 0, 1);
        titleRef.current.style.opacity = String(t);
        titleRef.current.style.transform = `translateY(${(1 - t) * -30}px) scale(${0.96 + t * 0.04})`;
        titleRef.current.style.filter = `blur(${(1 - t) * 8}px)`;
        titleRef.current.style.pointerEvents = t > 0.3 ? "auto" : "none";
      }

      if (hintRef.current) {
        hintRef.current.style.opacity = hasStartedScrolling ? "0" : "1";
      }

      if (taglineRef.current) {
        const t = clamp((currentProgress - 0.75) / 0.25, 0, 1);
        taglineRef.current.style.opacity = String(t);
        taglineRef.current.style.transform = `translateY(${(1 - t) * 20}px) scale(${0.97 + t * 0.03})`;
        taglineRef.current.style.filter = `blur(${(1 - t) * 6}px)`;
      }

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${currentProgress})`;
      }

      rafId = requestAnimationFrame(frame);
    }

    if (!reduceMotion) {
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", handleWindowScroll);
      cancelAnimationFrame(rafId);
      releaseLock();
    };
  }, [scrubDistance]);

  return (
    <div
      ref={sectionRef}
      className={`relative w-full h-[100dvh] overflow-hidden bg-black text-white ${className}`}
      style={{
        ...style,
      }}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src={videoSrc || DEFAULT_VIDEO}
        onError={() => {
          if (!videoRef.current) return;
          if (videoRef.current.src.endsWith(".mp4")) {
            videoRef.current.src = WEBM_VIDEO;
            videoRef.current.load();
          } else if (videoRef.current.src !== FALLBACK_VIDEO) {
            videoRef.current.src = FALLBACK_VIDEO;
            videoRef.current.load();
          }
        }}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center will-change-transform transition-opacity duration-700"
        style={{
          opacity: ready ? 1 : 0.6,
          transformOrigin: "center center",
        }}
      />

      {/* Cinematic Gradient Overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Primary Hero Text & Actions */}
      <div
        ref={titleRef}
        className="absolute inset-0 flex items-center justify-center px-6 text-center z-10"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Main Headline */}
          <h1
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.15] mb-6 drop-shadow-lg"
            style={{ fontFamily: SANS }}
          >
            {titleLine1}{" "}
            <span className="text-accent underline decoration-white/30 underline-offset-8">
              {titleLine2}
            </span>{" "}
            {titleLine3}
          </h1>

          {/* Description */}
          <p
            className="text-base sm:text-xl text-white/90 font-medium leading-relaxed max-w-2xl mb-8 drop-shadow-md"
            style={{ fontFamily: SANS }}
          >
            {description}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
            <button
              onClick={onConsultationClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-accent text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-accent/90 transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              <span>{consultationText}</span>
              {dir === "ltr" ? (
                <ArrowRight className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4 rotate-180" />
              )}
            </button>

            <button
              onClick={onViewProjectsClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 text-white px-7 py-4 rounded-xl text-base font-semibold hover:bg-white/25 transition-all active:scale-95 cursor-pointer"
            >
              <span>{viewProjectsText}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Second Tagline revealed near end of video scrub */}
      {(taglineLine1 || taglineLine2 || tagline) && (
        <div
          ref={taglineRef}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0 pointer-events-none z-10 gap-3"
        >
          {taglineLine1 && (
            <span
              className="font-serif font-bold text-3xl sm:text-5xl md:text-6xl text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] tracking-tight leading-tight max-w-4xl"
              style={{ fontFamily: SANS }}
            >
              {taglineLine1}
            </span>
          )}
          {taglineLine2 && (
            <span
              className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-accent drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] tracking-tight leading-tight max-w-4xl"
              style={{ fontFamily: SANS }}
            >
              {taglineLine2}
            </span>
          )}
          {!taglineLine1 && !taglineLine2 && tagline && (
            <span
              className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-white drop-shadow-2xl leading-tight max-w-3xl"
              style={{ fontFamily: SANS }}
            >
              {tagline}
            </span>
          )}
        </div>
      )}

      {/* Scroll Down Hint with Animated Arrow */}
      <div
        ref={hintRef}
        className="absolute left-1/2 bottom-8 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 text-xs font-semibold tracking-widest uppercase transition-opacity duration-300 pointer-events-none z-20"
        style={{ fontFamily: SANS }}
      >
        <span>{scrollHint}</span>
        <svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          className="animate-bounce"
        >
          <path
            d="M7 1 L7 17 M2 12 L7 17 L12 12"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Bottom Scrub Progress Line */}
      <div className="absolute left-0 right-0 bottom-0 h-1 bg-white/20 z-20">
        <div
          ref={progressBarRef}
          className="h-full w-full bg-accent origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
