import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { T } from "@/components/i18n/T";

export const metadata: Metadata = {
  title: "Kontak Kami",
  description: "Hubungi tim Cahaya Mustika, distributor Videotron Indoor & LED Display, untuk konsultasi produk.",
  alternates: { canonical: "/kontak" },
};

export default function KontakPage() {
  return (
    <>
      <div className="pt-20 sm:pt-24 lg:pt-28"><ContactSection h1 heading={<T k="contact.title" />} /></div>
    </>
  );
}
