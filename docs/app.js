const taxonomy = [
  "卷首语",
  "壹 · 初入仙途",
  "贰 · 吐纳筑基",
  "叁 · 寻师访友",
  "肆 · 洞天法宝",
  "伍 · 宗门事务",
  "陆 · 黄枫谷秘境",
  "柒 · 太一门秘法",
  "捌 · 星宫秘法（含：牵星引灵之术）",
  "玖 · 魔道禁术",
  "拾 · 万灵秘术",
  "元婴宗密卷",
  "落云宗秘典",
  "拾壹 · 神通对决",
  "拾贰 · 夺宝奇缘",
  "拾叁 · 试炼古塔",
  "拾肆 · 合欢宗秘法",
  "终章：天道法则",
  "乱星海秘闻",
  "虚天殿副本",
  "万宝楼",
  "洞天福地",
  "灵根法则",
  "风雷翅",
  "丹魔之咒",
  "宗门外交",
  "神魂陨落",
  "黑煞教修行",
  "七焰扇",
  "落云宗灵树涅槃",
  "命令速查表",
];

const systemGroups = {
  "宗门系统": ["宗门", "道门"],
  "物品炼制": ["图鉴", "炼制", "服用", "出售"],
  "斗法系统": ["突破", "堵门"],
  "洞府系统": ["闭关修炼", "深度闭关", "查看闭关", "强行出关"],
  "万宝楼交易市场": ["鬼市"],
  "副本与活动": ["任务", "试药", "拜访"],
  "突破与渡劫": ["突破"],
  "其他（来自代码）": ["检测灵体", "我的灵体", "我的配方", "储物袋", "前往", "榜单", "传闻", "世界观", "人物", "势力", "地名", "天道", "帮助", "喂食"],
};

const sectionMappings = {
  "卷首语": ["帮助", "检测灵体", "我的灵体"],
  "壹 · 初入仙途": ["检测灵体", "我的灵体", "储物袋"],
  "贰 · 吐纳筑基": ["闭关修炼", "深度闭关", "查看闭关", "强行出关", "突破"],
  "叁 · 寻师访友": ["拜访", "宗门", "道门"],
  "肆 · 洞天法宝": ["图鉴", "炼制", "服用", "出售", "储物袋"],
  "伍 · 宗门事务": ["宗门", "任务", "宗门"],
  "陆 · 黄枫谷秘境": ["任务", "鬼市"],
  "柒 · 太一门秘法": ["宗门", "突破"],
  "捌 · 星宫秘法（含：牵星引灵之术）": ["图鉴", "炼制"],
  "玖 · 魔道禁术": ["鬼市", "试药"],
  "拾 · 万灵秘术": ["服用", "喂食"],
  "元婴宗密卷": ["宗门"],
  "落云宗秘典": ["宗门"],
  "拾壹 · 神通对决": ["堵门", "突破"],
  "拾贰 · 夺宝奇缘": ["鬼市", "任务"],
  "拾叁 · 试炼古塔": ["试药", "闭关修炼"],
  "拾肆 · 合欢宗秘法": ["服用"],
  "终章：天道法则": ["天道"],
  "乱星海秘闻": ["传闻"],
  "虚天殿副本": ["任务", "鬼市"],
  "万宝楼": ["鬼市", "出售"],
  "洞天福地": ["前往", "拜访"],
  "灵根法则": ["检测灵体"],
  "风雷翅": ["图鉴"],
  "丹魔之咒": ["服用", "试药"],
  "宗门外交": ["堵门"],
  "神魂陨落": ["突破", "试药"],
  "黑煞教修行": ["宗门", "鬼市"],
  "七焰扇": ["图鉴"],
  "落云宗灵树涅槃": ["任务"],
  "命令速查表": [],
};

const systemFeatureMapping = {
  "卷首语": ["PREFIX"],
  "壹 · 初入仙途": ["REALM_TIERS", "STAGES_PER_TIER"],
  "贰 · 吐纳筑基": ["TRAIN_CD_MIN", "TRAIN_CD_MAX", "DEEP_DURATION", "DEEP_COOLDOWN", "PASSIVE_CD", "PASSIVE_GAIN", "PASSIVE_MIN_LEN"],
  "叁 · 寻师访友": ["SECTS", "DAO_MEN_QUIZ_COOLDOWN"],
  "肆 · 洞天法宝": ["PILLS", "WEAPONS", "ARMORS", "ITEMS", "RECIPES", "SUPER_RARE"],
  "伍 · 宗门事务": ["SECT_TASK_COOLDOWN", "SECT_SIGNIN_COOLDOWN"],
  "陆 · 黄枫谷秘境": ["LOW_TIER_LOOT", "HIGH_TIER_LOOT", "TRAIN_LOOT_CHANCE"],
  "柒 · 太一门秘法": ["SUPER_RARE_PILLS"],
  "捌 · 星宫秘法（含：牵星引灵之术）": ["LIMITED_WEAPONS", "LIMITED_ARMORS"],
  "玖 · 魔道禁术": ["TEST_DRUG_COOLDOWN"],
  "拾 · 万灵秘术": ["DRAGON_BUFF_DURATION"],
  "终章：天道法则": ["GHOST_MARKET_COST", "BLOCK_GATE_CD", "TASK_COOLDOWN"],
};

