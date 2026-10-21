"use client";
import Image from "next/image";
import { ClipboardList, Headset, Hammer, MessageCircle, PencilRuler, Settings2 } from "lucide-react";
import { FadeLeft, FadeRight, Stagger, StaggerItem } from "@/components/animations";
import { Section } from "@/components/ui/Section";
import { SITE } from "@/lib/constants";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { bi } from "@/lib/i18n/types";

const SERVICES = [
  { icon: MessageCircle, title: bi("Konsultasi"), text: bi("Kami dengar kebutuhan dan anggaran Anda.", "We listen to your needs and budget.") },
  { icon: PencilRuler, title: bi("Perencanaan", "Planning"), text: bi("Ukuran layar dan pixel pitch dihitung dari ruangan Anda.", "Screen size and pixel pitch are worked out from your room.") },
  { icon: Hammer, title: bi("Instalasi", "Installation"), text: bi("Pemasangan rapi oleh teknisi berpengalaman.", "Neat installation by experienced technicians.") },
  { icon: Settings2, title: bi("Maintenance"), text: bi("Perawatan berkala agar layar tetap prima.", "Regular care to keep the screen in top shape.") },
  { icon: Headset, title: bi("Support"), text: bi("Bantuan saat Anda butuh, setelah layar menyala.", "Help when you need it, after the screen is on.") },
  { icon: ClipboardList, title: bi("Solusi Sesuai Kebutuhan", "Tailored Solutions"), text: bi("Konfigurasi disesuaikan jenis ruang dan tujuan.", "Configured for your type of space and goals.") },
];

export function Trust({ h1 = false }: { h1?: boolean } = {}) {
  const { tx } = useI18n();
  const H = h1 ? "h1" : "h2";
  return (
    <div id="tentang" className="relative scroll-mt-20 border-y border-line bg-surface">
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14">
          <FadeRight className="min-w-0">
            {h1 && <p className="mb-3 text-sm font-semibold text-brand2 sm:text-base">{tx(bi("Tentang", "About"))} {SITE.name}</p>}
            <H className="fluid-h2 text-balance font-bold">{tx(bi("Partner Visual Display untuk Bisnis Anda", "Your Visual Display Partner"))}</H>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:mt-5 sm:text-base">
              {SITE.name} {tx(bi("adalah distributor Videotron Indoor & LED Display yang membantu bisnis memilih, memasang, dan merawat layar LED sesuai kebutuhan ruangan. Kami mendampingi Anda dari konsultasi awal sampai layar menyala.", "is an Indoor Videotron & LED Display distributor that helps businesses choose, install, and maintain LED screens to suit their spaces. We support you from the first consultation until the screen is on."))}
            </p>
            <Stagger className="mt-7 grid gap-3 sm:grid-cols-2 sm:gap-4">
              {SERVICES.map((s, i) => (
                <StaggerItem key={s.title.id} index={i}>
                  <div className="card flex h-full gap-3.5 rounded-2xl p-4 sm:p-5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand2"><s.icon size={20} strokeWidth={1.8} aria-hidden /></span>
                    <div className="min-w-0">
                      <h3 className="font-[family-name:var(--font-heading)] text-base font-bold">{tx(s.title)}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{tx(s.text)}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </FadeRight>

          <FadeLeft className="min-w-0">
            <div className="relative">
              <div aria-hidden className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-brand/30 via-brand2/10 to-transparent blur-2xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line sm:aspect-[5/6] lg:aspect-[4/5]">
                <Image
                  src="/images/proyek/ruang-sidang.webp"
                  alt={tx(bi("Layar LED indoor terpasang rapi di ruang sidang", "Indoor LED screen neatly installed in a conference room"))}
                  fill
                  sizes="(min-width:1024px) 40vw, 100vw"
                  className="object-cover object-[50%_35%]"
                />
              </div>
            </div>
          </FadeLeft>
        </div>
      </Section>
    </div>
  );
}
