"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/animations";
import { faqs } from "@/data/faq";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { bi } from "@/lib/i18n/types";

export function Faq() {
  const { tx } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq">
      <SectionHeading title={tx(bi("Pertanyaan yang Sering Diajukan", "Frequently Asked Questions"))} align="center" />
      <Stagger className="mx-auto max-w-3xl space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <StaggerItem key={f.q.id} index={i}>
              <div className="card rounded-2xl">
                <h3 className="text-base font-medium">
                  <button id={`faq-b-${i}`} aria-expanded={isOpen} aria-controls={`faq-p-${i}`} onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-5">
                    <span className="min-w-0">{tx(f.q)}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="shrink-0 text-brand2"><Plus size={18} /></motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`faq-p-${i}`} role="region" aria-labelledby={`faq-b-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="px-4 pb-4 text-sm leading-relaxed text-muted sm:px-5 sm:pb-5">{tx(f.a)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
