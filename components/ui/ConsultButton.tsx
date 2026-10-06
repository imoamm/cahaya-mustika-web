import { WaButton } from "./WaButton";
import { T } from "@/components/i18n/T";
import type { Text } from "@/lib/i18n/types";

// CTA utama yang konsisten di seluruh website: "Konsultasi Sekarang" / "Consult Now" → WhatsApp.
export function ConsultButton({ message, variant = "primary", className }: { message?: Text; variant?: "primary" | "ghost"; className?: string }) {
  return <WaButton message={message} variant={variant} className={className}><T k="cta.consult" /></WaButton>;
}
