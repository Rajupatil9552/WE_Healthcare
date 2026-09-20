"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  AIRLOCK — a smooth, sticky-scrub image sequence and hero narrative        */
/*                                                                            */
/*  Uses native sticky positioning and passive scroll observation to deliver  */
/*  buttery-smooth, glitch-free momentum scrolling across all browsers &      */
/*  devices without body locking or scroll-hijacking.                         */
/* -------------------------------------------------------------------------- */

export type AirlockTheme = "vacuum" | "ember" | "ice" | "medical";

interface Palette {
  backdrop: string;
  text: string;
  muted: string;
  bar: string;
}

const PALETTES: Record<AirlockTheme, Palette> = {
  vacuum: {
    backdrop: "#05070d",
    text: "#f2f4f8",
    muted: "rgba(240,244,248,0.72)",
    bar: "linear-gradient(90deg, rgba(255,255,255,0.45), rgba(255,255,255,0.95))",
  },
  ember: {
    backdrop: "#0d0705",
    text: "#fdf1e7",
    muted: "rgba(253,241,231,0.72)",
    bar: "linear-gradient(90deg, rgba(255,176,102,0.45), rgba(255,214,168,0.95))",
  },
  ice: {
    backdrop: "#04090f",
    text: "#eaf4ff",
    muted: "rgba(234,244,255,0.72)",
    bar: "linear-gradient(90deg, rgba(120,190,255,0.45), rgba(214,236,255,0.95))",
  },
  medical: {
    backdrop: "#060b0e",
    text: "#ffffff",
    muted: "rgba(224,242,254,0.85)",
    bar: "linear-gradient(90deg, rgba(14,165,233,0.6), rgba(56,189,248,0.95))",
  },
};

export interface AirlockHeroProps {
  /** Array of image URLs to scrub across as the user scrolls. */
  images?: string[];
  /** Video to scrub (optional). */
  videoSrc?: string;
  /** Still shown until video decodes or as base layer. */
  posterSrc?: string;
  /** Headline over the opening frames. Fades out as scrub starts. */
  title?: ReactNode;
  /** Secondary headline revealed during middle scrub stage (35%-68%). */
  midTitle?: ReactNode;
  /** Payoff line, revealed over the final scrub stretch (70%-100%). */
  tagline?: ReactNode;
  /** Optional interactive CTA elements placed under tagline. */
  children?: ReactNode;
  /** Word next to bouncing scroll arrow. */
  scrollHint?: string;
  /** Signature credit in corner. */
  signature?: { name: string; url: string } | false;
  /** Input distance in pixels needed to scrub the hero. */
  scrubDistance?: number;
  /** Extra input distance spent on the final frame/payoff state. */
  holdDistance?: number;
  /** Named colour set. */
  theme?: AirlockTheme;
  /** Label for skip control. */
  skipLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function AirlockHero({
  images = [],
  videoSrc,
  posterSrc,
  title,
  midTitle,
  tagline,
  children,
  scrollHint = "SCROLL TO EXPLORE",
  signature = false,
  scrubDistance = 2200,
  holdDistance = 600,
  theme = "medical",
  skipLabel = "Skip intro",
  className,
  style,
}: AirlockHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const midTitleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);

  const palette = PALETTES[theme] || PALETTES.medical;

  // Preload images into browser memory to eliminate visual flashes
  useEffect(() => {
    if (images.length > 0 && typeof window !== "undefined") {
      images.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }
  }, [images]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);

    let rafId = 0;
    let lastP = -1;

