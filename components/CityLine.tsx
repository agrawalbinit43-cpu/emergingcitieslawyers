"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Line drawings of what emerging India is building (public/drawings/city-*.svg, white shapes used as CSS masks over maroon).
   r is width / height; h is the drawn height against the tallest, so the set keeps one believable scale on a shared ground line. */
const DRAWINGS = [
  { file: "cowork", r: 1614 / 1427, h: 0.85, alt: "a co-working building for start-ups" },
  { file: "blr", r: 2479 / 741, h: 0.6, alt: "the Vidhana Soudha in Bangalore" },
  { file: "bungalow", r: 2010 / 1140, h: 0.62, alt: "an old bungalow turned into a start-up office" },
  { file: "factory", r: 2200 / 680, h: 0.4, alt: "a manufacturing plant" },
  { file: "build", r: 1376 / 2057, h: 1, alt: "an office tower rising under a crane" },
  { file: "rpr", r: 2250 / 977, h: 0.6, alt: "the Mantralaya in Nava Raipur" },
  { file: "metro", r: 2490 / 590, h: 0.42, alt: "an elevated metro line" },
];

/* Street trees and lamps fill the ground between the buildings, so the strip reads as one street.
   One group follows each building, in order; h is again against the tallest building. */
const STREET: { file: string; r: number; h: number }[][] = [
  [{ file: "tree-a", r: 240 / 220, h: 0.55 }],
  [{ file: "lamp", r: 80 / 260, h: 0.58 }, { file: "mast", r: 90 / 260, h: 0.58 }],
  [{ file: "tree-b", r: 200 / 190, h: 0.45 }],
  [{ file: "mast", r: 90 / 260, h: 0.58 }, { file: "tree-a", r: 240 / 220, h: 0.55 }],
  [{ file: "tree-b", r: 200 / 190, h: 0.45 }, { file: "lamp", r: 80 / 260, h: 0.58 }],
  [{ file: "tree-a", r: 240 / 220, h: 0.55 }],
  [{ file: "lamp", r: 80 / 260, h: 0.58 }, { file: "mast", r: 90 / 260, h: 0.58 }],
];

/** three copies, so the strip never runs out on a wide screen; the loop moves by exactly one copy */
const COPIES = 3;

/**
 * One row of drawings that never stops. On a wide screen the row drifts slowly to the left. A phone shows the same drift, a
 * little slower. Off screen the row rests; for visitors who ask for
 * reduced motion, or without JavaScript, it stays still and can be scrolled sideways.
 */
export default function CityLine() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = root.current!;
      const track = stage.querySelector<HTMLElement>(".city-track")!;
      const mm = gsap.matchMedia();
      mm.add(
        { wide: "(min-width: 768px)", phone: "(max-width: 767px)", still: "(prefers-reduced-motion: reduce)" },
        (ctx) => {
          const { wide, still } = ctx.conditions!;
          if (still) return;
          stage.classList.add("is-moving");

          // one slow, continuous drift on every screen: about 36 px a second on a wide screen, 28 on a phone
          const span = () => track.scrollWidth / COPIES;
          const loop = gsap.fromTo(track, { x: 0 }, { x: () => -span(), duration: span() / (wide ? 36 : 28), ease: "none", repeat: -1, paused: true });
          const st = ScrollTrigger.create({ trigger: stage, start: "top bottom", end: "bottom top", onToggle: (s) => (s.isActive ? loop.play() : loop.pause()) });
          return () => {
            st.kill();
            loop.kill();
            gsap.set(track, { x: 0 });
            stage.classList.remove("is-moving");
          };
        },
      );

    },
    { scope: root },
  );

  return (
    <div ref={root} role="img" aria-label={`Line drawings of ${DRAWINGS.map((d) => d.alt).join(", ")}`} className="city-stage relative w-full">
      <div className="city-track flex w-max items-end">
        {Array.from({ length: COPIES }, (_, c) =>
          DRAWINGS.map((d, i) => (
            <div key={`${c}-${d.file}`} aria-hidden="true" className="city-slot flex shrink-0 items-end">
              <div
                className="city-lines"
                style={{ aspectRatio: String(d.r), width: `min(64vw, calc(var(--city-h) * ${d.h * d.r}))`, ["--img" as string]: `url(/drawings/city-${d.file}.svg)` }}
              />
              <div className="flex items-end gap-[clamp(10px,1.4vw,22px)] px-[clamp(18px,2.6vw,44px)]">
                {STREET[i].map((t, j) => (
                  <div
                    key={j}
                    className="city-lines"
                    style={{ aspectRatio: String(t.r), width: `calc(var(--city-h) * ${t.h * t.r})`, ["--img" as string]: `url(/drawings/city-${t.file}.svg)` }}
                  />
                ))}
              </div>
            </div>
          )),
        )}
      </div>
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-maroon/40" />
    </div>
  );
}
