import { createContactRequestAction } from "@/lib/db/actions";
import { getSession } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import {
  CONTACT_STATUS_LABEL,
  ROLE_LABEL,
} from "@/lib/domain/types";
import {
  EmptyState,
  Field,
  PageHeader,
  Panel,
  StatusBadge,
  btnPrimary,
  inputClass,
} from "@/components/ui";

export default async function OwnerRequestsPage() {
  const session = await getSession();
  const ownerId = session!.ownerId!;
  const db = getDb();
  const [{ manager, director }, requests] = await Promise.all([
    db.getOwnerUpline(ownerId),
    db.listContactRequests({ fromOwnerId: ownerId }),
  ]);

  return (
    <div>
      <PageHeader
        title="상급자 연락 요청"
        description="본부장·이사에게 문의·요청을 보냅니다."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-surface px-5 py-4">
          <p className="text-xs text-muted">소속 본부장</p>
          <p className="mt-1 font-semibold">{manager?.name ?? "—"}</p>
          <p className="text-sm text-muted">{manager?.phone}</p>
        </div>
        <div className="rounded-xl border border-line bg-surface px-5 py-4">
          <p className="text-xs text-muted">이사</p>
          <p className="mt-1 font-semibold">{director?.name ?? "—"}</p>
          <p className="text-sm text-muted">{director?.phone}</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Panel title="내 요청 내역">
          {requests.length === 0 ? (
            <EmptyState message="보낸 요청이 없습니다." />
          ) : (
            <ul className="space-y-4">
              {requests.map((req) => (
                <li
                  key={req.id}
                  className="rounded-lg border border-line p-4 text-sm"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{req.subject}</p>
                    <StatusBadge
                      label={ROLE_LABEL[req.targetRole]}
                      tone="brand"
                    />
                    <StatusBadge
                      label={CONTACT_STATUS_LABEL[req.status]}
                      tone={req.status === "pending" ? "warn" : "ok"}
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    {new Date(req.createdAt).toLocaleString("ko-KR")}
                  </p>
                  <p className="mt-2 whitespace-pre-wrap">{req.body}</p>
                  {req.reply ? (
                    <div className="mt-3 rounded-md bg-brand-soft p-3">
                      <p className="text-xs text-muted">답변</p>
                      <p className="mt-1">{req.reply}</p>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="새 요청 보내기">
          <form action={createContactRequestAction} className="space-y-3">
            <Field label="받는 사람">
              <select
                name="targetRole"
                className={inputClass}
                defaultValue="manager"
              >
                <option value="manager">
                  본부장 ({manager?.name ?? "소속 본부장"})
                </option>
                <option value="director">
                  이사 ({director?.name ?? "이사"})
                </option>
              </select>
            </Field>
            <Field label="제목">
              <input name="subject" className={inputClass} required />
            </Field>
            <Field label="내용">
              <textarea
                name="body"
                className={inputClass}
                rows={5}
                required
                placeholder="문의·요청 내용을 적어 주세요"
              />
            </Field>
            <button type="submit" className={`${btnPrimary} w-full`}>
              요청 보내기
            </button>
          </form>
        </Panel>
      </div>
    </div>
  );
}
