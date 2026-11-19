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
  { file: "factory", r: 2200 / 680, h: 0.5, alt: "a manufacturing plant" },
  { file: "build", r: 1376 / 2057, h: 1, alt: "an office tower rising under a crane" },
  { file: "rpr", r: 2250 / 977, h: 0.6, alt: "the Mantralaya in Nava Raipur" },
  { file: "metro", r: 2490 / 590, h: 0.42, alt: "an elevated metro line" },
];

/** three copies, so the strip never runs out on a wide screen; the loop moves by exactly one copy */
const COPIES = 3;

/**
 * One row of drawings that never stops. On a wide screen the row drifts slowly to the left. On a phone each drawing has the
 * screen to itself: it holds, then slides away as the next one arrives. Off screen the row rests; for visitors who ask for
 * reduced motion, or without JavaScript, it stays still and can be scrolled sideways.
 */
export default function CityLine() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = root.current!;
      const track = stage.querySelector<HTMLElement>(".city-track")!;
      const setSlot = () => stage.style.setProperty("--slot", `${stage.clientWidth}px`);
      setSlot();
      window.addEventListener("resize", setSlot);

      const mm = gsap.matchMedia();
      mm.add(
        { wide: "(min-width: 768px)", phone: "(max-width: 767px)", still: "(prefers-reduced-motion: reduce)" },
        (ctx) => {
          const { wide, still } = ctx.conditions!;
          if (still) return;
          stage.classList.add("is-moving");

          let loop: gsap.core.Animation;
          if (wide) {
            // about 36 px a second: slow enough to read as calm
            const span = () => track.scrollWidth / COPIES;
            loop = gsap.fromTo(track, { x: 0 }, { x: () => -span(), duration: span() / 36, ease: "none", repeat: -1, paused: true });
          } else {
            const tl = gsap.timeline({ repeat: -1, paused: true });
            for (let k = 1; k <= DRAWINGS.length; k++) {
              tl.to(track, { x: () => -k * stage.clientWidth, duration: 1.1, ease: "power3.inOut" }, "+=2.2");
            }
            tl.set(track, { x: 0 });
            loop = tl;
          }
          const st = ScrollTrigger.create({ trigger: stage, start: "top bottom", end: "bottom top", onToggle: (s) => (s.isActive ? loop.play() : loop.pause()) });
          return () => {
            st.kill();
            loop.kill();
            gsap.set(track, { x: 0 });
            stage.classList.remove("is-moving");
          };
        },
      );

      return () => window.removeEventListener("resize", setSlot);
    },
    { scope: root },
  );

  return (
    <div ref={root} role="img" aria-label={`Line drawings of ${DRAWINGS.map((d) => d.alt).join(", ")}`} className="city-stage relative w-full">
      <div className="city-track flex w-max items-end">
        {Array.from({ length: COPIES }, (_, c) =>
          DRAWINGS.map((d) => (
            <div key={`${c}-${d.file}`} aria-hidden="true" className="city-slot flex shrink-0 justify-center md:pr-[clamp(48px,6vw,104px)]">
              <div
                className="city-lines"
                style={{ aspectRatio: String(d.r), width: `min(76vw, calc(var(--city-h) * ${d.h * d.r}))`, ["--img" as string]: `url(/drawings/city-${d.file}.svg)` }}
              />
            </div>
          )),
        )}
      </div>
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-maroon/40" />
    </div>
  );
}
