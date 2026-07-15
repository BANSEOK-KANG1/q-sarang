import Link from "next/link";
import { createProductAction } from "@/lib/db/actions";
import { getDb } from "@/lib/db";
import { BUSINESS_LINE_LABEL } from "@/lib/domain/types";
import type { BusinessLineCode } from "@/lib/domain/types";
import {
  EmptyState,
  Field,
  PageHeader,
  Panel,
  StatusBadge,
  btnPrimary,
  btnSecondary,
  inputClass,
} from "@/components/ui";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ line?: string }>;
}) {
  const params = await searchParams;
  const line =
    params.line === "dyeing" || params.line === "cordyceps"
      ? (params.line as BusinessLineCode)
      : undefined;

  const db = getDb();
  const [products, categories, allCategories, businessLines] =
    await Promise.all([
      db.listProducts(line),
      db.listCategories(line),
      db.listCategories(),
      db.listBusinessLines(),
    ]);
  const blMap = Object.fromEntries(businessLines.map((b) => [b.id, b]));

  return (
    <div>
      <PageHeader
        title="상품·카테고리"
        description="업종별 상품을 등록합니다. 염색방이 메인 라인입니다."
        actions={
          <div className="flex gap-2">
            <Link
              href="/director/products"
              className={!line ? btnPrimary : btnSecondary}
            >
              전체
            </Link>
            <Link
              href="/director/products?line=dyeing"
              className={line === "dyeing" ? btnPrimary : btnSecondary}
            >
              염색방
            </Link>
            <Link
              href="/director/products?line=cordyceps"
              className={line === "cordyceps" ? btnPrimary : btnSecondary}
            >
              제왕충초
            </Link>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <Panel title="상품 목록">
          {products.length === 0 ? (
            <EmptyState message="상품이 없습니다." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="border-b border-line text-muted">
                  <tr>
                    <th className="pb-2 font-medium">SKU</th>
                    <th className="pb-2 font-medium">상품명</th>
                    <th className="pb-2 font-medium">카테고리</th>
                    <th className="pb-2 font-medium">업종</th>
                    <th className="pb-2 font-medium">단위</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td className="py-3 font-mono text-xs">{p.sku}</td>
                      <td className="py-3 font-medium">{p.name}</td>
                      <td className="py-3">{p.category.name}</td>
                      <td className="py-3">
                        <StatusBadge
                          label={BUSINESS_LINE_LABEL[p.businessLine.code]}
                          tone={
                            p.businessLine.code === "dyeing"
                              ? "brand"
                              : "accent"
                          }
                        />
                      </td>
                      <td className="py-3">{p.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>

        <Panel title="상품 등록">
          <form action={createProductAction} className="space-y-3">
            <Field label="카테고리">
              <select name="categoryId" className={inputClass} required>
                {allCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    [{blMap[c.businessLineId]?.name}] {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="상품명">
              <input name="name" className={inputClass} required />
            </Field>
            <Field label="SKU">
              <input name="sku" className={inputClass} required />
            </Field>
            <Field label="단위">
              <input
                name="unit"
                className={inputClass}
                defaultValue="개"
                required
              />
            </Field>
            <Field label="초기 재고">
              <input
                name="initialQty"
                type="number"
                min={0}
                className={inputClass}
                defaultValue={0}
              />
            </Field>
            <button type="submit" className={`${btnPrimary} w-full`}>
              등록
            </button>
          </form>
          {categories.length > 0 ? (
            <div className="mt-6 border-t border-line pt-4">
              <p className="mb-2 text-sm font-semibold">
                {line ? BUSINESS_LINE_LABEL[line] : "전체"} 카테고리
              </p>
              <ul className="space-y-1 text-sm text-muted">
                {categories.map((c) => (
                  <li key={c.id}>· {c.name}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </Panel>
      </div>
    </div>
  );
}
