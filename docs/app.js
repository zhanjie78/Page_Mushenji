const TAXONOMY = [
  {
    id: "preface",
    title: "卷首语",
    description: "霸体启示，掌灯人传下的修行要诀。",
  },
  {
    id: "great-ruins",
    title: "壹 · 大墟残老村",
    description: "检测灵体、石像守夜与村长的吩咐。",
  },
  {
    id: "overlord-foundation",
    title: "贰 · 霸体筑基",
    description: "闭关磨炼，突破体魄的第一道关隘。",
  },
  {
    id: "imperial-reform",
    title: "叁 · 延康国师变法",
    description: "宗门与任务流转，山河秩序重新洗牌。",
  },
  {
    id: "heavenly-devil",
    title: "肆 · 天魔教主",
    description: "炼制与丹药，炉火里藏着天魔的秘密。",
  },
  {
    id: "fengdu",
    title: "伍 · 酆都鬼城",
    description: "鬼市开张，交易与出售暗流涌动。",
  },
  {
    id: "jade-thunder",
    title: "陆 · 小玉京与大雷音",
    description: "宗门事务与天下秘闻的汇聚之地。",
  },
  {
    id: "upper-realm",
    title: "柒 · 上苍虚界",
    description: "虚界副本与强敌试炼。",
  },
  {
    id: "butcher-blade",
    title: "捌 · 屠夫的一刀",
    description: "堵门与生死对决的锋芒。",
  },
  {
    id: "herding-gods",
    title: "终章 · 牧神之道",
    description: "破心中之神，方得牧神之道。",
  },
];

const SCROLL_OFFSET = 100;

const getScrollOffset = () => {
  const topbar = document.getElementById("topbar");
  return (topbar?.getBoundingClientRect().height || SCROLL_OFFSET) + 16;
};

const sectionMappings = {
  preface: ["卷首语"],
  "great-ruins": ["大墟残老村"],
  "overlord-foundation": ["霸体筑基"],
  "imperial-reform": ["延康国师变法"],
  "heavenly-devil": ["天魔教主"],
  fengdu: ["酆都鬼城"],
  "jade-thunder": ["小玉京与大雷音"],
  "upper-realm": ["上苍虚界"],
  "butcher-blade": ["屠夫的一刀"],
  "herding-gods": ["牧神之道"],
};

const SECTIONS = TAXONOMY.map((section) => ({
  ...section,
  contentId: `${section.id}Content`,
  categories: sectionMappings[section.id] || [],
}));

const HERO_TAG_POOL = [
  "残老村", "延康变法", "酆都鬼市", "神桥破境", "天圣教影", "大墟夜行", "掌灯守夜", "神桥未断",
  "江湖诡谲", "火种不灭", "旧城风沙", "天工碑刻", "刀光试心", "药炉见胆", "太虚回响", "幽都传铃",
  "榜单争锋", "闭关磨骨", "破境一线", "村长摸骨", "屠夫磨刀", "药师煎火", "天录旧卷", "牧神之路"
];
const NPC_WHISPERS = [
  "村长：先测灵体，再谈远方。夜路长，别空着手。",
  "药师：丹香再好也要按量服用，莫贪。",
  "屠夫：刀要快，命令也要准；错字比钝刀更要命。",
  "瞎爷：看不见路不要紧，照着口令走，总能到岸。",
  "村长：能活过今夜，明天才有资格谈传奇。",
  "药师：急火煎不出好药，急心修不出神桥。",
  "屠夫：遇见硬骨头，先稳住手，再稳住气。",
  "瞎爷：看不见天，不代表看不见路。",
  "村长：别怕慢，怕的是脚下没灯。",
  "药师：丹毒不可笑，笑的是你明知还贪。",
  "屠夫：输一阵不丢人，乱一阵才丢命。",
  "瞎爷：路窄时别挤，先让心过去。",
  "村长：榜单只是门牌，不是棺材板。",
  "药师：补药也讲时辰，别把自己当铁锅。",
  "屠夫：刀背也能赢，前提是你脑子先亮。",
  "瞎爷：黑夜教人的第一课，是别装看见。",
  "村长：天黑别出门，不是叫你别修行。",
  "药师：药香是好闻，命苦是难闻。",
  "屠夫：你怕的不是强敌，是自己手抖。",
  "瞎爷：走错了就折返，别把错路走成信仰。",
  "村长：活着回村，才配得上下一次远行。",
  "药师：今天不进步也行，别退步就成。",
  "屠夫：你若退半步，刀会替你退十步。",
  "瞎爷：灯不在天上，在你手里。",

  "村长：你若慌，先停；停住了再走。",
  "药师：药丸再贵，也比后悔便宜。",
  "屠夫：别把勇敢演成鲁莽。",
  "瞎爷：眼睛会骗人，呼吸不骗。",
  "村长：遇事先问自己：这一步值不值。",
  "药师：今天少犯一错，比多吃一丹更赚。",
  "屠夫：刀先服你，才会服敌。",
  "瞎爷：黑里见路，靠的是记性不是运气。",
  "村长：别急着出头，先学会收刀。",
  "药师：药炉不偏心，只偏向耐心的人。",
  "屠夫：你以为你在拼命，其实你在乱挥。",
  "瞎爷：听见风急，不如先让心慢。",
  "村长：小胜可喜，大意可耻。",
  "药师：药方记全了，手法也得跟上。",
  "屠夫：别问刀快不快，先问手稳不稳。",
  "瞎爷：路是走出来的，不是猜出来的。",
  "村长：人情可还，命债难还。",
  "药师：火候差一线，结果差一命。",
  "屠夫：今天磨刀，明天少挨刀。",
  "瞎爷：你手里的灯，就是你的边界。",
];
const DAILY_SPARKS = [
  "今夜一得：____", "今夜一失：____", "最稳的一手：____", "最险的一步：____", "想谢的人：____",
  "差点翻车的瞬间：____", "明日第一件事：____", "今天最值的一次等待：____", "今天最该改的习惯：____", "给明天的自己一句话：____",
  "今日状态（稳/躁/疲）：____", "今日最想复盘的操作：____", "今天的运气关键词：____", "今天的心法关键词：____", "若再来一次会怎么做：____",
  "今日笑点：____", "今日狠话：____", "今日误判：____", "今日补救：____", "最想和谁并肩：____",
  "本周小目标进度：____", "今日最亮的一个细节：____", "今天没做到但想做到：____", "今晚收灯前的念头：____",

  "今日最想感谢的提示：____", "今天最值得夸的一次克制：____", "今天最该删掉的坏习惯：____", "今天最意外的收获：____", "今天最想重来的一步：____",
  "今日胆量评分（1-10）：____", "今日耐心评分（1-10）：____", "今日专注评分（1-10）：____", "今日最像主角的一刻：____", "今日最像路人的一刻：____",
  "今晚最想补的一课：____", "今天最稳的一次撤退：____", "今天最漂亮的一次止损：____", "今日最想对队友说：____", "今日最想对自己说：____",
  "下一次遇到同类局面的预案：____", "今日关键转折点：____", "今天最该早做五分钟的事：____", "今天最该晚做五分钟的事：____", "今晚收工仪式：____",
];

function pickRandomLines(items, count = 6) {
  const cloned = [...items];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned.slice(0, Math.min(count, cloned.length));
}
const REDACT_KEYWORD = "天道";
const UNKNOWN_TEXT = "大墟的黑暗掩盖了真相...";
const ITEM_SECTIONS = [
  { id: "materials", title: "材料图鉴" },
  { id: "pills", title: "丹药图鉴" },
  { id: "weapons", title: "武器图鉴" },
  { id: "armors", title: "防具图鉴" },
  { id: "recipes", title: "配方图鉴" },
  { id: "loot", title: "闭关掉落" },
];

