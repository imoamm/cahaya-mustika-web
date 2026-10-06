"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Media } from "@/components/ui/Media";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { productHref, type Product } from "@/data/products";
import { getBrand } from "@/data/brands";

export function ProductCard({ p }: { p: Product }) {
  const { t, tx } = useI18n();

  const s = p.specifications;
  const brand = p.brand ? getBrand(p.brand) : null;

  return (
    <Link
      href={productHref(p)}
      aria-label={`${t("cta.viewDetailOf")} ${p.name}`}
      className="
        card
        card-hover
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-3xl
      "
    >
      {/* Gambar Produk */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Media
          src={p.images[0]}
          alt={`${p.name} ${tx(p.category)}`}
          label={p.name}
          sublabel={p.category}
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="
            transition
            duration-700
            group-hover:scale-110
          "
        />

        {/* Brand */}
        {brand && (
          <span
            className="
              absolute
              left-3
              top-3
              rounded-full
              border
              border-line
              bg-[var(--nav)]
              px-3
              py-1
              text-xs
              font-semibold
              backdrop-blur-xl
            "
          >
            {brand.name}
          </span>
        )}
      </div>

      {/* Informasi Produk */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-bold sm:text-xl">
          {p.name}
        </h3>

        {s ? (
          <>
            <p className="mt-1 text-sm text-muted">
              {t("common.pixelPitch")}: {tx(s.pixelPitch)}
            </p>

            <dl
              className="
                mt-4
                grid
                grid-cols-3
                gap-2
                border-t
                border-line
                pt-4
                text-xs
                sm:mt-5
                sm:gap-3
                [&>div]:min-w-0
                [&_dd]:break-words
              "
            >
              <div>
                <dt className="text-muted">
                  {t("common.brightness")}
                </dt>
                <dd className="mt-0.5 font-medium">
                  {tx(s.brightness)}
                </dd>
              </div>

              <div>
                <dt className="text-muted">
                  {t("common.refresh")}
                </dt>
                <dd className="mt-0.5 font-medium">
                  {tx(s.refreshRate)}
                </dd>
              </div>

              <div>
                <dt className="text-muted">
                  {t("common.cabinet")}
                </dt>
                <dd className="mt-0.5 font-medium">
                  {tx(s.cabinetSize)}
                </dd>
              </div>
            </dl>
          </>
        ) : (
          <div className="mt-2 flex-1">
            <p className="text-sm leading-relaxed text-muted">
              {tx(p.summary)}
            </p>
          </div>
        )}

        {/* Detail */}
        <span
          className="
            mt-5
            inline-flex
            items-center
            gap-1.5
            text-sm
            font-medium
            text-brand2
            sm:mt-6
          "
        >
          {t("cta.viewDetail")}

          <ArrowUpRight
            size={16}
            className="
              transition-transform
              duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </span>
      </div>
    </Link>
  );
}