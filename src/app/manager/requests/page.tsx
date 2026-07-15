import { replyContactRequestAction } from "@/lib/db/actions";
import { getSession } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { CONTACT_STATUS_LABEL } from "@/lib/domain/types";
import {
  EmptyState,
  PageHeader,
  Panel,
  StatusBadge,
  btnPrimary,
  inputClass,
} from "@/components/ui";

export default async function ManagerRequestsPage() {
  const session = await getSession();
  const db = getDb();
  const [requests, owners] = await Promise.all([
    db.listContactRequests({ targetUserId: session!.userId }),
    db.listOwners({ managerId: session!.managerId }),
  ]);
  const ownerMap = Object.fromEntries(owners.map((o) => [o.id, o]));

  return (
    <div>
      <PageHeader
        title="연락 요청"
        description="산하 원장이 본부장에게 보낸 요청에 답변합니다."
      />
      <div className="space-y-4">
        {requests.length === 0 ? (
          <Panel>
            <EmptyState message="요청이 없습니다." />
          </Panel>
        ) : (
          requests.map((req) => (
            <Panel key={req.id}>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">{req.subject}</p>
                <StatusBadge
                  label={CONTACT_STATUS_LABEL[req.status]}
                  tone={req.status === "pending" ? "warn" : "ok"}
                />
              </div>
              <p className="mt-1 text-sm text-muted">
                {ownerMap[req.fromOwnerId]?.name ?? req.fromOwnerId} ·{" "}
                {new Date(req.createdAt).toLocaleString("ko-KR")}
              </p>
              <p className="mt-3 whitespace-pre-wrap text-sm">{req.body}</p>
              {req.status === "replied" ? (
                <div className="mt-3 rounded-lg bg-brand-soft p-3 text-sm">
                  <p className="text-xs text-muted">답변</p>
                  <p className="mt-1">{req.reply}</p>
                </div>
              ) : (
                <form
                  action={replyContactRequestAction}
                  className="mt-4 space-y-2"
                >
                  <input type="hidden" name="id" value={req.id} />
                  <textarea
                    name="reply"
                    className={inputClass}
                    rows={3}
                    required
                    placeholder="답변을 입력하세요"
                  />
                  <button type="submit" className={btnPrimary}>
                    답변 보내기
                  </button>
                </form>
              )}
            </Panel>
          ))
        )}
      </div>
    </div>
  );
}
