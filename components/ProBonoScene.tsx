"use client";

import { useEffect, useRef } from "react";
import { PB_LINES, PB_SOFT } from "./probono-art";

/* Pro bono, in the hand of the About strip and the AI scenes: a home, a street, our office and a court on one ground line.
   One 16s loop: a light comes on at home; a letter (the request) arcs to our office, whose window answers; the person (gold)
   walks out, counsel (maroon) joins at our door, and they walk on together; the court door lights and the scale on the
   pediment comes level. Motion lives in globals.css (.pb); it plays only on screen and never under reduced motion,
   where the scene rests at its end: both at the court door, the scale level. */
export default function ProBonoScene() {
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
      role="img"
      aria-label="Line drawing: a light comes on in a small home and a letter travels to our office. The person walks out, a lawyer joins them at our door, and they walk on together to the court, where the scales come level."
      className="pb relative w-full"
    >
      <svg viewBox="0 250 2000 345" className="block h-auto w-full overflow-visible" aria-hidden="true">
        {/* lights that come on: home window, our office window, the court door */}
        <rect className="pb-glow a pb-g0" x="220" y="450" width="70" height="62" />
        <rect className="pb-glow a pb-g1" x="745" y="362" width="50" height="58" />
        <rect className="pb-glow a pb-g2" x="1678" y="440" width="44" height="76" />
        <path className="i soft" d={PB_SOFT} />
        <path className="i" d={PB_LINES} />
        <circle className="mf" cx="160" cy="536" r="2.5" />
        {/* the scale on the pediment: beam and pans tip, then settle */}
        <g className="a pb-beam">
          <path className="g" d="M1662 300 H1738 M1662 300 L1651 322 M1662 300 L1673 322 M1738 300 L1727 322 M1738 300 L1749 322 M1648 322 Q1662 334 1676 322 Z M1724 322 Q1738 334 1752 322 Z" />
        </g>
        <circle className="gf" cx="1700" cy="300" r="3.5" />
        {/* the request */}
        <g className="a pb-letter" style={{ offsetPath: `path("M255 476 Q505 210 770 388")` }}>
          <path className="g" d="M-18 -12 H18 V12 H-18 Z M-18 -12 L0 2 L18 -12" />
        </g>
        {/* the person and counsel */}
        <circle className="gf a pb-you" cx="0" cy="0" r="13" />
        <circle className="mf a pb-us" cx="0" cy="0" r="13" />
      </svg>
    </div>
  );
}
