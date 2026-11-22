import type { Piece } from "@/lib/writing";

/* The three newest pieces as cards, each under a light pencil sketch of the publication's masthead
   (public/drawings/tl-*.svg, used as CSS masks so the line takes the site's maroon). The rest stay in the list below. */
export type Feature = { piece: Piece; art: string; alt: string; tall?: boolean };

export default function FeatureCards({ items }: { items: Feature[] }) {
  return (
    <ul className="mb-10 grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-0">
      {items.map(({ piece: p, art, alt, tall }) => (
        <li key={p.href} data-reveal="rise" className="[&+&]:border-t [&+&]:border-maroon/25 [&+&]:pt-10 md:[&+&]:border-t-0 md:[&+&]:pt-0 md:px-[clamp(16px,1.8vw,28px)] md:first:pl-0 md:last:pr-0 md:[&+&]:border-l md:[&+&]:border-maroon/25">
          <a href={p.href} target="_blank" rel="noopener" className="group block">
            <div className="flex h-[clamp(150px,40vw,200px)] md:h-[clamp(120px,10.5vw,150px)] items-center justify-center border-b border-maroon/40 pb-0">
              <div
                role="img"
                aria-label={alt}
                data-reveal="ink"
                className={`city-lines ${tall ? "mb-2 h-[118%] self-end" : "h-[78%]"} w-[88%] [mask-position:center] transition-[background-color] duration-300 group-hover:bg-maroon-ink`}
                style={{ ["--img" as string]: `url(/drawings/${art}.svg)` }}
              />
            </div>
            <p className="mt-4 flex flex-wrap gap-x-2 text-[15px] leading-[1.4]">
              <cite className="sr-only">{p.outlet}</cite>
              {p.dt ? (
                <time dateTime={p.dt} className="font-display text-[13px] leading-[1.6] text-dust">{p.date}</time>
              ) : (
                <span className="font-display text-[13px] leading-[1.6] text-dust">{p.date}</span>
              )}
            </p>
            <h4 className="mt-1.5 font-display text-[clamp(18px,1.5vw,21px)] font-semibold leading-[1.25] tracking-[-0.01em] underline decoration-line decoration-1 underline-offset-[.2em] transition-colors group-hover:text-maroon group-hover:decoration-gold-deep">
              {p.title}
              <span className="sr-only"> (opens in a new tab)</span>
            </h4>
          </a>
        </li>
      ))}
    </ul>
  );
}
