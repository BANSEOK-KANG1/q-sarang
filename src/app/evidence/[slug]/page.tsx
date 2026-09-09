import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResearchFooter, ResearchHeader } from "@/components/ResearchShell";
import {
  evidenceCollections,
  getEvidenceCollection,
} from "@/lib/evidence-collections";
import { papers } from "@/lib/research-data";
import {
  absoluteSiteUrl,
  NAVER_PRODUCT_HUB_URL,
  SITE_BRAND_NAME,
} from "@/lib/site";
import { softBreakKo } from "@/lib/typography";

export function generateStaticParams() {
  return evidenceCollections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getEvidenceCollection(slug);
  if (!collection) return { title: "근거 안내를 찾을 수 없습니다", robots: { index: false } };

  return {
    title: collection.title,
    description: collection.description,
    alternates: { canonical: `/evidence/${collection.slug}` },
    keywords: collection.searchTerms,
    openGraph: {
      type: "website",
      url: `/evidence/${collection.slug}`,
      title: collection.title,
      description: collection.description,
      images: [{ url: "/og-q-love.png", alt: collection.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: collection.title,
      description: collection.description,
      images: ["/og-q-love.png"],
    },
  };
}

export default async function EvidenceCollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getEvidenceCollection(slug);
  if (!collection) notFound();

  const selectedPapers = papers.filter((paper) =>
    collection.evidenceCodes.includes(paper.evidenceCode),
  );
  const canonicalUrl = absoluteSiteUrl(`/evidence/${collection.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.title,
    description: collection.description,
    url: canonicalUrl,
    inLanguage: "ko-KR",
    publisher: {
      "@type": "Organization",
      name: SITE_BRAND_NAME,
      url: absoluteSiteUrl("/"),
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: selectedPapers.length,
      itemListElement: selectedPapers.map((paper, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: paper.titleKo,
        url: absoluteSiteUrl(`/paper/${paper.slug}`),
      })),
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Q-LOVE 연구 아카이브", item: absoluteSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "근거 수준", item: absoluteSiteUrl("/evidence") },
      { "@type": "ListItem", position: 3, name: collection.label, item: canonicalUrl },
    ],
  };

  return (
    <div className="research-site evidence-collection-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <ResearchHeader compact />

      <main>
        <section className="methodology-hero evidence-page-hero">
          <div className="paper-detail__breadcrumb">
            <Link href="/">아카이브</Link><span>/</span><Link href="/evidence">근거 수준</Link><span>/</span><span>{collection.label}</span>
          </div>
          <p className="research-kicker"><span />{collection.eyebrow}</p>
          <h1>{softBreakKo(collection.title)}</h1>
          <p>{collection.description}</p>
          <div className="evidence-page-hero__terms" aria-label="관련 검색 표현">
            {collection.searchTerms.map((term) => <span key={term}>#{term.replaceAll(" ", "")}</span>)}
          </div>
        </section>

        <section className="evidence-reading-boundary">
          <div>
            <p className="research-section-label">WHAT IT MEANS</p>
            <h2>이 근거가 말해 주는 것</h2>
            <p>{collection.meaning}</p>
          </div>
          <div>
            <p className="research-section-label">BOUNDARY</p>
            <h2>넘어가지 말아야 할 경계</h2>
            <p>{collection.boundary}</p>
          </div>
          <div>
            <p className="research-section-label">CHECK FIRST</p>
            <h2>읽기 전 세 가지 질문</h2>
            <ol>
              {collection.checks.map((check, index) => (
                <li key={check}><span>{String(index + 1).padStart(2, "0")}</span>{check}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className="research-library evidence-paper-library">
          <div className="research-section-head">
            <div>
              <p className="research-section-label">Q-LOVE CURATED READING</p>
              <h2>{collection.label}<br />논문 요약 {selectedPapers.length}편</h2>
              <p className="research-library__intro">
                제목의 표현보다 연구 대상·재료·설계·한계를 먼저 확인하세요.
              </p>
            </div>
          </div>

          <div className="paper-grid">
            {selectedPapers.map((paper, index) => (
              <article className="paper-card" key={paper.slug}>
                <Link href={`/paper/${paper.slug}`} aria-label={`${paper.titleKo} 읽기`}>
                  <div className="paper-card__cover" style={{ "--paper-accent": paper.accent } as React.CSSProperties}>
                    <Image src={paper.image} alt="" fill sizes="(max-width: 760px) 100vw, (max-width: 1050px) 50vw, 25vw" />
                    <div className="paper-card__cover-top">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span>{paper.evidenceCode} · {paper.evidenceLabel}</span>
                    </div>
                    <p>{paper.title}</p>
                  </div>
                  <div className="paper-card__body">
                    <div className="paper-card__meta"><span>{paper.categoryKo} · {paper.studyType}</span><span>{paper.year}</span></div>
                    <h3>{softBreakKo(paper.titleKo)}</h3>
                    <p>{softBreakKo(paper.thesis)}</p>
                    <div className="paper-card__footer"><span>{paper.readTime} · {paper.difficulty}</span><span className="paper-card__arrow" aria-hidden="true">↗</span></div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="research-next-step evidence-next-step">
          <p className="research-section-label">NEXT STEP</p>
          <div>
            <h2>연구를 읽었다면<br /><em className="research-heading-em">제품 라벨은 따로 확인</em>하세요.</h2>
            <div>
              <p>
                논문의 재료와 실제 제품의 원료 표기는 같다고 가정할 수 없습니다.
                제품명·원료 표기·확인할 질문을 메모한 뒤 큐사랑 안내에서 문의 순서를 확인하세요.
              </p>
              <a href={NAVER_PRODUCT_HUB_URL} target="_blank" rel="noreferrer" className="research-button research-button--light" data-journey-stage={`evidence-${collection.slug}-product-guide`}>
                큐사랑 문의 준비 보기 <span aria-hidden="true">↗</span>
              </a>
              <small className="research-next-step__source">문의할 때 “Q-LOVE 연구 아카이브를 봤다”고 말씀해 주세요.</small>
            </div>
          </div>
        </section>
      </main>

      <ResearchFooter />
    </div>
  );
}
