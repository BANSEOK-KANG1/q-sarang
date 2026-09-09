import ResearchHome from "@/components/ResearchHome";
import { papers } from "@/lib/research-data";
import {
  absoluteSiteUrl,
  NAVER_BLOG_URL,
  SITE_BRAND_NAME,
  SITE_DESCRIPTION,
  SITE_TITLE,
} from "@/lib/site";

export default function HomePage() {
  const organizationId = absoluteSiteUrl("/#organization");
  const websiteId = absoluteSiteUrl("/#website");
  const pageId = absoluteSiteUrl("/#webpage");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: SITE_BRAND_NAME,
        alternateName: ["Q-LOVE", "큐사랑"],
        url: absoluteSiteUrl("/"),
        logo: {
          "@type": "ImageObject",
          contentUrl: absoluteSiteUrl("/q-love-logo-transparent-v2.png"),
          width: 570,
          height: 222,
        },
        sameAs: [NAVER_BLOG_URL],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: absoluteSiteUrl("/"),
        name: SITE_BRAND_NAME,
        alternateName: ["Q-LOVE", "큐사랑"],
        inLanguage: "ko-KR",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "CollectionPage",
        "@id": pageId,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        url: absoluteSiteUrl("/"),
        isPartOf: { "@id": websiteId },
        inLanguage: "ko-KR",
        about: [
          { "@type": "Thing", name: "Cordyceps militaris" },
          { "@type": "Thing", name: "코디세핀" },
          { "@type": "Thing", name: "제왕충초" },
        ],
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: papers.length,
          itemListElement: papers.map((paper, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: paper.titleKo,
            url: absoluteSiteUrl(`/paper/${paper.slug}`),
          })),
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ResearchHome />
    </>
  );
}
