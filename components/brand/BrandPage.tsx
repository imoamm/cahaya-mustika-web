
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { ConsultButton } from "@/components/ui/ConsultButton";
import { FadeUp, Stagger, StaggerItem, TextReveal } from "@/components/animations";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ProductSeriesGroups } from "@/components/sections/ProductSeriesGroups";
import { T, Tx } from "@/components/i18n/T";
import { bi } from "@/lib/i18n/types";
import { PAGE_PX } from "@/lib/utils";
import { productsByBrand } from "@/data/products";
import type { Brand } from "@/data/brands";

// Template halaman brand tanpa logo di bagian hero.
export function BrandPage({ brand }: { brand: Brand }) {
  const list = productsByBrand(brand.id);
  const withSpecs = list.filter((p) => p.specifications);

  const msg = bi(
    `Halo, saya ingin konsultasi produk ${brand.name}.`,
    `Hello, I would like a consultation about ${brand.name} products.`
  );

  return (
    <>
      {/* HERO FULL-WIDTH */}
      <section
        className={`relative isolate overflow-hidden bg-[#050c24] text-white ${PAGE_PX} pb-14 pt-28 sm:pb-20 sm:pt-32 lg:flex lg:min-h-[34rem] lg:items-end lg:pb-24 lg:pt-40`}
      >
        {/* Background */}
        <div aria-hidden className="absolute inset-0 -z-20">
          <Media
            src={brand.image}
            alt={`${brand.name} LED Display`}
            label=""
            sublabel={bi("Videotron Indoor & LED Display", "Indoor Videotron & LED Display")}
            sizes="100vw"
            priority
          />
        </div>

        {/* Overlay */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050c24] via-[#050c24]/70 to-[#050c24]/35 lg:bg-gradient-to-r lg:from-[#050c24] lg:from-[10%] lg:via-[#050c24]/70 lg:via-[45%] lg:to-[#050c24]/10"
        />

        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-[#050c24]/70 to-transparent"
        />

        <div className="mx-auto w-full max-w-7xl">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-1 text-sm text-white/70 sm:mb-8"
          >
            <Link href="/produk" className="hover:text-white">
              <T k="nav.products" />
            </Link>

            <ChevronRight size={14} aria-hidden />

            <span aria-current="page" className="text-white">
              {brand.name}
            </span>
          </nav>

          <div className="min-w-0 max-w-2xl">
            {/* Logo brand dihapus */}

            {/* Judul */}
            <h1 className="fluid-h1 font-extrabold">
              <TextReveal text={brand.name} />
              <span className="mt-2 block text-[0.42em] font-bold leading-tight text-white/85">Videotron Indoor &amp; LED Display</span>
            </h1>

            {/* Tagline */}
            <FadeUp delay={0.15}>
              <p className="mt-3 text-lg font-medium text-[#5AA2FF]">
                <Tx v={brand.tagline} />
              </p>
            </FadeUp>

            {/* Deskripsi */}
            <FadeUp delay={0.25}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:mt-5">
                <Tx v={brand.about} />
              </p>
            </FadeUp>

            {/* Tombol */}
            <FadeUp delay={0.35}>
              <div className="mt-6 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap sm:mt-8">
                <ConsultButton message={msg} />

                <Button href="#produk-brand" variant="ghost">
                  <T k="cta.viewProducts" />
                </Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Daftar produk */}
      <Section id="produk-brand">
        <SectionHeading
          title={
            <>
              <T k="prod.list" /> {brand.name}
            </>
          }
        />

        {list.length ? (
          <ProductSeriesGroups items={list} />
        ) : (
          <p className="card rounded-2xl p-8 text-center text-sm text-muted">
            <T k="prod.comingSoon" />
          </p>
        )}

        {list.every((p) => p.placeholder) && (
          <FadeUp className="mt-4">
            <p className="text-sm text-muted">
              <T k="ph.brandNote" />
            </p>
          </FadeUp>
        )}
      </Section>

      {/* Spesifikasi produk */}
      {withSpecs.length > 0 && (
        <Section id="spesifikasi-brand" className="!pt-0">
          <SectionHeading
            title={
              <>
                <T k="common.spec" /> {brand.name}
              </>
            }
          />

          <Stagger className="grid gap-3">
            {withSpecs.map((p, i) => (
              <StaggerItem key={p.slug} index={i}>
                <div className="card rounded-2xl p-4 sm:p-6">
                  <h3 className="font-bold">{p.name}</h3>

                  <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                    <div>
                      <dt className="text-muted">
                        <T k="common.pixelPitch" />
                      </dt>
                      <dd className="font-medium">
                        <Tx v={p.specifications!.pixelPitch} />
                      </dd>
                    </div>

                    <div>
                      <dt className="text-muted">
                        <T k="common.brightness" />
                      </dt>
                      <dd className="font-medium">
                        <Tx v={p.specifications!.brightness} />
                      </dd>
                    </div>

                    <div>
                      <dt className="text-muted">
                        <T k="prod.refreshRate" />
                      </dt>
                      <dd className="font-medium">
                        <Tx v={p.specifications!.refreshRate} />
                      </dd>
                    </div>

                    <div>
                      <dt className="text-muted">
                        <T k="prod.idealDistance" />
                      </dt>
                      <dd className="font-medium">
                        <Tx v={p.specifications!.idealDistance} />
                      </dd>
                    </div>
                  </dl>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <p className="mt-3 text-xs text-muted">
            <T k="ph.specDisclaimer" />
          </p>
        </Section>
      )}

      {/* CTA */}
      <CtaBanner />
    </>
  );
}