    function paint(p: number) {
      if (Math.abs(p - lastP) < 0.0005) return;
      lastP = p;

      const videoP = p;

      // Mathematical constant-sum crossfade across multi-image sequence
      if (imagesContainerRef.current && images.length > 0) {
        const imgEls = imagesContainerRef.current.children;
        const count = imgEls.length;

        if (count === 1) {
          const img = imgEls[0] as HTMLElement;
          if (img) {
            img.style.opacity = "1";
            img.style.transform = `scale(${1 + videoP * 0.04}) translateZ(0)`;
          }
        } else if (count > 1) {
          const segment = 1 / (count - 1);
          for (let i = 0; i < count; i++) {
            const img = imgEls[i] as HTMLElement;
            if (!img) continue;

            const dist = Math.abs(videoP - i * segment) / segment;
            const alpha = clamp(1 - dist, 0, 1);
            const scaleVal = 1 + videoP * 0.04;

            img.style.opacity = String(alpha);
            img.style.transform = `scale(${scaleVal}) translateZ(0)`;
            img.style.visibility = alpha > 0.005 ? "visible" : "hidden";
          }
        }
      }

      // Title & Tagline opacity transitions (compositor-friendly, zero blur glitch)
      const titleAlpha = 1 - clamp(videoP / 0.28, 0, 1);
      const midAlpha = midTitle
        ? clamp(1 - Math.abs(videoP - 0.5) / 0.18, 0, 1)
        : 0;
      const taglineAlpha = clamp((videoP - 0.68) / 0.22, 0, 1);

      if (scrimRef.current) {
        const activeAlpha = Math.max(titleAlpha, midAlpha, taglineAlpha);
        scrimRef.current.style.opacity = String(activeAlpha);
      }

      if (titleRef.current) {
        const t = titleAlpha;
        titleRef.current.style.opacity = String(t);
        titleRef.current.style.transform = `translateY(${(1 - t) * -20}px) scale(${0.96 + t * 0.04})`;
        titleRef.current.style.visibility = t > 0.01 ? "visible" : "hidden";
        titleRef.current.style.pointerEvents = t > 0.1 ? "auto" : "none";
      }

      if (midTitleRef.current) {
        const t = midAlpha;
        midTitleRef.current.style.opacity = String(t);
        midTitleRef.current.style.transform = `translateY(${(1 - t) * 18}px) scale(${0.97 + t * 0.03})`;
        midTitleRef.current.style.visibility = t > 0.01 ? "visible" : "hidden";
        midTitleRef.current.style.pointerEvents = t > 0.1 ? "auto" : "none";
      }

      if (taglineRef.current) {
        const t = taglineAlpha;
        taglineRef.current.style.opacity = String(t);
        taglineRef.current.style.transform = `translateY(${(1 - t) * 18}px) scale(${0.97 + t * 0.03})`;
        taglineRef.current.style.visibility = t > 0.01 ? "visible" : "hidden";
        taglineRef.current.style.pointerEvents = t > 0.1 ? "auto" : "none";
      }

      if (hintRef.current) {
        hintRef.current.style.opacity = videoP > 0.04 ? "0" : "1";
      }
    }

    if (reduceMotion) {
      paint(1);
      return;
    }

