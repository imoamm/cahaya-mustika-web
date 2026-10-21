// Sistem gambar WebP sequential — SATU-SATUNYA tempat yang mengatur path gambar.
//
//   public/images/products/      1.webp  – 6.webp    (produk)
//   public/images/applications/  7.webp  – 16.webp   (aplikasi)
//   public/images/gallery/       17.webp – 22.webp   (galeri)
//   public/images/brands/        23.webp – 25.webp   (hero brand: Samsung, LG, Hikvision)
//   public/images/portfolio/     26.webp – 31.webp   (portofolio)
//   public/images/articles/      32.webp – 37.webp   (gambar artikel)
//
// Nomor bersifat global & berurutan supaya mudah dikelola. Jika file belum ada,
// komponen <Media /> otomatis menampilkan placeholder (tidak ada broken image / ruang kosong).
export type ImageGroup = "products" | "applications" | "gallery" | "brands" | "portfolio" | "articles";

export const IMAGE_RANGES: Record<ImageGroup, readonly [first: number, last: number]> = {
  products: [1, 6],
  applications: [7, 16],
  gallery: [17, 22],
  brands: [23, 25],
  portfolio: [26, 31],
  articles: [32, 37],
};

export const imagePath = (group: ImageGroup, n: number) => `/images/${group}/${n}.webp`;
