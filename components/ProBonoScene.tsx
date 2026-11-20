"use client";

import { useEffect, useRef } from "react";
import { PB_LINES, PB_SOFT } from "./probono-art";

/* Pro bono, in the hand of the About strip and the AI scenes: a home, a street, a lawyer's chambers and a district court on one
   ground line. One 16s loop in three beats: a light comes on at home and a letter (the request) arcs to the chambers; the person
   (gold) and counsel (maroon) walk side by side to the court, whose door lights; a short hold, then a fade. Purely decorative.
   Motion lives in globals.css (.pb); it plays only on screen, and under reduced motion the scene rests on its last frame. */
/* phone: crop to the chambers, street and court so the detail stays readable; the letter flies in from the left edge */
export default function ProBonoScene({ crop = false, className = "" }: { crop?: boolean; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle("pb-on", e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={root}
      aria-hidden="true"
      className={`pb relative w-full overflow-hidden ${className}`}
    >
      <svg viewBox={crop ? "690 255 1300 340" : "0 250 2000 345"} className="block h-auto w-full overflow-visible" aria-hidden="true">
        {/* gold is the person and their request: the home window, the letter, the gold dot; the court door answers in maroon */}
        <rect className="pb-glow a pb-g0" x="220" y="450" width="70" height="62" />
        <rect className="pb-door a pb-g2" x="1678" y="440" width="44" height="76" />
        <path className="i soft" d={PB_SOFT} />
        <path className="i" d={PB_LINES} />
        <circle className="mf" cx="160" cy="536" r="2.5" />
        {/* the request */}
        <g className="a pb-letter" style={{ offsetPath: `path("M255 476 Q505 210 770 388")` }}>
          <path className="g" d="M-18 -12 H18 V12 H-18 Z M-18 -12 L0 2 L18 -12" />
        </g>
        {/* the person and counsel */}
        <circle className="gf a pb-you" cx="0" cy="0" r="16" />
        <circle className="mf a pb-us" cx="0" cy="0" r="16" />
      </svg>
    </div>
  );
}
