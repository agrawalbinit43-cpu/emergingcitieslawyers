import { useId } from "react";
import { CT_DOOR_D, CT_HATCH, CT_LINES, CT_SPILL_D } from "./court-art";
import { FIG_CLIENT_FILL, FIG_CLIENT_INK, FIG_LAWYER_FILL, FIG_LAWYER_INK } from "./figures";

/* Pro bono: an Indian court after the Supreme Court of India, drawn in the clean pencil line of the About strip, with
   hatched shadows (court-art.ts, made by ux-review/court2.py). A client in a saree (gold) and an advocate in coat, gown
   and bands (maroon-ink) stand on the top step in front of the lit door. A still image, decorative only (aria-hidden). */
export default function ProBonoScene({ crop = false, className = "" }: { crop?: boolean; className?: string }) {
  const id = `ct-${useId().replace(/:/g, "")}`;
  const paper = "var(--color-blush)";

  return (
    <div aria-hidden="true" className={`ct relative w-full ${className}`}>
      <svg viewBox={crop ? "300 60 600 432" : "60 58 1080 434"} className="block h-auto w-full" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-gold)" stopOpacity=".3" />
            <stop offset="1" stopColor="var(--color-gold)" stopOpacity=".9" />
          </linearGradient>
        </defs>
        <path className="ct-in" d={CT_DOOR_D} />
        <path className="i hat" d={CT_HATCH} />
        {/* warm light from the open door, behind the two figures */}
        <g className="ct-glow" fill={`url(#${id}-g)`}>
          <path d={CT_DOOR_D} />
          <path d={CT_SPILL_D} />
        </g>
        <path className="i" d={CT_LINES} />

        {/* soft shadows on the landing */}
        <path className="ct-shadow" d="M568 440.6h18M571 441.8h13M603 440.6h20M606 441.8h14" />

        {/* client (saree, gold-deep) and advocate (gown and bands, maroon-ink), traced from a line study */}
        <g fillRule="evenodd">
          <path d={FIG_CLIENT_FILL} fill={paper} />
          <path d={FIG_LAWYER_FILL} fill={paper} />
          <path d={FIG_CLIENT_INK} fill="var(--color-gold-deep)" />
          <path d={FIG_LAWYER_INK} fill="var(--color-maroon-ink)" />
        </g>
      </svg>
    </div>
  );
}
