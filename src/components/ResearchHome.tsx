"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { papers } from "@/lib/research-data";
import { ResearchFooter, ResearchHeader } from "@/components/ResearchShell";

const categories = ["전체", "인공지능", "HCI", "생명과학", "심리학"];

export default function ResearchHome() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [query, setQuery] = useState("");

  const filteredPapers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return papers.filter((paper) => {
      const matchesCategory =
        activeCategory === "전체" || paper.categoryKo === activeCategory;
      const matchesQuery =
        !normalized ||
        [
          paper.title,
          paper.titleKo,
          paper.authors,
          paper.categoryKo,
          ...paper.keywords,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const featured = papers[0];

  return (
    <div className="research-site">
      <ResearchHeader />

      <main>
        <section className="research-hero">
          <div className="research-hero__copy">
            <p className="research-kicker">
              <span />
              O-LOVE Research Note
            </p>
            <h1>
              논문을 읽고,
              <br />
              <em>내 언어로</em> 설명하다.
            </h1>
            <p className="research-hero__description">
              복잡한 연구를 핵심 질문부터 한계까지 차근히 해석합니다.
              <br className="desktop-only" />
              읽는 데서 멈추지 않고, 누군가에게 설명할 수 있을 때까지.
            </p>
            <div className="research-hero__actions">
              <Link href="#library" className="research-button research-button--dark">
                논문 둘러보기 <span aria-hidden="true">↓</span>
              </Link>
              <Link
                href={`/paper/${featured.slug}/presentation`}
                className="research-button research-button--text"
              >
                발표 모드 미리보기 <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className="research-hero__visual" aria-label="논문 정리 과정">
            <div className="orbit orbit--outer" />
            <div className="orbit orbit--inner" />
            <div className="research-hero__center">
              <span>?</span>
              <strong>질문에서<br />이해까지</strong>
            </div>
            <span className="orbit-label orbit-label--one">READ</span>
            <span className="orbit-label orbit-label--two">CONNECT</span>
            <span className="orbit-label orbit-label--three">EXPLAIN</span>
            <div className="orbit-dot orbit-dot--one" />
            <div className="orbit-dot orbit-dot--two" />
          </div>
        </section>

        <section className="research-statement">
          <p>한 편을 읽더라도</p>
          <div>
            <span>핵심 주장</span>
            <i>→</i>
            <span>근거와 방법</span>
            <i>→</i>
            <span>한계와 질문</span>
            <i>→</i>
            <span className="highlight">나의 설명</span>
          </div>
        </section>

        <section className="featured-paper">
          <div className="featured-paper__meta">
            <p className="research-section-label">01 · FEATURED PAPER</p>
            <p>{featured.source}</p>
          </div>
          <div className="featured-paper__main">
            <div>
              <p className="featured-paper__eyebrow">{featured.eyebrow}</p>
              <h2>{featured.titleKo}</h2>
              <p className="featured-paper__title-en">{featured.title}</p>
            </div>
            <div className="featured-paper__summary">
              <p>{featured.thesis}</p>
              <div className="featured-paper__facts">
                <span>{featured.year}</span>
                <span>{featured.readTime} 읽기</span>
                <span>난이도 {featured.difficulty}</span>
              </div>
              <Link href={`/paper/${featured.slug}`} className="research-round-link">
                정리 읽기 <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <div className="featured-paper__insight">
            <span>한 문장으로</span>
            <p>“{featured.quote}”</p>
          </div>
        </section>

        <section className="research-library" id="library">
          <div className="research-section-head">
            <div>
              <p className="research-section-label">02 · RESEARCH LIBRARY</p>
              <h2>천천히 읽고,<br />선명하게 남긴 논문들</h2>
            </div>
            <div className="research-search">
              <label htmlFor="paper-search">논문 검색</label>
              <div>
                <span aria-hidden="true">⌕</span>
                <input
                  id="paper-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="제목, 저자, 키워드 검색"
                />
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

          <div className="paper-grid" aria-live="polite">
            {filteredPapers.map((paper, index) => (
              <article className="paper-card" key={paper.slug}>
                <Link href={`/paper/${paper.slug}`} aria-label={`${paper.titleKo} 읽기`}>
                  <div
                    className="paper-card__cover"
                    style={{ "--paper-accent": paper.accent } as React.CSSProperties}
                  >
                    <div className="paper-card__cover-top">
                      <span>O.{String(index + 1).padStart(2, "0")}</span>
                      <span>{paper.categoryKo}</span>
                    </div>
                    <div className="paper-card__symbol" aria-hidden="true">
                      {paper.category === "AI" && <span className="symbol-grid">✦</span>}
                      {paper.category === "Biology" && <span className="symbol-cell">●</span>}
                      {paper.category === "HCI" && <span className="symbol-wave">∿</span>}
                      {paper.category === "Psychology" && <span className="symbol-choice">Y</span>}
                    </div>
                    <p>{paper.title}</p>
                  </div>
                  <div className="paper-card__body">
                    <div className="paper-card__meta">
                      <span>{paper.source}</span>
                      <span>{paper.year}</span>
                    </div>
                    <h3>{paper.titleKo}</h3>
                    <p>{paper.thesis}</p>
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

        <section className="presentation-section" id="presentation">
          <div className="presentation-section__copy">
            <p className="research-section-label">03 · FROM PAPER TO STAGE</p>
            <h2>읽은 내용을<br />발표의 언어로 바꾸세요.</h2>
            <p>
              논문 정리의 마지막은 ‘내가 이해했다’가 아니라
              ‘다른 사람이 이해하도록 설명했다’입니다.
            </p>
            <ol className="presentation-steps">
              <li><span>01</span><strong>한 문장 주장</strong><p>논문의 결론을 20자로 압축합니다.</p></li>
              <li><span>02</span><strong>근거의 흐름</strong><p>문제–방법–결과를 하나의 서사로 잇습니다.</p></li>
              <li><span>03</span><strong>질문과 한계</strong><p>청중이 함께 생각할 여백을 남깁니다.</p></li>
            </ol>
            <Link href={`/paper/${featured.slug}/presentation`} className="research-button research-button--light">
              발표 모드 열기 <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="presentation-preview">
            <div className="presentation-preview__chrome">
              <span /><span /><span />
              <p>O-LOVE · 발표 노트</p>
            </div>
            <div className="presentation-preview__slide">
              <div className="preview-slide__number">01 / 05</div>
              <p className="preview-slide__label">THE CORE QUESTION</p>
              <h3>서로 다른 생명 분자의<br />만남도 예측할 수 있을까?</h3>
              <div className="preview-slide__diagram">
                <span>PROTEIN</span>
                <i>+</i>
                <span>DNA · RNA</span>
                <i>+</i>
                <span>LIGAND</span>
              </div>
              <p className="preview-slide__note">Space 또는 → 키로 넘기기</p>
            </div>
          </div>
        </section>
      </main>

      <ResearchFooter />
    </div>
  );
}
