const SECTIONS = [
  { id: "quick-start", title: "快速入门", category: "Quick Start", contentId: "quickStartContent" },
  {
    id: "movement",
    title: "探索与移动",
    category: "Movement and Exploration",
    contentId: "movementContent",
  },
  { id: "combat", title: "战斗与生存", category: "Combat and Survival", contentId: "combatContent" },
  { id: "inventory", title: "背包与装备", category: "Inventory and Gear", contentId: "inventoryContent" },
  { id: "trading", title: "交易与经济", category: "Trading and Economy", contentId: "tradingContent" },
  { id: "progression", title: "任务与成长", category: "Quests and Progression", contentId: "progressionContent" },
];

const HERO_TAGS = ["代码驱动", "新手到进阶", "静态指引", "GitHub Pages 部署"];
const REDACT_KEYWORD = "天道";
const CATEGORY_LABELS = {
  "Quick Start": "快速入门",
  "Movement and Exploration": "探索与移动",
  "Combat and Survival": "战斗与生存",
  "Inventory and Gear": "背包与装备",
  "Trading and Economy": "交易与经济",
  "Quests and Progression": "任务与成长",
  Uncategorized: "未分类",
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

const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

const isRedacted = (value) => typeof value === "string" && value.includes(REDACT_KEYWORD);

const sanitizeText = (value) => (typeof value === "string" ? value.replaceAll(REDACT_KEYWORD, "已移除") : value);

const sanitizeArray = (items) => (items || []).map(sanitizeText).filter((item) => !isRedacted(item));

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

const renderTagCloud = (items, className = "tag-pill") =>
  `<div class="tag-cloud">${items
    .map((item) => `<span class="${className}">${item}</span>`)
    .join("")}</div>`;

const renderPropsList = (data) => {
  const entries = Object.entries(data || {});
  if (!entries.length) {
    return "<div class=\"detail-inline\">暂无</div>";
  }
  return `
    <div class="props-list">
      ${entries
        .map(
          ([key, value]) => `
          <div class="props-row">
            <div class="props-key">${key}</div>
            <div class="props-value">${value}</div>
          </div>
        `
        )
        .join("")}
    </div>
  `;
};

const renderDetailContent = (data) => {
  if (Array.isArray(data)) {
    if (!data.length) return "<div class=\"detail-inline\">暂无</div>";
    return renderTagCloud(data);
  }
  if (data && typeof data === "object") {
    return renderPropsList(data);
  }
  if (!data) {
    return "<div class=\"detail-inline\">暂无</div>";
  }
  return `<div class="detail-text">${data}</div>`;
};

const renderCommandCloud = (items) => {
  if (!items || !items.length) return "<div class=\"detail-inline\">暂无</div>";
  return renderTagCloud(items.map((item) => `<code class="cmd-code">${item}</code>`), "tag-pill cmd-pill");
};

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
  container.innerHTML = `
    <div>指令前缀：<code>${prefix?.details ?? "."}</code></div>
    <div>已收录命令：${totalCommands}</div>
    <div>已覆盖分类：${categories}</div>
  `;
};

const renderSectionCards = (commands, sectionId, category) => {
  const container = document.getElementById(sectionId);
  const scoped = commands.filter((cmd) => cmd.category === category);
  if (!container) return;
  if (!scoped.length) {
    container.innerHTML = `<div class="card"><h3>待补充</h3><div class="card-meta">此分类暂无命令，请从 mushenji_bot.py 抽取后更新。</div></div>`;
    return;
  }
  container.innerHTML = scoped
    .map(
      (cmd) => `
        <article class="card command-card">
          <h3>${cmd.name}</h3>
          <div class="card-meta">分类：${getCategoryLabel(cmd.category)}</div>
          <div class="card-meta">描述：${cmd.description || "TODO"}</div>
          <div class="card-field">
            <span class="field-label">用法</span>
            <div class="cmd-lines">
              ${cmd.usage && cmd.usage.length ? cmd.usage.map((usage) => `<code class="cmd-code">${usage}</code>`).join("") : "<span class=\"detail-inline\">暂无</span>"}
            </div>
          </div>
        </article>
      `
    )
    .join("");
};

const renderErrors = (errors) => {
  const container = document.getElementById("errorContent");
  if (!container) return;
  if (!errors.length) {
    container.innerHTML = "<div class=\"detail-inline\">暂无错误数据</div>";
    return;
  }
  container.innerHTML = errors
    .map(
      (error) => `
      <div class="card">
        <h3>${error.message}</h3>
        <div class="card-meta">含义：${error.meaning || "TODO"}</div>
        <div class="card-meta">常见原因：${(error.causes || []).length ? (error.causes || []).join(" / ") : "暂无"}</div>
        <div class="card-meta">解决方式：${(error.fixes || []).length ? (error.fixes || []).join(" / ") : "暂无"}</div>
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
        <p>${getCategoryLabel(command.category)} · ${command.description || "TODO: 待补充说明"}</p>
        ${command.usage && command.usage.length ? `<div class="cmd-lines">${command.usage
          .map((usage) => `<code class="cmd-code">${usage}</code>`)
          .join("")}</div>` : ""}
      </div>
    `
    )
    .join("");
};

