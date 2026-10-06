import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/Section";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { ConsultButton } from "@/components/ui/ConsultButton";

import {
  FadeLeft,
  FadeRight,
  Stagger,
  StaggerItem,
} from "@/components/animations";

import { ProductGrid } from "@/components/sections/ProductGrid";
import { Features } from "@/components/sections/Features";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";

import { T, Tx } from "@/components/i18n/T";
import { bi } from "@/lib/i18n/types";
import { getBrand } from "@/data/brands";
import {
  products,
  type Product,
  type Specs,
} from "@/data/products";

import type { DictKey } from "@/lib/i18n/dict";

const SPEC_ROWS: [DictKey, keyof Specs][] = [
  ["common.pixelPitch", "pixelPitch"],
  ["common.brightness", "brightness"],
  ["prod.refreshRate", "refreshRate"],
  ["prod.cabinetSize", "cabinetSize"],
  ["prod.moduleSize", "moduleSize"],
  ["prod.viewingAngle", "viewingAngle"],
  ["prod.lifespan", "lifespan"],
  ["prod.powerConsumption", "power"],
  ["prod.ip", "ip"],
  ["prod.opTemp", "temperature"],
  ["prod.idealDistance", "idealDistance"],
];

export function ProductDetail({
  product: p,
}: {
  product: Product;
}) {
  const brand = p.brand ? getBrand(p.brand) : null;
  const specs = p.specifications;

  const sameBrand = (x: Product) =>
    x.slug !== p.slug && !x.placeholder;

  const related = products
    .filter(sameBrand)
    .sort(
      (a, b) =>
        Number(b.brand === p.brand) -
        Number(a.brand === p.brand)
    )
    .slice(0, 3);

  const consult = bi(
    `Halo, saya ingin berkonsultasi tentang ${p.name}.`,
    `Hello, I would like to consult about ${p.name}.`
  );

  return (
    <>
      {/* =====================================================
          HERO / DETAIL PRODUK
      ===================================================== */}
      <Section first>
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="
            mb-6
            flex
            flex-wrap
            items-center
            gap-1
            text-sm
            text-muted
            sm:mb-8
          "
        >
          <Link
            href="/produk"
            className="hover:text-fg"
          >
            <T k="nav.products" />
          </Link>

          {brand && (
            <>
              <ChevronRight
                size={14}
                aria-hidden
              />

              <Link
                href={`/produk/${brand.id}`}
                className="hover:text-fg"
              >
                {brand.name}
              </Link>
            </>
          )}

          <ChevronRight
            size={14}
            aria-hidden
          />

          <span
            aria-current="page"
            className="text-fg"
          >
            {p.name}
          </span>
        </nav>

        {/* Detail Produk */}
        <div
          className="
            grid
            items-center
            gap-8
            sm:gap-10
            lg:grid-cols-2
            lg:gap-12
          "
        >
          {/* Gambar */}
          <FadeRight>
            <div
              className="
                card
                relative
                aspect-[4/3]
                overflow-hidden
                rounded-2xl
                sm:rounded-3xl
              "
            >
              <Media
                src={p.images[0]}
                alt={{
                  id: `${p.name} ${p.category.id}`,
                  en: `${p.name} ${p.category.en}`,
                }}
                label={p.name}
                sublabel={p.category}
                sizes="(min-width:1024px) 50vw, 100vw"
                priority
              />
            </div>
          </FadeRight>

          {/* Informasi */}
          <FadeLeft className="min-w-0">
            {brand && (
              <p className="mb-2 text-sm font-semibold text-brand2">
                {brand.name}
              </p>
            )}

            <h1 className="fluid-h1 font-extrabold">
              {p.name}
            </h1>

            {specs && (
              <p className="mt-2 text-brand2">
                <T k="common.pixelPitch" />{" "}
                <Tx v={specs.pixelPitch} />
              </p>
            )}

            <p
              className="
                mt-4
                text-base
                leading-relaxed
                text-muted
                sm:mt-5
              "
            >
              <Tx v={p.summary} />
            </p>

            {/* Konsultasi */}
            <div
              className="
                mt-6
                flex
                flex-col
                gap-3
                min-[480px]:flex-row
                min-[480px]:flex-wrap
                sm:mt-8
              "
            >
              <ConsultButton message={consult} />
            </div>
          </FadeLeft>
        </div>
      </Section>

      {/* =====================================================
          SPESIFIKASI
      ===================================================== */}
      <Section className="!pt-0">
        <SectionHeading
          title={<T k="common.spec" />}
        />

        {specs ? (
          <Stagger
            className="
              card
              overflow-hidden
              rounded-2xl
              sm:rounded-3xl
            "
          >
            <dl>
              {SPEC_ROWS.map(([label, key], i) => (
                <StaggerItem
                  key={key}
                  index={i}
                >
                  <div
                    className="
                      grid
                      gap-1
                      border-b
                      border-line
                      px-4
                      py-3.5
                      text-sm
                      transition-colors
                      last:border-0
                      hover:bg-brand/5
                      sm:grid-cols-[14rem_1fr]
                      sm:gap-6
                      sm:px-6
                      sm:py-4
                    "
                  >
                    <dt className="text-muted">
                      <T k={label} />
                    </dt>

                    <dd
                      className="
                        min-w-0
                        break-words
                        font-medium
                      "
                    >
                      <Tx v={specs[key]} />
                    </dd>
                  </div>
                </StaggerItem>
              ))}
            </dl>
          </Stagger>
        ) : (
          <div
            className="
              card
              rounded-2xl
              p-6
              text-sm
              text-muted
              sm:p-8
            "
          >
            <p>
              <T k="ph.brandNote" />
            </p>
          </div>
        )}

        <p className="mt-3 text-xs text-muted">
          <T k="ph.specDisclaimer" />
        </p>
      </Section>

      {/* =====================================================
          FITUR PRODUK
      ===================================================== */}
      <Features />

      {/* =====================================================
          FAQ
      ===================================================== */}
      <Faq />

      {/* =====================================================
          PRODUK LAINNYA
      ===================================================== */}
      <Section className="!pt-0">
        <SectionHeading
          title={
            <T k="common.otherProducts" />
          }
        />

        <ProductGrid items={related} />

        <div className="mt-8 text-center">
          <Button
            href="/produk"
            variant="ghost"
          >
            <T k="cta.allProducts" />
          </Button>
        </div>
      </Section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <CtaBanner />
    </>
  );
}