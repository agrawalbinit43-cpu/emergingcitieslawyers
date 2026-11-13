/**
 * ECL AI section scenes (viewBox 320x200). Card 4 v5: platform and firm loop.
 * Rest state (reduced motion): card 1 closed lock, no dots; card 2 hub only; card 3 all three rows typed and ticked.
 * All three devices are centred on y=100 so the cards share a horizon.
 */
export default function AiScenes({ scene }: { scene: number }) {
  return (
    <div aria-hidden="true" className="scene aspect-[16/10] w-full px-2">
      <svg viewBox="0 0 320 200" className="h-full w-full">
        {scene === 0 && <Local />}
        {scene === 1 && <Parts />}
        {scene === 2 && <Laptop />}
        {scene === 3 && <Loop />}
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

/* Card 4 (v5, Web Studio): the AI platform (server stack, left) and the firm (laptop, right) pass work round a loop.
   Upper arc: platform to firm (maroon dot). Lower arc: firm back to platform (gold dot).
   Each pass adds a line to the document in the middle; on the last pass it gets its section mark and a gold ring.
   Doc x140-180 y74-126, centred on y=100. Rest state: full document, mark and ring shown, dots hidden. */
const LOOP_TOP = "M84 76 Q160 6 236 76";
const LOOP_BOTTOM = "M236 124 Q160 194 84 124";

function Loop() {
  return (
    <>
      {/* platform: three-unit server stack */}
      {[66, 90, 114].map((y) => (
        <g key={y}>
          <rect className="ink" x="16" y={y} width="68" height="20" rx="3" />
          <circle className="c6-led" cx="27" cy={y + 10} r="2" />
          <line className="ink faint" x1="38" y1={y + 10} x2="74" y2={y + 10} />
        </g>
      ))}
      {/* firm: laptop */}
      <Device x={236} y={70} w={70} h={50} />
      <line className="ink faint" x1="246" y1="84" x2="296" y2="84" />
      <line className="ink faint" x1="246" y1="94" x2="288" y2="94" />
      <line className="ink faint" x1="246" y1="104" x2="292" y2="104" />

      <path className="c6-arc" d={LOOP_TOP} />
      <path className="c6-arc gold-arc" d={LOOP_BOTTOM} />
      <path className="c6-head" d="M233.6 68.4 L236 76 L228.2 74.2" />
      <path className="c6-head gold-head" d="M86.4 131.6 L84 124 L91.8 125.8" />

      {/* the tailored document */}
      <path className="ink" d="M134 64 h40 l12 12 v60 h-52 z" />
      <path className="ink" d="M174 64 v12 h12" />
      {[88, 99, 110].map((y, i) => (
        <line key={y} className={`c6-ln c6-ln${i}`} x1="143" y1={y} x2={i === 2 ? 164 : 177} y2={y} pathLength={1} />
      ))}
      <text className="c6-sect" x="142" y="130">§</text>
      <circle className="c6-ring" cx="160" cy="100" r="46" />

      <circle className="c6-dot c6-top" r="3.5" style={{ offsetPath: `path("${LOOP_TOP}")` }} />
      <circle className="c6-dot c6-bot" r="3.5" style={{ offsetPath: `path("${LOOP_BOTTOM}")` }} />
    </>
  );
}
