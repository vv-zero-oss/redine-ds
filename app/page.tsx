import type { Metadata } from "next";
import { SiteShell } from "@/components/landing/site-shell";
import { Hero } from "@/components/landing/hero";
import { ProductCover } from "@/components/landing/product-cover";
import { Features } from "@/components/landing/features";
import { Gallery } from "@/components/landing/gallery";

export const metadata: Metadata = {
  title: "Codecaine — The canvas for your real code",
  description:
    "Start with what you already have: a design canvas that works on your real code. Import from your clipboard, @mention anything on the board and leave comments.",
};

/**
 * The landing page.
 *
 * One column of sections in normal flow — no hand-placed positions — so it
 * reflows at every width. Spacing, type and media ratios are `--lp-*` tokens
 * in src/landing.css, which step down at the tablet and mobile breakpoints.
 */
export default function LandingPage() {
  return (
    <SiteShell>
      <Hero />
      <ProductCover />
      <Features />
      <Gallery />
    </SiteShell>
  );
}
