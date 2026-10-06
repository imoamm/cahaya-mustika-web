import { bi, type Bi } from "@/lib/i18n/types";

// ⚙️ Ganti data perusahaan di sini — dipakai di seluruh website.
// Semua nilai bertanda PLACEHOLDER di bawah adalah contoh dan HARUS diganti dengan data asli sebelum publikasi.
export const SITE = {
  name: "Cahaya Mustika",
  tagline: bi("Distributor Videotron Indoor & LED Display", "Indoor Videotron & LED Display Distributor"),
  url: "https://cahayamustika.example", // PLACEHOLDER — ganti dengan domain asli
  description: bi(
    "Cahaya Mustika — distributor Videotron Indoor dan LED Display (Samsung, LG, Hikvision) untuk bisnis, retail, hotel, mall, event, showroom, dan berbagai kebutuhan profesional.",
    "Cahaya Mustika — Indoor Videotron and LED Display distributor (Samsung, LG, Hikvision) for business, retail, hotels, malls, events, showrooms, and other professional needs.",
  ),
  whatsapp: "6281228717177", // format internasional tanpa + / spasi
  waMessage: bi("Halo Cahaya Mustika, saya ingin konsultasi Videotron Indoor.", "Hello Cahaya Mustika, I would like a consultation about Indoor Videotron."),
  email: "sales@cahayamustika.example", // PLACEHOLDER
  phone: "+62 812-2871-7177",
  address: "Jl. Penjernihan II No.7, RT.11/RW.6, Bend. Hilir, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10210, Jakarta, Indonesia",
  addressLines: ["Jl. Penjernihan II No.7, RT.11/RW.6", "Bend. Hilir, Kecamatan Tanah Abang", "Kota Jakarta Pusat, DKI Jakarta 10210"],
  hours: null as Bi | null, // TODO: isi jam operasional asli, mis. bi("Senin–Jumat 09.00–17.00", "Mon–Fri 09:00–17:00")
  social: { instagram: "https://instagram.com/", tiktok: "https://tiktok.com/", youtube: "https://youtube.com/" },
};

const MAPS_QUERY = encodeURIComponent(SITE.address);
/** Tombol "Buka Google Maps" (tab baru). */
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
/** URL iframe peta tanpa API key. */
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;

export const waLink = (msg?: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg ?? SITE.waMessage.id)}`;
