# 牧神记 · 大墟夜行手册（Page_Mushenji）

此仓库是一个 **静态介绍页**（HTML / CSS / JS），用于整理《牧神记》MUD 机器人的常用命令与玩法说明。  
主数据源来自 `zhanjie78/mushenji` 仓库中的 `mushenji_bot.py`，站点部署目录为 `/docs`。

 本站网址:
 
 https://msj.us.ci
 
 https://mushen.us.ci
 
 https://mushenji.us.ci

---

## 卷一：山门结构

```text
docs/
  index.html
  styles.css
  app.js
  data/
    commands.json
    features.json
    errors.json
```

---

## 卷二：三册数据卷轴

### 1) `commands.json`（命令图鉴）
每条命令需保持完整字段，推荐结构如下：

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
  ],
  "source": {
    "file": "mushenji_bot.py",
    "line_start": 123,
    "line_end": 145,
    "registry": "handle_cmd"
  }
}
```

### 2) `features.json`（机制常量）
记录系统参数（如前缀、冷却、阈值等）。

### 3) `errors.json`（错误与提示）
记录失败提示、冷却提示与修复方向。

> 前端渲染会按名称去重（命令/特性/错误），避免重复抽取导致展示冲突。

---

## 卷三：如何更新数据（当前仓库方式）

> 注意：仓库内的 `.py` 抽取脚本已移除。

当前维护方式：**直接维护 `docs/data/*.json`**。

你可以按以下顺序更新：

1. 从上游项目/运行日志整理最新命令与机制信息。
2. 手动更新：

```text
docs/data/commands.json
docs/data/features.json
docs/data/errors.json
```

3. 本地预览页面并核对：命令索引、分类、错误提示是否正常展示。

### 数据维护建议（避免丢字段）

- `commands.json`：保持 `name / usage / category / details / source` 等关键字段完整。
- `features.json`：常量值建议以字符串保存，便于前端统一解析。
- `errors.json`：建议同时补充 `causes / fixes`，便于排障。

---

## 卷四：本地起阵

推荐以本地静态服务预览（避免浏览器拦截 JSON `fetch`）：

```bash
cd docs
python -m http.server 8000
```

访问：`http://localhost:8000/index.html`

> 若直接打开 `docs/index.html`（`file://`），浏览器可能拦截请求。页面虽有内联回退，但 `docs/data/*.json` 仍是主数据源。

---

## 卷五：近期修缮纪要

- 修复横向滚动干扰：业务容器不再依赖横向滚动条，长文本改为自动换行。
- 修复卡片悬浮后滚轮发涩：聚光效果仅作用当前悬浮卡片，减少无效计算。
- 修复锚点跳转遮挡：滚动偏移按顶部导航实时高度计算，并设 `scroll-margin-top` 兜底。
- 修复粒子层可见性：统一使用 `.ruins-background` 作为背景粒子画布，`#ruins-bg` 隐藏为占位。

---

## 卷六：丹药图鉴补录规则

前端支持运行时尝试从上游源码补录丹药条目，并按：  
**章节 → 子类 → 名称** 稳定排序，且以“丹药名”为主键去重。

若网络环境无法访问 `raw.githubusercontent.com`：

- 自动回退到本地内置丹药数据；
- 在丹药图鉴区域显示“丹药源同步提示”；
- 显式展示失败项与失败原因（不静默吞掉）。

---

## 卷末：GitHub Pages

仓库以 `/docs` 作为 GitHub Pages 根目录，启用后即可直接访问站点。
