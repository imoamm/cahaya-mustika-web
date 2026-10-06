import { bi, type Bi, type Text } from "@/lib/i18n/types";
import { imagePath } from "@/lib/images";
import type { BrandId } from "@/data/brands";

// ⚙️ Spesifikasi di bawah adalah DUMMY (dari versi sebelumnya). Ganti dengan data resmi dari pabrik/principal.
// Gambar produk: public/images/products/1.png – 6.png (lihat lib/images.ts).
//
// BRAND: field `brand` memakai ID dari data/brands.ts ("samsung" | "lg" | "hivision").
//   • 6 produk seri pixel pitch di bawah BELUM diketahui brand aslinya → sengaja TANPA `brand`
//     (tidak ditebak). Setelah data resmi ada, cukup tambahkan `brand: "samsung"` dst. — URL, filter,
//     dan halaman brand otomatis menyesuaikan.
//   • Tiap brand punya 1 produk `placeholder: true` supaya halaman brand punya struktur siap isi.
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
};

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

export const products: Product[] = [
  series("indoor-p1-25", "Indoor P1.25", "1.25mm", nits("600"), hz("3.840", "3,840"), bi("≥ 1,5 m", "≥ 1.5 m"), 1, bi("Detail paling halus untuk ruang meeting, lobby, dan control room yang dilihat dari jarak dekat.", "The finest detail for meeting rooms, lobbies, and control rooms viewed up close."), true),
  series("indoor-p1-53", "Indoor P1.53", "1.53mm", nits("600"), hz("3.840", "3,840"), bi("≥ 1,8 m", "≥ 1.8 m"), 2, bi("Keseimbangan resolusi dan anggaran untuk showroom dan ruang presentasi.", "A balance of resolution and budget for showrooms and presentation rooms.")),
  series("indoor-p1-86", "Indoor P1.86", "1.86mm", nits("800"), hz("3.840", "3,840"), bi("≥ 2 m"), 3, bi("Pilihan populer untuk retail, hotel, dan area publik dengan pencahayaan terang.", "A popular choice for retail, hotels, and brightly lit public areas."), true),
  series("indoor-p2", "Indoor P2", "2.0mm", nits("800"), hz("1.920", "1,920"), bi("≥ 2,5 m", "≥ 2.5 m"), 4, bi("Layar serbaguna untuk restoran, ballroom, dan panggung indoor.", "A versatile display for restaurants, ballrooms, and indoor stages.")),
  series("indoor-p2-5", "Indoor P2.5", "2.5mm", nits("900"), hz("1.920", "1,920"), bi("≥ 3 m"), 5, bi("Layar besar yang hemat biaya untuk mall, gereja, masjid, dan aula.", "A cost-effective large display for malls, churches, mosques, and halls.")),
  series("indoor-p3", "Indoor P3", "3.0mm", nits("1.000", "1,000"), hz("1.920", "1,920"), bi("≥ 3,5 m", "≥ 3.5 m"), 6, bi("Solusi ekonomis untuk ruang luas dengan jarak pandang jauh.", "An economical solution for large spaces with long viewing distances.")),

  // ── PLACEHOLDER per brand (TODO: ganti dengan produk & spesifikasi resmi) ──
  ...(["samsung", "lg", "hivision"] as const).map<Product>((brand) => {
    const name = brand === "samsung" ? "Samsung" : brand === "lg" ? "LG" : "Hikvision";
    return {
      slug: `${brand}-indoor-led`, brand, name: `${name} Indoor LED Display`, category: CAT, placeholder: true,
      summary: bi(`Produk ${name} akan ditampilkan di sini. Hubungi sales untuk katalog dan spesifikasi terbaru.`, `${name} products will be listed here. Contact sales for the latest catalog and specifications.`),
      description: bi(`TODO: deskripsi & spesifikasi resmi ${name} belum tersedia. Hubungi sales untuk informasi produk terbaru.`, `TODO: official ${name} description and specifications are not available yet. Contact sales for the latest product information.`),
      specifications: null, images: [],
    };
  }),
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
/** Produk non-placeholder — dipakai showcase beranda & tabel perbandingan. */
export const showcaseProducts = products.filter((p) => !p.placeholder);
export const productsByBrand = (brand: BrandId) => products.filter((p) => p.brand === brand);
/** URL kanonis: produk ber-brand → /produk/[brand]/[slug]; produk tanpa brand → /produk/[slug] (URL lama tetap hidup). */
export const productHref = (p: Pick<Product, "brand" | "slug">) => (p.brand ? `/produk/${p.brand}/${p.slug}` : `/produk/${p.slug}`);
