import GeminiHero from "@/components/home/gemini-hero";
import {
  DEFAULT_SEO_DESCRIPTION,
  SEO_BRAND,
  withSeoBrand,
  withSeoKeywords,
} from "@/lib/branding";
import { getLandingPage } from "@/services/page";
import { newsArticles } from "@/data/news";
import { getPrompts, type Prompt } from "@/lib/prompts";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || "https://www.gempix2.site";
  let canonicalUrl = baseUrl;

  if (locale !== "en") {
    canonicalUrl = `${baseUrl}/${locale}`;
  }

  const title = withSeoBrand(t("metadata.title")) || SEO_BRAND;
  const description =
    withSeoBrand(t("metadata.description")) || DEFAULT_SEO_DESCRIPTION;
  const keywords = withSeoKeywords(t("metadata.keywords"));

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

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = await getLandingPage(locale);

   // 精选 Prompt：只取最新的几条，如果加载失败则优雅降级
  let featuredPrompts: Prompt[] = [];
  try {
    const promptsData = await getPrompts();
    featuredPrompts = promptsData.items.slice(0, 6);
  } catch (error) {
    console.error("Failed to load featured prompts for home page:", error);
  }

  return (
    <>
      <GeminiHero />

      {/* Latest Updates Section */}
      {newsArticles.length > 0 && (
        <section id="news" className="py-12 border-b border-border/60">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Latest Gemini 3 Updates
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Stay on top of the most important Gemini 3 and Gemini 3.0 changes,
              with a quick note on what each update means for real-world use.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {newsArticles
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .slice(0, 3)
                .map((article) => (
                  <article
                    key={article.slug}
                    className="rounded-xl border border-border bg-card p-4 hover:border-primary/60 hover:shadow-md transition-colors"
                  >
                    <p className="text-xs text-muted-foreground mb-1">
                      {new Date(article.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      {article.category ? ` · ${article.category}` : ""}
                    </p>
                    <h3 className="text-sm font-semibold mb-1">
                      <Link
                        href={`/news/${article.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-3 mb-2">
                      {article.description}
                    </p>
                    <Link
                      href={`/news/${article.slug}`}
                      className="text-[11px] font-medium text-primary hover:underline"
                    >
                      Read more →
                    </Link>
                  </article>
                ))}
            </div>
            <div className="mt-4">
              <Link
                href="/news"
                className="text-sm font-medium text-primary hover:underline"
              >
                View all Gemini 3 news →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Recommended Tools Section */}
      <section id="tools" className="py-12 border-b border-border/60">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Recommended AI Tools
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Ready to create? These tools are optimized for the Gemini 3 ecosystem.
            We highly recommend <strong>Nano Banana Pro</strong> for the best AI image generation experience.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <a
              href="https://www.gempix2.site/?utm_source=gemini.studio&utm_medium=home_tools&utm_campaign=gemini3_seo"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border border-primary/20 bg-gradient-to-br from-card to-primary/5 p-6 hover:border-primary/60 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold group-hover:text-primary">
                  Nano Banana Pro
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-primary/10 text-primary rounded-full">RECOMMENDED</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                The ultimate Gemini 3 Pro–powered image generator. 
                Features 2K/4K upscaling, 10-image fusion, and superior text rendering.
              </p>
              <p className="text-xs font-medium text-primary group-hover:underline flex items-center gap-1">
                Try Nano Banana Pro <span className="text-lg">→</span>
              </p>
            </a>
            
            <a
              href="https://sora-2.tools/?utm_source=gemini.studio&utm_medium=home_tools&utm_campaign=gemini3_seo"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border border-border bg-card p-6 hover:border-primary/60 hover:shadow-md transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">
                Sora-2.tools
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                A curated hub for Sora 2–related tools and resources. 
                Perfect for turning your Gemini 3 stories into video.
              </p>
              <p className="text-xs font-medium text-primary group-hover:underline">
                Visit sora-2.tools →
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Prompts Section */}
      {featuredPrompts.length > 0 && (
        <section id="featured-prompts" className="py-12 border-b border-border/60">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Featured Gemini 3 Prompts
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              A selection of high-quality prompts to get you started with Gemini 3.
              Copy them or use them directly in Nano Banana Pro.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredPrompts.map((prompt) => {
                const mainPrompt = prompt.prompts?.[0] || "";
                const identifier =
                  prompt.seoSlug || prompt.slug || prompt.id.toString();

                const gempixUrl = (() => {
                  const baseUrl = "https://www.gempix2.site";
                  const url = new URL(baseUrl);
                  if (mainPrompt) {
                    url.searchParams.set("prompt", mainPrompt);
                  }
                  url.searchParams.set("utm_source", "gemini.studio");
                  url.searchParams.set("utm_medium", "home_featured_prompt");
                  url.searchParams.set("utm_campaign", "gemini3_seo");
                  return url.toString();
                })();

                const promptDetailUrl =
                  locale === "en"
                    ? `/prompts?prompt=${encodeURIComponent(identifier)}`
                    : `/${locale}/prompts?prompt=${encodeURIComponent(
                        identifier,
                      )}`;

                return (
                  <article
                    key={prompt.id}
                    className="rounded-xl border border-border bg-card flex flex-col overflow-hidden hover:border-primary/60 hover:shadow-md transition-colors"
                  >
                    <div className="relative aspect-square overflow-hidden bg-muted group">
                      <Image
                        src={prompt.coverImage}
                        alt={prompt.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    <div className="flex flex-col gap-2 p-4 mt-auto">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          #{prompt.id}
                        </p>
                        <h3 className="text-sm font-semibold mb-1 line-clamp-2">
                          {prompt.title}
                        </h3>
                        {prompt.tags.length > 0 && (
                          <p className="text-[11px] text-muted-foreground line-clamp-1">
                            {prompt.tags.slice(0, 3).join(", ")}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2 mt-2">
                        <Link
                          href={promptDetailUrl}
                          className="flex-1 inline-flex items-center justify-center rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:border-primary hover:text-primary transition-colors"
                        >
                          View Details
                        </Link>
                        <a
                          href={gempixUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                          Generate
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="mt-8 flex justify-center">
              <Link
                href="/prompts"
                className="inline-flex items-center justify-center rounded-full border border-border px-6 py-2.5 text-sm font-medium text-primary hover:border-primary hover:bg-primary/5 transition-colors"
              >
                View All Prompts
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
