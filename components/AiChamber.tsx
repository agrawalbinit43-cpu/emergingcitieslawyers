"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AI_CARDS, AI_CHECKS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Four pen drawings in the About strip's hand (public/drawings/ai-*.svg, white shapes used as CSS masks).
   Each leaves a blank zone (a screen, a window, a clock face, a page) where a looping line animation tells
   the AI point. Overlay SVGs share the drawing's own pixel grid (viewBox 0 0 W H), so they sit exactly on it.
   Motion lives in globals.css (.sk); it runs only while a scene is on screen and never under reduced motion. */

type P = [number, number];
const lerp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/* 01 On our machines: the agent writes on our own screen; work circles between screen and tower and never nears the window;
   clouds drift outside on their own. */
const ORBIT = "M640 640 C700 600 790 640 790 700 C790 780 700 820 640 770 C610 745 610 665 640 640 Z";
function Local() {
  const lines: [number, number][] = [[575, 600], [625, 560], [675, 610], [725, 520], [770, 450]];
  return (
    <>
      <defs>
        <clipPath id="sk-panes">
          <rect x="1092" y="66" width="236" height="408" />
          <rect x="1362" y="66" width="236" height="408" />
          <rect x="1092" y="512" width="236" height="410" />
          <rect x="1362" y="512" width="236" height="410" />
        </clipPath>
      </defs>
      <g clipPath="url(#sk-panes)">
        <path className="i soft a sk-cloud" d="M1000 300 h170 a40 40 0 0 0 -12 -78 a58 58 0 0 0 -110 -18 a40 40 0 0 0 -48 96 z" />
        <path className="i soft a sk-cloud c2" d="M1060 720 h130 a32 32 0 0 0 -10 -62 a46 46 0 0 0 -88 -14 a32 32 0 0 0 -32 76 z" />
      </g>
      <path className="g a sk-spark" d="M225 553 L231 569 L247 575 L231 581 L225 597 L219 581 L203 575 L219 569 Z" />
      {lines.map(([y, x2], i) => (
        <line key={y} className={`i a sk-w sk-w${i}`} x1="265" y1={y} x2={x2} y2={y} pathLength={1} />
      ))}
      <circle className="gf a sk-led" cx="742" cy="785" r="9" />
      {[0, 1.3, 2.6].map((d) => (
        <circle key={d} className="gf a sk-orbit" r="10" style={{ offsetPath: `path("${ORBIT}")`, animationDelay: `-${d}s` }} />
      ))}
    </>
  );
}

/* 02 Built in-house: open-source parts hop along the bench and join into one tool; it goes into our machine, which turns. */
const GEAR = (cx: number, cy: number, r: number) =>
  `M${cx + r} ${cy} a${r} ${r} 0 1 0 ${-2 * r} 0 a${r} ${r} 0 1 0 ${2 * r} 0` +
  Array.from({ length: 8 }, (_, k) => {
    const a = (k * Math.PI) / 4, c = Math.cos(a), s = Math.sin(a);
    return ` M${(cx + c * r).toFixed(1)} ${(cy + s * r).toFixed(1)} L${(cx + c * r * 1.35).toFixed(1)} ${(cy + s * r * 1.35).toFixed(1)}`;
  }).join("") +
  ` M${cx + r * 0.38} ${cy} a${r * 0.38} ${r * 0.38} 0 1 0 ${-r * 0.76} 0 a${r * 0.38} ${r * 0.38} 0 1 0 ${r * 0.76} 0`;

function Parts() {
  const icons = [
    "M42 30 l-22 20 l22 20 M78 30 l22 20 l-22 20 M68 24 l-16 52",
    "M34 18 h38 l16 16 v50 h-54 z M72 18 v16 h16 M44 48 h34 M44 60 h34 M44 72 h22",
    GEAR(60, 50, 22),
  ];
  return (
    <>
      {icons.map((d, i) => (
        <g key={i} className={`a sk-hop sk-hop${i}`}>
          <g transform={`translate(${660 + i * 130} 386) scale(0.84)`}>
            <rect className="i" x="0" y="0" width="120" height="100" rx="6" />
            <path className="g" d={d} />
          </g>
        </g>
      ))}
      <rect className="i a sk-frame" x="1090" y="376" width="320" height="104" rx="8" pathLength={1} />
      <circle className="gf a sk-carry" r="11" style={{ offsetPath: `path("M1410 400 Q1600 330 1718 640")` }} />
      <g className="a sk-turn">
        <path className="g" d={GEAR(1765, 678, 34)} />
      </g>
      {[700, 760, 820].map((y, i) => (
        <line key={y} className={`g a sk-bar sk-bar${i}`} x1="1975" y1={y} x2="2032" y2={y} pathLength={1} />
      ))}
    </>
  );
}

