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
        <Image
          src="/images/logo-cahaya-mustika.png"
          alt="Cahaya Mustika"
          fill
          priority
          sizes="185px"
          className="object-contain object-left"
        />
      </div>
    </Link>
  );
}