from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PROFILE_SOURCE = Path(
    "/Users/kangbanseok/.codex/generated_images/"
    "019fa72a-4cb0-7f63-b659-4e068c375c23/"
    "call_iJup7KCqdpm4VoXbbizHEAIo.png"
)
BANNER_SOURCE = Path(
    "/Users/kangbanseok/.codex/generated_images/"
    "019fa72a-4cb0-7f63-b659-4e068c375c23/"
    "call_qmnwA0HdoEV8El0IApju9cdg.png"
)
OUTPUT_DIR = ROOT / "public" / "blog"
FONT_PATH = "/System/Library/Fonts/AppleSDGothicNeo.ttc"


def cover_resize(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    target_width, target_height = size
    source_ratio = image.width / image.height
    target_ratio = target_width / target_height

    if source_ratio > target_ratio:
        crop_width = round(image.height * target_ratio)
        left = (image.width - crop_width) // 2
        box = (left, 0, left + crop_width, image.height)
    else:
        crop_height = round(image.width / target_ratio)
        top = (image.height - crop_height) // 2
        box = (0, top, image.width, top + crop_height)

    return image.crop(box).resize(size, Image.Resampling.LANCZOS)


def build_profile() -> None:
    image = Image.open(PROFILE_SOURCE).convert("RGB")
    image = cover_resize(image, (512, 512))
    image.save(OUTPUT_DIR / "q-sarang-profile-hair-v2.png", quality=95)


def build_banner() -> None:
    image = Image.open(BANNER_SOURCE).convert("RGB")
    image = cover_resize(image, (966, 400))

    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw.rounded_rectangle(
        (40, 62, 580, 312),
        radius=24,
        fill=(255, 255, 255, 132),
        outline=(255, 255, 255, 180),
        width=2,
    )

    title_font = ImageFont.truetype(FONT_PATH, 48)
    tagline_font = ImageFont.truetype(FONT_PATH, 22)
    draw.text((70, 96), "큐사랑 Q-LOVE", font=title_font, fill=(60, 11, 89, 255))
    draw.multiline_text(
        (70, 184),
        "새치·뿌리염색과 두피·모발 관리\n처음 방문 · 창업 · 상품 자료 안내",
        font=tagline_font,
        fill=(90, 58, 104, 255),
        spacing=16,
    )

    image = Image.alpha_composite(image.convert("RGBA"), overlay).convert("RGB")
    image.save(OUTPUT_DIR / "q-sarang-naver-banner-hair-v3.png", quality=95)


if __name__ == "__main__":
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    build_profile()
    build_banner()
