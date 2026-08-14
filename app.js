document.documentElement.classList.add('js');

const NOTES = [
  {
    id: '03', accent: '#d8202c', repo: 'Shuchiin Academy 2.0',
    url: 'https://github.com/jaychou-66/shuchiin-academy', date: '08-14 16:27',
    zh: {
      cat: '企业知识检索 / 设计记录', status: '第一阶段实施中',
      title: '先把企业知识检索的输入和边界做对｜16:27｜Shuchiin Academy 2.0',
      excerpt: '今天没有把“RAG”当成单一向量库来做，而是先确定三类问题的路由边界、文档进入知识库前的标准化方式，以及检索不到证据时系统必须停止编造的规则。',
      sections: [
        { h: '问题：企业数据并不都该进向量库', p: 'SAP、CRM、OA 里的项目编号、合同编号、状态和日期本来就是结构化字段，应保留在关系数据库并建立普通索引；PDF、SOP、合同扫描件等非结构化材料才需要解析、切块和向量化。把所有内容先转成长文本再塞进向量库，会丢掉精确筛选和跨系统关联能力。' },
        { h: '做法：文件进入前先生成可复核的元数据', p: '每份文件保留 document_id、来源系统、版本、生效状态、页码、项目或供应商 ID；实体和关系单独存为“带证据的边”，例如“合同 C001 —关联项目→ P001”，并记录证据页和版本。Chunk 只携带必要的筛选字段和 document_id，而不是把整份 JSON 重复塞进每个块。' },
        { h: '做法：三层检索而不是一次 Top-K', p: '第一步按项目 ID、文档状态、日期等元数据过滤；第二步同时跑关键词/全文检索与向量检索；第三步用融合排序选出可引用的段落。这样“编号和字段”的精确问题不会被语义相似度误导，“制度解释”类问题也不会只依赖关键词。嵌入层计划使用本地 BGE-M3 + FAISS，生成与路由接口统一指向本地 Qwen。' },
        { h: '边界：路由正确不等于知识库有答案', p: 'CEO Router 先分 DIRECT、INTERNAL_RETRIEVAL、EXTERNAL_RESEARCH。若内部检索路由正确，但数据库与文档库没有足够证据，系统输出“内部资料不足，无法确认”，而不是悄悄转成 DIRECT。后续评测除 macro-F1 外，要特别盯 INTERNAL_RETRIEVAL 的 recall：漏掉这一类会直接带来企业事实的幻觉风险。' },
        { h: '下一步：可重复的最小实验', p: '先用少量可公开引用的文档建立一个演示库：标准化元数据 → 按标题/段落/句子边界切块 → SQLite/FTS 精确检索 → BGE-M3/FAISS 语义检索 → 人工标注问题和证据。每一步都保留输入、输出和评测集，后面再讨论 GraphRAG 与路由权重，而不是一开始就堆叠 Agent。' },
      ],
    },
    en: {
      cat: 'Enterprise Retrieval / Design Log', status: 'Phase one in progress',
      title: 'Get the inputs and boundaries right first | 16:27 | Shuchiin Academy 2.0',
      excerpt: 'The first step is not a vector database: it is routing boundaries, normalized evidence, and an explicit no-evidence outcome.',
      sections: [
        { h: 'Problem', p: 'Structured business fields belong in a relational store; documents need parsing, chunking, and vectors.' },
        { h: 'Metadata', p: 'Every document retains source, version, status, pages, IDs, and evidence-backed relations.' },
        { h: 'Retrieval', p: 'Metadata filtering, keyword/FTS and vector search are fused instead of relying on one Top-K call.' },
        { h: 'Boundary', p: 'Correct routing does not prove coverage. Missing internal evidence must produce an explicit insufficient-evidence result.' },
        { h: 'Next', p: 'Build a small reproducible corpus and evaluation set before adding GraphRAG or learned router weights.' },
      ],
    },
  },
  {
    id: '01', accent: '#3affd6', repo: 'multi-agent / research corpus',
    url: 'https://github.com/HaibaraKaguya', date: '2025-07-09',
    zh: {
      cat: '多智能体 / 研究梳理', status: '持续整理',
      title: '多智能体研究：先区分“协作机制”与“推理增益”',
      excerpt: '基于 67 篇论文建立研究地图。关键不在堆叠框架名称，而在分清角色分工、通信约束、多路径采样和结果聚合各自解决什么问题。',
      sections: [
        { h: '研究地图', p: '语料覆盖多智能体辩论与协作、心智理论与角色扮演、推理增强与自洽性、工具使用、认知偏差、对齐安全与评估基准。按机制组织，而非仅按年份罗列，才能看见不同方法之间的因果关系。' },
        { h: '工程框架与推理方法', p: 'AutoGen、CAMEL、ChatDev、MetaGPT 解决的是角色、消息与任务如何组织；Self-Consistency、Tree of Thoughts、Mixture of Agents 解决的是如何扩展推理路径并聚合候选答案。二者可组合，但不是同一类能力。' },
        { h: '后续验证重点', p: '多 Agent 并不天然提升正确率。有效增益需要来自可验证的任务分工、互补视角或可靠的聚合规则。后续将优先比较辩论轮次、智能体数量与聚合策略的实验设计，而不是只比较框架名称。' },
      ],
    },
    en: {
      cat: 'Multi-Agent / Research Map', status: 'Ongoing',
      title: 'Multi-agent systems: separate coordination from reasoning gain',
      excerpt: 'A 67-paper map distinguishes role coordination, communication constraints, multi-path sampling, and answer aggregation.',
      sections: [
        { h: 'Research map', p: 'The corpus covers debate and collaboration, theory of mind, reasoning enhancement, tool use, cognitive bias, alignment, and benchmarks.' },
        { h: 'Two layers', p: 'AutoGen, CAMEL, ChatDev, and MetaGPT organize roles and messages. Self-consistency, Tree of Thoughts, and Mixture of Agents expand and aggregate reasoning paths.' },
        { h: 'Validation focus', p: 'More agents do not guarantee better answers. Gains need verifiable division of work, complementary views, or a sound aggregation rule.' },
      ],
    },
  },
  {
    id: '02', accent: '#d8202c', repo: 'Network-Anomaly-Detection',
    url: 'https://github.com/HaibaraKaguya/Network-Anomaly-Detection', date: '近期',
    zh: {
      cat: '异常检测 / Gaussian 模型', status: '已完成基线',
      title: 'Gaussian 异常检测：真正需要交叉验证的是阈值 ε',
      excerpt: '在 1001 条无标签网络流量记录上，从概率密度公式手写单变量 Gaussian 乘积模型。均值和方差有闭式解；真正的模型选择风险发生在阈值 ε。',
      sections: [
        { h: '建模链路', p: '数据包含 throughput、congestion、packet_loss、latency、jitter 五个核心指标。训练阶段直接计算 μ 与 σ²，再将每个特征的一维 Gaussian 概率相乘。它是有训练过程但不依赖梯度下降的生成式基线。' },
        { h: '特征诊断', p: '网络流量特征右偏时，直接拟合 Gaussian 会使密度估计失真。通过直方图、Q-Q 图和偏度诊断，比较 sqrt、log1p、Box-Cox 变换；最终使用 log1p，使分布更接近模型假设。' },
        { h: '验证重点', p: 'μ 与 σ²只有十个闭式参数，主要风险不在参数拟合。ε 从 200 个候选阈值中选出，会吸收验证集的随机波动；不同随机划分下 ε 可相差一个数量级，因此使用 5-Fold CV 选择阈值。最终测试集 F1 约为 0.69。' },
      ],
    },
    en: {
      cat: 'Anomaly Detection / Gaussian Model', status: 'Baseline complete',
      title: 'Gaussian anomaly detection: cross-validate the threshold ε',
      excerpt: 'A handwritten univariate Gaussian product model for 1,001 unlabeled traffic records: the selection risk lies in ε, not in the closed-form parameters.',
      sections: [
        { h: 'Model', p: 'Five traffic features are fitted with per-feature Gaussian densities. μ and σ² are calculated directly, then probabilities are multiplied into a density score.' },
        { h: 'Diagnosis', p: 'Histogram, Q-Q, and skewness checks motivated a comparison of sqrt, log1p, and Box-Cox transforms. log1p was used to reduce right skew.' },
        { h: 'Validation', p: 'ε is selected from 200 candidates and can absorb validation noise. Five-fold CV stabilizes that choice; final test F1 is approximately 0.69.' },
      ],
    },
  },
];

