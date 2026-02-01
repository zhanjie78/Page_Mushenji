const SECTIONS = [
  { id: "quick-start", title: "Quick Start", category: "Quick Start", contentId: "quickStartContent" },
  {
    id: "movement",
    title: "Movement and Exploration",
    category: "Movement and Exploration",
    contentId: "movementContent",
  },
  { id: "combat", title: "Combat and Survival", category: "Combat and Survival", contentId: "combatContent" },
  { id: "inventory", title: "Inventory and Gear", category: "Inventory and Gear", contentId: "inventoryContent" },
  { id: "trading", title: "Trading and Economy", category: "Trading and Economy", contentId: "tradingContent" },
  { id: "progression", title: "Quests and Progression", category: "Quests and Progression", contentId: "progressionContent" },
];

const HERO_TAGS = ["代码驱动", "新手到进阶", "静态指引", "GitHub Pages"];

const safeJsonParse = (text, fallback) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    return fallback;
  }
};

const loadJson = async (path, fallback = []) => {
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
  const prefix = features.find((feature) => feature.name === "PREFIX");
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
        <article class="card">
          <h3>${cmd.name}</h3>
          <div class="card-meta">分类：${cmd.category}</div>
          <div class="card-meta">描述：${cmd.description || "TODO"}</div>
        </article>
      `
    )
    .join("");
};

const renderErrors = (errors) => {
  const container = document.getElementById("errorContent");
  if (!container) return;
  const listItems = errors.map((error) => `<li>${error.message}</li>`).join("");
  container.innerHTML = `<ul class="error-list">${listItems || "<li>暂无错误数据</li>"}</ul>`;
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
        <p>${command.description || "TODO: 待补充说明"}</p>
      </div>
    `
    )
    .join("");
};

const renderCommandDetail = (command) => {
  const container = document.getElementById("commandDetail");
  if (!container) return;
  if (!command) {
    container.innerHTML = `<div class="detail-empty">选择一个命令查看详细说明。</div>`;
    return;
  }

  const listOrEmpty = (items) =>
    items && items.length ? `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>` : "<div class=\"detail-inline\">暂无</div>";

  const detail = `
    <div class="detail-block">
      <h5>${command.name}</h5>
      <div class="detail-inline">分类：${command.category || "未分类"}</div>
    </div>
    <div class="detail-block">
      <h5>使用方法</h5>
      ${listOrEmpty(command.usage)}
    </div>
    <div class="detail-block">
      <h5>示例</h5>
      ${listOrEmpty(command.examples)}
    </div>
    <div class="detail-block">
      <h5>参数</h5>
      ${listOrEmpty(command.details?.parameters || [])}
    </div>
    <div class="detail-block">
      <h5>前置条件</h5>
      ${listOrEmpty(command.details?.preconditions || [])}
    </div>
    <div class="detail-block">
      <h5>结果/提示</h5>
      ${listOrEmpty(command.details?.outcomes || [])}
    </div>
    <div class="detail-block">
      <h5>注意事项</h5>
      ${listOrEmpty(command.pitfalls || [])}
    </div>
    <div class="detail-block">
      <h5>相关命令</h5>
      ${listOrEmpty(command.related || [])}
    </div>
    <div class="detail-block">
      <h5>引用位置</h5>
      ${command.references && command.references.length ? `<ul>${command.references
        .map((ref) => `<li>${ref.file}#${ref.function}</li>`)
        .join("")}</ul>` : "<div class=\"detail-inline\">暂无</div>"}
    </div>
  `;
  container.innerHTML = detail;
};

const highlightActiveNav = () => {
  const hash = window.location.hash.replace("#", "");
  const navLinks = document.querySelectorAll(".topbar-nav a, .sidebar-nav a");
  navLinks.forEach((link) => {
    const target = link.getAttribute("href")?.replace("#", "");
    link.classList.toggle("active", target === hash);
  });
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
    categories.map((category) => `<option value="${category}">${category}</option>`).join("");

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
  const [commands, features, errors] = await Promise.all([
    loadJson("data/commands.json", []),
    loadJson("data/features.json", []),
    loadJson("data/errors.json", []),
  ]);

  renderHeroTags();
  renderSnapshot(commands, features);
  buildNavLinks(document.getElementById("topNav"), [
    { id: "quick-start", title: "Quick Start" },
    { id: "movement", title: "Movement" },
    { id: "combat", title: "Combat" },
    { id: "inventory", title: "Inventory" },
    { id: "trading", title: "Trading" },
    { id: "progression", title: "Progression" },
    { id: "troubleshooting", title: "Troubleshooting" },
    { id: "command-library", title: "Command Library" },
  ]);
  buildNavLinks(document.getElementById("sidebarNav"), [
    { id: "hero", title: "概览" },
    ...SECTIONS.map((section) => ({ id: section.id, title: section.title })),
    { id: "troubleshooting", title: "Troubleshooting" },
    { id: "command-library", title: "Command Library" },
  ]);

  const prefixFeature = features.find((feature) => feature.name === "PREFIX");
  if (prefixFeature) {
    document.getElementById("prefixValue").textContent = prefixFeature.details;
  }

  SECTIONS.forEach((section) => {
    renderSectionCards(commands, section.contentId, section.category);
  });

  renderErrors(errors);
  setupCommandInteractions(commands);
  highlightActiveNav();
};

init();
