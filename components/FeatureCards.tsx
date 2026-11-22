import type { Piece } from "@/lib/writing";

/* The three newest pieces as cards, each over a pen drawing in the About and AI-native hand
   (public/drawings/tl-*.svg, used as CSS masks so the line takes the site's maroon). The rest stay in the list below. */
export type Feature = { piece: Piece; art: string; alt: string };

export default function FeatureCards({ items }: { items: Feature[] }) {
  return (
    <ul className="mb-10 grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-0">
      {items.map(({ piece: p, art, alt }) => (
        <li key={p.href} data-reveal="rise" className="md:px-[clamp(16px,1.8vw,28px)] md:first:pl-0 md:last:pr-0 md:[&+&]:border-l md:[&+&]:border-maroon/25">
          <a href={p.href} target="_blank" rel="noopener" className="group block">
            <div className="flex h-[clamp(170px,46vw,240px)] md:h-[clamp(140px,12.5vw,180px)] items-end justify-center border-b border-maroon/40 pb-0">
              <div
                role="img"
                aria-label={`Line drawing: ${alt}`}
                data-reveal="ink"
                className="city-lines h-[92%] w-full [mask-position:center_bottom] transition-[background-color] duration-300 group-hover:bg-maroon-ink"
                style={{ ["--img" as string]: `url(/drawings/${art}.svg)` }}
              />
            </div>
            <p className="mt-4 flex flex-wrap gap-x-2 text-[15px] leading-[1.4]">
              <cite className="text-gold-deep">{p.outlet}</cite>
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
            <p className="mt-2 text-[14px] leading-[1.45] text-dust">{p.by}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
