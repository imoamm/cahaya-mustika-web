"use client";
import Image from "next/image";
import { Quote } from "lucide-react";
import { FadeUp, Stagger, StaggerItem } from "@/components/animations";
import { Media } from "@/components/ui/Media";
import { Section, SectionHeading } from "@/components/ui/Section";
import { customers, testimonials } from "@/data/customers";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { bi, type Bi } from "@/lib/i18n/types";

// "Dipercaya oleh Pelanggan Kami": foto instalasi nyata + (opsional) logo pelanggan & testimoni dari data/customers.ts.
const PROJECTS: { src: string; title: Bi; text: Bi; alt: Bi; pos?: string }[] = [
  { src: "/images/proyek/auditorium-universitas.webp", title: bi("Auditorium Kampus", "Campus Auditorium"), text: bi("Layar LED lebar dengan warna merata untuk presentasi dan acara.", "A wide LED screen with even color for presentations and events."), alt: bi("Layar LED indoor di auditorium kampus", "Indoor LED screen in a campus auditorium") },
  { src: "/images/proyek/ruang-sidang.webp", title: bi("Ruang Sidang", "Conference Room"), text: bi("Layar terpasang menyatu dengan panel dinding ruangan.", "A screen set flush into the room's wall panelling."), alt: bi("Layar LED indoor di ruang sidang", "Indoor LED screen in a conference room"), pos: "50% 35%" },
  { src: "/images/proyek/lobby-rumah-sakit.webp", title: bi("Lobby Rumah Sakit", "Hospital Lobby"), text: bi("Layar memanjang di area penerimaan yang dilihat banyak orang.", "A strip screen in a busy reception area."), alt: bi("Layar LED indoor di lobby rumah sakit", "Indoor LED screen in a hospital lobby") },
  { src: "/images/proyek/auditorium-panorama.webp", title: bi("Auditorium Panorama", "Panorama Auditorium"), text: bi("Layar lebar dengan gambar tajam dan warna merata dari kursi depan sampai belakang.", "A wide screen with sharp images and even color from the front row to the back."), alt: bi("Layar LED indoor lebar di auditorium", "Wide indoor LED screen in an auditorium") },
  { src: "/images/proyek/ruang-vertikal.webp", title: bi("Aula Serbaguna", "Multipurpose Hall"), text: bi("Layar terpasang di dinding panggung untuk acara, presentasi, dan pengumuman.", "A screen mounted on the stage wall for events, presentations, and announcements."), alt: bi("Layar LED indoor di dinding panggung aula", "Indoor LED screen on a hall stage wall"), pos: "50% 40%" },
  { src: "/images/proyek/auditorium-logo.webp", title: bi("Auditorium Instansi", "Institutional Auditorium"), text: bi("Warna solid dan identitas brand tampil jelas di layar utama ruangan.", "Solid color and brand identity shown clearly on the room's main screen."), alt: bi("Layar LED indoor biru menampilkan logo di auditorium", "Blue indoor LED screen showing a logo in an auditorium") },
  // ── Foto 7–15: taruh file WebP di public/images/proyek/proyek-07.webp … proyek-15.webp (placeholder tampil sampai file ada) ──
  { src: "/images/proyek/proyek-07.webp", title: bi("Ruang Rapat Perusahaan", "Corporate Meeting Room"), text: bi("Layar halus untuk presentasi dan rapat dengan detail teks yang jelas.", "A smooth screen for presentations and meetings with crisp text detail."), alt: bi("Layar LED indoor di ruang rapat perusahaan", "Indoor LED screen in a corporate meeting room") },
  { src: "/images/proyek/proyek-08.webp", title: bi("Lobby Hotel", "Hotel Lobby"), text: bi("Sambutan tamu dan informasi acara dalam satu dinding layar.", "Guest welcome and event information on a single screen wall."), alt: bi("Layar LED indoor di lobby hotel", "Indoor LED screen in a hotel lobby") },
  { src: "/images/proyek/proyek-09.webp", title: bi("Showroom Otomotif", "Automotive Showroom"), text: bi("Latar produk dengan warna akurat dan konsisten.", "A product backdrop with accurate, consistent color."), alt: bi("Layar LED indoor di showroom otomotif", "Indoor LED screen in an automotive showroom") },
  { src: "/images/proyek/proyek-10.webp", title: bi("Pusat Perbelanjaan", "Shopping Center"), text: bi("Promo bergerak yang menarik perhatian pengunjung dari jauh.", "Moving promos that catch visitors' attention from afar."), alt: bi("Layar LED indoor di pusat perbelanjaan", "Indoor LED screen in a shopping center") },
  { src: "/images/proyek/proyek-11.webp", title: bi("Ballroom Pernikahan & Event", "Wedding & Event Ballroom"), text: bi("Latar panggung fleksibel untuk resepsi, seminar, dan gala dinner.", "A flexible stage backdrop for receptions, seminars, and gala dinners."), alt: bi("Layar LED indoor di ballroom", "Indoor LED screen in a ballroom") },
  { src: "/images/proyek/proyek-12.webp", title: bi("Tempat Ibadah", "Place of Worship"), text: bi("Layar lebar agar liturgi dan khotbah terbaca jelas dari semua sudut.", "A wide screen so every seat can read the service clearly."), alt: bi("Layar LED indoor di tempat ibadah", "Indoor LED screen in a place of worship") },
  { src: "/images/proyek/proyek-13.webp", title: bi("Ruang Kontrol", "Control Room"), text: bi("Tampilan data dan pemantauan tanpa bezel untuk operasi 24 jam.", "Bezel-free data and monitoring display for round-the-clock operations."), alt: bi("Layar LED indoor di ruang kontrol", "Indoor LED screen in a control room") },
  { src: "/images/proyek/proyek-14.webp", title: bi("Restoran & Kafe", "Restaurant & Cafe"), text: bi("Menu digital dan suasana visual yang menghidupkan ruangan.", "Digital menus and visual ambience that bring a room to life."), alt: bi("Layar LED indoor di restoran", "Indoor LED screen in a restaurant") },
  { src: "/images/proyek/proyek-15.webp", title: bi("Sekolah & Kampus", "School & Campus"), text: bi("Layar aula untuk upacara, wisuda, dan kegiatan belajar bersama.", "A hall screen for ceremonies, graduations, and shared learning."), alt: bi("Layar LED indoor di aula sekolah", "Indoor LED screen in a school hall") },
];

