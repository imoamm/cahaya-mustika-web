import { bi, type Text } from "@/lib/i18n/types";
import type { Product, Specs } from "@/data/products";

// ─────────────────────────────────────────────────────────────────────────────
// SPESIFIKASI DETAIL per produk (dipakai halaman detail produk).
// Sumber: datasheet/brosur resmi Samsung, LG, Hikvision (diambil Okt 2026).
// ATURAN: hanya isi field yang tercantum di datasheet. Field yang tidak diisi
// otomatis disembunyikan di halaman detail. JANGAN menebak angka.
// Kunci = slug produk (lihat `slug` di data/products.ts).
// ─────────────────────────────────────────────────────────────────────────────
export type SpecDetail = Partial<
  Record<
    | "pixelPitch" | "technology" | "cabinet" | "resolution" | "brightness" | "contrast"
    | "refreshRate" | "viewingAngle" | "power" | "protection" | "weight"
    | "lifespan" | "idealDistance" | "temperature",
    Text
  >
>;

const t = (id: string, en: string = id) => bi(id, en);
const mm = (n: number) => `${n}`.replace(".", ",");

// Pitch fisik (mm) dari kode pixel pitch pada nama produk.
const pitchText = (mmValue: string, code: string) => t(`${mmValue.replace(".", ",")} mm (kategori ${code})`, `${mmValue} mm (${code} category)`);
const px = (w: number, h: number) => t(`${w} × ${h} piksel`, `${w} × ${h} pixels`);
const nits = (n: string, en: string = n) => t(`${n} nits`, `${en} nits`);

// Kabinet 16:9 600 × 337,5 mm (Samsung IEC, Hikvision Ultra, LG LMEA/LSAB/LMPB)
const cab16x9 = (d: number) => t(`600 × 337,5 × ${mm(d)} mm`, `600 × 337.5 × ${d} mm`);

