"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

interface ThemeSwitcherProps {
  showLabels?: boolean;
}

// Satu tombol: klik untuk berganti Terang <-> Gelap.
// Ikon & label menunjukkan tema TUJUAN (di mode terang tampil bulan, di mode gelap tampil matahari).
export function ThemeSwitcher({
  showLabels = false,
}: ThemeSwitcherProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("theme");
    const initial: Theme = savedTheme === "dark" ? "dark" : "light";

    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";

    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const sizeClass = showLabels ? "px-4 py-2" : "size-9";

  // Mencegah perbedaan tampilan saat hydration.
  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={`inline-flex rounded-full border border-line ${showLabels ? "h-9 w-32" : "size-9"}`}
      />
    );
  }

  const isDark = theme === "dark";
  const label = isDark ? "Mode Terang" : "Mode Gelap";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Ganti ke ${label}`}
      title={label}
      className={`
        inline-flex
        items-center
        justify-center
        gap-1.5
        rounded-full
        border
        border-line
        bg-surface
        text-muted
        transition-all
        duration-200
        hover:border-brand2/50
        hover:text-fg
        ${sizeClass}
      `}
    >
      {isDark ? (
        <Sun size={16} strokeWidth={1.8} />
      ) : (
        <Moon size={16} strokeWidth={1.8} />
      )}

      {showLabels && (
        <span className="text-xs font-medium">{label}</span>
      )}
    </button>
  );
}
