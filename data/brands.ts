import { bi, type Bi } from "@/lib/i18n/types";
import { imagePath } from "@/lib/images";

// ID brand yang konsisten — SATU-SATUNYA sumber nama brand. Jangan menulis nama brand manual di component.
export const BRAND_IDS = ["samsung", "lg", "hivision"] as const;
export type BrandId = (typeof BRAND_IDS)[number];

export type Brand = {
  id: BrandId;
  name: string;
  tagline: Bi;
  about: Bi;
  advantages: { title: Bi; text: Bi }[];
  image: string; // public/images/brands/23–25.png (placeholder otomatis jika belum ada)
  /** Logo brand (SVG) — ganti file di public/images/logos/ dengan logo resmi bila tersedia. */
  logo: string;
  /** Teknologi & penggunaan: deskripsi umum, BUKAN spesifikasi resmi. Ganti setelah materi principal tersedia. */
  technology: Bi[];
  usage: Bi[];
  /** true = konten deskriptif brand masih placeholder generik, menunggu data resmi. */
  placeholder: boolean;
};

// TODO: Konten di bawah sengaja generik & tidak memuat klaim teknis / status distribusi.
// Ganti `about`, `advantages`, dan set `placeholder: false` setelah materi resmi brand tersedia.
const generic = (name: string): Brand["advantages"] => [
  { title: bi("Konsultasi Kebutuhan", "Needs Consultation"), text: bi(`Tim kami membantu memilih solusi ${name} yang sesuai ruangan, jarak pandang, dan anggaran.`, `Our team helps you choose the ${name} solution that fits your room, viewing distance, and budget.`) },
  { title: bi("Instalasi & Dukungan", "Installation & Support"), text: bi("Pendampingan dari survei lokasi, instalasi, hingga dukungan purna jual.", "Guidance from site survey and installation to after-sales support.") },
  { title: bi("Penawaran Jelas", "Clear Quotation"), text: bi("Penawaran rinci sesuai kebutuhan proyek Anda.", "A detailed quotation tailored to your project.") },
];

const technology: Bi[] = [
  bi("Layar LED indoor modular — ukuran dapat disesuaikan dengan dinding Anda", "Modular indoor LED display — sized to fit your wall"),
  bi("Pixel pitch dipilih sesuai jarak pandang ruangan", "Pixel pitch chosen to match the room's viewing distance"),
  bi("Kecerahan diatur untuk pencahayaan indoor", "Brightness tuned for indoor lighting"),
  bi("Konten dikelola dari perangkat pengontrol", "Content managed from a controller device"),
];
const usage: Bi[] = [
  bi("Lobby & area resepsionis", "Lobbies & reception areas"),
  bi("Ruang meeting & auditorium", "Meeting rooms & auditoriums"),
  bi("Retail, showroom & pusat perbelanjaan", "Retail, showrooms & shopping centers"),
  bi("Event, ballroom & ruang publik", "Events, ballrooms & public spaces"),
];

export const brands: Brand[] = [
  {
    id: "samsung", name: "Samsung", image: imagePath("brands", 23), logo: "/images/logos/samsung.svg", technology, usage, placeholder: true,
    tagline: bi("Solusi LED Display Samsung untuk ruang profesional", "Samsung LED Display solutions for professional spaces"),
    about: bi("Halaman ini menampilkan produk Samsung yang tersedia melalui Cahaya Mustika. Detail lini produk dan spesifikasi resmi sedang disiapkan.", "This page presents Samsung products available through Cahaya Mustika. Official product line details and specifications are being prepared."),
    advantages: generic("Samsung"),
  },
  {
    id: "lg", name: "LG", image: imagePath("brands", 24), logo: "/images/logos/lg.svg", technology, usage, placeholder: true,
    tagline: bi("Solusi LED Display LG untuk ruang profesional", "LG LED Display solutions for professional spaces"),
    about: bi("Halaman ini menampilkan produk LG yang tersedia melalui Cahaya Mustika. Detail lini produk dan spesifikasi resmi sedang disiapkan.", "This page presents LG products available through Cahaya Mustika. Official product line details and specifications are being prepared."),
    advantages: generic("LG"),
  },
  {
    id: "hivision", name: "Hikvision", image: imagePath("brands", 25), logo: "/images/logos/hikvision.png", technology, usage, placeholder: true,
    tagline: bi("Solusi LED Display Hikvision untuk ruang profesional", "Hikvision LED Display solutions for professional spaces"),
    about: bi("Halaman ini menampilkan produk Hikvision yang tersedia melalui Cahaya Mustika. Detail lini produk dan spesifikasi resmi sedang disiapkan.", "This page presents Hikvision products available through Cahaya Mustika. Official product line details and specifications are being prepared."),
    advantages: generic("Hikvision"),
  },
];

export const getBrand = (id: string) => brands.find((b) => b.id === id);
export const isBrandId = (v: string): v is BrandId => (BRAND_IDS as readonly string[]).includes(v);
