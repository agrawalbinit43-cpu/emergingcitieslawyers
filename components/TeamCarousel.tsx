"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TEAM } from "@/lib/content";

type Person = (typeof TEAM)[number];

/* The team, founders first. Desktop: one row, three cards in view, arrows to move, and a slow auto-advance
   (every 15 s) that pauses on hover, keyboard focus, an open "Read more", or reduced-motion settings.
   Phone: a plain vertical list. Every card shows its first paragraph and education; the rest sits behind "Read more". */

const ROTATE_MS = 15000;

function Card({ p, open, onToggle }: { p: Person; open: boolean; onToggle: () => void }) {
  const [first, ...rest] = p.bio;
  const more = rest.length > 0;
  const id = `bio-${p.name.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  return (
    <article>
      <div className="mb-5 aspect-[4/5] w-full max-w-[260px] overflow-hidden bg-paper">
        <img src={p.photo} alt={p.name} width={480} height={600} loading="lazy" decoding="async" className="h-full w-full object-cover grayscale contrast-[1.05]" />
      </div>
      <h4 className="mb-2 font-display text-[clamp(24px,2vw,30px)] font-semibold leading-[1.05] tracking-[-0.02em] text-rose [font-variation-settings:'wdth'_90]">{p.name}</h4>
      <p className="mb-4 font-display text-[15px] font-medium text-gold">{p.role}</p>
      <p className="mb-3 text-[15.5px] leading-[1.6] text-rose/85">{first}</p>
      {p.edu.length > 0 && (
        <p className="mb-3 font-text text-base italic leading-[1.6] text-rose/80">
          {p.edu.map((e, i) => (<span key={e}>{i > 0 && <br />}{e}</span>))}
        </p>
      )}
      {more && (
        <>
          <div id={id} hidden={!open}>
            {rest.map((b) => (
              <p key={b.slice(0, 24)} className="mb-3 text-[15.5px] leading-[1.6] text-rose/85">{b}</p>
            ))}
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={id}
            onClick={onToggle}
            className="inline-flex min-h-[44px] items-center font-display text-[15px] font-semibold text-rose underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
          >
            {open ? "Read less" : "Read more"}
            <span className="sr-only"> about {p.name}</span>
          </button>
        </>
      )}
      {(p.email || p.linkedin) && (
        <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 font-display text-[15px] font-semibold">
          {p.email && <a href={`mailto:${p.email}`} className="text-rose underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold">{p.email}</a>}
          {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener" className="text-rose underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold">
            LinkedIn<span className="sr-only"> (opens in a new tab)</span>
          </a>}
        </p>
      )}
    </article>
  );
}

export default function TeamCarousel({ people }: { people: Person[] }) {
  const PER = 3;
  const last = Math.max(0, people.length - PER);
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  const go = useCallback((d: number) => setIdx((i) => (i + d > last ? 0 : i + d < 0 ? last : i + d)), [last]);
  const toggle = (n: string) => setOpen((o) => ({ ...o, [n]: !o[n] }));
  const anyOpen = Object.values(open).some(Boolean);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (last === 0 || paused || anyOpen || reduced.current) return;
    const t = window.setTimeout(() => go(1), ROTATE_MS);
    return () => window.clearTimeout(t);
  }, [idx, paused, anyOpen, last, go]);

  const running = last > 0 && !paused && !anyOpen;

  return (
    <>
      {/* Phone: vertical list */}
      <div className="grid grid-cols-1 gap-y-14 md:hidden">
        {people.map((p) => (
          <Card key={p.name} p={p} open={!!open[p.name]} onToggle={() => toggle(p.name)} />
        ))}
      </div>

      {/* Desktop: rotating row of three */}
      <div
        className="relative hidden md:block"
        role="region"
        aria-roledescription="carousel"
        aria-label="Team"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="overflow-hidden">
          <ul
            className="flex items-start gap-8 transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none"
            style={{ transform: `translateX(calc(${-idx} * (100% + 2rem) / ${PER}))` }}
          >
            {people.map((p, i) => {
              const inView = i >= idx && i < idx + PER;
              return (
                <li key={p.name} className="shrink-0 basis-[calc((100%-4rem)/3)]" aria-hidden={!inView} inert={!inView}>
                  <Card p={p} open={!!open[p.name]} onToggle={() => toggle(p.name)} />
                </li>
              );
            })}
          </ul>
        </div>
        {last > 0 && (
          /* one arrow beside the third photo; the gold ring fills over the 15 s wait, so the row reads as moving */
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={`Next profiles (showing ${idx + 1} to ${Math.min(idx + PER, people.length)} of ${people.length})`}
            className="group absolute right-0 top-[clamp(110px,11vw,150px)] grid h-12 w-12 translate-x-1/2 place-items-center rounded-full bg-maroon text-rose shadow-[0_0_0_6px_var(--color-maroon)] transition-colors hover:text-gold"
          >
            <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
              <circle cx="24" cy="24" r="22.5" fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="1.5" />
              <circle
                key={idx}
                cx="24" cy="24" r="22.5" fill="none" stroke="var(--color-gold)" strokeWidth="1.5"
                pathLength={1} strokeDasharray="1" strokeDashoffset="1"
                className="team-ring"
                style={{ animationDuration: `${ROTATE_MS}ms`, animationPlayState: running ? "running" : "paused" }}
              />
            </svg>
            <span aria-hidden="true" className="relative text-[20px] leading-none transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </button>
        )}
      </div>
    </>
  );
}
