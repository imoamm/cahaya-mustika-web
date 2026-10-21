
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

import { MAPS_URL, SITE, waLink } from "@/lib/constants";
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
  "mb-4 text-xs font-semibold uppercase tracking-wider text-fg";

const LINK =
  "inline-block text-sm text-muted transition-colors hover:text-fg";

const ICON_BOX =
  "grid size-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand2";

export function Footer() {
  return (
    <footer
      className={`border-t border-line bg-surface ${PAGE_PX} pb-[calc(2rem+env(safe-area-inset-bottom,0px))] pt-12 sm:pb-8 sm:pt-14`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.3fr_0.8fr_1.5fr] lg:gap-x-12">
        {/* LOGO & DESKRIPSI */}
        <div className="col-span-2 min-w-0 lg:col-span-1">
          <Link
            href="/"
            aria-label={SITE.name}
            className="inline-flex items-center"
          >
            {/* Logo untuk tema terang */}
            <Image
              src="/images/logo-footer.webp"
              alt="Cahaya Mustika Internesia - Office Equipment Center"
              width={240}
              height={240}
              className="theme-logo-light h-auto w-[120px] object-contain sm:w-[130px]"
            />

            {/* Logo untuk tema gelap */}
            <Image
              src="/images/logo-footer-dark.webp"
              alt=""
              aria-hidden="true"
              width={240}
              height={240}
              className="theme-logo-dark h-auto w-[120px] object-contain sm:w-[130px]"
            />
          </Link>

          {/* DESKRIPSI PERUSAHAAN */}
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            Cahaya Mustika Internesia adalah distributor Videotron Indoor
            dan LED Display untuk bisnis, retail, hotel, mall,
            dan institusi di Indonesia.
          </p>
        </div>

        {/* NAVIGASI */}
        <nav aria-label="Footer Navigation" className="min-w-0">
          <p className={HEADING}>Informasi perusahaan</p>

          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={LINK}>
                  <T k={link.key} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* KONTAK */}
        <div className="col-span-2 min-w-0 lg:col-span-1">
          <p className={HEADING}>Kontak</p>

          <ul className="space-y-5">
            <li>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3"
              >
                <span className={ICON_BOX}>
                  <Phone size={18} strokeWidth={1.8} />
                </span>

                <span>
                  <span className="block text-xs text-muted">
                    Telepon / WhatsApp
                  </span>

                  <span className="mt-0.5 block text-sm font-medium text-fg transition-colors group-hover:text-brand2">
                    {SITE.phone}
                  </span>
                </span>
              </a>
            </li>

            <li>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3"
              >
                <span className={ICON_BOX}>
                  <MapPin size={18} strokeWidth={1.8} />
                </span>

                <span>
                  <span className="block text-xs text-muted">
                    Alamat
                  </span>

                  <span className="mt-0.5 block max-w-xs text-sm leading-6 text-fg transition-colors group-hover:text-brand2">
                    {SITE.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mx-auto mt-10 max-w-7xl border-t border-line pt-5 sm:mt-12 sm:pt-6">
        <p className="text-center text-xs text-muted sm:text-sm">
          © 2026 {SITE.name}. <T k="footer.rights" />
        </p>
      </div>
    </footer>
  );
}
