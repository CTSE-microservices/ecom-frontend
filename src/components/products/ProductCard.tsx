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
        <div className="relative flex flex-col h-full bg-white rounded-xl overflow-hidden">

          {/* ── Image area ── */}
          <div className="relative aspect-square overflow-hidden bg-[#f5f5f5] shrink-0">
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
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all duration-200 ${
                  added
                    ? 'bg-green-500 text-white'
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
                className="p-2.5 rounded-lg bg-white/90 backdrop-blur-sm text-black hover:bg-white transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNew && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-black text-white text-[10px] font-black tracking-wider uppercase">
                  <Sparkles className="w-2.5 h-2.5" />
                  New
                </span>
              )}
              {product.isSale && product.originalPrice && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#FF3B30] text-white text-[10px] font-black tracking-wider uppercase">
                  <Tag className="w-2.5 h-2.5" />
                  -{discountPercent(product.originalPrice, product.price)}%
                </span>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={handleLike}
              aria-label="Wishlist"
              className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <Heart
                className={`w-3.5 h-3.5 transition-all ${liked ? 'fill-[#FF3B30] stroke-[#FF3B30]' : 'stroke-black'}`}
              />
            </button>
          </div>

          {/* ── Info ── */}
          <div className="p-4 flex flex-col gap-1.5 bg-white">
            <p className="text-[10px] font-black text-[#FF3B30] uppercase tracking-[0.15em]">
              {product.category}
            </p>
            <h3 className="text-sm font-bold text-black leading-snug line-clamp-2 group-hover:text-[#FF3B30] transition-colors duration-150">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-center justify-between mt-1 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-black">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              {product.isBestSeller && (
                <span className="text-[9px] font-black text-white bg-black px-1.5 py-0.5 rounded uppercase tracking-wider">
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
