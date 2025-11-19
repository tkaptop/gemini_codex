#!/bin/bash

# 图片优化脚本 - 压缩所有大于 500KB 的图片

echo "🖼️ 开始优化图片..."

# 检查是否安装了 imagemagick
if ! command -v convert &> /dev/null; then
    echo "❌ 请先安装 imagemagick: brew install imagemagick"
    exit 1
fi

# 优化 showcase 图片（最大的问题）
echo "📸 优化 showcase 图片..."
for img in public/imgs/showcases/*.png; do
    size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
    if [ $size -gt 500000 ]; then
        echo "  压缩: $img ($(($size / 1024))KB)"
        convert "$img" -quality 85 -resize '1200x1200>' "$img"
    fi
done

# 优化 features 图片
echo "🎨 优化 features 图片..."
for img in public/imgs/features/*.png; do
    size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
    if [ $size -gt 500000 ]; then
        echo "  压缩: $img ($(($size / 1024))KB)"
        convert "$img" -quality 85 -resize '800x800>' "$img"
    fi
done

echo "✅ 图片优化完成！"
echo ""
echo "📊 优化后大小："
du -sh public/imgs/showcases/
du -sh public/imgs/features/
