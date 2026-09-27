"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ListBullets, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { QUALITY_SECTIONS, type QualitySectionId } from "@/content/quality";

/**
 * Floating "Contents" button (bottom-right, clear of the header). Shows the
 * section in view with a progress ring and opens a jump list. Hidden over
 * the hero and after the last section.
 */
export function ContentsNav() {
  const [active, setActive] = useState<number>(-1);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.4;
      let current = -1;
      QUALITY_SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      const last = document.getElementById(QUALITY_SECTIONS[QUALITY_SECTIONS.length - 1].id);
      const pastEnd = last ? last.getBoundingClientRect().bottom < line : false;
      setActive(current);
      setVisible(current >= 0 && !pastEnd);
      if (current < 0 || pastEnd) setOpen(false);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const r = 15;
  const c = 2 * Math.PI * r;
  const progress = (active + 1) / QUALITY_SECTIONS.length;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-30 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6"
        >
          <AnimatePresence>
            {open && (
              <motion.nav
                id="quality-contents"
                aria-label="Quality sections"
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="w-72 rounded-2xl border border-border bg-card/95 p-2 shadow-lg backdrop-blur-xl"
              >
                <ol>
                  {QUALITY_SECTIONS.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id as QualitySectionId}`}
                        onClick={() => setOpen(false)}
                        aria-current={i === active ? "location" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          i === active ? "bg-primary-soft text-foreground" : "text-foreground-muted hover:bg-surface hover:text-foreground"
                        )}
                      >
                        <span className={cn("font-mono text-[11px] tabular-nums", i === active ? "text-primary" : "text-foreground-subtle")}>0{i + 1}</span>
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </motion.nav>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="quality-contents"
            className="flex items-center gap-3 rounded-full border border-border bg-card/95 p-1.5 pr-4 shadow-lg backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="relative flex size-9 items-center justify-center">
              <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90" aria-hidden="true">
                <circle cx="18" cy="18" r={r} fill="none" stroke="var(--color-surface-muted)" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r={r}
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={c}
                  strokeDashoffset={c * (1 - progress)}
                  className="transition-[stroke-dashoffset] duration-500"
                />
              </svg>
              {open ? <X size={14} weight="bold" aria-hidden="true" className="text-foreground" /> : <ListBullets size={15} weight="bold" aria-hidden="true" className="text-foreground" />}
            </span>
            <span className="text-left">
              <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-subtle">Contents</span>
              <span className="block max-w-[11rem] truncate text-sm font-semibold text-foreground">{QUALITY_SECTIONS[Math.max(0, active)].label}</span>
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ContentsNav;
