#!/bin/bash

# SEO影响测试脚本
# 对比配置前后的性能指标

echo "🔍 测试SEO相关指标..."
echo ""

# 1. 测试页面大小
echo "📦 测试页面大小（越小越好）..."
pnpm build 2>&1 | grep -E "Route|Size|First Load JS"

echo ""
echo "✅ 如果看到 'First Load JS' < 100KB，说明��好"
echo ""

# 2. 测试HTML输出
echo "📄 检查HTML输出是否正常..."
echo ""
echo "构建后检查 .next/server/pages/index.html"
echo "应该包含："
echo "  ✓ <title>标签"
echo "  ✓ <meta description>"
echo "  ✓ <meta keywords>"
echo "  ✓ Schema.org数据"
echo ""

# 3. Lighthouse测试建议
echo "💡 建议使用 Lighthouse 测试："
echo ""
echo "方法1: Chrome DevTools"
echo "  1. 打开Chrome"
echo "  2. 访问你的网站"
echo "  3. F12 → Lighthouse → Generate Report"
echo ""
echo "方法2: CLI工具"
echo "  npm install -g lighthouse"
echo "  lighthouse https://gempix2.site --view"
echo ""

# 4. PageSpeed Insights
echo "🌐 或者使用 PageSpeed Insights:"
echo "  https://pagespeed.web.dev/"
echo "  输入: https://gempix2.site"
echo ""

echo "✅ 测试完成！"
