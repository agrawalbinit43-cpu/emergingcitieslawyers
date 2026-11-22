import CityLine from "@/components/CityLine";
import Gate from "@/components/Gate";
import Hero from "@/components/Hero";
import Motion from "@/components/Motion";
import Nav from "@/components/Nav";
import FeatureCards from "@/components/FeatureCards";
import Pieces from "@/components/Pieces";
import Landmarks from "@/components/Landmarks";
import Footer from "@/components/Footer";
import AiChamber from "@/components/AiChamber";
import { ALLIED, CLIENTS, OFFICES, PARTNERS, PRACTICE, PRINCIPLES, WORK } from "@/lib/content";
import { MAIN, NOTE, ROW, SECTION, WRAP } from "@/lib/ui";
import { COMMENTARY, JOURNALS, SPEAKING } from "@/lib/writing";


export default function Site() {
  return (
    <>
      <Gate />
      <a href="#main" className="fixed left-2 top-2 z-[300] -translate-x-[200%] bg-rose px-3 py-2 font-display font-semibold text-maroon focus:translate-x-0">
        Skip to content
      </a>
      <Nav />
      <Hero />

      <main id="main">
        <section id="about" className="pb-[clamp(56px,7vw,104px)] pt-[clamp(88px,10vw,144px)]">
          <div className={`${WRAP} ${ROW}`}>
            <h2 className={NOTE}>About</h2>
            <div className={MAIN}>
              <p data-reveal="lines" className="lead mb-[.55em] text-maroon">
                <span className="block">Emerging businesses.</span>
                <span className="block">Emerging cities.</span>
                <span className="block">The same standard of counsel.</span>
              </p>
              <p data-reveal="rise" className="max-w-[34em] text-[clamp(18px,1.35vw,21px)] leading-[1.6] [text-wrap:pretty]">
                Young companies and fast-growing cities face the same legal questions as established ones. Good counsel is harder for them to find. We handle the deals, the regulation and the disputes.
              </p>
            </div>
          </div>

          {/* the drawings run edge to edge in one moving row, like a skyline passing */}
          <div className="mt-[clamp(24px,3vw,48px)]">
            <CityLine />
          </div>

          <div className={`${WRAP} ${ROW} mt-[clamp(48px,6vw,88px)]`}>
            <h3 className="note col-span-12 mb-6 md:col-span-3 md:mb-0">Who we act for</h3>
            <ul className="col-span-12 grid grid-cols-1 gap-x-6 border-b border-maroon/20 sm:grid-cols-2 md:col-span-9">
              {CLIENTS.map((c) => {
                const [name, extra] = c.split(" (");
                return (
                  <li key={c} data-reveal="rise" className="flex min-h-14 items-center border-t border-maroon/20 py-3 font-display text-[18px] font-medium leading-[1.3] text-maroon [font-variation-settings:'wdth'_92]">
                    <span>
                      {name}
                      {extra && <span className="text-dust"> ({extra}</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section id="ai" className={`bg-blush ${SECTION} lg:pt-[clamp(56px,9svh,112px)]`}>
          <div className={`${WRAP} ${ROW}`}>
            <h2 className={NOTE}>AI-native</h2>
            <div className={MAIN}>
              <p data-reveal="lines" className="lead mb-[.55em] max-w-[14em] text-maroon">
                AI does the groundwork. Lawyers own the advice.
              </p>
              <p data-reveal="rise" className="max-w-[34em] text-[clamp(18px,1.35vw,21px)] leading-[1.6] [text-wrap:pretty]">
                We build AI tools for legal practice and run them on our own devices. Matters move faster and stay private.
              </p>
            </div>
          </div>
          <div className={`${WRAP} mt-[clamp(40px,5vw,64px)] lg:mt-[clamp(28px,4.5svh,52px)]`}>
            <AiChamber />
          </div>
        </section>

        <section id="practice" className="relative isolate overflow-clip pb-[clamp(88px,10vw,144px)] pt-[clamp(48px,6vw,88px)]">
          {/* the landmarks where our lawyers trained and argue, drifting faintly behind the practice list */}
          <Landmarks className="absolute inset-x-0 bottom-0 -z-10 h-[min(78%,620px)] opacity-[.2]" />
          <div className={`${WRAP} ${ROW}`}>
            <h2 className={NOTE}>Practice</h2>
            <div className={MAIN}>
              <p data-reveal="lines" className="lead mb-[.55em] max-w-[14em] text-maroon">
                From incorporation to the Supreme Court.
              </p>
              <ul className="grid grid-cols-1 gap-x-12 gap-y-9 sm:grid-cols-2">
                {PRACTICE.map(([area, what]) => (
                  <li key={area} data-reveal="rise">
                    <h3 className="mb-1.5 font-display text-[21px] font-semibold leading-[1.2] tracking-[-0.012em]">{area}</h3>
                    <p className="max-w-[30em] text-base leading-[1.55] text-dust">{what}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="approach" className={`bg-blush ${SECTION}`}>
          <div className={`${WRAP} ${ROW}`}>
            <h2 className={NOTE}>How we work</h2>
            <p data-reveal="lines" className={`${MAIN} lead max-w-[14em] text-maroon`}>
              Good counsel answers the question you actually have.
            </p>
          </div>
          <div className={WRAP}>
            <div data-reveal="draw" className="mt-[clamp(40px,5vw,64px)] h-0.5 bg-gold-deep" />
            <ul className="grid grid-cols-1 gap-x-6 gap-y-8 pt-7 sm:grid-cols-2 lg:grid-cols-4">
              {PRINCIPLES.map(([name, what]) => (
                <li key={name} data-reveal="rise">
                  <h3 className="mb-2 font-display text-[21px] font-semibold text-maroon">{name}</h3>
                  <p className="text-base leading-[1.55]">{what}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${WRAP} ${ROW} mt-[clamp(72px,8vw,112px)]`}>
            <div className={NOTE}>
              <h3>Allied advisory</h3>
            </div>
            <dl className={`${MAIN} grid max-w-[52em] grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2`}>
              {ALLIED.map(([name, what]) => (
                <div key={name} data-reveal="rise">
                  <dt className="mb-1 font-display font-semibold text-maroon">{name}</dt>
                  <dd className="text-base leading-[1.55] text-dust">{what}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="partners" className={`on-maroon overflow-x-clip bg-maroon text-rose ${SECTION}`}>
          <div className={`${WRAP} ${ROW}`}>
            <h2 className={NOTE}>Partners</h2>
            <div className={`${MAIN} grid grid-cols-1 gap-x-[clamp(32px,4vw,64px)] gap-y-[72px] md:grid-cols-2`}>
              {PARTNERS.map((p) => (
                <article key={p.name}>
                  <div data-reveal="wipe" className="mb-6 h-[325px] w-[260px] overflow-hidden bg-paper">
                    <img src={p.photo} alt={p.name} width={480} height={600} loading="lazy" decoding="async" className="h-full w-full object-cover grayscale contrast-[1.05]" />
                  </div>
                  <h3 className="mb-2 font-display text-[clamp(28px,2.6vw,40px)] font-semibold leading-none tracking-[-0.02em] text-rose [font-variation-settings:'wdth'_90]">{p.name}</h3>
                  <p className="mb-[18px] font-display text-[15px] font-medium text-gold">{p.role}</p>
                  {p.bio.map((b) => (
                    <p key={b.slice(0, 24)} className="mb-4 max-w-[34em] text-base leading-[1.65] text-rose/85">
                      {b}
                    </p>
                  ))}
                  <p className="mb-4 max-w-[34em] font-text text-base italic leading-[1.65] text-rose/65">
                    {p.edu[0]}
                    <br />
                    {p.edu[1]}
                  </p>
                  <p className="flex flex-wrap gap-x-5 gap-y-1.5 font-display text-[15px] font-semibold">
                    <a href={`mailto:${p.email}`} className="text-rose underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold">
                      {p.email}
                    </a>
                    <a href={p.linkedin} target="_blank" rel="noopener" className="text-rose underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold">
                      LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className={`bg-blush ${SECTION}`}>
          <div className={`${WRAP} ${ROW}`}>
            <h2 className={NOTE}>Representative work</h2>
          </div>
          <ul className={`${WRAP} mt-10`}>
            {WORK.map(([area, what]) => (
              <li key={area} data-reveal="slide" className={`${ROW} items-baseline gap-y-1.5 border-t border-line py-[22px] last:border-b`}>
                <p className="col-span-12 font-display font-semibold text-gold-deep md:col-span-3">{area}</p>
                <div className="col-span-12 max-w-[36em] space-y-3 text-[clamp(18px,1.4vw,21px)] leading-[1.5] md:col-span-9 md:col-start-4">
                  {what.split("\n\n").slice(0, 3).map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                  {what.split("\n\n").length > 3 && (
                    <details className="group">
                      <summary className="w-fit cursor-pointer list-none font-display text-[15px] font-semibold text-gold-deep underline decoration-gold-deep/50 underline-offset-4 hover:decoration-gold-deep [&::-webkit-details-marker]:hidden">
                        <span className="group-open:hidden">More</span>
                        <span className="hidden group-open:inline">Less</span>
                      </summary>
                      <div className="mt-3 space-y-3">
                        {what.split("\n\n").slice(3).map((para) => (
                          <p key={para}>{para}</p>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="writing" className={SECTION}>
          <div className={`${WRAP} ${ROW}`}>
            <h2 className={NOTE}>Thought leadership</h2>
            <div className={MAIN}>
              <h3 className="mb-2 font-display text-[21px] font-semibold">Commentary</h3>
              <FeatureCards
                items={[
                  { piece: COMMENTARY[0], art: "tl-jantar", alt: "the sundials of Jantar Mantar behind an empty police barricade" },
                  { piece: COMMENTARY[1], art: "tl-digital", alt: "a phone on a tea-stall bench under a mobile tower" },
                  { piece: COMMENTARY[2], art: "tl-gold", alt: "a gold bangle in a jeweller's weighing pan, resting on an open account ledger" },
                ]}
              />
              <Pieces items={COMMENTARY.slice(3)} />
              <h3 className="mb-2 mt-[72px] font-display text-[21px] font-semibold">Journals &amp; books</h3>
              <Pieces items={JOURNALS} />
              <h3 className="mb-2 mt-[72px] font-display text-[21px] font-semibold">Speaking</h3>
              <Pieces items={SPEAKING} />
            </div>
          </div>
        </section>

        <section id="contact" className={`bg-blush ${SECTION}`}>
          <div className={`${WRAP} ${ROW}`}>
            <h2 className={NOTE}>Contact</h2>
            <div className={MAIN}>
              <p data-reveal="lines" className="lead mb-[.55em] text-maroon">
                Write to us.
              </p>
              <div className="flex flex-col gap-7">
                {PARTNERS.map((p) => (
                  <a key={p.email} href={`mailto:${p.email}`} data-reveal="rise" className="group flex w-fit max-w-full flex-col gap-1">
                    <span className="font-display text-[15px] font-semibold text-dust">{p.name}</span>
                    <span className="font-display text-[clamp(18px,1.6vw,24px)] font-semibold leading-[1.1] tracking-[-0.02em] [overflow-wrap:anywhere] [font-variation-settings:'wdth'_90] underline decoration-line decoration-1 underline-offset-[.15em] transition-colors group-hover:text-maroon group-hover:decoration-gold-deep">
                      {p.email}
                    </span>
                  </a>
                ))}
              </div>
              <ul className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {OFFICES.map((o) => (
                  <li key={o.city} data-reveal="rise" className="flex flex-col gap-1">
                    <span className="font-display text-[15px] font-semibold text-maroon">{o.city}</span>
                    <span className="text-base text-dust">{o.address}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <Motion />
    </>
  );
}
