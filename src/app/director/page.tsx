import { resetDemoDataAction } from "@/lib/auth/actions";
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
  btnSecondary,
} from "@/components/ui";

export default async function DirectorDashboardPage() {
  const session = await getSession();
  const directorId = session!.directorId!;
  const db = getDb();
  const stats = await db.getDashboardStats({ directorId });
  const orders = (await db.listOrders({ directorId })).slice(0, 5);
  const inventory = await db.listInventory();
  const lowStock = inventory
    .filter((i) => i.qtyOnHand < 50)
    .sort((a, b) => a.qtyOnHand - b.qtyOnHand)
    .slice(0, 5);
  const [owners, stores, managers, requests] = await Promise.all([
    db.listOwners({ directorId }),
    db.listStores({ directorId }),
    db.listManagers(directorId),
    db.listContactRequests({ targetUserId: directorId }),
  ]);
  const pending = requests.filter((r) => r.status === "pending").length;

  return (
    <div>
      <PageHeader
        title="이사 대시보드"
        description="산하 본부장 · 원장 조직과 주문·재고 현황"
        actions={
          <form action={resetDemoDataAction}>
            <button type="submit" className={btnSecondary}>
              목업 데이터 초기화
            </button>
          </form>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[
          { label: "본부장", value: stats.managerCount },
          { label: "원장", value: stats.ownerCount },
          { label: "매장", value: stats.storeCount },
          { label: "진행 주문", value: stats.openOrderCount },
          { label: "원장 승인대기", value: stats.pendingOwnerApprovalCount },
          { label: "대기 연락 요청", value: pending },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-line bg-surface px-5 py-4"
          >
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-1 text-3xl font-bold tracking-tight">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Panel title="산하 본부장">
          <ul className="divide-y divide-line text-sm">
            {managers.map((m) => {
              const count = owners.filter((o) => o.managerId === m.id).length;
              return (
                <li key={m.id} className="flex justify-between py-3">
                  <span className="font-medium">{m.name}</span>
                  <span className="text-muted">원장 {count}명</span>
                </li>
              );
            })}
          </ul>
        </Panel>
        <Panel title="최근 주문">
          {orders.length === 0 ? (
            <EmptyState message="주문이 없습니다." />
          ) : (
            <ul className="divide-y divide-line">
              {orders.map((order) => {
                const owner = owners.find((o) => o.id === order.ownerId);
                const store = stores.find((s) => s.id === order.storeId);
                return (
                  <li
                    key={order.id}
                    className="flex items-start justify-between gap-3 py-3 text-sm"
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
                    <StatusBadge
                      label={ORDER_STATUS_LABEL[order.status]}
                      tone={
                        order.status === "received"
                          ? "warn"
                          : order.status === "completed"
                            ? "ok"
                            : "brand"
                      }
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>
      </div>

      <Panel title="저재고 알림 (50 미만)">
        {lowStock.length === 0 ? (
          <EmptyState message="저재고 상품이 없습니다." />
        ) : (
          <ul className="divide-y divide-line">
            {lowStock.map((row) => (
              <li
                key={row.id}
                className="flex items-center justify-between gap-3 py-3 text-sm"
              >
                <div>
                  <p className="font-medium">{row.product.name}</p>
                  <p className="text-muted">
                    {BUSINESS_LINE_LABEL[row.businessLine.code]} ·{" "}
                    {row.product.sku}
                  </p>
                </div>
                <span className="font-semibold text-[var(--warn)]">
                  {row.qtyOnHand}
                  {row.product.unit}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
