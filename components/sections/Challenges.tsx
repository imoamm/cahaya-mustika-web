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
  { title: bi("Penyampaian Informasi Kurang Dinamis", "Static Information Delivery"), text: bi("Poster dan papan statis sulit diperbarui. Promo, jadwal, dan pengumuman baru lambat sampai ke audiens.", "Posters and static boards are slow to update, so new promos, schedules, and announcements reach people late.") },
  { title: bi("Pengalaman Audiens Kurang Menarik", "Underwhelming Audience Experience"), text: bi("Tanpa visual yang hidup dan tajam, pengunjung mudah bosan dan kesan pertama terhadap ruangan Anda menjadi biasa saja.", "Without vivid, sharp visuals, visitors lose interest and the first impression of your space turns ordinary.") },
];

// Layout desktop (lg+): kiri = heading + deskripsi (sticky), kanan = 6 kartu terpisah dalam 2 kolom × 3 baris.
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
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {ITEMS.map((it, i) => (
            <li key={it.title.id} className="min-w-0">
              <StaggerItem index={i} className="h-full">
                <article className="challenge-card group flex h-full items-start gap-4 rounded-2xl border border-line bg-surface p-4 sm:p-5">
                  <span aria-hidden className="w-9 shrink-0 font-[family-name:var(--font-heading)] text-2xl font-extrabold leading-none tracking-tight text-brand sm:w-11 sm:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-[family-name:var(--font-heading)] text-base font-bold leading-snug sm:text-[17px]">{tx(it.title)}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{tx(it.text)}</p>
                  </div>
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
