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

const HERO_TAGS = ["大墟夜行", "霸体修行", "九老叮嘱", "牧神之道"];
const REDACT_KEYWORD = "天道";
const UNKNOWN_TEXT = "大墟的黑暗掩盖了真相...";
const ITEM_SECTIONS = [
  {
    id: "pills",
    title: "丹药图鉴",
  },
  {
    id: "equipment",
    title: "神兵宝甲",
  },
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
];
const PILL_DATA = [
  {
    name: "待抽取丹药",
    tier: "未录",
    description: "尚未从 mushenji_bot.py 抽取丹药配方与药效。",
    effect: "请补充来源数据。",
    icon: "💊",
    source: { file: "mushenji_bot.py", registry: "TODO" },
  },
];
const EQUIPMENT_DATA = [
  {
    name: "待抽取神兵",
    tier: "未录",
    description: "尚未从 mushenji_bot.py 抽取武器与防具条目。",
    effect: "请补充来源数据。",
    icon: "⚔️",
    source: { file: "mushenji_bot.py", registry: "TODO" },
  },
  {
    name: "待抽取宝甲",
    tier: "未录",
    description: "请补全护具与套装信息，确保数值准确。",
    effect: "请补充来源数据。",
    icon: "🛡️",
    source: { file: "mushenji_bot.py", registry: "TODO" },
  },
];
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
  HERO_TAGS.forEach((tag) => {
    const span = createElement("span", "tag", tag);
    container.appendChild(span);
  });
};

const renderSnapshot = (commands, features) => {
  const container = document.getElementById("systemSnapshot");
  if (!container) return;
  clearContainer(container);
  const prefix = features.find((feature) => feature.name === "PREFIX" || feature.id === "PREFIX");
  const totalCommands = commands.length;
  const categories = [...new Set(commands.map((cmd) => cmd.category))].filter(Boolean).length;
  const prefixText = sanitizeText(prefix?.details ?? ".");
  const prefixRow = createElement("div");
  prefixRow.append(document.createTextNode("指令前缀："));
  prefixRow.appendChild(createElement("code", "", prefixText));
  container.appendChild(prefixRow);
  container.appendChild(createElement("div", "", `已收录命令：${totalCommands}`));
  container.appendChild(createElement("div", "", `已覆盖分类：${categories}`));

  const actions = createElement("div", "portal-actions");
  actions.style.marginTop = "24px";
  actions.style.display = "flex";
  actions.style.gap = "12px";
  actions.style.flexWrap = "wrap";

  const joinLink = createElement("a", "btn-portal");
  joinLink.href = "https://t.me/mushenjixx";
  joinLink.target = "_blank";
  joinLink.style.display = "inline-flex";
  joinLink.style.alignItems = "center";
  joinLink.style.gap = "8px";
  joinLink.style.padding = "10px 24px";
  joinLink.style.borderRadius = "8px";
  joinLink.style.textDecoration = "none";
  joinLink.style.color = "#000";
  addSvgIcon(
    joinLink,
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>'
  );
  joinLink.appendChild(createElement("span", "", "踏入大墟（加入群组）"));

  const contactLink = createElement("a", "btn-portal-ghost");
  contactLink.href = "https://t.me/Ssn047";
  contactLink.target = "_blank";
  contactLink.style.display = "inline-flex";
  contactLink.style.alignItems = "center";
  contactLink.style.gap = "8px";
  contactLink.style.padding = "10px 24px";
  contactLink.style.borderRadius = "8px";
  contactLink.style.textDecoration = "none";
  contactLink.style.border = "1px solid #d7b46a";
  contactLink.style.color = "#d7b46a";
  addSvgIcon(
    contactLink,
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
  );
  contactLink.appendChild(createElement("span", "", "联系掌灯人"));

  actions.appendChild(joinLink);
  actions.appendChild(contactLink);
  container.appendChild(actions);
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
const renderEquipment = (items) => renderItemSection("equipmentContent", items);

const setActiveNav = (sectionId) => {
  if (!sectionId) return;
  const navLinks = document.querySelectorAll(".topbar-nav a, .sidebar-nav a");
  navLinks.forEach((link) => {
    const target = link.getAttribute("href")?.replace("#", "");
    link.classList.toggle("active", target === sectionId);
  });
};

const scrollToSection = (sectionId, behavior = "smooth") => {
  if (!sectionId) return;
  const targetElement = document.getElementById(sectionId);
  if (!targetElement) return;
  const headerOffset = SCROLL_OFFSET;
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
    const scrollPosition = window.scrollY + SCROLL_OFFSET + 1;
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
  if (!supportsHover) return;
  let rafId = null;
  let lastEvent = null;

  const updateSpotlight = () => {
    if (!lastEvent) return;
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = lastEvent.clientX - rect.left;
      const y = lastEvent.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
    rafId = null;
  };

  document.addEventListener("mousemove", (event) => {
    lastEvent = event;
    if (!rafId) {
      rafId = window.requestAnimationFrame(updateSpotlight);
    }
  });
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
    renderSnapshot(commands, features);
    buildNavLinks(document.getElementById("topNav"), [
      ...SECTIONS.map((section) => ({ id: section.id, title: section.title })),
      ...ITEM_SECTIONS.map((section) => ({ id: section.id, title: section.title })),
      { id: "troubleshooting", title: "故障排查" },
      { id: "command-library", title: "命令索引" },
    ]);
    buildNavLinks(document.getElementById("sidebarNav"), [
      { id: "hero", title: "概览" },
      ...SECTIONS.map((section) => ({ id: section.id, title: section.title })),
      ...ITEM_SECTIONS.map((section) => ({ id: section.id, title: section.title })),
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

    renderPills(PILL_DATA);
    renderEquipment(EQUIPMENT_DATA);

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

    const footer = document.getElementById("siteFooter");
    if (footer && !footer.textContent.trim()) {
      footer.textContent = "大墟残老村 · 牧神记指南 | 天黑别出门";
    }
  } catch (error) {
    console.error("Render failed.", error);
  }
};

class RuinsBackground {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.className = "ruins-background";
    this.context = this.canvas.getContext("2d");
    this.particles = [];
    this.bursts = [];
    this.maxParticles = 140;
    this.light = { x: window.innerWidth / 2, y: window.innerHeight / 2, radius: 160 };
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
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2.8 + 0.8,
      alpha: Math.random() * 0.5 + 0.15,
      hue: 220 + Math.random() * 40,
    };
  }

  handleMouseMove(event) {
    this.light.x = event.clientX;
    this.light.y = event.clientY;
  }

  spawnBurst(x, y) {
    const count = 26 + Math.floor(Math.random() * 18);
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
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
        const force = (1 - distance / this.light.radius) * 1.4;
        particle.vx += (dx / Math.max(distance, 1)) * force * 0.6;
        particle.vy += (dy / Math.max(distance, 1)) * force * 0.6;
      }

      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.96;
      particle.vy *= 0.96;
      if (particle.x < -20) particle.x = width + 20;
      if (particle.x > width + 20) particle.x = -20;
      if (particle.y < -20) particle.y = height + 20;
      if (particle.y > height + 20) particle.y = -20;

      ctx.beginPath();
      ctx.fillStyle = `hsla(${particle.hue}, 30%, 25%, ${particle.alpha})`;
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
      particle.vx *= 0.96;
      particle.vy *= 0.96;
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
  const ruinsBackground = new RuinsBackground();
  init().catch((error) => {
    console.error("Initialization failed.", error);
  });
  setupCardEffects(ruinsBackground);
});
