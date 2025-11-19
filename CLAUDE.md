# Gempix2 项目记忆

本文件记录项目的重要规则、约定和配置信息，供 Claude Code 参考。

## 📚 文档管理规则

### 目录结构

项目文档统一存放在 `docs/` 目录，按功能分类：

```
docs/
├── README.md                    # 文档中心说明
├── setup/                       # 配置和设置指南
│   ├── CONFIGURATION_CHECKLIST.md
│   ├── EMAIL_AUTH_SETUP.md
│   └── STRIPE_WEBHOOK_SETUP.md
├── testing/                     # 测试指南
│   ├── VEO3_TESTING_GUIDE.md
│   ├── EMAIL_TEST_GUIDE.md
│   └── VERIFICATION_CODE_TEST_GUIDE.md
├── marketing/                   # 营销和合规文档
│   ├── gempix2-introduction-ko.md
│   ├── creem-compliance-email.md
│   └── creem-compliance-evidence.md
└── archived/                    # 已完成/过时文档
    ├── DOMAIN_MIGRATION_GUIDE.md
    ├── SEO_FINAL_CHECK_REPORT.md
    └── ...
```

### 文档分类原则

#### **setup/** - 配置和设置指南
- 用途：项目部署、功能配置、环境设置
- 维护：持续更新，随配置变化而更新
- 示例：配置清单、认证设置、支付配置

#### **testing/** - 测试指南
- 用途：各功能模块的测试方法和最佳实践
- 维护：持续维护，保持测试指南的准确性
- 示例：功能测试指南、Mock 测试方法

#### **marketing/** - 营销和合规
- 用途：市场推广内容、合规文档、对外材料
- 维护：根据营销需求和合规要求更新
- 示例：产品介绍、合规证明、邮件模板

#### **archived/** - 已完成/过时文档
- 用途：保留历史记录和已完成的一次性任务
- 维护：只增不改，作为历史记录保存
- 归档条件：
  - 一次性任务已完成（如域名迁移）
  - 阶段性检查报告（如SEO检查）
  - 过时的策略或方案
  - 历史实施总结

### 文档命名规范

- 使用大写字母和下划线：`FEATURE_NAME_GUIDE.md`
- 明确文档类型后缀：
  - `_GUIDE.md` - 操作指南
  - `_SETUP.md` - 配置说明
  - `_CHECKLIST.md` - 检查清单
  - `_REPORT.md` - 报告文档
  - `_FAQ.md` - 常见问题

### Git 版本控制

- **docs/ 目录不提交到 git**（已添加到 .gitignore）
- 原因：
  - 文档是本地工作记录
  - 避免频繁的文档更新污染 git 历史
  - 每个开发者可以维护自己的文档版本
- 例外：README.md 等核心文档可以提交

### 文档创建和维护流程

#### 新建文档
1. 确定文档类型（setup/testing/marketing）
2. 按命名规范创建文件
3. 在 `docs/README.md` 中添加说明

#### 更新文档
- setup/ 和 testing/ 随代码变化及时更新
- marketing/ 按需更新
- archived/ 不修改，只添加

#### 归档文档
- 识别已完成的一次性任务
- 移动到 `archived/` 目录
- 在 `docs/README.md` 中更新说明

### 特殊说明

#### 根目录保持整洁
- 只保留核心文档：README.md
- 其他所有 .md 文档移到 docs/
- 避免在根目录散落文档

#### 配置文件模板
- 配置示例保存在 docs/setup/
- 不在根目录创建 .env 模板文件

---

## 🛠️ 项目特定规则

### 数据库工具

**scripts/verify-tables.ts**
- 功能：数据库表验证和诊断工具（只读）
- 用途：检查表结构、统计记录数
- 使用：`tsx scripts/verify-tables.ts`

### 域名配置

- 当前域名：`gempix2.site`
- 旧域名迁移已完成（gempix2.org → gempix2.site）
- 相关文档：`docs/archived/DOMAIN_MIGRATION_GUIDE.md`

### SEO 优化

- Canonical 标签已配置
- Schema.org 结构化数据已添加
- 相关文档：`docs/archived/SEO_FINAL_CHECK_REPORT.md`

### 多语言翻译规则

**重要：翻译任务由用户手动执行**

当需要进行多语言翻译时，Claude Code 应该：
1. ✅ 准备好基准文件（如中文源文件）
2. ✅ 创建或更新翻译脚本
3. ✅ 提供脚本执行命令
4. ❌ **不要**自动运行翻译脚本

**原因**：
- 翻译消耗 API 配额和费用
- 用户需要控制翻译时机
- 避免意外的大量 API 调用

**示例工作流**：
```bash
# Claude 只提供命令，不执行
# API Key 已配置到系统环境变量（~/.zshrc），直接运行即可
./scripts/deepseek-translator/translate-batch.sh zh cases/zh.json \
  --dir ./src/i18n/pages/prompts \
  --batch-size 20
```

**已有翻译工具**：
- `scripts/deepseek-translator/translator.ts` - 单语言翻译
- `scripts/deepseek-translator/translate-batch.sh` - 批量多语言翻译

### 提示词多语言支持

**实现方式**：
- 提示词标题存储在 `src/i18n/pages/prompts/cases/{lang}.json`
- 中文为基准语言（`zh.json`）
- 通过 `src/lib/prompt-titles.ts` 工具函数加载翻译
- 组件使用 `useTranslations('caseTitles')` 获取翻译

**翻译流程**：
1. 从 CDN 提取中文标题 → `cases/zh.json`
2. 用户手动运行翻译脚本生成其他语言
3. 页面加载时根据 locale 自动选择对应翻译

---

*最后更新：2025-11-14*
