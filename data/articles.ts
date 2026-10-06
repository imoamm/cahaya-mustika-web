import { bi, type Bi } from "@/lib/i18n/types";
import { imagePath } from "@/lib/images";

// Artikel edukasi umum (tidak memuat klaim spesifikasi brand tertentu).
// Tambah artikel baru cukup dengan menambah objek di `articles` — halaman list, detail, sitemap & SEO otomatis ikut.
// `author` memakai nama perusahaan (tidak mengarang nama penulis). TODO: sesuaikan tanggal/penulis bila perlu.
// Semua artikel satu kumpulan (tanpa kategori), diurutkan dari yang terbaru.
// Gambar: public/images/articles/32.png – 37.png (placeholder otomatis jika belum ada).
export type ArticleBlock =
  | { t: "p"; text: Bi }
  | { t: "h2"; text: Bi }
  | { t: "ul"; items: Bi[] };

export type Article = {
  slug: string;
  title: Bi;
  excerpt: Bi;
  content: ArticleBlock[];
  date: string; // ISO yyyy-mm-dd
  author: string;
  image: string;
  featured: boolean;
};

const p = (id: string, en: string): ArticleBlock => ({ t: "p", text: bi(id, en) });
const h = (id: string, en: string): ArticleBlock => ({ t: "h2", text: bi(id, en) });
const ul = (...items: [string, string][]): ArticleBlock => ({ t: "ul", items: items.map(([id, en]) => bi(id, en)) });
const AUTHOR = "Cahaya Mustika";

