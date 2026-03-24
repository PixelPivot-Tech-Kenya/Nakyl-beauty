"use client"

import Image from "next/image";
import { useCartStore } from "@/app/store/cartStore";

export type Badge = "BESTSELLER" | "NEW" | "SALE" | "NATURAL";

export interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  image: string;
  imageBg?: string;
  badge?: Badge;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  slug: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const BADGE_CLASS: Record<Badge, string> = {
  BESTSELLER: "badge-best",
  NEW:        "badge-new",
  SALE:       "badge-sale",
  NATURAL:    "badge-natural",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 12 12"
          className="w-3 h-3"
          fill={i < Math.round(rating) ? "var(--gold)" : "none"}
          stroke="var(--gold)"
          strokeWidth="1"
        >
          <polygon points="6,1 7.5,4.5 11,4.8 8.5,7.2 9.2,11 6,9.2 2.8,11 3.5,7.2 1,4.8 4.5,4.5" />
        </svg>
      ))}
    </span>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function ProductCard({
  id,
  name,
  category,
  subcategory,
  image,
  imageBg = "#F7D6E0",
  badge,
  rating,
  reviewCount,
  price,
  originalPrice,
  slug,
}: ProductCardProps) {
  const { addItem, openCart } = useCartStore()

  function handleAddToCart() {
    addItem({ id, name, category, price, original_price: originalPrice, image_url: image, image_bg: imageBg, slug })
    openCart()
  }

  return (
    <article className="card flex flex-col p-4 gap-4 w-55 hover:shadow-md transition-shadow duration-300">
      {/* Image block */}
      <div className="relative rounded-xl overflow-hidden" style={{ background: imageBg, height: 200 }}>
        {badge && (
          <span className={`absolute top-3 left-3 z-10 ${BADGE_CLASS[badge]} text-[9px] tracking-widest uppercase font-medium px-2 py-0.5 rounded-full`}>
            {badge}
          </span>
        )}
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
        />
      </div>

      {/* Info block */}
      <div className="flex flex-col gap-2">
        <p className="eyebrow">{category} &middot; {subcategory}</p>

        <h3 className="heading-display text-[1.15rem] leading-tight text-foreground">
          {name}
        </h3>

        <div className="flex items-center gap-1.5">
          <StarRating rating={rating} />
          <span className="text-[11px] text-text-light">({reviewCount})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-primary font-semibold text-[0.95rem]">
            KES {price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-text-light text-[0.8rem] line-through">
              KES {originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <button onClick={handleAddToCart} className="btn-outline w-full mt-1 cursor-pointer">
          Add to Bag
        </button>
      </div>
    </article>
  );
}
