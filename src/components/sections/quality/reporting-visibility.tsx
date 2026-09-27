"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChartBar, ChartLine, Clock, Siren, Stack, Table } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { VISIBILITY as CONTENT } from "@/content/quality";
import { SectionNote } from "./section-note";

/*
 * SAMPLE DATA ONLY. These series illustrate the kind of reporting a client
 * could see; they are not WE Healthcare performance figures. Turnaround is an
 * index (not minutes) so no service level is implied.
 */
type Datum = { label: string; value: number };
type Panel = {
  kind: "bars" | "line" | "hbars";
  title: string;
  unit: string;
  data: Datum[];
  icon: typeof ChartBar;
};

const weeks = (vals: number[]) => vals.map((value, i) => ({ label: `W${i + 1}`, value }));

const PANELS: Panel[] = [
  {
    kind: "bars",
    title: "Studies received per week",
    unit: "studies",
    icon: ChartBar,
    data: weeks([412, 438, 455, 430, 468, 492, 480, 505, 521, 498, 534, 550]),
  },
  {
    kind: "bars",
    title: "Reports finalized by hour of day",
    unit: "reports",
    icon: Clock,
    data: [8, 6, 5, 4, 4, 6, 12, 22, 34, 40, 42, 38, 36, 39, 41, 37, 33, 28, 24, 20, 17, 14, 12, 10].map((value, h) => ({
      label: `${String(h).padStart(2, "0")}:00`,
      value,
    })),
  },
  {
    kind: "line",
    title: "Turnaround index (week 1 = 100)",
    unit: "index",
    icon: ChartLine,
    data: weeks([100, 98, 101, 97, 99, 96, 98, 95, 97, 96, 98, 95]),
  },
  {
    kind: "bars",
    title: "Critical findings communicated per week",
    unit: "findings",
    icon: Siren,
    data: weeks([6, 4, 7, 5, 8, 6, 5, 7, 6, 9, 5, 6]),
  },
  {
    kind: "hbars",
    title: "Study mix by modality (% of volume)",
    unit: "%",
    icon: Stack,
    data: [
      { label: "CT", value: 38 },
      { label: "X-Ray", value: 27 },
      { label: "MRI", value: 16 },
      { label: "Ultrasound", value: 12 },
      { label: "Other", value: 7 },
    ],
  },
];

/**
 * Sample reporting dashboard: one tab per visibility area from the brief.
 * Every chart has a hover/focus tooltip and a table view.
 */