const IMMERSION_SECTIONS = [
  { id: "quickstart-path", title: "三分钟上手" },
  { id: "truth-audit", title: "天工碑刻" },
  { id: "daily-log", title: "修炼日报" },
  { id: "easter-eggs", title: "彩蛋区" },
];
const LORE_TEMPLATES = [
  (file, registry) => `
    <strong>【道法根脚】</strong><br>
    此神通源自天外奇书《${file}》，受“${registry}”印记加持。<br>
    <em class="lore-note">残老村村长注：后生晚辈，切勿随意篡改天书，小心遭天谴。</em>
  `,
  (file, registry) => `
    <strong>【大墟遗刻】</strong><br>
    在黑暗的角落里（${file}），你发现了古神留下的印记（${registry}）。<br>
    <em class="lore-note">这些文字散发着诡异的气息，似乎在警告你保留因果。</em>
  `,
  (file, registry) => `
    <strong>【国师密档】</strong><br>
    此乃延康国师变法之前的旧档，封存于天录楼最深处。<br>
    <em class="lore-note">卷宗编号：${file} // 封印术式：${registry}</em>
  `,
  (file, registry) => `
    <strong>【天魔教秘辛】</strong><br>
    嘘！这是教主从域外天魔那里骗来的功法。<br>
    <em class="lore-note">来源界域：${file} / 核心法阵：${registry}</em>
  `,

  (file, registry) => `
    <strong>【残老村夜札】</strong><br>
    夜里翻到《${file}》残页，边角写着“${registry}”三字。<br>
    <em class="lore-note">村口石像旁留字：活着读懂一行，比死在十页前更强。</em>
  `,
  (file, registry) => `
    <strong>【延康抄录】</strong><br>
    天录官把《${file}》誊抄入库，印章仍是“${registry}”。<br>
    <em class="lore-note">批注：变法可改器，不可改心。</em>
  `,
  (file, registry) => `
    <strong>【酆都旧价签】</strong><br>
    鬼市摊主指了指《${file}》，笑说“${registry}”只卖给识货人。<br>
    <em class="lore-note">铜铃一响，买的是故事，赔的是胆量。</em>
  `,
  (file, registry) => `
    <strong>【小玉京抄经台】</strong><br>
    经案上压着《${file}》，封皮刻着“${registry}”的细纹。<br>
    <em class="lore-note">道人评语：字可抄，火候要自己熬。</em>
  `,
  (file, registry) => `
    <strong>【大雷音边注】</strong><br>
    钟声回荡时，你在《${file}》末页见到“${registry}”。<br>
    <em class="lore-note">僧人低声：先降心猿，再问天门。</em>
  `,
  (file, registry) => `
    <strong>【上苍回函】</strong><br>
    《${file}》像是从上苍掉下来的回信，落款“${registry}”。<br>
    <em class="lore-note">封缄完好，拆信者自担因果。</em>
  `,
  (file, registry) => `
    <strong>【天圣教传单】</strong><br>
    旧城墙缝里夹着《${file}》抄纸，暗号写成“${registry}”。<br>
    <em class="lore-note">街口传闻：看懂的人不吭声，看不懂的人最吵。</em>
  `,
  (file, registry) => `
    <strong>【太虚路引】</strong><br>
    赶路人把《${file}》当路引，背面压着“${registry}”。<br>
    <em class="lore-note">路引只能指路，迈步还得靠腿。</em>
  `,
  (file, registry) => `
    <strong>【神桥工记】</strong><br>
    桥柱旁钉着《${file}》工记，编号“${registry}”。<br>
    <em class="lore-note">匠人语：桥先立于心，再立于空。</em>
  `,
  (file, registry) => `
    <strong>【黑沙口供】</strong><br>
    黑沙里挖出《${file}》半卷，口供指向“${registry}”。<br>
    <em class="lore-note">审讯官：风会改口，字不会。</em>
  `,
  (file, registry) => `
    <strong>【龙麒麟爪印】</strong><br>
    《${file}》封面留着爪痕，旁批“${registry}”。<br>
    <em class="lore-note">注：若闻到焦香，说明它刚路过。</em>
  `,
  (file, registry) => `
    <strong>【药师药笺】</strong><br>
    药炉边的《${file}》沾着药渍，签名仍是“${registry}”。<br>
    <em class="lore-note">药师叮嘱：药可救急，不能救懒。</em>
  `,
  (file, registry) => `
    <strong>【屠夫刀谱残页】</strong><br>
    刀架下压着《${file}》残页，刀谱章为“${registry}”。<br>
    <em class="lore-note">一句话：先练稳，再练狠。</em>
  `,
  (file, registry) => `
    <strong>【瞎爷听风录】</strong><br>
    《${file}》里夹了张听风录，落款“${registry}”。<br>
    <em class="lore-note">听风不是听热闹，是听自己慌不慌。</em>
  `,
  (file, registry) => `
    <strong>【村口榜外榜】</strong><br>
    榜单背面贴着《${file}》摘要，暗戳戳写着“${registry}”。<br>
    <em class="lore-note">榜外榜只记一句：别把赢当成理所当然。</em>
  `,
  (file, registry) => `
    <strong>【夜行手册】</strong><br>
    你在《${file}》边角看见“${registry}”夜行记号。<br>
    <em class="lore-note">手册第一页：灯在，心就不散。</em>
  `,
  (file, registry) => `
    <strong>【幽都传铃簿】</strong><br>
    传铃簿登记了《${file}》去向，栏目标“${registry}”。<br>
    <em class="lore-note">铃声到处，人不一定到齐。</em>
  `,
  (file, registry) => `
    <strong>【国境驿站便条】</strong><br>
    驿卒把《${file}》夹进信袋，备注“${registry}”。<br>
    <em class="lore-note">便条：迟到可补，误判难补。</em>
  `,
  (file, registry) => `
    <strong>【山门告示】</strong><br>
    山门木牌写明《${file}》归档于“${registry}”。<br>
    <em class="lore-note">告示末尾：进门先收心，出门再提刀。</em>
  `,
  (file, registry) => `
    <strong>【牧神备忘录】</strong><br>
    《${file}》最后一页贴着备忘录，抬头“${registry}”。<br>
    <em class="lore-note">备忘：别拜心中神，先照亮脚下路。</em>
  `,
];

const REALM_TIERS = ["灵胎", "五曜", "六合", "七星", "天人", "生死", "神桥"];

const formatRealmRequirement = (minTier = 0, minStage = 1) => {
  const tierName = REALM_TIERS[Math.max(0, Math.min(minTier, REALM_TIERS.length - 1))] || "灵胎";
  const phase = minStage === 1 ? "前期" : minStage === 2 ? "中期" : "后期";
  return `${tierName}${phase}`;
};

const fallbackAtlasData = {
  loot: { trainChance: 0.12, deepChance: 0.25, low: [], high: [] },
  pills: [],
  weapons: [],
  armors: [],
  items: [],
  recipes: [],
  syncReport: { sourceCounts: {}, frontendCounts: {}, expectedCounts: {}, missingNames: {}, conflicts: [], isConsistent: false },
};
const CATEGORY_LABELS = {
  卷首语: "卷首语",
  大墟残老村: "壹 · 大墟残老村",
  霸体筑基: "贰 · 霸体筑基",
  延康国师变法: "叁 · 延康国师变法",
  天魔教主: "肆 · 天魔教主",
  酆都鬼城: "伍 · 酆都鬼城",
  小玉京与大雷音: "陆 · 小玉京与大雷音",
  上苍虚界: "柒 · 上苍虚界",
  屠夫的一刀: "捌 · 屠夫的一刀",
  牧神之道: "终章 · 牧神之道",
  未分类: "未分类",
};

const safeJsonParse = (text, fallback) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    return fallback;
  }
};

const getInlineJson = (id, fallback) => {
  const element = document.getElementById(id);
  if (!element) return fallback;
  return safeJsonParse(element.textContent || "", fallback);
};

const loadJson = async (path, fallback = [], inlineId) => {
  if (inlineId) {
    const inlineData = getInlineJson(inlineId, null);
    if (inlineData) {
      return inlineData;
    }
  }
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`Fetch failed for ${path}, falling back to XHR.`, error);
  }
  try {
    const request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    if (request.status === 0 || request.status === 200) {
      return safeJsonParse(request.responseText, fallback);
    }
  } catch (error) {
    console.warn(`XHR failed for ${path}.`, error);
    return fallback;
  }
  return fallback;
};

const slugify = (text) => encodeURIComponent(text.trim().toLowerCase().replace(/\s+/g, "-"));

const isRedacted = (value) => typeof value === "string" && value.includes(REDACT_KEYWORD);

const sanitizeText = (value) => {
  if (typeof value !== "string") return value;
  const normalized = value.trim().toLowerCase() === "unknown" ? UNKNOWN_TEXT : value;
  return normalized.replaceAll(REDACT_KEYWORD, "已移除");
};

const sanitizeArray = (items) => (items || []).map(sanitizeText).filter((item) => !isRedacted(item));

const formatDisplayValue = (value) => {
  if (typeof value === "string") return sanitizeText(value);
  return value;
};

const getDescriptionText = (value) => {
  if (!value) return "内容残缺，等待补全...";
  return sanitizeText(value);
};

