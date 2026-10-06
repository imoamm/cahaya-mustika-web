/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    // Route brand memakai id "hivision" (sudah ada di sitemap/link lama); ejaan "hikvision" diarahkan ke sana.
    return [{ source: "/produk/hikvision", destination: "/produk/hivision", permanent: true }];
  },
};
export default nextConfig;
