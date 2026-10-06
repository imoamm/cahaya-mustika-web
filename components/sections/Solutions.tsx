"use client";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/animations";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { waLink } from "@/lib/constants";
import { imagePath } from "@/lib/images";
import { bi, type Bi } from "@/lib/i18n/types";

// Foto: ilustrasi konsep (gallery/17–21) dan foto asli (proyek/). `kind` menentukan label "Ilustrasi".
const SOLUTIONS: { name: Bi; text: Bi; src: string; alt: Bi; kind: "foto" | "ilustrasi"; pos?: string }[] = [
  { name: bi("Lobby"), src: imagePath("gallery", 17), kind: "ilustrasi", text: bi("Kesan pertama untuk tamu: sambutan, informasi, dan identitas brand di satu dinding.", "A first impression for guests: welcome, information, and brand identity on one wall."), alt: bi("Ilustrasi videotron indoor di lobby modern", "Illustration of an indoor videotron in a modern lobby") },
  { name: bi("Retail"), src: imagePath("gallery", 19), kind: "ilustrasi", text: bi("Promo dan katalog bergerak yang menarik pengunjung ke dalam toko.", "Moving promos and catalogues that draw shoppers in."), alt: bi("Ilustrasi LED display di area retail", "Illustration of an LED display in a retail area") },
  { name: bi("Ruang Meeting", "Meeting Room"), src: "/images/proyek/ruang-sidang.jpg", kind: "foto", pos: "50% 35%", text: bi("Presentasi dan video conference terbaca jelas dari semua kursi.", "Presentations and video calls readable from every seat."), alt: bi("Layar LED indoor di ruang sidang", "Indoor LED screen in a conference room") },
  { name: bi("Event"), src: imagePath("gallery", 20), kind: "ilustrasi", text: bi("Latar panggung, ballroom, dan seminar dengan ukuran layar yang fleksibel.", "Stage backdrops, ballrooms, and seminars with flexible screen sizes."), alt: bi("Ilustrasi videotron indoor di ballroom event", "Illustration of an indoor videotron in an event ballroom") },
  { name: bi("Showroom"), src: imagePath("gallery", 21), kind: "ilustrasi", text: bi("Tampilkan produk dengan warna akurat dan latar yang konsisten.", "Show products with accurate color and a consistent backdrop."), alt: bi("Ilustrasi LED display di showroom", "Illustration of an LED display in a showroom") },
  { name: bi("Ruang Publik", "Public Space"), src: "/images/proyek/lobby-rumah-sakit.jpg", kind: "foto", text: bi("Informasi dan visual untuk area yang dilalui banyak orang.", "Information and visuals for busy, high-traffic areas."), alt: bi("Layar LED indoor di area publik rumah sakit", "Indoor LED screen in a hospital public area") },
];

export function Solutions() {
  const { tx } = useI18n();
  return (
    <Section id="solusi">
      <SectionHeading
        title={tx(bi("Solusi untuk Berbagai Kebutuhan", "Solutions for Every Need"))}
        desc={tx(bi("Setiap ruangan punya jarak pandang, pencahayaan, dan tujuan yang berbeda. Kami menyesuaikan layarnya.", "Every room has its own viewing distance, lighting, and purpose. We tailor the screen to fit."))}
      />
      <Stagger className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {SOLUTIONS.map((s, i) => (
          <StaggerItem key={s.name.id} index={i}>
            <article className="card card-hover group flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={s.src} alt={tx(s.alt)} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" style={{ objectPosition: s.pos }} />
                {s.kind === "ilustrasi" && (
                  <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">{tx(bi("Ilustrasi", "Illustration"))}</span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold">{tx(s.name)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{tx(s.text)}</p>
                <a
                  href={waLink(tx(bi(`Halo Cahaya Mustika, saya ingin konsultasi videotron indoor untuk ${s.name.id}.`, `Hello Cahaya Mustika, I would like a consultation about an indoor videotron for ${s.name.en}.`)))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand2 transition hover:gap-2.5"
                >
                  {tx(bi("Konsultasi untuk ruangan ini", "Consult for this space"))} <ArrowUpRight size={16} aria-hidden />
                </a>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
