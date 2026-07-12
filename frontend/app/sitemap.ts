import type { MetadataRoute } from "next";

import { guides } from "@/lib/content";

const ROUTES = [
  "",
  "/hub",
  "/explore",
  "/compare",
  "/shortlist",
  "/roadmap",
  "/explain",
  "/deadlines",
  "/finance",
  "/guides",
  "/search",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://clearpath-germany.mekalasaathwik2002.chatgpt.site";
  const staticRoutes = ROUTES.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-07-11"),
    changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : route === "/hub" || route === "/explore" ? 0.9 : 0.7,
  }));
  const guideRoutes = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date("2026-07-11"),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticRoutes, ...guideRoutes];
}
