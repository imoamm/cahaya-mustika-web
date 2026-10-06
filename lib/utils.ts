export const cn = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

// Padding horizontal halaman yang konsisten (320px → desktop). Dipakai Section, Navbar, Hero, Footer, CTA.
export const PAGE_PX = "px-4 min-[400px]:px-5 sm:px-6 lg:px-8";