const SYSTEMS = [
  { name: 'Shuchiin Academy 2.0', accent: '#d8202c', url: 'https://github.com/jaychou-66/shuchiin-academy', tags: ['RAG', 'Qwen', 'Evaluation'], zh: { d: '面向企业知识检索的多智能体实验：路由评测、元数据血缘、混合检索与证据审查。' }, en: { d: 'An enterprise knowledge-retrieval experiment: routing evaluation, evidence lineage, hybrid search, and review.' } },
  { name: 'multi-agent / research corpus', accent: '#3affd6', url: 'https://github.com/HaibaraKaguya', tags: ['LLM', 'Agents', 'Papers'], zh: { d: '67 篇多智能体、推理增强与对齐方向论文的研究索引。' }, en: { d: 'A research index of 67 papers on agents, reasoning, and alignment.' } },
  { name: 'Network-Anomaly-Detection', accent: '#d8202c', url: 'https://github.com/HaibaraKaguya/Network-Anomaly-Detection', tags: ['Python', 'ML', 'Gaussian'], zh: { d: '从概率模型、特征转换到阈值验证的网络流量异常检测实验。' }, en: { d: 'Network-traffic anomaly detection from probability model to threshold validation.' } },
  { name: 'CIFAR10-ResNet-Experiments', accent: '#ece6d8', url: 'https://github.com/HaibaraKaguya/CIFAR10-ResNet-Experiments', tags: ['TensorFlow', 'CNN', 'ResNet'], zh: { d: '可配置的 CIFAR-10 CNN / ResNet 实验框架，覆盖四种拓扑与 CPU/GPU 基准。' }, en: { d: 'Configurable CIFAR-10 CNN / ResNet experiments with four topologies and CPU/GPU benchmarking.' } },
];