const dedupeByKey = (items, getKey) => {
  const seen = new Set();
  return items.filter((item) => {
    const key = getKey(item);
    if (!key) return true;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const filterCommands = (commands) =>
  dedupeByKey(
    commands
      .filter((command) => !isRedacted(command.name))
      .map((command) => ({
        ...command,
        description: sanitizeText(command.description),
        usage: sanitizeArray(command.usage),
        examples: sanitizeArray(command.examples),
        pitfalls: sanitizeArray(command.pitfalls),
        related: sanitizeArray(command.related),
        details: {
          parameters: sanitizeArray(command.details?.parameters || []),
          preconditions: sanitizeArray(command.details?.preconditions || []),
          outcomes: sanitizeArray(command.details?.outcomes || []),
        },
      })),
    (command) => command.name
  );

const getCategoryLabel = (category) => CATEGORY_LABELS[category] || category || "未分类";

const hasItems = (items) => Array.isArray(items) && items.length > 0;

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (typeof text !== "undefined") {
    element.textContent = text;
  }
  return element;
};

const createLoreSeal = (source) => {
  if (!source) return null;
  const sealContainer = createElement("div", "ancient-seal-container tooltip");
  const sealIcon = createElement("span", "seal-icon", "📜");
  const sealGlow = createElement("span", "seal-glow");
  sealIcon.appendChild(sealGlow);

  const tooltip = createElement("div", "tooltiptext ancient-scroll-style");
  const safeFile = sanitizeText(source.file || "未知来源");
  const safeRegistry = sanitizeText(source.registry || "未知印记");
  const templateIndex = Math.floor(Math.random() * LORE_TEMPLATES.length);
  tooltip.innerHTML = LORE_TEMPLATES[templateIndex](safeFile, safeRegistry);
  sealContainer.dataset.sealType = String(templateIndex);
  sealContainer.appendChild(sealIcon);
  sealContainer.appendChild(tooltip);
  return sealContainer;
};

const clearContainer = (container) => {
  if (!container) return;
  container.innerHTML = "";
};

const addSvgIcon = (element, svgMarkup) => {
  element.insertAdjacentHTML("afterbegin", svgMarkup);
};

const renderTagCloud = (items, className = "tag-pill") => {
  if (!hasItems(items)) return null;
  const cloud = createElement("div", "tag-cloud");
  items.forEach((item) => {
    const pill = createElement("span", className, item);
    cloud.appendChild(pill);
  });
  return cloud;
};

const renderPropsList = (data) => {
  const entries = Object.entries(data || {});
  if (!entries.length) {
    return null;
  }
  const wrapper = createElement("div", "props-list");
  entries.forEach(([key, value]) => {
    const row = createElement("div", "props-row");
    row.appendChild(createElement("div", "props-key", key));
    if (key === "source" && value) {
      const seal = createLoreSeal(value);
      if (seal) {
        seal.classList.add("props-value");
        row.appendChild(seal);
      }
    } else {
      row.appendChild(createElement("div", "props-value", formatDisplayValue(value)));
    }
    wrapper.appendChild(row);
  });
  return wrapper;
};

const renderDetailContent = (data) => {
  if (Array.isArray(data)) {
    return renderTagCloud(data);
  }
  if (data && typeof data === "object") {
    return renderPropsList(data);
  }
  if (!data) {
    return null;
  }
  return createElement("div", "detail-text", data);
};

const renderCommandCloud = (items) => {
  if (!hasItems(items)) return null;
  const cloud = createElement("div", "tag-cloud");
  items.forEach((item) => {
    const pill = createElement("span", "tag-pill cmd-pill");
    const code = createElement("code", "cmd-code", item);
    pill.appendChild(code);
    cloud.appendChild(pill);
  });
  return cloud;
};

const filterFeatures = (features) =>
  dedupeByKey(
    features
      .filter((feature) => !isRedacted(feature.name) && !isRedacted(feature.description))
      .map((feature) => ({
        ...feature,
        description: sanitizeText(feature.description),
      })),
    (feature) => feature.name || feature.id
  );

const filterErrors = (errors) =>
  dedupeByKey(
    errors
      .filter((error) => !isRedacted(error.message) && !isRedacted(error.meaning))
      .map((error) => ({
        ...error,
        message: sanitizeText(error.message),
        meaning: sanitizeText(error.meaning),
        causes: sanitizeArray(error.causes || []),
        fixes: sanitizeArray(error.fixes || []),
      })),
    (error) => error.message
  );

const CHAPTER_ORDER = {
  卷首语: 0,
  大墟残老村: 1,
  霸体筑基: 2,
  延康国师变法: 3,
  天魔教主: 4,
  酆都鬼城: 5,
  小玉京与大雷音: 6,
  上苍虚界: 7,
  屠夫的一刀: 8,
  牧神之道: 9,
};

const stableSortAtlas = (items) =>
  [...items].sort((a, b) => {
    const chapterDiff = (CHAPTER_ORDER[a.chapter] ?? 999) - (CHAPTER_ORDER[b.chapter] ?? 999);
    if (chapterDiff !== 0) return chapterDiff;
    const subDiff = String(a.subcategory || a.tier || "").localeCompare(String(b.subcategory || b.tier || ""));
    if (subDiff !== 0) return subDiff;
    return String(a.name || "").localeCompare(String(b.name || ""));
  });

const buildNavLinks = (container, items) => {
  if (!container) return;
  clearContainer(container);
  items.forEach((item) => {
    const link = createElement("a");
    link.href = `#${item.id}`;
    link.textContent = item.title;
    container.appendChild(link);
  });
};

const renderHeroTags = () => {
  const container = document.getElementById("heroTags");
  if (!container) return;
  clearContainer(container);
  pickRandomLines(HERO_TAG_POOL, 8).forEach((tag) => {
    const span = createElement("span", "tag", tag);
    container.appendChild(span);
  });
};

const renderNpcWhispers = () => {
  const container = document.getElementById("npcWhispers");
  if (!container) return;
  let index = 0;
  container.textContent = `【夜话】${NPC_WHISPERS[index]}`;
  window.setInterval(() => {
    index = (index + 1) % NPC_WHISPERS.length;
    container.classList.remove("show");
    window.setTimeout(() => {
      container.textContent = `【夜话】${NPC_WHISPERS[index]}`;
      container.classList.add("show");
    }, 120);
  }, 4200);
  container.classList.add("show");
};

const renderSnapshot = (commands, features) => {
  const container = document.getElementById("systemSnapshot");
  if (!container) return;
  clearContainer(container);
  const prefix = features.find((feature) => feature.name === "PREFIX" || feature.id === "PREFIX");
  const totalCommands = commands.length;
  const categories = [...new Set(commands.map((cmd) => cmd.category))].filter(Boolean).length;
  const prefixText = sanitizeText(prefix?.details ?? ".");

  const sigils = createElement("div", "snapshot-sigils");
  [
    { label: "录入法门", value: totalCommands },
    { label: "章节法脉", value: categories },
    { label: "夜行前缀", value: prefixText, tone: "accent" },
  ].forEach((item, index) => {
    const metric = createElement("article", `sigil-metric ${item.tone || ""}`.trim());
    metric.style.setProperty("--ring-delay", `${index * 120}ms`);
    const ring = createElement("div", "sigil-ring");
    const label = createElement("span", "sigil-label", item.label);
    const value = createElement("strong", "sigil-value", String(item.value));
    if (typeof item.value === "number") {
      value.dataset.counter = String(item.value);
      value.textContent = "0";
    }
    ring.appendChild(value);
    metric.append(ring, label);
    sigils.appendChild(metric);
  });
  container.appendChild(sigils);

  const actions = createElement("div", "portal-actions");

  const joinLink = createElement("a", "btn-portal");
  joinLink.href = "https://t.me/mushenjixx";
  joinLink.target = "_blank";
  addSvgIcon(
    joinLink,
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>'
  );
  joinLink.appendChild(createElement("span", "", "踏入大墟（加入群组）"));

  const contactLink = createElement("a", "btn-portal-ghost");
  contactLink.href = "https://t.me/The_Ravene";
  contactLink.target = "_blank";
  addSvgIcon(
    contactLink,
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
  );
  contactLink.appendChild(createElement("span", "", "联系掌灯人"));

  actions.append(joinLink, contactLink);
  container.appendChild(actions);

  const rules = createElement("div", "detail-inline");
  const getFeatureValue = (name) => features.find((feature) => feature.name === name)?.details;
  const trainMin = Number(getFeatureValue("TRAIN_CD_MIN") || 0) / 60;
  const trainMax = Number(getFeatureValue("TRAIN_CD_MAX") || 0) / 60;
  const deepDuration = Number(getFeatureValue("DEEP_DURATION") || 0) / 3600;
  const deepCooldown = Number(getFeatureValue("DEEP_COOLDOWN") || 0) / 3600;
  const taskCooldown = Number(getFeatureValue("TASK_COOLDOWN") || 0) / 3600;
  const sectTaskCooldown = Number(getFeatureValue("SECT_TASK_COOLDOWN") || 0) / 3600;
  const ghostMarketCost = Number(getFeatureValue("GHOST_MARKET_COST") || 0);
  const passiveCd = Number(getFeatureValue("PASSIVE_CD") || 0);
  const passiveGain = Number(getFeatureValue("PASSIVE_GAIN") || 0);
  rules.textContent = `修行规则：闭关冷却${trainMin}~${trainMax}分钟；深度闭关${deepDuration}小时（冷却${deepCooldown}小时）；任务冷却${taskCooldown}小时；宗门任务${sectTaskCooldown}小时；鬼市淘宝${ghostMarketCost}大丰币；被动修为每${passiveCd}秒+${passiveGain}。`;
  container.appendChild(rules);
};


const renderTruthAudit = (commands, features) => {
  const container = document.getElementById("truthAuditContent");
  if (!container) return;
  clearContainer(container);

  const commandWithSource = commands.filter((command) => command.source?.file).length;
  const featureWithSource = features.filter((feature) => feature.source?.file).length;
  const registrySet = new Set([
    ...commands.map((command) => command.source?.registry).filter(Boolean),
    ...features.map((feature) => feature.source?.registry).filter(Boolean),
  ]);

  const lines = [
    `今夜刻录法门：${commands.length} 条（有源印记 ${commandWithSource}）`,
    `天规常量：${features.length} 条（有源印记 ${featureWithSource}）`,
    "天书名：mushenji_bot.py",
    `碑刻签章：${Array.from(registrySet).join(" / ") || "未知"}`,
    "这页里的可复制口令，都从命令卷轴现抄，不玩花字。",
    "若你在实战里遇到偏差，记得回去翻天书原卷。",
  ];

  const ul = createElement("ul", "truth-audit-list");
  lines.forEach((line) => {
    const li = createElement("li", "", line);
    ul.appendChild(li);
  });
  container.appendChild(ul);
};

const renderQuickstartPath = (commands, features) => {
  const container = document.getElementById("quickstartContent");
  if (!container) return;
  clearContainer(container);
  const map = new Map(commands.map((command) => [command.name, command]));
  const steps = [
    {
      title: "第 1 分钟：验明修行身份",
      npc: "村长",
      commandNames: ["帮助", "检测灵体", "我的灵体"],
      note: "先确认灵体与基础指令，避免后续误触发。",
    },
    {
      title: "第 2 分钟：建立日常循环",
      npc: "瞎爷",
      commandNames: ["闭关修炼", "查看闭关", "突破"],
      note: "闭关结束立刻查看收益，达标后再突破。",
    },
    {
      title: "第 3 分钟：补给与任务",
      npc: "药师",
      commandNames: ["任务", "储物袋", "鬼市"],
      note: "任务拿大丰币，鬼市淘宝消耗固定成本。",
    },
  ];
  const passiveMinLen = Number(features.find((feature) => feature.name === "PASSIVE_MIN_LEN")?.details || 0);

  steps.forEach((step) => {
    const card = createElement("article", "card command-card tilt-card");
    card.appendChild(createElement("h3", "", step.title));
    card.appendChild(createElement("div", "card-meta", `【${step.npc}提示】${step.note}`));
    const usage = [];
    step.commandNames.forEach((name) => {
      const matched = map.get(name);
      if (matched?.usage?.length) {
        usage.push(...matched.usage);
      }
    });
    const usageCloud = renderCommandCloud(Array.from(new Set(usage)));
    if (usageCloud) {
      const field = createElement("div", "card-field");
      field.appendChild(createElement("span", "field-label", "可直接复制"));
      field.appendChild(usageCloud);
      card.appendChild(field);
    }
    container.appendChild(card);
    applyTiltEffect(card, 8);
  });

  const extra = createElement("article", "card command-card tilt-card");
  extra.appendChild(createElement("h3", "", "夜行补充"));
  extra.appendChild(
    createElement(
      "div",
      "card-meta",
      `被动修行判定要求至少 ${passiveMinLen} 字；闲聊也能积累修为，但请保持有效内容。`
    )
  );
  container.appendChild(extra);
  applyTiltEffect(extra, 8);
};

const renderDailyLog = () => {
  const container = document.getElementById("dailyLogContent");
  if (!container) return;
  clearContainer(container);
  const template = [
    "【修炼日报｜玩法设定】",
    "值夜人：____（可填‘村长/药师/屠夫’等扮演称呼）",
    "今日境界：____",
    "今日命令：.闭关修炼 ｜ .任务 ｜ .鬼市 淘宝",
    "资源变化：灵石 +____ ｜ 大丰币 +____",
    "战果记录：是否突破 ____ ｜ 是否炼制 ____",
    "一句夜话（原创，别抄经文）：____",
    "明日计划：优先完成 ____（建议先看 .帮助）",
  ];
  const randomSparks = pickRandomLines(DAILY_SPARKS, 8);
  const pre = createElement("pre", "daily-template", `${template.join("\n")}\n${randomSparks.map((line) => `- ${line}`).join("\n")}`);
  container.appendChild(pre);
};

const EASTER_POOLS = {
  "同人彩蛋": [
    "若你连着三次闭关都未突破，给自己留一句“天黑别出门，但别熄灯”。",
    "把‘大墟/延康/幽都’做成日志分栏，像写江湖行脚簿，不改任何机制。",
    "值夜时把群名片改成‘掌灯人’，第二天再改回去，算是给自己加个仪式。",
    "每逢榜单更新，先夸一句对手，再默默去闭关，赢面会更稳。",
    "若鬼市空手而归，就对自己说一句‘今天是探路，不是亏本’。",
    "把常用命令记在手机短语里，像把护符缝在袖口。",
    "连胜三次后，给自己写一句‘别狂，夜还长’放在日报最后一行。",
    "若突破失败，不妨把失败截图命名为‘神桥施工中’。",
    "和群友约定：谁先上榜谁请喝奶茶，输家负责喊一晚‘延康加急文书到’。",
    "每次出手前先数三息，像屠夫磨刀前那一停。",
    "把‘今日目标’拆成三小步，像残老村走夜路一盏灯接一盏灯。",
    "连着两天断更日报，第三天必须补一句‘我在大墟迷路了’。",
    "遇到卡关就去翻旧日报，经常能看到自己忽略的线索。",
    "把最顺手的一条命令当‘本命招’，每天先打它开手感。",
    "晚间收工前看一眼储物袋，像夜巡前摸一遍兵刃。",
    "若今天没爆好东西，也记一句‘空袋回村，命在就赚’。",
    "和朋友轮流扮演‘村长’，给彼此留一句明日任务。",
    "打不过就先活着，活着就有下一轮故事。",
    "每逢整点，给自己一句‘灯在，人就不算输’。",
    "把失败当成地图，把成功当成路标，别反过来。",
    "今天若只完成一件事，就把那件事做得像传记开头。",

    "如果今天运气差，就把稳字写三遍再出手。",
    "把失败记录成段子，明天看就不那么疼。",
    "连赢时去帮新人答一题，压压火。",
    "每周挑一天只做基础功，防止手生。",
    "大墟夜深时，先关掉情绪再开战。",
    "对自己狠话一句：别把借口当护甲。",
    "给好友留个暗号：卡住就来拍你。",
    "把今天最蠢的一步写下来，防下次重演。",
    "遇见欧皇先祝福，回头再练手。",
    "把‘再来一把’改成‘复盘五分钟’。",
    "若心态炸裂，立刻下线喝水，十分钟后再说。",
    "输赢都截图，给未来当教材。",
    "手感好时别浪，手感差时别硬。",
    "给自己的刀起个名，提醒自己别乱挥。",
    "今天若沉默，不代表今天没成长。",
    "把每次翻盘叫‘夜灯回魂’，有梗也有劲。",
    "当你想摆烂时，先把装备栏看一眼。",
    "把‘我不行’换成‘我还没行’。",
    "今天最难的一步，往往值最多。",
    "夜风会过，别让脾气留着过夜。",
  ],
  "玩法设定": [
    "群聊可轮流扮演‘村长’催更日报，谁断更谁请喝‘赤火灵丹’（口嗨版）。",
    "新人首日只做三件事：测灵体、闭关、看榜单；其余全靠你在夜里悟。",
    "可开‘残老村值夜班’活动：每晚一人发今日三行总结。",
    "周末可办‘延康公示榜’：晒出本周最稳的一次操作。",
    "可设‘鬼市盲盒夜’：只聊收获故事，不晒具体收益数字。",
    "公会可做‘神桥施工日报’，记录每个人的卡点与突破点。",
    "给新手准备‘三问三答卡’：今天做了啥、卡在哪、明天怎么改。",
    "可开‘屠夫一分钟点评’：一句狠话 + 一个可执行建议。",
    "把常见错误整理成‘夜行禁忌榜’，每周更新一次。",
    "群公告可置顶‘今日推荐命令’一条，减轻新人迷茫。",
    "每晚固定十分钟‘安静闭关打卡’，结束后再自由聊天。",
    "可设‘药师答疑时段’，专门收集丹药和配方相关问题。",
    "每周一次‘大墟复盘会’，只复盘方法，不互相阴阳。",
    "允许新人使用‘求带暗号’，老玩家优先回应。",
    "可做‘战败勋章墙’，鼓励分享失败换经验。",
    "每月办一次‘延康夜谈’，分享最有戏剧性的翻盘局。",
    "给每位新成员发一份‘三分钟上手抄本’作为入群礼。",
    "可设‘神桥奖学金’：持续打卡者获得称号或头像框。",
    "管理可做‘天工碑刻更新日志’，说明本周玩法调整。",
    "把‘求稳、求快、求乐子’做成三种打法标签，便于组队。",
    "每逢节日可开‘残老村夜市’，只发整活台词不比强度。",
    "可设‘今日守夜词’，每人一句短句收尾。",
    "可做‘榜单不焦虑日’，只聊进步不聊名次。",
    "可开‘鬼市防骗课’，收集真实翻车故事。",
    "可设‘村长来信’栏目，每周一句提醒。",
    "可办‘药师配伍挑战’，只拼思路不拼欧气。",
    "可做‘屠夫三连问’：稳不稳、值不值、敢不敢。",
    "可设‘瞎爷静心分钟’，开打前先静一静。",
    "可办‘残老村见闻录’接龙，人人可写两行。",
    "可做‘神桥卡点地图’，新手按图避坑。",
    "可设‘今日最稳操作奖’，鼓励理性决策。",
    "可办‘延康文书夜’，统一整理任务经验。",
    "可做‘幽都铃声提醒’，定时提醒复盘与收工。",
    "可设‘失败可说日’，鼓励坦诚分享失误。",
    "可办‘一命通关复盘局’，讲清每一步因果。",
    "可做‘装备养护提醒’，避免只顾冲榜忘补给。",
    "可设‘新人护航队’，一对一答疑七天。",
    "可办‘夜路同行徽章’，奖励长期互助成员。",
    "可做‘天工碑刻问答’，每周抽取一题互动。",
    "可设‘收灯仪式’，收工前统一留一句明日目标。",
    "可办‘三行日报挑战’，训练简洁复盘能力。"
  ]
};

const renderEasterEggs = () => {
  const container = document.getElementById("easterEggContent");
  if (!container) return;

  const renderBatch = () => {
    clearContainer(container);
    Object.entries(EASTER_POOLS).forEach(([label, lines]) => {
      pickRandomLines(lines, 6).forEach((text) => {
        const card = createElement("article", "card command-card tilt-card");
        card.appendChild(createElement("span", "field-label", label));
        card.appendChild(createElement("div", "card-meta", text));
        container.appendChild(card);
        applyTiltEffect(card, 6);
      });
    });
  };

  renderBatch();

  const shuffleButton = document.getElementById("easterShuffle");
  if (shuffleButton && !shuffleButton.dataset.bound) {
    shuffleButton.addEventListener("click", renderBatch);
    shuffleButton.dataset.bound = "1";
  }
};

const applyTiltEffect = (element, intensity = 12) => {
  if (!element) return;
  const supportsHover = window.matchMedia("(hover: hover)").matches;
  if (!supportsHover) return;
  let rafId = null;
  let lastEvent = null;

  const updateTransform = () => {
    if (!lastEvent) return;
    const rect = element.getBoundingClientRect();
    const x = (lastEvent.clientX - rect.left) / rect.width - 0.5;
    const y = (lastEvent.clientY - rect.top) / rect.height - 0.5;
    const rotateX = (-y * intensity).toFixed(2);
    const rotateY = (x * intensity).toFixed(2);
    element.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    rafId = null;
  };

  const handleMove = (event) => {
    lastEvent = event;
    if (!rafId) {
      rafId = window.requestAnimationFrame(updateTransform);
    }
  };

  const resetTilt = () => {
    element.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  element.addEventListener("mousemove", handleMove);
  element.addEventListener("mouseleave", resetTilt);
};

const createCardHeader = (title, subtitle) => {
  const header = createElement("div", "card-header");
  header.appendChild(createElement("h3", "", title));
  if (subtitle) {
    header.appendChild(createElement("div", "card-meta", subtitle));
  }
  return header;
};

const renderSectionCards = (commands, sectionId, categories) => {
  const container = document.getElementById(sectionId);
  if (!container) return;
  const scoped = commands.filter((cmd) => (categories || []).includes(cmd.category));
  clearContainer(container);
  if (!scoped.length) {
    const emptyCard = createElement("article", "card command-card tilt-card");
    emptyCard.appendChild(createElement("h3", "", "待补充"));
    emptyCard.appendChild(createElement("div", "card-meta", UNKNOWN_TEXT));
    container.appendChild(emptyCard);
    applyTiltEffect(emptyCard);
    return;
  }
  scoped.forEach((cmd) => {
    const card = createElement("article", "card command-card tilt-card");
    card.appendChild(createCardHeader(cmd.name, `分类：${getCategoryLabel(cmd.category)}`));
    card.appendChild(createElement("div", "card-meta", `描述：${getDescriptionText(cmd.description)}`));
    if (hasItems(cmd.usage)) {
      const field = createElement("div", "card-field");
      field.appendChild(createElement("span", "field-label", "用法"));
      const lines = createElement("div", "cmd-lines");
      cmd.usage.forEach((usage) => {
        lines.appendChild(createElement("code", "cmd-code", usage));
      });
      field.appendChild(lines);
      card.appendChild(field);
    }
    container.appendChild(card);
    applyTiltEffect(card, 10);
  });
};

const renderErrors = (errors) => {
  const container = document.getElementById("errorContent");
  if (!container) return;
  clearContainer(container);
  if (!errors.length) {
    container.appendChild(createElement("div", "detail-inline", "尚未收录错误数据"));
    return;
  }
  errors.forEach((error) => {
    const card = createElement("div", "card tilt-card");
    card.appendChild(createElement("h3", "", error.message));
    if (error.meaning) {
      card.appendChild(createElement("div", "card-meta", `含义：${error.meaning}`));
    }
    if (hasItems(error.causes)) {
      card.appendChild(createElement("div", "card-meta", `常见原因：${error.causes.join(" / ")}`));
    }
    if (hasItems(error.fixes)) {
      card.appendChild(createElement("div", "card-meta", `解决方式：${error.fixes.join(" / ")}`));
    }
    container.appendChild(card);
    applyTiltEffect(card, 8);
  });
};

const buildCommandIndex = (commands) => {
  const map = new Map();
  commands.forEach((command) => {
    const slug = slugify(command.name);
    map.set(slug, command);
  });
  return map;
};

const renderCommandList = (commands) => {
  const container = document.getElementById("commandList");
  if (!container) return;
  clearContainer(container);
  commands.forEach((command) => {
    const item = createElement("div", "command-item tilt-card");
    item.dataset.command = slugify(command.name);
    item.appendChild(createElement("h4", "", command.name));
    item.appendChild(
      createElement(
        "p",
        "",
        `${getCategoryLabel(command.category)} · ${getDescriptionText(command.description)}`
      )
    );
    if (hasItems(command.usage)) {
      const lines = createElement("div", "cmd-lines");
      command.usage.forEach((usage) => {
        lines.appendChild(createElement("code", "cmd-code", usage));
      });
      item.appendChild(lines);
    }
    container.appendChild(item);
    applyTiltEffect(item, 6);
  });
};

const buildDetailBlock = (title, content) => {
  if (!content) return null;
  const block = createElement("div", "detail-block");
  block.appendChild(createElement("h5", "", title));
  block.appendChild(content);
  return block;
};

const renderCommandDetail = (command) => {
  const container = document.getElementById("commandDetail");
  if (!container) return;
  clearContainer(container);
  if (!command) {
    container.appendChild(createElement("div", "detail-empty", "未找到该命令或已被移除。"));
    return;
  }

  const headerBlock = createElement("div", "detail-block");
  headerBlock.appendChild(createElement("h5", "", command.name));
  headerBlock.appendChild(createElement("div", "detail-inline", `分类：${getCategoryLabel(command.category)}`));

  const blocks = [
    headerBlock,
    buildDetailBlock("使用方法", renderCommandCloud(command.usage)),
    buildDetailBlock("示例", renderCommandCloud(command.examples)),
    buildDetailBlock("参数", renderDetailContent(command.details?.parameters || [])),
    buildDetailBlock("前置条件", renderDetailContent(command.details?.preconditions || [])),
    buildDetailBlock("结果/提示", renderDetailContent(command.details?.outcomes || [])),
    buildDetailBlock("注意事项", renderDetailContent(command.pitfalls || [])),
    buildDetailBlock("相关命令", renderDetailContent(command.related || [])),
    buildDetailBlock("来源", renderDetailContent(command.source ? { source: command.source } : null)),
  ];

  blocks.filter(Boolean).forEach((block) => container.appendChild(block));
};

const renderItemSection = (sectionId, items) => {
  const container = document.getElementById(sectionId);
  if (!container) return;
  clearContainer(container);
  if (!items.length) {
    const emptyCard = createElement("article", "card glass-card item-card tilt-card");
    emptyCard.appendChild(createElement("h3", "", "待补充"));
    emptyCard.appendChild(createElement("div", "card-meta", UNKNOWN_TEXT));
    container.appendChild(emptyCard);
    applyTiltEffect(emptyCard, 10);
    return;
  }

  items.forEach((item) => {
    const card = createElement("article", "card glass-card item-card tilt-card");
    const header = createElement("div", "item-header");
    header.appendChild(createElement("span", "item-icon", item.icon || "✨"));
    header.appendChild(createElement("h3", "", item.name));
    card.appendChild(header);

    const metaRow = createElement("div", "item-meta");
    metaRow.appendChild(createElement("span", "item-tier", item.tier || "未录"));

    if (typeof item.minTier === "number") {
      const realmTag = createElement(
        "span",
        "item-tier",
        `需求：${formatRealmRequirement(item.minTier, item.minStage || 1)}`
       );
      metaRow.appendChild(realmTag);
    }

    if (typeof item.price === "number") {
      const priceTag = createElement("span", "item-tier", `售价：${item.price}灵石`);
      metaRow.appendChild(priceTag);
    }

    card.appendChild(metaRow);


    if (item.description) {
      card.appendChild(createElement("p", "item-description", sanitizeText(item.description)));
    }
    if (item.effect) {
      card.appendChild(createElement("div", "item-effect", sanitizeText(item.effect)));
    }

    const seal = createLoreSeal(item.source);
    if (seal) {
      const footer = createElement("div", "item-footer");
      footer.appendChild(seal);
      card.appendChild(footer);
    }

    container.appendChild(card);
    applyTiltEffect(card, 10);
  });
};

const renderPills = (items) => renderItemSection("pillsContent", items);
const renderMaterials = (items) => renderItemSection("materialsContent", items);
const renderWeapons = (items) => renderItemSection("weaponsContent", items);
const renderArmors = (items) => renderItemSection("armorsContent", items);

const renderRecipes = (items) => {
  const container = document.getElementById("recipesContent");
  if (!container) return;
  clearContainer(container);
  items.forEach((item) => {
    const card = createElement("article", "card glass-card item-card tilt-card");
    card.appendChild(createElement("h3", "", item.name));
    const meta = createElement("div", "item-meta");
    [item.kind, item.target ? `目标：${item.target}` : null, Number.isFinite(item.tier) ? `tier ${item.tier}` : null, Number.isFinite(item.price) ? `售价：${item.price}灵石` : null]
      .filter(Boolean)
      .forEach((txt) => meta.appendChild(createElement("span", "item-tier", txt)));
    card.appendChild(meta);
    if (item.desc) card.appendChild(createElement("p", "item-description", item.desc));
    if (Array.isArray(item.mats) && item.mats.length) {
      const mats = createElement("div", "item-effect", `mats：${item.mats.map((m) => `${m[0]}×${m[1]}`).join("、")}`);
      card.appendChild(mats);
    }
    container.appendChild(card);
    applyTiltEffect(card, 10);
  });
};

const renderLoot = (loot) => {
  const container = document.getElementById("lootContent");
  if (!container) return;
  clearContainer(container);
  const pools = [
    { title: `普通闭关池（TRAIN ${loot.trainChance}）`, rows: loot.low || [] },
    { title: `深度闭关池（DEEP ${loot.deepChance}）`, rows: loot.high || [] },
  ];
  pools.forEach((pool) => {
    const card = createElement("article", "card glass-card item-card");
    card.appendChild(createElement("h3", "", pool.title));
    const ul = createElement("ul", "detail-list");
    pool.rows.forEach((row) => ul.appendChild(createElement("li", "", `${row.name} · 权重 ${row.weight}`)));
    card.appendChild(ul);
    container.appendChild(card);
  });
};

const setAtlasCounts = (atlas) => {
  const map = {
    materialsCount: atlas.items.length,
    pillsCount: atlas.pills.length,
    weaponsCount: atlas.weapons.length,
    armorsCount: atlas.armors.length,
    recipesCount: atlas.recipes.length,
    lootCount: (atlas.loot.low?.length || 0) + (atlas.loot.high?.length || 0),
  };
  Object.entries(map).forEach(([id, count]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(count);
  });
};

const setupFxSystem = () => {
  const root = document.body;
  if (!root) return;
  const preferred = window.localStorage.getItem("msj-fx-level") || root.dataset.fx || "balanced";
  const valid = new Set(["lite", "balanced", "full"]);
  const level = valid.has(preferred) ? preferred : "balanced";
  root.dataset.fx = level;
  const map = {
    lite: { intensity: 0.42, speed: 0.78, density: 0.58, glow: 0.14 },
    balanced: { intensity: 0.72, speed: 1, density: 1, glow: 0.22 },
    full: { intensity: 0.9, speed: 1.12, density: 1.22, glow: 0.28 },
  };
  const token = map[level];
  root.style.setProperty("--fx-intensity", String(token.intensity));
  root.style.setProperty("--fx-speed", String(token.speed));
  root.style.setProperty("--fx-density", String(token.density));
  root.style.setProperty("--fx-glow-alpha", String(token.glow));
};

const setupScrollSigil = () => {
  const sigil = document.getElementById("scrollSigil");
  if (!sigil) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    sigil.style.setProperty("--scroll-progress", String(progress));
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
};

const setupBackgroundEffects = () => {
  const effects = document.querySelector(".bg-effects");
  if (!effects) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (reduceMotion || coarsePointer) {
    effects.style.setProperty("--fx-parallax-x", "0px");
    effects.style.setProperty("--fx-parallax-y", "0px");
    return;
  }

  let rafId = null;
  const updateParallax = (event) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (event.clientX - cx) / cx;
    const dy = (event.clientY - cy) / cy;
    effects.style.setProperty("--fx-parallax-x", `${(dx * 4).toFixed(2)}px`);
    effects.style.setProperty("--fx-parallax-y", `${(dy * 3).toFixed(2)}px`);
    rafId = null;
  };

  window.addEventListener("mousemove", (event) => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => updateParallax(event));
  }, { passive: true });
};

