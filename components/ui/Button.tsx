import Link from "next/link";
import type { ReactNode } from "react";

type Props = { href: string; variant?: "primary" | "ghost"; external?: boolean; className?: string; children: ReactNode };
export function Button({ href, variant = "primary", external, className = "", children }: Props) {
  const cls = `btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`;
  return external ? (
    <a className={cls} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
  ) : (
    <Link className={cls} href={href}>{children}</Link>
  );
}
