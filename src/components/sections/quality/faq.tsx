"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChatsCircle } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { QUALITY_CTA, QUALITY_FAQ as ITEMS } from "@/content/quality";

type Msg = { id: string; from: "you" | "we"; text: string };

const opening = (i: number): Msg[] => [
  { id: `q-${ITEMS[i].id}-0`, from: "you", text: ITEMS[i].question },
  { id: `a-${ITEMS[i].id}-0`, from: "we", text: ITEMS[i].answer },
];

/**
 * Chat-style FAQ: tap a question and it is "asked", then the answer arrives
 * after a short typing indicator. Answers stay in a scrollable thread.
 */
export function QualityFaq() {
  const reduce = usePrefersReducedMotion();
  const [thread, setThread] = useState<Msg[]>(() => opening(0));
  const [asked, setAsked] = useState<string[]>([ITEMS[0].id]);
  const [typing, setTyping] = useState(false);
  const count = useRef(1);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [thread, typing, reduce]);

  const ask = (i: number) => {
    if (typing) return;
    const item = ITEMS[i];
    const n = count.current++;
    setAsked((a) => (a.includes(item.id) ? a : [...a, item.id]));
    setThread((t) => [...t, { id: `q-${item.id}-${n}`, from: "you", text: item.question }]);
    const answer = () => setThread((t) => [...t, { id: `a-${item.id}-${n}`, from: "we", text: item.answer }]);
    if (reduce) return answer();
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      answer();
    }, 900);
  };

  return (
    <section id="faqs" className="relative overflow-clip scroll-mt-24 bg-background py-section lg:py-section-lg">
      <DecorativeLines variant="right" className="top-1/4" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="eyebrow">FAQs</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">Frequently Asked Questions</RevealHeading>
            <p className="mt-5 text-base text-foreground-muted">Tap a question to ask it.</p>
            <div className="mt-6 flex flex-col gap-2" role="group" aria-label="Questions">
              {ITEMS.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => ask(i)}
                  disabled={typing}
                  className={cn(
                    "rounded-lg border px-4 py-3 text-left text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-wait",
                    asked.includes(item.id) ? "border-border bg-surface text-foreground-muted" : "border-primary/30 bg-card text-foreground hover:border-primary hover:bg-primary-soft"
                  )}
                >
                  {item.question}
                </button>
              ))}
            </div>
          </div>

          {/* Thread */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-md lg:col-span-7">
            <div className="flex items-center gap-3 border-b border-border bg-card px-5 py-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary text-on-primary">
                <ChatsCircle size={18} weight="fill" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">WE Healthcare</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-subtle">Quality FAQs</p>
              </div>
            </div>
            <div ref={threadRef} className="flex h-[26rem] flex-col gap-3 overflow-y-auto p-5" aria-live="polite">
              <AnimatePresence initial={false}>
                {thread.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed",
                      m.from === "you" ? "self-end rounded-br-md bg-primary text-on-primary" : "self-start rounded-bl-md border border-border bg-card text-foreground"
                    )}
                  >
                    {m.text}
                  </motion.div>
                ))}
                {typing && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-1 self-start rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3.5"
                    aria-label="Typing"
                  >
                    {[0, 1, 2].map((k) => (
                      <motion.span
                        key={k}
                        className="size-1.5 rounded-full bg-foreground-subtle"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: k * 0.12 }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="border-t border-border bg-card px-5 py-3 text-sm text-foreground-muted">
              Need more detail?{" "}
              <Link href={QUALITY_CTA.cta.href} className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
                Talk to our team
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default QualityFaq;
