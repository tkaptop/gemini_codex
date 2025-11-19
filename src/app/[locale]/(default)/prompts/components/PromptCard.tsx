'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { type Prompt } from '@/lib/prompts';
import { Badge } from '@/components/ui/badge';

interface PromptCardProps {
  prompt: Prompt;
  onClick: () => void;
  priority?: boolean;
}

export function PromptCard({ prompt, onClick, priority = false }: PromptCardProps) {
  // 使用 prompts 根命名空间来读取卡片图片的 alt 文案
  const t = useTranslations('prompts');
  const caseTitles = useTranslations('caseTitles');

  // 获取翻译后的标题，如果翻译不存在则使用原标题
  const getTranslatedTitle = () => {
    const titleKey = prompt.id.toString();
    try {
      const translatedTitle = caseTitles(titleKey);
      return translatedTitle !== titleKey ? translatedTitle : prompt.title;
    } catch {
      return prompt.title;
    }
  };

  const title = getTranslatedTitle();

  return (
    <button
      type="button"
      onClick={onClick}
      className="group block w-full text-left rounded-xl overflow-hidden bg-card border border-border hover:shadow-xl hover:border-primary/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {/* 图片 */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={prompt.coverImage}
          alt={(() => {
            const fallbackTags = prompt.tags.length > 0 ? ` (${prompt.tags.slice(0, 2).join(', ')})` : '';
            try {
              return t('card_image_alt', {
                title: title,
                tags: fallbackTags,
              });
            } catch {
              return `${title}${fallbackTags}`;
            }
          })()}
          fill
          // 对首屏卡片使用优先加载，避免 LCP 图片被懒加载
          priority={priority}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          title={title}
        />
      </div>

      {/* 内容 */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          #{prompt.id}: {title}
        </h3>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2">
          {prompt.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {prompt.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{prompt.tags.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
}
