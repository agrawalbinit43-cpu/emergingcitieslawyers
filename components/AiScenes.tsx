/**
 * ECL AI section scenes, v2 (viewBox 320x200). Pair with scenes-v2.css.
 * Rest state (reduced motion): card 1 closed lock, no dots; card 2 hub only; card 3 all three rows typed and ticked.
 * All three devices are centred on y=100 so the cards share a horizon.
 */
export default function AiScenes({ scene }: { scene: number }) {
  return (
    <div aria-hidden="true" className="scene aspect-[16/10] w-full">
      <svg viewBox="0 0 320 200" className="h-full w-full">
        {scene === 0 && <Local />}
        {scene === 1 && <Parts />}
        {scene === 2 && <Laptop />}
      </svg>
    </div>
  );
}

function Device({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g className="ink">
      <rect x={x} y={y} width={w} height={h} rx="5" />
      <path d={`M${x - 10} ${y + h + 7} h${w + 20} l-5 6 h${-(w + 10)} z`} />
    </g>
  );
}

/* Card 1. Device x34-152, boundary x196, cloud x226-288. Lanes run from inside the screen to the boundary. */
function Local() {
  const lanes = [82, 97, 112];
  return (
    <>
      <Device x={34} y={54} w={118} h={80} />
      <path className="ink" d="M58 76 h22 l6 7 h36 v38 h-64 z" />
      <g className="gold">
        <rect x="80" y="99" width="20" height="16" rx="2" />
        <path d="M84 99 v-5 a6 6 0 0 1 12 0 v5" />
      </g>
      {lanes.map((y, i) => (
        <g key={y}>
          <line className="lane" x1="122" y1={y} x2="190" y2={y} />
          <circle className="dot halt" cx="126" cy={y} r="2.5" style={{ animationDelay: `${i * 0.5}s` }} />
        </g>
      ))}
      <line className="edge" x1="196" y1="40" x2="196" y2="168" />
      <line className="cap" x1="190" y1="40" x2="202" y2="40" />
      <line className="cap" x1="190" y1="168" x2="202" y2="168" />
      <path className="ink faint" d="M236 118 h52 a14 14 0 0 0 -4 -27 a20 20 0 0 0 -38 -6 a14 14 0 0 0 -10 33 z" />
    </>
  );
}

/* Card 2. Boxes x20-64; device x214-294. Threads meet at the device's left edge, then the hub: same star-and-centre grammar as the hero graph. */
const PARTS = [
  { y: 44, icon: "M35 38 l-6 6 l6 6 M49 38 l6 6 l-6 6" },                 // code: < >
  { y: 100, icon: "M34 91 h11 l7 7 v14 h-18 z M45 91 v7 h7 M38 105 h10 M38 109 h7" }, // document with text lines
  { y: 156, icon: "M40 150 m-7 0 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0 M45 155 l7 7" },   // lens: ring + a heavier handle
];

function Parts() {
  return (
    <>
      {PARTS.map((p, i) => (
        <g key={i}>
          <rect className="ink" x="20" y={p.y - 18} width="44" height="36" rx="4" />
          <path className="gold" d={p.icon} />
          <line className="thread" x1="64" y1={p.y} x2="214" y2="100" />
          <circle className="dot feed" cx="64" cy={p.y} r="2.5"
            style={{ ["--dx" as string]: "150px", ["--dy" as string]: `${100 - p.y}px`, animationDelay: `${i * 0.5}s` }} />
        </g>
      ))}
      <Device x={214} y={64} w={80} h={72} />
      <circle className="ring" cx="254" cy="100" r="11" />
      <circle className="ping" cx="254" cy="100" r="11" />
      <circle className="hub" cx="254" cy="100" r="5" />
    </>
  );
}

/* Card 3. Rows at y 76/104/132. Review gets a ring round its tick: the lawyer's sign-off. */
const STEPS = ["research", "draft", "review"];

function Laptop() {
  return (
    <>
      <Device x={58} y={28} w={204} h={128} />
      <line className="ink faint" x1="58" y1="46" x2="262" y2="46" />
      {[0, 1, 2].map((i) => (
        <circle key={i} className="ink faint" cx={70 + i * 9} cy="37" r="2" />
      ))}
      {STEPS.map((s, i) => {
        const y = 80 + i * 28;
        return (
          <g key={s} className={`row${i}`}>
            <text className="type-prompt" x="78" y={y}>›</text>
            <clipPath id={`type-${i}`}>
              <rect className="typing" x="94" y={y - 16} width="100" height="22" />
            </clipPath>
            <text className="type-text" x="94" y={y} clipPath={`url(#type-${i})`}>{s}</text>
            {i === 2 && <circle className="signoff" cx="231" cy={y - 5} r="11" />}
            <path className="tick" d={`M225 ${y - 5} l4.5 4.5 l9 -9`} pathLength={1} />
          </g>
        );
      })}
    </>
  );
}