/* 03 Faster: research, draft and review fill side by side while the minute hand moves ten minutes; then a lawyer signs off. */
const SHEETS: [P, P, P, P][] = [
  [[735, 298], [925, 298], [982, 575], [789, 575]],
  [[953, 280], [1144, 280], [1204, 575], [1011, 575]],
  [[1179, 298], [1369, 298], [1427, 575], [1235, 575]],
];

function Clock() {
  const C: P = [332, 254];
  return (
    <>
      {Array.from({ length: 12 }, (_, k) => {
        const a = (k * Math.PI) / 6, r1 = k % 3 ? 168 : 150, r2 = 182;
        return <line key={k} className="i" x1={C[0] + Math.sin(a) * r1} y1={C[1] - Math.cos(a) * r1} x2={C[0] + Math.sin(a) * r2} y2={C[1] - Math.cos(a) * r2} />;
      })}
      <circle className="a sk-wedge" cx={C[0]} cy={C[1]} r="70" pathLength={1} transform={`rotate(-90 ${C[0]} ${C[1]})`} />
      <line className="i heavy" x1={C[0]} y1={C[1]} x2={C[0] - 80} y2={C[1] - 46} />
      <line className="i heavy a sk-hand" x1={C[0]} y1={C[1]} x2={C[0]} y2={C[1] - 140} />
      <circle className="mf" cx={C[0]} cy={C[1]} r="9" />
      {SHEETS.map(([tl, tr, br, bl], s) => (
        <g key={s}>
          {[0.18, 0.32, 0.46, 0.6, 0.74].map((t, i) => {
            const a = lerp(tl, bl, t), b = lerp(tr, br, t);
            const end = i === 4 ? 0.55 : 1;
            return <line key={t} className={`i a sk-w sk-w${i}`} x1={a[0] + 26} y1={a[1]} x2={a[0] + 26 + (b[0] - a[0] - 52) * end} y2={b[1]} pathLength={1} />;
          })}
          {(() => {
            const p = lerp(tr, br, 0.9);
            return (
              <>
                <path className="i thick a sk-tick" d={`M${p[0] - 70} ${p[1] - 4} l12 12 l24 -24`} pathLength={1} />
                {s === 2 && <circle className="i a sk-ring" cx={p[0] - 52} cy={p[1] - 6} r="34" pathLength={1} />}
              </>
            );
          })()}
        </g>
      ))}
    </>
  );
}

/* 04 Co-created: the AI platform (rack) and the firm (laptop) pass a document round; each pass adds to it, then it is signed. */
/* 04: two people write one document together on the screen in their own room */
const CO_LINES: [number, number][] = [[90, 1230], [155, 1150], [220, 1210], [285, 1100], [350, 960]];

function Collab() {
  return (
    <>
      {CO_LINES.map(([y, x2], i) => (
        <g key={y}>
          <circle className={`${i % 2 ? "gf" : "mf"} a sk-cd sk-cd${i}`} cx="652" cy={y} r="7" />
          <line className={`i thick a sk-cl sk-cl${i}`} x1="680" y1={y} x2={x2} y2={y} pathLength={1} />
        </g>
      ))}
      <circle className="mf a sk-cur sk-cm" cx="0" cy="0" r="11" />
      <circle className="gf a sk-cur sk-cg" cx="0" cy="0" r="11" />
      <circle className="i a sk-poke" cx="968" cy="470" r="26" />
      <text className="a sk-sect" x="1060" y="372">§</text>
      <circle className="i a sk-ring2" cx="1080" cy="350" r="44" pathLength={1} />
    </>
  );
}

