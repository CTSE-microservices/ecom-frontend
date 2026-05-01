'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Eye, Check, Sparkles, Tag } from 'lucide-react';
import { UIProduct as Product } from '@/lib/productService';
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
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image || undefined,
      category: product.category || undefined,
    });
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
      <div className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-[#2a2a2a] bg-[#121212] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_18px_50px_rgba(0,0,0,0.45)]">

        {/* ── Image area ── */}
        <div className="relative aspect-square shrink-0 overflow-hidden bg-[#1a1a1a]">
          <Link href={`/products/${product.id}`} aria-label={`View ${product.name}`} className="absolute inset-0">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-white/10" />
              </div>
            )}
          </Link>

          {/* Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

          {/* CTA bar — slides from bottom on desktop, always visible on mobile */}
          <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-full border border-white/10 bg-black/75 px-2.5 py-2 backdrop-blur-md transition-transform duration-300 ease-out sm:translate-y-full sm:group-hover:translate-y-0">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleAddToCart}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-semibold tracking-[0.02em] transition-all duration-200 ${
                added ? 'bg-white text-black' : 'bg-black/60 text-white hover:bg-[#E63022]'
              }`}
            >
              {added ? <Check className="w-3 h-3" /> : <ShoppingBag className="w-3 h-3" />}
              {added ? 'Added' : 'Add to bag'}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleQuickView}
              aria-label="Quick view"
              className="rounded-full border border-white/15 bg-white/90 p-2 text-black transition-colors hover:bg-white"
            >
              <Eye className="w-3 h-3" />
            </motion.button>
          </div>

          {/* Badges */}
          <div className="pointer-events-none absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="flex items-center gap-1 rounded-full bg-black/80 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-white">
                <Sparkles className="w-2.5 h-2.5" /> New
              </span>
            )}
            {product.isSale && product.originalPrice && (
              <span className="flex items-center gap-1 rounded-full bg-[#E63022] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-white">
                <Tag className="w-2.5 h-2.5" />
                -{discountPercent(product.originalPrice, product.price)}%
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleLike}
            aria-label="Wishlist"
            className="absolute right-3 top-3 rounded-full bg-white/85 p-2 opacity-0 backdrop-blur-sm transition-all hover:bg-white group-hover:opacity-100"
          >
            <Heart className={`w-3.5 h-3.5 transition-all ${liked ? 'fill-[#E63022] stroke-[#E63022]' : 'stroke-black'}`} />
          </button>
        </div>

        {/* ── Info ── */}
        <div className="flex flex-1 flex-col gap-1.5 bg-[#111] px-4 py-4">
          {product.category && (
            <p className="text-[10px] font-semibold uppercase tracking-[0.05em] text-[#E63022]">
              {product.category}
            </p>
          )}
          <Link href={`/products/${product.id}`} className="block flex-1">
            <h3 className="line-clamp-2 text-[14px] font-semibold leading-snug text-white transition-colors duration-150 hover:text-[#E63022]">
              {product.name}
            </h3>
          </Link>

          {/* Price */}
          <div className="mt-2 flex items-center justify-between border-t border-white/8 pt-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">
                {product.price > 0 ? formatPrice(product.price) : '—'}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-white/30 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            {product.isBestSeller && (
              <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-black">
                Best Seller
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
