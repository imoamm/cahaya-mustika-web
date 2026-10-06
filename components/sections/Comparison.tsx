"use client";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ScaleIn } from "@/components/animations";
import { products, type Product, type Specs } from "@/data/products";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { bi, type Text } from "@/lib/i18n/types";

const cols = ["indoor-p1-25", "indoor-p1-53", "indoor-p1-86", "indoor-p2-5"].map((s) => products.find((p) => p.slug === s)!);
const spec = (p: Product, k: keyof Specs): Text => p.specifications?.[k] ?? "—";
const rows: { label: Text; key: keyof Specs }[] = [
  { label: "Pixel Pitch", key: "pixelPitch" },
  { label: "Brightness", key: "brightness" },
  { label: "Refresh Rate", key: "refreshRate" },
  { label: bi("Sudut Pandang", "Viewing Angle"), key: "viewingAngle" },
  { label: bi("Jarak Pandang Ideal", "Ideal Viewing Distance"), key: "idealDistance" },
];

export function Comparison() {
  const { tx } = useI18n();
  return (
    <Section id="spesifikasi">
      <SectionHeading title={tx(bi("Bandingkan Spesifikasi", "Compare Specifications"))} desc={tx(bi("Geser tabel ke samping di layar kecil untuk melihat semua tipe.", "Swipe the table sideways on small screens to see all types."))} />
      <ScaleIn>
        <div className="card overflow-x-auto overscroll-x-contain rounded-2xl sm:rounded-3xl" tabIndex={0} role="region" aria-label={tx(bi("Tabel perbandingan spesifikasi", "Specification comparison table"))}>
          <table className="w-full min-w-[34rem] text-left text-xs sm:text-sm">
            <caption className="sr-only">{tx(bi("Perbandingan spesifikasi Videotron Indoor", "Indoor Videotron specification comparison"))}</caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="sticky left-0 z-10 min-w-[7.5rem] bg-surface px-3 py-3.5 font-medium text-muted sm:p-5">{tx(bi("Spesifikasi", "Specification"))}</th>
                {cols.map((p) => <th key={p.slug} scope="col" className="px-3 py-3.5 font-[family-name:var(--font-heading)] text-sm font-bold sm:p-5 sm:text-base">{p.name.replace("Indoor ", "")}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.key} className="border-b border-line last:border-0 transition-colors hover:bg-brand/5">
                  <th scope="row" className="sticky left-0 z-10 bg-surface px-3 py-3.5 font-medium text-muted sm:p-5">{tx(r.label)}</th>
                  {cols.map((p) => <td key={p.slug} className="px-3 py-3.5 sm:p-5">{tx(spec(p, r.key))}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScaleIn>
    </Section>
  );
}
