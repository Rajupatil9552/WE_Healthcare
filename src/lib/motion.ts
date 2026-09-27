/**
 * Motion tokens shared by Motion (motion/react) and GSAP so both libraries
 * move on the same curve and rhythm. Change timing here, not per component.
 */
export const MOTION = {
  duration: { fast: 0.2, base: 0.45, slow: 0.9 },
  /** GSAP ease names */
  ease: { out: "expo.out", inOut: "power2.inOut" },
  /** Same curve as `ease.out`, as a cubic-bezier for Motion */
  easeOut: [0.16, 1, 0.3, 1] as const,
  stagger: { lines: 0.08, items: 0.05 },
} as const;

/**
 * Hero H1 entrance: transform only. The heading is the LCP element, so it must
 * never start at opacity 0 in the server-rendered HTML.
 */
export const HERO_HEADING_MOTION = {
  initial: { y: 14 },
  animate: { y: 0 },
  transition: { duration: 0.6, ease: MOTION.easeOut },
} as const;

/**
 * Hero copy entrance (paragraphs, CTAs, side panels). CSS-driven via
 * `[data-hero-in]` in globals.css so it runs on first paint: the hero lead is
 * often the LCP element, and a JS `initial: { opacity: 0 }` kept it invisible
 * until hydration (~1s LCP render delay). Spread onto a motion element:
 * `<motion.p {...heroFadeIn(0.1)}>`. `initial: false` renders it in place.
 */
export const heroFadeIn = (delay = 0) =>
  ({
    initial: false,
    "data-hero-in": "",
    style: { animationDelay: `${delay}s` },
  }) as const;
