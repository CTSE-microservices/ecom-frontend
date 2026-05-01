'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const { user } = useAuth();
  const cleared = useRef(false);

  // Clear cart exactly once when the page mounts
  useEffect(() => {
    if (!cleared.current) {
      cleared.current = true;
      clearCart();
    }
  }, [clearCart]);

  return (
    <div className="page-shell flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex max-w-md flex-col items-center"
      >
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.15, stiffness: 200, damping: 18 }}
          className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#E63022] shadow-[0_0_60px_rgba(230,48,34,0.4)]"
        >
          <Check className="h-12 w-12 text-white" strokeWidth={2.5} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <p className="label mb-3">Payment confirmed</p>
          <h1 className="font-bebas text-5xl tracking-[0.02em] text-white lg:text-6xl">
            Order Placed!
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/50">
            {user
              ? `Thank you, ${(user.username ?? user.email).split(' ')[0]}. Your order is confirmed and being processed.`
              : 'Your order is confirmed and being processed.'}
          </p>
          {user?.email && (
            <p className="mt-1 text-xs text-white/30">
              A confirmation will be sent to {user.email}
            </p>
          )}

          {/* Session reference */}
          {sessionId && (
            <p className="mt-4 rounded-xl border border-white/8 bg-white/[0.04] px-4 py-2.5 font-mono text-[11px] text-white/25">
              Session: {sessionId}
            </p>
          )}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link href="/products" className="btn-primary px-8 py-3.5">
            <ShoppingBag className="h-4 w-4" />
            Continue Shopping
          </Link>
          <Link href="/" className="btn-secondary px-8 py-3.5">
            Back to Home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
