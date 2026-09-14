import type { Metadata } from "next";
import { inter, robotoMono } from "./fonts";
import { themeInitScript } from "@/lib/theme";
import { SiteHeader } from "@/components/site/site-header";
import { ToastHost } from "@/components/site/toast-host";
import "./globals.css";

export const metadata: Metadata = {
  title: "Transitions — Refine design system",
  description:
    "A design system extracted from the Refine panel — tokens, components and motion, rebuilt on Next.js and Tailwind v4.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${robotoMono.variable}`}
    >
      <head>
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-bg text-fg antialiased">
        <SiteHeader />
        {children}
        <ToastHost />
      </body>
    </html>
  );
}
