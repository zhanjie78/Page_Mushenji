#!/usr/bin/env python3
from __future__ import annotations

import argparse
import ast
import json
import sys
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Any

DEFAULT_SOURCE_URL = "https://raw.githubusercontent.com/zhanjie78/mushenji/main/mushenji_bot.py"
TARGETS = {
    "TRAIN_LOOT_CHANCE",
    "DEEP_LOOT_CHANCE",
    "LOW_TIER_LOOT",
    "HIGH_TIER_LOOT",
    "PILLS",
    "SUPER_RARE_PILLS",
    "WEAPONS",
    "LIMITED_WEAPONS",
    "ARMORS",
    "LIMITED_ARMORS",
    "ITEMS",
    "RECIPES",
}


@dataclass
class ParseResult:
    values: dict[str, Any]
    conflicts: list[dict[str, Any]]


def read_source(path: str | None) -> tuple[str, str]:
    if path:
        p = Path(path)
        return p.read_text(encoding="utf-8"), str(p)
    with urllib.request.urlopen(DEFAULT_SOURCE_URL) as resp:
        return resp.read().decode("utf-8"), DEFAULT_SOURCE_URL


def parse_assignments(source: str, source_name: str) -> dict[str, Any]:
    try:
        tree = ast.parse(source, filename=source_name)
    except SyntaxError as exc:
        msg = (
            f"Syntax error while parsing {source_name}: line {exc.lineno}, "
            f"column {exc.offset}, text={exc.text!r}"
        )
        raise RuntimeError(msg) from exc

    values: dict[str, Any] = {}
    for node in tree.body:
        target_name = None
        value_node = None
        if isinstance(node, ast.Assign) and len(node.targets) == 1 and isinstance(node.targets[0], ast.Name):
            target_name = node.targets[0].id
            value_node = node.value
        elif isinstance(node, ast.AnnAssign) and isinstance(node.target, ast.Name):
            target_name = node.target.id
            value_node = node.value

        if target_name in TARGETS and value_node is not None:
            try:
                values[target_name] = ast.literal_eval(value_node)
            except Exception as exc:  # noqa: BLE001
                line = getattr(value_node, "lineno", "?")
                raise RuntimeError(f"Failed evaluating {target_name} at line {line}: {exc}") from exc

    missing = sorted(TARGETS - set(values))
    if missing:
        raise RuntimeError(f"Missing required variables: {', '.join(missing)}")
    return values


def fullness(item: dict[str, Any]) -> int:
    score = 0
    for _, value in item.items():
        if value is None:
            continue
        if isinstance(value, (str, list, tuple, dict)) and len(value) == 0:
            continue
        score += 1
    return score


def merge_named(primary: dict[str, Any], extra: dict[str, Any], source_a: str, source_b: str) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    merged: dict[str, dict[str, Any]] = {}
    conflicts: list[dict[str, Any]] = []

    def ingest(bucket: dict[str, Any], source_name: str):
        for name, payload in bucket.items():
            base = {"name": name, **(payload if isinstance(payload, dict) else {"value": payload})}
            if name not in merged:
                merged[name] = base
                continue
            current = merged[name]
            keep_new = fullness(base) > fullness(current)
            if keep_new:
                merged[name] = base
            conflicts.append(
                {
                    "name": name,
                    "kept": source_name if keep_new else current.get("_source", source_a),
                    "dropped": current.get("_source", source_a) if keep_new else source_name,
                    "reason": "fuller_fields",
                }
            )

    ingest(primary, source_a)
    for v in merged.values():
        v["_source"] = source_a
    ingest(extra, source_b)
    for item in merged.values():
        item.pop("_source", None)
    return sorted(merged.values(), key=lambda x: x["name"]), conflicts


