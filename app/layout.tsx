import type { Metadata, Viewport } from "next";
import { Manrope, Poppins } from "next/font/google";

import "./globals.css";

import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Preloader } from "@/components/layout/Preloader";
import { SITE } from "@/lib/constants";
import { T } from "@/components/i18n/T";


/* =========================================================
   FONTS
   ========================================================= */

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});


/* =========================================================
   METADATA
   ========================================================= */

const TITLE =
  "Cahaya Mustika Internesia | Distributor Videotron Indoor & LED Display";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),

  title: {
    default: TITLE,
    template: `%s | ${SITE.name}`,
  },

  description: SITE.description.id,

  icons: { icon: [{ url: "/images/icon.webp", type: "image/webp" }] },

  openGraph: {
    title: TITLE,
    description: SITE.description.id,
    siteName: SITE.name,
    locale: "id_ID",
    type: "website",
  },
};


/* =========================================================
   VIEWPORT
   ========================================================= */

export const viewport: Viewport = {
  themeColor: "#F5F8FD",
  width: "device-width",
  initialScale: 1,
};


/* =========================================================
   THEME INITIALIZER
   =========================================================
   
   Theme:
   - light = default
   - dark  = pilihan user

   Tidak ada lagi "default".
*/

const themeScript = `
(function () {
  try {
    var theme = localStorage.getItem("theme");

    if (theme !== "dark" && theme !== "light") {
      theme = "light";
    }

    document.documentElement.setAttribute(
      "data-theme",
      theme
    );
  } catch (e) {
    document.documentElement.setAttribute(
      "data-theme",
      "light"
    );
  }
})();
`;


/* =========================================================
   ROOT LAYOUT
   ========================================================= */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      data-theme="light"
      suppressHydrationWarning
      className={`${poppins.variable} ${manrope.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
      </head>

      <body>
        <Providers>
          <Preloader />

          <a
            href="#main"
            className="
              sr-only
              focus:not-sr-only
              focus:fixed
              focus:left-4
              focus:top-4
              focus:z-[70]
              focus:rounded-full
              focus:bg-brand
              focus:px-4
              focus:py-2
              focus:text-white
            "
          >
            <T k="a11y.skip" />
          </a>

          <Navbar />

          <main id="main">
            {children}
          </main>

          <Footer />

          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}