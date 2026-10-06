import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ImageReveal } from "@/components/animations";
import { Media } from "@/components/ui/Media";
import { Tx } from "@/components/i18n/T";
import type { PortfolioItem } from "@/data/portfolio";

export function PortfolioGrid({
  items,
  lazy = true,
}: {
  items: PortfolioItem[];
  lazy?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => {
        return (
          <ImageReveal
            key={it.slug}
            delay={(i % 3) * 0.08}
            className="w-full"
          >
            <Link
              href={`/portofolio/${it.slug}`}
              className="
                card-hover
                group
                relative
                block
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-line
                bg-surface
              "
            >
              {/* Gambar */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Media
                  src={it.images[0]}
                  alt={it.title}
                  label={it.title}
                  sublabel={it.category}
                  sizes="
                    (min-width:1024px) 33vw,
                    (min-width:640px) 50vw,
                    100vw
                  "
                  priority={!lazy && i < 3}
                  className="
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-105
                  "
                />

                {/* Overlay */}
                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    bg-gradient-to-t
                    from-black/90
                    via-black/50
                    to-transparent
                    p-4
                    pt-16
                    text-white
                  "
                >
                  {/* Kategori */}
                  <p className="text-xs text-white/80">
                    <Tx v={it.category} />
                  </p>

                  {/* Judul */}
                  <h3
                    className="
                      mt-1.5
                      flex
                      items-end
                      justify-between
                      gap-3
                      text-base
                      font-bold
                      sm:text-lg
                    "
                  >
                    <span className="min-w-0">
                      <Tx v={it.title} />
                    </span>

                    <ArrowUpRight
                      size={18}
                      aria-hidden
                      className="
                        shrink-0
                        transition-transform
                        duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                      "
                    />
                  </h3>
                </div>
              </div>
            </Link>
          </ImageReveal>
        );
      })}
    </div>
  );
}