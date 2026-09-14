import { SiteHeader } from "@/components/site/site-header";
import { ToastHost } from "@/components/site/toast-host";

/**
 * Chrome for the design-system routes only. The landing page at /cluster is a
 * standalone brand surface and deliberately sits outside this group, so it
 * gets the bare root layout and none of this header.
 */
export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <ToastHost />
    </>
  );
}
