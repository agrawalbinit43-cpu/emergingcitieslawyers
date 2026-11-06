import { BUILDINGS, GROUND } from "@/lib/skyline";

/**
 * A line drawing of the buildings where the firm's lawyers studied and practised, the Supreme Court
 * at its centre. Unlabelled, as the partners asked. Motion.tsx draws it in, line by line, from the
 * centre outwards; a building under the pointer turns brass. On a phone it can be swiped sideways.
 */
export default function Skyline() {
  return (
    <div data-pan className="-mx-[clamp(20px,4vw,56px)] overflow-x-auto overscroll-x-contain px-[clamp(20px,4vw,56px)] [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0">
      <svg
        data-reveal="sketch"
        className="skyline block h-auto w-[230%] max-w-none sm:w-[150%] md:w-full"
        viewBox="0 0 1400 460"
        role="img"
        aria-label="A line drawing of the courts and universities where our lawyers studied and practised"
      >
        <path className="ground" d={GROUND} pathLength={1} />
        {BUILDINGS.map((b) => (
          <g key={b.id} className="bldg">
            <path className="d" d={b.detail} pathLength={1} />
            <path className="o" d={b.outline} pathLength={1} />
          </g>
        ))}
      </svg>
    </div>
  );
}
