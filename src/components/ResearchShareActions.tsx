"use client";

import { useState } from "react";

export function ResearchShareActions({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [status, setStatus] = useState("");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("주소를 복사했습니다.");
    } catch {
      setStatus("주소를 길게 눌러 복사해 주세요.");
    }
  }

  async function shareLink() {
    if (!navigator.share) {
      await copyLink();
      return;
    }

    try {
      await navigator.share({ title, text: `${title} · Q-LOVE 연구 아카이브`, url });
      setStatus("공유 창을 열었습니다.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      await copyLink();
    }
  }

  return (
    <section className="paper-share" aria-labelledby="paper-share-title">
      <div>
        <p className="paper-section-label">Q-LOVE SHARE</p>
        <h2 id="paper-share-title">필요한 분께 연구 요약을 공유하세요.</h2>
        <p>제목과 근거 수준, 연구 한계를 그대로 확인할 수 있는 현재 페이지를 전달합니다.</p>
      </div>
      <div className="paper-share__actions">
        <button type="button" onClick={shareLink}>공유하기</button>
        <button type="button" onClick={copyLink}>주소 복사</button>
      </div>
      <p className="paper-share__status" role="status" aria-live="polite">{status}</p>
    </section>
  );
}
