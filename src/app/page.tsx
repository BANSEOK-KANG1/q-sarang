import ResearchHome from "@/components/ResearchHome";
import { papers } from "@/lib/research-data";
import { absoluteSiteUrl, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: absoluteSiteUrl("/"),
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
