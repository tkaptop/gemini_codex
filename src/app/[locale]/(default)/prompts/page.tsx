import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { PromptGallery } from "./components/PromptGallery";
import { getPromptsPage } from "@/services/page";
import { loadPromptTitles } from "@/lib/prompt-titles";
import { getPrompts } from "@/lib/prompts";
import {
  DEFAULT_SEO_DESCRIPTION,
  SEO_BRAND,
  withSeoBrand,
  withSeoKeywords,
} from "@/lib/branding";
import { Link } from "@/i18n/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PromptDetailSchema } from "@/components/schema/prompt-detail-schema";

// 将 prompts 页面静态化，并使用 ISR 每小时自动刷新一次
// 如果你希望更新更频繁，可以把数值改小，例如 300（5 分钟）
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = await getPromptsPage(locale);
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || "https://www.gempix2.site";

  let canonicalUrl = `${baseUrl}/prompts`;
  if (locale !== "en") {
    canonicalUrl = `${baseUrl}/${locale}/prompts`;
  }

  const rawTitle = page.metadata?.title || "Prompt Gallery - Gempix2";
  const rawDescription =
    page.metadata?.description ||
    "Explore creative AI image generation prompts for the Gempix2 service that runs on the community-nicknamed \"Nano Banana 2\" stack. Browse curated prompt examples for character design, scenes, and artistic styles.";

  const title = withSeoBrand(rawTitle) || `${SEO_BRAND} Prompt Gallery`;
  const description = withSeoBrand(rawDescription) || DEFAULT_SEO_DESCRIPTION;
  const keywords = withSeoKeywords(page.metadata?.keywords);

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SEO_BRAND,
      locale: locale,
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-prompts.jpg`,
          width: 1200,
          height: 630,
          alt: `${SEO_BRAND} Prompt Gallery`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og-prompts.jpg`],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function PromptsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = await getPromptsPage(locale);
  const caseTitles = await loadPromptTitles(locale as any);
  // 预先在服务器端加载 Prompt 数据，这样初始 HTML 就包含完整画廊，
  // 避免首屏再在客户端发起一次额外请求（对 LCP / TBT 帮助较大）
  const promptsData = await getPrompts();
  // 提供默认英文值，如果某些语言缺少 tools 翻译
  const defaultTools = {
    ariaLabel: "Related AI tools",
    gemini3: "Gemini 3 AI Assistant",
    gemini30: "Gemini 3.0 Pro Features",
    imageGuide: "Image Generation Guide",
    compare: "Compare Gemini 3 vs GPT-4o",
  };

  const tools = {
    ariaLabel: (page.tools as any)?.ariaLabel ?? defaultTools.ariaLabel,
    gemini3: (page.tools as any)?.gemini3 ?? defaultTools.gemini3,
    gemini30: (page.tools as any)?.gemini30 ?? defaultTools.gemini30,
    imageGuide: (page.tools as any)?.imageGuide ?? defaultTools.imageGuide,
    compare: (page.tools as any)?.compare ?? defaultTools.compare,
  };

  // 为结构化数据生成一个固定的 gempix2 链接，用于表达「可在此处复现」
  const recreateUrl = "https://www.gempix2.site/?utm_source=gemini.studio&utm_medium=prompt_schema&utm_campaign=gemini3_seo";

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Schema.org 结构化数据 - 告诉搜索引擎每个 Prompt 的详细信息
          这些 <script> 标签用户看不见，但能让 Google 更好地理解内容 */}
      {promptsData.items.map((prompt) => (
        <PromptDetailSchema
          key={prompt.id}
          prompt={prompt}
          locale={locale}
          recreateUrl={recreateUrl}
        />
      ))}

      <div className="mb-8">
        {/* 面包屑：帮助搜索引擎理解页面层级，也方便用户返回首页 */}
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={locale === "en" ? "/" : `/${locale}`}>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Prompts</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">{page.hero.title}</h1>
          <p className="text-muted-foreground">{page.hero.description}</p>
        </div>
      </div>

      <NextIntlClientProvider
        locale={locale}
        messages={{
          prompts: page,
          caseTitles: caseTitles
        }}
      >
        <PromptGallery initialData={promptsData} />
      </NextIntlClientProvider>

      {/* 在 Prompts 页面底部增加指向核心 AI 工具的内部链接，
          提升爬虫发现重要功能页的效率，同时方便用户从提示词库直接跳转到对应工具 */}
      <section
        className="mt-12 border-t pt-8"
        aria-label={tools.ariaLabel}
      >
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
          <Link
            href="/gemini-3"
            className="text-primary hover:underline"
          >
            {tools.gemini3}
          </Link>
          <Link
            href="/gemini-3-0"
            className="text-primary hover:underline"
          >
            {tools.gemini30}
          </Link>
          <Link
            href="/guides/image-generation"
            className="text-primary hover:underline"
          >
            {tools.imageGuide}
          </Link>
          <Link
            href="/compare/gemini-3-vs-gpt-4o"
            className="text-primary hover:underline"
          >
            {tools.compare}
          </Link>
        </div>
      </section>

      {/* 推荐将提示词直接用于 Gempix2 进行图片生成 */}
      <section className="mt-8 text-center">
        <p className="text-sm text-muted-foreground mb-3">
          You can plug these Gemini 3-style prompts directly into a Gemini-grade image generator.
        </p>
        <a
          href="https://www.gempix2.site/?utm_source=gemini.studio&utm_medium=prompt_library&utm_campaign=gemini3_seo"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open gempix2.site and use these prompts →
        </a>
      </section>
    </div>
  );
}
