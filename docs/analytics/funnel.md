# Journal Prompts 转化漏斗

首次实施日期：2026-09-14；本文已更新至 2026-09-21 发布版本。复用现有 GA4，不新增分析服务、数据库或客户画像。事件只表示明确定义的行为，不能用点击替代收入。后台历史配置与本次维度迁移在下文分别记录。

## 事件字典

所有业务事件通过 `src/lib/analytics.ts` 的 `trackFunnelEvent(name, params, options?)` 发出。调用点内部仍使用 `source` 类型字段；统一过滤器将它映射为 `entry_point`，只将后者发送给 GA，不发送 `source`、`medium` 或 `campaign_source` 等归因覆盖字段。只有生产构建、正式域名、有效的公开 GA 配置同时存在时才排队；本地和预览站不发送。

| 事件 | 触发时机 | 允许的业务参数 |
|---|---|---|
| `finder_complete` | 用户完成选择并看到匹配结果 | `entry_point` |
| `prompt_selected` | 用户选择题目进入写作 | `entry_point`, `prompt_kind` |
| `writing_started` | 本次写作第一次输入非空文字 | `entry_point`, `prompt_kind` |
| `journal_saved` | 浏览器保存成功或云端确认保存成功；一次写作会话各保存位置最多一次 | `entry_point`, `storage` |
| `journal_completed` | 用户明确完成写作，且当前内容已成功保存 | `entry_point`, `storage` |
| `account_save_clicked` | 游客点击保存到账户入口 | `entry_point` |
| `device_import_viewed` | 登录用户看到设备日记导入入口 | `entry_point`（仅 `journal`） |
| `device_import_completed` | 服务端确认导入成功 | `entry_point`（仅 `journal`） |
| `sign_up` | 注册请求明确成功；不把普通登录算注册 | `method` |
| `view_pricing` | 套餐页面实际展示 | `entry_point` |
| `select_plan` | 用户选择套餐 | `entry_point`, `plan`, `interval` |
| `begin_checkout` | 服务端成功创建 Stripe checkout，准备跳转 | `entry_point`, `plan`, `interval` |
| `checkout_error` | 无法创建或打开 checkout | `entry_point`, `plan`, `interval`, `error_type` |
| `checkout_return` | 支付返回页根据服务端查询确认付款，或等待超时/查询错误 | `status` |

值也受白名单限制：

- `entry_point`：`home`, `scene`, `finder`, `journal`, `pricing`, `billing`, `auth`, `payment`, `other`。它表示动作发生的位置；首次进入页面使用 GA 的 Landing page 维度。
- `prompt_kind`：`curated` 或 `ai`；`storage`：`device` 或 `cloud`。
- `plan`：`free`, `pro`, `lifetime`；`interval`：`month`, `year`, `lifetime`。
- `method`：`email` 或 `google`。只有能可靠区分新注册与登录时才能发送；目前 email 注册成功可确认，Google 登录不能凭登录成功推断新注册。
- `error_type`：`request_failed`, `missing_url`, `validation`, `unknown`，不传异常原文。
- `status`：`confirmed`, `timeout`, `error`。`confirmed` 必须来自服务端已支付检查。

`checkout_return` **不是 `purchase`**。没有付款金额、币种及可靠订单去重数据时不发送虚构的 ecommerce purchase。未返回网站的付款也不会产生此浏览器事件；实际订单与营收仍以 Stripe 已支付记录为准。取消 checkout 不代表付款失败。

`dedupeKey` 是可选的浏览器内存去重键，仅用于防止 effect 重放或重复回调；它永不放入 GA 参数，不持久存储。组件应先根据实际用户操作和结果发事件，避免每次输入、每次自动保存或每次 render 都触发。

## 隐私与加载

运行时会丢弃所有非白名单字段和值，包括日记正文、题目文本或 ID、情绪、写作方向、自定义主题、用户 ID、邮箱、订单/会话 ID。不要在调用点新增自由文本参数。

