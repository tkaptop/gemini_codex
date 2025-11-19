"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import {
  getAllTags,
  filterPrompts,
  getRelatedPrompts,
  type PromptsData,
  type Prompt,
} from "@/lib/prompts";
import { PromptCard } from "./PromptCard";
import { PromptFilter } from "./PromptFilter";
import { PromptSearch } from "./PromptSearch";
import PromptsSchema from "@/components/schema/prompts-schema";

// Modal 体积较大，使用动态导入，避免影响首屏 JS 体积和 TBT
const PromptModal = dynamic(
  () => import("./PromptModal").then((mod) => mod.PromptModal),
  {
    ssr: false,
  }
);

interface PromptGalleryProps {
  initialData: PromptsData;
}

export function PromptGallery({ initialData }: PromptGalleryProps) {
  const [data] = useState<PromptsData | null>(initialData);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  const t = useTranslations("prompts");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const promptParamKey = "prompt";

  // 获取所有标签
  const allTags = useMemo(() => {
    if (!data) return [];
    return getAllTags(data);
  }, [data]);

  // 筛选后的提示词
  const filteredItems = useMemo(() => {
    if (!data) return [];
    return filterPrompts(data.items, searchTerm, selectedTags);
  }, [data, searchTerm, selectedTags]);

  const getPromptIdentifier = useCallback((prompt: Prompt) => {
    return prompt.seoSlug || prompt.slug || prompt.id.toString();
  }, []);

  const buildUrlWithPrompt = useCallback((promptIdentifier?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (promptIdentifier) {
      params.set(promptParamKey, promptIdentifier);
    } else {
      params.delete(promptParamKey);
    }
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  const syncPromptFromUrl = useCallback(() => {
    if (!data) {
      return;
    }
    const identifier = searchParams.get(promptParamKey);
    if (!identifier) {
      setSelectedPrompt(null);
      return;
    }

    const match = data.items.find(item =>
      item.id.toString() === identifier ||
      item.slug === identifier ||
      item.seoSlug === identifier
    );

    setSelectedPrompt(match || null);
  }, [data, searchParams]);

  useEffect(() => {
    syncPromptFromUrl();
  }, [syncPromptFromUrl]);

  // 计算当前选中 prompt 的 navigation 和 related prompts
  const modalData = useMemo(() => {
    if (!selectedPrompt || !data) {
      return null;
    }

    const filteredList = filteredItems.length > 0 ? filteredItems : data.items;
    let currentIndex = filteredList.findIndex(item => item.id === selectedPrompt.id);
    let navigationSource = filteredList;

    if (currentIndex === -1) {
      navigationSource = data.items;
      currentIndex = navigationSource.findIndex(item => item.id === selectedPrompt.id);
    }

    const navigation = {
      prev: currentIndex > 0 ? navigationSource[currentIndex - 1] : null,
      next: currentIndex >= 0 && currentIndex < navigationSource.length - 1 ? navigationSource[currentIndex + 1] : null,
    };

    const relatedPrompts = getRelatedPrompts(data, selectedPrompt, 5);

    return { navigation, relatedPrompts };
  }, [selectedPrompt, data, filteredItems]);

  const handleOpenPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    const shouldPush = !searchParams.get(promptParamKey);
    const targetUrl = buildUrlWithPrompt(getPromptIdentifier(prompt));

    if (shouldPush) {
      router.push(targetUrl, { scroll: false });
    } else {
      router.replace(targetUrl, { scroll: false });
    }
  };

  const handleCloseModal = (options?: { skipHistory?: boolean }) => {
    setSelectedPrompt(null);
    const hasPromptParam = Boolean(searchParams.get(promptParamKey));

    if (hasPromptParam) {
      router.replace(buildUrlWithPrompt(undefined), { scroll: false });
    }

    if (options?.skipHistory) {
      return;
    }
  };

  const handleNavigate = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    router.replace(buildUrlWithPrompt(getPromptIdentifier(prompt)), { scroll: false });
  };

  return (
    <>
      {data && (
        <PromptsSchema totalPrompts={data.total} locale={locale} />
      )}
      <div className="space-y-6">
        {/* 搜索和筛选 */}
        <div className="space-y-4">
          <PromptSearch value={searchTerm} onChange={setSearchTerm} />

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {t("gallery.stats", {
                count: filteredItems.length,
                total: data?.total || 0,
              })}
            </p>
          </div>

          <PromptFilter
            tags={allTags}
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
          />
        </div>

        {/* 画廊网格 */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('gallery.empty')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(prompt => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                // 提前加载首屏的前几个卡片图片，改善 LCP
                priority={filteredItems.length > 0 && filteredItems[0].id === prompt.id}
                onClick={() => handleOpenPrompt(prompt)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 模态框 */}
      {selectedPrompt && modalData && (
      <PromptModal
        prompt={selectedPrompt}
        relatedPrompts={modalData.relatedPrompts}
        navigation={modalData.navigation}
        onClose={handleCloseModal}
          onNavigate={handleNavigate}
        />
      )}
    </>
  );
}
