// Sistem bahasa ringan (tanpa library): semua teks dwibahasa disimpan sebagai { id, en }.
export type Lang = "id" | "en";
export const LANGS: readonly Lang[] = ["id", "en"];
export const DEFAULT_LANG: Lang = "id";
export const LANG_STORAGE_KEY = "lang";
/** Kunci bahasa: selama bukan null, website selalu tampil dalam bahasa ini (pilihan lama di localStorage diabaikan). Set ke null untuk mengaktifkan lagi pilihan ID/EN. */
export const FORCE_LANG: Lang | null = "id";

/** Teks dwibahasa. */
export type Bi = { id: string; en: string };
/** Teks yang boleh berupa string biasa (tidak diterjemahkan, mis. nama produk) atau Bi. */
export type Text = string | Bi;

/** Helper pendek untuk membuat Bi. Jika EN dihilangkan, dipakai teks yang sama (nama, angka, dsb). */
export const bi = (id: string, en: string = id): Bi => ({ id, en });
export const pick = (v: Text | undefined | null, lang: Lang): string => (v == null ? "" : typeof v === "string" ? v : v[lang]);
