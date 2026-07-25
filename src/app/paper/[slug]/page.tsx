import Link from "next/link";
import { notFound } from "next/navigation";
import { ResearchFooter, ResearchHeader } from "@/components/ResearchShell";
import { getPaper, papers } from "@/lib/research-data";

export function generateStaticParams() {
  return papers.map((paper) => ({ slug: paper.slug }));
}

export default async function PaperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) notFound();

  return (
    <div className="research-site paper-detail">
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
              <h1>{paper.titleKo}</h1>
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
            <p>이 글의 순서</p>
            <a href="#summary">3문장 요약</a>
            <a href="#points">우리가 얻는 인사이트</a>
            <a href="#method">논문의 접근법</a>
            <a href="#limits">한계와 질문</a>
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
                <p className="paper-section-label">3문장 요약</p>
                <h2>초록보다 먼저, 이것만 알고 가세요.</h2>
                <p className="paper-summary__lead">{paper.thesis}</p>
                <p>{paper.abstract}</p>
              </div>
            </section>

            <blockquote className="paper-quote">
              <span>O-LOVE NOTE</span>
              <p>“{paper.quote}”</p>
            </blockquote>

            <section id="points" className="paper-content-section">
              <div className="paper-content-section__head">
                <p className="paper-section-number">02</p>
                <div>
                  <p className="paper-section-label">우리가 얻는 인사이트</p>
                  <h2>이 논문을 통해 무엇을 배울까요?</h2>
                </div>
              </div>
              <div className="key-point-list">
                {paper.keyPoints.map((point) => (
                  <div key={point.number}>
                    <span>{point.number}</span>
                    <h3>{point.title}</h3>
                    <p>{point.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="method" className="paper-content-section">
              <div className="paper-content-section__head">
                <p className="paper-section-number">03</p>
                <div>
                  <p className="paper-section-label">논문의 접근법</p>
                  <h2>이 질문에 어떻게 접근했을까요?</h2>
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
                  <p className="paper-section-label">한계와 질문</p>
                  <h2>논문 밖에서 다시 생각하기</h2>
                </div>
              </div>
              <div className="limits-grid">
                <div>
                  <span>LIMITATION</span>
                  <h3>이 결과를 어디까지 믿을 수 있을까?</h3>
                  <p>{paper.limitation}</p>
                </div>
                <div>
                  <span>OPEN QUESTION</span>
                  <h3>함께 이야기해 볼 질문</h3>
                  <p>{paper.question}</p>
                </div>
              </div>
            </section>

            <section className="public-note">
              <div>
                <p className="paper-section-label">읽기 전 확인</p>
                <h2>이 글은 연구를<br />쉽게 풀어쓴 공개 요약입니다.</h2>
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
          </article>
        </div>
      </main>

      <ResearchFooter />
    </div>
  );
}
