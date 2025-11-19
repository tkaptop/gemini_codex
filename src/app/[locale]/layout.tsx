import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/providers/theme";
import {
  DEFAULT_SEO_DESCRIPTION,
  SEO_BRAND,
  withSeoBrand,
  withSeoKeywords,
} from "@/lib/branding";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const defaultTitle = withSeoBrand(t("metadata.title")) || SEO_BRAND;
  const description =
    withSeoBrand(t("metadata.description")) || DEFAULT_SEO_DESCRIPTION;
  const keywords = withSeoKeywords(t("metadata.keywords"));

  return {
    title: {
      template: `%s`,
      default: defaultTitle,
    },
    description,
    keywords,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>{children}</ThemeProvider>
    </NextIntlClientProvider>
  );
}
