"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { X } from "lucide-react";

export default function AnnouncementBanner() {
  const t = useTranslations("announcement.banner");
  const [isClosed, setIsClosed] = useState(false);

  const handleClose = () => {
    setIsClosed(true);
  };

  if (isClosed) {
    return null;
  }

  return (
    <div className="relative w-full h-12 bg-gradient-to-r from-green-500 to-cyan-500 dark:from-green-600 dark:to-cyan-600 text-white">
      <div className="w-full h-full px-4 md:px-6 lg:px-8 flex items-center justify-center">
        {/* 文字和按钮居中 */}
        <Link
          href="/guides/image-generation"
          className="flex items-center justify-center gap-2 md:gap-3 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <p className="text-xs md:text-base font-bold text-center">
            {t("text")}
          </p>

          {/* 按钮 - 仅在桌面端显示 */}
          <span className="hidden md:flex px-3  py-1  text-xs md:text-sm font-semibold bg-white/20 text-white hover:bg-white/30 rounded-full transition-all whitespace-nowrap backdrop-blur-sm">
            {t("button")}
          </span>
        </Link>

        {/* 关闭按钮 - 绝对定位到右侧 */}
        <button
          onClick={handleClose}
          className="absolute right-2 md:right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Close announcement"
        >
          <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </button>
      </div>
    </div>
  );
}
