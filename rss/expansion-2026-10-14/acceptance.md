# RSS 修复与第二轮扩增验收

2026-10-14，本地 today 已重新构建安装并验收。没有发布文章或部署线上站点。

## 两个异常源

**GlobalPETS 已恢复。** 原客户端 HTTP 请求使用 macOS Secure Transport，实际错误链为 `Connect → bad protocol version (-9836)`；改 User-Agent、HTTP/1.1 都不能解决。强制 TLS 1.2 的独立请求也被站点拒绝。Apple 文档说明 Secure Transport 无法使用 TLS 1.3，符合本次复现：[Apple TLS security](https://support.apple.com/guide/security/tls-security-sec100a75d12/web)。

修复仅为 papr-core 抓取客户端启用 `rustls-tls-native-roots` 并显式使用 rustls。继续使用系统信任根、保留证书和域名校验、请求超时、代理设置、16 MiB 响应上限与条件请求逻辑；没有绕过证书检查、降低 TLS 校验或改变源地址。没有升级已有依赖版本；Cargo.lock 新增启用 TLS 功能所需依赖关联。

原生客户端已从 `https://globalpetindustry.com/feed/` 缓存 10 条文章，原错误清除。独立 papr-core 探针同样通过；自签名、过期证书测试分别得到 `UnknownIssuer` 与 `ExpiredContext`，均被拒绝。GitHub 发布 RSS 正常通过。

**ReptiFiles 原入口仍为 404，已用独立来源补足内容覆盖。** 保留原订阅 ID、地址、分组及其数据，仅在客户端将该源自动刷新设为 Never。此设置停用定期刷新；手动全库刷新仍可能再次显示其 404，不等于新替代源失败。未使用退订、删库或把新来源写进旧源。

- [Reptiles Magazine RSS](https://reptilesmagazine.com/feed/) 为主要爬宠替代，原站声明该入口，客户端缓存 10 条。
- 同批增加 Tortoise Trust、Amphibian and Reptile Conservancy、Oxbow、Guinea Pig Magazine、Reef Builders、The Unusual Pet Vets 等龟、两栖爬行、小宠、水族与专业照护资料。
- 新增记录和旧 ReptiFiles 保持独立来源归属，不代表 Reptiles Magazine 与原站为同一机构。

## 新增订阅与本地落库

| 工作区 | 本轮新增 | 新增源成功抓取 | 当前总订阅记录 |
|---|---:|---:|---:|
| 学术 | 21 | 21 | 224 |
| 输入法 | 24 | 24 | 78 |
| 视觉设计 | 17 | 17 | 34 |
| 个人 | 37 | 37 | 70 |
| 萌宠 | 15 | 15 | 37 |
| 合计 | 114 | 114 | 443 |

443 条包含保留但停止自动刷新的 ReptiFiles。上表“成功抓取”仅统计本轮新增，不代表所有历史来源每次访问都无故障。原有 Aquarium Co-Op 在一次后台刷新中遇到 429，30 条既有缓存仍保留；没有反复高频请求、删除订阅或改写其数据。

本轮检查 236 个页面/入口候选及另一轮 72 个直接入口候选，人工筛掉重复、弱相关、明显停更、无效日期、会话参数和已宣布失效的 RSS。最终为 114 个工作区订阅、112 个独立地址。全部先通过实际 XML 验证及 papr-core 同内核预检，然后逐工作区 OPML 导入，再读本地数据库确认。INOSC 首次暂时网络失败，单源重试后成功，最终新增源无抓取错误。

来源方向、日期限制、XML 哈希、原站入口与每源客户端验收时间见 [目录](README.md) 与 [机器可读清单](verified.json)。没有把社区动态自动转换成项目合作需求，也没有把课程相关博客等同于完整付费培训目录。没有新增日历事件或文章。

## 回归与数据保护

- papr-core ingestion 相关测试：97 通过。
- 发布脚本前端回归：118 个测试文件、1010 个测试通过；TypeScript 检查和原生构建通过。
- 已安装路径 `/Applications/today.app`；完成时该路径下的原生进程保持运行。
- 安装前自动备份位于 `~/Library/Application Support/Scholay Today Maintenance/backups/20261014-014321`，包含原应用与各工作区数据库。
- 与安装前备份比对，90,604 条原有 RSS 文章 ID、所属 feed_id 和 guid 全部保留，无丢失和归属变化；正常刷新可更新上游条目内容。
- 既有 189 个成稿、索引等基线文件的 SHA256 完全一致。
- 既有订阅配置仅 ReptiFiles 的刷新间隔从全局默认改为 Never，其余原有订阅 ID、URL、分组、阅读和刷新配置均未改变。
- 没有修改内容工作台、模板、成文或发布实现；没有发起 AI 成文、保存新成稿、上传、提交发布或更改线上内容。

私有验收记录：`.local/rss-expansion-2/` 内的 `netprobe.log`、`netprobe-rustls.log`、`tls-acceptance.log`、`core-tests.log`、`release.log`、`import-audit.json`、`preservation-audit.json` 与 `reptiles-client-accepted.png`。
