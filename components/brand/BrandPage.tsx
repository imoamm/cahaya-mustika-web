import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { ConsultButton } from "@/components/ui/ConsultButton";
import { FadeUp, Parallax, ScaleIn, Stagger, StaggerItem, TextReveal } from "@/components/animations";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { Gallery } from "@/components/sections/Gallery";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { T, Tx } from "@/components/i18n/T";
import { bi } from "@/lib/i18n/types";
import { productsByBrand } from "@/data/products";
import type { Brand } from "@/data/brands";

// Template halaman brand (Samsung / LG / Hikvision) — satu template, konsisten:
// hero reveal → tentang → produk (stagger) → spesifikasi (reveal) → keunggulan → galeri (parallax) → aplikasi → CTA.
// Konten diambil dari data/brands.ts & data/products.ts — tidak ada klaim teknis yang dikarang.
export function BrandPage({ brand }: { brand: Brand }) {
  const list = productsByBrand(brand.id);
  const withSpecs = list.filter((p) => p.specifications);
  const msg = bi(`Halo, saya ingin konsultasi produk ${brand.name}.`, `Hello, I would like a consultation about ${brand.name} products.`);
  return (
    <>
      <Section first>
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted sm:mb-8">
          <Link href="/produk" className="hover:text-fg"><T k="nav.products" /></Link><ChevronRight size={14} aria-hidden /><span aria-current="page" className="text-fg">{brand.name}</span>
        </nav>
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <span className="mb-5 inline-flex h-12 items-center rounded-full bg-white px-5 shadow-lg shadow-black/10 ring-1 ring-black/5">
              <Image src={brand.logo} alt={`Logo ${brand.name}`} width={140} height={32} unoptimized priority className="h-5 w-auto max-w-[12rem] object-contain sm:h-6" />
            </span>
            <h1 className="fluid-h1 font-extrabold"><TextReveal text={brand.name} /></h1>
            <FadeUp delay={0.15}><p className="mt-3 text-lg font-medium text-brand2"><Tx v={brand.tagline} /></p></FadeUp>
            <FadeUp delay={0.25}><p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:mt-5"><Tx v={brand.about} /></p></FadeUp>
            <FadeUp delay={0.35}>
              <div className="mt-6 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap sm:mt-8">
                <ConsultButton message={msg} />
                <Button href="#produk-brand" variant="ghost"><T k="cta.viewProducts" /></Button>
              </div>
            </FadeUp>
            {brand.placeholder && <div className="mt-5"></div>}
          </div>
          <ScaleIn delay={0.1}>
            <Parallax offset={18}>
              <div className="card relative aspect-[4/3] overflow-hidden rounded-2xl sm:rounded-3xl">
                <Media src={brand.image} alt={bi(`${brand.name} LED Display`, `${brand.name} LED Display`)} label={brand.name} sublabel={bi("Videotron Indoor & LED Display", "Indoor Videotron & LED Display")} sizes="(min-width:1024px) 50vw, 100vw" priority />
              </div>
            </Parallax>
          </ScaleIn>
        </div>
      </Section>

      <Section id="produk-brand" className="!pt-0">
        <SectionHeading title={<><T k="prod.list" /> {brand.name}</>} />
        {list.length ? <ProductGrid items={list} /> : <p className="card rounded-2xl p-8 text-center text-sm text-muted"><T k="prod.comingSoon" /></p>}
        {list.every((p) => p.placeholder) && <FadeUp className="mt-4"><p className="text-sm text-muted"><T k="ph.brandNote" /></p></FadeUp>}
      </Section>

      <Section id="spesifikasi-brand" className="!pt-0">
        <SectionHeading title={<><T k="common.spec" /> {brand.name}</>} />
        {withSpecs.length ? (
          <Stagger className="grid gap-3">
            {withSpecs.map((p, i) => (
              <StaggerItem key={p.slug} index={i}>
                <div className="card rounded-2xl p-4 sm:p-6">
                  <h3 className="font-bold">{p.name}</h3>
                  <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                    <div><dt className="text-muted"><T k="common.pixelPitch" /></dt><dd className="font-medium"><Tx v={p.specifications!.pixelPitch} /></dd></div>
                    <div><dt className="text-muted"><T k="common.brightness" /></dt><dd className="font-medium"><Tx v={p.specifications!.brightness} /></dd></div>
                    <div><dt className="text-muted"><T k="prod.refreshRate" /></dt><dd className="font-medium"><Tx v={p.specifications!.refreshRate} /></dd></div>
                    <div><dt className="text-muted"><T k="prod.idealDistance" /></dt><dd className="font-medium"><Tx v={p.specifications!.idealDistance} /></dd></div>
                  </dl>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <FadeUp>
            <div className="card rounded-2xl p-6 text-sm text-muted sm:p-8">
              <p><T k="ph.brandNote" /></p>
</div>
          </FadeUp>
        )}
        <p className="mt-3 text-xs text-muted"><T k="ph.specDisclaimer" /></p>
      </Section>

      <Section className="!pt-0">
        <SectionHeading title={<><T k="common.advantages" /> {brand.name}</>} />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brand.advantages.map((a, i) => (
            <StaggerItem key={a.title.id} index={i}>
              <div className="card card-hover h-full rounded-3xl p-6 sm:p-7">
                <h3 className="text-lg font-bold"><Tx v={a.title} /></h3>
                <p className="mt-2 text-sm leading-relaxed text-muted"><Tx v={a.text} /></p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-4 lg:grid-cols-2">
          {[
            { title: bi("Teknologi", "Technology"), items: brand.technology },
            { title: bi("Penggunaan", "Usage"), items: brand.usage },
          ].map((col) => (
            <FadeUp key={col.title.id}>
              <div className="card h-full rounded-3xl p-6 sm:p-8">
                <h2 className="text-xl font-bold sm:text-2xl"><Tx v={col.title} /> {brand.name}</h2>
                <ul className="mt-5 grid gap-3">
                  {col.items.map((it) => (
                    <li key={it.id} className="flex items-start gap-3 text-sm leading-relaxed sm:text-base">
                      <span aria-hidden className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand/15 text-brand2"><Check size={14} /></span>
                      <span className="min-w-0"><Tx v={it} /></span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </Section>

      <Gallery />
      <CtaBanner />
    </>
  );
}
