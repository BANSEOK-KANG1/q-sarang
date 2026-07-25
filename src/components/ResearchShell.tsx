import Link from "next/link";
import Image from "next/image";

export function ResearchHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className={`research-header ${compact ? "research-header--compact" : ""}`}>
      <Link href="/" className="research-brand" aria-label="O-LOVE 홈">
        <span className="research-brand__logo-frame">
          <Image
            src="/olove-logo.png"
            alt="O-LOVE"
            width={570}
            height={222}
            priority
            className="research-brand__logo"
          />
        </span>
      </Link>
      <nav className="research-nav" aria-label="주요 메뉴">
        <Link href="/#library">논문 아카이브</Link>
        <Link href="/#topics">주제별 탐색</Link>
        <Link href="/#presentation">발표 노트</Link>
      </nav>
      <Link href="/#library" className="research-header__cta">
        읽기 시작
        <span aria-hidden="true">↗</span>
      </Link>
    </header>
  );
}

export function ResearchFooter() {
  return (
    <footer className="research-footer">
      <div>
        <p className="research-footer__brand">O-LOVE</p>
        <p>질문을 사랑하는 사람들의 논문 아카이브</p>
      </div>
      <p className="research-footer__note">
        읽은 것을 이해하고,<br />이해한 것을 설명할 수 있도록.
      </p>
      <div className="research-footer__links">
        <Link href="/#library">아카이브</Link>
        <Link href="/#presentation">발표 노트</Link>
        <Link href="/login">관리자</Link>
      </div>
    </footer>
  );
}
