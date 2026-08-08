document.documentElement.classList.add('js');

const NOTES = [
  {
    id: '01', accent: '#3affd6', repo: 'shuchiin-academy',
    url: 'https://github.com/HaibaraKaguya/shuchiin-academy', date: '近期',
    zh: {
      cat: '多智能体 / 编排', status: '进行中',
      title: '多智能体编程：为什么要把前端调研放在开发之前？',
      excerpt: '同一任务里先确定视觉约束，避免开发阶段反复推翻布局、配色与组件选择。',
      sections: [
        { h: '发现', p: '前端任务若只给出功能描述，开发 Agent 往往先写结构，再补视觉；当风格要求在后面加入时，返工会集中发生在页面骨架层。' },
        { h: '处理', p: '将配色、排版密度、动效边界和参考方向整理成简短设计简报，并作为开发输入的一部分。' },
        { h: '当前结论', p: '调研不替代开发，但能让实现从第一版就沿着同一个视觉方向收敛。' },
      ],
    },
    en: {
      cat: 'Multi-Agent / Orchestration', status: 'In progress',
      title: 'Why research the UI before implementation?',
      excerpt: 'A short visual brief prevents late-stage layout, color, and component reversals.',
      sections: [
        { h: 'Observation', p: 'When visual constraints arrive after implementation, rework tends to hit the page skeleton.' },
        { h: 'Approach', p: 'Pass a concise brief covering palette, hierarchy, motion boundaries, and references into development.' },
        { h: 'Current take', p: 'Research does not replace implementation; it gives the first build a coherent direction.' },
      ],
    },
  },
  {
    id: '02', accent: '#d8202c', repo: 'shuchiin-academy',
    url: 'https://github.com/HaibaraKaguya/shuchiin-academy', date: '近期',
    zh: {
      cat: '多智能体 / 协作', status: '已复盘',
      title: '并行 Agent 为什么会覆盖彼此的前端改动？',
      excerpt: '多个 Agent 同时写入同一组页面文件，会把“并行”变成不可控的竞争条件。',
      sections: [
        { h: '问题', p: '两个实现会话接到相同简报后，同时修改 index、CSS 与交互脚本；最后写入的结果可能覆盖前一个会话已完成的部分。' },
        { h: '判断', p: '这不是质量问题，而是写入边界没有划分。共享文件不适合并行实现。' },
        { h: '处理', p: '后续采用“一个实现者 + 一个只读审查者”的顺序：审查者提出具体问题，再由负责文件的实现者定向修改。' },
      ],
    },
    en: {
      cat: 'Multi-Agent / Collaboration', status: 'Reviewed',
      title: 'Why do parallel agents overwrite UI changes?',
      excerpt: 'Concurrent writes to the same page files turn parallel work into an uncontrolled race.',
      sections: [
        { h: 'Problem', p: 'Two sessions editing the same HTML, CSS, and JS can silently overwrite finished work.' },
        { h: 'Diagnosis', p: 'The issue is not quality; it is an undefined write boundary.' },
        { h: 'Handling', p: 'Use one implementation owner and one read-only reviewer, then apply targeted fixes sequentially.' },
      ],
    },
  },
  {
    id: '03', accent: '#3affd6', repo: 'Network-Anomaly-Detection',
    url: 'https://github.com/HaibaraKaguya/Network-Anomaly-Detection', date: '近期',
    zh: {
      cat: '异常检测 / 评估', status: '待补实验',
      title: '网络异常检测：为什么应先确定时间切分，再做特征工程？',
      excerpt: '随机划分会让相邻时间窗口的信息混入训练与测试，得到过于乐观的评估。',
      sections: [
        { h: '问题', p: '网络流量具有时间关联。若先做全量特征，再随机拆分数据，模型可能间接看到测试期的统计规律。' },
        { h: '处理', p: '先固定训练、验证、测试的时间边界，再在各自边界内计算特征与标准化参数。' },
        { h: '下一步', p: '补充按时间滑窗的对比实验，观察不同切分协议下的误报率与漂移表现。' },
      ],
    },
    en: {
      cat: 'Anomaly Detection / Evaluation', status: 'Experiment pending',
      title: 'Why split by time before feature engineering?',
      excerpt: 'Random splits can leak adjacent-window information and overstate evaluation quality.',
      sections: [
        { h: 'Problem', p: 'Traffic data is temporally correlated; global features can leak test-period statistics.' },
        { h: 'Approach', p: 'Fix train, validation, and test boundaries first, then fit transforms inside each boundary.' },
        { h: 'Next', p: 'Compare rolling time windows and inspect false-positive behaviour under drift.' },
      ],
    },
  },
];

