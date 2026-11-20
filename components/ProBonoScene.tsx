"use client";

import { useEffect, useId, useRef } from "react";
import { CT_DOOR, CT_LINES, CT_SOFT } from "./court-art";

/* Pro bono: a court, drawn in the pencil line of the About strip and the AI scenes, and one person walking into it.
   One 14s loop: they walk in from the left, climb a step per footstep, cross the portico and pass into the doorway as it
   warms. Gold-deep is the person and the light they bring in; the building stays maroon. Purely decorative (aria-hidden).
   Motion lives in globals.css (.ct); it plays only on screen. Under reduced motion the person stands at the open door. */
export default function ProBonoScene({ crop = false, className = "" }: { crop?: boolean; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle("ct-on", e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const d = CT_DOOR;
  const gid = `ct-${useId().replace(/:/g, "")}`;
  /* one limb: a thigh (or upper arm) swinging from its joint, with a shin (or forearm) hinged at the knee */
  const limb = (cls: string, a: number, b: number, foot = false) => (
    <g className={`a ${cls}-1`}>
      <line x1="0" y1="0" x2="0" y2={a} />
      <g transform={`translate(0 ${a})`}>
        <g className={`a ${cls}-2`}>
          <line x1="0" y1="0" x2="0" y2={b} />
          {foot && <line x1="0" y1={b} x2="5.5" y2={b} />}
        </g>
      </g>
    </g>
  );

  return (
    <div ref={root} aria-hidden="true" className={`ct relative w-full overflow-hidden ${className}`}>
      <svg viewBox={crop ? "250 112 700 372" : "100 108 1000 378"} className="block h-auto w-full" aria-hidden="true">
        <rect className="ct-in" x={d.x} y={d.y} width={d.w} height={d.h} />
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-gold)" stopOpacity=".35" />
            <stop offset="1" stopColor="var(--color-gold)" stopOpacity="1" />
          </linearGradient>
        </defs>
        {/* the light from inside: fills the doorway and spills onto the top step */}
        <g className="ct-glow a" fill={`url(#${gid})`}>
          <rect x={d.x} y={d.y} width={d.w} height={d.h} />
          <path d={`M${d.x} ${d.y + d.h}H${d.x + d.w}L${d.x + d.w + 30} ${d.y + d.h + 10}H${d.x - 30}Z`} />
        </g>
        <path className="i soft" d={CT_SOFT} />
        <path className="i" d={CT_LINES} />
        {/* the person: feet at the origin, facing right */}
        <g className="ct-fig a">
          <g className="ct-rise a">
            <g transform="scale(1.12)">
            <g className="ct-bob a fig">
              <g className="back">
                <g transform="translate(0 -32)">{limb("ct-lb", 16, 16, true)}</g>
                <g transform="translate(2 -51)">{limb("ct-ab", 12.5, 11.5)}</g>
              </g>
              <line className="torso" x1="0.5" y1="-33" x2="2" y2="-50" />
              <circle className="head" cx="3.4" cy="-61" r="6.4" />
              <g transform="translate(0 -32)">{limb("ct-lf", 16, 16, true)}</g>
              <g transform="translate(2 -51)">{limb("ct-af", 12.5, 11.5)}</g>
            </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
