# Gemini.studio Website Plan (US / English Audience, Gemini 3 SEO)

## 1. Project Overview

- **Domain**: `gemini.studio`
- **Primary audience**: English-speaking users in the US (developers, AI enthusiasts, creators)
- **Core goals**:
  - **SEO**: Capture search traffic for `Gemini 3`, `Gemini 3.0` and related English long-tail queries.
  - **Traffic routing**: Channel users who care about Gemini 3 / 3.0 (especially for image generation) to `https://www.gempix2.site`.
- **Site role**:
  - An all-in-one **Gemini 3 / 3.0 guide + tutorials + comparisons + prompt library**.
  - Recommend `gempix2.site` as an easy-to-use **“Gemini-grade image generator”**.

---

## 2. Positioning & Audience

- **Language**: English, with `<html lang="en-US">`.
- **User types**:
  - US-based users searching for `Gemini 3 / Gemini 3.0 / Gemini 3 image generator / Gemini 3 prompts`.
  - Users who want to understand Gemini 3 capabilities and find real tools to use.
- **Value proposition**:
  - Help users quickly understand what Gemini 3 / 3.0 are, what they can do, and how to use them.
  - Provide practical tutorials, prompt templates, and comparison articles.
  - For high-intent “AI image generation” needs, provide a simple, actionable step: go to `gempix2.site`.

---

## 3. SEO Strategy & Keyword Plan

### 3.1 Core Keywords (per main page)

- **`Gemini 3`**
  - Primary page: `/gemini-3`
  - Supporting: `/` (homepage)
- **`Gemini 3.0`**
  - Primary page: `/gemini-3-0`
  - Supporting: `/`
- Combined terms:
  - `Google Gemini 3`, `Google Gemini 3.0` – appear naturally on homepage and both core pages.

### 3.2 High-Intent Long-Tail Keywords

**Concept / tutorial queries**
- `what is Gemini 3`
- `what is Gemini 3.0`
- `how to use Gemini 3`
- `how to use Gemini 3.0`
- `Gemini 3.0 release`
- `Gemini 3.0 features`
- `Gemini 3 API tutorial`

**Comparison queries**
- `Gemini 3 vs GPT-4o`
- `Gemini 3 vs Claude 3.5`

**Prompts & image generation queries (important for gempix2)**
- `Gemini 3 prompts`
- `Gemini 3.0 prompts`
- `Gemini 3 prompt examples`
- `Gemini 3 image generation`
- `Gemini 3 image generator`
- `best Gemini 3 prompts`
- `best Gemini 3 image generator`

### 3.3 Keyword-to-Page Mapping

- `/`
  - Gemini 3, Gemini 3.0 overview
- `/gemini-3`
  - `Gemini 3`, `what is Gemini 3`, `Gemini 3 features`
- `/gemini-3-0`
  - `Gemini 3.0`, `what is Gemini 3.0`, `Gemini 3.0 features`
- `/guides/getting-started`
  - `how to use Gemini 3`, `Gemini 3.0 tutorial`
- `/guides/prompt`
  - `Gemini 3 prompts`, `Gemini 3 prompt engineering`
- `/prompts`
  - `Gemini 3 prompt examples`, `Gemini 3.0 prompts`, `Gemini 3 prompts library`
- `/guides/image-generation`
  - `Gemini 3 image generation`, `Gemini 3 image generator`, `Gemini 3 AI image generator`
- `/compare/gemini-3-vs-gpt-4o`
  - `Gemini 3 vs GPT-4o`
- `/news` + articles
  - `Gemini 3.0 release`, `Gemini 3 updates`, and related long-tail news queries.

---

## 4. Information Architecture (IA) & Routing

Use Next.js App Router with a structure like:

```text
app/
  layout.tsx                  # Global layout with Header / Footer
  page.tsx                    # Homepage "/"

  gemini-3/
    page.tsx

  gemini-3-0/
    page.tsx

  guides/
    page.tsx                  # Guides overview "/guides"
    getting-started/page.tsx
    prompt/page.tsx
    image-generation/page.tsx
    workflow/page.tsx         # Optional workflows page

  prompts/
    page.tsx                  # Prompt Library "/prompts"

  compare/
    gemini-3-vs-gpt-4o/page.tsx
    gemini-3-vs-gemini-1-5/page.tsx   # Optional

  news/
    page.tsx                  # News list "/news"
    [slug]/page.tsx           # Individual news article

  faq/page.tsx
  glossary/page.tsx

  sitemap.xml/route.ts
  robots.txt/route.ts
```

**Top navigation suggestions**

- Logo (Gemini Studio)
- `Home`
- `Gemini 3`
- `Gemini 3.0`
- `Guides` (dropdown: Getting Started / Prompts / Image Generation)
- `Prompt Library`
- `News`
- `FAQ`

