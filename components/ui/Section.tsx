import type { ReactNode } from "react";
import { Reveal } from "@/components/animations";
import { PAGE_PX } from "@/lib/utils";

// Tinggi section = tinggi konten + padding responsif (tidak pernah min-height / 100vh).
//   mobile py-12 → sm py-16 → lg py-20 → xl py-24
// `first` = section pertama di halaman (memberi ruang untuk navbar fixed).
// Catatan: JANGAN kirim pt-*/py-* lewat className — gunakan `first`, atau `!pt-0` untuk merapatkan.
const SPACING = "py-12 sm:py-16 lg:py-20 xl:py-24";
const SPACING_FIRST = "pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-40 xl:pb-24";

export function Section({ id, children, className = "", first = false }: { id?: string; children: ReactNode; className?: string; first?: boolean }) {
  return (
    <section id={id} className={`relative scroll-mt-20 ${PAGE_PX} ${first ? SPACING_FIRST : SPACING} ${className}`}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

export function SectionHeading({ title, desc, align = "left", h1 = false }: { title: ReactNode; desc?: ReactNode; align?: "left" | "center"; h1?: boolean }) {
  const H = h1 ? "h1" : "h2"; // halaman utama (list) memakai h1 agar hierarki heading benar
  const center = align === "center";
  return (
    <Reveal className={`mb-8 w-full sm:mb-10 lg:mb-12 ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      <H className="fluid-h2 text-balance font-bold">{title}</H>
      {desc && <p className={`mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base ${center ? "mx-auto max-w-xl text-balance" : ""}`}>{desc}</p>}
    </Reveal>
  );
}
