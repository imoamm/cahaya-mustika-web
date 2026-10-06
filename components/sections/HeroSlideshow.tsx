"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { FadeIn } from "@/components/animations";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { bi, type Bi } from "@/lib/i18n/types";

// Durasi tiap foto (ms). Progress bar di indikator memakai nilai yang sama lewat CSS variable.
const SLIDE_MS = 6500;

type Slide = { src: string; alt: Bi; label: Bi; position: string };

// Semua foto adalah foto instalasi asli yang sudah ada di public/images/proyek.
const SLIDES: Slide[] = [
  {
    src: "/images/proyek/auditorium-logo.jpg",
    position: "68% center",
    label: bi("Auditorium", "Auditorium"),
    alt: bi("Layar LED indoor di auditorium menampilkan logo Cahaya Mustika", "Indoor LED screen in an auditorium showing the Cahaya Mustika logo"),
  },
  {
    src: "/images/proyek/lobby-rumah-sakit.jpg",
    position: "60% center",
    label: bi("Lobi", "Lobby"),
    alt: bi("Layar LED indoor lebar di area lobi gedung", "Wide indoor LED screen in a building lobby"),
  },
  {
    src: "/images/proyek/ruang-sidang.jpg",
    position: "65% 40%",
    label: bi("Ruang sidang", "Meeting hall"),
    alt: bi("Layar LED indoor di ruang sidang", "Indoor LED screen in a meeting hall"),
  },
  {
    src: "/images/proyek/auditorium-panorama.jpg",
    position: "62% center",
    label: bi("Layar panorama", "Panoramic screen"),
    alt: bi("Layar LED panorama di ruang auditorium", "Panoramic LED screen in an auditorium"),
  },
];

/**
 * Latar Hero: crossfade + Ken Burns lambat. Hanya foto pertama yang `priority`; foto berikutnya baru
 * dipasang (dan dimuat) saat giliran sebelumnya tampil, jadi tidak semua foto diunduh sekaligus.
 * Timer dibersihkan di cleanup effect dan dijeda saat tab tidak terlihat.
 */
export function HeroSlideshow() {
  const { tx } = useI18n();
  const [active, setActive] = useState(0);
  // Foto sebelumnya tetap menjalankan zoom sampai selesai fade-out, supaya tidak "melompat" ke skala awal.
  const [prev, setPrev] = useState<number | null>(null);
  // Indeks foto yang sudah boleh dirender: foto aktif + satu foto berikutnya (preload).
  const [mounted, setMounted] = useState<ReadonlySet<number>>(() => new Set([0]));

  const go = useCallback(
    (i: number) => {
      if (i === active) return;
      setPrev(active);
      setActive(i);
      setMounted((m) => new Set([...m, i, (i + 1) % SLIDES.length]));
    },
    [active],
  );

  // Pasang foto ke-2 sesudah Hero tampil, supaya tidak berebut bandwidth dengan foto pertama.
  useEffect(() => {
    const id = window.setTimeout(() => setMounted((m) => new Set([...m, 1])), 1200);
    return () => window.clearTimeout(id);
  }, []);

  // Satu timeout per slide aktif (bukan setInterval) → klik indikator otomatis me-reset hitungan,
  // dan cleanup selalu membatalkan timer lama (tidak ada kebocoran). Browser sendiri menahan timer di tab tersembunyi.
  useEffect(() => {
    const id = window.setTimeout(() => go((active + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [active, go]);

  return (
    <>
      {/* Lapisan foto. Ekstra 56px di atas memberi ruang untuk parallax GSAP (HeroScroll menggeser [data-hero="grid"] ke bawah). */}
      <div data-hero="grid" className="absolute inset-x-0 -top-14 bottom-0 -z-30 overflow-hidden bg-[#050c24]">
        {SLIDES.map((s, i) =>
          mounted.has(i) ? (
            <div
              key={s.src}
              className="absolute inset-0 transition-opacity duration-[1600ms] ease-in-out motion-reduce:duration-300"
              style={{ opacity: i === active ? 1 : 0 }}
              aria-hidden={i !== active}
            >
              <Image
                src={s.src}
                alt={i === active ? tx(s.alt) : ""}
                fill
                priority={i === 0}
                quality={75}
                sizes="100vw"
                className={`object-cover ${i === active || i === prev ? "hero-kenburns" : ""}`}
                style={{ objectPosition: s.position }}
              />
            </div>
          ) : null,
        )}
      </div>

      <FadeIn once delay={1.4}>
        <HeroProgress active={active} onSelect={go} />
      </FadeIn>
    </>
  );
}

function HeroProgress({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  const { tx } = useI18n();
  return (
    <div className="hero-progress mt-8 flex items-center gap-4 sm:mt-10" style={{ ["--slide-ms" as string]: `${SLIDE_MS}ms` }}>
      <ol className="flex items-center gap-2" aria-label={tx(bi("Foto proyek", "Project photos"))}>
        {SLIDES.map((s, i) => (
          <li key={s.src}>
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`${i + 1}. ${tx(s.label)}`}
              aria-current={i === active ? "true" : undefined}
              className="group grid h-6 w-9 place-items-center sm:w-12"
            >
              <span className="relative block h-[2px] w-full overflow-hidden rounded-full bg-white/25 transition-colors group-hover:bg-white/40">
                {i < active && <span className="absolute inset-0 bg-white/80" />}
                {i === active && <span key={active} className="hero-progress__bar absolute inset-0 origin-left bg-white" />}
              </span>
            </button>
          </li>
        ))}
      </ol>
      <p className="text-xs text-white/70 sm:text-[13px]" aria-live="off">
        <span className="tabular-nums text-white">{String(active + 1).padStart(2, "0")}</span>
        <span className="mx-2 text-white/40">/</span>
        {tx(SLIDES[active].label)}
      </p>
    </div>
  );
}
