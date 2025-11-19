import { Metadata } from "next";
import {
  DEFAULT_SEO_DESCRIPTION,
  SEO_BRAND,
  withSeoBrand,
  withSeoKeywords,
} from "@/lib/branding";

const canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/privacy-policy`;
const baseTitle = "Privacy Policy - Gempix2 ORG";
const baseDescription =
  "Privacy Policy for Gempix2 AI image editing platform. Learn how we protect your data and creative content.";

const title = withSeoBrand(baseTitle) || `${SEO_BRAND} Privacy Policy`;
const description =
  withSeoBrand(baseDescription) || DEFAULT_SEO_DESCRIPTION;
const keywords = withSeoKeywords(["privacy policy"]);

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

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
