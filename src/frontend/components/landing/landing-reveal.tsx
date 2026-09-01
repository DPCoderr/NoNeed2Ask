import type { CSSProperties, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type LandingRevealProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  motion?: "fade" | "slide-up";
};

export function LandingReveal({
  children,
  className,
  delay = 0,
  motion = "slide-up",
  style,
  ...props
}: LandingRevealProps) {
  return (
    <div
      className={cn(
        "landing-reveal",
        motion === "fade" && "landing-reveal-fade",
        className,
      )}
      style={
        {
          "--landing-reveal-delay": `${delay}ms`,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}
