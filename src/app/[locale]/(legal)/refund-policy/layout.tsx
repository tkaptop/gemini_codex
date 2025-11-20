import { Metadata } from "next";
import {
  DEFAULT_SEO_DESCRIPTION,
  SEO_BRAND,
  withSeoBrand,
  withSeoKeywords,
} from "@/lib/branding";

const canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/refund-policy`;
const baseTitle = "Refund Policy - Nano Banana 2 ORG";
const baseDescription =
  "Refund Policy for Nano Banana 2 AI image editing platform. Learn about our refund terms, eligibility conditions, and how to request a refund for your purchase.";

const title = withSeoBrand(baseTitle) || `${SEO_BRAND} Refund Policy`;
const description =
  withSeoBrand(baseDescription) || DEFAULT_SEO_DESCRIPTION;
const keywords = withSeoKeywords(["refund policy"]);

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

export default function RefundPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