const renderCommandDetail = (command) => {
  const container = document.getElementById("commandDetail");
  if (!container) return;
  if (!command) {
    container.innerHTML = `<div class="detail-empty">未找到该命令或已被移除。</div>`;
    return;
  }

  const detail = `
    <div class="detail-block">
      <h5>${command.name}</h5>
      <div class="detail-inline">分类：${getCategoryLabel(command.category)}</div>
    </div>
    <div class="detail-block">
      <h5>使用方法</h5>
      ${renderCommandCloud(command.usage)}
    </div>
    <div class="detail-block">
      <h5>示例</h5>
      ${renderCommandCloud(command.examples)}
    </div>
    <div class="detail-block">
      <h5>参数</h5>
      ${renderDetailContent(command.details?.parameters || [])}
    </div>
    <div class="detail-block">
      <h5>前置条件</h5>
      ${renderDetailContent(command.details?.preconditions || [])}
    </div>
    <div class="detail-block">
      <h5>结果/提示</h5>
      ${renderDetailContent(command.details?.outcomes || [])}
    </div>
    <div class="detail-block">
      <h5>注意事项</h5>
      ${renderDetailContent(command.pitfalls || [])}
    </div>
    <div class="detail-block">
      <h5>相关命令</h5>
      ${renderDetailContent(command.related || [])}
    </div>
    <div class="detail-block">
      <h5>引用位置</h5>
      ${command.source ? `<ul><li>${command.source.file}${command.source.line_start ? `:${command.source.line_start}` : ""}${command.source.line_end ? `-${command.source.line_end}` : ""}</li></ul>` : "<div class=\"detail-inline\">暂无</div>"}
    </div>
  `;
  container.innerHTML = detail;
};

const setActiveNav = (sectionId) => {
  if (!sectionId) return;
  const navLinks = document.querySelectorAll(".topbar-nav a, .sidebar-nav a");
  navLinks.forEach((link) => {
    const target = link.getAttribute("href")?.replace("#", "");
    link.classList.toggle("active", target === sectionId);
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

    const shouldShow = (element) => !query || element.textContent.toLowerCase().includes(query);

    cards.forEach((card) => {
      card.style.display = shouldShow(card) ? "" : "none";
    });

    detailsBlocks.forEach((detail) => {
      detail.style.display = shouldShow(detail) ? "" : "none";
    });

    document.querySelectorAll(".section").forEach((section) => {
      const sectionCards = Array.from(section.querySelectorAll(".command-card"));
      const sectionDetails = Array.from(section.querySelectorAll("details"));
      if (!sectionCards.length && !sectionDetails.length) return;
      const hasVisible = [...sectionCards, ...sectionDetails].some((element) => element.style.display !== "none");
      section.style.display = hasVisible ? "" : "none";
    });
  };

  searchInput.addEventListener("input", applyFilter);
};

const setupScrollSpy = () => {
  const sections = Array.from(document.querySelectorAll(".section, .hero"));
  if (!sections.length) return;

  if (!("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (!visibleEntries.length) return;
      const topEntry = visibleEntries.reduce((best, entry) =>
        entry.intersectionRatio > best.intersectionRatio ? entry : best
      );
      const targetId = topEntry.target.getAttribute("id");
      if (targetId) {
        setActiveNav(targetId);
      }
    },
    {
      root: null,
      rootMargin: "-30% 0px -55% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );

  sections.forEach((section) => observer.observe(section));
};

const setupCommandInteractions = (commands) => {
  const commandIndex = buildCommandIndex(commands);
  const listContainer = document.getElementById("commandList");
  const searchInput = document.getElementById("commandSearch");
  const categorySelect = document.getElementById("categoryFilter");

  const renderFiltered = () => {
    const query = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;
    const filtered = commands.filter((command) => {
      const matchCategory = category === "all" || command.category === category;
      const keywords = [
        command.name,
        ...(command.aliases || []),
        command.description,
        ...(command.usage || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return matchCategory && (!query || keywords.includes(query));
    });
    renderCommandList(filtered);
    handleHashChange(commandIndex);
  };

  const categories = [...new Set(commands.map((command) => command.category))].filter(Boolean);
  categorySelect.innerHTML =
    `<option value="all">全部分类</option>` +
    categories.map((category) => `<option value="${category}">${getCategoryLabel(category)}</option>`).join("");

  searchInput.addEventListener("input", renderFiltered);
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
    { id: "quick-start", title: "快速入门" },
    { id: "movement", title: "探索与移动" },
    { id: "combat", title: "战斗与生存" },
    { id: "inventory", title: "背包与装备" },
    { id: "trading", title: "交易与经济" },
    { id: "progression", title: "任务与成长" },
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
    document.getElementById("prefixValue").textContent = prefixFeature.details;
  }

  SECTIONS.forEach((section) => {
    renderSectionCards(commands, section.contentId, section.category);
  });

  renderErrors(errors);
  setupCommandInteractions(commands);
  highlightActiveNav();
  setupSidebarSearch();
  setupScrollSpy();
};

init();
