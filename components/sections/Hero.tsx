"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { motion } from "motion/react";

import { FadeIn, FadeUp, TextReveal } from "@/components/animations";
import { HeroScroll } from "@/components/animations/gsap";
import { HeroSlideshow } from "@/components/sections/HeroSlideshow";
import { ConsultButton } from "@/components/ui/ConsultButton";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { SITE } from "@/lib/constants";
import { bi } from "@/lib/i18n/types";
import { PAGE_PX } from "@/lib/utils";

const SUB = bi(
  "Layar Videotron Indoor dan LED Display Samsung, LG, dan Hikvision untuk tampilan yang tajam, cerah, dan profesional di lobby, ruang meeting, retail, showroom, dan event.",
  "Samsung, LG, and Hikvision Indoor Videotron and LED Display screens for sharp, bright, professional visuals in lobbies, meeting rooms, retail, showrooms, and events.",
);

export function Hero() {
  const { tx, t } = useI18n();

  return (
    <HeroScroll
      id="home"
      className={`relative isolate overflow-hidden bg-[#050c24] pb-14 pt-28 text-white sm:pb-20 sm:pt-32 lg:pb-28 lg:pt-44 ${PAGE_PX}`}
    >
      {/* Lapisan gradasi */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
      >
        {/* Mobile & tablet */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050c24]/90 via-[#0a1f6b]/70 to-[#0a1f6b]/45 lg:hidden" />

        {/* Desktop */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#050c24] from-[8%] via-[#0a1f6b]/70 via-[42%] to-[#1d4fe0]/10 lg:block" />

        {/* Vinyet atas */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050c24]/60 to-transparent" />
      </motion.div>

      {/* Ambient glow */}
      <div
        data-hero="glow"
        aria-hidden
        className="glow-blob absolute -left-40 top-0 -z-10 size-[26rem] rounded-full opacity-50 blur-3xl sm:size-[36rem]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/4 -z-10 hidden w-[150%] sm:block"
      >
        <div
          className="beam hero-sweep h-full w-full"
          style={{ animationDuration: "16s" }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        <div className="min-w-0 max-w-2xl">
          <FadeIn once delay={0.35}>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur sm:text-sm">
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-[#5AA2FF]"
              />
              {SITE.name}
            </p>
          </FadeIn>

          <h1
            data-hero="headline"
            className="fluid-h1 text-balance font-extrabold"
          >
            <TextReveal
              key={tx(SITE.tagline)}
              text={tx(SITE.tagline)}
              once
              delay={0.55}
            />
          </h1>

          <div data-hero="sub">
            <FadeUp once delay={0.95}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:mt-6 sm:text-lg">
                {tx(SUB)}
              </p>
            </FadeUp>
          </div>

          <div data-hero="cta">
            <FadeUp once delay={1.1}>
              <div className="mt-7 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap sm:mt-9">
                <ConsultButton />

                <Link
                  href="/produk"
                  className="btn border border-white/30 bg-white/10 text-white backdrop-blur transition hover:border-white/60 hover:bg-white/20 hover:shadow-[0_10px_30px_-12px_rgba(90,162,255,.7)]"
                >
                  {t("cta.viewProducts")}
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
            </FadeUp>
          </div>

          {/* Slideshow foto proyek */}
          <HeroSlideshow />
        </div>
      </div>
    </HeroScroll>
  );
}