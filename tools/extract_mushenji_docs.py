#!/usr/bin/env python3
import argparse
import json
import re
from pathlib import Path


COMMAND_PATTERN = re.compile(r"(?:if|elif)\s+cmd\s*==\s*[\"']([^\"']+)[\"']")


def extract_commands(source_text: str) -> list[dict]:
    commands = sorted(set(COMMAND_PATTERN.findall(source_text)))
    results = []
    for name in commands:
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
                "references": [{"file": "mushenji_bot.py", "function": "handle_cmd"}],
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
                "references": [{"file": "mushenji_bot.py", "function": "handle_cmd"}],
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
                    "name": "TODO",
                    "details": "TODO: 补充系统常量（例如 PREFIX）",
                    "references": [{"file": "mushenji_bot.py", "function": "module"}],
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
                    "message": "TODO: 从 mushenji_bot.py 抽取错误提示文本",
                    "references": [{"file": "mushenji_bot.py", "function": "module"}],
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
