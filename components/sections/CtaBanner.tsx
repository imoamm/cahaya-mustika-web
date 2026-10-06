"use client";
import { ScaleIn } from "@/components/animations";
import { CtaParallax } from "@/components/animations/gsap";
import { ConsultButton } from "@/components/ui/ConsultButton";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { PAGE_PX } from "@/lib/utils";

export function CtaBanner() {
  const { t } = useI18n();
  return (
    <section className={`py-12 sm:py-16 lg:py-24 ${PAGE_PX}`}>
      <ScaleIn className="mx-auto max-w-6xl">
        <CtaParallax className="relative isolate overflow-hidden rounded-3xl border border-line bg-surface px-5 py-12 text-center sm:rounded-[2rem] sm:px-12 sm:py-20">
          <div data-cta="glow" className="glow-blob absolute left-1/2 top-1/2 -z-10 size-[22rem] -translate-x-1/2 sm:size-[36rem] -translate-y-1/2 rounded-full blur-3xl" aria-hidden />
          <div data-cta="grid" className="grid-bg absolute inset-0 -z-10 opacity-60" aria-hidden />
          <h2 className="fluid-h2 mx-auto max-w-2xl text-balance font-extrabold">{t("cta.bannerTitle")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted sm:mt-5 sm:text-base">{t("cta.bannerText")}</p>
          <div className="mt-7 flex flex-col justify-center gap-3 min-[480px]:flex-row min-[480px]:flex-wrap sm:mt-9">
            <ConsultButton />
          </div>
        </CtaParallax>
      </ScaleIn>
    </section>
  );
}
