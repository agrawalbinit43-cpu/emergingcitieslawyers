"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

declare global {
  interface Window {
    __eclFallback?: number;
  }
}

/**
 * The page's scroll choreography, in one place. Each element names how it arrives:
 *   data-reveal="lines"  a large statement rises line by line from behind a mask
 *   data-reveal="rise"   fades up; neighbours entering together are staggered
 *   data-reveal="wipe"   a picture opens from the bottom as it settles from a slight zoom
 *   data-reveal="draw"   a rule draws from the left
 *   data-reveal="slide"  slides in from the left; rows entering together are staggered
 * Every section's side heading also gets a short gold rule that draws in beneath it.
 */
export default function Motion() {
  useGSAP(() => {
    clearTimeout(window.__eclFallback);
    const mm = gsap.matchMedia();

    const rules = gsap.utils.toArray<HTMLElement>("h2.note").map((h) => {
      const r = h.querySelector<HTMLElement>(".note-rule") ?? h.appendChild(Object.assign(document.createElement("span"), { className: "note-rule" }));
      r.setAttribute("aria-hidden", "true");
      return r;
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-reveal]", { autoAlpha: 1 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const once = (trigger: Element, start = "top 86%") => ({ trigger, start, once: true });

      gsap.utils.toArray<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
        gsap.set(el, { autoAlpha: 1 });
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, { yPercent: 105, duration: 1.3, ease: "expo.out", stagger: 0.09, scrollTrigger: once(el) }),
        });
      });

      gsap.set('[data-reveal="rise"]', { autoAlpha: 0, y: 28 });
      ScrollTrigger.batch('[data-reveal="rise"]', {
        start: "top 90%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, overwrite: true }),
      });

      gsap.set('[data-reveal="slide"]', { autoAlpha: 0, x: -40 });
      ScrollTrigger.batch('[data-reveal="slide"]', {
        start: "top 92%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, x: 0, duration: 1.1, ease: "expo.out", stagger: 0.07, overwrite: true }),
      });

      rules.forEach((r) => gsap.fromTo(r, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.inOut", scrollTrigger: once(r, "top 90%") }));

      gsap.utils.toArray<HTMLElement>('[data-reveal="wipe"]').forEach((el) => {
        const img = el.querySelector("img");
        const tl = gsap.timeline({ scrollTrigger: once(el) });
        tl.fromTo(el, { autoAlpha: 1, clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.out" });
        if (img) tl.from(img, { scale: 1.18, duration: 1.8, ease: "expo.out" }, 0);
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="draw"]').forEach((el) => {
        gsap.fromTo(el, { autoAlpha: 1, scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 1.6, ease: "expo.inOut", scrollTrigger: once(el, "top 92%") });
      });
    });

    // revealed content changes the page's height; measure again once the webfonts land
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  });

  return null;
}