export const specDetails: Record<string, SpecDetail> = {
  // ── HIKVISION · Ultra Series (Flip-chip COB, kabinet 600 × 337,5 × 29,3 mm, 3,4 kg) ──
  "hikvision-ultra-p0-9": {
    pixelPitch: pitchText("0.9375", "P0.9"),
    technology: t("Flip-chip COB"),
    cabinet: cab16x9(29.3),
    resolution: px(640, 360),
    brightness: nits("600"),
    weight: t("3,4 kg", "3.4 kg"),
  },
  "hikvision-ultra-p1-2": {
    pixelPitch: pitchText("1.25", "P1.2"),
    technology: t("Modul flip-chip COB 300 × 168,75 mm, resolusi 240 × 135 piksel", "Flip-chip COB module 300 × 168.75 mm, 240 × 135 pixel resolution"),
    cabinet: t("Die-cast aluminium 600 × 337,5 × 29,3 mm (rasio 16:9)", "Die-cast aluminium 600 × 337.5 × 29.3 mm (16:9 ratio)"),
    resolution: px(480, 270),
    brightness: nits("600"),
    contrast: t("15.000:1", "15,000:1"),
    refreshRate: t("Hingga 3.840 Hz (16-bit)", "Up to 3,840 Hz (16-bit)"),
    viewingAngle: t("160° / 160°"),
    power: t("Maksimal 300 W/m² · Rata-rata 100 W/m²", "Max 300 W/m² · Avg 100 W/m²"),
    protection: t("Depan IP65 · Perawatan dari sisi depan", "Front IP65 · Front maintenance"),
    weight: t("3,4 kg", "3.4 kg"),
  },
  "hikvision-ultra-p1-5": {
    pixelPitch: pitchText("1.5625", "P1.5"),
    technology: t("Flip-chip COB"),
    cabinet: cab16x9(29.3),
    resolution: px(384, 216),
    brightness: nits("600"),
    weight: t("3,4 kg", "3.4 kg"),
  },

  // ── HIKVISION · Solid Plus (HOB) & Solid (SMD) ──
  "hikvision-solid-plus-p1-2-gob": { pixelPitch: pitchText("1.25", "P1.2"), technology: t("HOB (GOB)"), brightness: nits("600"), weight: t("3,4 kg", "3.4 kg") },
  "hikvision-solid-plus-p1-5-gob": { pixelPitch: pitchText("1.5625", "P1.5"), technology: t("HOB (GOB)"), brightness: nits("600"), weight: t("3,4 kg", "3.4 kg") },
  "hikvision-solid-plus-p1-8-gob": { pixelPitch: pitchText("1.875", "P1.8"), technology: t("HOB (GOB)"), brightness: nits("600"), weight: t("3,4 kg", "3.4 kg") },
  "hikvision-solid-p1-2": { pixelPitch: pitchText("1.25", "P1.2"), technology: t("SMD triad LED"), brightness: nits("600") },
  "hikvision-solid-p1-5": { pixelPitch: pitchText("1.5625", "P1.5"), technology: t("SMD triad LED"), brightness: nits("600") },
  "hikvision-solid-p1-8": { pixelPitch: pitchText("1.875", "P1.8"), technology: t("SMD triad LED"), brightness: nits("600") },

  // ── SAMSUNG · The Wall (seri IWA, kabinet 806,4 × 453,6 mm) ──
  "samsung-the-wall-p0-63": { pixelPitch: pitchText("0.63", "P0.63") },
  "samsung-the-wall-p0-84": {
    pixelPitch: pitchText("0.84", "P0.84"),
    technology: t("Flip-chip RGB LED, pixel configuration 1R-1G-1B", "Flip-chip RGB LED, 1R-1G-1B pixel configuration"),
    cabinet: t("806,4 × 453,6 mm", "806.4 × 453.6 mm"),
    resolution: px(960, 540),
    brightness: t("Hingga 1.600 nits (puncak) / 500 nits (maks)", "Up to 1,600 nits (peak) / 500 nits (max)"),
    contrast: t("24.000:1", "24,000:1"),
    refreshRate: t("3.840 Hz", "3,840 Hz"),
    power: t("Maksimal 383 W/m² (140 W/kabinet) · Tipikal 260 W/m² (95 W/kabinet)", "Max 383 W/m² (140 W/cabinet) · Typ 260 W/m² (95 W/cabinet)"),
    weight: t("11,2 kg", "11.2 kg"),
  },
  "samsung-the-wall-p0-945": { pixelPitch: pitchText("0.945", "P0.945") },

  // ── SAMSUNG · IEC (kabinet 600 × 337,5 × 38 mm, aluminium die-casting, 5,6 kg) ──
  "samsung-iec-p0-93": {
    pixelPitch: pitchText("0.9375", "P0.93"),
    cabinet: t("Aluminium die-cast 600 × 337,5 × 38 mm", "Aluminium die-cast 600 × 337.5 × 38 mm"),
    resolution: px(640, 360),
    brightness: nits("> 600"),
    refreshRate: t("3.840 Hz", "3,840 Hz"),
    power: t("Maksimal 626 W/m² (126,8 W/kabinet)", "Max 626 W/m² (126.8 W/cabinet)"),
    weight: t("5,6 ± 0,3 kg", "5.6 ± 0.3 kg"),
    lifespan: t("100.000 jam", "100,000 hours"),
  },
  "samsung-iec-p1-2": {
    pixelPitch: pitchText("1.25", "P1.2"),
    technology: t("Modul 300 × 168,75 mm (2 × 2 per kabinet)", "300 × 168.75 mm modules (2 × 2 per cabinet)"),
    cabinet: t("Aluminium die-cast 600 × 337,5 × 38 mm", "Aluminium die-cast 600 × 337.5 × 38 mm"),
    resolution: px(480, 270),
    brightness: nits("> 600"),
    contrast: t("4.000:1", "4,000:1"),
    refreshRate: t("3.840 Hz", "3,840 Hz"),
    power: t("Maksimal 556 W/m² (112,6 W/kabinet) · Rata-rata 185 W/m² (37,5 W/kabinet)", "Max 556 W/m² (112.6 W/cabinet) · Avg 185 W/m² (37.5 W/cabinet)"),
    protection: t("IP30 (sisi depan) · Perawatan dari sisi depan", "IP30 (front) · Front maintenance"),
    weight: t("5,6 ± 0,3 kg", "5.6 ± 0.3 kg"),
    lifespan: t("100.000 jam", "100,000 hours"),
  },
  "samsung-iec-p1-5": {
    pixelPitch: pitchText("1.5625", "P1.5"),
    technology: t("Modul 300 × 168,75 mm (2 × 2 per kabinet)", "300 × 168.75 mm modules (2 × 2 per cabinet)"),
    cabinet: t("Aluminium die-cast 600 × 337,5 × 38 mm", "Aluminium die-cast 600 × 337.5 × 38 mm"),
    resolution: px(384, 216),
    brightness: nits("> 600"),
    contrast: t("4.000:1", "4,000:1"),
    refreshRate: t("3.840 Hz", "3,840 Hz"),
    viewingAngle: t("160° / 140°"),
    power: t("Maksimal 382 W/m² (77,4 W/kabinet) · Rata-rata 127 W/m² (25,8 W/kabinet)", "Max 382 W/m² (77.4 W/cabinet) · Avg 127 W/m² (25.8 W/cabinet)"),
    protection: t("IP30", "IP30"),
    weight: t("5,6 ± 0,3 kg", "5.6 ± 0.3 kg"),
    lifespan: t("100.000 jam", "100,000 hours"),
  },

  // ── SAMSUNG · IFR (kabinet penuh 960 × 540 mm; dukung HDR10+) ──
  "samsung-ifr-p1-5": { pixelPitch: pitchText("1.5", "P1.5"), brightness: t("Hingga 800 nits (tipikal) / 1.600 nits (puncak)", "Up to 800 nits (typ) / 1,600 nits (peak)") },
  "samsung-ifr-p2-5": { pixelPitch: pitchText("2.5", "P2.5") },
  "samsung-ifr-p4-0": { pixelPitch: pitchText("4.0", "P4.0") },

  // ── LG · MAGNIT Micro LED (LMPB) ──
  "lg-magnit-lmpb-p0-78": { pixelPitch: pitchText("0.78", "P0.78") },
  "lg-magnit-lmpb-p0-94": { pixelPitch: pitchText("0.94", "P0.94") },
  "lg-magnit-lmpb-p1-25": {
    pixelPitch: pitchText("1.25", "P1.25"),
    cabinet: t("600 × 337,5 mm", "600 × 337.5 mm"),
    resolution: px(480, 270),
    brightness: t("500 nits (tipikal) / 1.000 nits (puncak)", "500 nits (typ) / 1,000 nits (peak)"),
    contrast: t("20.000:1", "20,000:1"),
  },

  // ── LG · MAGNIT Essential (LMEA, 4 modul per kabinet, tebal 30 mm) ──
  "lg-magnit-lmea-p0-94": { pixelPitch: pitchText("0.9375", "P0.94"), cabinet: cab16x9(30), resolution: px(640, 360), brightness: nits("600"), refreshRate: t("3.840 Hz", "3,840 Hz") },
  "lg-magnit-lmea-p1-25": {
    pixelPitch: pitchText("1.25", "P1.25"),
    technology: t("4 modul per kabinet", "4 modules per cabinet"),
    cabinet: cab16x9(30),
    resolution: px(480, 270),
    brightness: t("600 nits (setelah kalibrasi) · Keseragaman 97%", "600 nits (after calibration) · 97% uniformity"),
    refreshRate: t("3.840 Hz", "3,840 Hz"),
    weight: t("3,9 kg", "3.9 kg"),
  },
  "lg-magnit-lmea-p1-56": { pixelPitch: pitchText("1.5625", "P1.56"), cabinet: cab16x9(30), resolution: px(384, 216), brightness: nits("600"), refreshRate: t("3.840 Hz", "3,840 Hz") },

  // ── LG · MAGNIT MicroLED (LSAB, COB, kabinet die-casting aluminium) ──
  "lg-magnit-lsab-p0-9": {
    pixelPitch: pitchText("0.9375", "P0.94"),
    cabinet: t("Aluminium 600 × 337,5 mm", "Aluminium 600 × 337.5 mm"),
    resolution: px(640, 360),
    brightness: t("600 nits (puncak 1.200 nits) · Keseragaman 95%", "600 nits (1,200 nits peak) · 95% uniformity"),
    contrast: t("33.000:1 (@10 lux)", "33,000:1 (@10 lux)"),
    refreshRate: t("3.840 Hz", "3,840 Hz"),
    weight: t("7 kg", "7 kg"),
    lifespan: t("100.000 jam (hingga separuh kecerahan)", "100,000 hours (to half brightness)"),
  },
  "lg-magnit-lsab-p1-2": {
    pixelPitch: pitchText("1.25", "P1.25"),
    technology: t("COB · Modul 300 × 112,5 mm (2 × 3 per kabinet)", "COB · 300 × 112.5 mm modules (2 × 3 per cabinet)"),
    cabinet: t("Aluminium die-cast 600 × 337,5 × 44,9 mm", "Aluminium die-cast 600 × 337.5 × 44.9 mm"),
    resolution: px(480, 270),
    weight: t("7,2 kg (35,5 kg/m²)", "7.2 kg (35.5 kg/m²)"),
  },
  "lg-magnit-lsab-p0-7": { pixelPitch: pitchText("0.7", "P0.7") },
};

/** Ubah `specifications` lama (seri pixel pitch umum) ke format SpecDetail. */
const fromLegacy = (s: Specs): SpecDetail => ({
  pixelPitch: s.pixelPitch, cabinet: s.cabinetSize, brightness: s.brightness, refreshRate: s.refreshRate,
  viewingAngle: s.viewingAngle, power: s.power, protection: s.ip, lifespan: s.lifespan,
  idealDistance: s.idealDistance, temperature: s.temperature,
});

export function getSpecDetail(p: Product): SpecDetail {
  if (p.specifications) return fromLegacy(p.specifications);
  return specDetails[p.slug] ?? (p.pitch ? { pixelPitch: p.pitch } : {});
}
