"use client";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n/LanguageProvider";
import type { Text } from "@/lib/i18n/types";

// Menampilkan gambar dari /public dengan aman.
//
// • Parent WAJIB `relative` dan punya ukuran (aspect-ratio / tinggi) — Media mengisi 100% parent.
// • Selama gambar dimuat, atau jika file tidak ada / gagal dimuat, yang tampil adalah placeholder
//   dengan ukuran PERSIS sama dengan container → tidak ada broken image, blank space, maupun layout shift.
// • Gambar memudar masuk setelah benar-benar selesai dimuat.
type Status = "loading" | "loaded" | "error";
type Props = {
  src?: string;
  alt: Text;          // string biasa atau { id, en } — otomatis mengikuti bahasa aktif
  label?: Text;       // teks utama placeholder (default: alt)
  sublabel?: Text;    // teks kecil placeholder
  className?: string;
  sizes?: string;
  priority?: boolean;
};

const DEFAULT_SIZES = "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw";

export function Media(props: Props) {
  // key = src → state di-reset otomatis jika src berubah (mis. lightbox berpindah foto).
  return <MediaInner key={props.src ?? "none"} {...props} />;
}

function MediaInner({ src, alt: altRaw, label: labelRaw, sublabel: subRaw, className = "", sizes = DEFAULT_SIZES, priority }: Props) {
  const { tx } = useI18n();
  const alt = tx(altRaw), label = labelRaw ? tx(labelRaw) : undefined, sublabel = subRaw ? tx(subRaw) : undefined;
  const imgRef = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<Status>(src ? "loading" : "error");

  // Event load/error bisa terjadi SEBELUM hydration (React tidak me-replay-nya) → cek manual saat mount.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete) setStatus(el.naturalWidth > 0 ? "loaded" : "error");
  }, []);

  return (
    <>
      {status !== "loaded" && (
        <Fallback alt={alt} label={label} sublabel={sublabel} className={className} decorative={status === "loading"} />
      )}
      {src && status !== "error" && (
        <Image
          ref={imgRef}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`object-cover ${status === "loaded" ? "opacity-100" : "opacity-0"} ${className}`}
        />
      )}
    </>
  );
}

function Fallback({ alt, label, sublabel, className, decorative }: { alt: string; label?: string; sublabel?: string; className: string; decorative: boolean }) {
  return (
    <div
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": alt })}
      className={`media-fallback ${className}`}
    >
      <span className="media-fallback__icon"><ImageIcon aria-hidden /></span>
      <span className="media-fallback__label">{label ?? alt}</span>
      {sublabel && <span className="media-fallback__sub">{sublabel}</span>}
    </div>
  );
}
