import { bi, type Bi, type Text } from "@/lib/i18n/types";
import { imagePath } from "@/lib/images";
import type { BrandId } from "@/data/brands";

// ⚙️ Spesifikasi di bawah adalah DUMMY (dari versi sebelumnya). Ganti dengan data resmi dari pabrik/principal.
// Gambar produk: public/images/products/1.webp – 6.webp (lihat lib/images.ts).
//
// BRAND: field `brand` memakai ID dari data/brands.ts ("samsung" | "lg" | "hivision").
//   • 6 produk seri pixel pitch di bawah BELUM diketahui brand aslinya → sengaja TANPA `brand`
//     (tidak ditebak). Setelah data resmi ada, cukup tambahkan `brand: "samsung"` dst. — URL, filter,
//     dan halaman brand otomatis menyesuaikan.
//   • Produk ber-brand (Hikvision / Samsung / LG) ada di blok CATALOG di bawah, dikelompokkan per SERI.
//     Hanya jenis & nama produk yang diketahui → `specifications: null` (TIDAK ada spesifikasi karangan).
//     Isi `specifications` per produk setelah data resmi principal tersedia, kartu & halaman detail ikut menyesuaikan.
export type Specs = {
  pixelPitch: Text; brightness: Text; refreshRate: Text; cabinetSize: Text; moduleSize: Text;
  viewingAngle: Text; lifespan: Text; power: Text; ip: Text; temperature: Text; idealDistance: Text;
};

export type Product = {
  slug: string;
  brand?: BrandId;
  name: string;
  category: Bi;
  summary: Bi;
  description: Bi;
  /** null = spesifikasi belum tersedia (placeholder). */
  specifications: Specs | null;
  images: string[];
  featured?: boolean;
  placeholder?: boolean; // TODO: data resmi belum ada
  /** ID seri (lihat `seriesList`). Produk lama tanpa brand tidak punya seri. */
  series?: string;
  /** Kode pixel pitch yang tertulis di nama produk, mis. "P0.9". */
  pitch?: string;
  /** Label tambahan yang tertulis di nama produk, mis. "GOB". */
  tags?: string[];
};

/** Seri produk per brand. Urutan array = urutan tampil. */
export type ProductSeries = { id: string; brand: BrandId; name: string };

const base = {
  cabinetSize: bi("640 × 480 mm"), moduleSize: bi("320 × 160 mm"), viewingAngle: bi("160° / 160°"),
  lifespan: bi("100.000 jam", "100,000 hours"), power: bi("≤ 650 W/m² (maks) · 220 W/m² (rata-rata)", "≤ 650 W/m² (max) · 220 W/m² (avg)"),
  ip: bi("IP30"), temperature: bi("-10°C s/d 40°C", "-10°C to 40°C"),
};
const CAT = bi("Videotron Indoor", "Indoor Videotron");
const desc = (id: string, en: string) => bi(id, en);

function series(slug: string, name: string, pitch: string, brightness: Bi, refresh: Bi, dist: Bi, n: number, summary: Bi, featured = false): Product {
  return {
    slug, name, category: CAT, summary, featured,
    description: desc(
      `${name} adalah layar LED indoor modular dengan pixel pitch ${pitch}. Ukuran layar dapat disesuaikan dengan dinding atau ruangan Anda dengan menggabungkan cabinet.`,
      `${name} is a modular indoor LED display with a ${pitch} pixel pitch. Screen size can be tailored to your wall or room by combining cabinets.`,
    ),
    specifications: { ...base, pixelPitch: bi(pitch), brightness, refreshRate: refresh, idealDistance: dist },
    images: [imagePath("products", n)],
  };
}
const nits = (id: string, en: string = id) => bi(`${id} nits`, `${en} nits`);
const hz = (id: string, en: string) => bi(`${id} Hz`, `${en} Hz`);

// ─────────────────────────────────────────────────────────────────────────────
// CATALOG: produk ber-brand, per seri. Tambah produk baru = tambah satu string di `items`.
// Nama produk ditulis persis seperti dari klien; pixel pitch & tag (GOB) diambil dari nama itu.
// ─────────────────────────────────────────────────────────────────────────────
const CATALOG: { series: ProductSeries; items: string[] }[] = [
  // ── HIKVISION ──
  { series: { id: "hikvision-ultra", brand: "hivision", name: "Hikvision Ultra Series" }, items: ["Hikvision P0.9", "Hikvision P1.2", "Hikvision P1.5"] },
  { series: { id: "hikvision-solid-plus", brand: "hivision", name: "Hikvision Solid Plus Series" }, items: ["Hikvision P1.2 GOB", "Hikvision P1.5 GOB", "Hikvision P1.8 GOB"] },
  { series: { id: "hikvision-solid", brand: "hivision", name: "Hikvision Solid Series" }, items: ["Hikvision P1.2", "Hikvision P1.5", "Hikvision P1.8"] },
  // ── SAMSUNG ──
  { series: { id: "samsung-the-wall", brand: "samsung", name: "Samsung The Wall Series" }, items: ["Samsung The Wall P0.63", "Samsung The Wall P0.84", "Samsung The Wall P0.945"] },
  { series: { id: "samsung-iec", brand: "samsung", name: "Samsung IEC Series" }, items: ["Samsung IEC P0.93", "Samsung IEC P1.2", "Samsung IEC P1.5"] },
  { series: { id: "samsung-ifr", brand: "samsung", name: "Samsung IFR Series" }, items: ["Samsung IFR P1.5", "Samsung IFR P2.5", "Samsung IFR P4.0"] },
  // ── LG ──
  { series: { id: "lg-magnit-lmpb", brand: "lg", name: "LG MAGNIT Micro LED (LMPB Series)" }, items: ["LG MAGNIT Micro LED P0.78", "LG MAGNIT Micro LED P0.94", "LG MAGNIT Micro LED P1.25"] },
  { series: { id: "lg-magnit-lmea", brand: "lg", name: "LG MAGNIT Essential (LMEA Series)" }, items: ["LG MAGNIT Essential P0.94", "LG MAGNIT Essential P1.25", "LG MAGNIT Essential P1.56"] },
  { series: { id: "lg-magnit-lsab", brand: "lg", name: "LG MAGNIT MicroLED (LSAB Series)" }, items: ["LG MAGNIT MicroLED P0.9", "LG MAGNIT MicroLED P1.2", "LG MAGNIT MicroLED P0.7"] },
];

