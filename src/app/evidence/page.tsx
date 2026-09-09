import type { Metadata } from "next";
import Link from "next/link";
import { ResearchFooter, ResearchHeader } from "@/components/ResearchShell";
import { evidenceCollections } from "@/lib/evidence-collections";
import { papers } from "@/lib/research-data";
import { absoluteSiteUrl, SITE_BRAND_NAME } from "@/lib/site";

const title = "제왕충초 연구 근거 수준 안내";
const description =
  "큐사랑 Q-LOVE가 제왕충초·코디세핀 연구를 사람 연구, 동물·세포 연구, 리뷰·체계적 고찰로 나눠 해석 범위와 한계를 안내합니다.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/evidence" },
  keywords: ["제왕충초 연구", "코디세핀 연구", "동충하초 논문", "근거 수준"],
  openGraph: {
    type: "website",
    url: "/evidence",
    title,
    description,
    images: [{ url: "/og-q-love.png", alt: "Q-LOVE 제왕충초 연구 근거 수준 안내" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-q-love.png"],
  },
};

export default function EvidenceHubPage() {
  const pageUrl = absoluteSiteUrl("/evidence");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: pageUrl,
    inLanguage: "ko-KR",
    publisher: {
      "@type": "Organization",
      name: SITE_BRAND_NAME,
      url: absoluteSiteUrl("/"),
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: evidenceCollections.length,
      itemListElement: evidenceCollections.map((collection, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: collection.label,
        url: absoluteSiteUrl(`/evidence/${collection.slug}`),
      })),
    },
  };

  return (
    <div className="research-site evidence-hub-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ResearchHeader compact />

      <main>
        <section className="methodology-hero evidence-page-hero">
          <p className="research-kicker"><span />Q-LOVE EVIDENCE GUIDE</p>
          <h1>제왕충초 연구는<br /><em>대상부터 나눠야</em><br />정확히 읽을 수 있습니다.</h1>
          <p>
            사람에게 직접 살핀 결과인지, 동물·세포에서 가능성을 탐색한 것인지,
            여러 연구를 모은 리뷰인지 먼저 구분해 보세요.
          </p>
        </section>

        <section className="evidence-landing-grid" aria-label="근거 유형별 안내">
          {evidenceCollections.map((collection, index) => {
            const count = papers.filter((paper) =>
              collection.evidenceCodes.includes(paper.evidenceCode),
            ).length;
            return (
              <article key={collection.slug}>
                <p className="research-section-label">
                  {String(index + 1).padStart(2, "0")} · {collection.eyebrow}
                </p>
                <h2>{collection.title}</h2>
                <p>{collection.description}</p>
                <div className="evidence-landing-grid__meta">
                  <strong>{count}편</strong>
                  <span>현재 공개 요약</span>
                </div>
                <Link href={`/evidence/${collection.slug}`}>
                  {collection.label} 모아보기 <span aria-hidden="true">↗</span>
                </Link>
              </article>
            );
          })}
        </section>

        <section className="evidence-hub-note">
          <div>
            <p className="research-section-label">READING RULE</p>
            <h2>등급은 좋고 나쁨이 아니라<br />어디까지 말할 수 있는지를 표시합니다.</h2>
          </div>
          <div>
            <p>
              같은 제왕충초 연구라도 원물·추출물·코디세핀·다당류는 서로 다른
              재료입니다. 연구 대상과 재료를 함께 확인해야 제품 설명으로
              과도하게 확장하는 일을 피할 수 있습니다.
            </p>
            <Link href="/methodology" className="research-button research-button--light">
              전체 연구 원칙 보기 <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>

      <ResearchFooter />
    </div>
  );
}
