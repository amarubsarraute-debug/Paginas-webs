from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "img"
OUT.mkdir(parents=True, exist_ok=True)


def font(name, size):
    candidates = [
        Path("C:/Windows/Fonts") / name,
        Path("C:/Windows/Fonts/arial.ttf"),
    ]
    for path in candidates:
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default(size)


SERIF = "georgia.ttf"
SERIF_BOLD = "georgiab.ttf"
SANS = "arial.ttf"
SANS_BOLD = "arialbd.ttf"


def gradient(size, top, bottom):
    w, h = size
    image = Image.new("RGB", size, top)
    draw = ImageDraw.Draw(image)
    tr, tg, tb = top
    br, bg, bb = bottom
    for y in range(h):
        t = y / max(1, h - 1)
        color = (
            int(tr + (br - tr) * t),
            int(tg + (bg - tg) * t),
            int(tb + (bb - tb) * t),
        )
        draw.line([(0, y), (w, y)], fill=color)
    return image


def rounded_shadow(base, box, radius, fill, shadow=(21, 19, 15, 46), blur=26, dy=24):
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    x1, y1, x2, y2 = box
    draw.rounded_rectangle((x1, y1 + dy, x2, y2 + dy), radius, fill=shadow)
    layer = layer.filter(ImageFilter.GaussianBlur(blur))
    base.alpha_composite(layer)
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle(box, radius, fill=fill)


def save_webp(image, name, quality=84):
    image.convert("RGB").save(OUT / name, "WEBP", quality=quality, method=6)


def hero():
    img = gradient((1200, 900), (255, 253, 248), (232, 223, 208)).convert("RGBA")
    draw = ImageDraw.Draw(img)

    for x in [160, 360, 560, 760, 960]:
        draw.line((x, 80, x, 820), fill=(21, 19, 15, 14), width=1)
    for y in [170, 350, 530, 710]:
        draw.line((80, y, 1120, y), fill=(21, 19, 15, 14), width=1)
    draw.rounded_rectangle((58, 58, 1142, 842), 38, fill=(21, 19, 15, 10))

    rounded_shadow(img, (132, 124, 922, 684), 30, (255, 253, 248, 255), blur=30, dy=30)
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((132, 124, 922, 188), 30, fill=(21, 19, 15, 255))
    draw.rectangle((132, 158, 922, 188), fill=(21, 19, 15, 255))
    for cx, color in [(178, "#e56b55"), (210, "#e1b45f"), (242, "#69a26f")]:
        draw.ellipse((cx - 8, 148, cx + 8, 164), fill=color)
    draw.rounded_rectangle((304, 144, 574, 168), 12, fill=(255, 255, 255, 28))

    draw.rounded_rectangle((178, 238, 430, 568), 22, fill=(239, 231, 219, 255))
    draw.rounded_rectangle((210, 278, 308, 290), 6, fill=(47, 111, 98, 255))
    draw.text((210, 314), "Web local", font=font(SERIF, 58), fill=(21, 19, 15))
    draw.text((210, 372), "premium", font=font(SERIF, 58), fill=(21, 19, 15))
    draw.rounded_rectangle((210, 452, 358, 494), 21, fill=(21, 19, 15))
    draw.text((238, 464), "WhatsApp", font=font(SANS_BOLD, 17), fill=(255, 253, 248))

    draw.rounded_rectangle((476, 238, 832, 406), 24, fill=(21, 19, 15))
    draw.text((518, 286), "Confianza", font=font(SERIF, 46), fill=(255, 253, 248))
    draw.text((520, 332), "antes del primer mensaje", font=font(SANS, 20), fill=(205, 199, 189))
    draw.rounded_rectangle((476, 438, 636, 568), 22, fill=(47, 111, 98, 38))
    draw.rounded_rectangle((672, 438, 832, 568), 22, fill=(168, 95, 61, 44))
    draw.text((516, 500), "SEO local", font=font(SANS_BOLD, 24), fill=(21, 19, 15))
    draw.text((705, 500), "CTA claro", font=font(SANS_BOLD, 24), fill=(21, 19, 15))

    rounded_shadow(img, (760, 256, 1026, 756), 34, (21, 19, 15, 255), blur=28, dy=28)
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((784, 298, 1002, 708), 24, fill=(246, 242, 234, 255))
    draw.rounded_rectangle((816, 334, 902, 344), 5, fill=(47, 111, 98, 255))
    draw.text((816, 366), "Tu negocio", font=font(SERIF, 38), fill=(21, 19, 15))
    draw.text((816, 408), "bien visto", font=font(SERIF, 38), fill=(21, 19, 15))
    draw.rounded_rectangle((816, 476, 970, 518), 21, fill=(21, 19, 15))
    draw.rounded_rectangle((816, 552, 970, 622), 16, fill=(255, 253, 248, 255))
    draw.rounded_rectangle((816, 642, 970, 664), 11, fill=(47, 111, 98, 56))
    save_webp(img, "hero-studio.webp", 84)


