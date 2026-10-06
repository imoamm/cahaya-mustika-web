import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ArticleList } from "@/components/article/ArticleList";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { T } from "@/components/i18n/T";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Artikel Videotron Indoor & Teknologi LED",
  description: "Panduan, edukasi, dan tips memilih Videotron Indoor, pixel pitch, kecerahan, dan teknologi LED display.",
  alternates: { canonical: "/artikel" },
};

export default function ArtikelPage() {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <Section first>
        <SectionHeading h1 align="center" title={<T k="art.title" />} desc={<T k="art.desc" />} />
        <ArticleList items={sorted} />
      </Section>
      <CtaBanner />
    </>
  );
}
