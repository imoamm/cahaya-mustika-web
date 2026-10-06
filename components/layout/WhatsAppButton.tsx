"use client";
import { MessageCircle } from "lucide-react";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { useWaLink } from "@/components/ui/WaButton";

export function WhatsAppButton() {
  const { t } = useI18n();
  const wa = useWaLink();
  return (
    <a
      href={wa()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("cta.chatSalesAria")}
      className="group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 flex items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page)] sm:bottom-6 sm:right-6"
    >
      <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap sm:block rounded-full border border-line bg-surface px-4 py-2 text-sm opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100">
        {t("cta.chatSales")}
      </span>
      <span className="wa-pulse relative grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform group-hover:scale-105 group-active:scale-95 sm:size-14">
        <MessageCircle size={24} aria-hidden />
      </span>
    </a>
  );
}
