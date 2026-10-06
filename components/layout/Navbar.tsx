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
import { ConsultButton } from "@/components/ui/ConsultButton";
import { PAGE_PX } from "@/lib/utils";
import type { DictKey } from "@/lib/i18n/dict";

const LINKS: { key: DictKey; href: string }[] = [
  {
    key: "nav.portfolio",
    href: "/portofolio",
  },
  {
    key: "nav.articles",
    href: "/artikel",
  },
  {
    key: "nav.contact",
    href: "/kontak",
  },
];

export function Navbar() {
  const { t } = useI18n();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 24);
    };

    on();

    window.addEventListener("scroll", on, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", on);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", k);

    return () => {
      window.removeEventListener("keydown", k);
    };
  }, [open]);

  const cur = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);

  const desk = (href: string) =>
    `text-sm transition-colors hover:text-fg ${
      cur(href)
        ? "text-fg"
        : "text-muted"
    }`;

  const mob = (href: string) =>
    `block border-b border-line py-3.5 text-base outline-offset-[-2px] ${
      cur(href)
        ? "font-semibold text-brand2"
        : ""
    }`;

  return (
    <header
      className={`
        fixed
        inset-x-0
        top-0
        z-50
        transition-all
        duration-300
        ${
          scrolled || open
            ? "border-b border-line bg-[var(--nav)] py-2.5 backdrop-blur-xl"
            : "py-4"
        }
      `}
    >
      <div
        className={`
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          gap-3
          ${PAGE_PX}
        `}
      >
        {/* =========================
            LOGO
        ========================== */}
        <Logo />

        {/* =========================
            DESKTOP NAVIGATION
        ========================== */}
        <nav
          aria-label={t("nav.main")}
          className="hidden items-center gap-6 xl:flex"
        >
          <Link
            href="/"
            aria-current={
              pathname === "/"
                ? "page"
                : undefined
            }
            className={desk("/")}
          >
            {t("nav.home")}
          </Link>

          <ProductsMenu />

          {LINKS.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={
                cur(n.href)
                  ? "page"
                  : undefined
              }
              className={desk(n.href)}
            >
              {t(n.key)}
            </Link>
          ))}
        </nav>

        {/* =========================
            DESKTOP ACTIONS
        ========================== */}
        <div className="hidden items-center gap-3 xl:flex">
          {/* Satu tombol ganti tema (Terang <-> Gelap) */}
          <ThemeSwitcher />

          <ConsultButton
            className="!px-5 !py-2.5"
          />
        </div>

        {/* =========================
            MOBILE MENU BUTTON
        ========================== */}
        <button
          type="button"
          className="
            grid
            size-11
            shrink-0
            place-items-center
            rounded-full
            border
            border-line
            xl:hidden
          "
          aria-label={
            open
              ? t("nav.menuClose")
              : t("nav.menuOpen")
          }
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() =>
            setOpen((o) => !o)
          }
        >
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.span
              key={
                open
                  ? "x"
                  : "m"
              }
              initial={{
                rotate: -90,
                opacity: 0,
              }}
              animate={{
                rotate: 0,
                opacity: 1,
              }}
              exit={{
                rotate: 90,
                opacity: 0,
              }}
              transition={{
                duration: 0.18,
              }}
            >
              {open ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* =========================
          MOBILE MENU
      ========================== */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{
              opacity: 0,
              y: -12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
            transition={{
              duration: 0.25,
            }}
            className={`
              max-h-[calc(100dvh-4.5rem)]
              overflow-y-auto
              overscroll-contain
              pb-6
              pt-3
              xl:hidden
              ${PAGE_PX}
            `}
          >
            <nav
              aria-label={t("nav.mobile")}
              className="
                flex
                flex-col
                md:mx-auto
                md:max-w-xl
              "
            >
              {/* =========================
                  BERANDA
              ========================== */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -16,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
              >
                <Link
                  href="/"
                  className={mob("/")}
                >
                  {t("nav.home")}
                </Link>
              </motion.div>

              {/* =========================
                  PRODUK
              ========================== */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -16,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.04,
                }}
                className="border-b border-line"
              >
                <Link
                  href="/produk"
                  className="
                    block
                    py-3.5
                    text-base
                    outline-offset-[-2px]
                  "
                >
                  {t("nav.products")}
                </Link>

                <ul className="mb-2 ml-3 border-l border-line pl-3">
                  {brands.map((b) => (
                    <li key={b.id}>
                      <Link
                        href={`/produk/${b.id}`}
                        className={`
                          block
                          py-2.5
                          text-[0.9375rem]
                          text-muted
                          outline-offset-[-2px]
                          hover:text-fg
                          ${
                            pathname.startsWith(
                              `/produk/${b.id}`
                            )
                              ? "font-semibold text-brand2"
                              : ""
                          }
                        `}
                      >
                        {b.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* =========================
                  LINK LAINNYA
              ========================== */}
              {LINKS.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{
                    opacity: 0,
                    x: -16,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay:
                      0.04 * (i + 2),
                  }}
                >
                  <Link
                    href={n.href}
                    className={mob(n.href)}
                  >
                    {t(n.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* =========================
                MOBILE ACTIONS
            ========================== */}
            <div
              className="
                mt-6
                flex
                flex-col
                gap-4
                md:mx-auto
                md:max-w-xl
              "
            >
              <ConsultButton />

              <div className="flex items-center justify-end">
                {/* Satu tombol ganti tema (Terang <-> Gelap) */}
                <ThemeSwitcher showLabels />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}