const setupTopbarRail = () => {
  const topbar = document.getElementById("topbar");
  if (!topbar) return;
  const updateRail = () => {
    topbar.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", updateRail, { passive: true });
  updateRail();
};

const animateStatNumbers = () => {
  const counters = Array.from(document.querySelectorAll("[data-counter]"));
  counters.forEach((counter) => {
    const target = Number(counter.dataset.counter || 0);
    if (!Number.isFinite(target)) return;
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
};

const setupInscriptionReveal = () => {
  document.querySelectorAll(".section-header").forEach((header) => {
    const title = header.querySelector("h2");
    const subtitle = header.querySelector("p");
    if (title) title.classList.add("inscription-title");
    if (subtitle) subtitle.classList.add("inscription-sub");
  });
};

const setupStaggerReveal = () => {
  const blocks = Array.from(document.querySelectorAll(".section, .hero, .site-footer"));
  if (!blocks.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const order = Number(entry.target.dataset.staggerOrder || 0);
      const delay = Math.min(80, 40 + order * 6);
      entry.target.style.setProperty("--reveal-delay", `${delay}ms`);
      entry.target.classList.add("is-revealed");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  blocks.forEach((block, index) => {
    block.dataset.staggerOrder = String(index % 7);
    observer.observe(block);
  });
};

const setActiveNav = (sectionId) => {
  if (!sectionId) return;
  const navLinks = document.querySelectorAll(".topbar-nav a, .sidebar-nav a");
  navLinks.forEach((link) => {
    const target = link.getAttribute("href")?.replace("#", "");
    const active = target === sectionId;
    link.classList.toggle("active", active);
    link.classList.toggle("sigil-pulse", active);
  });
};

const scrollToSection = (sectionId, behavior = "smooth") => {
  if (!sectionId) return;
  const targetElement = document.getElementById(sectionId);
  if (!targetElement) return;
  const headerOffset = getScrollOffset();
  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  window.scrollTo({ top: offsetPosition, behavior });
};

const setupNavScroll = () => {
  const navContainers = document.querySelectorAll(".topbar-nav, .sidebar-nav");
  navContainers.forEach((container) => {
    container.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;
      const targetId = link.getAttribute("href")?.replace("#", "");
      if (!targetId) return;
      event.preventDefault();
      scrollToSection(targetId);
      const fogGate = document.getElementById("fogGate");
      if (fogGate) {
        fogGate.classList.remove("is-active");
        requestAnimationFrame(() => fogGate.classList.add("is-active"));
        const clearFog = () => {
          fogGate.classList.remove("is-active");
          fogGate.removeEventListener("animationend", clearFog);
        };
        fogGate.addEventListener("animationend", clearFog);
      }
      window.history.pushState(null, "", `#${targetId}`);
      setActiveNav(targetId);
    });
  });
};

const highlightActiveNav = () => {
  const hash = window.location.hash.replace("#", "");
  if (!hash) return;
  const hasLink = document.querySelector(`.topbar-nav a[href="#${hash}"], .sidebar-nav a[href="#${hash}"]`);
  if (hasLink) {
    setActiveNav(hash);
  }
};

const animateSearchResult = (element, delay = 0) => {
  if (!element || typeof element.animate !== "function") return;
  element.animate(
    [
      { opacity: 0, transform: "translateY(12px) scale(0.98)" },
      { opacity: 1, transform: "translateY(0) scale(1)" },
  
    "可设‘今晚一句狠话’环节，每人一句不重复。",
    "可做‘村长值班表’，轮流提醒新人打卡。",
    "每周一次‘药师讲堂’，只讲一条实用技巧。",
    "可设‘屠夫挑战题’，答对可领称号。",
    "可做‘瞎爷心法卡’，每周发一张短句图。",
    "群里可设‘今日MVP灯牌’，鼓励稳定发挥。",
    "可办‘夜行接龙’，一人一句剧情口播。",
    "可做‘复盘模板共创’，每周投票优化。",
    "可设‘冷却时间读书角’，分享心得不水群。",
    "可建‘失误样本库’，帮助新人少踩坑。",
    "可办‘神桥夜跑’，固定时段一起冲目标。",
    "可设‘稳健奖’而不只设‘输出奖’。",
    "可做‘延康来函’周报，汇总本周亮点。",
    "可开‘鬼市故事会’，只讲经历不比脸。",
    "可设‘刀法一问一答’，每日一题。",
    "可做‘村口黑板报’，展示每周热梗。",
    "可设‘新手结伴日’，老带新组队实战。",
    "可办‘静默十分钟’活动，之后统一复盘。",
    "可做‘天工碑刻月报’，记录玩法演进。",
    "可设‘一句话鼓励墙’，专治摆烂综合征。",
  ],
    {
      duration: 360,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      delay,
    }
  );
};

const setupSidebarSearch = () => {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  const applyFilter = () => {
    const query = searchInput.value.trim().toLowerCase();
    const cards = Array.from(document.querySelectorAll(".command-card"));
    const detailsBlocks = Array.from(document.querySelectorAll("details"));
    const commandItems = Array.from(document.querySelectorAll(".command-item"));
    const commandLibrary = document.getElementById("command-library");

    const shouldShow = (element) => !query || element.textContent.toLowerCase().includes(query);

    const animateBatch = (elements) => {
      let delay = 0;
      elements.forEach((element) => {
        if (element.style.display !== "none") {
          animateSearchResult(element, delay);
          delay += 40;
        }
      });
    };

    cards.forEach((card) => {
      card.style.display = shouldShow(card) ? "" : "none";
    });

    detailsBlocks.forEach((detail) => {
      detail.style.display = shouldShow(detail) ? "" : "none";
    });

    commandItems.forEach((item) => {
      item.style.display = shouldShow(item) ? "" : "none";
    });

    if (query) {
      animateBatch(cards);
      animateBatch(detailsBlocks);
      animateBatch(commandItems);
    }

    document.querySelectorAll(".section").forEach((section) => {
      const sectionCards = Array.from(section.querySelectorAll(".command-card"));
      const sectionDetails = Array.from(section.querySelectorAll("details"));
      const sectionCommandItems = Array.from(section.querySelectorAll(".command-item"));
      if (!sectionCards.length && !sectionDetails.length && !sectionCommandItems.length) return;
      const hasVisible = [...sectionCards, ...sectionDetails, ...sectionCommandItems].some(
        (element) => element.style.display !== "none"
      );
      section.style.display = hasVisible ? "" : "none";
    });

    if (commandLibrary) {
      const hasVisibleCommands = commandItems.some((item) => item.style.display !== "none");
      commandLibrary.style.display = hasVisibleCommands ? "" : "none";
    }
  };

  searchInput.addEventListener("input", applyFilter);
};

const setupScrollSpy = () => {
  const sections = Array.from(document.querySelectorAll(".section, .hero"));
  if (!sections.length) return;
  let ticking = false;

  const updateActiveSection = () => {
    const scrollPosition = window.scrollY + getScrollOffset() + 1;
    let currentSection = sections[0]?.id;
    sections.forEach((section) => {
      if (section.offsetTop <= scrollPosition) {
        currentSection = section.getAttribute("id");
      }
    });
    if (currentSection) {
      setActiveNav(currentSection);
    }
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateActiveSection);
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  updateActiveSection();
};

const setupCommandCardSpotlight = () => {
  const cards = Array.from(document.querySelectorAll(".command-card, .glass-card"));
  if (!cards.length) return;
  const supportsHover = window.matchMedia("(hover: hover)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!supportsHover || reduceMotion) return;
  let activeCard = null;
  let rafId = null;
  let lastEvent = null;

  const updateSpotlight = () => {
    if (!activeCard || !lastEvent) {
      rafId = null;
      return;
    }
    const rect = activeCard.getBoundingClientRect();
    const x = lastEvent.clientX - rect.left;
    const y = lastEvent.clientY - rect.top;
    activeCard.style.setProperty("--mouse-x", `${x}px`);
    activeCard.style.setProperty("--mouse-y", `${y}px`);
    rafId = null;
  };

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      activeCard = card;
    });
    card.addEventListener("mouseleave", () => {
      card.style.removeProperty("--mouse-x");
      card.style.removeProperty("--mouse-y");
      if (activeCard === card) activeCard = null;
    });
  });

  document.addEventListener("mousemove", (event) => {
    if (!activeCard) return;
    lastEvent = event;
    if (!rafId) {
      rafId = window.requestAnimationFrame(updateSpotlight);
    }
  }, { passive: true });
};