---

## 5. Core Page Designs (Structure & Copy Direction)

All headings below are in English for direct reuse in components.

### 5.1 Homepage `/`

- **H1 / main title**  
  `Gemini 3 & Gemini 3.0: Complete Guide, Tutorials, and Tools`

- **Meta description (example)**  
  `Learn what Gemini 3 and Gemini 3.0 are, how they work, and how to actually use them in real projects. Tutorials, prompt examples, comparisons, and a recommended Gemini-grade AI image generator.`

**Sections**

1. **Hero**
   - Heading: same as H1
   - Subheading:  
     `Understand Google’s latest Gemini 3 models, see what’s new in Gemini 3.0, and discover practical ways to use them for coding, writing, research, and image generation.`
   - Primary CTA: `Learn about Gemini 3` → `/gemini-3`
   - Secondary CTA:  
     `Try Gemini-grade AI image generation` → `https://www.gempix2.site/?utm_source=gemini.studio&utm_medium=hero_cta&utm_campaign=gemini3_seo`

2. **“What is Gemini 3 / 3.0?”**
   - Brief explanation.
   - Cards linking to:
     - `Learn more about Gemini 3` → `/gemini-3`
     - `See what’s new in Gemini 3.0` → `/gemini-3-0`

3. **Key use cases**
   - Cards: Coding / Writing / Research / Image generation.
   - Image generation card copy example:  
     `If you just want a fast, Gemini-grade image generator, you can start with gempix2.site.`

4. **“Start here”**
   - Cards linking to:
     - `Getting started with Gemini 3` → `/guides/getting-started`
     - `Prompting tips and examples` → `/guides/prompt`
     - `Image generation with Gemini 3` → `/guides/image-generation`

5. **Comparisons**
   - Link card: `Gemini 3 vs GPT-4o` → `/compare/gemini-3-vs-gpt-4o`

6. **Latest updates**
   - List of 3–5 recent `/news` articles.

7. **FAQ highlights**
   - 4–6 key questions with a link to `/faq`.

8. **Footer CTA**
   - Text/button:  
     `Want to try a Gemini-level AI image generator? Check out gempix2.site.`

---

### 5.2 Gemini 3 Page `/gemini-3`

- **H1**  
  `What Is Gemini 3? Features, Models, and Real-World Use Cases`

- **Meta description (example)**  
  `A clear, practical guide to Gemini 3: what it is, how it compares to earlier Gemini models, what it can do, and how to start using it in real projects.`

**Suggested outline**

- **H2: What is Gemini 3?**
  - Definition and short explanation as a multimodal large language model.

- **H2: Gemini 3 vs earlier Gemini models**
  - High-level comparison with Gemini 1.5 / Ultra, etc.

- **H2: Key capabilities of Gemini 3**
  - **H3: Text and writing**
  - **H3: Coding and debugging**
  - **H3: Research and reasoning**
  - **H3: Multimodal input (images, audio, video)**

- **H2: How to access Gemini 3**
  - High-level overview of web/app/API.
  - Internal link to `/guides/getting-started`.

- **H2: Gemini 3 for images and creative work**
  - Explain how Gemini relates to images.
  - Include gempix2 plug:
    - `If you want a simple, Gemini-grade AI image generator without dealing with APIs, gempix2.site is a great starting point.`

- **H2: Example workflows with Gemini 3**
  - Short example flows for writing, coding, research, etc.

- **H2: FAQ about Gemini 3**
  - Example questions:
    - What can I use Gemini 3 for?
    - Is Gemini 3 free?
    - How is Gemini 3 different from Gemini 1.5?

---

### 5.3 Gemini 3.0 Page `/gemini-3-0`

- **H1**  
  `Gemini 3.0 Explained: What’s New and How to Use It`

- **Meta description (example)**  
  `A straightforward breakdown of Gemini 3.0: what changed, which upgrades matter in practice, and how to start using Gemini 3.0 for coding, writing, and creative work.`

**Suggested outline**

- **H2: What is Gemini 3.0?**

- **H2: What’s new in Gemini 3.0**
  - Upgrades in performance, speed, context length, multimodal, etc.

- **H2: Gemini 3 vs Gemini 3.0**
  - Bullet-based comparison table.

- **H2: How to start using Gemini 3.0**
  - High-level on-boarding, then link to `/guides/getting-started`.

- **H2: Gemini 3.0 for creative work and images**
  - Explain creative strengths of 3.0.
  - Re-introduce gempix2:
    - e.g. `If you want a fast way to try Gemini-grade image generation, gempix2.site is worth a look.`

- **H2: Common questions about Gemini 3.0**

---

### 5.4 Guides

#### 5.4.1 `/guides/getting-started`

- **H1**  
  `Getting Started with Gemini 3 and Gemini 3.0`