页面上下文仅保留代码列出的固定路径。只保留白名单内固定值的 `utm_source`、`utm_medium`；其他 URL 查询、片段、未知路径中的内容、网页实际标题不会发到 GA。页面标题固定为 `Journal Prompts`。来源只保留已知搜索引擎、AI 工具、已审核外链平台的固定首页或本站安全路径，不传搜索词、AI 对话路径或 referrer 查询参数。AI 来源包括 ChatGPT、Perplexity、Claude、Gemini、Copilot；它们仍可用于来源分析。广告信号与广告个性化关闭。GA 自身仍使用其分析会话机制；这些改动不是匿名统计或用户同意管理的替代方案。

GA 脚本保持延迟加载，但配置队列先创建，因此脚本完成加载前发生的首个动作仍可排队。SPA 路由变化使用手动 `page_view`，相同路径重渲染、查询参数变化不重复发送；离开再返回同一页是新的 page view。

本次停用 Clarity 会话录制，已移除 Analytics 和 layout 两处实际加载入口，保留原组件和配置以供以后审阅。私人日记的访问 URL 也可能含付款会话或认证参数，DOM 遮罩不能保证这些信息不被录制服务捕获；当前诊断使用 GA4 的固定事件。正文根节点及私密组件仍保留 `data-clarity-mask="true"` 作为防御，未来重新启用录制前必须重新审查 URL、表单属性和正文处理，不能只因存在 mask 就直接开启。

## GA4 数据流设置

代码使用 `send_page_view: false` 后，**仍必须**到 GA4 → Admin → Data streams → 本站 Web 数据流 → Enhanced measurement 设置：

1. 关闭 Page views 内的 **Page changes based on browser history events**，避免与手动页面事件重复。
2. 关闭 **Form interactions、Site search、Outbound clicks**，避免自动抓表单属性、搜索词或带私密参数的链接。其他自动事件应按实际用途审阅；事件漏斗不依赖它们。
3. Google tag 的自动 user-provided data 检测保持关闭，不配置邮箱、电话或 User-ID。

2026-09-14 已在本站 GA 数据流中保存并复核：关闭 history 自动 page views、Form interactions、Site search、Outbound clicks，以及 Scrolls、Video engagement、File downloads。页面加载本身的默认 page view 由代码里的 `send_page_view: false` 关闭，再发送上述手动脱敏 page view。

同日单独检查 Google tag → Allow user-provided data capabilities：原主开关、自动检测、邮箱/电话/姓名地址选项均开启。已先关闭自动检测，再关闭主功能并保存；重新打开确认主开关关闭。未设置 User-ID，未修改其他广告配置。脱敏前后记录见 [GA4 配置记录](./ga4-configuration-2026-09-14.json)。这些设置不删除或回填历史数据。

这些是 GA 属性设置，不是可用一个未记录的 `gtag` 参数替代的操作；后续如重新开启，需重新检查隐私和重复事件。

## 如何查看

先在 Realtime 核验固定事件和参数能到达，再在 Explore → Funnel exploration 使用开放漏斗，允许用户直接从内容开始写作：

1. 体验漏斗：`page_view` → `prompt_selected` → `writing_started` → `journal_completed`。`journal_saved` 是自动保存确认，不代替明确完成。游客后续看 `account_save_clicked` → `sign_up` → `device_import_completed`，并单独用 `device_import_viewed` 看导入入口是否展示；已有账户用户可能跳过注册。finder 路径再插入 `finder_complete`，不要因此排除直接点击文章题目的人。
2. 付费漏斗：`view_pricing` → `select_plan` → `begin_checkout` → `checkout_return` 且 `status=confirmed`。结合 `checkout_error` 看技术失败；最后一步是返回页确认，不是完整订单总量。
3. 以 Landing page、Session source/medium 比较 Daily 与其他入口；同一用户可能跨会话返回，不能用事件次数直接当独立人数。

2026-09-14 已在 Admin → Custom definitions 注册并核验以下 7 个 event-scoped 维度。此前列表为空；没有新增用户维度或自由文本维度。

| GA 界面维度名 | 事件参数 |
|---|---|
| Funnel source | `source` |
| Prompt kind | `prompt_kind` |
| Journal storage | `storage` |
| Selected plan | `plan` |
| Billing interval | `interval` |
| Checkout error type | `error_type` |
| Checkout status | `status` |

