"use client";
import { useMemo, useState } from "react";
import { FilterChips } from "@/components/ui/FilterChips";
import { FilterGrid } from "@/components/ui/FilterGrid";
import { ProductCard } from "./ProductCard";
import { brands, type BrandId } from "@/data/brands";
import type { Product } from "@/data/products";
import { bi } from "@/lib/i18n/types";
import { useI18n } from "@/components/i18n/LanguageProvider";

type Filter = "all" | BrandId;

// Katalog /produk: filter brand di sisi client (tanpa reload). Konten HTML awal tetap dirender server.
export function ProductCatalog({ items, initial = "all" }: { items: Product[]; initial?: Filter }) {
  const { t } = useI18n();
  const [filter, setFilter] = useState<Filter>(initial);
  const options = useMemo(() => [{ id: "all" as Filter, label: bi("Semua", "All") }, ...brands.map((b) => ({ id: b.id as Filter, label: b.name }))], []);
  const shown = filter === "all" ? items : items.filter((p) => p.brand === filter);
  return (
    <>
      <FilterChips options={options} value={filter} onChange={setFilter} label={bi("Filter brand", "Filter by brand")} />
      <FilterGrid
        items={shown}
        getKey={(p) => p.slug}
        className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        render={(p) => <ProductCard p={p} />}
        empty={<p role="status" className="card rounded-2xl p-8 text-center text-sm text-muted">{t("common.empty")}</p>}
      />
    </>
  );
}
