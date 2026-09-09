import { papers } from "@/lib/research-data";
import {
  absoluteSiteUrl,
  SITE_BRAND_NAME,
  SITE_DESCRIPTION,
  SITE_TITLE,
} from "@/lib/site";

export const dynamic = "force-static";

const UPDATED_AT = new Date("2026-09-09T00:00:00+09:00");

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const items = papers
    .map((paper) => {
      const url = absoluteSiteUrl(`/paper/${paper.slug}`);
      return `
    <item>
      <title>${escapeXml(paper.titleKo)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(paper.thesis)}</description>
      <category>${escapeXml(paper.categoryKo)}</category>
      <pubDate>${UPDATED_AT.toUTCString()}</pubDate>
      <source url="${escapeXml(paper.sourceUrl)}">${escapeXml(paper.source)}</source>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${escapeXml(absoluteSiteUrl("/"))}</link>
    <atom:link href="${escapeXml(absoluteSiteUrl("/feed.xml"))}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ko-KR</language>
    <lastBuildDate>${UPDATED_AT.toUTCString()}</lastBuildDate>
    <copyright>${escapeXml(SITE_BRAND_NAME)}</copyright>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
