"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { LEADERS, type Leader } from "@/content/leadership";

/** Editorial profiles: large portrait and biography, alternating sides down the page. */
export function LeaderProfiles() {
  return (
    <section id="team" aria-label="Management team" className="relative scroll-mt-24 overflow-clip bg-background pb-section lg:pb-section-lg">
      {/* One wave per profile row, alternating sides */}
      <DecorativeLines variant="right" className="top-[18%]" />
      <DecorativeLines variant="left" className="top-[50%]" />
      <DecorativeLines variant="right" className="top-[84%]" />
      <Container className="relative">
        <ol className="space-y-24 lg:space-y-36">
          {LEADERS.map((leader, i) => (
            <LeaderProfile key={leader.id} leader={leader} index={i} />
          ))}
        </ol>
      </Container>
    </section>
  );
}

function LeaderProfile({ leader, index }: { leader: Leader; index: number }) {
  const flip = index % 2 === 1;

  return (
    <li id={leader.id} className="scroll-mt-28">
      <article className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: MOTION.easeOut }}
          className={cn("relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none", flip && "lg:order-2 lg:col-start-8")}
        >
          {/* Offset frame + glow sit behind the photo */}
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 translate-y-5 rounded-2xl border border-primary/30",
              flip ? "-translate-x-5" : "translate-x-5"
            )}
          />
          <div aria-hidden="true" className="absolute -inset-10 -z-10 rounded-full bg-primary/10 blur-3xl" />

          <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-muted shadow-xl ring-1 ring-border">
            <Image
              src={leader.photo.src}
              alt={leader.photo.alt}
              fill
              sizes="(max-width: 1024px) 28rem, 40vw"
              className="object-cover object-[50%_20%] transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950/35 to-transparent" />
          </div>

          {/* Floating highlight card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.35, ease: MOTION.easeOut }}
            className={cn(
              "absolute -bottom-8 flex items-center gap-4 rounded-xl border border-border bg-card/95 px-5 py-4 shadow-lg backdrop-blur",
              flip ? "-right-3 sm:-right-6" : "-left-3 sm:-left-6"
            )}
          >
            <span className="bg-gradient-to-br from-sky-600 to-cyan-500 bg-clip-text text-4xl font-semibold tracking-tight text-transparent tabular-nums dark:from-sky-300 dark:to-cyan-200">
              {leader.highlight.value}
            </span>
            <span className="max-w-[11ch] text-xs font-medium leading-snug text-foreground-muted">{leader.highlight.label}</span>
          </motion.div>
        </motion.div>

        {/* Biography */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: MOTION.easeOut }}
          className={cn("lg:col-span-7", flip && "lg:order-1 lg:col-start-1")}
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm tabular-nums text-primary">0{index + 1}</span>
            <span aria-hidden="true" className="h-px w-12 bg-primary/40" />
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-foreground-subtle">{leader.role}</p>
          </div>

          <h2 className="mt-6 text-h2 font-semibold tracking-tight text-foreground lg:text-[3.5rem] lg:leading-[1.05]">{leader.name}</h2>

          <div className="mt-8 space-y-4 border-l-2 border-primary/40 pl-6">
            {leader.bio.map((p, i) => (
              <p key={p.slice(0, 24)} className={i === 0 ? "text-lead leading-relaxed text-foreground" : "text-base leading-relaxed text-foreground-muted lg:text-lg"}>
                {p}
              </p>
            ))}
          </div>

          <ul className="mt-10 flex flex-wrap gap-2.5" aria-label={`${leader.name} credentials`}>
            {leader.credentials.map((c) => (
              <li key={c} className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-foreground">
                {c}
              </li>
            ))}
          </ul>
        </motion.div>
      </article>
    </li>
  );
}

export default LeaderProfiles;
