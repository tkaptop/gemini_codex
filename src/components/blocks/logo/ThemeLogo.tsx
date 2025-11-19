"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Image as ImageType } from "@/types/blocks/base";

interface ThemeLogoProps {
  logo: ImageType;
  title?: string;
  className?: string;
  /**
   * 当 logo 旁边已经有文字（例如品牌名）时，可将图片标记为装饰性，
   * 使用空 alt 避免与相邻文本的可见名称重复。
   */
  decorative?: boolean;
}

export default function ThemeLogo({
  logo,
  title,
  className,
  decorative = false,
}: ThemeLogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 避免 hydration 不匹配
  useEffect(() => setMounted(true), []);

  // 服务端渲染或未挂载时，使用默认图片
  if (!mounted) {
    const defaultSrc = logo.src || logo.srcLight || logo.srcDark;
    if (!defaultSrc) return null;

    const altText = decorative ? "" : logo.alt || title || "Logo";

    return (
      <Image
        src={defaultSrc}
        alt={altText}
        aria-hidden={decorative ? true : undefined}
        className={className || logo.className}
        width={44}
        height={44}
      />
    );
  }

  // 根据主题选择对应的 logo
  const logoSrc =
    resolvedTheme === "dark"
      ? (logo.srcDark || logo.src)  // dark 主题优先用 srcDark，回退到 src
      : (logo.srcLight || logo.src); // light 主题优先用 srcLight，回退到 src

  if (!logoSrc) return null;

  const altText = decorative ? "" : logo.alt || title || "Logo";

  return (
    <Image
      src={logoSrc}
      alt={altText}
      aria-hidden={decorative ? true : undefined}
      className={className || logo.className}
      width={44}
      height={44}
    />
  );
}
