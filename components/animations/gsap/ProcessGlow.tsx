"use client";
import { type ReactNode, type RefObject } from "react";
import { gsap, useGSAP, MQ, ScrollTrigger } from "./register";

// Menambahkan blue glow + scale halus pada step yang sedang "aktif" saat scroll (desktop ≥ xl saja).
// Step aktif ditentukan dari scroll progress sepanjang list (root), lalu di-scrub — tanpa pin,
// sehingga tidak menambah tinggi section sama sekali (progress line yang sudah ada via Motion tetap dipakai).
// `olRef` dipakai bersama oleh Motion (useScroll untuk garis progres) dan GSAP (glow step aktif)
// agar keduanya mengamati elemen <ol> yang sama tanpa ref ganda.
export function ProcessGlow({
  children,
  className,
  count,
  olRef,
}: {
  children: ReactNode;
  className?: string;
  count: number;
  olRef: RefObject<HTMLOListElement | null>;
}) {
  useGSAP(
    () => {
      const root = olRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.wide, () => {
        const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
        if (!steps.length) return;

        // Dua layer shadow yang sama-sama dipakai di kondisi aktif/nonaktif (hanya alpha & ukuran yang beda)
        // supaya GSAP bisa meng-interpolasi boxShadow dengan mulus (struktur harus sama persis).
        const GLOW_ON = "0 0 0 3px rgba(47,107,255,.9), 0 0 34px -6px rgba(47,107,255,.55)";
        const GLOW_OFF = "0 0 0 0 rgba(47,107,255,0), 0 0 0 0 rgba(47,107,255,0)";
        const setActive = (progress: number) => {
          const active = Math.min(count - 1, Math.floor(progress * count));
          steps.forEach((el, i) => {
            const isActive = i === active;
            gsap.to(el, {
              scale: isActive ? 1.04 : 1,
              boxShadow: isActive ? GLOW_ON : GLOW_OFF,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          });
        };

        const st = ScrollTrigger.create({
          trigger: root,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 0.3,
          onUpdate: (self) => setActive(self.progress),
        });
        return () => st.kill();
      });
      return () => mm.revert();
    },
    { scope: olRef, dependencies: [count] },
  );

  return (
    <ol ref={olRef} className={className}>
      {children}
    </ol>
  );
}
