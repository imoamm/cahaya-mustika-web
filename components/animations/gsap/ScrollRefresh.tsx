"use client";
import { useEffect } from "react";
import { ScrollTrigger } from "./register";

// Font (next/font swap) dan gambar bisa mengubah tinggi layout setelah ScrollTrigger dihitung.
// Refresh sekali setelah font siap / halaman load supaya posisi start-end tetap akurat.
export function ScrollRefresh() {
  useEffect(() => {
    let alive = true;
    const refresh = () => { if (alive) ScrollTrigger.refresh(); };
    document.fonts?.ready?.then(refresh);
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 1200);
    return () => { alive = false; window.removeEventListener("load", refresh); window.clearTimeout(t); };
  }, []);
  return null;
}
