"use client";

import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import Icon from "@/components/icon";

interface HeaderNavLinkProps {
  href: string;
  target?: string;
  className?: string;
  children: React.ReactNode;
  icon?: string;
  showLoading?: boolean;
  onClick?: () => void;
  /** 图标渲染模式：simple=简单图标，decorated=带背景容器的图标 */
  iconMode?: "simple" | "decorated";
  ariaLabel?: string;
  title?: string;
}

/**
 * 导航链接组件 - 支持loading状态
 *
 * 当点击链接时，显示loading动画直到页面跳转完成
 */
export default function HeaderNavLink({
  href,
  target,
  className,
  children,
  icon,
  showLoading = true,
  onClick,
  iconMode = "simple",
  ariaLabel,
  title,
}: HeaderNavLinkProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 如果事件已被其他逻辑处理，直接跳过
    if (e.defaultPrevented) {
      onClick?.();
      return;
    }

    // 处理辅助按键和非左键点击（如 Cmd/Ctrl + Click、新标签页、中键点击等）
    // 这些情况应该交给浏览器默认行为处理，避免破坏用户预期
    if (
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      onClick?.();
      return;
    }

    // 如果有外部target，不显示loading（新标签页打开）
    if (target === "_blank" || target === "_new") {
      onClick?.();
      return;
    }

    // 如果禁用loading，直接执行
    if (!showLoading) {
      onClick?.();
      return;
    }

    // 阻止默认行为
    e.preventDefault();

    // 设置loading状态
    setIsLoading(true);

    // 如果之前已有定时器，先清理，避免重复触发
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 执行自定义onClick
    onClick?.();

    // 导航
    router.push(href as any);

    // 3秒后自动关闭loading（防止卡住）
    timeoutRef.current = window.setTimeout(() => {
      setIsLoading(false);
      timeoutRef.current = null;
    }, 3000);
  };

  // 渲染Loading图标
  const renderLoadingIcon = () => {
    if (iconMode === "decorated") {
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-100 to-cyan-100 [.dark_&]:from-green-900/30 [.dark_&]:to-cyan-900/30 group-hover/item:from-green-200 group-hover/item:to-cyan-200 [.dark_&]:group-hover/item:from-green-800/50 [.dark_&]:group-hover/item:to-cyan-800/50 transition-colors">
          <Loader2 className="size-5 animate-spin text-green-600 [.dark_&]:text-green-400" />
        </div>
      );
    }
    return <Loader2 className="size-4 shrink-0 mr-2 animate-spin text-green-500 [.dark_&]:text-green-400" />;
  };

  // 组件卸载时清理定时器，避免卸载后更新状态
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 渲染普通图标
  const renderIcon = () => {
    if (!icon) return null;

    if (iconMode === "decorated") {
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-100 to-cyan-100 [.dark_&]:from-green-900/30 [.dark_&]:to-cyan-900/30 group-hover/item:from-green-200 group-hover/item:to-cyan-200 [.dark_&]:group-hover/item:from-green-800/50 [.dark_&]:group-hover/item:to-cyan-800/50 transition-colors">
          <Icon
            name={icon}
            className="size-5 text-green-600 [.dark_&]:text-green-400"
          />
        </div>
      );
    }

    return (
      <Icon
        name={icon}
        className="size-4 shrink-0 mr-2"
      />
    );
  };

  return (
    <Link
      href={href as any}
      target={target}
      className={className}
      aria-label={ariaLabel}
      title={title}
      onClick={handleClick}
    >
      {isLoading && showLoading ? (
        <>
          {renderLoadingIcon()}
          {children}
        </>
      ) : (
        <>
          {renderIcon()}
          {children}
        </>
      )}
    </Link>
  );
}
