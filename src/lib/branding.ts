export const DISPLAY_BRAND = "Gemini Studio";
export const BRAND_ALIASES = ["Gemini 3", "Gemini 3.0"] as const;
export const SEO_BRAND = `${DISPLAY_BRAND}`;

// 全站默认会注入的品牌相关关键词
// 覆盖核心搜索词：Gemini 3 / gemini3 / Nano Banana 2
export const BRAND_KEYWORDS = [
  DISPLAY_BRAND,
  ...BRAND_ALIASES,
  "gemini3",
  "Nano Banana 2",
];

export const DEFAULT_SEO_DESCRIPTION = `${DISPLAY_BRAND} is an English hub for Gemini 3, Gemini 3.0 and gemini3 guides, tutorials, prompt libraries, and image workflows that connect to Nano Banana 2 image generation platform.`;

const normalizeKeywords = (keywords?: string | string[] | null) => {
  if (Array.isArray(keywords)) {
    return keywords.filter(Boolean);
  }

  if (typeof keywords === "string" && keywords.trim().length > 0) {
    return keywords
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean);
  }

  return [] as string[];
};

export function withSeoBrand(value?: string | null): string | undefined {
  if (!value || value.trim().length === 0) {
    return undefined;
  }

  if (value.includes(SEO_BRAND)) {
    return value;
  }

  if (value.includes(DISPLAY_BRAND)) {
    return value.replaceAll(DISPLAY_BRAND, SEO_BRAND);
  }

  return `${value} | ${SEO_BRAND}`;
}

export function withSeoKeywords(
  keywords?: string | string[] | null
): string[] {
  const normalized = normalizeKeywords(keywords);
  const merged = Array.from(new Set([...normalized, ...BRAND_KEYWORDS]));

  return merged;
}