export const articles: Article[] = [
  {
    slug: "apa-itu-videotron-indoor", date: "2026-09-28", author: AUTHOR, featured: true, image: imagePath("articles", 32),
    title: bi("Apa Itu Videotron Indoor dan Kapan Anda Membutuhkannya?", "What Is an Indoor Videotron and When Do You Need One?"),
    excerpt: bi("Kenali cara kerja layar LED indoor modular, keunggulannya dibanding layar konvensional, dan jenis ruangan yang cocok memakainya.", "Learn how modular indoor LED displays work, how they compare with conventional screens, and which spaces suit them."),
    content: [
      p("Videotron indoor adalah layar LED yang dirancang khusus untuk dipasang di dalam ruangan. Layar ini tersusun dari modul dan cabinet LED yang digabung menjadi satu bidang tampilan dengan ukuran dan rasio yang bisa disesuaikan.", "An indoor videotron is an LED display designed specifically for installation indoors. It is built from LED modules and cabinets joined into one continuous surface whose size and aspect ratio can be customised."),
      h("Mengapa modular itu penting", "Why modular matters"),
      p("Karena tersusun dari cabinet, layar dapat dibuat mengikuti dinding atau ruangan Anda, tanpa bingkai (bezel) tebal di antara panel. Perawatan pun lebih mudah karena modul dapat dilepas dan diganti satu per satu.", "Because it is assembled from cabinets, the screen can follow the shape of your wall or room without thick bezels between panels. Maintenance is also easier since modules can be removed and replaced individually."),
      h("Ruangan yang umum memakainya", "Spaces that commonly use them"),
      ul(["Lobby dan area resepsionis", "Lobbies and reception areas"], ["Mall, retail, dan showroom", "Malls, retail, and showrooms"], ["Ruang meeting dan control room", "Meeting rooms and control rooms"], ["Ballroom, restoran, dan panggung indoor", "Ballrooms, restaurants, and indoor stages"], ["Aula, gereja, masjid, dan institusi pendidikan", "Halls, churches, mosques, and educational institutions"]),
      h("Langkah awal", "Where to start"),
      p("Sebelum memilih produk, siapkan tiga informasi: ukuran dinding atau area pemasangan, jarak pandang audiens, dan jenis konten yang akan ditampilkan. Dengan itu, tim sales dapat merekomendasikan pixel pitch dan ukuran layar yang tepat.", "Before choosing a product, prepare three pieces of information: the size of the wall or installation area, the audience viewing distance, and the type of content to display. With those, a sales team can recommend the right pixel pitch and screen size."),
    ],
  },
  {
    slug: "cara-memilih-pixel-pitch", date: "2026-09-26", author: AUTHOR, featured: false, image: imagePath("articles", 33),
    title: bi("Cara Memilih Pixel Pitch yang Tepat untuk Videotron Indoor", "How to Choose the Right Pixel Pitch for an Indoor Videotron"),
    excerpt: bi("Pixel pitch menentukan ketajaman gambar dan jarak pandang ideal. Pahami cara membacanya sebelum membeli.", "Pixel pitch determines image sharpness and ideal viewing distance. Learn how to read it before you buy."),
    content: [
      p("Angka setelah huruf P pada Videotron, misalnya P1.25 atau P2.5, adalah pixel pitch: jarak antar titik LED dalam milimeter. Semakin kecil angkanya, semakin rapat titik LED dan semakin detail gambarnya.", "The number after the P in a videotron, such as P1.25 or P2.5, is the pixel pitch: the distance between LED dots in millimetres. The smaller the number, the denser the LEDs and the more detailed the image."),
      h("Patokan jarak pandang", "A viewing-distance rule of thumb"),
      p("Sebagai patokan praktis, jarak pandang minimum dalam meter kurang lebih sama dengan angka pixel pitch dalam milimeter. Contohnya, P2.5 nyaman dilihat dari sekitar 2,5 meter atau lebih. Ini hanya perkiraan; kondisi ruangan dan jenis konten ikut berpengaruh.", "As a practical guideline, the minimum viewing distance in metres is roughly equal to the pixel pitch in millimetres. For example, P2.5 is comfortable from around 2.5 metres or more. This is only an estimate; room conditions and content type also matter."),
      h("Pilih berdasarkan kebutuhan", "Choose by need"),
      ul(["Dilihat dari dekat (meeting room, lobby, control room): pilih pixel pitch kecil.", "Viewed up close (meeting rooms, lobbies, control rooms): choose a smaller pixel pitch."], ["Ruang luas dengan jarak pandang jauh (aula, ballroom): pixel pitch lebih besar sudah cukup dan lebih hemat.", "Large spaces with long viewing distances (halls, ballrooms): a larger pixel pitch is enough and more economical."]),
      p("Pixel pitch yang lebih kecil umumnya berarti biaya lebih tinggi untuk luas layar yang sama, jadi sesuaikan dengan jarak pandang sebenarnya agar anggaran tidak terbuang.", "A smaller pixel pitch generally means a higher cost for the same screen area, so match it to the real viewing distance to avoid overspending."),
    ],
  },
  {
    slug: "kecerahan-dan-refresh-rate-led", date: "2026-09-29", author: AUTHOR, featured: false, image: imagePath("articles", 34),
    title: bi("Kecerahan (Nits) dan Refresh Rate pada Layar LED: Apa Artinya?", "Brightness (Nits) and Refresh Rate on LED Displays: What Do They Mean?"),
    excerpt: bi("Dua angka yang sering muncul di spesifikasi LED display, dan bagaimana keduanya memengaruhi tampilan di ruangan Anda.", "Two numbers that often appear in LED display specifications, and how they affect what you see in your space."),
    content: [
      h("Kecerahan (brightness)", "Brightness"),
      p("Kecerahan diukur dalam nits. Ruangan dengan banyak cahaya alami atau lampu terang membutuhkan layar yang lebih terang agar gambar tetap jelas, sedangkan ruangan yang lebih redup tidak perlu kecerahan setinggi itu, dan layar yang terlalu terang justru melelahkan mata.", "Brightness is measured in nits. Rooms with plenty of natural or bright artificial light need a brighter screen to keep the image clear, while dimmer rooms do not need as much, and an overly bright screen can tire the eyes."),
      h("Refresh rate", "Refresh rate"),
      p("Refresh rate, dalam hertz (Hz), menunjukkan seberapa sering gambar diperbarui per detik. Nilai yang tinggi membuat tampilan video lebih halus dan membantu mengurangi kedip (flicker) ketika layar direkam kamera, penting untuk studio, siaran, dan acara yang didokumentasikan.", "Refresh rate, in hertz (Hz), shows how often the image is updated each second. A higher value makes video look smoother and helps reduce flicker when the screen is filmed by a camera, which matters for studios, broadcasts, and documented events."),
      h("Cara membaca spesifikasi", "Reading the specification sheet"),
      p("Bandingkan angka ini dengan kondisi ruangan dan penggunaan sebenarnya, bukan hanya mencari angka tertinggi. Minta data resmi dari sales untuk produk yang Anda pertimbangkan.", "Compare these figures with your actual room conditions and usage rather than simply looking for the highest number. Ask sales for the official data of the product you are considering."),
    ],
  },
  {
    slug: "checklist-sebelum-membeli-videotron-indoor", date: "2026-09-29", author: AUTHOR, featured: false, image: imagePath("articles", 35),
    title: bi("Checklist Sebelum Membeli Videotron Indoor", "A Checklist Before Buying an Indoor Videotron"),
    excerpt: bi("Enam hal yang perlu disiapkan agar proses konsultasi, penawaran, dan instalasi berjalan lancar.", "Six things to prepare so consultation, quotation, and installation go smoothly."),
    content: [
      p("Persiapan yang baik mempercepat penawaran dan mengurangi revisi di tengah proyek. Berikut hal yang sebaiknya Anda siapkan:", "Good preparation speeds up quotations and reduces mid-project revisions. Here is what to prepare:"),
      ul(
        ["Ukuran area pemasangan (lebar × tinggi) beserta foto lokasi.", "The installation area size (width × height) along with photos of the site."],
        ["Jarak pandang terdekat dan terjauh dari audiens.", "The nearest and farthest audience viewing distances."],
        ["Jenis konten: teks, iklan, video, atau presentasi.", "Content type: text, advertising, video, or presentations."],
        ["Kondisi pencahayaan ruangan.", "Room lighting conditions."],
        ["Ketersediaan daya listrik dan ventilasi di area pemasangan.", "Availability of electrical power and ventilation at the installation area."],
        ["Kebutuhan layanan: instalasi, perawatan, dan garansi.", "Service needs: installation, maintenance, and warranty."],
      ),
      p("Belum punya semua informasi ini? Tidak masalah. Ceritakan yang Anda ketahui dan tim kami akan membantu melengkapinya lewat konsultasi.", "Do not have all of this yet? No problem. Share what you know and our team will help fill in the rest during consultation."),
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