const TIMELINE = [
  { year: '08.14', zh: { t: 'Shuchiin Academy 2.0：知识检索设计', d: '确定企业知识库的元数据、混合检索、三类路由与“证据不足即停止回答”的第一阶段边界。' }, en: { t: 'Shuchiin Academy 2.0: retrieval design', d: 'Defined the first-phase boundary: metadata, hybrid retrieval, three routes, and an explicit insufficient-evidence outcome.' } },
  { year: '2025.07', zh: { t: '多智能体文献地图', d: '完成 67 篇论文的主题整理，并建立从协作框架到推理聚合的阅读路径。' }, en: { t: 'Multi-agent research map', d: 'Organized 67 papers into a reading path from collaboration frameworks to reasoning aggregation.' } },
  { year: '近期', zh: { t: 'Gaussian 异常检测基线', d: '完成特征诊断、闭式解训练、ε 搜索与 5-Fold 交叉验证。' }, en: { t: 'Gaussian anomaly baseline', d: 'Completed feature diagnosis, closed-form fitting, ε search, and five-fold cross-validation.' } },
  { year: '当前', zh: { t: 'AI 工程笔记公开发布', d: '用可追溯的项目记录替代泛泛总结，持续沉淀具体工程判断。' }, en: { t: 'Notes site published', d: 'A public home for traceable project records and concrete engineering decisions.' } },
];

