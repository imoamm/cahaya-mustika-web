"use client";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/animations";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { bi, type Bi } from "@/lib/i18n/types";

// "Solusi Kebutuhan Videotron Indoor untuk Berbagai Sektor": 4 sektor, masing-masing satu foto + deskripsi.
// ← Ganti `src` dengan foto sektor pilihan Anda kapan saja (letakkan file di public/images/proyek/).
const SECTORS: { title: Bi; text: Bi; src: string; alt: Bi; pos?: string }[] = [
  {
    title: bi("Pendidikan", "Education"),
    text: bi(
      "Auditorium, aula, dan ruang kuliah membutuhkan layar lebar yang terbaca jelas dari kursi depan sampai belakang untuk perkuliahan, wisuda, dan seminar.",
      "Auditoriums, halls, and lecture rooms need a wide screen that stays clear from the front row to the back for lectures, graduations, and seminars.",
    ),
    src: "/images/proyek/auditorium-universitas.jpg",
    alt: bi("Layar LED indoor di auditorium kampus", "Indoor LED screen in a campus auditorium"),
  },
  {
    title: bi("Perkantoran & Instansi", "Offices & Institutions"),
    text: bi(
      "Ruang rapat dan ruang sidang tampil lebih profesional dengan layar menyatu dinding untuk presentasi, video conference, dan identitas instansi.",
      "Meeting and conference rooms look more professional with a wall-flush screen for presentations, video calls, and institutional branding.",
    ),
    src: "/images/proyek/ruang-sidang.jpg",
    alt: bi("Layar LED indoor di ruang sidang", "Indoor LED screen in a conference room"),
    pos: "50% 35%",
  },
  {
    title: bi("Kesehatan & Fasilitas Publik", "Healthcare & Public Facilities"),
    text: bi(
      "Lobby dan area penerimaan yang ramai dapat menampilkan informasi layanan, antrean, dan pengumuman dengan visual yang mudah dilihat banyak orang.",
      "Busy lobbies and reception areas can show service information, queues, and announcements with visuals that are easy for many people to see.",
    ),
    src: "/images/proyek/lobby-rumah-sakit.jpg",
    alt: bi("Layar LED indoor di lobby rumah sakit", "Indoor LED screen in a hospital lobby"),
  },
  {
    title: bi("Event & Aula Serbaguna", "Events & Multipurpose Halls"),
    text: bi(
      "Latar panggung untuk acara, presentasi, dan pengumuman dengan ukuran layar yang fleksibel menyesuaikan lebar panggung dan ruangan.",
      "Stage backdrops for events, presentations, and announcements, with a screen size that flexes to the stage and room width.",
    ),
    src: "/images/proyek/ruang-vertikal.jpg",
    alt: bi("Layar LED indoor di dinding panggung aula", "Indoor LED screen on a hall stage wall"),
    pos: "50% 40%",
  },
];

export function Sectors() {
  const { tx } = useI18n();
  return (
    <Section id="sektor">
      <SectionHeading
        align="center"
        title={tx(bi("Solusi Kebutuhan Videotron Indoor untuk Berbagai Sektor", "Indoor Videotron Solutions for Every Sector"))}
        desc={tx(bi(
          "Setiap sektor punya jarak pandang, pencahayaan, dan tujuan yang berbeda. Kami menyesuaikan ukuran dan konfigurasi layarnya.",
          "Every sector has its own viewing distance, lighting, and purpose. We tailor the screen size and configuration to fit.",
        ))}
      />

      <Stagger className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {SECTORS.map((s, i) => (
          <StaggerItem key={s.title.id} index={i}>
            <article className="card card-hover group flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={s.src}
                  alt={tx(s.alt)}
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  style={{ objectPosition: s.pos }}
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold leading-snug">{tx(s.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{tx(s.text)}</p>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
