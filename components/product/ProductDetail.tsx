import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/Section";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";

import { FadeLeft, FadeRight } from "@/components/animations";

import { ProductGrid } from "@/components/sections/ProductGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";

import { T, Tx } from "@/components/i18n/T";
import { bi } from "@/lib/i18n/types";
import { getBrand } from "@/data/brands";
import { getSeries } from "@/data/products";
import { products, type Product } from "@/data/products";
import { getSpecDetail, type SpecDetail } from "@/data/spec-details";

// Urutan & label baris tabel spesifikasi. Baris tanpa data otomatis disembunyikan.
const SPEC_ROWS: [keyof SpecDetail, ReturnType<typeof bi>][] = [
  ["pixelPitch", bi("Pixel Pitch")],
  ["technology", bi("Teknologi LED", "LED Technology")],
  ["cabinet", bi("Kabinet", "Cabinet")],
  ["resolution", bi("Resolusi Kabinet", "Cabinet Resolution")],
  ["brightness", bi("Kecerahan", "Brightness")],
  ["contrast", bi("Kontras", "Contrast")],
  ["refreshRate", bi("Refresh Rate")],
  ["viewingAngle", bi("Sudut Pandang", "Viewing Angle")],
  ["power", bi("Konsumsi Daya", "Power Consumption")],
  ["protection", bi("Perlindungan", "Protection")],
  ["weight", bi("Berat Kabinet", "Cabinet Weight")],
  ["lifespan", bi("Usia Pakai", "Lifespan")],
  ["idealDistance", bi("Jarak Pandang Ideal", "Ideal Viewing Distance")],
  ["temperature", bi("Suhu Operasi", "Operating Temperature")],
];

export function ProductDetail({ product: p }: { product: Product }) {
  const brand = p.brand ? getBrand(p.brand) : null;
  const series = getSeries(p.series);

  const sameBrand = (x: Product) => x.slug !== p.slug && !x.placeholder;

  const related = products
    .filter(sameBrand)
    .sort(
      (a, b) =>
        Number(b.series === p.series) - Number(a.series === p.series) ||
        Number(b.brand === p.brand) - Number(a.brand === p.brand)
    )
    .slice(0, 3);

  const detail = getSpecDetail(p);
  const rows = SPEC_ROWS.filter(([k]) => detail[k]);
  const incomplete = !p.specifications && rows.length < 11; // < 11 baris = datasheet belum lengkap

  return (
    <>
      {/* =====================================================
          HERO / DETAIL PRODUK
          Kiri: gambar (sticky)  ·  Kanan: info + spesifikasi
      ===================================================== */}
      <Section first>
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted sm:mb-8"
        >
          <Link href="/produk" className="hover:text-fg">
            <T k="nav.products" />
          </Link>

          {brand && (
            <>
              <ChevronRight size={14} aria-hidden />
              <Link href={`/produk/${brand.id}`} className="hover:text-fg">
                {brand.name}
              </Link>
            </>
          )}

          <ChevronRight size={14} aria-hidden />
          <span aria-current="page" className="text-fg">
            {p.name}
          </span>
        </nav>

        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Gambar */}
          <FadeRight className="lg:sticky lg:top-24">
            <div className="card relative aspect-[4/3] overflow-hidden rounded-2xl sm:rounded-3xl">
              <Media
                src={p.images[0]}
                alt={{
                  id: `${p.name} ${p.category.id}`,
                  en: `${p.name} ${p.category.en}`,
                }}
                label={
                  p.pitch
                    ? `${p.pitch}${p.tags?.length ? " " + p.tags.join(" ") : ""}`
                    : p.name
                }
                sublabel={series ? series.name : p.category}
                sizes="(min-width:1024px) 50vw, 100vw"
                priority
              />
            </div>
          </FadeRight>

          {/* Informasi + Spesifikasi */}
          <FadeLeft className="min-w-0">
            <h1 className="fluid-h1 font-extrabold">{p.name}</h1>

            {/* Spesifikasi */}
            <section aria-labelledby="spesifikasi" className="mt-6 sm:mt-8">
              <h2
                id="spesifikasi"
                className="border-b border-line pb-3 font-[family-name:var(--font-heading)] text-sm font-bold uppercase tracking-wider"
              >
                <Tx v={bi("Spesifikasi Utama", "Key Specifications")} />
              </h2>

              <dl className="mt-3">
                {rows.map(([key, label]) => (
                  <div
                    key={key}
                    className="grid gap-1 rounded-md px-3 py-3.5 text-sm odd:bg-brand/5 sm:grid-cols-[10.5rem_1fr] sm:gap-4"
                  >
                    <dt className="font-semibold">
                      <Tx v={label} />
                    </dt>
                    <dd className="min-w-0 break-words leading-relaxed text-muted">
                      <Tx v={detail[key]} />
                    </dd>
                  </div>
                ))}
              </dl>

              {incomplete && (
                <p className="mt-3 rounded-md bg-brand/5 px-3 py-3 text-sm text-muted">
                  <T k="prod.specOnRequest" />
                </p>
              )}

              <p className="mt-3 text-xs text-muted">
                <T k="ph.specDisclaimer" />
              </p>
            </section>
          </FadeLeft>
        </div>
      </Section>

      {/* =====================================================
          PRODUK LAINNYA
      ===================================================== */}
      <Section className="!pt-0">
        <SectionHeading title={<T k="common.otherProducts" />} />

        <ProductGrid items={related} />

        <div className="mt-8 text-center">
          <Button href="/produk" variant="ghost">
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
