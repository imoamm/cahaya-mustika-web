"use client";
import type { ReactNode } from "react";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { SITE, waLink } from "@/lib/constants";
import type { Text } from "@/lib/i18n/types";

// Tombol WhatsApp: teks pesan otomatis mengikuti bahasa aktif. Nomor tetap SITE.whatsapp (tidak diubah).
export function useWaLink() {
  const { tx } = useI18n();
  return (msg?: Text) => waLink(tx(msg ?? SITE.waMessage));
}

export function WaButton({ message, variant = "primary", className = "", children }: { message?: Text; variant?: "primary" | "ghost"; className?: string; children: ReactNode }) {
  const wa = useWaLink();
  return (
    <a className={`btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`} href={wa(message)} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
