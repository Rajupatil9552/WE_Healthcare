"use client";

import { motion } from "motion/react";
import { Buildings, UserList, Clock, FileText, ShieldCheck, Monitor, Moon } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface MetricItem {
  id: string;
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }>;
  bgClass: string;
  iconColorClass: string;
}

const METRICS: MetricItem[] = [
  {
    id: "hospitals",
    value: "500+",
    label: "Hospitals & Imaging Centers Served",
    icon: Buildings,
    bgClass: "bg-blue-100/80 dark:bg-blue-950/60 border border-blue-200/50 dark:border-blue-800/40",
    iconColorClass: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "radiologists",
    value: "100+",
    label: "Board-Certified Radiologists",
    icon: UserList,
    bgClass: "bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-200/50 dark:border-emerald-800/40",
    iconColorClass: "text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "coverage",
    value: "24/7",
    label: "Coverage All Year Round",
    icon: Clock,
    bgClass: "bg-purple-100/80 dark:bg-purple-950/60 border border-purple-200/50 dark:border-purple-800/40",
    iconColorClass: "text-purple-600 dark:text-purple-400",
  },
  {
    id: "studies",
    value: "1M+",
    label: "Studies Interpreted Annually",
    icon: FileText,
    bgClass: "bg-amber-100/80 dark:bg-amber-950/60 border border-amber-200/50 dark:border-amber-800/40",
    iconColorClass: "text-amber-600 dark:text-amber-400",
  },
  {
    id: "hipaa",
    value: "HIPAA",
    label: "Compliant & Secure",
    icon: ShieldCheck,
    bgClass: "bg-sky-100/80 dark:bg-sky-950/60 border border-sky-200/50 dark:border-sky-800/40",
    iconColorClass: "text-sky-600 dark:text-sky-400",
  },
];

export function TrustCredibility() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/30 to-white dark:from-[#0b1416] dark:via-[#0e1a1d] dark:to-[#0b1416] py-20 lg:py-28 border-b border-slate-200/60 dark:border-slate-800/60 transition-colors duration-300">
      {/* Decorative Wave Background SVGs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40 dark:opacity-25">
        {/* Left background wave */}
        <svg
          className="absolute -left-20 top-1/2 h-[420px] w-[500px] -translate-y-1/2 text-sky-200 dark:text-sky-900/40"
          viewBox="0 0 500 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-50 100 C150 20, 250 300, 450 180 C550 120, 450 350, 600 380"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M-80 160 C120 80, 220 340, 420 220 C520 160, 420 390, 570 410"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M-100 220 C80 140, 180 380, 380 260"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>

        {/* Right background wave */}
        <svg
          className="absolute -right-20 top-1/2 h-[420px] w-[500px] -translate-y-1/2 text-sky-200 dark:text-sky-900/40"
          viewBox="0 0 500 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M550 100 C350 20, 250 300, 50 180 C-50 120, 50 350, -100 380"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M580 160 C380 80, 280 340, 80 220 C-20 160, 80 390, -70 410"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M600 220 C420 140, 320 380, 120 260"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <Container className="relative z-10">
        {/* Header Block */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-300 shadow-sm backdrop-blur-sm"
          >
            <ShieldCheck size={16} weight="bold" className="text-sky-500" />
            <span>Trusted Partner in Radiology</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl leading-[1.15]"
          >
            Trusted by Healthcare Providers <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
              Across the Country
            </span>
          </motion.h2>

          {/* Supporting Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Delivering reliable, high-quality radiology services with a focus on clinical excellence, security, and partnership.
          </motion.p>
        </div>

        {/* Credibility Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 md:mt-20 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 p-6 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none backdrop-blur-md"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-0 items-center justify-between divide-y sm:divide-y-0 lg:divide-x divide-slate-200/70 dark:divide-slate-800/70">
            {METRICS.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <div
                  key={metric.id}
                  className={cn(
                    "flex items-center gap-4 lg:flex-row lg:justify-center px-4 py-4 lg:py-2 transition-transform hover:translate-y-[-2px] duration-200",
                    index !== 0 && "pt-6 sm:pt-4 lg:pt-2"
                  )}
                >
                  {/* Pastel Circular Icon Box */}
                  <div
                    className={cn(
                      "flex size-14 shrink-0 items-center justify-center rounded-full shadow-sm",
                      metric.bgClass
                    )}
                  >
                    <IconComponent size={26} weight="bold" className={metric.iconColorClass} />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
                      {metric.value}
                    </span>
                    <span className="mt-1 text-xs md:text-sm font-medium leading-snug text-slate-600 dark:text-slate-400 max-w-[16ch]">
                      {metric.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Key Clinical & Operational Highlights Strip */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="flex flex-wrap items-center justify-center lg:justify-between gap-y-3.5 gap-x-6 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={19} weight="bold" className="text-sky-600 dark:text-sky-400 shrink-0" />
                <span>ABR-Certified U.S. Final Reads</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock size={19} weight="bold" className="text-sky-600 dark:text-sky-400 shrink-0" />
                <span>12–24 Hour Turnaround</span>
              </div>

              <div className="flex items-center gap-2.5">
                <FileText size={19} weight="bold" className="text-sky-600 dark:text-sky-400 shrink-0" />
                <span>Pre-Read &amp; Final-Read Options</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Moon size={19} weight="bold" className="text-sky-600 dark:text-sky-400 shrink-0" />
                <span>Overnight, Weekend &amp; Overflow Coverage</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Monitor size={19} weight="bold" className="text-sky-600 dark:text-sky-400 shrink-0" />
                <span>CT · MRI · X-Ray · Ultrasound</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