const I18N = {
  'brand.sub': { zh: 'AI 工程笔记', en: 'AI Engineering Notes' }, 'nav.notes': { zh: '笔记', en: 'Notes' }, 'nav.systems': { zh: '系统', en: 'Systems' }, 'nav.timeline': { zh: '动态', en: 'Updates' }, 'nav.gh': { zh: 'GitHub ↗', en: 'GitHub ↗' },
  'hero.kicker': { zh: '// 项目记录 · 持续更新', en: '// PROJECT RECORDS · ACTIVE' }, 'hero.sub': { zh: '人工智能工程笔记', en: 'AI Engineering Notes' }, 'hero.tags': { zh: '真实项目 · 可验证结论 · 持续更新', en: 'Real Projects · Verifiable Conclusions · Ongoing' }, 'scroll.cue': { zh: '滚动', en: 'Scroll' },
  'notes.title': { zh: '工程笔记', en: 'Engineering notes' }, 'notes.lead': { zh: '每篇笔记基于项目 README：记录实际问题、方法选择、验证边界与当前结论。', en: 'Each note is grounded in a project README: problem, method, validation boundary, and current conclusion.' }, 'card.read': { zh: '查看笔记', en: 'Open note' },
  'systems.title': { zh: '关联项目', en: 'Related systems' }, 'systems.lead': { zh: '与笔记相连的公开项目与研究索引。', en: 'Public projects and research indexes connected to the notes.' }, 'timeline.title': { zh: '近期动态', en: 'Recent updates' }, 'timeline.lead': { zh: '仅保留可追溯的项目推进与站点更新。', en: 'Only traceable project progress and site updates are kept here.' },
  'contact.title': { zh: '工程讨论，开放进行。', en: 'Open to engineering discussion.' }, 'contact.body': { zh: '技术备忘、评审意见与合作意向，欢迎通过 GitHub 联系。', en: 'Technical notes, review feedback, and collaboration — reach out via GitHub.' }, 'contact.cta': { zh: '访问 GitHub 主页', en: 'Visit GitHub profile' }, 'contact.top': { zh: '回到顶部 ↗', en: 'Back to top ↗' },
  'modal.close': { zh: '关闭', en: 'Close' }, 'modal.repo': { zh: '关联项目', en: 'Related project' }, 'modal.status': { zh: '状态', en: 'Status' }, 'modal.date': { zh: '记录', en: 'Recorded' },
};

const LANG_KEY = 'jaythan-notes-lang';
const state = { lang: 'zh', activeNote: null, lastFocused: null };
const $ = (s) => document.querySelector(s); const $$ = (s) => Array.from(document.querySelectorAll(s));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const t = (key) => I18N[key]?.[state.lang] || key;

