/* Vector line drawings (public/drawings/*.svg, white strokes used as CSS masks). The Supreme Court and Yale are traced from
   photographs and refined; the Juridicum and NLSIU are constructed from their geometry. r is width / height.
   They drift slowly behind the Practice section, faint enough to read as texture under the text. Pure CSS: two copies of the
   row slide left by one copy and repeat; visitors who ask for reduced motion see them still. Decorative, so hidden from
   screen readers. */
const DRAWINGS = [
  { src: "/drawings/supreme-court.svg", r: 1300 / 930 },
  { src: "/drawings/nlsiu.svg", r: 1100 / 1000 },
  { src: "/drawings/yale.svg", r: 1200 / 1425 },
  { src: "/drawings/juridicum.svg", r: 1200 / 718 },
];

export default function Landmarks({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`drift pointer-events-none overflow-hidden ${className}`}>
      <div className="drift-track flex h-full w-max items-end">
        {[0, 1].map((c) =>
          DRAWINGS.map((d) => (
            <div key={`${c}-${d.src}`} className="h-full shrink-0 pr-[clamp(64px,10vw,180px)]">
              <div className="drift-lines h-full" style={{ aspectRatio: String(d.r), ["--img" as string]: `url(${d.src})` }} />
            </div>
          )),
        )}
      </div>
    </div>
  );
}
