"use client";

import { locales, localeNames } from "@/i18n/locale";
import { Link } from "@/i18n/navigation";
import { useParams, usePathname } from "next/navigation";

export default function FooterLanguageLinks() {
  const params = useParams();
  const pathname = usePathname();
  const currentLocale = params.locale as string;

  // 移除当前语言前缀，获取纯路径
  const pathWithoutLocale =
    pathname.replace(`/${currentLocale}`, "") || "/";

  return (
    <div className="w-full mt-12 pt-6 border-t border-muted-foreground/10">
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
        {locales.map((locale) => {
          const isCurrent = locale === currentLocale;

          return (
            <Link
              key={locale}
              href={pathWithoutLocale}
              locale={locale}
              className={`
                flex items-center gap-1.5 text-sm transition-all duration-200
                ${
                  isCurrent
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              <span>{localeNames[locale]}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
