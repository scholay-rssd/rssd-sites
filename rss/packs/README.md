# 十站 RSS 订阅包

这是应用内置的新装入门包。所有工作空间的完整配置改由 [`../subscriptions.json`](../subscriptions.json) 保存，本地与服务器共用；维护和恢复见 [统一源清单说明](../../../docs/rss-source-catalog.md)。不要将这个小包当成完整备份。

本地工作空间按 `siteId` 加载对应配置。每站 4–6 条，共 54 条订阅、51 个不同地址；不在阅读界面标识来源包。`catalog.json` 是构建输入，旁边的 OPML 是同内容的可导入配置。

| 站点 | siteId / spaceId | 数量 | 主要业务范围 |
| --- | --- | ---: | --- |
| 今日学术 | `scholay-today` / `academic` | 6 | 学界犀闻、学者观察、学术日历、学术资源 |
| 犀术 IME | `lingxi` / `lingxi` | 5 | 开发日志、输入方案 |
| 小猪盖被 | `piggytuck` / `design` | 5 | 设计资讯、作品参考、精美图标、网页设计 |
| 学术海 | `personal` / `personal` | 6 | 产品随想、产品资讯、项目动态、学术札记 |
| 小猪萌宠 | `pets` / `pets` | 6 | 宠物资讯、每日一猫、每日一狗、异宠大全 |
| 犀术智法 | `legis` / `legis` | 6 | 法律前沿、法律案例、政策法规、知识产权 |
| 研究方法 | `metho` / `metho` | 5 | 方法百科、统计之美、实验星球、方法前沿 |
| 学术之门 | `enter` / `enter` | 6 | 课程资源、软件网站、学术检索 |
| 犀术国学 | `xsiching` / `xsiching` | 4 | 国学经典、易家之言、精品应用 |
| 智能学堂 | `study` / `study` | 5 | 免费课程、学习实践、模型动态 |

## 使用与保留规则

- 拖入现有 `.scholay-site.json`：验证站点身份、登记空间后，加载对应本地订阅。无需重新签发授权。
- 已有空间只增加缺失 URL；原订阅名称、分组、刷新设置、归档状态及阅读记录优先保留。
- 自动加载一次后记入该空间数据库；再次授权、升级源包都不复活已删除的订阅。需要主动重新补充时，可手动导入 OPML。
- OPML 在「设置 → 订阅」导入／导出，保存订阅 URL、名称和分组。它不是阅读记录备份，也不携带授权或同步密钥。
- RSS 订阅库、缓存文章、已读和收藏状态保存在各空间本地；发布连接与可选的 FreshRSS／Miniflux 同步单独配置。源包不会开启云同步。
- 新装默认学术空间使用 6 条配置；升级不会将旧空间的数百条订阅替换成小包。

## 选取与业务边界

核验日期：2026-10-15。每个地址均经 HTTPS 获取和 XML 解析，再用桌面实际 HTTP 客户端及 RSS/Atom 解析器确认非空，并至少有一条近 180 天的条目。优先选官方机构、项目维护者、方法作者和长期专业出版物。活跃判断用于入包筛选，不是持续在线保证。详见 `verification-2026-10-15.json`；原生首轮 49/51 成功，DataCite 和 The Carpentries 各发生一次临时网络／解码错误，定向复查均通过。

- 资讯、设计、产品站用于提供报道、评论和作品参考；个人作品档案仍由本人维护。
- 犀术 IME 的方案与依赖更新使用维护者 Atom。外观候选源已停更或过旧，本批不为凑栏目加入它们。
- 犀术智法包含美国技术法律评论、隐私案例分析、欧盟政策和 WIPO 动态。它们是有法域的素材线索，案例分析还需核对原判决与适用时间。
- 犀术国学使用 CBETA 正式语料发布库、CBDB 数据库和古籍资源索引更新，另配中国哲学学术动态。提交记录是资源变化线索，不等于已获取或授权全文。
- 学术之门关注研究工具、检索基础设施与课程组织；今日学术关注资讯、学者观察和活动，两站少量共用基础设施源。
- 智能学堂覆盖公开课程、学习实践和模型发布。模型排名、优惠活动、资质证书仍需各自的可靠资料，不从新闻条目自动生成。

筛掉的候选包括失效／拒绝访问地址、返回 HTML 的伪 RSS、空源和明显停更源。例：Dogster 返回 403、Hugging Face 博客返回 429，改用可读取的课程仓库；部分皮肤和字体工具发布源已数年无更新；国学学刊提供的 RSS 本次 XML 解析失败。

## 复查

```sh
cd desktop
cargo run -p papr-core --example check_site_subscriptions > verification.json
```

复查只读取公开源，不打开或修改用户数据库。可在命令末尾指定目录中已有的准确 URL，仅重试失败项。源包调整应同时更新清单、OPML 与核验记录；既有空间不会因清单更新自动变更。

## 订阅清单

### 今日学术

