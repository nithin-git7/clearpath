import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";

import Header from "@/components/Header";
import "@/styles/globals.css";

const FALLBACK_SITE_URL = "https://clearpath-germany.mekalasaathwik2002.chatgpt.site";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");
  const origin = host ? `${protocol}://${host}` : (process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL);

  return {
    metadataBase: new URL(origin),
    title: {
      default: "ClearPath Germany | Germany application control room",
      template: "%s | ClearPath Germany",
    },
    description:
      "Find German study programs, build a source-backed roadmap, track deadlines and finances, and turn official requirements into clear next actions.",
    applicationName: "ClearPath Germany",
    keywords: ["study in Germany", "German university applications", "APS India", "uni-assist", "student visa Germany"],
    authors: [{ name: "ClearPath Germany" }],
    creator: "ClearPath Germany",
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: "ClearPath Germany",
      title: "ClearPath Germany - know your next step",
      description: "A private-by-default control room for planning a Germany study application with official verification built in.",
      url: origin,
      images: [{ url: `${origin}/og.png`, width: 1792, height: 920, alt: "ClearPath Germany - Know your next step." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "ClearPath Germany - know your next step",
      description: "Plan programs, requirements, deadlines, finances, visa preparation, and arrival in one place.",
      images: [`${origin}/og.png`],
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#092c27",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
