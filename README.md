\# 牧神记教程站



本目录为静态教程站点（HTML/CSS/JS），数据由 `tools/extract\_mushenji\_docs.py` 从代码中自动抽取。



\## 使用方式



\### 1) 运行抽取器



```bash

python tools/extract\_mushenji\_docs.py

```



输出位置：



```

tutorial\_site/data/commands.json

tutorial\_site/data/features.json

tutorial\_site/data/errors.json

```



\### 2) 本地预览



```bash

cd tutorial\_site

python -m http.server 8000

```



浏览器访问：`http://localhost:8000/index.html`



\### 3) 图片资源



将下列资源替换为自定义图片：



```

tutorial\_site/assets/hero.jpg

tutorial\_site/assets/chapters/\*.jpg

```



\## 覆盖性报告



\- 抽取命令数量：`30`

\- 文档渲染方式：

&nbsp; - 每个命令都会进入「命令速查表」章节与系统速查分类。

&nbsp; - 未能匹配到章节映射的命令依然会出现在速查表。



\### 已覆盖命令（全量）



```

检测灵体 / 我的灵体 / 我的配方 / 闭关修炼 / 突破 / 深度闭关 / 查看闭关 / 强行出关 / 储物袋

前往 / 拜访 / 出售 / 喂食 / 鬼市 / 堵门 / 试药 / 服用 / 炼制 / 图鉴 / 道门

宗门 / 任务 / 榜单 / 传闻 / 世界观 / 人物 / 势力 / 地名 / 天道 / 帮助

```



\### 未覆盖或无法定位章节



无。若新增指令未出现在章节，请在 `tutorial\_site/app.js` 的 `sectionMappings` 中追加映射。



\## 数据来源说明



\- 所有指令、系统、参数、冷却与错误提示均从 `mushenji\_bot.py` 解析得出。

\- 若解析失败，页面会标注 `Unknown`，并保留代码引用位置作为溯源。



