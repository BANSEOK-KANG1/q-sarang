import {
  createManagerAction,
  updateManagerAction,
} from "@/lib/db/actions";
import { getSession } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { MEMBER_STATUS_LABEL } from "@/lib/domain/types";
import {
  EmptyState,
  Field,
  PageHeader,
  Panel,
  StatusBadge,
  btnPrimary,
  inputClass,
} from "@/components/ui";

export default async function DirectorManagersPage() {
  const session = await getSession();
  const managers = await getDb().listManagers(session!.directorId);
  const owners = await getDb().listOwners({
    directorId: session!.directorId,
  });

  return (
    <div>
      <PageHeader
        title="본부장 관리"
        description="이사 산하 본부장을 등록하고 로그인 ID를 발급합니다."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <Panel title="본부장 목록">
          {managers.length === 0 ? (
            <EmptyState message="등록된 본부장이 없습니다." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-line text-muted">
                  <tr>
                    <th className="pb-2 font-medium">ID</th>
                    <th className="pb-2 font-medium">로그인</th>
                    <th className="pb-2 font-medium">이름</th>
                    <th className="pb-2 font-medium">산하 원장</th>
                    <th className="pb-2 font-medium">상태</th>
                    <th className="pb-2 font-medium">수정</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {managers.map((m) => (
                    <tr key={m.id} className="align-top">
                      <td className="py-3 font-mono text-xs text-muted">
                        {m.id}
                      </td>
                      <td className="py-3">{m.loginId}</td>
                      <td className="py-3 font-medium">{m.name}</td>
                      <td className="py-3">
                        {owners.filter((o) => o.managerId === m.id).length}명
                      </td>
                      <td className="py-3">
                        <StatusBadge
                          label={MEMBER_STATUS_LABEL[m.status]}
                          tone={m.status === "active" ? "ok" : "danger"}
                        />
                      </td>
                      <td className="py-3">
                        <form
                          action={updateManagerAction}
                          className="flex min-w-[200px] flex-col gap-2"
                        >
                          <input type="hidden" name="id" value={m.id} />
                          <input
                            name="name"
                            defaultValue={m.name}
                            className={inputClass}
                          />
                          <input
                            name="phone"
                            defaultValue={m.phone}
                            className={inputClass}
                          />
                          <select
                            name="status"
                            defaultValue={m.status}
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

        <Panel title="본부장 등록">
          <form action={createManagerAction} className="space-y-3">
            <Field label="로그인 ID">
              <input
                name="loginId"
                className={inputClass}
                required
                placeholder="예: manager3"
              />
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
              등록
            </button>
          </form>
        </Panel>
      </div>
    </div>
  );
}
