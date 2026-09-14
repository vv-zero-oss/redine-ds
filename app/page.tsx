import { AppShell } from "@/components/site/sections/app-shell";
import { ComponentGallery } from "@/components/site/sections/component-gallery";
import { Foundations } from "@/components/site/sections/foundations";
import { Hero } from "@/components/site/sections/hero";

export default function HomePage() {
  return (
    <main className="container-page pb-24">
      <Hero />
      <Foundations />
      <ComponentGallery />
      <AppShell />
    </main>
  );
}