- **Content**
  - Basic intro, access methods, simple first example.
  - Plenty of internal links to `/gemini-3`, `/gemini-3-0`, and `/guides/prompt`.

#### 5.4.2 `/guides/prompt`

- **H1**  
  `Gemini 3 Prompting Guide: Tips and Best Practices`

- **Content**
  - How to craft clear prompts for Gemini 3.
  - Common structure: role → task → context → constraints → examples.
  - Common mistakes and how to fix them.
  - Strong links to `/prompts` (Prompt Library).

#### 5.4.3 `/guides/image-generation` (Key routing page)

- **H1**  
  `Gemini 3 Image Generation Guide: How to Create Better AI Images`

- **Meta description (example)**  
  `Learn how to use Gemini 3 for image generation, plus a practical workflow using a Gemini-grade AI image generator so you can start creating in minutes.`

**Suggested outline**

- **H2: Why people search for "Gemini 3 image generator"**
  - Explain the actual need: an easy, fast, high-quality image generator.

- **H2: How Gemini 3 fits into image generation**
  - Clarify model vs tools.

- **H2: A practical Gemini-grade image generator: gempix2.site**
  - Position gempix2:
    - Simple signup.
    - Prompt-based workflow.
    - Good quality and control.
  - CTA button:  
    `Open gempix2.site` → `https://www.gempix2.site/?utm_source=gemini.studio&utm_medium=guide_image_generation&utm_campaign=gemini3_seo`

- **H2: Step-by-step workflow**
  - Step 1: Go to gempix2.site.
  - Step 2: Write a clear prompt.
  - Step 3: Adjust options and generate.
  - Step 4: Iterate and export.

- **H2: Prompt examples for image generation**
  - Several prompts (product shots, portraits, illustrations, etc.).

- **H2: FAQ: Gemini 3 and image generation**
  - Example question: Is this the official Gemini image generator?
  - Clarify reality while keeping tone positive and trustworthy.

---

### 5.5 Prompt Library `/prompts`

This page reuses the existing prompts page structure, rebuilt for an English prompt library to capture “Gemini 3 prompts / prompt examples” traffic.

- **H1**  
  `Gemini 3 Prompt Library: Ready-to-Use Prompts for Text, Code, and Images`

- **Meta description (example)**  
  `A curated library of Gemini 3 and Gemini 3.0 prompts you can copy and use right away — for writing, coding, research, and AI image generation.`

**Structure**

- Intro:
  - `This page is a growing collection of ready-to-use prompts for Gemini 3 and Gemini 3.0.`
  - Link to `/guides/prompt`.

- Sections:
  - **H2: Writing prompts**
  - **H2: Coding prompts**
  - **H2: Research and analysis prompts**
  - **H2: Image generation prompts** (most important for routing).

**Data model**

Prompts can be stored in `data/prompts.ts` for example:

- `category`: `"writing" | "coding" | "research" | "image"`
- `title`: short title
- `prompt`: full English prompt text
- `description`: 1–2 sentence explanation

The `/prompts/page.tsx` component simply reads this data and renders lists with copy buttons.

**Routing to gempix2 from image prompts**

- At the top of the Image generation section:
  - `You can copy any of these prompts into a Gemini-style image generator. If you want a fast, Gemini-grade tool to try them right now, gempix2.site is a good place to start.`
- Under each image prompt (or group of prompts), add a button:
  - `Try this prompt on gempix2.site` (with UTM).

---

### 5.6 Comparison & News

#### 5.6.1 `/compare/gemini-3-vs-gpt-4o`

- **H1**  
  `Gemini 3 vs GPT-4o: Key Differences Explained`

- **Content**
  - High-level comparison of price, performance, multimodal, ecosystem, etc.
  - “Which should you choose?” section.
  - Optional short note on using gempix2 for image tasks.

#### 5.6.2 `/news` and articles

- `/news`: list page for Gemini 3 / 3.0 related updates and announcements.
- `/news/[slug]`: individual article page using MDX or local markdown.

Each article:
- Uses `Article` schema (structured data).
- Links back to `/gemini-3`, `/gemini-3-0`, and relevant guides.

---

### 5.7 FAQ & Glossary

#### 5.7.1 `/faq`

- **H1**  
  `Gemini 3 & 3.0 FAQ`

- **Example questions**
  - What is Gemini 3?
  - What is Gemini 3.0?
  - Is Gemini 3 free to use?
  - How is Gemini 3 different from GPT-4o?
  - Can I use Gemini 3 for image generation?
  - Is gempix2.site an official Gemini product?

#### 5.7.2 `/glossary`

- Simple glossary of terms: multimodal, context window, tokens, prompt, etc.

---

## 6. Technical Implementation (using existing Next.js project)

### 6.1 Tech stack

