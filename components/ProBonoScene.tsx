"use client";

import { useEffect, useId, useRef } from "react";
import { CT_DOOR_D, CT_LINES, CT_SOFT, CT_SPILL_D } from "./court-art";

/* Pro bono: an Indian court, after the Supreme Court of India (dome on a two-tier drum, corner chhatris, a tall portico
   under a deep chhajja, long wings on a sandstone plinth), drawn in the pencil line of the About strip and the AI scenes.
   A client (gold) and their lawyer (in a black gown, maroon here) walk up the forecourt side by side, seen from behind,
   climb the steps and pass into the arched door as it lights. One 11s loop, decorative only (aria-hidden).
   Motion lives in globals.css (.ct); it plays only on screen. Under reduced motion the pair stands at the open door. */
export default function ProBonoScene({ crop = false, className = "" }: { crop?: boolean; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const gid = `ct-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle("ct-on", e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* a leg (or arm) seen from behind: it shortens from the hip as the foot lifts */
  const leg = (cls: string, x: number, y0: number, y1: number) => (
    <g transform={`translate(${x} ${y0})`}>
      <line className={`a ${cls}`} x1="0" y1="0" x2="0" y2={y1 - y0} />
    </g>
  );

  return (
    <div ref={root} aria-hidden="true" className={`ct relative w-full overflow-hidden ${className}`}>
      <svg viewBox={crop ? "290 60 620 552" : "60 58 1080 552"} className="block h-auto w-full" aria-hidden="true">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-gold)" stopOpacity=".35" />
            <stop offset="1" stopColor="var(--color-gold)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path className="ct-in" d={CT_DOOR_D} />
        {/* the light from inside: fills the arch and spills onto the top step */}
        <g className="ct-glow a" fill={`url(#${gid})`}>
          <path d={CT_DOOR_D} />
          <path d={CT_SPILL_D} />
        </g>
        <path className="i soft" d={CT_SOFT} />
        <path className="i" d={CT_LINES} />

        {/* the pair, seen from behind, feet on the origin */}
        <g className="ct-pair a">
          <g className="ct-bob a">
            {/* client */}
            <g className="ct-client" transform="translate(-17 0)">
              {leg("ct-l1", -3.6, -30, 0)}
              {leg("ct-l2", 3.6, -30, 0)}
              <rect x="-8.5" y="-55" width="17" height="28" rx="4.5" />
              {leg("ct-a1 arm", -10.5, -51, -30)}
              {leg("ct-a2 arm", 10.5, -51, -30)}
              <circle cx="0" cy="-62.5" r="6.6" />
            </g>
            {/* lawyer: gown, sleeves and a brief in the right hand */}
            <g className="ct-lawyer" transform="translate(17 0)">
              {leg("ct-l2", -3.6, -20, 0)}
              {leg("ct-l1", 3.6, -20, 0)}
              <path d="M-9 -56Q0 -59 9 -56L14.5 -15Q0 -12.5 -14.5 -15Z" />
              {leg("ct-a2 arm", -11.5, -52, -31)}
              <g transform="translate(11.5 -52)">
                <g className="a ct-a1">
                  <line className="arm" x1="0" y1="0" x2="0" y2="21" />
                  <rect x="-2.5" y="20" width="13" height="10" rx="1.5" />
                </g>
              </g>
              <circle cx="0" cy="-63" r="6.6" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
