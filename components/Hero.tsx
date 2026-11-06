"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GRAPH_HUB as HUB, GRAPH_LINKS, GRAPH_NODES as NAMED, GRAPH_VIEW as VIEW } from "@/lib/content";
import { AGREED_EVENT, MENU_EVENT, hasAgreed } from "@/lib/lock";
import { WRAP } from "@/lib/ui";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Small unnamed nodes round each named one, so the whole reads as a network rather than a diagram.
   Offsets are from their named node, in viewBox units, and keep clear of its label below it. */
const SATS: [number, number, number][] = [
  [0, -50, -40], [0, 44, -56], [1, -62, -20], [1, 60, -26], [2, -46, -52], [2, 40, 48],
  [3, 70, -40], [3, -30, -58], [4, -96, -30], [4, 100, -24], [5, 74, -40], [6, -80, -26], [6, 44, -64],
  [7, -56, -40], [7, -30, 62], [8, -60, -46], [8, -50, 50],
];
// node indices: the named nodes, then the hub, then the satellites
const HUB_I = NAMED.length;
const anchor = (i: number) =>
  i < HUB_I ? NAMED[i] : i === HUB_I ? HUB : { x: NAMED[SATS[i - HUB_I - 1][0]].x + SATS[i - HUB_I - 1][1], y: NAMED[SATS[i - HUB_I - 1][0]].y + SATS[i - HUB_I - 1][2] };
