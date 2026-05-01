'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateItem, totalPrice, totalItems, clearCart } = useCart();

  const tax      = totalPrice * 0.10;
  const shipping = totalPrice >= 50 ? 0 : 8.99;
  const total    = totalPrice + tax + shipping;

  /* ── Empty state ── */
  if (items.length === 0) {
    return (
      <div className="page-shell flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm">
          <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-8">
            <ShoppingCart className="w-10 h-10 text-white/20" />
          </div>
          <h1 className="font-bebas text-5xl text-white tracking-[0.02em] mb-3">Your bag is empty</h1>
          <p className="text-white/45 text-sm mb-10 font-medium">Looks like you haven&apos;t added anything yet.</p>
          <Link
            href="/products"
            className="btn-primary px-10 py-4"
          >
            <ShoppingBag className="w-4 h-4" />
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-shell pb-20">
      <div className="container-shell">

        {/* ─── Page header ──────────────────── */}
        <div className="border-b border-white/8 py-8 lg:py-10">
          <Link href="/products" className="flex items-center gap-2 text-xs font-semibold text-white/35 uppercase tracking-[0.04em] hover:text-white transition-colors mb-5">
            <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
          </Link>
          <div className="flex items-end justify-between">
            <div>
              <p className="label mb-2">Review</p>
              <h1 className="font-bebas text-5xl leading-none lg:text-6xl text-white tracking-[0.02em]">
                Your bag&nbsp;
                <span className="text-white/20">({totalItems})</span>
              </h1>
            </div>
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-white/30 hover:text-[#E63022] uppercase tracking-[0.04em] transition-colors"
            >
              Clear Bag
            </button>
          </div>
        </div>

        {/* ─── Content grid ─────────────────── */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)] lg:gap-10">

          {/* Cart items */}
          <div className="space-y-3">
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="panel flex gap-5 rounded-[4px] p-5 transition-colors hover:border-white/20"
                >
                  {/* Image */}
                  <Link href={`/products/${item.productId}`} className="shrink-0">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#111]">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ShoppingBag className="w-8 h-8 text-white/15" />
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] font-semibold text-[#E63022] uppercase tracking-[0.04em] mb-1">{item.category ?? 'Item'}</p>
                        <Link href={`/products/${item.productId}`}>
                          <h3 className="truncate text-sm font-semibold tracking-[0.02em] text-white transition-colors hover:text-[#E63022]">
                            {item.name}
                          </h3>
                        </Link>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="shrink-0 p-2 rounded-full text-white/25 hover:text-[#E63022] hover:bg-[#E63022]/10 transition-all"
                        aria-label="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center border border-white/10 rounded-full overflow-hidden">
                        <button
                          onClick={() => updateItem(item.id, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-9 text-center text-sm text-white font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateItem(item.id, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-base font-semibold text-white">{formatPrice(item.price * item.quantity)}</p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-white/25 font-medium">{formatPrice(item.price)} each</p>
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
            <div className="panel sticky top-24 overflow-hidden rounded-[4px] border border-[#2a2a2a]">
              {/* Header */}
              <div className="border-b border-white/8 px-6 py-5">
                <h2 className="font-outfit text-xl font-semibold text-white">Order Summary</h2>
              </div>

              {/* Lines */}
              <div className="px-6 py-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-medium">Subtotal ({totalItems} items)</span>
                  <span className="text-white font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-medium">Shipping</span>
                  {shipping === 0 ? (
                    <span className="font-semibold text-[#E63022] uppercase text-xs tracking-[0.04em]">Free</span>
                  ) : (
                    <span className="text-white font-bold">{formatPrice(shipping)}</span>
                  )}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-medium">Tax (10%)</span>
                  <span className="text-white font-bold">{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="mx-6 h-px bg-white/8" />

              {/* Free shipping nudge */}
              {totalPrice < 50 && (
                <div className="mx-6 my-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <p className="text-xs font-semibold text-emerald-200">
                    Add {formatPrice(50 - totalPrice)} more for free shipping
                  </p>
                </div>
              )}

              {/* Total */}
              <div className="flex items-center justify-between border-t border-white/8 px-6 py-5">
                <span className="text-sm font-semibold uppercase tracking-[0.04em] text-white">Total</span>
                <span className="font-outfit text-4xl font-semibold text-white">{formatPrice(total)}</span>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6 space-y-3">
                <Link
                  href="/checkout"
                  className="btn-primary group flex w-full justify-center py-4"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-center text-[11px] font-medium text-white/26">Secure and encrypted checkout</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
