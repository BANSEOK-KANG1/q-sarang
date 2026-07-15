import Link from "next/link";
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
  btnPrimary,
} from "@/components/ui";

export default async function OwnerOrdersPage() {
  const session = await getSession();
  const ownerId = session!.ownerId!;
  const db = getDb();
  const [orders, stores, products] = await Promise.all([
    db.listOrders({ ownerId }),
    db.listStores({ ownerId }),
    db.listProducts(),
  ]);
  const storeMap = Object.fromEntries(stores.map((s) => [s.id, s]));
  const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

  return (
    <div>
      <PageHeader
        title="내 주문"
        description="제출한 주문과 세팅·수량을 확인합니다."
        actions={
          <Link href="/owner/orders/new" className={btnPrimary}>
            새 주문
          </Link>
        }
      />

      <div className="space-y-4">
        {orders.length === 0 ? (
          <Panel>
            <EmptyState message="아직 주문이 없습니다." />
          </Panel>
        ) : (
          orders.map((order) => (
            <Panel key={order.id}>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">
                  {storeMap[order.storeId]?.name ?? order.storeId}
                </p>
                <StatusBadge
                  label={BUSINESS_LINE_LABEL[order.businessLine]}
                  tone={order.businessLine === "dyeing" ? "brand" : "accent"}
                />
                <StatusBadge label={ORDER_STATUS_LABEL[order.status]} />
              </div>
              <p className="mt-1 text-sm text-muted">
                {new Date(order.createdAt).toLocaleString("ko-KR")} ·{" "}
                <span className="font-mono text-xs">{order.id}</span>
              </p>

              {order.businessLine === "dyeing" ? (
                <div className="mt-3 grid gap-2 rounded-lg bg-[#f8fafc] p-3 text-sm sm:grid-cols-4">
                  <div>
                    <p className="text-xs text-muted">색상</p>
                    <p>{order.settings.colorName || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">농도</p>
                    <p>{order.settings.concentration || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">시술</p>
                    <p>{order.settings.technique || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">메모</p>
                    <p>{order.settings.memo || "—"}</p>
                  </div>
                </div>
              ) : null}

              <ul className="mt-3 divide-y divide-line text-sm">
                {order.items.map((item) => {
                  const p = productMap[item.productId];
                  return (
                    <li
                      key={item.id}
                      className="flex justify-between py-2"
                    >
                      <span>{p?.name ?? item.productId}</span>
                      <span className="font-semibold">
                        {item.qty}
                        {p?.unit ?? ""}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Panel>
          ))
        )}
      </div>
    </div>
  );
}
