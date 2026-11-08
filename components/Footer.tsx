import { OFFICE } from "@/lib/content";
import { MAIN, ROW, WRAP } from "@/lib/ui";

/** The maroon footer with the Bar Council disclaimer, shared by every page. */
export default function Footer() {
  return (
  <footer className="on-maroon bg-maroon pb-8 pt-[clamp(72px,9vw,120px)] text-rose">
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
            The drawings of the Supreme Court and Yale Law School are traced from photographs on Wikimedia Commons by{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Supreme_Court_of_India_01.jpg" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-gold">
              Subhashish Panigrahi<span className="sr-only"> (opens in a new tab)</span>
            </a>{" "}
            (
            <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-gold">
              CC BY-SA 4.0<span className="sr-only"> (opens in a new tab)</span>
            </a>
            , which that drawing shares) and{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Sterling_Law_Building_-_Yale_School_of_Law_(54106346409).jpg" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-gold">
              ajay_suresh<span className="sr-only"> (opens in a new tab)</span>
            </a>{" "}
            (
            <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-gold">
              CC BY 2.0<span className="sr-only"> (opens in a new tab)</span>
            </a>
            ).
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
  );
}
