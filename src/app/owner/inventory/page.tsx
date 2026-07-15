import { getSession } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import {
  BUSINESS_LINE_LABEL,
  ORDER_STATUS_LABEL,
} from "@/lib/domain/types";
import {
  EmptyState,
  PageHeader,
  Panel,
  StatusBadge,
} from "@/components/ui";

/**
 * Mock "allocated inventory": items from shipped/completed orders for this owner.
 */
export default async function OwnerInventoryPage() {
  const session = await getSession();
  const ownerId = session!.ownerId!;
  const db = getDb();
  const [orders, products, stores] = await Promise.all([
    db.listOrders({ ownerId }),
    db.listProducts(),
    db.listStores({ ownerId }),
  ]);
  const productMap = Object.fromEntries(products.map((p) => [p.id, p]));
  const storeMap = Object.fromEntries(stores.map((s) => [s.id, s]));

  const fulfilled = orders.filter(
    (o) => o.status === "shipped" || o.status === "completed",
  );

  const allocated = new Map<
    string,
    { productId: string; qty: number; orders: string[] }
  >();
  for (const order of fulfilled) {
    for (const item of order.items) {
      const prev = allocated.get(item.productId);
      if (prev) {
        prev.qty += item.qty;
        prev.orders.push(order.id);
      } else {
        allocated.set(item.productId, {
          productId: item.productId,
          qty: item.qty,
          orders: [order.id],
        });
      }
    }
  }
  const rows = [...allocated.values()];

  return (
    <div>
      <PageHeader
        title="할당·출고 재고"
        description="출고·완료된 주문 기준으로 매장에 보낸 수량을 합산한 목업 뷰입니다."
      />

      <Panel title="합산 할당량">
        {rows.length === 0 ? (
          <EmptyState message="아직 출고된 재고가 없습니다." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px] text-left text-sm">
              <thead className="border-b border-line text-muted">
                <tr>
                  <th className="pb-2 font-medium">상품</th>
                  <th className="pb-2 font-medium">업종</th>
                  <th className="pb-2 font-medium">누적 수량</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((row) => {
                  const p = productMap[row.productId];
                  return (
                    <tr key={row.productId}>
                      <td className="py-3 font-medium">
                        {p?.name ?? row.productId}
                      </td>
                      <td className="py-3">
                        {p ? (
                          <StatusBadge
                            label={
                              BUSINESS_LINE_LABEL[p.businessLine.code]
                            }
                            tone={
                              p.businessLine.code === "dyeing"
                                ? "brand"
                                : "accent"
                            }
                          />
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="py-3 font-semibold">
                        {row.qty}
                        {p?.unit ?? ""}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <div className="mt-6">
        <Panel title="출고 이력">
          {fulfilled.length === 0 ? (
            <EmptyState message="출고 이력이 없습니다." />
          ) : (
            <ul className="divide-y divide-line text-sm">
              {fulfilled.map((o) => (
                <li key={o.id} className="py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">
                      {storeMap[o.storeId]?.name ?? o.storeId}
                    </span>
                    <StatusBadge label={ORDER_STATUS_LABEL[o.status]} tone="ok" />
                  </div>
                  <p className="mt-1 text-muted">
                    {new Date(o.updatedAt).toLocaleString("ko-KR")} ·{" "}
                    {o.items
                      .map((i) => {
                        const p = productMap[i.productId];
                        return `${p?.name ?? i.productId} ${i.qty}${p?.unit ?? ""}`;
                      })
                      .join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}
