"use client";

// A portfolio index built as a wheel you turn.
//
// At rest the work sits in a ring around a title, each card tangent to the
// circle. The first notch of scroll blows the ring open into a vertical drum:
// the card at the front lies flat and full size, the ones above and below
// rotate away into hard perspective and run off the top and bottom of the
// frame. Keep turning and the drum carries the next piece round to the front.
//
// The whole thing is one number - `turn` - read by a single rAF pass that writes
// transforms straight to the DOM. 0 is the ring, 1 is the drum with item 0 at
// the front, and every whole number after that is one more item turned past.
import * as React from "react";
import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  /** Specialty or project name. Shown beside the front card and in the index. */
  title: string;
  /** Short label for the side index. */
  shortTitle?: string;
  /** Category or eyebrow badge (e.g. Subspecialty Care). */
  category?: string;
  /** Short clinical description. */
  description?: string;
  /** Cover art / photography. Any src an <img> takes. */
  image: string;
  /** Where the card links to. Omit for a wheel that only browses. */
  href?: string;
}

export interface WorksWheelProps
  extends Omit<React.ComponentPropsWithoutRef<"section">, "children"> {
  items: WorksWheelItem[];
  /** Sits in the middle of the ring. @default "Explore\nRadiology" */
  label?: string;
  /** Label on the card's hover affordance. Omit to drop it. @default "Explore" */
  action?: string;
  /** Callback fired when the active specialty changes. */
  onActiveChange?: (index: number) => void;
  /** Controlled target index if triggered externally (e.g. mobile buttons). */
  targetIndex?: number | { index: number; id?: number };
}

/* Geometry. The card is measured against the stage; everything else is measured
   against the card, so a narrow stage - where the card is capped by width, not
   height - scales the whole wheel down with it instead of leaving a small card
   swinging on a huge drum. The three that matter are tuned together: STEP
   against DRUM sets how hard the neighbours rotate away, and DRUM against LENS
   decides whether they land inside the frame or run off it. */
const CARD_H = 0.38; // front card height, of the stage
const CARD_MAX_W = 0.34; // ... but never wider than this much of the stage
const CARD_RATIO = 1.45; // card width / height
const STEP = 40; // degrees between cards on the drum
const DRUM = 2.22; // drum radius, in card heights - and everything below likewise
const LENS = 2.7; // perspective distance
const RING_R = 1.0; // ring radius (flat ring only; keeps the whole ring inside the stage)
/* The drum alone hangs the work on a plumb line. It isn't one: the strip curves
   away round an arc whose centre sits off to the LEFT, so the piece at the front
   is at the arc's near point - dead centre - and its neighbours have already
   swung back left as well as up and down. BOW is that arc's radius; nothing else
   makes the difference between a stack of cards and a wheel seen side on. */
const BOW = 1.82;
const TITLE = 0.124; // ring label and front-card title
const INDEX = 0.04; // the index down the right-hand side
/** Items either side of the front still worth drawing. Past this a card is
    edge-on, and further round it would stack up on the vanishing point. */
const CULL = 1.6;

/** How much of a wheel-notch or a dragged pixel counts as one item. */
const WHEEL_UNITS = 360;
const DRAG_UNITS = 280;
/** Quiet time after the last wheel event before the wheel settles on an item. */
const SETTLE = 120;
/** Fraction of the remaining distance closed each frame. 1 = no smoothing. */
const EASE = 0.14;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Stage = { w: number; h: number };

const rad = (deg: number) => (deg * Math.PI) / 180;

/** How far left the arc has carried something that has turned `drumDeg` off the
    front. Zero at the front, so the piece being read stays centred. */
const bowAt = (drumDeg: number, bow: number) =>
  -bow * (1 - Math.cos(rad(drumDeg)));

/** Both states in one chain: the ring terms fall away as `m` reaches the drum,
    and the drum terms are still zero while the ring is up. The bow is applied
    first, in the wheel's own plane, so it slides the card sideways rather than
    turning with it - and perspective still shrinks it with distance. */
