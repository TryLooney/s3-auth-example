"use client";

import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative flex size-6 items-center justify-center overflow-hidden rounded-full"
    >
      <div className="size-full bg-black dark:hidden" />
      <div className="hidden size-full bg-white dark:block" />
    </button>
  );
}
