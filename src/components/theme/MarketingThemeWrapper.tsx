"use client";

import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_COOKIE = "marketing_theme";
const THEME_DARK = "marketing";
const THEME_LIGHT = "marketing-light";

function getThemeFromCookie(): string {
  if (typeof document === "undefined") return THEME_DARK;
  const match = document.cookie.match(new RegExp(`(^| )${THEME_COOKIE}=([^;]+)`));
  return (match?.[2] === THEME_LIGHT ? THEME_LIGHT : THEME_DARK) as string;
}

function setThemeCookie(value: string) {
  document.cookie = `${THEME_COOKIE}=${value};path=/;max-age=31536000`;
}

export function MarketingThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState(THEME_DARK);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setThemeState(getThemeFromCookie());
      setMounted(true);
    });
  }, []);

  const setTheme = useCallback((next: string) => {
    setThemeState(next);
    setThemeCookie(next);
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === THEME_DARK ? THEME_LIGHT : THEME_DARK);
  }, [theme, setTheme]);

  const isDark = theme === THEME_DARK;

  if (!mounted) {
    return (
      <div data-theme={THEME_DARK} className="min-h-screen hero-cosmic text-foreground">
        {children}
      </div>
    );
  }

  return (
    <div
      data-theme={theme}
      className={`min-h-screen text-foreground ${isDark ? "hero-cosmic" : "hero-cosmic-light"}`}
    >
      <button
        type="button"
        onClick={toggle}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        className={
          isDark
            ? "fixed right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-foreground backdrop-blur-sm transition hover:bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            : "fixed right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/60 text-foreground backdrop-blur-sm transition hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        }
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
      {children}
    </div>
  );
}
