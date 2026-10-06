"use client";
import { useI18n } from "./LanguageProvider";
import type { DictKey } from "@/lib/i18n/dict";
import type { Text } from "@/lib/i18n/types";

// Dipakai di Server Component agar halaman tetap server-rendered:
//   <T k="nav.home" />   → teks UI dari dict
//   <Tx v={item.title} /> → teks dwibahasa dari data
export function T({ k }: { k: DictKey }) {
  return <>{useI18n().t(k)}</>;
}
export function Tx({ v }: { v: Text | undefined | null }) {
  return <>{useI18n().tx(v)}</>;
}
export function DateText({ iso }: { iso: string }) {
  return <time dateTime={iso}>{useI18n().date(iso)}</time>;
}
