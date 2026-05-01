'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShoppingBag, Lock, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import AuthModal from '@/components/auth/AuthModal';
import { createOrder, pollForCheckoutUrl } from '@/lib/orderService';

type CheckoutStep = 'shipping' | 'processing' | 'error';

interface ShippingData {
  name: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items } = useCart();
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [errorMsg, setErrorMsg] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  // Cancel polling if the user navigates away mid-flight
  useEffect(() => () => { abortRef.current?.abort(); }, []);

  const handleProceed = async (shipping: ShippingData) => {
    // shipping data is collected for display; order body requires none per API contract
    void shipping;

    setStep('processing');
    setErrorMsg('');
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const order = await createOrder();
      const checkoutUrl = await pollForCheckoutUrl(order.id, { signal: ac.signal });
      window.location.href = checkoutUrl;
    } catch (err) {
      if ((err as DOMException).name === 'AbortError') return;
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStep('error');
    }
  };

  /* ── Empty cart ── */
  if (items.length === 0 && step === 'shipping') {
    return (
      <div className="page-shell flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10">
          <ShoppingBag className="h-7 w-7 text-white/25" />
        </div>
        <h1 className="section-title text-4xl">Your Bag Is Empty</h1>
        <Link href="/products" className="btn-primary mt-5 px-7 py-3.5">Browse Products</Link>
      </div>
    );
  }

  /* ── Not signed in ── */
  if (!user) {
    return (
      <div className="page-shell flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-[#E63022]/25 bg-[#E63022]/10">
            <Lock className="h-8 w-8 text-[#E63022]" />
          </div>
          <h1 className="section-title text-4xl">Sign in to checkout</h1>
          <p className="mx-auto mt-3 max-w-sm text-sm text-white/50">Create an account or sign in to complete your purchase securely.</p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
            <button onClick={() => setAuthModalOpen(true)} className="btn-primary px-8 py-3.5">
              Sign In / Sign Up
            </button>
            <Link href="/cart" className="btn-secondary px-8 py-3.5">
              <ArrowLeft className="h-4 w-4" />
              Back To Cart
            </Link>
          </div>
        </motion.div>
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </div>
    );
  }

  /* ── Processing / polling ── */
  if (step === 'processing') {
    return (
      <div className="page-shell flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-white/10">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          </div>
          <h1 className="font-bebas text-4xl tracking-[0.02em] text-white">Setting up your payment</h1>
          <p className="mt-3 text-sm text-white/45">Connecting to Stripe — this only takes a moment…</p>
        </motion.div>
      </div>
    );
  }

  /* ── Error ── */
  if (step === 'error') {
    return (
      <div className="page-shell flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-[#E63022]/25 bg-[#E63022]/10">
            <AlertTriangle className="h-8 w-8 text-[#E63022]" />
          </div>
          <h1 className="section-title text-4xl">Payment Setup Failed</h1>
          <p className="mx-auto mt-3 max-w-sm text-sm text-white/50">{errorMsg}</p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
            <button onClick={() => setStep('shipping')} className="btn-primary px-8 py-3.5">
              Try Again
            </button>
            <Link href="/cart" className="btn-secondary px-8 py-3.5">
              <ArrowLeft className="h-4 w-4" />
              Back To Cart
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── Shipping form ── */
  return (
    <div className="page-shell pb-16">
      <div className="container-shell max-w-2xl">
        <div className="py-8">
          <Link href="/cart" className="btn-ghost px-0 text-xs uppercase tracking-[0.12em]">
            <ArrowLeft className="h-4 w-4" />
            Back To Cart
          </Link>
          <h1 className="section-title mt-3 text-5xl">Checkout</h1>
          <p className="mt-1 text-sm text-white/45">Logged in as {user.username ?? user.email}</p>
        </div>

        <div className="panel rounded-[4px] p-5 sm:p-6">
          <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.04em] text-white/50">Shipping Details</h2>
          <ShippingForm onSubmit={handleProceed} />
        </div>
      </div>
    </div>
  );
}

function ShippingForm({ onSubmit }: { onSubmit: (data: ShippingData) => void }) {
  const [form, setForm] = useState<ShippingData>({
    name: '',
    address: '',
    city: '',
    zip: '',
    country: 'United States',
  });
  const f = (k: keyof ShippingData, v: string) => setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}
      className="space-y-4"
    >
      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/45">Full Name</label>
        <input
          required
          value={form.name}
          onChange={(e) => f('name', e.target.value)}
          placeholder="John Doe"
          className="input-field"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/45">Street Address</label>
        <input
          required
          value={form.address}
          onChange={(e) => f('address', e.target.value)}
          placeholder="123 Main Street, Apt 4B"
          className="input-field"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/45">City</label>
          <input
            required
            value={form.city}
            onChange={(e) => f('city', e.target.value)}
            placeholder="New York"
            className="input-field"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/45">ZIP / Postal Code</label>
          <input
            required
            value={form.zip}
            onChange={(e) => f('zip', e.target.value)}
            placeholder="10001"
            className="input-field"
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/45">Country</label>
        <select
          value={form.country}
          onChange={(e) => f('country', e.target.value)}
          className="input-field cursor-pointer"
        >
          {[
            'United States', 'United Kingdom', 'Canada', 'Australia',
            'Germany', 'France', 'Japan', 'Singapore',
          ].map((c) => (
            <option key={c} value={c} className="bg-[#0f0f10]">{c}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-primary mt-4 w-full justify-center py-3.5">
        Proceed to Payment <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