    let cachedTotalScrollable = 0;
    const updateDimensions = () => {
      if (!container) return;
      cachedTotalScrollable = container.offsetHeight - window.innerHeight;
    };
    updateDimensions();

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!container) return;
        const scrollY = window.scrollY;
        // If user is scrolled below hero and hero is already at end state, skip layout recalculation
        if (cachedTotalScrollable > 0 && scrollY > cachedTotalScrollable + window.innerHeight && lastP === 1) {
          return;
        }

        const rect = container.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        if (totalScrollable <= 0) {
          paint(0);
          return;
        }

        const progress = clamp(-rect.top / totalScrollable, 0, 1);
        paint(progress);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      updateDimensions();
      onScroll();
    }, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [images, midTitle]);

  const handleSkip = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const targetScroll = window.scrollY + rect.bottom - window.innerHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={{
        height: "260vh",
        ...style,
      }}
    >
      {/* Sticky viewport frame that stays locked while user scrolls through the sequence */}
      <div
        className="sticky top-0 h-[100dvh] w-full overflow-hidden"
        style={{ background: palette.backdrop }}
      >
        {/* Multi-image sequence container */}
        {images.length > 0 ? (
          <div ref={imagesContainerRef} className="absolute inset-0 h-full w-full">
            {images.map((imgSrc, idx) => (
              <img
                key={imgSrc + idx}
                src={imgSrc}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  willChange: "transform, opacity",
                  transformOrigin: "center center",
                  opacity: idx === 0 ? 1 : 0,
                }}
              />
            ))}
          </div>
        ) : posterSrc ? (
          <img
            src={posterSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ transformOrigin: "center center", willChange: "transform" }}
          />
        ) : null}

        {/* Atmospheric dark overlays */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(6,11,14,0.65)] via-[rgba(6,11,14,0)] via-30% to-[rgba(6,11,14,0.15)] dark:to-[rgba(6,11,14,0.85)]"
        />

        {/* Dynamic Scrim */}
        <div
          ref={scrimRef}
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(6,11,14,0.8), rgba(6,11,14,0) 75%)",
          }}
        />

        {/* Title 1: Opening Headline */}
        {title && (
          <div
            ref={titleRef}
            className="absolute inset-0 flex flex-col items-center justify-center px-[6%] text-center"
          >
            {typeof title === "string" ? (
              <h1
                className="inline-block font-extrabold leading-none tracking-tight"
                style={{
                  fontSize: "clamp(32px, 6.5vw, 90px)",
                  color: palette.text,
                  textShadow: "0 4px 30px rgba(0,0,0,0.65)",
                }}
              >
                {title}
              </h1>
            ) : (
              title
            )}
          </div>
        )}

        {/* Mid Title: Stage 2 Headline */}
        {midTitle && (
          <div
            ref={midTitleRef}
            className="absolute inset-0 flex flex-col items-center justify-center px-[6%] text-center opacity-0 pointer-events-none"
          >
            {typeof midTitle === "string" ? (
              <h2
                className="inline-block font-bold leading-tight tracking-tight"
                style={{
                  fontSize: "clamp(24px, 4.5vw, 64px)",
                  color: palette.text,
                  textShadow: "0 4px 28px rgba(0,0,0,0.65)",
                }}
              >
                {midTitle}
              </h2>
            ) : (
              midTitle
            )}
          </div>
        )}

        {/* Tagline: Stage 3 Payoff */}
        {tagline && (
          <div
            ref={taglineRef}
            className="absolute inset-0 flex flex-col items-center justify-center px-[8%] text-center opacity-0 pointer-events-none"
          >
            {typeof tagline === "string" ? (
              <p
                className="font-bold tracking-tight"
                style={{
                  fontSize: "clamp(20px, 3.2vw, 42px)",
                  lineHeight: 1.25,
                  color: palette.text,
                  textShadow: "0 4px 24px rgba(0,0,0,0.65)",
                }}
              >
                {tagline}
              </p>
            ) : (
              tagline
            )}
            {children && <div className="mt-8 pointer-events-auto">{children}</div>}
          </div>
        )}

        {/* Scroll Hint */}
        <div
          ref={hintRef}
          className="pointer-events-none absolute bottom-[clamp(24px,6vh,48px)] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-500"
          style={{
            color: palette.muted,
            fontSize: "clamp(10px, 1.2vw, 12px)",
            fontWeight: 600,
            letterSpacing: "0.25em",
          }}
        >
          <span>{scrollHint}</span>
          <svg
            width="14"
            height="18"
            viewBox="0 0 14 18"
            aria-hidden="true"
            style={{ animation: "airlock-bounce 1.6s ease-in-out infinite" }}
          >
            <style>{`
              @keyframes airlock-bounce {
                0%, 100% { transform: translateY(0); opacity: 0.5; }
                50% { transform: translateY(6px); opacity: 1; }
              }
              @media (prefers-reduced-motion: reduce) {
                [style*="airlock-bounce"] { animation: none !important; }
              }
            `}</style>
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

        {/* Skip Button */}
        <button
          type="button"
          onClick={handleSkip}
          className="absolute left-1/2 top-5 z-10 -translate-x-1/2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white opacity-0 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline"
          style={{ background: "rgba(6,11,14,0.75)", letterSpacing: "0.08em" }}
        >
          {skipLabel}
        </button>

        {/* Smooth, visible gradient transition blending hero into the Trusted Partner section */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36 sm:h-52 bg-gradient-to-b from-transparent via-slate-50/20 via-60% to-slate-50 dark:from-transparent dark:via-[#0b1416]/80 dark:to-[#0b1416] z-[5]"
        />

        {signature ? (
          <span
            className="absolute bottom-[clamp(10px,2vw,18px)] right-[clamp(12px,2.5vw,24px)] z-[2] font-medium"
            style={{
              fontSize: "clamp(11px, 1.4vw, 13px)",
              color: palette.muted,
            }}
          >
            by{" "}
            <a
              href={signature.url}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline transition-colors hover:opacity-100"
              style={{ color: "inherit" }}
            >
              {signature.name}
            </a>
          </span>
        ) : null}
      </div>
    </div>
  );
}
