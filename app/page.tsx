import { Hero } from "@/components/sections/Hero";
import { Sectors } from "@/components/sections/Sectors";
import { Challenges } from "@/components/sections/Challenges";
import { Brands } from "@/components/sections/Brands";
import { Products } from "@/components/sections/Products";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";

import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      {/* Latar section bergantian: putih → biru muda tipis → putih → ... (token --band-a / --band-b di globals.css) */}
      <div className="band-a"><Challenges /></div>
      <div className="band-b"><Sectors /></div>
      <div className="band-a"><Brands /></div>
      <div className="band-b"><Products /></div>
      <div className="band-a"><Faq /></div>
      <div className="band-b"><CtaBanner /></div>
    </>
  );
}