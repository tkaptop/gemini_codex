import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { newsArticles } from "@/data/news";
import { SEO_BRAND, DEFAULT_SEO_DESCRIPTION, withSeoBrand } from "@/lib/branding";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  const siteUrl =
    process.env.NEXT_PUBLIC_WEB_URL || "https://www.gempix2.site";
  const isDefaultLocale = locale === "en" || locale === "en-US";
  const basePath = isDefaultLocale ? "" : `/${locale}`;
  const canonicalUrl = `${siteUrl}${basePath}/news`;

  const rawTitle = "Gemini 3 News & Updates";
  const rawDescription =
    "Updates, release notes, and deeper analysis around Gemini 3 and Gemini 3.0 — curated for developers and creators.";

  const title = withSeoBrand(rawTitle) || `${SEO_BRAND} News`;
  const description = withSeoBrand(rawDescription) || DEFAULT_SEO_DESCRIPTION;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
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

export default async function NewsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const articles = [...newsArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <header className="mb-8">
        <p className="text-sm font-medium text-primary mb-2">Gemini 3 · Updates</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Gemini 3 News &amp; Release Notes
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-4">
          A curated stream of updates and deeper analysis around Gemini 3, Gemini 3.0,
          and the Gempix2 (Nano Banana 2) image model. Use these articles to stay
          informed and adjust your own prompts, workflows, and integrations.
        </p>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>
            <span className="font-semibold text-foreground">How to use this page:</span>{" "}
            browse the articles below when you want deeper context or a permanent link
            to a specific update. For a quick snapshot of the latest changes, check the
            home page, which highlights the most recent stories.
          </p>
          <p>
            When you see an update that inspires you, head to the{" "}
            <Link href="/prompts" className="text-primary hover:underline">
              prompt library
            </Link>{" "}
            or send prompts straight to{" "}
            <a
              href="https://www.gempix2.site/?utm_source=gemini.studio&utm_medium=news_page&utm_campaign=gemini3_seo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              gempix2.site
            </a>
            {" "}to try them out.
          </p>
        </div>
      </header>

      <div className="space-y-6">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-colors"
          >
            <div className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}{" "}
                {article.category ? `· ${article.category}` : null}
              </p>
              <h2 className="text-xl font-semibold">
                <Link
                  href={`/news/${article.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="text-sm text-muted-foreground">
                {article.description}
              </p>
              <div className="mt-2">
                <Link
                  href={`/news/${article.slug}`}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Read article →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
