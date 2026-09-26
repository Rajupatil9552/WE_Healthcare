"use client";

import { motion } from "motion/react";

/*
 * Illustrative renogram: time-activity curves for the left and right kidney
 * (uptake peak, then drainage). Drawn from a fixed gamma-variate shape; no
 * values or units, and coordinates are rounded so server and client match.
 */
const W = 320;
const H = 200;
const PAD = { l: 34, r: 14, t: 18, b: 30 };
const round = (n: number) => Math.round(n * 10) / 10;

function curve(peakAt: number, height: number) {
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const t = i / 60;
    const x = PAD.l + t * (W - PAD.l - PAD.r);
    const k = t / peakAt;
    const v = height * k * Math.exp(1 - k);
    const y = H - PAD.b - v * (H - PAD.t - PAD.b);
    pts.push(`${i ? "L" : "M"}${round(x)} ${round(y)}`);
  }
  return pts.join(" ");
}

const LEFT = curve(0.16, 0.95);
const RIGHT = curve(0.18, 0.85);

export function Renogram({ className, animate = true }: { className?: string; animate?: boolean }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label="Illustrative renogram: time-activity curves for the left and right kidney">
      <rect width={W} height={H} fill="#fff" />
      {Array.from({ length: 5 }, (_, i) => (
        <line key={i} x1={PAD.l} x2={W - PAD.r} y1={PAD.t + i * 38} y2={PAD.t + i * 38} stroke="#e2e8f0" />
      ))}
      <line x1={PAD.l} x2={PAD.l} y1={PAD.t} y2={H - PAD.b} stroke="#94a3b8" />
      <line x1={PAD.l} x2={W - PAD.r} y1={H - PAD.b} y2={H - PAD.b} stroke="#94a3b8" />
      <text x={W / 2} y={H - 9} textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="monospace">
        TIME
      </text>
      <text x={12} y={H / 2} textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="monospace" transform={`rotate(-90 12 ${H / 2})`}>
        ACTIVITY
      </text>
      {[
        { d: LEFT, color: "#0369a1", label: "L", y: 34 },
        { d: RIGHT, color: "#ea580c", label: "R", y: 50 },
      ].map((c, i) => (
        <g key={c.label}>
          <motion.path
            d={c.d}
            fill="none"
            stroke={c.color}
            strokeWidth="2.2"
            strokeLinecap="round"
            initial={animate ? { pathLength: 0 } : false}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: i * 0.2, ease: "easeOut" }}
          />
          <line x1={W - 60} x2={W - 46} y1={c.y} y2={c.y} stroke={c.color} strokeWidth="2.2" />
          <text x={W - 40} y={c.y + 3.5} fontSize="10" fill="#334155" fontFamily="monospace">
            {c.label === "L" ? "Left" : "Right"}
          </text>
        </g>
      ))}
    </svg>
  );
}
