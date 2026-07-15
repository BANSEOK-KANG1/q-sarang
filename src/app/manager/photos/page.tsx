import { decideStoreCoverPhotoAction } from "@/lib/db/actions";
import { getSession } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { PHOTO_APPROVAL_LABEL } from "@/lib/domain/types";
import {
  EmptyState,
  PageHeader,
  Panel,
  PhotoThumb,
  StatusBadge,
  btnPrimary,
  btnSecondary,
} from "@/components/ui";

export default async function ManagerPhotosPage() {
  const session = await getSession();
  const managerId = session!.managerId!;
  const db = getDb();
  const [stores, owners] = await Promise.all([
    db.listStores({ managerId, photoApprovalStatus: "pending" }),
    db.listOwners({ managerId }),
  ]);
  const ownerMap = Object.fromEntries(owners.map((o) => [o.id, o]));
  const dyeingPending = stores.filter((s) => s.businessLine === "dyeing");

  return (
    <div>
      <PageHeader
        title="염색방 사진 승인"
        description="원장이 올린 대표 사진을 승인하거나 반려합니다."
      />
      <div className="space-y-4">
        {dyeingPending.length === 0 ? (
          <Panel>
            <EmptyState message="승인 대기 사진이 없습니다." />
          </Panel>
        ) : (
          dyeingPending.map((store) => (
            <Panel key={store.id}>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">{store.name}</p>
                <StatusBadge
                  label={PHOTO_APPROVAL_LABEL[store.photoApprovalStatus]}
                  tone="warn"
                />
              </div>
              <p className="mt-1 text-sm text-muted">
                원장: {ownerMap[store.ownerId]?.name ?? store.ownerId}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs text-muted">현재 대표 사진</p>
                  <PhotoThumb
                    src={store.coverPhotoUrl}
                    alt="현재"
                    className="aspect-[4/3] w-full max-w-sm"
                  />
                </div>
                <div>
                  <p className="mb-2 text-xs text-muted">승인 요청 사진</p>
                  <PhotoThumb
                    src={store.pendingCoverPhotoUrl}
                    alt="대기"
                    className="aspect-[4/3] w-full max-w-sm"
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <form action={decideStoreCoverPhotoAction}>
                  <input type="hidden" name="storeId" value={store.id} />
                  <input type="hidden" name="decide" value="approve" />
                  <button type="submit" className={btnPrimary}>
                    승인
                  </button>
                </form>
                <form action={decideStoreCoverPhotoAction}>
                  <input type="hidden" name="storeId" value={store.id} />
                  <input type="hidden" name="decide" value="reject" />
                  <button type="submit" className={btnSecondary}>
                    반려
                  </button>
                </form>
              </div>
            </Panel>
          ))
        )}
      </div>
    </div>
  );
}
