'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Eye, Check, Sparkles, Tag } from 'lucide-react';
import { Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { formatPrice, discountPercent } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked((l) => !l);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/products/${product.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
      className="h-full"
    >
      <Link href={`/products/${product.id}`} className="block group h-full">
        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111] transition-all duration-300 group-hover:border-white/25">

          {/* ── Image area ── */}
          <div className="relative aspect-square shrink-0 overflow-hidden bg-[#171717]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

            {/* CTA overlay — slides from bottom */}
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3.5 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-3 text-[11px] font-black uppercase tracking-[0.12em] transition-all duration-200 ${
                  added
                    ? 'bg-white text-black'
                    : 'bg-black text-white hover:bg-[#FF3B30]'
                }`}
              >
                {added ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                {added ? 'Added!' : 'Add to Bag'}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleQuickView}
                aria-label="Quick view"
                className="rounded-xl bg-white/90 p-3 text-black transition-colors hover:bg-white"
              >
                <Eye className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNew && (
                <span className="flex items-center gap-1 rounded-full bg-black px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                  <Sparkles className="w-2.5 h-2.5" />
                  New
                </span>
              )}
              {product.isSale && product.originalPrice && (
                <span className="flex items-center gap-1 rounded-full bg-[#FF3B30] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                  <Tag className="w-2.5 h-2.5" />
                  -{discountPercent(product.originalPrice, product.price)}%
                </span>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={handleLike}
              aria-label="Wishlist"
              className="absolute right-3 top-3 rounded-full bg-white/80 p-2.5 opacity-60 backdrop-blur-sm transition-all hover:bg-white group-hover:opacity-100"
            >
              <Heart
                className={`w-3.5 h-3.5 transition-all ${liked ? 'fill-[#FF3B30] stroke-[#FF3B30]' : 'stroke-black'}`}
              />
            </button>
          </div>

          {/* ── Info ── */}
          <div className="flex flex-1 flex-col gap-2 bg-[#111] p-[18px]">
            <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#FF3B30]">
              {product.category}
            </p>
            <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-white transition-colors duration-150 group-hover:text-[#FF3B30]">
              {product.name}
            </h3>

            {/* Price */}
            <div className="mt-auto flex items-center justify-between border-t border-white/8 pt-3">
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-white">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-white/35 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              {product.isBestSeller && (
                <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-black">
                  Best Seller
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
