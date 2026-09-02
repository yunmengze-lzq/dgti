from __future__ import annotations

import json
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "assets" / "dgti" / "characters-v2"
CROPS_DIR = OUT_DIR / "crops"


STATUS = {
    "pptgod": ("redraw", "需单独重画：目标女角色，当前偏男"),
    "aicoworker": ("redraw", "需单独重画：人机同事，强调预制感和人机感"),
    "shitmountain": ("watch", "微调：去皇冠感，保留文件山"),
}

PRESERVED_FIELDS = (
    "reviewImage",
    "refinedCandidates",
    "confirmedImage",
    "currentVersion",
    "lastUpdated",
    "naming",
    "styleVariants",
)


SHEETS = [
    {
        "group": "core",
        "groupName": "核心牛马组",
        "path": ROOT / "public" / "assets" / "dgti" / "sheets" / "dgti-core-lineup-v2.png",
        "roles": [
            ("chosen", "天选打工人", "男", "窄长脸，黑眼圈", "被迫英雄、惊慌但亮眼"),
            ("cowhorse", "牛马本马", "男", "方圆脸，下垂眼", "苦哈哈、憨厚、过载"),
            ("fish", "摸鱼圣体", "男", "少年圆脸，半睁眼", "无辜、低功耗、随时待机"),
            ("traitor", "工贼嫌疑人", "男", "窄尖脸，标准笑", "礼貌过头、像背话术"),
        ],
    },
    {
        "group": "support",
        "groupName": "救火背锅组",
        "path": ROOT / "public" / "assets" / "dgti" / "sheets" / "dgti-support-lineup-v2.png",
        "roles": [
            ("potman", "背锅侠", "男", "短方脸，大眼", "震惊但熟练"),
            ("firefighter", "职场消防员", "女", "运动感短脸，上扬眉", "紧张、燃、救场"),
            ("crispy", "脆皮牛马", "男", "长发清瘦脸，柔和下垂眼", "可爱硬撑、易碎、低血条但讨喜"),
            ("boundary", "边界门神", "女", "高马尾青春美少女脸，平直眉", "清爽可爱、温柔但不让步"),
        ],
    },
    {
        "group": "bossy",
        "groupName": "领导污染组",
        "path": ROOT / "public" / "assets" / "dgti" / "sheets" / "dgti-bossy-lineup-v2.png",
        "roles": [
            ("leadercard", "领导体验卡", "男", "方脸，强眉骨", "自信、压迫、好为人师"),
            ("pptgod", "PPT 仙人", "女", "精英鹅蛋脸，疲惫眼", "优雅、加班感、汇报光"),
            ("meetingbot", "会议永动机", "男", "方圆脸，眼镜", "认真过头、无辜拉会"),
            ("wishpool", "需求许愿池", "女", "圆脸，大眼", "天真但危险"),
        ],
    },
    {
        "group": "chaos",
        "groupName": "混乱屎山组",
        "path": ROOT / "public" / "assets" / "dgti" / "sheets" / "dgti-chaos-lineup-v2.png",
        "slotCount": 4,
        "roles": [
            ("stirrer", "搅 shit 棍", "男", "小尖脸，眯眼坏笑", "坏笑、兴奋、明知故犯", 1),
            ("shitmountain", "屎山继承人", "男", "长脸，下垂眼", "麻木、被迫继承、历经版本", 2),
            ("twoface", "两面人", "女", "半边甜笑半边冷脸", "对上讨好、对下甩锅", 4),
        ],
    },
    {
        "group": "social",
        "groupName": "社交修复组",
        "path": ROOT / "public" / "assets" / "dgti" / "sheets" / "dgti-social-lineup-v2.png",
        "roles": [
            ("alive", "活人感代表", "女", "开朗圆脸，大笑眼", "明亮、主动、活人感爆棚"),
            ("emohealer", "情绪价值供应商", "女", "软妹圆润脸，水润眼", "甜软、温柔、治愈但也会累"),
            ("silentgod", "沉默大神", "男", "瘦长脸，冷眼，嘴上拉链", "安静、可靠、闭嘴干活"),
            ("aicoworker", "人机同事", "女", "标准椭圆脸，空灵微笑，轻微机械感", "预制、礼貌、人机感、微没灵魂"),
        ],
    },
]


def crop_sheet(sheet: dict, manifest: list[dict], start_order: int, existing: dict) -> int:
    image = Image.open(sheet["path"]).convert("RGB")
    width, height = image.size
    slot_count = sheet.get("slotCount", 4)

    for index, role_def in enumerate(sheet["roles"]):
        code, name, gender, face, expression, *slot_override = role_def
        source_slot = slot_override[0] if slot_override else index + 1
        order = start_order + source_slot - 1
        left = round(width * (source_slot - 1) / slot_count)
        right = round(width * source_slot / slot_count)
        crop = image.crop((left, 0, right, height))
        filename = f"{order:02d}-{code}-crop-v2.png"
        out_path = CROPS_DIR / filename
        crop.save(out_path)
        status, review_note = STATUS.get(code, ("ok", "可进入单角色精修"))
        existing_role = existing.get(code, {})
        if existing_role.get("reviewStatus") in {"candidate", "confirmed"}:
            status = existing_role["reviewStatus"]
            review_note = existing_role.get("reviewNote", review_note)

        role = {
                "order": order,
                "assetId": f"dgti-char-{order:02d}-{code}",
                "code": code,
                "name": name,
                "gender": gender,
                "face": face,
                "expression": expression,
                "group": sheet["group"],
                "groupName": sheet["groupName"],
                "sourceSlot": source_slot,
                "sourceSheet": sheet["path"].relative_to(ROOT).as_posix(),
                "reviewStatus": status,
                "reviewNote": review_note,
                "image": f"/assets/dgti/characters-v2/crops/{filename}",
                "naming": {
                    "cropFile": filename,
                    "nextRefinedPattern": f"{order:02d}-{code}-hero-v3.png",
                    "futureMerchPattern": f"{order:02d}-{code}-ceramic-v1.png",
                    "futureBondPattern": f"bond-{{bond_code}}-{code}-v1.png",
                },
            }
        for field in PRESERVED_FIELDS:
            if field in existing_role:
                role[field] = existing_role[field]
        manifest.append(role)
    return start_order + slot_count


def main() -> None:
    CROPS_DIR.mkdir(parents=True, exist_ok=True)
    manifest_path = OUT_DIR / "manifest.json"
    existing = {}
    if manifest_path.exists():
        data = json.loads(manifest_path.read_text(encoding="utf-8"))
        existing = {role["code"]: role for role in data}

    manifest: list[dict] = []
    order = 1
    for sheet in SHEETS:
        order = crop_sheet(sheet, manifest, order, existing)

    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(manifest)} character crops to {CROPS_DIR}")


if __name__ == "__main__":
    main()
