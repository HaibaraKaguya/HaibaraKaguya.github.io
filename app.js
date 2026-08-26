document.documentElement.classList.add('js');

const NOTES = [
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
  { year: '08.26', zh: { t: '新增学习区：Promise、Response 与 FastAPI 通信模型', d: '将 fetch、HTTP 状态码、FastAPI 路由与文档分析请求整理为可迁移的前后端通信心智模型。' }, en: { t: 'Learning section added: Promise, Response, and FastAPI', d: 'Connected fetch, HTTP status codes, FastAPI routes, and document analysis into a reusable client-server model.' } },
  { year: '08.17', zh: { t: 'Shuchiin Academy 2.0：混合检索与可审计精排', d: '完成 BM25、BGE-M3、RRF 与图关系补充的单链路验证；明确精排器需先通过独立评测，才可声称带来改进。' }, en: { t: 'Shuchiin Academy 2.0: hybrid retrieval and auditable reranking', d: 'Validated a single path combining BM25, BGE-M3, RRF, and graph evidence; reranking must be independently evaluated before any gain is claimed.' } },
  { year: '08.14', zh: { t: 'Shuchiin Academy 2.0：路由决策与数据血缘', d: '确定三类路由的后续校准评测方式，以及以 JSON、关系表和证据页保存企业知识血缘的第一阶段方案。' }, en: { t: 'Shuchiin Academy 2.0: routing and lineage', d: 'Defined router calibration evaluation and evidence-backed JSON/relation records for enterprise knowledge lineage.' } },
  { year: '2025.07', zh: { t: '多智能体文献地图', d: '完成 67 篇论文的主题整理，并建立从协作框架到推理聚合的阅读路径。' }, en: { t: 'Multi-agent research map', d: 'Organized 67 papers into a reading path from collaboration frameworks to reasoning aggregation.' } },
  { year: '近期', zh: { t: 'Gaussian 异常检测基线', d: '完成特征诊断、闭式解训练、ε 搜索与 5-Fold 交叉验证。' }, en: { t: 'Gaussian anomaly baseline', d: 'Completed feature diagnosis, closed-form fitting, ε search, and five-fold cross-validation.' } },
  { year: '当前', zh: { t: 'AI 工程笔记公开发布', d: '用可追溯的项目记录替代泛泛总结，持续沉淀具体工程判断。' }, en: { t: 'Notes site published', d: 'A public home for traceable project records and concrete engineering decisions.' } },
];

const I18N = {
  'brand.sub': { zh: 'AI 工程笔记', en: 'AI Engineering Notes' }, 'nav.notes': { zh: '笔记', en: 'Notes' }, 'nav.systems': { zh: '系统', en: 'Systems' }, 'nav.timeline': { zh: '动态', en: 'Updates' }, 'nav.gh': { zh: 'GitHub ↗', en: 'GitHub ↗' },
  'hero.kicker': { zh: '// 项目记录 · 持续更新', en: '// PROJECT RECORDS · ACTIVE' }, 'hero.sub': { zh: '人工智能工程笔记', en: 'AI Engineering Notes' }, 'hero.tags': { zh: '真实项目 · 可验证结论 · 持续更新', en: 'Real Projects · Verifiable Conclusions · Ongoing' }, 'scroll.cue': { zh: '滚动', en: 'Scroll' },
  'notes.title': { zh: '知识与工程笔记', en: 'Knowledge and engineering notes' }, 'notes.lead': { zh: '项目工程区记录真实系统，学习区把概念连接到可运行的 Web 场景。', en: 'Project engineering records real systems; learning notes connect concepts to runnable Web scenarios.' }, 'card.read': { zh: '查看笔记', en: 'Open note' },
  'systems.title': { zh: '关联项目', en: 'Related systems' }, 'systems.lead': { zh: '与笔记相连的公开项目与研究索引。', en: 'Public projects and research indexes connected to the notes.' }, 'timeline.title': { zh: '近期动态', en: 'Recent updates' }, 'timeline.lead': { zh: '仅保留可追溯的项目推进与站点更新。', en: 'Only traceable project progress and site updates are kept here.' },
  'contact.title': { zh: '工程讨论，开放进行。', en: 'Open to engineering discussion.' }, 'contact.body': { zh: '技术备忘、评审意见与合作意向，欢迎通过 GitHub 联系。', en: 'Technical notes, review feedback, and collaboration — reach out via GitHub.' }, 'contact.cta': { zh: '访问 GitHub 主页', en: 'Visit GitHub profile' }, 'contact.top': { zh: '回到顶部 ↗', en: 'Back to top ↗' },
  'modal.close': { zh: '关闭', en: 'Close' }, 'modal.repo': { zh: '关联项目', en: 'Related project' }, 'modal.status': { zh: '状态', en: 'Status' }, 'modal.date': { zh: '记录', en: 'Recorded' },
};

const LANG_KEY = 'jaythan-notes-lang';
const NOTES_PER_PAGE = 7;
const state = { lang: 'zh', activeNote: null, lastFocused: null, notePage: 0 };
const $ = (s) => document.querySelector(s); const $$ = (s) => Array.from(document.querySelectorAll(s));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const t = (key) => I18N[key]?.[state.lang] || key;

