"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Line drawings traced from photographs (public/drawings/*.png hold only the lines, as alpha; CSS fills them with gold).
   r is width / height. Unlabelled on the page, as the partners asked; the names are for screen readers. */
const DRAWINGS = [
  { src: "/drawings/supreme-court.png", r: 1200 / 817, name: "the Supreme Court of India" },
  { src: "/drawings/yale.png", r: 1050 / 945, name: "Yale Law School" },
  { src: "/drawings/juridicum.png", r: 1037 / 1001, name: "the University of Vienna’s Juridicum" },
  { src: "/drawings/nlsiu.png", r: 1110 / 1150, name: "the National Law School of India University" },
];

/**
 * The buildings orbit slowly: the one in front is large and bright, the others smaller and dimmer behind it.
 * Drag to turn them; hovering holds them still. They stop while off screen, and stay still for reduced motion.
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
            opacity: 0.16 + 0.84 * depth ** 1.6,
            zIndex: Math.round(depth * 100),
          });
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
        // a slow continuous turn, about 48 s a revolution; it eases to a stop on hover and while dragging
        const spin = gsap.to(turn, { a: "-=360", duration: 48, ease: "none", repeat: -1, onUpdate: () => !dragging && place(), paused: true });
        const hold = (on: boolean) => gsap.to(spin, { timeScale: on ? 0 : 1, duration: 0.8, ease: "power2.out" });
        stage.addEventListener("pointerenter", () => hold(true));
        stage.addEventListener("pointerleave", () => !dragging && hold(false));
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
