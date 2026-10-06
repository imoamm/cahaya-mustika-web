"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_LANG, FORCE_LANG, LANG_STORAGE_KEY, pick, type Lang, type Text } from "@/lib/i18n/types";
import { dict, type DictKey } from "@/lib/i18n/dict";

// Bahasa disimpan di state client + localStorage → ganti bahasa TANPA reload / navigasi.
// Render pertama selalu "id" (sama dengan HTML server) → tidak ada hydration mismatch; preferensi
// tersimpan diterapkan sesudah mount (pola yang sama dengan ThemeSwitcher).
type Ctx = {
  lang: Lang;
  toggle: () => void;
  setLang: (l: Lang) => void;
  /** Teks UI berdasarkan key dari lib/i18n/dict.ts */
  t: (key: DictKey) => string;
  /** Teks dwibahasa dari data ({id,en}) atau string biasa */
  tx: (v: Text | undefined | null) => string;
  /** Format tanggal sesuai bahasa aktif */
  date: (iso: string) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    try {
      if (FORCE_LANG) { localStorage.setItem(LANG_STORAGE_KEY, FORCE_LANG); return; }
      const s = localStorage.getItem(LANG_STORAGE_KEY);
      if (s === "en" || s === "id") setLangState(s);
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    if (FORCE_LANG) return;
    setLangState(l);
    try { localStorage.setItem(LANG_STORAGE_KEY, l); } catch {}
  }, []);
  const toggle = useCallback(() => setLang(lang === "id" ? "en" : "id"), [lang, setLang]);

  const value = useMemo<Ctx>(() => ({
    lang, toggle, setLang,
    t: (key) => dict[key][lang],
    tx: (v) => pick(v, lang),
    date: (iso) => new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso)),
  }), [lang, toggle, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n(): Ctx {
  const c = useContext(LanguageContext);
  if (!c) throw new Error("useI18n harus dipakai di dalam <LanguageProvider>");
  return c;
}
