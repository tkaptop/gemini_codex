#!/bin/bash

# OAuth 配置检查脚本

echo "=================================================="
echo "🔍 OAuth 配置检查"
echo "=================================================="
echo ""

# 读取 .env.local
if [ ! -f .env.local ]; then
    echo "❌ .env.local 文件不存在"
    exit 1
fi

source .env.local

echo "1️⃣  Google OAuth"
echo "   Client ID: ${AUTH_GOOGLE_ID}"
echo "   配置状态: ${NEXT_PUBLIC_AUTH_GOOGLE_ENABLED}"
echo ""
echo "   📍 需要检查的回调地址："
echo "   ✅ https://www.gempix2.site/api/auth/callback/google"
echo "   ❓ http://localhost:3000/api/auth/callback/google"
echo ""
echo "   👉 检查地址: https://console.cloud.google.com/apis/credentials"
echo ""

echo "2️⃣  GitHub OAuth"
echo "   Client ID: ${AUTH_GITHUB_ID}"
echo "   配置状态: ${NEXT_PUBLIC_AUTH_GITHUB_ENABLED}"
echo ""
echo "   📍 当前回调地址（GitHub 每个 App 只能 1 个）："
echo "   可能是: https://www.gempix2.site/api/auth/callback/github"
echo ""
echo "   💡 建议: 创建第二个 GitHub OAuth App 用于本地开发"
echo "      本地回调: http://localhost:3000/api/auth/callback/github"
echo ""
echo "   👉 检查地址: https://github.com/settings/developers"
echo ""

echo "3️⃣  Email 验证码登录"
if [ -n "$RESEND_API_KEY" ]; then
    echo "   使用: Resend"
    echo "   API Key: ${RESEND_API_KEY:0:10}..."
    echo "   发件人: ${RESEND_SENDER_EMAIL}"
    echo "   配置状态: ${NEXT_PUBLIC_AUTH_EMAIL_ENABLED}"
    echo ""
    echo "   ✅ Resend 无需配置回调地址，可直接在本地测试"
    echo "   👉 检查地址: https://resend.com/api-keys"
elif [ -n "$SMTP_HOST" ]; then
    echo "   使用: SMTP"
    echo "   主机: ${SMTP_HOST}"
    echo "   端口: ${SMTP_PORT}"
    echo "   用户: ${SMTP_USER}"
    echo ""
    echo "   ✅ SMTP 无需配置回调地址，可直接在本地测试"
else
    echo "   ❌ 未配置邮件服务（RESEND_API_KEY 或 SMTP_*）"
fi
echo ""

echo "=================================================="
echo "🧪 本地测试检查清单"
echo "=================================================="
echo ""
echo "[ ] 1. Google: 在 Google Console 添加 localhost 回调地址"
echo "[ ] 2. GitHub: 创建新的 GitHub OAuth App 用于本地开发"
echo "[ ] 3. Email: 已配置 Resend，可直接测试"
echo ""
echo "📝 测试步骤："
echo "   1. npm run dev"
echo "   2. 访问 http://localhost:3000"
echo "   3. 尝试各种登录方式"
echo ""
