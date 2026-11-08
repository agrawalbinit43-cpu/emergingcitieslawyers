"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SECTIONS } from "@/lib/content";
import { MENU_EVENT, lockPage } from "@/lib/lock";
import { WRAP } from "@/lib/ui";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** The compact bar that slides in once the hero has gone, with the current section marked, and the full-screen index. */
export default function Nav() {
  const [on, setOn] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    ScrollTrigger.create({ trigger: "#top", start: "bottom top+=80", onEnter: () => setOn(true), onLeaveBack: () => setOn(false) });
    for (const { id } of SECTIONS) {
      ScrollTrigger.create({ trigger: `#${id}`, start: "top 45%", end: "bottom 45%", onToggle: (self) => self.isActive && setCurrent(id) });
    }
  });

  // the hero's own Index button asks for the menu with an event, naming itself so focus can return to it
  useEffect(() => {
    const ask = (e: Event) => {
      opener.current = (e as CustomEvent<HTMLElement>).detail;
      setOpen(true);
    };
    window.addEventListener(MENU_EVENT, ask);
    return () => window.removeEventListener(MENU_EVENT, ask);
  }, []);

  useEffect(() => {
    if (!open) return;
    lockPage(menu.current, true);
    close.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && shut(true);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("keydown", esc);
      lockPage(menu.current, false);
    };
  }, [open]);

  function shut(refocus: boolean) {
    setOpen(false);
    if (refocus) requestAnimationFrame(() => opener.current?.focus());
  }

  return (
    <>
      <div className={`topbar ${on ? "on" : ""} fixed inset-x-0 top-0 z-40 border-b border-line bg-paper text-maroon`}>
        <div className={`${WRAP} flex h-16 items-center justify-between gap-6`}>
          <a className="mark text-[11px]" href="#top" aria-label="Emerging Cities Lawyers, back to top">
            <span>Emerging</span>
            <span>Cities</span>
            <span>Lawyers</span>
          </a>
          <nav aria-label="Sections" className="hidden gap-[clamp(14px,1.8vw,28px)] font-display text-sm font-medium min-[1101px]:flex">
            {SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={current === id ? "location" : undefined}
                className="border-b border-transparent py-1.5 text-dust transition-colors hover:text-ink aria-[current]:border-gold-deep aria-[current]:text-maroon"
              >
                {label}
              </a>
            ))}
            <a href="/pro-bono" className="border-b border-transparent py-1.5 text-dust transition-colors hover:text-ink">
              Pro bono
            </a>
          </nav>
          <button
            onClick={(e) => {
              opener.current = e.currentTarget;
              setOpen(true);
            }}
            aria-expanded={open}
            aria-controls="menu"
            className="cursor-pointer border border-line px-3.5 py-2 font-display text-sm font-semibold transition-colors hover:bg-maroon hover:text-rose min-[1101px]:hidden"
          >
            Index
          </button>
        </div>
      </div>

      <div ref={menu} id="menu" hidden={!open} role="dialog" aria-modal="true" aria-label="Index" className="fixed inset-0 z-[100] overflow-auto bg-maroon text-rose">
        <div className={`${WRAP} pb-10 pt-7`}>
          <button
            ref={close}
            onClick={() => shut(true)}
            className="float-right cursor-pointer border border-line-rose px-3.5 py-2 font-display text-sm font-semibold transition-colors hover:bg-rose hover:text-maroon"
          >
            Close
          </button>
          <ol className="clear-both pt-[8vh]">
            {SECTIONS.map(({ id, label }) => (
              <li key={id} className="border-t border-line-rose">
                <a
                  href={`#${id}`}
                  onClick={() => shut(false)}
                  className="block py-3 font-display text-[clamp(30px,5vw,56px)] font-semibold leading-[1.05] tracking-[-0.02em] transition-[padding,color] duration-500 ease-out-expo [font-variation-settings:'wdth'_90] hover:pl-3 hover:text-gold"
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="border-t border-line-rose">
              <a
                href="/pro-bono"
                className="block py-3 font-display text-[clamp(30px,5vw,56px)] font-semibold leading-[1.05] tracking-[-0.02em] transition-[padding,color] duration-500 ease-out-expo [font-variation-settings:'wdth'_90] hover:pl-3 hover:text-gold"
              >
                Pro bono
              </a>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}
