"use client";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { FilterChips } from "@/components/ui/FilterChips";
import { ProductSeriesGroups } from "./ProductSeriesGroups";
import { brands, type BrandId } from "@/data/brands";
import type { Product } from "@/data/products";
import { bi } from "@/lib/i18n/types";
import { useI18n } from "@/components/i18n/LanguageProvider";

type Filter = "all" | BrandId;

// Katalog /produk: filter brand di sisi client (tanpa reload). Produk dikelompokkan Brand → Seri.
export function ProductCatalog({ items, initial = "all" }: { items: Product[]; initial?: Filter }) {
  const { t } = useI18n();
  const [filter, setFilter] = useState<Filter>(initial);
  const options = useMemo(() => [{ id: "all" as Filter, label: bi("Semua", "All") }, ...brands.map((b) => ({ id: b.id as Filter, label: b.name }))], []);
  const shown = filter === "all" ? items : items.filter((p) => p.brand === filter);
  return (
    <>
      <FilterChips options={options} value={filter} onChange={setFilter} label={bi("Filter brand", "Filter by brand")} />
      {shown.length ? (
        <motion.div key={filter} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
          <ProductSeriesGroups items={shown} brandHeadings={filter === "all"} seriesLevel={2} />
        </motion.div>
      ) : (
        <p role="status" className="card rounded-2xl p-8 text-center text-sm text-muted">{t("common.empty")}</p>
      )}
    </>
  );
}