def build(values: dict[str, Any]) -> ParseResult:
    pills, pills_conflicts = merge_named(values["PILLS"], values["SUPER_RARE_PILLS"], "PILLS", "SUPER_RARE_PILLS")
    weapons, weapons_conflicts = merge_named(values["WEAPONS"], values["LIMITED_WEAPONS"], "WEAPONS", "LIMITED_WEAPONS")
    armors, armors_conflicts = merge_named(values["ARMORS"], values["LIMITED_ARMORS"], "ARMORS", "LIMITED_ARMORS")

    items = sorted(({"name": k, **v} for k, v in values["ITEMS"].items()), key=lambda x: x["name"])
    recipes = sorted(({"name": k, **v} for k, v in values["RECIPES"].items()), key=lambda x: x["name"])

    low_loot = [
        {"pool": "LOW", "name": name, "weight": weight}
        for name, weight in values["LOW_TIER_LOOT"]
    ]
    high_loot = [
        {"pool": "HIGH", "name": name, "weight": weight}
        for name, weight in values["HIGH_TIER_LOOT"]
    ]

    front_counts = {
        "pills": len(pills),
        "weapons": len(weapons),
        "armors": len(armors),
        "items": len(items),
        "recipes": len(recipes),
        "loot_low": len(low_loot),
        "loot_high": len(high_loot),
    }

    source_counts = {
        "TRAIN_LOOT_CHANCE": 1,
        "DEEP_LOOT_CHANCE": 1,
        "LOW_TIER_LOOT": len(values["LOW_TIER_LOOT"]),
        "HIGH_TIER_LOOT": len(values["HIGH_TIER_LOOT"]),
        "PILLS": len(values["PILLS"]),
        "SUPER_RARE_PILLS": len(values["SUPER_RARE_PILLS"]),
        "WEAPONS": len(values["WEAPONS"]),
        "LIMITED_WEAPONS": len(values["LIMITED_WEAPONS"]),
        "ARMORS": len(values["ARMORS"]),
        "LIMITED_ARMORS": len(values["LIMITED_ARMORS"]),
        "ITEMS": len(values["ITEMS"]),
        "RECIPES": len(values["RECIPES"]),
    }

    expected = {
        "pills": source_counts["PILLS"] + source_counts["SUPER_RARE_PILLS"],
        "weapons": source_counts["WEAPONS"] + source_counts["LIMITED_WEAPONS"],
        "armors": source_counts["ARMORS"] + source_counts["LIMITED_ARMORS"],
        "items": source_counts["ITEMS"],
        "recipes": source_counts["RECIPES"],
        "loot_low": source_counts["LOW_TIER_LOOT"],
        "loot_high": source_counts["HIGH_TIER_LOOT"],
    }

    missing: dict[str, list[str]] = {}
    for cat, rows in {
        "pills": pills,
        "weapons": weapons,
        "armors": armors,
        "items": items,
        "recipes": recipes,
    }.items():
        if cat == "pills":
            source_names = set(values["PILLS"]) | set(values["SUPER_RARE_PILLS"])
        elif cat == "weapons":
            source_names = set(values["WEAPONS"]) | set(values["LIMITED_WEAPONS"])
        elif cat == "armors":
            source_names = set(values["ARMORS"]) | set(values["LIMITED_ARMORS"])
        elif cat == "items":
            source_names = set(values["ITEMS"])
        else:
            source_names = set(values["RECIPES"])
        front_names = {r["name"] for r in rows}
        diff = sorted(source_names - front_names)
        if diff:
            missing[cat] = diff

    payload = {
        "meta": {
            "source": "mushenji_bot.py",
            "encoding": "utf-8",
        },
        "loot": {
            "trainChance": values["TRAIN_LOOT_CHANCE"],
            "deepChance": values["DEEP_LOOT_CHANCE"],
            "low": low_loot,
            "high": high_loot,
        },
        "pills": pills,
        "weapons": weapons,
        "armors": armors,
        "items": items,
        "recipes": recipes,
        "syncReport": {
            "sourceCounts": source_counts,
            "frontendCounts": front_counts,
            "expectedCounts": expected,
            "missingNames": missing,
            "conflicts": pills_conflicts + weapons_conflicts + armors_conflicts,
            "isConsistent": expected == front_counts and not missing,
        },
    }
    return ParseResult(values=payload, conflicts=payload["syncReport"]["conflicts"])


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", help="Local mushenji_bot.py path (optional)")
    parser.add_argument("--out", default="docs/data/atlas.json")
    parser.add_argument("--report", default="docs/data/atlas_report.json")
    args = parser.parse_args()

    source_text, source_name = read_source(args.source)
    values = parse_assignments(source_text, source_name)
    result = build(values)

    out_path = Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(result.values, ensure_ascii=False, indent=2), encoding="utf-8")

    report_data = result.values["syncReport"]
    Path(args.report).write_text(json.dumps(report_data, ensure_ascii=False, indent=2), encoding="utf-8")

    if not report_data["isConsistent"]:
        print("完整性校验失败：", json.dumps(report_data, ensure_ascii=False, indent=2))
        return 2

    print("同步完成且计数一致。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