const setupCardTilt = () => {
  const cards = Array.from(document.querySelectorAll(".card"));
  if (!cards.length) return;
  cards.forEach((card) => applyTiltEffect(card, 12));
};

const setupCommandInteractions = (commands) => {
  const commandIndex = buildCommandIndex(commands);
  const listContainer = document.getElementById("commandList");
  const categorySelect = document.getElementById("categoryFilter");
  if (!categorySelect) {
    renderCommandList(commands);
    handleHashChange(commandIndex);
    return;
  }

  const renderFiltered = () => {
    const category = categorySelect.value;
    const filtered = commands.filter((command) => {
      const matchCategory = category === "all" || command.category === category;
      return matchCategory;
    });
    renderCommandList(filtered);
    handleHashChange(commandIndex);
  };

  const categories = [...new Set(commands.map((command) => command.category))].filter(Boolean);
  categorySelect.innerHTML =
    `<option value="all">全部分类</option>` +
    categories.map((category) => `<option value="${category}">${getCategoryLabel(category)}</option>`).join("");

  categorySelect.addEventListener("change", renderFiltered);

  renderFiltered();

  window.addEventListener("hashchange", () => handleHashChange(commandIndex));
  handleHashChange(commandIndex);

  if (listContainer) {
    listContainer.addEventListener("click", (event) => {
      const target = event.target.closest(".command-item");
      if (!target) return;
      const slug = target.dataset.command;
      if (slug) {
        window.location.hash = `command-${slug}`;
      }
    });
  }
};

