// Sistem gambar PNG sequential — SATU-SATUNYA tempat yang mengatur path gambar.
//
//   public/images/products/      1.png  – 6.png    (produk)
//   public/images/applications/  7.png  – 16.png   (aplikasi)
//   public/images/gallery/       17.png – 22.png   (galeri)
//   public/images/brands/        23.png – 25.png   (hero brand: Samsung, LG, Hikvision)
//   public/images/portfolio/     26.png – 31.png   (portofolio)
//   public/images/articles/      32.png – 37.png   (gambar artikel)
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

export const imagePath = (group: ImageGroup, n: number) => `/images/${group}/${n}.png`;
