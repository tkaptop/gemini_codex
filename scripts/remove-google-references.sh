#!/bin/bash

# 批量删除所有语言文件中的 Google DeepMind 引用
# 使用方式：./scripts/remove-google-references.sh

set -e

echo "🚀 开始批量替换 Google DeepMind 相关内容..."

# 定义要处理的语言列表
LANGUAGES=("en" "ko" "ja" "es" "de" "fr" "ru" "pt" "it" "ar")

# 定义替换规则（使用 sed 命令）
declare -A REPLACEMENTS_EN=(
    ["Based on Google DeepMind's Nano Banana 2 technology"]="Based on advanced AI image generation technology"
    ["powered by Google DeepMind"]="powered by advanced deep learning technology"
    ["Google's next-generation technology"]="advanced AI technology"
    ["Google DeepMind's next-generation AI"]="advanced AI"
    ["Google DeepMind released"]="utilizing advanced"
    ["Google DeepMind于"]="utilizing advanced"
    ["Nano Banana 2, which was researched and publicly released by Google DeepMind"]="advanced multimodal AI technology"
    ["this foundation enables Gempix2 to access"]="Gempix2 utilizes"
    ["Google's advanced research"]="industry-leading technology"
    ["based on official Google DeepMind benchmarks"]="based on industry-standard benchmarks"
    ["powered by Google DeepMind"]="powered by advanced AI"
    ["Is Gempix2 based on Google DeepMind technology?"]="What technology does Gempix2 use?"
    ["Yes! Gempix2 is powered by Nano Banana 2, a next-generation AI model released by Google DeepMind"]="Gempix2 uses advanced multimodal AI technology with the latest deep learning and neural network architecture"
    ["Gempix2 combines Google DeepMind's next-generation technology"]="Gempix2 combines advanced AI technology"
)

# 处理 landing 页面
echo ""
echo "📄 处理 Landing 页面..."
for lang in "${LANGUAGES[@]}"; do
    FILE="src/i18n/pages/landing/${lang}.json"
    if [ -f "$FILE" ]; then
        echo "  处理: $FILE"

        # 针对每种语言进行适配的替换
        case $lang in
            "en")
                # 英文版本的替换
                sed -i '' 's/Google DeepMind/advanced AI technology/g' "$FILE"
                sed -i '' 's/Google'"'"'s next-generation/advanced/g' "$FILE"
                ;;
            "ko"|"ja"|"es"|"de"|"fr"|"ru"|"pt"|"it"|"ar")
                # 其他语言也做类似替换（简化处理）
                sed -i '' 's/Google DeepMind[^"]*//g' "$FILE"
                ;;
        esac

        # 删除 GoogleDeepMind 的 Twitter 链接
        sed -i '' '/x\.com\/GoogleDeepMind/d' "$FILE"

        echo "  ✅ 完成"
    fi
done

# 处理 veo3 页面
echo ""
echo "📄 处理 Veo3 页面..."
for lang in "${LANGUAGES[@]}"; do
    FILE="src/i18n/pages/veo3/${lang}.json"
    if [ -f "$FILE" ]; then
        echo "  处理: $FILE"
        sed -i '' 's/Google DeepMind/advanced AI/g' "$FILE"
        sed -i '' 's/Google'"'"'s/industry-leading/g' "$FILE"
        echo "  ✅ 完成"
    fi
done

# 处理 veo3-1 页面
echo ""
echo "📄 处理 Veo3.1 页面..."
for lang in "${LANGUAGES[@]}"; do
    FILE="src/i18n/pages/veo3-1/${lang}.json"
    if [ -f "$FILE" ]; then
        echo "  处理: $FILE"
        sed -i '' 's/Google DeepMind/advanced AI/g' "$FILE"
        sed -i '' 's/Google'"'"'s/industry-leading/g' "$FILE"
        echo "  ✅ 完成"
    fi
done

echo ""
echo "🎉 批量替换完成！"
echo ""
echo "📋 验证步骤："
echo "1. 检查是否还有 Google 字样："
echo "   grep -r 'Google' src/i18n/pages/ --include='*.json'"
echo ""
echo "2. 本地预览网站，确认文案自然通顺"
echo "   npm run dev"
echo ""
echo "3. 如果确认无误，提交代码："
echo "   git add src/i18n/pages/"
echo "   git commit -m 'refactor: remove Google DeepMind references, use generic tech descriptions'"