- **Framework**: Next.js 13+ (App Router).
- **Styling**: Tailwind CSS or existing project styling.
- **Rendering**:
  - SSG for all main pages.
- **Content layer**:
  - Phase 1: hard-coded content inside React components.
  - Phase 2: move to MDX-based content if frequent updates are needed.

### 6.2 Key technical points

- `app/layout.tsx`
  - Set `<html lang="en-US">`.
  - Include `Header` and `Footer`.

- `generateMetadata` (or static `metadata` objects)
  - For each page, define `title`, `description`, `openGraph`, `twitter`.

- `sitemap.xml/route.ts`
  - Generate sitemap for all core routes.

- `robots.txt/route.ts`
  - Allow crawling and point to the sitemap.

### 6.3 Suggested shared components

- `components/Header.tsx` – global navigation.
- `components/Footer.tsx` – global footer.
- `components/CalloutCard.tsx` – reusable CTA block (title + description + button).
- `components/Section.tsx` – consistent section layout (title + subtitle + content).
- `components/FAQAccordion.tsx` – collapsible FAQ items.
- `components/Breadcrumb.tsx` (optional) – better UX and SEO.

### 6.4 Prompt Library Implementation

- Create `data/prompts.ts` with typed prompt objects.
- `/prompts/page.tsx` imports that data:
  - Groups prompts by `category`.
  - Renders lists with “copy” buttons.
  - Adds gempix2 CTA in the Image section.

---

## 7. Traffic Routing Strategy (to gempix2.site)

### 7.1 Link Strategy

- Use UTM parameters on all outbound links, for example:
  - `https://www.gempix2.site/?utm_source=gemini.studio&utm_medium=referral&utm_campaign=gemini3_seo`
- Customize `utm_medium` by placement:
  - Hero: `utm_medium=hero_cta`
  - Prompt Library: `utm_medium=prompt_library`
  - Guides (image generation): `utm_medium=guide_image_generation`

### 7.2 Copy Strategy

- Avoid aggressive advertising tone. Use “recommended tool” positioning:
  - `If you want a simple, Gemini-grade image generator without touching APIs, gempix2.site is a good place to start.`
  - `You can plug these prompts directly into gempix2.site.`

### 7.3 Placement

- Homepage Hero secondary CTA.
- Homepage “use cases” section.
- `/gemini-3` and `/gemini-3-0` in the “images / creative work” subsections.
- `/guides/image-generation` in multiple steps and in the conclusion.
- `/prompts` within the Image generation prompts section.

---

## 8. Content Guidelines & Style

- **Language**:
  - Clear, natural American English.
  - Use technical terms where appropriate (prompt, tokens, multimodal).

- **Approximate word counts**:
  - Homepage: 1500–2500 words.
  - `/gemini-3` and `/gemini-3-0`: 2000–3000 words each.
  - Guides & prompt pages: 1000–2500 words.

- **Structure**:
  - 1× H1 per page.
  - Use H2/H3 for logical sections.
  - Prefer lists and short paragraphs for scanability.

- **Keyword usage**:
  - Include main keyword in H1 (Gemini 3 / Gemini 3.0 / prompts / image generation).
  - Include it 1–2 times in meta description.
  - Use naturally in body text without keyword stuffing.

- **Internal linking**:
  - Link `Gemini 3` / `Gemini 3.0` / `prompts` / `image generation` to their corresponding pages.
  - Create a dense internal link network across the site.

---

## 9. Launch Steps & Iteration Plan

### 9.1 Phase 1 (MVP launch)

- Clear old business-specific pages; keep Next.js framework.
- Implement:
  - `layout.tsx` + Header/Footer.
  - `/`, `/gemini-3`, `/gemini-3-0`, `/guides/image-generation`, `/prompts`.
- Fill these pages with production-ready English copy and CTAs.
- Add `robots.txt` and `sitemap.xml`.

### 9.2 Phase 2

- Implement additional pages:
  - `/guides/getting-started`
  - `/guides/prompt`
  - `/compare/gemini-3-vs-gpt-4o`
  - `/faq`
- Grow the Prompt Library by periodically adding more prompts.

### 9.3 Phase 3

- Build `/news` + MDX content system.
- Regularly publish long-form Gemini 3 / 3.0 news and analysis to capture long-tail.

### 9.4 Iteration & Optimization

- Integrate analytics (e.g., Umami / GA4) and Google Search Console.
- Track:
  - Entry pages and search queries.
  - Click-throughs to gempix2 (by UTM).
- Based on real search terms:
  - Add new FAQ entries, sections, or short articles targeting those terms.
- Keep content fresh:
  - When Gemini releases new updates, update `/gemini-3-0` and relevant news pages first.

---

This document is the final high-level plan for turning `gemini.studio` into an English, US-focused Gemini 3 / Gemini 3.0 SEO hub that routes qualified traffic to `gempix2.site`. 

