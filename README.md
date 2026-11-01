# RSSD Sites

RSSD 十个示范站的公开配置：站点与工作空间 ID、栏目、导航、展示模块、公开地址、RSS 来源和品牌素材。在组合工作区中位于 `sites/`。

**完整玩法、资源准备、流程与十站预览，请看 [RSSD 主仓](https://github.com/scholay-rssd/rssd)。**

## 配置入口

- `profiles.json`：站点身份、公开地址、主题、导航与展示配置。
- `organization/`：内容栏目、长期页面与归属配置。
- `branding/` 与 `rss/`：品牌素材及公开订阅来源。

引擎通过鉴权的发布接收器取得内容。此仓库的历史文章种子为空，运营凭据和实际内容单独保存。

## 独立构建

使用 Node.js 24+，在本仓库运行 `npm run build`。构建会按 `compatibility.json` 固定的公开核心版本，在 `.local/` 组装依赖、叠加站点配置并写入产物，无需私有仓库或账号。

构建不执行部署。实际站点接入与发布方式见主仓的[接收器部署](https://github.com/scholay-rssd/rssd/blob/main/docs/receiver-deployment.md)。
