import { bi, type Bi } from "@/lib/i18n/types";
import { imagePath } from "@/lib/images";
import type { BrandId } from "@/data/brands";

// ⚠️ SEMUA entri di bawah adalah CONTOH (sample: true) — BUKAN proyek nyata.
// TODO: ganti dengan proyek asli (title, client, location, year, brand, images), lalu set `sample: false`.
// Selama `sample: true`, kartu & halaman detail menampilkan label "Contoh Portfolio".
// Gambar: public/images/portfolio/26.png – 31.png (placeholder otomatis jika belum ada).
export type PortfolioItem = {
  slug: string;
  title: Bi;
  client: Bi | null;
  location: Bi | null;
  category: Bi;
  description: Bi;
  images: string[];
  year: number | null;
  brand: BrandId | null;
  featured: boolean;
  sample: boolean;
};

const DESC = bi(
  "Contoh tampilan halaman portofolio. Deskripsi proyek, ukuran layar, dan detail instalasi akan diisi setelah data proyek asli tersedia.",
  "Sample of a portfolio page layout. The project description, screen size, and installation details will be filled in once real project data is available.",
);
const mk = (slug: string, n: number, title: Bi, category: Bi, featured = false): PortfolioItem => ({
  slug, title, category, featured, description: DESC, client: null, location: null, year: null, brand: null, sample: true,
  images: [imagePath("portfolio", n)],
});

export const portfolio: PortfolioItem[] = [
  mk("contoh-lobby-hotel", 26, bi("Contoh: Videotron Lobby Hotel", "Sample: Hotel Lobby Videotron"), bi("Hotel", "Hotel"), true),
  mk("contoh-showroom", 27, bi("Contoh: Videotron Showroom", "Sample: Showroom Videotron"), bi("Showroom", "Showroom"), true),
  mk("contoh-ruang-meeting", 28, bi("Contoh: Videotron Ruang Meeting", "Sample: Meeting Room Videotron"), bi("Perkantoran", "Corporate")),
  mk("contoh-pusat-perbelanjaan", 29, bi("Contoh: Videotron Pusat Perbelanjaan", "Sample: Shopping Center Videotron"), bi("Retail", "Retail")),
  mk("contoh-ballroom", 30, bi("Contoh: Videotron Ballroom", "Sample: Ballroom Videotron"), bi("Event", "Event")),
  mk("contoh-tempat-ibadah", 31, bi("Contoh: Videotron Tempat Ibadah", "Sample: Worship Place Videotron"), bi("Institusi", "Institution")),
];

export const getPortfolio = (slug: string) => portfolio.find((p) => p.slug === slug);
