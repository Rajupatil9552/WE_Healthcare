"use client";

import { useEffect, useState, type RefObject } from "react";
import { useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * Index that advances on its own while `ref` is in view. `select` jumps to an
 * item and holds it for `holdMs` before cycling resumes. Reduced motion stops
 * the cycle (the current item and all controls stay available).
 */
export function useAutoCycle(count: number, ref: RefObject<Element | null>, intervalMs = 3600, holdMs = 7000) {
  const reduce = usePrefersReducedMotion();
  const inView = useInView(ref, { amount: 0.3 });
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % count), held ? holdMs : intervalMs);
    return () => window.clearTimeout(timer);
  }, [inView, reduce, index, held, count, intervalMs, holdMs]);

  const select = (i: number) => {
    setIndex(i);
    setHeld((n) => n + 1);
  };

  return [index, select] as const;
}
