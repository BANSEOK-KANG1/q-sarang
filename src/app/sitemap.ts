import type { MetadataRoute } from "next";
import { papers } from "@/lib/research-data";
import { evidenceCollections } from "@/lib/evidence-collections";
import { absoluteSiteUrl } from "@/lib/site";

const LAST_CONTENT_UPDATE = new Date("2026-09-09T00:00:00+09:00");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteSiteUrl("/"),
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "weekly",
      priority: 1,
      images: [absoluteSiteUrl("/research/cordyceps-hero.webp")],
    },
    {
      url: absoluteSiteUrl("/methodology"),
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly",
      priority: 0.75,
      images: [absoluteSiteUrl("/research/cordyceps-botanical.webp")],
    },
    {
      url: absoluteSiteUrl("/evidence"),
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly",
      priority: 0.85,
      images: [absoluteSiteUrl("/og/evidence-hub.png")],
    },
    ...evidenceCollections.map((collection) => ({
      url: absoluteSiteUrl(`/evidence/${collection.slug}`),
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly" as const,
      priority: 0.82,
      images: [
        absoluteSiteUrl(
          collection.slug === "human-studies"
            ? "/og/evidence-human.png"
            : collection.slug === "preclinical-studies"
              ? "/og/evidence-preclinical.png"
              : "/og/evidence-reviews.png",
        ),
      ],
    })),
    ...papers.map((paper) => ({
      url: absoluteSiteUrl(`/paper/${paper.slug}`),
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [absoluteSiteUrl(paper.image)],
    })),
  ];
}
