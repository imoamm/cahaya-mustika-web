"use client";
import { FadeUp } from "@/components/animations";
import { ProductGrid } from "./ProductGrid";
import { brands } from "@/data/brands";
import { seriesList, type Product } from "@/data/products";
import { useI18n } from "@/components/i18n/LanguageProvider";

// Menampilkan produk dikelompokkan: (opsional) Brand → Seri → kartu produk.
// Produk lama tanpa seri (seri pixel pitch umum) ditaruh di grup terakhir "Seri Indoor".
// Level heading dinamis agar hierarki tidak melompat:
//   brandHeadings=true  : (h1) → h2 brand → h3 seri → h4 kartu
//   brandHeadings=false : seriesLevel=3 (di bawah h2 section) → h3 seri → h4 kartu
//                         seriesLevel=2 (langsung di bawah h1) → h2 seri → h3 kartu
export function ProductSeriesGroups({ items, brandHeadings = false, seriesLevel = 3 }: { items: Product[]; brandHeadings?: boolean; seriesLevel?: 2 | 3 }) {
  const { t } = useI18n();

  const bySeries = (id: string) => items.filter((p) => p.series === id);
  const general = items.filter((p) => !p.series);
  const sLevel = (brandHeadings ? 3 : seriesLevel) as 2 | 3;
  const cLevel = (sLevel + 1) as 3 | 4;
  const SH = sLevel === 2 ? "h2" : "h3";
  const generalLevel = (brandHeadings ? 3 : seriesLevel) as 2 | 3;

  const brandBlocks = brands
    .map((b) => ({ brand: b, series: seriesList.filter((s) => s.brand === b.id && bySeries(s.id).length > 0) }))
    .filter((b) => b.series.length > 0);

  const SeriesBlock = ({ name, list }: { name: string; list: Product[] }) => (
    <div className="mt-8 first:mt-0">
      <FadeUp>
        <SH className="mb-4 flex items-center gap-3 text-base font-semibold sm:text-lg">
          <span aria-hidden className="h-5 w-1 rounded-full bg-brand" />
          {name}
        </SH>
      </FadeUp>
      <ProductGrid items={list} level={cLevel} />
    </div>
  );

  return (
    <div className="space-y-14 sm:space-y-16">
      {brandBlocks.map(({ brand, series }) => (
        <section key={brand.id} aria-label={brand.name}>
          {brandHeadings && (
            <FadeUp>
              <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <h2 className="text-2xl font-extrabold sm:text-3xl">{brand.name}</h2>
                <span className="text-sm text-muted">
                  {series.reduce((n, s) => n + bySeries(s.id).length, 0)} {t("prod.count")}
                </span>
              </div>
            </FadeUp>
          )}
          {series.map((s) => (
            <SeriesBlock key={s.id} name={s.name} list={bySeries(s.id)} />
          ))}
        </section>
      ))}

      {general.length > 0 && (
        <section aria-label={t("prod.series")}>
          {brandHeadings && (
            <FadeUp>
              <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <h2 className="text-2xl font-extrabold sm:text-3xl">{t("prod.series")}</h2>
                <span className="text-sm text-muted">{general.length} {t("prod.count")}</span>
              </div>
            </FadeUp>
          )}
          <ProductGrid items={general} level={generalLevel} />
        </section>
      )}
    </div>
  );
}