const handleHashChange = (commandIndex) => {
  const hash = window.location.hash.replace("#", "");
  if (hash.startsWith("command-")) {
    const slug = hash.replace("command-", "");
    const command = commandIndex.get(slug);
    renderCommandDetail(command);
    document.querySelectorAll(".command-item").forEach((item) => {
      item.classList.toggle("active", item.dataset.command === slug);
    });
  } else if (hash) {
    scrollToSection(hash, "auto");
  }
  highlightActiveNav();
};

const setupCardEffects = (ruinsBackground) => {
  document.addEventListener("click", (event) => {
    const ripple = document.createElement("div");
    ripple.className = "click-ripple";
    document.body.appendChild(ripple);

    const size = 100;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;

    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });

    const card = event.target.closest(".card, .command-item, .glass-card");
    if (card && ruinsBackground) {
      ruinsBackground.spawnBurst(event.clientX, event.clientY);
    }
  });
};

const init = async () => {
  const [commandsRaw, featuresRaw, errorsRaw] = await Promise.all([
    loadJson("data/commands.json", [], "inline-commands"),
    loadJson("data/features.json", [], "inline-features"),
    loadJson("data/errors.json", [], "inline-errors"),
  ]);

  const commands = filterCommands(commandsRaw);
  const features = filterFeatures(featuresRaw);
  const errors = filterErrors(errorsRaw);

  try {
    renderHeroTags();
    renderNpcWhispers();
    renderSnapshot(commands, features);
    buildNavLinks(document.getElementById("topNav"), [
      ...SECTIONS.map((section) => ({ id: section.id, title: section.title })),
      ...ITEM_SECTIONS.map((section) => ({ id: section.id, title: section.title })),
      ...IMMERSION_SECTIONS,
      { id: "troubleshooting", title: "故障排查" },
      { id: "command-library", title: "命令索引" },
    ]);
    buildNavLinks(document.getElementById("sidebarNav"), [
      { id: "hero", title: "概览" },
      ...SECTIONS.map((section) => ({ id: section.id, title: section.title })),
      ...ITEM_SECTIONS.map((section) => ({ id: section.id, title: section.title })),
      ...IMMERSION_SECTIONS,
      { id: "troubleshooting", title: "故障排查" },
      { id: "command-library", title: "命令索引" },
    ]);

    const prefixFeature = features.find((feature) => feature.name === "PREFIX" || feature.id === "PREFIX");
    if (prefixFeature) {
      document.getElementById("prefixValue").textContent = sanitizeText(prefixFeature.details);
    }

    SECTIONS.forEach((section) => {
      renderSectionCards(commands, section.contentId, section.categories);
    });

    const atlas = await loadJson("data/atlas.json", fallbackAtlasData);
    renderMaterials(atlas.items || []);
    renderPills(atlas.pills || []);
    renderWeapons(atlas.weapons || []);
    renderArmors(atlas.armors || []);
    renderRecipes(atlas.recipes || []);
    renderLoot(atlas.loot || { trainChance: 0, deepChance: 0, low: [], high: [] });
    setAtlasCounts(atlas);

    window.__atlasReport = atlas.syncReport || {};

    if (atlas.syncReport && !atlas.syncReport.isConsistent) {
      const pillContainer = document.getElementById("pillsContent");
      if (pillContainer) {
        const warn = createElement("article", "card glass-card item-card");
        warn.appendChild(createElement("h3", "", "图鉴同步告警"));
        warn.appendChild(createElement("p", "item-description", "图鉴与源数据计数不一致，请检查 atlas_report.json。"));
        pillContainer.appendChild(warn);
      }
    }
    renderQuickstartPath(commands, features);
    renderTruthAudit(commands, features);
    renderDailyLog();
    renderEasterEggs();

    const sections = Array.from(document.querySelectorAll(".section"));
    sections.forEach((section, index) => {
      if (index === 0) return;
      const previous = section.previousElementSibling;
      if (previous && previous.classList.contains("section-banner")) return;
      const banner = document.createElement("div");
      banner.className = "section-banner";
      banner.setAttribute("aria-hidden", "true");
      section.insertAdjacentElement("beforebegin", banner);
    });

    renderErrors(errors);
    setupCardTilt();
    setupCommandCardSpotlight();
    setupCommandInteractions(commands);
    highlightActiveNav();
    setupSidebarSearch();
    setupNavScroll();
    setupScrollSpy();
    setupFxSystem();
    setupScrollSigil();
    setupTopbarRail();
    setupInscriptionReveal();
    setupStaggerReveal();
    animateStatNumbers();
    setupBackgroundEffects();

    const footer = document.getElementById("siteFooter");
    if (footer && !footer.textContent.trim()) {
      footer.textContent = "大墟残老村 · 牧神记指南 | 天黑别出门";
    }
  } catch (error) {
    console.error("Render failed.", error);
  }
};


