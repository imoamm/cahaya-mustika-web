"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ImageReveal } from "@/components/animations";
import { DepthParallax } from "@/components/animations/gsap";
import { Media } from "@/components/ui/Media";
import { gallery } from "@/data/applications";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { bi } from "@/lib/i18n/types";

// Layout: CSS Grid (bukan CSS columns).
//   < 480px : 1 kolom · 480–1023px : 2 kolom · ≥ 1024px : 3 kolom dengan tile lebar (2 kolom) selang-seling.
// Semua tile punya aspect-ratio → tinggi section selalu proporsional & tanpa lubang.
const LABEL = bi("Instalasi Videotron Indoor", "Indoor Videotron Installation");

export function Gallery() {
  const { tx } = useI18n();
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const open = active !== null;
  const n = gallery.length;
  const go = useCallback((d: number) => setActive((a) => (a === null ? a : (a + d + n) % n)), [n]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // kunci scroll latar saat lightbox terbuka
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", k);
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = prevOverflow;
      triggerRef.current?.focus(); // kembalikan fokus ke tile yang dibuka
    };
  }, [open, go]);

  const current = active !== null ? gallery[active] : null;
  const ctrl = "grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20";

  return (
    <Section id="galeri">
      <SectionHeading
        title={tx(bi("Inspirasi Instalasi Videotron Indoor", "Indoor Videotron Installation Inspiration"))}
        desc={tx(bi("Lihat bagaimana layar LED indoor menyatu dengan berbagai jenis ruangan.", "See how indoor LED screens blend into different kinds of rooms."))}
      />
      {/* Desktop-only: foreground (wide) bergerak sedikit lebih cepat daripada background — kesan parallax ringan. */}
      <DepthParallax className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4 lg:grid-cols-3" maxShift={28}>
        {gallery.map((g, i) => (
          <ImageReveal key={g.src} delay={(i % 3) * 0.08} className={g.wide ? "lg:col-span-2" : undefined}>
            <button
              type="button"
              data-depth={g.wide ? 1 : 0.45}
              onClick={(e) => { triggerRef.current = e.currentTarget; setActive(i); }}
              aria-label={`${tx(bi("Perbesar foto", "Enlarge photo"))}: ${tx(g.alt)}`}
              className={`group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line ${g.wide ? "lg:aspect-auto lg:h-full" : "lg:aspect-square"}`}
            >
              <Media
                src={g.src}
                alt={g.alt}
                label={LABEL}
                sublabel={g.place}
                sizes={g.wide ? "(min-width:1024px) 66vw, (min-width:480px) 50vw, 100vw" : "(min-width:1024px) 33vw, (min-width:480px) 50vw, 100vw"}
                className="transition duration-700 group-hover:scale-105"
              />
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#050c24]/90 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-3.5 text-left text-white sm:p-4">
                <span className="block font-[family-name:var(--font-heading)] text-base font-bold sm:text-lg">{tx(g.place)}</span>
                <span className="mt-0.5 block text-xs text-white/80 sm:text-sm">{tx(g.desc)}</span>
              </span>
              {g.kind === "ilustrasi" && (
                <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">{tx(bi("Ilustrasi", "Illustration"))}</span>
              )}
              <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand size={16} aria-hidden />
              </span>
            </button>
          </ImageReveal>
        ))}
      </DepthParallax>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog" aria-modal="true" aria-label={tx(current.alt)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
            onClick={() => setActive(null)}
          >
            <button ref={closeRef} type="button" onClick={() => setActive(null)} aria-label={tx(bi("Tutup foto", "Close photo"))} className={`absolute right-3 top-3 sm:right-5 sm:top-5 ${ctrl}`}>
              <X />
            </button>
            {/* Lebar dibatasi lebar layar DAN tinggi layar (72dvh) → tidak pernah keluar layar */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }}
              className="relative aspect-[16/10] w-[min(100%,64rem,calc(72dvh*1.6))] overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Media src={current.src} alt={current.alt} label={LABEL} sublabel={current.place} sizes="(min-width:1024px) 1024px, 100vw" className="!object-contain bg-black" />
            </motion.div>
            <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-3 px-3 sm:bottom-5" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => go(-1)} aria-label={tx(bi("Foto sebelumnya", "Previous photo"))} className={ctrl}><ChevronLeft /></button>
              <p className="min-w-0 max-w-[60vw] truncate text-center text-sm text-white/85" aria-live="polite">{(active ?? 0) + 1} / {n} · {tx(current.place)}</p>
              <button type="button" onClick={() => go(1)} aria-label={tx(bi("Foto berikutnya", "Next photo"))} className={ctrl}><ChevronRight /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
