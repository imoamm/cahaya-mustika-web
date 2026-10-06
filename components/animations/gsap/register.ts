import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Plugin didaftarkan SEKALI di sini (hanya di browser). Semua komponen GSAP mengimpor dari file ini,
// jadi tidak ada registrasi ganda dan tidak ada akses window/document saat SSR.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // Address bar HP naik/turun mengubah tinggi viewport → tanpa ini ScrollTrigger refresh terus-menerus.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, useGSAP };

// Semua query menyertakan `prefers-reduced-motion: no-preference` → jika user memilih reduced motion,
// TIDAK ADA ScrollTrigger yang dibuat dan konten tampil normal. Breakpoint sejajar dengan Tailwind (md=768, lg=1024, xl=1280).
const OK = "(prefers-reduced-motion: no-preference)";
export const MQ = {
  mobile: `(max-width: 767px) and ${OK}`,
  tablet: `(min-width: 768px) and (max-width: 1023px) and ${OK}`,
  desktop: `(min-width: 1024px) and ${OK}`,
  // Timeline Process ter-pin hanya jika layar cukup lebar DAN cukup tinggi agar section muat di viewport.
  wide: `(min-width: 1280px) and (min-height: 700px) and ${OK}`,
} as const;
