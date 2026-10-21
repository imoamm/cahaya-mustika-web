// Cek file WebP mana yang sudah / belum ada:  npm run images:check
import { existsSync } from "node:fs";
import { join } from "node:path";

const groups = {
  products: [1, 6, ["Indoor P1.25", "Indoor P1.53", "Indoor P1.86", "Indoor P2", "Indoor P2.5", "Indoor P3"]],
  applications: [7, 16, ["Mall", "Hotel", "Restaurant", "Retail", "Showroom", "Lobby", "Meeting Room", "Event", "Education", "Worship Place"]],
  gallery: [17, 22, ["Lobby (Solusi)", "(tidak dipakai)", "Retail (Solusi)", "Event (Solusi)", "Showroom (Solusi)", "Tempat Ibadah (Galeri)"]],
  brands: [23, 25, ["Samsung", "LG", "HikVision"]],
  portfolio: [26, 31, ["Contoh Lobby Hotel", "Contoh Showroom", "Contoh Ruang Meeting", "Contoh Pusat Perbelanjaan", "Contoh Ballroom", "Contoh Tempat Ibadah"]],
  articles: [32, 37, ["Apa itu Videotron Indoor", "Cara memilih pixel pitch", "Kecerahan & refresh rate", "Checklist pembelian", "(cadangan)", "(cadangan)"]],
};
let missing = 0;
for (const [group, [from, to, names]] of Object.entries(groups)) {
  console.log(`\npublic/images/${group}/`);
  for (let n = from; n <= to; n++) {
    const ok = existsSync(join("public", "images", group, `${n}.webp`));
    if (!ok) missing++;
    console.log(`  ${ok ? "✓" : "✗"} ${n}.webp  ${names[n - from]}`);
  }
}
console.log(`\n${37 - missing}/37 gambar tersedia${missing ? ` — ${missing} masih memakai placeholder.` : "."}`);
