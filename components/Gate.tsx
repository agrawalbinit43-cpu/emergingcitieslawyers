"use client";

import { useEffect, useRef, useState } from "react";
import { AGREED_EVENT, AGREED_KEY, hasAgreed, lockPage } from "@/lib/lock";

/** The Bar Council of India disclaimer, shown once per visitor before the site. */
export default function Gate() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const agree = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!hasAgreed()) setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    lockPage(ref.current, true);
    agree.current?.focus();
    return () => lockPage(ref.current, false);
  }, [open]);

  function onAgree() {
    try {
      localStorage.setItem(AGREED_KEY, "1");
    } catch {}
    setOpen(false);
    window.dispatchEvent(new Event(AGREED_EVENT));
  }

  return (
    <div
      ref={ref}
      hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gate-title"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[oklch(0.2_0.05_11/0.82)] p-5"
    >
      <div className="max-h-[90vh] w-full max-w-[620px] overflow-auto border-t-4 border-gold bg-paper p-[clamp(28px,4vw,48px)] text-base leading-[1.55]">
        <h2 id="gate-title" className="mb-[18px] font-display text-[clamp(28px,3vw,36px)] font-semibold leading-[1.05] tracking-[-0.02em] text-maroon">
          Before you continue
        </h2>
        <p>The Bar Council of India does not permit advocates to solicit work or advertise. By clicking “I agree”, you confirm that:</p>
        <ul className="mb-6 mt-4 list-disc space-y-2 pl-5">
          <li>you are looking for information about Emerging Cities Lawyers LLP of your own accord, and neither we nor our members have solicited, invited or induced you in any way;</li>
          <li>the information on this website is general information. It is not legal advice; and</li>
          <li>using this website, or writing to us through it, does not create a lawyer-client relationship.</li>
        </ul>
        <div className="flex flex-wrap gap-3 font-display text-[15px] font-semibold">
          <button ref={agree} onClick={onAgree} className="cursor-pointer border border-maroon bg-maroon px-[22px] py-[13px] text-rose transition-colors hover:bg-maroon-ink">
            I agree
          </button>
          <a href="https://www.google.com" className="border border-maroon px-[22px] py-[13px] text-maroon transition-colors hover:bg-maroon hover:text-rose">
            Leave site
          </a>
        </div>
      </div>
    </div>
  );
}
