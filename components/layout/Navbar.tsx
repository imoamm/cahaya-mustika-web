
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

import { brands } from "@/data/brands";
import { Logo } from "./Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { ProductsMenu } from "./ProductsMenu";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { PAGE_PX } from "@/lib/utils";
import type { DictKey } from "@/lib/i18n/dict";

const LINKS: { key: DictKey; href: string }[] = [
  { key: "nav.portfolio", href: "/portofolio" },
  { key: "nav.articles", href: "/artikel" },
  { key: "nav.contact", href: "/kontak" },
];

export function Navbar() {
  const { t } = useI18n();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);

  const desktopLinkClass = (href: string) =>
    [
      "whitespace-nowrap text-sm font-medium",
      "transition-colors duration-200",
      "hover:text-fg",
      isActive(href) ? "text-fg" : "text-muted",
    ].join(" ");

  const mobileLinkClass = (href: string) =>
    [
      "block border-b border-line py-3.5",
      "text-base outline-offset-[-2px]",
      "transition-colors duration-200",
      isActive(href)
        ? "font-semibold text-brand2"
        : "hover:text-fg",
    ].join(" ");

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        "border-b border-line",
        "bg-[var(--nav)]/90 backdrop-blur-xl",
        "transition-shadow duration-300",
        scrolled || open ? "shadow-sm" : "",
      ].join(" ")}
    >
      {/* MAIN NAVBAR */}
      <div
        className={[
          "relative mx-auto flex max-w-7xl",
          "items-center justify-between gap-4 py-3",
          PAGE_PX,
        ].join(" ")}
      >
        {/* LOGO: LEFT */}
        <div className="shrink-0">
          <Logo />
        </div>

        {/* RIGHT: MENU + TEMA (desktop) */}
        <div className="ml-auto hidden shrink-0 items-center gap-7 xl:flex">
          <nav
          aria-label={t("nav.main")}
          className="flex items-center gap-7"
        >
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={desktopLinkClass("/")}
          >
            {t("nav.home")}
          </Link>

          <ProductsMenu />

          {LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                isActive(item.href) ? "page" : undefined
              }
              className={desktopLinkClass(item.href)}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

          <ThemeSwitcher />
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="
            ml-auto grid size-10 shrink-0
            place-items-center rounded-full
            border border-line transition-colors
            hover:bg-[var(--nav)] xl:hidden
          "
          aria-label={
            open ? t("nav.menuClose") : t("nav.menuOpen")
          }
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((current) => !current)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "menu"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.16 }}
              className="grid place-items-center"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-line xl:hidden"
          >
            <div
              className={[
                "max-h-[calc(100dvh-4.5rem)]",
                "overflow-y-auto overscroll-contain",
                "pb-5 pt-2",
                PAGE_PX,
              ].join(" ")}
            >
              <nav
                aria-label={t("nav.mobile")}
                className="mx-auto flex max-w-xl flex-col"
              >
                {/* HOME */}
                <Link
                  href="/"
                  className={mobileLinkClass("/")}
                >
                  {t("nav.home")}
                </Link>

                {/* PRODUCTS */}
                <div className="border-b border-line">
                  <Link
                    href="/produk"
                    className={[
                      "block py-3.5 text-base",
                      "transition-colors hover:text-fg",
                      isActive("/produk")
                        ? "font-semibold text-brand2"
                        : "",
                    ].join(" ")}
                  >
                    {t("nav.products")}
                  </Link>

                  <ul className="mb-3 ml-2 border-l border-line pl-4">
                    {brands.map((brand) => {
                      const href = `/produk/${brand.id}`;
                      const active = pathname.startsWith(href);

                      return (
                        <li key={brand.id}>
                          <Link
                            href={href}
                            className={[
                              "block py-2.5 text-sm",
                              "transition-colors hover:text-fg",
                              active
                                ? "font-semibold text-brand2"
                                : "text-muted",
                            ].join(" ")}
                          >
                            {brand.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* OTHER LINKS */}
                {LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={mobileLinkClass(item.href)}
                  >
                    {t(item.key)}
                  </Link>
                ))}

                {/* MOBILE THEME SWITCHER */}
                <div className="flex justify-end pt-5">
                  <ThemeSwitcher showLabels />
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
