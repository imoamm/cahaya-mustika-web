import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { products, productHref } from "@/data/products";
import { brands } from "@/data/brands";
import { articles } from "@/data/articles";
import { portfolio } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number) => ({ url: `${SITE.url}${path}`, changeFrequency: "monthly" as const, priority });
  return [
    entry("", 1),
    ...["/produk", "/portofolio", "/artikel", "/tentang-kami", "/kontak"].map((p) => entry(p, 0.8)),
    ...brands.map((b) => entry(`/produk/${b.id}`, 0.8)),
    ...products.map((p) => entry(productHref(p), 0.7)),
    ...articles.map((a) => entry(`/artikel/${a.slug}`, 0.6)),
    ...portfolio.filter((p) => !p.sample).map((p) => entry(`/portofolio/${p.slug}`, 0.6)), // contoh (sample) tidak diindeks
  ];
}
