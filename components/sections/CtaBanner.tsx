"use client";
import { ScaleIn } from "@/components/animations";
import { ConsultButton } from "@/components/ui/ConsultButton";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { PAGE_PX } from "@/lib/utils";

// CTA tanpa kotak/kartu: teks + tombol menyatu langsung dengan latar halaman.
export function CtaBanner() {
  const { t } = useI18n();
  return (
    <section className={`py-12 sm:py-16 lg:py-24 ${PAGE_PX}`}>
      <ScaleIn className="mx-auto max-w-3xl text-center">
        <h2 className="fluid-h2 mx-auto max-w-2xl text-balance font-extrabold">{t("cta.bannerTitle")}</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted sm:mt-5 sm:text-base">{t("cta.bannerText")}</p>
        <div className="mt-7 flex flex-col justify-center gap-3 min-[480px]:flex-row min-[480px]:flex-wrap sm:mt-9">
          <ConsultButton />
        </div>
      </ScaleIn>
    </section>
  );
}
