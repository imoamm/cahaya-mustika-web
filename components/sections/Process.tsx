"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, type Variants } from "motion/react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProcessGlow } from "@/components/animations/gsap";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { bi } from "@/lib/i18n/types";

const steps = [
  { t: bi("Konsultasi", "Consultation"), d: bi("Ceritakan kebutuhan dan lokasi Anda.", "Tell us your needs and location.") },
  { t: bi("Analisa Kebutuhan", "Needs Analysis"), d: bi("Kami hitung ukuran dan jarak pandang.", "We calculate size and viewing distance.") },
  { t: bi("Pilih Produk", "Choose a Product"), d: bi("Tentukan pixel pitch yang paling pas.", "Pick the most suitable pixel pitch.") },
  { t: bi("Penawaran Harga", "Price Quotation"), d: bi("Terima penawaran yang jelas dan rinci.", "Receive a clear, detailed quotation.") },
  { t: bi("Produksi / Persiapan", "Production / Preparation"), d: bi("Unit disiapkan sesuai ukuran layar.", "Units are prepared to your screen size.") },
  { t: bi("Instalasi", "Installation"), d: bi("Tim teknisi memasang dan mengonfigurasi.", "Technicians install and configure.") },
  { t: bi("Testing & Support"), d: bi("Pengujian akhir dan dukungan purna jual.", "Final testing and after-sales support.") },
];

// Tiap langkah mengamati dirinya sendiri (bisa animasi ulang saat scroll naik/turun).
const item: Variants = {
  hidden: { opacity: 0, y: 24, transition: { duration: 0.25 } },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] as const } }),
};

export function Process() {
  const { tx } = useI18n();
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  // Garis progres mengikuti posisi scroll → otomatis "menggambar" maju/mundur tanpa IntersectionObserver.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = reduce ? 1 : scrollYProgress;

  return (
    <Section id="proses">
      <SectionHeading title={tx(bi("Bagaimana Proses Pemesanan?", "How Does the Ordering Process Work?"))} />
      <ProcessGlow olRef={ref} count={steps.length} className="relative grid gap-7 md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-4 xl:grid-cols-7 xl:gap-4">
        {/* garis progres: vertikal (mobile) & horizontal (≥ xl). Di tablet/laptop (2–4 kolom) tidak dipakai. */}
        <motion.span aria-hidden className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-px origin-top bg-gradient-to-b from-brand to-brand2 md:hidden" style={{ scaleY: progress }} />
        <motion.span aria-hidden className="absolute left-5 right-5 top-5 hidden h-px origin-left bg-gradient-to-r from-brand to-brand2 xl:block" style={{ scaleX: progress }} />
        {steps.map((s, i) => (
          <motion.li key={s.t.id} data-step custom={i} variants={item} initial="hidden" whileInView="visible" viewport={{ amount: 0.3 }} className="relative flex min-w-0 gap-4 sm:gap-5 xl:block xl:rounded-2xl xl:p-2">
            <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-brand bg-page font-[family-name:var(--font-heading)] text-sm font-bold text-brand2">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 xl:mt-5">
              <h3 className="text-base font-bold">{tx(s.t)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{tx(s.d)}</p>
            </div>
          </motion.li>
        ))}
      </ProcessGlow>
    </Section>
  );
}
