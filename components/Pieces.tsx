"use client";

import { useRef, useState } from "react";
import type { Piece } from "@/lib/writing";

/** A writing list that shows its first few pieces; the rest are in the page, hidden until asked for. */
export default function Pieces({ items, show = 5 }: { items: Piece[]; show?: number }) {
  const [all, setAll] = useState(false);
  const list = useRef<HTMLUListElement>(null);
  const extra = items.length - show;

  function more() {
    setAll(true);
    requestAnimationFrame(() => list.current?.querySelectorAll("a")[show]?.focus());
  }

  return (
    <>
      <ul ref={list}>
        {items.map((p, i) => (
          <li key={p.href} hidden={!all && i >= show} className="grid grid-cols-1 gap-x-6 gap-y-1.5 border-t border-line py-[18px] sm:grid-cols-[2fr_5fr]">
            <p className="flex flex-col gap-0.5 text-[15px] leading-[1.4]">
              <cite className="text-gold-deep">{p.outlet}</cite>
              {p.dt ? (
                <time dateTime={p.dt} className="font-display text-[13px] text-dust">
                  {p.date}
                </time>
              ) : (
                <span className="font-display text-[13px] text-dust">{p.date}</span>
              )}
            </p>
            <div>
              <h4 className="mb-1.5 font-display text-[clamp(18px,1.5vw,21px)] font-semibold leading-[1.25] tracking-[-0.01em]">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener"
                  className="underline decoration-line decoration-1 underline-offset-[.2em] transition-colors hover:text-maroon hover:decoration-gold-deep"
                >
                  {p.title}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </h4>
            </div>
          </li>
        ))}
      </ul>
      {!all && extra > 0 && (
        <button
          onClick={more}
          className="mt-6 cursor-pointer border border-gold-deep px-[18px] py-2.5 font-display text-sm font-semibold text-maroon transition-colors hover:bg-maroon hover:text-rose"
        >
          Show {extra} more
        </button>
      )}
    </>
  );
}
