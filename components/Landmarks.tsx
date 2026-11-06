"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Vector line drawings (public/drawings/*.svg, white strokes; CSS uses them as masks over gold). The Supreme Court and Yale
   are traced from photographs and refined; the Juridicum and NLSIU are constructed from their geometry.
   r is width / height. Unlabelled on the page, as the partners asked; the names are for screen readers. */
const DRAWINGS = [
  { src: "/drawings/supreme-court.svg", r: 1300 / 930, name: "the Supreme Court of India" },
  { src: "/drawings/yale.svg", r: 1200 / 1425, name: "Yale Law School" },
  { src: "/drawings/juridicum.svg", r: 1200 / 718, name: "the University of Vienna’s Juridicum" },
  { src: "/drawings/nlsiu.svg", r: 1100 / 1000, name: "the National Law School of India University" },
];

/**
 * The buildings orbit slowly: the one in front is large and bright, the others smaller and dimmer behind it.
 * They keep turning on their own; a drag turns them by hand, then they carry on. Off screen they rest, and they stay
 * still for visitors who ask for reduced motion.
 */
export default function Landmarks() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = root.current!;
      const cards = gsap.utils.toArray<HTMLElement>(".landmark", stage);
      const step = 360 / cards.length;
      const turn = { a: 0 };

      function place() {
        const w = stage.clientWidth;
        const rx = Math.min(w * 0.36, 520);
        cards.forEach((c, i) => {
          const a = ((turn.a + i * step) * Math.PI) / 180;
          const depth = (Math.cos(a) + 1) / 2; // 1 in front, 0 behind
          gsap.set(c, {
            xPercent: -50,
            yPercent: -50,
            x: Math.sin(a) * rx,
            y: (1 - depth) * -36,
            scale: 0.48 + 0.52 * depth,
            zIndex: Math.round(depth * 100),
          });
          // only the lines fade with distance; the plate stays solid, so the building in front hides the ones behind
          gsap.set(c.firstElementChild, { opacity: 0.16 + 0.84 * depth ** 1.6 });
        });
      }
      place();

      // dragging turns the ring: a full stage width is about one building
      let dragging = false;
      let startX = 0;
      let startA = 0;
      const down = (e: PointerEvent) => {
        dragging = true;
        startX = e.clientX;
        startA = turn.a;
        stage.setPointerCapture(e.pointerId);
        stage.classList.add("is-dragging");
      };
      const move = (e: PointerEvent) => {
        if (!dragging) return;
        turn.a = startA + ((e.clientX - startX) / stage.clientWidth) * step * 1.4;
        place();
      };
      const up = () => {
        dragging = false;
        stage.classList.remove("is-dragging");
      };
      stage.addEventListener("pointerdown", down);
      stage.addEventListener("pointermove", move);
      stage.addEventListener("pointerup", up);
      stage.addEventListener("pointercancel", up);
      window.addEventListener("resize", place);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // a slow continuous turn, about 40 s a revolution
        const spin = gsap.to(turn, { a: "-=360", duration: 40, ease: "none", repeat: -1, onUpdate: () => !dragging && place(), paused: true });
        ScrollTrigger.create({ trigger: stage, start: "top bottom", end: "bottom top", onToggle: (s) => (s.isActive ? spin.play() : spin.pause()) });
      });

      return () => {
        window.removeEventListener("resize", place);
      };
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      data-reveal="rise"
      role="img"
      aria-label={`Line drawings of ${DRAWINGS.map((d) => d.name).join(", ")}`}
      className="landmarks relative h-[clamp(360px,52vw,660px)] w-full cursor-grab touch-pan-y select-none"
    >
      {DRAWINGS.map((d) => (
        // the plate behind the lines is the section's own colour, so the building in front hides the ones behind it
        <div key={d.src} className="landmark absolute left-1/2 top-1/2 h-[86%]" style={{ aspectRatio: String(d.r) }}>
          <div className="landmark-lines h-full w-full" style={{ ["--img" as string]: `url(${d.src})` }} />
        </div>
      ))}
    </div>
  );
}
