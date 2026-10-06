import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { getProduct, products } from "@/data/products";

// /produk/[brand]/[slug] — detail produk ber-brand (mis. /produk/samsung/samsung-indoor-led).
type Props = { params: Promise<{ segment: string; slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return products.filter((p) => p.brand).map((p) => ({ segment: p.brand!, slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segment, slug } = await params;
  const p = getProduct(slug);
  if (!p || p.brand !== segment) return {};
  const title = `${p.name} — Videotron Indoor`;
  return { title, description: p.summary.id, alternates: { canonical: `/produk/${p.brand}/${p.slug}` }, openGraph: { title, description: p.summary.id } };
}

export default async function Page({ params }: Props) {
  const { segment, slug } = await params;
  const p = getProduct(slug);
  if (!p || p.brand !== segment) notFound();
  return <ProductDetail product={p} />;
}
