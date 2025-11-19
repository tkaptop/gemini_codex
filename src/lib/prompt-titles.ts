/**
 * 提示词标题翻译工具
 * Utility for getting translated prompt titles
 */

// 缓存已加载的翻译
const titlesCache = new Map<string, Record<string, string>>();

/**
 * 加载指定语言的提示词标题翻译
 * Load prompt title translations for a specific locale
 */
export async function loadPromptTitles(locale: string): Promise<Record<string, string>> {
  // 检查缓存
  if (titlesCache.has(locale)) {
    return titlesCache.get(locale)!;
  }

  try {
    const titles = await import(`@/i18n/pages/prompts/cases/${locale}.json`).then(
      (module) => module.default
    );
    titlesCache.set(locale, titles);
    return titles;
  } catch (error) {
    console.warn(`Failed to load prompt titles for ${locale}, falling back to Chinese`);
    try {
      const zhTitles = await import('@/i18n/pages/prompts/cases/zh.json').then(
        (module) => module.default
      );
      titlesCache.set(locale, zhTitles);
      return zhTitles;
    } catch (e) {
      console.error('Failed to load Chinese prompt titles as fallback', e);
      return {};
    }
  }
}

/**
 * 获取翻译后的提示词标题
 * Get translated prompt title by ID
 */
export function getPromptTitle(
  id: number,
  titles: Record<string, string>,
  fallbackTitle: string
): string {
  return titles[id.toString()] || fallbackTitle;
}