const SYSTEMS = [
  { name: 'shuchiin-academy', accent: '#3affd6', url: 'https://github.com/HaibaraKaguya/shuchiin-academy', tags: ['LangGraph', 'Agents', 'Review'], zh: { d: '多智能体任务分发、审查与回退机制。' }, en: { d: 'Multi-agent task routing, review, and rollback.' } },
  { name: 'Network-Anomaly-Detection', accent: '#d8202c', url: 'https://github.com/HaibaraKaguya/Network-Anomaly-Detection', tags: ['Python', 'ML', 'Security'], zh: { d: '网络流量异常检测与评估实验。' }, en: { d: 'Network-traffic anomaly detection and evaluation experiments.' } },
  { name: 'recommenders', accent: '#ece6d8', url: 'https://github.com/HaibaraKaguya/recommenders', tags: ['Python', 'RecSys', 'Learning'], zh: { d: '推荐系统方向的学习与实现参考。' }, en: { d: 'Learning and implementation references for recommender systems.' } },
];

const TIMELINE = [
  { year: '近期', zh: { t: '多智能体工作流整理', d: '梳理调研、开发与审查之间的输入与写入边界。' }, en: { t: 'Multi-agent workflow', d: 'Defined input and write boundaries for research, development, and review.' } },
  { year: '近期', zh: { t: '并发写入问题复盘', d: '确认共享页面文件不适合由多个实现会话同时修改。' }, en: { t: 'Concurrent-write review', d: 'Confirmed that shared page files need a single implementation owner.' } },
  { year: '当前', zh: { t: 'AI 工程笔记站上线', d: '建立公开入口，用短笔记持续记录具体工程问题。' }, en: { t: 'Notes site published', d: 'Created a public home for concise engineering problem notes.' } },
];

const I18N = {
  'brand.sub': { zh: 'AI 工程笔记', en: 'AI Engineering Notes' }, 'nav.notes': { zh: '笔记', en: 'Notes' }, 'nav.systems': { zh: '系统', en: 'Systems' }, 'nav.timeline': { zh: '动态', en: 'Updates' }, 'nav.gh': { zh: 'GitHub ↗', en: 'GitHub ↗' },
  'hero.kicker': { zh: '// 近期工程笔记 · 持续更新', en: '// RECENT ENGINEERING NOTES · ACTIVE' }, 'hero.sub': { zh: '人工智能工程笔记', en: 'AI Engineering Notes' }, 'hero.tags': { zh: '小问题 · 可验证判断 · 持续更新', en: 'Small Problems · Verifiable Decisions · Ongoing' }, 'scroll.cue': { zh: '滚动', en: 'Scroll' },
  'notes.title': { zh: '正在解决的问题', en: 'Problems in progress' }, 'notes.lead': { zh: '一条笔记只处理一个具体工程问题：发生了什么、如何判断、当前结论是什么。', en: 'Each note covers one concrete problem, the reasoning behind it, and the current conclusion.' }, 'card.read': { zh: '查看笔记', en: 'Open note' },
  'systems.title': { zh: '工程系统', en: 'Systems' }, 'systems.lead': { zh: '与笔记相连的公开项目。', en: 'Public projects connected to the notes.' }, 'timeline.title': { zh: '近期动态', en: 'Recent updates' }, 'timeline.lead': { zh: '仅保留近期发生的项目推进与站点更新。', en: 'Only recent project and site updates are kept here.' },
  'contact.title': { zh: '工程讨论，开放进行。', en: 'Open to engineering discussion.' }, 'contact.body': { zh: '技术备忘、评审意见与合作意向，欢迎通过 GitHub 联系。', en: 'Technical notes, review feedback, and collaboration — reach out via GitHub.' }, 'contact.cta': { zh: '访问 GitHub 主页', en: 'Visit GitHub profile' }, 'contact.top': { zh: '回到顶部 ↑', en: 'Back to top ↑' },
  'modal.close': { zh: '关闭', en: 'Close' }, 'modal.repo': { zh: '关联项目', en: 'Related project' }, 'modal.status': { zh: '状态', en: 'Status' }, 'modal.date': { zh: '记录', en: 'Recorded' },
};

const LANG_KEY = 'jaythan-notes-lang';
const state = { lang: 'zh', activeNote: null, lastFocused: null };
const $ = (s) => document.querySelector(s); const $$ = (s) => Array.from(document.querySelectorAll(s));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const t = (key) => I18N[key]?.[state.lang] || key;

function renderNotes() { $('#notes-grid').innerHTML = NOTES.map((n) => { const c = n[state.lang]; return '<article class="note-card" style="--accent:' + n.accent + '" data-reveal><button class="note-open" type="button" data-note="' + n.id + '" aria-haspopup="dialog" aria-label="' + esc(t('card.read') + ': ' + c.title) + '"></button><div class="note-body"><div class="note-topline"><span class="note-idx">N' + n.id + '</span><span class="note-cat">' + esc(c.cat) + '</span></div><h3 class="note-title">' + esc(c.title) + '</h3><p class="note-title-en">' + esc(n[state.lang === 'zh' ? 'en' : 'zh'].title) + '</p><p class="note-excerpt">' + esc(c.excerpt) + '</p><div class="note-foot"><span class="note-read">' + t('card.read') + ' →</span><span class="note-repo">↗ ' + esc(n.repo) + '</span></div></div></article>'; }).join(''); }
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
