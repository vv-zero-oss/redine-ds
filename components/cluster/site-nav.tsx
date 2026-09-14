import { ClusterMark } from "./icons";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
] as const;

/**
 * Sticky top bar. The nav sits in its own absolutely-centred track rather than
 * in the flex row, so the links stay centred on the page no matter how wide
 * the logo or the button get.
 */
export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-cl-line bg-cl-bg/85 backdrop-blur-xl">
      <div className="relative mx-auto flex h-[72px] w-full max-w-[1600px] items-center justify-between px-8">
        <a href="#" className="flex items-center gap-2.5 text-cl-fg no-underline">
          <ClusterMark className="size-[22px]" />
          <span className="text-[21px] font-medium tracking-[-0.02em]">Cluster</span>
        </a>

        <nav
          className="pointer-events-none absolute inset-x-0 hidden items-center justify-center gap-7 md:flex"
          aria-label="Primary"
        >
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} className="cl-nav-link pointer-events-auto">
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#" className="cl-btn cl-btn-cream cl-btn-sm no-underline">
          Get free trial
        </a>
      </div>
    </header>
  );
}
