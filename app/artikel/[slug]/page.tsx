import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Media } from "@/components/ui/Media";
import { ConsultButton } from "@/components/ui/ConsultButton";
import { BlurIn, FadeUp, ScaleIn } from "@/components/animations";
import { ArticleCard } from "@/components/article/ArticleCard";
import { Stagger, StaggerItem } from "@/components/animations";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { DateText, T, Tx } from "@/components/i18n/T";
import { articles, getArticle } from "@/data/articles";
import { SITE } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title.id,
    description: a.excerpt.id,
    alternates: { canonical: `/artikel/${a.slug}` },
    openGraph: { type: "article", title: a.title.id, description: a.excerpt.id, publishedTime: a.date, authors: [a.author], url: `/artikel/${a.slug}` },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  // Artikel terkait: artikel lain, terbaru lebih dulu (tanpa kategori).
  const related = articles.filter((x) => x.slug !== a.slug).sort((x, y) => y.date.localeCompare(x.date)).slice(0, 3);

  // Structured data Article — hanya memakai data yang ada (penulis = nama perusahaan; tidak ada info karangan).
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Article", headline: a.title.id, description: a.excerpt.id, datePublished: a.date, inLanguage: "id",
    author: { "@type": "Organization", name: a.author }, publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: `${SITE.url}/artikel/${a.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Section first>
        <article className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted sm:mb-8">
            <Link href="/artikel" className="hover:text-fg"><T k="art.title" /></Link><ChevronRight size={14} aria-hidden /><span aria-current="page" className="min-w-0 truncate text-fg"><Tx v={a.title} /></span>
          </nav>
          <BlurIn>
            <h1 className="fluid-h1 text-balance font-extrabold"><Tx v={a.title} /></h1>
            <p className="mt-4 flex flex-wrap items-center gap-x-2 text-sm text-muted sm:mt-5">
              <DateText iso={a.date} /><span aria-hidden>·</span><span><T k="common.byAuthor" /> {a.author}</span>
            </p>
          </BlurIn>
          <ScaleIn delay={0.1} className="mt-8 sm:mt-10">
            <div className="card relative aspect-[16/9] overflow-hidden rounded-2xl sm:rounded-3xl">
              <Media src={a.image} alt={a.title} label={a.title} sizes="(min-width:768px) 768px, 100vw" priority />
            </div>
          </ScaleIn>
          {/* Konten: satu reveal saja (teks tidak bergerak per paragraf agar nyaman dibaca). Poppins untuk body, Manrope untuk heading. */}
          <FadeUp className="mt-8 sm:mt-10">
            <div className="space-y-5 text-base leading-[1.85] text-fg/90 sm:text-[1.0625rem]">
              {a.content.map((b, i) =>
                b.t === "h2" ? (
                  <h2 key={i} className="!mt-10 text-2xl font-bold sm:text-3xl"><Tx v={b.text} /></h2>
                ) : b.t === "ul" ? (
                  <ul key={i} className="list-disc space-y-2 pl-6 marker:text-brand2">{b.items.map((it, k) => <li key={k}><Tx v={it} /></li>)}</ul>
                ) : (
                  <p key={i}><Tx v={b.text} /></p>
                ),
              )}
            </div>
          </FadeUp>
          <FadeUp className="mt-10">
            <div className="card rounded-2xl p-6 text-center sm:p-8">
              <h2 className="text-xl font-bold sm:text-2xl"><T k="art.ctaTitle" /></h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted"><T k="art.ctaText" /></p>
              <div className="mt-5 flex justify-center"><ConsultButton /></div>
            </div>
          </FadeUp>
        </article>
      </Section>

      {related.length > 0 && (
        <Section className="!pt-0">
          <SectionHeading title={<T k="art.related" />} />
          <Stagger className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {related.map((r, i) => (<StaggerItem key={r.slug} index={i}><ArticleCard a={r} /></StaggerItem>))}
          </Stagger>
        </Section>
      )}
      <CtaBanner />
    </>
  );
}
