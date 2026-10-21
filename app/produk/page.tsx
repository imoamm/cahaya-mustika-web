import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { T } from "@/components/i18n/T";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Produk Videotron Indoor & LED Display",
  description: "Katalog Videotron Indoor dan LED Display Samsung, LG, dan Vision untuk mall, hotel, restoran, showroom, dan ruang meeting.",
  alternates: { canonical: "/produk" },
};

export default function ProdukPage() {
  return (
    <>
      <Section first>
        <SectionHeading h1 title={<T k="prod.title" />} desc={<T k="prod.desc" />} />
        <ProductCatalog items={products} />
      </Section>
      <CtaBanner />
    </>
  );
}
