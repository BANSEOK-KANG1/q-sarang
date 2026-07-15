import {
  approveOwnerAction,
  rejectOwnerAction,
} from "@/lib/db/actions";
import { getSession } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { APPROVAL_STATUS_LABEL } from "@/lib/domain/types";
import {
  EmptyState,
  PageHeader,
  Panel,
  StatusBadge,
  btnPrimary,
  btnSecondary,
} from "@/components/ui";

export default async function DirectorApprovalsPage() {
  const session = await getSession();
  const directorId = session!.directorId!;
  const db = getDb();
  const [pending, managers] = await Promise.all([
    db.listOwners({ directorId, approvalStatus: "pending" }),
    db.listManagers(directorId),
  ]);
  const managerMap = Object.fromEntries(managers.map((m) => [m.id, m]));

  return (
    <div>
      <PageHeader
        title="원장 승인"
        description="본부장이 등록한 원장은 이사 승인 후 로그인이 가능합니다."
      />
      <Panel>
        {pending.length === 0 ? (
          <EmptyState message="승인 대기 중인 원장이 없습니다." />
        ) : (
          <ul className="space-y-4">
            {pending.map((owner) => (
              <li
                key={owner.id}
                className="rounded-lg border border-line p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{owner.name}</p>
                  <StatusBadge
                    label={APPROVAL_STATUS_LABEL[owner.approvalStatus]}
                    tone="warn"
                  />
                </div>
                <p className="mt-1 text-sm text-muted">
                  로그인 ID: {owner.loginId} · 연락처: {owner.phone}
                </p>
                <p className="text-sm text-muted">
                  신청 본부장:{" "}
                  {managerMap[owner.managerId]?.name ?? owner.managerId}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <form action={approveOwnerAction}>
                    <input type="hidden" name="id" value={owner.id} />
                    <button type="submit" className={btnPrimary}>
                      승인
                    </button>
                  </form>
                  <form action={rejectOwnerAction}>
                    <input type="hidden" name="id" value={owner.id} />
                    <button type="submit" className={btnSecondary}>
                      반려
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
