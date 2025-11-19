'use client';

import { useMemo, useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { copyToClipboard } from '@/lib/copy-to-clipboard';

interface ShareLabels {
  button: string;
  buttonLabel: string;
  copied: string;
  linkCopied: string;
  success: string;
  failed: string;
  shareTitle?: string;
  shareText?: string;
}

interface PromptShareProps {
  title: string;
  url: string;
  className?: string;
  labels: ShareLabels;
}

export function PromptShare({ title, url, className, labels }: PromptShareProps) {
  const [copied, setCopied] = useState(false);

  const sharePayload = useMemo(
    () => ({
      title: labels.shareTitle || `${title} – AI Prompt on Gempix2`,
      text: labels.shareText || `Check out this AI prompt: ${title}`,
      url,
    }),
    [labels.shareText, labels.shareTitle, title, url]
  );

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(sharePayload);
        toast.success(labels.success);
        return;
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    }

    try {
      await copyToClipboard(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success(labels.linkCopied);
    } catch (err) {
      console.error('Copy failed:', err);
      toast.error(labels.failed);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      className={className}
      type="button"
      aria-label={labels.buttonLabel}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          {labels.copied}
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4 mr-2" />
          {labels.button}
        </>
      )}
    </Button>
  );
}
