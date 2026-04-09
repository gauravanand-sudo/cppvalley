"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type BlogTheme = "light" | "dark";

const STORAGE_KEY = "cppvalley:blog-theme";

const BlogThemeContext = createContext<{
  theme: BlogTheme;
  toggleTheme: () => void;
} | null>(null);

export function useBlogTheme() {
  const context = useContext(BlogThemeContext);
  if (!context) {
    throw new Error("useBlogTheme must be used within BlogThemeShell.");
  }
  return context;
}

function themeVars(theme: BlogTheme): React.CSSProperties {
  if (theme === "dark") {
    return {
      ["--blog-bg" as string]: "#171215",
      ["--blog-bg-glow-left" as string]: "rgba(155, 28, 58, 0.16)",
      ["--blog-bg-glow-right" as string]: "rgba(212, 104, 134, 0.14)",
      ["--blog-heading" as string]: "#F7EDF1",
      ["--blog-body" as string]: "#D6C3CA",
      ["--blog-muted" as string]: "#B79CA5",
      ["--blog-border" as string]: "#3A2B31",
      ["--blog-surface" as string]: "#221B1F",
      ["--blog-surface-soft" as string]: "#1D171A",
      ["--blog-chip-bg" as string]: "#2A2025",
      ["--blog-accent" as string]: "#D46886",
      ["--blog-accent-soft" as string]: "#3B2830",
      ["--reader-heading" as string]: "#F7EDF1",
      ["--reader-body" as string]: "#D6C3CA",
      ["--reader-border" as string]: "#3A2B31",
      ["--reader-accent" as string]: "#D46886",
      ["--reader-accent-soft" as string]: "#32262C",
      ["--reader-surface-soft" as string]: "#1D171A",
      ["--reader-inline-code-bg" as string]: "#2B2024",
      ["--reader-inline-code-text" as string]: "#F3C8D4",
      ["--reader-blockquote-bg" as string]: "#221A1E",
      ["--reader-table-head" as string]: "#261E22",
    };
  }

  return {
    ["--blog-bg" as string]: "#F7F4F2",
    ["--blog-bg-glow-left" as string]: "rgba(217, 180, 192, 0.2)",
    ["--blog-bg-glow-right" as string]: "rgba(234, 223, 228, 0.7)",
    ["--blog-heading" as string]: "#2B1C22",
    ["--blog-body" as string]: "#5F464E",
    ["--blog-muted" as string]: "#8A7078",
    ["--blog-border" as string]: "#E6DADF",
    ["--blog-surface" as string]: "#FFFFFF",
    ["--blog-surface-soft" as string]: "#FCFAF9",
    ["--blog-chip-bg" as string]: "#F7F4F2",
    ["--blog-accent" as string]: "#9B1C3A",
    ["--blog-accent-soft" as string]: "#F8EDEF",
    ["--reader-heading" as string]: "#2B1C22",
    ["--reader-body" as string]: "#5F464E",
    ["--reader-border" as string]: "#E6DADF",
    ["--reader-accent" as string]: "#9B1C3A",
    ["--reader-accent-soft" as string]: "#F8EDEF",
    ["--reader-surface-soft" as string]: "#FCFAF9",
    ["--reader-inline-code-bg" as string]: "#F8EDF0",
    ["--reader-inline-code-text" as string]: "#7A203A",
    ["--reader-blockquote-bg" as string]: "#FBF4F6",
    ["--reader-table-head" as string]: "#F6ECEF",
  };
}

export default function BlogThemeShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<BlogTheme>("light");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme((current) => {
          const next = current === "light" ? "dark" : "light";
          window.localStorage.setItem(STORAGE_KEY, next);
          return next;
        });
      },
    }),
    [theme]
  );

  return (
    <BlogThemeContext.Provider value={value}>
      <div data-blog-theme={theme} style={themeVars(theme)}>
        {children}
      </div>
    </BlogThemeContext.Provider>
  );
}
