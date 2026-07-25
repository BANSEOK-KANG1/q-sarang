import Link from "next/link";
import { PageHeader, Panel, StatusBadge, btnPrimary, btnSecondary } from "@/components/ui";
import { papers } from "@/lib/research-data";

export default function DirectorResearchPage() {
  const ready = papers.filter((paper) => paper.presentationReady).length;
  const humanStudies = papers.filter((paper) => paper.evidenceCode === "B").length;

  return (
    <div>
      <PageHeader
        title="연구·발표 관리"
        description="공개 논문 요약을 확인하고, 관리자 전용 발표 화면을 준비합니다."
        actions={
          <Link href="/" className={btnSecondary}>
            공개 아카이브 보기
          </Link>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-line bg-surface px-5 py-4">
          <p className="text-sm text-muted">공개 논문 요약</p>
          <p className="mt-1 text-3xl font-bold tracking-tight">{papers.length}</p>
        </div>
        <div className="rounded-xl border border-line bg-surface px-5 py-4">
          <p className="text-sm text-muted">사람 대상 연구</p>
          <p className="mt-1 text-3xl font-bold tracking-tight">{humanStudies}</p>
        </div>
        <div className="rounded-xl border border-line bg-surface px-5 py-4">
          <p className="text-sm text-muted">발표 준비 완료</p>
          <p className="mt-1 text-3xl font-bold tracking-tight">{ready}</p>
        </div>
      </div>

      <Panel title="논문별 공개 자료와 발표 자료">
        <div className="mb-4 rounded-lg bg-brand-soft px-4 py-3 text-sm leading-6 text-brand">
          발표 모드는 이사 계정으로 로그인한 관리자만 열 수 있습니다.
          공개 사이트에는 발표 메뉴와 발표자 노트가 표시되지 않습니다.
        </div>
        <div className="divide-y divide-line">
          {papers.map((paper) => (
            <article
              key={paper.slug}
              className="grid gap-4 py-5 lg:grid-cols-[minmax(0,1fr)_150px_250px] lg:items-center"
            >
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <StatusBadge label={`${paper.evidenceCode} · ${paper.evidenceLabel}`} tone="brand" />
                  <StatusBadge
                    label={paper.presentationReady ? "발표 준비 완료" : `정리 ${paper.progress}%`}
                    tone={paper.presentationReady ? "ok" : "warn"}
                  />
                </div>
                <h2 className="font-semibold leading-6">{paper.titleKo}</h2>
                <p className="mt-1 text-sm text-muted">
                  {paper.categoryKo} · {paper.year} · {paper.source}
                </p>
              </div>
              <div className="text-sm">
                <p className="text-muted">연구 대상</p>
                <p className="mt-1 font-medium">{paper.subject}</p>
              </div>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                <Link href={`/paper/${paper.slug}`} className={btnSecondary}>
                  공개 요약
                </Link>
                <Link href={`/paper/${paper.slug}/presentation`} className={btnPrimary}>
                  발표 모드
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}
