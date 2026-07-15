import { getSession } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { NewOrderForm } from "@/components/NewOrderForm";
import { PageHeader, Panel } from "@/components/ui";

export default async function OwnerNewOrderPage() {
  const session = await getSession();
  const ownerId = session!.ownerId!;
  const db = getDb();
  const [stores, products] = await Promise.all([
    db.listStores({ ownerId }),
    db.listProducts("dyeing"),
  ]);

  return (
    <div>
      <PageHeader
        title="염색방 주문 작성"
        description="세팅 정보와 보낼 재고 수량을 입력합니다."
      />
      <Panel>
        <NewOrderForm
          stores={stores.map((s) => ({
            id: s.id,
            name: s.name,
            businessLine: s.businessLine,
          }))}
          products={products.map((p) => ({
            id: p.id,
            name: p.name,
            sku: p.sku,
            unit: p.unit,
            businessLineCode: p.businessLine.code,
          }))}
        />
      </Panel>
    </div>
  );
}
