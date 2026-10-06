import { imagePath } from "@/lib/images";
import { bi, type Bi } from "@/lib/i18n/types";

// Galeri "Inspirasi Instalasi": foto asli ada di public/images/proyek/, ilustrasi konsep di public/images/gallery/17–22.png.
// `kind: "ilustrasi"` menampilkan label kecil "Ilustrasi" supaya render konsep tidak dikira foto proyek.
// `wide` = tile lebar (2 kolom) pada layar ≥ lg → 3 baris × 3 kolom tanpa lubang (urutan: wide, n, n, wide, n, wide).
export type GalleryItem = { src: string; place: Bi; desc: Bi; alt: Bi; wide: boolean; kind: "foto" | "ilustrasi" };

export const gallery: GalleryItem[] = [
  { src: "/images/proyek/auditorium-panorama.jpg", place: bi("Auditorium"), desc: bi("Layar lebar untuk presentasi dan acara kampus", "Wide screen for presentations and campus events"), alt: bi("Layar LED indoor lebar di auditorium", "Wide indoor LED screen in an auditorium"), wide: true, kind: "foto" },
  { src: "/images/proyek/ruang-vertikal.jpg", place: bi("Ruang Display Vertikal", "Vertical Display Room"), desc: bi("Layar orientasi potret di dinding ruangan", "Portrait-orientation screen on a room wall"), alt: bi("Layar LED indoor orientasi vertikal di dinding", "Portrait-orientation indoor LED screen on a wall"), wide: false, kind: "foto" },
  { src: "/images/proyek/ruang-sidang.jpg", place: bi("Ruang Sidang", "Conference Room"), desc: bi("Tampilan tajam di balik meja pimpinan", "A sharp display behind the head table"), alt: bi("Layar LED indoor di ruang sidang", "Indoor LED screen in a conference room"), wide: false, kind: "foto" },
  { src: "/images/proyek/lobby-rumah-sakit.jpg", place: bi("Lobby Rumah Sakit", "Hospital Lobby"), desc: bi("Layar memanjang di area penerimaan", "A wide strip screen in the reception area"), alt: bi("Layar LED indoor memanjang di lobby rumah sakit", "Wide strip indoor LED screen in a hospital lobby"), wide: true, kind: "foto" },
  { src: imagePath("gallery", 22), place: bi("Tempat Ibadah", "Worship Place"), desc: bi("Informasi dan lirik untuk jamaah", "Information and lyrics for the congregation"), alt: bi("Ilustrasi videotron indoor di tempat ibadah", "Illustration of an indoor videotron in a worship place"), wide: false, kind: "ilustrasi" },
  { src: "/images/proyek/auditorium-logo.jpg", place: bi("Auditorium Kampus", "Campus Auditorium"), desc: bi("Warna solid dan merata dari baris belakang", "Solid, even color from the back rows"), alt: bi("Layar LED indoor biru di auditorium kampus", "Blue indoor LED screen in a campus auditorium"), wide: true, kind: "foto" },
];
