import Link from "next/link";
import { adjustInventoryAction } from "@/lib/db/actions";
import { getDb } from "@/lib/db";
import { BUSINESS_LINE_LABEL } from "@/lib/domain/types";
import type { BusinessLineCode } from "@/lib/domain/types";
import {
  EmptyState,
  PageHeader,
  Panel,
  StatusBadge,
  btnPrimary,
  btnSecondary,
  inputClass,
} from "@/components/ui";

export default async function AdminInventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ line?: string }>;
}) {
  const params = await searchParams;
  const line =
    params.line === "dyeing" || params.line === "cordyceps"
      ? (params.line as BusinessLineCode)
      : undefined;

  const rows = await getDb().listInventory(line);

  return (
    <div>
      <PageHeader
        title="재고"
        description="본사 보유 재고를 조회·조정합니다. 출고 시 자동 차감됩니다."
        actions={
          <div className="flex gap-2">
            <Link
              href="/director/inventory"
              className={!line ? btnPrimary : btnSecondary}
            >
              전체
            </Link>
            <Link
              href="/director/inventory?line=dyeing"
              className={line === "dyeing" ? btnPrimary : btnSecondary}
            >
              염색방
            </Link>
            <Link
              href="/director/inventory?line=cordyceps"
              className={line === "cordyceps" ? btnPrimary : btnSecondary}
            >
              제왕충초
            </Link>
          </div>
        }
      />

      <Panel>
        {rows.length === 0 ? (
          <EmptyState message="재고 데이터가 없습니다." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-line text-muted">
                <tr>
                  <th className="pb-2 font-medium">상품</th>
                  <th className="pb-2 font-medium">SKU</th>
                  <th className="pb-2 font-medium">업종</th>
                  <th className="pb-2 font-medium">현재 수량</th>
                  <th className="pb-2 font-medium">수량 조정</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td className="py-3">
                      <p className="font-medium">{row.product.name}</p>
                      <p className="text-xs text-muted">
                        {row.category.name}
                      </p>
                    </td>
                    <td className="py-3 font-mono text-xs">
                      {row.product.sku}
                    </td>
                    <td className="py-3">
                      <StatusBadge
                        label={BUSINESS_LINE_LABEL[row.businessLine.code]}
                        tone={
                          row.businessLine.code === "dyeing"
                            ? "brand"
                            : "accent"
                        }
                      />
                    </td>
                    <td className="py-3">
                      <span
                        className={
                          row.qtyOnHand < 50
                            ? "font-semibold text-[var(--warn)]"
                            : "font-semibold"
                        }
                      >
                        {row.qtyOnHand}
                      </span>
                      <span className="text-muted">
                        {" "}
                        {row.product.unit}
                      </span>
                    </td>
                    <td className="py-3">
                      <form
                        action={adjustInventoryAction}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="hidden"
                          name="productId"
                          value={row.productId}
                        />
                        <input
                          name="qtyOnHand"
                          type="number"
                          min={0}
                          defaultValue={row.qtyOnHand}
                          className={`${inputClass} w-24`}
                        />
                        <button type="submit" className={btnPrimary}>
                          적용
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
    </div>
  );
}
