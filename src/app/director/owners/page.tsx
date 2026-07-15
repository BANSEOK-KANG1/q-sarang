import {
  createOwnerAction,
  updateOwnerAction,
} from "@/lib/db/actions";
import { getSession } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { MEMBER_STATUS_LABEL, APPROVAL_STATUS_LABEL } from "@/lib/domain/types";
import {
  EmptyState,
  Field,
  PageHeader,
  Panel,
  StatusBadge,
  btnPrimary,
  inputClass,
} from "@/components/ui";

export default async function DirectorOwnersPage() {
  const session = await getSession();
  const directorId = session!.directorId!;
  const db = getDb();
  const [owners, managers] = await Promise.all([
    db.listOwners({ directorId }),
    db.listManagers(directorId),
  ]);
  const managerMap = Object.fromEntries(managers.map((m) => [m.id, m]));

  return (
    <div>
      <PageHeader
        title="원장 관리"
        description="이사가 직접 등록하면 즉시 승인됩니다. 본부장이 등록한 건은 '원장 승인' 메뉴에서 처리하세요."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <Panel title="원장 목록">
          {owners.length === 0 ? (
            <EmptyState message="등록된 원장이 없습니다." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-line text-muted">
                  <tr>
                    <th className="pb-2 font-medium">ID</th>
                    <th className="pb-2 font-medium">로그인</th>
                    <th className="pb-2 font-medium">이름</th>
                    <th className="pb-2 font-medium">본부장</th>
                    <th className="pb-2 font-medium">승인</th>
                    <th className="pb-2 font-medium">상태</th>
                    <th className="pb-2 font-medium">수정</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {owners.map((owner) => (
                    <tr key={owner.id} className="align-top">
                      <td className="py-3 font-mono text-xs text-muted">
                        {owner.id}
                      </td>
                      <td className="py-3">{owner.loginId}</td>
                      <td className="py-3 font-medium">{owner.name}</td>
                      <td className="py-3">
                        {managerMap[owner.managerId]?.name ?? owner.managerId}
                      </td>
                      <td className="py-3">
                        <StatusBadge
                          label={APPROVAL_STATUS_LABEL[owner.approvalStatus]}
                          tone={
                            owner.approvalStatus === "approved"
                              ? "ok"
                              : owner.approvalStatus === "pending"
                                ? "warn"
                                : "danger"
                          }
                        />
                      </td>
                      <td className="py-3">
                        <StatusBadge
                          label={MEMBER_STATUS_LABEL[owner.status]}
                          tone={owner.status === "active" ? "ok" : "danger"}
                        />
                      </td>
                      <td className="py-3">
                        <form
                          action={updateOwnerAction}
                          className="flex min-w-[220px] flex-col gap-2"
                        >
                          <input type="hidden" name="id" value={owner.id} />
                          <input
                            name="name"
                            defaultValue={owner.name}
                            className={inputClass}
                          />
                          <input
                            name="phone"
                            defaultValue={owner.phone}
                            className={inputClass}
                          />
                          <select
                            name="managerId"
                            defaultValue={owner.managerId}
                            className={inputClass}
                          >
                            {managers.map((m) => (
                              <option key={m.id} value={m.id}>
                                {m.name}
                              </option>
                            ))}
                          </select>
                          <select
                            name="status"
                            defaultValue={owner.status}
                            className={inputClass}
                          >
                            <option value="active">활성</option>
                            <option value="suspended">중지</option>
                          </select>
                          <input
                            name="password"
                            type="password"
                            className={inputClass}
                            placeholder="새 비밀번호(선택)"
                          />
                          <button type="submit" className={btnPrimary}>
                            저장
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>

        <Panel title="원장 등록">
          <form action={createOwnerAction} className="space-y-3">
            <Field label="소속 본부장">
              <select name="managerId" className={inputClass} required>
                {managers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.loginId})
                  </option>
                ))}
              </select>
            </Field>
            <Field label="로그인 ID">
              <input name="loginId" className={inputClass} required />
            </Field>
            <Field label="초기 비밀번호">
              <input
                name="password"
                type="password"
                className={inputClass}
                required
              />
            </Field>
            <Field label="이름">
              <input name="name" className={inputClass} required />
            </Field>
            <Field label="연락처">
              <input name="phone" className={inputClass} required />
            </Field>
            <Field label="상태">
              <select name="status" className={inputClass} defaultValue="active">
                <option value="active">활성</option>
                <option value="suspended">중지</option>
              </select>
            </Field>
            <button type="submit" className={`${btnPrimary} w-full`}>
              등록 (ID 자동 발급)
            </button>
          </form>
        </Panel>
      </div>
    </div>
  );
}
