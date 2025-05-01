"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";

export function ModeToggle({ isMobile = false }) {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="outline"
      size={!isMobile ? "icon" : "default"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full"
    >
      <div className="relative">
        <Sun className="h-[1.2rem] w-[1.2rem] dark:hidden" />
        <Moon className="h-[1.2rem] w-[1.2rem] hidden dark:block" />
      </div>
      <span className={cn(!isMobile && "sr-only")}>
        {theme === "light" ? "切換至暗黑模式" : "切換至明亮模式"}
      </span>
    </Button>
  );
}
