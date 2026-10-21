"use client";
import { FadeUp, Stagger, StaggerItem } from "@/components/animations";
import { Section } from "@/components/ui/Section";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { bi } from "@/lib/i18n/types";

const ITEMS = [
  { title: bi("Presentasi Kurang Interaktif", "Presentations Lack Interactivity"), text: bi("Materi yang tampil di layar kecil atau proyektor redup membuat audiens sulit fokus dan kurang terlibat dalam acara.", "Content on a small screen or dim projector makes it hard for the audience to stay focused and engaged.") },
  { title: bi("Visibilitas Informasi Terbatas", "Limited Information Visibility"), text: bi("Informasi penting sulit terbaca dari barisan belakang atau sudut ruangan, sehingga pesan tidak sampai ke semua orang.", "Key information is hard to read from the back rows or room corners, so the message does not reach everyone.") },
  { title: bi("Visual Kurang Maksimal", "Visuals Fall Short"), text: bi("Warna pucat, gambar berpiksel, dan kecerahan yang tidak sesuai ruangan membuat konten terlihat kurang profesional.", "Washed-out color, pixelated images, and brightness that does not suit the room make content look unprofessional.") },
  { title: bi("Kebutuhan Tampilan Berukuran Besar", "Need for a Large Display"), text: bi("Lobby, aula, dan ballroom butuh bidang layar luas dengan ukuran dan rasio yang pas, tanpa bezel yang mengganggu.", "Lobbies, halls, and ballrooms need a wide screen surface with the right size and ratio, without distracting bezels.") },
];

// Layout desktop (lg+): kiri = heading + deskripsi (sticky), kanan = 4 kartu dalam 2 kolom × 2 baris.
// Di bawah lg kolom menumpuk: heading di tengah, kartu 2 kolom (tablet) / 1 kolom (mobile).
export function Challenges() {
  const { tx } = useI18n();
  return (
    <Section id="tantangan">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 xl:gap-20">
        <FadeUp className="min-w-0 text-center lg:sticky lg:top-28 lg:self-start lg:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand sm:text-[13px]">
            {tx(bi("Kendala yang Sering Dihadapi", "Common Pain Points"))}
          </p>
          <h2 className="fluid-h2 mt-3 text-balance font-bold sm:mt-4">{tx(bi("Tantangan Videotron Indoor", "Indoor Videotron Challenges"))}</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:mt-5 sm:text-base lg:mx-0">
            {tx(bi("Memilih dan memasang videotron indoor tidak sesederhana membeli layar. Ruangan, jarak pandang, dan tujuan tampilan yang berbeda membuat setiap kebutuhan punya tantangannya sendiri.", "Choosing and installing an indoor videotron is more than buying a screen. Different rooms, viewing distances, and goals each bring their own challenges."))}
          </p>
        </FadeUp>

      <Stagger className="min-w-0">
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {ITEMS.map((it, i) => (
            <li key={it.title.id} className="min-w-0">
              <StaggerItem index={i} className="h-full">
                <article className="challenge-card h-full rounded-xl border border-line bg-surface p-6 sm:p-7">
                  <span aria-hidden className="block font-[family-name:var(--font-heading)] text-sm font-semibold tracking-widest text-brand2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden className="mt-3 block h-px w-8 bg-brand/50" />
                  <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-bold leading-snug">{tx(it.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{tx(it.text)}</p>
                </article>
              </StaggerItem>
            </li>
          ))}
        </ol>
      </Stagger>
      </div>
    </Section>
  );
}
