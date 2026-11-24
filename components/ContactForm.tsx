"use client";

import { useState, type FormEvent } from "react";

/* A short enquiry form for the Contact section. Messages reach ba@ through FormSubmit, the same free route as the
   pro bono form (already activated for that inbox). The hidden "_honey" field catches bots. */
const ENDPOINT = "https://formsubmit.co/ajax/ba@emergingcitieslawyers.com";

const FIELD =
  "w-full border border-line bg-paper px-3.5 py-3 text-base text-ink transition-colors placeholder:text-dust/60 focus:border-gold-deep focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep";
const LABEL = "mb-1.5 block font-display text-[15px] font-semibold text-maroon";

type State = "idle" | "sending" | "sent" | "failed";

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");

  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data._honey) return;
    setState("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _replyto: data.email, _subject: `Website enquiry from ${data.name}`, _template: "table", _captcha: "false" }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || String(out.success) === "false") throw new Error("not sent");
      form.reset();
      (window as unknown as { rdt?: (...a: unknown[]) => void }).rdt?.("track", "Lead");
      setState("sent");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="max-w-[40em] border-l-2 border-gold-deep bg-paper px-5 py-4">
        <p className="font-display font-semibold text-maroon">Thank you. Your message has reached us.</p>
        <p className="mt-1 text-base leading-[1.55] text-dust">A partner will reply by email.</p>
      </div>
    );
  }

  return (
    <form onSubmit={send} data-reveal="rise" className="grid max-w-[44em] grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div>
        <label htmlFor="ct-name" className={LABEL}>Name</label>
        <input id="ct-name" name="name" required autoComplete="name" className={FIELD} />
      </div>
      <div>
        <label htmlFor="ct-email" className={LABEL}>Email</label>
        <input id="ct-email" name="email" type="email" required autoComplete="email" className={FIELD} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="ct-phone" className={LABEL}>
          Phone <span className="font-normal text-dust">(optional)</span>
        </label>
        <input id="ct-phone" name="phone" type="tel" autoComplete="tel" className={`${FIELD} sm:max-w-[calc(50%-12px)]`} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="ct-message" className={LABEL}>How can we help?</label>
        <textarea id="ct-message" name="message" required rows={4} className={`${FIELD} resize-y`} />
        <p className="mt-1.5 text-[14px] text-dust">A few lines will do. Please keep confidential details back until we confirm we can act.</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:col-span-2">
        <button
          type="submit"
          disabled={state === "sending"}
          className="bg-maroon px-7 py-3.5 font-display font-semibold text-rose transition-colors hover:bg-maroon-ink disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send"}
        </button>
        <p role="status" className="text-[15px] text-ruby">
          {state === "failed" && (
            <>
              That did not go through. Please try again, or write to{" "}
              <a href="mailto:ba@emergingcitieslawyers.com" className="underline underline-offset-2">ba@emergingcitieslawyers.com</a>.
            </>
          )}
        </p>
      </div>
    </form>
  );
}
