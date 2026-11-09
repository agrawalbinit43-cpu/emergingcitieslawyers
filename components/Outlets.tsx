"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/*
 * A band of the outlets and forums our lawyers have written for or spoken at, set as outline lettering in the
 * site's own faces (Design Lab's spec). Plain names, like a citation: no third-party logos, so no trade mark
 * or endorsement question. To remove the band, delete <Outlets /> and its wrapper from components/Site.tsx.
 */
const NAMES: { name: string; serif: boolean }[] = [
  { name: "The Times of India", serif: true },
  { name: "Hindu BusinessLine", serif: true },
  { name: "Frontline", serif: true },
  { name: "Oxford University Press", serif: true },
  { name: "Kluwer Law International", serif: true },
  { name: "Edward Elgar", serif: true },
  { name: "Centre for Policy Research", serif: false },
  { name: "Fordham Environmental Law Review", serif: false },
  { name: "International Chamber of Commerce", serif: false },
  { name: "UNDP", serif: false },
];

function Line() {
  return (
    <div className="outlets-line flex shrink-0 items-center">
      {NAMES.map(({ name, serif }) => (
        <span key={name} className="flex items-center">
          <span className={serif ? "outlet outlet-serif" : "outlet outlet-sans"}>{name}</span>
          <span className="outlet-dot" />
        </span>
      ))}
    </div>
  );
}

export default function Outlets() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const band = root.current!;
        const track = band.querySelector<HTMLElement>(".outlets-track")!;
        const loop = gsap.to(track, {
          xPercent: -50,
          duration: window.innerWidth < 768 ? 45 : 70,
          ease: "none",
          repeat: -1,
        });
        const slow = () => gsap.to(loop, { timeScale: 0.25, duration: 0.6 });
        const fast = () => gsap.to(loop, { timeScale: 1, duration: 0.6 });
        band.addEventListener("mouseenter", slow);
        band.addEventListener("mouseleave", fast);
        return () => {
          band.removeEventListener("mouseenter", slow);
          band.removeEventListener("mouseleave", fast);
        };
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="outlets mb-24">
      <p className="mb-5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-dust md:text-[12px]">
        Published in and presented at
      </p>
      <ul className="sr-only">
        {NAMES.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="outlets-band border-y border-line py-6 md:py-[clamp(28px,3vw,44px)]">
        <div className="outlets-track flex w-max">
          <Line />
          <Line />
        </div>
      </div>
    </div>
  );
}