const COUNT = HUB_I + 1 + SATS.length;
const EDGES: { a: number; b: number; kind: "spoke" | "ring" | "sat" }[] = [
  ...NAMED.map((_, i) => ({ a: HUB_I, b: i, kind: "spoke" as const })),
  ...GRAPH_LINKS.map(([a, b]) => ({ a, b, kind: "ring" as const })),
  ...SATS.map(([p], k) => ({ a: p, b: HUB_I + 1 + k, kind: "sat" as const })),
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const svg = root.current!.querySelector<SVGSVGElement>(".graph")!;
      const els = gsap.utils.toArray<SVGGElement>("[data-n]", svg).sort((p, q) => Number(p.dataset.n) - Number(q.dataset.n));
      const lines = gsap.utils.toArray<SVGLineElement>("line", svg);
      const reveal = root.current!.querySelectorAll("[data-hero]");
      const off = Array.from({ length: COUNT }, () => ({ x: 0, y: 0 }));
      // where each named node and the hub rest; dragging moves these, and the drift plays on top
      const base = Array.from({ length: HUB_I + 1 }, (_, i) => ({ ...anchor(i) }));
      // a satellite rides on its named node, plus its own drift
      const pos = (i: number) => {
        if (i <= HUB_I) return { x: base[i].x + off[i].x, y: base[i].y + off[i].y };
        const [parent, dx, dy] = SATS[i - HUB_I - 1];
        return { x: base[parent].x + off[parent].x + dx + off[i].x, y: base[parent].y + off[parent].y + dy + off[i].y };
      };

      function render() {
        const P = Array.from({ length: COUNT }, (_, i) => pos(i));
        els.forEach((el, i) => el.setAttribute("transform", `translate(${P[i].x.toFixed(1)} ${P[i].y.toFixed(1)})`));
        EDGES.forEach(({ a, b }, k) => {
          lines[k].setAttribute("x1", P[a].x.toFixed(1));
          lines[k].setAttribute("y1", P[a].y.toFixed(1));
          lines[k].setAttribute("x2", P[b].x.toFixed(1));
          lines[k].setAttribute("y2", P[b].y.toFixed(1));
        });
      }

      // hovering a named node lights it and every line that touches it, in gold
      const light = (i: number, on: boolean) => {
        els[i].classList.toggle("lit", on);
        EDGES.forEach(({ a, b }, k) => (a === i || b === i) && lines[k].classList.toggle("lit", on));
      };
      // every named node, and the hub, can be dragged and left anywhere in the graph
      let drag: { i: number; dx: number; dy: number } | null = null;
      const toSvg = (e: PointerEvent) => {
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        return pt.matrixTransform(svg.getScreenCTM()!.inverse());
      };
      els.slice(0, HUB_I + 1).forEach((n, i) => {
        n.addEventListener("pointerenter", () => light(i, true));
        n.addEventListener("pointerleave", () => drag?.i !== i && light(i, false));
        n.addEventListener("pointerdown", (e) => {
          e.preventDefault();
          n.setPointerCapture(e.pointerId);
          const p = toSvg(e);
          drag = { i, dx: base[i].x - p.x, dy: base[i].y - p.y };
          n.classList.add("dragging");
          light(i, true);
        });
        n.addEventListener("pointermove", (e) => {
          if (drag?.i !== i) return;
          const p = toSvg(e);
          base[i].x = gsap.utils.clamp(24, VIEW.w - 24, p.x + drag.dx);
          base[i].y = gsap.utils.clamp(24, VIEW.h - 24, p.y + drag.dy);
          render();
        });
        const drop = () => {
          if (drag?.i !== i) return;
          drag = null;
          n.classList.remove("dragging");
          light(i, false);
        };
        n.addEventListener("pointerup", drop);
        n.addEventListener("pointercancel", drop);
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => gsap.set(reveal, { autoAlpha: 1 }));
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const drift = off.map((o, i) => {
          const amp = i < HUB_I ? 14 : i === HUB_I ? 4 : 9;
          return gsap.to(o, {
            x: () => gsap.utils.random(-amp, amp),
            y: () => gsap.utils.random(-amp, amp),
            duration: () => gsap.utils.random(3.4, 6.2),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            repeatRefresh: true,
            paused: true,
          });
        });
        // a soft gold light wanders slowly behind the graph
        const glow = root.current!.querySelector(".hero-glow");
        const wander = gsap.to(glow, { "--gx": "58%", "--gy": "66%", duration: 9, ease: "sine.inOut", repeat: -1, yoyo: true, paused: true });
        drift.push(wander);

        // the drift only runs while the hero is on screen
        const live = (on: boolean) => {
          drift.forEach((t) => (on ? t.play() : t.pause()));
          on ? gsap.ticker.add(render) : gsap.ticker.remove(render);
        };
        ScrollTrigger.create({ trigger: root.current, start: "top bottom", end: "bottom top", onToggle: (s) => live(s.isActive) });

        // the pointer tilts the graph a little, as if it hung in front of the page
        const gx = gsap.quickTo(svg, "x", { duration: 1.2, ease: "power3.out" });
        const gy = gsap.quickTo(svg, "y", { duration: 1.2, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          if (drag) return;
          const r = root.current!.getBoundingClientRect();
          gx(((e.clientX - r.left) / r.width - 0.5) * 28);
          gy(((e.clientY - r.top) / r.height - 0.5) * 20);
        };
        root.current!.addEventListener("pointermove", move);

        // leaving the hero, the headline and the graph part at different speeds
        // (fromTo with opacity, not autoAlpha: these are created while the hero is still hidden)
        const away = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.fromTo(".hero-text", { yPercent: 0 }, { yPercent: -12, ease: "none", scrollTrigger: away });
        gsap.fromTo(".graph-wrap", { yPercent: 0, opacity: 1 }, { yPercent: -16, opacity: 0.35, ease: "none", scrollTrigger: away });

        const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        tl.set(reveal, { autoAlpha: 1 })
          .from(".stagger > span > span", { yPercent: 110, duration: 1.3, stagger: 0.1 }, 0)
          .from(".lede", { autoAlpha: 0, y: 18, duration: 1.2 }, 0.45)
          .from(".graph line", { strokeDashoffset: 1, duration: 1.8, stagger: { each: 0.03, from: "start" } }, 0.3)
          .from(".graph .dot", { scale: 0, transformOrigin: "50% 50%", duration: 1, stagger: 0.04 }, 0.4)
          .from(".graph text", { autoAlpha: 0, y: 6, duration: 1, stagger: 0.06 }, 0.7)
          .to(".hub .pulse", { scale: 3.4, autoAlpha: 0, transformOrigin: "50% 50%", duration: 2.8, ease: "power2.out", repeat: -1, repeatDelay: 0.6 }, 1.6);

        // the first visit waits behind the disclaimer; the choreography starts once it is accepted
        const start = () => tl.play();
        if (hasAgreed()) start();
        else window.addEventListener(AGREED_EVENT, start, { once: true });
        return () => {
          window.removeEventListener(AGREED_EVENT, start);
          root.current?.removeEventListener("pointermove", move);
          gsap.ticker.remove(render);
        };
      });
    },
    { scope: root },
  );

  return (
    <header ref={root} id="top" className="on-maroon relative flex min-h-svh flex-col overflow-hidden bg-maroon text-rose">
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0" style={{ ["--gx" as string]: "76%", ["--gy" as string]: "36%" }} />
      <div className={`${WRAP} pointer-events-none relative z-10 flex flex-1 flex-col`}>
        <nav aria-label="Primary" className="pointer-events-auto flex items-start justify-between py-7">
          <a className="mark" href="#top" aria-label="Emerging Cities Lawyers, home">
            <span>Emerging</span>
            <span>Cities</span>
            <span>Lawyers</span>
          </a>
          <div className="flex items-center gap-7 font-display text-sm font-semibold">
            <a href="#contact" className="hidden underline-offset-4 hover:underline md:inline">
              Contact
            </a>
            <button
              onClick={(e) => window.dispatchEvent(new CustomEvent(MENU_EVENT, { detail: e.currentTarget }))}
              aria-controls="menu"
              className="cursor-pointer border border-line-rose px-3.5 py-2 transition-colors hover:border-gold hover:bg-gold hover:text-maroon"
            >
              Index
            </button>
          </div>
        </nav>

        <div className="hero-text pointer-events-auto flex flex-1 flex-col justify-center pb-[clamp(32px,6vh,72px)] pt-6 md:w-[52%] md:pt-0 [--h1:14vw] md:[--h1:clamp(52px,7.4vw,124px)]">
          <h1 data-hero className="stagger" aria-label="Law for emerging India.">
            <span aria-hidden="true"><span>Law for</span></span>
            <span aria-hidden="true" className="max-md:pl-[.8em]!"><span>emerging</span></span>
            <span aria-hidden="true"><span>India.</span></span>
          </h1>
          <p data-hero className="lede mt-[clamp(28px,5vh,48px)] max-w-[28em] text-[clamp(18px,1.45vw,21px)] leading-[1.6] text-rose/75 [text-wrap:pretty] md:ml-[calc(var(--h1)*.4)]">
            A law firm for India’s rising companies and the cities beyond its metros. Our lawyers trained at NLSIU, Yale and Vienna, and practise before the Supreme Court.
          </p>
        </div>
      </div>

      {/* The graph takes the right half of the hero, top to bottom; on a phone it follows the text. */}
      <figure data-hero className="graph-wrap px-4 pb-10 md:absolute md:inset-y-0 md:right-0 md:w-[56%] md:px-0 md:pb-4 md:pt-20">
        <svg className="graph block h-auto w-full overflow-visible md:h-full" viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} role="img" aria-labelledby="graph-title">
          <title id="graph-title">{`Where our lawyers studied, practised and worked: ${NAMED.map((n) => n.label).join(", ")}.`}</title>
          {EDGES.map(({ a, b, kind }, k) => (
            <line key={k} className={kind} x1={anchor(a).x} y1={anchor(a).y} x2={anchor(b).x} y2={anchor(b).y} pathLength={1} />
          ))}
          {NAMED.map((n, i) => (
            <g key={n.label} data-n={i} className="node" transform={`translate(${n.x} ${n.y})`}>
              <g className="dot">
                <circle r={6} />
              </g>
              <text y={30} textAnchor="middle">
                {n.label}
              </text>
            </g>
          ))}
          <g data-n={HUB_I} className="hub" transform={`translate(${HUB.x} ${HUB.y})`}>
            <circle className="pulse" r={11} />
            <g className="dot">
              <circle r={11} />
            </g>
            <text y={38} textAnchor="middle">
              {HUB.label}
            </text>
          </g>
          {SATS.map((_, k) => {
            const p = anchor(HUB_I + 1 + k);
            return (
              <g key={k} data-n={HUB_I + 1 + k} className="sat" transform={`translate(${p.x} ${p.y})`}>
                <g className="dot">
                  <circle r={2.8} />
                </g>
              </g>
            );
          })}
        </svg>
      </figure>
    </header>
  );
}
