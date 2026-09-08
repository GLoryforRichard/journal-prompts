# IndexNow 发布后通知

IndexNow 用于通知搜索引擎本次新增、实质修改或删除的公开页面。成功响应表示收到通知，不等于收录或排名改善。无需在 Bing 再申请 API key，也不要在页面访问时触发提交。

## 验证文件

`public/indexnow-key.txt` 是 IndexNow 协议要求公开的域名所有权验证标识，不是服务端密钥或登录凭据。文件随网站构建发布，保留在版本库，避免干净 checkout 丢失验证文件。提交指定根目录的 `keyLocation`，可覆盖整个站点。

保持该文件内容稳定。更换时，先部署新文件，再发送使用新标识的提交。不要在日志中输出文件内容或整个请求 body。

## 每次发布

1. 准备本次真正发生变化的 URL，一行一个；只包含 `https://journalprompts.org` 规范地址或 `/pricing` 这样的站内路径。删除页面也可以提交。不要补交未变更的历史页面，不要把整个 sitemap 当作定期提交队列。
2. 用 `pnpm indexnow /pricing /daily-journal-prompts` 预览；多个页面也可用 `pnpm indexnow --file <变更清单路径>`。默认仅本地验证并打印 URL，不发任何网络请求。
3. 按项目 Cloudflare 发布流程完成 build、检查与获准部署。确认本次新增/更新页面返回正常 HTML，删除页面返回 404/410，并检查 canonical、robots/noindex 和线上 sitemap。
4. 在发布后执行同一条命令加 `--submit`，例如 `pnpm indexnow --submit /pricing /daily-journal-prompts`。工具先读取线上验证文件并与本地比对，只有 HTTP 200 且内容匹配才会 POST 到 IndexNow 公共端点。只需提交一个参与端点，协议会共享给其他参与引擎。
5. 记录提交时间、URL 列表与 HTTP 状态，在 Bing Webmaster 的 IndexNow 报告中查看后续状态。HTTP 200 代表收到 URL；202 代表收到但 key 验证仍待完成。403/422 先排查所有权文件、主机及 URL，429 等待后再尝试，不自动循环重试。

GitHub push 本身不会部署此 Cloudflare Worker，所以没有绑定 push 的自动提交任务。先完成真实发布，再运行以上命令，可避免通知爬虫尚未上线的页面。今后若将部署接入 CI，应把带 `--submit` 的变更清单提交放在部署成功及线上检查之后。

当前工具有意限制为生产 HTTPS 主机；拒绝账号/API/支付流程、`/en` 别名、参数 URL、片段、文件以及尾斜线别名，并去重。它不会推断页面发生过修改，变更清单必须来自实际发布内容。

## 官方依据

- [IndexNow 协议与响应状态](https://www.indexnow.org/documentation)
- [IndexNow FAQ：何时提交、验证文件与参与端点](https://www.indexnow.org/faq)