const SCENES = [
  { file: "local", W: 1700, H: 1318, Art: Local, alt: "an office desk with a computer and a window; the computer works on its own screen while clouds pass outside" },
  { file: "parts", W: 2137, H: 1038, Art: Parts, alt: "a workbench where three parts are stacked into one tool and fed into a computer" },
  { file: "clock", W: 1914, H: 1337, Art: Clock, alt: "a desk with three pages filling side by side under a wall clock that moves only a little" },
  { file: "collab", W: 1732, H: 1145, Art: Collab, alt: "two people side by side at one desk, taking turns to write a single document on the screen in front of them" },
];

/* an invented signature, never a partner's own */
const SIGN = "M6 30 C10 18 18 6 24 10 C30 14 20 34 16 36 C12 38 18 24 30 22 C40 20 38 32 44 30 C50 28 52 18 56 22 C60 26 56 32 62 30 C70 27 72 12 78 16 C84 20 76 32 86 30 C96 27 104 20 114 22 C122 24 126 28 134 26 M52 40 C84 36 120 32 168 27";

export default function AiChamber() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      // loops play only while their scene is on screen
      (q(".sk") as HTMLElement[]).forEach((el) => ScrollTrigger.create({ trigger: el, start: "top bottom", end: "bottom top", toggleClass: "sk-on" }));

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        (q(".sk-ink") as HTMLElement[]).forEach((el) => {
          gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "power2.inOut", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
        });
        const sig = q(".sig path")[0] as unknown as SVGPathElement | undefined;
        if (sig) {
          const len = sig.getTotalLength();
          gsap.set(sig, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(sig, { strokeDashoffset: 0, duration: 1.4, ease: "power1.out", scrollTrigger: { trigger: q(".checks")[0], start: "top 60%", once: true } });
        }
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <div className="grid grid-cols-1 gap-y-14 md:grid-cols-2 md:gap-y-[clamp(24px,3.5svh,40px)]">
        {SCENES.map(({ file, W, H, Art, alt }, i) => {
          const [name, what] = AI_CARDS[i];
          const r = W / H;
          return (
            <figure key={file} className="relative md:px-[clamp(18px,2.2vw,36px)] md:[&:nth-child(even)]:border-l md:[&:nth-child(even)]:border-maroon/25">
              <div className="flex aspect-[16/10] md:aspect-auto md:h-[clamp(160px,25svh,330px)] items-end justify-center border-b border-maroon/40 [container-type:size] md:-mx-[clamp(18px,2.2vw,36px)]">
                <div className="sk relative" role="img" aria-label={`Line drawing: ${alt}`} style={{ ["--d" as string]: `${i * 2}s`, aspectRatio: String(r), width: `min(94cqw, ${(r * 90).toFixed(1)}cqh)` }}>
                  <div className="sk-ink city-lines absolute inset-0 [mask-size:100%_100%]" style={{ ["--img" as string]: `url(/drawings/ai-${file}.svg)` }} />
                  <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
                    <Art />
                  </svg>
                </div>
              </div>
              <figcaption className="pt-6 md:pt-4">
                <span className="mb-2 block font-text text-[20px] italic text-gold-deep md:mb-1 md:mr-3 md:inline">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mb-2 font-display text-[19px] font-semibold text-maroon md:inline">{name}</h3>
                <p className="max-w-[28em] text-base leading-[1.55] md:mt-1.5">{what}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="checks relative mt-[clamp(56px,6vw,88px)] border border-maroon/40 p-[clamp(22px,2.6vw,36px)] md:flex md:items-end md:justify-between md:gap-10">
        <div>
          <h3 className="note mb-4">Our checks</h3>
          <ul className="max-w-[40em]">
            {AI_CHECKS.map((c) => (
              <li key={c} className="relative border-t border-line py-3 pl-[30px] text-base leading-[1.5] before:absolute before:left-0.5 before:top-[1.2em] before:h-[7px] before:w-[13px] before:-rotate-45 before:border-b-2 before:border-l-2 before:border-gold-deep">
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div aria-hidden="true" className="mt-8 w-[280px] max-w-full shrink-0 md:mt-0">
          <svg viewBox="0 0 172 44" className="sig w-full overflow-visible">
            <path d={SIGN} fill="none" stroke="var(--color-gold-deep)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="block border-t border-maroon/40 pt-2 whitespace-nowrap text-[13px] italic text-dust">Always reviewed and signed off by a lawyer</span>
        </div>
      </div>
    </div>
  );
}