export const seriesList: ProductSeries[] = CATALOG.map((c) => c.series);
export const getSeries = (id?: string) => seriesList.find((s) => s.id === id);
export const seriesByBrand = (brand: BrandId) => seriesList.filter((s) => s.brand === brand);

const catalogProducts: Product[] = CATALOG.flatMap(({ series, items }) =>
  items.map<Product>((model) => {
    const name = `Videotron Indoor ${model}`;
    const pitch = /\bP\d+(?:\.\d+)?\b/.exec(model)?.[0] ?? "";
    const tags = /\bGOB\b/.test(model) ? ["GOB"] : [];
    const label = `${pitch}${tags.length ? ` ${tags.join(" ")}` : ""}`;
    return {
      slug: `${series.id}-${pitch.toLowerCase().replace(".", "-")}${tags.length ? `-${tags[0].toLowerCase()}` : ""}`,
      brand: series.brand, series: series.id, pitch, tags, name, category: CAT,
      summary: bi(
        `${series.name} dengan pixel pitch ${label}. Hubungi tim kami untuk spesifikasi lengkap dan penawaran.`,
        `${series.name} with a ${label} pixel pitch. Contact our team for full specifications and a quotation.`,
      ),
      description: bi(
        `${name} adalah bagian dari ${series.name}. Hubungi tim kami untuk spesifikasi lengkap, ketersediaan, dan penawaran sesuai kebutuhan ruangan Anda.`,
        `${name} is part of the ${series.name}. Contact our team for full specifications, availability, and a quotation tailored to your space.`,
      ),
      specifications: null,
      images: [],
    };
  }),
);

export const products: Product[] = [
  series("indoor-p1-25", "Indoor P1.25", "1.25mm", nits("600"), hz("3.840", "3,840"), bi("≥ 1,5 m", "≥ 1.5 m"), 1, bi("Detail paling halus untuk ruang meeting, lobby, dan control room yang dilihat dari jarak dekat.", "The finest detail for meeting rooms, lobbies, and control rooms viewed up close."), true),
  series("indoor-p1-53", "Indoor P1.53", "1.53mm", nits("600"), hz("3.840", "3,840"), bi("≥ 1,8 m", "≥ 1.8 m"), 2, bi("Keseimbangan resolusi dan anggaran untuk showroom dan ruang presentasi.", "A balance of resolution and budget for showrooms and presentation rooms.")),
  series("indoor-p1-86", "Indoor P1.86", "1.86mm", nits("800"), hz("3.840", "3,840"), bi("≥ 2 m"), 3, bi("Pilihan populer untuk retail, hotel, dan area publik dengan pencahayaan terang.", "A popular choice for retail, hotels, and brightly lit public areas."), true),
  series("indoor-p2", "Indoor P2", "2.0mm", nits("800"), hz("1.920", "1,920"), bi("≥ 2,5 m", "≥ 2.5 m"), 4, bi("Layar serbaguna untuk restoran, ballroom, dan panggung indoor.", "A versatile display for restaurants, ballrooms, and indoor stages.")),
  series("indoor-p2-5", "Indoor P2.5", "2.5mm", nits("900"), hz("1.920", "1,920"), bi("≥ 3 m"), 5, bi("Layar besar yang hemat biaya untuk mall, gereja, masjid, dan aula.", "A cost-effective large display for malls, churches, mosques, and halls.")),
  series("indoor-p3", "Indoor P3", "3.0mm", nits("1.000", "1,000"), hz("1.920", "1,920"), bi("≥ 3,5 m", "≥ 3.5 m"), 6, bi("Solusi ekonomis untuk ruang luas dengan jarak pandang jauh.", "An economical solution for large spaces with long viewing distances.")),

  ...catalogProducts,
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
/** Produk non-placeholder — dipakai showcase beranda & tabel perbandingan. */
/** Beranda tetap menampilkan seri pixel pitch umum (yang lama); katalog ber-brand tampil di /produk. */
export const showcaseProducts = products.filter((p) => !p.placeholder && !p.series);
export const productsByBrand = (brand: BrandId) => products.filter((p) => p.brand === brand);
/** URL kanonis: produk ber-brand → /produk/[brand]/[slug]; produk tanpa brand → /produk/[slug] (URL lama tetap hidup). */
export const productHref = (p: Pick<Product, "brand" | "slug">) => (p.brand ? `/produk/${p.brand}/${p.slug}` : `/produk/${p.slug}`);
