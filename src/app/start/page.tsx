import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  NAVER_FIRST_VISIT_HUB_URL,
  NAVER_PRODUCT_HUB_URL,
  NAVER_STARTUP_HUB_URL,
} from "@/lib/site";

const title = "큐사랑 Q-LOVE 목적별 안내";
const description =
  "새치·뿌리염색 상담 준비, 염색방 창업·교육, Q-LOVE 제왕충초 연구·상품 자료를 목적별로 안내합니다.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/start" },
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

export default function ProfileGuidePage() {
  return (
    <div className="profile-guide-page">
      <main className="profile-guide" aria-labelledby="profile-guide-title">
        <header className="profile-guide__header">
          <Link href="/" aria-label="Q-LOVE 연구 아카이브 홈">
            <Image
              src="/q-love-logo-transparent-v2.png"
              alt="Q-LOVE"
              width={570}
              height={222}
              priority
            />
          </Link>
          <p>큐사랑 공식 연결 안내</p>
          <h1 id="profile-guide-title">무엇을 확인하고 계신가요?</h1>
          <span>목적을 선택하면 필요한 안내만 바로 볼 수 있습니다.</span>
        </header>

        <section className="profile-guide__routes" aria-label="목적별 안내">
          <article className="profile-route-card profile-route-card--hair">
            <div className="profile-route-card__number">01</div>
            <div className="profile-route-card__body">
              <p>HAIR COLOR</p>
              <h2>새치·뿌리염색 상담 준비</h2>
              <span>
                처음 방문 전 사진, 최근 시술 이력과 상담 순서를 확인합니다.
              </span>
              <a
                href={NAVER_FIRST_VISIT_HUB_URL}
                target="_blank"
                rel="noreferrer"
                data-journey-stage="profile-guide-first-visit"
              >
                처음 방문 안내 보기 <b aria-hidden="true">↗</b>
              </a>
            </div>
          </article>

          <article className="profile-route-card profile-route-card--startup">
            <div className="profile-route-card__number">02</div>
            <div className="profile-route-card__body">
              <p>STARTUP &amp; EDUCATION</p>
              <h2>염색방 창업·교육 상담</h2>
              <span>
                교육·비용·계약·운영 지원을 상담 전에 질문표로 나눠 봅니다.
              </span>
              <a
                href={NAVER_STARTUP_HUB_URL}
                target="_blank"
                rel="noreferrer"
                data-journey-stage="profile-guide-startup"
              >
                창업 질문표 확인하기 <b aria-hidden="true">↗</b>
              </a>
              <small>
                상담 코드 <strong>BLOG-START-01</strong><br />
                <a href="tel:01033120175">010-3312-0175</a>
                <i aria-hidden="true"> · </i>
                <a href="tel:01096302486">010-9630-2486</a>
              </small>
            </div>
          </article>

          <article className="profile-route-card profile-route-card--research">
            <div className="profile-route-card__number">03</div>
            <div className="profile-route-card__body">
              <p>Q-LOVE RESEARCH &amp; PRODUCT</p>
              <h2>제왕충초 연구·상품 자료</h2>
              <span>
                사람·동물·세포·리뷰 근거와 실제 제품 표시를 구분해 확인합니다.
              </span>
              <div className="profile-route-card__actions">
                <Link
                  href="/evidence"
                  data-journey-stage="profile-guide-evidence"
                >
                  연구 근거 보기 <b aria-hidden="true">→</b>
                </Link>
                <a
                  href={NAVER_PRODUCT_HUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  data-journey-stage="profile-guide-product"
                >
                  상품·자료 문의 준비 <b aria-hidden="true">↗</b>
                </a>
              </div>
            </div>
          </article>
        </section>

        <footer className="profile-guide__footer">
          <p>
            고객용 염색 안내와 창업 상담, 상품 자료 문의를 서로 섞지 않습니다.
          </p>
          <small>
            확인되지 않은 지점·가격·예약을 안내하지 않으며, 연구 자료는 제품
            효능이나 질병 예방·치료 효과를 뜻하지 않습니다.
          </small>
        </footer>
      </main>
    </div>
  );
}
