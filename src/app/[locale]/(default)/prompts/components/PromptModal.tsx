'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { Copy, Check, ExternalLink, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { type Prompt } from '@/lib/prompts';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { copyToClipboard } from '@/lib/copy-to-clipboard';
import { cn } from '@/lib/utils';
import { PromptShare } from '@/components/prompts/PromptShare';

interface PromptModalProps {
  prompt: Prompt;
  relatedPrompts?: Prompt[];
  navigation?: {
    prev: Prompt | null;
    next: Prompt | null;
  };
  onClose: (options?: { skipHistory?: boolean }) => void;
  onNavigate?: (prompt: Prompt) => void;
}

export function PromptModal({ prompt, relatedPrompts = [], navigation, onClose, onNavigate }: PromptModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number>(-1);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);
  const t = useTranslations('prompts');
  const caseTitles = useTranslations('caseTitles');
  const locale = useLocale();
  const router = useRouter();

  // 获取翻译后的标题
  const getTranslatedTitle = (p: Prompt) => {
    const titleKey = p.id.toString();
    try {
      const translatedTitle = caseTitles(titleKey);
      return translatedTitle !== titleKey ? translatedTitle : p.title;
    } catch {
      return p.title;
    }
  };

  const title = getTranslatedTitle(prompt);

  const getPromptIdentifier = (p: Prompt) => p.seoSlug || p.slug || p.id.toString();

  // 获取多语言描述
  const getDescriptionForLocale = (p: Prompt): string | undefined => {
    const desc = p.description;
    if (!desc) return undefined;

    if (typeof desc === 'string') {
      return desc;
    }

    if (typeof desc === 'object') {
      return desc[locale as keyof typeof desc] || desc.en || Object.values(desc)[0];
    }

    return undefined;
  };

  const descriptionText = getDescriptionForLocale(prompt);

  // Description toggle threshold:
  // - English paragraphs通常更长，所以使用更高的阈值
  // - CJK 语言同样信息量下字符数更少，使用较低阈值以便更容易显示「Show more」
  const isCjkLocale = locale === 'zh' || locale === 'ja' || locale === 'ko';
  const descriptionToggleThreshold = isCjkLocale ? 60 : 150;
  const shareUrl = useMemo(() => {
    const baseUrl = process.env.NEXT_PUBLIC_WEB_URL
      || (typeof window !== 'undefined' ? window.location.origin : 'https://www.gempix2.site');
    const path = locale === 'en' ? '/prompts' : `/${locale}/prompts`;
    const url = new URL(path, baseUrl);
    url.searchParams.set('prompt', getPromptIdentifier(prompt));
    return url.toString();
  }, [locale, prompt]);

  const shareLabels = {
    button: t('detail.share.button'),
    buttonLabel: t('detail.share.buttonLabel'),
    copied: t('detail.share.copied'),
    linkCopied: t('detail.share.linkCopied'),
    success: t('detail.share.success'),
    failed: t('detail.share.failed'),
    shareTitle: `${title} – AI Prompt on Nano Banana 2`,
    shareText: `Check out this AI prompt: ${title}`,
  };

  const copyPrompt = async (text: string, index: number) => {
    try {
      await copyToClipboard(text);
      if (!isMountedRef.current) {
        return;
      }
      setCopiedIndex(index);
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
      resetTimeoutRef.current = setTimeout(() => setCopiedIndex(-1), 2000);
      toast.success(t('copy.success'));
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error(t('copy.failure'));
    }
  };

  // 构造跳转到 gempix2.site 的固定链接，并把当前 Prompt 一并带过去
  const recreateUrl = () => {
    const baseUrl = 'https://www.gempix2.site';
    const url = new URL(baseUrl);
    const mainPrompt = prompt.prompts[0];

    if (mainPrompt) {
      url.searchParams.set('prompt', mainPrompt);
    }

    url.searchParams.set('utm_source', 'gemini.studio');
    url.searchParams.set('utm_medium', 'prompt_modal');
    url.searchParams.set('utm_campaign', 'gemini3_seo');

    return url.toString();
  };

  const handleRecreate = () => {
    onClose({ skipHistory: true });
    router.push(recreateUrl());
  };

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Dialog
      open
      onOpenChange={open => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* 导航按钮 */}
        {navigation && (
          <div className="flex justify-between items-center mb-4 pb-4 border-b">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigation.prev && onNavigate?.(navigation.prev)}
              disabled={!navigation.prev}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              {t('detail.navigation.previous') || 'Previous'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigation.next && onNavigate?.(navigation.next)}
              disabled={!navigation.next}
              className="gap-2"
            >
              {t('detail.navigation.next') || 'Next'}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* 标题 */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            #{prompt.id}: {title}
          </h2>

          {/* 来源 */}
          {prompt.source && (
            <a
              href={prompt.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              {t('gallery.modal.sourceLabel')}: {prompt.source.name}
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          )}

          {/* 标签 */}
          <div className="flex flex-wrap gap-2">
            {prompt.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* 图片 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('gallery.modal.imagesTitle')}</h3>
          <div className="grid grid-cols-1 gap-4">
            {prompt.images.map((image, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                <Image
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 提示词 */}
        {prompt.prompts.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('gallery.modal.promptsTitle')}</h3>
            <div className="space-y-4">
              {prompt.prompts.map((text, index) => (
                <div key={index} className="border rounded-lg p-4 bg-muted/30">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      {t('gallery.modal.promptLabel', { index: index + 1 })}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyPrompt(text, index)}
                      type="button"
                      aria-label={t('gallery.modal.copyAria', { index: index + 1 })}
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          {t('gallery.modal.copied')}
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1" />
                          {t('gallery.modal.copy')}
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-sm whitespace-pre-wrap break-words max-h-[300px] overflow-y-auto">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA 区域 */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={handleRecreate} size="lg">
            {t('detail.recreateButton') || 'Recreate in Nano Banana 2'}
          </Button>
          <PromptShare
            title={title}
            url={shareUrl}
            labels={shareLabels}
            className="h-11 px-4 text-sm"
          />
        </div>

        {/* 描述（可折叠） */}
        {descriptionText && (
          <div className="space-y-2 max-w-3xl">
            <h3 className="text-lg font-semibold">{t('gallery.modal.descriptionTitle')}</h3>
            <div className="space-y-2">
              <p
                className={cn(
                  "text-sm whitespace-pre-wrap text-muted-foreground transition-all",
                  descriptionExpanded ? "line-clamp-none" : "line-clamp-1"
                )}
              >
                {descriptionText}
              </p>
              {descriptionText.length > descriptionToggleThreshold && (
                <button
                  type="button"
                  onClick={() => setDescriptionExpanded(!descriptionExpanded)}
                  className="inline-flex items-center text-xs font-medium text-primary hover:text-primary/80"
                >
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 mr-1 transition-transform",
                      descriptionExpanded && "rotate-180"
                    )}
                  />
                  {descriptionExpanded ? (t('detail.showLess') || 'Show less') : (t('detail.showMore') || 'Show more')}
                </button>
              )}
            </div>
          </div>
        )}

        {/* 注释 */}
        {prompt.notes.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{t('gallery.modal.notesTitle')}</h3>
            <ul className="list-disc list-inside space-y-1">
              {prompt.notes.map((note, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Prompts */}
        {relatedPrompts.length > 0 && (
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-semibold">{t('detail.sections.relatedPrompts') || 'Related Prompts'}</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {relatedPrompts.map(related => (
                <button
                  key={related.id}
                  type="button"
                  onClick={() => onNavigate?.(related)}
                  className="group block rounded-lg overflow-hidden bg-card border border-border hover:border-primary/50 transition-all"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={related.coverImage}
                      alt={getTranslatedTitle(related)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium line-clamp-2 group-hover:text-primary transition-colors">
                      {getTranslatedTitle(related)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
