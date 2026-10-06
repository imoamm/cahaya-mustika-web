"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/animations";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Media } from "@/components/ui/Media";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { brands } from "@/data/brands";
import { bi } from "@/lib/i18n/types";

export function Brands() {
  const { tx, t } = useI18n();
  return (
    <div id="brand" className="relative scroll-mt-20">
      <Section>
        <SectionHeading
          align="center"
          title={tx(bi("Produk Samsung, LG, dan Hikvision", "Samsung, LG, and Hikvision Products"))}
          desc={tx(bi("Pilih brand untuk melihat keunggulan, teknologi, dan penggunaannya.", "Pick a brand to see its advantages, technology, and uses."))}
        />
        <Stagger className="grid gap-5 md:grid-cols-3">
          {brands.map((b, i) => (
            <StaggerItem key={b.id} index={i}>
              <Link
                href={`/produk/${b.id}`}
                aria-label={`${t("cta.viewDetailOf")} ${b.name}`}
                className="card card-hover group flex h-full flex-col overflow-hidden rounded-3xl"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Media src={b.image} alt={bi(`Layar LED indoor ${b.name}`, `${b.name} indoor LED display`)} label={b.name} sizes="(min-width:768px) 33vw, 100vw" className="transition duration-700 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 flex h-10 items-center rounded-full bg-white px-4 shadow-lg shadow-black/20">
                    <Image src={b.logo} alt="" width={96} height={24} unoptimized className="h-4 w-auto max-w-[8rem] object-contain" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold">{b.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{tx(b.tagline)}</p>
                  <span className="btn btn-primary mt-5 self-start">
                    {t("cta.viewDetail")} <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </div>
  );
}
