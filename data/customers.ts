import type { Bi } from "@/lib/i18n/types";

// Logo pelanggan: isi array ini dengan pelanggan ASLI (izin pemakaian logo sudah didapat), contoh:
//   { name: "Nama Perusahaan", logo: "/images/customers/nama-perusahaan.webp" }
// Letakkan file logo di public/images/customers/. Selama array kosong, baris logo tidak ditampilkan
// (tidak ada nama pelanggan fiktif).
export const customers: { name: string; logo: string }[] = [];

// Testimoni: isi dengan testimoni asli. Selama kosong, bagian testimoni tidak ditampilkan.
export const testimonials: { quote: Bi; name: string; role: Bi; company: string }[] = [];
