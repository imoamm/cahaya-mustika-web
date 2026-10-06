"use client";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

// Grid dengan animasi filter halus (tanpa reload). Item masuk saat scroll (whileInView) dan keluar/masuk saat filter berubah.
// Hanya opacity + transform → ringan. `layout` membuat item lain bergeser mulus saat ada yang hilang.
export function FilterGrid<T>({ items, getKey, render, className, empty }: { items: T[]; getKey: (i: T) => string; render: (i: T, index: number) => ReactNode; className: string; empty?: ReactNode }) {
  return (
    <>
      <motion.div layout className={className}>
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((it, i) => (
            <motion.div
              key={getKey(it)}
              layout
              initial="hidden"
              whileInView="visible"
              exit="out"
              viewport={{ amount: 0.12 }}
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.25 } },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] } },
                out: { opacity: 0, scale: 0.96, transition: { duration: 0.18 } },
              }}
            >
              {render(it, i)}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {items.length === 0 && empty}
    </>
  );
}
