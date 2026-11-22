"""Flat fairground share cards. Title is typeset in ZCOOL KuaiLe — never model glyphs."""
import math
from PIL import Image, ImageDraw, ImageFont

FONT = "/workspace/.grok/fonts/ZCOOLKuaiLe-Regular.ttf"
TITLE = "遊樂數學場"

CREAM = (255, 244, 230, 255)
INK = (28, 36, 28, 255)
GRASS = (28, 122, 74, 255)
GRASS_DEEP = (16, 86, 50, 255)
SUN = (233, 162, 11, 255)
SUN_DEEP = (186, 116, 4, 255)
CORAL = (225, 90, 58, 255)
PAPER = (255, 253, 248, 255)
PATH = (242, 208, 164, 255)


def sky(im):
    w, h = im.size
    px = im.load()
    top = (255, 214, 156)
    bot = (255, 244, 230)
    for y in range(h):
        t = y / max(1, h - 1)
        row = tuple(int(top[i] + (bot[i] - top[i]) * t) for i in range(3)) + (255,)
        for x in range(w):
            px[x, y] = row


def disc(draw, cx, cy, r, fill, outline=None, width=0):
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=fill, outline=outline, width=width)


def overlaps(a, b, pad=0):
    ax0, ay0, ax1, ay1 = a
    bx0, by0, bx1, by1 = b
    return not (ax1 + pad <= bx0 or bx1 + pad <= ax0 or ay1 + pad <= by0 or by1 + pad <= ay0)


