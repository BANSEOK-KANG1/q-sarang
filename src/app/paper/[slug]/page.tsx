import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResearchFooter, ResearchHeader } from "@/components/ResearchShell";
import { ResearchShareActions } from "@/components/ResearchShareActions";
import { getPaper, papers } from "@/lib/research-data";
import {
  absoluteSiteUrl,
  NAVER_BLOG_URL,
  NAVER_PRODUCT_HUB_URL,
  SITE_BRAND_NAME,
} from "@/lib/site";
import { softBreakKo } from "@/lib/typography";

export function generateStaticParams() {
  return papers.map((paper) => ({ slug: paper.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaper(slug);

  if (!paper) {
    return {
      title: "연구 요약을 찾을 수 없습니다",
      robots: { index: false, follow: false },
    };
  }

  const canonicalPath = `/paper/${paper.slug}`;
  const imageUrl = absoluteSiteUrl(paper.image);

  return {
    title: paper.titleKo,
    description: paper.thesis,
    keywords: [
      "큐사랑",
      "제왕충초",
      "Cordyceps militaris",
      ...paper.keywords,
    ],
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "article",
      url: canonicalPath,
      title: paper.titleKo,
      description: paper.thesis,
      images: [{ url: imageUrl, alt: paper.titleKo }],
    },
    twitter: {
      card: "summary_large_image",
      title: paper.titleKo,
      description: paper.thesis,
      images: [imageUrl],
    },
  };
}

export default async function PaperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) notFound();

  const canonicalUrl = absoluteSiteUrl(`/paper/${paper.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: paper.titleKo,
    alternativeHeadline: paper.title,
    description: paper.thesis,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    image: absoluteSiteUrl(paper.image),
    inLanguage: "ko-KR",
    keywords: paper.keywords.join(", "),
    citation: paper.sourceUrl,
    isBasedOn: paper.sourceUrl,
    author: {
      "@type": "Organization",
      name: SITE_BRAND_NAME,
      url: absoluteSiteUrl("/"),
      sameAs: NAVER_BLOG_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_BRAND_NAME,
      url: absoluteSiteUrl("/"),
      logo: absoluteSiteUrl("/q-love-logo-transparent-v2.png"),
      sameAs: NAVER_BLOG_URL,
    },
    educationalUse: "연구 근거 수준을 구분하는 공개 논문 요약",
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Q-LOVE 연구 아카이브",
        item: absoluteSiteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: paper.titleKo,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <div className="research-site paper-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ResearchHeader compact />

      <main>
        <section
          className="paper-detail__hero"
          style={{ "--paper-accent": paper.accent } as React.CSSProperties}
        >
          <div className="paper-detail__breadcrumb">
            <Link href="/">아카이브</Link><span>/</span><span>{paper.categoryKo}</span>
          </div>
          <div className="paper-detail__hero-grid">
            <div>
              <p className="research-kicker"><span />{paper.eyebrow}</p>
              <h1>{softBreakKo(paper.titleKo)}</h1>
              <p className="paper-detail__english-title">{paper.title}</p>
            </div>
            <div className="paper-detail__citation">
              <dl>
                <div><dt>저자</dt><dd>{paper.authors}</dd></div>
                <div><dt>출처</dt><dd>{paper.source}</dd></div>
                <div><dt>근거</dt><dd>{paper.evidenceCode} · {paper.evidenceLabel}</dd></div>
                <div><dt>설계</dt><dd>{paper.studyType}</dd></div>
                <div><dt>대상</dt><dd>{paper.subject}</dd></div>
                <div><dt>읽기</dt><dd>{paper.year} · {paper.readTime}</dd></div>
              </dl>
              <a href={paper.sourceUrl} target="_blank" rel="noreferrer">
                PubMed에서 원문 정보 확인 <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="paper-detail__tags">
            {paper.keywords.map((keyword) => <span key={keyword}>#{keyword}</span>)}
          </div>
        </section>

        <div className="paper-detail__layout">
          <aside className="paper-toc">
            <p>쉽게 읽는 순서</p>
            <a href="#summary">한눈에 보는 요약</a>
            <a href="#points">세 가지 핵심</a>
            <a href="#method">연구는 어떻게 했나</a>
            <a href="#limits">어디까지 말할 수 있나</a>
          </aside>

          <article className="paper-article">
            <div className="paper-evidence-card">
              <span>{paper.evidenceCode}</span>
              <div>
                <p>이 논문의 근거 수준</p>
                <strong>{paper.evidenceLabel}</strong>
              </div>
              <p>
                {paper.studyType}. 등급은 연구의 좋고 나쁨이 아니라,
                이 결과를 어디까지 설명할 수 있는지 보여줍니다.
              </p>
            </div>

            <section id="summary" className="paper-summary">
              <p className="paper-section-number">01</p>
              <div>
                <p className="paper-section-label">할머니도 읽는 논문 요약</p>
                <h2>
                  복잡한 연구 내용,
                  <br />
                  핵심부터 쉽게 살펴보세요.
                </h2>
                <p className="paper-summary__lead">{softBreakKo(paper.thesis)}</p>
                <p>{softBreakKo(paper.abstract)}</p>
              </div>
            </section>

            <blockquote className="paper-quote">
              <span>Q-LOVE NOTE</span>
              <p>“{softBreakKo(paper.quote)}”</p>
            </blockquote>

            <section id="points" className="paper-content-section">
              <div className="paper-content-section__head">
                <p className="paper-section-number">02</p>
                <div>
                  <p className="paper-section-label">세 가지 핵심</p>
                  <h2>이 논문에서 <em className="research-heading-em">기억할 내용</em></h2>
                </div>
              </div>
              <div className="key-point-list">
                {paper.keyPoints.map((point) => (
                  <div key={point.number}>
                    <span>{point.number}</span>
                    <h3>{softBreakKo(point.title)}</h3>
                    <p>{softBreakKo(point.body)}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="method" className="paper-content-section">
              <div className="paper-content-section__head">
                <p className="paper-section-number">03</p>
                <div>
                  <p className="paper-section-label">연구 방법</p>
                  <h2>
                    누구에게
                    <br />
                    무엇을 시험했을까요?
                  </h2>
                </div>
              </div>
              <div className="method-flow">
                {paper.method.map((item, index) => (
                  <div className="method-flow__item" key={item.label}>
                    <span className="method-flow__index">{String(index + 1).padStart(2, "0")}</span>
                    <p>{item.label}</p>
                    <strong>{item.value}</strong>
                    <small>{item.note}</small>
                  </div>
                ))}
              </div>
            </section>

            <section id="limits" className="paper-content-section">
              <div className="paper-content-section__head">
                <p className="paper-section-number">04</p>
                <div>
                  <p className="paper-section-label">과장하지 않는 읽기</p>
                  <h2>
                    어디까지
                    <br />
                    말할 수 있을까요?
                  </h2>
                </div>
              </div>
              <div className="limits-grid">
                <div>
                  <span>LIMITATION</span>
                  <h3>{softBreakKo("이 결과를 어디까지 믿을 수 있을까?")}</h3>
                  <p>{softBreakKo(paper.limitation)}</p>
                </div>
                <div>
                  <span>OPEN QUESTION</span>
                  <h3>{softBreakKo("함께 이야기해 볼 질문")}</h3>
                  <p>{softBreakKo(paper.question)}</p>
                </div>
              </div>
            </section>

            <section className="public-note">
              <div>
                <p className="paper-section-label">읽기 전 확인</p>
                <h2>
                  이 글은 연구를
                  <br />
                  쉽게 풀어쓴 공개 요약입니다.
                </h2>
              </div>
              <div>
                <p>
                  제품의 효능이나 질병의 예방·치료를 주장하지 않습니다.
                  건강에 관한 결정은 논문 요약만으로 내리지 말고 전문가와 상의해 주세요.
                </p>
                <a href={paper.sourceUrl} target="_blank" rel="noreferrer">
                  원문 정보 확인 <span aria-hidden="true">↗</span>
                </a>
              </div>
            </section>

            <ResearchShareActions title={paper.titleKo} url={canonicalUrl} />

            <section className="paper-inquiry" aria-labelledby="paper-inquiry-title">
              <div>
                <p className="paper-section-label">Q-LOVE NEXT STEP</p>
                <h2 id="paper-inquiry-title">
                  제품 문의 전,
                  <br />
                  라벨과 근거를 나눠 보세요.
                </h2>
              </div>
              <div>
                <p>
                  큐사랑 블로그의 제왕충초 문의 안내에는 제품명·원료 표기·
                  궁금한 점을 정리하는 확인표가 있습니다. 연구 결과를 제품 효능으로
                  단정하지 않고 문의 목적부터 구분합니다.
                </p>
                <a
                  href={NAVER_PRODUCT_HUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  data-journey-stage="paper-product-guide"
                >
                  큐사랑 제왕충초 문의 안내 <span aria-hidden="true">↗</span>
                </a>
                <small className="paper-inquiry__source">
                  문의할 때 “Q-LOVE 연구 아카이브를 봤다”고 말씀해 주세요.
                </small>
              </div>
            </section>
          </article>
        </div>
      </main>

      <ResearchFooter />
    </div>
  );
}
