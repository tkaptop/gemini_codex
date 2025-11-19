import { MetadataRoute } from 'next';
import { newsArticles } from '@/data/news';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || 'https://www.gempix2.site';
  const now = new Date();

  // 静态页面配置
  const staticPagePaths = [
    { path: '', lastModified: new Date('2025-11-05'), changeFrequency: 'daily' as const, priority: 1.0 },
    { path: '/prompts', lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/about', lastModified: new Date('2025-10-26'), changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/news', lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
  ];

  // 生成静态页面的 sitemap 条目
  const entries: MetadataRoute.Sitemap = staticPagePaths.map(page => ({
    url: `${baseUrl}${page.path}`,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // 添加新闻详情页
  const newsEntries: MetadataRoute.Sitemap = newsArticles.map(article => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...entries, ...newsEntries];
}