def ferris(draw, cx, cy, r, leg_y):
    lw = max(4, r // 26)
    draw.line([(cx, cy), (cx - r * 0.92, leg_y)], fill=INK, width=lw)
    draw.line([(cx, cy), (cx + r * 0.78, leg_y)], fill=INK, width=lw)
    ring = max(7, r // 10)
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=CORAL, width=ring)
    inner = int(r * 0.68)
    draw.ellipse([cx - inner, cy - inner, cx + inner, cy + inner], outline=SUN, width=max(4, ring - 3))
    gr = max(7, r // 12)
    for i in range(8):
        a = math.radians(i * 45 - 90)
        x = cx + math.cos(a) * r
        y = cy + math.sin(a) * r
        draw.line([(cx, cy), (x, y)], fill=INK, width=max(2, lw - 2))
        disc(draw, x, y, gr, PAPER, INK, 2)
        disc(draw, x, y, max(3, gr - 4), SUN if i % 2 == 0 else CORAL)
    hub = max(9, r // 8)
    disc(draw, cx, cy, hub, PAPER, INK, 3)
    disc(draw, cx, cy, hub * 0.45, CORAL)
    return (cx - r - gr, cy - r - gr, cx + r + gr, max(leg_y, cy + r + gr))


def carousel(draw, x, base, w):
    plat_h = max(16, int(w * 0.14))
    plat_y = base - plat_h
    roof_top = plat_y - int(w * 0.62)
    mid = x + w / 2
    # tent
    draw.polygon([(mid, roof_top), (x + 4, plat_y + 2), (x + w - 4, plat_y + 2)], fill=CORAL)
    # two bands
    for t, col, thick in ((0.42, PAPER, 0.12), (0.62, SUN, 0.1)):
        y0 = roof_top + (plat_y - roof_top) * t
        y1 = y0 + (plat_y - roof_top) * thick
        def half(y):
            return (w / 2 - 6) * ((y - roof_top) / (plat_y - roof_top))
        draw.polygon(
            [(mid - half(y0), y0), (mid + half(y0), y0), (mid + half(y1), y1), (mid - half(y1), y1)],
            fill=col,
        )
    draw.line([(mid, roof_top), (x + 4, plat_y), (x + w - 4, plat_y), (mid, roof_top)], fill=INK, width=4)
    disc(draw, mid, roof_top + 2, max(6, w // 16), SUN, INK, 3)
    for i in range(5):
        px = x + w * (0.18 + i * 0.16)
        draw.line([(px, plat_y - w * 0.22), (px, plat_y + 2)], fill=SUN_DEEP, width=max(3, w // 40))
        disc(draw, px, plat_y - w * 0.22, max(3, w // 36), SUN)
    # two flat horses, side-on silhouettes, no faces
    def horse(hx, hy, s, flip=False):
        d = -1 if flip else 1
        draw.rounded_rectangle([hx, hy, hx + s, hy + s * 0.42], radius=6, fill=PAPER, outline=INK, width=3)
        head = [hx + s * 0.72, hy - s * 0.48, hx + s * 1.12, hy + s * 0.08] if d > 0 else [hx - s * 0.12, hy - s * 0.48, hx + s * 0.28, hy + s * 0.08]
        draw.ellipse(head, fill=PAPER, outline=INK, width=3)
        ear = (hx + s * 0.95, hy - s * 0.5) if d > 0 else (hx + s * 0.05, hy - s * 0.5)
        draw.polygon([(ear[0], ear[1] + 8), (ear[0] + 8 * d, ear[1] - 14), (ear[0] + 14 * d, ear[1] + 4)], fill=SUN, outline=INK)
        for k in (0.18, 0.4, 0.62, 0.82):
            fx = hx + s * k
            draw.line([(fx, hy + s * 0.32), (fx, hy + s * 0.62)], fill=INK, width=3)

    horse(x + w * 0.16, plat_y - w * 0.16, w * 0.28)
    horse(x + w * 0.62, plat_y - w * 0.12, w * 0.26, flip=True)
    draw.rounded_rectangle([x, plat_y, x + w, base + 6], radius=plat_h // 2, fill=PAPER, outline=INK, width=4)
    # redraw horse legs in front of nothing; platform covers lower legs' tops — fine
    return (x, roof_top - 8, x + w, base + 6)


def booth(draw, x, base, w, h):
    body_top = base - h
    aw_l, aw_r = x - 16, x + w + 16
    aw_top = body_top - int(h * 0.22)
    draw.rounded_rectangle([aw_l, aw_top, aw_r, body_top + 10], radius=8, fill=SUN, outline=INK, width=4)
    stripe = (aw_r - aw_l) / 6
    for i in range(6):
        if i % 2:
            draw.rectangle([aw_l + i * stripe, aw_top + 3, aw_l + (i + 1) * stripe, body_top + 8], fill=CORAL)
    scallop_r = (aw_r - aw_l) / 6 / 2
    for i in range(6):
        cx = aw_l + scallop_r + i * scallop_r * 2
        disc(draw, cx, body_top + 4, scallop_r * 0.78, CORAL if i % 2 == 0 else SUN_DEEP, INK, 2)
    draw.rounded_rectangle([x, body_top, x + w, base], radius=14, fill=CORAL, outline=INK, width=4)
    m = int(w * 0.18)
    draw.rounded_rectangle(
        [x + m, body_top + h * 0.18, x + w - m, body_top + h * 0.58],
        radius=8,
        fill=PAPER,
        outline=INK,
        width=3,
    )
    draw.line([(x + w / 2, body_top + h * 0.18), (x + w / 2, body_top + h * 0.58)], fill=INK, width=3)
    draw.rectangle([x + m - 2, body_top + h * 0.52, x + w - m + 2, body_top + h * 0.62], fill=SUN_DEEP)
    return (aw_l, aw_top, aw_r, base)


def bunting(draw, x0, x1, y, n=13):
    cols = [CORAL, SUN, GRASS, PAPER]
    span = (x1 - x0) / n
    pts = []
    for i in range(n + 1):
        t = i / n
        sag = math.sin(t * math.pi) * 16
        pts.append((x0 + (x1 - x0) * t, y + sag))
    draw.line(pts, fill=INK, width=3)
    for i in range(n):
        cx = (pts[i][0] + pts[i + 1][0]) / 2
        top = (pts[i][1] + pts[i + 1][1]) / 2
        draw.polygon(
            [(cx - span * 0.26, top), (cx + span * 0.26, top), (cx, top + 28)],
            fill=cols[i % len(cols)],
            outline=INK,
        )


def balloons(draw, pts):
    boxes = []
    for cx, cy, r, col in pts:
        disc(draw, cx, cy, r, col, INK, 3)
        disc(draw, cx - r * 0.3, cy - r * 0.28, max(3, r * 0.22), PAPER)
        draw.line([(cx, cy + r), (cx + 6, cy + r + 28)], fill=INK, width=2)
        boxes.append((cx - r, cy - r, cx + r, cy + r + 28))
    return boxes


def sun(draw, cx, cy, r):
    for i in range(10):
        a = math.radians(i * 36)
        draw.line(
            [(cx + math.cos(a) * (r + 6), cy + math.sin(a) * (r + 6)),
             (cx + math.cos(a) * (r + 22), cy + math.sin(a) * (r + 22))],
            fill=SUN,
            width=7,
        )
    disc(draw, cx, cy, r, SUN, INK, 4)
    disc(draw, cx - r * 0.28, cy - r * 0.28, r * 0.22, PAPER)
    return (cx - r - 24, cy - r - 24, cx + r + 24, cy + r + 24)


def flowers(draw, coords):
    for x, y, col in coords:
        disc(draw, x, y, 6, col, INK, 2)
        disc(draw, x, y, 2, PAPER)


def plaque(base, text, font_size, center):
    font = ImageFont.truetype(FONT, font_size)
    bbox = font.getbbox(text)
    gw, gh = bbox[2] - bbox[0], bbox[3] - bbox[1]
    pad_x, pad_y = int(font_size * 0.22), int(gh * 0.38)
    pw, ph = gw + pad_x * 2, gh + pad_y * 2
    cx, cy = center
    left, top = int(cx - pw / 2), int(cy - ph / 2)
    d = ImageDraw.Draw(base)
    radius = 28
    d.rounded_rectangle([left + 7, top + 8, left + pw + 7, top + ph + 8], radius=radius, fill=CORAL)
    d.rounded_rectangle([left - 5, top - 5, left + pw + 5, top + ph + 5], radius=radius + 2, fill=SUN)
    d.rounded_rectangle([left, top, left + pw, top + ph], radius=radius, fill=PAPER)
    tx = left + pad_x - bbox[0]
    ty = top + pad_y - bbox[1]
    d.text((tx, ty), text, font=font, fill=INK)
    glyph = (tx + bbox[0], ty + bbox[1], tx + bbox[2], ty + bbox[3])
    card = (left - 5, top - 5, left + pw + 12, top + ph + 13)
    return glyph, card


def draw_og():
    w, h = 1200, 630
    im = Image.new("RGBA", (w, h), CREAM)
    sky(im)
    d = ImageDraw.Draw(im)
    bunting(d, 16, 1184, 6, 15)
    # back / front hills
    d.ellipse([-40, 500, 820, 900], fill=GRASS_DEEP)
    d.ellipse([-180, 530, 1500, 1020], fill=GRASS)
    d.polygon([(520, 630), (690, 630), (640, 500), (560, 500)], fill=PATH)
    flowers(d, [(150, 575, CORAL), (210, 600, SUN), (360, 560, PAPER), (860, 585, CORAL), (940, 555, SUN), (1088, 590, PAPER)])
    # rides first, title last and asserted clear
    sun_box = sun(d, 1004, 78, 40)
    balloon_boxes = balloons(d, [(78, 118, 30, GRASS), (138, 78, 22, CORAL)])
    ferris_box = ferris(d, 1072, 420, 112, 552)
    carousel_box = carousel(d, 28, 555, 196)
    booth_box = booth(d, 470, 575, 210, 148)
    glyph, card = plaque(im, TITLE, 216, (548, 268))
    obstacles = [("sun", sun_box), ("ferris", ferris_box), ("carousel", carousel_box), ("booth", booth_box), *[(f"balloon{i}", b) for i, b in enumerate(balloon_boxes)]]
    print("OG glyph", tuple(int(v) for v in glyph), "card", tuple(int(v) for v in card))
    for name, box in obstacles:
        hit = overlaps(box, glyph, pad=6)
        hit_card = overlaps(box, card, pad=2)
        print(f"  {name} {tuple(int(v) for v in box)} glyph_hit={hit} card_hit={hit_card}")
        if hit:
            raise SystemExit(f"OG title glyph intersects {name}")
    # margins: glyphs well inside the frame
    if glyph[0] < 48 or glyph[1] < 48 or glyph[2] > w - 48 or glyph[3] > h - 48:
        raise SystemExit(f"OG title too close to an edge: {glyph}")
    return im


def draw_banner():
    w, h = 1200, 264
    im = Image.new("RGBA", (w, h), CREAM)
    sky(im)
    d = ImageDraw.Draw(im)
    d.ellipse([-60, 176, 760, 460], fill=GRASS_DEEP)
    d.ellipse([-80, 196, 1400, 500], fill=GRASS)
    flowers(d, [(700, 236, CORAL), (760, 248, SUN), (1120, 232, PAPER)])
    sun_box = sun(d, 1144, 52, 20)
    ferris_box = ferris(d, 1036, 162, 70, 230)
    carousel_box = carousel(d, 668, 234, 132)
    booth_box = booth(d, 824, 238, 100, 78)
    # Title lockup: left half, sitting above the midline.
    font = ImageFont.truetype(FONT, 156)
    bbox = font.getbbox(TITLE)
    gw, gh = bbox[2] - bbox[0], bbox[3] - bbox[1]
    gx, gy = 44, 32
    tx, ty = gx - bbox[0], gy - bbox[1]
    pad_x, pad_y = 16, 12
    left, top = gx - pad_x, gy - pad_y
    right, bot = gx + gw + pad_x, gy + gh + pad_y
    d.rounded_rectangle([left + 4, top + 5, right + 4, bot + 5], radius=16, fill=CORAL)
    d.rounded_rectangle([left - 4, top - 4, right + 4, bot + 4], radius=18, fill=SUN)
    d.rounded_rectangle([left, top, right, bot], radius=16, fill=PAPER)
    d.text((tx, ty), TITLE, font=font, fill=INK)
    glyph = (gx, gy, gx + gw, gy + gh)
    card = (left - 4, top - 4, right + 8, bot + 9)
    print("BAN glyph", glyph, "card", card)
    if glyph[2] >= 600:
        raise SystemExit("banner title enters the right half")
    if glyph[3] >= int(h * 0.8):
        raise SystemExit("banner title enters the bottom fifth")
    if (glyph[1] + glyph[3]) / 2 >= h / 2:
        raise SystemExit("banner lockup is not above the midline")
    for name, box in (("sun", sun_box), ("ferris", ferris_box), ("carousel", carousel_box), ("booth", booth_box)):
        if overlaps(box, glyph, pad=4):
            raise SystemExit(f"banner title intersects {name} {box}")
        print(f"  {name} {tuple(int(v) for v in box)} ok")
    return im


def main():
    og = draw_og().convert("RGB")
    ban = draw_banner().convert("RGB")
    og.save("/workspace/.grok/og-raw.png", "PNG")
    ban.save("/workspace/.grok/banner-raw.png", "PNG")
    print("wrote", og.size, ban.size)


if __name__ == "__main__":
    main()
