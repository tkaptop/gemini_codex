import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return {
    title: "Gemini 3.0 Explained: What’s New and How to Use It",
    description: "A straightforward breakdown of Gemini 3.0: what changed, which upgrades matter in practice, and how to start using Gemini 3.0 for coding, writing, and creative work.",
    keywords: "Gemini 3.0, Gemini 3.0 features, Gemini 3.0 release, Gemini 3.0 vs Gemini 1.5, Nano Banana Pro"
  };
}

export default async function Gemini30Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-12">
        <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
          Latest Release
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Gemini 3.0 Explained
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Everything you need to know about Google's latest AI model update. Performance, features, and how it changes the game for developers and creators.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-16">
        <div className="col-span-2">
          <h2 className="text-2xl font-bold mb-6">What's New in Gemini 3.0?</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-2 rounded-full h-fit">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Enhanced Context Window</h3>
                <p className="text-muted-foreground">Gemini 3.0 supports up to 2 million tokens, allowing for processing of entire books, large codebases, or hours of video in a single prompt.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-2 rounded-full h-fit">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Faster Inference</h3>
                <p className="text-muted-foreground">Optimized architecture delivers responses 2x faster than Gemini 1.5 Pro, making it viable for real-time applications.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-2 rounded-full h-fit">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Native Agentic Capabilities</h3>
                <p className="text-muted-foreground">Designed to use tools and browse the web more effectively, acting as a true autonomous agent for complex workflows.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-1">
          <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              Pro Tip
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Gemini 3.0's image understanding is top-tier, but for <strong>image generation</strong>, dedicated tools often offer better control.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-sm mb-1">Nano Banana Pro</h4>
              <p className="text-xs text-muted-foreground mb-3">Best for high-quality, controllable AI art.</p>
              <a 
                href="https://www.gempix2.site/?utm_source=gemini.studio&utm_medium=gemini30_sidebar&utm_campaign=gemini3_seo"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-primary text-primary-foreground text-center py-2 rounded-md text-xs font-medium hover:bg-primary/90 transition-colors"
              >
                Try it now
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Gemini 3.0 vs Gemini 1.5 Pro</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Feature</th>
                <th className="text-left py-4 px-4 font-bold text-primary">Gemini 3.0</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Gemini 1.5 Pro</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-4 px-4 font-medium">Context Window</td>
                <td className="py-4 px-4 text-primary">2M+ Tokens</td>
                <td className="py-4 px-4 text-muted-foreground">1M Tokens</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-4 px-4 font-medium">Multimodal</td>
                <td className="py-4 px-4 text-primary">Native (Audio/Video/Image)</td>
                <td className="py-4 px-4 text-muted-foreground">Native</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-4 px-4 font-medium">Reasoning Score</td>
                <td className="py-4 px-4 text-primary">94.2% (MMLU)</td>
                <td className="py-4 px-4 text-muted-foreground">81.9% (MMLU)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-4 px-4 font-medium">Code Generation</td>
                <td className="py-4 px-4 text-primary">State-of-the-art</td>
                <td className="py-4 px-4 text-muted-foreground">Excellent</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="text-center mt-20 pt-10 border-t border-border">
        <h2 className="text-2xl font-bold mb-4">Start Building with Gemini 3.0</h2>
        <p className="text-muted-foreground mb-8">
          Whether you're coding, writing, or creating art, Gemini 3.0 is the engine. For the best image tools, don't forget to check out Nano Banana Pro.
        </p>
        <div className="flex justify-center gap-4">
           <a 
            href="https://www.gempix2.site/?utm_source=gemini.studio&utm_medium=gemini30_bottom&utm_campaign=gemini3_seo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Launch Nano Banana Pro
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
