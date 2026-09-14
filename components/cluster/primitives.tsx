"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";
import { ArrowRight } from "./icons";

/** A section that rises into place the first time it is scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Stagger within a group. Keep these inside one 80ms-per-item budget. */
  delay?: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("cl-reveal", className)}
      style={delay ? ({ "--cl-reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

/** The page's one call to action, in its two skins. */
export function CtaButton({
  children = "Get free trial",
  tone = "cream",
  size,
  className,
  withArrow = true,
}: {
  children?: ReactNode;
  tone?: "cream" | "dark";
  size?: "sm";
  className?: string;
  withArrow?: boolean;
}) {
  return (
    <a
      href="#"
      className={cn(
        "cl-btn no-underline",
        tone === "cream" ? "cl-btn-cream" : "cl-btn-dark",
        size === "sm" && "cl-btn-sm",
        className,
      )}
    >
      {withArrow && (
        <span className="cl-btn-arrow">
          <ArrowRight className="h-3 w-[22px]" />
        </span>
      )}
      {children}
    </a>
  );
}
