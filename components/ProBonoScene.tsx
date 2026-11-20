"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { CT_DOOR_D, CT_HATCH, CT_LINES, CT_RESTROKE, CT_SPILL_D } from "./court-art";

/* Pro bono: an Indian court after the Supreme Court of India, as a pencil sketch in the manner of the About strip and the
   AI scenes. Every contour wobbles a little and carries a faint second stroke; shadows are hatched (court-art.ts, made by
   ux-review/court2.py). A client (gold) and their lawyer (black gown, maroon-ink here), drawn in pencil contour with hatched
   fills and seen from behind, walk up the forecourt side by side, climb the steps and pass into the arched door as it
   lights. One 11s loop, decorative only (aria-hidden). Motion lives in globals.css (.ct); it plays only on screen.
   Under reduced motion the pair stands at the open door. */
export default function ProBonoScene({ crop = false, className = "" }: { crop?: boolean; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const id = `ct-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle("ct-on", e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* a limb hung from (x, y): it shortens from the top as it swings away from the viewer */
  const limb = (cls: string, x: number, y: number, d: string, fill: string, extra?: ReactNode) => (
    <g transform={`translate(${x} ${y})`}>
      <g className={`a ${cls}`}>
        <path d={d} fill={fill} />
        {extra}
      </g>
    </g>
  );
  const light = `url(#${id}-l)`; // gold hatching on blush
  const dark = `url(#${id}-d)`; // maroon-ink cross-hatching on blush
  const hair = `url(#${id}-h)`;

  return (
    <div ref={root} aria-hidden="true" className={`ct relative w-full overflow-hidden ${className}`}>
      <svg viewBox={crop ? "290 60 620 552" : "60 58 1080 552"} className="block h-auto w-full" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-gold)" stopOpacity=".35" />
            <stop offset="1" stopColor="var(--color-gold)" stopOpacity="1" />
          </linearGradient>
          <pattern id={`${id}-l`} width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(-58)">
            <rect width="2.6" height="2.6" fill="var(--color-blush)" />
            <line x1="0" y1="0" x2="0" y2="2.6" stroke="var(--color-gold-deep)" strokeWidth=".5" opacity=".75" />
          </pattern>
          <pattern id={`${id}-d`} width="2" height="2" patternUnits="userSpaceOnUse" patternTransform="rotate(-58)">
            <rect width="2" height="2" fill="var(--color-blush)" />
            <line x1="0" y1="0" x2="0" y2="2" stroke="var(--color-maroon-ink)" strokeWidth=".75" />
            <line x1="0" y1="1" x2="2" y2="1" stroke="var(--color-maroon-ink)" strokeWidth=".45" opacity=".8" />
          </pattern>
          <pattern id={`${id}-h`} width="1.6" height="1.6" patternUnits="userSpaceOnUse" patternTransform="rotate(-70)">
            <rect width="1.6" height="1.6" fill="var(--color-blush)" />
            <line x1="0" y1="0" x2="0" y2="1.6" stroke="currentColor" strokeWidth=".7" />
          </pattern>
        </defs>
        <path className="ct-in" d={CT_DOOR_D} />
        <path className="i hat" d={CT_HATCH} />
        {/* the light from inside: fills the arch and spills onto the top step */}
        <g className="ct-glow a" fill={`url(#${id}-g)`}>
          <path d={CT_DOOR_D} />
          <path d={CT_SPILL_D} />
        </g>
        <path className="i re" d={CT_RESTROKE} />
        <path className="i" d={CT_LINES} />

        {/* the pair, seen from behind, feet on the origin */}
        <g className="ct-pair a">
          <g className="ct-bob a">
            {/* client: kurta over trousers, hands loose at the sides */}
            <g className="ct-client" transform="translate(-16 0)">
              {limb("ct-l1", -3.4, -24, "M-2.7 0C-2.8 7-2.5 15-2.3 21.6L2.2 21.8C2.4 15 2.7 7 2.8 0", light, <path d="M-2.6 21.6Q0 23.6 2.5 21.8" fill="none" />)}
              {limb("ct-l2", 3.4, -24, "M-2.8 0C-2.7 7-2.4 15-2.2 21.8L2.3 21.6C2.5 15 2.8 7 2.7 0", light, <path d="M-2.5 21.8Q0 23.6 2.6 21.6" fill="none" />)}
              {limb("ct-a1", -10.6, -52, "M-.6 0C-2.6 6-3.4 12-3 19.5L.6 19.8C.6 13 1.3 6 2.4 .6", light, <path d="M-3 19.6Q-2.6 23 -.4 22.6Q.9 21.6 .6 19.8" fill="none" />)}
              {limb("ct-a2", 10.6, -52, "M.6 0C2.6 6 3.4 12 3 19.5L-.6 19.8C-.6 13-1.3 6-2.4 .6", light, <path d="M3 19.6Q2.6 23 .4 22.6Q-.9 21.6-.6 19.8" fill="none" />)}
              <path d="M-2.6-56.4C-6.4-56.2-9.9-55.1-10.6-51.8L-11.1-40.5-11.9-23.8Q0-22.2 11.9-23.8L11.1-40.5 10.6-51.8C9.9-55.1 6.4-56.2 2.6-56.4Q0-55.2-2.6-56.4Z" fill={light} />
              <path className="fold" d="M-.2-54.6C.3-46-.4-34 .2-23.2M-11.4-30.5L-10.8-23.9M11.4-30.5L10.8-23.9M-6.5-53.5C-7.6-45-7.8-35-8.6-24M6.8-53C7.2-45 8-36 8.2-24.2" fill="none" />
              <path d="M-2.2-58.4L-2.5-56.2M2.2-58.4L2.5-56.2" fill="none" />
              <path d="M0-70.4C3.3-70.4 5.4-67.6 5.4-64.4C5.4-61.2 3.4-58.6 0-58.4C-3.4-58.6-5.4-61.2-5.4-64.4C-5.4-67.6-3.3-70.4 0-70.4Z" fill={hair} />
            </g>
            {/* lawyer: black barrister gown with a yoke, wide sleeves, a brief in the right hand */}
            <g className="ct-lawyer" transform="translate(16 0)">
              {limb("ct-l2", -3.6, -16, "M-2.6 0L-2.5 14.2 2.3 14.4 2.6 0", dark, <path d="M-2.8 14.2Q0 16.4 2.6 14.4" fill="none" />)}
              {limb("ct-l1", 3.6, -16, "M-2.6 0L-2.3 14.4 2.5 14.2 2.6 0", dark, <path d="M-2.6 14.4Q0 16.4 2.8 14.2" fill="none" />)}
              {limb("ct-a2", -12.4, -52.5, "M.8 0C-1.6 8-3.8 17-5.2 25.6Q-1.8 27.4 1.6 26.4C1.8 18 2.4 9 2.8 .8", dark, <path d="M-1.6 26.6Q-.6 29.4 1.2 28.6" fill="none" />)}
              {limb("ct-a1", 12.4, -52.5, "M-.8 0C1.6 8 3.8 17 5.2 25.6Q1.8 27.4-1.6 26.4C-1.8 18-2.4 9-2.8 .8", dark,
                <g>
                  <path d="M1.6 26.8Q.6 29.4-1.2 28.6" fill="none" />
                  <path d="M-3.4 29.4Q.1 27.2 3.6 29.4" fill="none" />
                  <path d="M-6.6 30.2L6.9 29.8 7.2 39.2-6.8 39.6Z" fill={light} />
                  <path d="M-6.6 33.4L7 33" fill="none" />
                </g>)}
              <path d="M-3.2-57.6C-7.6-57.4-11.7-56.2-12.6-52.4L-14.4-31-15.8-15.2Q-8-13.4 0-13.2Q8-13.4 15.8-15.2L14.4-31 12.6-52.4C11.7-56.2 7.6-57.4 3.2-57.6Q0-56.2-3.2-57.6Z" fill={dark} />
              <path className="fold" d="M-12.2-47.2Q0-43.4 12.2-47.2M-4.6-45C-5.4-36-6.6-25-7.6-14M0-44.2C.2-34-.2-24 0-13.4M4.6-45C5.4-36 6.4-25 7.4-14.2" fill="none" />
              <path d="M-4.2-58.6Q0-56.6 4.2-58.6L3.4-56.6Q0-55.2-3.4-56.6Z" fill="var(--color-blush)" />
              <path d="M0-71.6C3.4-71.6 5.6-68.8 5.6-65.6C5.6-62.2 3.6-59.6 0-59.4C-3.6-59.6-5.6-62.2-5.6-65.6C-5.6-68.8-3.4-71.6 0-71.6Z" fill={hair} />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
