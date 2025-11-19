"use client";

import { BsMoonStars, BsSun } from "react-icons/bs";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={resolvedTheme === "dark" ? "切换到亮色模式" : "切换到暗色模式"}
      className="flex items-center gap-x-2 px-2 py-2 rounded-md hover:bg-muted transition-colors"
    >
      {resolvedTheme === "dark" ? (
        <BsSun
          className="text-lg text-muted-foreground"
          width={80}
          height={20}
        />
      ) : (
        <BsMoonStars
          className="text-lg text-muted-foreground"
          width={80}
          height={20}
        />
      )}
      <span className="sr-only">
        {resolvedTheme === "dark" ? "切换到亮色模式" : "切换到暗色模式"}
      </span>
    </button>
  );
}