function renderNotes() { const pageCount = Math.max(1, Math.ceil(NOTES.length / NOTES_PER_PAGE)); state.notePage = Math.min(state.notePage, pageCount - 1); const pageNotes = NOTES.slice(state.notePage * NOTES_PER_PAGE, (state.notePage + 1) * NOTES_PER_PAGE); $('#notes-grid').innerHTML = pageNotes.map((n) => { const c = n[state.lang]; return '<article class="note-card" style="--accent:' + n.accent + '" data-reveal><button class="note-open" type="button" data-note="' + n.id + '" aria-haspopup="dialog" aria-label="' + esc(t('card.read') + ': ' + c.title) + '"></button><div class="note-body"><div class="note-topline"><span class="note-idx">N' + n.id + '</span><span class="note-cat">' + esc(c.cat) + '</span></div><h3 class="note-title">' + esc(c.title) + '</h3><p class="note-title-en">' + esc(n[state.lang === 'zh' ? 'en' : 'zh'].title) + '</p><p class="note-excerpt">' + esc(c.excerpt) + '</p><div class="note-foot"><span class="note-read">' + t('card.read') + ' ↗</span><span class="note-repo">↗ ' + esc(n.repo) + '</span></div></div></article>'; }).join(''); const pager = $('#notes-pagination'); if (pager) { pager.hidden = pageCount <= 1; pager.innerHTML = Array.from({ length: pageCount }, (_, i) => '<button class="notes-page' + (i === state.notePage ? ' is-current' : '') + '" type="button" data-note-page="' + i + '">' + String(i + 1).padStart(2, '0') + '</button>').join(''); } }
function renderNotes() {
  const activeNotes = NOTES.filter((n) => n.zone === 'project' || n.zone === 'learning').sort((a, b) => (b.order || 0) - (a.order || 0));
  const pageCount = Math.max(1, Math.ceil(activeNotes.length / NOTES_PER_PAGE));
  state.notePage = Math.min(state.notePage, pageCount - 1);
  const pageNotes = activeNotes.slice(state.notePage * NOTES_PER_PAGE, (state.notePage + 1) * NOTES_PER_PAGE);
  const renderCard = (n) => { const c = n[state.lang]; return '<article class="note-card" style="--accent:' + n.accent + '" data-reveal><button class="note-open" type="button" data-note="' + n.id + '" aria-haspopup="dialog" aria-label="' + esc(t('card.read') + ': ' + c.title) + '"></button><div class="note-body"><div class="note-topline"><span class="note-idx">N' + n.id + '</span><span class="note-cat">' + esc(c.cat) + '</span></div><h3 class="note-title">' + esc(c.title) + '</h3><p class="note-title-en">' + esc(n[state.lang === 'zh' ? 'en' : 'zh'].title) + '</p><p class="note-excerpt">' + esc(c.excerpt) + '</p><div class="note-foot"><span class="note-read">' + t('card.read') + ' ↗</span><span class="note-repo">↗ ' + esc(n.repo) + '</span></div></div></article>'; };
  $('#project-notes-grid').innerHTML = pageNotes.filter((n) => n.zone === 'project').map(renderCard).join('');
  $('#learning-notes-grid').innerHTML = pageNotes.filter((n) => n.zone === 'learning').map(renderCard).join('');
  const pager = $('#notes-pagination');
  if (pager) { pager.hidden = pageCount <= 1; pager.innerHTML = Array.from({ length: pageCount }, (_, i) => '<button class="notes-page' + (i === state.notePage ? ' is-current' : '') + '" type="button" data-note-page="' + i + '">' + String(i + 1).padStart(2, '0') + '</button>').join(''); }
}

