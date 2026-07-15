import Link from "next/link";
import { updateOrderStatusAction } from "@/lib/db/actions";
import { getSession } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import {
  BUSINESS_LINE_LABEL,
  ORDER_STATUS_LABEL,
} from "@/lib/domain/types";
import type { BusinessLineCode, OrderStatus } from "@/lib/domain/types";
import {
  EmptyState,
  PageHeader,
  Panel,
  StatusBadge,
  btnPrimary,
  btnSecondary,
  inputClass,
} from "@/components/ui";

const STATUSES: OrderStatus[] = [
  "received",
  "preparing",
  "shipped",
  "completed",
];

export default async function DirectorOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ line?: string }>;
}) {
  const session = await getSession();
  const directorId = session!.directorId!;
  const params = await searchParams;
  const line =
    params.line === "dyeing" || params.line === "cordyceps"
      ? (params.line as BusinessLineCode)
      : undefined;

  const db = getDb();
  const [orders, owners, stores, products] = await Promise.all([
    db.listOrders({
      directorId,
      ...(line ? { businessLine: line } : {}),
    }),
    db.listOwners({ directorId }),
    db.listStores({ directorId }),
    db.listProducts(),
  ]);
  const ownerMap = Object.fromEntries(owners.map((o) => [o.id, o]));
  const storeMap = Object.fromEntries(stores.map((s) => [s.id, s]));
  const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

  return (
    <div>
      <PageHeader
        title="주문"
        description="염색방 주문(수량·세팅)을 확인하고 출고 상태를 관리합니다."
        actions={
          <div className="flex gap-2">
            <Link
              href="/director/orders"
              className={!line ? btnPrimary : btnSecondary}
            >
              전체
            </Link>
            <Link
              href="/director/orders?line=dyeing"
              className={line === "dyeing" ? btnPrimary : btnSecondary}
            >
              염색방
            </Link>
            <Link
              href="/director/orders?line=cordyceps"
              className={line === "cordyceps" ? btnPrimary : btnSecondary}
            >
              제왕충초
            </Link>
          </div>
        }
      />

      <div className="space-y-4">
        {orders.length === 0 ? (
          <Panel>
            <EmptyState message="주문이 없습니다." />
          </Panel>
        ) : (
          orders.map((order) => (
            <Panel key={order.id}>
              <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">
                      {storeMap[order.storeId]?.name ?? order.storeId}
                    </p>
                    <StatusBadge
                      label={BUSINESS_LINE_LABEL[order.businessLine]}
                      tone={
                        order.businessLine === "dyeing" ? "brand" : "accent"
                      }
                    />
                    <StatusBadge
                      label={ORDER_STATUS_LABEL[order.status]}
                      tone={
                        order.status === "received"
                          ? "warn"
                          : order.status === "completed"
                            ? "ok"
                            : "neutral"
                      }
                    />
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {ownerMap[order.ownerId]?.name} ·{" "}
                    <span className="font-mono text-xs">{order.id}</span> ·{" "}
                    {new Date(order.createdAt).toLocaleString("ko-KR")}
                  </p>
                </div>
                <form
                  action={updateOrderStatusAction}
                  className="flex items-center gap-2"
                >
                  <input type="hidden" name="id" value={order.id} />
                  <select
                    name="status"
                    defaultValue={order.status}
                    className={inputClass}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {ORDER_STATUS_LABEL[s]}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className={btnPrimary}>
                    상태 변경
                  </button>
                </form>
              </div>

              {order.businessLine === "dyeing" && order.settings ? (
                <div className="mt-4 grid gap-2 rounded-lg bg-[#f8fafc] p-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-xs text-muted">색상</p>
                    <p className="font-medium">
                      {order.settings.colorName || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">농도</p>
                    <p className="font-medium">
                      {order.settings.concentration || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">시술</p>
                    <p className="font-medium">
                      {order.settings.technique || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">메모</p>
                    <p className="font-medium">
                      {order.settings.memo || "—"}
                    </p>
                  </div>
                </div>
              ) : null}

              <ul className="mt-4 divide-y divide-line text-sm">
                {order.items.map((item) => {
                  const product = productMap[item.productId];
                  return (
                    <li
                      key={item.id}
                      className="flex items-center justify-between py-2"
                    >
                      <span>
                        {product?.name ?? item.productId}
                        <span className="ml-2 font-mono text-xs text-muted">
                          {product?.sku}
                        </span>
                      </span>
                      <span className="font-semibold">
                        {item.qty}
                        {product?.unit ?? ""}
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
