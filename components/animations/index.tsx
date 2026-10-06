"use client";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Animasi scroll — ter-trigger SETIAP KALI elemen masuk viewport (tanpa `once`).
// Saat elemen keluar viewport ia kembali ke state "hidden", jadi animasi jalan lagi
// ketika user scroll naik maupun turun.
//
// ATURAN PENTING (penyebab bug "section kosong" sebelumnya):
//  1. Elemen yang DIAMATI IntersectionObserver tidak boleh di-clip / di-scale ke 0 pada state hidden.
//     Dulu ImageReveal memakai clip-path: inset(0 0 100% 0) di elemen yang diamati → tile Galeri &
//     Aplikasi tidak pernah dianggap "masuk viewport", tetap opacity 0, tapi tinggi layoutnya tetap
//     ada → tampil sebagai ruang kosong raksasa. Sekarang hanya opacity + transform kecil.
//  2. Setiap item (kartu/tile) mengamati dirinya sendiri, bukan satu wrapper grid yang tinggi.
//  3. Hanya opacity & transform yang dianimasikan → ringan di HP (tanpa layout thrash).
//  4. prefers-reduced-motion dihormati lewat <MotionConfig reducedMotion="user"> di Providers.
// ─────────────────────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;
const HIDE = { duration: 0.3 } as const; // transisi singkat saat elemen keluar viewport
export type Dir = "up" | "down" | "left" | "right" | "none" | "scale" | "rise";

function fromState(d: Dir): { x?: number; y?: number; scale?: number } {
  switch (d) {
    case "up": return { y: 32 };
    case "down": return { y: -32 };
    case "left": return { x: 40 };
    case "right": return { x: -40 };
    case "scale": return { scale: 0.94 };
    case "rise": return { y: 24, scale: 0.96 };
    default: return {};
  }
}

type RevealProps = { children: ReactNode; dir?: Dir; blur?: boolean; delay?: number; amount?: number; className?: string; once?: boolean };
export function Reveal({ children, dir = "up", blur = false, delay = 0, amount = 0.12, className, once = false }: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, ...fromState(dir), ...(blur ? { filter: "blur(10px)" } : {}), transition: HIDE },
    visible: { opacity: 1, x: 0, y: 0, scale: 1, ...(blur ? { filter: "blur(0px)" } : {}), transition: { duration: 0.7, delay, ease: EASE } },
  };
  return (
    <motion.div className={className} initial="hidden" whileInView="visible" viewport={{ amount, once }} variants={variants}>
      {children}
    </motion.div>
  );
}
type P = Omit<RevealProps, "dir">;
export const FadeIn = (p: P) => <Reveal {...p} dir="none" />;
export const FadeUp = (p: P) => <Reveal {...p} dir="up" />;
export const FadeLeft = (p: P) => <Reveal {...p} dir="left" />;
export const FadeRight = (p: P) => <Reveal {...p} dir="right" />;
export const ScaleIn = (p: P) => <Reveal {...p} dir="scale" />;
export const BlurIn = (p: P) => <Reveal {...p} dir="none" blur />;
// Untuk tile bergambar (Aplikasi, Galeri): naik + membesar halus. Sengaja TANPA clip-path.
export const ImageReveal = (p: P) => <Reveal {...p} dir="rise" />;

// Stagger: <Stagger> hanya pembungkus grid; setiap <StaggerItem index={i}> mengamati dirinya sendiri
// dan menunda animasi berdasarkan kolom (index % 3) → kartu di bawah layar tidak "kehabisan" animasi.
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
// Catatan: pasang class hover (transform) pada elemen di DALAM StaggerItem, bukan pada StaggerItem itu sendiri.
export function StaggerItem({ children, className, index = 0, gap = 0.08, y = 28, scale = 0.97 }: { children: ReactNode; className?: string; index?: number; gap?: number; y?: number; scale?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.12 }}
      variants={{
        hidden: { opacity: 0, y, scale, transition: HIDE },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, delay: (index % 3) * gap, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function TextReveal({ text, className, once = false, delay = 0 }: { text: string; className?: string; once?: boolean; delay?: number }) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2, once }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split(" ").map((w, i) => (
          <span key={i} className="mr-[.25em] inline-block overflow-hidden pb-[.1em] align-bottom">
            <motion.span
              className="inline-block"
              variants={{ hidden: { y: "110%", transition: HIDE }, visible: { y: 0, transition: { duration: 0.7, ease: EASE } } }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </span>
    </motion.span>
  );
}

export function Parallax({ children, offset = 40, className }: { children: ReactNode; offset?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [offset, -offset]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
