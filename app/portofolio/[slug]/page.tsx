import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Media } from "@/components/ui/Media";
import { ConsultButton } from "@/components/ui/ConsultButton";
import { FadeUp, ImageReveal, Parallax, ScaleIn, Stagger, StaggerItem } from "@/components/animations";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { T, Tx } from "@/components/i18n/T";
import { getPortfolio, portfolio } from "@/data/portfolio";
import { bi } from "@/lib/i18n/types";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => portfolio.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPortfolio(slug);
  if (!p) return {};
  return { title: p.title.id, description: p.description.id, alternates: { canonical: `/portofolio/${p.slug}` }, openGraph: { title: p.title.id, description: p.description.id }, robots: p.sample ? { index: false, follow: true } : undefined };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const p = getPortfolio(slug);
  if (!p) notFound();
  const others = portfolio.filter((x) => x.slug !== p.slug).slice(0, 3);
  const msg = bi(`Halo, saya tertarik dengan proyek serupa: ${p.title.id}.`, `Hello, I am interested in a similar project: ${p.title.en}.`);

  return (
    <>
      <Section first>
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted sm:mb-8">
          <Link href="/portofolio" className="hover:text-fg"><T k="port.title" /></Link><ChevronRight size={14} aria-hidden /><span aria-current="page" className="text-fg"><Tx v={p.title} /></span>
        </nav>
        <FadeUp>
          <h1 className="fluid-h1 max-w-4xl text-balance font-extrabold"><Tx v={p.title} /></h1>
          {p.sample && <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted"><span><T k="ph.sampleNote" /></span></div>}
        </FadeUp>
        <ScaleIn delay={0.1} className="mt-8 sm:mt-10">
          <Parallax offset={14}>
            <div className="card relative aspect-[16/9] overflow-hidden rounded-2xl sm:rounded-3xl">
              <Media src={p.images[0]} alt={p.title} label={p.title} sublabel={p.category} sizes="(min-width:1280px) 1200px, 100vw" priority />
            </div>
          </Parallax>
        </ScaleIn>
      </Section>

      <Section className="!pt-0">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <h2 className="fluid-h2 mb-5 font-bold"><T k="port.detailDesc" /></h2>
          <p className="text-base leading-relaxed text-muted"><Tx v={p.description} /></p>
          <div className="mt-6 flex justify-center"><ConsultButton message={msg} /></div>
        </FadeUp>
      </Section>

      {p.images.length > 1 && (
        <Section className="!pt-0">
          <SectionHeading title={<T k="port.images" />} />
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {p.images.slice(1).map((src, i) => (
              <StaggerItem key={src} index={i}>
                <ImageReveal><div className="card relative aspect-[4/3] overflow-hidden rounded-2xl"><Media src={src} alt={p.title} sizes="(min-width:640px) 50vw, 100vw" /></div></ImageReveal>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      )}

      <Section className="!pt-0">
        <SectionHeading title={<T k="port.other" />} />
        <PortfolioGrid items={others} />
      </Section>
    </>
  );
}
