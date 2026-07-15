import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import {
  BUSINESS_LINE_LABEL,
  ORDER_STATUS_LABEL,
} from "@/lib/domain/types";
import {
  PageHeader,
  Panel,
  StatusBadge,
  btnPrimary,
  btnSecondary,
  EmptyState,
} from "@/components/ui";

export default async function OwnerHomePage() {
  const session = await getSession();
  const ownerId = session!.ownerId!;
  const db = getDb();
  const [stores, orders] = await Promise.all([
    db.listStores({ ownerId }),
    db.listOrders({ ownerId }),
  ]);
  const openOrders = orders.filter(
    (o) => o.status === "received" || o.status === "preparing",
  );

  return (
    <div>
      <PageHeader
        title={`안녕하세요, ${session!.name} 원장님`}
        description="매장 주문과 할당 재고를 확인하세요."
        actions={
          <div className="flex gap-2">
            <Link href="/owner/requests" className={btnSecondary}>
              상급자 연락
            </Link>
            <Link href="/owner/orders/new" className={btnPrimary}>
              염색방 주문 작성
            </Link>
          </div>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "내 매장", value: stores.length },
          { label: "전체 주문", value: orders.length },
          { label: "진행 중", value: openOrders.length },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-line bg-surface px-5 py-4"
          >
            <p className="text-sm text-muted">{c.label}</p>
            <p className="mt-1 text-3xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="내 매장">
          {stores.length === 0 ? (
            <EmptyState message="등록된 매장이 없습니다. 본사에 문의하세요." />
          ) : (
            <ul className="divide-y divide-line text-sm">
              {stores.map((s) => (
                <li key={s.id} className="flex justify-between gap-3 py-3">
                  <div>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-muted">{s.address}</p>
                  </div>
                  <StatusBadge
                    label={BUSINESS_LINE_LABEL[s.businessLine]}
                    tone={s.businessLine === "dyeing" ? "brand" : "accent"}
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
              {orders.slice(0, 5).map((o) => (
                <li key={o.id} className="flex justify-between gap-3 py-3">
                  <div>
                    <p className="font-medium">
                      {BUSINESS_LINE_LABEL[o.businessLine]}
                    </p>
                    <p className="text-muted">
                      {new Date(o.createdAt).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                  <StatusBadge label={ORDER_STATUS_LABEL[o.status]} />
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}
