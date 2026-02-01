#!/usr/bin/env python3
import argparse
import json
import re
from pathlib import Path


COMMAND_PATTERN = re.compile(r"(?:if|elif)\s+cmd\s*==\s*[\"']([^\"']+)[\"']")
REDACT_KEYWORD = "天道"


def extract_commands(source_text: str) -> list[dict]:
    commands = []
    seen = set()
    for line_no, line in enumerate(source_text.splitlines(), 1):
        match = COMMAND_PATTERN.search(line)
        if not match:
            continue
        name = match.group(1)
        if name in seen or REDACT_KEYWORD in name:
            continue
        seen.add(name)
        commands.append((name, line_no))

    results = []
    for name, line_no in sorted(commands, key=lambda item: item[0]):
        results.append(
            {
                "name": name,
                "aliases": [],
                "usage": [],
                "examples": [],
                "category": "Uncategorized",
                "description": "TODO: 待从 mushenji_bot.py 补充说明",
                "pitfalls": [],
                "related": [],
                "details": {"parameters": [], "preconditions": [], "outcomes": []},
                "source": {
                    "file": "mushenji_bot.py",
                    "line_start": line_no,
                    "line_end": line_no,
                    "registry": "handle_cmd",
                },
            }
        )
    if not results:
        results.append(
            {
                "name": "TODO",
                "aliases": [],
                "usage": [],
                "examples": [],
                "category": "Uncategorized",
                "description": "TODO: 未找到 cmd == '...'' 分支，请检查 mushenji_bot.py 里的命令注册方式。",
                "pitfalls": [],
                "related": [],
                "details": {"parameters": [], "preconditions": [], "outcomes": []},
                "source": {
                    "file": "mushenji_bot.py",
                    "line_start": None,
                    "line_end": None,
                    "registry": "handle_cmd",
                    "note": "TODO: 未找到 cmd == '...' 分支，请确认命令注册方式。",
                },
            }
        )
    return results


def main() -> None:
    parser = argparse.ArgumentParser(description="Extract Mushenji command docs from mushenji_bot.py")
    parser.add_argument("--repo", required=True, help="Path to the mushenji repo")
    parser.add_argument("--output", default="docs/data", help="Output directory for JSON files")
    args = parser.parse_args()

    repo_path = Path(args.repo).expanduser().resolve()
    bot_path = repo_path / "mushenji_bot.py"
    if not bot_path.exists():
        raise SystemExit(f"未找到 {bot_path}，请确认 mushenji repo 路径是否正确。")

    source_text = bot_path.read_text(encoding="utf-8")
    commands = extract_commands(source_text)

    output_dir = Path(args.output).resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    (output_dir / "commands.json").write_text(
        json.dumps(commands, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (output_dir / "features.json").write_text(
        json.dumps(
            [
                {
                    "id": "feature-todo",
                    "name": "TODO",
                    "description": "TODO: 从 mushenji_bot.py 或配置表补充系统说明。",
                    "unlock_stage": "TODO",
                    "dependencies": [],
                    "beginner_tips": [],
                    "advanced_notes": [],
                    "related": {"commands": [], "errors": [], "items": [], "quests": []},
                    "details": "TODO: 补充系统常量（例如 PREFIX）。",
                    "source": {
                        "file": "mushenji_bot.py",
                        "line_start": None,
                        "line_end": None,
                        "registry": "module",
                        "note": "TODO: 定位系统常量定义位置。",
                    },
                }
            ],
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    (output_dir / "errors.json").write_text(
        json.dumps(
            [
                {
                    "id": "error-todo",
                    "message": "TODO: 从 mushenji_bot.py 抽取错误提示文本",
                    "meaning": "TODO: 解释该错误含义",
                    "causes": [],
                    "fixes": [],
                    "related": {"commands": [], "features": []},
                    "source": {
                        "file": "mushenji_bot.py",
                        "line_start": None,
                        "line_end": None,
                        "registry": "module",
                        "note": "TODO: 定位错误提示文本来源。",
                    },
                }
            ],
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )

    print(f"已生成 commands.json / features.json / errors.json 至 {output_dir}")


if __name__ == "__main__":
    main()
