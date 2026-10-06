"use client";
import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "./register";

// PARALLAX DEPTH — dipakai untuk Applications & Gallery (desktop only).
// Tidak memakai pin sama sekali: hanya scrub transform Y tiap child berdasarkan `depth` yang
// diberikan lewat data-depth (px). Tidak ada tinggi tambahan (tanpa vh trick) → tidak mungkin
// menyebabkan blank space, karena tinggi section tetap murni dari layout grid aslinya.
export function DepthParallax({
  children,
  className,
  maxShift = 36,
}: {
  children: ReactNode;
  className?: string;
  maxShift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const items = Array.from(root.querySelectorAll<HTMLElement>("[data-depth]"));
        if (!items.length) return;
        items.forEach((el) => {
          const depth = Number(el.dataset.depth ?? 0); // 0..1
          const distance = maxShift * depth;
          gsap.fromTo(
            el,
            { y: distance },
            {
              y: -distance,
              ease: "none",
              scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.6 },
            },
          );
        });
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
