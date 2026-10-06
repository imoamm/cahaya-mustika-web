"use client";
import Image from "next/image";
import { Quote } from "lucide-react";
import { FadeUp, Stagger, StaggerItem } from "@/components/animations";
import { Section, SectionHeading } from "@/components/ui/Section";
import { customers, testimonials } from "@/data/customers";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { bi, type Bi } from "@/lib/i18n/types";

// "Dipercaya oleh Pelanggan Kami": foto instalasi nyata + (opsional) logo pelanggan & testimoni dari data/customers.ts.
const PROJECTS: { src: string; title: Bi; text: Bi; alt: Bi; pos?: string }[] = [
  { src: "/images/proyek/auditorium-universitas.jpg", title: bi("Auditorium Kampus", "Campus Auditorium"), text: bi("Layar LED lebar dengan warna merata untuk presentasi dan acara.", "A wide LED screen with even color for presentations and events."), alt: bi("Layar LED indoor di auditorium kampus", "Indoor LED screen in a campus auditorium") },
  { src: "/images/proyek/ruang-sidang.jpg", title: bi("Ruang Sidang", "Conference Room"), text: bi("Layar terpasang menyatu dengan panel dinding ruangan.", "A screen set flush into the room's wall panelling."), alt: bi("Layar LED indoor di ruang sidang", "Indoor LED screen in a conference room"), pos: "50% 35%" },
  { src: "/images/proyek/lobby-rumah-sakit.jpg", title: bi("Lobby Rumah Sakit", "Hospital Lobby"), text: bi("Layar memanjang di area penerimaan yang dilihat banyak orang.", "A strip screen in a busy reception area."), alt: bi("Layar LED indoor di lobby rumah sakit", "Indoor LED screen in a hospital lobby") },
  { src: "/images/proyek/auditorium-panorama.jpg", title: bi("Auditorium Panorama", "Panorama Auditorium"), text: bi("Layar lebar dengan gambar tajam dan warna merata dari kursi depan sampai belakang.", "A wide screen with sharp images and even color from the front row to the back."), alt: bi("Layar LED indoor lebar di auditorium", "Wide indoor LED screen in an auditorium") },
  { src: "/images/proyek/ruang-vertikal.jpg", title: bi("Aula Serbaguna", "Multipurpose Hall"), text: bi("Layar terpasang di dinding panggung untuk acara, presentasi, dan pengumuman.", "A screen mounted on the stage wall for events, presentations, and announcements."), alt: bi("Layar LED indoor di dinding panggung aula", "Indoor LED screen on a hall stage wall"), pos: "50% 40%" },
  { src: "/images/proyek/auditorium-logo.jpg", title: bi("Auditorium Instansi", "Institutional Auditorium"), text: bi("Warna solid dan identitas brand tampil jelas di layar utama ruangan.", "Solid color and brand identity shown clearly on the room's main screen."), alt: bi("Layar LED indoor biru menampilkan logo di auditorium", "Blue indoor LED screen showing a logo in an auditorium") },
];

export function Customers() {
  const { tx } = useI18n();
  return (
    <Section id="pelanggan">
      <SectionHeading
        align="center"
        title={tx(bi("Dipercaya oleh Pelanggan Kami", "Trusted by Our Customers"))}
        desc={tx(bi("Dokumentasi instalasi layar LED indoor di berbagai jenis ruangan.", "Documentation of indoor LED screen installations in different kinds of rooms."))}
      />

      <Stagger className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <StaggerItem key={p.src} index={i}>
            <figure className="card card-hover h-full overflow-hidden rounded-2xl sm:rounded-3xl">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={p.src} alt={tx(p.alt)} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" style={{ objectPosition: p.pos }} />
              </div>
              <figcaption className="p-4 sm:p-5">
                <span className="block font-[family-name:var(--font-heading)] text-lg font-bold">{tx(p.title)}</span>
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
