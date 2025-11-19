import { Header as HeaderType } from "@/types/blocks/header";
import Icon from "@/components/icon";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import ThemeLogo from "@/components/blocks/logo/ThemeLogo";
import HeaderNavLink from "./header-nav-link";

const getMediumLabel = (title?: string, shortTitle?: string) => {
  const label = shortTitle ?? title ?? "";
  return label.trim();
};

const shouldShowMediumLabel = (
  title?: string,
  shortTitle?: string,
  iconOnly?: boolean
) => {
  if (iconOnly) {
    return false;
  }
  return getMediumLabel(title, shortTitle).length > 0;
};

export default function HeaderServer({ header }: { header: HeaderType }) {
  if (header.disabled) {
    return null;
  }

  return (
    <section className="py-4 bg-white/60 [.dark_&]:bg-slate-950/60 backdrop-blur-lg">
      {/* 顶部装饰线 */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent [.dark_&]:via-green-400/60" />

      <div className="w-full px-4 md:px-6 lg:px-8">
        {/* PC 端导航 - 静态 HTML 给 SEO */}
        <nav className="hidden md:flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-1 min-w-0 flex-wrap items-center gap-4 lg:gap-6">
            <Link
              href={(header.brand?.url as any) || "/"}
              className="group flex items-center gap-2 transition-transform hover:scale-105"
            >
              {header.brand?.logo && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-cyan-500 [.dark_&]:from-green-400 [.dark_&]:to-cyan-400 rounded-lg blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
                  <ThemeLogo
                    logo={header.brand.logo}
                    title={header.brand.title}
                    className="relative w-8 h-8"
                    decorative
                  />
                </div>
              )}
              {header.brand?.title && (
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-cyan-600 [.dark_&]:from-green-400 [.dark_&]:to-cyan-400 bg-clip-text text-transparent">
                  {header.brand?.title || ""}
                </span>
              )}
            </Link>

            {/* 静态菜单结构 - SEO 友好 */}
            <div className="flex flex-1 min-w-0 flex-wrap items-center gap-1 sm:gap-2">
              {header.nav?.items?.map((item, i) => {
                const title = item.title || "";
                const mediumLabel = getMediumLabel(title, item.short_title);
                const showMediumLabel = shouldShowMediumLabel(
                  title,
                  item.short_title,
                  item.show_icon_only_on_medium
                );
                const accessibleLabel = showMediumLabel ? undefined : title;

                return (
                  // 外层容器不再使用 whitespace-nowrap，避免下拉菜单中的文字被强制单行显示
                  <div key={i} className="relative group">
                    {item.children && item.children.length > 0 ? (
                      <>
                        <div
                          // 只在触发下拉的这一行使用 nowrap，保证主导航项本身不换行
                          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 [.dark_&]:text-slate-300 hover:text-green-600 [.dark_&]:hover:text-green-400 cursor-pointer whitespace-nowrap"
                          aria-label={accessibleLabel}
                          title={!showMediumLabel ? title : undefined}
                        >
                          {item.icon && (
                            <Icon
                              name={item.icon}
                              className="size-4 shrink-0 mr-2"
                            />
                          )}
                          <span className="hidden xl:inline">{title}</span>
                          {showMediumLabel && (
                            <span className="hidden md:inline xl:hidden">
                              {mediumLabel}
                            </span>
                          )}
                          {item.is_new && (
                            <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold text-white bg-red-500 [.dark_&]:bg-red-600 rounded-full animate-pulse">
                              NEW
                            </span>
                          )}
                          <ChevronDown className="size-4 ml-1 transition-transform group-hover:rotate-180" />
                        </div>
                        {/* 静态下拉菜单 - 默认隐藏,SEO 可见 */}
                        <div className="absolute left-0 top-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                          <div className="grid w-[600px] gap-3 p-4 grid-cols-2 bg-white [.dark_&]:bg-slate-950 backdrop-blur-xl border border-slate-200 [.dark_&]:border-slate-800 rounded-lg shadow-xl">
                            {item.children.map((iitem, ii) => (
                              <HeaderNavLink
                                key={ii}
                                href={iitem.url as any}
                                target={iitem.target}
                                className={cn(
                                  "group/item block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-gradient-to-br hover:from-green-50 hover:to-cyan-50 [.dark_&]:hover:from-green-950/50 [.dark_&]:hover:to-cyan-950/50 hover:shadow-md border border-transparent hover:border-green-200 [.dark_&]:hover:border-green-800"
                                )}
                                icon={iitem.icon}
                                iconMode="decorated"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex-1">
                                    <div className="text-sm font-semibold text-slate-900 [.dark_&]:text-slate-100 group-hover/item:text-green-600 [.dark_&]:group-hover/item:text-green-400 transition-colors flex items-center gap-1">
                                      {iitem.title}
                                      {iitem.is_new && (
                                        <span className="px-1.5 py-0.5 text-[10px] font-bold text-white bg-red-500 [.dark_&]:bg-red-600 rounded-full animate-pulse">
                                          NEW
                                        </span>
                                      )}
                                    </div>
                                    <p className="line-clamp-2 text-xs leading-snug text-slate-500 [.dark_&]:text-slate-400">
                                      {iitem.description}
                                    </p>
                                  </div>
                                </div>
                              </HeaderNavLink>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <HeaderNavLink
                        href={item.url as any}
                        target={item.target}
                        // 普通导航项同样保持单行显示
                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 [.dark_&]:text-slate-300 hover:text-green-600 [.dark_&]:hover:text-green-400 transition-colors rounded-md whitespace-nowrap"
                        icon={item.icon}
                        ariaLabel={accessibleLabel}
                        title={!showMediumLabel ? title : undefined}
                      >
                        <span className="hidden xl:inline">{title}</span>
                        {showMediumLabel && (
                          <span className="hidden md:inline xl:hidden">
                            {mediumLabel}
                          </span>
                        )}
                        {item.is_new && (
                          <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold text-white bg-red-500 [.dark_&]:bg-red-600 rounded-full animate-pulse">
                            NEW
                          </span>
                        )}
                      </HeaderNavLink>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 右侧按钮占位 - 为客户端交互预留空间，防止与导航重叠 */}
          <div
            className="hidden lg:block shrink-0 lg:w-[260px]"
            aria-hidden="true"
          />
        </nav>

        {/* 移动端 - 静态 Logo + 核心功能快捷入口 */}
        <div className="block md:hidden">
          <div className="flex items-center justify-between">
            <Link
              href={(header.brand?.url || "/") as any}
              className="group flex items-center gap-2 transition-transform hover:scale-105"
            >
              {header.brand?.logo && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-cyan-500 [.dark_&]:from-green-400 [.dark_&]:to-cyan-400 rounded-lg blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
                  <ThemeLogo
                    logo={header.brand.logo}
                    title={header.brand.title}
                    className="relative w-8 h-8"
                    decorative
                  />
                </div>
              )}
              {header.brand?.title && (
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-cyan-600 [.dark_&]:from-green-400 [.dark_&]:to-cyan-400 bg-clip-text text-transparent">
                  {header.brand?.title || ""}
                </span>
              )}
            </Link>

            {/* 核心功能快捷入口 - 小屏显示 */}
            <div className="flex gap-2 mr-14">
              <HeaderNavLink
                href="/prompts"
                className="flex items-center gap-2 h-9 px-3 rounded-full bg-gradient-to-br from-green-500/10 to-cyan-500/10 [.dark_&]:from-green-400/20 [.dark_&]:to-cyan-400/20 border border-green-500/30 [.dark_&]:border-green-400/40 hover:border-green-500 [.dark_&]:hover:border-green-400 hover:shadow-md transition-all text-sm font-semibold text-slate-600 [.dark_&]:text-slate-100"
                icon="RiGalleryLine"
                ariaLabel="Prompt Library"
                title="Prompt Library"
              >
                <span className="whitespace-nowrap">Prompt Library</span>
              </HeaderNavLink>
            </div>

            {/* 移动端菜单按钮由客户端组件处理 */}
          </div>
        </div>
      </div>
    </section>
  );
}
