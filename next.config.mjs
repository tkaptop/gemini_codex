import bundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

  // 安全配置：防止源代码泄露
  productionBrowserSourceMaps: false,  // 禁用 source maps

  // 性能优化：启用代码压缩（Next.js 15 默认使用 SWC）
  compress: true,

  // 改变构建输出文件名（降低指纹识别）
  generateBuildId: async () => {
    return 'build-' + Math.random().toString(36).substring(7);
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
    formats: ['image/avif', 'image/webp'], // 使用现代图片格式
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // 响应式图片尺寸
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // 小图标尺寸
  },
  async headers() {
    return [
      // 静态资源缓存策略
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // 安全头部
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // 重定向旧的 explore 路由到新的 prompts 路由
      {
        source: '/explore',
        destination: '/prompts',
        permanent: true, // 301 永久重定向
      },
      {
        source: '/:locale(en|zh|ko|ja|es|de|fr|ru|ar|pt|it)/explore',
        destination: '/:locale/prompts',
        permanent: true,
      },
    ];
  },
};

// Make sure experimental mdx flag is enabled
const configWithMDX = {
  ...nextConfig,
  experimental: {
    mdxRs: true,
  },
};

export default withBundleAnalyzer(withNextIntl(withMDX(configWithMDX)));
