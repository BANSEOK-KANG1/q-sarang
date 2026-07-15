"use client";

import { useMemo, useState } from "react";
import { createOwnerOrderAction } from "@/lib/db/actions";
import { Field, btnPrimary, inputClass } from "@/components/ui";

export type OrderFormStore = {
  id: string;
  name: string;
  businessLine: "dyeing" | "cordyceps";
};

export type OrderFormProduct = {
  id: string;
  name: string;
  sku: string;
  unit: string;
  businessLineCode: "dyeing" | "cordyceps";
};

export function NewOrderForm({
  stores,
  products,
}: {
  stores: OrderFormStore[];
  products: OrderFormProduct[];
}) {
  const dyeingStores = stores.filter((s) => s.businessLine === "dyeing");
  const [storeId, setStoreId] = useState(dyeingStores[0]?.id ?? "");
  const [qtys, setQtys] = useState<Record<string, number>>({});

  const dyeingProducts = useMemo(
    () => products.filter((p) => p.businessLineCode === "dyeing"),
    [products],
  );

  if (dyeingStores.length === 0) {
    return (
      <p className="text-sm text-muted">
        염색방 매장이 없습니다. 본사에서 매장을 등록해 주세요.
      </p>
    );
  }

  return (
    <form action={createOwnerOrderAction} className="space-y-6">
      <input type="hidden" name="businessLine" value="dyeing" />

      <Field label="매장">
        <select
          name="storeId"
          className={inputClass}
          value={storeId}
          onChange={(e) => setStoreId(e.target.value)}
          required
        >
          {dyeingStores.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="색상 세팅">
          <input
            name="colorName"
            className={inputClass}
            placeholder="예: 애시 브라운"
          />
        </Field>
        <Field label="농도">
          <input
            name="concentration"
            className={inputClass}
            placeholder="예: 6%"
          />
        </Field>
        <Field label="시술 방식">
          <input
            name="technique"
            className={inputClass}
            placeholder="예: 뿌리 리터치"
          />
        </Field>
        <Field label="메모">
          <input name="memo" className={inputClass} placeholder="요청사항" />
        </Field>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold">보낼 재고 수량</p>
        <ul className="space-y-2">
          {dyeingProducts.map((p) => (
            <li
              key={p.id}
              className="flex flex-col gap-2 rounded-lg border border-line px-3 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-medium">{p.name}</p>
                <p className="font-mono text-xs text-muted">{p.sku}</p>
              </div>
              <div className="flex items-center gap-2">
                <input type="hidden" name="productId" value={p.id} />
                <input
                  name="qty"
                  type="number"
                  min={0}
                  className={`${inputClass} w-28`}
                  value={qtys[p.id] ?? 0}
                  onChange={(e) =>
                    setQtys((prev) => ({
                      ...prev,
                      [p.id]: Number(e.target.value),
                    }))
                  }
                />
                <span className="text-sm text-muted">{p.unit}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button type="submit" className={btnPrimary}>
        주문 제출
      </button>
    </form>
  );
}
