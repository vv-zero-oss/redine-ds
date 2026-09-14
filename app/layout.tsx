import type { Metadata } from "next";
import { inter, robotoMono } from "./fonts";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Cluster — GTM tools for your agents",
    template: "%s",
  },
  description:
    "Cluster gives your agents access to 50+ GTM data sources, linkedin & email sending infra and the ability to orchestrate hundreds of subagents in parallel.",
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
      <body className="min-h-screen bg-bg text-fg antialiased">{children}</body>
    </html>
  );
}
