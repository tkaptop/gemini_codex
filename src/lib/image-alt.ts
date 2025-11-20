/**
 * 图片 Alt 文本生成工具
 * 用于优化 SEO 和无障碍性
 */

export interface ImageAltOptions {
  /** 最大长度（Google 推荐 125 字符） */
  maxLength?: number;
  /** 是否添加品牌名称 */
  includeBrand?: boolean;
  /** 是否添加 AI 前缀 */
  includeAIPrefix?: boolean;
}

/**
 * 生成优化的图片 alt 文本
 *
 * @param prompt - 用户输入的提示词或图片描述
 * @param type - 图片类型（生成或编辑）
 * @param options - 可选配置
 * @returns 优化后的 alt 文本
 *
 * @example
 * ```ts
 * generateImageAlt("cute cat wearing sunglasses", "generated")
 * // 返回: "AI generated image: cute cat wearing sunglasses"
 * ```
 */
export function generateImageAlt(
  prompt: string,
  type: "generated" | "edited" = "generated",
  options: ImageAltOptions = {}
): string {
  const {
    maxLength = 125,
    includeBrand = false,
    includeAIPrefix = true,
  } = options;

  if (!prompt || typeof prompt !== "string") {
    return "AI generated image";
  }

  // 1. 清理提示词
  let alt = prompt
    .trim()
    // 移除多余的空格
    .replace(/\s+/g, " ")
    // 移除表情符号和特殊字符（保留基本标点）
    .replace(/[^\w\s,.\-!?'"]/g, "")
    // 首字母大写
    .replace(/^\w/, (c) => c.toUpperCase());

  // 2. 添加 AI 前缀
  if (includeAIPrefix) {
    const prefix = type === "generated" ? "AI generated image" : "AI edited image";
    alt = `${prefix}: ${alt}`;
  }

  // 3. 添加品牌（可选）
  if (includeBrand) {
    alt += " - Nano Banana 2";
  }

  // 4. 限制长度
  if (alt.length > maxLength) {
    // 确保不会在单词中间截断
    alt = alt.substring(0, maxLength - 3).trim();
    // 移除可能的不完整单词
    alt = alt.replace(/\s+\S*$/, "");
    alt += "...";
  }

  return alt;
}

/**
 * 为展示页面生成 alt 文本
 *
 * @param description - 图片描述
 * @param context - 额外上下文（如效果名称）
 * @returns alt 文本
 */
export function generateShowcaseAlt(
  description: string,
  context?: string
): string {
  if (context) {
    return generateImageAlt(`${context}: ${description}`, "generated", {
      includeAIPrefix: true,
      includeBrand: false,
    });
  }
  return generateImageAlt(description, "generated", {
    includeAIPrefix: false,
    includeBrand: false,
  });
}

/**
 * 为原始/对比图生成 alt 文本
 *
 * @param description - 基础描述
 * @param isOriginal - 是否为原始图
 * @returns alt 文本
 */
export function generateComparisonAlt(
  description: string,
  isOriginal: boolean
): string {
  const prefix = isOriginal ? "Original photo" : "AI enhanced photo";
  return `${prefix}: ${description}`;
}
