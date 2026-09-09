from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "og"
FONT_PATH = "/System/Library/Fonts/AppleSDGothicNeo.ttc"

WIDTH = 1200
HEIGHT = 630
CREAM = (241, 229, 210, 255)
MUTED = (189, 171, 151, 255)
COPPER = (199, 123, 71, 255)
DEEP = (14, 10, 8, 255)


CARDS = [
    {
        "file": "evidence-hub.png",
        "source": ROOT / "public" / "research" / "cordyceps-hero.webp",
        "label": "Q-LOVE EVIDENCE GUIDE",
        "title": ["제왕충초 연구", "근거 수준 안내"],
        "subtitle": "사람 · 동물 · 세포 · 리뷰를 먼저 구분합니다",
    },
    {
        "file": "evidence-human.png",
        "source": ROOT / "public" / "research" / "cordyceps-botanical.webp",
        "label": "HUMAN STUDIES · 3 PAPERS",
        "title": ["제왕충초", "사람 연구 모음"],
        "subtitle": "대상 · 비교군 · 기간 · 제형과 한계를 함께 확인",
    },
    {
        "file": "evidence-preclinical.png",
        "source": ROOT / "public" / "research" / "cordycepin-abstract.webp",
        "label": "PRECLINICAL STUDIES · 6 PAPERS",
        "title": ["동물·세포 연구", "사람 결과와 구분하기"],
        "subtitle": "관찰된 가능성을 제품 효능으로 바로 옮기지 않습니다",
    },
    {
        "file": "evidence-reviews.png",
        "source": ROOT / "public" / "research" / "cordyceps-hero.webp",
        "label": "REVIEWS · 5 PAPERS",
        "title": ["제왕충초", "리뷰 논문 모음"],
        "subtitle": "원 연구의 단계 · 품질 · 차이까지 확인합니다",
    },
]


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


def build_card(card: dict[str, object]) -> None:
    source_path = card["source"]
    assert isinstance(source_path, Path)
    photo = Image.open(source_path).convert("RGB")
    photo = cover_resize(photo, (WIDTH, HEIGHT))
    photo = ImageEnhance.Color(photo).enhance(0.82)
    photo = ImageEnhance.Contrast(photo).enhance(1.05)

    canvas = photo.convert("RGBA")
    veil = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    veil_draw = ImageDraw.Draw(veil)
    veil_draw.rectangle((0, 0, 760, HEIGHT), fill=(14, 10, 8, 244))
    for x in range(760, 980):
        alpha = round(244 * (1 - ((x - 760) / 220)))
        veil_draw.line((x, 0, x, HEIGHT), fill=(14, 10, 8, alpha))
    veil_draw.rectangle((0, HEIGHT - 92, WIDTH, HEIGHT), fill=(14, 10, 8, 218))
    canvas = Image.alpha_composite(canvas, veil)

    draw = ImageDraw.Draw(canvas)
    label_font = ImageFont.truetype(FONT_PATH, 22)
    title_font = ImageFont.truetype(FONT_PATH, 62)
    subtitle_font = ImageFont.truetype(FONT_PATH, 25)
    footer_font = ImageFont.truetype(FONT_PATH, 20)
    page_font = ImageFont.truetype(FONT_PATH, 17)

    draw.line((68, 68, 104, 68), fill=COPPER, width=3)
    draw.text((120, 53), str(card["label"]), font=label_font, fill=COPPER)

    title_lines = card["title"]
    assert isinstance(title_lines, list)
    y = 138
    for line in title_lines:
        draw.text((68, y), str(line), font=title_font, fill=CREAM)
        y += 82

    draw.text((70, y + 22), str(card["subtitle"]), font=subtitle_font, fill=MUTED)

    draw.text((68, HEIGHT - 57), "큐사랑 Q-LOVE · 제왕충초 연구 아카이브", font=footer_font, fill=CREAM)
    draw.text((1032, HEIGHT - 55), "브랜드 연출 이미지", font=page_font, fill=MUTED, anchor="ra")

    output_path = OUTPUT_DIR / str(card["file"])
    canvas.convert("RGB").save(output_path, quality=95)


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for card in CARDS:
        build_card(card)


if __name__ == "__main__":
    main()
