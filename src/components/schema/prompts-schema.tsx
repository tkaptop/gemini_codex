/**
 * Prompts Gallery Schema Markup Component
 * 用于 SEO 优化，告诉搜索引擎这是一个创意作品集/图库页面
 */

import { BRAND_KEYWORDS, SEO_BRAND } from '@/lib/branding';

interface PromptsSchemaProps {
  totalPrompts: number;
  locale?: string;
}

export default function PromptsSchema({ totalPrompts, locale = 'en' }: PromptsSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || 'https://www.gempix2.site';
  const pageUrl = locale === 'en' ? `${baseUrl}/prompts` : `${baseUrl}/${locale}/prompts`;
  const keywordString = [...BRAND_KEYWORDS, 'AI prompts', 'image generation', 'prompt engineering']
    .join(', ');

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AI Prompt Gallery",
    "description": `Curated collection of AI image generation prompts for ${SEO_BRAND}. Explore creative prompt examples for character design, scenes, and artistic styles.`,
    "url": pageUrl,
    "inLanguage": locale,
    "numberOfItems": totalPrompts,
    "isPartOf": {
      "@type": "WebSite",
      "name": SEO_BRAND,
      "url": baseUrl
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "AI Image Generation Prompts",
      "description": "Collection of curated AI prompts for creative image generation",
      "numberOfItems": totalPrompts,
      "itemListOrder": "https://schema.org/ItemListOrderDescending"
    },
    "about": {
      "@type": "Thing",
      "name": "AI Image Generation",
      "description": "Artificial Intelligence powered image creation and editing"
    },
    "keywords": keywordString
  };

  // 安全转义JSON字符串，防止XSS攻击
  const safeJsonString = JSON.stringify(schemaData)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonString }}
    />
  );
}
