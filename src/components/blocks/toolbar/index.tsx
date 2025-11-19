"use client";

import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Button as ButtonType } from "@/types/blocks/base";
import Icon from "@/components/icon";
import { Link } from "@/i18n/navigation";
import { toast } from "sonner";
import { copyToClipboard } from "@/lib/copy-to-clipboard";

export default function Toolbar({ items }: { items?: ButtonType[] }) {
  const renderButtonContent = (item: ButtonType) => (
    <span className="flex items-center gap-1">
      {item.icon && <Icon name={item.icon} />}
      {item.title}
    </span>
  );

  const handleCopy = useCallback(async (item: ButtonType) => {
    if (!item.copyText) {
      return;
    }

    const text = item.copyText;

    try {
      await copyToClipboard(text);
      toast.success(item.copySuccessMessage || "Copied");
    } catch (error) {
      console.error("Copy failed", error);
      toast.error(item.copyFailureMessage || "Copy failed");
    }
  }, []);

  return (
    <div className="flex space-x-4 mb-8">
      {items?.map((item, idx) => {
        if (item.copyText) {
          return (
            <Button
              key={idx}
              variant={item.variant}
              size="sm"
              className={item.className}
              type="button"
              onClick={() => handleCopy(item)}
            >
              {renderButtonContent(item)}
            </Button>
          );
        }

        if (item.url) {
          return (
            <Button
              key={idx}
              variant={item.variant}
              size="sm"
              className={item.className}
              asChild
            >
              <Link href={item.url as any} target={item.target}>
                {renderButtonContent(item)}
              </Link>
            </Button>
          );
        }

        return (
          <Button
            key={idx}
            variant={item.variant}
            size="sm"
            className={item.className}
            disabled
          >
            {renderButtonContent(item)}
          </Button>
        );
      })}
    </div>
  );
}
