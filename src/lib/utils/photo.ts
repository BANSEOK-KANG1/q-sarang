/** Convert uploaded image File to data URL for mock storage */
export async function fileToDataUrl(
  file: File | null | undefined,
): Promise<string | undefined> {
  if (!file || file.size === 0) return undefined;
  if (!file.type.startsWith("image/")) {
    throw new Error("이미지 파일만 업로드할 수 있습니다.");
  }
  if (file.size > 2 * 1024 * 1024) {
    throw new Error("사진은 2MB 이하로 올려 주세요.");
  }
  const buf = Buffer.from(await file.arrayBuffer());
  return `data:${file.type};base64,${buf.toString("base64")}`;
}
