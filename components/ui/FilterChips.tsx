"use client";
import { useId } from "react";
import { motion } from "motion/react";
import { useI18n } from "@/components/i18n/LanguageProvider";
import type { Text } from "@/lib/i18n/types";

// Chip filter (brand / kategori). Tombol biasa dengan aria-pressed → aman untuk keyboard & screen reader.
// Di layar sempit chip bisa di-scroll horizontal DI DALAM containernya (halaman tidak pernah overflow).
export function FilterChips<T extends string>({ options, value, onChange, label }: { options: { id: T; label: Text }[]; value: T; onChange: (v: T) => void; label: Text }) {
  const { tx } = useI18n();
  const uid = useId();
  return (
    <div role="group" aria-label={tx(label)} className="-mx-1 mb-8 flex gap-2 overflow-x-auto px-1 pb-2 sm:mb-10 sm:flex-wrap sm:overflow-visible">
      {options.map((o) => {
        const active = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.id)}
            className={`relative shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${active ? "border-transparent text-white" : "border-line bg-surface/60 text-muted hover:border-brand2 hover:text-fg"}`}
          >
            {active && <motion.span layoutId={`chip-${uid}`} className="absolute inset-0 rounded-full bg-brand" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className="relative">{tx(o.label)}</span>
          </button>
        );
      })}
    </div>
  );
}
