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
                <div><dt>발행</dt><dd>{paper.year}</dd></div>
                <div><dt>읽기</dt><dd>{paper.readTime} · {paper.difficulty}</dd></div>
              </dl>
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
            <a href="#points">핵심 발견</a>
            <a href="#method">연구 방법</a>
            <a href="#limits">한계와 질문</a>
            <a href="#speaker-note">발표자 노트</a>
            <Link href={`/paper/${paper.slug}/presentation`} className="paper-toc__presentation">
              <span>▶</span>
              발표 모드
            </Link>
          </aside>

          <article className="paper-article">
            <section id="summary" className="paper-summary">
              <p className="paper-section-number">01</p>
              <div>
                <p className="paper-section-label">3문장 요약</p>
                <h2>먼저, 이것만 알고 가세요.</h2>
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
                  <p className="paper-section-label">핵심 발견</p>
                  <h2>무엇이 달라졌을까요?</h2>
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
                  <p className="paper-section-label">연구 방법</p>
                  <h2>주장을 어떻게 확인했을까요?</h2>
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

            <section id="speaker-note" className="speaker-note">
              <div>
                <p className="paper-section-label">발표자 노트</p>
                <h2>5장의 슬라이드로<br />이 논문을 설명해 보세요.</h2>
              </div>
              <div>
                <p>
                  핵심 질문, 기존 방식의 한계, 새로운 접근, 결과, 토론 질문까지
                  발표 흐름을 자동으로 구성해 두었습니다.
                </p>
                <Link href={`/paper/${paper.slug}/presentation`}>
                  발표 모드 시작 <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </section>
          </article>
        </div>
      </main>

      <ResearchFooter />
    </div>
  );
}
