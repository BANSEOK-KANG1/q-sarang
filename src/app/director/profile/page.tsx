import { updateDirectorProfileAction } from "@/lib/db/actions";
import { getSession } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import {
  Field,
  PageHeader,
  Panel,
  PhotoThumb,
  btnPrimary,
  btnSecondary,
  inputClass,
} from "@/components/ui";

export default async function DirectorProfilePage() {
  const session = await getSession();
  const director = await getDb().getDirector(session!.userId);

  return (
    <div>
      <PageHeader
        title="내 프로필·사진"
        description="이사 프로필과 사진을 등록합니다."
      />
      <Panel>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <PhotoThumb
            src={director?.photoUrl}
            alt={director?.name ?? "이사"}
            className="h-28 w-28 sm:h-32 sm:w-32"
          />
          <div>
            <p className="text-lg font-semibold">{director?.name}</p>
            <p className="text-sm text-muted">{director?.phone}</p>
          </div>
        </div>

        <form
          action={updateDirectorProfileAction}
          encType="multipart/form-data"
          className="max-w-md space-y-3"
        >
          <Field label="이름">
            <input
              name="name"
              className={inputClass}
              defaultValue={director?.name}
              required
            />
          </Field>
          <Field label="연락처">
            <input
              name="phone"
              className={inputClass}
              defaultValue={director?.phone}
              required
            />
          </Field>
          <Field label="사진 (최대 2MB)">
            <input
              name="photo"
              type="file"
              accept="image/*"
              className="block w-full text-sm"
            />
          </Field>
          <label className="flex items-center gap-2 text-sm text-muted">
            <input type="checkbox" name="clearPhoto" value="1" />
            사진 삭제
          </label>
          <div className="flex flex-wrap gap-2 pt-2">
            <button type="submit" className={btnPrimary}>
              저장
            </button>
            <button type="reset" className={btnSecondary}>
              초기화
            </button>
          </div>
        </form>
      </Panel>
    </div>
  );
}
