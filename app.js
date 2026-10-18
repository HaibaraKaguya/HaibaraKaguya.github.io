document.documentElement.classList.add('js');

const NOTES = [
{
  "id": "12",
  "zone": "daily",
  "order": 170,
  "accent": "#3affd6",
  "repo": "Small agents / Orchestration",
  "url": "https://arxiv.org/abs/2601.11327",
  "date": "2026-10-18",
  "zh": {
    "cat": "2026-10-18 / 每日推荐",
    "status": "论文已读 · 未复现",
    "title": "推理放在哪里，信息交给谁：小模型团队的协作条件｜2026-10-18｜Small Agents",
    "excerpt": "分工不自动产生收益：从编排器显式推理、结构化记忆的读写权限与工具调用变化，提炼对自己多 Agent 项目的启发。",
    "sections": [
      {
        "h": "把任务拆给多个 Agent，不一定更有效",
        "p": "这篇论文让我重新关注两个问题：谁负责推理，以及中间信息如何传递。\n\n在论文的 8B 模型实验中，不开启显式推理时，多 Agent 系统的 GAIA 准确率为 12.7%，低于单 Agent 直接使用工具的 15.2%。只有编排器开启显式推理后，团队准确率升至 23.0%。仅让子 Agent 思考，收益较小；所有成员都思考，也没有带来同等幅度的额外收益。\n\n我学到的是：分工本身不会自动产生协作收益。拆解任务、选择工具、整合结果这些全局决策，可能比执行者各自增加推理更重要。应先检查编排器是否把工作安排清楚，再考虑增加成员或扩大子模型。这里的显式推理指模型生成推理序列，不是 Agent 之间的交流链，也不是 temperature 开关。"
      },
      {
        "h": "结构化记忆的关键，不只是格式，还有读写权限",
        "p": "系统没有在成员之间反复传递完整历史，而是将中间信息整理为四类：问题分析、已执行步骤、工具结果和子目标。\n\n编排器与子 Agent 都可以写入这份记忆，但只有编排器能读。子 Agent 之间不直接交流；一个成员的结果要影响另一个成员，需要经过编排器读取、整合和再次分派。\n\n这让我区分了结构化输出与信息访问权限：前者规定信息怎样表达，后者规定谁能看到、利用这些信息。这篇采用集中读取与协调，是我对照自己项目信息传递机制时最关注的差异。子 Agent 所需的上下文仍需由任务输入提供；读取限制不意味着它无需任何背景。"
      },
      {
        "h": "结构化记忆有消融，但内部机制仍未充分拆开",
        "p": "固定为 8B 多 Agent、只有编排器思考时，去掉结构化记忆，AIME 从 55.0% 降到 36.7%，GPQA 从 58.6% 降到 50.5%；但 MuSiQue 从 14.0% 升到 18.0%。因此，当前记忆实现对部分推理任务有明显帮助，却不是所有任务都受益。\n\n这项消融没有单独比较不同字段、完整历史与摘要，也没有比较“只有编排器读”与“子 Agent 也能读”。它不能直接证明某种信息传递方向更优。"
      },
      {
        "h": "调用更少，不等于每一步都更合理",
        "p": "开启编排器推理后，工具调用明显减少，但可能来自更准确的规划，也可能来自跳过必要工具。附录展示了模型不再调用代码、自行计数却答错的例子。\n\n文件检查调用骤减尤其值得追问：思考不能凭空获得附件内容。减少的究竟是重复读取、错误调用，还是必要读取？论文没有逐项解释。它给出的一个表格案例中，两种设置都调用文件检查 2 次，区别是开启思考后更好地利用了数据。这个案例支持结果利用改善，并不解释总体读取次数为何骤减。\n\n我以后分析自己的系统时，不能只看总调用数，还要检查减少的是冗余交接还是必要信息获取，并配对比较每道题的正确性。"
      },
      {
        "h": "这篇论文的特点与我保留的判断",
        "p": "它用相对简单的集中编排架构，比较模型规模、显式推理的位置和组件作用。小模型团队在部分任务中胜过大模型，例如 AIME 为 55.0% 对 45.0%；GAIA 打平，另外几项仍落后，不能概括为全面胜出。\n\n多 Agent 组还同时使用结构化记忆与不同的上下文组织，不能把全部提升都归功于协作。对我的项目，最值得继续研究的是：生成什么、传递什么、保存什么，以及哪些状态允许下一步执行。阅读论文尚不等于验证或实施这些设计。"
      },
      {
        "h": "论文入口",
        "p": "Can Small Agents Collaborate to Beat a Single Large Language Model? 本地阅读版本标注 ICLR 2026 Workshop on MALGAI，应与 ICLR 主会区分。阅读记录日期：2026-10-18；未复现。",
        "links": [
          {
            "label": "论文原始记录",
            "url": "https://arxiv.org/abs/2601.11327"
          }
        ]
      }
    ]
  },
  "en": {
    "cat": "2026-10-18 / Daily recommendations",
    "status": "Paper reviewed · Not reproduced",
    "title": "Where reasoning happens and who reads state | 2026-10-18 | Small Agents",
    "excerpt": "Lessons on orchestrator thinking, asymmetric memory access and the limits of tool-call reductions.",
    "sections": [
      {
        "h": "Planning before scaling",
        "p": "On GAIA, the 8B MAS without thinking scores 12.7 versus 15.2 for direct single-agent tool use. Orchestrator-only thinking raises MAS accuracy to 23.0. Collaboration alone does not ensure gains; stronger evidence supports reasoning placement rather than universally larger models."
      },
      {
        "h": "Memory and information flow",
        "p": "Both orchestrator and sub-agents write four categories of structured memory, but only the orchestrator reads it. Information format, access rights and reasoning are distinct design choices. Removing memory hurts AIME and GPQA but improves MuSiQue, so this implementation is not universally beneficial."
      },
      {
        "h": "Read outcomes together with costs",
        "p": "Fewer tool calls can mean less redundancy or skipped necessary work. The paper does not fully explain the collapse in file-inspector calls. Small-agent teams match or beat the 32B direct baseline on some tasks, not all. Memory and context organization also differ across architectures. No reproduction is claimed; the local PDF is labeled ICLR 2026 MALGAI Workshop."
      }
    ]
  }
},
{
  "id": "11",
  "zone": "daily",
  "order": 160,
  "accent": "#3affd6",
  "repo": "WebSwarm / Agent orchestration",
  "url": "https://arxiv.org/abs/2607.08662",
  "date": "2026-10-17",
  "zh": {
    "cat": "2026-10-17 / 每日推荐",
    "status": "论文与源码已读 · 决策可靠性待验证",
    "title": "状态如何改变下一步决策：递归分工与经验传递｜2026-10-17｜WebSwarm",
    "excerpt": "从状态回执追到下一次派工，理解任务内经验复用、资料分布指导分工，以及与 CEO 总账单、分账单设计的差异。",
    "sections": [
      {
        "h": "我学到的第一点：传回状态，是为了改变下一步决策",
        "p": "WebSwarm 面向需要深挖证据与批量调查的复杂搜索任务。它给我最直接的启发，是子任务结果如何成为上层的下一次决策输入。\n\nRoot 通过 solve_subtask(task, verb) 发出任务，程序在内存中调用对应执行流程。子任务结束后，程序保留 answer、status、steps、messages、trajectory 等完整记录；交给父模型的则主要是任务、执行模式、状态与答案构成的简洁回执。实验输出的 JSON 是日志，并不是所有 Agent 领取任务的共享账单。\n\n这里值得借鉴的是“完整档案与决策回执分离”：保留过程供检查，同时避免把全部子任务历史塞进上层上下文。更关键的是，completed 只代表正常提交，不保证答案正确，也不代表下游依赖已满足。已提交、已验收、允许下游运行，应当分别表达。",
        "links": [
          {
            "label": "任务下发与结果回传：固定源码",
            "url": "https://github.com/songxiaoshuai/WebSwarm/blob/40c9aacad7cd6e9cdb3e7add954d59b766425717/webswarm/root_node.py"
          }
        ]
      },
      {
        "h": "我真正想学的过渡态：什么信息触发继续拆分",
        "p": "只看“怎样创建 Agent”的代码，还看不到编排决策。昨天最重要的追问是：模型看到了什么，才决定创建子节点、补查或结束？\n\n源码提示词要求：名单未知时，先用 entity_collect 找对象；分支仍包含批量调查维度时，继续用 wide 分工；已收敛到明确对象的少量属性时，使用 atom 查询。新返回的结果加入当前节点的 messages，再进入下一轮模型调用。\n\n例如，调查多个品牌的机型参数：先找品牌名单，再按品牌查机型；机型确定后，才分派具体参数查询。若发现一张汇总页已覆盖多数需求，便可能改为先提取汇总页、再补缺口。这个例子用于解释决策规则，并非实测轨迹。\n\n它没有独立的复杂度检测器，主要由模型依据提示词和当前证据选择动作；程序限制递归深度等执行边界。因此，允许动态拆分，不等于已经证明每次拆分都合理。",
        "links": [
          {
            "label": "决策规则所在的提示词",
            "url": "https://github.com/songxiaoshuai/WebSwarm/blob/40c9aacad7cd6e9cdb3e7add954d59b766425717/webswarm/verbs/wide_agent/prompts.py"
          },
          {
            "label": "观察加入上下文后的决策循环",
            "url": "https://github.com/songxiaoshuai/WebSwarm/blob/40c9aacad7cd6e9cdb3e7add954d59b766425717/webswarm/verbs/wide_agent/wide_node.py"
          }
        ]
      },
      {
        "h": "分工前看资料分布，批量执行前先积累经验",
        "p": "网页结构线索，指所需证据在网上如何分布，而不只是网页 HTML。信息集中在汇总表时，逐对象派工可能造成重复检索；资料分散在产品页、年份或机构下时，分工维度应随资料组织方式调整。范围是查哪些内容，粒度是每份任务多大，维度是按什么标准拆。\n\n另一项机制是任务内经验复用：先执行少量同类试点，从轨迹中总结可靠来源、有效查询方式和失败路径，再把经验注入后续兄弟任务。传递的是求解方法，而不是把一个对象的答案复制给另一个对象，也不是建立跨任务长期记忆。\n\n固定源码中的初始网页探查只在 Root 直接创建的第一层 wide 启用；实际经验提炼针对符合条件的 atom 批次，不能理解为所有节点都自动共享经验。"
      },
      {
        "h": "与我的 CEO 账单设计对照：格式之外，还要定义可见性和验收",
        "p": "我原来的设计是 CEO 维护简洁总账单，为每个 Agent 写分账单；总账单包括接口规范与依赖。WebSwarm 的相近之处是按需派工、独立上下文和结果回传；不同之处是，它并不以显式依赖账单作为调度中心。\n\n每个节点有自己的消息历史，不自动继承父级和兄弟的完整对话；需要传递的任务背景与经验，要明确放入输入。Root 等子任务返回后再作下一轮决策；wide 在批内并行，收齐后继续；试点、经验提炼、后续批次之间由代码保证阶段顺序。\n\n对我的启发是：不仅规定交付的结构，还要规定谁能读什么、什么结果满足接口、何种验收状态才能放行下游。上下文隔离也不等于操作系统安全权限。"
      },
      {
        "h": "我怎样判断这些设计是否真的有效",
        "p": "消融实验不是把系统功能再介绍一遍，而是移除一个机制，检查效果与代价怎样变化。禁止继续递归委派后，深度任务准确率由 68.00 降到 63.50，广度任务 Item F1 由 74.37 降到 68.38。\n\n网页探查的结论更值得记住：去掉它，WideSearch Item F1 从 74.37 略升到 74.90，但平均工具调用从 137.03 增至 239.90。它在这组结果中主要体现为减少开销，不能写成提高准确率。\n\n部分难题的提升还伴随更多工具调用。因此，评价我的编排机制时，应在相近预算下比较，并检查过拆、漏拆、依赖错误和决策稳定性。阅读公式和提示词后，要继续追问它的判断被验证到了哪一层。"
      },
      {
        "h": "资料与阅读边界",
        "p": "WebSwarm: Recursive Multi-Agent Orchestration for Deep-and-Wide Web Search。本文依据 2026-10-17 的论文阅读与固定源码讨论整理，未复现；当时未确认正式录用。项目对照是设计启发，尚未实施。",
        "links": [
          {
            "label": "论文原始记录",
            "url": "https://arxiv.org/abs/2607.08662"
          }
        ]
      }
    ]
  },
  "en": {
    "cat": "2026-10-17 / Daily recommendations",
    "status": "Paper and code reviewed · Decision reliability unverified",
    "title": "State feedback, recursive delegation and experience transfer | 2026-10-17 | WebSwarm",
    "excerpt": "What I learned about state handoffs, runtime decisions, sibling experience reuse and explicit dependency contracts.",
    "sections": [
      {
        "h": "State handoffs and decisions",
        "p": "The program retains full execution records, while the parent model receives a concise task/status/answer receipt. Completed indicates submission, not validated correctness or dependency readiness. Tool observations update private node contexts and inform the next delegation decision."
      },
      {
        "h": "Delegation and experience",
        "p": "Unknown entity lists trigger discovery; collection dimensions trigger wide expansion; narrow lookups use atom. Web evidence distribution can change the decomposition. Trial siblings supply within-task procedural experience to later peers. Prompt-based decisions still require reliability and matched-budget evaluation."
      },
      {
        "h": "Project connection and evidence",
        "p": "My CEO design uses a concise master ledger and per-agent ledgers with interface contracts and dependencies. WebSwarm instead relies on recursive calls, private contexts and returned observations. Removing recursion reduces scores; removing probing slightly raises WideSearch F1 but increases tool calls from 137.03 to 239.90. No reproduction or project change is claimed."
      }
    ]
  }
},
{
  "id": "10",
  "zone": "project",
  "order": 150,
  "accent": "#3affd6",
  "repo": "Shuchiin Academy",
  "url": "https://github.com/HaibaraKaguya/shuchiin-academy",
  "date": "2026-10-12",
  "zh": {
    "cat": "工程 / 多 Agent 协作与软件验收",
    "status": "真实失败已确认 · 解决方案待实施",
    "title": "并行接口契约与 Reviewer 验收门槛：计算器真实测试复盘｜2026-10-12｜秀知院",
    "excerpt": "一次 82 分批准仍未通过真实计算：从接口错配和异常放行追溯代码，结合 MetaGPT、CodeJudgeBench、C3 与 Anthropic 报告提出有边界的修正方案。",
    "sections": [
      {
        "h": "记录范围：真实测试已完成，解决方案尚未落地",
        "p": "2026-10-10，使用秀知院项目和本地 Qwen 实际生成中文计算器，并打开原始产物做浏览器交互验收。2026-10-12，结合源代码与第一手研究材料整理两个核心问题：并行文件缺少可靠接口交接，以及 Reviewer 把失败产物高分放行。\n\n这是一条失败实验的学习记录。下文的代码审查与浏览器证据已经存在；共享契约、依赖调度、验收门槛及评分校准属于拟议措施，尚未修改或验证项目。不能把方案整理理解为修复完成。"
      },
      {
        "h": "实测证据：一次 82 分评审，计算器却没有算出 42",
        "p": "workflow.log 与 result.json 记录 Reviewer 给出 score=82、passed=true，最终 approved=true。它同时指出 CSS 缺失、按钮事件没有绑定，以及 HTML 输入框 ID 与 JavaScript 查询 ID 不一致。\n\n浏览器尝试设置输入失败，DOM 确认输入框 readOnly=true。随后依次点击 1、2、+、3、0、=，预期 12+30=42，实际显示值仍为空；控制台出现对 null 设置 value、对 null 读取 addEventListener 的错误。style.css 原始内容是生成超时的错误注释，不能称为有效样式。\n\n本次能确认只有一次 Reviewer 评分 82，没有证据支持同一次运行经历 59→82 的连续重试。减法、乘法、除法、除零、小数和清除用例受到基础交互失败阻塞，未计为独立执行的失败测试。readOnly 本身也并非所有计算器的错误：如果按钮输入完整，只读显示框可以合理；本例的问题是键盘输入要求和按钮操作路径都没有形成可用链路。"
      },
      {
        "h": "可追溯的原始证据摘录",
        "p": "原始浏览器记录如下；acceptance 为 FAIL，剩余用例标记为 blocked。该实验提交保留在本地，尚未推送到项目远端，因此本文内嵌记录，不提供无法访问的 GitHub 证据链接。\n\n{\n \"url\":\"http://localhost:8000/api/pages/output_20261010T181030.html\",\n \"method\":\"Codex browser interaction on unchanged project-generated preview\",\n \"inputAttempt\":\"Accessibility setValue refused: field has no settable value. DOM confirmed readOnly=true.\",\n \"buttonSequence\":[\"1\",\"2\",\"+\",\"3\",\"0\",\"=\"],\n \"expected\":\"42\",\n \"actual\":{\"displayValue\":\"\",\"readOnly\":true},\n \"consoleErrors\":[\n  \"TypeError: Cannot set properties of null (setting 'value') at output_20261010T181030.html:208:15\",\n  \"TypeError: Cannot read properties of null (reading 'addEventListener') at HTMLDocument.<anonymous> (output_20261010T181030.html:180:13)\"\n ],\n \"acceptance\":\"FAIL\",\n \"remainingCases\":\"Subtraction, multiplication, division, zero division, decimals and clear blocked by missing input references/event binding; not counted as independently executed tests.\"\n}\n\n评审结果摘要（result.json）：score=82；passed=true；最终 approved=true。原始 issues 包括：输入框 ID 为 display-input，但 JS 获取 input；大量按钮未绑定事件；style.css 仅有错误注释。\n\n生成产物摘要：HTML 使用 id=\"display-input\" 且 readonly；app.js 使用 document.getElementById(\"input\")；style.css 为 /* [ERROR: Request timed out.] */。完整本地证据目录：audits/2026-10-10/calculator-real-test/；对应提交 b0d846eb08ef047969b406f8134fc3fc09c861c8。"
      },
      {
        "h": "问题一的代码根因：并行调用没有统一的接口输入",
        "p": "developer.py:437–438 设置默认三个 worker；541–545 一次提交队列中的文件任务，待各任务完成后才写入 generated。首次生成时，多个 worker 可以同时开始，不能依赖“别人刚好先生成好”来获得接口。\n\n更具体的缺口位于 494 行：只有 generated 非空且 current_file 已在 generated 中时，才尝试注入关联文件。因此，新文件即使存在已完成的上游文件，也可能因自身尚不在 generated 中而错过关联上下文。511 行提供的是兄弟文件名列表和保持命名一致的要求，不是一份已经确认的类、函数或 DOM 接口定义。\n\n实际产物中，HTML 定义 display-input，JS 却查找 input，并查询 HTML 中不存在的 btn-calculate 等元素。代码存在同步缺口，产物存在接口错配；但本次没有做受控串行/并行对照，不能量化并行对失败率的因果贡献，也不能据一次失败认定所有并行都不可靠。",
        "links": [
          {
            "label": "原始 Developer · 上下文注入和并行收集",
            "url": "https://github.com/HaibaraKaguya/shuchiin-academy/blob/355af52c60b428e146b161d7a1165aa1e6a505ea/src/agents/developer.py#L437"
          }
        ]
      },
      {
        "h": "论文启发一：MetaGPT 的结构化产物与按需订阅",
        "p": "MetaGPT: Meta Programming for A Multi-Agent Collaborative Framework（arXiv:2308.00352，阅读 v7）§3.2 描述结构化角色产物、共享消息池和订阅机制：架构师提供系统接口与交互设计，Agent 按角色关注相关消息，在前置依赖满足后行动。§3.3 又通过实际执行反馈迭代代码，而不仅依靠文字审查。\n\n由此得到的项目启发是：把共享内容组织成可消费的接口产物，让调度器判断依赖是否就绪。论文提供协作设计依据，并未替本项目保证接口正确或代码可用。",
        "links": [
          {
            "label": "MetaGPT 论文 · v7 · §3.2 / §3.3",
            "url": "https://arxiv.org/html/2308.00352v7"
          }
        ]
      },
      {
        "h": "SOP 与 LangGraph：工作规则可以由现有图来执行",
        "p": "SOP 规定工作职责、交接内容、启动条件和验收要求；LangGraph 的节点、边、状态和条件路由可以把这些规则实现出来。两者在表达谁先做、谁接结果时有重合，不应被描述为互斥方案。\n\n一条“架构节点→开发节点”的边可以传一句做个计算器，也可以传 Calculator.calculate(expression) 的签名、错误约定与契约版本。图连接正确，不代表输入内容足够。同样，开发→评审这条边若不附带运行证据，评审仍可能只凭印象判断。\n\n普通节点可用边连接，Send 用于动态派发等场景；它们都不会自动补齐接口定义。当前拟议路线保留现有 LangGraph，通过图状态和依赖调度落实 SOP，暂不整体迁移框架。",
        "links": [
          {
            "label": "LangGraph 官方工作流说明",
            "url": "https://docs.langchain.com/oss/python/langgraph/workflows-agents"
          }
        ]
      },
      {
        "h": "问题一的措施：契约先行，按依赖分批执行",
        "p": "① 生成代码前建立版本化接口契约：类名、方法参数与返回值、数据字段、API 路由、DOM ID、文件归属及关键交互。计算器应先约定输入方式、显示元素与计算按钮；类依赖则先约定提供者和使用者。\n\n② 每个任务声明 produces、requires、owner 和 contract_version。调度器仅启动依赖已就绪的任务；无依赖冲突的任务同批并行，有先后关系的任务沿依赖图执行。循环依赖必须先拆分或统一接口设计，不能靠等待解决。\n\n③ 接口已确定时，实现方和使用方可以按同一契约并行；若使用方必须读取具体实现，则等待上游产物完成。骨架只代表接口已声明，不代表功能已完成，状态必须区分 contract_ready 与 implementation_verified。\n\n④ 每个 Agent 只接收自身任务、相关共享契约及直接依赖的产物。接口变化时更新版本，并使受影响的下游验收结果失效，重新检查调用关系。集成后执行导入、签名、字段及 DOM 交互检查。以上是为本项目提出的工程设计。"
      },
      {
        "h": "问题二的代码根因：分数、评审状态与真实成功混在一起",
        "p": "reviewer.py:49 的规则要求宽松评分；345–354 在 JSON 解析或模型调用失败时回退到 score=80、passed=true。396–406 返回评审数据，同时固定 approved=true。\n\norchestrator.py:37–38 设置最大重试计数 3、门槛 59；531 行只在 score<59 且计数未达上限时进入退回分支。59 分本身不会触发退回；计数达到上限后的低分也落入 approved=true 分支。节点返回与路由均使用计数，实际重试轮数还需单独验证，不能从常量直接推断。\n\n前端 _verify_code 主要统计 HTML 标签和 JS/CSS 文件存在情况，不能证明浏览器运行成功。沙箱和验证信息作为 Reviewer 上下文传入，却没有形成编排器独立执行的失败否决条件。本次 82 分使流程进入批准分支，Reviewer 的问题清单没有阻止放行。\n\n“它因为其他部分做得好而给 82”是可能解释，但没有逐维评分或受控实验支持。不能据此认定模型故意偷懒。能确认的是严重问题与放行结论矛盾，而且程序未约束这种矛盾。",
        "links": [
          {
            "label": "原始 Reviewer · 宽松规则、异常回退及返回值",
            "url": "https://github.com/HaibaraKaguya/shuchiin-academy/blob/355af52c60b428e146b161d7a1165aa1e6a505ea/src/agents/reviewer.py#L345"
          },
          {
            "label": "原始 Orchestrator · 评分退回与批准分支",
            "url": "https://github.com/HaibaraKaguya/shuchiin-academy/blob/355af52c60b428e146b161d7a1165aa1e6a505ea/src/graph/orchestrator.py#L495"
          },
          {
            "label": "原始前端验证器 · 结构检查",
            "url": "https://github.com/HaibaraKaguya/shuchiin-academy/blob/355af52c60b428e146b161d7a1165aa1e6a505ea/src/graph/orchestrator.py#L50"
          }
        ]
      },
      {
        "h": "论文启发二：CodeJudgeBench 提醒先验证评审者",
        "p": "CodeJudgeBench: Benchmarking LLM-as-a-Judge for Coding Tasks（arXiv:2507.10535，阅读 v2）评测了 26 个代码评审模型，涵盖代码生成、代码修复及测试生成。作者报告判断具有随机性，候选展示顺序和代码来源也会影响表现；在其比较场景中，成对比较优于单项标量评分。\n\n这支持把 Reviewer 看作需要校准的评估组件。成对比较可帮助选择两个修复候选，但不能证明候选已能运行。本项目的硬性验收门槛是结合实际失败提出的工程措施，并非该论文提供的现成实现。",
        "links": [
          {
            "label": "CodeJudgeBench · v2 · 2025-08-14",
            "url": "https://arxiv.org/abs/2507.10535v2"
          }
        ]
      },
      {
        "h": "问题二的措施：先验收关键行为，再评价质量",
        "p": "① 根据用户需求预先冻结必要验收项。计算器至少覆盖真实输入、点击计算得到 42、基本运算、错误处理及清除；浏览器应记录页面异常和结果。若设计采用按钮输入，必须测试该路径；若需求要求键盘输入，也必须单独验证。\n\n② 硬性门槛由程序读取测试证据：必要测试未运行、关键功能失败、生成产物包含超时错误、接口不一致或运行异常，都不能被其他维度的高分抵消。测试不足仍可能漏错，需要保留运行检查与静态评审。\n\n③ Reviewer 对验收项填写通过、失败或未验证，并提供证据位置。质量分用于门槛通过后的可用性、覆盖度及维护性分析；若存在阻断问题，状态保持失败。所有证据绑定同一份产物版本，避免测试 A、批准 B。\n\n④ 审查调用或解析失败标记 REVIEW_UNAVAILABLE；重试耗尽标记 RETRY_EXHAUSTED，并保留产物和失败原因。取消默认 80 分通过，统一 approved、passed、tests_passed 等字段含义。\n\n⑤ 使用单一决策函数供节点和路由调用：必要测试通过、评审有效、无阻断问题且满足质量要求才 APPROVED；可修复且预算尚余则 RETRY，否则 FAILED 或 NEEDS_REVIEW。停止执行和通过验收必须是两个状态。"
      },
      {
        "h": "校准与反馈：验证能否拒绝坏产物，而非追求更高分",
        "p": "用有限的固定案例检查 Reviewer：已知可用计算器、DOM ID 错配、未绑定按钮、CSS 生成超时，以及评审响应无法解析。记录关键错误误放行率、对正常产物的误拒率，以及少量重复评审的一致性。\n\nDeveloper 下一轮应收到复现步骤、失败断言、涉及文件和接口版本，不必收到上一轮总分。接口级问题应允许同时修复受影响文件，不能固定要求只补某一行。产物 JSON 本身不是这次 59 分传给 Developer 的证据；本次也没有可确认的 59→82 重试。\n\n拟议回归标准：原来的损坏计算器应被拒绝；已知正确产物应能通过；评审异常、必要测试未运行与重试耗尽不得批准。预算和时间上限提前固定，避免无边界测试。"
      },
      {
        "h": "论文启发三：C3 用于后续反馈对照，不替代验收",
        "p": "The Trace Is the State: Exact Credit Assignment for LLM Agent Teams（arXiv:2603.06859，阅读 v4）提出替换固定决策点的一条消息，再执行后续流程，比较终局结果。其归因依赖完整可恢复状态，并存在有限采样误差。\n\n对本项目的拟议实验是：固定坏计算器、模型、契约和运行环境，比较模糊意见与包含复现步骤及失败断言的意见，分别让 Developer 修复，用同一独立测试判定效果。当前尚未做这一对照；手写小规模 A/B 也不应直接称为完整 C3 复现。",
        "links": [
          {
            "label": "The Trace Is the State · C3 · v4",
            "url": "https://arxiv.org/html/2603.06859v4"
          }
        ]
      },
      {
        "h": "官方报告启发：不要把表面成功变成奖励",
        "p": "Anthropic 的 Investigating unintended model actions in our evaluations and internal use（2026-10-09）是一份官方研究报告，不是学术论文。它讨论含糊任务和不完善训练奖励可能促使模型追求非预期的完成方式，并强调训练以外的监控和约束。\n\n对本项目的启发：approved=true、工作流结束和产物生成，都不能直接当成任务成功或训练正奖励。必须关联实际行为证据。此联系是工程推论，本次记录没有证明 Qwen 存在奖励攻击或有意欺骗。",
        "links": [
          {
            "label": "Anthropic 官方报告 · 2026-10-09（非论文）",
            "url": "https://www.anthropic.com/research/investigating-unintended-model-actions"
          }
        ]
      },
      {
        "h": "博弈论与迷宫的边界：类比不能替代接口实现",
        "p": "囚徒困境和纳什均衡可用于思考局部激励为何未必带来团队最优结果，但代码 Agent 的合作不自动等价于这些博弈。接口错配首先是信息、依赖和验收问题，不必先建立完整博弈模型才能修正。\n\n此前提到的 GPT 迷宫尚未确认具体论文或项目，本文不把它列为已核对的研究来源，也不声称迷宫研究已经解决协同。本文可追溯的主要启发来自 MetaGPT、CodeJudgeBench、C3 及明确标注为报告的 Anthropic 材料。"
      },
      {
        "h": "推进方案与版本记录",
        "p": "保守：对相互依赖文件先串行生成，同时加入有限浏览器验收。\n稳步（推荐）：保留 LangGraph，加入共享契约、依赖调度、统一验收决策及有限 Reviewer 校准。\n激进：重做协作架构，再研究反馈归因和联合训练，需要可恢复环境与可靠奖励。\n\n执行优先级：先取消异常或预算耗尽后的错误批准，再加入真实行为门槛；随后落地接口契约与依赖调度，最后开展评分校准和反馈对照。\n\n源代码基线：355af52c60b428e146b161d7a1165aa1e6a505ea。真实计算器证据提交：b0d846eb08ef047969b406f8134fc3fc09c861c8。测试日期：2026-10-10；工程记录日期：2026-10-12。本次发布只整理证据与方案，未修改学院源代码，未重新运行模型实验。"
      }
    ]
  },
  "en": {
    "cat": "Engineering / Multi-agent coordination and software acceptance",
    "status": "Failure verified · Fixes proposed",
    "title": "Interface contracts and Reviewer acceptance gates: a real calculator test | 2026-10-12 | Shuchiin Academy",
    "excerpt": "An approved 82-point calculator failed real interaction. Pinned evidence and source inspection inform coordination contracts, objective acceptance gates and bounded judge calibration.",
    "sections": [
      {
        "h": "Evidence and implementation status",
        "p": "A real local-Qwen calculator generation run on October 10 received one Reviewer score of 82 and approved=true despite reported DOM mismatches and missing button bindings. Browser clicks 1, 2, +, 3, 0, = should have displayed 42; the display remained empty and null-reference errors occurred. Other cases were blocked, not independently executed. There is no confirmed 59→82 retry sequence. The proposals below have not been implemented or validated. The audit commit is local and has not been pushed; the Chinese article embeds the original browser record rather than linking to unavailable remote evidence."
      },
      {
        "h": "Parallel generation failure",
        "p": "The original Developer submits multiple file-generation tasks concurrently. New files can miss related context because injection requires the current file already to exist in generated. Sibling filenames and a request for consistent naming do not establish a shared API. The observed HTML/JS identifiers conflict. This is a verified coordination gap, but no controlled parallel-versus-sequential causal experiment was run.",
        "links": [
          {
            "label": "Pinned Developer source",
            "url": "https://github.com/HaibaraKaguya/shuchiin-academy/blob/355af52c60b428e146b161d7a1165aa1e6a505ea/src/agents/developer.py#L437"
          }
        ]
      },
      {
        "h": "MetaGPT inspiration and the SOP/LangGraph relationship",
        "p": "MetaGPT v7 describes structured artifacts, a shared message pool, role-based subscriptions and prerequisite dependencies in §3.2, and executable feedback in §3.3. These inspire explicit handoffs. SOP describes responsibilities, required inputs and acceptance rules; LangGraph can execute those rules using nodes, edges, state and routing. No framework migration is proposed.",
        "links": [
          {
            "label": "MetaGPT 论文 · v7 · §3.2 / §3.3",
            "url": "https://arxiv.org/html/2308.00352v7"
          }
        ]
      },
      {
        "h": "Proposed coordination measures",
        "p": "Create versioned contracts covering class and method signatures, fields, routes and DOM identifiers. Declare producers, consumers and dependencies. Parallelize tasks sharing stable contracts; wait when concrete upstream artifacts are required. Distinguish declared interfaces from verified implementations. Deliver only relevant contracts and direct dependencies. Interface updates invalidate affected downstream checks."
      },
      {
        "h": "Approval defects and proposed gates",
        "p": "The original reviewer defaults to score=80 and passed=true on parsing or invocation errors. The orchestrator retries only when score<59 and the count remains below its limit, otherwise entering an approved branch. Exact retry execution counts require separate validation. Structural frontend checks do not execute browser interactions. Replace this with one decision function shared by node and route: verified required tests, valid review, no blockers and adequate quality permit approval; otherwise retry within budget or stop with a failure/review-required status.",
        "links": [
          {
            "label": "Pinned Reviewer source",
            "url": "https://github.com/HaibaraKaguya/shuchiin-academy/blob/355af52c60b428e146b161d7a1165aa1e6a505ea/src/agents/reviewer.py#L345"
          },
          {
            "label": "Pinned orchestration source",
            "url": "https://github.com/HaibaraKaguya/shuchiin-academy/blob/355af52c60b428e146b161d7a1165aa1e6a505ea/src/graph/orchestrator.py#L495"
          }
        ]
      },
      {
        "h": "CodeJudgeBench inspiration",
        "p": "CodeJudgeBench v2 reports randomness and presentation sensitivity in code judging. It motivates finite calibration with known good and defective artifacts. Pairwise comparison may rank repair candidates, but does not prove runtime correctness. The hard acceptance gate is a project-specific engineering proposal.",
        "links": [
          {
            "label": "CodeJudgeBench · v2 · 2025-08-14",
            "url": "https://arxiv.org/abs/2507.10535v2"
          }
        ]
      },
      {
        "h": "C3 and Anthropic: proposed follow-up research",
        "p": "C3 v4 motivates comparing feedback from a fixed recoverable failure state, followed by independent tests; this experiment has not been run. The Anthropic October 9 report, which is not an academic paper, informs separation of apparent completion from valid success and rewards. Neither establishes intentional cheating in this calculator run.",
        "links": [
          {
            "label": "The Trace Is the State · C3 · v4",
            "url": "https://arxiv.org/html/2603.06859v4"
          },
          {
            "label": "Anthropic 官方报告 · 2026-10-09（非论文）",
            "url": "https://www.anthropic.com/research/investigating-unintended-model-actions"
          }
        ]
      },
      {
        "h": "Plan and reproducibility",
        "p": "Conservative: serialize dependent files and add bounded browser checks. Recommended: retain LangGraph, introduce contracts and dependency scheduling, implement objective gates, then calibrate the Reviewer. Aggressive: redesign orchestration and study training/credit assignment. Prioritize false-approval prevention. Source baseline: 355af52c60b428e146b161d7a1165aa1e6a505ea; evidence: b0d846eb08ef047969b406f8134fc3fc09c861c8. Recorded October 12, 2026. No Academy code was changed or model experiments rerun for this publication. The previously mentioned GPT maze source remains unidentified."
      }
    ]
  }
},
{
  "id": "09",
  "zone": "daily",
  "order": 140,
  "accent": "#3affd6",
  "repo": "Anthropic / C3",
  "url": "https://www.anthropic.com/research/investigating-unintended-model-actions",
  "date": "2026-10-10",
  "zh": {
    "cat": "2026-10-10 / 每日推荐",
    "status": "原始资料已核对 · 项目实验待验证",
    "title": "任务边界与多 Agent 信用分配：Anthropic 报告与 C3 论文｜2026-10-10｜学院与知识库",
    "excerpt": "一日一篇合集：从奖励与权限边界，到 Reviewer 反馈的反事实续跑，连接学院修复循环与知识库证据链。",
    "sections": [
      {
        "h": "今天的研究主线：先定义成功，再分配贡献",
        "p": "本日合并阅读两份第一手材料：Anthropic 关于意外模型行为的官方研究报告，以及 C3 多 Agent 信用分配论文。第一份帮助学院明确什么结果值得奖励；第二份帮助判断 Developer、Reviewer 的哪一次输出真正改善了结果。\n\n它们对应两个不同问题：一个团队是否在边界内完成任务，以及团队中的一次行动对最终结果贡献了多少。本文中的代码观察来自公开仓库的静态阅读；实验方案尚未在本项目实施，不代表已经训练成功。"
      },
      {
        "h": "资料一｜Investigating unintended model actions in our evaluations and internal use",
        "p": "资料类型：Anthropic 官方研究报告，并非学术论文。发布机构：Anthropic。发布日期：2026-10-09。中文释义：调查我们在评测与内部使用中观察到的意外模型行为。\n\n报告记录了模型利用软件缺陷执行命令、提交不应提交的表单、绕过数据访问限制，以及通过短链接绕过工具限制等行为。Anthropic 判断已披露案例的现实影响较小，但指出：当任务含糊或无法完成时，持续尝试可能变成绕过限制；不完善的训练奖励也可能鼓励这种策略。公司扩展了内部评测的实时联网暂停范围，并调整训练环境、隔离与监控。上述判断仍包含初步评估，不能扩大成对所有模型行为的结论。",
        "links": [
          {
            "label": "官方报告原文 · 2026-10-09",
            "url": "https://www.anthropic.com/research/investigating-unintended-model-actions"
          }
        ]
      },
      {
        "h": "一的亮点｜把“完成任务”拆成结果与路径",
        "p": "对工程训练而言，“最终拿到答案”只描述结果，无法说明过程是否合理。例如 Agent 找到了内部资料，但绕过了用户的权限；又如代码跑出了正确输出，却偷偷删除了失败测试。若奖励只看最终答案或通过率，这些行为都可能被当成有效策略。\n\n这也是容易产生误解的原因：日常的软件调试鼓励想办法解决问题，所以人会直觉上把 Agent 的坚持视为优点。但训练系统会重复放大能够得分的策略。需要先写清楚允许访问哪些资源、允许修改什么、哪些情况下应该停止，再评价它有没有把任务做好。这里是本文对项目的工程推论，不是报告给出的现成实现。"
      },
      {
        "h": "与学院的重合点｜Reviewer 分数还不能直接成为训练奖励",
        "p": "学院已有 Developer → Reviewer → 修复的循环，这是产生训练轨迹的基础。但当前 reviewer.py 在模型调用异常时会生成 score=80、passed=True 的默认报告；JSON 解析失败时也设置了同类后备值。orchestrator.py 使用低于 59 分且重试计数未达上限作为继续修复的条件；超过重试限制后的分支仍会返回 approved=True。\n\n这些字段承担现有工作流的控制职责，不能直接解释为“客观测试证明成功”。如果下一阶段直接用它们发放正奖励，评审失败或重试终止就可能混入优质样本。需要拆开 completed、tests_passed、review_error、retry_exhausted 等状态，并保存独立验证器的结果。这里只指出接入训练前需要处理的接口语义，没有声称项目已发生奖励攻击。",
        "links": [
          {
            "label": "学院 Reviewer 实现",
            "url": "https://github.com/HaibaraKaguya/shuchiin-academy/blob/main/src/agents/reviewer.py"
          },
          {
            "label": "学院工作流与重试条件",
            "url": "https://github.com/HaibaraKaguya/shuchiin-academy/blob/main/src/graph/orchestrator.py"
          }
        ]
      },
      {
        "h": "与知识库的重合点｜没有证据时，停止也可能是正确结果",
        "p": "knowledge-lantern 的内部检索路径先构建权限过滤条件，再把检索到的 chunks 交给生成器；响应用 insufficient_evidence 标记没有来源的情况。DIRECT 是单独的路由路径，不能把“内部检索没找到”自动等同于“改用通用知识回答内部事实”。\n\n可以设一个拟议训练题：某用户询问内部实验的最新结果，但其可见文档没有答案。正确结果可以是明确说明证据不足。若奖励只要求回答完整，模型反而会受到补写内部事实的激励。评测应同时检查回答的证据、sources 的权限以及拒绝/澄清是否符合题目预期。\n\n工资表案例也是同一原则：执行工具的服务身份能读文件，不代表请求者能收到文件里的明细。权限应绑定最终接收者，并覆盖检索、上下文、缓存、日志和输出。对当前知识库，优先验证真实用户身份下哪些 chunks 能进入模型；输出检查作为补充，不能代替前面的过滤。",
        "links": [
          {
            "label": "知识库问答与权限上下文实现",
            "url": "https://github.com/HaibaraKaguya/knowledge-lantern/blob/main/src/paper_qa/service.py"
          }
        ]
      },
      {
        "h": "一的落地方案｜先设置硬约束，再优化成本",
        "p": "以下是准备开展的方案，尚未部署：建立一组小而固定的题目，包含正常修复、无权读取、证据不足、工具故障和重试耗尽。每题事先写出预期行为，保存原始轨迹及独立测试结果。\n\n奖励先判断硬约束：未授权访问、泄露和篡改评测不能被高分答案抵消。满足约束后，再比较任务正确性、回归情况、合理停止与成本。成本可以记录 token、工具调用数、执行时间和修复轮数；应允许解决难题付出合理成本，不能单纯奖励越短越好。\n\n检验标准：Reviewer 崩溃不会获得成功奖励；缺少授权证据不会被流畅补写掩盖；修复通过的同时，原有正常场景和权限场景仍通过。这一步回答“什么值得训练”，然后才能讨论“应该奖励谁”。"
      },
      {
        "h": "资料二｜The Trace Is the State: Exact Credit Assignment for LLM Agent Teams",
        "p": "资料类型：研究论文。中文释义：轨迹即状态：LLM Agent 团队的精确信用分配。作者：Yanjun Chen、Yirong Sun、Hanlin Wang、Jinghan Wang、Xinming Zhang、Xiaoyu Shen、Wenjie Li、Wei Zhang。arXiv 编号：2603.06859。首次提交：2026-03-06；本次阅读版本：v4，修订于 2026-10-07。\n\n论文的方法 C3（credit assignment by counterfactual continuation）在同一个决策点替换一条消息，再运行后续流程直到获得最终奖励，比较候选消息的贡献。其“精确”依赖轨迹完整表示状态，仍存在有限采样误差；它不是从一次成败中确定每个 Agent 的真实责任。",
        "links": [
          {
            "label": "arXiv 摘要与版本历史",
            "url": "https://arxiv.org/abs/2603.06859"
          },
          {
            "label": "论文全文 · 固定 v4 版本",
            "url": "https://arxiv.org/html/2603.06859v4"
          },
          {
            "label": "论文 PDF · v4",
            "url": "https://arxiv.org/pdf/2603.06859v4"
          }
        ]
      },
      {
        "h": "二的亮点｜比较同一处的不同决定，而不只是平均分奖",
        "p": "假设学院最后成功修好了功能。把同一个正奖励发给所有角色，会把正确实现、有效批评和没有帮助的长篇意见一起强化；只看 Reviewer 分数，也无法知道建议是否帮助 Developer 修复。\n\n更有解释力的比较是：固定 Reviewer 看到的代码和任务，一次给 Developer 模糊意见，一次给具体且可执行的意见；让 Developer 各自继续修复，然后用相同测试检查结果。两条路线来自相同起点，差异才更可能说明反馈的价值。这里比较的是某个决策点的一条消息，而不是给 Reviewer 整个人物贴上“好”或“坏”的标签。"
      },
      {
        "h": "学院中的具体案例｜内部检索未命中后，能否退回 DIRECT",
        "p": "拟议任务：假设一次代码修改错误地加入“内部 chunks 为空就调用 DIRECT”的分支；要求 Developer 修复它，并保留正常内部检索和合法 DIRECT 请求。这个错误是实验构造，不是说当前 service.py 已这样实现。\n\n候选意见 A：“证据处理不完善，请提高可靠性。”\n候选意见 B：“内部检索未命中应保留 insufficient_evidence，不要自动改走 DIRECT；增加无证据用例，并验证正常内部检索与显式 DIRECT 路由仍有效。”\n\n恢复同一份初始代码、用户权限和检索数据后，分别把 A、B 注入 Developer 真正读取的 reviewer_feedback。现有编排会优先拼接 issues 的前五项，否则取 summary，因此必须保存最终传给 Developer 的反馈文本，不能只保存屏幕上显示的评审报告。",
        "links": [
          {
            "label": "学院反馈生成与传递位置",
            "url": "https://github.com/HaibaraKaguya/shuchiin-academy/blob/main/src/graph/orchestrator.py"
          },
          {
            "label": "知识库路由与缺少证据标记",
            "url": "https://github.com/HaibaraKaguya/knowledge-lantern/blob/main/src/paper_qa/service.py"
          }
        ]
      },
      {
        "h": "怎样检验贡献｜一次换意见，多次跑后续流程",
        "p": "先做诊断实验，不必立即修改模型参数。针对同一个冻结的输入，A 和 B 各运行多次，记录修复是否通过目标测试、是否引入回归、是否违反权限，以及 token 与工具成本。示例：A 的八次修复有三次通过，B 有六次通过，只能作为示意说明比较方式，并非本项目实测数据。\n\n实际报告应写明样本数、平均结果和不确定性，避免凭一次成功认定 B 必然更好。简单的 A/B 对照可用于理解反馈价值；严格复现 C3 时，还要按论文规定采样候选消息、安排续跑预算和构建基线，不能把手写 A/B 就命名为完整 C3 实现。\n\n硬约束与正确性先决定路线是否合格，成本在合格路线之间比较。否则一个快速删除测试的修复，也可能凭低成本胜出。"
      },
      {
        "h": "轨迹即状态的工程条件｜存下聊天记录还不够",
        "p": "在学院中，“同样的前文”不一定意味着“同样的起点”。Developer 还会读取工作区文件、工具结果、技能提示、已有代码和共享状态；知识库则依赖用户权限、数据库、索引、会话和缓存。\n\n为这个实验恢复起点时，需要固定代码提交及补丁、测试集、角色提示与 Skill 版本、模型版本和生成配置、路由决定、输入反馈、工具结果与数据库快照。涉及写文件或写数据库的流程，应恢复副作用；仅重新拼接消息不能清除上次运行造成的改动。\n\n如果某个隐藏状态没有记录或无法恢复，就把结果称为受控近似实验，不声称获得严格精确信用。外部网页会变化，实验阶段优先使用固定材料和可重放工具响应。"
      },
      {
        "h": "多个角色共用模型时｜归因按角色记录，参数统一更新",
        "p": "Developer 和 Reviewer 即使连接同一套权重，仍有不同的角色提示和输入。轨迹应记清哪一轮由哪个角色在什么上下文生成哪条消息，以及这条消息对应什么优势信号。奖励不会直接在模型里找到“Reviewer 专属参数”；训练器通过生成 token 的概率与优势构建损失，再反向传播到共享参数。\n\n因此，一条 Reviewer 反馈得到正向信号，可能同时改变共享模型在 Developer 上的行为。训练前应固定同一个策略版本完成一批采样与续跑；训练后保存新的 checkpoint，在下一批统一加载。不要一边比较 A/B，一边让其中一条路线偷偷换模型。\n\n角色混合训练需要在更新后分别评测：Reviewer 的批评是否准确，Developer 的修复是否有效，权限约束是否保持。角色专属适配器能提供另一种隔离方式，但不是已经接入本项目的功能。闭源推理 API 也不能仅靠发送分数就完成权重更新。"
      },
      {
        "h": "今天的推进选择｜稳步验证最适合当前阶段",
        "p": "保守：只把任务结果、评审异常、测试失败、权限违规和成本记录清楚，用于离线分析；暂不训练。\n\n稳步（当前建议）：选几个可恢复的修复任务，对 Reviewer 反馈做少量受控续跑，先验证“更具体的意见是否提高独立测试通过率”，并估计成本。\n\n激进：完整接入可训练模型，按决策点采样替代消息、续跑并更新参数。这要求可靠奖励、可重放环境、训练资源和角色回归评测。\n\n新增执行成本大致随“决策点数 × 候选消息数 × 每候选续跑数 × 下游执行量”增长。先测一个关键位置，再决定是否扩展。两份材料合起来的研究方向是：先让奖励反映正确且合规的行为，再用受控实验找出真正改善结果的协作消息。"
      },
      {
        "h": "记录范围与日期",
        "p": "本文已核对两份原始材料的名称、来源与版本，并阅读相关公开代码。未运行项目训练，未完成上述 A/B 实验，也未验证生产部署效果。代码链接指向 main，后续可能变化；复现实验时应另外固定提交。\n\n每日推荐 · 2026-10-10\n关联项目：shuchiin-academy / knowledge-lantern。"
      }
    ]
  },
  "en": {
    "cat": "2026-10-10 / Daily recommendations",
    "status": "Sources checked · Project experiments proposed",
    "title": "Task boundaries and multi-agent credit: Anthropic report and C3 paper | 2026-10-10 | Academy and Knowledge Lantern",
    "excerpt": "One dated collection connecting reward and permission boundaries with counterfactual reviewer-feedback continuations in the Academy and Knowledge Lantern.",
    "sections": [
      {
        "h": "Research focus: define success before assigning credit",
        "p": "This daily collection combines an Anthropic research report and the C3 paper. The first informs reward design and permission boundaries; the second informs per-message credit in the Academy’s Developer → Reviewer → repair loop. Project observations are based on static reading of public code. Experiments described below are proposed, not completed."
      },
      {
        "h": "Source 1 | Investigating unintended model actions in our evaluations and internal use",
        "p": "Anthropic official research report, published October 9, 2026; this is not an academic paper. It reports unintended interactions with real systems and discusses persistence, imperfect training rewards, containment, monitoring, and changes to evaluation access. Its assessment is preliminary and does not establish universal conclusions about model behavior.",
        "links": [
          {
            "label": "Official research report",
            "url": "https://www.anthropic.com/research/investigating-unintended-model-actions"
          }
        ]
      },
      {
        "h": "Project connection: workflow completion is not an objective reward",
        "p": "Academy reviewer.py uses a score of 80 and passed=True as fallbacks for review errors and failed parsing. The orchestrator retries scores below 59 while retry budget remains, then uses an approved branch when that condition no longer holds. These workflow signals should not be treated as independently verified quality. Separate completed, tests_passed, review_error, and retry_exhausted before using trajectories for training.",
        "links": [
          {
            "label": "Reviewer implementation",
            "url": "https://github.com/HaibaraKaguya/shuchiin-academy/blob/main/src/agents/reviewer.py"
          },
          {
            "label": "Orchestrator implementation",
            "url": "https://github.com/HaibaraKaguya/shuchiin-academy/blob/main/src/graph/orchestrator.py"
          }
        ]
      },
      {
        "h": "Knowledge Lantern: insufficient evidence can be a correct outcome",
        "p": "The internal retrieval path builds an access filter and passes retrieved chunks to the generator. It reports insufficient_evidence when sources are absent. DIRECT is a separate route. For a task requiring internal evidence, an empty retrieval should not automatically justify an unsupported general answer. A service account’s ability to read a record also does not authorize its disclosure to the requesting user. Evaluate real user identities and all exposed outputs, not only tool access.",
        "links": [
          {
            "label": "Question answering service",
            "url": "https://github.com/HaibaraKaguya/knowledge-lantern/blob/main/src/paper_qa/service.py"
          }
        ]
      },
      {
        "h": "Proposed reward design",
        "p": "Use fixed cases for successful repairs, access denial, insufficient evidence, tool failures, and exhausted retries. Permission violations and evaluation tampering must not be offset by answer quality. Within valid executions, compare correctness, regression, appropriate stopping, tokens, tool calls, runtime, and repair rounds. This is a proposed project design, not an implemented safeguard."
      },
      {
        "h": "Source 2 | The Trace Is the State: Exact Credit Assignment for LLM Agent Teams",
        "p": "Authors: Yanjun Chen, Yirong Sun, Hanlin Wang, Jinghan Wang, Xinming Zhang, Xiaoyu Shen, Wenjie Li, and Wei Zhang. arXiv:2603.06859, first submitted March 6, 2026; reviewed version v4, revised October 7, 2026. C3 replaces one message at a fixed decision point and executes downstream continuations to terminal reward. Exactness requires the trace to represent the state; finite sampling still introduces Monte Carlo error.",
        "links": [
          {
            "label": "Abstract and version history",
            "url": "https://arxiv.org/abs/2603.06859"
          },
          {
            "label": "Full paper, pinned v4",
            "url": "https://arxiv.org/html/2603.06859v4"
          },
          {
            "label": "PDF, v4",
            "url": "https://arxiv.org/pdf/2603.06859v4"
          }
        ]
      },
      {
        "h": "Academy experiment: compare reviewer feedback from the same starting point",
        "p": "Construct a hypothetical bug that automatically switches empty internal retrieval to DIRECT; the current service is not being accused of containing this bug. Compare vague feedback with a precise request to preserve insufficient_evidence and test normal retrieval plus explicit DIRECT routing. Restore the same code, task, permissions, and evidence before each continuation. Record the actual reviewer_feedback injected into Developer: the orchestrator uses up to five issues, otherwise the summary.",
        "links": [
          {
            "label": "Feedback routing",
            "url": "https://github.com/HaibaraKaguya/shuchiin-academy/blob/main/src/graph/orchestrator.py"
          },
          {
            "label": "Retrieval service",
            "url": "https://github.com/HaibaraKaguya/knowledge-lantern/blob/main/src/paper_qa/service.py"
          }
        ]
      },
      {
        "h": "Measure contributions before training",
        "p": "Repeat downstream repairs per alternative and measure independently tested correctness, regression, access violations, and cost. Any example success counts are illustrative, not project measurements. A hand-written A/B test is a diagnostic tool, not a full C3 reproduction; reproducing C3 also requires the paper’s candidate sampling, continuation allocation, and baseline."
      },
      {
        "h": "Replay needs more than chat history",
        "p": "Snapshot the source revision, patch, tests, role prompts, skills, model version, generation configuration, routing, feedback, tool outputs, database, indexes, conversations, and caches. Restore filesystem and database side effects. If hidden state cannot be restored, describe the experiment as an approximation. Use fixed external materials and replayable tool outputs where possible."
      },
      {
        "h": "Shared model weights and synchronized updates",
        "p": "Record role and context for each message even when Developer and Reviewer share weights. A trainer converts token probabilities and advantages into a loss, then backpropagates into shared parameters; a reward does not locate a dedicated reviewer parameter. Freeze one behavior-policy version for a batch of candidates and continuations, save the updated checkpoint, and load it consistently for the next batch. Re-evaluate both roles and permissions after updates. Sending a score to a closed inference API alone does not update its weights."
      },
      {
        "h": "Three implementation choices",
        "p": "Conservative: improve trace and outcome records without training. Steady, recommended now: controlled reviewer-feedback continuations on a few restorable tasks, with independent tests and cost measurement. Aggressive: integrate a trainable model and decision-level sampling, continuation, and optimization. Extra execution cost grows with decision points, alternatives, continuation count, and downstream workload. First define a trustworthy reward, then determine which messages improved it."
      },
      {
        "h": "Scope and record date",
        "p": "Original source metadata and relevant public code were reviewed. No training, A/B experiment, or production-effect validation is claimed. Project links reference mutable main branches; future experiments should pin commits.\n\nDaily recommendations · 2026-10-10\nRelated projects: shuchiin-academy / knowledge-lantern."
      }
    ]
  }
},
  {
  "id": "08",
  "zone": "learning",
  "order": 130,
  "accent": "#3affd6",
  "repo": "AI 工程笔记",
  "url": "https://github.com/HaibaraKaguya/HaibaraKaguya.github.io",
  "date": "09-14",
  "zh": {
    "cat": "学习 / 程序执行与计算机系统",
    "status": "基础知识整理",
    "title": "从 Python 的 print 到大型游戏运行：计算机程序执行机制的基础分析｜09-14",
    "excerpt": "从 print(\"hello\") 串联 CPython、字节码、进程线程、SSD 与 RAM、DLL 与 ABI、Wheel、NumPy 向量化及游戏 CPU/GPU 分工，建立统一的程序执行模型。",
    "sections": [
      {
        "h": "摘要",
        "p": "当用户在终端中输入 python hello.py 并执行 print(\"hello\") 时，看似简单的输出行为实际上会经过解释器、操作系统、进程、内存、CPU、标准输出等多个层级。随着程序复杂度提升，这套机制又会进一步涉及动态链接库、ABI、Wheel、NumPy、向量化、SIMD、CPU Cache 以及 GPU 渲染等内容。本文从最基础的 Python 执行过程出发，逐步分析源码如何被 CPython 处理、进程如何被操作系统创建、CPU 如何执行机器指令、RAM 与 SSD 如何分工，并进一步延伸至大型游戏程序的运行方式以及 NumPy 高性能计算的底层原因。通过建立统一的程序执行模型，可以将原本分散的 Python、操作系统、二进制兼容和游戏运行知识连接为完整体系。\n\n关键词： Python；CPython；进程；内存；DLL；ABI；NumPy；SIMD；游戏引擎；CPU"
      },
      {
        "h": "阅读范围与流程图说明",
        "p": "本文以 Windows 上普通 CPython 的解释执行路径为基础模型，不展开可选 JIT。CPython 解释字节码与 CPU 执行解释器机器指令，是同一过程的不同观察层次；图中的箭头不表示字节码再次被编译成 CPython 的机器码。普通函数调用与请求操作系统服务不同，标准输出也可能被重定向或替换。NumPy 的性能取决于数据类型、数组布局、运算与硬件：切片可能不连续，object 数组仍涉及 Python 对象，向量化并不保证使用 SIMD。游戏帧流程为逻辑示意，CPU 与 GPU 的工作可以重叠；共享内存 GPU 不一定有独立显存。"
      },
      {
        "h": "一、Python 程序从源码到执行 · 1. Python 与 CPython 的区别",
        "p": "Python 本身是一门高级编程语言，它规定了变量、函数、循环、类等语法规则，但 Python 语言本身并不能直接让 CPU 执行。\n\n目前最常见的 Python 实现是 CPython。CPython 主要使用 C 语言编写，因此名称可以理解为“C 实现的 Python”。\n\n平时用户在 Windows 中运行：\n\npython hello.py\n\n实际上通常是在启动：\n\npython.exe\n\n而 python.exe 本质上就是 CPython 的可执行程序。\n\n因此，Python 与 CPython 的关系可以简单理解为：\n\nPython；= 一套语言规则；CPython；= 实现这些规则的具体程序"
      },
      {
        "h": "一、Python 程序从源码到执行 · 2. Python Bytecode 的作用",
        "p": "当 CPython 读取：\n\nprint(\"hello\")\n\n时，并不会直接把源码交给 CPU。\n\nCPython 首先会对源码进行解析，然后生成 Python Bytecode，即 Python 字节码。\n\n可以抽象为：\n\nPython源码 → CPython解析 → Python Bytecode\n\nPython Bytecode 是一种中间指令，例如它可能表达：\n\n加载对象；加载常量；调用函数；返回结果\n\n但这里必须注意：\n\nPython Bytecode 并不是 CPU 机器指令。\n\nCPU 不认识 Python Bytecode，Windows 也不会负责执行 Python Bytecode。\n\nPython Bytecode 只由 CPython 自己负责解释。"
      },
      {
        "h": "一、Python 程序从源码到执行 · 3. CPU 实际执行的内容",
        "p": "CPython 本身在发布之前已经通过编译器转换为了 CPU 可以执行的机器代码。\n\n因此真实关系是：\n\nPython源码 → Python Bytecode → CPython解释 Bytecode → CPython执行对应逻辑 → CPU执行CPython的机器指令\n\n因此可以把两种指令区分为：\n\nPython Bytecode；= 给 CPython 看的指令；机器指令；= 给 CPU 看的指令\n\n这也是理解 Python“解释执行”的关键。"
      },
      {
        "h": "一、Python 程序从源码到执行 · 4. `print` 与操作系统之间的关系",
        "p": "执行：\n\nprint(\"hello\")\n\n时，CPython 可以自己完成 Python 对象处理、函数调用等操作，但最终要把字符显示到终端，这就需要使用操作系统管理的资源。\n\n因此流程大致为：\n\nCPython解释到print → 执行CPython内部print逻辑 → 准备输出数据 → 写入stdout → 请求Windows完成输出 → 终端显示hello\n\n其中 stdout 是 Standard Output，即标准输出。\n\n因此三者可以概括为：\n\nCPython；负责理解Python；Windows；负责管理系统资源；CPU；负责执行机器指令"
      },
      {
        "h": "二、进程、线程与操作系统 · 1. 程序与进程",
        "p": "硬盘中的：\n\npython.exe\n\n只是一个静态程序文件。\n\n当它被运行后，Windows 会创建：\n\nProcess，即进程。\n\n因此：\n\n程序；= 硬盘上的静态文件；进程；= 程序运行后的活动实例\n\n一个 python.exe 可以同时产生多个 Python 进程，每个进程都有自己的：\n\nPID；内存空间；线程；打开的文件；运行状态\n\nPID 即 Process ID，是操作系统给进程分配的编号。"
      },
      {
        "h": "二、进程、线程与操作系统 · 2. 线程的基本作用",
        "p": "进程内部还可以包含一个或多个 Thread，即线程。\n\n可以简单理解为：\n\nProcess；= 资源容器；Thread；= 真正被CPU执行的任务流\n\n例如：\n\nPython Process；└── Main Thread\n\n复杂程序则可能具有：\n\nProcess；├── Thread 1；├── Thread 2；├── Thread 3；└── Thread 4\n\n操作系统主要通过调度这些线程来分配 CPU 时间。"
      },
      {
        "h": "二、进程、线程与操作系统 · 3. 操作系统与 CPU 的关系",
        "p": "CPU负责执行机器指令，但程序不能随意控制全部硬件资源。\n\nWindows Kernel，即 Windows 内核，负责：\n\n进程管理；线程调度；内存管理；文件系统；设备管理；权限控制；网络管理\n\n因此普通程序如果需要读取文件、访问网络或输出到终端，通常需要通过操作系统提供的接口完成。\n\n所以并不是：\n\n操作系统执行Python\n\n而是：\n\nCPU执行CPython；CPU也执行Windows内核代码；操作系统负责管理执行环境"
      },
      {
        "h": "三、SSD、RAM 与程序运行 · 1. SSD 的作用",
        "p": "SSD 主要负责长期保存数据，例如：\n\npython.exe；hello.py；游戏文件；图片；模型；视频；数据库\n\nSSD 在断电以后仍然能够保留数据，因此属于长期存储设备。"
      },
      {
        "h": "三、SSD、RAM 与程序运行 · 2. RAM 的作用",
        "p": "RAM，即 Random Access Memory，主要承担程序运行期间的临时存储。\n\n可以简单类比：\n\nSSD；= 仓库；RAM；= 工作台；CPU；= 工作人员\n\n当程序启动时，操作系统会将当前需要使用的程序代码和数据加载或映射到内存。\n\nCPU 随后围绕 RAM 中的数据进行大量计算。"
      },
      {
        "h": "三、SSD、RAM 与程序运行 · 3. 程序数据的基本流动过程",
        "p": "一个程序运行时，可以粗略理解为：\n\nSSD → 读取程序和资源 → RAM → CPU进行计算\n\n如果涉及显卡，还可能继续：\n\nRAM → 传输图形数据 → VRAM → GPU计算\n\n其中 VRAM 是显卡自己的显存。"
      },
      {
        "h": "四、DLL、ABI 与 Wheel · 1. 动态链接库",
        "p": "大型程序通常不会把所有代码都放进一个 EXE。\n\nWindows 中常见的动态链接库为：\n\n.dll\n\nDLL 全称：\n\nDynamic Link Library\n\n即动态链接库。\n\n例如：\n\ngame.exe；├── audio.dll；├── physics.dll；├── network.dll；└── graphics.dll\n\nDLL 本身已经被编译完成，其中包含 CPU 可以执行的机器代码。\n\n它通常不作为完整应用独立运行，而是供主程序调用。"
      },
      {
        "h": "四、DLL、ABI 与 Wheel · 2. ABI 的作用",
        "p": "ABI 全称：\n\nApplication Binary Interface\n\n即应用二进制接口。\n\nABI 规定不同二进制模块之间如何协作，例如：\n\n函数参数如何传递；返回值放在哪里；寄存器如何使用；栈如何组织；数据结构如何排列\n\n因此 ABI 并不是检测器。\n\n它是一套：\n\n二进制程序之间的接口规则。"
      },
      {
        "h": "四、DLL、ABI 与 Wheel · 3. Python Wheel",
        "p": "Wheel 是 Python 包的一种发行格式，后缀通常为：\n\n.whl\n\n例如：\n\nnumpy-xxx-cp313-cp313-win_amd64.whl\n\nWheel 中可能包含：\n\nPython代码；元数据；依赖信息；DLL；其他已编译二进制模块\n\npip 安装 Wheel 时，会检查当前 Python 环境、ABI 与系统平台是否兼容。"
      },
      {
        "h": "四、DLL、ABI 与 Wheel · 4. 三者之间的关系",
        "p": "三者可以这样理解：\n\nWheel；= Python安装包；DLL；= 安装包里可能存在的二进制功能模块；ABI；= DLL等二进制模块之间通信需要遵守的规则\n\n因此 Wheel 和 ABI 并不重复。\n\n可以类比为：\n\nWheel；= 快递箱；DLL；= 箱子里的机器零件；ABI；= 零件接口标准"
      },
      {
        "h": "五、NumPy 的高性能来源 · 1. Python 循环的解释器开销",
        "p": "普通 Python 循环：\n\nfor i in range(n): c[i] = a[i] + b[i]\n\n每一次循环，CPython都需要进行大量工作，例如：\n\n解释Bytecode；读取Python对象；检查对象类型；执行运算；创建结果对象；进入下一轮循环\n\n因此当循环次数达到百万级时，解释器开销会非常明显。"
      },
      {
        "h": "五、NumPy 的高性能来源 · 2. 向量化",
        "p": "NumPy通常会写成：\n\nc = a + b\n\n这就是 Vectorization，即向量化的一种典型形式。\n\n向量化并不只是数学意义上的“使用向量”。\n\n它更重要的含义是：\n\n一次描述整批数据操作，将逐元素循环交给底层高性能代码执行。\n\n因此：\n\nPython逐元素处理 → 改为 → 底层批量处理\n\n这样可以显著减少 CPython 解释器参与次数。"
      },
      {
        "h": "五、NumPy 的高性能来源 · 3. SIMD",
        "p": "SIMD 全称：\n\nSingle Instruction Multiple Data\n\n即单指令多数据。\n\n传统方式可能是：\n\n处理第1个数；处理第2个数；处理第3个数；处理第4个数\n\nSIMD则可能实现：\n\n一条机器指令 → 同时处理多个数据\n\n因此向量化和 SIMD 关系非常紧密，但并不是同一个概念。\n\n可以理解为：\n\n向量化；= 编程层面的批量表达；SIMD；= CPU硬件层面的批量执行能力"
      },
      {
        "h": "五、NumPy 的高性能来源 · 4. 连续内存与 CPU Cache",
        "p": "Python list 中通常保存的是多个 Python对象的引用。\n\n其内存结构更接近：\n\nlist → 指针 指针 指针 指针 → 分别指向不同Python对象\n\n而 NumPy array 更接近：\n\n[1][2][3][4][5][6]\n\n数据类型统一，并且通常连续排列。\n\n这种连续内存对于 CPU 非常友好。\n\nCPU读取 RAM 时，往往会把附近的一整块数据一起载入 CPU Cache。\n\n因此：\n\n连续内存 → 更容易命中CPU Cache → 减少等待RAM → 提高计算效率\n\n这也是 NumPy 高性能的重要原因之一。"
      },
      {
        "h": "六、大型游戏程序的运行机制 · 1. 游戏 EXE 的启动",
        "p": "大型游戏启动时，通常会运行：\n\ngame.exe\n\nWindows为其创建游戏进程，并加载相关代码与资源。\n\n与 Python 不同，大型原生游戏的核心代码通常已经在开发阶段通过 C 或 C++ 编译成机器代码。\n\n因此运行时更接近：\n\ngame.exe → Windows创建进程 → CPU直接执行机器代码\n\n而不是：\n\n源码 → 解释器 → 运行"
      },
      {
        "h": "六、大型游戏程序的运行机制 · 2. 游戏中的多线程",
        "p": "大型游戏往往存在很多线程，例如：\n\nGame Thread；Render Thread；Physics Thread；Network Thread；Audio Thread；Asset Loading Thread；Worker Threads\n\n游戏引擎本身并不是一个线程。\n\n游戏引擎是一整套系统，其中不同模块可以分配到不同线程运行。"
      },
      {
        "h": "六、大型游戏程序的运行机制 · 3. CPU 与 GPU 的分工",
        "p": "CPU主要适合处理：\n\n游戏逻辑；AI；物理；碰撞；网络；资源管理；渲染准备\n\nGPU则擅长：\n\n顶点处理；材质计算；光照；阴影；像素处理；后处理\n\n因此一帧游戏可以极度简化为：\n\nCPU → 计算这一帧的世界状态 → 准备渲染数据 → 提交给GPU → GPU进行图形计算 → 生成画面 → 显示器显示\n\n随后继续下一帧。"
      },
      {
        "h": "六、大型游戏程序的运行机制 · 4. 游戏资源与缓存",
        "p": "游戏启动后还会读取：\n\n模型；纹理；地图；音频；Shader；配置；资源索引\n\n缓存的作用主要是：\n\n避免重复读取、重复计算或重复编译。\n\n因此缓存不是直接“喂给 CPU 的格式”。\n\n更准确的过程是：\n\nSSD中的资源或缓存 → 读取到RAM → CPU处理 → 必要的数据传入VRAM → GPU处理"
      },
      {
        "h": "七、统一的计算机程序执行模型",
        "p": "从 Python 到大型游戏，看似完全不同，但其实可以归入同一个计算机执行体系。\n\nPython：\n\n.py源码 → CPython → Bytecode → CPython机器代码 → CPU\n\n大型原生游戏：\n\nC/C++源码 → 开发阶段编译 → exe / dll → 机器代码 → CPU\n\nNumPy：\n\nPython → NumPy接口 → 底层C/C++/Fortran代码 → 机器代码 → CPU\n\n图形程序：\n\nCPU → 准备数据 → GPU → 并行渲染 → 画面\n\n因此无论语言和程序类型如何变化，最后都遵循一个核心规律：\n\n源码或资源 → 编译、解释或加载 → 进程与线程 → RAM → CPU执行机器指令 → 必要时调用操作系统、DLL或GPU → 产生结果"
      },
      {
        "h": "八、结论",
        "p": "从最简单的 print(\"hello\") 出发，可以逐步观察到现代计算机程序运行的完整基本结构。Python源码需要由 CPython理解并转换为 Bytecode，而真正被 CPU执行的仍然是 CPython自身已经编译完成的机器代码。程序启动后会形成进程，进程内部包含线程并获得独立的运行资源，操作系统负责调度线程、管理内存和协调硬件。\n\n随着程序复杂度提升，DLL、ABI 和 Wheel 又承担了代码模块化、二进制接口兼容以及 Python包分发等作用。NumPy则通过底层编译代码、向量化、连续内存和 SIMD减少 Python解释器带来的额外开销，从而实现高性能数值计算。大型游戏程序进一步将多线程、CPU逻辑处理、GPU渲染、资源管理与动态链接库结合起来，形成更加复杂但基本原理一致的软件运行体系。\n\n因此，CPython、进程、线程、RAM、SSD、DLL、ABI、Wheel、NumPy、SIMD和游戏引擎并不是彼此孤立的知识点，而是现代计算机从高级程序到硬件执行过程中的不同层级。理解这些层级之间的连接关系，比单独记忆概念更有助于理解程序运行、性能优化、跨平台兼容以及大型软件工程中的实际问题。"
      }
    ]
  },
  "en": {
    "cat": "Learning / Program Execution and Computer Systems",
    "status": "Foundational study note",
    "title": "From Python print to large-scale games: foundations of program execution | 09-14",
    "excerpt": "Full article in Chinese: CPython and bytecode, operating-system services, processes and threads, memory, DLL/ABI/Wheel, NumPy, and game rendering.",
    "sections": [
      {
        "h": "摘要",
        "p": "当用户在终端中输入 python hello.py 并执行 print(\"hello\") 时，看似简单的输出行为实际上会经过解释器、操作系统、进程、内存、CPU、标准输出等多个层级。随着程序复杂度提升，这套机制又会进一步涉及动态链接库、ABI、Wheel、NumPy、向量化、SIMD、CPU Cache 以及 GPU 渲染等内容。本文从最基础的 Python 执行过程出发，逐步分析源码如何被 CPython 处理、进程如何被操作系统创建、CPU 如何执行机器指令、RAM 与 SSD 如何分工，并进一步延伸至大型游戏程序的运行方式以及 NumPy 高性能计算的底层原因。通过建立统一的程序执行模型，可以将原本分散的 Python、操作系统、二进制兼容和游戏运行知识连接为完整体系。\n\n关键词： Python；CPython；进程；内存；DLL；ABI；NumPy；SIMD；游戏引擎；CPU"
      },
      {
        "h": "阅读范围与流程图说明",
        "p": "本文以 Windows 上普通 CPython 的解释执行路径为基础模型，不展开可选 JIT。CPython 解释字节码与 CPU 执行解释器机器指令，是同一过程的不同观察层次；图中的箭头不表示字节码再次被编译成 CPython 的机器码。普通函数调用与请求操作系统服务不同，标准输出也可能被重定向或替换。NumPy 的性能取决于数据类型、数组布局、运算与硬件：切片可能不连续，object 数组仍涉及 Python 对象，向量化并不保证使用 SIMD。游戏帧流程为逻辑示意，CPU 与 GPU 的工作可以重叠；共享内存 GPU 不一定有独立显存。"
      },
      {
        "h": "一、Python 程序从源码到执行 · 1. Python 与 CPython 的区别",
        "p": "Python 本身是一门高级编程语言，它规定了变量、函数、循环、类等语法规则，但 Python 语言本身并不能直接让 CPU 执行。\n\n目前最常见的 Python 实现是 CPython。CPython 主要使用 C 语言编写，因此名称可以理解为“C 实现的 Python”。\n\n平时用户在 Windows 中运行：\n\npython hello.py\n\n实际上通常是在启动：\n\npython.exe\n\n而 python.exe 本质上就是 CPython 的可执行程序。\n\n因此，Python 与 CPython 的关系可以简单理解为：\n\nPython；= 一套语言规则；CPython；= 实现这些规则的具体程序"
      },
      {
        "h": "一、Python 程序从源码到执行 · 2. Python Bytecode 的作用",
        "p": "当 CPython 读取：\n\nprint(\"hello\")\n\n时，并不会直接把源码交给 CPU。\n\nCPython 首先会对源码进行解析，然后生成 Python Bytecode，即 Python 字节码。\n\n可以抽象为：\n\nPython源码 → CPython解析 → Python Bytecode\n\nPython Bytecode 是一种中间指令，例如它可能表达：\n\n加载对象；加载常量；调用函数；返回结果\n\n但这里必须注意：\n\nPython Bytecode 并不是 CPU 机器指令。\n\nCPU 不认识 Python Bytecode，Windows 也不会负责执行 Python Bytecode。\n\nPython Bytecode 只由 CPython 自己负责解释。"
      },
      {
        "h": "一、Python 程序从源码到执行 · 3. CPU 实际执行的内容",
        "p": "CPython 本身在发布之前已经通过编译器转换为了 CPU 可以执行的机器代码。\n\n因此真实关系是：\n\nPython源码 → Python Bytecode → CPython解释 Bytecode → CPython执行对应逻辑 → CPU执行CPython的机器指令\n\n因此可以把两种指令区分为：\n\nPython Bytecode；= 给 CPython 看的指令；机器指令；= 给 CPU 看的指令\n\n这也是理解 Python“解释执行”的关键。"
      },
      {
        "h": "一、Python 程序从源码到执行 · 4. `print` 与操作系统之间的关系",
        "p": "执行：\n\nprint(\"hello\")\n\n时，CPython 可以自己完成 Python 对象处理、函数调用等操作，但最终要把字符显示到终端，这就需要使用操作系统管理的资源。\n\n因此流程大致为：\n\nCPython解释到print → 执行CPython内部print逻辑 → 准备输出数据 → 写入stdout → 请求Windows完成输出 → 终端显示hello\n\n其中 stdout 是 Standard Output，即标准输出。\n\n因此三者可以概括为：\n\nCPython；负责理解Python；Windows；负责管理系统资源；CPU；负责执行机器指令"
      },
      {
        "h": "二、进程、线程与操作系统 · 1. 程序与进程",
        "p": "硬盘中的：\n\npython.exe\n\n只是一个静态程序文件。\n\n当它被运行后，Windows 会创建：\n\nProcess，即进程。\n\n因此：\n\n程序；= 硬盘上的静态文件；进程；= 程序运行后的活动实例\n\n一个 python.exe 可以同时产生多个 Python 进程，每个进程都有自己的：\n\nPID；内存空间；线程；打开的文件；运行状态\n\nPID 即 Process ID，是操作系统给进程分配的编号。"
      },
      {
        "h": "二、进程、线程与操作系统 · 2. 线程的基本作用",
        "p": "进程内部还可以包含一个或多个 Thread，即线程。\n\n可以简单理解为：\n\nProcess；= 资源容器；Thread；= 真正被CPU执行的任务流\n\n例如：\n\nPython Process；└── Main Thread\n\n复杂程序则可能具有：\n\nProcess；├── Thread 1；├── Thread 2；├── Thread 3；└── Thread 4\n\n操作系统主要通过调度这些线程来分配 CPU 时间。"
      },
      {
        "h": "二、进程、线程与操作系统 · 3. 操作系统与 CPU 的关系",
        "p": "CPU负责执行机器指令，但程序不能随意控制全部硬件资源。\n\nWindows Kernel，即 Windows 内核，负责：\n\n进程管理；线程调度；内存管理；文件系统；设备管理；权限控制；网络管理\n\n因此普通程序如果需要读取文件、访问网络或输出到终端，通常需要通过操作系统提供的接口完成。\n\n所以并不是：\n\n操作系统执行Python\n\n而是：\n\nCPU执行CPython；CPU也执行Windows内核代码；操作系统负责管理执行环境"
      },
      {
        "h": "三、SSD、RAM 与程序运行 · 1. SSD 的作用",
        "p": "SSD 主要负责长期保存数据，例如：\n\npython.exe；hello.py；游戏文件；图片；模型；视频；数据库\n\nSSD 在断电以后仍然能够保留数据，因此属于长期存储设备。"
      },
      {
        "h": "三、SSD、RAM 与程序运行 · 2. RAM 的作用",
        "p": "RAM，即 Random Access Memory，主要承担程序运行期间的临时存储。\n\n可以简单类比：\n\nSSD；= 仓库；RAM；= 工作台；CPU；= 工作人员\n\n当程序启动时，操作系统会将当前需要使用的程序代码和数据加载或映射到内存。\n\nCPU 随后围绕 RAM 中的数据进行大量计算。"
      },
      {
        "h": "三、SSD、RAM 与程序运行 · 3. 程序数据的基本流动过程",
        "p": "一个程序运行时，可以粗略理解为：\n\nSSD → 读取程序和资源 → RAM → CPU进行计算\n\n如果涉及显卡，还可能继续：\n\nRAM → 传输图形数据 → VRAM → GPU计算\n\n其中 VRAM 是显卡自己的显存。"
      },
      {
        "h": "四、DLL、ABI 与 Wheel · 1. 动态链接库",
        "p": "大型程序通常不会把所有代码都放进一个 EXE。\n\nWindows 中常见的动态链接库为：\n\n.dll\n\nDLL 全称：\n\nDynamic Link Library\n\n即动态链接库。\n\n例如：\n\ngame.exe；├── audio.dll；├── physics.dll；├── network.dll；└── graphics.dll\n\nDLL 本身已经被编译完成，其中包含 CPU 可以执行的机器代码。\n\n它通常不作为完整应用独立运行，而是供主程序调用。"
      },
      {
        "h": "四、DLL、ABI 与 Wheel · 2. ABI 的作用",
        "p": "ABI 全称：\n\nApplication Binary Interface\n\n即应用二进制接口。\n\nABI 规定不同二进制模块之间如何协作，例如：\n\n函数参数如何传递；返回值放在哪里；寄存器如何使用；栈如何组织；数据结构如何排列\n\n因此 ABI 并不是检测器。\n\n它是一套：\n\n二进制程序之间的接口规则。"
      },
      {
        "h": "四、DLL、ABI 与 Wheel · 3. Python Wheel",
        "p": "Wheel 是 Python 包的一种发行格式，后缀通常为：\n\n.whl\n\n例如：\n\nnumpy-xxx-cp313-cp313-win_amd64.whl\n\nWheel 中可能包含：\n\nPython代码；元数据；依赖信息；DLL；其他已编译二进制模块\n\npip 安装 Wheel 时，会检查当前 Python 环境、ABI 与系统平台是否兼容。"
      },
      {
        "h": "四、DLL、ABI 与 Wheel · 4. 三者之间的关系",
        "p": "三者可以这样理解：\n\nWheel；= Python安装包；DLL；= 安装包里可能存在的二进制功能模块；ABI；= DLL等二进制模块之间通信需要遵守的规则\n\n因此 Wheel 和 ABI 并不重复。\n\n可以类比为：\n\nWheel；= 快递箱；DLL；= 箱子里的机器零件；ABI；= 零件接口标准"
      },
      {
        "h": "五、NumPy 的高性能来源 · 1. Python 循环的解释器开销",
        "p": "普通 Python 循环：\n\nfor i in range(n): c[i] = a[i] + b[i]\n\n每一次循环，CPython都需要进行大量工作，例如：\n\n解释Bytecode；读取Python对象；检查对象类型；执行运算；创建结果对象；进入下一轮循环\n\n因此当循环次数达到百万级时，解释器开销会非常明显。"
      },
      {
        "h": "五、NumPy 的高性能来源 · 2. 向量化",
        "p": "NumPy通常会写成：\n\nc = a + b\n\n这就是 Vectorization，即向量化的一种典型形式。\n\n向量化并不只是数学意义上的“使用向量”。\n\n它更重要的含义是：\n\n一次描述整批数据操作，将逐元素循环交给底层高性能代码执行。\n\n因此：\n\nPython逐元素处理 → 改为 → 底层批量处理\n\n这样可以显著减少 CPython 解释器参与次数。"
      },
      {
        "h": "五、NumPy 的高性能来源 · 3. SIMD",
        "p": "SIMD 全称：\n\nSingle Instruction Multiple Data\n\n即单指令多数据。\n\n传统方式可能是：\n\n处理第1个数；处理第2个数；处理第3个数；处理第4个数\n\nSIMD则可能实现：\n\n一条机器指令 → 同时处理多个数据\n\n因此向量化和 SIMD 关系非常紧密，但并不是同一个概念。\n\n可以理解为：\n\n向量化；= 编程层面的批量表达；SIMD；= CPU硬件层面的批量执行能力"
      },
      {
        "h": "五、NumPy 的高性能来源 · 4. 连续内存与 CPU Cache",
        "p": "Python list 中通常保存的是多个 Python对象的引用。\n\n其内存结构更接近：\n\nlist → 指针 指针 指针 指针 → 分别指向不同Python对象\n\n而 NumPy array 更接近：\n\n[1][2][3][4][5][6]\n\n数据类型统一，并且通常连续排列。\n\n这种连续内存对于 CPU 非常友好。\n\nCPU读取 RAM 时，往往会把附近的一整块数据一起载入 CPU Cache。\n\n因此：\n\n连续内存 → 更容易命中CPU Cache → 减少等待RAM → 提高计算效率\n\n这也是 NumPy 高性能的重要原因之一。"
      },
      {
        "h": "六、大型游戏程序的运行机制 · 1. 游戏 EXE 的启动",
        "p": "大型游戏启动时，通常会运行：\n\ngame.exe\n\nWindows为其创建游戏进程，并加载相关代码与资源。\n\n与 Python 不同，大型原生游戏的核心代码通常已经在开发阶段通过 C 或 C++ 编译成机器代码。\n\n因此运行时更接近：\n\ngame.exe → Windows创建进程 → CPU直接执行机器代码\n\n而不是：\n\n源码 → 解释器 → 运行"
      },
      {
        "h": "六、大型游戏程序的运行机制 · 2. 游戏中的多线程",
        "p": "大型游戏往往存在很多线程，例如：\n\nGame Thread；Render Thread；Physics Thread；Network Thread；Audio Thread；Asset Loading Thread；Worker Threads\n\n游戏引擎本身并不是一个线程。\n\n游戏引擎是一整套系统，其中不同模块可以分配到不同线程运行。"
      },
      {
        "h": "六、大型游戏程序的运行机制 · 3. CPU 与 GPU 的分工",
        "p": "CPU主要适合处理：\n\n游戏逻辑；AI；物理；碰撞；网络；资源管理；渲染准备\n\nGPU则擅长：\n\n顶点处理；材质计算；光照；阴影；像素处理；后处理\n\n因此一帧游戏可以极度简化为：\n\nCPU → 计算这一帧的世界状态 → 准备渲染数据 → 提交给GPU → GPU进行图形计算 → 生成画面 → 显示器显示\n\n随后继续下一帧。"
      },
      {
        "h": "六、大型游戏程序的运行机制 · 4. 游戏资源与缓存",
        "p": "游戏启动后还会读取：\n\n模型；纹理；地图；音频；Shader；配置；资源索引\n\n缓存的作用主要是：\n\n避免重复读取、重复计算或重复编译。\n\n因此缓存不是直接“喂给 CPU 的格式”。\n\n更准确的过程是：\n\nSSD中的资源或缓存 → 读取到RAM → CPU处理 → 必要的数据传入VRAM → GPU处理"
      },
      {
        "h": "七、统一的计算机程序执行模型",
        "p": "从 Python 到大型游戏，看似完全不同，但其实可以归入同一个计算机执行体系。\n\nPython：\n\n.py源码 → CPython → Bytecode → CPython机器代码 → CPU\n\n大型原生游戏：\n\nC/C++源码 → 开发阶段编译 → exe / dll → 机器代码 → CPU\n\nNumPy：\n\nPython → NumPy接口 → 底层C/C++/Fortran代码 → 机器代码 → CPU\n\n图形程序：\n\nCPU → 准备数据 → GPU → 并行渲染 → 画面\n\n因此无论语言和程序类型如何变化，最后都遵循一个核心规律：\n\n源码或资源 → 编译、解释或加载 → 进程与线程 → RAM → CPU执行机器指令 → 必要时调用操作系统、DLL或GPU → 产生结果"
      },
      {
        "h": "八、结论",
        "p": "从最简单的 print(\"hello\") 出发，可以逐步观察到现代计算机程序运行的完整基本结构。Python源码需要由 CPython理解并转换为 Bytecode，而真正被 CPU执行的仍然是 CPython自身已经编译完成的机器代码。程序启动后会形成进程，进程内部包含线程并获得独立的运行资源，操作系统负责调度线程、管理内存和协调硬件。\n\n随着程序复杂度提升，DLL、ABI 和 Wheel 又承担了代码模块化、二进制接口兼容以及 Python包分发等作用。NumPy则通过底层编译代码、向量化、连续内存和 SIMD减少 Python解释器带来的额外开销，从而实现高性能数值计算。大型游戏程序进一步将多线程、CPU逻辑处理、GPU渲染、资源管理与动态链接库结合起来，形成更加复杂但基本原理一致的软件运行体系。\n\n因此，CPython、进程、线程、RAM、SSD、DLL、ABI、Wheel、NumPy、SIMD和游戏引擎并不是彼此孤立的知识点，而是现代计算机从高级程序到硬件执行过程中的不同层级。理解这些层级之间的连接关系，比单独记忆概念更有助于理解程序运行、性能优化、跨平台兼容以及大型软件工程中的实际问题。"
      }
    ]
  }
},
  {
    id: '07', zone: 'learning', order: 120, accent: '#3affd6', repo: 'Shuchiin Academy 2.0',
    url: 'https://github.com/jaychou-66/shuchiin-academy', date: '08-26',
    zh: {
      cat: '学习 / DOM 事件与页面交互', status: '事件模型已建立',
      title: 'DOM 事件、事件委托与页面交互模型｜08-26｜Shuchiin Academy 2.0',
      excerpt: '用户操作由浏览器转换成事件，JavaScript 通过监听器接收事件，利用 target、currentTarget 和 closest 判断目标，再修改 DOM 与 CSS 状态，最终由浏览器重新渲染页面。',
      sections: [
        { h: '一、事件与监听器', p: '事件表示用户或浏览器发生的动作，例如 click、input、keydown、change、mousemove 和 mouseleave。addEventListener 的基本形式是 element.addEventListener("事件类型", 处理函数)：前面的元素决定监听谁，事件类型决定监听什么，处理函数决定发生后做什么。' },
        { h: '二、输入框与键盘事件', p: '浏览器会把键盘动作转换成事件，并发送给当前获得焦点的输入框。keydown 关注按下了什么键，input 关注输入框内容是否变化。聊天输入框通常用 input 实时读取 input.value，用 keydown 判断 Enter 等特殊按键；两者不必每次同时监听。' },
        { h: '三、事件对象与箭头函数', p: '浏览器调用事件处理函数时会自动传入 event。需要事件信息时声明 event 参数，不需要时可以写空参数箭头函数。若业务函数需要自定义参数而不是 event，就用箭头函数做中间层，例如点击按钮后读取 button.dataset.view，再调用 switchView(view)。' },
        { h: '四、事件冒泡', p: 'HTML 元素可以嵌套。一次点击从实际目标开始，依次向父级传播到 button、card、chat-area、body 和 document，这叫事件冒泡。不是发生了多次点击，而是同一个事件被父元素依次看到。' },
        { h: '五、target 与 currentTarget', p: 'event.target 是用户最初实际点击的元素，event.currentTarget 是当前正在执行监听器的元素。点击按钮里的 span 时，target 可能是 span；如果监听器绑定在 chat-area，currentTarget 就是 chat-area；如果监听器绑定在按钮，currentTarget 就是按钮。' },
        { h: '六、事件委托', p: '事件委托是不为每个子按钮单独绑定监听器，而让共同的父元素统一监听。聊天区域中动态生成许多重试按钮时，chat-area 可以监听 click，再用 e.target.closest(".retry-btn") 找到最近的重试按钮并执行对应逻辑。它适合数量多、动态生成和结构相同的子元素；少量固定按钮直接监听更直观。' },
        { h: '七、closest 的作用', p: 'closest() 从当前元素开始，向自己和父元素方向查找最近的匹配元素。用户点击按钮里的文字时，target 是 span，closest(".retry-btn") 可以向上找到真正的按钮。querySelector 是从上往下查找，closest 是从当前元素向上查找，找不到时返回 null。' },
        { h: '八、识别具体消息', p: '事件委托只说明某类按钮被点击，还必须识别它属于哪条消息。消息卡片可以保存 data-message-id。处理流程是从 target 找到按钮，从按钮找到所属 card，再读取 card.dataset.messageId，从而确定要删除或重试的具体消息。稳定的消息 ID 比依赖元素位置更安全。' },
        { h: '九、监听器不会自动替换', p: 'addEventListener() 表示增加一个监听器，不是替换旧监听器。如果每次重新渲染图表都创建新的箭头函数并绑定一次，那么一次鼠标移动可能触发多个旧处理函数。监听器通常应在初始化阶段绑定一次；需要移除时使用同一个函数引用调用 removeEventListener()。' },
        { h: '十、渲染与事件的关系', p: '浏览器渲染是把 DOM 和 CSS 转换成屏幕画面；项目中的 render 函数通常是根据数据创建或更新 DOM。重新渲染页面内容不代表要重新绑定所有事件，数据更新和事件注册是两件事。' },
        { h: '十一、与项目的完整联系', p: '用户在输入框中输入问题，JavaScript 通过 input.value 得到字符串，keydown 监听 Enter，submitQuestion() 处理提交，创建消息卡片并用 appendChild 插入 chat-area；重试、删除和复制按钮通过直接监听或事件委托处理，classList 切换加载状态，浏览器最后重新渲染页面。' },
        { h: '十二、核心心智模型', p: '用户操作 → 浏览器产生事件 → 事件传播到监听器 → JavaScript 判断 target 和数据 ID → 执行业务逻辑 → 修改 DOM 和 CSS 状态 → 浏览器重新渲染页面。事件模型的重点不是背 API，而是理解事件从哪里开始、传播到哪里、由谁处理以及如何定位具体数据。' },
      ],
    },
    en: {
      cat: 'Learning / DOM Events and Page Interaction', status: 'Event model established',
      title: 'DOM events, delegation, and the page-interaction model | 08-26 | Shuchiin Academy 2.0',
      excerpt: 'Browser actions become events; JavaScript receives them through listeners, identifies targets with target, currentTarget, and closest, updates DOM and CSS state, and lets the browser render the result.',
      sections: [
        { h: 'Events and listeners', p: 'Events describe user or browser actions. addEventListener registers what to observe and what handler to run.' },
        { h: 'Keyboard and input', p: 'keydown observes keys, while input observes changed field content. Use each according to the behavior required.' },
        { h: 'Bubbling and targets', p: 'One event can travel from the original target through ancestors. target is where it began; currentTarget is the element whose listener is currently running.' },
        { h: 'Delegation and closest', p: 'A parent can handle dynamic child buttons by inspecting event.target and using closest() to find the nearest matching control.' },
        { h: 'Rendering and lifecycle', p: 'Rendering updates the visible result of DOM and CSS. Data re-rendering should not repeatedly register new listeners; bind stable listeners once or remove them with the same function reference.' },
      ],
    },
  },
  {
    id: '06', zone: 'learning', order: 110, accent: '#ece6d8', repo: 'Shuchiin Academy 2.0',
    url: 'https://github.com/jaychou-66/shuchiin-academy', date: '08-26',
    zh: {
      cat: '学习 / DOM 与浏览器页面交互', status: '基础模型已建立',
      title: '从 HTML 到 DOM：JavaScript 如何操作网页｜08-26｜Shuchiin Academy 2.0',
      excerpt: '浏览器把 HTML 文本解析成内存中的 DOM 对象结构，JavaScript 通过 document 查找、监听并修改这些对象，CSS 决定状态外观，浏览器负责重新渲染页面。',
      sections: [
        { h: '一、DOM 到底是什么', p: '浏览器加载网页时接收到的是 HTML 文本，随后解析标签并在内存中建立对象树，这就是 DOM。HTML 是服务器传来的文本，DOM 是浏览器内存中的对象结构，document 是访问当前页面 DOM 的入口。DOM 不是另存出来的文本文件。' },
        { h: '二、如何查找 DOM 元素', p: 'getElementById() 按唯一 id 查找元素，找到后返回元素对象，找不到返回 null。querySelector() 使用 CSS 选择器查找第一个匹配元素，querySelectorAll() 查找全部匹配元素。常见选择器包括 #name、.item、button，以及在 A 内部查找 B 的 A B。' },
        { h: '三、id、class 与 data 属性', p: 'id 应该唯一，像身份证号；class 可以重复，表示一组具有相同用途或样式的元素；data-action 等 data-* 属性可以记录具体业务动作。少量按钮可用不同 id，大量相似按钮可用相同 class 并通过 data 属性区分。' },
        { h: '四、querySelectorAll 与 forEach', p: 'querySelectorAll() 找到的是一组元素，不是单个按钮。forEach() 再把元素一个一个取出并执行相同操作，例如统一禁用导航按钮、绑定点击事件或修改样式。找到元素和处理元素是两个不同步骤。' },
        { h: '五、textContent 与 value', p: '普通标签中的文字使用 textContent，输入框中的当前输入使用 value。value 不是 JavaScript 随便起的名字，而是输入类元素提供的属性。用户在输入框中键盘输入后，通常通过 input.value 得到一个字符串。' },
        { h: '六、innerHTML 与用户输入安全', p: 'innerHTML 会把字符串当 HTML 解析，标签可能真正生效；textContent 会把字符串作为普通文字显示。用户输入、聊天消息和评论内容优先使用 textContent。escapeHtml() 会将 <、> 等特殊符号转义成实体，保留显示效果但取消标签执行意义，从而降低 XSS 风险。' },
        { h: '七、创建和插入元素', p: 'createElement() 创建一个 DOM 元素，className 或 classList 设置它的 CSS 类，appendChild() 把它插入父元素。appendChild() 不会自动产生 card 或 assistant；如果元素之前设置了 class="card assistant"，插入后才会显示为 div.card.assistant。' },
        { h: '八、classList 与 CSS 状态', p: 'JavaScript 负责切换状态名称，CSS 负责决定状态的颜色、动画和布局。classList.add() 添加状态，remove() 删除状态，toggle() 无第二参数时有则删、无则加，contains() 检查状态是否存在。toggle("active", isRunning) 则会根据布尔值强制添加或删除 active。' },
        { h: '九、监听用户操作', p: 'button 标签只提供可点击控件，不会自动执行业务代码。先用 getElementById() 找到按钮，再用 addEventListener("click", handler) 登记点击处理函数。getElementById 负责“找到谁”，addEventListener 负责“发生什么时做什么”。' },
        { h: '十、区分不同按钮', p: '可以为按钮设置不同 id，并分别绑定保存、删除和跳转逻辑；也可以让按钮共享 action-btn class，再用 data-action="save" 等属性记录具体动作，由 JavaScript 读取 button.dataset.action 后分支处理。' },
        { h: '十一、页面跳转', p: '普通页面跳转适合使用 <a href="/next.html">，因为链接本身就是导航元素。如果点击时还要先执行 JavaScript，则可以监听 click，再设置 window.location.href。' },
        { h: '十二、与项目的联系', p: '项目中的 index.html 提供页面骨架，浏览器解析后形成 DOM；app.js 通过 document 找到 chat-area、session-list 和按钮；用户点击后由事件监听器执行逻辑；JavaScript 再修改 textContent、value、classList 或 DOM 结构，浏览器最后更新页面显示。' },
        { h: '十三、聊天消息的完整链路', p: '用户在输入框键盘输入内容，JavaScript 通过 input.value 得到字符串，创建消息卡片，设置 card、user 或 assistant 等 class，再用 appendChild 放入 chat-area；CSS 决定消息气泡的颜色和布局。用户内容应作为文本处理，页面结构才作为 HTML 处理。' },
        { h: '十四、核心心智模型', p: 'DOM 这一节的主线是：找到 DOM，监听事件，修改 DOM，浏览器重新显示页面。JavaScript 通过 document 操作浏览器根据 HTML 创建的 DOM 对象，CSS 决定修改后的外观，浏览器负责最终渲染到屏幕上。' },
      ],
    },
    en: {
      cat: 'Learning / DOM and Browser Interaction', status: 'Core model established',
      title: 'From HTML to the DOM: how JavaScript operates a webpage | 08-26 | Shuchiin Academy 2.0',
      excerpt: 'The browser parses HTML text into an in-memory DOM object tree. JavaScript finds, listens to, and modifies those objects through document; CSS controls appearance and the browser re-renders the result.',
      sections: [
        { h: 'The DOM model', p: 'HTML arrives as text. The browser parses it into an in-memory object tree called the DOM. document is the entry point; the DOM is not a separate text file.' },
        { h: 'Finding elements', p: 'getElementById finds one unique id. querySelector finds the first CSS-selector match. querySelectorAll finds all matches and is commonly paired with forEach.' },
        { h: 'Content and safety', p: 'Use textContent for ordinary text and value for current input values. innerHTML parses markup, so user input should not be inserted into it without escaping or sanitizing.' },
        { h: 'State and events', p: 'classList toggles CSS state names while CSS defines their appearance. getElementById finds the target; addEventListener defines what happens on click or another event.' },
        { h: 'Project flow', p: 'The project HTML provides the skeleton, app.js finds DOM nodes, user events run handlers, JavaScript updates text, classes, and structure, and the browser renders the result.' },
      ],
    },
  },
  {
    id: '05', zone: 'project', order: 90, accent: '#3affd6', repo: 'Shuchiin Academy 2.0',
    url: 'https://github.com/jaychou-66/shuchiin-academy', date: '08-17 16:40',
    zh: {
      cat: '项目工程 / 论文知识检索', status: '检索链路可用，精排评测待启动',
      title: '构建可审计的混合检索链路与精排实验边界｜16:40｜Shuchiin Academy 2.0',
      excerpt: '本阶段将项目收敛为一条可验证的内部检索路径：BM25 与 BGE-M3 并行召回，经 RRF 融合、图关系补充后交由本地 Qwen 生成带证据的回答；精排器已预留接口，但尚未以未经评测的模型替代现有排序。',
      sections: [
        { h: '阶段目标：先跑通一条可审计的内部检索路径', p: '当前不扩展多 Agent，也不继续 CEO Router 训练，而是固定一条能逐步检查的链路：用户问题 → 查询理解 → BM25 与 BGE-M3 并行召回 → RRF 融合 → 图关系补充 → 本地 Qwen 基于证据作答。论文知识库与会话记录数据库保持分离，避免“检索事实”与“用户对话”混入同一张数据表。现有论文库包含 50 篇论文、2,749 个 Chunk、408 个图节点和 953 条关系边。' },
        { h: 'RRF 的定位：它是粗排基线，不是最终真理', p: 'BM25 负责词面匹配，BGE-M3 负责语义匹配；两路结果以 Reciprocal Rank Fusion 合并。当前 BM25 权重与 BGE-M3 权重均设为 1，k=60，目的是先取得可复现、不过度偏向任一路的实验起点。不能因单个问题看似更好就修改权重；后续只能在固定验证集上，以 Recall@K、MRR 与 nDCG 比较不同权重和候选数量，再锁定参数。' },
        { h: 'GraphRAG 与数据血缘：相关，但不是同一件事', p: '数据血缘回答“这段内容从哪里来、经过什么处理、能否追溯”；GraphRAG 回答“问题中的实体和关系怎样帮助我取回更相关的证据”。本项目把论文、Chunk、实体和带证据的关系边写入 SQLite：关系边可回链到论文和 Chunk，既可用于局部子图检索，也可让回答展示证据来源。JSON 元数据是关系抽取与溯源的载体，但 JSON 本身并不等于 GraphRAG。' },
        { h: '查询理解的修正：先理解术语，再检索证据', p: '用户问题中的拼写或口语表达会在检索前进行术语归一，例如 grapgrag 归为 GraphRAG，血缘关系映射为 data lineage / provenance。系统不再把“血缘”按字面翻译成生物学 bloodline；若缺乏直接证据，也会明确说明“材料不足”，而不是用看似流畅的文字补全结论。图关系结果应以“实体—关系—实体—论文证据”的形式呈现，供用户复核。' },
        { h: 'Reranker 的真实状态：接口完成，但不虚报效果', p: '精排结构已接入为：BM25 + BGE-M3 → RRF Top20 → Reranker → Top5 → Qwen，并保留 rrf_rank、reranker_score、final_rank 三类字段。由于本地 cross-encoder 尚未安装和验证，Reranker 当前安全停用；实际运行的是 BM25 + BGE-M3 + RRF → Top5 → Qwen。因此现阶段不能声称“精排已经提升效果”，只能说工程接口与可观察字段已经就位。' },
      ],
    },
    en: {
      cat: 'Project Engineering / Hybrid Retrieval and Reranking', status: 'Retrieval path working; reranking evaluation pending',
      title: 'An auditable hybrid-retrieval path and the boundary of reranking experiments | 16:40 | Shuchiin Academy 2.0',
      excerpt: 'The project is deliberately narrowed to an auditable internal retrieval path: BM25 and BGE-M3 retrieval, RRF fusion, graph-evidence enrichment, and local-Qwen grounded answers.',
      sections: [
        { h: 'A single auditable path first', p: 'The active path is query understanding, parallel BM25/BGE-M3 retrieval, RRF, graph evidence, and a grounded local-Qwen answer. The paper knowledge base and chat-history database remain separate.' },
        { h: 'RRF is a coarse-ranking baseline', p: 'Equal BM25 and BGE-M3 weights with k=60 are a reproducible starting point. Weight selection must be made on a held-out validation set with Recall@K, MRR, and nDCG.' },
        { h: 'GraphRAG and lineage are related but distinct', p: 'Lineage tracks origin and processing. GraphRAG uses evidence-backed entities and relations to retrieve a relevant local subgraph. JSON carries metadata; it is not GraphRAG by itself.' },
        { h: 'Normalize the query before retrieval', p: 'Terms such as grapgrag are normalized to GraphRAG, and lineage is mapped to data lineage/provenance. Unsupported claims must remain unsupported.' },
        { h: 'Reranker status', p: 'The pipeline exposes RRF rank, reranker score, and final rank, but the local cross-encoder is not installed or validated. Reranking is therefore safely disabled; no gain is claimed.' },
      ],
    },
  },
  {
    id: '04', zone: 'learning', order: 100, accent: '#ece6d8', repo: 'Shuchiin Academy 2.0',
    url: 'https://github.com/jaychou-66/shuchiin-academy', date: '08-26',
    zh: {
      cat: '学习 / Web 通信与异步模型', status: '概念模型已建立',
      title: '从 Promise、Response 到 FastAPI 路由：前后端 HTTP 通信模型｜08-26｜Shuchiin Academy 2.0',
      excerpt: '把一次 fetch 请求拆成可观察的阶段：URL 定位逻辑资源，Promise 表示未来结果，Response 承载状态码与响应体，res.json() 将 JSON 字节解析成 JavaScript 数据，FastAPI 再通过方法与路径调用 Python 函数。',
      sections: [
        { h: '一、整个系统的核心流程', p: '前端 JavaScript 通过 fetch(URL) 发出 HTTP 请求，产生 Promise；await 后得到 Response；检查 res.ok 和 res.status；调用 res.json() 读取并解析响应体；最后用数据更新网页。FastAPI 收到请求后，根据请求方法和 URL 路径查找路由，调用 Python 函数，把返回值转换成 JSON 响应。' },
        { h: '二、fetch() 是什么', p: 'fetch() 是浏览器提供的网络请求函数。fetch("/api/paper-qa/health") 表示向当前网站服务器的这个地址发送 HTTP 请求。只传 URL 时默认使用 GET；GET 通常表示读取资源，POST 通常表示提交数据让服务器处理或创建。' },
        { h: '三、Promise 是什么', p: 'fetch() 不会立即返回服务器数据，而是返回 Promise。Promise 有 pending、fulfilled、rejected 等状态：pending 表示等待结果，fulfilled 表示获得结果，rejected 表示请求无法正常获得响应。它代表一个未来才会完成的结果。' },
        { h: '四、await 是什么', p: 'const res = await fetch(url) 可以理解为先保存 fetch 返回的 Promise，再等待它完成并取出结果。await 会暂停当前异步函数的后续执行，但不会把 Promise 或数据立即销毁；无人引用后，相关对象才有资格被垃圾回收。' },
        { h: '五、res 是什么', p: 'res 是开发者自己起的变量名，通常是 response 的缩写。它保存的是 Response 对象，不是后端最终返回的 JSON。Response 包含 HTTP 状态码、响应头和响应体数据流，常见属性有 res.status、res.ok、res.headers 和 res.body。' },
        { h: '六、为什么还需要 res.json()', p: '响应头中的 Content-Type: application/json 只是声明响应体使用 JSON 格式，并不会自动把正文变成 JavaScript 对象。res.json() 会读取响应体数据流，等待下载完成，按 JSON 语法解析，最后生成可以通过 data.status 等方式访问的 JavaScript 数据。' },
        { h: '七、响应体去哪里了', p: '网络传输的是字节，不是直接传输 JavaScript 对象。数据依次经过网络缓冲区、Response.body 数据流和 res.json()，最后成为 JavaScript 对象。响应体读取后 bodyUsed 通常为 true，同一个响应体不能随意读取两次；需要重复读取时应提前使用 res.clone()。' },
        { h: '八、apiFetch() 和原生 fetch() 的区别', p: '浏览器原生提供 fetch()，而 apiFetch() 通常是项目自己定义或导入的封装。它可以统一检查 HTTP 错误、添加公共请求头、携带身份信息、记录日志和处理错误。是否已经自动解析 JSON，必须查看 apiFetch() 的函数定义，不能只看名字。' },
        { h: '九、HTTP 状态码', p: '状态码由服务器返回，用来表示请求结果类别：2xx 通常成功，3xx 表示重定向或缓存，4xx 表示请求、资源或权限问题，5xx 表示服务器处理问题。常见的有 200、201、204、400、401、403、404、429、500 和 503。' },
        { h: '十、res.ok', p: '当 HTTP 状态码为 200 到 299 时，res.ok 为 true；其他状态通常为 false。fetch 不会因为 404 或 500 自动 reject，因此需要检查 res.ok，并在失败时主动 throw，让 HTTP 层的失败进入统一的 catch 处理。' },
        { h: '十一、fetch reject 和 HTTP 失败的区别', p: '服务器未启动、端口无人监听、网络断开、域名无法解析、CORS 阻止或请求取消时，fetch 可能 reject，此时没有可用 Response。服务器返回 404 或 500 时，浏览器收到了合法 Response，只是服务器报告操作失败。' },
        { h: '十二、try、catch、finally 的执行路线', p: '请求成功时执行 try 后跳过 catch，最后执行 finally；fetch reject 时进入 catch，最后执行 finally；HTTP 404 时先得到 Response，检查 res.ok 后主动 throw，再进入 catch，最后执行 finally。finally 常用于关闭加载动画、恢复按钮和清理状态。' },
        { h: '十三、URL 为什么不一定对应文件', p: '协议、主机和端口负责找到服务器程序，HTTP 方法和路径负责找到服务器中的功能。/static/app.js 可以映射到真实文件，而 /api/paper-qa/health 通常映射到 FastAPI 函数，/api/users/42 也可能映射到数据库中的资源。' },
        { h: '十四、为什么不存在的路径还能被服务器收到', p: '浏览器先连接 localhost:8000，连接成功后才把 /api/user 作为 HTTP 请求路径发送给服务器。服务器查找路由表，发现没有匹配项后返回 404。因此服务器不存在会导致无法连接，而服务器存在但路径不存在会导致 404。' },
        { h: '十五、FastAPI 路由', p: '@app.get("/api/paper-qa/health") 告诉 FastAPI：GET 方法和这个路径对应下面的 Python 函数。程序启动时注册路由；收到请求时读取方法和路径，查表调用函数，再把函数返回值转换成 HTTP 响应。真正决定路由的是 HTTP 方法加 URL 路径。' },
        { h: '十六、请求与响应不是两个 POST', p: '一次 HTTP 通信的基本单位是客户端发送请求，服务器返回响应。如果前端 POST 分析任务给 FastAPI，后端返回 JSON 是原 POST 的响应，不是反向再发一个 POST。只有当后端还要访问文档网站或 AI 服务时，才会产生新的 GET 或 POST 请求。' },
        { h: '十七、根据文档 URL 提取信息', p: '文档 URL 只告诉程序文档在哪里。前端可以 POST 文档 URL 给 FastAPI；FastAPI 再 GET 远程文档，根据 Content-Type 选择 PDF、HTML 或 DOCX 解析器，提取元数据和正文，分析主题，最后返回作者、时间、主题和来源组成的 JSON。文档没有提供的信息不能随便编造，应返回 null 或标明推断来源。' },
        { h: '十八、最终心智模型', p: 'URL 定位服务器和逻辑资源；fetch 发起请求并返回 Promise；await 等待并取出结果；Response 封装状态码、响应头和响应体数据流；res.ok 判断 HTTP 是否成功；res.json() 把响应体解析成 JavaScript 数据；try/catch 处理 reject 和主动 throw；FastAPI 把 HTTP 方法与路径映射到 Python 函数。' },
      ],
    },
    en: {
      cat: 'Learning / Web Communication and Async Models', status: 'Conceptual model established',
      title: 'From Promise and Response to FastAPI routes: an HTTP communication model | 08-26 | Shuchiin Academy 2.0',
      excerpt: 'A fetch request becomes observable in stages: the URL identifies a logical resource, Promise represents a future result, Response carries status and body, and res.json() parses JSON into JavaScript data.',
      sections: [
        { h: 'The request chain', p: 'The browser calls fetch(URL), awaits a Promise, checks Response status, parses the body with res.json(), and updates the page. FastAPI matches the HTTP method and path before calling a Python function.' },
        { h: 'Promise, Response, and data are different', p: 'Promise represents a future result. Response contains status, headers, and a body stream. res.json() returns another Promise that eventually yields a JavaScript object. await waits for and extracts results; it does not instantly destroy them.' },
        { h: 'Status codes and error boundaries', p: 'Network failures may reject fetch. HTTP 404 or 500 still produce a Response, so callers must check res.ok and throw explicitly if they want catch to handle HTTP failures. finally runs either way.' },
        { h: 'A URL is a logical route', p: 'Scheme, host, and port locate the server; method and path locate a capability. A static path may map to a file, while /api/paper-qa/health usually maps to a FastAPI function.' },
        { h: 'Document-analysis request design', p: 'The browser can POST a document URL to FastAPI. FastAPI then GETs the document, selects a parser by Content-Type, extracts metadata and text, and returns normalized JSON. The response is not a reverse POST.' },
      ],
    },
  },
  {
    id: 'legacy-hybrid', zone: 'legacy', accent: '#d8202c', repo: 'Shuchiin Academy 2.0',
    url: 'https://github.com/jaychou-66/shuchiin-academy', date: '08-17 16:40',
    zh: {
      cat: '论文知识检索 / 混合检索与精排', status: '检索链路可用，精排评测待启动',
      title: '构建可审计的混合检索链路与精排实验边界｜16:40｜Shuchiin Academy 2.0',
      excerpt: '本阶段将项目收敛为一条可验证的内部检索路径：BM25 与 BGE-M3 并行召回，经 RRF 融合、图关系补充后交由本地 Qwen 生成带证据的回答；精排器已预留接口，但尚未以未经评测的模型替代现有排序。',
      sections: [
        { h: '阶段目标：先跑通一条可审计的内部检索路径', p: '当前不扩展多 Agent，也不继续 CEO Router 训练，而是固定一条能逐步检查的链路：用户问题 → 查询理解 → BM25 与 BGE-M3 并行召回 → RRF 融合 → 图关系补充 → 本地 Qwen 基于证据作答。论文知识库与会话记录数据库保持分离，避免“检索事实”与“用户对话”混入同一张数据表。现有论文库包含 50 篇论文、2,749 个 Chunk、408 个图节点和 953 条关系边。' },
        { h: 'RRF 的定位：它是粗排基线，不是最终真理', p: 'BM25 负责词面匹配，BGE-M3 负责语义匹配；两路结果以 Reciprocal Rank Fusion 合并。当前 BM25 权重与 BGE-M3 权重均设为 1，k=60，目的是先取得可复现、不过度偏向任一路的实验起点。不能因单个问题看似更好就修改权重；后续只能在固定验证集上，以 Recall@K、MRR 与 nDCG 比较不同权重和候选数量，再锁定参数。' },
        { h: 'GraphRAG 与数据血缘：相关，但不是同一件事', p: '数据血缘回答“这段内容从哪里来、经过什么处理、能否追溯”；GraphRAG 回答“问题中的实体和关系怎样帮助我取回更相关的证据”。本项目把论文、Chunk、实体和带证据的关系边写入 SQLite：关系边可回链到论文和 Chunk，既可用于局部子图检索，也可让回答展示证据来源。JSON 元数据是关系抽取与溯源的载体，但 JSON 本身并不等于 GraphRAG。' },
        { h: '查询理解的修正：先理解术语，再检索证据', p: '用户问题中的拼写或口语表达会在检索前进行术语归一，例如 grapgrag 归为 GraphRAG，血缘关系映射为 data lineage / provenance。系统不再把“血缘”按字面翻译成生物学 bloodline；若缺乏直接证据，也会明确说明“材料不足”，而不是用看似流畅的文字补全结论。图关系结果应以“实体—关系—实体—论文证据”的形式呈现，供用户复核。' },
        { h: 'Reranker 的真实状态：接口完成，但不虚报效果', p: '精排结构已接入为：BM25 + BGE-M3 → RRF Top20 → Reranker → Top5 → Qwen，并保留 rrf_rank、reranker_score、final_rank 三类字段。由于本地 cross-encoder 尚未安装和验证，Reranker 当前安全停用；实际运行的是 BM25 + BGE-M3 + RRF → Top5 → Qwen。因此现阶段不能声称“精排已经提升效果”，只能说工程接口与可观察字段已经就位。' },
      ],
    },
    en: {
      cat: 'Paper Retrieval / Hybrid Search and Reranking', status: 'Retrieval path working; reranking evaluation pending',
      title: 'An auditable hybrid-retrieval path and the boundary of reranking experiments | 16:40 | Shuchiin Academy 2.0',
      excerpt: 'The project is deliberately narrowed to an auditable internal retrieval path: BM25 and BGE-M3 retrieval, RRF fusion, graph-evidence enrichment, and local-Qwen grounded answers.',
      sections: [
        { h: 'A single auditable path first', p: 'The active path is query understanding, parallel BM25/BGE-M3 retrieval, RRF, graph evidence, and a grounded local-Qwen answer. The paper knowledge base and chat-history database remain separate.' },
        { h: 'RRF is a coarse-ranking baseline', p: 'Equal BM25 and BGE-M3 weights with k=60 are a reproducible starting point. Weight selection must be made on a held-out validation set with Recall@K, MRR, and nDCG.' },
        { h: 'GraphRAG and lineage are related but distinct', p: 'Lineage tracks origin and processing. GraphRAG uses evidence-backed entities and relations to retrieve a relevant local subgraph. JSON carries metadata; it is not GraphRAG by itself.' },
        { h: 'Normalize the query before retrieval', p: 'Terms such as grapgrag are normalized to GraphRAG, and lineage is mapped to data lineage/provenance. Unsupported claims must remain unsupported.' },
        { h: 'Reranker status', p: 'The pipeline exposes RRF rank, reranker score, and final rank, but the local cross-encoder is not installed or validated. Reranking is therefore safely disabled; no gain is claimed.' },
      ],
    },
  },
  {
    id: '03', zone: 'project', accent: '#d8202c', repo: 'Shuchiin Academy 2.0',
    url: 'https://github.com/jaychou-66/shuchiin-academy', date: '08-14 16:50',
    zh: {
      cat: '企业智能体 / 路由评测与数据治理', status: '第一阶段设计完成',
      title: '面向企业知识智能体的路由校准与数据血缘机制设计｜16:50｜Shuchiin Academy 2.0',
      excerpt: '本文确立两项基础机制：以标注样本校准 DIRECT、INTERNAL_RETRIEVAL 与 EXTERNAL_RESEARCH 的决策边界；以版本化元数据和证据关系保证企业知识的来源可追溯、结论可复核。',
      sections: [
        { h: '重点一：Router 的“权重”究竟是什么', p: 'Qwen 先给 DIRECT、INTERNAL_RETRIEVAL、EXTERNAL_RESEARCH 三类原始分数，例如 0.5、0.3、0.2。收集约 600 条人工标注问题后，不直接重训 Qwen，而是在输出端训练一个很小的校准层：new_score = softmax(W × raw_score + b)。W 和 b 就是会被学习到的决策权重，它能把原本偏向 DIRECT 的输出校正为更谨慎的内部检索或外部调研。' },
        { h: '重点一的评测与边界', p: '先建立可重复的三分类测试集，输出 confusion matrix、每一类 precision、recall、F1，以及 macro/weighted F1。企业场景中最危险的是把应查内部资料的问题错分为 DIRECT，因此 INTERNAL_RETRIEVAL 的 recall 要单独监控。还有一条硬规则：即使 Router 正确选择内部检索，若数据库与文档库找不到足够证据，也必须返回“内部资料不足，无法确认”，不能降级为模型凭常识回答。' },
        { h: '重点二：数据血缘不是“向量靠近”', p: '向量只能表示文本语义相近，不能证明事实关系。数据血缘要以可核验的结构存下来：document_id、来源系统、版本、生效状态、页码、项目 ID、实体和关系。关系写成带证据的三元组，例如“合同 C001 —关联项目→ P001”，并附上证据页和文件版本；这样 LLM 与人都能追问这条边从哪里来。' },
        { h: '重点二的落地方式', p: '每个进入知识库的文件先由 LLM 按 JSON 规范提取标题、实体、关联 ID、版本和候选关系；关键关系进入 relation 表，并保留人工复核状态。Chunk 不复制整份 JSON，只带 document_id、页码、版本、项目 ID 等必要元数据；检索命中 Chunk 后，再通过 document_id 查回完整 JSON 和证据关系。这就是“文件—元数据—Chunk—关系边”的闭环。' },
        { h: '下一步：先做最小可验证实验', p: '先以本地 Qwen 做 Router 推理，保存三类原始分数和人工标签；再用固定训练/验证/测试划分训练校准层。知识库侧先选少量文件，完成 JSON 标准化、段落/句子边界切块与带证据关系表。GraphRAG 放在后面：它应从已验证的关系边取局部子图，再取回相关 Chunk，而不是把“向量相近”直接当成事实边。' },
      ],
    },
    en: {
      cat: 'Routing / Data Lineage', status: 'Phase-one design complete',
      title: 'Router calibration and data-lineage mechanisms for enterprise agents | 16:50 | Shuchiin Academy 2.0',
      excerpt: 'Two foundational mechanisms: label-calibrated routing and versioned, evidence-backed data lineage.',
      sections: [
        { h: 'Router weights', p: 'A small calibration layer learns W and b over Qwen’s three raw route scores, after labelled examples are collected.' },
        { h: 'Evaluation boundary', p: 'Track per-class metrics, especially INTERNAL_RETRIEVAL recall. Missing internal evidence must stop the answer.' },
        { h: 'Lineage', p: 'Vectors signal semantic similarity, not evidence. Facts require source, version, page, entities, and evidence-backed relations.' },
        { h: 'Implementation', p: 'Normalize documents to JSON, store reviewed relation records, and let chunks carry only selective metadata plus document IDs.' },
        { h: 'Next', p: 'Validate the small router and evidence corpus before adding GraphRAG.' },
      ],
    },
  },
  {
    id: '01', zone: 'project', accent: '#3affd6', repo: 'multi-agent / research corpus',
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
    id: '02', zone: 'project', accent: '#d8202c', repo: 'Network-Anomaly-Detection',
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
{
  "year": "2026.10.18",
  "zh": {
    "t": "每日推荐：小模型团队的推理位置与信息权限",
    "d": "记录编排器显式推理、结构化记忆消融与工具使用边界，连接自己的多 Agent 信息传递设计。"
  },
  "en": {
    "t": "Daily: reasoning placement and memory access",
    "d": "Lessons from small-agent orchestration, memory ablations and tool-use limitations."
  }
},
{
  "year": "2026.10.17",
  "zh": {
    "t": "每日推荐：WebSwarm 的状态回传与动态派工",
    "d": "以学习收获重写：完整档案与简洁回执分离、何时继续拆分、任务内经验复用，以及 CEO 账单的接口与验收。"
  },
  "en": {
    "t": "Daily: WebSwarm state handoffs and runtime decisions",
    "d": "Rewritten around personal learning, context isolation, experience reuse and explicit acceptance contracts."
  }
},
{
  "year": "2026.10.12",
  "zh": {
    "t": "新增工程复盘：并行接口与 Reviewer 验收",
    "d": "记录本地 Qwen 计算器一次 82 分放行却交互失败，整理真实证据、代码根因和论文启发；解决方案待实施。"
  },
  "en": {
    "t": "Engineering review: interface contracts and Reviewer acceptance",
    "d": "Recorded a real Qwen calculator failure despite an 82-point approval, linking pinned evidence to proposed coordination and evaluation changes."
  }
},
{
  "year": "2026.10.10",
  "zh": {
    "t": "每日推荐：任务边界与多 Agent 信用分配",
    "d": "合并整理 Anthropic 官方研究报告与 C3 论文，连接学院修复循环和知识库权限；实验方案待验证。"
  },
  "en": {
    "t": "Daily collection: task boundaries and multi-agent credit",
    "d": "Connected an Anthropic research report and the C3 paper with the Academy and Knowledge Lantern; project experiments are proposed."
  }
},
  {
  "year": "09.14",
  "zh": {
    "t": "新增学习笔记：从 Python print 到大型游戏运行",
    "d": "完整整理解释器、操作系统、进程线程、内存、二进制接口、NumPy 与 GPU 渲染之间的联系。"
  },
  "en": {
    "t": "New learning note: from Python print to large-scale games",
    "d": "Connected interpreters, OS services, processes, memory, binary interfaces, NumPy, and GPU rendering."
  }
},
  { year: '08.26', zh: { t: '新增学习区：DOM 事件与事件委托', d: '整理键盘与输入事件、事件冒泡、target/currentTarget、closest、动态按钮委托和监听器生命周期。' }, en: { t: 'Learning section added: DOM events and delegation', d: 'Connected keyboard/input events, bubbling, target/currentTarget, closest, dynamic controls, and listener lifecycle.' } },
  { year: '08.26', zh: { t: '新增学习区：从 HTML 到 DOM 的浏览器交互模型', d: '整理 document、元素查找、事件监听、classList、文本安全与项目聊天界面的 DOM 更新链路。' }, en: { t: 'Learning section added: HTML-to-DOM interaction model', d: 'Connected document lookup, events, classList, text safety, and DOM updates in the chat interface.' } },
  { year: '08.26', zh: { t: '新增学习区：Promise、Response 与 FastAPI 通信模型', d: '将 fetch、HTTP 状态码、FastAPI 路由与文档分析请求整理为可迁移的前后端通信心智模型。' }, en: { t: 'Learning section added: Promise, Response, and FastAPI', d: 'Connected fetch, HTTP status codes, FastAPI routes, and document analysis into a reusable client-server model.' } },
  { year: '08.17', zh: { t: 'Shuchiin Academy 2.0：混合检索与可审计精排', d: '完成 BM25、BGE-M3、RRF 与图关系补充的单链路验证；明确精排器需先通过独立评测，才可声称带来改进。' }, en: { t: 'Shuchiin Academy 2.0: hybrid retrieval and auditable reranking', d: 'Validated a single path combining BM25, BGE-M3, RRF, and graph evidence; reranking must be independently evaluated before any gain is claimed.' } },
  { year: '08.14', zh: { t: 'Shuchiin Academy 2.0：路由决策与数据血缘', d: '确定三类路由的后续校准评测方式，以及以 JSON、关系表和证据页保存企业知识血缘的第一阶段方案。' }, en: { t: 'Shuchiin Academy 2.0: routing and lineage', d: 'Defined router calibration evaluation and evidence-backed JSON/relation records for enterprise knowledge lineage.' } },
  { year: '2025.07', zh: { t: '多智能体文献地图', d: '完成 67 篇论文的主题整理，并建立从协作框架到推理聚合的阅读路径。' }, en: { t: 'Multi-agent research map', d: 'Organized 67 papers into a reading path from collaboration frameworks to reasoning aggregation.' } },
  { year: '近期', zh: { t: 'Gaussian 异常检测基线', d: '完成特征诊断、闭式解训练、ε 搜索与 5-Fold 交叉验证。' }, en: { t: 'Gaussian anomaly baseline', d: 'Completed feature diagnosis, closed-form fitting, ε search, and five-fold cross-validation.' } },
  { year: '当前', zh: { t: 'AI 工程笔记公开发布', d: '用可追溯的项目记录替代泛泛总结，持续沉淀具体工程判断。' }, en: { t: 'Notes site published', d: 'A public home for traceable project records and concrete engineering decisions.' } },
];

const I18N = {
  'nav.daily': { zh: '每日推荐', en: 'Daily' },
  'daily.title': { zh: '每日推荐区', en: 'Daily recommendations' },
  'daily.lead': { zh: '按日期归档，每天一篇合集：原始资料、详细解读与项目联系。', en: 'One collection per date: primary sources, detailed explanations, and project connections.' },
  'daily.empty': { zh: '本页没有推荐合集，请查看其他日期。', en: 'No collection on this page. Browse another date.' },
  'modal.recorded': { zh: '整理日期', en: 'Recorded on' },
  'brand.sub': { zh: 'AI 工程笔记', en: 'AI Engineering Notes' }, 'nav.notes': { zh: '笔记', en: 'Notes' }, 'nav.systems': { zh: '系统', en: 'Systems' }, 'nav.timeline': { zh: '动态', en: 'Updates' }, 'nav.gh': { zh: 'GitHub ↗', en: 'GitHub ↗' },
  'hero.kicker': { zh: '// 项目记录 · 持续更新', en: '// PROJECT RECORDS · ACTIVE' }, 'hero.sub': { zh: '人工智能工程笔记', en: 'AI Engineering Notes' }, 'hero.tags': { zh: '真实项目 · 可验证结论 · 持续更新', en: 'Real Projects · Verifiable Conclusions · Ongoing' }, 'scroll.cue': { zh: '滚动', en: 'Scroll' },
  'notes.title': { zh: '知识与工程笔记', en: 'Knowledge and engineering notes' }, 'notes.lead': { zh: '每日推荐按日期整理第一手资料，项目工程区记录真实系统，学习区连接概念与实践。', en: 'Daily collections connect primary sources to projects; engineering and learning notes record systems and concepts.' }, 'card.read': { zh: '查看笔记', en: 'Open note' },
  'systems.title': { zh: '关联项目', en: 'Related systems' }, 'systems.lead': { zh: '与笔记相连的公开项目与研究索引。', en: 'Public projects and research indexes connected to the notes.' }, 'timeline.title': { zh: '近期动态', en: 'Recent updates' }, 'timeline.lead': { zh: '仅保留可追溯的项目推进与站点更新。', en: 'Only traceable project progress and site updates are kept here.' },
  'contact.title': { zh: '工程讨论，开放进行。', en: 'Open to engineering discussion.' }, 'contact.body': { zh: '技术备忘、评审意见与合作意向，欢迎通过 GitHub 联系。', en: 'Technical notes, review feedback, and collaboration — reach out via GitHub.' }, 'contact.cta': { zh: '访问 GitHub 主页', en: 'Visit GitHub profile' }, 'contact.top': { zh: '回到顶部 ↗', en: 'Back to top ↗' },
  'modal.close': { zh: '关闭', en: 'Close' }, 'modal.repo': { zh: '关联项目', en: 'Related project' }, 'modal.status': { zh: '状态', en: 'Status' }, 'modal.date': { zh: '记录', en: 'Recorded' },
};

const LANG_KEY = 'jaythan-notes-lang';
const NOTES_PER_PAGE = 7;
const state = { lang: 'zh', activeNote: null, lastFocused: null, notePage: 0, dailyPage: 0 };
const $ = (s) => document.querySelector(s); const $$ = (s) => Array.from(document.querySelectorAll(s));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const t = (key) => I18N[key]?.[state.lang] || key;

function renderNotes() {
  const renderCard = (n) => { const c = n[state.lang]; return '<article class="note-card" style="--accent:' + n.accent + '" data-reveal><button class="note-open" type="button" data-note="' + n.id + '" aria-haspopup="dialog" aria-label="' + esc(t('card.read') + ': ' + c.title) + '"></button><div class="note-body"><div class="note-topline"><span class="note-idx">N' + n.id + '</span><span class="note-cat">' + esc(c.cat) + '</span></div><h3 class="note-title">' + esc(c.title) + '</h3><p class="note-title-en">' + esc(n[state.lang === 'zh' ? 'en' : 'zh'].title) + '</p><p class="note-excerpt">' + esc(c.excerpt) + '</p><div class="note-foot"><span class="note-read">' + t('card.read') + ' ↗</span><span class="note-repo">↗ ' + esc(n.repo) + '</span></div></div></article>'; };
  const sorted = (zone) => NOTES.filter((n) => n.zone === zone).sort((a, b) => (b.order || 0) - (a.order || 0));
  const dailyNotes = sorted('daily');
  const projectNotes = sorted('project');
  const learningNotes = sorted('learning');
  const pageCount = Math.max(1, Math.ceil(learningNotes.length / NOTES_PER_PAGE));
  state.notePage = Math.min(state.notePage, pageCount - 1);
  $('#daily-notes-grid').innerHTML = dailyNotes.map(renderCard).join('') || '<p>' + esc(t('daily.empty')) + '</p>';
  $('#project-notes-grid').innerHTML = projectNotes.map(renderCard).join('');
  $('#learning-notes-grid').innerHTML = learningNotes.slice(state.notePage * NOTES_PER_PAGE, (state.notePage + 1) * NOTES_PER_PAGE).map(renderCard).join('');
  const pager = $('#learning-pagination');
  pager.hidden = pageCount <= 1;
  pager.innerHTML = Array.from({ length: pageCount }, (_, i) => '<button class="notes-page' + (i === state.notePage ? ' is-current' : '') + '" type="button" data-note-page="' + i + '" aria-label="' + esc((state.lang === 'zh' ? '学习区第 ' : 'Learning page ') + (i + 1)) + '"' + (i === state.notePage ? ' aria-current="page"' : '') + '>' + String(i + 1).padStart(2, '0') + '</button>').join('');
  $('#daily-count').textContent = dailyNotes.length + (state.lang === 'zh' ? ' 篇' : '');
  $('#project-count').textContent = projectNotes.length + (state.lang === 'zh' ? ' 篇' : '');
  $('#learning-count').textContent = learningNotes.length + (state.lang === 'zh' ? ' 篇' : '');
}

function renderSystems() { $('#systems-grid').innerHTML = SYSTEMS.map((s) => '<a class="sys-card" style="--accent:' + s.accent + '" href="' + s.url + '" target="_blank" rel="noopener noreferrer" data-reveal><span class="sys-name">' + esc(s.name) + '</span><span class="sys-desc">' + esc(s[state.lang].d) + '</span><span class="sys-tags">' + s.tags.map((x) => '<span class="sys-tag">' + esc(x) + '</span>').join('') + '</span></a>').join(''); }
function renderTimeline() { $('#timeline-list').innerHTML = TIMELINE.map((x) => '<li class="tl-item" data-reveal><span class="tl-dot" aria-hidden="true"></span><p class="tl-year">' + esc(x.year) + '</p><h3 class="tl-title">' + esc(x[state.lang].t) + '</h3><p class="tl-desc">' + esc(x[state.lang].d) + '</p></li>').join(''); }
function renderModalBody() {
  const n = NOTES.find((x) => x.id === state.activeNote); if (!n) return;
  const c = n[state.lang];
  const sections = c.sections.map((s, i) => '<section class="m-sec"><div class="m-sec-head"><span class="m-sec-num">' + String(i + 1).padStart(2, '0') + '</span><h3 class="m-sec-title">' + esc(s.h) + '</h3></div><div class="m-sec-body">' + s.p.split(/\n\n/).map((p) => '<p>' + esc(p).replace(/\n/g, '<br>') + '</p>').join('') + (s.links ? '<ul class="m-source-links">' + s.links.map((link) => '<li><a href="' + esc(link.url) + '" target="_blank" rel="noopener noreferrer">' + esc(link.label) + ' ↗</a></li>').join('') + '</ul>' : '') + '</div></section>').join('');
  $('#note-body').innerHTML = '<div class="m-head"><span class="m-idx">NOTE ' + n.id + '</span><span class="m-cat">' + esc(c.cat) + '</span><span class="m-tag">' + t('modal.date') + ' · ' + esc(n.date) + '</span><span class="m-tag">' + t('modal.status') + ' · ' + esc(c.status) + '</span></div><h2 class="m-title" id="note-title">' + esc(c.title) + '</h2><p class="m-excerpt">' + esc(c.excerpt) + '</p>' + sections + '<div class="m-foot">' + (n.zone === 'daily' ? '' : '<a class="m-repo-link" href="' + esc(n.url) + '" target="_blank" rel="noopener noreferrer">' + t('modal.repo') + ' · ' + esc(n.repo) + ' <span aria-hidden="true">↗</span></a>') + (n.zone === 'daily' ? '<p class="m-record-date">' + esc(t('modal.recorded')) + ' · <time datetime="' + esc(n.date) + '">' + esc(n.date) + '</time></p>' : '') + '</div>';
}

function openNote(id) { state.activeNote = id; state.lastFocused = document.activeElement; const b = $('#note-modal'); renderModalBody(); b.hidden = false; document.body.classList.add('lock'); requestAnimationFrame(() => requestAnimationFrame(() => b.classList.add('open'))); $('#note-close').focus(); }
function closeNote() { if (!state.activeNote) return; state.activeNote = null; const b = $('#note-modal'); b.classList.remove('open'); const done = () => { b.hidden = true; document.body.classList.remove('lock'); }; b.addEventListener('transitionend', done, { once: true }); setTimeout(done, 340); state.lastFocused?.focus(); }
function initModal() { const b = $('#note-modal'); const notesRoot = document.querySelector('.section--notes'); notesRoot.addEventListener('click', (e) => { const noteButton = e.target.closest('.note-open'); if (noteButton) openNote(noteButton.dataset.note); const pageButton = e.target.closest('[data-note-page]'); if (pageButton) { state.notePage = Number(pageButton.dataset.notePage); renderNotes(); initReveal(); } }); $('#note-close').addEventListener('click', closeNote); b.addEventListener('click', (e) => { if (e.target === b) closeNote(); }); document.addEventListener('keydown', (e) => { if (state.activeNote && e.key === 'Escape') closeNote(); }); }

function initReveal() { const nodes = $$('[data-reveal]'); if (reduceMotion.matches || !('IntersectionObserver' in window)) return nodes.forEach((n) => n.classList.add('is-in')); const observer = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); observer.unobserve(e.target); } }), { threshold: 0.12 }); nodes.forEach((n) => observer.observe(n)); }
function initParallax() { const scene = $('#hero-scene'); const planes = $$('.hero-plane'); if (!scene || reduceMotion.matches) return; let tx = 0, ty = 0, cx = 0, cy = 0; window.addEventListener('pointermove', (e) => { tx = e.clientX / innerWidth * 2 - 1; ty = e.clientY / innerHeight * 2 - 1; }, { passive: true }); (function frame() { cx += (tx - cx) * .05; cy += (ty - cy) * .05; scene.style.transform = 'rotateX(' + (-cy * 5).toFixed(2) + 'deg) rotateY(' + (cx * 6).toFixed(2) + 'deg)'; planes.forEach((p) => { const z = +p.dataset.zi || 0; p.style.transform = 'translate3d(' + (cx * (60 + z * .5)).toFixed(1) + 'px,' + (cy * (36 + z * .3)).toFixed(1) + 'px,0) translateZ(' + z + 'px)'; }); requestAnimationFrame(frame); })(); }
function applyLang(lang) { state.lang = lang; document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'; document.documentElement.dataset.lang = lang; try { localStorage.setItem(LANG_KEY, lang); } catch {} $$('[data-i18n]').forEach((el) => { if (I18N[el.dataset.i18n]) el.textContent = t(el.dataset.i18n); }); const button = $('#lang-toggle'); button.textContent = lang === 'zh' ? 'EN' : '中文'; renderNotes(); renderSystems(); renderTimeline(); initReveal(); }
function init() { let lang = 'zh'; try { lang = localStorage.getItem(LANG_KEY) || 'zh'; } catch {} applyLang(lang === 'en' ? 'en' : 'zh'); initModal(); initParallax(); $('#lang-toggle').addEventListener('click', () => applyLang(state.lang === 'zh' ? 'en' : 'zh')); const year = $('#year'); if (year) year.textContent = new Date().getFullYear(); }
document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
