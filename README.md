# Cahaya Mustika Internesia — Website Videotron Indoor

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lucide

## Menjalankan
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Yang perlu diganti (semua di satu tempat)
| Apa | File |
|---|---|
| Nama, WhatsApp, email, alamat, statistik, domain | `lib/constants.ts` |
| Produk & spesifikasi (DUMMY) | `data/products.ts` |
| Testimoni (DUMMY) | `data/testimonials.ts` |
| FAQ | `data/faq.ts` |
| Foto aplikasi & galeri | `public/images/*` (nama file WebP berurutan, lihat di bawah) |
| Warna tema | `app/globals.css` (bagian THEME TOKENS) |


## Struktur website (distributor Videotron Indoor & LED Display)
| Route | Isi |
|---|---|
| `/` | Beranda (semua section lama + strip Brand) |
| `/produk` | Katalog + filter brand (Semua / Samsung / LG / Hikvision) |
| `/produk/samsung` · `/produk/lg` · `/produk/hivision` | Halaman brand (satu template: `components/brand/BrandPage.tsx`) |
| `/produk/[brand]/[slug]` | Detail produk ber-brand |
| `/produk/[slug]` | Detail produk TANPA brand (URL lama tetap hidup) |
| `/portofolio` · `/portofolio/[slug]` | Portofolio + detail |
| `/artikel` · `/artikel/[slug]` | Artikel + detail (SEO metadata + JSON-LD Article) |
| `/kontak` · `/tentang-kami` | Kontak Kami · Tentang Kami (dipertahankan) |

## Data (satu sumber, bukan hardcode di component)
`data/brands.ts` (ID brand: `samsung` \| `lg` \| `hivision`) · `data/products.ts` · `data/portfolio.ts` · `data/articles.ts` · `data/faq.ts` · `data/applications.ts`.
Produk 1–6 (P1.25–P3) belum diketahui brand-nya → sengaja tanpa `brand`. Isi `brand: "samsung"` dst. setelah data resmi ada.

## Bahasa ID/EN (satu tombol)
- `components/i18n/LanguageToggle.tsx` — satu tombol: klik ID → EN → ID, tanpa reload. Pilihan disimpan di localStorage.
- Teks UI: `lib/i18n/dict.ts` (TypeScript mewajibkan ID + EN untuk tiap key). Teks konten: objek `{ id, en }` via `bi("id", "en")` di file data.
- Server Component memakai `<T k="..." />` dan `<Tx v={bi} />`; Client Component memakai `useI18n()`.
- Catatan: `<title>`/meta SEO dirender server dalam Bahasa Indonesia.

## Data placeholder (WAJIB diganti sebelum publikasi)
Kontak (`lib/constants.ts`), statistik, testimoni, portofolio contoh (`sample: true`), konten brand (`placeholder: true`),
spesifikasi produk seri P1.25–P3. Penanda "Data contoh / akan diperbarui" bisa dimatikan lewat `SHOW_PLACEHOLDER_NOTES` di `lib/constants.ts`.
Gambar baru: `brands` 23–25, `portfolio` 26–31, `articles` 32–37 (lihat `lib/images.ts`, cek dengan `npm run images:check`).

## Sistem gambar WebP (sequential)
Semua path diatur di `lib/images.ts`. Cukup taruh file WebP dengan nama berikut — tidak perlu mengubah kode.
Sebelum file ada, `<Media />` menampilkan placeholder berukuran sama dengan container (tanpa broken image / ruang kosong).
Cek progres: `npm run images:check`.

| File | Isi |
|---|---|
| `public/images/products/1.webp` … `6.webp` | Indoor P1.25, P1.53, P1.86, P2, P2.5, P3 |
| `public/images/applications/7.webp` … `16.webp` | Mall, Hotel, Restaurant, Retail, Showroom, Lobby, Meeting Room, Event, Education, Worship Place |
| `public/images/gallery/17.webp` … `22.webp` | Lobby Hotel, Ruang Meeting, Pusat Perbelanjaan, Ballroom, Showroom, Tempat Ibadah |

Saran: ekspor PNG maksimal ±1600px di sisi terpanjang. Next.js otomatis menyajikannya sebagai AVIF/WebP ke browser.

## Animasi (Motion + GSAP hybrid)
- Motion (`components/animations/index.tsx`): reveal sederhana, hover, navbar, accordion, carousel — tidak berubah.
- GSAP + ScrollTrigger (`components/animations/gsap/`): animasi scroll-driven kompleks, **desktop-only** kecuali disebutkan lain:
  - `HeroScroll` — parallax multi-layer saat scroll keluar dari Hero (desktop penuh, tablet setengah, mobile tidak ada).
  - `DepthParallax` — dipakai di Applications & Gallery: parallax kedalaman antar tile (≥ lg), murni transform, tanpa tambahan tinggi section.
  - `ProcessGlow` — highlight (glow + scale) step aktif di Process saat scroll (≥ xl & tinggi layar ≥ 700px).
  - `CtaParallax` — parallax halus glow & grid background CTA (semua layar).
  - `ScrollRefresh` — memanggil `ScrollTrigger.refresh()` setelah font & halaman selesai dimuat (dipasang di `app/providers.tsx`).
- Semua breakpoint GSAP dibungkus `gsap.matchMedia()` dengan syarat `prefers-reduced-motion: no-preference` → otomatis nonaktif total jika user memilih reduced motion.
- Cleanup ScrollTrigger otomatis lewat `useGSAP` (dari `@gsap/react`), yang membungkus semuanya dalam `gsap.context()` dan me-revert saat component unmount — tidak ada instance yang menumpuk saat navigasi antar halaman.

> Catatan validasi: sandbox tempat perubahan ini dibuat tidak punya akses jaringan, jadi `npm install` / `npm run typecheck` / `npm run build` belum bisa dijalankan di sini. Jalankan ketiganya di mesin Anda sebelum deploy — `gsap` dan `@gsap/react` sudah ada di `package.json`.

## Menambah animasi ke section baru
```tsx
import { FadeUp, Stagger, StaggerItem, ImageReveal } from "@/components/animations";
<FadeUp>...</FadeUp>
```
Semua animasi ter-trigger ulang setiap kali elemen masuk viewport (tidak memakai `once`).
Aturan: elemen yang diamati tidak boleh di-clip / di-scale ke 0 pada state hidden (lihat komentar di `components/animations/index.tsx`).
Untuk item di dalam grid gunakan `<StaggerItem index={i}>`. Jarak atas section pertama di halaman: `<Section first>` (jangan pakai `pt-*` lewat className).

## Catatan pembaruan (redesign beranda)
- Kontak, WhatsApp, dan alamat dikelola di `lib/constants.ts` (`SITE`, `MAPS_URL`, `MAPS_EMBED_URL`).
- Foto proyek asli: `public/images/proyek/`. Gambar berlabel "Ilustrasi" adalah render konsep — ganti dengan foto asli bila ada.
- Logo brand: `public/images/logos/` (`hikvision.webp` sudah memakai logo Hikvision).
- Logo pelanggan & testimoni asli diisi di `data/customers.ts` (kosong = tidak tampil).
- Teknologi/penggunaan brand di `data/brands.ts` bersifat umum, bukan spesifikasi resmi.