const getFxParticleProfile = () => {
  const level = window.localStorage.getItem("msj-fx-level") || document.body?.dataset.fx || "balanced";
  const densityMap = { full: 1, balanced: 0.65, lite: 0.35 };
  const baseDensity = densityMap[level] || densityMap.balanced;
  const mobile = window.matchMedia("(max-width: 900px)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobileMultiplier = mobile ? 0.5 : 1;
  const reducedMultiplier = reduced ? 0.45 : 1;
  return {
    density: baseDensity * mobileMultiplier * reducedMultiplier,
    reduceMotion: reduced,
  };
};

class RuinsBackground {
  constructor(options = {}) {
    this.canvas = document.createElement("canvas");
    this.canvas.className = "ruins-background";
    this.context = this.canvas.getContext("2d");
    this.particles = [];
    this.bursts = [];
    this.profile = options.profile || getFxParticleProfile();
    this.maxParticles = Math.max(24, Math.round(140 * this.profile.density));
    this.motionScale = this.profile.reduceMotion ? 0.24 : 1;
    this.canvas.dataset.particles = String(this.maxParticles);
    this.light = { x: window.innerWidth / 2, y: window.innerHeight / 2, radius: this.profile.reduceMotion ? 72 : 160 };
    this.running = false;

    this.handleResize = this.handleResize.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.animate = this.animate.bind(this);

    document.body.appendChild(this.canvas);
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("mousemove", this.handleMouseMove, { passive: true });
    this.seedParticles();
    this.start();
  }

  handleResize() {
    const ratio = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * ratio;
    this.canvas.height = window.innerHeight * ratio;
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    if (this.context) {
      this.context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
  }

  seedParticles() {
    this.particles = Array.from({ length: this.maxParticles }, () => this.createParticle());
  }

  createParticle(origin = null) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const base = origin || { x: Math.random() * width, y: Math.random() * height };
    return {
      x: base.x,
      y: base.y,
      vx: (Math.random() - 0.5) * 0.4 * this.motionScale,
      vy: (Math.random() - 0.5) * 0.4 * this.motionScale,
      size: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.28 + 0.14,
      hue: 200 + Math.random() * 36,
    };
  }

  handleMouseMove(event) {
    this.light.x = event.clientX;
    this.light.y = event.clientY;
  }

  spawnBurst(x, y) {
    const count = this.profile.reduceMotion ? 8 : 18 + Math.floor(Math.random() * 12);
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 2.2 + 0.8) * this.motionScale;
      this.bursts.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1,
        life: 0,
        ttl: 40 + Math.random() * 30,
        alpha: 0.9,
        hue: 30 + Math.random() * 60,
      });
    }
  }

  start() {
    if (this.running) return;
    this.running = true;
    requestAnimationFrame(this.animate);
  }

  animate() {
    if (!this.running || !this.context) return;
    const ctx = this.context;
    const width = window.innerWidth;
    const height = window.innerHeight;

    ctx.clearRect(0, 0, width, height);

    this.particles.forEach((particle) => {
      const dx = particle.x - this.light.x;
      const dy = particle.y - this.light.y;
      const distance = Math.hypot(dx, dy);
      if (distance < this.light.radius) {
        const force = (1 - distance / this.light.radius) * 1.2 * this.motionScale;
        particle.vx += (dx / Math.max(distance, 1)) * force * 0.4;
        particle.vy += (dy / Math.max(distance, 1)) * force * 0.4;
      }

      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.97;
      particle.vy *= 0.97;
      if (particle.x < -20) particle.x = width + 20;
      if (particle.x > width + 20) particle.x = -20;
      if (particle.y < -20) particle.y = height + 20;
      if (particle.y > height + 20) particle.y = -20;

      ctx.beginPath();
      ctx.fillStyle = `hsla(${particle.hue}, 36%, 62%, ${particle.alpha})`;
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.save();
    const gradient = ctx.createRadialGradient(
      this.light.x,
      this.light.y,
      0,
      this.light.x,
      this.light.y,
      this.light.radius
    );
    gradient.addColorStop(0, "rgba(255, 236, 188, 0.15)");
    gradient.addColorStop(0.6, "rgba(255, 236, 188, 0.05)");
    gradient.addColorStop(1, "rgba(255, 236, 188, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.light.x, this.light.y, this.light.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    this.bursts = this.bursts.filter((particle) => {
      particle.life += 1;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.97;
      particle.vy *= 0.97;
      const progress = particle.life / particle.ttl;
      const alpha = particle.alpha * (1 - progress);
      ctx.beginPath();
      ctx.fillStyle = `hsla(${particle.hue}, 80%, 70%, ${alpha})`;
      ctx.arc(particle.x, particle.y, particle.size * (1 - progress * 0.6), 0, Math.PI * 2);
      ctx.fill();
      return particle.life < particle.ttl;
    });

    requestAnimationFrame(this.animate);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const profile = getFxParticleProfile();
  const ruinsBackground = new RuinsBackground({ profile });
  init().catch((error) => {
    console.error("Initialization failed.", error);
  });
  setupCardEffects(ruinsBackground);
});