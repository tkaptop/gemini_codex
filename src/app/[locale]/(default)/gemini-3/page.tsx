import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Sparkles, Zap, Image as ImageIcon } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return {
    title: "What Is Gemini 3? Features, Models, and Real-World Use Cases",
    description: "A clear, practical guide to Gemini 3: what it is, how it compares to earlier Gemini models, what it can do, and how to start using it in real projects.",
    keywords: "Gemini 3, Gemini 3 features, Gemini 3 guide, Gemini 3 image generator, Nano Banana Pro"
  };
}

export default async function Gemini3Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          What Is Gemini 3?
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The next generation of multimodal AI. Understand the features, capabilities, and how to use Gemini 3 for text, code, and images.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-16">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Unmatched Speed & Reasoning</h2>
          <p className="text-muted-foreground">
            Gemini 3 introduces a new architecture that significantly reduces latency while improving reasoning capabilities for complex tasks like coding and math.
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold mb-3">True Multimodal Native</h2>
          <p className="text-muted-foreground">
            Built from the ground up to understand and generate text, images, audio, and video seamlessly. It's not just a text model with add-ons.
          </p>
        </div>
      </div>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Gemini 3 for Image Generation</h2>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 border border-border">
          <div className="md:flex items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-4">Looking for a Gemini-grade Image Generator?</h3>
              <p className="text-muted-foreground mb-6">
                While Gemini 3 powers many backend systems, if you want a direct, user-friendly interface to generate high-quality AI images using the latest stack, we recommend <strong>Nano Banana Pro</strong>.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span>2K/4K Upscaling</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span>Superior Text Rendering</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span>Easy-to-use Interface</span>
                </li>
              </ul>
              <a 
                href="https://www.gempix2.site/?utm_source=gemini.studio&utm_medium=gemini3_page&utm_campaign=gemini3_seo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <ImageIcon className="w-5 h-5" />
                Try Nano Banana Pro
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="hidden md:block w-1/3">
               {/* Placeholder for an image or illustration */}
               <div className="aspect-square bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-xl flex items-center justify-center border border-white/10">
                  <Sparkles className="w-16 h-16 text-foreground/20" />
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Key Capabilities</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-6 py-2">
            <h3 className="text-xl font-semibold mb-2">Advanced Coding</h3>
            <p className="text-muted-foreground">Gemini 3 understands complex codebases and can refactor, debug, and generate code across multiple languages with higher accuracy than previous versions.</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-6 py-2">
            <h3 className="text-xl font-semibold mb-2">Creative Writing</h3>
            <p className="text-muted-foreground">With an expanded context window and improved nuance, Gemini 3 excels at long-form content creation, storytelling, and scriptwriting.</p>
          </div>
          <div className="border-l-4 border-pink-500 pl-6 py-2">
            <h3 className="text-xl font-semibold mb-2">Data Analysis</h3>
            <p className="text-muted-foreground">Upload spreadsheets or datasets, and Gemini 3 can visualize trends, extract insights, and generate reports in seconds.</p>
          </div>
        </div>
      </section>

      <div className="text-center mt-20 pt-10 border-t border-border">
        <h2 className="text-2xl font-bold mb-4">Ready to explore more?</h2>
        <div className="flex justify-center gap-4">
          <Link href="/gemini-3-0" className="text-primary hover:underline">Check out Gemini 3.0 Features</Link>
          <span className="text-muted-foreground">•</span>
          <Link href="/prompts" className="text-primary hover:underline">Browse Prompt Library</Link>
        </div>
      </div>
    </div>
  );
}
