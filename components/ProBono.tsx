"use client";

import { useState, type FormEvent } from "react";
import { MAIN, NOTE, ROW, SECTION, WRAP } from "@/lib/ui";

/* Requests go by email to the partner who reads them, through FormSubmit (free, no account; the first request sends
   an activation link to that inbox). The hidden "_honey" field catches bots. */
const ENDPOINT = "https://formsubmit.co/ajax/ba@emergingcitieslawyers.com";

const FIELD =
  "w-full border border-line bg-paper px-3.5 py-3 text-base text-ink transition-colors placeholder:text-dust/60 focus:border-gold-deep focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep";
const LABEL = "mb-1.5 block font-display text-[15px] font-semibold text-maroon";

type State = "idle" | "sending" | "sent" | "failed";

export default function ProBono() {
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
        body: JSON.stringify({ ...data, _subject: `Pro bono request from ${data.name}`, _template: "table", _captcha: "false" }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || String(out.success) === "false") throw new Error("not sent");
      form.reset();
      setState("sent");
    } catch {
      setState("failed");
    }
  }

  return (
    <section id="pro-bono" className={`bg-blush ${SECTION}`}>
      <div className={`${WRAP} ${ROW}`}>
        <h2 className={NOTE}>Pro bono</h2>
        <div className={MAIN}>
          <p data-reveal="lines" className="lead mb-[.55em] max-w-[14em] text-maroon">
            Legal help when you cannot pay for it.
          </p>
          <p data-reveal="rise" className="max-w-[34em] text-[clamp(18px,1.35vw,21px)] leading-[1.6] [text-wrap:pretty]">
            If you urgently need a lawyer and cannot afford one, tell us about your situation below. We read each request. Where we can, we will find you counsel who will act free of charge.
          </p>

          {state === "sent" ? (
            <div role="status" className="mt-10 max-w-[40em] border-l-2 border-gold-deep bg-paper px-5 py-4">
              <p className="font-display font-semibold text-maroon">Thank you. Your request has reached us.</p>
              <p className="mt-1 text-base leading-[1.55] text-dust">We will reply by email. If a court date is close, please do not wait for us before seeking help elsewhere.</p>
            </div>
          ) : (
            <form onSubmit={send} className="mt-10 grid max-w-[44em] grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <div>
                <label htmlFor="pb-name" className={LABEL}>Your name</label>
                <input id="pb-name" name="name" required autoComplete="name" className={FIELD} />
              </div>
              <div>
                <label htmlFor="pb-email" className={LABEL}>Email</label>
                <input id="pb-email" name="email" type="email" required autoComplete="email" className={FIELD} />
              </div>
              <div>
                <label htmlFor="pb-phone" className={LABEL}>
                  Phone <span className="font-normal text-dust">(optional)</span>
                </label>
                <input id="pb-phone" name="phone" type="tel" autoComplete="tel" className={FIELD} />
              </div>
              <div>
                <label htmlFor="pb-city" className={LABEL}>City and state</label>
                <input id="pb-city" name="city" required autoComplete="address-level2" className={FIELD} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="pb-matter" className={LABEL}>What has happened, and what help do you need?</label>
                <textarea id="pb-matter" name="matter" required rows={6} className={`${FIELD} resize-y`} />
                <p className="mt-1.5 text-[14px] text-dust">Include any court dates or deadlines.</p>
              </div>
              <label className="flex items-start gap-3 text-[15px] leading-[1.5] sm:col-span-2">
                <input type="checkbox" name="understood" value="Yes" required className="mt-1 h-4 w-4 shrink-0 accent-maroon" />
                <span>I understand that sending this form does not make Emerging Cities Lawyers my lawyers, and that the firm cannot take on every request.</span>
              </label>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:col-span-2">
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="bg-maroon px-7 py-3.5 font-display font-semibold text-rose transition-colors hover:bg-maroon-ink disabled:opacity-60"
                >
                  {state === "sending" ? "Sending…" : "Send request"}
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
          )}
        </div>
      </div>
    </section>
  );
}
