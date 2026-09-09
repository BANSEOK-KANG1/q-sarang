import Link from "next/link";
import Image from "next/image";
import { NAVER_PRODUCT_HUB_URL } from "@/lib/site";

export function ResearchHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className={`research-header ${compact ? "research-header--compact" : ""}`}>
      <Link href="/" className="research-brand" aria-label="Q-LOVE 홈">
        <span className="research-brand__logo-frame">
          <Image
            src="/q-love-logo-transparent-v2.png"
            alt="Q-LOVE"
            width={570}
            height={222}
            priority
            className="research-brand__logo"
          />
        </span>
        <span className="research-brand__sub">큐사랑 · 제왕충초 연구 아카이브</span>
      </Link>
      <nav className="research-nav" aria-label="주요 메뉴">
        <Link href="/#journey">이용 안내</Link>
        <Link href="/#library">연구 데이터베이스</Link>
        <Link href="/evidence">근거 수준</Link>
        <Link href="/methodology">연구 원칙</Link>
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
        <p className="research-footer__brand">Q-LOVE</p>
        <p>큐사랑 · 제왕충초 연구 아카이브</p>
      </div>
      <p className="research-footer__note">
        논문을 과장 없이 읽고,
        <br />
        근거의 단계까지 설명할 수 있도록.
      </p>
      <div className="research-footer__links">
        <Link href="/#library">아카이브</Link>
        <Link href="/methodology">연구 원칙</Link>
        <a href={NAVER_PRODUCT_HUB_URL} target="_blank" rel="noreferrer">
          큐사랑 문의
        </a>
        <Link href="/login">관리자</Link>
      </div>
    </footer>
  );
}
