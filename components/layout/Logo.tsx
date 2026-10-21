
import Image from "next/image";
import Link from "next/link";

import { SITE } from "@/lib/constants";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label={SITE.name}
      className="flex shrink-0 items-center"
    >
      <div className="relative h-11 w-[185px]">
        {/* Logo biru untuk mode terang */}
        <Image
          src="/images/logo-cahaya-mustika.webp"
          alt="Cahaya Mustika Internesia"
          fill
          priority
          sizes="185px"
          className="theme-logo-light object-contain object-left"
        />

        {/* Logo putih untuk mode gelap */}
        <Image
          src="/images/putih-logo.webp"
          alt="Cahaya Mustika Internesia"
          fill
          priority
          sizes="185px"
          className="theme-logo-dark object-contain object-left"
        />
      </div>
    </Link>
  );
}
