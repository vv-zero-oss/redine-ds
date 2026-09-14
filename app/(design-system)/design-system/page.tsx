import type { Metadata } from "next";
import { AppShell } from "@/components/site/sections/app-shell";
import { ComponentGallery } from "@/components/site/sections/component-gallery";
import { Foundations } from "@/components/site/sections/foundations";
import { Hero } from "@/components/site/sections/hero";

export const metadata: Metadata = {
  title: "Transitions — Refine design system",
  description:
    "A design system extracted from the Refine panel — tokens, components and motion, rebuilt on Next.js and Tailwind v4.",
};

export default function DesignSystemPage() {
  return (
    <main className="container-page pb-24">
      <Hero />
      <Foundations />
      <ComponentGallery />
      <AppShell />
    </main>
  );
}
