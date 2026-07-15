import {
  createStoreAction,
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

export default async function ManagerStoresPage() {
  const session = await getSession();
  const managerId = session!.managerId!;
  const db = getDb();
  const [stores, owners] = await Promise.all([
    db.listStores({ managerId }),
    db.listOwners({ managerId }),
  ]);
  const ownerMap = Object.fromEntries(owners.map((o) => [o.id, o]));

  return (
    <div>
      <PageHeader
        title="매장"
        description="산하 원장 매장을 조회·등록합니다."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <Panel>
          {stores.length === 0 ? (
            <EmptyState message="매장이 없습니다." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="border-b border-line text-muted">
                  <tr>
                    <th className="pb-2 font-medium">매장명</th>
                    <th className="pb-2 font-medium">원장</th>
                    <th className="pb-2 font-medium">업종</th>
                    <th className="pb-2 font-medium">주소</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {stores.map((store) => (
                    <tr key={store.id}>
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
                    {o.name}
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