const commandLookup = (commands, names) => commands.filter((cmd) => names.includes(cmd.name));

const sectionId = (name, index) => `section-${index}`;

const renderCommandCard = (cmd) => {
  const usage = cmd.usage.length ? cmd.usage : ["Unknown"];
  const parameters = cmd.parameters.length ? cmd.parameters : ["Unknown"];
  const preconditions = cmd.preconditions.length ? cmd.preconditions : ["Unknown"];
  const outcomes = cmd.outcomes.length ? cmd.outcomes : ["Unknown"];
  const examples = cmd.examples.length ? cmd.examples : ["Unknown"];
  return `
    <div class="command-card">
      <h4>${cmd.name}</h4>
      <div class="tag">指令</div>
      <div><strong>用法：</strong>${usage.map((u) => `<div>${u}</div>`).join("")}</div>
      <div><strong>参数：</strong>${parameters.map((p) => `<div>${p}</div>`).join("")}</div>
      <div><strong>前置：</strong>${preconditions.map((p) => `<div>${p}</div>`).join("")}</div>
      <div><strong>结果：</strong>${outcomes.map((o) => `<div>${o}</div>`).join("")}</div>
      <div><strong>示例：</strong>${examples.map((e) => `<div>${e}</div>`).join("")}</div>
      <div class="ref">代码参考：${cmd.references.map((r) => `${r.file}#${r.function}`).join(", ")}</div>
    </div>
  `;
};

const renderFeature = (feature) => {
  const detail = typeof feature.details === "string" ? feature.details : JSON.stringify(feature.details, null, 2);
  return `
    <details class="collapsible">
      <summary>${feature.name}</summary>
      <div class="content"><pre>${detail}</pre><div class="ref">代码参考：${feature.references.map((r) => `${r.file}#${r.function}`).join(", ")}</div></div>
    </details>
  `;
};

const renderSystemQuick = (commands) => {
  const container = document.getElementById("systemQuickContent");
  const sections = Object.entries(systemGroups)
    .map(([system, names]) => {
      const items = commandLookup(commands, names)
        .map((cmd) => `<li>${cmd.name}</li>`)
        .join("");
      return `
        <details class="collapsible">
          <summary>${system}</summary>
          <div class="content">
            <ul>${items || "<li>Unknown</li>"}</ul>
          </div>
        </details>
      `;
    })
    .join("");
  container.innerHTML = sections;
};

const renderNav = () => {
  const nav = document.getElementById("nav");
  nav.innerHTML = `
    <div class="nav-section">
      <h4>目录导航</h4>
      ${taxonomy
        .map((title, index) => `<a href="#${sectionId(title, index)}">${title}</a>`)
        .join("")}
    </div>
  `;
};

const renderSections = (commands, features, errors) => {
  const container = document.getElementById("chapters");
  container.innerHTML = taxonomy
    .map((title, index) => {
      const mappedCommands = commandLookup(commands, sectionMappings[title] || []);
      const mappedFeatures = (systemFeatureMapping[title] || []).map((key) =>
        features.find((feature) => feature.name === key) || { name: key, details: "Unknown", references: [] }
      );
      const isQuickTable = title === "命令速查表";
      const errorSection = title === "终章：天道法则" ? errors : [];

      const bannerHue = (index * 28) % 360;
      return `
        <section class="section" id="${sectionId(title, index)}">
          <header class="section-header">
            <h2>${title}</h2>
            <p>${isQuickTable ? "全量指令清单与系统速查。" : "根据代码抽取的系统与指令说明。"}</p>
          </header>
          <div class="section-banner" role="img" aria-label="${title}" style="--banner-hue: ${bannerHue}"></div>
          <div class="glass-card">
            ${mappedFeatures.length ? mappedFeatures.map(renderFeature).join("") : "<div>Unknown</div>"}
            ${mappedCommands.length ? `<div class=\"card-grid\">${mappedCommands
              .map(renderCommandCard)
              .join("")}</div>` : "<div>Unknown</div>"}
            ${isQuickTable ? `<div class=\"card-grid\">${commands.map(renderCommandCard).join("")}</div>` : ""}
            ${errorSection.length ? `<details class=\"collapsible\"><summary>常见错误与失败提示</summary><div class=\"content\"><ul>${errorSection
              .map((err) => `<li>${err.message}</li>`)
              .join("")}</ul></div></details>` : ""}
          </div>
        </section>
      `;
    })
    .join("");
};

const loadData = async () => {
  const [commands, features, errors] = await Promise.all([
    fetch("data/commands.json").then((res) => res.json()),
    fetch("data/features.json").then((res) => res.json()),
    fetch("data/errors.json").then((res) => res.json()),
  ]);

  const prefixFeature = features.find((feature) => feature.name === "PREFIX");
  if (prefixFeature && typeof prefixFeature.details === "string") {
    document.getElementById("prefix").textContent = prefixFeature.details;
  }

  renderNav();
  renderSystemQuick(commands);
  renderSections(commands, features, errors);
};

const setupDrawer = () => {
  const toggle = document.getElementById("drawerToggle");
  const sidebar = document.getElementById("sidebar");
  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
};

loadData();
setupDrawer();
