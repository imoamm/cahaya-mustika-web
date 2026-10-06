import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { DateText, T, Tx } from "@/components/i18n/T";
import { FadeUp, Stagger, StaggerItem } from "@/components/animations";
import { ArticleCard } from "./ArticleCard";
import type { Article } from "@/data/articles";

// /artikel: layout portal editorial.
// `items` sudah diurutkan terbaru → artikel pertama = artikel utama (kiri, gambar besar),
// sisanya = daftar ringkas bergambar thumbnail (kanan di desktop, di bawah artikel utama di tablet/mobile).
export function ArticleList({ items }: { items: Article[] }) {
  const [lead, ...rest] = items;
  if (!lead) return <p role="status" className="card rounded-2xl p-8 text-center text-sm text-muted"><T k="common.empty" /></p>;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,13fr)_minmax(0,7fr)] lg:gap-12">
      {/* Artikel utama */}
      <FadeUp className="min-w-0">
        <ArticleCard a={lead} variant="lead" priority />
      </FadeUp>

      {/* Artikel lainnya */}
      {rest.length > 0 && (
        <aside aria-label="Artikel lainnya" className="min-w-0 lg:border-l lg:border-line lg:pl-10">
          <Stagger>
            <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-1">
              {rest.map((a, i) => (
                <li key={a.slug} className="min-w-0 border-t border-line first:border-t-0 sm:[&:nth-child(2)]:border-t-0 lg:[&:nth-child(2)]:border-t">
                  <StaggerItem index={i} y={16} scale={1}>
                    <ArticleRow a={a} />
                  </StaggerItem>
                </li>
              ))}
            </ul>
          </Stagger>
        </aside>
      )}
    </div>
  );
}

// Baris ringkas: judul di kiri, thumbnail kecil di kanan. Seluruh baris adalah satu link (after:inset-0).
function ArticleRow({ a }: { a: Article }) {
  return (
    <article className="group relative flex items-center gap-4 py-4 sm:py-5">
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 text-xs text-muted"><CalendarDays size={13} aria-hidden /> <DateText iso={a.date} /></p>
        <h3 className="mt-1.5 line-clamp-3 text-[15px] font-semibold leading-snug transition-colors group-hover:text-brand sm:text-base">
          <Link href={`/artikel/${a.slug}`} className="after:absolute after:inset-0 after:content-['']"><Tx v={a.title} /></Link>
        </h3>
      </div>
      <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-xl border border-line sm:w-28">
        <Media src={a.image} alt={a.title} label={a.title} sizes="112px" className="transition duration-500 group-hover:scale-105" />
      </div>
    </article>
  );
}
