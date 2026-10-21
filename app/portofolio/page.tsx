import type { Metadata } from "next";
import { Customers } from "@/components/sections/Customers";

export const metadata: Metadata = {
  title: "Portofolio Instalasi Videotron Indoor",
  description:
    "Portofolio instalasi Videotron Indoor dan LED Display Cahaya Mustika Internesia untuk hotel, retail, showroom, perkantoran, dan institusi.",
  alternates: { canonical: "/portofolio" },
};

export default function PortofolioPage() {
  return <Customers first h1 />;
}
