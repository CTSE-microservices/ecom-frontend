'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart();

  const tax      = totalPrice * 0.10;
  const shipping = totalPrice >= 50 ? 0 : 8.99;
  const total    = totalPrice + tax + shipping;

  /* ── Empty state ── */
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-[68px] flex flex-col items-center justify-center text-center px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm">
          <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-8">
            <ShoppingCart className="w-10 h-10 text-white/20" />
          </div>
          <h1 className="font-bebas text-5xl text-white tracking-wider mb-3">YOUR BAG IS EMPTY</h1>
          <p className="text-white/35 text-sm mb-10 font-medium">Looks like you haven&apos;t added anything yet.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-[#FF3B30] text-white text-sm font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-200"
          >
            <ShoppingBag className="w-4 h-4" />
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-[68px] pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

        {/* ─── Page header ──────────────────── */}
        <div className="border-b border-white/8 py-10">
          <Link href="/products" className="flex items-center gap-2 text-xs font-black text-white/30 uppercase tracking-wide hover:text-white transition-colors mb-5">
            <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
          </Link>
          <div className="flex items-end justify-between">
            <div>
              <p className="label mb-2">Review</p>
              <h1 className="font-bebas text-5xl lg:text-6xl text-white tracking-wider">
                YOUR BAG&nbsp;
                <span className="text-white/20">({totalItems})</span>
              </h1>
            </div>
            <button
              onClick={clearCart}
              className="text-xs font-black text-white/25 hover:text-[#FF3B30] uppercase tracking-wide transition-colors"
            >
              Clear Bag
            </button>
          </div>
        </div>

        {/* ─── Content grid ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">

          {/* Cart items */}
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex gap-5 p-5 rounded-2xl border border-white/8 hover:border-white/15 transition-colors bg-white/2"
                >
                  {/* Image */}
                  <Link href={`/products/${item.product.id}`} className="shrink-0">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#111]">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-[10px] font-black text-[#FF3B30] uppercase tracking-widest mb-1">{item.product.category}</p>
                        <Link href={`/products/${item.product.id}`}>
                          <h3 className="text-sm font-black text-white hover:text-[#FF3B30] transition-colors uppercase tracking-wide truncate">
                            {item.product.name}
                          </h3>
                        </Link>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="shrink-0 p-2 rounded-full text-white/25 hover:text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-all"
                        aria-label="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center border border-white/10 rounded-full overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-9 text-center text-sm text-white font-black">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-base font-black text-white">{formatPrice(item.product.price * item.quantity)}</p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-white/25 font-medium">{formatPrice(item.product.price)} each</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <div className="sticky top-24 rounded-2xl border border-white/10 overflow-hidden">
              {/* Header */}
              <div className="px-6 py-5 border-b border-white/8">
                <h2 className="font-bebas text-2xl text-white tracking-wider">ORDER SUMMARY</h2>
              </div>

              {/* Lines */}
              <div className="px-6 py-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-medium">Subtotal ({totalItems} items)</span>
                  <span className="text-white font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-medium">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-400 font-black uppercase text-xs tracking-wide">FREE</span>
                  ) : (
                    <span className="text-white font-bold">{formatPrice(shipping)}</span>
                  )}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-medium">Tax (10%)</span>
                  <span className="text-white font-bold">{formatPrice(tax)}</span>
                </div>
              </div>

              {/* Free shipping nudge */}
              {totalPrice < 50 && (
                <div className="mx-6 mb-4 p-3 rounded-xl bg-[#FF3B30]/10 border border-[#FF3B30]/20">
                  <p className="text-xs font-bold text-[#FF3B30]">
                    Add {formatPrice(50 - totalPrice)} more for FREE shipping!
                  </p>
                </div>
              )}

              {/* Total */}
              <div className="px-6 py-5 border-t border-white/8 flex items-center justify-between">
                <span className="font-black text-white uppercase tracking-wide text-sm">Total</span>
                <span className="font-bebas text-3xl text-white tracking-wider">{formatPrice(total)}</span>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6 space-y-3">
                <Link
                  href="/checkout"
                  className="flex items-center justify-center gap-2.5 w-full py-4 rounded-full bg-[#FF3B30] text-white font-black text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-200 group"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-center text-[11px] text-white/20 font-medium">🔒 Encrypted &amp; secure checkout</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