export function ReportingVisibilitySection() {
  const [tab, setTab] = useState(0);
  const [asTable, setAsTable] = useState(false);
  const uid = useId();
  const panel = PANELS[tab];

  return (
    <section id="reporting-visibility" className="relative overflow-clip scroll-mt-24 bg-background py-section lg:py-section-lg">
      <DecorativeLines variant="left" className="top-2/3" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">05 · Client Reporting</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>
          </div>
          <p className="text-lead text-foreground-muted lg:col-span-5">{CONTENT.body}</p>
        </div>

        <div className="mt-12 overflow-hidden rounded-lg border border-border bg-card shadow-lg lg:mt-16">
          {/* Tabs = the five visibility areas */}
          <div role="tablist" aria-label="Reporting areas" className="flex overflow-x-auto border-b border-border bg-surface" style={{ scrollbarWidth: "none" }}>
            {CONTENT.areas.map((area, i) => {
              const Icon = PANELS[i].icon;
              const on = i === tab;
              return (
                <button
                  key={area}
                  role="tab"
                  id={`${uid}-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`${uid}-panel`}
                  onClick={() => setTab(i)}
                  className={cn(
                    "relative flex shrink-0 items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                    on ? "bg-card text-foreground" : "text-foreground-muted hover:text-foreground"
                  )}
                >
                  <Icon size={16} weight={on ? "fill" : "regular"} aria-hidden="true" className={on ? "text-primary" : ""} />
                  {area}
                  {on && <motion.span layoutId="vis-tab" className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />}
                </button>
              );
            })}
          </div>

          <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${tab}`} className="p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-foreground">{panel.title}</p>
                <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground-subtle">Sample data · not actual performance</p>
              </div>
              <button
                type="button"
                onClick={() => setAsTable((t) => !t)}
                aria-pressed={asTable}
                className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Table size={14} aria-hidden="true" />
                {asTable ? "View chart" : "View as table"}
              </button>
            </div>

            <div className="mt-6 min-h-[18rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${tab}-${asTable}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: MOTION.easeOut }}
                >
                  {asTable ? <DataTable panel={panel} /> : panel.kind === "line" ? <LineChart panel={panel} /> : panel.kind === "hbars" ? <HBarChart panel={panel} /> : <BarChart panel={panel} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <SectionNote>{CONTENT.note}</SectionNote>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Charts (single series, brand primary) ---------------- */

const W = 720;
const H = 260;
const PAD = { l: 40, r: 12, t: 12, b: 28 };

function niceMax(v: number) {
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  return Math.ceil(v / p) * p;
}

/** Rounded-top bar path anchored to the baseline. */
function barPath(x: number, y: number, w: number, h: number, r = 4) {
  const rr = Math.min(r, w / 2, h);
  return `M${x} ${y + h} V${y + rr} Q${x} ${y} ${x + rr} ${y} H${x + w - rr} Q${x + w} ${y} ${x + w} ${y + rr} V${y + h} Z`;
}

function Tooltip({ x, y, label, value, unit }: { x: number; y: number; label: string; value: number; unit: string }) {
  return (
    <div
      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md border border-border bg-card px-2.5 py-1.5 text-xs shadow-md"
      style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
    >
      <span className="block text-foreground-subtle">{label}</span>
      <span className="block font-mono font-semibold tabular-nums text-foreground">
        {value} {unit !== "index" && unit}
      </span>
    </div>
  );
}

function Axes({ max, ticks = 4 }: { max: number; ticks?: number }) {
  return (
    <g>
      {Array.from({ length: ticks + 1 }, (_, i) => {
        const v = (max / ticks) * i;
        const y = PAD.t + (H - PAD.t - PAD.b) * (1 - v / max);
        return (
          <g key={i}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y} y2={y} stroke="var(--color-border)" strokeDasharray={i === 0 ? undefined : "2 4"} />
            <text x={PAD.l - 8} y={y + 4} textAnchor="end" className="fill-[var(--color-foreground-subtle)] font-mono text-[10px]">
              {Math.round(v)}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function BarChart({ panel }: { panel: Panel }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = niceMax(Math.max(...panel.data.map((d) => d.value)));
  const n = panel.data.length;
  const plotW = W - PAD.l - PAD.r;
  const slot = plotW / n;
  const bw = Math.max(4, Math.min(28, slot * 0.5));
  const plotH = H - PAD.t - PAD.b;
  const every = n > 12 ? 3 : 1;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`${panel.title}, sample data`} onMouseLeave={() => setHover(null)}>
        <Axes max={max} />
        {panel.data.map((d, i) => {
          const h = (d.value / max) * plotH;
          const x = PAD.l + i * slot + (slot - bw) / 2;
          const y = PAD.t + plotH - h;
          return (
            <g key={d.label}>
              <motion.path
                d={barPath(x, y, bw, h)}
                fill="var(--color-primary)"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1, opacity: hover === null || hover === i ? 1 : 0.45 }}
                transition={{ scaleY: { duration: 0.6, delay: i * 0.025, ease: MOTION.easeOut }, opacity: { duration: 0.15 } }}
                style={{ transformOrigin: `${x + bw / 2}px ${PAD.t + plotH}px` }}
              />
              {i % every === 0 && (
                <text x={x + bw / 2} y={H - 8} textAnchor="middle" className="fill-[var(--color-foreground-subtle)] font-mono text-[10px]">
                  {d.label}
                </text>
              )}
              {/* Hit target taller and wider than the mark */}
              <rect
                x={PAD.l + i * slot}
                y={PAD.t}
                width={slot}
                height={plotH}
                fill="transparent"
                tabIndex={0}
                aria-label={`${d.label}: ${d.value} ${panel.unit}`}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                className="outline-none"
              />
            </g>
          );
        })}
      </svg>
      {hover !== null && (
        <Tooltip
          x={PAD.l + hover * slot + slot / 2}
          y={PAD.t + plotH - (panel.data[hover].value / max) * plotH - 6}
          label={panel.data[hover].label}
          value={panel.data[hover].value}
          unit={panel.unit}
        />
      )}
    </div>
  );
}

function LineChart({ panel }: { panel: Panel }) {
  const [hover, setHover] = useState<number | null>(null);
  const lo = 80;
  const max = 110;
  const n = panel.data.length;
  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t - PAD.b;
  const px = (i: number) => PAD.l + (plotW / (n - 1)) * i;
  const py = (v: number) => PAD.t + plotH * (1 - (v - lo) / (max - lo));
  const d = panel.data.map((p, i) => `${i ? "L" : "M"}${px(i)} ${py(p.value)}`).join(" ");

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`${panel.title}, sample data`} onMouseLeave={() => setHover(null)}>
        {[80, 90, 100, 110].map((v) => (
          <g key={v}>
            <line x1={PAD.l} x2={W - PAD.r} y1={py(v)} y2={py(v)} stroke="var(--color-border)" strokeDasharray={v === 80 ? undefined : "2 4"} />
            <text x={PAD.l - 8} y={py(v) + 4} textAnchor="end" className="fill-[var(--color-foreground-subtle)] font-mono text-[10px]">
              {v}
            </text>
          </g>
        ))}
        <motion.path d={d} fill="none" stroke="var(--color-primary)" strokeWidth={2} strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: MOTION.easeOut }} />
        {panel.data.map((p, i) => (
          <text key={p.label} x={px(i)} y={H - 8} textAnchor="middle" className="fill-[var(--color-foreground-subtle)] font-mono text-[10px]">
            {p.label}
          </text>
        ))}
        {hover !== null && (
          <g>
            <line x1={px(hover)} x2={px(hover)} y1={PAD.t} y2={PAD.t + plotH} stroke="var(--color-border-strong)" />
            <circle cx={px(hover)} cy={py(panel.data[hover].value)} r={5} fill="var(--color-primary)" stroke="var(--color-card)" strokeWidth={2} />
          </g>
        )}
        {panel.data.map((p, i) => (
          <rect
            key={`hit-${p.label}`}
            x={px(i) - plotW / (n - 1) / 2}
            y={PAD.t}
            width={plotW / (n - 1)}
            height={plotH}
            fill="transparent"
            tabIndex={0}
            aria-label={`${p.label}: index ${p.value}`}
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            className="outline-none"
          />
        ))}
      </svg>
      {hover !== null && (
        <Tooltip x={px(hover)} y={py(panel.data[hover].value) - 10} label={panel.data[hover].label} value={panel.data[hover].value} unit={panel.unit} />
      )}
    </div>
  );
}

function HBarChart({ panel }: { panel: Panel }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <ul className="space-y-3 py-2" aria-label={`${panel.title}, sample data`}>
      {panel.data.map((d, i) => (
        <li
          key={d.label}
          tabIndex={0}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
          onFocus={() => setHover(i)}
          onBlur={() => setHover(null)}
          className="grid grid-cols-[6.5rem_1fr_3rem] items-center gap-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="text-sm font-medium text-foreground">{d.label}</span>
          <span className="h-5 overflow-hidden rounded-r-[4px] bg-surface-muted">
            <motion.span
              className="block h-full rounded-r-[4px] bg-primary transition-opacity"
              initial={{ width: 0 }}
              animate={{ width: `${(d.value / 40) * 100}%`, opacity: hover === null || hover === i ? 1 : 0.45 }}
              transition={{ width: { duration: 0.7, delay: i * 0.06, ease: MOTION.easeOut }, opacity: { duration: 0.15 } }}
            />
          </span>
          <span className="text-right font-mono text-sm tabular-nums text-foreground-muted">{d.value}%</span>
        </li>
      ))}
    </ul>
  );
}

function DataTable({ panel }: { panel: Panel }) {
  return (
    <div className="max-h-[18rem] overflow-auto rounded-md border border-border">
      <table className="w-full text-sm">
        <caption className="sr-only">{panel.title} (sample data)</caption>
        <thead className="sticky top-0 bg-surface">
          <tr>
            <th scope="col" className="px-4 py-2 text-left font-semibold text-foreground">
              {panel.kind === "hbars" ? "Modality" : "Period"}
            </th>
            <th scope="col" className="px-4 py-2 text-right font-semibold text-foreground">
              Value ({panel.unit})
            </th>
          </tr>
        </thead>
        <tbody>
          {panel.data.map((d) => (
            <tr key={d.label} className="border-t border-border">
              <td className="px-4 py-2 text-foreground-muted">{d.label}</td>
              <td className="px-4 py-2 text-right font-mono tabular-nums text-foreground">{d.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportingVisibilitySection;
