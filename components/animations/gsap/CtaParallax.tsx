"use client";
import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "./register";

// Parallax sangat halus untuk glow + grid background CTA. Berjalan di semua ukuran layar karena
// biayanya kecil (hanya 2 elemen, transform saja) — tetap nonaktif otomatis saat prefers-reduced-motion
// karena file register.ts hanya membuat matchMedia untuk query yang menyertakan "no-preference".
export function CtaParallax({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const glow = root.querySelector<HTMLElement>("[data-cta='glow']");
        const grid = root.querySelector<HTMLElement>("[data-cta='grid']");
        if (glow) gsap.fromTo(glow, { y: -24 }, { y: 24, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.8 } });
        if (grid) gsap.fromTo(grid, { y: 10 }, { y: -10, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.8 } });
        return () => {};
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
