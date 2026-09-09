import type { Metadata } from "next";
import Link from "next/link";
import { ResearchFooter, ResearchHeader } from "@/components/ResearchShell";
import {
  absoluteSiteUrl,
  NAVER_BLOG_URL,
  NAVER_PRODUCT_HUB_URL,
  SITE_BRAND_NAME,
} from "@/lib/site";

const title = "제왕충초·코디세핀 연구를 읽는 기준";
const description =
  "큐사랑 Q-LOVE가 제왕충초 원물·추출물·코디세핀·다당류와 사람·동물·세포·리뷰 근거를 구분해 논문을 정리하는 원칙";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/methodology" },
  openGraph: {
    type: "article",
    url: "/methodology",
    title,
    description,
    images: [
      {
        url: "/research/cordyceps-botanical.webp",
        alt: "Cordyceps militaris와 제왕충초 연구 읽기 기준",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/research/cordyceps-botanical.webp"],
  },
};

const evidenceLevels = [
  {
    code: "B",
    title: "사람 대상 연구",
    body: "사람에게 직접 관찰한 결과이지만 표본 수, 대조군, 기간, 제형이 달라지면 해석 범위도 달라집니다.",
  },
  {
    code: "C",
    title: "동물 연구",
    body: "통제된 조건에서 가능성을 살피는 단계이며 사람의 섭취 결과나 제품 효과로 바로 옮기지 않습니다.",
  },
  {
    code: "D",
    title: "세포 연구",
    body: "작용 경로를 탐색하는 초기 근거입니다. 시험관 농도와 실제 섭취 뒤 몸속 농도는 같지 않습니다.",
  },
  {
    code: "F",
    title: "리뷰 논문",
    body: "여러 연구를 모아 지도를 보여주지만 포함 연구의 질과 차이를 함께 확인해야 합니다.",
  },
];

export default function MethodologyPage() {
  const pageUrl = absoluteSiteUrl("/methodology");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: pageUrl,
    inLanguage: "ko-KR",
    about: [
      { "@type": "Thing", name: "Cordyceps militaris" },
      { "@type": "Thing", name: "코디세핀" },
      { "@type": "Thing", name: "근거 수준" },
    ],
    publisher: {
      "@type": "Organization",
      name: SITE_BRAND_NAME,
      url: absoluteSiteUrl("/"),
      logo: absoluteSiteUrl("/q-love-logo-transparent-v2.png"),
      sameAs: NAVER_BLOG_URL,
    },
  };

  return (
    <div className="research-site methodology-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ResearchHeader compact />

      <main>
        <section className="methodology-hero">
          <p className="research-kicker"><span />Q-LOVE EDITORIAL POLICY</p>
          <h1>제왕충초 연구를<br /><em>어디까지 말할 수 있는지</em><br />먼저 확인합니다.</h1>
          <p>
            논문의 긍정적인 문장만 옮기지 않습니다. 무엇을, 누구에게,
            어떤 조건에서 연구했는지와 확인되지 않은 부분을 같은 비중으로 정리합니다.
          </p>
        </section>

        <article className="methodology-content">
          <section>
            <p className="paper-section-number">01</p>
            <div>
              <p className="paper-section-label">MATERIAL FIRST</p>
              <h2>재료가 다르면<br />같은 연구로 묶지 않습니다.</h2>
              <p>
                제왕충초 원물, 전체 추출물, 코디세핀, 다당류는 같은 말이 아닙니다.
                배양·추출·정제 방식도 결과를 바꿀 수 있어 논문에 적힌 재료와 조건을
                먼저 표시합니다.
              </p>
              <ul>
                <li><strong>원물</strong><span>균사체·자실체 등 연구 대상의 실제 형태</span></li>
                <li><strong>추출물</strong><span>물·알코올 등 추출 조건과 농축 방식</span></li>
                <li><strong>코디세핀</strong><span>분리 성분 또는 표준화된 시험 물질</span></li>
                <li><strong>다당류</strong><span>구조와 분자량이 서로 다른 물질군</span></li>
              </ul>
            </div>
          </section>

          <section>
            <p className="paper-section-number">02</p>
            <div>
              <p className="paper-section-label">EVIDENCE LEVEL</p>
              <h2>연구 대상에 따라<br />해석의 경계를 나눕니다.</h2>
              <div className="methodology-evidence-grid">
                {evidenceLevels.map((level) => (
                  <div key={level.code}>
                    <span>{level.code}</span>
                    <h3>{level.title}</h3>
                    <p>{level.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <p className="paper-section-number">03</p>
            <div>
              <p className="paper-section-label">SOURCE CHECK</p>
              <h2>제목이 아니라<br />원 논문 정보로 돌아갑니다.</h2>
              <p>
                요약마다 PubMed 등 확인 가능한 원문 정보 링크를 둡니다. 제목, 연구
                설계, 대상, 비교군, 기간, 핵심 결과와 한계를 대조하고, 초록만으로
                확인할 수 없는 내용은 추정해 채우지 않습니다.
              </p>
              <Link href="/#library" className="research-button research-button--light">
                연구 데이터베이스 보기 <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </section>

          <section>
            <p className="paper-section-number">04</p>
            <div>
              <p className="paper-section-label">BOUNDARY & CORRECTION</p>
              <h2>연구 요약과<br />제품 효능을 구분합니다.</h2>
              <p>
                이 아카이브는 교육용 공개 자료입니다. 특정 제품의 효능이나 질병의
                예방·치료 효과를 주장하지 않습니다. 원문 정보나 해석에 수정이 필요하면
                확인 가능한 출처를 기준으로 고치고, 상품 문의는 제품명·라벨·문의 목적을
                먼저 정리하도록 안내합니다.
              </p>
              <a
                href={NAVER_PRODUCT_HUB_URL}
                target="_blank"
                rel="noreferrer"
                className="research-button research-button--light"
              >
                큐사랑 제왕충초 문의 안내 <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>
        </article>
      </main>

      <ResearchFooter />
    </div>
  );
}
