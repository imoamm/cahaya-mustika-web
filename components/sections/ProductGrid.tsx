"use client";
import { Stagger, StaggerItem } from "@/components/animations";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/data/products";

export function ProductGrid({ items, level = 3 }: { items: Product[]; level?: 2 | 3 | 4 }) {
  return (
    <Stagger className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {items.map((p, i) => (
        <StaggerItem key={p.slug} index={i} y={20} scale={0.98}><ProductCard p={p} level={level} /></StaggerItem>
      ))}
    </Stagger>
  );
}
