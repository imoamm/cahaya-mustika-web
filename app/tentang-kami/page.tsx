import type { Metadata } from "next";
import { Trust } from "@/components/sections/Trust";
import { Features } from "@/components/sections/Features";
import { Process } from "@/components/sections/Process";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Kenali Cahaya Mustika Internesia, distributor Videotron Indoor dan LED Display untuk kebutuhan bisnis Anda.",
};

export default function TentangKamiPage() {
  return (
    <>
      <div className="pt-20 sm:pt-24 lg:pt-28"><Trust h1 /></div>
      <Features />
      <Process />
      <CtaBanner />
    </>
  );
}
