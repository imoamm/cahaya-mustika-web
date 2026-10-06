import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { DateText, T, Tx } from "@/components/i18n/T";
import type { Article } from "@/data/articles";

// Kartu artikel. `variant="lead"` = artikel utama di /artikel (gambar besar, tanpa kotak kartu, gaya editorial).
// Varian default dipakai di "Artikel Terkait" pada halaman detail.
// Gambar lazy-load (default next/image) — hanya artikel utama/hero detail yang boleh `priority`.
export function ArticleCard({ a, priority = false, variant = "card" }: { a: Article; priority?: boolean; variant?: "card" | "lead" }) {
  if (variant === "lead") {
    return (
      <article className="group relative">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line sm:rounded-3xl">
          <Media src={a.image} alt={a.title} label={a.title} sizes="(min-width:1024px) 62vw, 100vw" priority={priority} className="transition duration-700 group-hover:scale-105" />
        </div>
        <p className="mt-5 flex items-center gap-1.5 text-xs font-medium text-muted sm:text-sm">
          <CalendarDays size={15} aria-hidden /> <DateText iso={a.date} />
        </p>
        <h2 className="mt-2 text-balance text-2xl font-extrabold leading-tight transition-colors group-hover:text-brand sm:text-3xl">
          <Link href={`/artikel/${a.slug}`} className="after:absolute after:inset-0 after:content-['']"><Tx v={a.title} /></Link>
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base"><Tx v={a.excerpt} /></p>
        <span className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand">
          <T k="cta.readMore" /> <ArrowUpRight size={16} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </article>
    );
  }

  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Media src={a.image} alt={a.title} label={a.title} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" priority={priority} className="transition duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted">
          <CalendarDays size={14} aria-hidden /> <DateText iso={a.date} />
        </p>
        <h3 className="mt-2.5 text-lg font-bold leading-snug transition-colors group-hover:text-brand sm:text-xl">
          <Link href={`/artikel/${a.slug}`} className="after:absolute after:inset-0 after:content-['']">
            <Tx v={a.title} />
          </Link>
        </h3>
        <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted"><Tx v={a.excerpt} /></p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          <T k="cta.readMore" /> <ArrowUpRight size={16} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
