"use client";
import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "./register";

// Parallax Hero dikontrol scroll (scrub ringan). Hanya transform (y) + sedikit opacity di CTA → tanpa layout shift.
// Elemen target ditandai `data-hero="…"` di Hero.tsx dan SELALU elemen yang tidak dipakai Motion / animasi CSS
// (Motion memegang transform wrapper reveal, CSS memegang `.floaty` & `.glow-blob`) supaya tidak bertabrakan.
// Nilai positif = bergerak turun (lebih lambat dari scroll → terasa "jauh"), negatif = naik (lebih cepat → terasa "dekat").
const TARGETS: ReadonlyArray<readonly [key: string, y: number, opacity?: number]> = [
  ["grid", 48],
  ["glow", 70],
  ["headline", -30],
  ["sub", -48],
  ["cta", -64, 0.6],
  ["wall", -50],
  ["float-a", -40],
  ["float-b", -64],
];

function build(root: HTMLElement, f: number) {
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.5 },
  });
  for (const [key, y, o] of TARGETS) {
    const els = root.querySelectorAll<HTMLElement>(`[data-hero="${key}"]`);
    if (!els.length) continue;
    tl.to(els, { y: y * f, ...(o === undefined ? {} : { opacity: 1 - (1 - o) * f }) }, 0);
  }
}

export function HeroScroll({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => build(root, 1));   // laptop/desktop: efek penuh
      mm.add(MQ.tablet, () => build(root, 0.5));  // tablet: setengah amplitudo
      // mobile: tidak ada GSAP — cukup reveal Motion yang sudah ada
      return () => mm.revert();
    },
    { scope: ref },
  );
  return <section ref={ref} id={id} className={className}>{children}</section>;
}
