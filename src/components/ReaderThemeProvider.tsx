"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type ReaderTheme = "light" | "dark";

type ReaderThemeContextValue = {
  theme: ReaderTheme;
  setTheme: (theme: ReaderTheme) => void;
  toggleTheme: () => void;
};

const ReaderThemeContext = createContext<ReaderThemeContextValue | null>(null);
const STORAGE_KEY = "cppvalley:reader-theme";
const THEME_EVENT = "cppvalley:reader-theme-change";

function readStoredTheme(): ReaderTheme {
  if (typeof window === "undefined") return "light";

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "light";
  } catch {
    return "light";
  }
}

function writeStoredTheme(theme: ReaderTheme) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {}

  window.dispatchEvent(new Event(THEME_EVENT));
}

function subscribeThemeChange(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback();
  };

  const onThemeChange = () => callback();

  window.addEventListener("storage", onStorage);
  window.addEventListener(THEME_EVENT, onThemeChange);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(THEME_EVENT, onThemeChange);
  };
}

const themeVars: Record<ReaderTheme, React.CSSProperties> = {
  light: {
    ["--reader-bg" as string]: "#F6F1F2",
    ["--reader-surface" as string]: "#FFFFFF",
    ["--reader-surface-soft" as string]: "#FBF6F7",
    ["--reader-border" as string]: "#E5D7DC",
    ["--reader-heading" as string]: "#4A1F2C",
    ["--reader-body" as string]: "#6B4D55",
    ["--reader-muted" as string]: "#8F6E77",
    ["--reader-accent" as string]: "#9B1C3A",
    ["--reader-accent-soft" as string]: "#F8EDEF",
    ["--reader-code-bg" as string]: "#FFF7F8",
    ["--reader-code-border" as string]: "#D8C4CA",
    ["--reader-inline-code-bg" as string]: "#F4ECEE",
    ["--reader-inline-code-text" as string]: "#7C243B",
    ["--reader-blockquote-bg" as string]: "#FAF3F5",
    ["--reader-table-head" as string]: "#F5ECEF",
  },
  dark: {
    ["--reader-bg" as string]: "#1B1518",
    ["--reader-surface" as string]: "#241D21",
    ["--reader-surface-soft" as string]: "#2A2126",
    ["--reader-border" as string]: "#43343B",
    ["--reader-heading" as string]: "#F7EDF1",
    ["--reader-body" as string]: "#D9C6CC",
    ["--reader-muted" as string]: "#B79DA6",
    ["--reader-accent" as string]: "#D46886",
    ["--reader-accent-soft" as string]: "#32262C",
    ["--reader-code-bg" as string]: "#161114",
    ["--reader-code-border" as string]: "#4B3940",
    ["--reader-inline-code-bg" as string]: "#34282E",
    ["--reader-inline-code-text" as string]: "#FFB7CB",
    ["--reader-blockquote-bg" as string]: "#2B2227",
    ["--reader-table-head" as string]: "#2F252A",
  },
};

export function useReaderTheme() {
  const value = useContext(ReaderThemeContext);
  if (!value) {
    return {
      theme: "light" as ReaderTheme,
      setTheme: () => {},
      toggleTheme: () => {},
    };
  }
  return value;
}

export default function ReaderThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore<ReaderTheme>(subscribeThemeChange, readStoredTheme, () => "light");

  const value = useMemo<ReaderThemeContextValue>(
    () => ({
      theme,
      setTheme: (nextTheme: ReaderTheme) => writeStoredTheme(nextTheme),
      toggleTheme: () => writeStoredTheme(theme === "light" ? "dark" : "light"),
    }),
    [theme]
  );

  return (
    <ReaderThemeContext.Provider value={value}>
      <div data-reader-theme={theme} style={themeVars[theme]} className="h-full min-h-0">
        {children}
      </div>
    </ReaderThemeContext.Provider>
  );
}

export function ReaderThemeToggle() {
  const { theme, toggleTheme } = useReaderTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition"
      style={{
        borderColor: "var(--reader-border)",
        backgroundColor: "var(--reader-surface)",
        color: "var(--reader-body)",
      }}
    >
      {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      {isDark ? "Light mode" : "Dark mode"}
    </button>
  );
}