function renderNotes() { $('#notes-grid').innerHTML = NOTES.map((n) => { const c = n[state.lang]; return '<article class="note-card" style="--accent:' + n.accent + '" data-reveal><button class="note-open" type="button" data-note="' + n.id + '" aria-haspopup="dialog" aria-label="' + esc(t('card.read') + ': ' + c.title) + '"></button><div class="note-body"><div class="note-topline"><span class="note-idx">N' + n.id + '</span><span class="note-cat">' + esc(c.cat) + '</span></div><h3 class="note-title">' + esc(c.title) + '</h3><p class="note-title-en">' + esc(n[state.lang === 'zh' ? 'en' : 'zh'].title) + '</p><p class="note-excerpt">' + esc(c.excerpt) + '</p><div class="note-foot"><span class="note-read">' + t('card.read') + ' ↗</span><span class="note-repo">↗ ' + esc(n.repo) + '</span></div></div></article>'; }).join(''); }
function renderSystems() { $('#systems-grid').innerHTML = SYSTEMS.map((s) => '<a class="sys-card" style="--accent:' + s.accent + '" href="' + s.url + '" target="_blank" rel="noopener noreferrer" data-reveal><span class="sys-name">' + esc(s.name) + '</span><span class="sys-desc">' + esc(s[state.lang].d) + '</span><span class="sys-tags">' + s.tags.map((x) => '<span class="sys-tag">' + esc(x) + '</span>').join('') + '</span></a>').join(''); }
function renderTimeline() { $('#timeline-list').innerHTML = TIMELINE.map((x) => '<li class="tl-item" data-reveal><span class="tl-dot" aria-hidden="true"></span><p class="tl-year">' + esc(x.year) + '</p><h3 class="tl-title">' + esc(x[state.lang].t) + '</h3><p class="tl-desc">' + esc(x[state.lang].d) + '</p></li>').join(''); }
function renderModalBody() { const n = NOTES.find((x) => x.id === state.activeNote); if (!n) return; const c = n[state.lang]; $('#note-body').innerHTML = '<div class="m-head"><span class="m-idx">NOTE ' + n.id + '</span><span class="m-cat">' + esc(c.cat) + '</span><span class="m-tag">' + t('modal.date') + ' · ' + n.date + '</span><span class="m-tag">' + t('modal.status') + ' · ' + esc(c.status) + '</span></div><h2 class="m-title" id="note-title">' + esc(c.title) + '</h2><p class="m-excerpt">' + esc(c.excerpt) + '</p>' + c.sections.map((s, i) => '<section class="m-sec"><div class="m-sec-head"><span class="m-sec-num">' + String(i + 1).padStart(2, '0') + '</span><h3 class="m-sec-title">' + esc(s.h) + '</h3></div><div class="m-sec-body"><p>' + esc(s.p) + '</p></div></section>').join('') + '<div class="m-foot"><a class="m-repo-link" href="' + n.url + '" target="_blank" rel="noopener noreferrer">' + t('modal.repo') + ' · ' + esc(n.repo) + ' <span aria-hidden="true">↗</span></a></div>'; }
function openNote(id) { state.activeNote = id; state.lastFocused = document.activeElement; const b = $('#note-modal'); renderModalBody(); b.hidden = false; document.body.classList.add('lock'); requestAnimationFrame(() => requestAnimationFrame(() => b.classList.add('open'))); $('#note-close').focus(); }
function closeNote() { if (!state.activeNote) return; state.activeNote = null; const b = $('#note-modal'); b.classList.remove('open'); const done = () => { b.hidden = true; document.body.classList.remove('lock'); }; b.addEventListener('transitionend', done, { once: true }); setTimeout(done, 340); state.lastFocused?.focus(); }
function initModal() { const b = $('#note-modal'); $('#notes-grid').addEventListener('click', (e) => { const btn = e.target.closest('.note-open'); if (btn) openNote(btn.dataset.note); }); $('#note-close').addEventListener('click', closeNote); b.addEventListener('click', (e) => { if (e.target === b) closeNote(); }); document.addEventListener('keydown', (e) => { if (state.activeNote && e.key === 'Escape') closeNote(); }); }
function initReveal() { const nodes = $$('[data-reveal]'); if (reduceMotion.matches || !('IntersectionObserver' in window)) return nodes.forEach((n) => n.classList.add('is-in')); const observer = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); observer.unobserve(e.target); } }), { threshold: 0.12 }); nodes.forEach((n) => observer.observe(n)); }
function initParallax() { const scene = $('#hero-scene'); const planes = $$('.hero-plane'); if (!scene || reduceMotion.matches) return; let tx = 0, ty = 0, cx = 0, cy = 0; window.addEventListener('pointermove', (e) => { tx = e.clientX / innerWidth * 2 - 1; ty = e.clientY / innerHeight * 2 - 1; }, { passive: true }); (function frame() { cx += (tx - cx) * .05; cy += (ty - cy) * .05; scene.style.transform = 'rotateX(' + (-cy * 5).toFixed(2) + 'deg) rotateY(' + (cx * 6).toFixed(2) + 'deg)'; planes.forEach((p) => { const z = +p.dataset.zi || 0; p.style.transform = 'translate3d(' + (cx * (60 + z * .5)).toFixed(1) + 'px,' + (cy * (36 + z * .3)).toFixed(1) + 'px,0) translateZ(' + z + 'px)'; }); requestAnimationFrame(frame); })(); }
function applyLang(lang) { state.lang = lang; document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'; document.documentElement.dataset.lang = lang; try { localStorage.setItem(LANG_KEY, lang); } catch {} $$('[data-i18n]').forEach((el) => { if (I18N[el.dataset.i18n]) el.textContent = t(el.dataset.i18n); }); const button = $('#lang-toggle'); button.textContent = lang === 'zh' ? 'EN' : '中文'; renderNotes(); renderSystems(); renderTimeline(); initReveal(); }
function init() { let lang = 'zh'; try { lang = localStorage.getItem(LANG_KEY) || 'zh'; } catch {} applyLang(lang === 'en' ? 'en' : 'zh'); initModal(); initParallax(); $('#lang-toggle').addEventListener('click', () => applyLang(state.lang === 'zh' ? 'en' : 'zh')); const year = $('#year'); if (year) year.textContent = new Date().getFullYear(); }
document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
