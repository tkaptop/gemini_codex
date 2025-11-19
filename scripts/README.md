# 📝 Scripts 目录

## 🌍 DeepSeek 翻译工具

**通用的多语言 JSON 翻译工具**，使用 DeepSeek API 提供专业的本地化翻译。

### 快速开始

```bash
# 1. 配置 API Key（在项目根目录的 .env.local）
DEEPSEEK_API_KEY=sk-你的密钥

# 2. 翻译单个文件
tsx scripts/deepseek-translator/translator.ts en zh your-file.json

# 3. 批量翻译（所有语言）
./scripts/deepseek-translator/translate-batch.sh en your-file.json
```

### 完整文档

查看 👉 [deepseek-translator/README.md](./deepseek-translator/README.md)

### 目录结构

```
deepseek-translator/
├── translator.ts              # 核心翻译脚本
├── translate-batch.sh         # 批量翻译脚本
├── translator.config.example.js  # 配置示例
├── README.md                  # 完整文档
└── legacy/                    # 旧版工具
```

### 特性

- ✅ 通用可复用 - 适用于任何项目
- ✅ 专业本地化 - 地道翻译
- ✅ 支持 11 种语言
- ✅ 经济实惠 - ¥0.1-0.3/页

### 复制到其他项目

```bash
# 复制整个文件夹
cp -r scripts/deepseek-translator /path/to/other-project/scripts/
```

---

**获取 API Key**: https://platform.deepseek.com/api_keys
