"use client";

import type { ReactNode } from "react";
import { ExternalLink, MapPin, MessageCircle } from "lucide-react";
import { FadeUp, ScaleIn } from "@/components/animations";
import { ConsultButton } from "@/components/ui/ConsultButton";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { MAPS_EMBED_URL, MAPS_URL, SITE, waLink } from "@/lib/constants";
import { bi } from "@/lib/i18n/types";
import { PAGE_PX } from "@/lib/utils";

type Props = { h1?: boolean; heading?: ReactNode };

const iconBox = "grid size-11 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand2";

export function ContactSection({ h1 = false, heading }: Props) {
  const { tx } = useI18n();
  const H = h1 ? "h1" : "h2";
  return (
    <section id="kontak" className={`relative scroll-mt-20 border-t border-line bg-surface py-14 sm:py-20 ${PAGE_PX}`}>
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
        <FadeUp className="min-w-0">
          <H className="fluid-h2 text-balance font-bold">{heading ?? tx(bi("Kontak Kami", "Contact Us"))}</H>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            {tx(bi(
              "Ceritakan ukuran ruangan dan kebutuhan Anda. Kami balas dengan rekomendasi layar yang sesuai.",
              "Tell us your room size and needs. We will reply with a suitable screen recommendation.",
            ))}
          </p>

          <div className="mt-7 grid gap-3">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="card card-hover flex items-center gap-4 rounded-2xl p-4 sm:p-5">
              <span className={iconBox}><MessageCircle size={22} strokeWidth={1.8} aria-hidden /></span>
              <span className="min-w-0">
                <span className="block text-sm text-muted">WhatsApp</span>
                <span className="block font-semibold">{SITE.phone}</span>
              </span>
            </a>
            <div className="card flex items-start gap-4 rounded-2xl p-4 sm:p-5">
              <span className={iconBox}><MapPin size={22} strokeWidth={1.8} aria-hidden /></span>
              <address className="min-w-0 text-sm not-italic leading-relaxed">
                <span className="mb-1 block text-muted">{tx(bi("Alamat", "Address"))}</span>
                {SITE.addressLines.map((l) => <span key={l} className="block font-medium">{l}</span>)}
              </address>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <ConsultButton />
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              {tx(bi("Buka Google Maps", "Open Google Maps"))} <ExternalLink size={16} aria-hidden />
            </a>
          </div>
        </FadeUp>

        <ScaleIn className="min-w-0">
          <div className="map-frame card relative h-full min-h-[18rem] overflow-hidden rounded-2xl sm:min-h-[24rem] sm:rounded-3xl">
            <iframe
              title={tx(bi("Lokasi Cahaya Mustika di Google Maps", "Cahaya Mustika location on Google Maps"))}
              src={MAPS_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}
