import type { Metadata } from "next";
import { SiteNav } from "@/components/cluster/site-nav";
import { Hero } from "@/components/cluster/hero";
import { Workspace } from "@/components/cluster/workspace";
import { GtmPlays } from "@/components/cluster/gtm-plays";
import { Faq } from "@/components/cluster/faq";
import { CreamBand, SiteFooter, Testimonials } from "@/components/cluster/sections";

export const metadata: Metadata = {
  title: "Cluster — GTM tools for your agents",
  description:
    "Cluster gives your agents access to 50+ GTM data sources, linkedin & email sending infra and the ability to orchestrate hundreds of subagents in parallel so you can execute any GTM play.",
};

/**
 * The landing page.
 *
 * Everything between the header and the footer lives inside one ruled frame —
 * a centred 1420px column with a hairline down each side — because that frame
 * is the page's structure, not decoration: every section rule starts and stops
 * on it. The closing cream block is the one full-bleed element.
 */
export default function ClusterPage() {
  return (
    <div className="cl-page min-h-screen">
      <SiteNav />
      <main className="cl-frame">
        <Hero />
        <Workspace />
        <CreamBand />
        <GtmPlays />
        <Testimonials />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  );
}
