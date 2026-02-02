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
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    // Ignore fetch errors and try XHR fallback.
  }
  try {
    const request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    if (request.status === 0 || request.status === 200) {
      return safeJsonParse(request.responseText, fallback);
    }
  } catch (error) {
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

const filterCommands = (commands) =>
  commands.filter((command) => !isRedacted(command.name)).map((command) => ({
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
  }));

const getCategoryLabel = (category) => CATEGORY_LABELS[category] || category || "未分类";

const hasItems = (items) => Array.isArray(items) && items.length > 0;

const renderTagCloud = (items, className = "tag-pill") =>
  `<div class="tag-cloud">${items
    .map((item) => `<span class="${className}">${item}</span>`)
    .join("")}</div>`;

const renderPropsList = (data) => {
  const entries = Object.entries(data || {});
  if (!entries.length) {
    return "";
  }
  return `
    <div class="props-list">
      ${entries
        .map(
          ([key, value]) => `
          <div class="props-row">
            <div class="props-key">${key}</div>
            <div class="props-value">${formatDisplayValue(value)}</div>
          </div>
        `
        )
        .join("")}
    </div>
  `;
};

const renderDetailContent = (data) => {
  if (Array.isArray(data)) {
    return hasItems(data) ? renderTagCloud(data) : "";
  }
  if (data && typeof data === "object") {
    return renderPropsList(data);
  }
  if (!data) {
    return "";
  }
  return `<div class="detail-text">${data}</div>`;
};

const renderCommandCloud = (items) =>
  hasItems(items)
    ? renderTagCloud(items.map((item) => `<code class="cmd-code">${item}</code>`), "tag-pill cmd-pill")
    : "";

const filterFeatures = (features) =>
  features
    .filter((feature) => !isRedacted(feature.name) && !isRedacted(feature.description))
    .map((feature) => ({
      ...feature,
      description: sanitizeText(feature.description),
    }));

const filterErrors = (errors) =>
  errors
    .filter((error) => !isRedacted(error.message) && !isRedacted(error.meaning))
    .map((error) => ({
      ...error,
      message: sanitizeText(error.message),
      meaning: sanitizeText(error.meaning),
      causes: sanitizeArray(error.causes || []),
      fixes: sanitizeArray(error.fixes || []),
    }));

const buildNavLinks = (container, items) => {
  if (!container) return;
  container.innerHTML = items.map((item) => `<a href="#${item.id}">${item.title}</a>`).join("");
};

const renderHeroTags = () => {
  const container = document.getElementById("heroTags");
  container.innerHTML = HERO_TAGS.map((tag) => `<span class="tag">${tag}</span>`).join("");
};

const renderSnapshot = (commands, features) => {
  const container = document.getElementById("systemSnapshot");
  const prefix = features.find((feature) => feature.name === "PREFIX" || feature.id === "PREFIX");
  const totalCommands = commands.length;
  const categories = [...new Set(commands.map((cmd) => cmd.category))].filter(Boolean).length;
  const prefixText = sanitizeText(prefix?.details ?? ".");
  container.innerHTML = `
    <div>指令前缀：<code>${prefixText}</code></div>
    <div>已收录命令：${totalCommands}</div>
    <div>已覆盖分类：${categories}</div>
    <div class="portal-actions" style="margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap;">
      <a href="https://t.me/mushenjixx" target="_blank" class="btn-portal" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 8px; text-decoration: none; color: #000;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        <span>踏入大墟（加入群组）</span>
      </a>
      <a href="https://t.me/Ssn047" target="_blank" class="btn-portal-ghost" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 8px; text-decoration: none; border: 1px solid #d7b46a; color: #d7b46a;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <span>联系掌灯人</span>
      </a>
    </div>
  `;
};

const renderSectionCards = (commands, sectionId, categories) => {
  const container = document.getElementById(sectionId);
  const scoped = commands.filter((cmd) => (categories || []).includes(cmd.category));
  if (!container) return;
  if (!scoped.length) {
    container.innerHTML =
      `<div class="card"><h3>待补充</h3><div class="card-meta">大墟的黑暗掩盖了真相...</div></div>`;
    return;
  }
  container.innerHTML = scoped
    .map(
      (cmd) => `
        <article class="card command-card">
          <h3>${cmd.name}</h3>
          <div class="card-meta">分类：${getCategoryLabel(cmd.category)}</div>
          ${cmd.description ? `<div class="card-meta">描述：${cmd.description}</div>` : ""}
          ${
            hasItems(cmd.usage)
              ? `
          <div class="card-field">
            <span class="field-label">用法</span>
            <div class="cmd-lines">
              ${cmd.usage.map((usage) => `<code class="cmd-code">${usage}</code>`).join("")}
            </div>
          </div>`
              : ""
          }
        </article>
      `
    )
    .join("");
};

const renderErrors = (errors) => {
  const container = document.getElementById("errorContent");
  if (!container) return;
  if (!errors.length) {
    container.innerHTML = "<div class=\"detail-inline\">尚未收录错误数据</div>";
    return;
  }
  container.innerHTML = errors
    .map(
      (error) => `
      <div class="card">
        <h3>${error.message}</h3>
        ${error.meaning ? `<div class="card-meta">含义：${error.meaning}</div>` : ""}
        ${hasItems(error.causes) ? `<div class="card-meta">常见原因：${error.causes.join(" / ")}</div>` : ""}
        ${hasItems(error.fixes) ? `<div class="card-meta">解决方式：${error.fixes.join(" / ")}</div>` : ""}
      </div>
    `
    )
    .join("");
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
  container.innerHTML = commands
    .map(
      (command) => `
      <div class="command-item" data-command="${slugify(command.name)}">
        <h4>${command.name}</h4>
        <p>${getCategoryLabel(command.category)}${command.description ? ` · ${command.description}` : ""}</p>
        ${hasItems(command.usage) ? `<div class="cmd-lines">${command.usage
          .map((usage) => `<code class="cmd-code">${usage}</code>`)
          .join("")}</div>` : ""}
      </div>
    `
    )
    .join("");
};

const buildDetailBlock = (title, content) =>
  content ? `<div class="detail-block"><h5>${title}</h5>${content}</div>` : "";

const renderCommandDetail = (command) => {
  const container = document.getElementById("commandDetail");
  if (!container) return;
  if (!command) {
    container.innerHTML = `<div class="detail-empty">未找到该命令或已被移除。</div>`;
    return;
  }

  const parameterContent = renderDetailContent(command.details?.parameters || []);
  const preconditionContent = renderDetailContent(command.details?.preconditions || []);
  const outcomeContent = renderDetailContent(command.details?.outcomes || []);
  const pitfallContent = renderDetailContent(command.pitfalls || []);
  const relatedContent = renderDetailContent(command.related || []);

  const blocks = [
    `
    <div class="detail-block">
      <h5>${command.name}</h5>
      <div class="detail-inline">分类：${getCategoryLabel(command.category)}</div>
    </div>
  `,
    buildDetailBlock("使用方法", renderCommandCloud(command.usage)),
    buildDetailBlock("示例", renderCommandCloud(command.examples)),
    buildDetailBlock("参数", parameterContent),
    buildDetailBlock("前置条件", preconditionContent),
    buildDetailBlock("结果/提示", outcomeContent),
    buildDetailBlock("注意事项", pitfallContent),
    buildDetailBlock("相关命令", relatedContent),
  ];
  container.innerHTML = blocks.filter(Boolean).join("");
};

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

const setupSidebarSearch = () => {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  const applyFilter = () => {
    const query = searchInput.value.trim().toLowerCase();
    const cards = Array.from(document.querySelectorAll(".command-card"));
    const detailsBlocks = Array.from(document.querySelectorAll("details"));
    const commandItems = Array.from(document.querySelectorAll(".command-item"));
    const commandLibrary = document.getElementById("command-library");

    const shouldShow = (element) => !query || element.textContent.toLowerCase().includes(query);

    cards.forEach((card) => {
      card.style.display = shouldShow(card) ? "" : "none";
    });

    detailsBlocks.forEach((detail) => {
      detail.style.display = shouldShow(detail) ? "" : "none";
    });

    commandItems.forEach((item) => {
      item.style.display = shouldShow(item) ? "" : "none";
    });

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

const setupCommandInteractions = (commands) => {
  const commandIndex = buildCommandIndex(commands);
  const listContainer = document.getElementById("commandList");
  const categorySelect = document.getElementById("categoryFilter");

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

const init = async () => {
  const [commandsRaw, featuresRaw, errorsRaw] = await Promise.all([
    loadJson("data/commands.json", [], "inline-commands"),
    loadJson("data/features.json", [], "inline-features"),
    loadJson("data/errors.json", [], "inline-errors"),
  ]);

  const commands = filterCommands(commandsRaw);
  const features = filterFeatures(featuresRaw);
  const errors = filterErrors(errorsRaw);

  renderHeroTags();
  renderSnapshot(commands, features);
  buildNavLinks(document.getElementById("topNav"), [
    ...SECTIONS.map((section) => ({ id: section.id, title: section.title })),
    { id: "troubleshooting", title: "故障排查" },
    { id: "command-library", title: "命令索引" },
  ]);
  buildNavLinks(document.getElementById("sidebarNav"), [
    { id: "hero", title: "概览" },
    ...SECTIONS.map((section) => ({ id: section.id, title: section.title })),
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
};

init();

document.addEventListener("click", (event) => {
  const ripple = document.createElement("div");
  ripple.className = "click-ripple";
  document.body.appendChild(ripple);

  const size = 60;
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - size / 2}px`;
  ripple.style.top = `${event.clientY - size / 2}px`;

  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
});