function renderSystems() { $('#systems-grid').innerHTML = SYSTEMS.map((s) => '<a class="sys-card" style="--accent:' + s.accent + '" href="' + s.url + '" target="_blank" rel="noopener noreferrer" data-reveal><span class="sys-name">' + esc(s.name) + '</span><span class="sys-desc">' + esc(s[state.lang].d) + '</span><span class="sys-tags">' + s.tags.map((x) => '<span class="sys-tag">' + esc(x) + '</span>').join('') + '</span></a>').join(''); }
function renderTimeline() { $('#timeline-list').innerHTML = TIMELINE.map((x) => '<li class="tl-item" data-reveal><span class="tl-dot" aria-hidden="true"></span><p class="tl-year">' + esc(x.year) + '</p><h3 class="tl-title">' + esc(x[state.lang].t) + '</h3><p class="tl-desc">' + esc(x[state.lang].d) + '</p></li>').join(''); }
function renderModalBody() { const n = NOTES.find((x) => x.id === state.activeNote); if (!n) return; const c = n[state.lang]; $('#note-body').innerHTML = '<div class="m-head"><span class="m-idx">NOTE ' + n.id + '</span><span class="m-cat">' + esc(c.cat) + '</span><span class="m-tag">' + t('modal.date') + ' · ' + n.date + '</span><span class="m-tag">' + t('modal.status') + ' · ' + esc(c.status) + '</span></div><h2 class="m-title" id="note-title">' + esc(c.title) + '</h2><p class="m-excerpt">' + esc(c.excerpt) + '</p>' + c.sections.map((s, i) => '<section class="m-sec"><div class="m-sec-head"><span class="m-sec-num">' + String(i + 1).padStart(2, '0') + '</span><h3 class="m-sec-title">' + esc(s.h) + '</h3></div><div class="m-sec-body"><p>' + esc(s.p) + '</p></div></section>').join('') + '<div class="m-foot"><a class="m-repo-link" href="' + n.url + '" target="_blank" rel="noopener noreferrer">' + t('modal.repo') + ' · ' + esc(n.repo) + ' <span aria-hidden="true">↗</span></a></div>'; }
function openNote(id) { state.activeNote = id; state.lastFocused = document.activeElement; const b = $('#note-modal'); renderModalBody(); b.hidden = false; document.body.classList.add('lock'); requestAnimationFrame(() => requestAnimationFrame(() => b.classList.add('open'))); $('#note-close').focus(); }
function closeNote() { if (!state.activeNote) return; state.activeNote = null; const b = $('#note-modal'); b.classList.remove('open'); const done = () => { b.hidden = true; document.body.classList.remove('lock'); }; b.addEventListener('transitionend', done, { once: true }); setTimeout(done, 340); state.lastFocused?.focus(); }
function initModal() { const b = $('#note-modal'); $('#notes-grid').addEventListener('click', (e) => { const btn = e.target.closest('.note-open'); if (btn) openNote(btn.dataset.note); }); $('#notes-pagination').addEventListener('click', (e) => { const btn = e.target.closest('[data-note-page]'); if (!btn) return; state.notePage = Number(btn.dataset.notePage); renderNotes(); initReveal(); }); $('#note-close').addEventListener('click', closeNote); b.addEventListener('click', (e) => { if (e.target === b) closeNote(); }); document.addEventListener('keydown', (e) => { if (state.activeNote && e.key === 'Escape') closeNote(); }); }
function initModal() { const b = $('#note-modal'); const notesRoot = document.querySelector('.section--notes'); notesRoot.addEventListener('click', (e) => { const noteButton = e.target.closest('.note-open'); if (noteButton) openNote(noteButton.dataset.note); const pageButton = e.target.closest('[data-note-page]'); if (pageButton) { state.notePage = Number(pageButton.dataset.notePage); renderNotes(); initReveal(); } }); $('#note-close').addEventListener('click', closeNote); b.addEventListener('click', (e) => { if (e.target === b) closeNote(); }); document.addEventListener('keydown', (e) => { if (state.activeNote && e.key === 'Escape') closeNote(); }); }

function initReveal() { const nodes = $$('[data-reveal]'); if (reduceMotion.matches || !('IntersectionObserver' in window)) return nodes.forEach((n) => n.classList.add('is-in')); const observer = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); observer.unobserve(e.target); } }), { threshold: 0.12 }); nodes.forEach((n) => observer.observe(n)); }
function initParallax() { const scene = $('#hero-scene'); const planes = $$('.hero-plane'); if (!scene || reduceMotion.matches) return; let tx = 0, ty = 0, cx = 0, cy = 0; window.addEventListener('pointermove', (e) => { tx = e.clientX / innerWidth * 2 - 1; ty = e.clientY / innerHeight * 2 - 1; }, { passive: true }); (function frame() { cx += (tx - cx) * .05; cy += (ty - cy) * .05; scene.style.transform = 'rotateX(' + (-cy * 5).toFixed(2) + 'deg) rotateY(' + (cx * 6).toFixed(2) + 'deg)'; planes.forEach((p) => { const z = +p.dataset.zi || 0; p.style.transform = 'translate3d(' + (cx * (60 + z * .5)).toFixed(1) + 'px,' + (cy * (36 + z * .3)).toFixed(1) + 'px,0) translateZ(' + z + 'px)'; }); requestAnimationFrame(frame); })(); }
function applyLang(lang) { state.lang = lang; document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'; document.documentElement.dataset.lang = lang; try { localStorage.setItem(LANG_KEY, lang); } catch {} $$('[data-i18n]').forEach((el) => { if (I18N[el.dataset.i18n]) el.textContent = t(el.dataset.i18n); }); const button = $('#lang-toggle'); button.textContent = lang === 'zh' ? 'EN' : '中文'; renderNotes(); renderSystems(); renderTimeline(); initReveal(); }
function init() { let lang = 'zh'; try { lang = localStorage.getItem(LANG_KEY) || 'zh'; } catch {} applyLang(lang === 'en' ? 'en' : 'zh'); initModal(); initParallax(); $('#lang-toggle').addEventListener('click', () => applyLang(state.lang === 'zh' ? 'en' : 'zh')); const year = $('#year'); if (year) year.textContent = new Date().getFullYear(); }
document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
