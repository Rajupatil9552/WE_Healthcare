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
