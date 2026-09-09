"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { ResearchPaper } from "@/lib/research-data";

export default function PresentationMode({ paper }: { paper: ResearchPaper }) {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      label: "THE CORE QUESTION",
      title: paper.question,
      body: "이 질문에서 논문 읽기를 시작합니다.",
      type: "question",
    },
    {
      label: "ONE SENTENCE",
      title: paper.thesis,
      body: paper.quote,
      type: "thesis",
    },
    {
      label: "THREE INSIGHTS",
      title: "우리가 얻는 세 가지 인사이트",
      body: paper.keyPoints,
      type: "points",
    },
    {
      label: "RESEARCH APPROACH",
      title: "논문의 접근법",
      body: paper.method,
      type: "method",
    },
    {
      label: "DISCUSSION",
      title: "결론보다 좋은 질문을 남기기",
      body: paper.limitation,
      type: "discussion",
    },
  ];

  const previous = useCallback(
    () => setCurrent((value) => Math.max(0, value - 1)),
    [],
  );
  const next = useCallback(
    () => setCurrent((value) => Math.min(slides.length - 1, value + 1)),
    [slides.length],
  );

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        next();
      }
      if (event.key === "ArrowLeft") previous();
      if (event.key === "Home") setCurrent(0);
      if (event.key === "End") setCurrent(slides.length - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, previous, slides.length]);

  const slide = slides[current];

  return (
    <main
      className="presentation-mode"
      style={{ "--paper-accent": paper.accent } as React.CSSProperties}
    >
      <header className="presentation-mode__header">
        <Link href={`/paper/${paper.slug}`} className="presentation-mode__exit">
          <span aria-hidden="true">←</span> 정리로 돌아가기
        </Link>
        <div className="presentation-mode__brand">Q-LOVE <span>발표 노트</span></div>
        <div className="presentation-mode__count">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>
      </header>

      <section className={`presentation-slide presentation-slide--${slide.type}`}>
        <p className="presentation-slide__label">{slide.label}</p>
        {slide.type === "question" && (
          <div className="presentation-slide__question">
            <span>?</span>
            <h1>{slide.title}</h1>
            <p>{slide.body as string}</p>
          </div>
        )}
        {slide.type === "thesis" && (
          <div className="presentation-slide__thesis">
            <p>이 논문을 한 문장으로 설명하면</p>
            <h1>{slide.title}</h1>
            <blockquote>“{slide.body as string}”</blockquote>
          </div>
        )}
        {slide.type === "points" && (
          <div className="presentation-slide__points">
            <h1>{slide.title}</h1>
            <div>
              {(slide.body as ResearchPaper["keyPoints"]).map((point) => (
                <article key={point.number}>
                  <span>{point.number}</span>
                  <h2>{point.title}</h2>
                  <p>{point.body}</p>
                </article>
              ))}
            </div>
          </div>
        )}
        {slide.type === "method" && (
          <div className="presentation-slide__method">
            <h1>{slide.title}</h1>
            <div>
              {(slide.body as ResearchPaper["method"]).map((item, index) => (
                <article key={item.label}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <small>{item.label}</small>
                  <strong>{item.value}</strong>
                  <p>{item.note}</p>
                </article>
              ))}
            </div>
          </div>
        )}
        {slide.type === "discussion" && (
          <div className="presentation-slide__discussion">
            <p>LIMITATION</p>
            <h1>{slide.title}</h1>
            <blockquote>{slide.body as string}</blockquote>
            <div>
              <span>함께 이야기할 질문</span>
              <strong>{paper.question}</strong>
            </div>
          </div>
        )}
      </section>

      <footer className="presentation-mode__footer">
        <p>← → 키 또는 Space로 슬라이드를 넘겨보세요</p>
        <div className="presentation-mode__progress">
          {slides.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setCurrent(index)}
              className={index === current ? "active" : ""}
              aria-label={`${index + 1}번 슬라이드로 이동`}
            />
          ))}
        </div>
        <div className="presentation-mode__controls">
          <button type="button" onClick={previous} disabled={current === 0} aria-label="이전 슬라이드">←</button>
          <button type="button" onClick={next} disabled={current === slides.length - 1} aria-label="다음 슬라이드">→</button>
        </div>
      </footer>
    </main>
  );
}
