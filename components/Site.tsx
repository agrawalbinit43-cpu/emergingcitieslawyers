import Gate from "@/components/Gate";
import Hero from "@/components/Hero";
import Motion from "@/components/Motion";
import Nav from "@/components/Nav";
import Pieces from "@/components/Pieces";
import Landmarks from "@/components/Landmarks";
import { AI_CHECKS, ALLIED, CREDENTIALS, OFFICE, PARTNERS, PRACTICE, PRINCIPLES, WORK } from "@/lib/content";
import { MAIN, NOTE, ROW, SECTION, WRAP } from "@/lib/ui";
import { COMMENTARY, JOURNALS } from "@/lib/writing";

export default function Site({ palette }: { palette: "gold" | "green" }) {
  return (
    <>
      {palette !== "gold" && <script dangerouslySetInnerHTML={{ __html: `document.documentElement.dataset.palette=${JSON.stringify(palette)}` }} />}
      <Gate />
      <a href="#main" className="fixed left-2 top-2 z-[300] -translate-x-[200%] bg-rose px-3 py-2 font-display font-semibold text-maroon focus:translate-x-0">
        Skip to content
      </a>
      <Nav />
      <Hero />

      <main id="main">
        <section id="about" className={SECTION}>
          <div className={`${WRAP} ${ROW}`}>
            <h2 className={NOTE}>About</h2>
            <div className={MAIN}>
              <p data-reveal="lines" className="lead mb-[.55em] max-w-[14em] text-maroon">
                Emerging businesses. Emerging cities. The same standard of counsel.
              </p>
              <p data-reveal="rise" className="max-w-[34em] text-[clamp(18px,1.35vw,21px)] leading-[1.6] [text-wrap:pretty]">
                India’s next companies are taking shape outside its largest metros: founders raising first rounds, family firms formalising, businesses opening in cities that rarely appear on a law firm’s map. Their legal questions match any large company’s. Good counsel is harder to find. We set up ECL to change that, and a partner leads every matter.
              </p>
              <dl className="mt-12 grid max-w-[52em] grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
                <div data-reveal="rise">
                  <dt className="mb-1 font-display font-semibold text-maroon">Who we act for</dt>
                  <dd className="text-base leading-[1.55]">Start-ups, SMEs, family businesses, funds (PE, VC and debt), foreign companies setting up in India, and international organisations.</dd>
                </div>
                <div data-reveal="rise">
                  <dt className="mb-1 font-display font-semibold text-maroon">How we work</dt>
                  <dd className="text-base leading-[1.55]">Partner-led, with AI built into research and drafting. Partners and independent counsel across our locations.</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section id="background" className={`on-maroon overflow-x-clip bg-band text-rose ${SECTION}`}>
          <div className={`${WRAP} ${ROW}`}>
            <h2 className={NOTE}>Background</h2>
            <p data-reveal="lines" className={`${MAIN} lead max-w-[14em]`}>
              Where our lawyers studied, practised and advised.
            </p>
          </div>
          <div className={`${WRAP} mt-[clamp(24px,4vw,56px)]`}>
            <Landmarks />
          </div>
          <div className={WRAP}>
            <div data-reveal="draw" className="mt-[clamp(40px,5vw,64px)] h-px bg-gold/50" />
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {CREDENTIALS.map((c) => (
                <div key={c.title} data-reveal="rise">
                  <h3 className="mb-3 font-display font-semibold text-gold">{c.title}</h3>
                  <ul>
                    {c.items.map((it) => (
                      <li key={it} className="py-[5px] text-base leading-[1.45] text-rose/75">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="practice" className={SECTION}>
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

        <section id="work" className={`bg-blush ${SECTION}`}>
          <div className={`${WRAP} ${ROW}`}>
            <h2 className={NOTE}>Representative work</h2>
            <p className={`${MAIN} text-[clamp(18px,1.35vw,21px)] leading-[1.6] text-dust`}>Matters our lawyers have handled. We name clients only with their consent.</p>
          </div>
          <ul className={`${WRAP} mt-10`}>
            {WORK.map(([area, what]) => (
              <li key={area} data-reveal="rise" className={`${ROW} items-baseline gap-y-1.5 border-t border-line py-[22px] last:border-b`}>
                <p className="col-span-12 font-display font-semibold text-gold-deep md:col-span-3">{area}</p>
                <p className="col-span-12 max-w-[36em] text-[clamp(18px,1.4vw,21px)] leading-[1.5] md:col-span-9 md:col-start-4">{what}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="approach" className={SECTION}>
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
            <h3 className={NOTE}>An AI-native practice</h3>
            <div className={MAIN}>
              <p data-reveal="rise" className="max-w-[34em] text-[clamp(18px,1.35vw,21px)] leading-[1.6]">
                We call it <em className="text-gold-deep">service as software</em>: AI in research, drafting and review, so good work comes faster and costs less.
              </p>
              <ul className="mt-7 grid max-w-[52em] grid-cols-1 gap-x-10 sm:grid-cols-2">
                {AI_CHECKS.map((c) => (
                  <li key={c} data-reveal="rise" className="relative border-t border-line py-3 pl-[30px] text-base leading-[1.5] before:absolute before:left-0.5 before:top-[1.2em] before:h-[7px] before:w-[13px] before:-rotate-45 before:border-b-2 before:border-l-2 before:border-gold-deep">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={`${WRAP} ${ROW} mt-[clamp(72px,8vw,112px)]`}>
            <div className={NOTE}>
              <h3>Allied advisory</h3>
              <p className="mt-1 text-base text-dust">Beyond legal advice</p>
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

        <section id="partners" className={`bg-blush ${SECTION}`}>
          <div className={`${WRAP} ${ROW}`}>
            <h2 className={NOTE}>Partners</h2>
            <div className={`${MAIN} grid grid-cols-1 gap-x-[clamp(32px,4vw,64px)] gap-y-[72px] lg:grid-cols-2`}>
              {PARTNERS.map((p) => (
                <article key={p.name}>
                  <div data-reveal="wipe" className="mb-6 aspect-[4/5] w-full max-w-[260px] overflow-hidden bg-paper">
                    <img src={p.photo} alt={p.name} width={480} height={600} loading="lazy" decoding="async" className="h-full w-full object-cover grayscale contrast-[1.05]" />
                  </div>
                  <h3 className="mb-2 font-display text-[clamp(28px,2.6vw,40px)] font-semibold leading-none tracking-[-0.02em] text-maroon [font-variation-settings:'wdth'_90]">{p.name}</h3>
                  <p className="mb-[18px] font-display text-[15px] font-medium text-dust">{p.role}</p>
                  {p.bio.map((b) => (
                    <p key={b.slice(0, 24)} className="mb-4 max-w-[34em] text-base leading-[1.65]">
                      {b}
                    </p>
                  ))}
                  <p className="mb-4 max-w-[34em] text-base italic leading-[1.65] text-dust">
                    {p.edu[0]}
                    <br />
                    {p.edu[1]}
                  </p>
                  <p className="flex flex-wrap gap-x-5 gap-y-1.5 font-display text-[15px] font-semibold">
                    <a href={`mailto:${p.email}`} className="underline underline-offset-4 transition-colors hover:text-maroon hover:decoration-gold-deep">
                      {p.email}
                    </a>
                    <a href={p.linkedin} target="_blank" rel="noopener" className="underline underline-offset-4 transition-colors hover:text-maroon hover:decoration-gold-deep">
                      LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="writing" className={SECTION}>
          <div className={`${WRAP} ${ROW}`}>
            <h2 className={NOTE}>Writing &amp; research</h2>
            <div className={MAIN}>
              <h3 className="mb-2 font-display text-[21px] font-semibold">Commentary</h3>
              <Pieces items={COMMENTARY} />
              <h3 className="mb-2 mt-[72px] font-display text-[21px] font-semibold">Journals &amp; books</h3>
              <Pieces items={JOURNALS} />
            </div>
          </div>
        </section>

        <section id="contact" className={`bg-blush ${SECTION}`}>
          <div className={`${WRAP} ${ROW}`}>
            <h2 className={NOTE}>Contact</h2>
            <div className={MAIN}>
              <p data-reveal="lines" className="lead mb-[.55em] text-maroon">
                Write to a partner.
              </p>
              <div className="flex flex-col gap-7">
                {PARTNERS.map((p) => (
                  <a key={p.email} href={`mailto:${p.email}`} data-reveal="rise" className="group flex w-fit max-w-full flex-col gap-1">
                    <span className="font-display text-[15px] font-semibold text-dust">{p.name}</span>
                    <span className="font-display text-[clamp(22px,3.2vw,44px)] font-semibold leading-[1.1] tracking-[-0.02em] [overflow-wrap:anywhere] [font-variation-settings:'wdth'_90] underline decoration-line decoration-1 underline-offset-[.15em] transition-colors group-hover:text-maroon group-hover:decoration-gold-deep">
                      {p.email}
                    </span>
                  </a>
                ))}
              </div>
              <p className="mt-10 text-base text-dust">{OFFICE}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="on-maroon bg-band pb-8 pt-[clamp(72px,9vw,120px)] text-rose">
        <div className={WRAP}>
          <a className="mark text-[clamp(28px,4.4vw,56px)]" href="#top" aria-label="Back to top">
            <span>Emerging</span>
            <span>Cities</span>
            <span>Lawyers</span>
          </a>
          <div className={`${ROW} mt-[72px] border-t border-line-rose pt-6`}>
            <h2 className="note col-span-12 mb-4 md:col-span-3 md:mb-0">Disclaimer</h2>
            <div className={`${MAIN} max-w-[48em] text-[15px] leading-[1.65] text-rose/75`}>
              <p className="mb-4">
                The Bar Council of India does not permit advocates to solicit work or advertise. Nothing on this website is, or is meant to be, an advertisement, solicitation, invitation or inducement of any kind. The website gives information about Emerging Cities Lawyers LLP, its members and its areas of practice. It is for those who seek it out.
              </p>
              <p>
                The content of this website is general information. It is not legal advice, and you should not rely on it as such. Please take specific advice on your own circumstances. Visiting this website, or writing to us through it, does not create a lawyer-client relationship. Descriptions of past work include matters our lawyers handled before and at ECL. They do not predict future outcomes. Emerging Cities Lawyers LLP is not liable for any action taken in reliance on material on this website. Links to other websites are for convenience only; we are not responsible for their content.
              </p>
              <p className="mt-4 text-[13px] text-rose/60">
                Building drawings traced from photographs on Wikimedia Commons, two of them by{" "}
                <a href="https://commons.wikimedia.org/wiki/File:Supreme_Court_of_India_01.jpg" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-gold">
                  Subhashish Panigrahi<span className="sr-only"> (opens in a new tab)</span>
                </a>{" "}
                and{" "}
                <a href="https://commons.wikimedia.org/wiki/File:National_Law_School_of_India_University,_Bangalore,_India_-_20130524-05.JPG" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-gold">
                  Smuconlaw<span className="sr-only"> (opens in a new tab)</span>
                </a>{" "}
                under{" "}
                <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-gold">
                  CC BY-SA 4.0<span className="sr-only"> (opens in a new tab)</span>
                </a>
                , which these drawings share.
              </p>
            </div>
          </div>
          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-2 border-t border-line-rose pt-5 font-display text-[13px] text-rose/70">
            <p>© {new Date().getFullYear()} ECL Emerging Cities Lawyers LLP</p>
            <p>LLPIN ADB-0729</p>
            <p>{OFFICE}</p>
            <p className="md:ml-auto">
              <a href="#top" className="hover:text-gold">
                Back to top
              </a>
            </p>
          </div>
        </div>
      </footer>

      <Motion />
    </>
  );
}