- 学界犀闻 · [研之有物](https://research.sinica.edu.tw/feed/)
- 学界犀闻 · [Nature](https://www.nature.com/nature.rss)
- 学者观察 · [Retraction Watch](https://retractionwatch.com/feed/)
- 学术日历 · [国科会研讨会与活动](https://www.nstc.gov.tw/nstc/rss/events)
- 学术资源 · [OpenAlex](https://blog.openalex.org/feed/)
- 学术资源 · [The Carpentries](https://carpentries.org/blog/index.xml)

### 犀术 IME

- 开发日志 · [犀术 IME 版本发布](https://github.com/scholay/rimes/releases.atom)
- 开发日志 · [Rime 引擎版本发布](https://github.com/rime/librime/releases.atom)
- 开发日志 · [Fcitx5 版本发布](https://github.com/fcitx/fcitx5/releases.atom)
- 输入方案 · [雾凇拼音维护动态](https://github.com/iDvel/rime-ice/commits/main.atom)
- 输入方案 · [薄荷输入法维护动态](https://github.com/Mintimate/oh-my-rime/commits/HEAD.atom)

### 小猪盖被

- 设计资讯 · [标志情报局](https://www.logonews.cn/feed)
- 作品参考 · [Fonts In Use](https://fontsinuse.com/main.rss)
- 作品参考 · [Colossal](https://www.thisiscolossal.com/feed/)
- 精美图标 · [Lucide 图标](https://github.com/lucide-icons/lucide/releases.atom)
- 网页设计 · [Smashing Magazine](https://www.smashingmagazine.com/feed/)

### 学术海

- 产品随想 · [Nielsen Norman Group](https://www.nngroup.com/feed/rss/)
- 产品随想 · [Silicon Valley Product Group](https://www.svpg.com/feed/)
- 产品资讯 · [Lenny’s Newsletter](https://www.lennysnewsletter.com/feed)
- 产品资讯 · [阮一峰的网络日志](https://www.ruanyifeng.com/blog/atom.xml)
- 项目动态 · [犀术 IME 版本发布](https://github.com/scholay/rimes/releases.atom)
- 学术札记 · [Posit 开源工具博客](https://quarto.org/docs/blog/index.xml)

### 小猪萌宠

- 宠物资讯 · [GlobalPETS](https://globalpetindustry.com/feed/)
- 宠物资讯 · [Companion Animal Psychology](https://www.companionanimalpsychology.com/feeds/posts/default)
- 每日一猫 · [Catster](https://www.catster.com/feed/)
- 每日一狗 · [Whole Dog Journal](https://www.whole-dog-journal.com/feed/)
- 异宠大全 · [Rabbit.org](https://rabbit.org/feed/)
- 异宠大全 · [Reptiles Magazine](https://reptilesmagazine.com/feed/)

### 犀术智法

- 法律前沿 · [Lawfare 科技与法律](https://www.lawfaremedia.org/feeds/cybersecurity-tech)
- 法律案例 · [Eric Goldman 科技与营销法](https://blog.ericgoldman.org/feed)
- 法律案例 · [EFF 数字权利](https://www.eff.org/rss/updates.xml)
- 政策法规 · [EPIC 隐私与 AI](https://epic.org/feed/)
- 政策法规 · [欧盟数字战略](https://digital-strategy.ec.europa.eu/en/rss.xml)
- 知识产权 · [WIPO 新闻](https://www.wipo.int/pressroom/en/rss.xml)

### 研究方法

- 方法百科 · [Statistical Modeling, Causal Inference, and Social Science](https://statmodeling.stat.columbia.edu/feed/)
- 统计之美 · [The Stata Blog](https://blog.stata.com/feed/)
- 实验星球 · [Data Colada](https://datacolada.org/feed)
- 方法百科 · [Statistical Horizons](https://statisticalhorizons.com/feed/)
- 方法前沿 · [Amstat News](https://magazine.amstat.org/feed/)

### 学术之门

- 课程资源 · [The Carpentries](https://carpentries.org/blog/index.xml)
- 软件网站 · [Zotero](https://www.zotero.org/blog/feed/)
- 软件网站 · [ORCID](https://info.orcid.org/feed/)
- 学术检索 · [Crossref](https://www.crossref.org/blog/index.xml)
- 学术检索 · [DataCite](https://blog.datacite.org/feed/)
- 学术检索 · [OpenAlex](https://blog.openalex.org/feed/)

### 犀术国学

- 国学经典 · [CBETA 正式典籍维护](https://github.com/cbeta-org/xml-p5/commits/master.atom)
- 易家之言 · [Warp, Weft, and Way 中国哲学](https://warpweftandway.com/feed/)
- 精品应用 · [CBDB 中国历代人物资料](https://github.com/cbdb-project/cbdb_sqlite/commits/master.atom)
- 精品应用 · [古籍资源索引](https://github.com/open-guji/guji-resource-index/commits/main.atom)

### 智能学堂

- 免费课程 · [Hugging Face 课程维护](https://github.com/huggingface/course/commits/main.atom)
- 免费课程 · [fast.ai](https://www.fast.ai/index.xml)
- 学习实践 · [Simon Willison](https://simonwillison.net/atom/everything/)
- 模型动态 · [OpenAI](https://openai.com/news/rss.xml)
- 模型动态 · [Google AI](https://blog.google/technology/ai/rss/)
