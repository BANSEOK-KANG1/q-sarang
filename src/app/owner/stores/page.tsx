import { submitStoreCoverPhotoAction } from "@/lib/db/actions";
import { getSession } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import {
  BUSINESS_LINE_LABEL,
  PHOTO_APPROVAL_LABEL,
} from "@/lib/domain/types";
import {
  EmptyState,
  Field,
  PageHeader,
  Panel,
  PhotoThumb,
  StatusBadge,
  btnPrimary,
  inputClass,
} from "@/components/ui";

export default async function OwnerStoresPage() {
  const session = await getSession();
  const stores = await getDb().listStores({ ownerId: session!.ownerId });

  return (
    <div>
      <PageHeader
        title="내 매장"
        description="염색방 매장은 대표 사진 1장을 등록할 수 있습니다. 등록·수정 시 본부장 승인이 필요합니다."
      />
      {stores.length === 0 ? (
        <Panel>
          <EmptyState message="등록된 매장이 없습니다." />
        </Panel>
      ) : (
        <div className="space-y-4">
          {stores.map((s) => (
            <Panel key={s.id}>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">{s.name}</p>
                <StatusBadge
                  label={BUSINESS_LINE_LABEL[s.businessLine]}
                  tone={s.businessLine === "dyeing" ? "brand" : "accent"}
                />
                {s.businessLine === "dyeing" ? (
                  <StatusBadge
                    label={PHOTO_APPROVAL_LABEL[s.photoApprovalStatus]}
                    tone={
                      s.photoApprovalStatus === "pending"
                        ? "warn"
                        : s.photoApprovalStatus === "approved"
                          ? "ok"
                          : "neutral"
                    }
                  />
                ) : null}
              </div>
              <p className="mt-1 text-sm text-muted">{s.address}</p>

              {s.businessLine === "dyeing" ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs text-muted">대표 사진</p>
                    <PhotoThumb
                      src={s.coverPhotoUrl}
                      alt={s.name}
                      className="aspect-[4/3] w-full"
                    />
                  </div>
                  {s.pendingCoverPhotoUrl ? (
                    <div>
                      <p className="mb-2 text-xs text-muted">승인 대기 사진</p>
                      <PhotoThumb
                        src={s.pendingCoverPhotoUrl}
                        alt="대기"
                        className="aspect-[4/3] w-full"
                      />
                    </div>
                  ) : null}
                  <form
                    action={submitStoreCoverPhotoAction}
                    encType="multipart/form-data"
                    className="space-y-3 sm:col-span-2"
                  >
                    <input type="hidden" name="storeId" value={s.id} />
                    <Field label="대표 사진 등록/변경">
                      <input
                        name="photo"
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className={`${inputClass} py-2`}
                        required
                      />
                    </Field>
                    <button type="submit" className={btnPrimary}>
                      본부장 승인 요청
                    </button>
                  </form>
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted">
                  제왕충초 매장은 대표 사진 기능이 없습니다.
                </p>
              )}
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
}
