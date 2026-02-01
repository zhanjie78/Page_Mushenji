# 牧神记教程站（Page_Mushenji）

本仓库是 **静态教程站点**（纯 HTML/CSS/JS），内容来源于 `zhanjie78/mushenji` 仓库中的 `mushenji_bot.py`。站点部署在 GitHub Pages 的 `/docs` 目录下，打开 `docs/index.html` 即可本地预览。

> ⚠️ 当前环境无法访问 GitHub（403），因此数据层仅保留抽取后的占位字段（标记为 TODO）。如需完整内容，请在可访问 GitHub 的环境中运行抽取脚本。

## 目录结构

```
docs/
  index.html
  styles.css
  app.js
  data/
    commands.json
    features.json
    errors.json
tools/
  extract_mushenji_docs.py
```

## 数据层（JSON）说明

### commands.json
每条命令包含以下字段（必须存在）：

```json
{
  "name": "命令名",
  "aliases": [],
  "usage": [],
  "examples": [],
  "category": "Quick Start",
  "description": "TODO: 待从 mushenji_bot.py 补充说明",
  "pitfalls": [],
  "related": [],
  "details": {
    "parameters": [],
    "preconditions": [],
    "outcomes": []
  },
  "references": [
    { "file": "mushenji_bot.py", "function": "handle_cmd" }
  ]
}
```

### features.json / errors.json
* `features.json`：系统常量（例如指令前缀、冷却时间等）。
* `errors.json`：失败提示或冷却提示信息。

## 如何更新 JSON 数据

1. 获取 `zhanjie78/mushenji` 仓库（需确保网络可访问 GitHub）。
2. 运行抽取脚本：

```bash
python tools/extract_mushenji_docs.py --repo /path/to/mushenji
```

3. 产出会覆盖以下文件：
```
docs/data/commands.json
docs/data/features.json
docs/data/errors.json
```

> 抽取器使用正则扫描 `mushenji_bot.py` 中的命令分支，目前只会生成命令骨架（description / examples 等仍需补充）。如需更精确的字段，请补充脚本解析逻辑。

## 本地预览

推荐使用本地静态服务（避免浏览器阻止读取 JSON）：

```bash
cd docs
python -m http.server 8000
```

访问：`http://localhost:8000/index.html`

> 若直接打开 `docs/index.html`，浏览器可能拦截 `fetch`。站点已加入 XHR 回退，但仍建议使用本地静态服务。

## GitHub Pages

本仓库以 `/docs` 作为 GitHub Pages 根目录，启用后即可访问站点。
