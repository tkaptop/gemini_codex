import { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { newsArticles } from "@/data/news";
import { getPrompts, type Prompt } from "@/lib/prompts";
import {
  DEFAULT_SEO_DESCRIPTION,
  SEO_BRAND,
  withSeoBrand,
} from "@/lib/branding";

type Params = { locale: string; slug: string };

export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    locale: "en",
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = newsArticles.find((item) => item.slug === slug);
  if (!article) {
    return {};
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_WEB_URL || "https://www.gempix2.site";
  const isDefaultLocale = locale === "en" || locale === "en-US";
  const basePath = isDefaultLocale ? "" : `/${locale}`;
  const canonicalUrl = `${siteUrl}${basePath}/news/${article.slug}`;

  const rawTitle = article.title;
  const rawDescription =
    article.description ||
    "In-depth update and analysis for Gemini 3 and Gemini 3.0.";

  const title = withSeoBrand(rawTitle) || `${SEO_BRAND} News`;
  const description = withSeoBrand(rawDescription) || DEFAULT_SEO_DESCRIPTION;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = newsArticles.find((item) => item.slug === slug);
  if (!article) {
    notFound();
  }

  // 为每篇文章推荐一小部分 Prompt，用于引导到 Prompt 页和 gempix2
  let recommendedPrompts: Prompt[] = [];
  try {
    const promptsData = await getPrompts();
    recommendedPrompts = promptsData.items.slice(0, 3);
  } catch (error) {
    console.error("Failed to load prompts for news article page:", error);
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
          {new Date(article.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}{" "}
          {article.category ? `· ${article.category}` : null}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          {article.title}
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
          {article.description}
        </p>
      </header>

      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
        {article.body.map((block, index) => {
          if (block.type === "heading" && block.text) {
            return (
              <h2 key={index} className="text-xl font-semibold mt-6 mb-3">
                {block.text}
              </h2>
            );
          }

          if (block.type === "paragraph" && block.text) {
            return (
              <p key={index} className="text-muted-foreground">
                {block.text}
              </p>
            );
          }

          if (block.type === "list" && block.items) {
            return (
              <ul key={index} className="list-disc list-inside space-y-1">
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          }

          return null;
        })}
      </div>

      {/* 推荐 Prompt，用于从资讯转化到 Prompt 页和 gempix2 */}
      {recommendedPrompts.length > 0 && (
        <section className="mt-10 border-t border-border pt-6">
          <h2 className="text-lg md:text-xl font-semibold mb-3">
            Try these Gemini 3-friendly prompts
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            If this update gave you ideas, here are a few prompts you can start with.
            You can inspect them in the prompt library or send them straight to gempix2.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {recommendedPrompts.map((prompt) => {
              const mainPrompt = prompt.prompts?.[0] || "";
              const identifier =
                prompt.seoSlug || prompt.slug || prompt.id.toString();

              const promptDetailUrl =
                locale === "en"
                  ? `/prompts?prompt=${encodeURIComponent(identifier)}`
                  : `/${locale}/prompts?prompt=${encodeURIComponent(
                      identifier,
                    )}`;

              const gempixUrl = (() => {
                const baseUrl = "https://www.gempix2.site";
                const url = new URL(baseUrl);
                if (mainPrompt) {
                  url.searchParams.set("prompt", mainPrompt);
                }
                url.searchParams.set("utm_source", "gemini.studio");
                url.searchParams.set("utm_medium", "news_article_prompt");
                url.searchParams.set("utm_campaign", "gemini3_seo");
                return url.toString();
              })();

              return (
                <article
                  key={prompt.id}
                  className="rounded-xl border border-border bg-card p-3 flex flex-col justify-between"
                >
                  <div className="mb-3">
                    <p className="text-[11px] text-muted-foreground mb-1">
                      #{prompt.id}
                    </p>
                    <h3 className="text-sm font-semibold line-clamp-2 mb-1">
                      {prompt.title}
                    </h3>
                    {prompt.tags.length > 0 && (
                      <p className="text-[11px] text-muted-foreground line-clamp-1">
                        {prompt.tags.slice(0, 2).join(", ")}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 mt-auto">
                    <Link
                      href={promptDetailUrl}
                      className="inline-flex items-center justify-center rounded-md border border-border px-2.5 py-1.5 text-[11px] font-medium hover:border-primary hover:text-primary transition-colors"
                    >
                      View in prompt library
                    </Link>
                    <a
                      href={gempixUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-2.5 py-1.5 text-[11px] font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Generate on gempix2
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      <footer className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <span>Looking for more Gemini 3 resources? </span>
          <Link
            href="/gemini-3"
            className="text-primary font-medium hover:underline"
          >
            Read the Gemini 3 guide
          </Link>
          <span>{" or "}</span>
          <Link
            href="/guides/image-generation"
            className="text-primary font-medium hover:underline"
          >
            explore image generation workflows
          </Link>
          .
        </div>
        <div>
          <Link href="/news" className="text-primary hover:underline">
            ← Back to all news
          </Link>
        </div>
      </footer>
    </div>
  );
}
