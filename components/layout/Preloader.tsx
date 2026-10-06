"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

// Layar loading: logo + tagline + bar progres.
//
// Muncul pada:
// 1. Pemuatan halaman pertama / refresh (sudah ada di HTML server,
//    jadi tampil sebelum JS siap).
// 2. Setiap pindah halaman: klik link internal, atau tombol back/forward.
//
// Hilang (fade) saat halaman tujuan sudah tampil (pathname berubah /
// window "load" untuk pemuatan awal), dengan durasi tampil minimum agar
// tidak berkedip, dan batas maksimum agar tidak pernah menggantung.

const MIN_FIRST_MS = 900;   // pemuatan pertama
const MIN_ROUTE_MS = 650;   // pindah halaman
const MAX_ROUTE_MS = 8000;  // pengaman bila navigasi gagal / tak berubah
const FADE_MS = 500;

export function Preloader() {
  const pathname = usePathname();

  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);
  const [boot, setBoot] = useState(true); // true sampai JS hidup (fallback CSS)
  const [route, setRoute] = useState(false); // true bila dipanggil karena pindah halaman

  const shownAt = useRef(0);
  const minMs = useRef(MIN_FIRST_MS);
  const lastPath = useRef(pathname);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const hide = useCallback(() => {
    clearTimers();
    const wait = Math.max(0, minMs.current - (performance.now() - shownAt.current));
    timers.current.push(
      window.setTimeout(() => {
        setHiding(true);
        document.documentElement.style.overflow = "";
        timers.current.push(window.setTimeout(() => setVisible(false), FADE_MS));
      }, wait),
    );
  }, [clearTimers]);

  const show = useCallback(() => {
    clearTimers();
    shownAt.current = performance.now();
    minMs.current = MIN_ROUTE_MS;
    setBoot(false);
    setRoute(true);
    setHiding(false);
    setVisible(true);
    document.documentElement.style.overflow = "hidden";
    // pengaman: jangan pernah menggantung
    timers.current.push(window.setTimeout(hide, MAX_ROUTE_MS));
  }, [clearTimers, hide]);

  // Pemuatan pertama
  useEffect(() => {
    shownAt.current = performance.now();
    document.documentElement.style.overflow = "hidden";
    setBoot(false); // JS sudah hidup → fallback CSS tak lagi dipakai

    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide, { once: true });

    return () => {
      window.removeEventListener("load", hide);
      clearTimers();
      document.documentElement.style.overflow = "";
    };
  }, [hide, clearTimers]);

  // Pindah halaman: pathname berubah → halaman tujuan siap → sembunyikan
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    hide();
  }, [pathname, hide]);

  // Deteksi awal navigasi: klik link internal & back/forward
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      if (a.target && a.target !== "_self") return;
      if (a.hasAttribute("download")) return;

      const href = a.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(a.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return; // link luar (mis. WhatsApp)
      if (url.pathname === window.location.pathname) return; // halaman sama / hash / query

      show();
    };

    const onPop = () => {
      if (window.location.pathname !== lastPath.current) show();
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPop);
    };
  }, [show]);

  if (!visible) return null;

  return (
    <div
      className="preloader"
      data-boot={boot || undefined}
      data-route={route || undefined}
      data-hiding={hiding || undefined}
      role="status"
      aria-live="polite"
      aria-label="Memuat halaman"
    >
      <div className="preloader-inner">
        {/* Dua versi logo; CSS memilih sesuai tema (terang: biru, gelap: putih transparan) */}
        <Image
          src="/images/logo-footer.png"
          alt="Cahaya Mustika Internesia"
          width={500}
          height={500}
          priority
          className="preloader-logo preloader-logo-light"
        />
        <Image
          src="/images/logo-footer-dark.png"
          alt=""
          aria-hidden="true"
          width={500}
          height={500}
          priority
          className="preloader-logo preloader-logo-dark"
        />
        <p className="preloader-tagline">Digital Signage &amp; Office Equipment</p>
        <span className="preloader-bar" aria-hidden="true" />
      </div>
    </div>
  );
}
