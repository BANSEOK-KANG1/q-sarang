import {
  createStoreAction,
  updateStoreAction,
} from "@/lib/db/actions";
import { getSession } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { BUSINESS_LINE_LABEL } from "@/lib/domain/types";
import {
  EmptyState,
  Field,
  PageHeader,
  Panel,
  StatusBadge,
  btnPrimary,
  inputClass,
} from "@/components/ui";

export default async function DirectorStoresPage() {
  const session = await getSession();
  const directorId = session!.directorId!;
  const db = getDb();
  const [stores, owners] = await Promise.all([
    db.listStores({ directorId }),
    db.listOwners({ directorId }),
  ]);
  const ownerMap = Object.fromEntries(owners.map((o) => [o.id, o]));

  return (
    <div>
      <PageHeader
        title="매장 관리"
        description="원장에 연결된 매장을 업종별로 등록합니다."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <Panel title="매장 목록">
          {stores.length === 0 ? (
            <EmptyState message="등록된 매장이 없습니다." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="border-b border-line text-muted">
                  <tr>
                    <th className="pb-2 font-medium">ID</th>
                    <th className="pb-2 font-medium">매장명</th>
                    <th className="pb-2 font-medium">원장</th>
                    <th className="pb-2 font-medium">업종</th>
                    <th className="pb-2 font-medium">주소</th>
                    <th className="pb-2 font-medium">수정</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {stores.map((store) => (
                    <tr key={store.id} className="align-top">
                      <td className="py-3 font-mono text-xs text-muted">
                        {store.id}
                      </td>
                      <td className="py-3 font-medium">{store.name}</td>
                      <td className="py-3">
                        {ownerMap[store.ownerId]?.name ?? store.ownerId}
                      </td>
                      <td className="py-3">
                        <StatusBadge
                          label={BUSINESS_LINE_LABEL[store.businessLine]}
                          tone={
                            store.businessLine === "dyeing"
                              ? "brand"
                              : "accent"
                          }
                        />
                      </td>
                      <td className="py-3 text-muted">{store.address}</td>
                      <td className="py-3">
                        <form
                          action={updateStoreAction}
                          className="flex min-w-[200px] flex-col gap-2"
                        >
                          <input type="hidden" name="id" value={store.id} />
                          <input
                            name="name"
                            defaultValue={store.name}
                            className={inputClass}
                          />
                          <input
                            name="address"
                            defaultValue={store.address}
                            className={inputClass}
                          />
                          <select
                            name="businessLine"
                            defaultValue={store.businessLine}
                            className={inputClass}
                          >
                            <option value="dyeing">염색방</option>
                            <option value="cordyceps">제왕충초</option>
                          </select>
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

        <Panel title="매장 등록">
          <form action={createStoreAction} className="space-y-3">
            <Field label="원장">
              <select name="ownerId" className={inputClass} required>
                {owners.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name} ({o.loginId})
                  </option>
                ))}
              </select>
            </Field>
            <Field label="매장명">
              <input name="name" className={inputClass} required />
            </Field>
            <Field label="업종">
              <select
                name="businessLine"
                className={inputClass}
                defaultValue="dyeing"
              >
                <option value="dyeing">염색방</option>
                <option value="cordyceps">제왕충초</option>
              </select>
            </Field>
            <Field label="주소">
              <input name="address" className={inputClass} required />
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
