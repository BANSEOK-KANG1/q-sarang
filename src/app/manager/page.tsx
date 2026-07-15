import {
  BUSINESS_LINE_LABEL,
  ORDER_STATUS_LABEL,
} from "@/lib/domain/types";
import { getSession } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import {
  EmptyState,
  PageHeader,
  Panel,
  StatusBadge,
} from "@/components/ui";

export default async function ManagerDashboardPage() {
  const session = await getSession();
  const managerId = session!.managerId!;
  const db = getDb();
  const stats = await db.getDashboardStats({ managerId });
  const [owners, orders, stores, requests] = await Promise.all([
    db.listOwners({ managerId }),
    db.listOrders({ managerId }),
    db.listStores({ managerId }),
    db.listContactRequests({ targetUserId: managerId }),
  ]);
  const pending = requests.filter((r) => r.status === "pending").length;

  return (
    <div>
      <PageHeader
        title="본부장 대시보드"
        description="산하 원장과 주문·연락 요청을 확인합니다."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "원장", value: stats.ownerCount },
          { label: "매장", value: stats.storeCount },
          { label: "사진 승인대기", value: stats.pendingPhotoApprovalCount },
          { label: "대기 연락", value: pending },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-line bg-surface px-5 py-4"
          >
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-1 text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="산하 원장">
          {owners.length === 0 ? (
            <EmptyState message="원장이 없습니다." />
          ) : (
            <ul className="divide-y divide-line text-sm">
              {owners.map((o) => (
                <li key={o.id} className="flex justify-between py-3">
                  <div>
                    <p className="font-medium">{o.name}</p>
                    <p className="text-muted">{o.loginId}</p>
                  </div>
                  <StatusBadge
                    label={o.status === "active" ? "활성" : "중지"}
                    tone={o.status === "active" ? "ok" : "danger"}
                  />
                </li>
              ))}
            </ul>
          )}
        </Panel>
        <Panel title="최근 주문">
          {orders.length === 0 ? (
            <EmptyState message="주문이 없습니다." />
          ) : (
            <ul className="divide-y divide-line text-sm">
              {orders.slice(0, 5).map((order) => {
                const owner = owners.find((o) => o.id === order.ownerId);
                const store = stores.find((s) => s.id === order.storeId);
                return (
                  <li
                    key={order.id}
                    className="flex justify-between gap-3 py-3"
                  >
                    <div>
                      <p className="font-medium">
                        {store?.name ?? order.storeId}
                      </p>
                      <p className="text-muted">
                        {owner?.name} ·{" "}
                        {BUSINESS_LINE_LABEL[order.businessLine]}
                      </p>
                    </div>
                    <StatusBadge label={ORDER_STATUS_LABEL[order.status]} />
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}
