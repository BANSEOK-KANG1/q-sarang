"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { evidenceGuide, papers } from "@/lib/research-data";
import { ResearchFooter, ResearchHeader } from "@/components/ResearchShell";
import { NAVER_PRODUCT_HUB_URL } from "@/lib/site";
import { softBreakKo } from "@/lib/typography";

const evidenceCollectionPath: Record<string, string> = {
  B: "/evidence/human-studies",
  C: "/evidence/preclinical-studies",
  D: "/evidence/preclinical-studies",
  F: "/evidence/reviews",
};

const categories = [
  "전체",
  "면역",
  "피로·운동",
  "항산화·에너지",
  "대사·흡수",
  "수면·사람 연구",
  "순환·혈소판",
];

export default function ResearchHome() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [query, setQuery] = useState("");

  const filteredPapers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return papers
      .filter((paper) => {
        const matchesCategory =
          activeCategory === "전체" || paper.categoryKo === activeCategory;
        const matchesQuery =
          !normalized ||
          [
            paper.title,
            paper.titleKo,
            paper.authors,
            paper.categoryKo,
            paper.studyType,
            paper.evidenceLabel,
            ...paper.keywords,
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalized);
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => Number(b.year) - Number(a.year));
  }, [activeCategory, query]);

  const featured = papers[0];
  const humanStudyCount = papers.filter(
    (paper) => paper.evidenceCode === "B",
  ).length;

  return (
    <div className="research-site">
      <ResearchHeader />

      <main>
        <section className="research-hero">
          <div className="research-hero__copy">
            <p className="research-kicker">
              <span />
              Cordyceps militaris · Evidence archive
            </p>
            <h1>
              코디세핀 연구를
              <br />
              <em>쉽게 읽고</em>
              <br />
              정확히 말하다.
            </h1>
            <p className="research-hero__description">
              어려운 초록을 그대로 옮기지 않고,{" "}
              <strong className="research-em">무엇을 누구에게 연구했는지</strong>
              부터 풀어씁니다.
              <br className="desktop-only" />
              기대되는 가능성뿐 아니라{" "}
              <strong className="research-em">한계와 확인되지 않은 결과</strong>
              도 함께 보여드립니다.
            </p>
            <p className="research-hero__promise">
              교육용 공개 자료 · 제품 효능이나 치료 효과를 주장하지 않습니다
            </p>
            <div className="research-hero__actions">
              <Link href="#library" className="research-button research-button--dark">
                연구 데이터베이스 <span aria-hidden="true">↓</span>
              </Link>
              <Link
                href="#reading-guide"
                className="research-button research-button--text"
              >
                처음 읽는 분께 <span aria-hidden="true">↓</span>
              </Link>
              <a
                href={NAVER_PRODUCT_HUB_URL}
                target="_blank"
                rel="noreferrer"
                className="research-button research-button--text"
                data-journey-stage="hero-product-guide"
              >
                큐사랑 문의 안내 <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <figure className="research-hero__visual" aria-label="Cordyceps militaris 제왕충초">
            <Image
              src="/research/cordyceps-hero.webp"
              alt="Cordyceps militaris 자실체 클로즈업"
              fill
              priority
              sizes="(max-width: 760px) 90vw, 42vw"
            />
            <figcaption>
              <span>CORDYCEPS MILITARIS</span>
              <p>
                이름을 정확히 쓰는 것에서
                <br />
                연구 해석이 시작됩니다.
              </p>
            </figcaption>
          </figure>
        </section>

        <section className="research-statement">
          <p>복잡한 논문을 누구나 이해할 수 있는 공개 자료로</p>
          <div>
            <span>연구 질문</span>
            <i>→</i>
            <span>연구 대상</span>
            <i>→</i>
            <span>관찰 결과</span>
            <i>→</i>
            <span className="highlight">쉬운 해석</span>
          </div>
        </section>

        <section
          className="research-intent-path"
          id="journey"
          aria-labelledby="research-intent-path-title"
        >
          <div className="research-intent-path__intro">
            <p className="research-section-label">Q-LOVE RESEARCH JOURNEY</p>
            <h2 id="research-intent-path-title">
              찾고 싶은 답에 따라
              <br />
              <em>다음 화면을 선택하세요.</em>
            </h2>
            <p>
              검색으로 들어온 뒤 무엇을 봐야 할지 헤매지 않도록 근거 확인부터
              제품 문의 준비까지 세 단계로 나눴습니다.
            </p>
          </div>
          <ol className="research-intent-path__steps">
            <li>
              <span>01</span>
              <div>
                <strong>근거 단계를 먼저 구분</strong>
                <p>사람·동물·세포·리뷰가 답하는 질문의 범위를 확인합니다.</p>
                <Link href="/evidence">근거 지도 보기 <i aria-hidden="true">↗</i></Link>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>요약과 원문을 함께 확인</strong>
                <p>연구 대상·관찰 결과·한계를 같은 순서로 비교합니다.</p>
                <Link href="#library">논문 목록 보기 <i aria-hidden="true">↓</i></Link>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>제품 라벨과 문의를 따로 준비</strong>
                <p>제품명·원료 표기·확인할 질문을 메모한 뒤 안내를 확인합니다.</p>
                <a
                  href={NAVER_PRODUCT_HUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  data-journey-stage="intent-product-guide"
                >
                  큐사랑 문의 준비 <i aria-hidden="true">↗</i>
                </a>
              </div>
            </li>
          </ol>
        </section>

        <section className="featured-paper">
          <div className="featured-paper__meta">
            <p className="research-section-label">01 · FEATURED PAPER</p>
            <p>{featured.source}</p>
          </div>
          <div className="featured-paper__main">
            <div>
              <p className="featured-paper__eyebrow">{featured.eyebrow} · {featured.evidenceCode} 등급</p>
              <h2>{softBreakKo(featured.titleKo)}</h2>
              <p className="featured-paper__title-en">{featured.title}</p>
            </div>
            <div className="featured-paper__summary">
              <p>{softBreakKo(featured.thesis)}</p>
              <div className="featured-paper__facts">
                <span>{featured.year}</span>
                <span>{featured.evidenceLabel}</span>
                <span>{featured.studyType}</span>
              </div>
              <Link href={`/paper/${featured.slug}`} className="research-round-link">
                정리 읽기 <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <div className="featured-paper__insight">
            <span>쉽게 말하면</span>
            <p>“{softBreakKo(featured.quote)}”</p>
          </div>
        </section>

        <section className="evidence-dashboard" id="evidence">
          <div className="evidence-dashboard__intro">
            <p className="research-section-label">02 · EVIDENCE MAP</p>
            <h2>
              제목보다 먼저,
              <br />
              <em className="research-heading-em">근거의 단계</em>를 봅니다.
            </h2>
            <p>
              같은 ‘제왕충초 연구’라도{" "}
              <strong className="research-em">사람·동물·세포·리뷰</strong>는
              서로 다른 질문에 답합니다.
              {" "}등급은 좋고 나쁨이 아니라,{" "}
              <strong className="research-em">어디까지 말할 수 있는지</strong>를
              보여주는 안내입니다.
            </p>
          </div>
          <div className="evidence-dashboard__stats">
            <div><strong>{papers.length}</strong><span>공개 논문 요약</span><small>PubMed 원문 링크 포함</small></div>
            <div><strong>{humanStudyCount}</strong><span>사람 대상 연구</span><small>무작위 연구 별도 표시</small></div>
            <div><strong>100%</strong><span>근거 단계 표시</span><small>사람 · 동물 · 세포 · 리뷰</small></div>
          </div>
          <div className="evidence-guide">
            {evidenceGuide.map((item) => (
              <Link href={evidenceCollectionPath[item.code]} key={item.code}>
                <strong>{item.code}</strong>
                <span>{item.label}</span>
                <small>{item.note}</small>
                <i aria-hidden="true">↗</i>
              </Link>
            ))}
          </div>
          <div className="source-network">
            <div>
              <p className="research-section-label">SOURCE COVERAGE</p>
              <strong>
                한 곳의 번역 결과가 아니라,
                <br />
                여러 학술 데이터로 교차 확인합니다.
              </strong>
            </div>
            <ul>
              <li><span>01</span><strong>PubMed</strong><small>PMID · 초록 · 의생명 문헌</small></li>
              <li><span>02</span><strong>Europe PMC</strong><small>오픈액세스 원문 · Figure</small></li>
              <li><span>03</span><strong>OpenAlex</strong><small>인용 · 개념 · 연구 연결망</small></li>
              <li><span>04</span><strong>Crossref</strong><small>DOI · 저널 · 출판 메타데이터</small></li>
            </ul>
          </div>
        </section>

        <section className="research-library" id="library">
          <div className="research-section-head">
            <div>
              <p className="research-section-label">03 · RESEARCH DATABASE</p>
            <h2>
              주제와 근거 수준으로
              <br />
              찾는 제왕충초 논문
            </h2>
            <p className="research-library__intro">
              코디세핀을 중심으로{" "}
              <strong className="research-em">사람·동물·세포·리뷰</strong> 논문을
              한 형식으로 비교합니다.
            </p>
            </div>
            <div className="research-search">
              <label htmlFor="paper-search">논문 검색</label>
              <div>
                <span aria-hidden="true">⌕</span>
                <input
                  id="paper-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="제목, 성분, 연구 설계 검색"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="검색어 지우기"
                  >
                    지우기
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="research-filters" id="topics" aria-label="주제 필터">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <p className="research-result-count">
            {activeCategory === "전체" ? "전체 주제" : activeCategory} ·{" "}
            <strong>{filteredPapers.length}편</strong>
          </p>

          <div className="paper-grid" aria-live="polite">
            {filteredPapers.map((paper, index) => (
              <article className="paper-card" key={paper.slug}>
                <Link href={`/paper/${paper.slug}`} aria-label={`${paper.titleKo} 읽기`}>
                  <div
                    className="paper-card__cover"
                    style={{ "--paper-accent": paper.accent } as React.CSSProperties}
                  >
                    <Image
                      src={paper.image}
                      alt=""
                      fill
                      sizes="(max-width: 760px) 100vw, (max-width: 1050px) 50vw, 25vw"
                    />
                    <div className="paper-card__cover-top">
                      <span>Q.{String(index + 1).padStart(2, "0")}</span>
                      <span>{paper.evidenceCode} · {paper.evidenceLabel}</span>
                    </div>
                    <p>{paper.title}</p>
                  </div>
                  <div className="paper-card__body">
                    <div className="paper-card__meta">
                      <span>{paper.categoryKo} · {paper.studyType}</span>
                      <span>{paper.year}</span>
                    </div>
                    <h3>{softBreakKo(paper.titleKo)}</h3>
                    <p>{softBreakKo(paper.thesis)}</p>
                    <div className="paper-card__footer">
                      <span>{paper.readTime} · {paper.difficulty}</span>
                      <span className="paper-card__arrow" aria-hidden="true">↗</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {filteredPapers.length === 0 && (
            <div className="research-empty">
              <strong>아직 정리된 논문이 없어요.</strong>
              <p>검색어를 바꾸거나 다른 주제를 선택해 보세요.</p>
            </div>
          )}
        </section>

        <section className="public-reading-guide" id="reading-guide">
          <div className="public-reading-guide__copy">
            <p className="research-section-label">04 · HOW TO READ</p>
            <h2>
              논문을 처음 봐도
              <br />
              <em className="research-heading-em">세 가지만</em> 확인하세요.
            </h2>
            <p>
              제목의 ‘효능’보다{" "}
              <strong className="research-em">연구 대상</strong>을 먼저 보면
              과장을 피할 수 있습니다.
              {" "}모든 요약은 같은 순서로 정리해 쉽게 비교할 수 있게 만들었습니다.
            </p>
            <ol className="public-reading-guide__steps">
              <li><span>01</span><strong>무엇을 연구했나요?</strong><p>제왕충초 원물, 추출물, 코디세핀은 서로 다른 재료입니다.</p></li>
              <li><span>02</span><strong>누구에게 시험했나요?</strong><p>사람, 동물, 세포 중 어디에서 관찰한 결과인지 먼저 봅니다.</p></li>
              <li><span>03</span><strong>어디까지 말할 수 있나요?</strong><p>관찰된 결과와 아직 확인되지 않은 내용을 함께 읽습니다.</p></li>
            </ol>
            <Link href="/paper/cordyceps-sleep-negative-trial" className="research-button research-button--light">
              가장 쉬운 사람 연구 보기 <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="public-reading-card">
            <p className="public-reading-card__label">한눈에 읽는 근거 카드</p>
            <div className="public-reading-card__grade">
              <strong>B</strong>
              <div>
                <span>사람 대상 무작위 연구</span>
                <small>직접 관찰했지만 표본·제형·기간을 함께 확인</small>
              </div>
            </div>
            <div className="public-reading-card__question">
              <span>이 연구가 답한 질문</span>
              <h3>
                제왕충초를 더했을 때
                <br />
                수면 지표가 달라졌을까?
              </h3>
              <p>
                결과:{" "}
                <strong>위약군보다 뚜렷한 개선은 확인되지 않았습니다.</strong>
              </p>
            </div>
            <div className="public-reading-card__boundary">
              <span>여기까지만 말할 수 있어요</span>
              <p>특정 환자군의 6주 연구 결과이며, 모든 수면 문제나 다른 제형에 일반화할 수 없습니다.</p>
            </div>
          </div>
        </section>

        <section className="research-next-step" aria-labelledby="research-next-step-title">
          <p className="research-section-label">05 · Q-LOVE GUIDE</p>
          <div>
            <h2 id="research-next-step-title">
              연구를 읽은 다음은
              <br />
              <em className="research-heading-em">문의 목적을 정리할 차례</em>입니다.
            </h2>
            <div>
              <p>
                제품명, 원료 표기, 확인하고 싶은 내용을 메모하면 연구와 제품 정보를
                섞지 않고 질문할 수 있습니다. 큐사랑 블로그의 라벨·근거 확인표에서
                문의 준비 순서를 확인하세요.
              </p>
              <a
                href={NAVER_PRODUCT_HUB_URL}
                target="_blank"
                rel="noreferrer"
                className="research-button research-button--light"
                data-journey-stage="footer-product-guide"
              >
                제왕충초 문의 안내 보기 <span aria-hidden="true">↗</span>
              </a>
              <small className="research-next-step__source">
                문의할 때 “Q-LOVE 연구 아카이브를 봤다”고 말씀해 주세요.
              </small>
            </div>
          </div>
        </section>
      </main>

      <ResearchFooter />
    </div>
  );
}