function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number,
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel({
  items,
  label = "Explore\nRadiology",
  action = "Explore",
  onActiveChange,
  targetIndex,
  className,
  ...props
}: WorksWheelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  // The wheel's position, and where it is heading. Only `active` is state -
  // everything else is written to the DOM, so turning the wheel is not a render.
  const turn = React.useRef(0);
  const target = React.useRef(0);
  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });

  const count = items.length;
  const last = Math.max(count - 1, 0);

  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last + 1);
    },
    [last],
  );

  // Notify parent of active index change
  React.useEffect(() => {
    onActiveChange?.(active);
  }, [active, onActiveChange]);

  // Handle external navigation (e.g. mobile button tap or indicator click)
  React.useEffect(() => {
    const raw = typeof targetIndex === "object" ? targetIndex?.index : targetIndex;
    if (typeof raw === "number" && raw >= 0 && raw <= count) {
      to(raw);
    }
  }, [targetIndex, count, to]);

  // Read after mount, not during render: the server has no matchMedia, and
  // branching on it inline is a hydration mismatch. Reduced motion drops the
  // easing, so the wheel lands where it is put instead of gliding there.
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const isMobile = w < 768;
    const isSmall = w < 480;

    // Responsive card dimensions to keep drum fully in view
    const cardMaxW = isSmall ? 0.62 : isMobile ? 0.48 : CARD_MAX_W;
    const cardHFrac = isMobile ? 0.32 : CARD_H;
    const cardW = Math.min(h * cardHFrac * CARD_RATIO, w * cardMaxW);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * (isMobile ? 0.96 : RING_R);
    // Shrink the ring's cards until the circle reads as a closed loop
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;

    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * (isMobile ? 0.85 : BOW),
      depth: cardH * LENS,
      title: cardH * TITLE,
      index: cardH * INDEX,
      isMobile,
    };
  }, [stage, count]);

  // One pass per frame: ease toward the target, then write every transform.
  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow, cardH } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      // The drum is pulled back so its front face lands on the picture plane.
      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          // Cards are only centred horizontally (marginLeft), so in the flat ring
          // they sat cardH/2 below the stage centre and the ring drifted under the
          // centre label. Lift them by half a card while in ring state; the drum
          // (m = 1) keeps its original placement.
          card.style.transform =
            `translateY(${-(1 - m) * (cardH / 2)}px) ` +
            place(d * (360 / count), drumDeg, ringR, drumR, bow, m);
          // Culled by distance, not by angle
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  const settling = React.useRef(0);
  const mouseDrag = React.useRef<{ x: number; y: number; startTarget: number } | null>(null);

  // Wheel listener for desktop and native touch swipe listener for mobile
  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    // Desktop Mouse Wheel & Trackpad scrolling
    const onWheel = (event: WheelEvent) => {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Only respond when section is visible in the viewport
      if (rect.bottom < 80 || rect.top > viewportHeight - 80) {
        return;
      }

      const isScrollingDown = event.deltaY > 0;
      const isScrollingUp = event.deltaY < 0;

      // At start of wheel (ring state) and scrolling up: allow natural page scroll up
      if (target.current <= 0 && isScrollingUp) {
        return;
      }

      // At end of wheel and scrolling down: allow natural page scroll down
      if (target.current >= last + 1 && isScrollingDown) {
        return;
      }

      // Actively browsing cards: prevent page jump and rotate drum
      event.preventDefault();

      const next = clamp(target.current + event.deltaY / WHEEL_UNITS, 0, last + 1);
      to(next);

      window.clearTimeout(settling.current);
      settling.current = window.setTimeout(
        () => to(Math.round(target.current)),
        SETTLE,
      );
    };

    // Mobile Native Touch Gesture Swiping (horizontal swipe turns cards, vertical scrolls page)
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let touchStartTarget = 0;
    let isSwiping = false;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchStartTime = Date.now();
      touchStartTarget = target.current;
      isSwiping = false;
      window.clearTimeout(settling.current);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      const diffX = touch.clientX - touchStartX;
      const diffY = touch.clientY - touchStartY;

      // Determine swipe direction
      if (!isSwiping) {
        if (Math.abs(diffX) > 8 && Math.abs(diffX) > Math.abs(diffY)) {
          isSwiping = true;
        } else if (Math.abs(diffY) > 10) {
          // Intent is vertical page scrolling: do not intercept
          return;
        }
      }

      if (isSwiping) {
        if (e.cancelable) e.preventDefault();
        const stageW = el.clientWidth || window.innerWidth;
        const dragFactor = stageW * 0.45;
        const next = clamp(touchStartTarget - diffX / dragFactor, 0, last + 1);
        to(next);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      const dt = Date.now() - touchStartTime;
      const touch = e.changedTouches[0];
      if (touch) {
        const diffX = touch.clientX - touchStartX;
        const diffY = touch.clientY - touchStartY;

        // Quick flick swipe detection
        if (dt < 320 && Math.abs(diffX) > 25 && Math.abs(diffX) > Math.abs(diffY)) {
          const step = diffX < 0 ? 1 : -1;
          const currentBase = Math.round(touchStartTarget);
          to(clamp(currentBase + step, 0, last + 1));
          isSwiping = false;
          return;
        }
      }

      if (isSwiping) {
        isSwiping = false;
        to(clamp(Math.round(target.current), 0, last + 1));
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      window.clearTimeout(settling.current);
    };
  }, [to, last]);

  return (
    <section
      aria-label="Radiology Expertise 3D Wheel"
      className={cn(
        "relative h-full min-h-[26rem] sm:min-h-[32rem] lg:min-h-[36rem] w-full overflow-hidden select-none",
        className,
      )}
      {...props}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="region"
        aria-label="Interactive radiology specialties drum. Scroll or swipe horizontally to navigate."
        className="focus-visible:ring-2 focus-visible:ring-ring absolute inset-0 cursor-grab outline-none active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px`, touchAction: "pan-y" }}
        onPointerDown={(event) => {
          if (event.pointerType === "touch") return; // Touch is handled by touch listeners above
          mouseDrag.current = {
            x: event.clientX,
            y: event.clientY,
            startTarget: target.current,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!mouseDrag.current || event.pointerType === "touch") return;
          const diffX = event.clientX - mouseDrag.current.x;
          const diffY = event.clientY - mouseDrag.current.y;
          const dominantDelta = Math.abs(diffX) > Math.abs(diffY) ? -diffX : -diffY;
          to(clamp(mouseDrag.current.startTarget + dominantDelta / DRAG_UNITS, 0, last + 1));
        }}
        onPointerUp={(event) => {
          if (event.pointerType === "touch") return;
          mouseDrag.current = null;
          to(clamp(Math.round(target.current), 0, last + 1));
        }}
        onPointerCancel={() => {
          mouseDrag.current = null;
          to(clamp(Math.round(target.current), 0, last + 1));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            to(Math.round(target.current) + 1);
            event.preventDefault();
          } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            to(Math.round(target.current) - 1);
            event.preventDefault();
          }
        }}
      >
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const Tag = (item.href ? "a" : "div") as "a";
            return (
              <React.Fragment key={item.title}>
                <Tag
                  id={`works-wheel-${i}`}
                  role="group"
                  aria-label={`${item.title} specialty`}
                  href={item.href}
                  ref={(node: HTMLElement | null) => {
                    cardRefs.current[i] = node;
                  }}
                  onClick={(e: React.MouseEvent) => {
                    const currentFront = Math.round(target.current - 1);
                    if (currentFront !== i) {
                      e.preventDefault();
                      to(i + 1);
                    }
                  }}
                  className="group absolute [backface-visibility:hidden] cursor-pointer"
                  style={{
                    width: metrics.cardW,
                    height: metrics.cardH,
                    marginLeft: -metrics.cardW / 2,
                  }}
                >
                  <span className="relative block size-full overflow-hidden rounded-lg border border-border bg-slate-900 shadow-lg transition-shadow group-hover:shadow-xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Subtle image vignette for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />

                    {/* Small category tag on card face */}
                    {item.category && (
                      <span className="absolute top-2.5 left-2.5 rounded-sm bg-slate-950/75 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90">
                        {item.category}
                      </span>
                    )}

                    {/* Action pill on hover */}
                    {action && item.href ? (
                      <span className="bg-white text-slate-950 font-semibold pointer-events-none absolute right-2.5 bottom-2.5 flex translate-y-1 items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] opacity-0 backdrop-blur-sm transition-all group-hover:translate-y-0 group-hover:opacity-100 shadow-md">
                        <svg
                          viewBox="0 0 12 12"
                          className="size-2.5"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 9 9 3M4 3h5v5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {action}
                      </span>
                    ) : null}
                  </span>
                </Tag>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Initial Center Label at rest (Ring State) */}
      <div
        ref={labelRef}
        className="pointer-events-none absolute inset-0 grid place-items-center tracking-tight text-center z-10 select-none transition-opacity"
        style={{ fontSize: `clamp(1.15rem, ${metrics.title * 0.95}px, 2.25rem)` }}
      >
        <div className="flex flex-col items-center justify-center p-3">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-1">
            Clinical Care
          </span>
          <span className="font-semibold tracking-tight text-foreground leading-[1.1] whitespace-pre-line">
            {label}
          </span>
          <span className="text-xs font-medium text-foreground-subtle mt-2.5 flex items-center gap-1.5">
            <svg
              className="size-3.5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span>Scroll or drag wheel</span>
          </span>
        </div>
      </div>

      {/* Active Specialty Detail Card (Desktop Drum View) */}
      <div
        ref={titleRef}
        className="hidden md:block pointer-events-auto absolute top-1/2 left-[4%] lg:left-[6%] -translate-y-1/2 max-w-[280px] lg:max-w-sm tracking-tight opacity-0 z-20 select-text"
      >
        <div className="p-4 sm:p-5 rounded-lg bg-card border border-border shadow-lg">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-1">
            {items[active]?.category || "Specialty"}
          </span>
          <h3
            className="font-semibold tracking-tight text-foreground leading-tight mb-2"
            style={{ fontSize: `clamp(1.2rem, ${metrics.title * 0.9}px, 2rem)` }}
          >
            {items[active]?.title}
          </h3>
          {items[active]?.description && (
            <p className="text-sm text-foreground-muted leading-relaxed mb-3">
              {items[active]?.description}
            </p>
          )}
          {items[active]?.href && (
            <a
              href={items[active].href}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-strong transition-colors group"
            >
              <span>Explore specialty</span>
              <svg className="size-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Right-Side Specialty Index (Desktop) */}
      <ol
        className="hidden md:block text-foreground-subtle absolute top-1/2 -translate-y-1/2 right-[3%] text-right leading-[1.8] z-20"
        style={{ fontSize: `clamp(0.75rem, ${metrics.index}px, 0.95rem)` }}
      >
        {items.map((item, i) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => to(i + 1)}
              className={cn(
                "cursor-pointer transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-2 py-0.5 block ml-auto",
                i === active
                  ? "text-primary font-semibold"
                  : "hover:text-foreground"
              )}
            >
              {item.shortTitle || item.title}
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default WorksWheel;
