import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandPage } from "@/components/brand/BrandPage";
import { ProductDetail } from "@/components/product/ProductDetail";
import { brands, getBrand } from "@/data/brands";
import { getProduct, products } from "@/data/products";

// Satu segment dinamis melayani DUA jenis URL agar URL lama tidak putus:
//   /produk/samsung | /lg | /hivision   → halaman brand
//   /produk/indoor-p1-25 (dst.)         → detail produk yang belum punya brand (URL lama tetap hidup)
type Props = { params: Promise<{ segment: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return [...brands.map((b) => ({ segment: b.id })), ...products.filter((p) => !p.brand).map((p) => ({ segment: p.slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segment } = await params;
  const brand = getBrand(segment);
  if (brand) {
    const title = `${brand.name} Videotron Indoor & LED Display`;
    const description = brand.tagline.id;
    return { title, description, alternates: { canonical: `/produk/${brand.id}` }, openGraph: { title, description } };
  }
  const p = getProduct(segment);
  if (!p || p.brand) return {};
  const title = `${p.name} Videotron Indoor`;
  return { title, description: p.summary.id, alternates: { canonical: `/produk/${p.slug}` }, openGraph: { title, description: p.summary.id } };
}

export default async function Page({ params }: Props) {
  const { segment } = await params;
  const brand = getBrand(segment);
  if (brand) return <BrandPage brand={brand} />;
  const p = getProduct(segment);
  if (!p || p.brand) notFound();
  return <ProductDetail product={p} />;
}
