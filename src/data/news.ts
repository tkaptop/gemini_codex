export type NewsArticle = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date string
  category?: string;
  tags?: string[];
  body: { type: "heading" | "paragraph" | "list"; text?: string; items?: string[] }[];
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "gemini-3-0-release-overview",
    title: "Gemini 3.0 Release Overview: What Changed from Gemini 1.5",
    description:
      "A high-level look at Gemini 3.0 and how it improves on Gemini 1.5 in reasoning, tooling, and multimodal workflows.",
    date: "2025-01-15",
    category: "Releases",
    tags: ["Gemini 3.0", "release", "overview"],
    body: [
      {
        type: "heading",
        text: "From Gemini 1.5 to Gemini 3.0",
      },
      {
        type: "paragraph",
        text:
          "Gemini 1.5 introduced the idea of ultra-long context windows and strong multimodal reasoning. Gemini 3.0 builds on that foundation with better instruction following, more consistent tool use, and improved performance on complex multi-step tasks.",
      },
      {
        type: "paragraph",
        text:
          "In practice, this means Gemini 3.0 is better at staying on topic over long conversations, handling structured data, and coordinating external tools such as code runners, search APIs, and image generators.",
      },
      {
        type: "heading",
        text: "What Gemini 3.0 changes for developers",
      },
      {
        type: "list",
        items: [
          "More reliable tool calls: arguments are more consistent, with fewer hallucinated parameters.",
          "Improved code understanding: better at reading large codebases and suggesting targeted changes.",
          "Stronger long-context reasoning: easier to run multi-document analyses and research-style workflows.",
        ],
      },
      {
        type: "paragraph",
        text:
          "If you already have a Gemini 1.5 integration, most migration work focuses on model names, evaluating cost/latency trade-offs, and updating guardrails or safety configurations.",
      },
    ],
  },
  {
    slug: "gemini-3-image-generation-patterns",
    title: "Gemini 3 Image Generation Patterns for Better Consistency",
    description:
      "Practical prompt patterns you can use with Gemini 3-driven image workflows to get more consistent characters and scenes.",
    date: "2025-02-03",
    category: "Image Generation",
    tags: ["Gemini 3", "image generation", "prompts"],
    body: [
      {
        type: "heading",
        text: "Why prompt structure matters",
      },
      {
        type: "paragraph",
        text:
          "When you combine Gemini 3 with a dedicated image model, the way you structure prompts has a huge impact on character consistency and scene coherence. Clear separation between subject, style, composition, and constraints makes it easier for both models to align on what you want.",
      },
      {
        type: "paragraph",
        text:
          "A reliable pattern is to start with the subject, then describe the scene, then specify camera and lighting, and finally add hard constraints like aspect ratio or brand colors.",
      },
      {
        type: "heading",
        text: "Example pattern",
      },
      {
        type: "list",
        items: [
          "Subject: who or what is the focus of the image.",
          "Scene: where it takes place and what is happening.",
          "Style: illustration vs photo, color palette, level of detail.",
          "Camera: shot type, lens feel, and composition.",
          "Constraints: aspect ratio, brand colors, or forbidden elements.",
        ],
      },
      {
        type: "paragraph",
        text:
          "For step-by-step workflows and more prompt templates, see the dedicated Gemini 3 image generation guide on this site.",
      },
    ],
  },
  {
    slug: "gemini-3-api-best-practices",
    title: "Gemini 3 API Best Practices for Production Apps",
    description:
      "A quick checklist for using Gemini 3 in production, covering safety, latency, and observability.",
    date: "2025-02-20",
    category: "Developers",
    tags: ["Gemini 3", "API", "best practices"],
    body: [
      {
        type: "heading",
        text: "Think in flows, not single prompts",
      },
      {
        type: "paragraph",
        text:
          "Production Gemini 3 apps usually rely on multi-step flows: classification → planning → tool calls → final drafting. Designing the flow explicitly makes it easier to debug, evaluate, and iterate.",
      },
      {
        type: "heading",
        text: "Key things to monitor",
      },
      {
        type: "list",
        items: [
          "Latency per step and per user-visible action.",
          "Failure modes for tool calls or external APIs.",
          "Safety outcomes: blocked prompts, red-team logs, and user reports.",
        ],
      },
      {
        type: "paragraph",
        text:
          "Treat prompts and system instructions as first-class configuration. Version them, review them, and roll out changes gradually like any other production dependency.",
      },
    ],
  },
  {
    slug: "gempix2-gemini-3-pro-image-overview",
    title: "Gempix2 (Nano Banana 2): Gemini 3 Pro Image Model Explained",
    description:
      "How Gempix2 – also known as \"Nano Banana 2\" and GEMPIX2 – connects to Gemini 3 Pro and what it actually offers for image generation.",
    date: "2025-11-18",
    category: "Image Generation",
    tags: ["Gempix2", "Nano Banana 2", "Gemini 3 Pro Image"],
    body: [
      {
        type: "heading",
        text: "One model, three names: Gempix2, Nano Banana 2, GEMPIX2",
      },
      {
        type: "paragraph",
        text:
          "Early leaks and internal documentation point to Gempix2, Nano Banana 2 and GEMPIX2 as three labels for the same underlying product: a Gemini 3 Pro–powered image model sometimes described as \"Gemini 3.0 Pro Image\". In other words, when people talk about Nano Banana 2, they are usually talking about Gempix2 running on top of Gemini 3 Pro.",
      },
      {
        type: "paragraph",
        text:
          "The model sits alongside text-only Gemini 3 variants, but is optimised specifically for high-quality image generation. It inherits the reasoning and instruction-following improvements from Gemini 3 Pro, then applies them to prompts that control composition, style, typography and multi-image fusion.",
      },
      {
        type: "heading",
        text: "What Gempix2 is designed to do",
      },
      {
        type: "list",
        items: [
          "Professional-grade output: native 2K rendering with a clean path to true 4K images suitable for print and broadcast use.",
          "Fast iteration: complex prompts return results in roughly 1–15 seconds in early testing, making it viable for creative workflows.",
          "Wide aspect ratio support: 1:1, 2:3, 3:2, 3:4, 4:3, 9:16, 16:9, 21:9 and more.",
          "Stronger text rendering: especially for CJK languages (Chinese, Japanese, Korean), which historically have been hard for image models.",
          "Culture-aware visuals: prompts like “a spring picnic in Tokyo” can pick up more realistic local visual details.",
        ],
      },
      {
        type: "heading",
        text: "No video yet, but the roadmap is clear",
      },
      {
        type: "paragraph",
        text:
          "Documentation suggests that Gempix2 is currently focused on still images. Video generation appears on a 2026 roadmap, with hints that the underlying architecture is being prepared for time-consistent short clips and frame-by-frame editing. For now, the sweet spot is high-quality single frames, infographics and multi-image compositions.",
      },
      {
        type: "paragraph",
        text:
          "If you mainly care about turning text and reference images into sharp, culturally-aware visuals, Gempix2 is the part of the Gemini 3 ecosystem you should be looking at. This site focuses on prompts and workflows that map well to those strengths, and you can send them directly to gempix2.site when you are ready to generate.",
      },
    ],
  },
  {
    slug: "gempix2-10-image-fusion-and-cjk-text",
    title: "Why Gempix2’s 10-Image Fusion and CJK Text Rendering Matter",
    description:
      "A closer look at two standout features of the Gempix2 / Nano Banana 2 model: 10-image fusion and stronger CJK text rendering.",
    date: "2025-11-18",
    category: "Image Generation",
    tags: ["Gempix2", "Nano Banana 2", "CJK", "10-image fusion"],
    body: [
      {
        type: "heading",
        text: "10-image fusion for complex compositions",
      },
      {
        type: "paragraph",
        text:
          "Most image models struggle once you ask them to combine more than a couple of references. Gempix2’s 10-image fusion capability is designed to go further: you can feed in up to ten input images and use text prompts to control how they are combined.",
      },
      {
        type: "paragraph",
        text:
          "In practice, this opens up workflows like moodboards-to-final, multi-character posters, product collages and visual A/B tests. Instead of manually compositing assets in a design tool, you can let the model propose coherent layouts that respect your references.",
      },
      {
        type: "list",
        items: [
          "Brand collages: combine product shots, logos and lifestyle photos into a single on-brand image.",
          "Character line-ups: align multiple characters with consistent style and lighting across a series of scenes.",
          "Storyboard beats: feed in rough sketches or stills and ask Gempix2 to produce polished frames.",
        ],
      },
      {
        type: "heading",
        text: "CJK text rendering for real-world marketing",
      },
      {
        type: "paragraph",
        text:
          "Another standout capability is improved rendering of Chinese, Japanese and Korean text. Earlier models often produced broken or unreadable characters; Gempix2’s training and architecture focus specifically on making CJK text usable for real marketing and product work.",
      },
      {
        type: "paragraph",
        text:
          "That does not mean every generated poster is perfect out of the box, but it does mean you can realistically use the model for banners, social graphics and ad creatives that feature CJK copy, instead of treating text as something you always have to add manually afterwards.",
      },
      {
        type: "heading",
        text: "How to take advantage of these features",
      },
      {
        type: "list",
        items: [
          "Design prompts that clearly separate layout, imagery and text, so Gemini 3 Pro and Gempix2 can coordinate their roles.",
          "Use the prompt library on this site as a starting point, especially the ones tuned for collages and posters.",
          "When you are ready to try for real, send the prompts directly to gempix2.site and iterate visually.",
        ],
      },
    ],
  },
  {
    slug: "gemini-3-image-workflows-with-gempix2",
    title: "How Gemini 3 and Gempix2 Work Together in Image Workflows",
    description:
      "Gemini 3 handles planning and reasoning; Gempix2 (Nano Banana 2) handles pixels. Here is how to wire them together in practice.",
    date: "2025-11-18",
    category: "Workflows",
    tags: ["Gemini 3", "Gempix2", "workflows"],
    body: [
      {
        type: "heading",
        text: "Think of Gemini 3 as the director, Gempix2 as the camera",
      },
      {
        type: "paragraph",
        text:
          "Gemini 3 and Gempix2 are built to complement each other. Gemini 3 shines at understanding briefs, analysing references and planning multi-step flows; Gempix2 shines at turning a well-structured prompt plus images into actual pixels.",
      },
      {
        type: "paragraph",
        text:
          "A productive way to think about them is: Gemini 3 is the director and editor, while Gempix2 is the camera and render engine. You rarely want the director to also be your camera.",
      },
      {
        type: "heading",
        text: "A simple four-step pattern",
      },
      {
        type: "list",
        items: [
          "Brief and analysis: describe your campaign, product or story to Gemini 3 and ask it to propose several visual directions.",
          "Prompt drafting: have Gemini 3 expand your favourite directions into structured prompts (subject, scene, style, camera, constraints).",
          "Image generation: send those prompts, plus any reference images, to Gempix2 via a tool like gempix2.site.",
          "Review and refinement: bring the outputs back into Gemini 3 for critique and targeted iteration prompts.",
        ],
      },
      {
        type: "heading",
        text: "Where this site fits in",
      },
      {
        type: "paragraph",
        text:
          "Gemini Studio exists to sit between the two: we track Gemini 3 and Gempix2 updates, document concrete workflows, and maintain a library of prompts that work well with the models in practice. When you see a prompt you like, you can send it straight to gempix2.site and start generating.",
      },
    ],
  },
];
