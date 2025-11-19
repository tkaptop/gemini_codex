import { Prompt } from '@/lib/prompts';
import { SEO_BRAND } from '@/lib/branding';

interface PromptDetailSchemaProps {
  prompt: Prompt;
  locale: string;
  recreateUrl: string;
}

export function PromptDetailSchema({
  prompt,
  locale,
  recreateUrl,
}: PromptDetailSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || 'https://www.gempix2.site';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: prompt.title,
    description: prompt.description || prompt.prompts[0]?.substring(0, 200) || '',
    image: prompt.coverImage,
    inLanguage: locale,
    keywords: prompt.tags.join(', '),
    author: {
      '@type': 'Organization',
      name: SEO_BRAND,
      url: baseUrl,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: SEO_BRAND,
      url: baseUrl,
    },
    about: prompt.tags.map(tag => ({
      '@type': 'Thing',
      name: tag,
    })),
    potentialAction: {
      '@type': 'UseAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: recreateUrl,
      },
      name: `Recreate in ${SEO_BRAND}`,
    },
  };

  // 如果有来源信息，添加 citation
  if (prompt.source) {
    Object.assign(schema, {
      citation: {
        '@type': 'CreativeWork',
        name: prompt.source.name,
        url: prompt.source.url,
      },
    });
  }

  // 如果有示例图片，添加到 associatedMedia
  if (prompt.images && prompt.images.length > 0) {
    Object.assign(schema, {
      associatedMedia: prompt.images.map(img => ({
        '@type': 'ImageObject',
        contentUrl: img,
      })),
    });
  }

  const safeJsonString = JSON.stringify(schema)
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
