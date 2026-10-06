"use client";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { brands } from "@/data/brands";
import { useI18n } from "@/components/i18n/LanguageProvider";

// Dropdown "Produk" (desktop). Pola disclosure yang aksesibel:
//  • "Produk" = link ke /produk; tombol chevron di sampingnya membuka submenu (aria-expanded/aria-controls).
//  • Hover (mouse), klik/Enter/Space, ↓ dari tombol → fokus ke item pertama, ↑/↓ antar item, Home/End,
//    Esc menutup & mengembalikan fokus, Tab keluar menutup.
//  • Panel `absolute` → tidak menggeser layout. Animasi ringan pakai Motion (opacity + y kecil).
export function ProductsMenu({ className = "" }: { className?: string }) {
  const { t, tx } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const active = pathname.startsWith("/produk");

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!wrapRef.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const items = useCallback(() => Array.from(wrapRef.current?.querySelectorAll<HTMLAnchorElement>("[data-menu-item]") ?? []), []);
  const focusItem = (i: number) => { const l = items(); l[(i + l.length) % l.length]?.focus(); };

  function onKeyDown(e: React.KeyboardEvent) {
    const l = items();
    const idx = l.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "Escape" && open) { e.preventDefault(); setOpen(false); btnRef.current?.focus(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); if (!open) { setOpen(true); requestAnimationFrame(() => focusItem(0)); } else focusItem(idx + 1); }
    else if (e.key === "ArrowUp" && open) { e.preventDefault(); idx <= 0 ? btnRef.current?.focus() : focusItem(idx - 1); }
    else if (e.key === "Home" && idx >= 0) { e.preventDefault(); focusItem(0); }
    else if (e.key === "End" && idx >= 0) { e.preventDefault(); focusItem(l.length - 1); }
  }

  return (
    <div
      ref={wrapRef}
      className={`relative ${className}`}
      onKeyDown={onKeyDown}
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
      onBlur={(e) => { if (!wrapRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false); }}
    >
      <div className="flex items-center">
        <Link href="/produk" aria-current={pathname === "/produk" ? "page" : undefined} className={`text-sm transition-colors hover:text-fg ${active ? "text-fg" : "text-muted"}`}>{t("nav.products")}</Link>
        <button
          ref={btnRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={t("nav.productsSub")}
          onClick={() => setOpen((o) => !o)}
          className="ml-0.5 grid size-7 place-items-center rounded-full text-muted transition-colors hover:text-fg"
        >
          <ChevronDown size={15} aria-hidden className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3"
          >
            <ul className="card rounded-2xl p-2 shadow-2xl shadow-[var(--glow)] backdrop-blur-xl">
              <li>
                <Link data-menu-item href="/produk" className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-brand/10">
                  {t("nav.allProducts")}
                </Link>
              </li>
              {brands.map((b, i) => (
                <motion.li key={b.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * (i + 1), duration: 0.18 }}>
                  <Link data-menu-item href={`/produk/${b.id}`} className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-brand/10">
                    <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand2 font-[family-name:var(--font-heading)] text-sm font-extrabold text-white transition-transform duration-300 group-hover:scale-105">{b.name[0]}</span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{b.name}</span>
                      <span className="block truncate text-xs text-muted">{tx(b.tagline)}</span>
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