def portfolio(name, title, subtitle, sector, metric, bg_top, bg_bottom, panel, accent):
    img = gradient((520, 360), bg_top, bg_bottom).convert("RGBA")
    draw = ImageDraw.Draw(img)
    draw.polygon([(0, 260), (160, 220), (520, 270), (520, 360), (0, 360)], fill=accent + (30,))
    rounded_shadow(img, (42, 44, 478, 306), 22, (255, 253, 248, 255), blur=18, dy=18)
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((42, 44, 478, 92), 22, fill=(21, 19, 15))
    draw.rectangle((42, 68, 478, 92), fill=(21, 19, 15))
    for cx, color in [(68, "#e56b55"), (90, "#e1b45f"), (112, "#69a26f")]:
      draw.ellipse((cx - 5, 63, cx + 5, 73), fill=color)
    draw.rounded_rectangle((75, 120, 162, 128), 4, fill=accent)
    draw.rounded_rectangle((75, 164, 182, 172), 4, fill=(21, 19, 15, 44))
    draw.rounded_rectangle((75, 194, 164, 202), 4, fill=(21, 19, 15, 32))
    draw.rounded_rectangle((208, 120, 434, 206), 16, fill=panel)
    draw.text((232, 146), title, font=font(SERIF, 27), fill=(255, 253, 248))
    draw.text((234, 180), subtitle, font=font(SANS, 13), fill=(225, 220, 212))
    draw.rounded_rectangle((208, 224, 310, 270), 12, fill=(21, 19, 15, 20))
    draw.rounded_rectangle((332, 224, 434, 270), 12, fill=(21, 19, 15, 20))
    draw.text((224, 242), sector, font=font(SANS_BOLD, 13), fill=(21, 19, 15))
    draw.text((348, 242), metric, font=font(SANS_BOLD, 13), fill=(21, 19, 15))
    save_webp(img, name, 82)


def og():
    img = Image.new("RGBA", (1200, 630), (246, 242, 234, 255))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((70, 70, 1130, 560), 36, fill=(21, 19, 15))
    draw.ellipse((108, 108, 176, 176), fill=(255, 253, 248))
    draw.text((130, 112), "A", font=font(SERIF, 46), fill=(21, 19, 15))
    draw.text((210, 130), "Amaru Web Studio", font=font(SANS_BOLD, 30), fill=(255, 253, 248))
    draw.text((120, 250), "Webs premium para", font=font(SERIF, 82), fill=(255, 253, 248))
    draw.text((120, 340), "negocios locales", font=font(SERIF, 82), fill=(255, 253, 248))
    draw.text((124, 482), "Maldonado · WhatsApp · Conversion", font=font(SANS, 28), fill=(202, 196, 186))
    draw.rounded_rectangle((890, 110, 1040, 260), 28, fill=(47, 111, 98))
    draw.rounded_rectangle((935, 300, 1065, 430), 24, fill=(168, 95, 61))
    save_webp(img, "og-amaru-web-studio.webp", 84)


if __name__ == "__main__":
    hero()
    portfolio("portfolio-basil.webp", "Basil", "Sanitario y reformas", "Servicios", "Consulta", (247, 243, 236), (219, 232, 225), (22, 58, 52), (47, 111, 98))
    portfolio("portfolio-electricidad.webp", "La Barra", "Electricidad local", "Urgencias", "24h", (247, 242, 231), (230, 212, 158), (25, 23, 20), (215, 156, 58))
    portfolio("portfolio-auto.webp", "Automotora", "Catalogo y confianza", "Vehiculos", "Stock", (248, 241, 231), (216, 224, 226), (30, 41, 50), (155, 90, 60))
    og()