上表是 9/14 实际创建的历史配置。本版本不再发送 `source`；旧 `Funnel source` 保留供历史分析，不能继续当作新事件维度。获客来源应使用 GA 的 Session source/medium。`method` 保留为注册事件参数，本次未额外注册自定义维度。新维度不回填历史数据，报告可用性存在处理延迟。

同日已创建并核验以下关键事件，均选择 **不设置默认关键事件金额**：

- `sign_up`：按事件计数，只接收明确注册成功事件。
- `journal_saved`：按会话计数，避免反复保存放大激活；分析时再用 Journal storage 区分 device/cloud。原始事件次数仍可用于保存行为分析。
- `payment_confirmed`：GA 数据流派生事件，匹配条件为 `event_name equals checkout_return` **且** `status equals confirmed`，按事件计数；复制源事件参数，不追加金额。已重新打开自定义事件列表核验两个精确条件。

没有把全部 `checkout_return` 标为关键事件。`payment_confirmed` 仍只是用户返回后的可信确认，不是完整订单或营收统计。原有 `close_convert_lead`、`qualify_lead`、`purchase` 定义保持原样。配置后新事件显示尚无 stream data；本次没有为填充报表发送合成业务事件。需在源码上线后观察真实流量，配置完成不能等同于事件已到达。

检查相同长度的时间窗口。先观察用户数量和各步骤流失位置，再决定下一次优化；小样本不保证统计显著，更不保证某项文案会产生固定转化增长。

## 2026-09-21 维度迁移

用户确认发布后，已于 2026-09-21 21:10 EDT 在 GA4 属性 528781004 创建并刷新核验下述维度。自定义维度列表为 8 项，配额 8/50；旧有 7 项保持原样。源码生效时间以 Cloudflare 部署记录为准。

- 已新建事件范围维度 **Funnel entry point**，事件参数 **`entry_point`**。
- 描述：`Fixed in-site action location; separate from acquisition source.`
- 保留旧 `Funnel source` / `source` 历史定义，不归档、不改写历史数据。
- 上线后新报表使用 Funnel entry point；以实际部署时间区分新旧口径，不直接把两个维度拼成连续趋势。
- 本次仅让站内标签使用专属名称。9/21 观察到系统来源出现 finder/home/scene，存在污染嫌疑；不宣称已独立证明 GA 服务端的处理原因。
- 新维度用于固定枚举；不新增用户 ID、日记标识或正文等维度。自定义维度报表通常需要 24–48 小时处理，先检查请求/Realtime，再核对常规报表。见 [GA 官方说明](https://support.google.com/analytics/answer/14240153?hl=en)。
- `journal_saved` 和 `payment_confirmed` 的既有关键事件规则保持原定义；不要为填报表发送虚构写作、注册或购买事件。

## 官方依据与验收

- [GA4 设置事件](https://developers.google.com/analytics/devguides/collection/ga4/events)：业务事件使用 `gtag('event', name, params)`。
- [GA4 页面浏览](https://developers.google.com/analytics/devguides/collection/ga4/views)：手动发送 page view，history 自动事件需另在 Enhanced Measurement 关闭。
- [Enhanced measurement 事件](https://support.google.com/analytics/answer/9216061)：自动表单、站内搜索、链接事件在数据流设置控制。
- [生成派生事件](https://support.google.com/analytics/answer/10085872)：由源事件与参数条件生成新事件，不回填历史；规则生效可能需要一小时或更久。
- [自定义维度](https://support.google.com/analytics/answer/14240153)：通过维度分析自定义参数；本次只注册固定枚举的事件维度。
- [Clarity 内容遮罩](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking)：显式遮罩覆盖该节点及子节点，新设置不回溯改变历史录制。

`pnpm exec vitest run src/lib/analytics.test.ts` 验证白名单、恶意/自由文本字段丢弃、URL 和来源脱敏、非生产禁用、早期队列顺序、页面与业务去重、分析失败不阻断产品操作。最终还需生产浏览器检查请求参数，并确认后台数据流配置和事件实际到达；单元测试通过不等于 GA 已收到事件。
