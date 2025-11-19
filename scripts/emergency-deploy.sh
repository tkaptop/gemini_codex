#!/bin/bash

# 应急部署脚本 - 当Vercel被投诉下线时使用
# 使用方法：bash scripts/emergency-deploy.sh

echo "🚀 开始应急部署..."

# 1. 确认环境变量
if [ ! -f .env.production ]; then
  echo "❌ 缺少 .env.production 文件"
  exit 1
fi

# 2. 构建项目
echo "📦 构建项目..."
pnpm build

if [ $? -ne 0 ]; then
  echo "❌ 构建失败"
  exit 1
fi

echo "✅ 构建完成"

# 3. 部署到 Cloudflare Pages（备选方案1）
echo ""
echo "📋 部署选项："
echo "1. Cloudflare Pages (推荐)"
echo "2. Netlify"
echo "3. Railway"
echo "4. Render"
echo ""
echo "请手动选择一个平台部署 .next 目录"
echo ""
echo "Cloudflare Pages 命令："
echo "  npx wrangler pages deploy .next --project-name=gempix2"
echo ""
echo "Netlify 命令："
echo "  netlify deploy --prod --dir=.next"
echo ""

# 4. 提醒更新DNS
echo "⚠️  部署完成后，记得更新DNS指向新平台！"
