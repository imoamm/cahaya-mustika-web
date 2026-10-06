import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations";
import { ProductGrid } from "./ProductGrid";
import { showcaseProducts } from "@/data/products";
import { T } from "@/components/i18n/T";

// Showcase produk: grid normal di semua device (mengalir mengikuti document flow).
export function Products() {
  return (
    <Section id="produk">
      <SectionHeading align="center" title={<T k="prod.title" />} desc={<T k="prod.desc" />} />
      <ProductGrid items={showcaseProducts} />
      <FadeUp className="mt-8 text-center sm:mt-12"><Button href="/produk" variant="ghost"><T k="cta.allProducts" /></Button></FadeUp>
    </Section>
  );
}
