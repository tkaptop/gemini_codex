'use client';

import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface PromptSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function PromptSearch({ value, onChange }: PromptSearchProps) {
  const t = useTranslations('prompts');

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={t('gallery.search.placeholder')}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10"
        aria-label={t('gallery.search.input_label')}
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => onChange('')}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
          aria-label={t('gallery.search.clear')}
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
