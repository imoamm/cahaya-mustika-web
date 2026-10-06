import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

import { SITE, waLink } from "@/lib/constants";
import { brands } from "@/data/brands";
import { ConsultButton } from "@/components/ui/ConsultButton";
import { T } from "@/components/i18n/T";
import { PAGE_PX } from "@/lib/utils";
import type { DictKey } from "@/lib/i18n/dict";

const links: { key: DictKey; href: string }[] = [
  { key: "nav.home", href: "/" },
  { key: "nav.products", href: "/produk" },
  { key: "nav.portfolio", href: "/portofolio" },
  { key: "nav.articles", href: "/artikel" },
  { key: "nav.contact", href: "/kontak" },
];

const HEADING =
  "mb-4 text-sm font-semibold text-fg sm:text-base";

const LINK =
  "inline-block text-sm text-muted transition-colors hover:text-fg sm:text-[15px]";

export function Footer() {
  return (
    <footer
      className={`
        border-t
        border-line
        bg-surface
        ${PAGE_PX}
        pb-[calc(2rem+env(safe-area-inset-bottom,0px))]
        pt-10
        sm:pb-8
        sm:pt-12
      `}
    >
      <div
        className="
          mx-auto
          grid
          max-w-7xl
          grid-cols-1
          gap-10
          sm:grid-cols-2
          lg:grid-cols-[1.5fr_1fr_1fr_1.25fr]
          lg:gap-12
        "
      >
        {/* =====================================================
            KOLOM 1 — LOGO & DESKRIPSI
        ====================================================== */}
        <div className="min-w-0">
          <Link
            href="/"
            aria-label="Cahaya Mustika"
            className="inline-flex items-center"
          >
            <Image
              src="/images/logo-footer.png"
              alt="Cahaya Mustika Indonesia - Office Equipment Center"
              width={240}
              height={100}
              priority
              className="
                h-auto
                w-[170px]
                object-contain
                sm:w-[185px]
              "
            />
          </Link>

          <p className="mt-5 text-sm font-semibold text-fg">
            Distributor Videotron Indoor & LED Display
          </p>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
            Cahaya Mustika adalah distributor Videotron Indoor
            dan LED Display untuk bisnis, retail, hotel, mall,
            dan institusi di Indonesia.
          </p>

          <div className="mt-5">
            <ConsultButton />
          </div>
        </div>

        {/* =====================================================
            KOLOM 2 — NAVIGASI
        ====================================================== */}
        <nav aria-label="Footer Navigation" className="min-w-0">
          <h2 className={HEADING}>
            Navigasi
          </h2>

          <ul className="space-y-2.5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={LINK}
                >
                  <T k={link.key} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* =====================================================
            KOLOM 3 — PRODUK
        ====================================================== */}
        <div className="min-w-0">
          <h2 className={HEADING}>
            Produk
          </h2>

          <ul className="space-y-2.5">
            {brands.map((brand) => (
              <li key={brand.id}>
                <Link
                  href={`/produk/${brand.id}`}
                  className={LINK}
                >
                  {brand.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* =====================================================
            KOLOM 4 — KONTAK
        ====================================================== */}
        <div className="min-w-0">
          <h2 className={HEADING}>
            Kontak
          </h2>

          {/* Telepon / WhatsApp */}
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              flex
              items-start
              gap-3
              transition-colors
            "
          >
            <Phone
              size={20}
              strokeWidth={1.8}
              className="
                mt-0.5
                shrink-0
                text-primary
                transition-transform
                group-hover:scale-105
              "
            />

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Telepon / WhatsApp
              </p>

              <p className="mt-1 text-sm text-fg sm:text-[15px]">
                {SITE.phone}
              </p>
            </div>
          </a>

          {/* Alamat */}
          <div className="mt-6 flex items-start gap-3">
            <MapPin
              size={20}
              strokeWidth={1.8}
              className="
                mt-0.5
                shrink-0
                text-primary
              "
            />

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Alamat
              </p>

              <p className="mt-1 max-w-xs text-sm leading-6 text-fg sm:text-[15px]">
                {SITE.addressLines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          COPYRIGHT
      ====================================================== */}
      <div
        className="
          mx-auto
          mt-10
          max-w-7xl
          border-t
          border-line
          pt-5
          sm:mt-12
          sm:pt-6
        "
      >
        <p className="text-xs text-muted sm:text-sm">
          © 2026 {SITE.name}. <T k="footer.rights" />
        </p>
      </div>
    </footer>
  );
}