export function Customers({ first = false, h1 = false }: { first?: boolean; h1?: boolean } = {}) {
  const { tx } = useI18n();
  const H = h1 ? "h2" : "h3";
  return (
    <Section id="pelanggan" first={first}>
      <SectionHeading
        h1={h1}
        align="center"
        title={tx(bi("Portofolio", "Trusted by Our Customers"))}
        desc={tx(bi("Dokumentasi instalasi layar LED indoor di berbagai jenis ruangan.", "Documentation of indoor LED screen installations in different kinds of rooms."))}
      />

      <Stagger className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <StaggerItem key={p.src} index={i}>
            <figure className="card card-hover h-full overflow-hidden rounded-2xl sm:rounded-3xl">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Media src={p.src} alt={p.alt} label={p.title} sublabel={bi("Foto proyek segera hadir", "Project photo coming soon")} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
              </div>
              <figcaption className="p-4 sm:p-5">
                <H className="block font-[family-name:var(--font-heading)] text-lg font-bold">{tx(p.title)}</H>
                <span className="mt-1 block text-sm leading-relaxed text-muted">{tx(p.text)}</span>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>

      {customers.length > 0 && (
        <FadeUp className="mt-10">
          <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {customers.map((c) => (
              <li key={c.name} className="flex h-16 w-36 items-center justify-center rounded-2xl border border-line bg-white p-3 sm:w-44">
                <Image src={c.logo} alt={c.name} width={140} height={48} unoptimized className="max-h-full w-auto object-contain" />
              </li>
            ))}
          </ul>
        </FadeUp>
      )}

      {testimonials.length > 0 && (
        <Stagger className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <StaggerItem key={t.name} index={i}>
              <figure className="card h-full rounded-2xl p-5 sm:p-6">
                <Quote className="text-brand2" size={24} aria-hidden />
                <blockquote className="mt-3 text-base font-medium leading-snug">“{tx(t.quote)}”</blockquote>
                <figcaption className="mt-4 text-sm text-muted">{t.name} · {tx(t.role)}, {t.company}</figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </Section>
  );
}
