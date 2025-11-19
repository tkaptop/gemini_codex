'use client';

import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PromptFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function PromptFilter({ tags, selectedTags, onTagsChange }: PromptFilterProps) {
  const t = useTranslations('prompts');

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const clearAll = () => {
    onTagsChange([]);
  };

  return (
    <div className="space-y-3">
      {/* 已选择标签 */}
      {selectedTags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">{t('gallery.filter.selectedLabel')}</span>
          {selectedTags.map(tag => (
            <Badge key={tag} variant="default" asChild>
              <button
                type="button"
                onClick={() => toggleTag(tag)}
                aria-label={t('gallery.filter.removeTag', { tag })}
              >
                {tag}
                <X className="w-3 h-3 ml-1" aria-hidden="true" />
              </button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" type="button" onClick={clearAll}>
            {t('gallery.filter.clearAll')}
          </Button>
        </div>
      )}

      {/* 所有标签 */}
      <div className="flex items-start gap-2">
        <span className="text-sm text-muted-foreground mt-1 shrink-0">{t('gallery.filter.tagsLabel')}</span>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'outline'}
              className="transition-colors"
              asChild
            >
              <button
                type="button"
                onClick={() => toggleTag(tag)}
                aria-pressed={selectedTags.includes(tag)}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                {tag}
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
