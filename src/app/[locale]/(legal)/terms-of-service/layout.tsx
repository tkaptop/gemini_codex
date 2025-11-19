import { Metadata } from "next";
import {
  DEFAULT_SEO_DESCRIPTION,
  SEO_BRAND,
  withSeoBrand,
  withSeoKeywords,
} from "@/lib/branding";

const canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/terms-of-service`;
const baseTitle = "Terms of Service - Gempix2 ORG";
const baseDescription =
  "Terms of Service for Gempix2 AI image editing platform. Understand your rights and responsibilities when using our AI-powered image generation services.";

const title = withSeoBrand(baseTitle) || `${SEO_BRAND} Terms of Service`;
const description =
  withSeoBrand(baseDescription) || DEFAULT_SEO_DESCRIPTION;
const keywords = withSeoKeywords(["terms of service"]);

export const metadata: Metadata = {
  title,
  description,
  keywords,
  robots: "index, follow",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: canonicalUrl,
    siteName: SEO_BRAND,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
