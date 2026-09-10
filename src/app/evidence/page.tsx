import type { Metadata } from "next";
import Link from "next/link";
import { ResearchFooter, ResearchHeader } from "@/components/ResearchShell";
import { evidenceCollections } from "@/lib/evidence-collections";
import { papers } from "@/lib/research-data";
import {
  absoluteSiteUrl,
  NAVER_PRODUCT_HUB_URL,
  SITE_BRAND_NAME,
} from "@/lib/site";

const title = "제왕충초 연구 근거 수준 안내";
const shareTitle = `${title} · 큐사랑 Q-LOVE`;
const description =
  "큐사랑 Q-LOVE가 제왕충초·코디세핀 연구를 사람 연구, 동물·세포 연구, 리뷰·체계적 고찰로 나눠 해석 범위와 한계를 안내합니다.";

const evidenceFaqs = [
  {
    question: "사람 대상 연구라면 제품 효능까지 확인된 건가요?",
    answer:
      "아닙니다. 사람 연구도 참여자, 비교군, 기간, 사용한 원료·추출물·제형의 범위 안에서 해석해야 합니다. 논문과 실제 판매 제품이 같은지는 라벨과 공식 표시를 별도로 확인해야 합니다.",
  },
  {
    question: "동물·세포 연구 결과를 사람에게 그대로 적용할 수 있나요?",
    answer:
      "그대로 적용할 수 없습니다. 동물과 세포 연구는 기전과 가능성을 탐색하는 단계이며, 실험 용량이나 농도를 사람의 섭취 결과 또는 제품 효과로 바꾸어 말하면 안 됩니다.",
  },
  {
    question: "제왕충초·동충하초·코디세핀은 같은 자료인가요?",
    answer:
      "같은 말로 묶어 판단하기 어렵습니다. 종, 원물·추출물, 개별 성분, 제조 방식과 함량이 다를 수 있으므로 논문 재료와 제품 라벨을 각각 확인해야 합니다.",
  },
];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/evidence" },
  keywords: ["제왕충초 연구", "코디세핀 연구", "동충하초 논문", "근거 수준"],
  openGraph: {
    type: "website",
    url: "/evidence",
    title: shareTitle,
    description,
    images: [{ url: "/og/evidence-hub.png", width: 1200, height: 630, alt: "Q-LOVE 제왕충초 연구 근거 수준 안내" }],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description,
    images: ["/og/evidence-hub.png"],
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
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: absoluteSiteUrl("/og/evidence-hub.png"),
      width: 1200,
      height: 630,
    },
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

        <section className="evidence-faq" aria-labelledby="evidence-faq-title">
          <div className="evidence-faq__intro">
            <p className="research-section-label">SEARCH QUESTIONS</p>
            <h2 id="evidence-faq-title">검색 전에 가장 많이<br />헷갈리는 세 가지</h2>
            <p>짧은 답을 먼저 확인한 뒤, 필요한 근거 유형으로 이동해 보세요.</p>
          </div>
          <div className="evidence-faq__list">
            {evidenceFaqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary><span>{String(index + 1).padStart(2, "0")}</span>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="research-next-step evidence-next-step">
          <p className="research-section-label">FROM RESEARCH TO QUESTION</p>
          <div>
            <h2>연구를 확인했다면<br /><em className="research-heading-em">제품 라벨은 별도로</em> 살펴보세요.</h2>
            <div>
              <p>
                논문에 사용된 원물·추출물·성분과 실제 제품의 원료 표기는 같다고
                가정할 수 없습니다. 제품명이나 포장 사진, 궁금한 질문 한 가지를
                준비하면 자료 문의를 더 정확하게 구분할 수 있습니다.
              </p>
              <a
                href={NAVER_PRODUCT_HUB_URL}
                target="_blank"
                rel="noreferrer"
                className="research-button research-button--light"
                data-journey-stage="evidence-hub-product-guide"
              >
                큐사랑 상품·자료 문의 준비 <span aria-hidden="true">↗</span>
              </a>
              <small className="research-next-step__source">
                연결되는 네이버 안내에서 제품 표시사항과 문의 순서를 확인할 수 있습니다.
              </small>
            </div>
          </div>
        </section>
      </main>

      <ResearchFooter />
    </div>
  );
}
