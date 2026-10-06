"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

import { ScrollRefresh } from "@/components/animations/gsap";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";

// SATU-SATUNYA tempat Provider client dipasang.
//
// Semua yang memakai:
// - useI18n()
// - <T>
// - <Tx>
// - <DateText>
//
// termasuk Navbar, Footer, WhatsAppButton,
// skip-link, dan seluruh halaman.
//
// MotionConfig reducedMotion="user":
// menghormati prefers-reduced-motion.
export function Providers({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <ScrollRefresh />

        {children}
      </MotionConfig>
    </LanguageProvider>
  );
}