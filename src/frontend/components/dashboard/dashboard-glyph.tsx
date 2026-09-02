import type { SVGProps } from "react";

export type DashboardGlyphName =
  | "activity"
  | "applied"
  | "checkpoint"
  | "closed-route"
  | "contour"
  | "offer"
  | "paused"
  | "planned"
  | "signpost"
  | "summit"
  | "trailhead";

type DashboardGlyphProps = SVGProps<SVGSVGElement> & {
  name: DashboardGlyphName;
};

export function DashboardGlyph({ name, ...props }: DashboardGlyphProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      >
        {name === "signpost" ? (
          <>
            <path d="M10 3v18M10 5H4l-2 2 2 2h6M10 11h7l2 2-2 2h-7M6 21h8" />
            <path d="M5 7h2M13 13h3" opacity=".45" />
          </>
        ) : null}
        {name === "contour" ? (
          <>
            <path d="M3 16.5c2.2-3.2 4.1-4.8 5.7-4.8 2.4 0 2.2 4.2 4.6 4.2 1.8 0 2.6-2.5 4.1-2.5 1.1 0 2.1.8 3.6 2.5" />
            <path d="M4.5 12c1.7-2.6 3.3-3.9 4.8-3.9 2.4 0 2.6 4 4.5 4 1.4 0 2.1-2.2 3.5-2.2 1 0 2 .7 3.2 2.1M7 7.5C8.2 6 9.3 5.2 10.4 5.2c2 0 2.6 3.2 4.3 3.2 1 0 1.8-1.3 2.8-1.3" opacity=".72" />
          </>
        ) : null}
        {name === "activity" ? (
          <>
            <circle cx="12" cy="12" r="3" />
            <circle cx="12" cy="12" r="7.5" opacity=".35" />
            <path d="M12 2.5v2M21.5 12h-2M12 21.5v-2M2.5 12h2" />
          </>
        ) : null}
        {name === "applied" || name === "trailhead" ? (
          <>
            <circle cx="6" cy="18" r="2.2" />
            <path d="M8.2 17.6c3.3-.3 2.4-4.4 5.6-4.8 2.3-.3 2.7-2.4 2.7-4.4" />
            <path d="M13.5 5.5h6l-1.8 2 1.8 2h-6z" />
          </>
        ) : null}
        {name === "planned" ? (
          <>
            <path d="M6 3.5v17M6 6h9l2 2-2 2H6M6 13h7l-2 2 2 2H6" />
            <circle cx="6" cy="20.5" r="1" />
          </>
        ) : null}
        {name === "checkpoint" ? (
          <>
            <circle cx="12" cy="12" r="8" />
            <path d="m8.3 12.2 2.4 2.4 5.2-5.4" />
          </>
        ) : null}
        {name === "offer" || name === "summit" ? (
          <>
            <path d="M3.5 19 10 8l3 4 2.2-3 5.3 10z" />
            <path d="M10 8V3.5M10 4h6l-1.7 1.7L16 7.5h-6" />
          </>
        ) : null}
        {name === "closed-route" ? (
          <>
            <circle cx="12" cy="12" r="8" />
            <path d="m9 9 6 6m0-6-6 6" />
          </>
        ) : null}
        {name === "paused" ? (
          <>
            <circle cx="12" cy="12" r="8" />
            <path d="M10 9v6m4-6v6" />
          </>
        ) : null}
      </g>
    </svg>
  );
}
