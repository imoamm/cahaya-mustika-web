import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { Customers } from "@/components/sections/Customers";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FadeUp } from "@/components/animations";
import { T } from "@/components/i18n/T";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Portofolio Instalasi Videotron Indoor",
  description:
    "Portofolio instalasi Videotron Indoor dan LED Display Cahaya Mustika untuk hotel, retail, showroom, perkantoran, dan institusi.",
  alternates: { canonical: "/portofolio" },
};

export default function PortofolioPage() {
  const hasSample = portfolio.some((p) => p.sample);

  return (
    <>
      <Section first>
        <SectionHeading h1 align="center" title={<T k="port.title" />} desc={<T k="port.desc" />} />

        {hasSample && (
          <FadeUp className="mb-8 mt-4 flex w-full items-center justify-center text-center text-sm text-muted">
            <span>
              <T k="ph.sampleNote" />
            </span>
          </FadeUp>
        )}

        <PortfolioGrid items={portfolio} lazy={false} />
      </Section>

      <Customers />

      <CtaBanner />
    </>
  );
}